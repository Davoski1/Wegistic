# Spot Art Image Generation Prompts (Wegistics / Telxi Logistics)

This guide provides targeted prompts for generating consistent visual anchor spot illustrations to be embedded into the HTML concept document and preserved during PDF compilation.

---

## 1. Style Directive & Constraints

To ensure consistency across every generated image and adhere to the [Telxi Styleguide](file:///c:/Users/halir/Desktop/wegistics/Styleguide.md), all prompts share a standard style prefix and negative prompt constraint.

* **Art Direction:** Minimalist Swiss technical vector illustration, clean hairline outlines, isometric or flat orthographic perspective.
* **Palette:** Pure white background (`#FFFFFF`), dark charcoal outlines (`#171717`), brand primary purple accents (`#7006B7`), and soft lavender fills (`#F3E8FF`, `#DDD6FE`).
* **Aspect Ratio:** `1:1` (Square, recommended `1024x1024`) or `4:3` (`1200x900`).
* **Universal Negative Prompt:**
  > `photorealistic, 3D glossy render, shiny plastic, neon cyberpunk glow, messy gradients, blurry lines, extra limbs, distorted hands, generic stock photo, corporate clip-art characters, text, watermark, busy background.`

---

## 2. Feature-Specific Prompts

### Anchor 1: Trustless Handover & Smart Escrow
* **Concept:** Mediating the physical exchange of goods between dispatch rider and buyer via cryptographic escrow release.
* **Aspect Ratio:** `1:1` (Square)
* **Prompt:**
  ```text
  Minimalist flat vector spot illustration of a delivery package exchange, two stylized hands meeting over a geometric cardboard parcel, a clean technical padlock icon unlocking above the package, subtle cryptographic key motif. Clean dark charcoal line art (#171717), flat color accents in deep purple (#7006B7) and lavender tint (#F3E8FF). Precision linework, Swiss graphic design aesthetic, isolated on an absolute pure white background (#FFFFFF), zero shadows, no gradients, no photorealism. --ar 1:1
  ```

---

### Anchor 2: Tamper-Evident QR Security Seal
* **Concept:** Physical tamper-evident holographic seal with a scannable QR verification grid.
* **Aspect Ratio:** `1:1` (Square)
* **Prompt:**
  ```text
  Technical spot illustration of a modern delivery box closed with a visible tamper-evident security tape, a smartphone scanning a high-precision QR code on the seal with a fine purple scanner guideline. Flat vector aesthetic, 1.5px hairline outlines in charcoal (#171717), accent highlights in Telxi purple (#7006B7) and soft lavender (#DDD6FE). Clean architectural iconography, isolated on pure white background (#FFFFFF), no noise, high contrast, SVG look. --ar 1:1
  ```

---

### Anchor 3: Logistics Liquidity Vault (DePIN Collateral)
* **Concept:** Underwriting in-transit goods to protect vendors against rider theft through decentralized collateral vaults.
* **Aspect Ratio:** `1:1` (Square)
* **Prompt:**
  ```text
  Minimalist vector spot illustration depicting supply chain collateral security: an isometric logistics dispatch motorcycle and delivery container enclosed within a subtle geometric shield vault and vault lock motif. Modern technical fintech illustration style, dark charcoal linework (#171717), primary brand purple accents (#7006B7), light lavender surface fills (#F3E8FF). Isolated on clean pure white background (#FFFFFF), sharp edges, minimalist composition. --ar 1:1
  ```

---

### Anchor 4: Multi-Signature Arbiter & Dispute Resolution
* **Concept:** 2-of-3 multi-sig governance system resolving damaged or defective delivery disputes.
* **Aspect Ratio:** `1:1` (Square)
* **Prompt:**
  ```text
  Minimalist isometric vector diagram of a 2-of-3 multi-signature consensus network: three clean connected geometric nodes representing Buyer, Arbiter, and Vendor, linked by technical hairline connection pathways with a central balanced scales icon. Flat vector design, deep purple (#7006B7) and soft lavender (#DDD6FE) accents with dark slate linework (#171717) on a pure white background (#FFFFFF). Minimalist, technical diagrammatic style. --ar 1:1
  ```

---

## 3. Implementation Tips for HTML & PDF Compilation

1. **Format:** Export/save the generated variations as clean `.png` or vector `.svg` files inside an `assets/` or `images/` directory.
2. **Container Sizing:** In the HTML layout, constrain the images within cards using:
   ```html
   <div class="spot-art-container" style="width: 140px; height: 140px; flex-shrink: 0; background-color: #F5F5F5; border-radius: 8px; border: 1px solid #E5E5E5; display: flex; align-items: center; justify-content: center; overflow: hidden;">
     <img src="./assets/escrow-handover.png" alt="Escrow Handover" style="width: 100%; height: 100%; object-fit: contain; padding: 8px;" />
   </div>
   ```
3. **Print Safety:** Set `page-break-inside: avoid;` on parent card containers to prevent the image and its text description from splitting across A4 pages.
