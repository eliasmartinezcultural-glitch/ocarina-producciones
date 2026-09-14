const WHATSAPP="5492996255771";
const services=[
{id:1,name:"Diseño gráfico",category:"Diseño",icon:"✦",desc:"Piezas visuales para marcas, negocios, eventos y proyectos."},
{id:2,name:"Gigantografías",category:"Impresión",icon:"▣",desc:"Impresión de gran formato para comunicar y destacar tu marca."},
{id:3,name:"Tarjetas",category:"Impresión",icon:"▤",desc:"Tarjetas para presentar tu negocio, marca o contacto profesional."},
{id:4,name:"Folletos",category:"Impresión",icon:"▤",desc:"Folletos y piezas impresas para promociones, información y eventos."},
{id:5,name:"Cartelería",category:"Cartelería",icon:"▥",desc:"Carteles y soluciones visuales para negocios, espacios y eventos."},
{id:6,name:"Material para eventos",category:"Eventos",icon:"✦",desc:"Diseño e impresión para celebraciones, emprendimientos y eventos."},
{id:7,name:"Identidad visual",category:"Diseño",icon:"◆",desc:"Piezas coordinadas para construir una imagen clara y profesional."},
{id:8,name:"Proyecto personalizado",category:"Otros",icon:"→",desc:"Contanos qué necesitás y armamos una propuesta personalizada."}
];
let cart={};
const categories=["Todos",...new Set(services.map(s=>s.category))];
let active="Todos";
function renderFilters(){document.querySelector("#filters").innerHTML=categories.map(c=>`<button class="filter ${c===active?"active":""}" data-cat="${c}">${c}</button>`).join("");document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();renderServices()})}
function renderServices(){const q=document.querySelector("#search").value.toLowerCase().trim();const list=services.filter(s=>(active==="Todos"||s.category===active)&&(`${s.name} ${s.desc}`.toLowerCase().includes(q)));document.querySelector("#products").innerHTML=list.length?list.map(s=>`<article class="product"><div class="product-image">${s.icon}</div><div class="product-body"><span class="product-category">${s.category}</span><h3>${s.name}</h3><p>${s.desc}</p><div class="product-foot"><strong class="price">Consultar</strong><button class="add" data-id="${s.id}">+ Seleccionar</button></div></div></article>`).join(""):"<p>No encontramos servicios con esa búsqueda.</p>";document.querySelectorAll(".add").forEach(b=>b.onclick=()=>add(Number(b.dataset.id)))}
function add(id){cart[id]=(cart[id]||0)+1;renderCart();document.querySelector("#pedido").scrollIntoView({behavior:"smooth",block:"start"})}
function change(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart()}
function renderCart(){const ids=Object.keys(cart).map(Number);const count=ids.reduce((sum,id)=>sum+cart[id],0);document.querySelector("#count").textContent=count;document.querySelector("#total").textContent=ids.length;document.querySelector("#send").disabled=!ids.length;document.querySelector("#cart").innerHTML=ids.length?ids.map(id=>{const s=services.find(x=>x.id===id);return `<div class="cart-row"><strong>${s.name}</strong><span>Consultar</span><span class="qty"><button onclick="change(${id},-1)">−</button> ${cart[id]} <button onclick="change(${id},1)">+</button></span><button class="remove" onclick="change(${id},-${cart[id]})">Eliminar</button></div>`}).join(""):"<p class="empty">Todavía no seleccionaste servicios.</p>"}
document.querySelector("#search").addEventListener("input",renderServices);
document.querySelector("#clear").onclick=()=>{cart={};renderCart()};
document.querySelector("#send").onclick=()=>{const lines=Object.keys(cart).map(Number).map(id=>{const s=services.find(x=>x.id===id);return `• ${cart[id]} x ${s.name}`});const text=`Hola Market Studio, quiero consultar por estos servicios:\n\n${lines.join("\n")}\n\nQuisiera conocer opciones, medidas, cantidades y presupuesto.\n\n¡Gracias!`;window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,"_blank")};
renderFilters();renderServices();renderCart();