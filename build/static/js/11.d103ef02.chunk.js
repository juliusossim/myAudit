(this["webpackJsonpcrowd-funding-web"]=this["webpackJsonpcrowd-funding-web"]||[]).push([[11],{316:function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return n})),a.d(t,"d",(function(){return c}));var r=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_",a=e.split(t),r=0;r<a.length;){var s=a[r];a[r]=s.charAt(0).toUpperCase()+s.slice(1),r+=1}return a.join(" ")},s=function(e){return e.replace(/\W+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").toLowerCase()},n=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=e.split(" ");return t?a[0]:a[1]},c=function(e){return!e||0===e.length||/^\s*$/.test(e)||!e.trim()}},323:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return o}));var r=a.p+"static/media/Rectangle 19.e405d171.svg",s=a.p+"static/media/Rectangle 19 (1).caf8d0fb.svg",n=a.p+"static/media/Rectangle 19 (2).41040764.svg",c=a.p+"static/media/Rectangle 19 (3).233236d8.svg",i=["select item...",{id:1,type:"corporate",desc:"corporate project",value:2},{id:3,type:"individual",desc:"individual project",value:1}],d=[{id:1,photo:r,name:"operation feed the nation",target:4250250,raised:234002,duration:30,created_at:"01/03/2021",manager_name:"Julius Ossim",location:"abuja, nigeria",description:"Nigeria is a black nation inhabited by great minds but rule by imbeciles. The country is ravaged by rampaging hunger"},{id:2,photo:s,name:"operation feed the nation",manager_name:"Julius Ossim",target:4250250,raised:2940002,duration:30,created_at:"04/03/2021",location:"abuja, nigeria",description:"Nigeria is a black nation inhabited by great minds but rule by imbeciles. The country is ravaged by rampaging hunger"},{id:3,photo:n,name:"operation feed the nation",manager_name:"Julius Ossim",target:4250250,raised:2340002,duration:30,created_at:"03/03/2021",location:"abuja, nigeria",description:"Nigeria is a black nation inhabited by great minds but rule by imbeciles. The country is ravaged by rampaging hunger"},{id:4,photo:c,name:"operation feed the nation",manager_name:"Julius Ossim",target:4250250,raised:294002,duration:30,created_at:"04/02/2021",location:"abuja, nigeria",description:"Nigeria is a black nation inhabited by great minds but rule by imbeciles. The country is ravaged by rampaging hunger"}],o=["education","technology","business","agriculture","sports","charity","emergency","health","finance","community","NGOs","government"]},440:function(e,t,a){"use strict";a.r(t);var r=a(2),s=a(3),n=a(47),c=function(e){var t=e.src,a=e.alt,c=Object(r.useState)("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="),i=Object(n.a)(c,2),d=i[0],o=i[1],l=Object(r.useState)(),b=Object(n.a)(l,2),j=b[0],u=b[1];return Object(r.useEffect)((function(){var e,a=!1;return j&&d!==t&&(IntersectionObserver?(e=new IntersectionObserver((function(r){r.forEach((function(r){!a&&(r.intersectionRatio>0||r.isIntersecting)&&(o(t),e.unobserve(j))}))}),{threshold:.01,rootMargin:"75%"})).observe(j):o(t)),function(){a=!0,e&&e.unobserve&&e.unobserve(j)}}),[t,d,j]),Object(s.jsx)("img",{className:"lazyImage",ref:u,src:d,alt:a,onLoad:function(e){e.target.classList.add("loaded")},onError:function(e){e.target.classList.add("has-error")}})},i=a.p+"static/media/howItWorks.cce40c87.svg",d=a(316),o=864e5,l=(Math.round(Math.abs(3/o)),a(323));t.default=function(){var e=function(e,t){var a=t-function(e){var t=e.firstDate,a=e.secondDate;return Math.round(Math.abs((t-a)/o))}({firstDate:new Date(Date.now()),secondDate:new Date(e)});return{left:a>0,diff:a}};return Object(s.jsxs)("div",{children:[Object(s.jsx)("div",{className:"slide1",children:Object(s.jsxs)("div",{className:"content1",children:[Object(s.jsx)("p",{className:"small1",children:"Wemabank Crowdfunding"}),Object(s.jsx)("div",{className:"hero",children:"Fundraising for projects and causes that matter to humanity."}),Object(s.jsx)("small",{className:"small2",children:"Raise funds with ease and securely. get started now..."}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"button",className:"btn btn-small butt",onClick:function(){window.location.replace("/register")},children:"Start a Project Today"})})]})}),Object(s.jsxs)("div",{className:"center-text page",children:[Object(s.jsx)("h3",{className:"howItWorks text-center",children:"How It works with Wemabank Crowdfunding"}),Object(s.jsx)("div",{className:"pl-2 ",children:Object(s.jsx)("img",{src:i,alt:"how It works"})})]}),Object(s.jsxs)("div",{className:"projectsSection",children:[Object(s.jsxs)("div",{className:"row projects text-left mt-5 ",children:[Object(s.jsxs)("div",{className:"row justify-content-between ml-5 mr-5",children:[Object(s.jsx)("h3",{children:"Most Popular Fundraisers"}),Object(s.jsx)("button",{type:"button",className:"text-wema float-right viewMoreBtn",children:"View More >"})]}),l.a.map((function(t,a){return Object(s.jsxs)("div",{className:"col-md-3 mt-5",children:[Object(s.jsx)("div",{children:Object(s.jsx)(c,{src:t.photo,alt:t.name})}),Object(s.jsx)("h3",{children:t.name}),Object(s.jsx)("small",{children:t.location}),Object(s.jsx)("div",{children:t.description}),Object(s.jsx)("span",{className:"pr-1 raised",children:"N".concat(t.raised)}),Object(s.jsxs)("span",{children:["raised of"," ","N".concat(t.target)]}),Object(s.jsx)("div",{className:"progress",title:"N".concat(t.target-t.raised," to hit target"),children:Object(s.jsx)("div",{className:"progress-bar bg-wema",role:"progressbar","aria-valuenow":t.raised/t.target*100,style:{width:"".concat(t.raised/t.target*100,"%")},"aria-valuemin":"0","aria-valuemax":"100","aria-labelledby":"progress_bar"})}),Object(s.jsxs)("div",{className:"col-4",children:[Object(s.jsx)("p",{children:"Posted by:"}),Object(d.b)(t.manager_name)]}),Object(s.jsxs)("div",{className:"col-4",children:[Object(s.jsx)("p",{children:"Fund %:"}),"".concat((t.raised/t.target*100).toFixed(0),"%")]}),Object(s.jsxs)("div",{className:"col-4",children:[Object(s.jsx)("p",{children:"Duration"}),0!==e(new Date(t.created_at),t.duration).diff?Object(s.jsxs)("p",{className:e(new Date(t.created_at),t.duration).left?"":"text-danger",children:[e(new Date(t.created_at),t.duration).diff,Object(s.jsx)("span",{className:"pl-1",children:e(new Date(t.created_at),t.duration).left?"days left":"days due"})]}):"due now"]})]},"project ".concat(t.id))}))]}),Object(s.jsxs)("div",{className:"row projects text-left mt-5 ",children:[Object(s.jsxs)("div",{className:"row justify-content-between ml-5 mr-5",children:[Object(s.jsx)("h3",{children:"Most Popular NGOs"}),Object(s.jsx)("button",{type:"button",className:"text-wema float-right viewMoreBtn",children:"View More >"})]}),l.a.map((function(t,a){return Object(s.jsxs)("div",{className:"col-md-3 mt-5",children:[Object(s.jsx)("div",{children:Object(s.jsx)(c,{src:t.photo,alt:t.name})}),Object(s.jsx)("h3",{children:t.name}),Object(s.jsx)("small",{children:t.location}),Object(s.jsx)("div",{children:t.description}),Object(s.jsx)("span",{className:"pr-1 raised",children:"N".concat(t.raised)}),Object(s.jsxs)("span",{children:["raised of"," ","N".concat(t.target)]}),Object(s.jsx)("div",{className:"progress",title:"N".concat(t.target-t.raised," to hit target"),children:Object(s.jsx)("div",{className:"progress-bar bg-wema",role:"progressbar","aria-valuenow":t.raised/t.target*100,style:{width:"".concat(t.raised/t.target*100,"%")},"aria-valuemin":"0","aria-valuemax":"100","aria-labelledby":"progress_bar"})}),Object(s.jsxs)("div",{className:"col-6 col-md-4",children:[Object(s.jsx)("p",{children:"Posted by:"}),Object(s.jsx)("p",{className:"posted-by",children:Object(d.b)(t.manager_name)})]}),Object(s.jsxs)("div",{className:"col-6 col-md-4",children:[Object(s.jsx)("p",{children:"Fund %:"}),Object(s.jsx)("p",{className:"posted-by",children:"".concat((t.raised/t.target*100).toFixed(0),"%")})]}),Object(s.jsxs)("div",{className:"col-6 col-md-4",children:[Object(s.jsx)("p",{children:"Duration"}),0!==e(new Date(t.created_at),t.duration).diff?Object(s.jsxs)("p",{className:e(new Date(t.created_at),t.duration).left?"text-wema posted-by":"text-danger",children:[e(new Date(t.created_at),t.duration).diff,Object(s.jsx)("span",{className:"pl-1",children:e(new Date(t.created_at),t.duration).left?"days left":"days due"})]}):Object(s.jsx)("p",{children:"due now"})]})]},"project ".concat(t.id))}))]})]}),Object(s.jsxs)("div",{className:"category text-center",children:[Object(s.jsx)("div",{className:"text-center title",children:"Browse Fundraisers Categories"}),l.c.map((function(e){return Object(s.jsx)("button",{type:"button",className:"categoryButtons butt",children:Object(s.jsx)("span",{children:e})},e)}))]})]})}}}]);
//# sourceMappingURL=11.d103ef02.chunk.js.map