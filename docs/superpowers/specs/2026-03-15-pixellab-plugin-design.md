# PixelLab Claude Code Plugin — Design Spec

## Purpose

A Claude Code plugin that encodes PixelLab's complete documentation as skills, enabling Claude to correctly generate pixel art assets (characters, animations, environments, tilesets, UI) via PixelLab's API in any project. Pure knowledge plugin — no scripts or executables.

## Important: API vs Editor-Only Tools

PixelLab has two access layers:

1. **REST API** (`api.pixellab.ai/v1`) — 8 endpoints callable via HTTP/SDK. These are the only tools available for programmatic integration.
2. **Editor/MCP-only tools** — Additional tools accessible only through Aseprite extension, Pixelorama editor, Creator web app, or MCP server. These include: image-to-pixel-art, animation-to-animation, text2animation (Pro), reduce-colors, re-pose, edit-image (instruction-based), remove-background, resize, unzoom, consistent-style (Pro), 8-directional sprite (Pro), and UI elements.

Skills clearly mark which tools are **API** (callable via REST/SDK), **MCP** (callable via MCP server tools), or **Editor-only** (available only in Aseprite/Pixelorama/Creator).

## Response Format (All API Endpoints)

All POST endpoints return JSON with this structure:
```json
{
  "usage": {
    "type": "usd",
    "usd": 0.00793
  },
  "image": {
    "type": "base64",
    "base64": "<encoded PNG image data>"
  }
}
```

For endpoints returning multiple images (skeleton animation, text animation):
```json
{
  "usage": {
    "type": "usd",
    "usd": 0.0136
  },
  "images": [
    { "type": "base64", "base64": "<frame 1>" },
    { "type": "base64", "base64": "<frame 2>" },
    { "type": "base64", "base64": "<frame 3>" },
    { "type": "base64", "base64": "<frame 4>" }
  ]
}
```

For `/estimate-skeleton`:
```json
{
  "usage": { "type": "usd", "usd": 0.00511 },
  "keypoints": [
    { "x": 32.0, "y": 16.0, "label": "NOSE", "z_index": 0 },
    { "x": 32.0, "y": 24.0, "label": "NECK", "z_index": 0 }
  ]
}
```

For `GET /balance`:
```json
{
  "type": "usd",
  "usd": 12.50
}
```

All images are PNG format encoded as base64. Alpha channel is included when `no_background: true`.

## Seed Behavior Warning

**`seed: null`** means random on all endpoints EXCEPT `animate-with-text`, where **`seed: 0`** means random. This is an upstream API inconsistency. Always use `null` for random unless calling `/animate-with-text`.

## Plugin Structure

```
pixellab/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── pixellab-characters/
│   │   └── SKILL.md
│   ├── pixellab-concept-to-playable/
│   │   └── SKILL.md
│   ├── pixellab-rotation/
│   │   └── SKILL.md
│   ├── pixellab-animation/
│   │   └── SKILL.md
│   ├── pixellab-environments/
│   │   └── SKILL.md
│   ├── pixellab-animated-environments/
│   │   └── SKILL.md
│   ├── pixellab-tilesets/
│   │   └── SKILL.md
│   ├── pixellab-editing/
│   │   └── SKILL.md
│   ├── pixellab-ui/
│   │   └── SKILL.md
│   ├── pixellab-api/
│   │   └── SKILL.md
│   └── pixellab-setup/
│       └── SKILL.md
└── README.md
```

## plugin.json

```json
{
  "name": "pixellab",
  "description": "PixelLab pixel art generation skills — characters, animations, environments, tilesets, rotation, editing, UI elements, and full API reference for game asset creation",
  "version": "1.0.0",
  "author": {
    "name": "Jared Waldroff"
  },
  "license": "MIT",
  "keywords": [
    "pixellab",
    "pixel-art",
    "game-assets",
    "sprite",
    "animation",
    "tileset",
    "character",
    "environment",
    "game-dev"
  ]
}
```

---

## Skill 1: pixellab-characters

**Triggers:** "create character", "pixel art character", "sprite", "generate character", "bitforge", "pixflux", "style reference"

**Content:**

### Two Generation Models

**Pixflux** — Text-to-pixel-art. General purpose.
- API: `POST /generate-image-pixflux`
- Max area: 400x400 (width/height each 16-400)
- Best for: characters, items, environments from text descriptions

**Bitforge** — Style-transfer pixel art. Match a reference image's style.
- API: `POST /generate-image-bitforge`
- Max area: 200x200 (width/height each 16-200)
- Best for: creating assets that match an existing art style
- Extra params: `style_image`, `style_strength` (0-100), `inpainting_image`, `mask_image`, `skeleton_keypoints`

### Shared Parameters (Both Models)

| Parameter | Type | Default | Range/Values |
|---|---|---|---|
| `description` | string | required | Text description of what to generate |
| `negative_description` | string | `""` | What to avoid. Deprecated on Pixflux (ignored); still functional on Bitforge. Use positive description to guide instead. |
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

### Visual Control Enums

**Outline:** `"single color black outline"` | `"single color outline"` | `"selective outline"` | `"lineless"`

**Shading:** `"flat shading"` | `"basic shading"` | `"medium shading"` | `"detailed shading"` | `"highly detailed shading"`

**Detail:** `"low detail"` | `"medium detail"` | `"highly detailed"`

**Camera View:** `"side"` | `"low top-down"` | `"high top-down"`

**Direction:** `"north"` | `"north-east"` | `"east"` | `"south-east"` | `"south"` | `"south-west"` | `"west"` | `"north-west"`

### Init Image Strength Guide

| Strength | Effect | Use Case |
|---|---|---|
| 0-300 | Extremely rough color guidance | Color palette seeding |
| 300-400 | Rough shapes and colors | Sketch rough color blobs |
| 400-600 | Medium shape/color guidance | Create variations on existing image |
| 600-900 | Detailed guidance | Adding details or slight modifications |

### Style Consistency (Pro) — Consistent-Style Tool

**Access: Editor-only** (Aseprite/Pixelorama/Creator). Not available via REST API. For programmatic style consistency, use Bitforge with `style_image` + `style_strength` parameters.

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

- Max style images: 64 at 32x32, 16 at 64x64, 4 at 128x128, 1 at 256x256
- Parameters: style images, description, style description (advanced), no_background (default true), seed

### Character Options

**Body types (MCP):** `"humanoid"` (default), `"quadruped"`

**Quadruped templates:** bear, cat, dog, horse, lion

**Proportions presets (MCP):** default, chibi, cartoon, stylized, realistic_male, realistic_female, heroic

**Coverage percentage (Bitforge only):** 0-100, controls how much of canvas the character fills

### Canvas Size Recommendations

- Characters: 2:3 aspect ratio (e.g., 48x64, 64x96)
- Scenery: 16:9 aspect ratio (e.g., 160x100)

### Pricing (Pixflux)

| Size | Cost |
|---|---|
| 64x64 | $0.00793 |
| 128x128 | $0.00793 |
| 320x320 | $0.0101 |
| 400x400 | $0.0132 |

### Pricing (Bitforge)

| Size | Cost |
|---|---|
| 32x32 | $0.0071 |
| 64x64 | $0.00716 |
| 128x128 | $0.00797 |
| 200x200 | $0.01122 |

---

## Skill 2: pixellab-concept-to-playable

**Triggers:** "concept art to pixel", "concept to playable", "sprite sheet from concept", "character pipeline", "full character workflow"

**Content:**

### End-to-End Pipeline

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

### Step 1: Concept to Pixel Art

- Tool: Image-to-pixel-art (**Editor-only** — Aseprite/Pixelorama/Creator. No REST API endpoint.)
- Auto 4x downscale (e.g., 256x256 concept → 64x64 pixel art)
- Set target palette for color consistency
- Adjust guidance weight for fidelity vs creative interpretation
- **API alternative**: Use Bitforge with `init_image` set to the concept art and `init_image_strength` at 300-400 for rough conversion, or Pixflux with the concept as `init_image`

### Step 2: Style Lock

- Tool: Consistent-style (Pro) — **Editor-only**
- **API alternative**: Use Bitforge with `style_image` set to your first character and `style_strength` 40-60 for all subsequent assets
- Upload the pixel art result as style image
- Generate variations: items, NPCs, enemies — all matching
- Style description (advanced) for explicit style notes like "8-bit retro"

### Step 3: Generate All Rotations

- Tool: Create 8-directional sprite (Pro) — all 8 directions in one generation
- Three methods:
  - **Create with Style**: description + optional reference
  - **Create from Concept**: upload concept art directly
  - **Rotate Character**: provide one direction, generate remaining 7
- Max output: 168x168 per frame
- OR use Rotate tool iteratively for more control (see rotation skill)

### Step 4: Animate Each Direction

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

### Step 5: Polish and Export

- Reduce colors for palette consistency
- Remove background if not already transparent
- Inpaint fixes on any problem frames
- Assemble into sprite sheets

### Quality Iteration Loop

At any step:
1. Generate initial result
2. Identify issues (wrong pose, bad detail, color drift)
3. Inpaint fix: paint black on problem areas, describe full scene
4. Re-generate with init_image at higher strength (600-900 for minor fixes)
5. Repeat until satisfied

### Chaining Outputs Between API Calls

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

---

## Skill 3: pixellab-rotation

**Triggers:** "rotate character", "rotation", "8 directions", "directional sprite", "facing direction", "turn character", "isometric rotation", "oblique projection", "view change", "cardinal directions", "north-facing sprite"

**Content:**

### Rotate Endpoint

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

### 8-Directional Sprite (Pro) — Editor/MCP Only

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

### Two Rotation Strategies

**Static Reference (recommended for consistency):**
- Start with one south-facing image
- Generate all 7 remaining directions from that single reference
- Pros: consistent style, single reference point
- Cons: model may struggle with complex details at extreme angles

**Iterative (recommended for quality):**
- Rotate 45 degrees at a time, updating reference after each
- Pros: better quality for each individual rotation
- Cons: errors accumulate over multiple generations

### View/Direction Framework

8 directions: north, north-east, east, south-east, south, south-west, west, north-west

3 camera views: side (sidescroller), low top-down (~20 deg, RPG), high top-down (~35 deg, RTS)

View and direction are weak guides. Improve results by:
- Combining with init images
- Adding keywords to description (e.g., "in profile" for side-facing)

### Mirroring Trick

East and west orientations are horizontal mirrors. Generate one, flip the other — saves 50% on those directions.

### Fixing Problem Rotations

- Regenerate with different seed
- Inpaint specific problem areas (hat, weapon, etc.)
- Use generated result as init_image with manual adjustments
- Mirror a successful symmetric direction

### Pricing

| Size | Cost |
|---|---|
| 64x64 | $0.01057 |
| 128x128 | $0.01091 |

---

## Skill 4: pixellab-animation

**Triggers:** "animate", "animation", "walk cycle", "skeleton", "keyframe", "sprite animation", "idle animation", "run cycle", "re-pose", "text to animation", "text2animation"

**Content:**

### Skeleton Animation

- API: `POST /animate-with-skeleton`
- Supported sizes: 16x16, 32x32, 64x64, 128x128, 256x256
- Produces 4 frames per generation

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `reference_image` | Base64Image | required | Character reference |
| `skeleton_keypoints` | array[array[Point]] | required | Per-frame skeleton poses |
| `image_size` | `{width, height}` | required | Must be predefined size |
| `guidance_scale` | number | 4.0 | 1.0-20.0 |
| `view` | CameraView | `"side"` | Camera perspective |
| `direction` | Direction | `"east"` | Facing direction |
| `isometric` | boolean | false | Isometric view |
| `oblique_projection` | boolean | false | Oblique projection |
| `init_images` | array[Base64Image] | null | Starting images per frame |
| `init_image_strength` | integer | 300 | 1-999 |
| `inpainting_images` | array[Base64Image] | null | Existing frames to preserve |
| `mask_images` | array[Base64Image] | null | Inpainting masks |
| `color_image` | Base64Image | null | Force palette |
| `seed` | integer | null | Reproducibility |

**18 Skeleton Keypoint Labels:**
NOSE, NECK, RIGHT SHOULDER, RIGHT ELBOW, RIGHT ARM, LEFT SHOULDER, LEFT ELBOW, LEFT ARM, RIGHT HIP, RIGHT KNEE, RIGHT LEG, LEFT HIP, LEFT KNEE, LEFT LEG, RIGHT EYE, LEFT EYE, RIGHT EAR, LEFT EAR

**Point format:** `{ x: number, y: number, label: SkeletonLabel, z_index: number (default 0) }`

**Skeleton Workflow:**
1. Estimate skeleton from reference: `POST /estimate-skeleton` (input: character on transparent BG)
2. Set reference image
3. Choose animation template or manually define keypoints per frame
4. Freeze strategy:
   - **Freeze 1 → Generate 2**: single frozen reference, generate remaining frames
   - **Freeze 2 → Generate 1**: two frozen frames for better guidance
   - **Custom**: pick which frames frozen vs generated
5. Generate
6. Fix issues manually, re-generate with inpainting at increasing init_image_strength

**Pro tip:** `fixed_head: "always"` — **Editor-only option** (Aseprite/Pixelorama advanced settings). Copies reference head across all frames for facial consistency. Not available via REST API.

### Text Animation

- API: `POST /animate-with-text`
- **API output size: fixed 64x64** (the API endpoint only produces 64x64 frames)
- The **Editor Pro version** (`animate-with-text-pro`) supports variable reference sizes up to 256px — see pixellab-concept-to-playable skill for frame output tables

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `image_size` | `{width, height}` | required | Must be `{width: 64, height: 64}` — this endpoint only supports 64x64 output |
| `reference_image` | Base64Image | required | Character reference |
| `description` | string | required | Character description |
| `action` | string | required | e.g., "walk", "run", "idle", "attack" |
| `n_frames` | integer | 4 | 2-20 (number of frames to generate) |
| `start_frame_index` | integer | 0 | 0-20 (offset into the animation sequence; ensure `start_frame_index + n_frames` stays within valid range) |
| `view` | CameraView | `"side"` | Camera view |
| `direction` | Direction | `"east"` | Facing direction |
| `image_guidance_scale` | number | 1.4 | 1.0-20.0 |
| `text_guidance_scale` | number | 8.0 | 1.0-20.0 |
| `init_images` | array[Base64Image] | null | Starting frames |
| `init_image_strength` | integer | 300 | 1-999 |
| `inpainting_images` | array[Base64Image] | null | Existing frames |
| `mask_images` | array[Base64Image] | null | Masks |
| `color_image` | Base64Image | null | Palette |
| `seed` | integer | 0 | 0 = random |

### Text2Animation (Pro) — Create Character + Animation from Scratch

**Access: Editor-only** (Aseprite/Pixelorama/Creator). No REST API endpoint. **API alternative**: Use Pixflux to generate character, then `/animate-with-text` to animate.

- Creates both character and animation simultaneously from text
- Sizes: 32x32, 64x64, 128x128 (up to 256x256)
- Parameters: description, action, no_background, seed
- Frame output by canvas size:
  - 32-64px: 16 frames (4x4 grid, 20 gens)
  - 65-128px: 4 frames (2x2 grid, 20 gens)
  - 129-170px: 4 frames (2x2 grid, 25 gens)
  - 171-256px: 4 frames (2x2 grid, 40 gens)

### Animation-to-Animation

**Access: Editor-only** (Aseprite/Pixelorama/Creator). No REST API endpoint. **API alternative**: Use `/animate-with-skeleton` or `/animate-with-text` with init_images set to existing frames.

- Description-driven animation from existing animation reference
- Canvas sizes: 16x16, 32x32, 64x64, 128x128
- Start with 2 frames, use reference image for consistency, iterate
- Key params: description, action_description, n_images, outline, shading, detail, ai_freedom, guidance_weight
- Requires Tier 2+

### Re-Pose

**Access: Editor-only** (Aseprite extension only). No REST API endpoint. **API alternative**: Use `/animate-with-skeleton` with custom keypoints for the desired pose.

- Adjust character pose via skeleton keypoints
- Requires `POST /estimate-skeleton` first
- Supported sizes: 16-256
- Set view and direction, adjust skeleton, generate

### Estimate Skeleton

- API: `POST /estimate-skeleton`
- Input: character image on transparent background
- Returns: array of `{ x, y, label, z_index }` keypoints
- Cost: $0.00511-$0.00516

### Pricing (Skeleton Animation)

| Size | Cost |
|---|---|
| 32x32 | $0.0136 |
| 64x64 | $0.0136 |
| 128x128 | $0.01572 |

---

## Skill 5: pixellab-environments

**Triggers:** "environment", "game scene", "background", "landscape", "create map", "extend map", "game world", "level background"

**Content:**

### Create Map (Pixflux)

- API: `POST /generate-image-pixflux` (same endpoint, used for maps)
- Camera views: `"high top-down"` (RTS/strategy) or sidescroller
- Max area by tier: free 200x200, T1 320x320, T2+ 400x400
- Parameters: description, camera view, outline, shading, detail, init_image, target palette, seed

### Extend Map (v2)

- Experimental, max canvas 180x180, requires Tier 2+
- Parameters: description, camera view, outline, shading, detail, isometric, tile_size, guidance_weight, init_image, target palette, seed

### Iterative Expansion Workflow

The core technique for building large environments:

1. **Start with base**: Generate initial map section with description
2. **Expand**: Select area that partially overlaps existing content
3. **Inpaint layer**: Paint black ONLY where new content should appear (not over existing content)
4. **Describe the middle**: Text prompt should describe what's in the center of the selection
5. **Key rule**: "The model can only see what is inside the selection"
6. **Repeat**: Expand in any direction, always overlapping existing content for consistency

### Scene Composition Pipeline

```
Base terrain (Create Map)
    ↓ extend in all directions
Full environment layout
    ↓ inpaint to add detail objects (trees, rocks, buildings)
Detailed environment
    ↓ create map objects (transparent BG items to overlay)
Environment with objects
    ↓ reduce colors for palette consistency
Final scene
```

### Map Object Creation (MCP)

- `create_map_object`: generates transparent-background objects for map overlay
- Parameters: description, width, height, view (default high top-down), outline, shading, detail

### Environment Best Practices

- Tile size matters: model trains on 16x16 tiles, so 128x128 = 8x8 tile grid
- Use target palette to maintain color consistency across sections
- Init image strength: lower (300-400) for creative freedom, higher (600-900) for matching existing style
- Camera view consistency: pick one view for entire map and stick with it
- Describe the full visible context in prompts, not just the new area

---

## Skill 6: pixellab-animated-environments

**Triggers:** "animated environment", "animated tiles", "water animation", "fire animation", "environment animation", "animated background", "living world"

**Content:**

### Workflow: Static First, Then Animate

1. **Build static environment** using environments skill (Create Map, Extend Map)
2. **Identify animated elements**: water, fire, torches, foliage, smoke, machinery, NPCs
3. **Generate animation frames** for each element using animation tools
4. **Composite** animated elements over static background

### Animating Environment Elements

**For simple loops (water, fire, torch flicker):**
- Use text animation: action = "flowing", "flickering", "burning", "swaying"
- Extract the element area from the static map as reference image
- Generate 4-8 frames for seamless loop
- n_frames: use 4 for simple loops, 8+ for complex motion

**For complex environmental animations (windmill, waterfall):**
- Use skeleton animation with custom keypoints
- Define keypoints on the mechanical/moving parts
- Generate frame-by-frame with skeleton poses

**For environmental creatures/NPCs:**
- Use full character animation pipeline
- Place on transparent background
- Overlay on static map

### Maintaining Visual Consistency

- Use `color_image` from the static environment to force palette matching
- Set init_image to the static environment frame when generating animated elements
- Use inpainting: mask only the animated region, keep surrounding context frozen
- Match outline/shading/detail settings used for the static environment

### Frame Count Recommendations

| Element | Recommended Frames | Loop Type |
|---|---|---|
| Water ripple | 4-6 | Seamless loop |
| Torch/fire | 4-8 | Seamless loop |
| Foliage sway | 4 | Ping-pong |
| Smoke/steam | 6-8 | Seamless loop |
| Machinery | 4-8 | Seamless loop |
| Idle NPC | 4 | Seamless loop |

### Compositing Approach

```
Static environment (base layer)
    + Animated water tiles (replace specific tile positions per frame)
    + Animated fire/torch sprites (overlay with transparency)
    + Animated NPC sprites (overlay with transparency)
= Living, animated game world
```

---

## Skill 7: pixellab-tilesets

**Triggers:** "tileset", "tiles", "wang tiles", "autotile", "terrain tile", "isometric tile", "platformer tiles", "tile transition", "seamless tiles"

**Content:**

### Wang Tilesets — Top-Down

- MCP: `create_topdown_tileset`
- Generates 16-tile Wang autotiling set for seamless terrain transitions
- Compatible with Sprite Fusion

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `lower_description` | string | required | Base terrain (e.g., "water", "dirt") |
| `upper_description` | string | required | Transition terrain (e.g., "grass", "sand") |
| `transition_size` | number | — | 0 = sharp edge, 0.5 = wide blend |
| `tile_size` | `{width, height}` | 16x16 | Tile dimensions |
| `view` | string | — | `"high top-down"` (RTS) or `"low top-down"` (RPG) |
| `lower_base_tile_id` | string | null | Chain from previous tileset for visual continuity |

### Wang Tilesets — Sidescroller

- MCP: `create_sidescroller_tileset`
- 16 tiles for 2D platformers

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `lower_description` | string | required | Platform material (e.g., "stone", "dirt") |
| `transition_description` | string | required | Top decoration (e.g., "grass", "moss") |
| `transition_size` | number | — | 0 = sharp, 0.5 = wide coverage |
| `tile_size` | `{width, height}` | 16x16 | Tile dimensions |
| `base_tile_id` | string | null | Chain from previous tileset |

### Isometric Tiles

- MCP: `create_isometric_tile`
- Single tile generation

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `description` | string | required | e.g., "grass on top of dirt" |
| `size` | integer | 32 | 16 or 32 (32 recommended) |
| `tile_shape` | string | — | `"thin"`, `"thick"`, `"block"` |
| `outline` | string | — | `"lineless"` (modern) or `"single color"` (retro) |
| `detail` | string | — | Detail level |
| `seed` | integer | null | Reproducibility |

### Pro Tiles

- MCP: `create_tiles_pro`
- Advanced tile creation with style control

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `description` | string | required | What to generate |
| `tile_type` | string | `"isometric"` | `"square"`, `"hex"`, `"hex pointy"`, `"isometric"`, `"octagon"` |
| `tile_size` | integer | 32 | 16, 32, 48, 64, 96, 128 (or rectangular variants) |
| `n_tiles` | integer | — | Number of tile variations |
| `style_images` | array | null | Style reference images |
| `style_options` | object | null | Advanced style control |

Cost: 20-25 generations standard, 20-40 with style references.

### Create Texture

- Text-to-seamless-texture, feeds into tileset creation pipeline
- Parameters: description, shading, details, guidance_weight, init_image, target palette, seed
- Requires Tier 1+

### Tileset Creation Pipeline

```
Create Texture (base material look)
    ↓ use as style reference
Create Tileset (Wang tiles with terrain transitions)
    ↓ use lower_base_tile_id to chain
Create More Tilesets (additional terrain types, visually consistent)
    ↓
Create Isometric Tiles (for isometric games)
    ↓
Assemble tile map in game engine
```

### Tile Chaining for Visual Continuity

Use `lower_base_tile_id` (top-down) or `base_tile_id` (sidescroller) from a completed tileset when generating the next set. This ensures terrain transitions look consistent across different tile types.

### Export Formats

- Wang tileset (16 tiles)
- Dual-grid 15-tileset
- 3x3 tileset

### Advanced Parameters (Tileset Tool)

- `border_jitter`: variation at tile borders
- `map_strength`: how strongly map layout guides generation
- `tile_strength`: how strongly individual tile consistency is enforced
- `ai_border_freedom`: creative latitude at tile edges

### MCP Behavior

All tileset creation is **non-blocking**:
- Returns job ID immediately
- Processing takes 2-5 minutes
- Poll with `get_topdown_tileset` / `get_sidescroller_tileset` / `get_isometric_tile`
- Download URLs need no additional auth (UUID serves as access key)

---

## Skill 8: pixellab-editing

**Triggers:** "inpaint", "edit pixel art", "modify sprite", "remove background", "resize pixel art", "reduce colors", "fix sprite", "color palette"

**Content:**

### Inpaint (API)

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
| `no_background` | boolean | false | Transparent BG |
| `init_image` | Base64Image | null | Starting image |
| `init_image_strength` | integer | 300 | 1-999 |
| `color_image` | Base64Image | null | Palette |
| `seed` | integer | null | Reproducibility |

**Critical rule:** The description should describe the FULL scene context, not just the masked area. The model views the entire image.

### Edit Image (Instruction-Based)

**Access: Editor-only** (Aseprite/Pixelorama/Creator). No REST API endpoint. **API alternative**: Use `/inpaint` with a mask covering the area to change.

- No mask needed — describe the edit as an action
- Use action words: "change", "add", "remove", "replace"
- Example: "give the character a hat", "remove the sword", "change armor to blue"
- Parameters: instruction (text), guidance_weight (advanced), target_palette, remove_background, seed
- Max area by tier: T1 200x200, T1+ 320x320, T2+ 400x400

### Remove Background

**Access: Editor-only** (Aseprite/Pixelorama extensions). No REST API endpoint. **API alternative**: Generate with `no_background: true` on any generation endpoint.

- Simple mode: solid/simple backgrounds
- Complex mode: detailed backgrounds (requires subject description, e.g., "warrior character")

### Resize

**Access: Editor-only.** Standard pixel art resizing.

### Unzoom (Pixel Art Upscale)

**Access: Editor-only.** Upscale pixel art while maintaining pixel-perfect aesthetic.

### Reduce Colors

**Access: Editor-only.** No REST API endpoint. Post-processing tool for cleaning up generation outputs.

- Quantization methods:
  - **Auto**: system determines optimal color count
  - **Specify colors**: user defines exact count
  - **Use palette**: reduce to specific palette (Lospec palette import supported)
- Dithering option for smoother gradients
- Max processable area: 512x512
- Use as post-processing step to clean up generation outputs

### Iterative Editing Workflow

```
1. Generate initial asset
2. Identify issues
3. Inpaint: paint black on inpainting layer over problem areas
4. Lower init_image_strength for more creative freedom
5. Set output to "Modify current layer"
6. Re-generate
7. Repeat until satisfied
```

### Combined Init Image + Inpainting

For complex edits, use both simultaneously:
- Sketch improvements directly on the image (init image)
- Mark refinement areas with black on inpainting layer
- Re-generate to integrate both modifications

### Pricing (Inpaint)

Same as Bitforge: $0.0071 (32x32) to $0.01122 (200x200)

---

## Skill 9: pixellab-ui

**Triggers:** "UI element", "game UI", "health bar", "button pixel art", "inventory", "HUD", "game interface", "pixel UI"

**Content:**

### Standard UI Element Generation

**Access: Editor-only** (Aseprite/Pixelorama/Creator). No dedicated REST API endpoint. **API alternative**: Use Pixflux (`POST /generate-image-pixflux`) with appropriate description and canvas size for UI components.

- Text description → single pixel art UI component
- Examples: health bars, mana bars, buttons, inventory slots, icons, frames, borders, status indicators

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `description` | string | required | e.g., "medieval stone button", "sci-fi health bar" |
| `width` | integer | — | 16-400 (by tier) |
| `height` | integer | — | 16-400 (by tier) |
| `outline` | Outline enum | null | Border style |
| `shading` | Shading enum | null | Lighting level |
| `detail` | Detail enum | null | Visual complexity |
| `no_background` | boolean | false | Transparent background |
| `init_image` | Base64Image | null | Style reference |
| `color_image` | Base64Image | null | Force color palette for consistency |
| `seed` | integer | null | Reproducibility |

### Pro UI Elements

- Grid-based generation producing multiple variations
- Size-based pricing (more expensive for larger outputs)
- Better for creating UI component sets with consistent style

### Canvas Limits by Tier

| Tier | Max Area |
|---|---|
| Free | 200x200 |
| Tier 1 | 320x320 |
| Tier 2+ | 400x400 |

### Best Practices

- Include style context in description: "medieval stone button with iron rivets", "sci-fi holographic health bar with cyan glow"
- Use init_image from existing UI to match style across components
- Use color_image to force game's UI palette
- Generate transparent (no_background: true) for easy compositing
- Use consistent outline/shading/detail across all UI elements for cohesion

---

## Skill 10: pixellab-api

**Triggers:** "pixellab api", "pixellab sdk", `@pixellab-code/pixellab`, `PixelLabClient`, "pixellab endpoint", "pixellab rest"

**Content:**

### Base URL & Auth

- Base URL: `https://api.pixellab.ai/v1`
- Auth: `Authorization: Bearer YOUR_API_TOKEN`
- Token from: https://pixellab.ai/account

### All REST API Endpoints

These are the ONLY endpoints available via REST API. All other tools (image-to-pixel-art, animation-to-animation, text2animation, reduce-colors, edit-image, remove-background, resize, unzoom, re-pose, consistent-style, 8-directional sprite, UI elements) are editor-only or MCP-only.

For full parameter tables with defaults and ranges, see the domain-specific skills (pixellab-characters, pixellab-rotation, pixellab-animation, pixellab-editing).

| Method | Path | Description |
|---|---|---|
| POST | `/generate-image-pixflux` | Text-to-pixel-art (general purpose, max 400x400) |
| POST | `/generate-image-bitforge` | Style-transfer pixel art (max 200x200) |
| POST | `/animate-with-skeleton` | Skeleton-based animation (4 frames, sizes 16-256) |
| POST | `/animate-with-text` | Text-based animation (fixed 64x64 output, 2-20 frames) |
| POST | `/rotate` | Rotate character/object (sizes 16-128) |
| POST | `/inpaint` | Edit existing pixel art (max 200x200) |
| POST | `/estimate-skeleton` | Detect skeleton keypoints |
| GET | `/balance` | Check account balance |

### Raw HTTP Example (curl)

```bash
curl -X POST https://api.pixellab.ai/v1/generate-image-pixflux \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "cute dragon",
    "image_size": { "width": 64, "height": 64 },
    "no_background": true,
    "outline": "single color black outline",
    "shading": "basic shading",
    "detail": "medium detail"
  }'
```

Response:
```json
{
  "usage": { "type": "usd", "usd": 0.00793 },
  "image": { "type": "base64", "base64": "iVBORw0KGgo..." }
}
```

### Shared Types

**Base64Image:**
```json
{
  "type": "base64",
  "base64": "<encoded image data>"
}
```

**Point (skeleton keypoint input):**
```json
{
  "x": 32.0,
  "y": 16.0,
  "label": "NOSE",
  "z_index": 0
}
```

**Keypoint (skeleton estimation output):**
```json
{
  "x": 32.0,
  "y": 16.0,
  "label": "NOSE",
  "z_index": 0
}
```

**Usage (in all responses):**
```json
{
  "type": "usd",
  "usd": 0.00793
}
```

### All Enums

**SkeletonLabel:** `NOSE`, `NECK`, `RIGHT SHOULDER`, `RIGHT ELBOW`, `RIGHT ARM` (wrist/hand), `LEFT SHOULDER`, `LEFT ELBOW`, `LEFT ARM` (wrist/hand), `RIGHT HIP`, `RIGHT KNEE`, `RIGHT LEG` (ankle/foot), `LEFT HIP`, `LEFT KNEE`, `LEFT LEG` (ankle/foot), `RIGHT EYE`, `LEFT EYE`, `RIGHT EAR`, `LEFT EAR`

Note: "ARM" labels refer to the wrist/hand endpoint (not the full arm). "LEG" labels refer to the ankle/foot endpoint. These are standard COCO-style pose estimation labels. Quadruped keypoints are not documented by PixelLab — use humanoid keypoints or MCP `create_character` with `body_type: "quadruped"` and a `template` (bear, cat, dog, horse, lion) which handles skeletons automatically.

**CameraView:** `"side"`, `"low top-down"`, `"high top-down"`

**Direction:** `"north"`, `"north-east"`, `"east"`, `"south-east"`, `"south"`, `"south-west"`, `"west"`, `"north-west"`

**Outline:** `"single color black outline"`, `"single color outline"`, `"selective outline"`, `"lineless"`

**Shading:** `"flat shading"`, `"basic shading"`, `"medium shading"`, `"detailed shading"`, `"highly detailed shading"`

**Detail:** `"low detail"`, `"medium detail"`, `"highly detailed"`

### HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 401 | Invalid API token |
| 402 | Insufficient credits |
| 422 | Validation error |
| 429 | Too many requests |
| 529 | Rate limit exceeded |

### JavaScript SDK

**Install:**
```bash
npm install @pixellab-code/pixellab
```

**Initialize:**
```javascript
import { PixelLabClient, Base64Image } from "@pixellab-code/pixellab";

// From environment variable PIXELLAB_SECRET
const client = PixelLabClient.fromEnv();

// From .env file
const client = PixelLabClient.fromEnvFile(".env.development.secrets");

// Direct
const client = new PixelLabClient("your-secret-key");
```

**Generate image:**
```javascript
const response = await client.generateImagePixflux({
  description: "cute dragon",
  imageSize: { width: 64, height: 64 },
  noBackground: true,
  outline: "single color black outline",
  shading: "basic shading",
  detail: "medium detail",
});

// Save to file
await response.image.saveToFile("dragon.png");

// Get as data URL (for browser/HTML)
const dataUrl = response.image.dataUrl;
```

**Style transfer:**
```javascript
const styleImage = await Base64Image.fromFile("style-reference.png");

const response = await client.generateImageBitforge({
  description: "warrior with sword",
  imageSize: { width: 64, height: 64 },
  styleImage,
  styleStrength: 50.0,
  noBackground: true,
});
```

**Check balance:**
```javascript
const balance = await client.getBalance();
console.log(`Balance: $${balance.usd}`);
// Response: { type: "usd", usd: 12.50 }
// Note: SDK may wrap this — check SDK docs. Raw API returns { type, usd }.
```

**Environment variables:**
```bash
PIXELLAB_SECRET=your-secret-key-here
PIXELLAB_BASE_URL=https://api.pixellab.ai/v1  # Optional, this is the default
```

### Error Handling

```javascript
try {
  const response = await client.generateImagePixflux({ ... });
} catch (error) {
  // 401: check PIXELLAB_SECRET
  // 402: insufficient credits, check balance
  // 422: invalid parameters (check types, ranges, enum values)
  // 429/529: rate limited, back off and retry
}
```

---

## Skill 11: pixellab-setup

**Triggers:** "setup pixellab", "configure pixellab", "pixellab mcp", "pixellab api key", "pixellab pricing", "install pixellab"

**Content:**

### MCP Server Configuration

For Claude Code, add to `.mcp.json` or project MCP config:

```json
{
  "mcpServers": {
    "pixellab": {
      "url": "https://api.pixellab.ai/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer YOUR_API_TOKEN"
      }
    }
  }
}
```

Replace `YOUR_API_TOKEN` with token from https://pixellab.ai/account

### MCP Tools Available

**Characters:**
- `create_character(description, body_type, template, n_directions, proportions, size, outline, shading, detail)`
  - `n_directions`: 4 or 8 (number of directional views to generate)
  - `body_type`: `"humanoid"` (default) or `"quadruped"`
  - `template`: required for quadrupeds — `"bear"`, `"cat"`, `"dog"`, `"horse"`, `"lion"`
  - `proportions`: `"default"`, `"chibi"`, `"cartoon"`, `"stylized"`, `"realistic_male"`, `"realistic_female"`, `"heroic"`
- `animate_character(character_id, template_animation_id, action_description, directions)`
  - `template_animation_id`: animation preset — common values include `"walking"`, `"idle"`, `"running"` (exact available IDs depend on body_type; use `get_character` to see available animations)
  - `action_description`: optional text to customize the animation behavior
- `get_character(character_id, include_preview)`
- `list_characters(limit, offset)`
- `delete_character(character_id, confirm)`

**Top-Down Tilesets:**
- `create_topdown_tileset(lower_description, upper_description, transition_size, tile_size, view, lower_base_tile_id)`
- `get_topdown_tileset(tileset_id)`
- `list_topdown_tilesets(limit, offset)`
- `delete_topdown_tileset(tileset_id)`

**Sidescroller Tilesets:**
- `create_sidescroller_tileset(lower_description, transition_description, transition_size, tile_size, base_tile_id)`
- `get_sidescroller_tileset(tileset_id, include_example_map)`
- `list_sidescroller_tilesets(limit, offset)`
- `delete_sidescroller_tileset(tileset_id)`

**Isometric Tiles:**
- `create_isometric_tile(description, size, tile_shape, outline, detail, seed)`
- `get_isometric_tile(tile_id)`
- `list_isometric_tiles(limit, offset)`
- `delete_isometric_tile(tile_id)`

**Map Objects:**
- `create_map_object(description, width, height, view, outline, shading, detail)`
- `get_map_object(object_id)`

**Pro Tiles:**
- `create_tiles_pro(description, tile_type, tile_size, n_tiles, style_images, style_options)`
- `get_tiles_pro(tile_id)`
- `list_tiles_pro(limit, offset)`
- `delete_tiles_pro(tile_id)`

### MCP Behavior

- **Non-blocking**: all creation tools return job IDs immediately
- **Processing time**: 2-5 minutes typical
- **Polling**: use `get_*` tools to check status
- **Download URLs**: format `/mcp/characters/{id}/download`, no auth needed (UUID = access key)
- **Chaining**: use `base_tile_id` from completed tilesets for visual continuity

### JS SDK Setup

```bash
npm install @pixellab-code/pixellab
```

Create `.env` or set env vars:
```bash
PIXELLAB_SECRET=your-secret-key-here
```

### API Token

Get from: https://pixellab.ai/account (requires PixelLab account)

### Pricing Reference

| Tool | Size | Est. Cost |
|---|---|---|
| Pixflux | 64x64 | $0.00793 |
| Pixflux | 128x128 | $0.00793 |
| Pixflux | 320x320 | $0.0101 |
| Pixflux | 400x400 | $0.0132 |
| Bitforge | 32x32 | $0.0071 |
| Bitforge | 64x64 | $0.00716 |
| Bitforge | 128x128 | $0.00797 |
| Bitforge | 200x200 | $0.01122 |
| Inpaint | 32-200 | Same as Bitforge |
| Rotate | 64x64 | $0.01057 |
| Rotate | 128x128 | $0.01091 |
| Skeleton Anim | 32-64 | $0.0136 |
| Skeleton Anim | 128x128 | $0.01572 |
| Estimate Skel | any | $0.00511 |

Prices are estimates — GPU processing time causes variation.

### Tier Limits

**Pixflux (general generation):**

| Tier | Max Canvas |
|---|---|
| Free | 200x200 area |
| Tier 1 | 320x320 area |
| Tier 2+ | 400x400 area |

**Bitforge/Inpaint (REST API hard limit):** Max 200x200 regardless of tier (width/height each 16-200).

**Style tool (Editor — Create S-M Image):** Tier-specific limits within the editor:

| Tier | Max Canvas |
|---|---|
| Tier 1 | 80x80 area |
| Tier 2+ | 140x140 area |

Note: The Style editor tool has tighter limits than the raw Bitforge API because it performs additional style processing. The REST API `/generate-image-bitforge` endpoint always supports up to 200x200.

### Pro Feature Tier Requirements

Tools marked "Pro" require a paid subscription. Specific tier requirements:
- **Tier 1 required**: consistent-style, 8-directional sprite, animate-with-text-pro, text2animation, create-tileset, create-texture, create-isometric-tile, create-tiles-pro, UI elements
- **Tier 2 required**: animation-to-animation, extend-map-v2
- The REST API endpoints (`/generate-image-pixflux`, `/generate-image-bitforge`, `/animate-with-skeleton`, `/animate-with-text`, `/rotate`, `/inpaint`, `/estimate-skeleton`) are available to all tiers including free (with canvas size limits)

### Commercial Use

- Generated images: commercial use allowed
- Restriction: do not use generated images to train new models
- Steam: disclose AI usage in "Pre-Generated" category (development tools)
- PixelLab does NOT use user inputs or generated content for model training

### Ways to Use PixelLab

1. **Simple Web Creator** — browser-based, desktop + mobile
2. **Characters Tool** — game-ready 4/8 directional sprites from text
3. **PixelLab Pixelorama** — in-browser editor with AI tools (desktop only)
4. **Aseprite Extension** — native integration (requires full Aseprite license, v1.3+)
5. **Vibe Coding (MCP)** — AI assistant integration for code editors
6. **REST API** — programmatic access with JS SDK
7. **Video Tutorials** — YouTube demonstrations

---

## Cross-Cutting Concerns

These topics are shared across multiple skills. Include them in the **pixellab-api** skill (Skill 10) as a "Shared Concepts" section.

### Base64Image Handling

All API endpoints send/receive images as Base64-encoded strings in the format:
```json
{ "type": "base64", "base64": "<data>" }
```

**JS SDK helpers:**
- `Base64Image.fromFile("path.png")` — load from file
- `response.image.saveToFile("output.png")` — save to file
- `response.image.dataUrl` — get as data URL for browser/HTML usage

### Force Symmetry

Available on generation tools. For rotation: creates south/north mirror symmetry and west/east mirror pairs.

### Projection Types

- **Isometric**: 120-degree angles between axes (SimCity, FF Tactics, Age of Empires)
- **Oblique**: Tibia-style projection
- Set via `isometric: true` or `oblique_projection: true` on relevant endpoints

### Color Control

- **Limit colors**: weakly guide palette (no enforcement, color palette, or current image)
- **Force colors**: strict palette adherence via `color_image`
- **Target palette**: constrain output colors
- **Reduce colors**: post-processing quantization (auto, specify count, use palette)
- **Lospec integration**: import palettes from lospec.com/palette-list

### General Options

- **Force Symmetry**: vertical symmetry enforcement
- **Remove Background**: transparent background generation
- **Seed**: `null` for random on all REST API endpoints; specific integer for reproducibility. **Exception**: `/animate-with-text` uses `seed: 0` for random instead of `null`. In editors, `0` triggers random mode, but direct API calls should always use `null` except for `/animate-with-text`.
- **Output Method**: new layer, modify current layer, or new frame
- **Tile Size**: dimensions for tile-based generation
