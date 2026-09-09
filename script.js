document.addEventListener('DOMContentLoaded',()=>{
  'use strict';
  const body=document.body;
  const header=document.getElementById('siteHeader');
  const menu=document.getElementById('menuToggle');
  const nav=document.getElementById('navLinks');
  const audio=document.getElementById('radioAudio');
  const play=document.getElementById('radioPlay');
  const status=document.getElementById('radioStatus');
  const message=document.getElementById('radioMessage');
  const volume=document.getElementById('radioVolume');
  const stream='https://stream.zeno.fm/amfjjcz4tlgtv';
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>35);
  updateHeader();
  window.addEventListener('scroll',updateHeader,{passive:true});

  const closeMenu=()=>{
    nav?.classList.remove('active'); menu?.classList.remove('active');
    menu?.setAttribute('aria-expanded','false'); body.classList.remove('no-scroll');
  };
  menu?.addEventListener('click',()=>{
    const open=nav?.classList.toggle('active');
    menu.classList.toggle('active',open);
    menu.setAttribute('aria-expanded',String(!!open));
    body.classList.toggle('no-scroll',!!open);
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href'); if(!id||id==='#')return;
    const target=document.querySelector(id); if(!target)return;
    e.preventDefault();
    const top=target.getBoundingClientRect().top+window.scrollY-(header?.offsetHeight||0)-10;
    window.scrollTo({top:Math.max(0,top),behavior:reduced?'auto':'smooth'});
  }));

  const reveal=document.querySelectorAll('.statement-grid,.section-head,.service-card,.universe-card,.work-card,.territory-inner,.archive-grid,.radio-grid,.club-grid,.contact-inner');
  reveal.forEach(el=>el.classList.add('reveal'));
  if(!reduced&&'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
    }),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
    reveal.forEach(el=>observer.observe(el));
  }else reveal.forEach(el=>el.classList.add('visible'));

  const setRadio=(state)=>{
    const states={
      ready:['OCARINA RADIO · LISTO','Presioná reproducir para escuchar.','▶'],
      connecting:['OCARINA RADIO · CONECTANDO','Conectando con la transmisión…','■'],
      playing:['OCARINA RADIO · EN VIVO','Transmisión en directo.','❚❚'],
      paused:['OCARINA RADIO · PAUSADA','La transmisión está pausada.','▶'],
      error:['OCARINA RADIO · SIN SEÑAL','No fue posible conectar con la transmisión.','▶']
    };
    const s=states[state]||states.ready;
    if(status)status.textContent=s[0]; if(message)message.textContent=s[1];
    if(play){play.textContent=s[2];play.setAttribute('aria-label',state==='playing'?'Pausar Ocarina Radio':'Reproducir Ocarina Radio')}
  };
  let initialized=false;
  const initRadio=()=>{if(initialized||!audio)return;audio.src=stream;audio.preload='none';audio.volume=Number(volume?.value)||.8;initialized=true};
  const start=async()=>{if(!audio)return;initRadio();setRadio('connecting');try{await audio.play()}catch(err){console.warn('Ocarina Radio:',err);setRadio('error')}};
  play?.addEventListener('click',()=>audio?.paused?start():audio.pause());
  volume?.addEventListener('input',()=>{if(audio)audio.volume=Number(volume.value)});
  audio?.addEventListener('playing',()=>setRadio('playing'));
  audio?.addEventListener('waiting',()=>setRadio('connecting'));
  audio?.addEventListener('pause',()=>setRadio('paused'));
  audio?.addEventListener('error',()=>setRadio('error'));
  setRadio('ready');
  const year=document.getElementById('year'); if(year)year.textContent=new Date().getFullYear();
});