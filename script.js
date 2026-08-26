/* =========================================================
   OCARINA PRODUCCIONES
   V7.1 · SISTEMA OPERATIVO
   Cultura · Historia · Memoria · Territorio · Turismo
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           01 · HEADER
        ===================================================== */

        const header =
            document.getElementById(
                "siteHeader"
            );


        function updateHeader() {

            if (!header) return;


            if (window.scrollY > 40) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
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
           02 · MENÚ MOBILE
        ===================================================== */

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const navLinks =
            document.getElementById(
                "navLinks"
            );


        function closeMenu() {

            if (!menuToggle || !navLinks) {
                return;
            }


            navLinks.classList.remove(
                "active"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            document.body.classList.remove(
                "no-scroll"
            );

        }


        if (
            menuToggle &&
            navLinks
        ) {

            menuToggle.addEventListener(
                "click",
                () => {

                    const active =
                        navLinks.classList.toggle(
                            "active"
                        );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        active
                            ? "true"
                            : "false"
                    );


                    document.body.classList.toggle(
                        "no-scroll",
                        active
                    );

                }
            );


            navLinks
                .querySelectorAll("a")
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            closeMenu
                        );

                    }
                );

        }



        /* =====================================================
           03 · ESC PARA CERRAR MENÚ
        ===================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeMenu();

                }

            }
        );



        /* =====================================================
           04 · REVEAL AL HACER SCROLL
        ===================================================== */

        const revealElements =
            document.querySelectorAll(
                ".universe-card, " +
                ".production-card, " +
                ".module-card, " +
                ".section-heading, " +
                ".intro-copy"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            "is-visible"
                                        );

                                    observer
                                        .unobserve(
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

                    element.classList.add(
                        "reveal-ready"
                    );


                    observer.observe(
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
           05 · ANCLAS INTERNAS
        ===================================================== */

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
                                link
                                    .getAttribute(
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


                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",
                                    block:
                                        "start"
                                }
                            );

                        }
                    );

                }
            );



        /* =====================================================
           06 · AÑO AUTOMÁTICO
        ===================================================== */

        document
            .querySelectorAll(
                "[data-year]"
            )
            .forEach(
                element => {

                    element.textContent =
                        new Date()
                            .getFullYear();

                }
            );



        /* =====================================================
           07 · IMÁGENES ROTAS
        ===================================================== */

        document
            .querySelectorAll("img")
            .forEach(
                image => {

                    image.addEventListener(
                        "error",
                        () => {

                            image.classList.add(
                                "image-error"
                            );


                            image.alt =
                                "Imagen de Ocarina";

                        }
                    );

                }
            );



        /* =====================================================
           08 · DETECCIÓN DE CONEXIÓN
        ===================================================== */

        function updateConnectionStatus() {

            document.body.dataset.online =
                navigator.onLine
                    ? "true"
                    : "false";

        }


        window.addEventListener(
            "online",
            updateConnectionStatus
        );


        window.addEventListener(
            "offline",
            updateConnectionStatus
        );


        updateConnectionStatus();



        /* =====================================================
           09 · PREVENIR DOBLE ENVÍO / DOBLE CLICK
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
                                "clicked"
                            );

                        }
                    );

                }
            );



        /* =====================================================
           10 · DIAGNÓSTICO
        ===================================================== */

        console.log(
            "======================================"
        );


        console.log(
            "OCARINA PRODUCCIONES V7.1"
        );


        console.log(
            "Sistema operativo iniciado"
        );


        console.log(
            "Cultura · Historia · Memoria · " +
            "Territorio · Turismo"
        );


        console.log(
            "======================================"
        );

    }
);
