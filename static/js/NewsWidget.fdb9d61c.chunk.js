webpackJsonp([1],{678:function(e,t,n){var r=n(679);"string"===typeof r&&(r=[[e.i,r,""]]);var o={hmr:!1};o.transform=void 0;n(71)(r,o);r.locals&&(e.exports=r.locals)},679:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,".newsWidget{margin:10px;background-color:#fff;border:1px solid #eee;border-radius:5px;text-align:center}.newsWidgetHead{padding:5px 10px;text-align:initial;border-bottom:10px dotted #eee}.providersFilters{padding:10px;border:1px dotted #ccc}.providersFilters label{border:1px solid #eee;display:inline-block;padding:5px;margin:5px}","",{version:3,sources:["C:/Work/Personal/cryptofries/src/components/NewsWidget/style.css"],names:[],mappings:"AAAA,YACE,YAAa,AACb,sBAAuB,AACvB,sBAAuB,AACvB,kBAAmB,AACnB,iBAAmB,CACpB,AACD,gBACE,iBAAkB,AAClB,mBAAoB,AACpB,8BAAgC,CACjC,AAED,kBACE,aAAc,AACd,sBAAwB,CACzB,AACD,wBACE,sBAAuB,AACvB,qBAAsB,AACtB,YAAa,AACb,UAAY,CACb",file:"style.css",sourcesContent:[".newsWidget {\r\n  margin: 10px;\r\n  background-color: #fff;\r\n  border: 1px solid #eee;\r\n  border-radius: 5px;\r\n  text-align: center;\r\n}\r\n.newsWidgetHead {\r\n  padding: 5px 10px;\r\n  text-align: initial;\r\n  border-bottom: 10px dotted #eee;\r\n}\r\n\r\n.providersFilters {\r\n  padding: 10px;\r\n  border: 1px dotted #ccc;\r\n}\r\n.providersFilters label {\r\n  border: 1px solid #eee;\r\n  display: inline-block;\r\n  padding: 5px;\r\n  margin: 5px;\r\n}\r\n"],sourceRoot:""}])},680:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),l=n(681),A=(n.n(l),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),c=function(e){function t(){r(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={visible:!1,imgsrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},e.lastTimeout=0,e.debouncedScrollHander=e.debouncedScrollHander.bind(e),e.debouncedScrollHander(),e}return i(t,e),A(t,[{key:"debouncedScrollHander",value:function(){var e=this;clearTimeout(this.lastTimeout),this.lastTimeout=setTimeout(function(){if(e.image&&e.isImageInViewport()){e.setState({visible:!0});var t=new Image;t.onload=function(){e.setState({imgsrc:e.props.imageurl,loaded:!0})},t.onerror=function(){e.setState({imgsrc:"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg enable-background='new 0 0 100 100' version='1.1' viewBox='0 0 100 100' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:none;%7D .st1%7Bfill:%23B3B3B3;%7D .st2%7Bfont-family:'MyriadPro-Regular';%7D .st3%7Bfont-size:17px;%7D%0A%3C/style%3E%3Crect class='st0' x='8.5' y='17.5' width='86.5' height='74.5'/%3E%3Ctext transform='translate%288.5142 29.584%29'%3E%3Ctspan class='st1 st2 st3' x='0' y='0'%3ECOULDN\u2019T %3C/tspan%3E%3Ctspan class='st1 st2 st3' x='0' y='20.4'%3ELOAD %3C/tspan%3E%3Ctspan class='st1 st2 st3' x='0' y='40.8'%3EIMAGE%3C/tspan%3E%3C/text%3E%3C/svg%3E%0A",loaded:!0})},t.src=e.props.imageurl,window.removeEventListener("scroll",e.debouncedScrollHander),window.removeEventListener("resize",e.debouncedScrollHander)}},50)}},{key:"isImageInViewport",value:function(){var e=this.image.getBoundingClientRect(),t=document.documentElement;return e.top>=0&&e.top<t.clientHeight||e.bottom>0&&e.bottom<t.clientHeight}},{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.debouncedScrollHander),window.addEventListener("resize",this.debouncedScrollHander)}},{key:"componentwillUnMount",value:function(){window.removeEventListener("scroll",this.debouncedScrollHander),window.removeEventListener("resize",this.debouncedScrollHander)}},{key:"registerImage",value:function(e){this.image=e}},{key:"formatDate",value:function(e){return new Date(1e3*e).toLocaleString()}},{key:"render",value:function(){return s.a.createElement("a",{href:this.props.url,rel:"noopener noreferrer",target:"_blank",className:"newsItem"},s.a.createElement("img",{ref:this.registerImage.bind(this),alt:this.props.title,className:this.state.loaded?"loaded":"loading","data-loaded":this.state.loaded,src:this.state.imgsrc}),s.a.createElement("h4",{className:"title"},this.props.title),s.a.createElement("div",{className:"details"},s.a.createElement("time",null,s.a.createElement("span",{role:"img","aria-label":"clock"},"\ud83d\udd52"," "),this.formatDate(this.props.published_on)),s.a.createElement("p",null," ",s.a.createElement("span",{role:"img","aria-label":"world"},"\ud83c\udf10"," "),this.props.source)))}}]),t}(a.Component);t.a=c},681:function(e,t,n){var r=n(682);"string"===typeof r&&(r=[[e.i,r,""]]);var o={hmr:!1};o.transform=void 0;n(71)(r,o);r.locals&&(e.exports=r.locals)},682:function(e,t,n){t=e.exports=n(70)(!0),t.push([e.i,".newsItem{text-decoration:none;color:#333;margin:10px;border-radius:5px;width:calc(100% - 20px);max-width:300px;display:inline-block;border:1px solid #fff1f1;vertical-align:top;text-align:left;-webkit-transition:-webkit-transform .13s ease-in;transition:-webkit-transform .13s ease-in;-o-transition:transform .13s ease-in;transition:transform .13s ease-in;transition:transform .13s ease-in,-webkit-transform .13s ease-in}.newsItem img{width:100%;opacity:0;-webkit-transition:opacity 1s ease-in;-o-transition:opacity 1s ease-in;transition:opacity 1s ease-in}.newsItem img.loaded{opacity:1}.newsItem:hover{-webkit-transform:scale(1.02);-ms-transform:scale(1.02);transform:scale(1.02)}.newsItem img{border-top-left-radius:5px;border-top-right-radius:5px}.newsItem .title{margin:5px}.newsItem time{color:#555;font-size:1em}.newsItem .details{padding:5px;margin-bottom:10px}.newsItem .details p{margin:2px 0;font-size:1em}","",{version:3,sources:["C:/Work/Personal/cryptofries/src/components/NewsItem/style.css"],names:[],mappings:"AAAA,UACI,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,kBAAmB,AACnB,wBAAyB,AACzB,gBAAiB,AACjB,qBAAsB,AACtB,yBAAqC,AACrC,mBAAoB,AACpB,gBAAiB,AACjB,kDAAoD,AACpD,0CAA4C,AAC5C,qCAAuC,AACvC,kCAAoC,AACpC,gEAAqE,CACxE,AACD,cACI,WAAY,AAGZ,UAAU,AACV,sCAAuC,AACvC,iCAAkC,AAClC,6BAA+B,CALlC,AAOD,qBACI,SAAS,CACZ,AACD,gBACI,8BAA+B,AAC3B,0BAA2B,AACvB,qBAAuB,CAClC,AACD,cACI,2BAA4B,AAC5B,2BAA6B,CAChC,AACD,iBACI,UAAY,CACf,AACD,eACI,WAAY,AACZ,aAAe,CAClB,AACD,mBACI,YAAa,AACb,kBAAmB,CACtB,AACD,qBACI,aAAc,AACd,aAAe,CAClB",file:"style.css",sourcesContent:[".newsItem {\r\n    text-decoration: none;\r\n    color: #333;\r\n    margin: 10px;\r\n    border-radius: 5px;\r\n    width: calc(100% - 20px);\r\n    max-width: 300px;\r\n    display: inline-block;\r\n    border: 1px solid rgb(255, 241, 241);\r\n    vertical-align: top;\r\n    text-align: left;\r\n    -webkit-transition: -webkit-transform 0.13s ease-in;\r\n    transition: -webkit-transform 0.13s ease-in;\r\n    -o-transition: transform 0.13s ease-in;\r\n    transition: transform 0.13s ease-in;\r\n    transition: transform 0.13s ease-in, -webkit-transform 0.13s ease-in;\r\n}\r\n.newsItem img {\r\n    width: 100%;\r\n}\r\n.newsItem img {\r\n    opacity:0; \r\n    -webkit-transition: opacity 1s ease-in; \r\n    -o-transition: opacity 1s ease-in; \r\n    transition: opacity 1s ease-in;\r\n}\r\n.newsItem img.loaded {\r\n    opacity:1\r\n}\r\n.newsItem:hover {\r\n    -webkit-transform: scale(1.02);\r\n        -ms-transform: scale(1.02);\r\n            transform: scale(1.02);\r\n}\r\n.newsItem img {\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n}\r\n.newsItem .title {\r\n    margin: 5px;\r\n}\r\n.newsItem time { \r\n    color: #555;\r\n    font-size: 1em;\r\n}\r\n.newsItem .details {\r\n    padding: 5px;\r\n    margin-bottom: 10px\r\n}\r\n.newsItem .details p {\r\n    margin: 2px 0;\r\n    font-size: 1em;\r\n}"],sourceRoot:""}])},73:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),s=n.n(a),l=n(678),A=(n.n(l),n(680)),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=function(e){function t(){r(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.update=e.update.bind(e),e}return i(t,e),c(t,[{key:"componentDidMount",value:function(){this.props.store.subscribe(this.update)}},{key:"componentWillUnmount",value:function(){this.props.store.unsubscribe(this.update)}},{key:"update",value:function(){this.forceUpdate()}},{key:"toggleProviderChecked",value:function(e,t){t.find(function(t){return t.name===e.getAttribute("data-name")}).checked=e.checked,this.props.store.notifyProvidersUpdate()}},{key:"render",value:function(){var e=this,t=this.props.store.availableData.providers||[],n=this.props.store.getNews(t);return s.a.createElement("div",{className:"newsWidget"},s.a.createElement("div",{className:"newsWidgetHead"},s.a.createElement("div",null,s.a.createElement("h2",null,s.a.createElement("span",{role:"img","aria-label":"news paper"},"\ud83d\udcf0")," ",this.props.store.i18n.news)),s.a.createElement("div",{className:"providersFilters"},s.a.createElement("a",null,"From providers: "),t.map(function(n){return s.a.createElement("label",{key:n.name},s.a.createElement("input",{type:"checkbox",checked:n.checked,"data-name":n.name,onChange:function(n){return e.toggleProviderChecked(n.target,t)},name:n.name})," ",n.name)}))),n.map(function(e){return s.a.createElement(A.a,Object.assign({key:e.id},e))}))}}]),t}(a.Component);t.default=p}});
//# sourceMappingURL=NewsWidget.fdb9d61c.chunk.js.map