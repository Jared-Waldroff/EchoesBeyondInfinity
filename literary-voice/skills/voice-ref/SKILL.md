---
name: voice-ref
description: This skill should be used when the user asks for a quick reference on an author's writing style, asks "/voice-ref", "show me Weir's techniques", "how does Dashner write", "Cline's style", or wants to see the technique cards for Andy Weir, James Dashner, or Ernest Cline without entering a full writing or review mode.
---

# Voice Reference — Author Technique Cards

Display compact technique reference cards for the three authors whose styles compose the Echoes voice. This is a quick-lookup tool — it does not activate writing or review modes.

## Usage

Invoke with an author name argument, or "all" for the comparison matrix. If no argument is provided, display all three cards.

## Andy Weir — Technique Card

```
ANDY WEIR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Genre:     Hard sci-fi survival
Strength:  Technical precision as narrative tension

TECHNIQUES:
1. Log-entry intimacy    — First-person thinking aloud
2. Math-as-drama         — Numbers = life or death
3. 4-beat problem rhythm — Problem > Attempt > Setback > Solution
4. Humor pressure valve  — Joke AFTER bad news, never before
5. Specificity           — "40cm breach" not "big hole"

SENTENCE STYLE:
  Calm:        15-25 words, technical reasoning
  Realization: Short. Alone. "That shouldn't be possible."
  Problem-solving: Mix of long reasoning + short conclusions

NEVER: Purple prose, vague descriptions, humor before stakes
ECHOES USE: Vin's internal monologue, engineering scenes, DENT humor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## James Dashner — Technique Card

```
JAMES DASHNER ━━━━━━━━━━━━━━━━━━━━━━━━━━
Genre:     YA dystopian thriller
Strength:  Relentless momentum, physical tension

TECHNIQUES:
1. Cliffhanger micro-rhythm — End sections mid-tension
2. Sensory dread            — Body knows before mind
3. Information starvation   — Always slightly less than needed
4. Compressed action prose  — Sentence length = danger dial
5. The "wrong" detail       — Mundane observation during chaos
6. Check-in beats           — 2-3 word exchanges mid-crisis

SENTENCE STYLE:
  Calm:       15-25 words
  Rising:     8-15 words
  Peak:       3-8 words, fragments
  Impact:     1-3 words. Period.

NEVER: Resolving at scene breaks, telling emotions, comfortable info
ECHOES USE: Chase sequences, Graves confrontations, scene transitions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Ernest Cline — Technique Card

```
ERNEST CLINE ━━━━━━━━━━━━━━━━━━━━━━━━━━━
Genre:     Geek nostalgia sci-fi
Strength:  Joy of discovery, tech reverence

TECHNIQUES:
1. Discovery euphoria    — Prose accelerates at revelations
2. World-as-puzzle       — Exploration = code-breaking
3. Reverence for tech    — Describe with love, not just function
4. Quest momentum        — Every answer raises new questions
5. Virtual/real blurring — Simulated spaces have physical weight

SENTENCE STYLE:
  Exploration:  Medium, observational, analytical
  Discovery:    Shorter, breathless, building
  Awe:          One longer sentence to hold the moment
  Implications: Cascading short sentences

NEVER: Passive discovery, clinical revelations, digital-sounding glitches
ECHOES USE: Simulation scenes, tech discovery, station exploration, Kade
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Comparison Matrix

When "all" is requested or no specific author given, display the cross-reference:

```
TECHNIQUE COMPARISON ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    WEIR            DASHNER          CLINE
Tension source:     Math/numbers    Physical threat   The unknown
Humor style:        Dry, after-bad  Gallows, sparse   Geeky enthusiasm
Pacing tool:        4-beat rhythm   Sentence compress  Breadcrumb chain
Reader hook:        "Can they solve  "Can they escape  "What will they
                     this?"          this?"            find?"
Info strategy:      Teach through   Starve for pull   Reveal to excite
Scene endings:      Solution/setback Mid-tension       New question
Character in        Thinks aloud    Feels first       Decodes the world
 danger:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Detailed Reference

For the full technique breakdowns with application examples, consult the voice-prime skill directory:
- **`skills/voice-prime/references/author-techniques.md`** — Complete technique library
- **`skills/voice-prime/references/echoes-voice-blend.md`** — How the three voices blend for Echoes
