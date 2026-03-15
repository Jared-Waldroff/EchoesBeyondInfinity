---
name: pixellab-rotation
description: Rotate pixel art characters and objects, create 8-directional sprites using PixelLab. Use when the user mentions "rotate character", "rotation", "8 directions", "directional sprite", "facing direction", "turn character", "isometric rotation", "oblique projection", "view change", "cardinal directions", or "north-facing sprite".
---

# PixelLab Rotation Skill

## Rotate Endpoint

- API: `POST /rotate`
- Supported sizes: 16x16, 32x32, 64x64, 128x128

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `image_size` | `{width, height}` | required | Must be 16x16, 32x32, 64x64, or 128x128 |
| `from_image` | Base64Image | required | Character to rotate |
| `from_view` | CameraView | `"side"` | Starting camera view |
| `to_view` | CameraView | `"side"` | Target camera view |
| `from_direction` | Direction | `"south"` | Starting facing |
| `to_direction` | Direction | `"east"` | Target facing |
| `view_change` | integer | null | -90 to 90 degrees (alternative to from/to view) |
| `direction_change` | integer | null | -180 to 180 degrees (alternative to from/to direction) |
| `image_guidance_scale` | number | 3.0 | 1.0-20.0 |
| `isometric` | boolean | false | Isometric projection |
| `oblique_projection` | boolean | false | Oblique projection (Tibia-style) |
| `init_image` | Base64Image | null | Starting image for refinement |
| `init_image_strength` | integer | 300 | 1-999 |
| `mask_image` | Base64Image | null | Inpainting mask (requires init_image) |
| `color_image` | Base64Image | null | Force palette |
| `seed` | integer | null | Reproducibility |

## 8-Directional Sprite (Pro) — Editor/MCP Only

**Access: Editor-only** (Aseprite/Pixelorama/Creator) and MCP (`create_character` with `n_directions: 8`). No raw REST API endpoint. **API alternative**: call `/rotate` iteratively for each direction.

Generates all 8 directions in a single 3x3 grid: S, SE, E, NE, N, NW, W, SW.

**Three methods:**

1. **Create with Style**: description + optional reference image
2. **Create from Concept**: upload concept art (max 1024x1024) → 8 rotations
3. **Rotate Character**: provide 1 direction reference (max 168x168) → generate remaining 7

**Parameters:** description, concept/reference image, output size (max 168x168 per frame), view, body type (bipedal/quadrupedal), no_background (default true), seed

**Generation cost by output size:**
- 1-85px: 20 generations
- 86-113px: 25 generations
- 114-168px: 40 generations

## Two Rotation Strategies

**Static Reference (recommended for consistency):**
- Start with one south-facing image
- Generate all 7 remaining directions from that single reference
- Pros: consistent style, single reference point
- Cons: model may struggle with complex details at extreme angles

**Iterative (recommended for quality):**
- Rotate 45 degrees at a time, updating reference after each
- Pros: better quality for each individual rotation
- Cons: errors accumulate over multiple generations

## View/Direction Framework

8 directions: north, north-east, east, south-east, south, south-west, west, north-west

3 camera views: side (sidescroller), low top-down (~20 deg, RPG), high top-down (~35 deg, RTS)

View and direction are weak guides. Improve results by:
- Combining with init images
- Adding keywords to description (e.g., "in profile" for side-facing)

## Mirroring Trick

East and west orientations are horizontal mirrors. Generate one, flip the other — saves 50% on those directions.

## Fixing Problem Rotations

- Regenerate with different seed
- Inpaint specific problem areas (hat, weapon, etc.)
- Use generated result as init_image with manual adjustments
- Mirror a successful symmetric direction

## Pricing

| Size | Cost |
|---|---|
| 64x64 | $0.01057 |
| 128x128 | $0.01091 |
