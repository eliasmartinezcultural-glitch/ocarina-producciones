/* =========================================================
   OCARINA UNIVERSO V17
   SCRIPT.JS
   Experiencia cinematográfica
   Turismo · Cultura · Historia · Territorio · Radio
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01 · ELEMENTOS PRINCIPALES
    ===================================================== */

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const radioAudio = document.getElementById("radioAudio");
    const radioPlay = document.getElementById("radioPlay");
    const miniPlay = document.getElementById("miniPlay");

    const radioDisc = document.getElementById("radioDisc");
    const radioStatus = document.getElementById("radioStatus");
    const radioMessage = document.getElementById("radioMessage");

    const radioVolume = document.getElementById("radioVolume");

    const miniPlayer = document.getElementById("miniPlayer");
    const miniStatus = document.getElementById("miniStatus");


    /* =====================================================
       02 · HEADER CINEMATOGRÁFICO
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

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


    /* =====================================================
       03 · MENÚ MOBILE
    ===================================================== */

    const closeMenu = () => {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("active");

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("no-scroll");

    };


    const openMenu = () => {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.add("active");

        navLinks.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("no-scroll");

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
       04 · NAVEGACIÓN SUAVE
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

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       05 · REVEAL CINEMATOGRÁFICO
    ===================================================== */

    const revealElements = document.querySelectorAll(
        `
        .section-heading,
        .universe-card,
        .production,
        .project-grid,
        .culture-grid,
        .culture-categories,
        .discover-content,
        .map-preview,
        .archive-card,
        .archive-download,
        .radio-layout,
        .radio-secondary,
        .agenda-card,
        .useful-card,
        .community-grid,
        .trajectory-grid,
        .contact-content
        `
    );


    revealElements.forEach(element => {

        element.classList.add("cinematic-reveal");

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =====================================================
       06 · PARALLAX SUAVE
    ===================================================== */

    const parallaxImages =
        document.querySelectorAll(
            ".hero-background img, .discover-background img"
        );


    let ticking = false;


    const updateParallax = () => {

        const scrollY = window.scrollY;

        parallaxImages.forEach(image => {

            const section =
                image.closest(
                    ".hero, .discover-section"
                );

            if (!section) return;

            const rect =
                section.getBoundingClientRect();

            const sectionCenter =
                rect.top + rect.height / 2;

            const viewportCenter =
                window.innerHeight / 2;

            const distance =
                sectionCenter - viewportCenter;

            const movement =
                distance * -0.025;

            image.style.transform =
                `translate3d(0, ${movement}px, 0)`;

        });

        ticking = false;

    };


    const requestParallax = () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateParallax
            );

            ticking = true;

        }

    };


    if (
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            requestParallax,
            { passive: true }
        );

        updateParallax();

    }


    /* =====================================================
       07 · RADIO
    ===================================================== */

    /*
       IMPORTANTE:

       Colocá acá la URL REAL del streaming
       cuando la tengas.

       Ejemplo:

       const RADIO_STREAM =
           "https://servidor.com/stream";

       Actualmente queda vacío para evitar
       errores o falsas reproducciones.
    */

    const RADIO_STREAM = "";


    let radioReady = false;


    const updateRadioUI = (
        playing = false
    ) => {

        if (playing) {

            if (radioStatus) {
                radioStatus.textContent =
                    "OCARINA RADIO · EN VIVO";
            }

            if (radioMessage) {
                radioMessage.textContent =
                    "Reproduciendo transmisión.";
            }

            if (miniStatus) {
                miniStatus.textContent =
                    "EN VIVO";
            }

            if (radioDisc) {
                radioDisc.classList.add(
                    "playing"
                );
            }

            if (radioPlay) {
                radioPlay.textContent = "❚❚";
            }

            if (miniPlay) {
                miniPlay.textContent = "❚❚";
            }

        } else {

            if (radioStatus) {
                radioStatus.textContent =
                    "OCARINA RADIO · LISTO";
            }

            if (radioMessage) {
                radioMessage.textContent =
                    "Presioná reproducir para escuchar.";
            }

            if (miniStatus) {
                miniStatus.textContent =
                    "LISTO";
            }

            if (radioDisc) {
                radioDisc.classList.remove(
                    "playing"
                );
            }

            if (radioPlay) {
                radioPlay.textContent = "▶";
            }

            if (miniPlay) {
                miniPlay.textContent = "▶";
            }

        }

    };


    const showRadioError = () => {

        if (radioStatus) {
            radioStatus.textContent =
                "OCARINA RADIO · SIN TRANSMISIÓN";
        }

        if (radioMessage) {
            radioMessage.textContent =
                "La transmisión todavía no está configurada.";
        }

        if (miniStatus) {
            miniStatus.textContent =
                "SIN SEÑAL";
        }

        if (radioDisc) {
            radioDisc.classList.remove(
                "playing"
            );
        }

        if (radioPlay) {
            radioPlay.textContent = "▶";
        }

        if (miniPlay) {
            miniPlay.textContent = "▶";
        }

    };


    const playRadio = () => {

        if (!radioAudio) return;


        if (!RADIO_STREAM) {

            showRadioError();

            return;

        }


        if (!radioReady) {

            radioAudio.src =
                RADIO_STREAM;

            radioAudio.load();

            radioReady = true;

        }


        radioAudio
            .play()
            .then(() => {

                updateRadioUI(true);

            })
            .catch(() => {

                showRadioError();

            });

    };


    const pauseRadio = () => {

        if (!radioAudio) return;

        radioAudio.pause();

        updateRadioUI(false);

    };


    const toggleRadio = () => {

        if (!radioAudio) return;

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

                updateRadioUI(true);

            }
        );


        radioAudio.addEventListener(
            "pause",
            () => {

                updateRadioUI(false);

            }
        );


        radioAudio.addEventListener(
            "ended",
            () => {

                updateRadioUI(false);

            }
        );


        radioAudio.addEventListener(
            "error",
            () => {

                showRadioError();

            }
        );

    }


    /* =====================================================
       08 · MINI PLAYER
    ===================================================== */

    if (miniPlayer) {

        const updateMiniPlayer =
            () => {

                if (
                    window.scrollY > 500
                ) {

                    miniPlayer.classList.add(
                        "visible"
                    );

                } else {

                    miniPlayer.classList.remove(
                        "visible"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateMiniPlayer,
            { passive: true }
        );


        updateMiniPlayer();

    }


    /* =====================================================
       09 · LAZY YOUTUBE
    ===================================================== */

    const youtubeFrames =
        document.querySelectorAll(
            ".video-wrapper iframe"
        );


    youtubeFrames.forEach(frame => {

        frame.setAttribute(
            "loading",
            "lazy"
        );

        frame.setAttribute(
            "referrerpolicy",
            "strict-origin-when-cross-origin"
        );

    });


    /* =====================================================
       10 · DETECCIÓN DE REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       11 · PROTECCIÓN CONTRA DOBLE CLIC EN BOTONES
    ===================================================== */

    document
        .querySelectorAll(
            ".button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.add(
                        "button-clicked"
                    );

                    setTimeout(() => {

                        button.classList.remove(
                            "button-clicked"
                        );

                    }, 450);

                }
            );

        });


    /* =====================================================
       12 · LOG DE DESARROLLO
    ===================================================== */

    console.log(
        "%cOCARINA UNIVERSO V17",
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        "Cultura · Historia · Territorio · Turismo"
    );

});
