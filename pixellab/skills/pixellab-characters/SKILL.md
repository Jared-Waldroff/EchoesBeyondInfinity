---
name: pixellab-characters
description: Create pixel art characters using PixelLab. Use when the user mentions "create character", "pixel art character", "sprite", "generate character", "bitforge", "pixflux", "style reference", or wants to generate pixel art characters, items, or assets with consistent style.
---

# PixelLab Characters

## Two Generation Models

**Pixflux** — Text-to-pixel-art. General purpose.
- API: `POST /generate-image-pixflux`
- Max area: 400x400 (width/height each 16-400)
- Best for: characters, items, environments from text descriptions

**Bitforge** — Style-transfer pixel art. Match a reference image's style.
- API: `POST /generate-image-bitforge`
- Max area: 200x200 (width/height each 16-200)
- Best for: creating assets that match an existing art style
- Extra params: `style_image`, `style_strength` (0-100), `inpainting_image`, `mask_image`, `skeleton_keypoints`

## Shared Parameters (Both Models)

| Parameter | Type | Default | Range/Values |
|---|---|---|---|
| `description` | string | required | Text description of what to generate |
| `negative_description` | string | `""` | What to avoid. **Deprecated on Pixflux** (ignored); still functional on Bitforge. Use positive description to guide instead. |
| `image_size` | `{width, height}` | required | See limits per model |
| `text_guidance_scale` | number | 8.0 | 1.0-20.0 |
| `outline` | Outline enum | null | Border style (see Visual Control Enums below) |
| `shading` | Shading enum | null | Lighting/shadow level |
| `detail` | Detail enum | null | Visual complexity |
| `view` | CameraView enum | null | Camera angle |
| `direction` | Direction enum | null | Character facing |
| `isometric` | boolean | false | Isometric projection |
| `no_background` | boolean | false | Transparent background |
| `init_image` | Base64Image | null | Starting image |
| `init_image_strength` | integer | 300 | 1-999 |
| `color_image` | Base64Image | null | Force color palette |
| `seed` | integer | null | Reproducible results (null=random) |

## Bitforge-Only Extra Parameters

| Parameter | Type | Default | Range/Notes |
|---|---|---|---|
| `style_image` | Base64Image | null | Reference image whose style to match |
| `style_strength` | integer | — | 0-100; how strongly to apply the style image |
| `inpainting_image` | Base64Image | null | Image to inpaint over (requires `mask_image`) |
| `mask_image` | Base64Image | null | Black mask marking areas to regenerate |
| `skeleton_keypoints` | array | null | Pose keypoints for skeleton-guided generation |
| `oblique_projection` | boolean | false | Oblique (Tibia-style) projection |
| `coverage_percentage` | integer | — | 0-100; how much of canvas the character fills |
| `skeleton_guidance_scale` | number | — | Controls skeleton adherence strength |

## Visual Control Enums

**Outline:** `"single color black outline"` | `"single color outline"` | `"selective outline"` | `"lineless"`

**Shading:** `"flat shading"` | `"basic shading"` | `"medium shading"` | `"detailed shading"` | `"highly detailed shading"`

**Detail:** `"low detail"` | `"medium detail"` | `"highly detailed"`

**Camera View:** `"side"` | `"low top-down"` | `"high top-down"`

**Direction:** `"north"` | `"north-east"` | `"east"` | `"south-east"` | `"south"` | `"south-west"` | `"west"` | `"north-west"`

## Init Image Strength Guide

| Strength | Effect | Use Case |
|---|---|---|
| 0-300 | Extremely rough color guidance | Color palette seeding |
| 300-400 | Rough shapes and colors | Sketch rough color blobs |
| 400-600 | Medium shape/color guidance | Create variations on existing image |
| 600-900 | Detailed guidance | Adding details or slight modifications |

## Seed Behavior

`seed: null` means random. Set a specific integer to reproduce identical outputs.

## Style Consistency (Pro) — Consistent-Style Tool

**Editor-only** (Aseprite/Pixelorama/Creator). Not available via REST API. For programmatic style consistency, use Bitforge with `style_image` + `style_strength` parameters.

Generate multiple images matching a reference style. For cohesive game asset sets.

- Upload 1+ style reference images
- Frame output depends on largest style image size:

| Style Image Size | Output | Generations |
|---|---|---|
| ≤32px | 64 frames (8x8 grid) | 20 |
| 33-42px | 64 frames (8x8 grid) | 25 |
| 43-64px | 16 frames (4x4 grid) | 20 |
| 65-85px | 16 frames (4x4 grid) | 25 |
| 86-128px | 4 frames (2x2 grid) | 20 |
| 129-170px | 4 frames (2x2 grid) | 25 |
| 171-256px | 1 frame | 20 |
| 257-341px | 1 frame | 25 |
| 342-512px | 1 frame | 40 |

- Max style images per size: 64 at 32x32, 16 at 64x64, 4 at 128x128, 1 at 256x256
- Parameters: style images, description, style description (advanced), no_background (default true), seed

## Character Options

**Body types (MCP):** `"humanoid"` (default), `"quadruped"`

**Quadruped templates:** bear, cat, dog, horse, lion

**Proportions presets (MCP):** default, chibi, cartoon, stylized, realistic_male, realistic_female, heroic

**Coverage percentage (Bitforge only):** 0-100, controls how much of canvas the character fills

## Canvas Size Recommendations

- Characters: 2:3 aspect ratio (e.g., 48x64, 64x96)
- Scenery: 16:9 aspect ratio (e.g., 160x100)

## Pricing (Pixflux)

| Size | Cost |
|---|---|
| 64x64 | $0.00793 |
| 128x128 | $0.00793 |
| 320x320 | $0.0101 |
| 400x400 | $0.0132 |

## Pricing (Bitforge)

| Size | Cost |
|---|---|
| 32x32 | $0.0071 |
| 64x64 | $0.00716 |
| 128x128 | $0.00797 |
| 200x200 | $0.01122 |
