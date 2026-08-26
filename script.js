/* =========================================================
   OCARINA PRODUCCIONES
   SCRIPT V6
   SISTEMA INTERACTIVO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


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


    /* =====================================================
       RADIO
    ===================================================== */

    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";


    let radioInitialized = false;


    function initializeRadio() {

        if (radioInitialized) {
            return;
        }

        radioAudio.src = RADIO_STREAM;

        radioAudio.preload = "none";

        radioAudio.volume =
            Number(radioVolume.value);

        radioInitialized = true;

    }


    function setRadioPlayingState(isPlaying) {

        if (isPlaying) {

            radioPlay.textContent = "Ⅱ";

            miniPlay.textContent = "Ⅱ";

            radioDisc.classList.add("playing");

            radioStatus.textContent =
                "OCARINA RADIO · EN VIVO";

            radioMessage.textContent =
                "Reproduciendo transmisión.";

            miniStatus.textContent =
                "EN VIVO";

        } else {

            radioPlay.textContent = "▶";

            miniPlay.textContent = "▶";

            radioDisc.classList.remove("playing");

            radioStatus.textContent =
                "OCARINA RADIO · PAUSADO";

            radioMessage.textContent =
                "Presioná reproducir para escuchar.";

            miniStatus.textContent =
                "PAUSADO";

        }

    }


    async function toggleRadio() {

        initializeRadio();

        if (radioAudio.paused) {

            radioStatus.textContent =
                "OCARINA RADIO · CONECTANDO";

            radioMessage.textContent =
                "Conectando con la transmisión...";

            miniStatus.textContent =
                "CONECTANDO";


            try {

                await radioAudio.play();

                setRadioPlayingState(true);

            } catch (error) {

                console.error(
                    "Error al reproducir radio:",
                    error
                );

                radioStatus.textContent =
                    "OCARINA RADIO · ERROR";

                radioMessage.textContent =
                    "No se pudo iniciar la transmisión.";

                miniStatus.textContent =
                    "ERROR";

            }

        } else {

            radioAudio.pause();

            setRadioPlayingState(false);

        }

    }


    /* =====================================================
       BOTONES RADIO
    ===================================================== */

    if (radioPlay) {

        radioPlay.addEventListener(
            "click",
            toggleRadio
        );

    }


    if (miniPlay) {

        miniPlay.addEventListener(
            "click",
            toggleRadio
        );

    }


    /* =====================================================
       VOLUMEN
    ===================================================== */

    if (radioVolume) {

        radioVolume.addEventListener(
            "input",
            () => {

                radioAudio.volume =
                    Number(radioVolume.value);

            }
        );

    }


    /* =====================================================
       EVENTOS DEL AUDIO
    ===================================================== */

    radioAudio.addEventListener(
        "playing",
        () => {

            setRadioPlayingState(true);

        }
    );


    radioAudio.addEventListener(
        "pause",
        () => {

            setRadioPlayingState(false);

        }
    );


    radioAudio.addEventListener(
        "waiting",
        () => {

            radioStatus.textContent =
                "OCARINA RADIO · CARGANDO";

            radioMessage.textContent =
                "Esperando señal...";

            miniStatus.textContent =
                "CARGANDO";

        }
    );


    radioAudio.addEventListener(
        "error",
        () => {

            radioStatus.textContent =
                "OCARINA RADIO · SIN SEÑAL";

            radioMessage.textContent =
                "No fue posible conectar con la transmisión.";

            miniStatus.textContent =
                "SIN SEÑAL";

            radioDisc.classList.remove(
                "playing"
            );

            radioPlay.textContent = "▶";

            miniPlay.textContent = "▶";

        }
    );


    /* =====================================================
       MEDIA SESSION API
       Permite controlar la radio desde dispositivos
       compatibles con controles multimedia.
    ===================================================== */

    if ("mediaSession" in navigator) {

        navigator.mediaSession.metadata =
            new MediaMetadata({

                title:
                    "Ocarina Radio",

                artist:
                    "Ocarina Producciones",

                album:
                    "Cultura · Historia · Territorio · Turismo"

            });


        navigator.mediaSession.setActionHandler(
            "play",
            () => {

                if (radioAudio.paused) {
                    toggleRadio();
                }

            }
        );


        navigator.mediaSession.setActionHandler(
            "pause",
            () => {

                if (!radioAudio.paused) {

                    radioAudio.pause();

                }

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

    if (menuToggle && navLinks) {

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


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

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
                );

            });

    }


    /* =====================================================
       TECLA ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );

                }

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                document.body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );


    /* =====================================================
       ARCHIVO — ELEMENTOS EN CONSTRUCCIÓN
    ===================================================== */

    const comingSoonLinks =
        document.querySelectorAll(
            "[data-coming-soon]"
        );


    comingSoonLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                alert(
                    "Esta sección está en construcción. Próximamente incorporaremos material de consulta y descarga."
                );

            }
        );

    });


    /* =====================================================
       ATAJO DE TECLADO
       Barra espaciadora reproduce/pausa la radio
       solamente si no estamos escribiendo.
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const activeElement =
                document.activeElement;

            const isTyping =
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA"
                );


            if (
                event.code === "Space" &&
                !isTyping
            ) {

                event.preventDefault();

                toggleRadio();

            }

        }
    );


});
