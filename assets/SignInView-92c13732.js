import{s as h,k as w,r as s,o as i,c as v,a as y,b as k,d,e as I,l as n}from"./index-d7283c15.js";import{_ as S,a as C,b as V}from"./AuthentificationButtonAndEnformation-33b18ffc.js";import{_ as N}from"./EnformationField.vue_vue_type_style_index_0_lang-a19c15d7.js";import"./AuthentificationButton-f26e9204.js";const $={class:"signIn"},b={key:0,class:"signIn-field"},A={__name:"SignInView",setup(x){const f=h(),p=w(),c=s(""),u=s(!1),m=s(""),_=s(!1),a=s(""),t=s(""),g=()=>{(async()=>{try{let o=await fetch("https://petify-shelter-back-8t20.onrender.com/api/v1/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c.value,password:m.value})}),e=await o.json();o.ok?(localStorage.setItem("token",e.token),p.logIn(e.user),f.push({name:"IndexPage"})):e==="Неверно указан email"||e==="Неверно указан пароль"?t.value=e:(console.log(e),a.value="Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.")}catch(o){console.error(o.message),a.value="Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз."}})()};return(o,e)=>(i(),v("main",null,[a.value?(i(),y(k,{key:0,message:a.value},null,8,["message"])):d("",!0),I("div",$,[a.value?d("",!0):(i(),v("div",b,[n(V,{typeAuth:"Войти через"}),n(N,{onChangeEmail:e[0]||(e[0]=(r,l)=>{c.value=r,u.value=l,t.value=""})}),n(S,{onChangePassword:e[1]||(e[1]=(r,l)=>{m.value=r,_.value=l,t.value=""})}),n(C,{buttonName:"Войти",isCorrectNewUserInformation:u.value&&_.value,showValidationFromServer:t.value,successAuth:!1,onAuthentification:g},null,8,["isCorrectNewUserInformation","showValidationFromServer"])]))])]))}};export{A as default};