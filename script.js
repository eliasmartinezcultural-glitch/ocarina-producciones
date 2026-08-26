/* =====================================================
   OCARINA PRODUCCIONES
   V3 · MOTOR CINEMATIC MULTIMEDIA
===================================================== */


/* =====================================================
   ELEMENTOS
===================================================== */

const audio = document.getElementById("radioAudio");

const radioPlay = document.getElementById("radioPlay");
const miniPlay = document.getElementById("miniPlay");

const radioStatus = document.getElementById("radioStatus");
const radioMessage = document.getElementById("radioMessage");
const miniStatus = document.getElementById("miniStatus");

const radioVolume = document.getElementById("radioVolume");

const radioDisc = document.querySelector(".radio-disc");

const siteHeader = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


/* =====================================================
   CONFIGURACIÓN RADIO
===================================================== */

const RADIO_STREAM =
    "https://stream.zeno.fm/amfjjcz4tlgtv";


/* =====================================================
   CONFIGURACIÓN INICIAL
===================================================== */

if (audio) {

    audio.src = RADIO_STREAM;

    audio.preload = "none";

}


/* =====================================================
   ESTADO
===================================================== */

let radioPlaying = false;


/* =====================================================
   VOLUMEN
===================================================== */

const savedVolume =
    localStorage.getItem("ocarinaRadioVolume");

if (savedVolume !== null) {

    const volume =
        parseFloat(savedVolume);

    if (!Number.isNaN(volume)) {

        audio.volume = volume;

        if (radioVolume) {
            radioVolume.value = volume;
        }

    }

} else {

    audio.volume = 0.8;

}


/* =====================================================
   ACTUALIZAR INTERFAZ
===================================================== */

function updateRadioInterface(state) {

    if (!radioPlay || !miniPlay) {
        return;
    }


    switch (state) {


        /* ---------------------------------------------
           REPRODUCIENDO
        --------------------------------------------- */

        case "playing":

            radioPlaying = true;

            radioPlay.textContent = "❚❚";
            miniPlay.textContent = "❚❚";

            radioPlay.setAttribute(
                "aria-label",
                "Pausar Radio Ocarina"
            );

            miniPlay.setAttribute(
                "aria-label",
                "Pausar Radio Ocarina"
            );


            if (radioStatus) {

                radioStatus.textContent =
                    "RADIO OCARINA · EN VIVO";

            }


            if (radioMessage) {

                radioMessage.textContent =
                    "Transmitiendo en vivo.";

            }


            if (miniStatus) {

                miniStatus.textContent =
                    "EN VIVO";

            }


            if (radioDisc) {

                radioDisc.classList.add(
                    "playing"
                );

            }

            break;



        /* ---------------------------------------------
           PAUSADO
        --------------------------------------------- */

        case "paused":

            radioPlaying = false;

            radioPlay.textContent = "▶";
            miniPlay.textContent = "▶";

            radioPlay.setAttribute(
                "aria-label",
                "Reproducir Radio Ocarina"
            );

            miniPlay.setAttribute(
                "aria-label",
                "Reproducir Radio Ocarina"
            );


            if (radioStatus) {

                radioStatus.textContent =
                    "RADIO OCARINA · PAUSADA";

            }


            if (radioMessage) {

                radioMessage.textContent =
                    "La transmisión está pausada.";

            }


            if (miniStatus) {

                miniStatus.textContent =
                    "PAUSADA";

            }


            if (radioDisc) {

                radioDisc.classList.remove(
                    "playing"
                );

            }

            break;



        /* ---------------------------------------------
           CARGANDO
        --------------------------------------------- */

        case "loading":

            if (radioStatus) {

                radioStatus.textContent =
                    "RADIO OCARINA · CONECTANDO...";

            }


            if (radioMessage) {

                radioMessage.textContent =
                    "Conectando con la transmisión.";

            }


            if (miniStatus) {

                miniStatus.textContent =
                    "CONECTANDO";

            }

            break;



        /* ---------------------------------------------
           ERROR
        --------------------------------------------- */

        case "error":

            radioPlaying = false;

            radioPlay.textContent = "▶";
            miniPlay.textContent = "▶";

            if (radioStatus) {

                radioStatus.textContent =
                    "RADIO OCARINA · SIN SEÑAL";

            }


            if (radioMessage) {

                radioMessage.textContent =
                    "No se pudo conectar con la transmisión.";

            }


            if (miniStatus) {

                miniStatus.textContent =
                    "SIN SEÑAL";

            }


            if (radioDisc) {

                radioDisc.classList.remove(
                    "playing"
                );

            }

            break;



        /* ---------------------------------------------
           DETENIDO
        --------------------------------------------- */

        default:

            radioPlaying = false;

            radioPlay.textContent = "▶";
            miniPlay.textContent = "▶";

            if (radioStatus) {

                radioStatus.textContent =
                    "RADIO OCARINA · LISTO";

            }


            if (radioMessage) {

                radioMessage.textContent =
                    "Presioná reproducir para escuchar.";

            }


            if (miniStatus) {

                miniStatus.textContent =
                    "LISTO";

            }


            if (radioDisc) {

                radioDisc.classList.remove(
                    "playing"
                );

            }

            break;

    }

}


/* =====================================================
   REPRODUCIR RADIO
===================================================== */

async function playRadio() {

    if (!audio) {
        return;
    }


    updateRadioInterface("loading");


    try {

        await audio.play();

    } catch (error) {

        console.error(
            "Error al iniciar Radio Ocarina:",
            error
        );

        updateRadioInterface("error");

    }

}


/* =====================================================
   PAUSAR RADIO
===================================================== */

function pauseRadio() {

    if (!audio) {
        return;
    }

    audio.pause();

}


/* =====================================================
   TOGGLE RADIO
===================================================== */

function toggleRadio() {

    if (!audio) {
        return;
    }


    if (audio.paused) {

        playRadio();

    } else {

        pauseRadio();

    }

}


/* =====================================================
   BOTÓN PRINCIPAL
===================================================== */

if (radioPlay) {

    radioPlay.addEventListener(
        "click",
        toggleRadio
    );

}


/* =====================================================
   MINI PLAYER
===================================================== */

if (miniPlay) {

    miniPlay.addEventListener(
        "click",
        toggleRadio
    );

}


/* =====================================================
   EVENTOS AUDIO
===================================================== */

if (audio) {


    audio.addEventListener(
        "play",
        function () {

            updateRadioInterface(
                "playing"
            );

        }
    );


    audio.addEventListener(
        "playing",
        function () {

            updateRadioInterface(
                "playing"
            );

        }
    );


    audio.addEventListener(
        "pause",
        function () {

            updateRadioInterface(
                "paused"
            );

        }
    );


    audio.addEventListener(
        "waiting",
        function () {

            if (!audio.paused) {

                updateRadioInterface(
                    "loading"
                );

            }

        }
    );


    audio.addEventListener(
        "error",
        function () {

            console.error(
                "Radio Ocarina: error de transmisión."
            );

            updateRadioInterface(
                "error"
            );

        }
    );

}


/* =====================================================
   VOLUMEN
===================================================== */

if (radioVolume) {

    radioVolume.addEventListener(
        "input",
        function () {

            const volume =
                parseFloat(
                    radioVolume.value
                );


            audio.volume =
                volume;


            localStorage.setItem(
                "ocarinaRadioVolume",
                volume
            );

        }
    );

}


/* =====================================================
   HEADER AL HACER SCROLL
===================================================== */

function updateHeader() {

    if (!siteHeader) {
        return;
    }


    if (window.scrollY > 50) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/* =====================================================
   MENÚ MOBILE
===================================================== */

function openMobileMenu() {

    if (!navLinks || !menuToggle) {
        return;
    }


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

}


function closeMobileMenu() {

    if (!navLinks || !menuToggle) {
        return;
    }


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

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                navLinks.classList.contains(
                    "active"
                );


            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );

}


/* =====================================================
   CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN
===================================================== */

if (navLinks) {

    const navItems =
        navLinks.querySelectorAll("a");


    navItems.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }
    );

}


/* =====================================================
   CERRAR MENÚ CON ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            navLinks &&
            navLinks.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   EVITAR QUE EL MENÚ QUEDE ABIERTO
   AL CAMBIAR A DESKTOP
===================================================== */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 900
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   SMOOTH SCROLL MEJORADO
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


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


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);


/* =====================================================
   VISIBILIDAD DEL MINI PLAYER
===================================================== */

const miniPlayer =
    document.getElementById(
        "miniPlayer"
    );


function updateMiniPlayer() {

    if (!miniPlayer) {
        return;
    }


    /*
       El mini reproductor permanece disponible
       durante toda la navegación.
    */

    miniPlayer.classList.add(
        "visible"
    );

}


updateMiniPlayer();


/* =====================================================
   DETECCIÓN DE PÁGINA VISIBLE
===================================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        /*
           IMPORTANTE:
           No pausamos la radio cuando el usuario
           cambia de pestaña.

           El navegador puede mantener el stream
           funcionando en segundo plano según sus
           políticas de ahorro de energía.
        */

        if (
            document.visibilityState === "visible" &&
            !audio.paused
        ) {

            updateRadioInterface(
                "playing"
            );

        }

    }
);


/* =====================================================
   INICIALIZACIÓN
===================================================== */

updateRadioInterface(
    "default"
);


console.log(
    "Ocarina Producciones · Motor multimedia V3 activo."
);
