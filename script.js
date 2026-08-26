```javascript
/* =========================================================
   OCARINA PRODUCCIONES
   SCRIPT V7.1
   SIMPLE · ESTABLE · RESPONSIVE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HEADER
    ===================================================== */

    const header =
        document.getElementById("siteHeader");


    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       MENÚ MOBILE
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    function closeMenu() {

        if (!navLinks) return;

        navLinks.classList.remove(
            "active"
        );

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
                    closeMenu
                );

            });


        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 720
                ) {

                    closeMenu();

                }

            }
        );

    }


    /* =====================================================
       ESC PARA CERRAR MENÚ
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
       RADIO
    ===================================================== */

    const radioAudio =
        document.getElementById(
            "radioAudio"
        );

    const radioPlay =
        document.getElementById(
            "radioPlay"
        );

    const radioVolume =
        document.getElementById(
            "radioVolume"
        );

    const radioDisc =
        document.getElementById(
            "radioDisc"
        );

    const radioStatus =
        document.getElementById(
            "radioStatus"
        );

    const radioMessage =
        document.getElementById(
            "radioMessage"
        );


    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";


    let radioLoaded = false;


    function loadRadio() {

        if (
            !radioAudio ||
            radioLoaded
        ) {
            return;
        }


        radioAudio.src =
            RADIO_STREAM;

        radioAudio.preload =
            "none";

        radioLoaded = true;

    }


    function setRadioState(
        playing
    ) {

        if (radioPlay) {

            radioPlay.textContent =
                playing
                    ? "❚❚"
                    : "▶";

            radioPlay.setAttribute(
                "aria-label",
                playing
                    ? "Pausar radio"
                    : "Reproducir radio"
            );

        }


        if (radioDisc) {

            radioDisc.classList.toggle(
                "playing",
                playing
            );

        }


        if (radioStatus) {

            radioStatus.textContent =
                playing
                    ? "RADIO OCARINA · EN VIVO"
                    : "RADIO OCARINA · LISTO";

        }


        if (radioMessage) {

            radioMessage.textContent =
                playing
                    ? "Transmitiendo desde Radio Cadena Oasis."
                    : "Presioná reproducir para escuchar.";

        }

    }


    async function toggleRadio() {

        if (!radioAudio) {
            return;
        }


        loadRadio();


        if (
            radioAudio.paused
        ) {

            if (radioMessage) {

                radioMessage.textContent =
                    "Conectando con la transmisión...";

            }


            try {

                await radioAudio.play();

                setRadioState(
                    true
                );

            } catch (error) {

                console.error(
                    "Radio:",
                    error
                );


                if (radioStatus) {

                    radioStatus.textContent =
                        "RADIO OCARINA · SIN SEÑAL";

                }


                if (radioMessage) {

                    radioMessage.textContent =
                        "No se pudo iniciar la transmisión. Intentá nuevamente.";

                }


                if (radioDisc) {

                    radioDisc.classList.remove(
                        "playing"
                    );

                }

            }

        } else {

            radioAudio.pause();

            setRadioState(
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


    if (
        radioVolume &&
        radioAudio
    ) {

        radioAudio.volume =
            Number(
                radioVolume.value
            );


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


    if (radioAudio) {

        radioAudio.addEventListener(
            "play",
            () => {

                setRadioState(
                    true
                );

            }
        );


        radioAudio.addEventListener(
            "pause",
            () => {

                setRadioState(
                    false
                );

            }
        );


        radioAudio.addEventListener(
            "error",
            () => {

                if (radioStatus) {

                    radioStatus.textContent =
                        "RADIO OCARINA · SIN SEÑAL";

                }

                if (radioMessage) {

                    radioMessage.textContent =
                        "La transmisión no está disponible en este momento.";

                }

                if (radioDisc) {

                    radioDisc.classList.remove(
                        "playing"
                    );

                }

            }
        );

    }


    /* =====================================================
       LINKS INTERNOS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

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

        });


    /* =====================================================
       AÑO
    ===================================================== */

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(
            element => {

                element.textContent =
                    new Date()
                        .getFullYear();

            }
        );


    /* =====================================================
       IMÁGENES
       Evita que una imagen rota rompa el diseño
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(
            image => {

                image.addEventListener(
                    "error",
                    () => {

                        image.classList.add(
                            "image-error"
                        );

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
        "Ocarina Producciones V7.1 · OK"
    );

});
```
