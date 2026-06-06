# Original User Request

## Initial Request — 2026-06-06T22:28:40Z

Refine the social media planning calendar dashboard in React for the professional hair cosmetics distributor **Dos Soles**. The goal is to verify that all visual layouts, asset paths, typography, colors, and responsive parameters align with their official brand identity, completely eliminating any incorrect color palettes (such as brown/gold/bronze) and confirming the deployment is clean.

Working directory: `C:\Users\franc\.gemini\antigravity\scratch\dos-soles-calendar`
Integrity mode: development

## Requirements

### R1. Brand-Accurate Color Scheme
- **Prestige Theme (Logo 03)**: Must use a clean, cool gray/white background (`#F8FAFC`), deep slate gray text and highlights (`#1F2937`), and official crimson red (`#E13731`) for active states and highlights. All brown, bronze, or sand-like colors must be completely absent.
- **Sunset Theme (Logo 04)**: Must use a high-contrast premium dark mode (`#0C0C0D`) with glowing crimson red (`#E13731`) shadows and active states.
- The theme toggle in the header must instantly and seamlessly switch all CSS variables and classes.

### R2. Asset Path and Logo Integration
- Ensure that the square logos `logo-03.jpg` (white background) and `logo-04.jpg` (red background) load successfully from relative public paths.
- The logo container in the header must be a rounded rectangle (`rounded-xl` / `rounded-2xl`) and scale using `object-cover` or `object-contain` to ensure the symbol and the text "DOS SOLES" are fully visible without cropping or text cutoff.

### R3. Sophisticated Typography
- Apply Google Fonts **Cinzel** for headings (h1, h2, h3, drawer titles) in both themes.
- Apply Google Fonts **Plus Jakarta Sans** for readable text (copies, metrics, button actions, calendar details) in both themes.

### R4. Complete Responsiveness
- On mobile view (under 640px), show simplified cell indicators with format icons (Reel, Story, etc.) to prevent text squeeze and overflows.
- On desktop, show the full card previews.

## Acceptance Criteria

### Visual & Assets
- [ ] No image 404 errors. Logo files load dynamically from public path.
- [ ] Logotype text "DOS SOLES" is completely readable and not cut off on either logo version.
- [ ] Font family for the header title is validated as Cinzel.
- [ ] Background is cool slate `#F8FAFC` on the Prestige theme, with zero traces of `#FAF9F7` or bronze `#C5A880`.

### Functional
- [ ] Search, canal filters, and audience target filters correctly update calendar cell visibility.
- [ ] Clicking on a calendar cell opens the drawer with copy-to-clipboard button and checklist items.
- [ ] Build compiles cleanly to production via `npm run build`.
