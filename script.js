/* =========================================================
   UNIVERSO OCARINA
   SCRIPT V15
   SISTEMA INTERACTIVO
   Cultura · Historia · Turismo · Territorio · Radio
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01 · HEADER
    ===================================================== */

    const header = document.getElementById("siteHeader");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =====================================================
       02 · MENÚ MOBILE
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const active = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                active ? "true" : "false"
            );

            document.body.classList.toggle(
                "no-scroll",
                active
            );

        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("no-scroll");

            });

        });

    }


    /* =====================================================
       03 · ANIMACIONES AL HACER SCROLL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .universe-card, .archive-card, .service-card, .production"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal-ready");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       04 · RADIO OCARINA
    ===================================================== */

    const radioAudio =
        document.getElementById("radioAudio");

    const radioPlay =
        document.getElementById("radioPlay");

    const miniPlay =
        document.getElementById("miniPlay");

    const radioVolume =
        document.getElementById("radioVolume");

    const radioStatus =
        document.getElementById("radioStatus");

    const radioMessage =
        document.getElementById("radioMessage");

    const miniStatus =
        document.getElementById("miniStatus");

    const radioDisc =
        document.getElementById("radioDisc");


    const RADIO_STREAM =
        "https://stream.zeno.fm/amfjjcz4tlgtv";


    let radioReady = false;


    function initializeRadio() {

        if (!radioAudio) return;

        if (!radioReady) {

            radioAudio.src = RADIO_STREAM;

            radioAudio.preload = "none";

            radioReady = true;

        }

    }


    function updateRadioInterface(isPlaying) {

        if (radioPlay) {

            radioPlay.textContent =
                isPlaying ? "❚❚" : "▶";

        }


        if (miniPlay) {

            miniPlay.textContent =
                isPlaying ? "❚❚" : "▶";

        }


        if (radioStatus) {

            radioStatus.textContent =
                isPlaying
                    ? "RADIO OCARINA · EN VIVO"
                    : "RADIO OCARINA · LISTO";

        }


        if (miniStatus) {

            miniStatus.textContent =
                isPlaying
                    ? "EN VIVO"
                    : "LISTO";

        }


        if (radioMessage) {

            radioMessage.textContent =
                isPlaying
                    ? "Transmitiendo desde Ocarina."
                    : "Presioná reproducir para escuchar.";

        }


        if (radioDisc) {

            radioDisc.classList.toggle(
                "playing",
                isPlaying
            );

        }

    }


    async function toggleRadio() {

        if (!radioAudio) return;

        initializeRadio();


        if (radioAudio.paused) {

            try {

                await radioAudio.play();

                updateRadioInterface(true);

            } catch (error) {

                console.error(
                    "No se pudo reproducir la radio:",
                    error
                );


                if (radioMessage) {

                    radioMessage.textContent =
                        "No se pudo iniciar la transmisión.";

                }

            }

        } else {

            radioAudio.pause();

            updateRadioInterface(false);

        }

    }


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
            Number(radioVolume.value);


        radioVolume.addEventListener(
            "input",
            () => {

                radioAudio.volume =
                    Number(radioVolume.value);

            }
        );

    }


    if (radioAudio) {

        radioAudio.addEventListener(
            "play",
            () => {

                updateRadioInterface(true);

            }
        );


        radioAudio.addEventListener(
            "pause",
            () => {

                updateRadioInterface(false);

            }
        );


        radioAudio.addEventListener(
            "error",
            () => {

                if (radioStatus) {

                    radioStatus.textContent =
                        "RADIO OCARINA · SIN SEÑAL";

                }


                if (miniStatus) {

                    miniStatus.textContent =
                        "SIN SEÑAL";

                }

            }
        );

    }


    /* =====================================================
       05 · BOTONES DE RADIO
    ===================================================== */

    const radioLinks =
        document.querySelectorAll(
            "[data-radio-play]"
        );


    radioLinks.forEach(button => {

        button.addEventListener(
            "click",
            toggleRadio
        );

    });


    /* =====================================================
       06 · BOTÓN VOLVER ARRIBA
    ===================================================== */

    const backTop =
        document.getElementById("backTop");


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 600) {

                    backTop.classList.add("visible");

                } else {

                    backTop.classList.remove("visible");

                }

            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       07 · ENLACES INTERNOS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute("href");

                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(targetID);


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       08 · FILTRO DE CONTENIDOS
       Preparado para Archivo / Cultura / Turismo
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            "[data-filter]"
        );


    const filterItems =
        document.querySelectorAll(
            "[data-category]"
        );


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                filterButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                filterItems.forEach(item => {

                    const category =
                        item.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        item.removeAttribute(
                            "hidden"
                        );

                    } else {

                        item.setAttribute(
                            "hidden",
                            ""
                        );

                    }

                });

            }
        );

    });


    /* =====================================================
       09 · MODAL / VISOR
       Preparado para fotografías y documentos
    ===================================================== */

    const modal =
        document.getElementById("mediaModal");


    const modalImage =
        document.getElementById("modalImage");


    const modalTitle =
        document.getElementById("modalTitle");


    const modalDescription =
        document.getElementById("modalDescription");


    const modalClose =
        document.getElementById("modalClose");


    const mediaTriggers =
        document.querySelectorAll(
            "[data-media]"
        );


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.classList.remove(
            "no-scroll"
        );

    }


    mediaTriggers.forEach(trigger => {

        trigger.addEventListener(
            "click",
            () => {

                if (!modal) return;


                const image =
                    trigger.dataset.media;


                const title =
                    trigger.dataset.title || "";


                const description =
                    trigger.dataset.description || "";


                if (modalImage && image) {

                    modalImage.src = image;

                }


                if (modalTitle) {

                    modalTitle.textContent =
                        title;

                }


                if (modalDescription) {

                    modalDescription.textContent =
                        description;

                }


                modal.classList.add(
                    "active"
                );


                document.body.classList.add(
                    "no-scroll"
                );

            }
        );

    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       10 · AÑO AUTOMÁTICO
    ===================================================== */

    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       11 · CONTADOR DE VISITAS DE SESIÓN
       No almacena datos personales.
    ===================================================== */

    const visitCounter =
        document.getElementById(
            "visitCounter"
        );


    if (visitCounter) {

        let visits =
            Number(
                sessionStorage.getItem(
                    "ocarina_session_visits"
                )
            ) || 0;


        visits++;


        sessionStorage.setItem(
            "ocarina_session_visits",
            visits
        );


        visitCounter.textContent =
            visits;

    }


    /* =====================================================
       12 · DETECCIÓN DE CONEXIÓN
    ===================================================== */

    const connectionStatus =
        document.getElementById(
            "connectionStatus"
        );


    function updateConnection() {

        if (!connectionStatus) return;


        if (navigator.onLine) {

            connectionStatus.textContent =
                "CONECTADO";

            connectionStatus.classList.remove(
                "offline"
            );

        } else {

            connectionStatus.textContent =
                "SIN CONEXIÓN";

            connectionStatus.classList.add(
                "offline"
            );

        }

    }


    window.addEventListener(
        "online",
        updateConnection
    );


    window.addEventListener(
        "offline",
        updateConnection
    );


    updateConnection();


    /* =====================================================
       13 · AÑO / SISTEMA
    ===================================================== */

    console.log(
        "=========================================="
    );

    console.log(
        "UNIVERSO OCARINA · SISTEMA INICIADO"
    );

    console.log(
        "Cultura · Historia · Territorio · Turismo"
    );

    console.log(
        "=========================================="

    );

});
