/* =========================================================
   OCARINA UNIVERSO V18
   SCRIPT.JS
   Experiencia cultural · audiovisual · territorial · radio
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const body = document.body;
    const header = document.getElementById("siteHeader");

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

    const radioVolume =
        document.getElementById("radioVolume");

    const miniPlayer =
        document.getElementById("miniPlayer");

    const miniStatus =
        document.getElementById("miniStatus");


    /* =====================================================
       UTILIDADES
    ===================================================== */

    const setText = (element, text) => {

        if (element) {
            element.textContent = text;
        }

    };


    /* =====================================================
       HEADER
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 35
        );

    };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MENÚ MOBILE
    ===================================================== */

    const closeMenu = () => {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("active");

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );

        body.classList.remove("no-scroll");

    };


    const openMenu = () => {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.add("active");

        navLinks.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Cerrar menú"
        );

        body.classList.add("no-scroll");

    };


    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.contains("active");

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

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


        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       NAVEGACIÓN SUAVE
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

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

                    const target =
                        document.querySelector(targetId);

                    if (!target) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight -
                        12;

                    window.scrollTo({

                        top: Math.max(position, 0),

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        });


    /* =====================================================
       REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .section-heading,
            .universe-card,
            .production,
            .culture-grid,
            .culture-categories,
            .discover-content,
            .map-preview,
            .archive-card,
            .radio-layout,
            .radio-categories,
            .agenda-card,
            .community-grid,
            .contact-content
            `
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "cinematic-reveal"
            );

        }
    );


    if (
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {

        const observer =
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

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.10,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(element);

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
       PARALLAX
    ===================================================== */

    const parallaxImages =
        document.querySelectorAll(
            `
            .hero-media img,
            .territory-media img,
            .discover-media img
            `
        );


    let parallaxTicking = false;


    const updateParallax = () => {

        if (prefersReducedMotion) {
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

                const offset =
                    rect.top * -0.035;

                const limitedOffset =
                    Math.max(
                        -35,
                        Math.min(
                            35,
                            offset
                        )
                    );

                image.style.transform =
                    `translate3d(0, ${limitedOffset}px, 0)`;

            }
        );

        parallaxTicking = false;

    };


    const requestParallax = () => {

        if (
            prefersReducedMotion ||
            parallaxTicking
        ) {
            return;
        }

        window.requestAnimationFrame(
            updateParallax
        );

        parallaxTicking = true;

    };


    if (!prefersReducedMotion) {

        window.addEventListener(
            "scroll",
            requestParallax,
            { passive: true }
        );

        updateParallax();

    }


    /* =====================================================
       RADIO
    ===================================================== */

    let radioInitialized = false;


    const setRadioState = (
        state
    ) => {

        if (!radioAudio) return;


        const states = {

            ready: {

                status:
                    "OCARINA RADIO · LISTO",

                message:
                    "Presioná reproducir para escuchar la transmisión.",

                mini:
                    "LISTO"

            },

            connecting: {

                status:
                    "OCARINA RADIO · CONECTANDO",

                message:
                    "Conectando con la transmisión en vivo…",

                mini:
                    "CONECTANDO"

            },

            playing: {

                status:
                    "OCARINA RADIO · EN VIVO",

                message:
                    "Transmisión en directo.",

                mini:
                    "EN VIVO"

            },

            paused: {

                status:
                    "OCARINA RADIO · PAUSADA",

                message:
                    "La transmisión está pausada.",

                mini:
                    "PAUSADA"

            },

            error: {

                status:
                    "OCARINA RADIO · SIN SEÑAL",

                message:
                    "No fue posible conectar con la transmisión.",

                mini:
                    "SIN SEÑAL"

            }

        };


        const current =
            states[state] ||
            states.ready;


        setText(
            radioStatus,
            current.status
        );

        setText(
            radioMessage,
            current.message
        );

        setText(
            miniStatus,
            current.mini
        );


        if (radioDisc) {

            radioDisc.classList.toggle(
                "playing",
                state === "playing"
            );

        }


        const isPlaying =
            state === "playing";


        if (radioPlay) {

            radioPlay.textContent =
                isPlaying
                    ? "❚❚"
                    : "▶";

            radioPlay.setAttribute(
                "aria-label",
                isPlaying
                    ? "Pausar Ocarina Radio"
                    : "Reproducir Ocarina Radio"
            );

        }


        if (miniPlay) {

            miniPlay.textContent =
                isPlaying
                    ? "❚❚"
                    : "▶";

            miniPlay.setAttribute(
                "aria-label",
                isPlaying
                    ? "Pausar Ocarina Radio"
                    : "Reproducir Ocarina Radio"
            );

        }

    };


    const initializeRadio = () => {

        if (
            !radioAudio ||
            radioInitialized
        ) {
            return;
        }


        radioAudio.src =
            RADIO_STREAM;

        radioAudio.preload =
            "none";

        radioAudio.crossOrigin =
            "anonymous";

        radioInitialized = true;


        if (radioVolume) {

            const initialVolume =
                Number(
                    radioVolume.value
                );

            radioAudio.volume =
                Number.isFinite(
                    initialVolume
                )
                    ? initialVolume
                    : 0.8;

        }

    };


    const playRadio = async () => {

        if (!radioAudio) {
            return;
        }


        initializeRadio();


        setRadioState(
            "connecting"
        );


        try {

            await radioAudio.play();

        } catch (error) {

            console.warn(
                "Ocarina Radio:",
                error
            );

            setRadioState(
                "error"
            );

        }

    };


    const pauseRadio = () => {

        if (!radioAudio) {
            return;
        }


        radioAudio.pause();

        setRadioState(
            "paused"
        );

    };


    const toggleRadio = () => {

        if (!radioAudio) {
            return;
        }


        if (
            !radioAudio.paused
        ) {

            pauseRadio();

        } else {

            playRadio();

        }

    };


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


    if (radioVolume && radioAudio) {

        radioVolume.addEventListener(
            "input",
            () => {

                const value =
                    Number(
                        radioVolume.value
                    );

                if (
                    Number.isFinite(value)
                ) {

                    radioAudio.volume =
                        value;

                }

            }
        );

    }


    if (radioAudio) {

        radioAudio.addEventListener(
            "playing",
            () => {

                setRadioState(
                    "playing"
                );

            }
        );


        radioAudio.addEventListener(
            "waiting",
            () => {

                setRadioState(
                    "connecting"
                );

            }
        );


        radioAudio.addEventListener(
            "pause",
            () => {

                if (
                    !radioAudio.ended
                ) {

                    setRadioState(
                        "paused"
                    );

                }

            }
        );


        radioAudio.addEventListener(
            "error",
            () => {

                setRadioState(
                    "error"
                );

            }
        );

    }


    setRadioState(
        "ready"
    );


    /* =====================================================
       MINI PLAYER
    ===================================================== */

    if (miniPlayer) {

        const updateMiniPlayer =
            () => {

                const visible =
                    window.scrollY > 520;


                miniPlayer.classList.toggle(
                    "visible",
                    visible
                );

            };


        window.addEventListener(
            "scroll",
            updateMiniPlayer,
            { passive: true }
        );


        updateMiniPlayer();

    }


    /* =====================================================
       YOUTUBE
    ===================================================== */

    document
        .querySelectorAll(
            ".video-wrapper iframe"
        )
        .forEach(
            iframe => {

                iframe.setAttribute(
                    "loading",
                    "lazy"
                );

                iframe.setAttribute(
                    "referrerpolicy",
                    "strict-origin-when-cross-origin"
                );

                iframe.setAttribute(
                    "allowfullscreen",
                    ""
                );

            }
        );


    /* =====================================================
       ACCESIBILIDAD
    ===================================================== */

    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       BOTONES
    ===================================================== */

    document
        .querySelectorAll(
            ".button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        button.classList.add(
                            "button-clicked"
                        );


                        window.setTimeout(
                            () => {

                                button.classList.remove(
                                    "button-clicked"
                                );

                            },
                            350
                        );

                    }
                );

            }
        );


    /* =====================================================
       DIAGNÓSTICO
    ===================================================== */

    console.log(
        "%cOCARINA UNIVERSO V18",
        "font-size:18px;font-weight:700;"
    );

    console.log(
        "Cultura · Turismo · Historia · Territorio · Radio"
    );

    console.log(
        "Streaming:",
        RADIO_STREAM
    );

});
