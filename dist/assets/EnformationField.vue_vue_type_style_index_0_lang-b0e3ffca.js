import{r as a,o as n,c as i,e as m,v,a as p,f as d,C as f}from"./index-1975b265.js";const x={class:"email"},h={key:0,class:"popup-email"},g={__name:"Email",emits:["change-email"],setup(E,{emit:c}){f(r=>({"592821d2":s.value}));const e=a(""),l=a(!1),t=a(!1),s=a("#000"),o=()=>{e.value.length&&/^\S+@\w{2,}\.\w{2,3}$/.test(e.value)?(s.value="#008000",l.value=!0,t.value=!1):(s.value="#ff0000",l.value=!1,t.value=!0),c("change-email",e.value,l.value)};return(r,u)=>(n(),i("div",x,[m(p("input",{type:"text","onUpdate:modelValue":u[0]||(u[0]=_=>e.value=_),placeholder:"Email",class:"email-input",onInput:o,onBlur:o,required:""},null,544),[[v,e.value]]),t.value?(n(),i("div",h," Email должен соответствовать шаблону example@example.com ")):d("",!0)]))}};export{g as _};
