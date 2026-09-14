const WHATSAPP="5492996728355";
const products=[
{id:1,name:"Empanadas caseras",category:"Comida",price:1200,emoji:"🥟",desc:"Carne, pollo o jamón y queso."},
{id:2,name:"Docena de empanadas",category:"Combos",price:12500,emoji:"🥟",desc:"Elegí hasta tres variedades."},
{id:3,name:"Pan casero",category:"Panificados",price:2800,emoji:"🍞",desc:"Elaborado en el día."},
{id:4,name:"Torta individual",category:"Dulce",price:3500,emoji:"🍰",desc:"Porción del día."},
{id:5,name:"Combo merienda",category:"Combos",price:6500,emoji:"☕",desc:"Pan casero + torta + bebida."},
{id:6,name:"Jugo natural",category:"Bebidas",price:2500,emoji:"🧃",desc:"Sabores disponibles según temporada."}
];
let cart={};
const money=n=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n);
const categories=["Todos",...new Set(products.map(p=>p.category))];
let active="Todos";
function renderFilters(){document.querySelector("#filters").innerHTML=categories.map(c=>`<button class="filter ${c===active?"active":""}" data-cat="${c}">${c}</button>`).join("");document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();renderProducts()})}
function renderProducts(){const q=document.querySelector("#search").value.toLowerCase();const list=products.filter(p=>(active==="Todos"||p.category===active)&&(`${p.name} ${p.desc}`.toLowerCase().includes(q)));document.querySelector("#products").innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-image">${p.emoji}</div><div class="product-body"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-foot"><strong class="price">${money(p.price)}</strong><button class="add" data-id="${p.id}">+ Agregar</button></div></div></article>`).join(""):"<p>No encontramos productos con esa búsqueda.</p>";document.querySelectorAll(".add").forEach(b=>b.onclick=()=>add(+b.dataset.id))}
function add(id){cart[id]=(cart[id]||0)+1;renderCart()}
function change(id,delta){cart[id]+=delta;if(cart[id]<=0)delete cart[id];renderCart()}
function renderCart(){const ids=Object.keys(cart).map(Number);const total=ids.reduce((s,id)=>s+products.find(p=>p.id===id).price*cart[id],0);document.querySelector("#count").textContent=ids.reduce((s,id)=>s+cart[id],0);document.querySelector("#total").textContent=money(total);document.querySelector("#send").disabled=!ids.length;document.querySelector("#cart").innerHTML=ids.length?ids.map(id=>{const p=products.find(x=>x.id===id);return `<div class="cart-row"><strong>${p.name}</strong><span>${money(p.price)}</span><span class="qty"><button onclick="change(${id},-1)">−</button> ${cart[id]} <button onclick="change(${id},1)">+</button></span><button class="remove" onclick="change(${id},-${cart[id]})">Eliminar</button></div>`}).join(""):"<p class="empty">Todavía no agregaste productos.</p>"}
document.querySelector("#search").addEventListener("input",renderProducts);document.querySelector("#clear").onclick=()=>{cart={};renderCart()};document.querySelector("#send").onclick=()=>{const lines=Object.keys(cart).map(Number).map(id=>{const p=products.find(x=>x.id===id);return `• ${cart[id]} x ${p.name} — ${money(p.price*cart[id])}`});const total=Object.keys(cart).map(Number).reduce((s,id)=>s+products.find(p=>p.id===id).price*cart[id],0);const text=`Hola, quiero hacer este pedido:\n\n${lines.join("\n")}\n\nTotal estimado: ${money(total)}\n\n¿Podemos confirmar disponibilidad?`;window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,"_blank")};
renderFilters();renderProducts();renderCart();