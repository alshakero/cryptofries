"use strict";var precacheConfig=[["/cryptofries/index.html","4b75a0dd8bf4bc00562cd6f9ae5ae885"],["/cryptofries/static/css/main.861667c2.css","715f29af2175c35424904be298acbaef"],["/cryptofries/static/js/HistoryChart.d31410fd.chunk.js","41d7dab7c2628757eec836329ab4938e"],["/cryptofries/static/js/NewsWidget.1698f6c3.chunk.js","ca80d24a6e84ab14b0e9fb46c1e27e0d"],["/cryptofries/static/js/main.e5fbd86b.js","5cf600393e3ca71e4db67c778b6f3dcf"],["/cryptofries/static/media/bitcoin-logo.7bf7280e.svg","7bf7280e3325cefb9e06ae786a2e36c2"],["/cryptofries/static/media/ethereum-logo.6e719870.svg","6e7198707e10cf78b655192feba30598"],["/cryptofries/static/media/iraq.b2ab3333.svg","b2ab33338643e87594af05831c945443"],["/cryptofries/static/media/logo-ar.11443ef1.svg","11443ef1cab00d32638ea3fc727fc68f"],["/cryptofries/static/media/logo.f1f26293.svg","f1f2629315a7461453536ff30f34eafb"],["/cryptofries/static/media/ripple-logo.cf64b6ce.svg","cf64b6ceb9d768c84254416294df4400"],["/cryptofries/static/media/uk.dbb2d233.svg","dbb2d233dc0dcb8f8dc8b2ac996f282d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var r=new URL(e);return"/"===r.pathname.slice(-1)&&(r.pathname+=t),r.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,r,n){var a=new URL(e);return n&&a.pathname.match(n)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(r)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var r=new URL(t).pathname;return e.some(function(e){return r.match(e)})},stripIgnoredUrlParameters=function(e,r){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return r.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],r=e[1],n=new URL(t,self.location),a=createCacheKey(n,hashParamName,r,/\.\w{8}\./);return[n.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(r){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!r.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var r=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!r.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,r=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(r))||(r=addDirectoryIndex(r,n),e=urlsToCacheKeys.has(r));var a="/cryptofries/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(r=new URL(a,self.location).toString(),e=urlsToCacheKeys.has(r)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(r)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});