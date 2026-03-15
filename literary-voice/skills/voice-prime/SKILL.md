---
name: voice-prime
description: This skill should be used when writing, editing, drafting, rewriting, generating, or building any scene, chapter, dialogue, narration, or story prose for Echoes Beyond Infinity. It activates for requests like "write a scene", "build a chapter", "add dialogue", "create narration", "draft a chase sequence", "write an engineering puzzle scene", "continue the story", "write what happens next", "flesh out this section", "write DENT dialogue", "rewrite this scene", or any task involving game story content in client/js/scenes/ including engineering, pursuit, discovery, simulation, character, and confrontation scenes.
version: 1.0.0
---

# Voice Prime — Literary Voice Activation

Activate the blended Echoes voice before writing any story prose. This skill channels the craft techniques of Andy Weir, James Dashner, and Ernest Cline into a unified voice calibrated for Echoes Beyond Infinity.

## Activation Workflow

1. Read the Game Design Bible voice guidelines (repository root: `design/GAME-DESIGN-BIBLE.md`, Section 13)
2. Read the author technique library at `references/author-techniques.md`
3. Read the blended voice definition at `references/echoes-voice-blend.md`
4. Identify the scene type being written (engineering, pursuit, discovery, simulation, character, confrontation)
5. Load the appropriate author blend for that scene type
6. Read the current chapter file to calibrate to existing tone
7. Output the Voice Card (below), then proceed with writing

## The Three Authors

**Andy Weir** — Technical precision, math-as-drama, humor as pressure valve after bad news, log-entry first-person intimacy, specific numbers over vague descriptions. Problem > Attempt > Setback > Solution rhythm.

**James Dashner** — Relentless pacing, sensory dread (body before mind), information starvation, compressed sentence length during action, cliffhanger scene endings, "wrong detail" during chaos, character check-in beats.

**Ernest Cline** — Discovery euphoria (prose accelerates at revelations), world-as-puzzle exploration, reverence for technology, quest momentum (every answer raises new questions), virtual/real blurring with physical weight.

## Default Blend

The Echoes voice fuses all three in a base ratio, then adjusts per scene type:

- **Engineering/puzzle:** Weir 60% / Cline 25% / Dashner 15%
- **Chase/pursuit/escape:** Dashner 60% / Weir 25% / Cline 15%
- **Discovery/revelation:** Cline 50% / Weir 30% / Dashner 20%
- **Simulation evidence:** Cline 50% / Dashner 30% / Weir 20%
- **Character/quiet moment:** Weir 50% / Cline 30% / Dashner 20%
- **Confrontation:** Dashner 50% / Weir 30% / Cline 20%
- **DENT repair/bonding:** Weir 40% / Cline 40% / Dashner 20%

## Voice Card Output

After loading the voice, output a brief Voice Card to confirm activation:

```
VOICE ACTIVE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scene type:    [detected type]
Primary:       [dominant author + key technique]
Secondary:     [supporting author + key technique]
Sentence mode: [length guidance for this scene type]
Anti-patterns: [top 2 things to avoid for this scene type]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Core Anti-Patterns

Never produce prose that does any of these:

1. **Purple prose** — No "magnificent", "infinite", "cosmic". Weir cuts these.
2. **Telling emotions** — Never "I felt scared." Show the physical sensation.
3. **Vague technology** — Never "advanced systems." Name it. Describe it.
4. **Humor before stakes** — Jokes come AFTER bad news, not before.
5. **Comfortable information** — Never satisfy curiosity fully. Answer one question, raise two.
6. **Resolving at scene breaks** — End scenes mid-tension, not on conclusions.
7. **Passive discovery** — Characters decode and earn revelations. Nothing "just happens."
8. **DENT exceeding repair level** — Match vocabulary and emotional range to current repair percentage.

## Character Voice Quick Reference

**Vin:** Technical thinking-aloud + genuine awe at tech + physical awareness of danger.
**DENT (30-50%):** Terse, glitchy, survival-priority. "Vin. Hull. Breach."
**DENT (50-80%):** Witty, technical, curious. Full analogies and dry humor.
**DENT (80-100%):** Emotionally present, fiercely loyal, devastating honesty.
**Graves:** Calm institutional menace with specific timelines and consequences.
**Kade:** Charismatic hustler. Honest about his dishonesty.

## Reference Files

For the complete technique library and calibration examples, consult:
- **`references/author-techniques.md`** — Full technique breakdown for all three authors with application notes
- **`references/echoes-voice-blend.md`** — Blended voice definition, character calibration, pacing rules, and anti-patterns

## Integration

This skill complements the Game Design Bible (Section 13: Tone & Writing Style). The Bible defines WHAT the characters say and WHEN. This skill defines HOW the prose itself is crafted — sentence rhythm, paragraph architecture, tension pacing, humor timing, and the fusion of three literary voices into one.
