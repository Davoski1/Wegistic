# Telxi Brand Style Guide (Logo Purple Edition)

---

## 1. Brand Identity & Design Principles

* **Minimalist:** Clean layouts with purposeful whitespace. Elimination of clutter so that student focus remains entirely on learning materials and academic progress.
* **Technical & Precise:** Developer-grade precision using mathematical 8-point alignment, hairline borders, and data-focused typography.
* **Bold & Brand-Aligned:** High-contrast foundations grounded in pure white and deep text tones, punctuated by Telxi's signature logo purples (`#7006B7`, `#8F0CD1`, `#550592`) for actions and active states.
* **Accessible:** High legibility meeting WCAG contrast benchmarks, large touch targets (minimum 44px), legible type hierarchy, and clear keyboard focus states.

---

## 2. Color Palette & Design Tokens

### 2.1 Brand Purple Spectrum (Derived Directly from Telxi Logo)

| Token Name | Hex Code | RGB | Role & Usage |
| :--- | :--- | :--- | :--- |
| **Brand Highlight (Logo Ears)** | `#8F0CD1` | `rgb(143, 12, 209)` | Hover states, glowing particle highlights, active progress rings, link accents. |
| **Brand Primary (Logo Body)** | `#7006B7` | `rgb(112, 6, 183)` | **Primary brand color**: Main CTA buttons, active tab indicators, primary badges. |
| **Brand Dark (Logo Base/Chin)**| `#550592` | `rgb(85, 5, 146)` | Active/pressed button states, high-contrast badges, deep gradient stops. |
| **Brand Subtle (Lavender Wash)**| `#F3E8FF` | `rgb(243, 232, 255)` | Soft background tints (8–10%) for category pills, badge backings, and icon circles. |
| **Brand Accent (Soft Lavender)** | `#DDD6FE` | `rgb(221, 214, 254)` | Badge borders, subtle divider lines, text link underline hover animations. |

### 2.2 Neutral Canvas & Surface Colors

| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Background (Canvas)** | `#FFFFFF` | Base canvas background. Pure, crisp white. |
| **Card / Surface Background** | `#F5F5F5` | Very light gray surface for cards, nested mockup containers, and table headers. |
| **Hairline Border** | `#E5E5E5` | Clean subtle borders, separators, card outlines, and input boundaries. |
| **Primary Text** | `#171717` | High-contrast dark charcoal for headings, body copy, and primary titles. |
| **Secondary Text** | `#737373` | Balanced medium gray for descriptions, subheadings, and timestamps. |

### 2.3 Semantic Status Colors

| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Success** | `#10B981` | Emerald green for correct answers, completed tasks, and online status. |
| **Error / Alert** | `#EF4444` | Crisp red for validation warnings, missed questions, and app locks. |
| **Gems / Achievement** | `#F59E0B` | Warm gold for streaks, study gems, badges, and leaderboard rankings. |

---

## 3. Typography System

* **Primary Font Family:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`, `sans-serif`
* **Logo Wordmark Only:** `Bebas Neue`, `sans-serif` (reserved strictly for the "TELXI" logotype)

### Type Scale & Hierarchy

| Level | Size | Weight | Line Height | Tracking | Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero)** | `48px` (`3rem`) | Bold (`700`) | `1.15` | `-0.02em` | Hero animated headline |
| **H2 (Section)** | `32px`–`40px` | Bold (`700`) | `1.25` | `-0.015em` | Major section headers |
| **H3 (Card/Title)**| `24px` (`1.5rem`) | Semi-Bold (`600`) | `1.3` | `-0.01em` | Feature card titles |
| **H4 (Subheading)**| `18px` (`1.125rem`)| Medium (`500`) | `1.4` | `normal` | Subsection headers, labels |
| **Body Text** | `16px` (`1rem`) | Regular (`400`) | `1.5` | `normal` | Explanatory text, card descriptions |
| **Small / Badges**| `14px` (`0.875rem`)| Medium (`500`) | `1.4` | `+0.01em` | Button labels, secondary notes |
| **Micro / Tags** | `11px`–`12px` | Semi-Bold (`600`) | `1.35` | `+0.05em` | All-caps category pills & badges |

---

## 4. Spacing & Layout (8-Point Grid)

All dimensions, margins, paddings, and gaps follow strict multiples of **8px**:

* **8px (`p-2` / `gap-2`):** Button inner spacing, icon-to-label gaps, badge vertical padding.
* **16px (`p-4` / `gap-4`):** Standard card padding, input fields, mobile edge gutters.
* **24px (`p-6` / `gap-6`):** Desktop grid gaps, inner feature card padding.
* **32px (`mb-8`):** Spacing between paragraphs and header groups.
* **64px (`py-16`):** Section vertical breathing room on tablet/mobile.
* **96px–128px (`py-24`):** Whitespace gaps separating major landing page sections.

### Grid System
* **Max Width:** `1200px` centered on viewport (`max-w-[1200px] mx-auto px-6`).
* **Desktop:** 12-column responsive grid with `24px` gutters.
* **Mobile:** Collapses into a clean 1-column stack with `16px` outer gutters.

---

## 5. Core UI Components

### 5.1 Buttons

#### Primary Brand Action Button
* **Background:** Brand Primary (`#7006B7`)
* **Text:** `#FFFFFF` (Pure White), `14px`, Medium weight (`font-medium`)
* **Padding:** `12px 24px` (`py-3 px-6` / `py-3.5 px-7`)
* **Border Radius:** `8px` (`rounded-lg`)
* **Shadow:** `0 4px 14px rgba(112, 6, 183, 0.3)`
* **Hover State:** Background shifts to `#8F0CD1` with expanded glow `0 6px 20px rgba(143, 12, 209, 0.4)` and `-1px` transform lift.
* **Active / Pressed State:** Background shifts to `#550592`.

#### Secondary Button (Outlined)
* **Background:** Transparent
* **Border:** `1px solid #E5E5E5` (or `1px solid #171717`)
* **Text:** `#171717` (Rich Dark Gray)
* **Padding:** `12px 24px`
* **Border Radius:** `8px`
* **Hover State:** Background shifts to `#F5F5F5`, border to `#171717`.

---

### 5.2 Category Badges & Pills
* **Background:** `#F3E8FF` (Brand Subtle Tint)
* **Border:** `1px solid #DDD6FE` (Brand Accent)
* **Text:** `#7006B7` (Brand Primary), `11px`–`12px`, uppercase with `letter-spacing: 0.05em`
* **Border Radius:** `9999px` (`rounded-full`)
* **Indicator Dot (Optional):** `6px` solid circle in `#8F0CD1`.

---

### 5.3 Cards & Framed Containers
* **Background:** `#F5F5F5` (Very Light Gray) or `#FFFFFF` (depending on section contrast)
* **Border:** `1px solid #E5E5E5`
* **Border Radius:** `8px` (`rounded-lg`) for small cards; `16px` (`rounded-xl` / `rounded-2xl`) for larger featured frames.
* **Shadows:** Kept flat and minimal. Depth is created through clean `#E5E5E5` borders and surface contrast.
* **Hover State:** Border transitions to `#7006B7` or `#DDD6FE` with a soft ambient purple shadow `0 4px 20px rgba(112, 6, 183, 0.08)`.

---

### 5.4 Iconography
* **Icon Style:** Outlined style only (Lucide / custom SVG). Clean and technical, not filled.
* **Stroke Width:** Exactly `1.5px` (max `2.0px` for micro-icons).
* **Icon Containers:** Housed in `rounded-lg` containers with `#F3E8FF` background and `#7006B7` icon color.

---

### 5.5 Focus & Selection States
* **Focus Ring:** `2px solid #8F0CD1` with `2px` offset on interactive keyboard navigation.
* **Text Selection:**
  ```css
  ::selection {
    background-color: #DDD6FE;
    color: #171717;
  }
  ```

---

## 6. CSS Custom Properties (`index.css`)

```css
:root {
  /* Logo-Derived Brand Tokens */
  --brand-highlight: #8F0CD1;  /* Logo top ears & hover glow */
  --brand-primary:   #7006B7;  /* Logo center & primary buttons */
  --brand-dark:      #550592;  /* Logo base & pressed state */
  --brand-subtle:    #F3E8FF;  /* 8% soft purple tint for badges */
  --brand-accent:    #DDD6FE;  /* Lavender borders & selection */

  /* Neutral Surface Tokens */
  --bg-primary:      #FFFFFF;  /* Main canvas */
  --bg-secondary:    #F5F5F5;  /* Cards & nested frames */
  --text-primary:    #171717;  /* High-contrast headings & text */
  --text-secondary:  #737373;  /* Subtitles & descriptions */
  --border-color:    #E5E5E5;  /* Clean hairline borders */

  /* Semantic Feedback Tokens */
  --color-success:   #10B981;
  --color-error:     #EF4444;
  --color-warning:   #F59E0B;
}
```
