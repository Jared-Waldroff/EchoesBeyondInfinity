---
name: pixellab-setup
description: Set up and configure PixelLab for a project — MCP server, API keys, SDK installation. Use when the user mentions "setup pixellab", "configure pixellab", "pixellab mcp", "pixellab api key", "pixellab pricing", or "install pixellab".
---

## MCP Server Configuration

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

## MCP Tools Available

### Characters

- `create_character(description, body_type, template, n_directions, proportions, size, outline, shading, detail)`
  - `n_directions`: `4` or `8` (number of directional views to generate)
  - `body_type`: `"humanoid"` (default) or `"quadruped"`
  - `template`: required for quadrupeds — `"bear"`, `"cat"`, `"dog"`, `"horse"`, `"lion"`
  - `proportions`: `"default"`, `"chibi"`, `"cartoon"`, `"stylized"`, `"realistic_male"`, `"realistic_female"`, `"heroic"`
- `animate_character(character_id, template_animation_id, action_description, directions)`
  - `template_animation_id`: animation preset — common values include `"walking"`, `"idle"`, `"running"` (exact available IDs depend on body_type; use `get_character` to see available animations)
  - `action_description`: optional text to customize the animation behavior
- `get_character(character_id, include_preview)`
- `list_characters(limit, offset)`
- `delete_character(character_id, confirm)`

### Top-Down Tilesets

- `create_topdown_tileset(lower_description, upper_description, transition_size, tile_size, view, lower_base_tile_id)`
- `get_topdown_tileset(tileset_id)`
- `list_topdown_tilesets(limit, offset)`
- `delete_topdown_tileset(tileset_id)`

### Sidescroller Tilesets

- `create_sidescroller_tileset(lower_description, transition_description, transition_size, tile_size, base_tile_id)`
- `get_sidescroller_tileset(tileset_id, include_example_map)`
- `list_sidescroller_tilesets(limit, offset)`
- `delete_sidescroller_tileset(tileset_id)`

### Isometric Tiles

- `create_isometric_tile(description, size, tile_shape, outline, detail, seed)`
- `get_isometric_tile(tile_id)`
- `list_isometric_tiles(limit, offset)`
- `delete_isometric_tile(tile_id)`

### Map Objects

- `create_map_object(description, width, height, view, outline, shading, detail)`
- `get_map_object(object_id)`

### Pro Tiles

- `create_tiles_pro(description, tile_type, tile_size, n_tiles, style_images, style_options)`
- `get_tiles_pro(tile_id)`
- `list_tiles_pro(limit, offset)`
- `delete_tiles_pro(tile_id)`

## MCP Behavior

- **Non-blocking**: all creation tools return job IDs immediately
- **Processing time**: 2–5 minutes typical
- **Polling**: use `get_*` tools to check status
- **Download URLs**: format `/mcp/characters/{id}/download`, no auth needed (UUID = access key)
- **Chaining**: use `base_tile_id` from completed tilesets for visual continuity

## JS SDK Setup

```bash
npm install @pixellab-code/pixellab
```

Create `.env` or set env vars:

```bash
PIXELLAB_SECRET=your-secret-key-here
```

## API Token

Get from: https://pixellab.ai/account (requires PixelLab account)

## Pricing Reference

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
| Inpaint | 32–200 | Same as Bitforge |
| Rotate | 64x64 | $0.01057 |
| Rotate | 128x128 | $0.01091 |
| Skeleton Anim | 32–64 | $0.0136 |
| Skeleton Anim | 128x128 | $0.01572 |
| Estimate Skel | any | $0.00511 |

Prices are estimates — GPU processing time causes variation.

## Tier Limits

**Pixflux (general generation):**

| Tier | Max Canvas |
|---|---|
| Free | 200x200 area |
| Tier 1 | 320x320 area |
| Tier 2+ | 400x400 area |

**Bitforge/Inpaint (REST API hard limit):** Max 200x200 regardless of tier (width/height each 16–200).

**Style tool (Editor — Create S-M Image):** Tier-specific limits within the editor:

| Tier | Max Canvas |
|---|---|
| Tier 1 | 80x80 area |
| Tier 2+ | 140x140 area |

Note: The Style editor tool has tighter limits than the raw Bitforge API because it performs additional style processing. The REST API `/generate-image-bitforge` endpoint always supports up to 200x200.

## Pro Feature Tier Requirements

Tools marked "Pro" require a paid subscription. Specific tier requirements:

- **Tier 1 required**: consistent-style, 8-directional sprite, animate-with-text-pro, text2animation, create-tileset, create-texture, create-isometric-tile, create-tiles-pro, UI elements
- **Tier 2 required**: animation-to-animation, extend-map-v2
- The REST API endpoints (`/generate-image-pixflux`, `/generate-image-bitforge`, `/animate-with-skeleton`, `/animate-with-text`, `/rotate`, `/inpaint`, `/estimate-skeleton`) are available to all tiers including free (with canvas size limits)

## Commercial Use

- Generated images: commercial use allowed
- Restriction: do not use generated images to train new models
- Steam: disclose AI usage in "Pre-Generated" category (development tools)
- PixelLab does NOT use user inputs or generated content for model training

## Ways to Use PixelLab

1. **Simple Web Creator** — browser-based, desktop + mobile
2. **Characters Tool** — game-ready 4/8 directional sprites from text
3. **PixelLab Pixelorama** — in-browser editor with AI tools (desktop only)
4. **Aseprite Extension** — native integration (requires full Aseprite license, v1.3+)
5. **Vibe Coding (MCP)** — AI assistant integration for code editors
6. **REST API** — programmatic access with JS SDK
7. **Video Tutorials** — YouTube demonstrations
