/* =========================================================
OCARINA PRODUCCIONES
V16 · SCRIPT.JS
UNIVERSO OCARINA
PC + TABLET + CELULAR
========================================================= */

/* =========================================================
01 · CONFIGURACIÓN
========================================================= */

/*
IMPORTANTE:

Colocá aquí la URL REAL del streaming de Ocarina Radio.

Ejemplo:

const RADIO_STREAM_URL =
"https://servidor.com/stream";

Mientras esté vacío, el reproductor mostrará
correctamente que la señal todavía no está configurada.
*/

const RADIO_STREAM_URL = "";

/* =========================================================
02 · ELEMENTOS
========================================================= */

const body =
document.body;

const siteHeader =
document.getElementById("siteHeader");

const menuToggle =
document.getElementById("menuToggle");

const navLinks =
document.getElementById("navLinks");

const radioAudio =
document.getElementById("radioAudio");

const radioPlay =
document.getElementById("radioPlay");

const miniPlay =
document.getElementById("miniPlay");

const radioVolume =
document.getElementById("radioVolume");

const radioDisc =
document.getElementById("radioDisc");

const radioStatus =
document.getElementById("radioStatus");

const radioMessage =
document.getElementById("radioMessage");

const miniStatus =
document.getElementById("miniStatus");

const miniPlayer =
document.getElementById("miniPlayer");

/* =========================================================
03 · ESTADO
========================================================= */

let radioConfigured =
false;

let isPlaying =
false;

/* =========================================================
04 · UTILIDADES
========================================================= */

function setRadioStatus(
status,
message
) {

```
if (radioStatus) {
    radioStatus.textContent = status;
}

if (radioMessage) {
    radioMessage.textContent = message;
}

if (miniStatus) {
    miniStatus.textContent = status;
}
```

}

function updatePlayButtons() {

```
if (radioPlay) {

    radioPlay.textContent =
        isPlaying ? "❚❚" : "▶";

    radioPlay.setAttribute(
        "aria-label",
        isPlaying
            ? "Pausar Ocarina Radio"
            : "Reproducir Ocarina Radio"
    );

}


if (miniPlay) {

    miniPlay.textContent =
        isPlaying ? "❚❚" : "▶";

    miniPlay.setAttribute(
        "aria-label",
        isPlaying
            ? "Pausar Ocarina Radio"
            : "Reproducir Ocarina Radio"
    );

}
```

}

function updateRadioVisualState() {

```
if (radioDisc) {

    radioDisc.classList.toggle(
        "playing",
        isPlaying
    );

}
```

}

/* =========================================================
05 · HEADER AL HACER SCROLL
========================================================= */

function handleHeaderScroll() {

```
if (!siteHeader) {
    return;
}

if (window.scrollY > 40) {

    siteHeader.classList.add(
        "scrolled"
    );

} else {

    siteHeader.classList.remove(
        "scrolled"
    );

}
```

}

window.addEventListener(
"scroll",
handleHeaderScroll,
{
passive: true
}
);

handleHeaderScroll();

/* =========================================================
06 · MENÚ MOBILE
========================================================= */

function openMobileMenu() {

```
if (!menuToggle || !navLinks) {
    return;
}

menuToggle.classList.add(
    "active"
);

navLinks.classList.add(
    "active"
);

menuToggle.setAttribute(
    "aria-expanded",
    "true"
);

menuToggle.setAttribute(
    "aria-label",
    "Cerrar menú"
);

body.classList.add(
    "no-scroll"
);
```

}

function closeMobileMenu() {

```
if (!menuToggle || !navLinks) {
    return;
}

menuToggle.classList.remove(
    "active"
);

navLinks.classList.remove(
    "active"
);

menuToggle.setAttribute(
    "aria-expanded",
    "false"
);

menuToggle.setAttribute(
    "aria-label",
    "Abrir menú"
);

body.classList.remove(
    "no-scroll"
);
```

}

function toggleMobileMenu() {

```
if (!navLinks) {
    return;
}

if (
    navLinks.classList.contains(
        "active"
    )
) {

    closeMobileMenu();

} else {

    openMobileMenu();

}
```

}

if (menuToggle) {

```
menuToggle.addEventListener(
    "click",
    toggleMobileMenu
);
```

}

/* =========================================================
07 · CERRAR MENÚ AL ELEGIR UNA SECCIÓN
========================================================= */

if (navLinks) {

```
const navigationItems =
    navLinks.querySelectorAll(
        "a"
    );

navigationItems.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    }
);
```

}

/* =========================================================
08 · CERRAR MENÚ CON ESCAPE
========================================================= */

document.addEventListener(
"keydown",
function (event) {

```
    if (
        event.key === "Escape"
    ) {

        closeMobileMenu();

    }

}
```

);

/* =========================================================
09 · CERRAR MENÚ AL TOCAR AFUERA
========================================================= */

document.addEventListener(
"click",
function (event) {

```
    if (
        !navLinks ||
        !menuToggle
    ) {
        return;
    }


    const menuIsOpen =
        navLinks.classList.contains(
            "active"
        );


    if (!menuIsOpen) {
        return;
    }


    const clickedInsideMenu =
        navLinks.contains(
            event.target
        );


    const clickedButton =
        menuToggle.contains(
            event.target
        );


    if (
        !clickedInsideMenu &&
        !clickedButton
    ) {

        closeMobileMenu();

    }

}
```

);

/* =========================================================
10 · AJUSTE AL CAMBIAR TAMAÑO
========================================================= */

window.addEventListener(
"resize",
function () {

```
    if (
        window.innerWidth > 950
    ) {

        closeMobileMenu();

    }

}
```

);

/* =========================================================
11 · CONFIGURAR RADIO
========================================================= */

function configureRadio() {

```
if (!radioAudio) {
    return;
}


if (
    !RADIO_STREAM_URL ||
    RADIO_STREAM_URL.trim() === ""
) {

    radioConfigured =
        false;

    setRadioStatus(
        "OCARINA RADIO · PRÓXIMAMENTE",
        "La señal de streaming todavía no está configurada."
    );

    return;

}


radioAudio.src =
    RADIO_STREAM_URL;

radioAudio.preload =
    "none";

radioConfigured =
    true;

setRadioStatus(
    "OCARINA RADIO · LISTO",
    "Presioná reproducir para escuchar."
);
```

}

/* =========================================================
12 · REPRODUCIR RADIO
========================================================= */

async function playRadio() {

```
if (!radioAudio) {
    return;
}


if (!radioConfigured) {

    setRadioStatus(
        "OCARINA RADIO · PRÓXIMAMENTE",
        "La señal de streaming todavía no está configurada."
    );

    return;

}


try {

    await radioAudio.play();

} catch (error) {

    console.error(
        "No se pudo reproducir la radio:",
        error
    );

    setRadioStatus(
        "OCARINA RADIO · ERROR",
        "No fue posible iniciar la señal."
    );

}
```

}

/* =========================================================
13 · PAUSAR RADIO
========================================================= */

function pauseRadio() {

```
if (!radioAudio) {
    return;
}

radioAudio.pause();
```

}

/* =========================================================
14 · BOTÓN PRINCIPAL
========================================================= */

if (radioPlay) {

```
radioPlay.addEventListener(
    "click",
    function () {

        if (isPlaying) {

            pauseRadio();

        } else {

            playRadio();

        }

    }
);
```

}

/* =========================================================
15 · MINI REPRODUCTOR
========================================================= */

if (miniPlay) {

```
miniPlay.addEventListener(
    "click",
    function () {

        if (isPlaying) {

            pauseRadio();

        } else {

            playRadio();

        }

    }
);
```

}

/* =========================================================
16 · EVENTO PLAY
========================================================= */

if (radioAudio) {

```
radioAudio.addEventListener(
    "play",
    function () {

        isPlaying =
            true;

        setRadioStatus(
            "OCARINA RADIO · EN VIVO",
            "Reproduciendo señal de Ocarina Radio."
        );

        updatePlayButtons();

        updateRadioVisualState();

    }
);
```

}

/* =========================================================
17 · EVENTO PAUSE
========================================================= */

if (radioAudio) {

```
radioAudio.addEventListener(
    "pause",
    function () {

        isPlaying =
            false;

        setRadioStatus(
            "OCARINA RADIO · PAUSADO",
            "La reproducción está pausada."
        );

        updatePlayButtons();

        updateRadioVisualState();

    }
);
```

}

/* =========================================================
18 · EVENTO ERROR
========================================================= */

if (radioAudio) {

```
radioAudio.addEventListener(
    "error",
    function () {

        isPlaying =
            false;

        updatePlayButtons();

        updateRadioVisualState();

        setRadioStatus(
            "OCARINA RADIO · ERROR",
            "No se pudo conectar con la señal."
        );

    }
);
```

}

/* =========================================================
19 · CAMBIO DE VOLUMEN
========================================================= */

if (radioVolume && radioAudio) {

```
const initialVolume =
    Number(
        radioVolume.value
    );


radioAudio.volume =
    Number.isFinite(
        initialVolume
    )
        ? initialVolume
        : 0.8;


radioVolume.addEventListener(
    "input",
    function () {

        const volume =
            Number(
                radioVolume.value
            );


        if (
            Number.isFinite(
                volume
            )
        ) {

            radioAudio.volume =
                Math.min(
                    1,
                    Math.max(
                        0,
                        volume
                    )
                );

        }

    }
);
```

}

/* =========================================================
20 · VISIBILIDAD DEL MINI PLAYER
========================================================= */

function updateMiniPlayer() {

```
if (!miniPlayer) {
    return;
}


/*
   Lo mantenemos visible porque funciona como
   acceso permanente a la radio.
*/

miniPlayer.classList.add(
    "visible"
);
```

}

updateMiniPlayer();

/* =========================================================
21 · SMOOTH SCROLL MEJORADO
========================================================= */

document.querySelectorAll(
'a[href^="#"]'
).forEach(
function (link) {

```
    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute(
                    "href"
                );


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top
                +
                window.scrollY
                -
                headerHeight
                -
                10;


            window.scrollTo({

                top:
                    Math.max(
                        0,
                        targetPosition
                    ),

                behavior:
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth"

            });

        }
    );

}
```

);

/* =========================================================
22 · CERRAR MENÚ SI SE CAMBIA A ESCRITORIO
========================================================= */

function checkDesktopNavigation() {

```
if (
    window.innerWidth > 950
) {

    closeMobileMenu();

}
```

}

checkDesktopNavigation();

/* =========================================================
23 · ESTADO INICIAL
========================================================= */

configureRadio();

updatePlayButtons();

updateRadioVisualState();

/* =========================================================
24 · LOG
========================================================= */

console.log(
"Ocarina Universo V16 · JavaScript cargado correctamente."
);
