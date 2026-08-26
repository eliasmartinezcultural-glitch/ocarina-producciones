```javascript
/* =========================================================
   OCARINA PRODUCCIONES
   V7.2 CINEMATIC
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initCurrentYear();
    initRadio();
    initSmoothNavigation();
    initImageFallbacks();

});


/* =========================================================
   02. LOADER
   ========================================================= */

function initLoader() {

    const loader = document.getElementById("cinematicLoader");

    if (!loader) return;

    const hideLoader = () => {

        window.setTimeout(() => {

            loader.classList.add("is-hidden");

            document.body.classList.add("page-loaded");

        }, 650);

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
     * si alguna imagen externa tarda demasiado,
     * la página no queda bloqueada eternamente.
     */

    window.setTimeout(() => {

        loader.classList.add("is-hidden");

        document.body.classList.add("page-loaded");

    }, 3500);

}


/* =========================================================
   03. HEADER
   ========================================================= */

function initHeader() {

    const header = document.getElementById("siteHeader");

    if (!header) return;


    const updateHeader = () => {

        if (window.scrollY > 50) {

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
   04. MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const toggle = document.getElementById("menuToggle");

    const navigation = document.getElementById("mainNavigation");

    if (!toggle || !navigation) return;


    const closeMenu = () => {

        toggle.classList.remove("active");

        navigation.classList.remove("open");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        toggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );

        document.body.classList.remove("menu-open");

    };


    const openMenu = () => {

        toggle.classList.add("active");

        navigation.classList.add("open");

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

        toggle.setAttribute(
            "aria-label",
            "Cerrar menú"
        );

        document.body.classList.add("menu-open");

    };


    toggle.addEventListener("click", () => {

        const isOpen =
            navigation.classList.contains("open");


        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


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
   05. SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements = document.querySelectorAll(
        ".reveal, .reveal-card, [data-reveal-section]"
    );


    if (!elements.length) return;


    /*
     * Si el navegador no soporta IntersectionObserver,
     * mostramos todo directamente.
     */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   06. CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );


    const year = new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent = year;

    });

}


/* =========================================================
   07. RADIO
========================================================= */

function initRadio() {

    const audio = document.getElementById(
        "radioAudio"
    );

    const playButton = document.getElementById(
        "radioPlay"
    );

    const volume = document.getElementById(
        "radioVolume"
    );

    const disc = document.getElementById(
        "radioDisc"
    );

    const status = document.getElementById(
        "radioStatus"
    );

    const message = document.getElementById(
        "radioMessage"
    );


    if (
        !audio ||
        !playButton ||
        !volume
    ) {

        return;

    }


    /*
     * IMPORTANTE
     *
     * Colocá acá la URL REAL del streaming
     * de Radio Oasis cuando la tengas.
     *
     * No inventamos una URL porque una dirección
     * incorrecta haría fallar el reproductor.
     */

    const RADIO_STREAM_URL = "";


    if (RADIO_STREAM_URL) {

        audio.src = RADIO_STREAM_URL;

    }


    audio.volume = Number(volume.value);


    const updateInterface = playing => {

        if (disc) {

            disc.classList.toggle(
                "playing",
                playing
            );

        }


        if (playing) {

            playButton.textContent = "Ⅱ";

            playButton.setAttribute(
                "aria-label",
                "Pausar radio"
            );

            if (status) {

                status.textContent =
                    "RADIO OASIS · EN VIVO";

            }

        } else {

            playButton.textContent = "▶";

            playButton.setAttribute(
                "aria-label",
                "Reproducir radio"
            );

            if (status) {

                status.textContent =
                    "RADIO OASIS · LISTA";

            }

        }

    };


    playButton.addEventListener(
        "click",
        async () => {

            /*
             * Sin URL real no intentamos reproducir.
             */

            if (!RADIO_STREAM_URL) {

                if (message) {

                    message.textContent =
                        "El reproductor está preparado. Falta conectar la señal de streaming de FM Oasis 92.5.";

                }

                return;

            }


            try {

                if (audio.paused) {

                    await audio.play();

                    updateInterface(true);

                    if (message) {

                        message.textContent =
                            "Transmisión en vivo.";

                    }

                } else {

                    audio.pause();

                    updateInterface(false);

                    if (message) {

                        message.textContent =
                            "Transmisión pausada.";

                    }

                }

            } catch (error) {

                console.error(
                    "No se pudo reproducir la radio:",
                    error
                );


                if (message) {

                    message.textContent =
                        "No se pudo iniciar la transmisión. Revisá la señal de streaming.";

                }

                updateInterface(false);

            }

        }
    );


    volume.addEventListener(
        "input",
        () => {

            audio.volume =
                Number(volume.value);

        }
    );


    audio.addEventListener(
        "play",
        () => {

            updateInterface(true);

        }
    );


    audio.addEventListener(
        "pause",
        () => {

            updateInterface(false);

        }
    );


    audio.addEventListener(
        "error",
        () => {

            updateInterface(false);

            if (message) {

                message.textContent =
                    "La señal de radio no está disponible en este momento.";

            }

        }
    );

}


/* =========================================================
   08. SMOOTH NAVIGATION
========================================================= */

function initSmoothNavigation() {

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

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


                const header =
                    document.getElementById(
                        "siteHeader"
                    );


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

}


/* =========================================================
   09. IMAGE FALLBACKS
========================================================= */

function initImageFallbacks() {

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                /*
                 * Evitamos que una imagen rota
                 * destruya visualmente la composición.
                 */

                image.classList.add(
                    "image-error"
                );


                image.removeAttribute(
                    "src"
                );


                image.setAttribute(
                    "alt",
                    "Imagen de Ocarina Producciones"
                );

            },
            { once: true }
        );

    });

}


/* =========================================================
   10. PARALLAX SUAVE
========================================================= */

function initParallax() {

    const heroImage =
        document.querySelector(".hero-image");


    if (!heroImage) return;


    /*
     * Desactivamos el efecto en dispositivos
     * pequeños para priorizar rendimiento.
     */

    if (window.innerWidth < 800) return;


    let ticking = false;


    const updateParallax = () => {

        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            const movement =
                scroll * 0.12;


            heroImage.style.transform =
                `scale(1.01) translateY(${movement}px)`;

        }


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );

}


/* =========================================================
   11. INITIALIZE PARALLAX
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initParallax
);


/* =========================================================
   12. SAFETY: PREVENT ACCIDENTAL HORIZONTAL SCROLL
========================================================= */

window.addEventListener(
    "load",
    () => {

        /*
         * Detectamos elementos que eventualmente
         * podrían exceder el viewport.
         *
         * No modificamos su contenido:
         * solamente registramos el problema
         * para facilitar futuras correcciones.
         */

        const viewportWidth =
            document.documentElement.clientWidth;


        document
            .querySelectorAll("*")
            .forEach(element => {

                if (
                    element.scrollWidth >
                    viewportWidth + 2
                ) {

                    element.classList.add(
                        "potential-overflow"
                    );

                }

            });

    }
);


/* =========================================================
   FIN DEL SCRIPT
   OCARINA PRODUCCIONES V7.2
   ========================================================= */
```
