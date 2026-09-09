document.addEventListener('DOMContentLoaded',()=>{
'use strict';

// Portfolio: evita cargar cuatro iframes de YouTube al mismo tiempo.
document.querySelectorAll('.work-card .video iframe').forEach((frame)=>{
  const src=frame.getAttribute('src');
  if(!src)return;
  const id=(src.match(/embed\/([^?]+)/)||[])[1];
  if(!id)return;
  const holder=document.createElement('button');
  holder.type='button';
  holder.className='video-lazy';
  holder.setAttribute('aria-label',`Reproducir ${frame.title||'producción audiovisual'}`);
  holder.innerHTML=`<span class="video-lazy-image" style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')"></span><span class="video-lazy-play" aria-hidden="true">▶</span><span class="video-lazy-label">Ver producción</span>`;
  frame.replaceWith(holder);
  holder.addEventListener('click',()=>{
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title=holder.getAttribute('aria-label');
    iframe.loading='lazy';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen=true;
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    holder.replaceWith(iframe);
  },{once:true});
});

// Navegación: marca la sección visible sin alterar el menú móvil.
const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
const targets=links.map(a=>({a,id:a.getAttribute('href').slice(1)})).filter(x=>document.getElementById(x.id));
if('IntersectionObserver' in window && targets.length){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      targets.forEach(({a})=>a.classList.remove('current'));
      const hit=targets.find(x=>x.id===entry.target.id);
      hit?.a.classList.add('current');
    });
  },{rootMargin:'-25% 0px -65% 0px',threshold:0});
  targets.forEach(({id})=>observer.observe(document.getElementById(id)));
}

// Año automático para cualquier elemento preparado.
document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());

// Seguridad y consistencia para enlaces externos.
document.querySelectorAll('a[target="_blank"]').forEach(a=>{
  a.rel='noopener noreferrer';
});
});
