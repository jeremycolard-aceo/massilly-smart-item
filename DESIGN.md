# Design System Document: Massilly Services

## 1. Overview & Creative North Star

### Creative North Star: "The Industrial Architect"
This design system rejects the generic "flatness" of standard Material Design in favor of a high-end, editorial aesthetic termed **The Industrial Architect**. It blends the rigid, reliable nature of Massilly Services’ industrial roots with a sophisticated, layered digital experience. 

We move beyond standard templates by employing **Structural Asymmetry** and **Tonal Depth**. Instead of boxing content into predictable grids, we use overlapping surfaces and high-contrast typography scales to guide the eye. The interface should feel like a premium architectural blueprint: precise, authoritative, and intentionally spaced.

---

## 2. Colors

The palette is anchored in Navy Blue, providing a foundation of trust, while Sky Blue acts as a high-precision tool for interaction.

### Palette Strategy
*   **Primary (`#001a48`) & Primary Container (`#002d72`):** Used for global branding and high-authority headers.
*   **Secondary (`#006492`) & Secondary Container (`#0cb3ff`):** Reserved strictly for "Action" zones. This Sky Blue is our functional signal.
*   **Neutral Tiers:** A sophisticated range of greys from `surface-container-lowest` (#ffffff) to `surface-dim` (#dadada) defines the UI's skeleton.

### The "No-Line" Rule
**Borders are forbidden for sectioning.** Do not use 1px solid lines to separate content blocks. Boundaries must be defined through background color shifts. For example, a `surface-container-low` section should sit adjacent to a `surface` background to create a clean, modern break.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create depth:
1.  **Base:** `surface` (#f9f9f9)
2.  **Sectioning:** `surface-container-low` (#f3f3f3)
3.  **Active Cards:** `surface-container-lowest` (#ffffff)

### Signature Textures
To escape the "out-of-the-box" feel, use **Glassmorphism** for floating elements (modals, dropdowns) by applying semi-transparent surface colors with a `backdrop-blur` of 12px–20px. Enhance main CTAs with a subtle linear gradient transitioning from `primary` to `primary_container` (135° angle) to add professional "soul."

---

## 3. Typography

The system utilizes a dual-font strategy to balance industrial precision with modern readability.

*   **Display & Headlines (Work Sans):** Chosen for its architectural feel and slight geometric quirks. Use `display-lg` (3.5rem) with tight letter-spacing for editorial hero moments.
*   **Body & Labels (Inter):** While the prompt suggests Roboto, we utilize **Inter** (as specified in the scale) for its superior legibility on high-density data displays.

**Hierarchy as Identity:**
- **Authority:** Large, bold Work Sans headlines in `on_surface` (#1a1c1c).
- **Utility:** Inter `label-md` for floating labels and table headers, always in `on_surface_variant` (#444651) to maintain a soft contrast.

---

## 4. Elevation & Depth

We define hierarchy through **Tonal Layering** rather than structural lines.

### The Layering Principle
Depth is achieved by "stacking" surface tiers. A `surface-container-lowest` card placed on a `surface-container-low` background creates a soft, natural lift that feels integrated into the environment.

### Ambient Shadows
For floating elements (Toasts, Popovers), use "Ambient Shadows":
*   **Blur:** 24px - 40px.
*   **Opacity:** 4% - 8%.
*   **Color:** Use a tinted version of `on_surface` (a deep navy-grey) rather than pure black to mimic natural light.

### The "Ghost Border" Fallback
If a border is required for accessibility in data tables, use a **Ghost Border**: `outline-variant` (#c4c6d2) at **15% opacity**. 100% opaque borders are strictly prohibited.

---

## 5. Components

### Buttons
*   **Primary (Sky Blue Action):** Roundedness `md` (0.375rem). Use `secondary` (#006492) with `on_secondary` text. Apply a subtle inner-glow on hover.
*   **Tertiary:** No background. Use `primary` text with a `surface-container-high` background shift on hover.

### Modern Input Fields
*   **Style:** Floating labels using `label-md`. 
*   **Interaction:** On focus, the bottom "Ghost Border" transitions from 15% opacity to a solid `secondary` (Sky Blue) 2px line.
*   **Feedback:** Success states use `green` (Success) icons; error states use `error` (#ba1a1a) text and background containers for the toast.

### Data Tables & Accordions
*   **The Divider Rule:** Forbid divider lines. Use `surface-container-low` for alternating row backgrounds (Zebra striping) or `3.5` (0.75rem) vertical spacing to separate content.
*   **Accordions:** Use a `surface-container-lowest` background to distinguish the active accordion from the rest of the stack.

### Step Indicators
*   **Visuals:** Use a "Connecting Pipe" metaphor. Completed steps in `primary`, active steps in `secondary` (Sky Blue), and future steps in `outline_variant`.

---

## 6. Do's and Don'ts

### Do
*   **DO** use whitespace as a functional tool. If elements feel crowded, increase spacing using the `16` (3.5rem) or `20` (4.5rem) tokens.
*   **DO** use the logo (Massilly Services) with ample "breathable" padding (minimum `10` / 2.25rem) around it.
*   **DO** ensure all text on `secondary_container` (Sky Blue) meets AA accessibility standards for contrast.

### Don't
*   **DON'T** use 1px solid black or dark grey borders. Use background color shifts.
*   **DON'T** use standard Material Design "Drop Shadows." Use the Ambient Shadow specification.
*   **DON'T** mix font families outside of the specified Work Sans/Inter pairings.
*   **DON'T** use hard corners. Always apply the `md` (0.375rem) or `lg` (0.5rem) roundedness to maintain the "Industrial Architect" softness.