---
name: pixellab-tilesets
description: Create game tilesets using PixelLab — Wang tiles, sidescroller tiles, isometric tiles, and textures. Use when the user mentions "tileset", "tiles", "wang tiles", "autotile", "terrain tile", "isometric tile", "platformer tiles", "tile transition", or "seamless tiles".
---

# PixelLab Tilesets

## Wang Tilesets — Top-Down

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

## Wang Tilesets — Sidescroller

- MCP: `create_sidescroller_tileset`
- 16 tiles for 2D platformers

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `lower_description` | string | required | Platform material (e.g., "stone", "dirt") |
| `transition_description` | string | required | Top decoration (e.g., "grass", "moss") |
| `transition_size` | number | — | 0 = sharp, 0.5 = wide coverage |
| `tile_size` | `{width, height}` | 16x16 | Tile dimensions |
| `base_tile_id` | string | null | Chain from previous tileset |

## Isometric Tiles

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

## Pro Tiles

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

## Create Texture

- Text-to-seamless-texture, feeds into tileset creation pipeline
- Parameters: description, shading, details, guidance_weight, init_image, target palette, seed
- Requires Tier 1+

## Tileset Creation Pipeline

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

## Tile Chaining for Visual Continuity

Use `lower_base_tile_id` (top-down) or `base_tile_id` (sidescroller) from a completed tileset when generating the next set. This ensures terrain transitions look consistent across different tile types.

## Export Formats

- Wang tileset (16 tiles)
- Dual-grid 15-tileset
- 3x3 tileset

## Advanced Parameters (Tileset Tool)

- `border_jitter`: variation at tile borders
- `map_strength`: how strongly map layout guides generation
- `tile_strength`: how strongly individual tile consistency is enforced
- `ai_border_freedom`: creative latitude at tile edges

## MCP Behavior

All tileset creation is **non-blocking**:
- Returns job ID immediately
- Processing takes 2-5 minutes
- Poll with `get_topdown_tileset` / `get_sidescroller_tileset` / `get_isometric_tile`
- Download URLs need no additional auth (UUID serves as access key)
