---
name: Lifepoints
colors:
  surface: "#0b1325"
  surface-dim: "#0b1325"
  surface-bright: "#31394c"
  surface-container-lowest: "#060e1f"
  surface-container-low: "#131b2d"
  surface-container: "#171f32"
  surface-container-high: "#222a3d"
  surface-container-highest: "#2d3448"
  on-surface: "#dbe2fb"
  on-surface-variant: "#bbcac0"
  inverse-surface: "#dbe2fb"
  inverse-on-surface: "#283043"
  outline: "#86948b"
  outline-variant: "#3c4a43"
  surface-tint: "#51deaa"
  primary: "#55e0ac"
  on-primary: "#003826"
  primary-container: "#2fc492"
  on-primary-container: "#004b35"
  inverse-primary: "#006c4d"
  secondary: "#ffabf3"
  on-secondary: "#5b005b"
  secondary-container: "#fe00fe"
  on-secondary-container: "#500050"
  tertiary: "#ecc700"
  on-tertiary: "#3a3000"
  tertiary-container: "#ccac00"
  on-tertiary-container: "#4e4100"
  error: "#F00000"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#71fbc4"
  primary-fixed-dim: "#51deaa"
  on-primary-fixed: "#002115"
  on-primary-fixed-variant: "#005139"
  secondary-fixed: "#ffd7f5"
  secondary-fixed-dim: "#ffabf3"
  on-secondary-fixed: "#380038"
  on-secondary-fixed-variant: "#810081"
  tertiary-fixed: "#ffe16d"
  tertiary-fixed-dim: "#e9c400"
  on-tertiary-fixed: "#221b00"
  on-tertiary-fixed-variant: "#544600"
  background: "#0b1325"
  on-background: "#dbe2fb"
  surface-variant: "#2d3448"
  surface-deep: "#121212"
  surface-primary: "#1A2235"
  surface-secondary: "#243552"
  text-primary: "#F8FAFC"
  text-muted: rgba(248, 250, 252, 0.5)
  success: "#00F0A0"
  glass: rgba(255, 255, 255, 0.05)
  border-standard: rgba(255, 255, 255, 0.08)
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "700"
    lineHeight: "1.25"
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "700"
    lineHeight: "1.3"
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.4"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.5"
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "600"
    lineHeight: "1.4"
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "400"
    lineHeight: "1.4"
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 24px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
  section-padding: 64px
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

1.  **Floor:** The `neutral` background (#0F1729).
2.  **Surface:** `surface-primary` (#1A2235) is used for the majority of cards and containers.
3.  **Raised:** `surface-secondary` (#243552) is used for interactive elements like hover states and input fields.
4.  **Overlay:** Floating elements (modals, tooltips, dropdowns) use the `glass` token with a `backdrop-filter: blur(12px)` to maintain context while appearing elevated.

Shadows are used sparingly. When used, they should be "Ambient Shadows"—diffused, low-opacity, and slightly tinted toward the navy background to avoid a "muddy" gray look.

## Shapes

The design system utilizes **Rounded** shapes (0.5rem base) to soften the "tech" aesthetic and make the interface feel more approachable and inviting, aligning with the "peaceful ecosystem" goal.

- Standard components (Buttons, Inputs, Cards) use `rounded`.
- Larger structural containers or sections may use `rounded-lg`.
- Small utility items like Tags or Badges may transition to `rounded-xl` or "Pill-shaped" to distinguish them from interactive buttons.

## Components

- **Buttons:** Primary CTAs use the `primaryAccent` background with the `neutral` (dark navy) text for high-contrast legibility. Secondary buttons use an outline of `border-standard` or a `glass` fill.
- **Inputs:** Default state uses `surface-secondary` fill with `border-standard`. Upon focus, the border transitions to `primaryAccent` with a subtle outer glow (0px 0px 4px).
- **Cards:** Use `surface-primary` as the fill. Apply a subtle 1px border using `border-standard`.
- **Chips/Badges:** For "hot" or urgent items, use `secondaryAccent` (pink). For standard status, use `primaryAccent`.
- **Glass Overlays:** Modals and sticky headers should use the `glass` token with backdrop blur. These should be framed with a light 1px border (`border-standard`) to define their edges against dark backgrounds.
- **Lists:** Alternating rows should use `surface-secondary` for better scanability in data-dense community or ranking views.

## Global Components

- **Component Name:** Global Application Header
- **Layout & Alignment:**
  - **Far Left:** Counter text displaying points/currency (e.g., "0 LP") rendered in the primary color
  - **Center:** Main custom logo—a stylized, 3D ribbon-like loop icon in gradient shades of mint and teal green.
  - **Far Right:** Two action icons aligned horizontally: a plus sign (`+`) utility icon followed by a search magnifying glass (`🔍`) icon, both styled in solid white with clean, minimalist line weights.
- **Behavior:** This header must remain persistent, fixed, and structurally identical across the top of all newly generated application screens.

- **Component Name:** Global Application Navbar
- **Layout & Alignment:**
- **Behavior:**

- **Component Name:** Global Application Navbar
- **Layout & Alignment:**
  - The navbar sits within a pill-shaped container that uses a high rounded value, like `rounded-full`, to soften the tech aesthetic and make the interface feel inviting.
  - It rests on a raised surface token, such as `surface-container` (#171f32) or `surface-primary` (#1A2235), creating subtle depth against the app's deep navy base background (#0b1325).
  - The unselected icons (Home, Heart, Bag, Profile) are rendered in clean, minimalist line weights using a high-luminance neutral token—most likely `on-surface` (#dbe2fb) or `text-primary` (#F8FAFC)—to ensure maximum legibility.
  - The center icon (Communities) is currently active and is filled with the vibrant mint-green primary accent color (#55e0ac).
  - The far-right user profile icon features a bright red dot.
- **Behavior:**
  - The active state of an icon uses the primary accent color to perfectly highlight the user's current location in the app.
  - The red notification dot on the profile icon acts as an attention-seeking alert, pulling from the `error` (#F00000), carefully designed to guide the user's eye without being overly aggressive.
  - Interacting with the icons seamlessly bridges the user to the core gamified mechanics of LifePoints: viewing the communal main feed (Home), documenting good deeds to build a score (Heart +), engaging in positive peer pressure and group progress (Communities), redeeming value-driven rewards or viewing premium features (Shopping Bag), and checking personal digital status built purely through real-world positive impact (Profile).
