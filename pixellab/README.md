# PixelLab — Claude Code Plugin

A Claude Code plugin that encodes PixelLab's complete API documentation as skills, enabling Claude to correctly generate pixel art assets in any project.

## Skills

| Skill | Description |
|---|---|
| `pixellab-characters` | Create characters using Pixflux (text-to-pixel) and Bitforge (style-transfer) |
| `pixellab-concept-to-playable` | Full pipeline: concept art to rotated, animated sprite sheets |
| `pixellab-rotation` | Rotate characters/objects, create 8-directional sprites |
| `pixellab-animation` | Skeleton, text, and pose-based animation workflows |
| `pixellab-environments` | Build game environments, scenes, maps with iterative expansion |
| `pixellab-animated-environments` | Add animated elements (water, fire, NPCs) to static environments |
| `pixellab-tilesets` | Wang tiles, sidescroller tiles, isometric tiles, textures |
| `pixellab-editing` | Inpainting, background removal, color reduction, sprite fixes |
| `pixellab-ui` | Generate pixel art UI elements (health bars, buttons, icons) |
| `pixellab-api` | Complete REST API reference, JS SDK, shared types and enums |
| `pixellab-setup` | MCP server config, API keys, pricing, tiers, commercial use |

## Prerequisites

- PixelLab API token from https://pixellab.ai/account

## MCP Server Setup

Add to your `.mcp.json` or project MCP config:

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

## JS SDK

```bash
npm install @pixellab-code/pixellab
```

Set `PIXELLAB_SECRET` in your environment or `.env` file.

## Links

- PixelLab: https://www.pixellab.ai
- API Docs: https://api.pixellab.ai/v1/docs
- JS SDK: https://github.com/pixellab-code/pixellab-js
- MCP Server: https://github.com/pixellab-code/pixellab-mcp
- Discord: https://discord.gg/pBeyTBF8T7
