---
name: Lifepoints
# Quelle der Wahrheit sind src/constants/Colors.js, Spacing.js und Typography.js.
# Diese Werte spiegeln die Implementierung (DarkTheme). Bei Abweichungen gilt der Code.
colors:
  background: "rgb(15, 23, 41)"          # DarkTheme.background
  background-bottom: "rgb(18, 18, 18)"   # DarkTheme.backgroundBottom (Verlauf unten)
  surface-primary: "rgb(26, 34, 53)"     # DarkTheme.primary – Karten
  surface-secondary: "rgb(36, 53, 82)"   # DarkTheme.secondary – Rahmen, Eingaben, Hover
  text: "rgb(248, 250, 252)"             # DarkTheme.text
  text-muted: "rgba(248, 250, 252, 0.5)" # DarkTheme.muted
  primary-accent: "rgb(47, 196, 146)"    # DarkTheme.primaryAccent – CTAs, Erfolg, aktive Zustände
  on-primary-accent: "rgb(15, 23, 41)"   # DarkTheme.onPrimaryAccent – Text/Icons auf Mint
  secondary-accent: "rgb(255, 0, 255)"   # DarkTheme.secondaryAccent – "hot": Live, Streaks, Likes
  gold: "#FFD700"                        # DarkTheme.gold – Premium, Level-Sperren, Trophäen
  success: "rgb(0, 240, 160)"            # DarkTheme.success
  warning: "rgb(240, 0, 0)"              # DarkTheme.warning – Fehler, Benachrichtigungspunkt
  separator: "rgba(255, 255, 255, 0.08)" # DarkTheme.separator – Trennlinien, Progress-Tracks
  input-border: "rgba(255, 255, 255, 0.1)"
  glass: "rgba(255, 255, 255, 0.05)"     # DarkTheme.glas
  backdrop: "rgba(0, 0, 0, 0.3)"
typography:
  # AppText-Typen (Inter). Gewicht: h1/h2 Bold, title/label/labelSm SemiBold, body/caption Regular
  h1: { fontSize: 32px, lineHeight: 40px, fontWeight: "700" }
  h2: { fontSize: 22px, lineHeight: 28px, fontWeight: "700" }
  title: { fontSize: 18px, lineHeight: 24px, fontWeight: "600" }
  body: { fontSize: 16px, lineHeight: 22px, fontWeight: "400" }
  label: { fontSize: 14px, lineHeight: 20px, fontWeight: "600" }
  labelSm: { fontSize: 12px, lineHeight: 16px, fontWeight: "600", letterSpacing: 0.6px, textTransform: uppercase }
  caption: { fontSize: 13px, lineHeight: 18px, fontWeight: "400", color: text-muted }
rounded:
  sm: 8px
  md: 12px
  lg: 20px      # Standard für Karten (BaseCard)
  full: 9999px  # Buttons, Chips, Badges, Navbar
spacing:
  xs: 4px
  sm: 8px
  md: 16px      # Bildschirmrand und Karten-Padding
  lg: 24px      # Abstand zwischen Sections
  xl: 32px
---

## App Vision & Core Concept

**LifePoints** is a social network dedicated to value-based self-improvement. It is strictly a platform for rewarding good deeds and community growth, and **must never be styled, structured, or treated as a survey or market research application.**

- **The Vision:** An alternative to superficial digital consumption. We make altruism measurable and communal, rewarding users for the positive impact they have on their environment and peers. The goal is a world where social status is defined by community contribution, not material wealth.
- **The Concept:** Gamifying real-world positive behavior.
  - _LifePoints Score:_ Users document good deeds (from everyday gestures to social projects and fitness milestones) to earn points.
  - _Communities:_ Focus on group progress and "positive peer pressure" rather than chasing anonymous follower counts.
  - _Peaceful Ecosystem:_ An inviting environment focused on a collective upward spiral, completely free from toxic competition.
- **Target Audience:** Gen Z and Millennials, fitness enthusiasts, environmental activists, sports influencers, and food bloggers.
- **Unique Selling Point (USP):** Digital status is coupled with real-world positive impact. Users can build their profile and earn points purely through good deeds without any pressure to share personal photos or private information.
- **Monetization & UI Constraints:** The app uses a Freemium model (LifePoints Plus/Premium for deep analytics and Wrapped stats, community creation fees to prevent spam, and optional opt-in reward ads). **Crucial Design Rule:** True to our "peaceful" brand value, the UI must strictly avoid aggressive, flashing, or intrusive advertisements. All monetization features should feel organic and value-driven.

## Brand & Style

The design system is built for a "Dark Vibe" aesthetic that leans heavily into a high-tech, futuristic, and energetic atmosphere. It is designed for software interfaces that require high focus and high performance, such as developer tools, gaming platforms, or Apps like Instagram and Spotify.

The style is **Modern/Glassmorphic** with a hint of **Cyberpunk** influence. It utilizes deep navy layers to create depth, punctuated by high-luminance neon accents that guide the user's eye toward critical actions and data points. The interface should feel sleek, precise, and sophisticated, evoking a sense of being "in the flow" of a digital environment.

This energetic but dark UI perfectly complements the peaceful, gamified ecosystem of LifePoints by keeping the user focused on their self-improvement journey without visual clutter.

## Colors

The palette is anchored by a deep navy background that provides more visual comfort than pure black.

- **Primary Accent:** A vibrant mint-green used for primary CTAs and success indicators (representing the core "good deed" reward).
- **Secondary Accent:** A neon pink reserved for "hot spots," badges, and high-energy interactive elements.
- **Tertiary Accent:** A classic gold for premium status (LifePoints Plus/Premium) and tracking indicators.
- **Neutral/Surface:** A tiered system of navy and near-black shades to create structural hierarchy.

Transitions between states should prioritize the primary accent for focus and secondary accent for attention-seeking alerts.

## Typography

This design system uses **Inter** exclusively to maintain a systematic and utilitarian feel. The hierarchy is established through significant weight shifts.

- **Headlines** utilize bold weights (700) and tight letter spacing to create a grounded, impactful presence.
- **UI Labels** utilize semi-bold weights (600) for clarity at smaller sizes.
- **Body Copy** uses the regular weight (400) with generous line heights to ensure maximum legibility against the dark background.
- **Captions and Muted Text** should always use the `text-muted` color token to differentiate from primary content.

## Layout & Spacing

The layout follows a **fluid grid** model with a consistent 8px baseline rhythm.

- **Desktop:** 12-column grid with 24px margins and 16px gutters.
- **Tablet:** 8-column grid with 16px margins and 16px gutters.
- **Mobile:** 4-column grid with 16px margins and 12px gutters.

Spacing between elements should be handled in multiples of 8px. Use larger "stack-lg" spacing to separate distinct functional areas and "stack-sm" for internal component elements like icon-to-text relationships.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Glassmorphism**.

1.  **Floor:** `background` (rgb 15/23/41) with a subtle gradient to `background-bottom`.
2.  **Surface:** `surface-primary` (rgb 26/34/53) is used for the majority of cards and containers.
3.  **Raised:** `surface-secondary` (rgb 36/53/82) is used for card borders, input fields and hover states.
4.  **Overlay:** Floating elements (modals, tooltips, dropdowns) use the `glass` token with a `backdrop-filter: blur(12px)` to maintain context while appearing elevated.

Shadows are used sparingly. When used, they should be "Ambient Shadows"—diffused, low-opacity, and slightly tinted toward the navy background to avoid a "muddy" gray look.

## Shapes

The design system utilizes **Rounded** shapes to soften the "tech" aesthetic and make the interface feel more approachable and inviting, aligning with the "peaceful ecosystem" goal.

- Cards use `rounded.lg` (20px) via `BaseCard`. Full-bleed feed posts use `BaseCard variant="flat"` without radius.
- Small boxes and icon tiles use `rounded.md` (12px).
- Buttons, chips, badges and the navbar are pill-shaped (`rounded.full`).

## Components

All reusable primitives live in `src/components/ui/`. New screens (e.g. the Routines tab) should only be composed from these.

- **Buttons (`AppButton`):** `primary` uses a `primary-accent` gradient with `on-primary-accent` text. `secondary` uses `glass` with a `separator` border. `outline` and `ghost` for low-emphasis actions.
- **Chips (`AppChip`):** Filters and selections. Calmer than a CTA: `glass` fill, `separator` border, tinted `primary-accent` when active.
- **Badges (`AppBadge`):** `primary` (status), `hot` (`secondary-accent`: live, streak, new), `premium` (`gold`: Plus, level locks), `outline`, `glas`. Labels use `labelSm`.
- **Inputs (`AppInput`):** `surface-secondary` fill with `input-border`; focus switches to `primary-accent`.
- **Cards (`BaseCard`):** `surface-primary` fill (60 %), 1px `surface-secondary` border, ambient shadow, `rounded.lg`.
- **Section headers (`SectionHeader`):** Title (`title`), optional icon and `counter` (e.g. "2/3"). Exactly two right-hand actions: a text link (`rightLabel`) or an icon button (`rightIcon` + mandatory `rightIconLabel`). Collapsible sections use `collapsible`.
- **Progress (`ProgressBar`):** `strip` (4px, card edge) or `bar` (8px, rounded). Track `separator`, fill `primary-accent`.
- **Horizontal lists (`HorizontalRail`):** Section header + snapping list with `md` padding and gap. Two card widths only: tile 160px, card 260px.
- **Segmented control (`NavigationRow` + `SegmentedTabScreen`):** Sub-tabs inside a main tab (Tasks, Social). Content starts `SEGMENT_OFFSET` below it.
- **States:** Every list shows a skeleton while loading, an `EmptyView` with a CTA when empty, and an `EmptyView` with "Try again" on errors.
- **Lists:** Ranking views alternate rows with a tinted `surface-secondary` background.
- **Modals:** `AppModal` on `backdrop`; confirmations for anything that spends LP.

## Global Components

- **Component Name:** Global Application Header (`Toolbar`)
- **Layout & Alignment:**
  - **Far Left:** LP balance (`LpPoints`) in `primary-accent`; tapping it opens the shop. On sub-pages this is a back button.
  - **Center:** LifePoints logo.
  - **Far Right:** On Home, Tasks, Social and Shop: create post (`+`) and search. On Profile: notifications and settings (plus a reset action in development builds only). All icons have accessibility labels.
- **Behavior:** Fixed and always visible on all main tabs, so the LP balance and primary actions stay reachable while scrolling.

- **Component Name:** Global Application Navbar
- **Layout & Alignment:**
  - Floating pill-shaped container (`rounded.full`) with a blurred glass background and a light 1px border.
  - Five tabs in this order: Home, Tasks, Social, Shop, Profile. Inactive icons are outlined in `text`; the active icon is filled in `primary-accent`.
- **Behavior:**
  - The red dot (`warning`) on the profile icon appears only when there are unread notifications.
  - Each tab item exposes `accessibilityRole="tab"` and its selected state.
