---
name: pixellab-concept-to-playable
description: Full pipeline from concept art to game-ready sprite sheets using PixelLab. Use when the user mentions "concept art to pixel", "concept to playable", "sprite sheet from concept", "character pipeline", "full character workflow", or wants to take artwork from concept through rotation and animation to final game assets.
---

# pixellab-concept-to-playable

Full pipeline from concept art to game-ready sprite sheets using PixelLab.

## End-to-End Pipeline

```
Concept Art/Sketch
    ↓ image-to-pixel-art (4x auto-downscale)
Pixel Art Base
    ↓ consistent-style Pro (lock visual style)
Style-Locked Character
    ↓ 8-direction rotation (Pro) OR rotate tool
8-Direction Sprite Set
    ↓ animate-with-text or animate-with-skeleton (per direction)
Animated Sprite Sheets
    ↓ reduce-colors + export
Game-Ready Assets
```

## Step 1: Concept to Pixel Art

- Tool: Image-to-pixel-art (**Editor-only** — Aseprite/Pixelorama/Creator. No REST API endpoint.)
- Auto 4x downscale (e.g., 256x256 concept → 64x64 pixel art)
- Set target palette for color consistency
- Adjust guidance weight for fidelity vs creative interpretation
- **API alternative**: Use Bitforge with `init_image` set to the concept art and `init_image_strength` at 300-400 for rough conversion, or Pixflux with the concept as `init_image`

## Step 2: Style Lock

- Tool: Consistent-style (Pro) — **Editor-only**
- **API alternative**: Use Bitforge with `style_image` set to your first character and `style_strength` 40-60 for all subsequent assets
- Upload the pixel art result as style image
- Generate variations: items, NPCs, enemies — all matching
- Style description (advanced) for explicit style notes like "8-bit retro"

## Step 3: Generate All Rotations

- Tool: Create 8-directional sprite (Pro) — all 8 directions in one generation
- **Access: Editor-only** (Aseprite/Pixelorama/Creator) and MCP (`create_character` with `n_directions: 8`). No raw REST API endpoint.
- Three methods:
  - **Create with Style**: description + optional reference
  - **Create from Concept**: upload concept art directly
  - **Rotate Character**: provide one direction, generate remaining 7
- Max output: 168x168 per frame
- **API alternative**: Use `/rotate` iteratively for each direction (see pixellab-rotation skill for full parameter reference)

## Step 4: Animate Each Direction

- Tool: Animate-with-text-Pro (**Editor-only** — Aseprite/Pixelorama/Creator). Supports variable reference sizes up to 256px.
- **API alternative**: Use `POST /animate-with-text` — fixed 64x64 output, 2-20 frames per call
- Set reference image to the rotation for that direction
- Common actions: "walk", "run", "idle", "attack", "jump"

**Editor (Pro) frame output by reference size:**

| Reference Size | Output | Generations |
|---|---|---|
| 32-64px | 16 frames (4x4 grid) | 20 |
| 65-128px | 4 frames (2x2 grid) | 20 |
| 129-170px | 4 frames (2x2 grid) | 25 |
| 171-256px | 4 frames (2x2 grid) | 40 |

**API (`/animate-with-text`) output:** Fixed 64x64, `n_frames` parameter controls frame count (2-20).

## Step 5: Polish and Export

- Reduce colors for palette consistency
- Remove background if not already transparent
- Inpaint fixes on any problem frames
- Assemble into sprite sheets

## Quality Iteration Loop

At any step:
1. Generate initial result
2. Identify issues (wrong pose, bad detail, color drift)
3. Inpaint fix: paint black on problem areas, describe full scene
4. Re-generate with init_image at higher strength (600-900 for minor fixes)
5. Repeat until satisfied

## Chaining Outputs Between API Calls

```javascript
// Generate character
const charResult = await client.generateImagePixflux({
  description: "warrior with sword",
  imageSize: { width: 64, height: 64 },
  noBackground: true,
});

// Use as reference for rotation
const rotateResult = await client.rotate({
  imageSize: { width: 64, height: 64 },
  fromImage: charResult.image,  // Chain Base64Image directly
  fromDirection: "south",
  toDirection: "east",
});
```

## Related Skills

- **pixellab-characters** — Character generation parameters (Bitforge, Pixflux) and pricing
- **pixellab-rotation** — Full `/rotate` endpoint parameter reference, 8-directional sprite Pro details, mirroring tricks
- **pixellab-animation** — Full `/animate-with-skeleton` and `/animate-with-text` endpoint parameters, skeleton keypoints
- **pixellab-editing** — Inpainting, reduce-colors, remove-background, and other polish tools
