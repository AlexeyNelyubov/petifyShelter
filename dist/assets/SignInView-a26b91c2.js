import{D as h,p as w,r as s,o as i,c as v,A as y,B as I,f,a as S,l as n}from"./index-df262f46.js";import{_ as k,a as C,b as V}from"./AuthentificationButtonAndEnformation-ef2b91c6.js";import{_ as N}from"./EnformationField.vue_vue_type_style_index_0_lang-00d3afad.js";import"./AuthentificationButton-bd4121ad.js";const $={class:"signIn"},B={key:0,class:"signIn-field"},j={__name:"SignInView",setup(b){const d=h(),p=w(),c=s(""),u=s(!1),m=s(""),_=s(!1),a=s(""),t=s(""),g=()=>{(async()=>{try{let o=await fetch("https://petify-shelter-back.onrender.com/api/v1/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c.value,password:m.value})}),e=await o.json();o.ok?(localStorage.setItem("token",e.token),p.logIn(e.user),d.push({name:"IndexPage"})):e==="Неверно указан email"||e==="Неверно указан пароль"?t.value=e:(console.log(e),a.value="Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.")}catch(o){console.error(o.message),a.value="Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз."}})()};return(o,e)=>(i(),v("main",null,[a.value?(i(),y(I,{key:0,message:a.value},null,8,["message"])):f("",!0),S("div",$,[a.value?f("",!0):(i(),v("div",B,[n(V,{typeAuth:"Войти через"}),n(N,{onChangeEmail:e[0]||(e[0]=(r,l)=>{c.value=r,u.value=l,t.value=""})}),n(k,{onChangePassword:e[1]||(e[1]=(r,l)=>{m.value=r,_.value=l,t.value=""})}),n(C,{buttonName:"Войти",isCorrectNewUserInformation:u.value&&_.value,showValidationFromServer:t.value,successAuth:!1,onAuthentification:g},null,8,["isCorrectNewUserInformation","showValidationFromServer"])]))])]))}};export{j as default};
