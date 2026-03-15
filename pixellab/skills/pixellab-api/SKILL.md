---
name: pixellab-api
description: Complete PixelLab REST API and JavaScript SDK reference. Use when the user mentions "pixellab api", "pixellab sdk", "@pixellab-code/pixellab", "PixelLabClient", "pixellab endpoint", "pixellab rest", or writes code that imports the PixelLab SDK.
---

# PixelLab API & SDK Reference

## Base URL & Auth

- Base URL: `https://api.pixellab.ai/v1`
- Auth: `Authorization: Bearer YOUR_API_TOKEN`
- Token from: https://pixellab.ai/account

## All REST API Endpoints

These are the ONLY 8 endpoints available via REST API.

| Method | Path | Description | Size Limit |
|---|---|---|---|
| POST | `/generate-image-pixflux` | Text-to-pixel-art (general purpose) | Max 400x400 (width/height each 16-400) |
| POST | `/generate-image-bitforge` | Style-transfer pixel art | Max 200x200 (width/height each 16-200) |
| POST | `/animate-with-skeleton` | Skeleton-based animation (4 frames) | Sizes: 16x16, 32x32, 64x64, 128x128, 256x256 |
| POST | `/animate-with-text` | Text-based animation (fixed 64x64 output, 2-20 frames) | Fixed 64x64 only |
| POST | `/rotate` | Rotate character/object direction or view | Sizes: 16x16, 32x32, 64x64, 128x128 |
| POST | `/inpaint` | Edit existing pixel art with mask | Max 200x200 |
| POST | `/estimate-skeleton` | Detect skeleton keypoints from character image | Any |
| GET | `/balance` | Check account balance | — |

### Editor-Only Tools (NOT available via REST)

The following tools are accessible only through Aseprite extension, Pixelorama editor, Creator web app, or MCP server — they have no REST API endpoint:

- image-to-pixel-art
- animation-to-animation
- text2animation (Pro)
- reduce-colors
- re-pose
- edit-image (instruction-based)
- remove-background
- resize
- unzoom
- consistent-style (Pro)
- 8-directional sprite (Pro)
- UI elements

For full parameter tables with defaults and ranges, see the domain-specific skills: pixellab-characters, pixellab-rotation, pixellab-animation, pixellab-editing.

## Raw HTTP Example

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

## Shared Types

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

## All Enums

**SkeletonLabel** (18 labels):

`NOSE`, `NECK`, `RIGHT SHOULDER`, `RIGHT ELBOW`, `RIGHT ARM` (wrist/hand endpoint), `LEFT SHOULDER`, `LEFT ELBOW`, `LEFT ARM` (wrist/hand endpoint), `RIGHT HIP`, `RIGHT KNEE`, `RIGHT LEG` (ankle/foot endpoint), `LEFT HIP`, `LEFT KNEE`, `LEFT LEG` (ankle/foot endpoint), `RIGHT EYE`, `LEFT EYE`, `RIGHT EAR`, `LEFT EAR`

Note: "ARM" labels refer to the wrist/hand endpoint, not the full arm. "LEG" labels refer to the ankle/foot endpoint. These are standard COCO-style pose estimation labels. Quadruped keypoints are not documented by PixelLab — use humanoid keypoints or MCP `create_character` with `body_type: "quadruped"` and a `template` (bear, cat, dog, horse, lion) which handles skeletons automatically.

**CameraView:** `"side"` | `"low top-down"` | `"high top-down"`

**Direction:** `"north"` | `"north-east"` | `"east"` | `"south-east"` | `"south"` | `"south-west"` | `"west"` | `"north-west"`

**Outline:** `"single color black outline"` | `"single color outline"` | `"selective outline"` | `"lineless"`

**Shading:** `"flat shading"` | `"basic shading"` | `"medium shading"` | `"detailed shading"` | `"highly detailed shading"`

**Detail:** `"low detail"` | `"medium detail"` | `"highly detailed"`

## HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 401 | Invalid API token |
| 402 | Insufficient credits |
| 422 | Validation error (check types, ranges, enum values) |
| 429 | Too many requests |
| 529 | Rate limit exceeded |

## Response Schemas

**Single image** (Pixflux, Bitforge, Rotate, Inpaint):
```json
{
  "usage": { "type": "usd", "usd": 0.00793 },
  "image": { "type": "base64", "base64": "..." }
}
```

**Multiple images** (animate-with-skeleton, animate-with-text):
```json
{
  "usage": { "type": "usd", "usd": 0.0136 },
  "images": [
    { "type": "base64", "base64": "<frame 1>" },
    { "type": "base64", "base64": "<frame 2>" },
    { "type": "base64", "base64": "<frame 3>" },
    { "type": "base64", "base64": "<frame 4>" }
  ]
}
```

**Skeleton estimation** (estimate-skeleton):
```json
{
  "usage": { "type": "usd", "usd": 0.00511 },
  "keypoints": [
    { "x": 32.0, "y": 16.0, "label": "NOSE", "z_index": 0 },
    { "x": 32.0, "y": 24.0, "label": "NECK", "z_index": 0 }
  ]
}
```

**Balance** (GET /balance):
```json
{
  "type": "usd",
  "usd": 12.50
}
```

Note: All images are PNG format encoded as base64. Alpha channel is included when `no_background: true`.

## JavaScript SDK

**Install:**
```bash
npm install @pixellab-code/pixellab
```

**Initialize (three methods):**
```javascript
import { PixelLabClient, Base64Image } from "@pixellab-code/pixellab";

// Method 1: From environment variable PIXELLAB_SECRET
const client = PixelLabClient.fromEnv();

// Method 2: From .env file
const client = PixelLabClient.fromEnvFile(".env.development.secrets");

// Method 3: Direct secret key
const client = new PixelLabClient("your-secret-key");
```

**Generate image (Pixflux):**
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

**Style transfer (Bitforge):**
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
// Raw API response: { type: "usd", usd: 12.50 }
// CORRECT field: balance.usd  (NOT balance.balance)
```

**Environment variables:**
```bash
PIXELLAB_SECRET=your-secret-key-here
PIXELLAB_BASE_URL=https://api.pixellab.ai/v1  # Optional, this is the default
```

**Error handling:**
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

## Shared Concepts

### Base64Image Handling

All API endpoints send and receive images as Base64-encoded strings in the format:
```json
{ "type": "base64", "base64": "<data>" }
```

**JS SDK helpers:**
- `Base64Image.fromFile("path.png")` — load from file
- `response.image.saveToFile("output.png")` — save to file
- `response.image.dataUrl` — get as data URL for browser/HTML usage

### Force Symmetry

Available on generation tools. For rotation: creates south/north mirror symmetry and west/east mirror pairs (vertical symmetry axis).

### Projection Types

- **Isometric**: 120-degree angles between axes (SimCity, FF Tactics, Age of Empires style). Set via `isometric: true`.
- **Oblique**: Tibia-style projection. Set via `oblique_projection: true`.

Both options are available on `/rotate`, `/animate-with-skeleton`, and `/animate-with-text` endpoints.

### Color Control

- **Limit colors**: weakly guide palette (no enforcement) — pass a color palette or current image as a soft reference
- **Force colors**: strict palette adherence via `color_image` parameter (a Base64Image containing only the desired colors)
- **Target palette**: constrain output colors to a specific palette
- **Reduce colors**: post-processing quantization (auto, specify count, or use a named palette) — Editor-only, not available via REST
- **Lospec integration**: import palettes from lospec.com/palette-list for use with reduce-colors in editors

### General Options

- **Force Symmetry**: vertical symmetry enforcement on generation
- **Remove Background**: set `no_background: true` on any generation endpoint for transparent PNG output
- **Tile Size**: dimensions for tile-based generation (model trains on 16x16 tiles; a 128x128 canvas = 8x8 tile grid)
- **Output Method**: in editors — new layer, modify current layer, or new frame

### Seed Behavior

> **CRITICAL: Seed behavior differs between endpoints.**

- **All endpoints except `/animate-with-text`**: `seed: null` = random. Pass `null` for a new random result each time. Pass a specific integer to reproduce a result.
- **`/animate-with-text` only**: `seed: 0` = random (not `null`). This is an upstream API inconsistency. The default for this endpoint is `0`.

Always use `null` for random unless you are calling `/animate-with-text`, where you must use `0` for random behavior.
