"use strict";

/* =========================================================
   POREWA — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. DOM ELEMENTS
   ========================================================= */

const pageLoader = document.getElementById("pageLoader");
const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   2. PAGE LOADER
   ========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (pageLoader) {
            pageLoader.classList.add("loaded");
        }

    }, 500);

});


/* =========================================================
   3. CURRENT YEAR
   ========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   4. STICKY HEADER
   ========================================================= */

function handleHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeader);

handleHeader();


/* =========================================================
   5. MOBILE NAVIGATION
   ========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.classList.toggle("active");

        navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close menu when clicking a link */

    const links =
        navLinks.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   6. HERO SLIDER
   ========================================================= */

const slides =
    document.querySelectorAll(".hero-slide");

const nextButton =
    document.getElementById("heroNext");

const prevButton =
    document.getElementById("heroPrev");

const currentSlide =
    document.getElementById("currentSlide");

const totalSlides =
    document.getElementById("totalSlides");


let slideIndex = 0;

let slideTimer;


/* Set total number */

if (totalSlides) {

    totalSlides.textContent =
        String(slides.length).padStart(2, "0");

}


/* Show slide */

function showSlide(index) {

    if (!slides.length) return;


    /* Loop forward */

    if (index >= slides.length) {

        slideIndex = 0;

    }


    /* Loop backward */

    if (index < 0) {

        slideIndex =
            slides.length - 1;

    }


    slides.forEach(slide => {

        slide.classList.remove("active");

    });


    slides[slideIndex]
        .classList.add("active");


    if (currentSlide) {

        currentSlide.textContent =
            String(slideIndex + 1)
                .padStart(2, "0");

    }

}


/* Next */

function nextSlide() {

    slideIndex++;

    showSlide(slideIndex);

    restartSlider();

}


/* Previous */

function previousSlide() {

    slideIndex--;

    showSlide(slideIndex);

    restartSlider();

}


/* Buttons */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextSlide
    );

}

if (prevButton) {

    prevButton.addEventListener(
        "click",
        previousSlide
    );


}


/* Automatic slider */

function startSlider() {

    if (slides.length <= 1) return;

    slideTimer =
        setInterval(() => {

            slideIndex++;

            showSlide(slideIndex);

        }, 6000);

}


function restartSlider() {

    clearInterval(slideTimer);

    startSlider();

}


/* Initialize */

showSlide(0);

startSlider();


/* =========================================================
   7. LOAD HERO IMAGES
   ========================================================= */

slides.forEach(slide => {

    const image =
        slide.dataset.image;

    if (!image) return;

    slide.style.backgroundImage =
        `url("${image}")`;

});


/* =========================================================
   8. SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");

                    revealObserver
                        .unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   9. ANIMATED COUNTERS
   ========================================================= */

const counters =
    document.querySelectorAll(
        ".stat-number"
    );


let countersStarted = false;


function animateCounter(counter) {

    const target =
        Number(
            counter.dataset.target
        );

    if (!Number.isFinite(target)) return;


    const duration = 1800;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /* Ease-out animation */

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                eased * target
            );


        counter.textContent =
            value.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target.toLocaleString();

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* Counter observer */

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !countersStarted
                ) {

                    countersStarted = true;

                    counters.forEach(
                        animateCounter
                    );

                    counterObserver
                        .disconnect();

                }

            });

        },
        {
            threshold: 0.35
        }
    );


if (counters.length) {

    counterObserver.observe(
        counters[0]
    );

}


/* =========================================================
   10. PROGRAM MODAL
   ========================================================= */

const programModal =
    document.getElementById(
        "programModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalNumber =
    document.getElementById(
        "modalNumber"
    );

const programCards =
    document.querySelectorAll(
        ".program-card"
    );


const programData = {

    leadership: {

        number: "01",

        title: "Leadership",

        description:
            "We help develop confident, responsible and purpose-driven leaders who can create positive change in their communities."

    },

    community: {

        number: "02",

        title: "Community",

        description:
            "We connect people and encourage collaboration to build stronger, more connected and resilient communities."

    },

    education: {

        number: "03",

        title: "Education",

        description:
            "We create opportunities for people to develop knowledge, practical skills and confidence for the future."

    },

    youth: {

        number: "04",

        title: "Youth",

        description:
            "We support young people with opportunities, mentorship and experiences that help them discover their potential."

    }

};


function openProgramModal(program) {

    const data =
        programData[program];

    if (!data || !programModal) return;


    modalNumber.textContent =
        data.number;

    modalTitle.textContent =
        data.title;

    modalDescription.textContent =
        data.description;


    programModal.classList.add(
        "active"
    );

    programModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeProgramModal() {

    if (!programModal) return;


    programModal.classList.remove(
        "active"
    );

    programModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* Program cards */

programCards.forEach(card => {

    const button =
        card.querySelector(
            ".program-link"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const program =
                card.dataset.program;

            openProgramModal(program);

        }
    );

});


/* Close button */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProgramModal
    );

}


/* Close by clicking backdrop */

if (programModal) {

    programModal.addEventListener(
        "click",
        event => {

            if (
                event.target.classList
                    .contains(
                        "modal-backdrop"
                    )
            ) {

                closeProgramModal();

            }

        }
    );

}


/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeProgramModal();

        }

    }
);


/* =========================================================
   11. CONTACT FORM
   ========================================================= */


/* =========================================================
   12. BACK TO TOP
   ========================================================= */

function handleBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 600) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

    }

}


window.addEventListener(
    "scroll",
    handleBackToTop
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   13. ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const id =
                        entry.target.id;


                    navigationLinks
                        .forEach(link => {

                            link.classList
                                .remove(
                                    "active"
                                );


                            if (
                                link.getAttribute(
                                    "href"
                                ) === `#${id}`
                            ) {

                                link.classList
                                    .add(
                                        "active"
                                    );

                            }

                        });

                }

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(section => {

    sectionObserver.observe(
        section
    );

});


/* =========================================================
   14. INITIALIZATION MESSAGE
   ========================================================= */

console.log(
    "%cPLp website initialized successfully.",
    "color:#c7a76a;font-weight:bold;"
);
const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    // Allowed Credentials
    const validPassword = "urugwiro";

    if( password === validPassword){

        document.getElementById("error").innerHTML =

        "<span class='success'>Login successfully ....</span>";
      
        

        // Redirect after login
        setTimeout(() => {
            window.location.href = "member.html";
        }, 1000);

    } else {

        document.getElementById("error").innerHTML =
        "Invalid password";

    }

});
