# DESIGN.md — Hurdle Analysis Tool

> **Read this before every UI change.** This file is the source of truth for visual
> style. If a decision isn't here, add it here before you ship it.

---

## 1. Color

All colors are defined as CSS custom properties in `ds/tokens.css`.
Never hard-code a hex value in a component; always reference a token.

### Palette

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f0ecf8` | Page background |
| `--bg2` | `#e6e0f4` | Input backgrounds, table headers |
| `--bg3` | `#d9d0ed` | Hover states, disabled cells |
| `--card` | `#ffffff` | Card backgrounds |
| `--header` | `#2d1b6e` | Site header, hero, dark cards |
| `--ink` | `#1a1035` | Body text |
| `--ink2` | `#3d2d6a` | Secondary body text |
| `--ink3` | `#6b5b8a` | Labels, captions, muted text |
| `--purple` | `#4c2fa0` | Primary action, active tabs |
| `--purple2` | `#3b2280` | Hover on primary |
| `--gold` | `#c4900a` | Accent, underlines, highlights |
| `--gold2` | `#a87408` | Hover gold, secondary gold |
| `--gold-accent` | `#d4a017` | Pace bars (early intervals) |
| `--violet` | `#7c5cbf` | Speed values in tables |
| `--violet-light` | `#a78bfa` | Pace bars (mid intervals) |
| `--border` | `#c4b8e0` | Default borders |
| `--border2` | `#a090c8` | Stronger borders, focus rings |

### Status colors

| Token | Value | Meaning |
|---|---|---|
| `--green` | `#15803d` | Under ideal (fast) — table cells |
| `--green-mid` | `#3ecf6e` | Under ideal — diff text on light bg |
| `--green-light` | `#86efac` | Under ideal — on dark bg |
| `--red` | `#dc2626` | Over ideal (slow) — table cells |
| `--red-light` | `#e06060` | Over ideal — on light bg |
| `--amber` | `#f59e0b` | Neutral diff — on dark bg |

**Rule:** never use raw `red` or `green`; always route through status tokens.
The helpers `DS.statusColor()`, `DS.diffColor()`, and `DS.summaryDiffColor()`
return the right token for context (dark card vs light table cell).

### Contrast requirements

- Text on `--card` (white): minimum token `--ink3` (#6b5b8a) — contrast ~3.9:1 for captions, `--ink` for body.
- White text on `--purple`: ~8:1 ✓
- White text on `--header`: ~12:1 ✓
- `--gold` on `--header`: ~3.2:1 — acceptable for large display text only.
- Never use dark text directly on `--purple` (was a bug: `.sub-tab.active` previously used `#0d0a14`).

---

## 2. Typography

Both fonts are loaded from Google Fonts. Never substitute.

| Token | Value | Use |
|---|---|---|
| `--display` | `'Oswald', sans-serif` | All headings, labels, tabs, buttons, table headers |
| `--serif` | `'Source Serif 4', Georgia, serif` | Body text, descriptions, notes |

### Type scale

| Token | Value | Use |
|---|---|---|
| `--size-2xs` | `9px` | Dense secondary labels (RA cell labels) |
| `--size-xs` | `10px` | Table column headers, kickers, `powered-by` |
| `--size-sm` | `11px` | Tab labels, button text, form unit labels |
| `--size-base` | `13px` | Body text, table cells, card descriptions |
| `--size-md` | `15px` | Login button, emphasized values |
| `--size-lg` | `18px` | Section logo, icon buttons |
| `--size-xl` | `24px` | Summary card values |
| `--size-2xl` | `26px` | Conversion result values |
| `--size-3xl` | `28px` | Login logo |
| Hero title | `clamp(32px,5vw,60px)` | H1 only — responsive via `clamp` |

**Rules:**
- Display font for anything interactive (tabs, buttons, labels).
- Serif for prose (card descriptions, notes, hero desc).
- No italic on Display. Italic only on Serif for notes/captions.
- Letter-spacing: `0.1em` on uppercase Display labels, `0.04em` on display values.

---

## 3. Spacing

| Token | Value |
|---|---|
| `--sp-1` | `4px` |
| `--sp-2` | `8px` |
| `--sp-3` | `12px` |
| `--sp-4` | `16px` |
| `--sp-5` | `20px` |

**Rules:**
- Cards have `padding: 1.25rem` (20px).
- Stack of cards uses `margin-bottom: 1rem` (16px).
- `.ctrl-row` gap: `10px`.
- `.result-banner` padding: `1rem 1.25rem`.
- Section head `margin-bottom`: `1rem`.

---

## 4. Border radius

| Token | Value | Use |
|---|---|---|
| `--r-xs` | `1px` | Pace bar fills, dense fills |
| `--r-sm` | `2px` | Table cells, result banner, formula box |
| `--r-md` | `4px` | Buttons, sub-tabs, RA cells |
| `--r-lg` | `6px` | Cards, login box inner elements |
| `--r-xl` | `12px` | Login box, conversion result cards |

---

## 5. Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-card` | `0 2px 8px rgba(76,47,160,0.08)` | `.card` |
| `--shadow-modal` | `0 20px 60px rgba(0,0,0,0.4)` | Login overlay |

---

## 6. Component rules

All components are defined in `ds/components.js` (JS factories) and
`ds/components.css` (CSS classes). **No bypassing.** Every new UI element
must route through the DS.

### Result banner — `DS.resultBanner(items, style?)`

Dark purple strip with 1–4 stat cells. Use for the primary computed output
of any calculator tool. Each item: `{ label, value, unit?, valueStyle? }`.

### Hurdle table — `DS.hurdleTable(headers, rows)`

Striped table with gold-bordered header. Use for all hurdle split data.
Auto-wrapped in `.overflow-x` for horizontal scroll on mobile.
Headers can be `string` or `{ text, style }`.
Row cells can be `string` or `{ text, cls?, style? }`.
Use `.t-split`, `.t-interval`, `.t-speed`, `.t-zone`, `.t-diff` cell classes.
Highlighted rows (CZ markers): `{ highlight: true }`.

### Pace bar — `DS.paceBar(label, pct, color, displayValue)`

Single bar row for speed visualization. Color via `DS.paceColor110/100w/400/300h`.
Wrap multiple bars in a `<div>` container.

### Section head — `DS.sectionHead(text, style?)`

Gold-underlined uppercase label. Use before any data section within a card.

### Note / callout — `DS.note(html, style?)`

Gold left-border italic callout. Use for methodology notes, caveats, source citations.

### Formula box — `DS.formulaBox(eq, desc, style?)`

Dark (`#1e1530`) display box. `eq` is the formula string (gold), `desc` is the subtitle (muted).

### Conversion grid — `DS.convGrid(cells)`

2-column dark grid. Each cell: `{ label, value, unit?, style? }`.

### Summary card — `DS.summaryCard(label, value, unit, diffText, diffColor, accentColor)`

Dark card with colored left border. Used in race analyzer summary row.
Use `DS.summaryDiffColor(diff)` for `diffColor` and `DS.summaryDiffColor` family for colors.

---

## 7. Status / diff color helpers

Always use these — never hard-code status colors:

```javascript
DS.statusColor(diff)       // border-bottom color on dark RA cell
DS.diffColor(diff)         // diff text color on light table cell
DS.summaryDiffColor(diff)  // diff text color on dark summary card
```

Threshold: `|diff| < 0.1s` = neutral (gold/amber), `diff > 0.1` = slow (red),
`diff < -0.1` = fast (green).

---

## 8. Buttons

| Class | Use |
|---|---|
| `.btn .btn-primary` | Primary CTA (Add Entry, Calculate) |
| `.btn .btn-ghost` | Secondary action (Clear All) |
| `.btn-header` | Header actions (Print, Sign Out) |
| `.btn-icon` | Inline icon-only actions (remove entry ✕) — always needs `aria-label` |

All buttons have `:focus-visible` rings. Never remove `outline` on focus without providing an equivalent.

---

## 9. Tab systems

Two levels of tabs exist:

1. **Tool tabs** (`.tool-tabs` / `.tool-tab`) — top-level navigation between the 7 tools.
2. **Sub-tabs** (`.sub-tabs` / `.sub-tab`) — secondary navigation within a panel.

Both must carry ARIA tab pattern:
- Container: `role="tablist"` + `aria-label`
- Button: `role="tab"` + `aria-selected` + `aria-controls` + `id`
- Panel: `role="tabpanel"` + `aria-labelledby`

The JS must update `aria-selected` on switch (see `switchTool`, `switchRef`, `raSetEvent`).

---

## 10. Forms

- All `<select>` and `<input>` must have an `aria-label` (or a paired `<label for="">`).
- Login form uses `<label for="">` (preferred pattern — keep it).
- Dynamic inputs (race analyzer) use `aria-label` in the JS template string.
- Result areas use `aria-live="polite"` so screen readers announce updates.
- Login error uses `role="alert"` + `aria-live="assertive"`.

---

## 11. Responsive breakpoints

| Breakpoint | Changes |
|---|---|
| `≤768px` | Header nav wraps; hero title shrinks |
| `≤640px` | Tool tabs stack vertically; ctrl-row goes column; selects go full-width; result banner stacks |
| `≤500px` | Sub-tabs shrink font/padding |

All wide tables are wrapped in `.overflow-x` (via `DS.hurdleTable()` automatically).

---

## 12. Accessibility checklist (for every UI change)

- [ ] Color contrast: ≥ 4.5:1 for body text, ≥ 3:1 for large text/icons
- [ ] All interactive elements reachable by keyboard (Tab/Enter/Space)
- [ ] Focus ring visible (`:focus-visible` — never suppress without replacement)
- [ ] All controls have an accessible name (`aria-label` or `<label for="">`)
- [ ] Dynamic content regions use `aria-live`
- [ ] Tab systems carry full ARIA tab pattern
- [ ] No information conveyed by color alone (always pair with text or icon)
- [ ] Skip-to-main link present in DOM
- [ ] Touch targets ≥ 44px for mobile (`.tool-tab` has `min-height:44px`)
