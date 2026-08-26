/* =========================================================
   OCARINA PRODUCCIONES
   SCRIPT V7
   SISTEMA INTERACTIVO
   CULTURA · HISTORIA · TURISMO · RADIO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const radioAudio = document.getElementById("radioAudio");
    const radioPlay = document.getElementById("radioPlay");
    const radioVolume = document.getElementById("radioVolume");
    const radioDisc = document.getElementById("radioDisc");

    const radioStatus = document.getElementById("radioStatus");
    const radioMessage = document.getElementById("radioMessage");

    const miniPlayer = document.getElementById("miniPlayer");
    const miniPlay = document.getElementById("miniPlay");
    const miniStatus = document.getElementById("miniStatus");



    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";


    let radioInitialized = false;

    let radioPlaying = false;



    /* =====================================================
       UTILIDADES
    ===================================================== */

    function elementExists(element) {

        return element !== null &&
               element !== undefined;

    }



    /* =====================================================
       HEADER AL HACER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!elementExists(siteHeader)) {
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

        if (!elementExists(navLinks)) {
            return;
        }

        navLinks.classList.add("active");

        if (elementExists(menuToggle)) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Cerrar menú"
            );

        }

        document.body.classList.add("no-scroll");

    }



    function closeMenu() {

        if (!elementExists(navLinks)) {
            return;
        }

        navLinks.classList.remove("active");

        if (elementExists(menuToggle)) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

        }

        document.body.classList.remove("no-scroll");

    }



    function toggleMenu() {

        if (!elementExists(navLinks)) {
            return;
        }

        if (navLinks.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    }



    if (elementExists(menuToggle)) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }



    /* =====================================================
       CERRAR MENÚ AL ELEGIR UNA SECCIÓN
    ===================================================== */

    if (elementExists(navLinks)) {

        const navigationItems =
            navLinks.querySelectorAll("a");

        navigationItems.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });

    }



    /* =====================================================
       ESC PARA CERRAR MENÚ
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );



    /* =====================================================
       RADIO
    ===================================================== */

    function initializeRadio() {

        if (!elementExists(radioAudio)) {
            return;
        }

        if (radioInitialized) {
            return;
        }

        radioAudio.src = RADIO_STREAM;

        radioAudio.preload = "none";

        radioAudio.crossOrigin = "anonymous";

        radioInitialized = true;

    }



    /* =====================================================
       ESTADO RADIO
    ===================================================== */

    function updateRadioInterface(
        state = "ready"
    ) {

        if (state === "loading") {

            if (elementExists(radioStatus)) {

                radioStatus.textContent =
                    "RADIO OCARINA · CONECTANDO";

            }

            if (elementExists(radioMessage)) {

                radioMessage.textContent =
                    "Conectando con la señal...";

            }

            if (elementExists(miniStatus)) {

                miniStatus.textContent =
                    "CONECTANDO";

            }

            return;
        }



        if (state === "playing") {

            if (elementExists(radioStatus)) {

                radioStatus.textContent =
                    "RADIO OCARINA · EN VIVO";

            }

            if (elementExists(radioMessage)) {

                radioMessage.textContent =
                    "Señal de radio activa.";

            }

            if (elementExists(miniStatus)) {

                miniStatus.textContent =
                    "EN VIVO";

            }

            return;
        }



        if (state === "paused") {

            if (elementExists(radioStatus)) {

                radioStatus.textContent =
                    "RADIO OCARINA · PAUSADA";

            }

            if (elementExists(radioMessage)) {

                radioMessage.textContent =
                    "La reproducción está pausada.";

            }

            if (elementExists(miniStatus)) {

                miniStatus.textContent =
                    "PAUSADA";

            }

            return;
        }



        if (state === "error") {

            if (elementExists(radioStatus)) {

                radioStatus.textContent =
                    "RADIO OCARINA · SIN SEÑAL";

            }

            if (elementExists(radioMessage)) {

                radioMessage.textContent =
                    "No se pudo conectar con la señal.";

            }

            if (elementExists(miniStatus)) {

                miniStatus.textContent =
                    "SIN SEÑAL";

            }

            return;
        }



        if (elementExists(radioStatus)) {

            radioStatus.textContent =
                "RADIO OCARINA · LISTO";

        }

        if (elementExists(radioMessage)) {

            radioMessage.textContent =
                "Presioná reproducir para escuchar.";

        }

        if (elementExists(miniStatus)) {

            miniStatus.textContent =
                "LISTO";

        }

    }



    /* =====================================================
       ACTUALIZAR BOTONES
    ===================================================== */

    function updatePlayButtons() {

        if (radioPlaying) {

            if (elementExists(radioPlay)) {

                radioPlay.textContent = "❚❚";

                radioPlay.setAttribute(
                    "aria-label",
                    "Pausar Radio Ocarina"
                );

            }


            if (elementExists(miniPlay)) {

                miniPlay.textContent = "❚❚";

                miniPlay.setAttribute(
                    "aria-label",
                    "Pausar Radio Ocarina"
                );

            }


            if (elementExists(radioDisc)) {

                radioDisc.classList.add(
                    "playing"
                );

            }

        } else {

            if (elementExists(radioPlay)) {

                radioPlay.textContent = "▶";

                radioPlay.setAttribute(
                    "aria-label",
                    "Reproducir Radio Ocarina"
                );

            }


            if (elementExists(miniPlay)) {

                miniPlay.textContent = "▶";

                miniPlay.setAttribute(
                    "aria-label",
                    "Reproducir Radio Ocarina"
                );

            }


            if (elementExists(radioDisc)) {

                radioDisc.classList.remove(
                    "playing"
                );

            }

        }

    }



    /* =====================================================
       REPRODUCIR
    ===================================================== */

    async function playRadio() {

        if (!elementExists(radioAudio)) {
            return;
        }


        initializeRadio();


        updateRadioInterface(
            "loading"
        );


        try {

            await radioAudio.play();

            radioPlaying = true;

            updatePlayButtons();

            updateRadioInterface(
                "playing"
            );

        } catch (error) {

            console.error(
                "Ocarina Radio:",
                error
            );

            radioPlaying = false;

            updatePlayButtons();

            updateRadioInterface(
                "error"
            );

        }

    }



    /* =====================================================
       PAUSAR
    ===================================================== */

    function pauseRadio() {

        if (!elementExists(radioAudio)) {
            return;
        }

        radioAudio.pause();

        radioPlaying = false;

        updatePlayButtons();

        updateRadioInterface(
            "paused"
        );

    }



    /* =====================================================
       TOGGLE RADIO
    ===================================================== */

    function toggleRadio() {

        if (radioPlaying) {

            pauseRadio();

        } else {

            playRadio();

        }

    }



    /* =====================================================
       BOTÓN PRINCIPAL RADIO
    ===================================================== */

    if (elementExists(radioPlay)) {

        radioPlay.addEventListener(
            "click",
            toggleRadio
        );

    }



    /* =====================================================
       MINI PLAYER
    ===================================================== */

    if (elementExists(miniPlay)) {

        miniPlay.addEventListener(
            "click",
            toggleRadio
        );

    }



    /* =====================================================
       VOLUMEN
    ===================================================== */

    function setVolume(value) {

        if (!elementExists(radioAudio)) {
            return;
        }

        const volume =
            Math.max(
                0,
                Math.min(
                    1,
                    Number(value)
                )
            );

        radioAudio.volume = volume;


        try {

            localStorage.setItem(
                "ocarinaRadioVolume",
                String(volume)
            );

        } catch (error) {

            console.warn(
                "No se pudo guardar el volumen."
            );

        }

    }



    function loadVolume() {

        let savedVolume = 0.8;


        try {

            const stored =
                localStorage.getItem(
                    "ocarinaRadioVolume"
                );

            if (stored !== null) {

                const parsed =
                    Number(stored);

                if (
                    !Number.isNaN(parsed) &&
                    parsed >= 0 &&
                    parsed <= 1
                ) {

                    savedVolume = parsed;

                }

            }

        } catch (error) {

            console.warn(
                "No se pudo recuperar el volumen."
            );

        }


        if (elementExists(radioAudio)) {

            radioAudio.volume =
                savedVolume;

        }


        if (elementExists(radioVolume)) {

            radioVolume.value =
                savedVolume;

        }

    }



    if (elementExists(radioVolume)) {

        radioVolume.addEventListener(
            "input",
            (event) => {

                setVolume(
                    event.target.value
                );

            }
        );

    }


    loadVolume();



    /* =====================================================
       EVENTOS DEL AUDIO
    ===================================================== */

    if (elementExists(radioAudio)) {


        radioAudio.addEventListener(
            "play",
            () => {

                radioPlaying = true;

                updatePlayButtons();

                updateRadioInterface(
                    "playing"
                );

            }
        );


        radioAudio.addEventListener(
            "playing",
            () => {

                radioPlaying = true;

                updatePlayButtons();

                updateRadioInterface(
                    "playing"
                );

            }
        );


        radioAudio.addEventListener(
            "pause",
            () => {

                radioPlaying = false;

                updatePlayButtons();

                updateRadioInterface(
                    "paused"
                );

            }
        );


        radioAudio.addEventListener(
            "waiting",
            () => {

                if (radioPlaying) {

                    updateRadioInterface(
                        "loading"
                    );

                }

            }
        );


        radioAudio.addEventListener(
            "error",
            () => {

                radioPlaying = false;

                updatePlayButtons();

                updateRadioInterface(
                    "error"
                );

            }
        );


        radioAudio.addEventListener(
            "ended",
            () => {

                radioPlaying = false;

                updatePlayButtons();

                updateRadioInterface(
                    "ready"
                );

            }
        );

    }



    /* =====================================================
       VISIBILIDAD DEL MINI PLAYER
    ===================================================== */

    function updateMiniPlayer() {

        if (!elementExists(miniPlayer)) {
            return;
        }

        if (window.scrollY > 450) {

            miniPlayer.classList.add(
                "visible"
            );

        } else {

            miniPlayer.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateMiniPlayer,
        { passive: true }
    );


    updateMiniPlayer();



    /* =====================================================
       SCROLL SUAVE PARA ANCLAS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    elementExists(siteHeader)
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
       ANIMACIONES AL ENTRAR EN PANTALLA
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".universe-card, " +
            ".production, " +
            ".archive-card, " +
            ".service-card, " +
            ".culture-grid, " +
            ".discover-content, " +
            ".trajectory-grid, " +
            ".contact-content"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

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
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    }



    /* =====================================================
       BOTÓN VOLVER ARRIBA
    ===================================================== */

    const backToTop =
        document.createElement("button");


    backToTop.type = "button";

    backToTop.className =
        "back-to-top";

    backToTop.textContent =
        "↑";

    backToTop.setAttribute(
        "aria-label",
        "Volver arriba"
    );


    document.body.appendChild(
        backToTop
    );


    function updateBackToTop() {

        if (window.scrollY > 900) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    updateBackToTop();



    /* =====================================================
       DETECTAR CONEXIÓN
    ===================================================== */

    function updateConnectionStatus() {

        if (
            !radioPlaying ||
            !elementExists(radioStatus)
        ) {

            return;

        }


        if (navigator.onLine) {

            radioStatus.textContent =
                "RADIO OCARINA · EN VIVO";

        } else {

            radioStatus.textContent =
                "RADIO OCARINA · SIN INTERNET";

        }

    }


    window.addEventListener(
        "online",
        updateConnectionStatus
    );


    window.addEventListener(
        "offline",
        () => {

            if (elementExists(radioStatus)) {

                radioStatus.textContent =
                    "RADIO OCARINA · SIN INTERNET";

            }

            if (elementExists(miniStatus)) {

                miniStatus.textContent =
                    "SIN INTERNET";

            }

        }
    );



    /* =====================================================
       REDUCIR ANIMACIONES SI EL USUARIO LO PIDE
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }



    /* =====================================================
       INICIALIZACIÓN FINAL
    ===================================================== */

    initializeRadio();

    loadVolume();

    updatePlayButtons();

    updateHeader();

    updateMiniPlayer();

    updateBackToTop();

    updateRadioInterface(
        "ready"
    );


    console.log(
        "Ocarina Producciones V7 · sistema cargado correctamente."
    );

});
