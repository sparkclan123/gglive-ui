import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('refreshed member profile is persisted and restored consistently',()=>{
 const stored={};const source=readFileSync(new URL('../src/store/modules/auth.js',import.meta.url),'utf8').replace(/^import .*;\s*$/gm,'').replace('export default auth;','return auth;');
 const auth=new Function('localStorage',source)({getItem:k=>stored[k]||null,setItem:(k,v)=>stored[k]=v});
 const profile={UserID:42,Username:'Test member'};
 auth.mutations.SET_DATA(auth.state,{type:'userinfo',value:profile});
 assert.deepEqual(auth.state.userinfo,profile);
 assert.deepEqual(JSON.parse(stored.userinfo),profile);
});
