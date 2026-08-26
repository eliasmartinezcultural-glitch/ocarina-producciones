/* =====================================================
   OCARINA PRODUCCIONES
   JAVASCRIPT V2
===================================================== */


/* =====================================================
   01 · ELEMENTOS
===================================================== */

const siteHeader =
    document.querySelector(".site-header");

const menuToggle =
    document.getElementById("menuToggle");

const mainNavigation =
    document.getElementById("mainNavigation");


const radioAudio =
    document.getElementById("radioAudio");

const radioPlay =
    document.getElementById("radioPlay");

const radioWave =
    document.getElementById("radioWave");

const radioStatus =
    document.getElementById("radioStatus");


const floatingRadio =
    document.getElementById("floatingRadio");

const floatingRadioButton =
    document.getElementById("floatingRadioButton");


/* =====================================================
   02 · NAVEGACIÓN / HEADER
===================================================== */

function updateHeader() {

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
   03 · MENÚ MOBILE
===================================================== */

function closeMobileMenu() {

    if (!mainNavigation) return;

    mainNavigation.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                mainNavigation.classList.contains("open");


            if (isOpen) {

                closeMobileMenu();

            } else {

                mainNavigation.classList.add("open");

                document.body.classList.add(
                    "menu-open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

}



document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });



/* =====================================================
   04 · SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".intro-grid, " +
        ".production, " +
        ".service-card, " +
        ".stories-intro, " +
        ".about-grid, " +
        ".contact-content"
    );


revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


/* =====================================================
   05 · RADIO
===================================================== */

let radioIsPlaying = false;

let radioReconnectAttempts = 0;

const maxRadioReconnectAttempts = 5;

let radioReconnectTimer = null;

let radioUserStopped = false;



function setRadioStatus(message) {

    if (radioStatus) {

        radioStatus.textContent = message;

    }

}



function setRadioPlayingState() {

    radioIsPlaying = true;

    radioUserStopped = false;

    radioReconnectAttempts = 0;


    radioPlay
        .querySelector(".play-icon")
        .textContent = "❚❚";


    radioPlay.setAttribute(
        "aria-pressed",
        "true"
    );


    radioWave.classList.add(
        "active"
    );


    floatingRadio.classList.add(
        "visible"
    );


    floatingRadio.setAttribute(
        "aria-hidden",
        "false"
    );


    floatingRadioButton.textContent =
        "❚❚";


    floatingRadioButton.setAttribute(
        "aria-label",
        "Pausar radio"
    );

}



function setRadioPausedState(
    status = "PAUSADO"
) {

    radioIsPlaying = false;


    radioPlay
        .querySelector(".play-icon")
        .textContent = "▶";


    radioPlay.setAttribute(
        "aria-pressed",
        "false"
    );


    radioWave.classList.remove(
        "active"
    );


    floatingRadioButton.textContent =
        "▶";


    floatingRadioButton.setAttribute(
        "aria-label",
        "Reproducir radio"
    );


    setRadioStatus(status);

}



function startRadio() {

    if (!radioAudio) return;


    if (radioIsPlaying) return;


    radioUserStopped = false;


    setRadioStatus(
        "CONECTANDO..."
    );


    radioPlay.disabled = true;


    const playPromise =
        radioAudio.play();


    if (
        playPromise !== undefined
    ) {

        playPromise

            .then(function () {

                radioPlay.disabled = false;

                setRadioPlayingState();

                setRadioStatus(
                    "REPRODUCIENDO EN VIVO"
                );

            })

            .catch(function (error) {

                radioPlay.disabled = false;

                setRadioPausedState(
                    "NO SE PUDO INICIAR"
                );

                console.warn(
                    "Radio:",
                    error
                );

            });

    }

}



function stopRadio(
    status = "PAUSADO"
) {

    if (!radioAudio) return;


    radioUserStopped = true;

    clearTimeout(
        radioReconnectTimer
    );


    radioAudio.pause();


    setRadioPausedState(
        status
    );

}



function reconnectRadio() {

    if (
        radioUserStopped ||
        !radioIsPlaying
    ) {

        return;

    }


    if (
        radioReconnectAttempts >=
        maxRadioReconnectAttempts
    ) {

        setRadioStatus(
            "NO SE PUDO RECONECTAR"
        );

        setRadioPausedState(
            "STREAM NO DISPONIBLE"
        );

        return;

    }


    radioReconnectAttempts++;


    setRadioStatus(
        "RECONECTANDO..."
    );


    clearTimeout(
        radioReconnectTimer
    );


    radioReconnectTimer =
        setTimeout(
            function () {

                const streamSource =
                    radioAudio.querySelector(
                        "source"
                    );


                if (!streamSource) {
                    return;
                }


                /*
                 * Recargamos el recurso del audio.
                 * El parámetro evita que el navegador
                 * reutilice una conexión fallida.
                 */

                const originalURL =
                    streamSource.src
                        .split("?")[0];


                streamSource.src =
                    originalURL +
                    "?reconnect=" +
                    Date.now();


                radioAudio.load();


                radioAudio
                    .play()

                    .then(function () {

                        radioReconnectAttempts = 0;

                        setRadioPlayingState();

                        setRadioStatus(
                            "REPRODUCIENDO EN VIVO"
                        );

                    })

                    .catch(function () {

                        reconnectRadio();

                    });

            },
            2500
        );

}



if (radioPlay) {

    radioPlay.addEventListener(
        "click",
        function () {

            if (
                radioAudio.paused
            ) {

                startRadio();

            } else {

                stopRadio();

            }

        }
    );

}



if (floatingRadioButton) {

    floatingRadioButton.addEventListener(
        "click",
        function () {

            if (
                radioAudio.paused
            ) {

                startRadio();

            } else {

                stopRadio();

            }

        }
    );

}



/* =====================================================
   06 · EVENTOS DE RADIO
===================================================== */

if (radioAudio) {


    radioAudio.addEventListener(
        "playing",
        function () {

            setRadioPlayingState();

            setRadioStatus(
                "REPRODUCIENDO EN VIVO"
            );

        }
    );



    radioAudio.addEventListener(
        "waiting",
        function () {

            if (radioIsPlaying) {

                setRadioStatus(
                    "CONECTANDO..."
                );

            }

        }
    );



    radioAudio.addEventListener(
        "stalled",
        function () {

            if (radioIsPlaying) {

                setRadioStatus(
                    "SEÑAL INESTABLE..."
                );

            }

        }
    );



    radioAudio.addEventListener(
        "error",
        function () {

            if (
                radioUserStopped
            ) {

                return;

            }


            setRadioStatus(
                "SEÑAL INTERRUMPIDA"
            );


            reconnectRadio();

        }
    );



    radioAudio.addEventListener(
        "ended",
        function () {

            if (
                !radioUserStopped
            ) {

                reconnectRadio();

            }

        }
    );



    radioAudio.addEventListener(
        "pause",
        function () {

            if (
                radioUserStopped
            ) {

                return;

            }


            /*
             * Si el navegador pausa el recurso
             * por una interrupción, intentamos
             * recuperarlo.
             */

            if (
                radioIsPlaying
            ) {

                reconnectRadio();

            }

        }
    );

}



/* =====================================================
   07 · MEDIA SESSION
   Controles del navegador / dispositivos
===================================================== */

if (
    "mediaSession" in navigator
) {

    try {

        navigator.mediaSession.metadata =
            new MediaMetadata({

                title:
                    "Radio Online",

                artist:
                    "Ocarina Producciones",

                album:
                    "Radio Online"

            });


        navigator.mediaSession.setActionHandler(
            "play",
            function () {

                startRadio();

            }
        );


        navigator.mediaSession.setActionHandler(
            "pause",
            function () {

                stopRadio();

            }
        );

    } catch (error) {

        console.warn(
            "Media Session no disponible:",
            error
        );

    }

}


/* =====================================================
   08 · VIDEOS YOUTUBE LAZY
===================================================== */

const lazyVideos =
    document.querySelectorAll(
        ".video-lazy"
    );


lazyVideos.forEach(function (videoContainer) {


    const button =
        videoContainer.querySelector(
            ".video-load"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        function () {


            const videoId =
                videoContainer.dataset.videoId;


            const videoTitle =
                videoContainer.dataset.videoTitle ||
                "Video de Ocarina Producciones";


            if (!videoId) return;


            /*
             * Creamos el iframe únicamente
             * cuando el usuario solicita el video.
             */

            const iframe =
                document.createElement(
                    "iframe"
                );


            iframe.src =
                "https://www.youtube.com/embed/" +
                encodeURIComponent(videoId) +
                "?rel=0&modestbranding=1&playsinline=1&autoplay=1";


            iframe.title =
                videoTitle;


            iframe.loading =
                "eager";


            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


            iframe.allowFullscreen =
                true;


            videoContainer.innerHTML =
                "";


            videoContainer.appendChild(
                iframe
            );

        }
    );

});


/* =====================================================
   09 · CERRAR MENÚ CON ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   10 · EVITAR SCROLL AUTOMÁTICO EXTRA
===================================================== */

window.addEventListener(
    "pageshow",
    function () {

        /*
         * No iniciamos la radio automáticamente.
         * El usuario conserva el control del audio.
         */

    }
);


/* =====================================================
   FIN
===================================================== */
