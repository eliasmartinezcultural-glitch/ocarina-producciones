```javascript
/* =========================================================
   OCARINA PRODUCCIONES
   V6 RECONSTRUIDA
   SCRIPT.JS
   ========================================================= */

"use strict";


/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initHeader();

    initMobileMenu();

    initScrollReveal();

    initRadio();

    initCurrentYear();

});


/* =========================================================
   LOADER
   ========================================================= */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;


    const hideLoader = () => {

        loader.classList.add("is-hidden");

        document.body.classList.remove("loading");

    };


    document.body.classList.add("loading");


    if (document.readyState === "complete") {

        setTimeout(hideLoader, 500);

    } else {

        window.addEventListener(
            "load",
            () => {
                setTimeout(hideLoader, 500);
            },
            {
                once: true
            }
        );

    }


    /*
     * Seguridad:
     * si alguna imagen externa tarda demasiado,
     * la página no queda bloqueada indefinidamente.
     */

    setTimeout(hideLoader, 3500);

}


/* =========================================================
   HEADER
   ========================================================= */

function initHeader() {

    const header =
        document.querySelector(".site-header");

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
        {
            passive: true
        }
    );

}


/* =========================================================
   MENÚ MOBILE
   ========================================================= */

function initMobileMenu() {

    const toggle =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".main-navigation");


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

            const isOpen =
                navigation.classList.contains("open");


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    /*
     * Cerrar al tocar un enlace.
     */

    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /*
     * Cerrar con ESC.
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navigation.classList.contains("open")
            ) {

                closeMenu();

                toggle.focus();

            }

        }
    );


    /*
     * Si pasamos de móvil a escritorio,
     * limpiamos el estado del menú.
     */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 760) {

                closeMenu();

            }

        }
    );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-card"
        );


    if (!elements.length) return;


    /*
     * Fallback para navegadores sin IntersectionObserver.
     */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


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
   RADIO
   ========================================================= */

function initRadio() {

    const audio =
        document.getElementById(
            "radioAudio"
        );

    const playButton =
        document.getElementById(
            "radioPlay"
        );

    const volume =
        document.getElementById(
            "radioVolume"
        );

    const disc =
        document.getElementById(
            "radioDisc"
        );

    const status =
        document.getElementById(
            "radioStatus"
        );

    const message =
        document.getElementById(
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
     * =====================================================
     * RADIO
     * =====================================================
     *
     * IMPORTANTE:
     *
     * Acá todavía NO inventamos la URL de Zeno FM.
     *
     * Cuando me pases nuevamente la URL exacta del
     * streaming, la colocamos en RADIO_STREAM_URL.
     *
     * Ejemplo:
     *
     * const RADIO_STREAM_URL = "URL_REAL";
     *
     * =====================================================
     */

    const RADIO_STREAM_URL = "";


    audio.volume =
        Number(volume.value);


    /*
     * Preparar stream.
     */

    if (RADIO_STREAM_URL) {

        audio.src =
            RADIO_STREAM_URL;

    }


    /*
     * Play / Pause.
     */

    playButton.addEventListener(
        "click",
        async () => {

            if (!RADIO_STREAM_URL) {

                if (status) {

                    status.textContent =
                        "RADIO POR CONFIGURAR";

                }


                if (message) {

                    message.textContent =
                        "La señal de Zeno FM debe conectarse en el script.";

                }


                return;

            }


            try {

                if (audio.paused) {

                    await audio.play();

                } else {

                    audio.pause();

                }

            } catch (error) {

                console.error(
                    "No se pudo reproducir la radio:",
                    error
                );


                if (message) {

                    message.textContent =
                        "No se pudo iniciar la señal. Revisá la conexión.";

                }

            }

        }
    );


    /*
     * Cuando comienza la reproducción.
     */

    audio.addEventListener(
        "playing",
        () => {

            playButton.textContent =
                "❚❚";


            playButton.setAttribute(
                "aria-label",
                "Pausar radio"
            );


            if (disc) {

                disc.classList.add(
                    "playing"
                );

            }


            if (status) {

                status.textContent =
                    "● EN VIVO";

            }


            if (message) {

                message.textContent =
                    "Escuchando la señal en vivo.";

            }

        }
    );


    /*
     * Pausa.
     */

    audio.addEventListener(
        "pause",
        () => {

            playButton.textContent =
                "▶";


            playButton.setAttribute(
                "aria-label",
                "Reproducir radio"
            );


            if (disc) {

                disc.classList.remove(
                    "playing"
                );

            }


            if (status) {

                status.textContent =
                    "SEÑAL DISPONIBLE";

            }

        }
    );


    /*
     * Error del streaming.
     */

    audio.addEventListener(
        "error",
        () => {

            if (disc) {

                disc.classList.remove(
                    "playing"
                );

            }


            if (status) {

                status.textContent =
                    "SEÑAL NO DISPONIBLE";

            }


            if (message) {

                message.textContent =
                    "No fue posible conectar con la señal de radio.";

            }


            playButton.textContent =
                "▶";

        }
    );


    /*
     * Control de volumen.
     */

    volume.addEventListener(
        "input",
        () => {

            audio.volume =
                Number(volume.value);

        }
    );

}


/* =========================================================
   AÑO AUTOMÁTICO
   ========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            currentYear;

    });

}


/* =========================================================
   NAVEGACIÓN SUAVE
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) return;


        const targetId =
            link.getAttribute("href");


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

    }
);


/* =========================================================
   CONTROL DE ERRORES DE IMÁGENES
   ========================================================= */

document.addEventListener(
    "error",
    event => {

        const element =
            event.target;


        if (
            element &&
            element.tagName === "IMG"
        ) {

            element.classList.add(
                "image-error"
            );

            console.warn(
                "Imagen no encontrada:",
                element.src
            );

        }

    },
    true
);


/* =========================================================
   FIN
   ========================================================= */
```
