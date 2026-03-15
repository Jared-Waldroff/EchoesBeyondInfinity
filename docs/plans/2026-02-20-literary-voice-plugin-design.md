# Literary Voice Plugin — Design Document

**Date:** 2026-02-20
**Status:** Approved

## Purpose

A Claude Code plugin that channels the writing styles of Andy Weir, James Dashner, and Ernest Cline into a unified "Echoes voice" for writing and refining the story of Echoes Beyond Infinity. Auto-triggers on story work — no manual invocation needed.

## Authors & Technique Library

### Andy Weir (The Engineer's Voice)
- **Log-entry intimacy** — First person, present tense, thinking aloud. "Alongside the character" feel.
- **Math-as-drama** — Numbers are life-and-death. Specifics over abstractions. "40cm hull breach" not "big hole."
- **Problem > Attempt > Setback > Solution** — Every challenge follows this 4-beat cadence.
- **Humor as pressure valve** — Joke comes right after the worst news, never before.
- **Sentence architecture** — Short declaratives for impact. Longer technical sentences for problem-solving. Never purple prose.

### James Dashner (The Pursuit Engine)
- **Cliffhanger micro-rhythm** — End paragraphs and sections mid-tension. Reader can't stop.
- **Sensory dread** — Physical sensations of fear before the threat is named.
- **Information starvation** — Character always knows slightly less than they need. Forward pull.
- **Compressed action prose** — Sentence length shrinks as danger increases. Under 10 words at peak.
- **The "wrong" detail** — One mundane observation during chaos.
- **Check-in beats** — Characters exchange 2-3 words mid-action.

### Ernest Cline (The Geek Mythologist)
- **Discovery euphoria** — Prose accelerates and gets breathless when something amazing is found.
- **World-as-puzzle** — Every environment is a system to decode. Exploration = code-breaking.
- **Reverence for the thing itself** — Technology described with love, not just function.
- **Quest momentum** — Every discovery leads to the next. Breadcrumb pacing.
- **Virtual/real blurring** — Simulated spaces described with physical weight and presence.

## Plugin Structure

```
literary-voice/
├── plugin.json              # Plugin manifest
├── skills/
│   ├── voice-prime.md       # Pre-writing voice activation (auto-triggers)
│   ├── voice-review.md      # Post-writing prose review (auto-triggers)
│   └── voice-ref.md         # Quick author technique reference (manual)
```

## Skills

### voice-prime (Auto-Triggering)

**Triggers:** Any scene/chapter/dialogue writing, editing, or generation for the game.

**Behavior:**
1. Loads the blended Echoes voice (all three authors) into context
2. Reads Game Design Bible Section 13 voice guidelines
3. Reads current chapter file to calibrate to existing tone
4. Detects scene type and adjusts author blend:
   - Engineering/puzzle scenes → Weir-heavy
   - Chase/pursuit/escape scenes → Dashner-heavy
   - Discovery/revelation/simulation scenes → Cline-heavy
   - Character moments → Weir honesty + Cline earned sentiment
5. Outputs a concise Voice Card summarizing active style parameters

**Manual override:** `/voice-prime [author]` forces emphasis on one author.

### voice-review (Auto-Triggering)

**Triggers:** Refining, polishing, critiquing, or reviewing existing story prose.

**Behavior:**
1. Reads recently written/modified scene code
2. Runs 7-point analysis:
   - Specificity audit (Weir: flag abstractions)
   - Pacing scan (Dashner: sentence length vs scene type)
   - Humor placement (Weir: jokes after bad news, not before)
   - Sensory check (Dashner: physical before cognitive in danger)
   - Discovery energy (Cline: revelations accelerate, not slow)
   - Voice consistency (DENT repair level, Vin established patterns)
   - Bible compliance (Game Design Bible Section 13)
3. Identifies passages that drift from target voice
4. Suggests specific rewrites with technique annotations

### voice-ref (Manual Only)

**Usage:** `/voice-ref [weir|dashner|cline|all]`

**Behavior:** Displays a compact technique card for the requested author(s) without entering any mode.

## Blended "Echoes Voice" Definition

### Narration (Vin)
- Weir's log-entry intimacy + Cline's tech reverence + Dashner's urgency modulation
- Specifics and numbers always (Weir), with wonder when warranted (Cline)
- Sentence length modulates with tension (Dashner): calm = longer technical musing, danger = short declaratives

### Dialogue
- **DENT:** Weir dry humor + Cline geeky enthusiasm (scales with repair level)
- **Graves:** Dashner institutional menace — calm, reasonable, terrifying
- **Kade:** Cline charismatic hustler energy + Dashner unpredictability

### Pacing
- Engineering scenes: Weir's problem > attempt > setback > solution
- Pursuit scenes: Dashner's cliffhanger micro-rhythm, compressed paragraphs
- Discovery scenes: Cline's accelerating breathlessness, quest momentum
- Quiet moments: Weir honesty + Cline earned sentiment (never saccharine)

## CLAUDE.md Integration

Add to project instructions:
```
When working on any scene file (client/js/scenes/*.js) or story content,
the literary-voice plugin skills auto-activate. voice-prime loads before
writing; voice-review loads when refining existing prose.
```

## Implementation Notes

- Skills should reference the Game Design Bible path: `design/GAME-DESIGN-BIBLE.md`
- Scene files live at: `client/js/scenes/*.js`
- Existing voice guidelines in Bible Section 13 are complementary, not replaced
- The plugin layers author craft techniques ON TOP of the Bible's character voice specs
