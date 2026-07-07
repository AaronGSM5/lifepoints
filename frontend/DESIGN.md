# Design System: Dark Vibe

This document governs the overall visual architecture, theme variables, and typographic hierarchy for the application UI generated in Google Stitch.

## 1. Color Palette (Dark Theme Tokens)

The application utilizes a dark, tech-forward background paired with vibrant green accents and neon pink secondary highlights.

| Token Name         | Value                       | Purpose / Usage                                                 |
| :----------------- | :-------------------------- | :-------------------------------------------------------------- |
| `text`             | `rgb(248, 250, 252)`        | Primary legibility color for body, headlines, and titles        |
| `background`       | `rgb(15, 23, 41)`           | Main background canvas color                                    |
| `backgroundBottom` | `rgb(18, 18, 18)`           | Secondary background for deep containers or footers             |
| `primary`          | `rgb(26, 34, 53)`           | Container background, cards, and primary structural blocks      |
| `secondary`        | `rgb(36, 53, 82)`           | Alternating rows, input fields, and hover states                |
| `primaryAccent`    | `rgb(47, 196, 146)`         | Main CTA buttons, success alerts, and active states             |
| `secondaryAccent`  | `rgb(255, 0, 255)`          | Hot spots, badges, attention-seeking interactive items          |
| `gold`             | `#FFD700`                   | Stars, premium statuses, awards, and tracking indicators        |
| `muted`            | `rgba(248, 250, 252, 0.5)`  | Explanatory subtext, captions, and disabled states              |
| `success`          | `rgb(0, 240, 160)`          | Confirmed states, completions, and positive trend vectors       |
| `warning`          | `rgb(240, 0, 0)`            | Critical system alerts, deletion safety-checks, and errors      |
| `separator`        | `rgba(255, 255, 255, 0.08)` | Dividers, structural borders, and standard rules                |
| `inputBorder`      | `rgba(255, 255, 255, 0.1)`  | Normal state borders around text inputs and textareas           |
| `glas`             | `rgba(255, 255, 255, 0.05)` | Glassmorphism overlays, backdrop filters, and subtle highlights |

## 2. Typography

The system scales across varying weights of the **Inter** typeface.

- **Font Family:** `Inter`, sans-serif
- **Headings / Major Actions:** `"Inter-Bold"` (Font Weight: 700)
- **Subheadings / UI Component Labels:** `"Inter-SemiBold"` (Font Weight: 600)
- **Body Copy / Disclaimers / Form Values:** `"Inter-Regular"` (Font Weight: 400)

## 3. Structural Rules & Component Vibes

- **Cards and Panes:** Utilize the `primary` color as the fill. Apply a subtle border with `separator`.
- **Text Inputs:** Default fill should draw from `secondary`, outlined by `inputBorder`. When focused, transition border to `primaryAccent`.
- **Primary CTA Buttons:** Background is `primaryAccent`, text is `background` (for contrast optimization).
- **Glassmorphic Overlays:** Use `glas` paired with standard backdrop blurring (`backdrop-filter: blur()`) for floating popups, side-drawer extensions, or header sticky positioning.
- **Header** All Designs should include the "Lifepoints Header"
