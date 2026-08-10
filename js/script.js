/* ============================================================
   SCRIPT.JS — Fundação
   Nesta etapa: só o essencial para as seções futuras terem
   uma base pronta. Nenhum comportamento de seção específica
   (carrossel, coreografia tipográfica, pulsação do CTA) é
   implementado aqui ainda.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Preferência de movimento reduzido.
     Exposta em window.prefersReducedMotion para que os módulos
     que vamos adicionar seção por seção (carrossel, CTA final,
     onda vocal) consultem a mesma fonte, em vez de cada um
     checar o media query de novo.
  ---------------------------------------------------------- */
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  window.prefersReducedMotion = reducedMotionQuery.matches;

  reducedMotionQuery.addEventListener("change", (event) => {
    window.prefersReducedMotion = event.matches;
  });

  /* ----------------------------------------------------------
     Placeholder — scroll reveal (IntersectionObserver)
     Será implementado quando começarmos a Hero / A Crença,
     que dependem de fade-in ao entrar no viewport. Deixado
     comentado de propósito para não gerar código sem uso.
  ---------------------------------------------------------- */

  // const revealObserver = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       entry.target.classList.add("is-visible");
  //       revealObserver.unobserve(entry.target);
  //     }
  //   });
  // }, { threshold: 0.2 });
  //
  // document.querySelectorAll("[data-reveal]").forEach((el) => {
  //   revealObserver.observe(el);
  // });
})();
