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

        radioAudio.src = RADIO_STREAM;

        radioAudio.preload = "none";

        radioInitialized = true;

    }


    function setRadioPlayingState(isPlaying) {

        if (isPlaying) {

            radioDisc.classList.add("playing");

            radioPlayerCard.classList.add("is-playing");

            miniPlayer.classList.add("is-playing");

            radioPlay.textContent = "❚❚";

            miniPlay.textContent = "❚❚";

            radioStatus.textContent =
                "RADIO OCARINA · EN VIVO";

            radioMessage.textContent =
                "Reproduciendo transmisión.";

            miniStatus.textContent =
                "EN VIVO";

        } else {

            radioDisc.classList.remove("playing");

            radioPlayerCard.classList.remove("is-playing");

            miniPlayer.classList.remove("is-playing");

            radioPlay.textContent = "▶";

            miniPlay.textContent = "▶";

            radioStatus.textContent =
                "RADIO OCARINA · PAUSADA";

            radioMessage.textContent =
                "La transmisión está detenida.";

            miniStatus.textContent =
                "PAUSADA";

        }

    }


    function setRadioLoadingState() {

        radioStatus.textContent =
            "RADIO OCARINA · CONECTANDO";

        radioMessage.textContent =
            "Conectando con la transmisión...";

        miniStatus.textContent =
            "CONECTANDO";

    }


    function setRadioErrorState() {

        radioDisc.classList.remove("playing");

        radioPlayerCard.classList.remove("is-playing");

        miniPlayer.classList.remove("is-playing");

        radioPlay.textContent = "▶";

        miniPlay.textContent = "▶";

        radioStatus.textContent =
            "RADIO OCARINA · SIN CONEXIÓN";

        radioMessage.textContent =
            "No fue posible conectar con la transmisión.";

        miniStatus.textContent =
            "SIN CONEXIÓN";

    }


    async function toggleRadio() {

        initializeRadio();


        if (!radioAudio.paused) {

            radioAudio.pause();

            return;

        }


        setRadioLoadingState();


        try {

            await radioAudio.play();

        } catch (error) {

            console.error(
                "Error al reproducir Radio Ocarina:",
                error
            );

            setRadioErrorState();

        }

    }


    radioPlay.addEventListener(
        "click",
        toggleRadio
    );


    miniPlay.addEventListener(
        "click",
        toggleRadio
    );


    radioAudio.addEventListener(
        "play",
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
                "RADIO OCARINA · CARGANDO";

            miniStatus.textContent =
                "CARGANDO";

        }
    );


    radioAudio.addEventListener(
        "playing",
        () => {

            setRadioPlayingState(true);

        }
    );


    radioAudio.addEventListener(
        "error",
        () => {

            setRadioErrorState();

        }
    );


    /* =================================================
       VOLUMEN
    ================================================= */

    const savedVolume =
        localStorage.getItem(
            "ocarinaRadioVolume"
        );


    if (savedVolume !== null) {

        const parsedVolume =
            parseFloat(savedVolume);

        if (
            !Number.isNaN(parsedVolume) &&
            parsedVolume >= 0 &&
            parsedVolume <= 1
        ) {

            radioVolume.value =
                parsedVolume;

        }

    }


    radioAudio.volume =
        parseFloat(radioVolume.value);


    radioVolume.addEventListener(
        "input",
        () => {

            const volume =
                parseFloat(radioVolume.value);

            radioAudio.volume =
                volume;

            localStorage.setItem(
                "ocarinaRadioVolume",
                volume.toString()
            );

        }
    );


    /* =================================================
       HEADER AL HACER SCROLL
    ================================================= */

    function updateHeader() {

        if (
            window.scrollY > 40
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
        { passive: true }
    );


    updateHeader();


    /* =================================================
       MENÚ MOBILE
    ================================================= */

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
                isOpen
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


    /* =================================================
       ESC PARA CERRAR MENÚ
    ================================================= */

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


    /* =================================================
       EVITAR ERRORES DE SCROLL EN NAVEGADORES
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor
                            .getAttribute("href");

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

        });


    /* =================================================
       VISIBILIDAD DEL MINI PLAYER
    ================================================= */

    function updateMiniPlayer() {

        const radioSection =
            document.getElementById(
                "radio"
            );


        if (!radioSection) {
            return;
        }


        const rect =
            radioSection.getBoundingClientRect();


        const radioVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;


        if (
            radioVisible ||
            !radioAudio.paused
        ) {

            miniPlayer.style.display =
                "flex";

        } else {

            miniPlayer.style.display =
                "flex";

        }

    }


    window.addEventListener(
        "scroll",
        updateMiniPlayer,
        { passive: true }
    );


    updateMiniPlayer();


});
