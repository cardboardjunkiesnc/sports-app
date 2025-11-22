// Simple grading tool to estimate a grade score based on inputs.
// This is only a demo; real grading is complex and handled by graders.
export function renderGrading() {
  const root = document.createElement('div');
  root.className = 'form';
  root.innerHTML = `
    <h2>Grading Tool (demo)</h2>
    <p class="kicker">Estimate a grade score using simple inputs.</p>
    <form id="gradeForm">
      <div class="row"><label for="centering">Centering (0-100)</label><input id="centering" name="centering" type="text" value="90" /></div>
      <div class="row"><label for="edges">Edges (0-100)</label><input id="edges" name="edges" type="text" value="90" /></div>
      <div class="row"><label for="corners">Corners (0-100)</label><input id="corners" name="corners" type="text" value="90" /></div>
      <div class="row"><label for="surface">Surface (0-100)</label><input id="surface" name="surface" type="text" value="90" /></div>
      <div class="row" style="margin-top:0.6rem;"><button type="submit">Estimate Grade</button></div>
    </form>
    <div id="gradeResult" style="margin-top:0.6rem;"></div>
  `;
  root.querySelector('#gradeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const cent = clampNum(f.centering.value,0,100);
    const edges = clampNum(f.edges.value,0,100);
    const corners = clampNum(f.corners.value,0,100);
    const surface = clampNum(f.surface.value,0,100);
    // simple weighted average -> convert to grade label
    const score = Math.round((cent*0.3 + edges*0.25 + corners*0.25 + surface*0.2) / 10) * 10;
    const label = score >= 90 ? 'Gem Mint' : score >= 80 ? 'Mint' : score >= 70 ? 'Near Mint' : 'Good/Fair';
    root.querySelector('#gradeResult').innerHTML = `<strong>Score:</strong> ${score} — <em>${label}</em>`;
  });

  return root;
}

function clampNum(v, min, max) {
  const n = Number(v);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}