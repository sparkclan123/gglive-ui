import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {clearMemberSession, logoutMember} from '../src/utils/memberSession.js';
function fixture() {
 const saved={access_token:'old-token',token:'legacy-token',user_params:'{"access_token":"callback-token"}',userinfo:'{}',ticket:'3','kickmun-theme':'light'};
 const storage={getItem:k=>saved[k]??null,removeItem:k=>delete saved[k]};
 const calls=[],routes=[]; const store={commit:(...args)=>calls.push(args)};
 return {saved,storage,calls,routes,store,session:{removeItem:k=>calls.push(['session',k])},router:{replace:async route=>routes.push(route)}};
}
for (const failure of [false,true]) test(`logout clears session and reaches login when revocation ${failure?'fails':'succeeds'}`,async()=>{
 const f=fixture();const requests=[];
 await logoutMember({...f,api:{post:async(...args)=>{requests.push(args);if(failure)throw Error('expired or offline');return {data:{ok:true}}}}});
 assert.equal(f.saved.access_token,undefined);assert.equal(f.saved.user_params,undefined);assert.equal(f.saved.userinfo,undefined);assert.equal(f.saved.ticket,undefined);
 assert.equal(f.saved['kickmun-theme'],'light'); assert.deepEqual(f.routes,[{name:'login'}]);
 assert.equal(requests[0][2].headers.Authorization,'Bearer old-token');assert.equal(requests[0][2].timeout,3000);
 assert.ok(f.calls.some(c=>c[0]==='auth/CLEAR_SESSION'));assert.ok(f.calls.some(c=>c[0]==='ticket/CLEAR_TICKET'));
});
test('local state clears immediately even while the revocation request is pending',async()=>{
 const f=fixture();let finish;const pending=logoutMember({...f,api:{post:()=>new Promise(resolve=>finish=resolve)}});
 assert.equal(f.saved.access_token,undefined);assert.equal(f.saved.user_params,undefined);
 finish({data:{ok:false}});await pending;assert.deepEqual(f.routes,[{name:'login'}]);
});
test('missing token skips revocation but still clears cached identity',async()=>{
 const f=fixture();delete f.saved.access_token;let requests=0;
 await logoutMember({...f,api:{post:()=>requests++}});assert.equal(requests,0);assert.equal(f.routes.length,1);
});
test('blocked storage cleanup does not prevent resetting live state',()=>{
 const calls=[]; clearMemberSession({removeItem:()=>{throw Error('blocked')}},{removeItem:()=>{throw Error('blocked')}},{commit:(key)=>calls.push(key)});
 assert.deepEqual(calls,['auth/CLEAR_SESSION','ticket/CLEAR_TICKET']);
});
for(const [module,file,method,payload] of [['profile','auth.js','facthUserInfo',{ok:true,data:{UserID:9}}],['tickets','ticket.js','facthTicket',{ok:true,ticket:99}]]) {
 test(`a late ${module} response cannot revive a logged-out session`,async()=>{
  let token='old',finish;const commits=[];
  const source=readFileSync(new URL('../src/store/modules/'+file,import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace(/export default \w+;/,'return '+file.split('.')[0]+';');
  const storage={getItem:key=>key==='access_token'?token:null,setItem(){}};
  const definition=new Function('api','apiMine','localStorage',source)({get:()=>new Promise(resolve=>finish=resolve)},{},storage);
  const pending=definition.actions[method]({commit:(...args)=>commits.push(args)});token=null;finish({data:payload});await pending;assert.deepEqual(commits,[]);
 });
}
function routeGuard(f, api) {
 const source=readFileSync(new URL('../src/router/index.js',import.meta.url),'utf8');
 const start=source.indexOf('router.beforeEach(')+'router.beforeEach('.length;
 const body=source.slice(start,source.indexOf('\n});',start))+'\n}';
 return new Function('api','localStorage','sessionStorage','store','clearMemberSession','return '+body)(api,f.storage,f.session,f.store,clearMemberSession);
}
for(const rejected of [true,false]) test(`stale token check ${rejected?'failure':'success'} rechecks the new session without clearing it`,async()=>{
 const f=fixture();let resolve,reject;const next=[];
 const guard=routeGuard(f,{get:()=>new Promise((r,j)=>{resolve=r;reject=j})});
 const to={name:'season-select',path:'/season-select',query:{mode:'normal'},hash:'',matched:[{meta:{requiresAuth:true}}]};
 const pending=guard(to,{},v=>next.push(v));f.saved.access_token='new-token';
 if(rejected)reject(Error('expired'));else resolve({data:{ok:true}});await pending;
 assert.equal(f.saved.access_token,'new-token');assert.deepEqual(f.calls,[]);
 assert.deepEqual(next,[{path:to.path,query:to.query,hash:'',replace:true}]);
});
test('a token check that succeeds after logout cannot admit the old session',async()=>{
 const f=fixture();let resolve;const next=[];
 const guard=routeGuard(f,{get:()=>new Promise(r=>resolve=r)});
 const pending=guard({name:'list',query:{},matched:[{meta:{requiresAuth:true}}]}, {},v=>next.push(v));
 delete f.saved.access_token;resolve({data:{ok:true}});await pending;
 assert.deepEqual(next,[{name:'login'}]);
});
