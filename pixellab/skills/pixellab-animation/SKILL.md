---
name: pixellab-animation
description: Animate pixel art characters using PixelLab — skeleton-based, text-based, and pose-based animation. Use when the user mentions "animate", "animation", "walk cycle", "skeleton", "keyframe", "sprite animation", "idle animation", "run cycle", "re-pose", "text to animation", or "text2animation".
---

# pixellab-animation

## Skeleton Animation

**API: `POST /animate-with-skeleton`**

Supported sizes: 16x16, 32x32, 64x64, 128x128, 256x256

Produces 4 frames per generation.

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `image_size` | `{width, height}` | required | Must be a predefined size |
| `reference_image` | Base64Image | required | Character reference |
| `skeleton_keypoints` | array[array[Point]] | required | Per-frame skeleton poses |
| `guidance_scale` | number | 4.0 | 1.0–20.0 |
| `view` | CameraView | `"side"` | Camera perspective |
| `direction` | Direction | `"east"` | Facing direction |
| `isometric` | boolean | false | Isometric view |
| `oblique_projection` | boolean | false | Oblique projection |
| `init_images` | array[Base64Image] | null | Starting images per frame |
| `init_image_strength` | integer | 300 | 1–999 |
| `inpainting_images` | array[Base64Image] | null | Existing frames to preserve |
| `mask_images` | array[Base64Image] | null | Inpainting masks |
| `color_image` | Base64Image | null | Force palette |
| `seed` | integer | null | Reproducibility |

### 18 Skeleton Keypoint Labels

NOSE, NECK, RIGHT SHOULDER, RIGHT ELBOW, RIGHT ARM, LEFT SHOULDER, LEFT ELBOW, LEFT ARM, RIGHT HIP, RIGHT KNEE, RIGHT LEG, LEFT HIP, LEFT KNEE, LEFT LEG, RIGHT EYE, LEFT EYE, RIGHT EAR, LEFT EAR

**Clarification:** ARM = wrist/hand position. LEG = ankle/foot position.

**Point format:** `{ x: number, y: number, label: SkeletonLabel, z_index: number (default 0) }`

**Note on quadrupeds:** Quadruped keypoints are not documented in the REST API. Use the MCP `create_character` tool for quadruped characters.

### Skeleton Workflow

1. Estimate skeleton from reference image: `POST /estimate-skeleton` (character must be on transparent background)
2. Set reference image
3. Choose an animation template or manually define keypoints per frame
4. Choose a freeze strategy:
   - **Freeze 1 → Generate 2**: single frozen reference frame, generate the remaining frames
   - **Freeze 2 → Generate 1**: two frozen frames for stronger guidance
   - **Custom**: manually choose which frames are frozen vs generated
5. Generate
6. Fix issues manually, then re-generate problem frames using inpainting at increasing `init_image_strength`

**`fixed_head`:** Editor-only option (Aseprite/Pixelorama advanced settings). When set to `"always"`, copies the reference head across all frames for facial consistency. Not available via REST API.

---

## Text Animation

**API: `POST /animate-with-text`**

**API output size: fixed 64x64.** This endpoint only produces 64x64 frames.

The Editor Pro version (`animate-with-text-pro`) supports variable reference sizes up to 256px — see the pixellab-concept-to-playable skill for frame output tables.

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `image_size` | `{width, height}` | required | MUST be `{width: 64, height: 64}` — this endpoint only supports 64x64 output |
| `reference_image` | Base64Image | required | Character reference |
| `description` | string | required | Character description |
| `action` | string | required | e.g., "walk", "run", "idle", "attack" |
| `n_frames` | integer | 4 | 2–20 (number of frames to generate) |
| `start_frame_index` | integer | 0 | 0–20 (offset into the animation sequence; ensure `start_frame_index + n_frames` stays within valid range) |
| `view` | CameraView | `"side"` | Camera view |
| `direction` | Direction | `"east"` | Facing direction |
| `image_guidance_scale` | number | 1.4 | 1.0–20.0 |
| `text_guidance_scale` | number | 8.0 | 1.0–20.0 |
| `init_images` | array[Base64Image] | null | Starting frames |
| `init_image_strength` | integer | 300 | 1–999 |
| `inpainting_images` | array[Base64Image] | null | Existing frames |
| `mask_images` | array[Base64Image] | null | Masks |
| `color_image` | Base64Image | null | Palette |
| `seed` | integer | 0 | **0 = random** (for this endpoint only; unlike other endpoints where null means random) |

---

## Text2Animation (Pro) — Create Character + Animation from Scratch

**Access: Editor-only** (Aseprite/Pixelorama/Creator). No REST API endpoint.

**API alternative:** Use Pixflux to generate a character, then use `/animate-with-text` to animate it.

- Creates both character and animation simultaneously from text
- Sizes: 32x32, 64x64, 128x128 (up to 256x256)
- Parameters: description, action, no_background, seed
- Frame output by canvas size:
  - 32–64px: 16 frames (4×4 grid, 20 gens)
  - 65–128px: 4 frames (2×2 grid, 20 gens)
  - 129–170px: 4 frames (2×2 grid, 25 gens)
  - 171–256px: 4 frames (2×2 grid, 40 gens)

---

## Animation-to-Animation

**Access: Editor-only** (Aseprite/Pixelorama/Creator). No REST API endpoint.

**API alternative:** Use `/animate-with-skeleton` or `/animate-with-text` with `init_images` set to existing frames.

- Description-driven animation generation from an existing animation reference
- Canvas sizes: 16x16, 32x32, 64x64, 128x128
- Start with 2 frames, use reference image for consistency, then iterate
- Key parameters: description, action_description, n_images, outline, shading, detail, ai_freedom, guidance_weight
- Requires Tier 2+

---

## Re-Pose

**Access: Editor-only** (Aseprite extension only). No REST API endpoint.

**API alternative:** Use `/animate-with-skeleton` with custom keypoints defining the desired pose.

- Adjust a character's pose via skeleton keypoints
- Requires `POST /estimate-skeleton` first
- Supported sizes: 16–256
- Set view and direction, adjust skeleton, generate

---

## Estimate Skeleton

**API: `POST /estimate-skeleton`**

- Input: character image on transparent background
- Returns: array of `{ x, y, label, z_index }` keypoints
- Cost: $0.00511–$0.00516

---

## Pricing (Skeleton Animation)

| Size | Cost |
|---|---|
| 32x32 | $0.0136 |
| 64x64 | $0.0136 |
| 128x128 | $0.01572 |
