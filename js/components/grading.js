// js/components/grading.js

export function renderGrading() {
  const page = document.createElement("div");
  page.className = "grading-page";

  page.innerHTML = `
    <section class="grading-hero">
      <h2>Grading Helper</h2>
      <p class="grading-intro">
        Use this page as a quick checklist before you send a card to PSA, BGS, or SGC.
        Look at corners, edges, surface, and centering to decide if it’s worth grading.
      </p>
    </section>

    <section class="grading-grid">
      <article class="grading-card">
        <h3>Corners</h3>
        <p>Look for whitening, rounding, or dings. Sharp, clean corners are a must for high grades.</p>
      </article>

      <article class="grading-card">
        <h3>Edges</h3>
        <p>Check for chipping, nicks, or rough cuts along the borders of the card.</p>
      </article>

      <article class="grading-card">
        <h3>Surface</h3>
        <p>Tilt under light to spot scratches, print lines, dimples, and print defects.</p>
      </article>

      <article class="grading-card">
        <h3>Centering</h3>
        <p>Compare left/right and top/bottom borders. Poor centering can kill grades fast.</p>
      </article>
    </section>
  `;

  return page;
}
