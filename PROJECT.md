# Project: Dos Soles Calendar Dashboard

## Architecture
- React application compiled with Vite.
- Tailwind CSS for styling.
- Core component: `CalendarDosSoles.jsx` which displays the interactive calendar grid and theme controls.
- Drawer component: `PostDetailDrawer.jsx` showing post details and checklist.
- State: Theme (Prestige vs Sunset) toggling, calendar post search and filters.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Analysis | Run code exploration to map layout, assets, styles, and current state. | none | DONE |
| 2 | Brand Theme & Colors | Refine Prestige Theme (cool gray `#F8FAFC`, active crimson `#E13731`, slate `#1F2937`) and Sunset Theme (dark `#0C0C0D`, crimson red glow) and replace wrong bronze/brown colors. Add smooth dynamic theme toggle. | M1 | DONE |
| 3 | Asset Path & Logo | Resolve logo rendering issues and scale `logo-03.jpg` (white bg) and `logo-04.jpg` (red bg) properly. | M1 | DONE |
| 4 | Typography Integration | Load and apply Cinzel for headings and Plus Jakarta Sans for body and details. | M1 | DONE |
| 5 | Mobile Responsiveness | Ensure layout adapts to screens < 640px, simplified indicators, no text truncation/cutoff. | M1 | DONE |
| 6 | Verification & Production Build | Verify all interactions, clipboard copying, filtering, and build cleanly with `npm run build`. | M2, M3, M4, M5 | DONE |
| 7 | September 2026 Planning | Configure September 2026 calendar grid, spring campaign guides, and structured strategic starter posts. | M6 | DONE |

## Interface Contracts
### Theme Toggle
- The toggle must instantly change theme variables (either classes on `html` or data attributes, or React state variables) to switch styles seamlessly.
