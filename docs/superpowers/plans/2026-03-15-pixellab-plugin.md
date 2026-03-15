# PixelLab Plugin Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Claude Code plugin with 11 skills encoding PixelLab's complete pixel art API documentation for reuse across projects.

**Architecture:** Pure knowledge plugin — 11 SKILL.md files organized by game dev workflow domain, one plugin.json manifest, one README. No scripts, no tests, no executables. Each skill has YAML frontmatter (name + description for trigger matching) and comprehensive markdown content drawn from the design spec.

**Tech Stack:** Claude Code plugin format (`.claude-plugin/plugin.json` + `skills/*/SKILL.md`)

**Spec:** `docs/superpowers/specs/2026-03-15-pixellab-plugin-design.md`

---

## File Structure

```
pixellab/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── pixellab-characters/SKILL.md
│   ├── pixellab-concept-to-playable/SKILL.md
│   ├── pixellab-rotation/SKILL.md
│   ├── pixellab-animation/SKILL.md
│   ├── pixellab-environments/SKILL.md
│   ├── pixellab-animated-environments/SKILL.md
│   ├── pixellab-tilesets/SKILL.md
│   ├── pixellab-editing/SKILL.md
│   ├── pixellab-ui/SKILL.md
│   ├── pixellab-api/SKILL.md
│   └── pixellab-setup/SKILL.md
└── README.md
```

13 files total. All content sourced from the design spec.

---

## Chunk 1: Scaffold + Core Generation Skills (Tasks 1-5)

### Task 1: Create plugin.json

**Files:** Create `pixellab/.claude-plugin/plugin.json`

- [ ] Step 1: Create plugin manifest (see spec "plugin.json" section for exact content)
- [ ] Step 2: Verify — `find pixellab -type f | sort`
- [ ] Step 3: Commit — `feat(pixellab): scaffold plugin with manifest`

### Task 2: Create README.md

**Files:** Create `pixellab/README.md`

- [ ] Step 1: Write README (plugin name, 11 skills list, prerequisites, MCP setup snippet, links)
- [ ] Step 2: Commit — `feat(pixellab): add README`

### Task 3: Create pixellab-characters skill

**Files:** Create `pixellab/skills/pixellab-characters/SKILL.md`

Frontmatter description: "Create pixel art characters using PixelLab. Use when the user mentions create character, pixel art character, sprite, generate character, bitforge, pixflux, style reference, or wants to generate pixel art characters, items, or assets with consistent style."

Content from spec Skill 1: Two models (Pixflux/Bitforge), shared param table with outline/shading/detail/view/direction, all enum values, init image strength guide, style consistency Pro (editor-only + API alt), frame output table, character options (body types, templates, proportions), canvas recs, pricing.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Verify frontmatter — `head -4 pixellab/skills/pixellab-characters/SKILL.md`
- [ ] Step 3: Commit — `feat(pixellab): add characters skill`

### Task 4: Create pixellab-concept-to-playable skill

**Files:** Create `pixellab/skills/pixellab-concept-to-playable/SKILL.md`

Frontmatter description: "Full pipeline from concept art to game-ready sprite sheets using PixelLab. Use when the user mentions concept art to pixel, concept to playable, sprite sheet from concept, character pipeline, full character workflow, or wants to take artwork from concept through rotation and animation to final game assets."

Content from spec Skill 2: Pipeline diagram, 5 steps (concept→pixel art→style lock→rotations→animation→export) each with editor-only markers and API alternatives, quality iteration loop, JS SDK chaining example, cross-references.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add concept-to-playable pipeline skill`

### Task 5: Create pixellab-rotation skill

**Files:** Create `pixellab/skills/pixellab-rotation/SKILL.md`

Frontmatter description: "Rotate pixel art characters and objects, create 8-directional sprites using PixelLab. Use when the user mentions rotate character, rotation, 8 directions, directional sprite, facing direction, turn character, isometric rotation, oblique projection, view change, cardinal directions, or north-facing sprite."

Content from spec Skill 3: Rotate endpoint (POST /rotate) full param table including image_size, 8-dir Pro (editor/MCP-only + API alt), three methods, two strategies (static vs iterative), view/direction framework, mirroring trick, fixing rotations, pricing.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add rotation skill`

---

## Chunk 2: Animation + Environment Skills (Tasks 6-8)

### Task 6: Create pixellab-animation skill

**Files:** Create `pixellab/skills/pixellab-animation/SKILL.md`

Frontmatter description: "Animate pixel art characters using PixelLab — skeleton-based, text-based, and pose-based animation. Use when the user mentions animate, animation, walk cycle, skeleton, keyframe, sprite animation, idle animation, run cycle, re-pose, text to animation, or text2animation."

Content from spec Skill 4: Skeleton anim (POST /animate-with-skeleton) full params + 18 keypoints with clarifications, workflow + freeze strategies, fixed_head (editor-only). Text anim (POST /animate-with-text) full params with image_size=64x64, seed=0 warning, bounds note. Text2Animation (editor-only + alt). Anim-to-anim (editor-only + alt). Re-pose (editor-only + alt). Estimate skeleton. Pricing.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add animation skill`

### Task 7: Create pixellab-environments skill

**Files:** Create `pixellab/skills/pixellab-environments/SKILL.md`

Frontmatter description: "Build game environments, scenes, and backgrounds using PixelLab. Use when the user mentions environment, game scene, background, landscape, create map, extend map, game world, or level background."

Content from spec Skill 5: Create Map (Pixflux) with tiers, Extend Map v2, iterative expansion workflow (5 steps), scene composition pipeline, map objects (MCP), best practices.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add environments skill`

### Task 8: Create pixellab-animated-environments skill

**Files:** Create `pixellab/skills/pixellab-animated-environments/SKILL.md`

Frontmatter description: "Create animated game environments with moving elements using PixelLab. Use when the user mentions animated environment, animated tiles, water animation, fire animation, environment animation, animated background, or living world."

Content from spec Skill 6: Static-first workflow, animating elements (simple loops/complex/NPCs), frame count table, visual consistency, compositing diagram, cross-references.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add animated environments skill`

---

## Chunk 3: Tileset, Editing, UI Skills (Tasks 9-11)

### Task 9: Create pixellab-tilesets skill

**Files:** Create `pixellab/skills/pixellab-tilesets/SKILL.md`

Frontmatter description: "Create game tilesets using PixelLab — Wang tiles, sidescroller tiles, isometric tiles, and textures. Use when the user mentions tileset, tiles, wang tiles, autotile, terrain tile, isometric tile, platformer tiles, tile transition, or seamless tiles."

Content from spec Skill 7: Wang top-down (MCP params), Wang sidescroller (MCP params), isometric (shapes/sizes), Pro tiles (tile types/sizes), Create Texture, tile chaining, export formats, advanced params, MCP non-blocking behavior, pipeline diagram.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add tilesets skill`

### Task 10: Create pixellab-editing skill

**Files:** Create `pixellab/skills/pixellab-editing/SKILL.md`

Frontmatter description: "Edit and modify existing pixel art using PixelLab — inpainting, background removal, color reduction. Use when the user mentions inpaint, edit pixel art, modify sprite, remove background, resize pixel art, reduce colors, fix sprite, or color palette."

Content from spec Skill 8: Inpaint API (POST /inpaint) full params with guidance scale range note, critical masking rule, Edit Image (editor-only + alt), Remove BG (editor-only + alt), Resize/Unzoom (editor-only), Reduce Colors (editor-only), iterative editing workflow, combined init+inpainting, pricing.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add editing skill`

### Task 11: Create pixellab-ui skill

**Files:** Create `pixellab/skills/pixellab-ui/SKILL.md`

Frontmatter description: "Generate pixel art UI elements using PixelLab — health bars, buttons, inventory slots, icons. Use when the user mentions UI element, game UI, health bar, button pixel art, inventory, HUD, game interface, or pixel UI."

Content from spec Skill 9: Standard UI (editor-only + Pixflux API alt), full param table with outline/shading/detail/color_image, Pro UI, canvas limits, best practices.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add UI elements skill`

---

## Chunk 4: API Reference, Setup, Verification (Tasks 12-14)

### Task 12: Create pixellab-api skill

**Files:** Create `pixellab/skills/pixellab-api/SKILL.md`

Frontmatter description: "Complete PixelLab REST API and JavaScript SDK reference. Use when the user mentions pixellab api, pixellab sdk, @pixellab-code/pixellab, PixelLabClient, pixellab endpoint, pixellab rest, or writes code that imports the PixelLab SDK."

Content from spec Skill 10 + Cross-Cutting Concerns: Base URL/auth, 8 endpoints table, editor-only tools note, curl example with response, shared types (Base64Image/Point/Keypoint/Usage), all enums with clarifications, HTTP status codes, JS SDK (install, init, generate, style transfer, balance with correct balance.usd field), env vars, error handling, response schemas (single/multi image/skeleton/balance). Cross-cutting: Base64Image handling, force symmetry, projections, color control, general options, seed warning (null vs 0).

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add API reference skill`

### Task 13: Create pixellab-setup skill

**Files:** Create `pixellab/skills/pixellab-setup/SKILL.md`

Frontmatter description: "Set up and configure PixelLab for a project — MCP server, API keys, SDK installation. Use when the user mentions setup pixellab, configure pixellab, pixellab mcp, pixellab api key, pixellab pricing, or install pixellab."

Content from spec Skill 11: MCP config JSON, all MCP tools with params (n_directions values, template_animation_id guidance, proportions values), MCP behavior, JS SDK setup, API token source, pricing table, Pro tier requirements, tier limits (Pixflux/Bitforge API/Style editor), commercial use, Steam guidance, 7 access methods.

- [ ] Step 1: Write SKILL.md
- [ ] Step 2: Commit — `feat(pixellab): add setup skill`

### Task 14: Final verification

- [ ] Step 1: Verify 13 files — `find pixellab -type f | sort`
- [ ] Step 2: Verify all frontmatter — `for f in pixellab/skills/*/SKILL.md; do echo "=== $f ==="; head -4 "$f"; echo; done`
- [ ] Step 3: Verify valid JSON — `python3 -c "import json; json.load(open('pixellab/.claude-plugin/plugin.json')); print('Valid')"`
- [ ] Step 4: Final commit if needed
