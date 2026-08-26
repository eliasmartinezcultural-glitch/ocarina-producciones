/* =====================================================
   OCARINA PRODUCCIONES
   V3 · MULTIMEDIA
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       HEADER
    ================================================= */

    const header =
        document.getElementById("siteHeader");


    const updateHeader = () => {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );



    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                const active =
                    navLinks.classList.toggle("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    active ? "true" : "false"
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

                    }
                );

            });

    }



    /* =================================================
       RADIO OCARINA
    ================================================= */

    const audio =
        document.getElementById("radioAudio");

    const playButton =
        document.getElementById("radioPlay");

    const miniPlay =
        document.getElementById("miniPlay");

    const volume =
        document.getElementById("radioVolume");

    const status =
        document.getElementById("radioStatus");

    const message =
        document.getElementById("radioMessage");

    const miniStatus =
        document.getElementById("miniStatus");

    const disc =
        document.querySelector(".radio-disc");


    const STREAM_URL =
        "https://stream.zeno.fm/amfjjcz4tlgtv";


    let radioLoaded = false;


    const setStatus = (
        mainStatus,
        secondaryStatus
    ) => {

        if (status) {
            status.textContent =
                mainStatus;
        }

        if (miniStatus) {
            miniStatus.textContent =
                secondaryStatus || mainStatus;
        }

    };


    const loadRadio = () => {

        if (radioLoaded) {
            return;
        }


        /*
         * El stream se carga solamente
         * cuando el usuario decide reproducir.
         */

        audio.src =
            STREAM_URL;

        audio.volume =
            parseFloat(
                localStorage.getItem(
                    "ocarinaRadioVolume"
                )
            ) || 0.8;

        audio.load();

        radioLoaded = true;

    };


    const setPlayingUI = (
        playing
    ) => {

        if (playing) {

            if (playButton) {
                playButton.textContent =
                    "❚❚";
            }

            if (miniPlay) {
                miniPlay.textContent =
                    "❚❚";
            }

            if (disc) {
                disc.classList.add(
                    "playing"
                );
            }

            setStatus(
                "● RADIO OCARINA · EN VIVO",
                "EN VIVO"
            );

            if (message) {
                message.textContent =
                    "Transmitiendo en vivo.";
            }

        } else {

            if (playButton) {
                playButton.textContent =
                    "▶";
            }

            if (miniPlay) {
                miniPlay.textContent =
                    "▶";
            }

            if (disc) {
                disc.classList.remove(
                    "playing"
                );
            }

            setStatus(
                "RADIO OCARINA · PAUSADA",
                "PAUSADA"
            );

            if (message) {
                message.textContent =
                    "Presioná reproducir para continuar.";
            }

        }

    };


    const playRadio = async () => {

        try {

            loadRadio();

            await audio.play();

            setPlayingUI(true);

        } catch (error) {

            console.error(
                "No se pudo iniciar Radio Ocarina:",
                error
            );


            setStatus(
                "RADIO OCARINA · ERROR",
                "ERROR"
            );


            if (message) {

                message.textContent =
                    "No fue posible conectar. Intentá nuevamente.";

            }

        }

    };


    const pauseRadio = () => {

        audio.pause();

        setPlayingUI(false);

    };


    const toggleRadio = () => {

        if (
            !audio.paused &&
            !audio.ended
        ) {

            pauseRadio();

        } else {

            playRadio();

        }

    };


    if (playButton) {

        playButton.addEventListener(
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


    if (volume) {

        const savedVolume =
            localStorage.getItem(
                "ocarinaRadioVolume"
            );


        if (savedVolume !== null) {

            volume.value =
                savedVolume;

        }


        volume.addEventListener(
            "input",
            () => {

                const value =
                    parseFloat(
                        volume.value
                    );

                audio.volume =
                    value;

                localStorage.setItem(
                    "ocarinaRadioVolume",
                    value
                );

            }
        );

    }


    audio.addEventListener(
        "playing",
        () => {

            setPlayingUI(true);

        }
    );


    audio.addEventListener(
        "pause",
        () => {

            setPlayingUI(false);

        }
    );


    audio.addEventListener(
        "waiting",
        () => {

            setStatus(
                "RADIO OCARINA · CONECTANDO",
                "CONECTANDO"
            );

            if (message) {

                message.textContent =
                    "Conectando con la transmisión...";

            }

        }
    );


    audio.addEventListener(
        "error",
        () => {

            setStatus(
                "RADIO OCARINA · SIN SEÑAL",
                "SIN SEÑAL"
            );

            if (message) {

                message.textContent =
                    "La transmisión no está disponible en este momento.";

            }

            setPlayingUI(false);

        }
    );



    /* =================================================
       MEDIA SESSION
       Controles de reproducción del sistema
       cuando el navegador los soporte.
    ================================================= */

    if (
        "mediaSession" in navigator
    ) {

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
            playRadio
        );


        navigator.mediaSession.setActionHandler(
            "pause",
            pauseRadio
        );

    }



    /* =================================================
       LAZY LOAD DE IFRAMES
    ================================================= */

    const videoFrames =
        document.querySelectorAll(
            "iframe[loading='lazy']"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const iframeObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.setAttribute(
                                    "loading",
                                    "eager"
                                );

                                iframeObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "300px 0px"
                }
            );


        videoFrames.forEach(
            iframe => {

                iframeObserver.observe(
                    iframe
                );

            }
        );

    }



    /* =================================================
       REVEAL CINEMÁTICO
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".universe-card, .production, .archive-card, .service-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
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

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .12
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* =================================================
       TECLADO
       Barra espaciadora para la radio
       solo cuando no estamos escribiendo.
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            const tag =
                document.activeElement?.tagName;

            const typing =
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT";


            if (
                event.code === "Space" &&
                !typing
            ) {

                event.preventDefault();

                toggleRadio();

            }

        }
    );

});
