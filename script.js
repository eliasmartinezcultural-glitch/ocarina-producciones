```javascript
/* =========================================================
   OCARINA PRODUCCIONES
   SCRIPT V7

   RADIO · MENÚ · SCROLL · ANIMACIONES
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

    const radioVolume =
        document.getElementById("radioVolume");

    const radioDisc =
        document.getElementById("radioDisc");

    const radioStatus =
        document.getElementById("radioStatus");

    const radioMessage =
        document.getElementById("radioMessage");

    const yearElement =
        document.querySelector("[data-year]");


    /* =====================================================
       RADIO
    ===================================================== */

    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";

    let radioInitialized = false;

    let radioPlaying = false;


    function initializeRadio() {

        if (radioInitialized) {
            return;
        }

        if (!radioAudio) {
            return;
        }

        radioAudio.src =
            RADIO_STREAM;

        radioAudio.preload =
            "none";

        radioAudio.volume =
            radioVolume
                ? Number(radioVolume.value)
                : 0.8;

        radioInitialized = true;

    }


    function updateRadioInterface(
        isPlaying
    ) {

        radioPlaying =
            isPlaying;


        if (radioPlay) {

            radioPlay.textContent =
                isPlaying
                    ? "❚❚"
                    : "▶";

            radioPlay.setAttribute(
                "aria-label",
                isPlaying
                    ? "Pausar radio"
                    : "Reproducir radio"
            );

        }


        if (radioStatus) {

            radioStatus.textContent =
                isPlaying
                    ? "EN VIVO"
                    : "EN ESPERA";

        }


        if (radioDisc) {

            radioDisc.classList.toggle(
                "playing",
                isPlaying
            );

        }

    }


    async function playRadio() {

        if (!radioAudio) {
            return;
        }

        initializeRadio();


        if (radioMessage) {

            radioMessage.textContent =
                "Conectando con Radio Cadena Oasis...";

        }


        try {

            await radioAudio.play();

            updateRadioInterface(
                true
            );


            if (radioMessage) {

                radioMessage.textContent =
                    "Radio Cadena Oasis · FM 92.5 · En vivo";

            }

        } catch (error) {

            updateRadioInterface(
                false
            );


            if (radioMessage) {

                radioMessage.textContent =
                    "No se pudo conectar. Intentá nuevamente.";

            }

            console.warn(
                "Radio Ocarina:",
                error
            );

        }

    }


    function pauseRadio() {

        if (!radioAudio) {
            return;
        }

        radioAudio.pause();

        updateRadioInterface(
            false
        );


        if (radioMessage) {

            radioMessage.textContent =
                "Radio pausada.";

        }

    }


    if (radioPlay) {

        radioPlay.addEventListener(
            "click",
            () => {

                if (radioPlaying) {

                    pauseRadio();

                } else {

                    playRadio();

                }

            }
        );

    }


    if (radioVolume) {

        radioVolume.addEventListener(
            "input",
            () => {

                if (!radioAudio) {
                    return;
                }

                radioAudio.volume =
                    Number(
                        radioVolume.value
                    );

            }
        );

    }


    if (radioAudio) {

        radioAudio.addEventListener(
            "ended",
            () => {

                updateRadioInterface(
                    false
                );

            }
        );


        radioAudio.addEventListener(
            "error",
            () => {

                updateRadioInterface(
                    false
                );

                if (radioMessage) {

                    radioMessage.textContent =
                        "Error de conexión con la transmisión.";

                }

            }
        );

    }


    /* =====================================================
       MENÚ
    ===================================================== */

    function closeMenu() {

        if (!navLinks) {
            return;
        }

        navLinks.classList.remove(
            "open"
        );


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

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
                        "open"
                    );

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


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

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!siteHeader) {
            return;
        }

        siteHeader.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

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
       REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".universe-card, " +
            ".production-card, " +
            ".radio-player, " +
            ".intro-grid, " +
            ".contact-grid"
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       AÑO
    ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date()
                .getFullYear();

    }


    /* =====================================================
       ESC
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
       INICIO
    ===================================================== */

    updateRadioInterface(
        false
    );


    console.log(
        "Ocarina Producciones V7 iniciada correctamente."
    );

});
```
