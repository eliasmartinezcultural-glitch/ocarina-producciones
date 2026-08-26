```javascript
/* =========================================================
   OCARINA PRODUCCIONES
   V7.3 CINEMATIC
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initHeader();
    initMobileMenu();
    initSmoothNavigation();
    initScrollReveal();
    initRadio();
    initCurrentYear();
    initImageProtection();
});


/* =========================================================
   LOADER
   ========================================================= */

function initLoader() {

    const loader = document.querySelector(
        ".cinematic-loader"
    );

    if (!loader) return;

    const hideLoader = () => {

        window.setTimeout(() => {

            loader.classList.add("is-hidden");
            document.body.classList.add("page-loaded");

        }, 500);
    };

    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            { once: true }
        );
    }

    /*
     * Seguridad:
     * nunca dejamos la pantalla bloqueada
     * indefinidamente por una imagen lenta.
     */

    setTimeout(() => {

        loader.classList.add("is-hidden");
        document.body.classList.add("page-loaded");

    }, 3500);
}


/* =========================================================
   HEADER
   ========================================================= */

function initHeader() {

    const header = document.querySelector(
        ".site-header"
    );

    if (!header) return;

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
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const toggle = document.querySelector(
        ".menu-toggle"
    );

    const navigation = document.querySelector(
        ".main-navigation"
    );

    if (!toggle || !navigation) return;


    const closeMenu = () => {

        toggle.classList.remove("active");

        navigation.classList.remove("open");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    };


    const openMenu = () => {

        toggle.classList.add("active");

        navigation.classList.add("open");

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );
    };


    toggle.addEventListener(
        "click",
        () => {

            if (
                navigation.classList.contains(
                    "open"
                )
            ) {

                closeMenu();

            } else {

                openMenu();

            }
        }
    );


    navigation
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


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 700) {

                closeMenu();

            }

        }
    );
}


/* =========================================================
   NAVEGACIÓN SUAVE
   ========================================================= */

function initSmoothNavigation() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

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

                    if (!target) return;

                    event.preventDefault();

                    const header =
                        document.querySelector(
                            ".site-header"
                        );

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }
            );

        });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-card, [data-reveal-section]"
        );

    if (!elements.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });
}


/* =========================================================
   RADIO OCARINA
   ========================================================= */

function initRadio() {

    const audio =
        document.querySelector(
            "#radioAudio"
        );

    const playButton =
        document.querySelector(
            "#radioPlay"
        );

    const volume =
        document.querySelector(
            "#radioVolume"
        );

    const disc =
        document.querySelector(
            "#radioDisc"
        );

    const status =
        document.querySelector(
            "#radioStatus"
        );

    const message =
        document.querySelector(
            "#radioMessage"
        );


    if (
        !audio ||
        !playButton
    ) {
        return;
    }


    /*
     * SEÑAL ZENO FM
     */

    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";


    /*
     * Conectamos la señal.
     */

    if (!audio.src) {

        audio.src = RADIO_STREAM;

    }


    audio.preload = "none";


    if (volume) {

        const initialVolume =
            Number(volume.value);

        audio.volume =
            Number.isFinite(
                initialVolume
            )
                ? initialVolume
                : 0.8;
    }


    const setPlayingState =
        playing => {

            if (disc) {

                disc.classList.toggle(
                    "playing",
                    playing
                );
            }


            if (playing) {

                playButton.textContent =
                    "Ⅱ";

                playButton.setAttribute(
                    "aria-label",
                    "Pausar radio"
                );

                if (status) {

                    status.textContent =
                        "EN VIVO · OCARINA RADIO";

                }

            } else {

                playButton.textContent =
                    "▶";

                playButton.setAttribute(
                    "aria-label",
                    "Reproducir radio"
                );

                if (status) {

                    status.textContent =
                        "SEÑAL DISPONIBLE";

                }
            }
        };


    playButton.addEventListener(
        "click",
        async () => {

            try {

                if (audio.paused) {

                    if (
                        !audio.src ||
                        audio.src ===
                        window.location.href
                    ) {

                        audio.src =
                            RADIO_STREAM;
                    }


                    await audio.play();

                    setPlayingState(true);

                    if (message) {

                        message.textContent =
                            "Transmitiendo en vivo.";

                    }

                } else {

                    audio.pause();

                    setPlayingState(false);

                    if (message) {

                        message.textContent =
                            "Transmisión pausada.";

                    }
                }

            } catch (error) {

                console.error(
                    "Error de radio:",
                    error
                );

                setPlayingState(false);

                if (message) {

                    message.textContent =
                        "No se pudo conectar con la señal en este momento.";

                }
            }
        }
    );


    if (volume) {

        volume.addEventListener(
            "input",
            () => {

                const value =
                    Number(
                        volume.value
                    );

                if (
                    Number.isFinite(value)
                ) {

                    audio.volume = value;

                }
            }
        );
    }


    audio.addEventListener(
        "play",
        () => {

            setPlayingState(true);

        }
    );


    audio.addEventListener(
        "pause",
        () => {

            setPlayingState(false);

        }
    );


    audio.addEventListener(
        "error",
        () => {

            setPlayingState(false);

            if (message) {

                message.textContent =
                    "La señal no está disponible temporalmente.";

            }
        }
    );
}


/* =========================================================
   AÑO AUTOMÁTICO
   ========================================================= */

function initCurrentYear() {

    const elements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    const year =
        new Date().getFullYear();

    elements.forEach(element => {

        element.textContent = year;

    });
}


/* =========================================================
   IMÁGENES
   ========================================================= */

function initImageProtection() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Imagen no encontrada:",
                    image.src
                );

                image.classList.add(
                    "image-error"
                );

            },
            { once: true }
        );

    });
}


/* =========================================================
   PARALLAX CINEMÁTICO
   ========================================================= */

function initParallax() {

    const image =
        document.querySelector(
            ".hero-image"
        );

    if (!image) return;


    /*
     * En celulares lo desactivamos.
     * Mejora rendimiento y evita movimientos
     * extraños.
     */

    if (
        window.matchMedia(
            "(max-width: 700px)"
        ).matches
    ) {
        return;
    }


    let ticking = false;


    const update =
        () => {

            const scroll =
                window.scrollY;

            if (
                scroll <=
                window.innerHeight
            ) {

                const movement =
                    scroll * 0.08;

                image.style.transform =
                    `scale(1.02) translateY(${movement}px)`;

            }

            ticking = false;
        };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    update
                );

                ticking = true;
            }

        },
        { passive: true }
    );
}


document.addEventListener(
    "DOMContentLoaded",
    initParallax
);


/* =========================================================
   FIN
   OCARINA PRODUCCIONES V7.3
   ========================================================= */
```
