```javascript
/* =========================================================
   OCARINA UNIVERSO V18
   SCRIPT.JS

   CULTURA · TURISMO · HISTORIA · TERRITORIO · RADIO

   V18
   - Arquitectura más robusta
   - Header inteligente
   - Menú móvil profesional
   - Navegación suave
   - Reveal cinematográfico
   - Parallax compatible con CSS actual
   - Radio preparada para streaming real
   - Mini player sincronizado
   - Lazy loading
   - Accesibilidad
   - Reduced Motion
   - Protección contra errores
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       01 · CONFIGURACIÓN
       ===================================================== */

    const CONFIG = {

        headerScrollPoint: 40,

        miniPlayerScrollPoint: 500,

        revealThreshold: 0.12,

        revealRootMargin:
            "0px 0px -70px 0px",

        parallaxIntensity: 0.025,

        menuBreakpoint: 1000,

        radioStream: "",

        animationDuration: 450

    };


    /* =====================================================
       02 · ELEMENTOS PRINCIPALES
       ===================================================== */

    const DOM = {

        html:
            document.documentElement,

        body:
            document.body,

        header:
            document.getElementById("siteHeader"),

        menuToggle:
            document.getElementById("menuToggle"),

        navLinks:
            document.getElementById("navLinks"),

        radioAudio:
            document.getElementById("radioAudio"),

        radioPlay:
            document.getElementById("radioPlay"),

        miniPlay:
            document.getElementById("miniPlay"),

        radioDisc:
            document.getElementById("radioDisc"),

        radioStatus:
            document.getElementById("radioStatus"),

        radioMessage:
            document.getElementById("radioMessage"),

        radioVolume:
            document.getElementById("radioVolume"),

        miniPlayer:
            document.getElementById("miniPlayer"),

        miniStatus:
            document.getElementById("miniStatus")

    };


    /* =====================================================
       03 · ESTADO GLOBAL
       ===================================================== */

    const STATE = {

        menuOpen:
            false,

        radioReady:
            false,

        radioPlaying:
            false,

        reducedMotion:
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches,

        scrolling:
            false

    };


    /* =====================================================
       04 · UTILIDADES
       ===================================================== */

    const qs = (
        selector,
        parent = document
    ) => parent.querySelector(selector);


    const qsa = (
        selector,
        parent = document
    ) => [
        ...parent.querySelectorAll(selector)
    ];


    const setText = (
        element,
        text
    ) => {

        if (!element) return;

        element.textContent = text;

    };


    const debounce = (
        callback,
        delay = 150
    ) => {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(
                () => callback(...args),
                delay
            );

        };

    };


    /* =====================================================
       05 · REDUCED MOTION
       ===================================================== */

    if (STATE.reducedMotion) {

        DOM.html.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       06 · HEADER INTELIGENTE
       ===================================================== */

    const updateHeader = () => {

        if (!DOM.header) return;

        const shouldScroll =
            window.scrollY >
            CONFIG.headerScrollPoint;

        DOM.header.classList.toggle(
            "scrolled",
            shouldScroll
        );

    };


    updateHeader();


    /* =====================================================
       07 · MENÚ MOBILE
       ===================================================== */

    const openMenu = () => {

        if (!DOM.menuToggle || !DOM.navLinks) {
            return;
        }

        STATE.menuOpen = true;

        DOM.menuToggle.classList.add(
            "active"
        );

        DOM.navLinks.classList.add(
            "active"
        );

        DOM.menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        DOM.menuToggle.setAttribute(
            "aria-label",
            "Cerrar menú"
        );

        DOM.body.classList.add(
            "no-scroll"
        );

    };


    const closeMenu = () => {

        if (!DOM.menuToggle || !DOM.navLinks) {
            return;
        }

        STATE.menuOpen = false;

        DOM.menuToggle.classList.remove(
            "active"
        );

        DOM.navLinks.classList.remove(
            "active"
        );

        DOM.menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        DOM.menuToggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );

        DOM.body.classList.remove(
            "no-scroll"
        );

    };


    const toggleMenu = () => {

        if (STATE.menuOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    };


    if (DOM.menuToggle) {

        DOM.menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }


    if (DOM.navLinks) {

        qsa(
            "a",
            DOM.navLinks
        ).forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =====================================================
       08 · CERRAR MENÚ AL CAMBIAR A DESKTOP
       ===================================================== */

    const desktopQuery =
        window.matchMedia(
            `(min-width: ${CONFIG.menuBreakpoint + 1}px)`
        );


    const handleDesktopChange = event => {

        if (event.matches) {

            closeMenu();

        }

    };


    if (desktopQuery.addEventListener) {

        desktopQuery.addEventListener(
            "change",
            handleDesktopChange
        );

    }


    /* =====================================================
       09 · NAVEGACIÓN SUAVE
       ===================================================== */

    qsa(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                let target = null;

                try {

                    target =
                        document.querySelector(
                            targetId
                        );

                } catch {

                    return;

                }


                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    DOM.header
                        ? DOM.header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top:
                        Math.max(
                            targetPosition,
                            0
                        ),

                    behavior:
                        STATE.reducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    });


    /* =====================================================
       10 · REVEAL CINEMATOGRÁFICO
       ===================================================== */

    const revealSelector = `

        .section-heading,

        .universe-card,

        .production,

        .culture-grid,

        .culture-categories,

        .discover-content,

        .map-preview,

        .archive-card,

        .radio-layout,

        .agenda-card,

        .community-grid,

        .contact-content,

        .remember-grid

    `;


    const revealElements =
        qsa(revealSelector);


    revealElements.forEach(
        element => {

            element.classList.add(
                "cinematic-reveal"
            );

        }
    );


    if (
        "IntersectionObserver" in window &&
        !STATE.reducedMotion
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {

                    threshold:
                        CONFIG.revealThreshold,

                    rootMargin:
                        CONFIG.revealRootMargin

                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       11 · REVEAL ESCALONADO
       ===================================================== */

    const staggerGroups = [

        ".universe-grid",

        ".archive-grid",

        ".agenda-grid"

    ];


    staggerGroups.forEach(
        selector => {

            const groups =
                qsa(selector);


            groups.forEach(
                group => {

                    const children =
                        qsa(
                            ":scope > *",
                            group
                        );


                    children.forEach(
                        (child, index) => {

                            child.style.setProperty(
                                "--reveal-delay",
                                `${index * 90}ms`
                            );

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       12 · PARALLAX CINEMATOGRÁFICO
       ===================================================== */

    const parallaxImages =
        qsa(
            ".hero-media img, .territory-media img, .discover-media img"
        );


    let parallaxFrame = null;


    const updateParallax = () => {

        parallaxFrame = null;


        if (STATE.reducedMotion) {
            return;
        }


        parallaxImages.forEach(
            image => {

                const section =
                    image.closest(
                        ".hero, .territory, .discover"
                    );


                if (!section) return;


                const rect =
                    section.getBoundingClientRect();


                const viewportCenter =
                    window.innerHeight / 2;


                const sectionCenter =
                    rect.top +
                    rect.height / 2;


                const distance =
                    sectionCenter -
                    viewportCenter;


                const movement =
                    distance *
                    -CONFIG.parallaxIntensity;


                const limitedMovement =
                    Math.max(
                        -35,
                        Math.min(
                            35,
                            movement
                        )
                    );


                image.style.setProperty(
                    "--parallax-y",
                    `${limitedMovement}px`
                );


                image.style.transform =
                    `translate3d(0, ${limitedMovement}px, 0)`;

            }
        );

    };


    const requestParallax = () => {

        if (STATE.reducedMotion) {
            return;
        }


        if (parallaxFrame !== null) {
            return;
        }


        parallaxFrame =
            window.requestAnimationFrame(
                updateParallax
            );

    };


    if (
        parallaxImages.length &&
        !STATE.reducedMotion
    ) {

        window.addEventListener(
            "scroll",
            requestParallax,
            { passive: true }
        );


        window.addEventListener(
            "resize",
            requestParallax,
            { passive: true }
        );


        updateParallax();

    }


    /* =====================================================
       13 · RADIO — ESTADO VISUAL
       ===================================================== */

    const updateRadioUI = (
        playing = false
    ) => {

        STATE.radioPlaying =
            playing;


        if (playing) {

            setText(
                DOM.radioStatus,
                "OCARINA RADIO · EN VIVO"
            );


            setText(
                DOM.radioMessage,
                "Reproduciendo transmisión."
            );


            setText(
                DOM.miniStatus,
                "EN VIVO"
            );


            if (DOM.radioDisc) {

                DOM.radioDisc.classList.add(
                    "playing"
                );

            }


            if (DOM.radioPlay) {

                DOM.radioPlay.textContent =
                    "❚❚";

                DOM.radioPlay.setAttribute(
                    "aria-label",
                    "Pausar radio"
                );

            }


            if (DOM.miniPlay) {

                DOM.miniPlay.textContent =
                    "❚❚";

                DOM.miniPlay.setAttribute(
                    "aria-label",
                    "Pausar radio"
                );

            }

        } else {

            setText(
                DOM.radioStatus,
                "OCARINA RADIO · LISTO"
            );


            setText(
                DOM.radioMessage,
                "Presioná reproducir para escuchar."
            );


            setText(
                DOM.miniStatus,
                "LISTO"
            );


            if (DOM.radioDisc) {

                DOM.radioDisc.classList.remove(
                    "playing"
                );

            }


            if (DOM.radioPlay) {

                DOM.radioPlay.textContent =
                    "▶";

                DOM.radioPlay.setAttribute(
                    "aria-label",
                    "Reproducir radio"
                );

            }


            if (DOM.miniPlay) {

                DOM.miniPlay.textContent =
                    "▶";

                DOM.miniPlay.setAttribute(
                    "aria-label",
                    "Reproducir radio"
                );

            }

        }

    };


    const showRadioError = () => {

        STATE.radioPlaying =
            false;


        setText(
            DOM.radioStatus,
            "OCARINA RADIO · SIN TRANSMISIÓN"
        );


        setText(
            DOM.radioMessage,
            "La transmisión todavía no está configurada."
        );


        setText(
            DOM.miniStatus,
            "SIN SEÑAL"
        );


        if (DOM.radioDisc) {

            DOM.radioDisc.classList.remove(
                "playing"
            );

        }


        if (DOM.radioPlay) {

            DOM.radioPlay.textContent =
                "▶";

        }


        if (DOM.miniPlay) {

            DOM.miniPlay.textContent =
                "▶";

        }

    };


    /* =====================================================
       14 · RADIO — REPRODUCCIÓN
       ===================================================== */

    const prepareRadio = () => {

        if (!DOM.radioAudio) {
            return false;
        }


        if (!CONFIG.radioStream) {

            showRadioError();

            return false;

        }


        if (!STATE.radioReady) {

            DOM.radioAudio.src =
                CONFIG.radioStream;

            DOM.radioAudio.preload =
                "none";

            DOM.radioAudio.load();

            STATE.radioReady =
                true;

        }


        return true;

    };


    const playRadio = async () => {

        if (!DOM.radioAudio) {
            return;
        }


        if (!prepareRadio()) {
            return;
        }


        try {

            await DOM.radioAudio.play();

            updateRadioUI(true);

        } catch (error) {

            console.warn(
                "OCARINA RADIO: no se pudo iniciar la reproducción.",
                error
            );

            showRadioError();

        }

    };


    const pauseRadio = () => {

        if (!DOM.radioAudio) {
            return;
        }


        DOM.radioAudio.pause();

        updateRadioUI(false);

    };


    const toggleRadio = () => {

        if (!DOM.radioAudio) {
            return;
        }


        if (
            !DOM.radioAudio.paused
        ) {

            pauseRadio();

        } else {

            playRadio();

        }

    };


    /* =====================================================
       15 · RADIO — BOTONES
       ===================================================== */

    if (DOM.radioPlay) {

        DOM.radioPlay.addEventListener(
            "click",
            toggleRadio
        );

    }


    if (DOM.miniPlay) {

        DOM.miniPlay.addEventListener(
            "click",
            toggleRadio
        );

    }


    /* =====================================================
       16 · RADIO — VOLUMEN
       ===================================================== */

    if (
        DOM.radioVolume &&
        DOM.radioAudio
    ) {

        const initialVolume =
            Number(
                DOM.radioVolume.value
            );


        DOM.radioAudio.volume =
            Number.isFinite(
                initialVolume
            )
                ? Math.max(
                    0,
                    Math.min(
                        1,
                        initialVolume
                    )
                )
                : 1;


        DOM.radioVolume.addEventListener(
            "input",
            () => {

                const volume =
                    Number(
                        DOM.radioVolume.value
                    );


                if (
                    Number.isFinite(
                        volume
                    )
                ) {

                    DOM.radioAudio.volume =
                        Math.max(
                            0,
                            Math.min(
                                1,
                                volume
                            )
                        );

                }

            }
        );

    }


    /* =====================================================
       17 · RADIO — EVENTOS NATIVOS
       ===================================================== */

    if (DOM.radioAudio) {

        DOM.radioAudio.addEventListener(
            "play",
            () => {

                updateRadioUI(true);

            }
        );


        DOM.radioAudio.addEventListener(
            "pause",
            () => {

                updateRadioUI(false);

            }
        );


        DOM.radioAudio.addEventListener(
            "ended",
            () => {

                updateRadioUI(false);

            }
        );


        DOM.radioAudio.addEventListener(
            "error",
            () => {

                showRadioError();

            }
        );

    }


    /* =====================================================
       18 · MINI PLAYER
       ===================================================== */

    const updateMiniPlayer = () => {

        if (!DOM.miniPlayer) {
            return;
        }


        const visible =
            window.scrollY >
            CONFIG.miniPlayerScrollPoint;


        DOM.miniPlayer.classList.toggle(
            "visible",
            visible
        );

    };


    updateMiniPlayer();


    /* =====================================================
       19 · LAZY LOADING
       ===================================================== */

    qsa(
        ".video-wrapper iframe"
    ).forEach(
        frame => {

            frame.setAttribute(
                "loading",
                "lazy"
            );


            frame.setAttribute(
                "referrerpolicy",
                "strict-origin-when-cross-origin"
            );

        }
    );


    qsa(
        "img"
    ).forEach(
        image => {

            if (
                !image.hasAttribute(
                    "decoding"
                )
            ) {

                image.setAttribute(
                    "decoding",
                    "async"
                );

            }

        }
    );


    /* =====================================================
       20 · IMÁGENES — DETECCIÓN DE CARGA
       ===================================================== */

    qsa(
        "img"
    ).forEach(
        image => {

            if (
                image.complete
            ) {

                image.classList.add(
                    "image-ready"
                );

                return;

            }


            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "image-ready"
                    );

                },
                {
                    once: true
                }
            );


            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                    console.warn(
                        "OCARINA: no se pudo cargar una imagen:",
                        image.src
                    );

                },
                {
                    once: true
                }
            );

        }
    );


    /* =====================================================
       21 · BOTONES — MICROINTERACCIÓN
       ===================================================== */

    qsa(
        ".button"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.remove(
                        "button-clicked"
                    );


                    requestAnimationFrame(
                        () => {

                            button.classList.add(
                                "button-clicked"
                            );

                        }
                    );


                    window.setTimeout(
                        () => {

                            button.classList.remove(
                                "button-clicked"
                            );

                        },
                        CONFIG.animationDuration
                    );

                }
            );

        }
    );


    /* =====================================================
       22 · DETECCIÓN DE SCROLL
       ===================================================== */

    const handleScrollState = () => {

        if (STATE.scrolling) {
            return;
        }


        STATE.scrolling =
            true;


        window.requestAnimationFrame(
            () => {

                updateHeader();

                updateMiniPlayer();

                STATE.scrolling =
                    false;

            }
        );

    };


    window.addEventListener(
        "scroll",
        handleScrollState,
        {
            passive: true
        }
    );


    /* =====================================================
       23 · RESIZE
       ===================================================== */

    const handleResize =
        debounce(
            () => {

                if (
                    window.innerWidth >
                    CONFIG.menuBreakpoint
                ) {

                    closeMenu();

                }


                requestParallax();

            },
            120
        );


    window.addEventListener(
        "resize",
        handleResize
    );


    /* =====================================================
       24 · VISIBILIDAD DE LA PÁGINA
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                return;

            }


            updateHeader();

            updateMiniPlayer();

            requestParallax();

        }
    );


    /* =====================================================
       25 · ESTADO INICIAL RADIO
       ===================================================== */

    updateRadioUI(false);


    /* =====================================================
       26 · LOG PROFESIONAL
       ===================================================== */

    console.log(
        "%cOCARINA UNIVERSO V18",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "Cultura · Historia · Territorio · Turismo · Radio"
    );

    console.log(
        "Sistema interactivo inicializado correctamente."
    );

});
```
