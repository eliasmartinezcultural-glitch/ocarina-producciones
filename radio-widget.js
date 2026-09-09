(() => {
  'use strict';
  if (window.__ocarinaRadioWidget) return;
  window.__ocarinaRadioWidget = true;

  const base = (document.currentScript?.src || '').replace(/radio-widget\.js(?:\?.*)?$/, '');
  const visual = document.createElement('link');
  visual.rel = 'stylesheet';
  visual.href = base + 'visual.css';
  document.head.appendChild(visual);
  const pageVisual = document.createElement('link');
  pageVisual.rel = 'stylesheet';
  pageVisual.href = base + 'visual-pages.css';
  document.head.appendChild(pageVisual);

  const STREAM = 'https://stream.zeno.fm/amfjjcz4tlgtv';
  const root = document.createElement('div');
  root.id = 'ocarina-radio-widget';
  root.innerHTML = `<div class="orw-panel" role="region" aria-label="Ocarina Radio"><button class="orw-play" type="button" aria-label="Reproducir Ocarina Radio" aria-pressed="false">▶</button><div class="orw-copy"><strong>OCARINA RADIO</strong><span class="orw-status" role="status" aria-live="polite">Listo para escuchar</span></div><label class="orw-volume"><span class="sr-only">Volumen</span><input type="range" min="0" max="1" step="0.05" value="0.8" aria-label="Volumen de Ocarina Radio"></label><button class="orw-close" type="button" aria-label="Ocultar reproductor">×</button></div>`;
  document.body.appendChild(root);

  const style = document.createElement('style');
  style.textContent = `#ocarina-radio-widget{position:fixed;right:18px;bottom:18px;z-index:90;max-width:calc(100vw - 36px);font-family:inherit}#ocarina-radio-widget .orw-panel{display:flex;align-items:center;gap:12px;padding:10px 12px;background:rgba(11,16,19,.94);color:#fff;border:1px solid rgba(255,255,255,.14);box-shadow:0 16px 50px rgba(0,0,0,.28);backdrop-filter:blur(14px);border-radius:999px}#ocarina-radio-widget .orw-play{width:38px;height:38px;border:1px solid rgba(255,255,255,.2);border-radius:50%;background:#b99b68;color:#0b1013;cursor:pointer;font-weight:900}#ocarina-radio-widget .orw-copy{display:flex;flex-direction:column;min-width:145px;gap:2px}#ocarina-radio-widget .orw-copy strong{font-size:.63rem;letter-spacing:.14em}#ocarina-radio-widget .orw-status{font-size:.66rem;color:rgba(255,255,255,.62);white-space:nowrap}#ocarina-radio-widget .orw-volume input{width:75px;accent-color:#b99b68}#ocarina-radio-widget .orw-close{border:0;background:transparent;color:rgba(255,255,255,.55);font-size:1.25rem;cursor:pointer;padding:3px 5px}@media(max-width:620px){#ocarina-radio-widget{right:10px;left:10px;bottom:10px;max-width:none}#ocarina-radio-widget .orw-panel{width:100%;border-radius:14px}.orw-volume input{width:62px!important}.orw-copy{min-width:0!important;flex:1}.orw-status{overflow:hidden;text-overflow:ellipsis}}@media(prefers-reduced-motion:reduce){#ocarina-radio-widget *{scroll-behavior:auto!important}}`;
  document.head.appendChild(style);

  const audio = document.createElement('audio'); audio.preload='none'; audio.volume=.8; document.body.appendChild(audio);
  const play=root.querySelector('.orw-play'),status=root.querySelector('.orw-status'),volume=root.querySelector('input[type="range"]'),close=root.querySelector('.orw-close'); let timer=null;
  const setStatus=t=>status.textContent=t;
  const setPlaying=p=>{play.textContent=p?'❚❚':'▶';play.setAttribute('aria-pressed',String(p));play.setAttribute('aria-label',p?'Pausar Ocarina Radio':'Reproducir Ocarina Radio')};
  const stopTimer=()=>{if(timer){clearTimeout(timer);timer=null}};
  async function start(){stopTimer();setStatus('Conectando…');play.disabled=true;try{if(!audio.src)audio.src=STREAM;const attempt=audio.play();timer=setTimeout(()=>{if(audio.paused)setStatus('La transmisión tarda en responder. Probá nuevamente.');play.disabled=false},9000);await attempt;stopTimer();setPlaying(true);setStatus('En vivo · Ocarina Radio')}catch(e){stopTimer();setPlaying(false);setStatus('No se pudo iniciar. Probá nuevamente.')}finally{play.disabled=false}}
  function pause(){stopTimer();audio.pause();setPlaying(false);setStatus('Pausado')}
  play.addEventListener('click',()=>audio.paused?start():pause());volume.addEventListener('input',()=>audio.volume=Number(volume.value));close.addEventListener('click',()=>{pause();root.remove()});audio.addEventListener('playing',()=>{stopTimer();setPlaying(true);setStatus('En vivo · Ocarina Radio')});audio.addEventListener('waiting',()=>setStatus('Recibiendo transmisión…'));audio.addEventListener('pause',()=>{if(!audio.ended)setPlaying(false)});audio.addEventListener('error',()=>{stopTimer();setPlaying(false);setStatus('Transmisión no disponible ahora.')});
})();
