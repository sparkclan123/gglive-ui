import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeMemberBanner, bannerAfterImageError} from '../src/utils/memberBanner.js';
const base={enabled:true,image_url:'https://cdn.example.com/banner.png',mobile_image_url:'https://cdn.example.com/mobile.png',alt_text:'รอบใหม่',link_url:'/challenge?game_week_id=296'};
test('enabled banner keeps responsive image and a safe optional destination',()=>{
 assert.deepEqual(normalizeMemberBanner(base),base);
 assert.equal(normalizeMemberBanner({...base,link_url:'https://example.com/event'}).link_url,'https://example.com/event');
});
test('disabled, missing and invalid main images select the football fallback',()=>{
 for (const value of [null,{}, {...base,enabled:false},{...base,enabled:'false'},{...base,image_url:'javascript:alert(1)'},{...base,image_url:'//elsewhere/img.png'},{...base,image_url:'https://user:secret@example.com/image.png'}]) assert.equal(normalizeMemberBanner(value),null);
});
test('unsafe optional links and mobile sources are stripped while valid image remains',()=>{
 for(const url of ['javascript:alert(1)','data:text/html,test','//elsewhere','/\\elsewhere','https://user:pass@example.com','/\n/elsewhere']) {
  const banner=normalizeMemberBanner({...base,link_url:url,mobile_image_url:url});
  assert.equal(banner.link_url,'');assert.equal(banner.mobile_image_url,'');
 }
});
test('mobile image errors try main image once, then show default hero',()=>{
 assert.deepEqual(bannerAfterImageError(base,false),{mobileFailed:true,failed:false});
 assert.deepEqual(bannerAfterImageError(base,false,base.image_url),{mobileFailed:true,failed:true});
 assert.deepEqual(bannerAfterImageError(base,true),{mobileFailed:true,failed:true});
 assert.deepEqual(bannerAfterImageError({...base,mobile_image_url:''},false),{mobileFailed:true,failed:true});
});
test('mobile fallback uses the same canonical URL as browser currentSrc',()=>{
 const banner=normalizeMemberBanner({...base,mobile_image_url:'https://CDN.example:443/mobile.png'});
 assert.equal(banner.mobile_image_url,'https://cdn.example/mobile.png');
 assert.deepEqual(bannerAfterImageError(banner,false,'https://cdn.example/mobile.png'),{mobileFailed:true,failed:false});
});
