document.addEventListener('DOMContentLoaded',()=>{
'use strict';
const body=document.body,header=document.getElementById('siteHeader'),menu=document.getElementById('menuToggle'),nav=document.getElementById('navLinks');
const audio=document.getElementById('radioAudio'),play=document.getElementById('radioPlay'),status=document.getElementById('radioStatus'),message=document.getElementById('radioMessage'),volume=document.getElementById('radioVolume');
const stream='https://stream.zeno.fm/amfjjcz4tlgtv',whatsapp='542996728355',reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>35);
updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
const closeMenu=()=>{nav?.classList.remove('active');menu?.classList.remove('active');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menú');body.classList.remove('no-scroll')};
menu?.addEventListener('click',()=>{const open=!nav.classList.contains('active');nav.classList.toggle('active',open);menu.classList.toggle('active',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');body.classList.toggle('no-scroll',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

const scrollToTarget=(target)=>{if(!target)return;window.scrollTo({top:Math.max(0,target.getBoundingClientRect().top+window.scrollY-(header?.offsetHeight||0)-8),behavior:reduced?'auto':'smooth'});if(target.id)history.replaceState(null,'',`#${target.id}`)};
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href'),target=id&&document.querySelector(id);if(!target)return;e.preventDefault();closeMenu();scrollToTarget(target)}));

const reveal=document.querySelectorAll('.statement-grid,.section-head,.service-card,.fit-grid article,.method-grid article,.universe-card,.work-card,.territory-inner,.credentials-grid,.archive-grid,.radio-grid,.club-grid,.faq-list,.contact-inner,.portfolio-cta,.trust-grid');
reveal.forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${Math.min(i%6,5)*55}ms`});
if(!reduced&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.07,rootMargin:'0px 0px -30px 0px'});reveal.forEach(el=>observer.observe(el))}else reveal.forEach(el=>el.classList.add('visible'));

const setRadio=state=>{const states={ready:['OCARINA RADIO · LISTO','Presioná reproducir para escuchar.','▶'],connecting:['OCARINA RADIO · CONECTANDO','Conectando con la transmisión…','■'],playing:['OCARINA RADIO · EN VIVO','Transmisión en directo.','❚❚'],paused:['OCARINA RADIO · PAUSADA','La transmisión está pausada.','▶'],error:['OCARINA RADIO · SIN SEÑAL','No fue posible conectar con la transmisión.','▶']};const s=states[state]||states.ready;if(status)status.textContent=s[0];if(message)message.textContent=s[1];if(play){play.textContent=s[2];play.setAttribute('aria-label',state==='playing'?'Pausar Ocarina Radio':'Reproducir Ocarina Radio')}};
let radioReady=false;const initRadio=()=>{if(radioReady||!audio)return;audio.src=stream;audio.preload='none';audio.volume=Number(volume?.value)||.8;radioReady=true};
const startRadio=async()=>{if(!audio)return;initRadio();setRadio('connecting');try{await audio.play()}catch(err){console.warn('Ocarina Radio:',err);setRadio('error')}};
play?.addEventListener('click',()=>audio?.paused?startRadio():audio.pause());volume?.addEventListener('input',()=>{if(audio)audio.volume=Number(volume.value)});audio?.addEventListener('playing',()=>setRadio('playing'));audio?.addEventListener('waiting',()=>setRadio('connecting'));audio?.addEventListener('pause',()=>setRadio('paused'));audio?.addEventListener('error',()=>setRadio('error'));setRadio('ready');

const contact=document.getElementById('contacto');
if(contact&&!contact.querySelector('#inquiryForm')){
const style=document.createElement('style');style.textContent=`#inquiryForm{margin-top:48px;padding:28px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.13);text-align:left}#inquiryForm .inquiry-head{margin-bottom:22px}#inquiryForm h3{margin:0;font-size:1.4rem}#inquiryForm .inquiry-sub{margin:5px 0 0!important;font-size:.8rem!important;color:rgba(255,255,255,.48)!important}.inquiry-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.inquiry-field{display:flex;flex-direction:column;gap:7px}.inquiry-field.full{grid-column:1/-1}.inquiry-field label{font-size:.61rem;letter-spacing:.11em;text-transform:uppercase;color:rgba(255,255,255,.58)}.inquiry-field input,.inquiry-field select,.inquiry-field textarea{width:100%;border:1px solid rgba(255,255,255,.15);border-radius:0;background:#10171b;color:#fff;padding:12px 13px;outline:0}.inquiry-field input:focus,.inquiry-field select:focus,.inquiry-field textarea:focus{border-color:var(--accent);box-shadow:0 0 0 2px rgba(205,174,91,.16)}.inquiry-field textarea{min-height:105px;resize:vertical}.inquiry-note{margin:12px 0 0!important;font-size:.68rem!important;color:rgba(255,255,255,.4)!important}.inquiry-submit{margin-top:16px}@media(max-width:640px){#inquiryForm{padding:20px}.inquiry-grid{grid-template-columns:1fr}.inquiry-field.full{grid-column:auto}.inquiry-submit{width:100%}}`;document.head.appendChild(style);
const form=document.createElement('form');form.id='inquiryForm';form.setAttribute('aria-label','Formulario de consulta a Ocarina');form.innerHTML=`<div class="inquiry-head"><h3>Contanos qué necesitás</h3><p class="inquiry-sub">Si todavía no sabés exactamente qué formato necesitás, está bien.</p></div><div class="inquiry-grid"><div class="inquiry-field"><label for="inqName">Nombre</label><input id="inqName" name="name" autocomplete="name" required placeholder="Tu nombre"></div><div class="inquiry-field"><label for="inqContact">Contacto</label><input id="inqContact" name="contact" autocomplete="email" required placeholder="WhatsApp o email"></div><div class="inquiry-field"><label for="inqService">Necesidad</label><select id="inqService" name="service" required><option value="" selected disabled>Elegí una opción</option><option>Producción audiovisual</option><option>Fotografía</option><option>Comunicación</option><option>Historias & memoria</option><option>Territorio & turismo</option><option>Contenidos digitales</option><option>Otro / todavía no lo sé</option></select></div><div class="inquiry-field"><label for="inqTiming">Cuándo</label><input id="inqTiming" name="timing" placeholder="Fecha aproximada o sin definir"></div><div class="inquiry-field full"><label for="inqObjective">Qué querés lograr</label><textarea id="inqObjective" name="objective" required placeholder="Contanos brevemente la idea, necesidad o proyecto."></textarea></div></div><p class="inquiry-note">Al enviar, se abre WhatsApp con tu consulta. Ocarina no guarda este formulario.</p><button class="button button-primary inquiry-submit" type="submit">Preparar consulta →</button>`;
contact.querySelector('.contact-actions')?.insertAdjacentElement('afterend',form);
form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form),v=k=>String(data.get(k)||'').trim();const text=[`Hola Ocarina. Soy ${v('name')}.`,``,`Necesito: ${v('service')}.`,`Objetivo: ${v('objective')}.`,v('timing')?`Cuándo: ${v('timing')}.`:null,`Mi contacto: ${v('contact')}.`].filter(Boolean).join('\n');window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer')});
}

/* Capa funcional + dirección de arte: navegación, lectura y microinteracciones sin depender de librerías externas. */
const visualStyle=document.createElement('style');
visualStyle.textContent=`
:root{--oca-gold:#d6b56b;--oca-blue:#4b9ccf;--oca-ink:#0b1013}
html{scroll-behavior:auto}
#ocarina-progress{position:fixed;left:0;top:0;width:0;height:2px;background:linear-gradient(90deg,var(--oca-gold),var(--oca-blue));z-index:10001;box-shadow:0 0 12px rgba(214,181,107,.55);pointer-events:none}
#ocarina-grain{position:fixed;inset:-60%;z-index:9998;pointer-events:none;opacity:.035;background-image:radial-gradient(rgba(255,255,255,.7) .6px,transparent .7px);background-size:4px 4px;transform:rotate(5deg)}
.hero{position:relative;overflow:hidden;isolation:isolate}
.hero:before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(circle at 78% 28%,rgba(75,156,207,.13),transparent 27%),radial-gradient(circle at 20% 70%,rgba(214,181,107,.09),transparent 30%);pointer-events:none}
.oca-orbit{position:absolute;width:min(34vw,430px);aspect-ratio:1;border:1px solid rgba(214,181,107,.15);border-radius:50%;right:-8vw;top:12%;pointer-events:none;opacity:.75}
.oca-orbit:before{content:"";position:absolute;inset:12%;border:1px dashed rgba(75,156,207,.17);border-radius:50%}
.oca-orbit:after{content:"";position:absolute;width:8px;height:8px;border-radius:50%;background:var(--oca-gold);box-shadow:0 0 18px rgba(214,181,107,.65);left:11%;top:48%}
.oca-territory-mark{position:absolute;left:28px;bottom:42px;font-size:.55rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.38);writing-mode:vertical-rl;pointer-events:none}
.oca-corner-label{position:fixed;right:22px;bottom:18px;z-index:9997;font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.34);pointer-events:none;mix-blend-mode:screen}
.service-card,.work-card,.universe-card{position:relative;overflow:hidden;transition:transform .4s ease,border-color .4s ease,box-shadow .4s ease}
.service-card:after,.work-card:after,.universe-card:after{content:"";position:absolute;inset:-35%;background:radial-gradient(circle at var(--card-x,50%) var(--card-y,50%),rgba(214,181,107,.13),transparent 23%);opacity:0;transition:opacity .35s ease;pointer-events:none}
.service-card:hover,.work-card:hover,.universe-card:hover{transform:translateY(-5px);box-shadow:0 18px 50px rgba(0,0,0,.18)}
.service-card:hover:after,.work-card:hover:after,.universe-card:hover:after{opacity:1}
.button{transition:transform .25s ease,box-shadow .25s ease,background-color .25s ease,border-color .25s ease}.button:hover{transform:translateY(-2px)}
section[id]{scroll-margin-top:90px;position:relative}
.oca-section-index{position:absolute;right:clamp(18px,4vw,60px);top:28px;font-size:.5rem;letter-spacing:.22em;color:rgba(255,255,255,.24);pointer-events:none}
@media(max-width:700px){.oca-orbit{width:270px;right:-130px;top:18%}.oca-territory-mark{left:14px;bottom:20px}.oca-corner-label{display:none}.oca-section-index{top:18px;right:18px}}
@media(prefers-reduced-motion:reduce){#ocarina-grain{display:none}.service-card,.work-card,.universe-card,.button{transition:none}.service-card:hover,.work-card:hover,.universe-card:hover,.button:hover{transform:none}}
`;
document.head.appendChild(visualStyle);

const progress=document.createElement('div');progress.id='ocarina-progress';progress.setAttribute('aria-hidden','true');body.appendChild(progress);
const updateProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${max>0?Math.min(100,window.scrollY/max*100):0}%`};
updateProgress();window.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress,{passive:true});

const grain=document.createElement('div');grain.id='ocarina-grain';grain.setAttribute('aria-hidden','true');body.appendChild(grain);
const hero=document.querySelector('.hero');
if(hero){
 const orbit=document.createElement('div');orbit.className='oca-orbit';orbit.setAttribute('aria-hidden','true');hero.appendChild(orbit);
 const mark=document.createElement('div');mark.className='oca-territory-mark';mark.textContent='San Patricio del Chañar · Patagonia';mark.setAttribute('aria-hidden','true');hero.appendChild(mark);
 if(!reduced&&window.matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--hero-x',`${((e.clientX-r.left)/r.width)*100}%`);hero.style.setProperty('--hero-y',`${((e.clientY-r.top)/r.height)*100}%`);orbit.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*12}px,${((e.clientY-r.top)/r.height-.5)*12}px)`})}
}
const corner=document.createElement('div');corner.className='oca-corner-label';corner.textContent='Historias · personas · territorio';corner.setAttribute('aria-hidden','true');body.appendChild(corner);

document.querySelectorAll('.service-card,.work-card,.universe-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--card-x',`${((e.clientX-r.left)/r.width)*100}%`);card.style.setProperty('--card-y',`${((e.clientY-r.top)/r.height)*100}%`)})});

document.querySelectorAll('section[id]').forEach((section,i)=>{if(section.querySelector(':scope > .oca-section-index'))return;const marker=document.createElement('span');marker.className='oca-section-index';marker.textContent=String(i+1).padStart(2,'0');marker.setAttribute('aria-hidden','true');section.appendChild(marker)});

if(!document.querySelector('script[data-ocarina-schema]')){const schema=document.createElement('script');schema.type='application/ld+json';schema.dataset.ocarinaSchema='true';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Organization','name':'Ocarina Producciones','url':'https://eliasmartinezcultural-glitch.github.io/ocarina-producciones/','description':'Producción audiovisual, fotografía y comunicación con mirada territorial desde San Patricio del Chañar, Neuquén.','email':'eliasmartinezcultural@gmail.com','telephone':'+54 299 672 8355','areaServed':['San Patricio del Chañar','Neuquén','Patagonia'],'founder':{'@type':'Person','name':'Elías Martínez'}});document.head.appendChild(schema)}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
});
