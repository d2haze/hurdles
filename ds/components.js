/**
 * DS — Hurdle Analysis Design System
 * All UI passes through this library. No bypassing.
 */
const DS = {

  // ── Result banner ────────────────────────────────────────────────────
  // items: Array<{ label: string, value: string, unit?: string, valueStyle?: string }>
  resultBanner(items, style) {
    const cells = items.map(({ label, value, unit, valueStyle }) =>
      `<div>
        <div class="result-label">${label}</div>
        <div class="result-value"${valueStyle ? ` style="${valueStyle}"` : ''}>
          ${value}${unit ? `<span class="result-unit">${unit}</span>` : ''}
        </div>
      </div>`
    ).join('');
    return `<div class="result-banner"${style ? ` style="${style}"` : ''}>${cells}</div>`;
  },

  // ── Single pace bar ──────────────────────────────────────────────────
  paceBar(label, pct, color, displayValue) {
    return `<div class="pace-bar-row">
      <div class="pace-bar-label">${label}</div>
      <div class="pace-bar-track">
        <div class="pace-bar-fill" style="width:${pct.toFixed(1)}%;background:${color}"></div>
      </div>
      <div class="pace-bar-val">${displayValue}</div>
    </div>`;
  },

  // ── Hurdle table ─────────────────────────────────────────────────────
  // headers: Array<string | { text: string, style?: string }>
  // rows:    Array<{ cells: Array<string | { text: string, cls?: string, style?: string }>, highlight?: bool, cls?: string }>
  hurdleTable(headers, rows) {
    const ths = headers.map(h =>
      typeof h === 'string'
        ? `<th>${h}</th>`
        : `<th${h.style ? ` style="${h.style}"` : ''}>${h.text}</th>`
    ).join('');

    const trs = rows.map(({ cells, highlight, cls }) => {
      const rowCls = highlight ? 'highlight' : (cls || '');
      const tds = cells.map(c =>
        typeof c === 'string'
          ? `<td>${c}</td>`
          : `<td${c.cls ? ` class="${c.cls}"` : ''}${c.style ? ` style="${c.style}"` : ''}>${c.text ?? ''}</td>`
      ).join('');
      return `<tr${rowCls ? ` class="${rowCls}"` : ''}>${tds}</tr>`;
    }).join('');

    return `<div class="overflow-x"><table class="hurdle-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
  },

  // ── Note / callout ───────────────────────────────────────────────────
  note(html, style) {
    return `<div class="note"${style ? ` style="${style}"` : ''}>${html}</div>`;
  },

  // ── Section heading ──────────────────────────────────────────────────
  sectionHead(text, style) {
    return `<div class="section-head"${style ? ` style="${style}"` : ''}>${text}</div>`;
  },

  // ── Formula box ──────────────────────────────────────────────────────
  formulaBox(eq, desc, style) {
    return `<div class="formula-box"${style ? ` style="${style}"` : ''}>
      <div class="formula-eq">${eq}</div>
      <div class="formula-desc">${desc}</div>
    </div>`;
  },

  // ── Conversion grid ──────────────────────────────────────────────────
  // cells: Array<{ label: string, value: string, unit?: string, style?: string }>
  convGrid(cells) {
    const inner = cells.map(({ label, value, unit, style }) =>
      `<div class="conv-result"${style ? ` style="${style}"` : ''}>
        <div class="conv-label">${label}</div>
        <div class="conv-value">${value}${unit ? `<span class="conv-unit">${unit}</span>` : ''}</div>
      </div>`
    ).join('');
    return `<div class="conv-grid">${inner}</div>`;
  },

  // ── Summary card (race analyzer) ─────────────────────────────────────
  summaryCard(label, value, unit, diffText, diffColor, accentColor) {
    return `<div class="summary-card" style="border-left:4px solid ${accentColor}">
      <div class="summary-card-label">${label}</div>
      <div class="summary-card-value">${value}<span class="summary-card-unit" style="color:${accentColor}">${unit}</span></div>
      <div class="summary-card-diff" style="color:${diffColor}">${diffText}</div>
    </div>`;
  },

  // ── Status / diff color helpers ──────────────────────────────────────

  // For entry cell border-bottom status (bg on dark cell)
  statusColor(diff) {
    if (diff === null || diff === undefined) return 'transparent';
    return diff > 0.1 ? 'var(--red)' : diff < -0.1 ? 'var(--green)' : 'var(--gold)';
  },

  // For table diff cells (red/green/neutral on light bg)
  diffColor(diff) {
    return diff > 0.1 ? 'var(--red-light)' : diff < -0.1 ? 'var(--green-mid)' : 'var(--ink3)';
  },

  // For summary card diff text (on dark bg)
  summaryDiffColor(diff) {
    return diff > 0.1 ? 'var(--amber)' : diff < -0.1 ? 'var(--green-light)' : 'rgba(255,255,255,0.8)';
  },

  // ── Pace bar color helpers ───────────────────────────────────────────

  paceColor110(i, isCZ) {
    return isCZ ? 'var(--gold)' : i < 4 ? 'var(--gold-accent)' : i < 8 ? 'var(--violet-light)' : 'var(--ink3)';
  },

  paceColor100w(i, isPeak) {
    return isPeak ? 'var(--gold)' : i < 3 ? 'var(--gold-accent)' : i < 6 ? 'var(--violet-light)' : 'var(--ink3)';
  },

  paceColor400(i) {
    return i < 2 ? 'var(--gold)' : i < 6 ? 'var(--green)' : i < 9 ? 'var(--ink3)' : 'var(--red)';
  },

  paceColor300h(i) {
    return i === 0 ? 'var(--gold)' : i < 4 ? 'var(--purple)' : i < 6 ? 'var(--violet)' : 'var(--red)';
  },
};
