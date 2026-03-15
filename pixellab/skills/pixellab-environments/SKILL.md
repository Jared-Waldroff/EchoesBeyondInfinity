---
name: pixellab-environments
description: Build game environments, scenes, and backgrounds using PixelLab. Use when the user mentions "environment", "game scene", "background", "landscape", "create map", "extend map", "game world", or "level background".
---

# pixellab-environments

Build game environments, scenes, and backgrounds using PixelLab's map generation tools.

---

## Create Map (Pixflux)

**API:** `POST /generate-image-pixflux` (same Pixflux endpoint, used for maps)

**Camera views:**
- `"high top-down"` — bird's eye, suited for RTS and strategy games
- `"low top-down"` — angled overhead, suited for RPGs
- `"sidescroller"` — side-on perspective for platformers and side-scrolling games

**Max canvas size by subscription tier:**

| Tier | Max Area |
|---|---|
| Free | 200x200 |
| Tier 1 | 320x320 |
| Tier 2+ | 400x400 |

**Parameters:** `description`, `camera_view`, `outline`, `shading`, `detail`, `init_image`, `target_palette`, `seed`

---

## Extend Map (v2)

**Status:** Experimental

**Access:** Tier 2+ required

**Max canvas:** 180x180

**Parameters:** `description`, `camera_view`, `outline`, `shading`, `detail`, `isometric`, `tile_size`, `guidance_weight`, `init_image`, `target_palette`, `seed`

---

## Iterative Expansion Workflow

The core technique for building large environments from small sections:

1. **Start with base** — Generate the initial map section with a description of the terrain or scene.
2. **Expand** — Select an area that partially overlaps the existing content.
3. **Inpaint layer** — Paint black ONLY where new content should appear. Do not paint over existing content.
4. **Describe the middle** — The text prompt should describe what is in the center of the selection, not the entire canvas.
5. **Key rule:** "The model can only see what is inside the selection."
6. **Repeat** — Expand in any direction, always overlapping existing content to maintain visual consistency.

---

## Scene Composition Pipeline

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

---

## Map Object Creation (MCP)

**MCP tool:** `create_map_object`

Generates transparent-background objects intended for overlay on top of an existing map.

**Parameters:**

| Parameter | Notes |
|---|---|
| `description` | What to generate (e.g., "a large oak tree", "a stone well") |
| `width` | Output width in pixels |
| `height` | Output height in pixels |
| `view` | Camera view; defaults to `"high top-down"` |
| `outline` | Outline style |
| `shading` | Shading style |
| `detail` | Detail level |

---

## Environment Best Practices

- **Tile size:** The model trains on 16x16 tiles. A 128x128 canvas equals an 8x8 grid of tiles — keep this in mind when sizing environments.
- **Palette consistency:** Use `target_palette` to maintain the same color palette across all map sections and extensions.
- **Camera view consistency:** Pick one camera view for the entire map and use it for every generation step. Mixing views on the same map produces visual breaks.
- **Init image strength guidance:**
  - `300–400` — lower strength, allows more creative freedom and variation
  - `600–900` — higher strength, forces close matching to the existing style and content
- **Prompting:** Describe the full visible context in each prompt, not just the new area being generated. Include surrounding terrain types, lighting, and atmosphere.
