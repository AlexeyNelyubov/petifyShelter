import{d as r,r as a}from"./index-c4f5f31f.js";function g(F){const l=new Date-Date.parse(F);let n=new Date(l),e=n.getFullYear()-1970,t=n.getMonth(),s="",o="";return e===1||e%10===1?s="год":e>=2&e<=4||e%10>=2&e%10<=4?s="года":e===0?e="":s="лет",t===1?o="месяц":t>=2&t<=4?o="месяца":t===0?t="":o="месяцев",`${e} ${s} ${t} ${o}`}function A(){const F=["#00FF00","#FFFF00","#FF00FF","#00FFFF","#F4A460","#FF00FF","#EE82EE","#FF7F50","#FFA500","#FF69B4","#FA8072","#00FA9A","#7FFFD4","#FFE4E1"];return F[Math.floor(Math.random()*F.length)]}const c=r("petsList",()=>({petsList:a([])}));export{A as a,g,c as u};
