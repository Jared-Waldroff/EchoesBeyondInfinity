---
name: voice-review
description: This skill should be used when reviewing, refining, polishing, critiquing, or improving existing story prose, scenes, dialogue, or narration for Echoes Beyond Infinity. It should activate when the user asks to "refine the story", "review the prose", "go over the writing", "tighten the dialogue", "improve the narration", "polish the scenes", or any task involving critique or improvement of existing game story content.
---

# Voice Review — Literary Prose Analysis

Review existing Echoes prose against the author technique standards of Andy Weir, James Dashner, and Ernest Cline. Identify passages that drift from the target voice and suggest specific rewrites with technique annotations.

## Review Workflow

1. Read the scene file(s) being reviewed from `client/js/scenes/`
2. Read the author technique library at `skills/voice-prime/references/author-techniques.md` (relative to plugin root)
3. Read the blended voice definition at `skills/voice-prime/references/echoes-voice-blend.md` (relative to plugin root)
4. Run the 7-point analysis on all narrative prose (terminal.narrate, terminal.thought, terminal.dent, terminal.say, terminal.dentLine, terminal.dentGlitch calls)
5. Output the Review Card with findings
6. For each flagged passage, provide a specific rewrite with the technique annotation

## The 7-Point Analysis

### 1. Specificity Audit (Weir)
Flag any abstract or vague descriptions. Every passage should include at least one concrete detail — a number, measurement, name, or technical spec.

**Flag:** "The ship was badly damaged"
**Fix:** "Hull integrity: 62%. Three micro-fractures along the port strut." — *Weir specificity*

### 2. Pacing Scan (Dashner)
Measure sentence length distribution against scene type expectations. Action scenes should compress. Calm scenes can breathe.

**Flag:** 20-word sentences during a chase sequence
**Fix:** Compress to 3-8 word fragments at peak tension — *Dashner compressed prose*

### 3. Humor Timing (Weir)
Verify jokes and humor come AFTER bad news or tense moments, never before. The humor should release tension, not preempt it.

**Flag:** Joke before the threat is established
**Fix:** Move humor to after the devastating information lands — *Weir pressure valve*

### 4. Sensory Priority (Dashner)
In danger scenes, check that physical sensations appear BEFORE cognitive understanding. The body knows first.

**Flag:** "I realized the hull was breaching and my hands started shaking"
**Fix:** "My hands stopped shaking. That's worse." Then the comprehension follows — *Dashner sensory dread*

### 5. Discovery Energy (Cline)
When characters find something significant, verify the prose accelerates rather than slows. Sentences should shorten and energy should build.

**Flag:** Long, analytical paragraphs during a revelation
**Fix:** Short punchy sentences building on each other, then one beat of awe — *Cline discovery euphoria*

### 6. Voice Consistency
Check character dialogue against established patterns:
- **Vin** — Technical, specific, self-deprecating humor, never vague
- **DENT** — Matches current `state.dentRepairLevel` vocabulary and emotional range
- **Graves** — Calm, specific threats, corporate menace
- **Kade** — Charismatic, honest about dishonesty

**Flag:** DENT making a sophisticated analogy at 35% repair level
**Fix:** Compress to terse, glitchy, survival-priority speech — *DENT voice level*

### 7. Bible Compliance
Cross-reference against Game Design Bible Section 13 (Tone & Writing Style):
- Scene advances understanding
- Scene provides agency
- Scene creates consequence
- Scene maintains tone (Weir/TARS/Maze Runner)

## Review Card Output

After analysis, output a structured review:

```
VOICE REVIEW ━━━━━━━━━━━━━━━━━━━━━━━━━━━
File:          [filename]
Lines reviewed: [count]
Scene type:    [detected]

FINDINGS:
[X] Specificity    — [pass/N issues]
[X] Pacing         — [pass/N issues]
[X] Humor timing   — [pass/N issues]
[X] Sensory order  — [pass/N issues]
[X] Discovery energy — [pass/N issues]
[X] Voice consistency — [pass/N issues]
[X] Bible compliance  — [pass/N issues]

Overall voice fidelity: [Strong / Good / Needs Work]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Rewrite Format

For each flagged passage, provide:

```
LINE [number]: [quoted original text]
ISSUE: [which check failed + why]
TECHNIQUE: [which author's technique applies]
REWRITE: [specific replacement text]
```

## Scope Rules

- Only review prose content inside terminal method calls (narrate, thought, dent, say, dentLine, dentGlitch, flashback)
- Do not review game logic, state management, or engine code
- Focus on the most impactful issues first — flag patterns, not every instance
- When a passage works well, note it as a positive calibration example
- Limit rewrites to what changes the voice, not restructuring scene logic

## Reference Files

The detailed author technique library and blended voice definition live in the voice-prime skill directory:
- **`skills/voice-prime/references/author-techniques.md`** — Full technique breakdown for all three authors
- **`skills/voice-prime/references/echoes-voice-blend.md`** — Character calibration, pacing rules, anti-patterns
