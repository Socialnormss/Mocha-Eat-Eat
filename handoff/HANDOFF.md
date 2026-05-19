# Mocha Dog Feeder · Soft Cozy v3 — Integration Handoff

Hand this folder to the integration engineer. Three files matter:

| File | Purpose |
|---|---|
| `mocha-cozy.css`     | Production stylesheet — drop in, link from current `index.html` |
| `cozy-reference.html`| Standalone HTML skeleton for every component (browse it side-by-side while wiring up the real app) |
| `HANDOFF.md`         | This document — tokens, asset map, motion, states |

The current app structure (`index.html` + `data.js` + `app.js` + `sw.js`) stays as is. The engineer's job is to **swap the markup + class names** to match `cozy-reference.html` and adapt selectors in `app.js`. No JS rebuild needed.

---

## 1 · Design tokens reference

All tokens live as CSS custom properties in `:root` (top of `mocha-cozy.css`). The same values are listed here for quick reference.

### Color palette

| Token | Hex | Role |
|---|---|---|
| `--c-cream`     | `#FBF5EC` | app background (radial gradient w/ `#F4EAD9`) |
| `--c-paper`     | `#FFFDF8` | card surface |
| `--c-latte`     | `#E8D2B5` | dividers, soft fills, banner edge |
| `--c-caramel`   | `#C99467` | primary accent · gradients · partial-status dot |
| `--c-mocha`     | `#9B6B45` | primary action color · brand |
| `--c-espresso`  | `#3E2A1C` | dark surface (weekly streak card) |
| `--c-ink`       | `#2A1E14` | primary text |
| `--c-muted`     | `#8B7560` | secondary text |
| `--c-faint`     | `#B8A48C` | tertiary / disabled text |
| `--c-sage`      | `#A9B89A` | "done" check · complete-streak |
| `--c-sage-deep` | `#7E927A` | sage hover / icon tint |
| `--c-blush`     | `#E5BCA9` | gentle highlight · note dot |
| `--c-rust`      | `#C77A5A` | danger · skip-meal alert |
| `--rule`        | `rgba(62,42,28,.08)` | hairline borders |
| `--rule-strong` | `rgba(62,42,28,.15)` | hover borders |

### Typography

| Family token | Stack |
|---|---|
| `--font-serif` | `Newsreader, Noto Sans Thai Looped, Lora, Georgia, serif` |
| `--font-sans`  | `Plus Jakarta Sans, Noto Sans Thai Looped, system-ui, sans-serif` |
| `--font-num`   | `IBM Plex Sans, SF Pro Display, Inter, system-ui, sans-serif` (tabular-nums) |

Numbers (dates, kcal, weights, day cells, streak counts) **always** use `--font-num` with `font-variant-numeric: tabular-nums`. Headings use `--font-serif`. Body uses `--font-sans`.

| Size token | px | Used for |
|---|---|---|
| `--fs-display`   | 44 | hero date "19 พ.ค." |
| `--fs-h1`        | 32 | profile name |
| `--fs-h2`        | 22 | section title |
| `--fs-h3`        | 18 | sub-heading |
| `--fs-body`      | 14 | body copy, note text |
| `--fs-body-sm`   | 12 | metadata |
| `--fs-meta`      | 11 | small meta |
| `--fs-micro`     | 10 | uppercase labels |
| `--fs-num-hero`  | 40 | hero count "2/4" |
| `--fs-num-lg`    | 32 | calculator result |
| `--fs-num-md`    | 22 | profile stat value |
| `--fs-num-sm`    | 14 | meal kcal |

### Spacing

| Token | px |
|---|---|
| `--sp-1` | 4  |
| `--sp-2` | 8  |
| `--sp-3` | 12 |
| `--sp-4` | 16 |
| `--sp-5` | 18 |
| `--sp-6` | 22 |
| `--sp-7` | 28 |
| `--sp-8` | 32 |

### Radii

| Token | px | Used for |
|---|---|---|
| `--r-sm`  | 10 | nav buttons |
| `--r-md`  | 14 | inputs, calc result block |
| `--r-lg`  | 18 | banner, notes |
| `--r-xl`  | 22 | cards, streak |
| `--r-2xl` | 26 | tab bar, profile |
| `--r-3xl` | 28 | hero, modal sheet |

### Elevation (warm soft shadows · never crisp)

| Token | Use |
|---|---|
| `--shadow-card`  | default card · meal · streak · brand |
| `--shadow-soft`  | search · chip · brand |
| `--shadow-hero`  | gradient hero only |
| `--shadow-press` | active/pressed state |

Press effect: card translates `translateY(1px)` and swaps to `--shadow-press` (defined on `.meal:active`).

---

## 2 · Asset map — which Magnific sheet goes where

Where every sprite/cut is consumed in the HTML reference. Filenames are placeholders — point them at your real exports.

### Mascot sheet
The mascot has four poses. Each used in one specific place:

| Pose | Reference file | Where it lives | Class hook |
|---|---|---|---|
| **Sit** (front) | `img/mocha-sit.png` | Nutrition · profile circle | `.mascot-frame img` |
| **Peek** (head + paws over edge) | `img/mocha-peek.png` | Today · hero card bottom-right | `.hero__mascot` |
| **Trot** (side walking) | `img/mocha-trot.png` | Today · streak block right edge | `.streak__mascot` |
| **Avatar** (head crop, 32–38px) | `img/mocha-avatar.png` | Top bar of every page | `.avatar img` |

Sleep/eating poses are spec'd but **not used** in the current 3 pages. Keep them for empty states later (e.g., "ยังไม่มีบันทึก").

### Time sheet
Four glyphs for time-of-day. Used in **meal cards** and **calendar dashboard slots**.

| File | Slot | Used in |
|---|---|---|
| `img/time-morning.svg` | มื้อเช้า (07:30)   | `.meal__icon`, `.slot__icon` |
| `img/time-noon.svg`    | กลางวัน (12:00)   | same |
| `img/time-evening.svg` | มื้อเย็น (17:30)   | same |
| `img/time-night.svg`   | มื้อดึก (21:00)    | same |

Render at **22 px** inside a 40 px (`.meal__icon`) or 42 px (`.slot__icon`) container.

### Food sheet
Round 17×17 glyphs used inside `.chip__icon` (food list rows) and 22×22 inside `.brand__icon` (brand carousel).

| File | Used for |
|---|---|
| `img/food-bowl.svg`   | อาหารเม็ด Small Breed Adult |
| `img/food-kibble.svg` | Royal Canin brand tile |
| `img/food-bone.svg`   | เนื้อไก่ต้ม |
| `img/food-fish.svg`   | ปลาแซลมอน / ปลาทู |
| `img/food-leaf.svg`   | แครอท · Hill's brand tile |
| `img/food-paw.svg`    | Purina brand tile |
| `img/food-fire.svg`   | Orijen brand tile |

### Danger sheet
Used in `.chip--danger` rows on the Nutrition page.

| File | Item |
|---|---|
| `img/danger-chocolate.svg` | ช็อกโกแลต |
| `img/danger-grapes.svg`    | องุ่น & ลูกเกด |
| `img/danger-onion.svg`     | หัวหอม กระเทียม |
| `img/danger-milk.svg`      | นม / เกลือ (warn, not danger) |

Add more cuts (caffeine, alcohol, macadamia, avocado, cooked bones, xylitol, sweets) as the engineer ports the full danger list from `data.js`. Same `.chip` markup — just add another item.

---

## 3 · Component states the engineer should implement

| State | CSS hook | Behavior |
|---|---|---|
| Meal card · **pending** | `.meal` (no modifier) | Shows `Plus` glyph + two buttons (`ให้อาหาร`, `ไม่กิน`) |
| Meal card · **done**    | `.meal.meal--done`    | Shows `Check` glyph in sage circle + food/by/kcal detail |
| Meal card · **skipped** | `.meal.meal--skipped` | NEW — engineer should add: dim opacity, "ข้าม" tag in `.meal__status-empty` |
| Meal card · **press**   | `.meal:active`        | Translate down 1 px, smaller shadow (already in CSS) |
| Calendar day · **today** | `.day.day--today` | Caramel→mocha gradient pill, white numeral |
| Calendar day · **future** | `.day.day--faded` | Muted text, no dot |
| Tab · **active** | `.tab.tab--active` | Mocha color, weight 700 |
| Goal button · **selected** | `.goal.goal--active` | Mocha bg, white text, drop shadow |
| Goal button · **hover** | `.goal:not(.goal--active):hover` | Stronger border, ink text |
| Period · **selected** | `.period__btn.period__btn--active` | Mocha bg, white text |
| Banner · **alert** | `.banner.banner--alert` | Rust tint variant for skipped/late meals |
| Sheet · **open** | `.sheet.is-open` + `.sheet-backdrop.is-open` | Slide-up 220 ms, backdrop blur fades in |

All hover effects are kept **subtle** — this is a touch-first PWA. Only goal/period buttons have visible hover. Active/press states matter more.

### Focus / accessibility
- `.btn:focus-visible` → 2 px caramel outline at 2 px offset (already styled).
- Goal buttons use `role="radio"` + `aria-checked`.
- Period buttons use `role="tab"` + `aria-selected`.
- Calendar days use `role="gridcell"`; today carries `aria-current="date"`.
- Notes alert uses `role="alert"`.
- Modal sheet uses `role="dialog" aria-modal="true"` and reads its title via `aria-labelledby`.

---

## 4 · Motion specs

All animations are CSS-only and lightweight (no JS).

| Animation | Class | Duration | Easing | Loop | Applied to |
|---|---|---|---|---|---|
| Mascot breath (subtle Y/scale) | `.anim-breath` | 3 s    | `ease-in-out` | infinite | `.hero__mascot`, `.mascot-frame img` |
| Mascot bob (translateY 3 px)   | `.anim-bob`    | 2 s    | `ease-in-out` | infinite | `.streak__mascot` |
| Pop (badge/heart appear)       | `.anim-pop`    | 320 ms | `cubic-bezier(.2,.7,.3,1)` | once | check badge after logging meal |

Transitions:
- Buttons / cards: `transform var(--t-fast) var(--ease-out)` + `box-shadow var(--t-fast)` (`--t-fast = 140 ms`)
- Sheet slide: `transform 220 ms var(--ease-out)`
- Backdrop fade: `opacity 220 ms var(--ease-out)`

`prefers-reduced-motion: reduce` zeroes all animations/transitions (block at the bottom of section 26 in CSS).

---

## 5 · What's decorative-only (safe to drop)

If shipping size or engineering time is tight, the following are **purely visual** and can be removed without breaking anything:

- `.hero::before` and `.hero::after` — the two cream blobs inside the hero gradient. Mascot stays.
- `.profile::before` — the soft radial wash on the profile card.
- `.streak__mascot`, `.hero__mascot`, profile mascot — if a pose isn't ready, the card still works without it.
- `.search__shortcut` (⌘K kbd hint) — phone-first app, not really useful.
- Idle animations (`.anim-breath`, `.anim-bob`) — totally optional. The mascot is fine static.

Everything else is functional or carries content.

---

## 6 · Wiring tips for `app.js`

These are the selectors the existing JS likely needs to find:

| Action | Selector | Notes |
|---|---|---|
| Tab switch          | `[data-tab]`               | Maps to `[data-page]` sections. Toggle `hidden` attribute. |
| Log a meal          | `[data-action="log-meal"]` | Opens `#sheet-log-meal` |
| Skip a meal         | `[data-action="skip-meal"]`| Toggle `.meal--skipped` + write to data |
| Add a note          | `[data-action="add-note"]` | Opens add-note popover/sheet |
| Sheet close         | `.sheet__close` + `.sheet-backdrop` | Both remove `.is-open` |
| Day in calendar     | `.day` (not `.day--faded`) | Click → open day-detail sheet |
| Search input        | `.search__input`           | Type-ahead per existing logic |
| Goal radio          | `.goal-row .goal`          | Toggle `.goal--active`, recompute kcal |
| Period switch       | `.period__btn`             | Toggle `.period__btn--active` |

---

## 7 · Quick start

1. Drop `mocha-cozy.css` into the project alongside `index.html`.
2. Link it: `<link rel="stylesheet" href="mocha-cozy.css">` (load **after** any existing reset so cozy variables win).
3. Re-mark the existing markup using the class names in `cozy-reference.html`. Keep all existing `id`s and event handlers — only class names change.
4. Cut Magnific sprites into `img/` per the map above.
5. Verify on a real iPhone (status-bar safe area + bottom home-indicator already handled via `env(safe-area-inset-*)`).
6. Smoke test: tab switching, meal log, skip meal, calendar day open, calculator goal toggle.

Ping me if anything in the mockup is ambiguous — happy to spec edge cases.
