---
name: pixellab-animated-environments
description: Create animated game environments with moving elements using PixelLab. Use when the user mentions "animated environment", "animated tiles", "water animation", "fire animation", "environment animation", "animated background", or "living world".
---

# Skill: pixellab-animated-environments

Cross-references: pixellab-environments (for building the static base), pixellab-animation (for generating individual animation frames).

## Workflow: Static First, Then Animate

1. **Build static environment** using environments skill (Create Map, Extend Map)
2. **Identify animated elements**: water, fire, torches, foliage, smoke, machinery, NPCs
3. **Generate animation frames** for each element using animation tools
4. **Composite** animated elements over static background

## Animating Environment Elements

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

## Frame Count Recommendations

| Element | Recommended Frames | Loop Type |
|---|---|---|
| Water ripple | 4-6 | Seamless loop |
| Torch/fire | 4-8 | Seamless loop |
| Foliage sway | 4 | Ping-pong |
| Smoke/steam | 6-8 | Seamless loop |
| Machinery | 4-8 | Seamless loop |
| Idle NPC | 4 | Seamless loop |

## Maintaining Visual Consistency

- Use `color_image` from the static environment to force palette matching
- Set init_image to the static environment frame when generating animated elements
- Use inpainting: mask only the animated region, keep surrounding context frozen
- Match outline/shading/detail settings used for the static environment

## Compositing Approach

```
Static environment (base layer)
    + Animated water tiles (replace specific tile positions per frame)
    + Animated fire/torch sprites (overlay with transparency)
    + Animated NPC sprites (overlay with transparency)
= Living, animated game world
```
