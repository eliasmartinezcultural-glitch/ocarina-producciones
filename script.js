```javascript
/* =========================================================
   OCARINA PRODUCCIONES
   SCRIPT V7.2

   RADIO · MENÚ · SCROLL · ANIMACIONES · NAVEGACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

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

    const radioVolume =
        document.getElementById("radioVolume");

    const radioDisc =
        document.querySelector(".radio-disc");

    const radioStatus =
        document.getElementById("radioStatus");

    const radioMessage =
        document.getElementById("radioMessage");

    const yearElement =
        document.querySelector("[data-year]");


    /* =====================================================
       RADIO CADENA OASIS
    ===================================================== */

    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";

    let radioInitialized = false;
    let radioPlaying = false;


    /*
       Inicializa el stream solamente cuando
       el usuario intenta reproducirlo.
    */

    function initializeRadio() {

        if (radioInitialized) {
            return;
        }

        if (!radioAudio) {
            return;
        }

        radioAudio.src = RADIO_STREAM;

        radioAudio.preload = "none";

        radioAudio.volume =
            radioVolume
                ? Number(radioVolume.value)
                : 0.8;

        radioInitialized = true;
    }


    /*
       Actualiza visualmente el reproductor.
    */

    function setRadioPlayingState(isPlaying) {

        radioPlaying = isPlaying;


        if (radioPlay) {

            radioPlay.textContent =
                isPlaying
                    ? "❚❚"
                    : "▶";

            radioPlay.setAttribute(
                "aria-label",
                isPlaying
                    ? "Pausar radio"
                    : "Reproducir radio"
            );
        }


        if (radioDisc) {

            radioDisc.classList.toggle(
                "playing",
                isPlaying
            );
        }


        if (radioStatus) {

            radioStatus.textContent =
                isPlaying
                    ? "EN VIVO"
                    : "EN ESPERA";
        }

    }


    /*
       Reproduce la radio.
    */

    async function playRadio() {

        if (!radioAudio) {
            return;
        }

        initializeRadio();


        if (radioMessage) {

            radioMessage.textContent =
                "Conectando con Radio Cadena Oasis...";
        }


        try {

            await radioAudio.play();

            setRadioPlayingState(true);


            if (radioMessage) {

                radioMessage.textContent =
                    "Radio Cadena Oasis · FM 92.5 · En vivo";

            }

        } catch (error) {

            setRadioPlayingState(false);


            if (radioMessage) {

                radioMessage.textContent =
                    "No se pudo conectar al streaming. Intentá nuevamente.";

            }

            console.warn(
                "Ocarina Radio:",
                error
            );

        }

    }


    /*
       Pausa la radio.
    */

    function pauseRadio() {

        if (!radioAudio) {
            return;
        }

        radioAudio.pause();

        setRadioPlayingState(false);


        if (radioMessage) {

            radioMessage.textContent =
                "Radio pausada.";

        }

    }


    /*
       Botón principal.
    */

    if (radioPlay) {

        radioPlay.addEventListener(
            "click",
            () => {

                if (radioPlaying) {

                    pauseRadio();

                } else {

                    playRadio();

                }

            }
        );

    }


    /*
       Control de volumen.
    */

    if (radioVolume) {

        radioVolume.addEventListener(
            "input",
            () => {

                if (!radioAudio) {
                    return;
                }

                radioAudio.volume =
                    Number(radioVolume.value);

            }
        );

    }


    /*
       Si el audio termina.
    */

    if (radioAudio) {

        radioAudio.addEventListener(
            "ended",
            () => {

                setRadioPlayingState(false);

                if (radioMessage) {

                    radioMessage.textContent =
                        "La transmisión se detuvo.";

                }

            }
        );


        /*
           Error de conexión.
        */

        radioAudio.addEventListener(
            "error",
            () => {

                setRadioPlayingState(false);

                if (radioMessage) {

                    radioMessage.textContent =
                        "No se pudo conectar con la transmisión.";

                }

            }
        );

    }



    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    function closeMobileMenu() {

        if (!navLinks || !menuToggle) {
            return;
        }

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        /*
           Cerrar menú al seleccionar
           una sección.
        */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            });

    }



    /* =====================================================
       HEADER AL HACER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 40) {

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



    /* =====================================================
       ANIMACIONES DE ENTRADA
    ===================================================== */

    /*
       Agregamos automáticamente la clase
       reveal a elementos importantes.
    */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".universe-card, " +
            ".production-card, " +
            ".module-card, " +
            ".radio-player, " +
            ".participation-grid, " +
            ".intro-grid"
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    /*
       IntersectionObserver permite que
       las secciones aparezcan al entrar
       en pantalla.
    */

    if (
        "IntersectionObserver"
        in window
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
                    threshold: 0.12
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

        /*
           Compatibilidad con navegadores
           que no soportan IntersectionObserver.
        */

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =====================================================
       AÑO AUTOMÁTICO
    ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       NAVEGACIÓN INTERNA
    ===================================================== */

    /*
       Evita comportamientos extraños
       cuando se utilizan enlaces con #
       dentro del sitio.
    */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


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


                        const headerHeight =
                            siteHeader
                                ? siteHeader.offsetHeight
                                : 0;


                        const targetPosition =
                            target.getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            headerHeight;


                        window.scrollTo({

                            top: targetPosition,

                            behavior: "smooth"

                        });


                        closeMobileMenu();

                    }
                );

            }
        );



    /* =====================================================
       ESC PARA CERRAR MENÚ
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       CERRAR MENÚ AL HACER CLICK FUERA
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !navLinks ||
                !menuToggle
            ) {

                return;

            }


            const clickedInsideMenu =
                navLinks.contains(
                    event.target
                );


            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       INICIALIZACIÓN FINAL
    ===================================================== */

    setRadioPlayingState(false);


    console.log(
        "Ocarina Producciones V7.2 · Sistema iniciado."
    );

});
```
