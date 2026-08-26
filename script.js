/* =========================================================
   OCARINA PRODUCCIONES
   SCRIPT V5
   CINEMATIC · CULTURA · HISTORIA · TURISMO · RADIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTOS PRINCIPALES
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");

    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.getElementById("navLinks");

    const radioAudio = document.getElementById("radioAudio");

    const radioPlay = document.getElementById("radioPlay");

    const miniPlay = document.getElementById("miniPlay");

    const radioVolume = document.getElementById("radioVolume");

    const radioDisc = document.getElementById("radioDisc");

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


    /* =====================================================
       CONFIGURACIÓN DE RADIO
    ===================================================== */

    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";


    let radioInitialized = false;

    let radioIsPlaying = false;

    let radioLoading = false;

    let reconnectTimer = null;

    let reconnectAttempts = 0;

    const MAX_RECONNECT_ATTEMPTS = 5;


    /* =====================================================
       FUNCIONES GENERALES
    ===================================================== */

    function exists(element) {

        return element !== null &&
               element !== undefined;

    }


    function updateText(element, text) {

        if (exists(element)) {

            element.textContent = text;

        }

    }


    /* =====================================================
       HEADER DINÁMICO
    ===================================================== */

    function updateHeader() {

        if (!exists(siteHeader)) {
            return;
        }

        if (window.scrollY > 40) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

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

    function openMenu() {

        if (!exists(navLinks)) {
            return;
        }

        navLinks.classList.add("active");

        if (exists(menuToggle)) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Cerrar menú"
            );

        }

    }


    function closeMenu() {

        if (!exists(navLinks)) {
            return;
        }

        navLinks.classList.remove("active");

        if (exists(menuToggle)) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

        }

    }


    function toggleMenu() {

        if (!exists(navLinks)) {
            return;
        }

        if (navLinks.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    if (exists(menuToggle)) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }


    /* =====================================================
       CERRAR MENÚ AL TOCAR UN ENLACE
    ===================================================== */

    if (exists(navLinks)) {

        const links =
            navLinks.querySelectorAll("a");

        links.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });

    }


    /* =====================================================
       CERRAR MENÚ AL HACER CLICK AFUERA
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (!exists(navLinks) ||
                !exists(menuToggle)) {

                return;

            }


            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                navLinks.classList.contains("active") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       ESC PARA CERRAR MENÚ
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =====================================================
       RADIO
    ===================================================== */

    function initializeRadio() {

        if (!exists(radioAudio)) {
            return;
        }

        if (radioInitialized) {
            return;
        }


        radioAudio.src = RADIO_STREAM;

        radioAudio.preload = "none";

        radioAudio.crossOrigin = "anonymous";

        radioAudio.volume =
            exists(radioVolume)
                ? Number(radioVolume.value)
                : 0.8;


        radioInitialized = true;

    }


    /* =====================================================
       ESTADO VISUAL DE RADIO
    ===================================================== */

    function setRadioState(
        state,
        message = ""
    ) {

        updateText(
            radioStatus,
            "RADIO OCARINA · " + state
        );


        updateText(
            miniStatus,
            state
        );


        if (message !== "") {

            updateText(
                radioMessage,
                message
            );

        }


        if (
            state === "EN VIVO" ||
            state === "CONECTANDO"
        ) {

            if (exists(radioPlayerCard)) {

                radioPlayerCard.classList.add(
                    "is-active"
                );

            }

        } else {

            if (exists(radioPlayerCard)) {

                radioPlayerCard.classList.remove(
                    "is-active"
                );

            }

        }

    }


    /* =====================================================
       ACTUALIZAR BOTONES
    ===================================================== */

    function updatePlayButtons() {

        const icon =
            radioIsPlaying
                ? "❚❚"
                : "▶";


        if (exists(radioPlay)) {

            radioPlay.textContent = icon;

            radioPlay.setAttribute(
                "aria-label",
                radioIsPlaying
                    ? "Pausar Radio Ocarina"
                    : "Reproducir Radio Ocarina"
            );

        }


        if (exists(miniPlay)) {

            miniPlay.textContent = icon;

            miniPlay.setAttribute(
                "aria-label",
                radioIsPlaying
                    ? "Pausar Radio Ocarina"
                    : "Reproducir Radio Ocarina"
            );

        }


        if (exists(radioDisc)) {

            if (radioIsPlaying) {

                radioDisc.classList.add(
                    "playing"
                );

            } else {

                radioDisc.classList.remove(
                    "playing"
                );

            }

        }

    }


    /* =====================================================
       REPRODUCIR RADIO
    ===================================================== */

    async function playRadio() {

        if (!exists(radioAudio)) {

            console.warn(
                "Ocarina Radio: elemento audio no encontrado."
            );

            return;

        }


        initializeRadio();


        if (radioLoading) {
            return;
        }


        radioLoading = true;


        setRadioState(
            "CONECTANDO",
            "Conectando con Ocarina Radio..."
        );


        try {

            await radioAudio.play();


            radioIsPlaying = true;

            radioLoading = false;

            reconnectAttempts = 0;


            setRadioState(
                "EN VIVO",
                "Radio Ocarina está transmitiendo."
            );


            updatePlayButtons();


            if (exists(miniPlayer)) {

                miniPlayer.classList.add(
                    "visible"
                );

            }

        }

        catch (error) {

            radioLoading = false;

            radioIsPlaying = false;

            updatePlayButtons();


            setRadioState(
                "ERROR",
                "No se pudo conectar. Intentá nuevamente."
            );


            console.warn(
                "Ocarina Radio:",
                error
            );

        }

    }


    /* =====================================================
       PAUSAR RADIO
    ===================================================== */

    function pauseRadio() {

        if (!exists(radioAudio)) {
            return;
        }


        radioAudio.pause();


        radioIsPlaying = false;


        setRadioState(
            "PAUSADA",
            "La radio está pausada."
        );


        updatePlayButtons();

    }


    /* =====================================================
       PLAY / PAUSA
    ===================================================== */

    function toggleRadio() {

        if (!exists(radioAudio)) {
            return;
        }


        if (radioIsPlaying) {

            pauseRadio();

        } else {

            playRadio();

        }

    }


    if (exists(radioPlay)) {

        radioPlay.addEventListener(
            "click",
            toggleRadio
        );

    }


    if (exists(miniPlay)) {

        miniPlay.addEventListener(
            "click",
            toggleRadio
        );

    }


    /* =====================================================
       CONTROL DE VOLUMEN
    ===================================================== */

    if (
        exists(radioVolume) &&
        exists(radioAudio)
    ) {

        radioVolume.addEventListener(
            "input",
            () => {

                const volume =
                    Number(
                        radioVolume.value
                    );


                radioAudio.volume =
                    Math.max(
                        0,
                        Math.min(1, volume)
                    );

            }
        );

    }


    /* =====================================================
       EVENTOS DEL AUDIO
    ===================================================== */

    if (exists(radioAudio)) {


        radioAudio.addEventListener(
            "playing",
            () => {

                radioIsPlaying = true;

                radioLoading = false;

                reconnectAttempts = 0;


                setRadioState(
                    "EN VIVO",
                    "Radio Ocarina está transmitiendo."
                );


                updatePlayButtons();

            }
        );


        radioAudio.addEventListener(
            "pause",
            () => {

                radioIsPlaying = false;

                radioLoading = false;


                updatePlayButtons();

            }
        );


        radioAudio.addEventListener(
            "waiting",
            () => {

                if (radioIsPlaying) {

                    setRadioState(
                        "CARGANDO",
                        "Esperando señal..."
                    );

                }

            }
        );


        radioAudio.addEventListener(
            "error",
            () => {

                radioIsPlaying = false;

                radioLoading = false;


                setRadioState(
                    "ERROR",
                    "Se perdió la conexión con la radio."
                );


                updatePlayButtons();


                scheduleReconnect();

            }
        );


        radioAudio.addEventListener(
            "stalled",
            () => {

                if (radioIsPlaying) {

                    scheduleReconnect();

                }

            }
        );

    }


    /* =====================================================
       RECONEXIÓN AUTOMÁTICA
    ===================================================== */

    function scheduleReconnect() {

        if (!exists(radioAudio)) {
            return;
        }


        if (reconnectTimer !== null) {
            return;
        }


        if (
            reconnectAttempts >=
            MAX_RECONNECT_ATTEMPTS
        ) {

            setRadioState(
                "SIN SEÑAL",
                "No se pudo recuperar la transmisión automáticamente."
            );

            return;

        }


        reconnectAttempts++;


        const delay =
            Math.min(
                3000 * reconnectAttempts,
                15000
            );


        setRadioState(
            "RECONECTANDO",
            "Intentando recuperar la señal..."
        );


        reconnectTimer =
            window.setTimeout(
                async () => {

                    reconnectTimer = null;


                    try {

                        radioAudio.pause();

                        radioAudio.removeAttribute(
                            "src"
                        );

                        radioAudio.load();


                        radioAudio.src =
                            RADIO_STREAM;


                        await radioAudio.play();


                        radioIsPlaying = true;

                        reconnectAttempts = 0;


                        setRadioState(
                            "EN VIVO",
                            "Conexión recuperada."
                        );


                        updatePlayButtons();

                    }

                    catch (error) {

                        console.warn(
                            "Reconexión de radio fallida:",
                            error
                        );


                        scheduleReconnect();

                    }

                },
                delay
            );

    }


    /* =====================================================
       VISIBILIDAD DE MINI PLAYER
    ===================================================== */

    if (exists(miniPlayer)) {

        miniPlayer.classList.add(
            "ready"
        );

    }


    /* =====================================================
       ATAJO DE TECLADO
       ESPACIO = PLAY / PAUSA
       
       No funciona si el usuario está escribiendo.
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const target =
                event.target;


            const isTyping =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable;


            if (isTyping) {
                return;
            }


            if (
                event.code === "Space" &&
                exists(radioAudio)
            ) {

                event.preventDefault();

                toggleRadio();

            }

        }
    );


    /* =====================================================
       SMOOTH SCROLL
       Para navegadores donde scroll-behavior no alcanza.
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    exists(siteHeader)
                        ? siteHeader.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top:
                        Math.max(
                            0,
                            targetPosition
                        ),

                    behavior:
                        "smooth"

                });


                closeMenu();

            }
        );

    });


    /* =====================================================
       INTERSECTION OBSERVER
       Aparición suave de elementos.
       
       Solo se activa si el navegador lo soporta.
    ===================================================== */

    if (
        "IntersectionObserver"
        in window
    ) {

        const animatedElements =
            document.querySelectorAll(
                ".universe-card, " +
                ".production, " +
                ".archive-card, " +
                ".service-card, " +
                ".culture-grid, " +
                ".trajectory-grid"
            );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
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


        animatedElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );

                observer.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       DETECCIÓN DE PREFERENCIA
       REDUCIR MOVIMIENTO
       
       Respeta accesibilidad del sistema.
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        reducedMotion.matches &&
        exists(radioDisc)
    ) {

        radioDisc.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       VISIBILIDAD DEL MINI PLAYER
       
       Cuando comienza la reproducción,
       aseguramos que esté disponible.
    ===================================================== */

    if (
        exists(radioAudio) &&
        exists(miniPlayer)
    ) {

        radioAudio.addEventListener(
            "play",
            () => {

                miniPlayer.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    updatePlayButtons();


    setRadioState(
        "LISTO",
        "Presioná reproducir para escuchar."
    );


    console.log(
        "Ocarina Producciones · Sistema V5 iniciado correctamente."
    );

});
