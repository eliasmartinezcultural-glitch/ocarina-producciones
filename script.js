/* =====================================================
   OCARINA PRODUCCIONES
   V4 · UNIVERSO MULTIMEDIA
===================================================== */


/* =====================================================
   ELEMENTOS
===================================================== */

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

const radioDisc =
    document.getElementById("radioDisc");

const radioStatus =
    document.getElementById("radioStatus");

const radioMessage =
    document.getElementById("radioMessage");

const miniStatus =
    document.getElementById("miniStatus");

const radioVolume =
    document.getElementById("radioVolume");

const radioLiveDot =
    document.getElementById("radioLiveDot");

const miniLive =
    document.querySelector(".mini-live");


/* =====================================================
   RADIO
===================================================== */

const RADIO_URL =
    "https://stream.zeno.fm/amfjjcz4tlgtv";


/* =====================================================
   VOLUMEN
===================================================== */

const savedVolume =
    localStorage.getItem("ocarinaRadioVolume");


if (savedVolume !== null) {

    const parsedVolume =
        parseFloat(savedVolume);

    if (!Number.isNaN(parsedVolume)) {

        radioAudio.volume =
            Math.min(
                1,
                Math.max(
                    0,
                    parsedVolume
                )
            );

        radioVolume.value =
            radioAudio.volume;

    }

} else {

    radioAudio.volume = 0.8;

}


/* =====================================================
   ESTADO RADIO
===================================================== */

function setRadioState(
    playing,
    message = ""
) {

    if (playing) {

        radioDisc.classList.add("playing");

        radioPlay.textContent = "Ⅱ";

        miniPlay.textContent = "Ⅱ";

        radioStatus.textContent =
            "RADIO OCARINA · EN VIVO";

        miniStatus.textContent =
            "EN VIVO";

        radioMessage.textContent =
            message ||
            "Transmitiendo desde Ocarina Radio.";

        radioLiveDot.classList.add("active");

        miniLive.classList.add("active");

    } else {

        radioDisc.classList.remove("playing");

        radioPlay.textContent = "▶";

        miniPlay.textContent = "▶";

        radioStatus.textContent =
            "RADIO OCARINA · LISTO";

        miniStatus.textContent =
            "LISTO";

        radioMessage.textContent =
            message ||
            "Presioná reproducir para escuchar.";

        radioLiveDot.classList.remove("active");

        miniLive.classList.remove("active");

    }

}


/* =====================================================
   REPRODUCIR
===================================================== */

async function playRadio() {

    try {

        /*
         * La URL se asigna solamente al momento
         * de reproducir para evitar cargar el stream
         * innecesariamente.
         */

        if (
            radioAudio.src !== RADIO_URL
        ) {

            radioAudio.src =
                RADIO_URL;

        }


        radioAudio.load();


        await radioAudio.play();


        setRadioState(
            true,
            "Transmitiendo desde Ocarina Radio."
        );


    } catch (error) {

        console.error(
            "No se pudo iniciar la radio:",
            error
        );


        setRadioState(
            false,
            "No fue posible iniciar la transmisión. Intentá nuevamente."
        );

    }

}


/* =====================================================
   PAUSAR
===================================================== */

function pauseRadio() {

    radioAudio.pause();

    setRadioState(
        false,
        "Radio pausada."
    );

}


/* =====================================================
   TOGGLE
===================================================== */

async function toggleRadio() {

    if (radioAudio.paused) {

        await playRadio();

    } else {

        pauseRadio();

    }

}


/* =====================================================
   BOTONES
===================================================== */

radioPlay.addEventListener(
    "click",
    toggleRadio
);


miniPlay.addEventListener(
    "click",
    toggleRadio
);


/* =====================================================
   VOLUMEN
===================================================== */

radioVolume.addEventListener(
    "input",
    () => {

        const volume =
            parseFloat(
                radioVolume.value
            );


        radioAudio.volume =
            volume;


        localStorage.setItem(
            "ocarinaRadioVolume",
            volume
        );

    }
);


/* =====================================================
   EVENTOS DEL AUDIO
===================================================== */

radioAudio.addEventListener(
    "playing",
    () => {

        setRadioState(
            true,
            "Transmitiendo desde Ocarina Radio."
        );

    }
);


radioAudio.addEventListener(
    "pause",
    () => {

        if (!radioAudio.ended) {

            setRadioState(
                false,
                "Radio pausada."
            );

        }

    }
);


radioAudio.addEventListener(
    "waiting",
    () => {

        radioStatus.textContent =
            "RADIO OCARINA · CARGANDO";

        miniStatus.textContent =
            "CARGANDO";

        radioMessage.textContent =
            "Esperando señal de transmisión...";

    }
);


radioAudio.addEventListener(
    "error",
    () => {

        setRadioState(
            false,
            "Se produjo un problema con la transmisión."
        );

    }
);


/* =====================================================
   MEDIA SESSION
   Controles de auriculares,
   pantalla bloqueada y dispositivos
   compatibles.
===================================================== */

if ("mediaSession" in navigator) {

    try {

        navigator.mediaSession.metadata =
            new MediaMetadata({

                title:
                    "Ocarina Radio",

                artist:
                    "Ocarina Producciones",

                album:
                    "Universo Ocarina"

            });


        navigator.mediaSession.setActionHandler(
            "play",
            () => playRadio()
        );


        navigator.mediaSession.setActionHandler(
            "pause",
            () => pauseRadio()
        );


    } catch (error) {

        console.log(
            "Media Session no disponible completamente.",
            error
        );

    }

}


/* =====================================================
   HEADER AL HACER SCROLL
===================================================== */

function updateHeader() {

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

function closeMenu() {

    navLinks.classList.remove(
        "active"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            navLinks.classList.toggle(
                "active"
            );


        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        document.body.classList.toggle(
            "no-scroll",
            isOpen
        );

    }
);


/* =====================================================
   CERRAR MENÚ AL TOCAR UN ENLACE
===================================================== */

navLinks
    .querySelectorAll("a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );


/* =====================================================
   ESCAPE CIERRA MENÚ
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMenu();

        }

    }
);


/* =====================================================
   EVITAR QUE EL STREAM SE REINICIE
   AL CAMBIAR DE SECCIÓN.

   El audio pertenece al documento completo,
   no a la sección RADIO.
===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            if (
                !radioAudio.paused
            ) {

                miniStatus.textContent =
                    "EN VIVO";

            }

        }

    }
);


/* =====================================================
   SMOOTH SCROLL PARA ANCLAS INTERNAS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
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


                    target.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                }
            );

        }
    );


/* =====================================================
   INICIO
===================================================== */

setRadioState(
    false
);

console.log(
    "Ocarina V4 · Universo Multimedia iniciada correctamente."
);
