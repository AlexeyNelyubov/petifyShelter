import{q as s,o as r,c as a,t as u,f as c}from"./index-d6bb07ff.js";const p=["disabled"],m={__name:"AuthentificationButton",props:{buttonName:{type:String,required:!0},isCorrectNewUserInformation:{type:Boolean,required:!0}},emits:["authentification"],setup(n){const t=n,o=s(()=>!t.isCorrectNewUserInformation);return(i,e)=>(r(),a("button",{class:"signUp-signIn-button",disabled:c(o),onClick:e[0]||(e[0]=_=>i.$emit("authentification"))},u(t.buttonName),9,p))}};export{m as _};