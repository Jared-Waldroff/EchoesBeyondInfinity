---
name: pixellab-ui
description: Generate pixel art UI elements using PixelLab — health bars, buttons, inventory slots, icons. Use when the user mentions "UI element", "game UI", "health bar", "button pixel art", "inventory", "HUD", "game interface", or "pixel UI".
---

## Standard UI Element Generation

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

## Pro UI Elements

- Grid-based generation producing multiple variations
- Size-based pricing (more expensive for larger outputs)
- Better for creating UI component sets with consistent style

## Canvas Limits by Tier

| Tier | Max Area |
|---|---|
| Free | 200x200 |
| Tier 1 | 320x320 |
| Tier 2+ | 400x400 |

## Best Practices

- Include style context in description: "medieval stone button with iron rivets", "sci-fi holographic health bar with cyan glow"
- Use `init_image` from existing UI to match style across components
- Use `color_image` to force game's UI palette
- Generate transparent (`no_background: true`) for easy compositing
- Use consistent `outline`/`shading`/`detail` across all UI elements for cohesion
