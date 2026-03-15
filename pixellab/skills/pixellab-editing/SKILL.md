---
name: pixellab-editing
description: Edit and modify existing pixel art using PixelLab — inpainting, background removal, color reduction. Use when the user mentions "inpaint", "edit pixel art", "modify sprite", "remove background", "resize pixel art", "reduce colors", "fix sprite", or "color palette".
---

## Inpaint (API)

- API: `POST /inpaint`
- Max area: 200x200

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `inpainting_image` | Base64Image | required | Image to edit |
| `mask_image` | Base64Image | required | White areas = modify, black = preserve |
| `description` | string | required | Describe FULL visible area, not just masked region |
| `negative_description` | string | `""` | What to avoid |
| `image_size` | `{width, height}` | required | 16-200 each |
| `text_guidance_scale` | number | 3.0 | 1.0-10.0 (note: lower max than Pixflux/Bitforge's 1.0-20.0) |
| `outline` | Outline | null | Visual control |
| `shading` | Shading | null | Visual control |
| `detail` | Detail | null | Visual control |
| `view` | CameraView | null | Camera angle |
| `direction` | Direction | null | Facing |
| `isometric` | boolean | false | Isometric projection |
| `oblique_projection` | boolean | false | Oblique projection (Tibia-style) |
| `no_background` | boolean | false | Transparent BG |
| `init_image` | Base64Image | null | Starting image |
| `init_image_strength` | integer | 300 | 1-999 |
| `color_image` | Base64Image | null | Palette |
| `seed` | integer | null | Reproducibility |

**Critical rule:** The description should describe the FULL scene context, not just the masked area. The model views the entire image.

---

## Edit Image (Instruction-Based)

**Access: Editor-only** (Aseprite/Pixelorama/Creator). No REST API endpoint. **API alternative**: Use `/inpaint` with a mask covering the area to change.

- No mask needed — describe the edit as an action
- Use action words: "change", "add", "remove", "replace"
- Example: "give the character a hat", "remove the sword", "change armor to blue"
- Parameters: instruction (text), guidance_weight (advanced), target_palette, remove_background, seed
- Max area by tier: T1 200x200, T1+ 320x320, T2+ 400x400

---

## Remove Background

**Access: Editor-only** (Aseprite/Pixelorama extensions). No REST API endpoint. **API alternative**: Generate with `no_background: true` on any generation endpoint.

- Simple mode: solid/simple backgrounds
- Complex mode: detailed backgrounds (requires subject description, e.g., "warrior character")

---

## Resize

**Access: Editor-only.** Standard pixel art resizing.

---

## Unzoom (Pixel Art Upscale)

**Access: Editor-only.** Upscale pixel art while maintaining pixel-perfect aesthetic.

---

## Reduce Colors

**Access: Editor-only.** No REST API endpoint. Post-processing tool for cleaning up generation outputs.

- Quantization methods:
  - **Auto**: system determines optimal color count
  - **Specify colors**: user defines exact count
  - **Use palette**: reduce to specific palette (Lospec palette import supported)
- Dithering option for smoother gradients
- Max processable area: 512x512
- Use as post-processing step to clean up generation outputs

---

## Iterative Editing Workflow

```
1. Generate initial asset
2. Identify issues
3. Inpaint: paint black on inpainting layer over problem areas
4. Lower init_image_strength for more creative freedom
5. Set output to "Modify current layer"
6. Re-generate
7. Repeat until satisfied
```

---

## Combined Init Image + Inpainting

For complex edits, use both simultaneously:
- Sketch improvements directly on the image (init image)
- Mark refinement areas with black on inpainting layer
- Re-generate to integrate both modifications

---

## Pricing (Inpaint)

Same as Bitforge: $0.0071 (32x32) to $0.01122 (200x200)
