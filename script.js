/* =====================================================
   OCARINA PRODUCCIONES
   V4 · SISTEMA INTERACTIVO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTOS
    ================================================= */

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

    const radioPlayerCard =
        document.getElementById("radioPlayerCard");

    const radioStatus =
        document.getElementById("radioStatus");

    const radioMessage =
        document.getElementById("radioMessage");

    const miniPlayer =
        document.getElementById("miniPlayer");

    const miniStatus =
        document.getElementById("miniStatus");


    /* =================================================
       RADIO
    ================================================= */

    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";


    let radioInitialized = false;


    function initializeRadio() {

        if (radioInitialized) {
            return;
        }

        radioAudio.src =
            RADIO_STREAM;

        radioAudio.preload =
            "none";

        radioInitialized =
            true;

    }


    function setRadioPlayingState(isPlaying) {

        if (isPlaying) {

            radioPlay.textContent =
                "Ⅱ";

            miniPlay.textContent =
                "Ⅱ";

            radioStatus.textContent =
                "OCARINA RADIO · EN VIVO";

            miniStatus.textContent =
                "EN VIVO";

            radioMessage.textContent =
                "Reproduciendo transmisión.";

            radioDisc.classList.add(
                "playing"
            );

            radioPlayerCard.classList.add(
                "playing"
            );

            miniPlayer.classList.add(
                "playing"
            );

        } else {

            radioPlay.textContent =
                "▶";

            miniPlay.textContent =
                "▶";

            radioStatus.textContent =
                "OCARINA RADIO · PAUSADA";

            miniStatus.textContent =
                "PAUSADA";

            radioMessage.textContent =
                "Presioná reproducir para escuchar.";

            radioDisc.classList.remove(
                "playing"
            );

            radioPlayerCard.classList.remove(
                "playing"
            );

            miniPlayer.classList.remove(
                "playing"
            );

        }

    }


    async function toggleRadio() {

        initializeRadio();


        if (
            radioAudio.paused
        ) {

            try {

                radioStatus.textContent =
                    "OCARINA RADIO · CONECTANDO";

                miniStatus.textContent =
                    "CONECTANDO";

                radioMessage.textContent =
                    "Conectando con la transmisión...";


                await radioAudio.play();


                setRadioPlayingState(
                    true
                );

            } catch (error) {

                console.error(
                    "Error al reproducir la radio:",
                    error
                );


                radioStatus.textContent =
                    "OCARINA RADIO · ERROR";

                miniStatus.textContent =
                    "ERROR";

                radioMessage.textContent =
                    "No se pudo iniciar la transmisión. Intentá nuevamente.";

            }

        } else {

            radioAudio.pause();

            setRadioPlayingState(
                false
            );

        }

    }


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


    if (radioVolume) {

        radioVolume.addEventListener(
            "input",
            () => {

                radioAudio.volume =
                    Number(
                        radioVolume.value
                    );

            }
        );

    }


    radioAudio.addEventListener(
        "playing",
        () => {

            setRadioPlayingState(
                true
            );

        }
    );


    radioAudio.addEventListener(
        "pause",
        () => {

            setRadioPlayingState(
                false
            );

        }
    );


    radioAudio.addEventListener(
        "waiting",
        () => {

            radioStatus.textContent =
                "OCARINA RADIO · CARGANDO";

            miniStatus.textContent =
                "CARGANDO";

        }
    );


    radioAudio.addEventListener(
        "error",
        () => {

            radioStatus.textContent =
                "OCARINA RADIO · SIN SEÑAL";

            miniStatus.textContent =
                "SIN SEÑAL";

            radioMessage.textContent =
                "La transmisión no está disponible en este momento.";

            radioPlayerCard.classList.remove(
                "playing"
            );

            miniPlayer.classList.remove(
                "playing"
            );

        }
    );


    /* =================================================
       VOLUMEN INICIAL
    ================================================= */

    if (radioAudio) {

        radioAudio.volume =
            radioVolume
                ? Number(
                    radioVolume.value
                )
                : 0.8;

    }


    /* =================================================
       MENÚ MOBILE
    ================================================= */

    if (
        menuToggle &&
        navLinks
    ) {


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


                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Cerrar menú"
                        : "Abrir menú"
                );


                document.body.classList.toggle(
                    "no-scroll",
                    isOpen
                );

            }
        );


        const menuItems =
            navLinks.querySelectorAll(
                "a"
            );


        menuItems.forEach(
            (link) => {

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

                        menuToggle.setAttribute(
                            "aria-label",
                            "Abrir menú"
                        );

                        document.body.classList.remove(
                            "no-scroll"
                        );

                    }
                );

            }
        );

    }


    /* =================================================
       HEADER AL HACER SCROLL
    ================================================= */

    function updateHeader() {

        if (
            window.scrollY > 50
        ) {

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


    /* =================================================
       CERRAR MENÚ CON ESCAPE
    ================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

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

                document.body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );


});
