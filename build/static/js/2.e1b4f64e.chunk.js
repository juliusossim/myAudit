(this["webpackJsonpcrowd-funding-web"]=this["webpackJsonpcrowd-funding-web"]||[]).push([[2],{315:function(e,t,n){"use strict";n.d(t,"i",(function(){return a})),n.d(t,"k",(function(){return o})),n.d(t,"a",(function(){return i})),n.d(t,"g",(function(){return s})),n.d(t,"h",(function(){return c})),n.d(t,"j",(function(){return r})),n.d(t,"d",(function(){return d})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return j})),n.d(t,"e",(function(){return v})),n.d(t,"f",(function(){return b}));var l=n(47),a=function(e,t,n){var l,a=[];return(null===e||void 0===e?void 0:e.required)&&((null===n||void 0===n?void 0:n.length)<1||" "===n)&&a.push(" ".concat(t," is required")),(null===e||void 0===e?void 0:e.maxLength)&&(null===n||void 0===n?void 0:n.length)>(null===e||void 0===e?void 0:e.maxLength)&&a.push("".concat(t," is too long, it must not exceed ").concat(e.maxLength," characters")),(null===e||void 0===e?void 0:e.minLength)&&(null===n||void 0===n?void 0:n.length)<(null===e||void 0===e?void 0:e.minLength)&&""!==n&&a.push("".concat(t," is too short, it must exceed ").concat(e.minLength," characters")),(null===e||void 0===e?void 0:e.max)&&(null===n||void 0===n?void 0:n.length)>(null===e||void 0===e?void 0:e.max)&&a.push("".concat(t," is too long, it must not exceed ").concat(null===e||void 0===e?void 0:e.max," digits")),(null===e||void 0===e?void 0:e.min)&&(null===n||void 0===n?void 0:n.length)<(null===e||void 0===e?void 0:e.min)&&""!==n&&a.push("".concat(t," is too short, it must exceed ").concat(null===e||void 0===e?void 0:e.min," digits")),(null===e||void 0===e?void 0:e.confirmPassword)&&n!==(null===e||void 0===e?void 0:e.original)&&""!==n&&a.push("passwords do not match!"),(null===e||void 0===e?void 0:e.pattern)&&!(null===e||void 0===e||null===(l=e.pattern)||void 0===l?void 0:l.test(n))&&""!==n&&a.push("".concat(t," is invalid")),a},o={email:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,domain:/^[A-Z0-9._%+-]+\.[A-Z]{2,}$/i,image:/\.(jpg|jpeg|png|gif)$/},i=function(e,t,n,a){if(e.constructor===Object){var o,i=[],s=(null===(o=Object.keys(e))||void 0===o?void 0:o.length)>=a;if(t.constructor===Object)for(var c=0,r=Object.entries(t);c<r.length;c++){var d=Object(l.a)(r[c],2),u=(d[0],d[1]);u.constructor===Array&&u.length>0&&i.push(u)}0===i.length?n(s):n(!1)}},s=function(e){var t=[];if(e.constructor===Object)for(var n=0,a=Object.entries(e);n<a.length;n++){var o=Object(l.a)(a[n],2),i=(o[0],o[1]);i.constructor===Array&&i.length>0&&t.push(i)}return t.length>0},c=function(e){var t=[];if((null===e||void 0===e?void 0:e.constructor)===Object)for(var n=0,a=Object.entries(e);n<a.length;n++){var o=Object(l.a)(a[n],2),i=(o[0],o[1]);(null===i||void 0===i?void 0:i.constructor)===Array&&(null===i||void 0===i||i.map((function(e){return t.push(e.message)}))),(null===i||void 0===i?void 0:i.constructor)===Object&&(console.log("object",i),t.push(i.message))}return(null===e||void 0===e?void 0:e.constructor)===Array?e.map((function(e){return t.push(e.message)})):t.push(e),t},r=function(e){return o.password.test(e)},d=function(e){return/(?=.*[a-z])/.test(e)},u=function(e){return/(?=.*[A-Z])/.test(e)},j=function(e){return/(?=.*[0-9])/.test(e)},v=function(e){return/(?=.*[!@#$%^&*])/.test(e)},b=function(e){return/(?=.{8,})/.test(e)}},316:function(e,t,n){"use strict";n.d(t,"c",(function(){return l})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return i}));var l=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_",n=e.split(t),l=0;l<n.length;){var a=n[l];n[l]=a.charAt(0).toUpperCase()+a.slice(1),l+=1}return n.join(" ")},a=function(e){return e.replace(/\W+/g," ").replace(/([a-z\d])([A-Z])/g,"$1 $2").toLowerCase()},o=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=e.split(" ");return t?n[0]:n[1]},i=function(e){return!e||0===e.length||/^\s*$/.test(e)||!e.trim()}},324:function(e,t,n){"use strict";var l=n(47),a=n(2),o=n(311),i=n(307),s=n(315),c=n(316),r=n(3);t.a=function(e){var t,n,d,u,j,v,b,m,h,x,O,g,p,f,y,N,w,k,C,S,B=Object(a.useState)(!1),K=Object(l.a)(B,2),F=K[0],D=K[1],L=Object(a.useState)(!1),P=Object(l.a)(L,2),I=P[0],M=P[1],A=function(){return D(!F)},T="string"===typeof e.loading?e.loading:null===(t=e.loading)||void 0===t?void 0:t.status,q=function(){M(!0)},R=function(){M(!1)};return Object(r.jsx)("div",{className:"".concat((null===(n=e.error)||void 0===n?void 0:n.length)>0?"".concat(e.className," col-12"):"".concat(e.className)," form-group"),children:void 0===e.skeleton||e.skeleton||e.excuseSkeleton===e.name?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("label",{htmlFor:e.name,className:String(e.value).length?"active-field":"",children:[e.label,Object(r.jsx)("span",{className:"text-danger font-weight-bold",children:(null===(m=e.validations)||void 0===m?void 0:m.required)&&"*"}),Object(r.jsx)(r.Fragment,{children:"failed"===T&&Object(r.jsx)("button",{className:null===(h=e.btn)||void 0===h?void 0:h.class,type:"button",onClick:e.btnMethod,children:!Object(c.d)(e.value)&&(null===(x=e.btn)||void 0===x?void 0:x.text)})}),Object(r.jsx)(r.Fragment,{children:"success"===T&&Object(r.jsx)("button",{style:{marginLeft:"16vw"},className:null===(O=e.btn)||void 0===O?void 0:O.class,type:"button",onClick:e.btnMethod,children:null===(g=e.btn)||void 0===g?void 0:g.success})})]}),"pending"===T?Object(r.jsxs)("div",{className:"dots_loader d-flex",children:[Object(r.jsx)("p",{className:"mr-md-1 pb-md-1",children:(null===(p=e.loading)||void 0===p?void 0:p.text)||"fetching your details"}),Object(r.jsxs)("div",{className:"mt-md-1",children:[Object(r.jsx)("span",{}),Object(r.jsx)("span",{}),Object(r.jsx)("span",{}),Object(r.jsx)("span",{}),Object(r.jsx)("span",{}),Object(r.jsx)("span",{}),Object(r.jsx)("span",{})]})]}):Object(r.jsx)("input",{className:(null===(f=e.error)||void 0===f?void 0:f.length)>0?"error-field":"",type:F?"text":e.type||"text",name:e.name,id:e.name,value:"number"===e.type?e.value.toLocaleString():e.value,onChange:e.onChange,onFocus:e.onFocus,title:e.title,readOnly:e.readOnly,onMouseEnter:q,onMouseLeave:R,onBlur:function(t){return"function"===typeof e.onBlur&&e.onBlur(t,e.validations)},disabled:e.disabled,required:null===(y=e.validations)||void 0===y?void 0:y.required,onKeyPress:e.onKeyPress,onKeyDown:e.onKeyDown,maxLength:null===(N=e.validations)||void 0===N?void 0:N.maxLength,min:null===(w=e.validations)||void 0===w?void 0:w.min,max:null===(k=e.validations)||void 0===k?void 0:k.max}),I&&e.value&&Object(r.jsx)("div",{className:"text-wema",children:e.helperText}),(null===(C=e.error)||void 0===C?void 0:C.length)>0?Object(r.jsx)("ul",{className:"error-msg",children:e.error.map((function(e){return Object(r.jsx)("li",{children:e},e)}))}):"password"===e.name&&""!==e.value&&Object(s.j)(e.value)&&(F?Object(r.jsx)(o.c,{title:"hide",role:"button",className:"end-icon",onClick:A}):Object(r.jsx)(o.b,{title:"reveal",role:"button",className:"end-icon",onClick:A})),"password"===e.type&&(null===(S=e.validations)||void 0===S?void 0:S.pattern)&&""!==e.value&&Object(r.jsxs)("div",{className:Object(s.j)(e.value)?"d-none":void 0,children:[Object(r.jsx)("div",{className:"row",children:"Password must contain at least"}),Object(r.jsxs)("ul",{className:"",children:[Object(r.jsxs)("li",{className:Object(s.d)(e.value)?"text-success ":"text-muted ",children:["a small letter"," ",Object(s.d)(e.value)&&Object(r.jsx)(o.a,{})]}),Object(r.jsxs)("li",{className:Object(s.b)(e.value)?"text-success ":"text-muted ",children:["a capital letter"," ",Object(s.b)(e.value)&&Object(r.jsx)(o.a,{})]}),Object(r.jsxs)("li",{className:Object(s.e)(e.value)?"text-success ":"text-muted ",children:["a special character"," ",Object(s.e)(e.value)&&Object(r.jsx)(o.a,{})]}),Object(r.jsxs)("li",{className:Object(s.c)(e.value)?"text-success ":"text-muted ",children:["a number"," ",Object(s.c)(e.value)&&Object(r.jsx)(o.a,{})]}),Object(r.jsxs)("li",{className:Object(s.f)(e.value)?"text-success ":"text-muted ",children:["eight (8) characters"," ",Object(s.f)(e.value)&&Object(r.jsx)(o.a,{})]})]})]})]}):Object(r.jsxs)("div",{children:["(",Object(r.jsx)(i.a,{animation:"wave",children:Object(r.jsx)("input",{className:(null===(d=e.error)||void 0===d?void 0:d.length)>0?"error-field":"",type:F?"text":e.type||"text",name:e.name,id:e.name,value:"number"===e.type?e.value.toLocaleString():e.value,onChange:e.onChange,onFocus:e.onFocus,title:e.title,readOnly:e.readOnly,onMouseEnter:q,onMouseLeave:R,onBlur:function(t){return"function"===typeof e.onBlur&&e.onBlur(t,e.validations)},disabled:e.disabled,required:null===(u=e.validations)||void 0===u?void 0:u.required,onKeyPress:e.onKeyPress,onKeyDown:e.onKeyDown,maxLength:null===(j=e.validations)||void 0===j?void 0:j.maxLength,min:null===(v=e.validations)||void 0===v?void 0:v.min,max:null===(b=e.validations)||void 0===b?void 0:b.max})}),")"]})})}},328:function(e,t,n){"use strict";var l=n(2),a=n.n(l),o=n(324),i=n(307),s=n(3),c=function(e){var t=e.label,n=e.name,l=e.value,a=e.className,o=e.onChange,c=e.onBlur,r=e.disabled,d=e.validations,u=e.error,j=e.options,v=e.optionIndex,b=e.valueIndex,m=e.titleIndex,h=e.skeleton,x=e.excuseSkeleton,O=null===j||void 0===j?void 0:j.map((function(e){return"object"===typeof e?Object(s.jsx)("option",{value:Number(e[b]),title:e[m],children:e[v].toUpperCase()},e[v]):Object(s.jsx)("option",{value:e,title:e[m],children:e},e)}));return Object(s.jsx)("div",{className:"".concat((null===u||void 0===u?void 0:u.length)>0?"".concat(a," col-12"):"".concat(a)," form-group"),children:void 0===h||h||x===n?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("label",{htmlFor:n,className:(null===l||void 0===l?void 0:l.length)?"active-field":"",children:t}),Object(s.jsx)("select",{className:(null===u||void 0===u?void 0:u.length)>0?"error-field":"",name:n,id:n,value:l,onChange:o,onBlur:function(e){return"function"===typeof c&&c(e,d)},disabled:r,children:O}),(null===u||void 0===u?void 0:u.length)>0?Object(s.jsx)("ul",{className:"error-msg",children:u.map((function(e){return Object(s.jsx)("li",{children:e},e)}))}):null]}):Object(s.jsx)(i.a,{animation:"wave",children:Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("label",{htmlFor:n,className:(null===l||void 0===l?void 0:l.length)?"active-field":"",children:t}),Object(s.jsx)("select",{className:(null===u||void 0===u?void 0:u.length)>0?"error-field":"",name:n,id:n,value:l,onChange:o,onBlur:function(e){return"function"===typeof c&&c(e,d)},disabled:r,children:O}),(null===u||void 0===u?void 0:u.length)>0?Object(s.jsx)("ul",{className:"error-msg",children:u.map((function(e){return Object(s.jsx)("li",{children:e},e)}))}):null]})})})},r=function(e){var t=e.name,n=e.value,l=e.label,a=e.rows,o=e.className,c=e.error,r=e.onChange,d=e.onBlur,u=e.onKeyDown,j=e.onKeyPress,v=e.disabled,b=e.placeholder,m=e.validations,h=e.skeleton,x=e.excuseSkeleton;return Object(s.jsx)("div",{className:"".concat((null===c||void 0===c?void 0:c.length)>0?"".concat(o," col-12"):"".concat(o)," form-group"),children:void 0===h||h||x===t?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("label",{htmlFor:t,className:(null===n||void 0===n?void 0:n.length)?"active-field":"",children:l}),Object(s.jsx)("textarea",{className:(null===c||void 0===c?void 0:c.length)>0?"error-field":"",name:t,id:t,value:n,placeholder:b,rows:a,onChange:r,onBlur:function(e){return"function"===typeof d&&d(e,m)},disabled:v,onKeyPress:j,onKeyDown:u}),(null===c||void 0===c?void 0:c.length)>0?Object(s.jsx)("ul",{className:"error-msg",children:c.map((function(e){return Object(s.jsx)("li",{children:e},e)}))}):null]}):Object(s.jsx)(i.a,{animation:"wave",children:Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("label",{htmlFor:t,className:(null===n||void 0===n?void 0:n.length)?"active-field":"",children:l}),Object(s.jsx)("textarea",{className:(null===c||void 0===c?void 0:c.length)>0?"error-field":"",name:t,id:t,value:n,placeholder:b,rows:a,onChange:r,onBlur:function(e){return"function"===typeof d&&d(e,m)},disabled:v,onKeyPress:j,onKeyDown:u}),(null===c||void 0===c?void 0:c.length)>0?Object(s.jsx)("ul",{className:"error-msg",children:c.map((function(e){return Object(s.jsx)("li",{children:e},e)}))}):null]})})})},d=n(340),u=n(311),j=n(47),v=function(e){var t=e.size,n=e.progress,a=e.strokeWidth,o=e.circleOneStroke,i=e.circleTwoStroke,c=Object(l.useState)(0),r=Object(j.a)(c,2),d=r[0],u=r[1],v=Object(l.useRef)(null),b=t/2,m=t/2-a/2,h=2*Math.PI*m;return Object(l.useEffect)((function(){u((100-n)/100*h),v.current.style="transition: stroke-dashoffset 850ms ease-in-out;"}),[u,h,n,d]),Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("svg",{className:"svg",width:t,height:t,children:[Object(s.jsx)("circle",{className:"svg-circle-bg",stroke:o,cx:b,cy:b,r:m,strokeWidth:a}),Object(s.jsx)("circle",{className:"svg-circle",ref:v,stroke:i,cx:b,cy:b,r:m,strokeWidth:a,strokeDasharray:h,strokeDashoffset:d}),Object(s.jsxs)("text",{x:"".concat(b),y:"".concat(b),className:"svg-circle-text",children:[n,"%"]})]})})},b=function(e){var t=e.label,n=e.className,l=e.setFormData,a=e.text,o=e.name,c=e.value,r=e.file,j=e.multiple,b=e.removeItem,m=e.progress,h=e.onChange,x=e.onBlur,O=e.validations,g=e.error,p=e.skeleton,f=e.excuseSkeleton,y=Object(d.a)(new Set(r));return Object(s.jsx)("div",{className:"".concat((null===g||void 0===g?void 0:g.length)>0?"".concat(n," col-12"):"".concat(n)," form-group"),children:Object(s.jsxs)(s.Fragment,{children:[j?Object(s.jsxs)("div",{className:"row border p-3",children:[y.map((function(e){return Object(s.jsxs)("div",{className:"col-md-4",children:[Object(s.jsx)("img",{src:URL.createObjectURL(e),alt:e}),Object(s.jsx)("button",{onClick:function(){return b(e)},type:"button",className:"text-white btn-sm btn-danger radius50  remove-media",children:"x"})]},e.name)})),Object(s.jsxs)("div",{className:"file-input col-md-4",children:[void 0===p||p||f===o?Object(s.jsxs)("button",{type:"button",className:"",children:[Object(s.jsx)("div",{className:"",children:Object(s.jsx)(u.d,{})}),Object(s.jsx)("small",{children:" Add Media"})]}):Object(s.jsx)(i.a,{animation:"wave",children:Object(s.jsxs)("button",{type:"button",className:"",children:[Object(s.jsx)("div",{className:"",children:Object(s.jsx)(u.d,{})}),Object(s.jsx)("small",{children:" Add Media"})]})}),void 0===p||p||f===o?Object(s.jsx)("input",{className:(null===g||void 0===g?void 0:g.length)>0?"error-field":"",type:"file",value:c||"",name:o,multiple:!0,onBlur:function(e){return"function"===typeof x&&x(e,O)},onChange:h}):Object(s.jsx)(i.a,{animation:"wave",children:Object(s.jsx)("input",{className:(null===g||void 0===g?void 0:g.length)>0?"error-field":"",type:"file",value:c||"",name:o,multiple:!0,onBlur:function(e){return"function"===typeof x&&x(e,O)},onChange:h})})]})]}):Object(s.jsx)("div",{children:void 0===p||p||f===o?Object(s.jsxs)("div",{className:"file-input",children:[Object(s.jsx)("p",{children:t}),Object(s.jsxs)("button",{type:"button",children:[0===r.length?a:"Replace Upload"," "]}),Object(s.jsx)("input",{style:{marginTop:"6vh",paddingBottom:"5vh"},className:(null===g||void 0===g?void 0:g.length)>0?"error-field":"",type:"file",value:c,name:o,onBlur:function(e){return"function"===typeof x&&x(e,O)},onChange:h}),m>0&&Object(s.jsx)("div",{children:m<100?Object(s.jsx)(v,{progress:m,size:200,strokeWidth:15,circleOneStroke:"#f1ecf3b0",circleTwoStroke:"#A01B88"}):r.length>0&&Object(s.jsxs)("div",{children:[Object(s.jsx)("img",{src:r,alt:"inserted library"}),Object(s.jsx)("button",{type:"button",className:"btn btn-small float-sm-right w-25 text-danger",onClick:l,children:"Cancel"})]})})]}):Object(s.jsx)(i.a,{animation:"wave",children:Object(s.jsxs)("div",{className:"file-input",children:[Object(s.jsx)("p",{children:t}),Object(s.jsxs)("button",{type:"button",children:[0===r.length?a:"Replace Upload"," "]}),Object(s.jsx)("input",{style:{marginTop:"6vh",paddingBottom:"5vh"},className:(null===g||void 0===g?void 0:g.length)>0?"error-field":"",type:"file",value:c,name:o,onBlur:function(e){return"function"===typeof x&&x(e,O)},onChange:h}),m>0&&Object(s.jsx)("div",{children:m<100?Object(s.jsx)(v,{progress:m,size:200,strokeWidth:15,circleOneStroke:"#f1ecf3b0",circleTwoStroke:"#A01B88"}):r.length>0&&Object(s.jsxs)("div",{children:[Object(s.jsx)("img",{src:r,alt:"inserted library"}),Object(s.jsx)("button",{type:"button",className:"btn btn-small float-sm-right w-25 text-danger",onClick:l,children:"Cancel"})]})})]})})}),(null===g||void 0===g?void 0:g.length)>0?Object(s.jsx)("ul",{className:"error-msg",children:g.map((function(e,t){return Object(s.jsx)("li",{children:e},"".concat(e))}))}):null]})})},m=n(403),h=n(327),x=n(437),O=n(315),g=function(e){var t,n,l,a=function(t){return e.onChange({date:t,name:e.name})};return Object(s.jsx)("div",{className:(null===(t=e.error)||void 0===t?void 0:t.length)>0?"".concat(e.className," col-12"):e.className,children:void 0===e.skeleton||e.skeleton||e.excuseSkeleton===e.name?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(h.a,{utils:m.a,children:Object(s.jsx)(x.a,{margin:"normal",id:"date-picker-dialog",label:e.label,name:e.name,format:e.format||"dd-mm-yyyy",value:e.value,helperText:e.helperText,onChange:a,minDate:new Date,KeyboardButtonProps:{"aria-label":"change date"}})}),(null===(l=e.error)||void 0===l?void 0:l.length)>0&&Object(s.jsx)("ul",{className:"error-msg",children:e.error.map((function(e){return Object(s.jsx)("li",{children:e},e)}))})]}):Object(s.jsx)(i.a,{animation:"wave",children:Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(h.a,{utils:m.a,children:Object(s.jsx)(x.a,{margin:"normal",id:"date-picker-dialog",label:e.label,name:e.name,format:e.format||"dd-mm-yyyy",value:e.value,helperText:e.helperText,onChange:a,minDate:new Date,KeyboardButtonProps:{"aria-label":"change date"}})}),(null===(n=e.error)||void 0===n?void 0:n.length)>0&&Object(s.jsx)("ul",{className:"error-msg",children:e.error.map((function(e){return Object(s.jsx)("li",{children:e},e)}))})]})})})},p=n(391),f=n.n(p),y=n(316),N=function(e){var t,n,a,o,c,r,d,v,b,m,h,x,g,p,N,w,k,C,S,B,K=Object(l.useState)(!1),F=Object(j.a)(K,2),D=F[0],L=F[1],P=function(){return L(!D)},I="string"===typeof e.loading?e.loading:null===(t=e.loading)||void 0===t?void 0:t.status;return Object(s.jsx)("div",{className:"".concat((null===(n=e.error)||void 0===n?void 0:n.length)>0?"".concat(e.className," col-12"):"".concat(e.className)," form-group"),children:void 0===e.skeleton||e.skeleton||e.excuseSkeleton===e.name?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("label",{htmlFor:e.name,className:String(e.value).length?"active-field":"",children:[e.label,Object(s.jsx)("span",{className:"text-danger font-weight-bold",children:(null===(v=e.validations)||void 0===v?void 0:v.required)&&"*"}),Object(s.jsx)(s.Fragment,{children:"failed"===I&&Object(s.jsx)("button",{className:null===(b=e.btn)||void 0===b?void 0:b.class,type:"button",onClick:e.btnMethod,children:!Object(y.d)(e.value)&&(null===(m=e.btn)||void 0===m?void 0:m.text)})}),Object(s.jsx)(s.Fragment,{children:"success"===I&&Object(s.jsx)("button",{style:{marginLeft:"16vw"},className:null===(h=e.btn)||void 0===h?void 0:h.class,type:"button",onClick:e.btnMethod,children:null===(x=e.btn)||void 0===x?void 0:x.success})})]}),"pending"===I?Object(s.jsxs)("div",{className:"dots_loader d-flex",children:[Object(s.jsx)("p",{className:"mr-md-1 pb-md-1",children:(null===(g=e.loading)||void 0===g?void 0:g.text)||"fetching your details"}),Object(s.jsxs)("div",{className:"mt-md-1",children:[Object(s.jsx)("span",{}),Object(s.jsx)("span",{}),Object(s.jsx)("span",{}),Object(s.jsx)("span",{}),Object(s.jsx)("span",{}),Object(s.jsx)("span",{}),Object(s.jsx)("span",{})]})]}):Object(s.jsx)(f.a,{className:(null===(p=e.error)||void 0===p?void 0:p.length)>0?"error-field":"",type:D?"text":e.type||"text",name:e.name,id:e.name,value:e.value,onChange:e.onChange,onFocus:e.onFocus,title:e.title,readOnly:e.readOnly,onBlur:function(t){return"function"===typeof e.onBlur&&e.onBlur(t,e.validations)},disabled:e.disabled,required:null===(N=e.validations)||void 0===N?void 0:N.required,onKeyPress:e.onKeyPress,onKeyDown:e.onKeyDown,maxLength:null===(w=e.validations)||void 0===w?void 0:w.maxLength,min:null===(k=e.validations)||void 0===k?void 0:k.min,max:null===(C=e.validations)||void 0===C?void 0:C.max,thousandSeparator:!0,isNumericString:!0}),(null===(S=e.error)||void 0===S?void 0:S.length)>0?Object(s.jsx)("ul",{className:"error-msg",children:e.error.map((function(e){return Object(s.jsx)("li",{children:e},e)}))}):"password"===e.name&&""!==e.value&&Object(O.j)(e.value)&&(D?Object(s.jsx)(u.c,{title:"hide",role:"button",className:"end-icon",onClick:P}):Object(s.jsx)(u.b,{title:"reveal",role:"button",className:"end-icon",onClick:P})),"password"===e.type&&(null===(B=e.validations)||void 0===B?void 0:B.pattern)&&""!==e.value&&Object(s.jsxs)("div",{className:Object(O.j)(e.value)?"d-none":void 0,children:[Object(s.jsx)("div",{className:"row",children:"Password must contain at least"}),Object(s.jsxs)("ul",{className:"",children:[Object(s.jsxs)("li",{className:Object(O.d)(e.value)?"text-success ":"text-muted ",children:["a small letter"," ",Object(O.d)(e.value)&&Object(s.jsx)(u.a,{})]}),Object(s.jsxs)("li",{className:Object(O.b)(e.value)?"text-success ":"text-muted ",children:["a capital letter"," ",Object(O.b)(e.value)&&Object(s.jsx)(u.a,{})]}),Object(s.jsxs)("li",{className:Object(O.e)(e.value)?"text-success ":"text-muted ",children:["a special character"," ",Object(O.e)(e.value)&&Object(s.jsx)(u.a,{})]}),Object(s.jsxs)("li",{className:Object(O.c)(e.value)?"text-success ":"text-muted ",children:["a number"," ",Object(O.c)(e.value)&&Object(s.jsx)(u.a,{})]}),Object(s.jsxs)("li",{className:Object(O.f)(e.value)?"text-success ":"text-muted ",children:["eight (8) characters"," ",Object(O.f)(e.value)&&Object(s.jsx)(u.a,{})]})]})]})]}):Object(s.jsx)(i.a,{animation:"wave",children:Object(s.jsx)(f.a,{className:(null===(a=e.error)||void 0===a?void 0:a.length)>0?"error-field":"",type:D?"text":e.type||"text",name:e.name,id:e.name,value:e.value,onChange:e.onChange,onFocus:e.onFocus,title:e.title,readOnly:e.readOnly,onBlur:function(t){return"function"===typeof e.onBlur&&e.onBlur(t,e.validations)},disabled:e.disabled,required:null===(o=e.validations)||void 0===o?void 0:o.required,onKeyPress:e.onKeyPress,onKeyDown:e.onKeyDown,maxLength:null===(c=e.validations)||void 0===c?void 0:c.maxLength,min:null===(r=e.validations)||void 0===r?void 0:r.min,max:null===(d=e.validations)||void 0===d?void 0:d.max,thousandSeparator:!0,isNumericString:!0})})})},w=n(426),k=n(432),C=n(431),S=n(401),B=(n(1),n(422));n(429),n(430),n(355),n(424),n(423),Object(B.a)((function(e){return{typography:{padding:e.spacing(2),width:"15vw"},popper:{top:"3vh !important",left:"-5vw !important",zIndex:1e8}}}));var K=function(e){var t=e.label,n=e.name,c=e.value,r=e.className,d=e.onChange,u=e.onBlur,v=(e.disabled,e.validations),b=e.error,m=e.options,h=e.optionIndex,x=e.valueIndex,O=e.titleIndex,g=e.skeleton,p=e.excuseSkeleton,f=a.a.useState(""),y=Object(j.a)(f,2),N=y[0],B=y[1],K=a.a.useState([]),F=Object(j.a)(K,2),D=F[0],L=F[1],P=a.a.useState(m),I=Object(j.a)(P,2),M=I[0],A=I[1],T=a.a.useState(c),q=Object(j.a)(T,2),R=q[0],Z=q[1],$=a.a.useState(!1),z=Object(j.a)($,2),_=z[0],E=z[1],U=a.a.useState(!1),W=Object(j.a)(U,2),J=(W[0],W[1]),G=function(e){B(e.target.value)},H=function(e){Z(e),B(""),J(!1),d({target:{name:n,value:e}})},Q=M.map((function(e){return"object"===typeof e?Object(s.jsx)("li",{value:e[x],title:e[O],style:{width:"max-content"},children:Object(s.jsxs)(w.a,{onClick:function(){return H(e[h])},children:[R===e[h]&&Object(s.jsx)(S.a,{}),e[h]]})},e[h]):Object(s.jsx)("li",{type:"button",value:e,title:e,children:Object(s.jsxs)(w.a,{name:n,className:"text-center",onClick:function(){return H(e)},children:[R===e&&Object(s.jsx)(S.a,{}),e]})},e)}));return Object(l.useEffect)((function(){L(m.filter((function(e){return(e.constructor===Object?e[h]:e).toLowerCase().includes(null===N||void 0===N?void 0:N.toLowerCase())})))}),[N,m]),Object(l.useEffect)((function(){D.length>0?A(D):A(m)}),[D,m]),Object(s.jsx)("div",{className:"".concat((null===b||void 0===b?void 0:b.length)>0?"".concat(r," col-12 "):"".concat(r)," form-group"),children:Object(s.jsx)("div",{className:"container-fluid",children:void 0===g||g||p===n?Object(s.jsxs)("div",{onMouseEnter:function(){E(!0),J(!0)},onMouseLeave:function(){return E(!1)},className:"row",children:[Object(s.jsx)("label",{htmlFor:n,className:(null===c||void 0===c?void 0:c.length)?"active-field":"",children:t}),Object(s.jsx)(o.a,{name:n,value:R}),Object(s.jsx)(C.a,{className:_?"ontop":"d-none",children:Object(s.jsx)(k.a,{children:Object(s.jsxs)("ul",{className:(null===b||void 0===b?void 0:b.length)>0?"error-field":"",id:n,onChange:d,onBlur:function(e){return"function"===typeof u&&u(e,v)},children:[Object(s.jsx)("li",{children:Object(s.jsx)("input",{type:"search",value:N,onChange:G})}),Object(s.jsx)("li",{className:"select-2 ",children:Object(s.jsx)("ul",{children:Q})})]})})}),(null===b||void 0===b?void 0:b.length)>0?Object(s.jsx)("ul",{className:"error-msg",children:b.map((function(e){return Object(s.jsx)("li",{children:e},e)}))}):null]}):Object(s.jsx)(i.a,{animation:"wave",children:Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:n,className:(null===c||void 0===c?void 0:c.length)?"active-field":"",children:t}),Object(s.jsx)(o.a,{name:n,value:R}),Object(s.jsx)(C.a,{className:_?"ontop":"d-none",children:Object(s.jsx)(k.a,{children:Object(s.jsxs)("ul",{className:(null===b||void 0===b?void 0:b.length)>0?"error-field":"",id:n,onChange:d,onBlur:function(e){return"function"===typeof u&&u(e,v)},children:[Object(s.jsx)("li",{children:Object(s.jsx)("input",{type:"search",value:N,onChange:G})}),Object(s.jsx)("li",{className:"select-2 ",children:Object(s.jsx)("ul",{children:Q})})]})})}),(null===b||void 0===b?void 0:b.length)>0?Object(s.jsx)("ul",{className:"error-msg",children:b.map((function(e){return Object(s.jsx)("li",{children:e},e)}))}):null]})})})})};t.a=function(e){var t=e.formItems;return null===t||void 0===t?void 0:t.map((function(e,t){var n=e.kind,l=e.props;if("undefined"!==typeof n&&"string"===typeof n){var a=l.label,i=l.name,d=l.value,u=l.file,j=l.removeItem,v=l.multiple,m=l.setFormData,h=l.progress,x=l.className,O=l.type,p=l.text,f=l.onChange,y=l.onKeyPress,w=l.readOnly,k=l.onBlur,C=l.onKeyDown,S=l.disabled,B=l.minDate,F=l.maxDate,D=l.rows,L=l.placeholder,P=l.error,I=l.validations,M=l.options,A=l.optionIndex,T=l.valueIndex,q=l.titleIndex,R=l.reveal,Z=l.helperText,$=l.handleReveal,z=l.btn,_=l.btnMethod,E=l.loading,U=l.skeleton,W=l.excuseSkeleton;switch(n){case"select":return Object(s.jsx)(c,{value:d,onChange:f,onBlur:k,name:i,className:x,disabled:S,error:P,label:a,options:M,optionIndex:A,valueIndex:T,titleIndex:q,validations:I,btn:z,skeleton:U,excuseSkeleton:W,btnMethod:_},i);case"select2":return Object(s.jsx)(K,{value:d,onChange:f,onBlur:k,name:i,className:x,disabled:S,error:P,label:a,options:M,optionIndex:A,valueIndex:T,titleIndex:q,validations:I,btn:z,skeleton:U,excuseSkeleton:W,btnMethod:_},i);case"currency":return Object(s.jsx)(N,{label:a,name:i,value:d,className:x,onChange:f,type:O,id:i,error:P,readOnly:w,onBlur:k,disabled:S,onKeyPress:y,onKeyDown:C,min:B,max:F,validations:I,reveal:R,handleReveal:$,btn:z,btnMethod:_,loading:E,skeleton:U,excuseSkeleton:W},i);case"date":return Object(s.jsx)(g,{onChange:f,onBlur:k,disabled:S,onKeyPress:y,onKeyDown:C,name:i,value:d,className:x,error:P,label:a,placeholder:L,rows:D,validations:I,btn:z,helperText:Z,btnMethod:_,skeleton:U,excuseSkeleton:W},i);case"file_input":return Object(s.jsx)(b,{value:d,file:u,removeItem:j,multiple:v,setFormData:m,progress:h,className:x,name:i,error:P,label:a,onChange:f,text:p,validations:I,btn:z,btnMethod:_,skeleton:U,excuseSkeleton:W},i);case"text_area":return Object(s.jsx)(r,{onChange:f,onBlur:k,disabled:S,onKeyPress:y,onKeyDown:C,name:i,value:d,className:x,error:P,label:a,placeholder:L,rows:D,validations:I,btn:z,btnMethod:_,skeleton:U,excuseSkeleton:W},i);default:return Object(s.jsx)(o.a,{label:a,name:i,value:d,className:x,onChange:f,type:O,id:i,error:P,readOnly:w,onBlur:k,disabled:S,onKeyPress:y,onKeyDown:C,min:B,max:F,validations:I,reveal:R,handleReveal:$,btn:z,btnMethod:_,loading:E,skeleton:U,excuseSkeleton:W,helperText:Z},i)}}return!0}))}}}]);
//# sourceMappingURL=2.e1b4f64e.chunk.js.map