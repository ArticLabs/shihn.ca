!function(){"use strict";const t=new Map,e=new Map,a=new Map,s=new Map;function n(e){const a=e.join(",");if(t.has(a))return t.get(a);let[s,n,o]=e;s=e[0]/255,n=e[1]/255,o=e[2]/255,s=s>.04045?Math.pow((s+.055)/1.055,2.4):s/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92,o=o>.04045?Math.pow((o+.055)/1.055,2.4):o/12.92;let i=(.4124*s+.3576*n+.1805*o)/.95047,r=(.2126*s+.7152*n+.0722*o)/1,c=(.0193*s+.1192*n+.9505*o)/1.08883;i=i>.008856?Math.pow(i,1/3):7.787*i+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,c=c>.008856?Math.pow(c,1/3):7.787*c+16/116;const h=[116*r-16,500*(i-r),200*(r-c)];return t.set(a,h),h}function o(t,e){return[t[0]+e[0],t[1]+e[1],t[2]+e[2]]}function i(t,e){return[t[0]*e,t[1]*e,t[2]*e]}const r=[[255,255,255],[255,253,85],[238,111,46],[203,42,29],[235,55,151],[44,19,147],[164,255,196],[64,154,248],[0,0,0],[68,68,68],[136,136,136],[187,187,187],[146,104,60],[96,53,14],[43,100,25],[76,166,48]].map(t=>n(t)),c=[[0,0,0],[255,255,255],[255,255,0],[255,0,255],[0,255,255],[255,0,0],[0,255,0],[0,0,255]].map(t=>n(t)),h=[[0,0,0],[255,255,255]].map(t=>n(t));class l{constructor(t){this.maps=new Map,this.data=t}initMap(t){return this.maps.has(t)||this.maps.set(t,new Map),this.maps.get(t)}getPixel(t,e){return t.get(e.join(","))}setPixel(t,e,a){t.set(e.join(","),a)}read(t,e="rgb"){const s=this.initMap(e),o=this.getPixel(s,t);if(o)return o;let i=null;const r=this.data.data,c=this.data.width,h=[r[t[1]*c*4+4*t[0]],r[t[1]*c*4+4*t[0]+1],r[t[1]*c*4+4*t[0]+2]];switch(e){case"rgb":i=h;break;case"lab":i=n(h);break;case"hsv":i=function(t){const e=t.join(",");if(a.has(e))return a.get(e);let[s,n,o]=t;s/=255,n/=255,o/=255;const i=Math.max(s,n,o),r=Math.min(s,n,o);let c=i,h=i;const l=i,f=i-r;if(h=0===i?0:f/i,i===r)c=0;else{switch(i){case s:c=(n-o)/f+(n<o?6:0);break;case n:c=(o-s)/f+2;break;case o:c=(s-n)/f+4}c/=6}const w=[c,h,l];return a.set(e,w),w}(h)}return this.setPixel(s,t,i),i}write(t,a,n="rgb"){let o=a;switch(n){case"hsv":o=function(t){const e=t.join(",");if(s.has(e))return s.get(e);const[a,n,o]=t,i=Math.floor(6*a),r=6*a-i,c=o*(1-n),h=o*(1-r*n),l=o*(1-(1-r)*n);let[f,w,u]=[0,0,0];switch(i%6){case 0:f=o,w=l,u=c;break;case 1:f=h,w=o,u=c;break;case 2:f=c,w=o,u=l;break;case 3:f=c,w=h,u=o;break;case 4:f=l,w=c,u=o;break;case 5:f=o,w=c,u=h}const p=[255*f,255*w,255*u];return s.set(e,p),p}(a);break;case"lab":o=function(t){const a=t.join(",");if(e.has(a))return e.get(a);let s=(t[0]+16)/116,n=t[1]/500+s,o=s-t[2]/200,[i,r,c]=[0,0,0];n=.95047*(n*n*n>.008856?n*n*n:(n-16/116)/7.787),s=1*(s*s*s>.008856?s*s*s:(s-16/116)/7.787),o=1.08883*(o*o*o>.008856?o*o*o:(o-16/116)/7.787),i=3.2406*n+-1.5372*s+-.4986*o,r=-.9689*n+1.8758*s+.0415*o,c=.0557*n+-.204*s+1.057*o,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:12.92*i,r=r>.0031308?1.055*Math.pow(r,1/2.4)-.055:12.92*r,c=c>.0031308?1.055*Math.pow(c,1/2.4)-.055:12.92*c;const h=[Math.round(255*Math.max(0,Math.min(1,i))),Math.round(255*Math.max(0,Math.min(1,r))),Math.round(255*Math.max(0,Math.min(1,c)))];return e.set(a,h),h}(a)}const i=this.data.data,r=this.data.width;i[t[1]*r*4+4*t[0]]=o[0],i[t[1]*r*4+4*t[0]+1]=o[1],i[t[1]*r*4+4*t[0]+2]=o[2]}}const f=new Map;function w(t,e){f.has(e)||f.set(e,new Map);const a=f.get(e),s=t.join(",");if(a.has(s))return a.get(s);const n=function(t,e){const a=e.map(e=>{return{diff:(a=t,s=e,Math.sqrt(Math.pow(s[0]-a[0],2)+Math.pow(s[1]-a[1],2)+Math.pow(s[2]-a[2],2))),color:e};var a,s});return a.sort((t,e)=>t.diff-e.diff),a[0].color}(t,e);return a.set(s,n),n}const u=new class{async process(t,e,a){if(t.data.buffer,"All colors"!==e){let s=r;switch(e){case"8 colors":s=c;break;case"Black & White":s=h}a?function(t,e){const a=new Map,s=new l(t),{width:n,height:r}=t;for(let t=0;t<r;t++)for(let r=0;r<n;r++){const n=[r,t].join(",");let l=s.read([r,t],"lab");const f=a.get(n);f&&(l=o(l,f));const u=w(l,e),p=(h=u,[(c=l)[0]-h[0],c[1]-h[1],c[2]-h[2]]);{const e=[r+1,t].join(",");let s=a.get(e)||[0,0,0];s=o(s,i(p,7/16)),a.set(e,s)}{const e=[r+1,t+1].join(",");let s=a.get(e)||[0,0,0];s=o(s,i(p,1/16)),a.set(e,s)}{const e=[r,t+1].join(",");let s=a.get(e)||[0,0,0];s=o(s,i(p,5/16)),a.set(e,s)}{const e=[r-1,t+1].join(",");let s=a.get(e)||[0,0,0];s=o(s,i(p,3/16)),a.set(e,s)}s.write([r,t],u,"lab")}var c,h}(t,s):function(t,e){const a=new l(t),{width:s,height:n}=t;for(let t=0;t<n;t++)for(let n=0;n<s;n++){const s=w(a.read([n,t],"lab"),e);a.write([n,t],s,"lab")}}(t,s)}return t}};self.onmessage=async t=>{const e=t.data;if(e.id&&e.buffer&&e.paletteType&&void 0!==e.dither){const t=new ImageData(new Uint8ClampedArray(e.buffer),e.width,e.height),a=(await u.process(t,e.paletteType,e.dither)).data.buffer,s={id:e.id,width:e.width,height:e.height,buffer:a};self.postMessage(s,[a])}}}();
