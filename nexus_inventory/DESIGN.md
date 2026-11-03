---
name: Nexus Inventory
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#47464f'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#787680'
  outline-variant: '#c8c5d0'
  surface-tint: '#5b598c'
  primary: '#070235'
  on-primary: '#ffffff'
  primary-container: '#1e1b4b'
  on-primary-container: '#8683ba'
  inverse-primary: '#c4c1fb'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#050039'
  on-tertiary: '#ffffff'
  tertiary-container: '#14007a'
  on-tertiary-container: '#7d77ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c4c1fb'
  on-primary-fixed: '#181445'
  on-primary-fixed-variant: '#444173'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e3dfff'
  tertiary-fixed-dim: '#c3c0ff'
  on-tertiary-fixed: '#100069'
  on-tertiary-fixed-variant: '#372abf'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  table-data:
    fontFamily: Inter, 'Kantumruy Pro', sans-serif
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  metric-number:
    fontFamily: Inter, sans-serif
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

The design system embodies precision, operational authority, and international institutional clarity. Designed specifically for mission-critical supply chain and warehouse tracking, the aesthetic is engineered for high data-density productivity without visual fatigue.

### Personality & Demographics
- **Target Audience:** Warehouse supervisors, global supply chain analysts, enterprise operations managers, and bilingual inventory personnel across English and Khmer operational hubs.
- **Tone:** Authoritative, dependable, razor-sharp, and ergonomic.
- **Emotional Response:** Inspires absolute confidence in stock fidelity, systemic control, and speed under heavy transaction loads.

### Visual Aesthetic
A refined blend of **Modern Enterprise Functionalism** and **Subtle Technical Cleanliness**:
- Crisp, low-noise white and cool slate surfaces with subtle geometric boundaries.
- Precise focus states and data borders, eschewing gratuitous ornamentation.
- Deliberate semantic color application: deep, stabilizing indigos anchor navigation and command structures, vibrant electric cyans direct active telemetry and primary interactions, and unambiguous status pigments inform stock alerts instantly.

## Colors

The palette leverages high-contrast structural hues tailored for prolonged workstation usage, with clear demarcation between operational roles, stock alerts, and systemic states.

### Core Roles
- **Primary (`#1E1B4B` - Deep Midnight Indigo):** Serves as the primary structural color for global sidebars, main action targets, high-level navigation, and prominent title hierarchies.
- **Secondary (`#06B6D4` - Electric Cyan):** The interactive accent and highlight token, utilized for focused states, progress telemetry, primary call-to-actions, and active data visualization nodes.
- **Tertiary (`#4338CA` - Royal Indigo):** Bridges primary structure and interactive components; applied across active filters, bulk selection indicators, and interactive links.
- **Neutral (`#0F172A` - Slate Black):** Anchors high-density alphanumeric data, table typography, and boundary geometry.

### Semantic & Inventory Signals
- **In Stock:** `#059669` (Emerald 600) on `#ECFDF5` (Emerald 50) border `#A7F3D0` (Emerald 200).
- **Low Stock / Warning:** `#D97706` (Amber 600) on `#FFFBEB` (Amber 50) border `#FDE68A` (Amber 200).
- **Out of Stock / Danger:** `#DC2626` (Rose 600) on `#FEF2F2` (Rose 50) border `#FECACA` (Rose 200).

### Role Indicator Accents
- **Admin:** Deep indigo base (`#1E1B4B`) with crisp slate tinting.
- **Warehouse Manager:** Cyan-teal saturation (`#0891B2`) indicating operational command.
- **Staff:** Balanced neutral slate (`#475569`) with subtle steel shading.

## Typography

The typographical system establishes full bilingual visual parity between Latin alphanumeric characters and Khmer script. 

### Font Pairing & Fallbacks
- **Primary & UI Core:** `Inter` paired identically with `Kantumruy Pro` for UI headings, operational data, and table fields. For formal document headers and institutional display statements, fallback cascade references `Hanuman` (`Inter, 'Kantumruy Pro', 'Hanuman', sans-serif`).
- `Kantumruy Pro` was chosen for enterprise software due to its modern sans-serif proportion matching with `Inter`, ensuring equivalent x-height, baseline alignment, and legibility at dense 12px–14px sizes.

### Multi-language Metric Layout
- Numerical SKU, barcode codes, serial codes, and quantities enforce tabular figures (`font-variant-numeric: tabular-nums`) to guarantee column alignment across fast-scrolling audit logs.
- When rendering Khmer body copy, line-height is automatically afforded an additional 15% clearance across CSS wrappers to accommodate complex subscript and superscript diacritics without vertical clipping.

## Layout & Spacing

A fluid, screen-optimizing 12-column grid system drives data visibility across enterprise widescreen workstations while adapting seamlessly to tablet and barcode scanners.

### Breakpoints & Canvas Bounds
- **Desktop (1440px and above):** 12-column fluid grid, `2rem` outer page margins, `1.5rem` gutters. Optimized for full-width side navigation and simultaneous multi-panel master-detail views.
- **Tablet (768px – 1439px):** 8-column layout, `1.5rem` outer margins, `1rem` gutters. The global navigation collapses into a persistent icon rail.
- **Mobile Handheld (Below 768px):** 4-column layout, `1rem` outer margins, `0.75rem` gutters. Data tables reflow into dense card stacks for barcode-assisted stock audits.

### Spatial Rhythm
Padding and internal spacing conform to an intentional 4px/8px incremental rhythm (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 32px). Data tables utilize condensed vertical cell padding (`0.625rem` / 10px) to balance scanner speed with visual scanning accuracy.

## Elevation & Depth

To preserve extreme clarity and eliminate perceptual clutter in complex stock logs, the design system minimizes heavy drop shadows in favor of **Crisp Tonal Layering** combined with **Engineered Low-Contrast Outlines**.

### Elevation Stack
- **Base Canvas (Level 0):** Pure Cool White (`#F8FAFC`) serving as the backdrop for all structural units.
- **Surface Tier 1 (Cards, Tables, Panels):** Solid Crisp White (`#FFFFFF`) with a hairline border (`1px solid #E2E8F0`). 
- **Surface Tier 2 (Hovered Rows, Dropdowns, Flyouts):** Lifted with an ultra-diffused micro shadow: `0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.03)` wrapped in `#CBD5E1` boundary definition.
- **Surface Tier 3 (Modals, Overlays, Command Palettes):** Backdrop overlay tinted with primary indigo (`#0F172A` with 45% opacity and `backdrop-filter: blur(4px)`). The modal container projects deliberate structural elevation: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)`.

## Shapes

The design system employs a **Soft** shape token system (Level 1). Subtle roundedness communicates modern enterprise polish while retaining rigid architectural discipline.

### Geometry Hierarchy
- **Standard UI Elements (Buttons, Inputs, Badges, Table Rows):** `0.25rem` (4px). Preserves dense tabular alignment and square grid lines.
- **Containers & Surface Panels (Stats Cards, Data Tables, Content Containers):** `rounded-lg` at `0.5rem` (8px). Softens large blocks without wasting perimeter real estate.
- **Modals & Dialog Windows:** `rounded-xl` at `0.75rem` (12px). Clearly identifies transient overlay status.
- **Badges and Pills (Stock status, User roles):** Soft pills set at `0.25rem` to `9999px` conditionally—status pills use `9999px` full capsule radius for instant visual distinction against rectangular table cells.

## Components

### 1. High-Clarity Data Tables
- **Header:** Sticky table header with slate tint (`#F8FAFC`), uppercase labels in `label-sm`, subtle bottom border (`1px solid #CBD5E1`).
- **Rows:** Alternating subtle zebra striping optional; standard is clean white with bottom divider (`1px solid #F1F5F9`). Active row hover transitions immediately to `#F8FAFC`. Selected rows highlight with `#F0FDFA` alongside a `2px` left border in secondary cyan (`#06B6D4`).
- **Cells:** Numeric values align right using tabular figures. Stock levels feature inline mini bar indicators.

### 2. Stock Status Badges
- Displayed as compact, border-encapsulated micro-capsules (`padding: 2px 8px`, `font-size: 11px`, `font-weight: 600`):
  - **In Stock:** `#ECFDF5` background, `#059669` text, `#A7F3D0` stroke. Includes a `6px` solid emerald indicator dot.
  - **Low Stock:** `#FFFBEB` background, `#D97706` text, `#FDE68A` stroke. Includes a `6px` pulsating amber dot.
  - **Out of Stock:** `#FEF2F2` background, `#DC2626` text, `#FECACA` stroke. Includes a `6px` solid rose dot.

### 3. Role Indicator Badges
- Structured rectangular tags (`rounded: 4px`, `padding: 2px 6px`, `font-size: 11px`, `font-weight: 600`, uppercase tracking):
  - **Admin:** Deep indigo tone (`#EEF2FF` background, `#3730A3` text, `#C7D2FE` border).
  - **Warehouse Manager:** Cyan-cyan tone (`#ECFEFF` background, `#0E7490` text, `#A5F3FC` border).
  - **Staff:** Neutral slate tone (`#F1F5F9` background, `#475569` text, `#CBD5E1` border).

### 4. Stats Cards
- Set on Surface Tier 1 (`#FFFFFF`, border `#E2E8F0`, rounded `8px`, padding `1.25rem`).
- **Top Row:** Metric label in `label-md` Slate 500, paired with an icon enclosed in an indigo or cyan micro-tile.
- **Middle Row:** Large metric value rendered in `metric-number` Slate 900.
- **Bottom Row:** Trend chip (e.g., `+12.4% vs last week` in green or red) combined with contextual warehouse location tags.

### 5. Import Modal & File Upload Zone
- **Modal Wrapper:** `600px` standard width, centered, Surface Tier 3 elevation.
- **File Upload Zone:** Drag-and-drop bounding box bordered by a `2px` dashed line (`#CBD5E1`), background `#F8FAFC`. 
- **Hover/Drag-Over State:** Dashed border transitions to `#06B6D4`, background tint shifts to cyan-50 (`#ECFEFF`).
- **Upload Details:** Includes standard cloud upload glyph, bilingual prompt ("Drop CSV/Excel here or Browse" / "ទម្លាក់ឯកសារ CSV/Excel ទីនេះ ឬរុករក"), supported formats line (`.CSV, .XLSX up to 25MB`), and template download anchor link in Tertiary Indigo.

### 6. Inputs & Interactive Controls
- **Input Fields:** Standard height of `38px`, crisp `#E2E8F0` border, `4px` corner radius. Focused state applies a sharp `1px` ring in `#06B6D4` without heavy outward glow. Bilingual placeholders in muted slate (`#94A3B8`).
- **Primary Buttons:** Deep midnight indigo background (`#1E1B4B`), pure white label, `0.25rem` radius, hover elevation shift to `#312E81`.
- **Secondary Buttons:** Crisp white background, `#E2E8F0` border, `#0F172A` text, hover transition to `#F8FAFC`.
- **Accent Actions:** Electric cyan button (`#06B6D4`), dark slate text (`#083344`), designated for fast-path stock operations (e.g., "Scan Item", "Quick Transfer").