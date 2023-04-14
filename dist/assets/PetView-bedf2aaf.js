import{u as P,r as g,o as i,c as r,a as b,b as w,d as n,e as a,t,f as s,F as S,g as V,n as l,h as F,i as x,j as c}from"./index-9062ef42.js";const B={class:"pet-page"},N={key:0,class:"pet-page-avatar-discription"},j={class:"pet-page-avatar-discription__field-for-avatar"},z=["src"],L={class:"pet-page-avatar-discription__discription"},$={class:"pet-page-avatar-discription__discription-name-age"},A={class:"pet-page-avatar-discription__discription-features"},E={class:"pet-page-avatar-discription__all-discription"},D={key:0},T={key:0,class:"pet-page-avatar-discription__all-discription-location"},q=a("p",null,"Питомец находится:",-1),G={class:"pet-page-avatar-discription__all-discription-location-location"},H={class:"pet-page-avatar-discription__all-discription-story"},J={__name:"PetView",props:{id:String},setup(C){const h=C,m=P(),e=g({});let f="",u="",v="";const p=g(""),d=g(""),y=()=>{f=x(e.value.age),e.value.sterilized?u="Да":u="Нет",e.value.vaccinated?v="Да":v="Нет"};if(m.petsList.length){for(let o of m.petsList)o._id===h.id&&(e.value=o);y()}else(async()=>{try{let o=await fetch(`https://petify-shelter-back.onrender.com/api/v1/pet/${h.id}`,{credentials:"include"}),_=await o.json();o.ok?(_==="pet not found"?d.value="По вашему id животных в нашем каталоге не найдено. Попробуйте изменить id или начните поиск на главной странице с помощью фильтров.":e.value=_,y()):(console.error(_),p.value="Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз.")}catch(o){console.error(o.message),p.value="Сервер не отвечает! Перезагрузите страницу и попробуйте ещё раз."}})();return(o,_)=>(i(),r("main",null,[p.value?(i(),b(w,{key:0,message:p.value},null,8,["message"])):n("",!0),d.value?(i(),b(w,{key:1,message:d.value},null,8,["message"])):n("",!0),a("div",B,[!p.value&&!d.value?(i(),r("div",N,[a("div",j,[a("img",{src:e.value.avatar,alt:"img-profile",class:"pet-page-avatar-discription__avatar"},null,8,z)]),a("div",L,[a("p",$,t(e.value.name)+", "+t(s(f)),1),a("div",A,[(i(!0),r(S,null,V(e.value.features,k=>(i(),r("p",{key:k.id,class:"pet-page-avatar-discription__discription-features-feature",style:l({backgroundColor:s(c)()})},t(k),5))),128))]),a("div",E,[a("p",{class:"pet-page-avatar-discription__all-discription-item",style:l({backgroundColor:s(c)()})}," Пол: "+t(e.value.gender),5),e.value.breeds?(i(),r("div",{key:0,class:"pet-page-avatar-discription__all-discription-item",style:l({backgroundColor:s(c)()})},[a("p",null,"Порода: "+t(e.value.breeds[0]),1),e.value.breeds[1]?(i(),r("p",D,", "+t(e.value.breeds[1]),1)):n("",!0)],4)):n("",!0),a("p",{class:"pet-page-avatar-discription__all-discription-item",style:l({backgroundColor:s(c)()})}," Вес: "+t(e.value.weight)+"кг ",5),a("p",{class:"pet-page-avatar-discription__all-discription-item",style:l({backgroundColor:s(c)()})}," Рост: "+t(e.value.height)+"см ",5),a("p",{class:"pet-page-avatar-discription__all-discription-item",style:l({backgroundColor:s(c)()})}," Стерилизация: "+t(s(u)),5),a("p",{class:"pet-page-avatar-discription__all-discription-item",style:l({backgroundColor:s(c)()})}," Вакцинация: "+t(s(v)),5)]),e.value.shelter?(i(),r("div",T,[q,F("   "),a("p",G,t(e.value.shelter.description)+' "'+t(e.value.shelter.name)+'" (г. '+t(e.value.shelter.address)+") ",1)])):n("",!0),a("p",H,t(e.value.bio),1)])])):n("",!0)])]))}};export{J as default};
