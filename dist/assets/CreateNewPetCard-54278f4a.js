import{r as s,o as r,c as d,a as o,i as y,e as h,E as $,C as k,G as b,v as I,w as q,l as f,q as w,T as P,t as C,f as m,A as g,p as S,z as V,s as x,B as T}from"./index-c67b4149.js";import{_ as U}from"./AuthentificationButton-f6286652.js";const D={class:"pet-type"},A=o("p",{class:"pet-type__title"},"Выберите вид животного",-1),B={class:"pet-type__items"},E={style:{"margin-right":"24px"}},F={style:{"margin-right":"24px"}},G={__name:"PetType",emits:["change-pet-type"],setup(_,{emit:i}){const e=s(""),t=()=>{console.log(e.value),i("change-pet-type","type",e.value)};return(l,a)=>(r(),d("main",D,[A,o("div",B,[o("label",E,[y("Кот "),h(o("input",{type:"radio",value:"Кот","onUpdate:modelValue":a[0]||(a[0]=n=>e.value=n),onChange:t},null,544),[[$,e.value]])]),o("label",F,[y("Собака "),h(o("input",{type:"radio",value:"Собака","onUpdate:modelValue":a[1]||(a[1]=n=>e.value=n),onChange:t},null,544),[[$,e.value]])]),o("label",null,[y("Птица "),h(o("input",{type:"radio",value:"Птица","onUpdate:modelValue":a[2]||(a[2]=n=>e.value=n),onChange:t},null,544),[[$,e.value]])])])]))}};const O={class:"pet-gender"},j=o("p",{class:"pet-gender__title"},"Выберите пол животного",-1),z={class:"pet-gender__items"},J={style:{"margin-right":"24px"}},M={__name:"PetGender",emits:["change-pet-gender"],setup(_,{emit:i}){const e=s(""),t=()=>{console.log(e.value),i("change-pet-gender","gender",e.value)};return(l,a)=>(r(),d("main",O,[j,o("div",z,[o("label",J,[y("Мальчик "),h(o("input",{type:"radio",value:"Мальчик","onUpdate:modelValue":a[0]||(a[0]=n=>e.value=n),onChange:t},null,544),[[$,e.value]])]),o("label",null,[y("Девочка "),h(o("input",{type:"radio",value:"Девочка","onUpdate:modelValue":a[1]||(a[1]=n=>e.value=n),onChange:t},null,544),[[$,e.value]])])])]))}};const K={class:"pet-name"},Q=o("p",{class:"pet-name__title"},"Введите имя животного",-1),R={__name:"PetName",emits:["change-pet-name","validate-error"],setup(_,{emit:i}){k(a=>({"4998d65b":t.value}));const e=s(""),t=s("#000");return b(()=>{if(console.log(e.value.length,e.value),e.value.length>0&&/^[а-яА-ЯёЁ]{2,}$/.test(e.value)){i("change-pet-name","name",e.value);return}t.value="#ff0000",i("validate-error","В имени животного могут присутствовать только заглавные и прописные буквы русского алфавита, а также пробел и дефис.")},"Enter"),(a,n)=>(r(),d("main",K,[Q,h(o("input",{type:"text","onUpdate:modelValue":n[0]||(n[0]=u=>e.value=u),placeholder:"Имя",class:"pet-name__input",onInput:n[1]||(n[1]=u=>t.value="#000")},null,544),[[I,e.value]])]))}},H="/petifyShelter/assets/upload-8009e9e0.svg";const L={class:"pet-avatar"},W=o("p",{class:"pet-avatar__title"},"Загрузите основное фото животного",-1),X={class:"pet-avatar__download"},Y=o("img",{src:H,alt:"img-upload",width:"50"},null,-1),Z={class:"pet-avatar__label"},ee={__name:"PetAvatar",emits:["change-pet-avatar"],setup(_,{emit:i}){s("");const e=t=>{const l=JSON.stringify({avatar:"http://localhost:4000/img/imgcat8.jpg",type:"Кот",gender:"Мальчик",name:"Пушок",age:"2018-11-11",breeds:["Турецкий ван"],weight:4,height:30,sterilized:!0,vaccinated:!0,features:["общительная","спокойная","ласковая"],bio:"Пушок-отличная кошка. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",shelter:{id:"6736dfggfапgff",name:"Теремок",description:"Приют",address:"Калининград"}}),a=t.target.files[0];i("change-pet-avatar","avatar",a);const n=new FormData;n.append("newPet",l),n.append("avatar",a),(async()=>await fetch("http://localhost:4000/api/v1/newpet",{method:"POST",body:n}))()};return(t,l)=>(r(),d("main",L,[W,o("div",X,[Y,o("label",Z,[y("Выберите файл"),o("input",{type:"file",accept:"image/*",class:"pet-avatar__input",onChange:e},null,32)])])]))}};const te={class:"new-pet-card-fill"},ae=o("p",{class:"new-pet-card-fill__title"},"Создание карточки питомца",-1),ne={key:0,class:"new-pet-card-fill__enformation-sign"},se={__name:"FillNewPetCard",props:{currentItem:{type:String,required:!0}},emits:["change-item"],setup(_,{emit:i}){const e=_,t=s(""),l=s("type"),a=(n,u)=>{console.log(n,u),i("change-item",n,u)};return q(()=>e.currentItem,()=>l.value=e.currentItem),(n,u)=>(r(),d("div",te,[f(P,{appear:"",name:"new-pet-card-title"},{default:w(()=>[ae]),_:1}),f(P,{appear:"",name:"new-pet-card-fill-item"},{default:w(()=>[l.value==="type"?(r(),g(G,{key:0,onChangePetType:u[0]||(u[0]=(c,p)=>{a(c,p),l.value="gender"})})):m("",!0)]),_:1}),f(P,{name:"new-pet-card-fill-item"},{default:w(()=>[l.value==="gender"?(r(),g(M,{key:0,onChangePetGender:u[1]||(u[1]=(c,p)=>{a(c,p),l.value="name"})})):m("",!0)]),_:1}),f(P,{name:"new-pet-card-fill-item"},{default:w(()=>[l.value==="name"?(r(),g(R,{key:0,onChangePetName:u[2]||(u[2]=(c,p)=>{a(c,p),l.value="avatar"}),onValidateError:u[3]||(u[3]=c=>t.value=c)})):m("",!0)]),_:1}),t.value?(r(),d("div",ne," * "+C(t.value),1)):m("",!0),f(P,{name:"new-pet-card-fill-item"},{default:w(()=>[l.value==="avatar"?(r(),g(ee,{key:0,onChangePetAvatar:u[4]||(u[4]=(c,p)=>{a(c,p),l.value="type"})})):m("",!0)]),_:1})]))}};const oe={class:"new-pets-card-show"},le={__name:"ShowNewPetCard",props:{newPet:{type:Object,required:!0}},emits:["get-current-item"],setup(_){const i=_;return(e,t)=>(r(),d("div",oe,[i.newPet.type?(r(),d("div",{key:0,onClick:t[0]||(t[0]=l=>e.$emit("get-current-item","type")),class:"new-pets-card-show__item"}," Вид : "+C(i.newPet.type),1)):m("",!0),i.newPet.gender?(r(),d("div",{key:1,onClick:t[1]||(t[1]=l=>e.$emit("get-current-item","gender")),class:"new-pets-card-show__item"}," Пол : "+C(i.newPet.gender),1)):m("",!0),i.newPet.name?(r(),d("div",{key:2,lang:"ru",onClick:t[2]||(t[2]=l=>e.$emit("get-current-item","name")),class:"new-pets-card-show__item"}," Имя: "+C(i.newPet.name),1)):m("",!0)]))}};const re={class:"new-pet-card"},ie={key:0,class:"new-pet-card-information-sign"},ue=o("p",null,"Вы находитесь в демо режиме.",-1),pe=o("p",null,"Для создания карточки необходимо авторизироваться.",-1),me=[ue,pe],_e={__name:"CreateNewPetCard",setup(_){const i=S(),e=s(""),t=s({});s(""),s("");const l=s("");s(""),s(""),s(""),s("");const a=s(!1);s(!1),s(""),s(""),s(""),s("");const n=V(()=>Object.keys(t.value).length===13);s("type");const u=s("");if(q(a,()=>{console.log(a.value)}),q(l,()=>{console.log(l.value)}),localStorage.getItem("newPet")){const p=JSON.parse(localStorage.getItem("newPet"));for(let v in p)t.value[v]=p[v]}const c=(p,v)=>{p!=="avatar"?(t.value[p]=v,localStorage.setItem("newPet",JSON.stringify(t.value)),console.log(t.value)):new FormData().append("avatar",v)};return(p,v)=>(r(),d("main",re,[x(i).authentificated?m("",!0):(r(),d("div",ie,me)),e.value?(r(),g(T,{key:1,message:e.value},null,8,["message"])):m("",!0),e.value?m("",!0):(r(),g(se,{key:2,onChangeItem:c,currentItem:u.value},null,8,["currentItem"])),e.value?m("",!0):(r(),g(le,{key:3,newPet:t.value,onGetCurrentItem:v[0]||(v[0]=N=>u.value=N)},null,8,["newPet"])),x(n)?(r(),g(U,{key:4,buttonName:"Создать",isCorrectNewUserInformation:!0,onAuthentification:p.createNewPetCard},null,8,["onAuthentification"])):m("",!0)]))}};export{_e as default};
