/* ============================================================
   SCRIPT.JS — Site Dani Santos
   ============================================================ */

/* ------------------------------------------------------------
   1. PREFERÊNCIA DE MOVIMENTO REDUZIDO
------------------------------------------------------------ */

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

window.prefersReducedMotion = reducedMotionQuery.matches;

reducedMotionQuery.addEventListener("change", (event) => {
  window.prefersReducedMotion = event.matches;
});

/* ------------------------------------------------------------
   2. PLAYER — CONHEÇA A DANI
------------------------------------------------------------ */

const daniVideo = document.querySelector(".about-dani__video");
const daniPlayButton = document.querySelector(".about-dani__play");

if (daniVideo && daniPlayButton) {
  daniPlayButton.addEventListener("click", () => {
    daniVideo.play();
    daniVideo.controls = true;
    daniPlayButton.hidden = true;
  });

  daniVideo.addEventListener("ended", () => {
    daniVideo.controls = false;
    daniPlayButton.hidden = false;
  });
}

/* ------------------------------------------------------------
   3. CARROSSEL — DEPOIMENTOS
------------------------------------------------------------ */

const testimonialsCarousel = document.querySelector(".testimonials__carousel");

const testimonialsTrack = document.querySelector(".testimonials__track");

const testimonialsPrev = document.querySelector(".testimonials__arrow--prev");

const testimonialsNext = document.querySelector(".testimonials__arrow--next");

if (testimonialsCarousel && testimonialsTrack) {
  /* Cards originais */
  const originalCards = [...testimonialsTrack.children];

  /* Duplica os cards para criar o loop infinito */
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);

    clone.setAttribute("aria-hidden", "true");

    testimonialsTrack.appendChild(clone);
  });

  let isPaused = false;

  let position = testimonialsCarousel.scrollLeft;

  const speed = 0.6;

  /* ----------------------------------------------------------
     AUTOPLAY INFINITO
  ---------------------------------------------------------- */

  function autoplayTestimonials() {
    if (!isPaused && !window.prefersReducedMotion) {
      position += speed;

      const halfway = testimonialsTrack.scrollWidth / 2;

      if (position >= halfway) {
        position -= halfway;
      }

      testimonialsCarousel.scrollLeft = position;
    }

    requestAnimationFrame(autoplayTestimonials);
  }

  requestAnimationFrame(() => {
    position = testimonialsCarousel.scrollLeft;

    autoplayTestimonials();
  });

  /* ----------------------------------------------------------
     PAUSA AO PASSAR O MOUSE
  ---------------------------------------------------------- */

  testimonialsCarousel.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  testimonialsCarousel.addEventListener("mouseleave", () => {
    position = testimonialsCarousel.scrollLeft;
    isPaused = false;
  });

  /* ----------------------------------------------------------
     INTERAÇÃO MANUAL / MOBILE
  ---------------------------------------------------------- */

  testimonialsCarousel.addEventListener("pointerdown", () => {
    isPaused = true;
  });

  testimonialsCarousel.addEventListener("pointerup", () => {
    position = testimonialsCarousel.scrollLeft;

    setTimeout(() => {
      isPaused = false;
    }, 1200);
  });

  testimonialsCarousel.addEventListener("pointercancel", () => {
    position = testimonialsCarousel.scrollLeft;
    isPaused = false;
  });

  testimonialsCarousel.addEventListener("scroll", () => {
    if (isPaused) {
      position = testimonialsCarousel.scrollLeft;
    }
  });

  /* ----------------------------------------------------------
     DISTÂNCIA DE UM CARD
  ---------------------------------------------------------- */

  function getCardDistance() {
    const card = testimonialsTrack.querySelector(".testimonial-card");

    if (!card) {
      return 300;
    }

    const trackStyles = getComputedStyle(testimonialsTrack);

    const gap = parseFloat(trackStyles.gap) || 0;

    return card.offsetWidth + gap;
  }

  /* ----------------------------------------------------------
     BOTÃO PRÓXIMO
  ---------------------------------------------------------- */

  testimonialsNext?.addEventListener("click", () => {
    isPaused = true;

    const distance = getCardDistance();

    position = testimonialsCarousel.scrollLeft + distance;

    testimonialsCarousel.scrollTo({
      left: position,
      behavior: "smooth",
    });

    setTimeout(() => {
      position = testimonialsCarousel.scrollLeft;

      isPaused = false;
    }, 1000);
  });

  /* ----------------------------------------------------------
     BOTÃO ANTERIOR
  ---------------------------------------------------------- */

  testimonialsPrev?.addEventListener("click", () => {
    isPaused = true;

    const distance = getCardDistance();

    position = testimonialsCarousel.scrollLeft - distance;

    testimonialsCarousel.scrollTo({
      left: position,
      behavior: "smooth",
    });

    setTimeout(() => {
      position = testimonialsCarousel.scrollLeft;

      isPaused = false;
    }, 1000);
  });
}
/* ------------------------------------------------------------
   SCROLL REVEAL — SEÇÃO 3
------------------------------------------------------------ */

const transformationSection = document.querySelector(".transformation");

if (transformationSection) {
  const transformationItems = transformationSection.querySelectorAll(
    ".transformation__step, .transformation__wave",
  );

  if (window.prefersReducedMotion) {
    transformationItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  } else {
    const transformationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            transformationItems.forEach((item) => {
              item.classList.add("is-visible");
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
      },
    );

    transformationObserver.observe(transformationSection);
  }
}
