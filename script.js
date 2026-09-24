const people=[
{id:0,name:"三浦翔平",img:"三浦翔平.jpg"},
{id:1,name:"中村倫也",img:"中村倫也.jpg"},
{id:2,name:"千葉雄大",img:"千葉雄大.jpg"},
{id:3,name:"吉沢亮",img:"吉沢亮.jpg"},
{id:4,name:"坂口健太郎",img:"坂口健太郎.jpg"},
{id:5,name:"山田裕貴",img:"山田裕貴.jpeg"},
{id:6,name:"杉野遥亮",img:"杉野遥亮.jpg"},
{id:7,name:"松坂桃李",img:"松坂桃李.jpg"},
{id:8,name:"横浜流星",img:"横浜流星.webp"},
{id:9,name:"瀬戸康史",img:"瀬戸康史.jpg"},
{id:10,name:"犬飼貴丈",img:"犬飼貴丈.jpg"},
{id:11,name:"町田啓太",img:"町田啓太.webp"},
{id:12,name:"磯村勇斗",img:"磯村勇斗.jpg"},
{id:13,name:"神木隆之介",img:"神木隆之介.jpg"},
{id:14,name:"竜星涼",img:"竜星涼.jpg"},
{id:15,name:"竹内涼真",img:"竹内涼真.jpg"},
{id:16,name:"菅田将暉",img:"菅田将暉.jpg"},
{id:17,name:"赤楚衛二",img:"赤楚衛二.jpg"},
{id:18,name:"鈴木伸之",img:"鈴木伸之.jpg"},
{id:19,name:"間宮祥太朗",img:"間宮祥太朗.jpg"},
{id:20,name:"高杉真宙",img:"高杉真宙.webp"}
];
const app=document.querySelector("#app");let groups=[],survivors=[],picked=[];
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const card=p=>`<button class="card" id="p${p.id}" onclick="pick(${p.id})"><span class="check">✓</span><img src="${p.img}"><div class="name">${p.name}</div></button>`;
function start(){groups=[];survivors=[];picked=[];let a=shuffle(people);while(a.length)groups.push(a.splice(0,4));pre(0)}
function home(){app.innerHTML=`<section class="screen start"><h1>30代俳優さん好き顔9選</h1><div class="sub">日本俳優</div><button class="btn" onclick="start()">START</button><p class="note">現在は10枚のテスト画像です</p></section>`}
function pre(n){if(n>=groups.length){second(0,shuffle(survivors));return}picked=[];let g=groups[n];app.innerHTML=`<section class="screen"><h2 class="title">ROUND 1｜予選</h2><p class="sub" style="text-align:center">最大3人まで。0人でもOK。</p><div class="grid">${g.map(card).join("")}</div><div style="text-align:center"><button class="btn" onclick="nextPre(${n})">次へ</button></div></section>`}
window.pick=id=>{let el=document.querySelector("#p"+id);if(picked.includes(id)){picked=picked.filter(x=>x!==id);el.classList.remove("selected")}else if(picked.length<3){picked.push(id);el.classList.add("selected")}};
function nextPre(n){survivors.push(...groups[n].filter(p=>picked.includes(p.id)));pre(n+1)}
function second(n,pool){if(n>=pool.length){final(shuffle(pool));return}let g=pool.slice(n,n+4);if(g.length<2){final(shuffle(pool));return}let first=null,second=null;app.innerHTML=`<section class="screen"><h2 class="title">ROUND 2｜本選</h2><p class="sub" style="text-align:center">第1位と第2位を選んでください</p><div class="grid">${g.map(card).join("")}</div><div style="text-align:center"><button class="btn" id="ok" disabled>決定</button></div></section>`;window.pick=id=>{let el=document.querySelector("#p"+id);if(!first){first=id;el.classList.add("selected")}else if(id===first){first=null;el.classList.remove("selected")}else if(!second){second=id;el.classList.add("selected")}else{document.querySelector("#p"+second).classList.remove("selected");second=id;el.classList.add("selected")}if(first&&second){document.querySelector("#ok").disabled=false;document.querySelector("#ok").onclick=()=>{let a=g.find(p=>p.id===first),b=g.find(p=>p.id===second);let rest=pool.slice(n+4);second(0,shuffle([a,b,...rest]))}}}}
function final(pool){let candidates=pool.slice(0,9);if(candidates.length<9){result(candidates);return}let i=0,w=[];function duel(){if(w.length>=9){result(w);return}let a=shuffle([w.length? w[w.length-1]:pool[i],pool[i+1+(w.length?0:0)]].filter(Boolean));app.innerHTML=`<section class="screen"><h2 class="title">FINAL｜一対一</h2><p class="sub" style="text-align:center">どちらの顔が好き？</p><div class="grid">${a.map(card).join("")}</div></section>`;window.pick=id=>{let win=a.find(p=>p.id===id);if(w.length)w[w.length-1]=win;else w.push(win);i++;duel()}}duel()}
function result(a){app.innerHTML=`<section class="screen"><h2 class="title">30代俳優さん好き顔9選</h2><p class="sub" style="text-align:center">YOUR TOP 9</p><div class="result">${a.slice(0,9).map((p,i)=>`<div><img src="${p.img}"><div>${i+1}｜${p.name}</div></div>`).join("")}</div><div style="text-align:center"><button class="btn" onclick="home()">もう一回やる</button></div></section>`}
home();
