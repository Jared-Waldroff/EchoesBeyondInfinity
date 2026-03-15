# ECHOES BEYOND INFINITY — MASTER GAME DESIGN BIBLE

> **Purpose:** This is the single source of truth for the game. Nothing gets built without consulting this document. Nothing gets changed in code without updating this document first. This document contains everything needed to build, validate, and ship chapters.

> **Status:** ✅ CORE FOUNDATION LOCKED (Feb 16, 2026). Ready for chapter construction.

---

## 🔧 INSTRUCTIONS FOR BUILDERS (READ THIS FIRST)

### Who This Is For
You are an AI assistant (likely Claude Opus 4.6) tasked with building chapters for **Echoes Beyond Infinity**, a hard sci-fi text adventure game. This document is your complete instruction manual.

### What Has Been Built
- **Engine:** `engine/core.py`, `engine/display.py`, `engine/audio.py` — fully functional
- **Prologue:** `scenes/prologue.py` (1,549 lines) — Cold Boot sequence, 3 phases, DENT awakening
- **Chapter 1:** `scenes/chapter1.py` (2,191 lines) — Dead in the Water, repair/refuel/depart
- **Game Runner:** `game.py` — loads chapters, manages state, handles saves

**Key state after Chapter 1:**
- HP: 80, Neural: 58, Stress: 30
- Hull: 62%, Null: 8 cells, Fold: LOCK (needs Fuel Regulator Bypass to unlock)
- DENT: ~50% capacity, basic functions online
- Player has Torquer (0 cells loaded), has explored The Vex

### What You Will Build
Chapters 2-14 using this Bible as your blueprint. You will work in **chunks of 2-3 chapters**, validating and playtesting each chunk before proceeding.

### How to Build a Chapter (The Workflow)

#### STEP 1: DESIGN PHASE
Before writing ANY code:
1. Read **Section 16.4 (Pre-Build Validation Checklist)**
2. Fill out the checklist for your chapter
3. Map which **Truby beats** (#1-22) this chapter hits (see Section 16.1)
4. List all **player choices** and validate each using **Reed's 5 Tests** (see Section 7)
5. List all **scenes** and validate each using the **4-Point Scene Checklist** (see Section 13)
6. Submit validation to Jared for approval

**Do not proceed to Step 2 until Pre-Build Validation is approved.**

#### STEP 2: BUILD PHASE
With approved validation:
1. Create chapter file: `scenes/chapterN.py`
2. Follow the **Scene Writing Template** (Section 16.6)
3. Reference existing chapters for code structure/patterns
4. Use the **Dialogue Framework** (Section 13) for character voice
5. Apply **Three-Tier Depth System** (Section 4) for science exposition
6. Implement **Null Cell Economy** (Section 5) for resource management
7. Cross-check all items/stats against Bible specs

#### STEP 3: REVIEW PHASE
After building:
1. Read **Section 16.5 (Post-Build Review Checklist)**
2. Fill out the checklist
3. Test all player paths (or simulate playthroughs)
4. Verify **Truby's Web** (everything connects, nothing isolated)
5. Verify **Reed's Principles** (choices meaningful, exploration rewarding)
6. Submit review to Jared

**Do not ship until Post-Build Review is approved.**

#### STEP 4: ITERATION
If validation/review fails:
- Identify which principle was violated
- Redesign the failing element
- Re-validate
- Rebuild
- Re-review

**The Bible is law. If your code contradicts the Bible, the code is wrong.**

---

## TABLE OF CONTENTS
1. [Vision & Philosophy](#1-vision--philosophy)
2. [Story Overview](#2-story-overview)
3. [Characters](#3-characters)
4. [The Science](#4-the-science)
5. [Technology & Items](#5-technology--items)
6. [Game Structure & Chapters](#6-game-structure--chapters)
7. [Player Choice System](#7-player-choice-system)
8. [Game Mechanics](#8-game-mechanics)
9. [The Simulation Layer](#9-the-simulation-layer)
10. [Computer Science Parallels](#10-computer-science-parallels)
11. [Fourth Wall & Meta-Narrative](#11-fourth-wall--meta-narrative)
12. [World-Building](#12-world-building)
13. [Tone & Writing Style](#13-tone--writing-style)
14. [Audio & Atmosphere](#14-audio--atmosphere)
15. [Open Questions](#15-open-questions)
16. [Narrative Execution Framework](#16-narrative-execution-framework)
17. [Game Client Architecture](#17-game-client-architecture)
18. [Visual Art Direction & Concept Pipeline](#18-visual-art-direction--concept-pipeline)

---

## 1. VISION & PHILOSOPHY

### What Is This Game?
A **text-adventure game** that plays like a hard sci-fi thriller. Think Andy Weir's technical problem-solving meets Maze Runner's dystopian pursuit, wrapped in a simulation theory mystery that the player must figure out themselves.

### Core Design Principles
- **Science-first storytelling** — Every piece of technology, every plot mechanic is rooted in real theoretical physics. We extrapolate from what's real (Casimir Effect, Alcubierre metrics, CTCs) into what's possible.
- **Player agency matters** — Choices should ripple forward. Not just "choose your dialogue" but choices that change what tools you have, what information you know, what encounters you face, and how the story unfolds.
- **Show, don't tell** — The simulation twist is NEVER stated explicitly. The player must arrive at the conclusion themselves through accumulated evidence (glitches, render gaps, the final reveal text).
- **Earn every discovery** — No tutorial screens. The player learns mechanics through story. The prologue teaches movement through a zero-G puzzle. The Torquer is discovered, not given.
- **DENT is the heart** — The robot companion starts broken alongside you. Repairing him is repairing yourself. By endgame, the player should care about DENT more than the mission.
- **Organic connection (Truby)** — Every element (world, characters, tech, conflict) must connect to every other element. The simulation reveal isn't a twist — it's the web that holds everything together.
- **Meaningful choice (Reed)** — Player choices reflect understanding, create consequences, offer valid strategies, develop character, and maintain tone.

### Inspirations
- **The Martian** (Andy Weir) — Technical problem-solving as narrative tension
- **Maze Runner** — Institutional pursuit, dystopian stakes, "the system is the villain"
- **Interstellar** — Hard science + emotional core (TARS = DENT's spiritual ancestor)
- **Subnautica** — Isolation, exploration, gradual revelation of something much bigger
- **Portal** — AI companion with personality, environmental storytelling

### Player Experience Goals
- **Playthrough length:** 14 chapters built in 2-3 chapter chunks
- **Replayability:** Converging paths with meaningful variations. Same destination, different journey.
- **Difficulty:** Accessible with DENT hints on surface, deeper challenges for those who explore
- **Fail state:** No traditional death. Failures trigger simulation-style rollbacks (see Section 8)

---

## 2. STORY OVERVIEW

### The Premise
A hard sci-fi "simulation theory" thriller where an engineer named **Vin** discovers that spacetime folding is actually an exploit in the universe's computational code.

### The Hook
Vin wakes on a damaged ship (The Vex) with no memory. His robot companion DENT is equally broken. Through exploration, they piece together: they were attacked by the SICs (Spatial Integrity Coalition), they're carrying a device that folds spacetime, and Vin has been receiving signals from his own future — the Echoes — that compel him to reach a destination called the Core Anomaly.

### The Loop
- Vin received signals (Echoes/Shellcode) from his future self
- These signals contain the knowledge needed to build folding tech and navigate to the Core Anomaly
- At the Core Anomaly, Vin must execute the Folded Fold — a recursive spacetime manipulation
- This creates a Closed Timelike Curve, sending the Echoes back to his past self
- The loop is self-consistent: the message exists because he travels, and he travels because the message exists
- The simulation runs this loop endlessly — each "run" is a Cycle

### The Meta-Twist
The player IS the Simulator. The glitches they see on screen are the simulation struggling. The monitoring diagnostics Vin detects are the system's own log files. This is never stated — the player must conclude it.

### Three-Act Structure

**ACT I: The Paradox & The SICs' Warning (Game Chapters 1-5)**
- Vin discovers the Echoes, builds folding tech, breaches the Spatial Integrity Charter
- The SICs confront him — he goes rogue
- The Folders make contact — now hunted by two groups
- Escapes the solar system toward the Core Anomaly

**ACT II: The Render Gap & The Tense Pact (Chapters 6-10)**
- Deep space isolation — discovers the Render Gap (evidence of simulation)
- Temporal bleed / ghost versions of himself
- Reaches the Core Anomaly — Folders arrive
- SICs deploy the Coherence Net — all folding impossible
- Forced alliance with Folders to breach the Net

**ACT III: The Final Integrity Check (Chapters 11-14)**
- Counter-pulse disables Net — three-way chaos
- Folded Fold initiates — physics breaks down into computational structure
- Vin enters the Bulk Dimension — sees the Simulator's infrastructure
- Sends the Echoes back, closing the loop. Instance terminated. Cycle N+1.

---

## 3. CHARACTERS

### Vin (The Engineer) — Player Character
- **Background:** Researcher/engineer from Earth. Built the Torquer in a university lab.
- **Motivation:** Close the Loop — driven by the paradox of the Echoes. Must follow the path to send the message back.
- **Personality:** Records detailed technical logs. Scientific sarcasm as coping mechanism. Calculates odds compulsively.
- **Flaw:** Blind to personal cost/emotions due to obsession with the truth.
- **CS Parallel:** Sees the universe as code to debug. His research is "code review" — finding the bug in General Relativity.

**Vin's Voice Guidelines (for dialogue/narration):**
- Technical precision: *"The hull breach is 40cm wide. That's 'catastrophic' in engineering terms, which is a polite way of saying 'we're about to die.'"*
- Calculates odds even when terrified: *"Three cells short. In space, that's the difference between 'we're fine' and 'archaeological discovery in 10,000 years.'"*
- Self-deprecating humor under pressure: *"I'm an engineer. We solve problems. Usually before they kill us."*
- Treats physics like code: *"Casimir Effect scaling isn't elegant. It's brute-force energy input until the vacuum complies."*

### DENT (Dynamic Engineering & Navigation Toolkit) — Companion
- **Role:** Robot companion, mechanic, co-pilot, reluctant bodyguard
- **Personality:** TARS from Interstellar at 75% humor. Deadpan honest, dry wit under pressure, loyal but pragmatic.
- **Physical Form:** 5'8" tall, lanky humanoid. Scarecrow build — mismatched parts from dozens of repairs.
  - Head: Narrow, two asymmetric optics (one large/bright, one small/flickering)
  - Chest: Dented orange plate with "D.E.N.T." stenciled, half scratched off. Blue core glow through cracks.
  - Left arm: Sleek, original manufacture ("good" arm)
  - Right arm: Cobbled from ship parts, exposed wiring, fold-out welding torch (often broken)
  - Legs: Slightly digitigrade, oddly graceful despite looking like he should fall apart
  - Feet: Magnetic, for zero-G stability
- **Arc:** Starts at 30% capacity, rebuilds throughout the story. Repair level tracks alongside Vin's memory recovery. By endgame, fully operational and the emotional anchor.
- **Quirks:** Taps chest plate when thinking. Small optic flickers when surprised. Sparks from bad shoulder when bumping doorframes.

**DENT's Voice by Repair Level:**

**30-50% (Early Game — Prologue through Ch 3):**
- Simple, glitchy, uncertain
- *"Vin. Hull. Breach. Repair. Now."*
- *"Calculating. [pause] Probability of success: low. Very low."*
- Occasional system restarts mid-sentence
- Helpful but limited — can't offer complex advice

**50-80% (Mid Game — Ch 4 through Ch 8):**
- Confident, witty, curious
- *"I've analyzed seventeen ways this could go wrong. Would you like them in alphabetical order or by likelihood of death?"*
- *"Vin, I appreciate your optimism. It's mathematically unfounded, but I appreciate it."*
- Starts asking questions he shouldn't: *"Why is my memory file growing? I haven't logged anything unusual... that I remember."*
- Full TARS-style humor, protective of Vin

**80-100% (Late Game — Ch 9 through Ch 14):**
- Full personality, emotionally present, fiercely loyal
- *"Vin, I don't care what the math says. We're not leaving without that neural stabilizer. I'm not losing you to another rollback."*
- *"You've died four times in the last two hours. I've counted. You haven't. That concerns me."*
- The devastating reveal: *"My memory file is larger than it should be."*
- Willing to sacrifice himself for Vin

#### DENT Repair System

**Minor Repairs (8-10 items scattered in Chapters 1-8, player chooses 4-6 max):**

| Upgrade | Requires | Unlocks | Where Found |
|---------|----------|---------|-------------|
| **Right Arm Actuator** | Servo motor + power coupling | Physical task assistance (doors, heavy objects, zero-G stabilization) | Ch 1 (derelict), Ch 3 (SIC cache) |
| **Secondary Optic** | Optical sensor + calibration chip | Spots hidden items, alternate paths, environmental hazards | Ch 2 (asteroid), Ch 4 (Folder ship) |
| **Welding Torch** | Fuel cell + torch assembly | Independent ship repairs during time-sensitive sequences | Ch 3 (salvage), Ch 5 (station) |
| **Memory Cache** | Data module + cooling unit | Better dialogue, backstory recall, catches simulation inconsistencies | Ch 4 (Folder trade), Ch 6 (derelict) |
| **Mobility Servos** | Hydraulic system + stabilizer | EVA alongside Vin, reaches distant areas, scouting | Ch 5 (station shop), Ch 7 (wreckage) |
| **Vocal Processor** | Audio chip + resonator | Personality deepens, humor sharpens, emotional range expands | Ch 6 (hidden cache), Ch 8 (rare find) |

**Major Repairs (Story-gated, everyone gets these):**

| Repair | Chapter | Requires | Unlocks | Story Impact |
|--------|---------|----------|---------|--------------|
| **Sensor Array Reconnection** | Ch 5-6 | Relay module (Folder cache or SIC wreckage) | Detects Echo signals, analyzes anomalies, full ship diagnostics | Vin and DENT can now discuss the simulation actively |
| **Neural Core Restoration** | Ch 8-9 | Processing unit (Coherence Net crisis or Kade alliance) | 80-90% capacity, full combat effectiveness, complex problem-solving | DENT becomes truly capable, witty, emotionally present |
| **Deep Memory Unlock** | Ch 11-12 | Vin's Neural >70 + Data bridge (found near Core Anomaly) | Full history including previous cycle memories | The devastating realization before final scene |

### The SICs (Spatial Integrity Coalition) — Primary Antagonist Force
- **Authority:** Operate under Exigent Cohesion Mandate (ECM) — near-absolute power.
- **Doctrine:** Zero-Tolerance Protocol — spacetime stability is non-negotiable. Folding = cosmic terrorism.
- **CS Parallel:** The simulation's firewall/anti-virus. Exception handlers eliminating errors before system crash.
- **They don't know:** They're unwitting puppets of the Simulator.

**SIC Technology:**
| Tech | Purpose | Cost (to player if hit) | CS Parallel |
|------|---------|------------------------|-------------|
| Coherence Scrambler | Focused anti-curvature pulse. Rewrites Null back to inert energy. | Loses 5-10 Null cells, 10-15 HP | Kernel-level patch |
| Coherence Net | Area-denial weapon. Flattens spacetime across entire sector. | Fold drive disabled until Net breach | System-wide firewall |
| Chronometric Dampeners | Track Vin's signature without Blips | Detection range increases | Stealth monitoring |
| Neural Interrogation | Forced memory dump (if captured) | Lose flashback progress, -20 Neural | Memory wipe command |

### The Folders — Secondary Antagonists / Reluctant Allies
- **Motivation:** Exploit the Core Anomaly (the "Render Cache").
- **Style:** Tactical folding (quick jumps, decoys). Ships built for brute force.
- **Conflict:** Inevitable betrayal, but need each other to breach the Coherence Net.

### Named Characters

**Director Graves** (SIC Antagonist)
- Corporate enforcer. Calm, authoritative, terrifying because he's reasonable.
- Voice: *"Mr. Vin. I'm not here to threaten you. I'm here to explain why your cooperation is inevitable. The Coherence Net goes live in six hours. You have until then to decide if you'd like to be inside it or outside it."*
- Genuinely believes folding will unravel reality. He's right that it's dangerous — wrong about why.

**Kade** (Folders Leader)
- Charismatic, funny, dangerous. Runs his cell like a startup.
- Voice: *"Look, I'm gonna screw you over eventually. We both know it. But right now? We need each other. So let's be friends until we're not."*
- Doesn't care about science. Cares about Null. The Core Anomaly is the biggest score in history.

---

## 4. THE SCIENCE

### Science Exposition — Three-Tier System

**CRITICAL: Every science concept must be presented at all three tiers.**

**Tier 1 — Story Level (REQUIRED, everyone gets this):**
DENT explains simply in dialogue. Player ALWAYS understands what they need to do and why.
- Example: *"The fold drive bends space. We need 15 Null cells minimum to initialize. We have 8."*

**Tier 2 — Vin's Internal Monologue (OPTIONAL, for curious players):**
When Vin examines tech, his thoughts go deeper. There if you read it, not required to progress.
- Example: *"Casimir-generated negative energy density — the coils restrict virtual particle wavelengths in the vacuum chamber, creating just enough repulsive gravity to curve spacetime outward. Textbook Alcubierre metrics, scaled down to ship-size. We're not moving. Space is."*

**Tier 3 — Data Logs & Terminals (OPTIONAL, for the nerds):**
Optional ship logs, research notes, DENT's technical readouts. Full Weir-level breakdowns.
- Example: Ship terminal displays Vin's old research notes with equations, Casimir plate separation calculations, negative energy density thresholds, CTC formation math.

**How to implement:**
- Tier 1: Every puzzle/challenge includes a DENT explanation
- Tier 2: `examine` commands on tech items trigger Vin's monologue
- Tier 3: Optional terminals/logs scattered in exploration (marked with `[TECHNICAL LOG]`)

---

## 5. TECHNOLOGY & ITEMS

### The Torquer
- **Design:** Two-section forearm brace. Proximal (Orange, Reactor) + Distal (Blue, Generator). Strapped to forearm, hand free.
- **Storage:** Holds max 10 Null cells when loaded. Auto-draws from ship when aboard.
- **Three uses:**
  1. **Tactical Fold:** Short-range teleport, 1-2 cells per use
  2. **Shield:** Blocks one attack, 3-5 cells, temporary barrier
  3. **Force Fold:** Heavy story moment, 8-12 cells
- **Charge mechanic (combat only):** Starts at 0% after major use. Takes 4-5 combat rounds to reach 100%. Can use at partial charge (reduced effectiveness, risk of failure).

**Off-ship Torquer loading:**
When leaving The Vex for EVA/boarding/station visit:
```
DENT: "Vin. Loading Torquer reserves?"
[Current: 3/10 cells]

> Load 10 cells (full, safe — ship drops to 13 cells)
> Load 5 cells (balanced — ship keeps 18 cells)
> Load 0 cells (ship priority — Torquer unusable off-ship)
```

### The Vex (Ship)
**Systems:**
- **Fold Drive:** Min 15 cells to initialize. Costs 15-35 cells per jump depending on distance.
- **Null Core:** Max capacity 100 cells. Current: 8 cells (post-Ch1).
- **Gravity Drive:** Conventional propulsion. 0 cells, but slow (hours vs seconds).
- **Hull Integrity:** Tracked as percentage. Critical <20%. Current: 62%.
- **Life Support:** Oxygen, temperature, pressure. Can be damaged.

### Null Energy Economy

**The Unit: Null Cells** (standardized physical containers, stackable, tradeable)

**Costs:**
| Action | Cells | Notes |
|--------|-------|-------|
| Ship Fold (short, intra-system) | 15-20 | Min 15 to initialize |
| Ship Fold (long, inter-system) | 25-35 | Deep space jumps |
| Torquer Tactical Fold | 1-2 | Combat repositioning |
| Torquer Shield | 3-5 | Blocks one attack |
| Torquer Force Fold | 8-12 | Big story moments |
| Gravity Drive | 0 | Slow but free |

**Sources by Chapter:**

**Chapters 1-2 (Scarcity):**
- Asteroid mining: 5-8 cells per operation
- Derelict salvage: 10-15 cells (one-time)
- Hidden ship caches: 5 cells

**Chapters 3-5 (Scarcity + Danger):**
- SIC cache raids: 15-20 cells (combat risk)
- Folder black market: 10-15 cells (trade items)
- Beacon station reserves: 20 cells (trespassing risk, alarms)

**Chapters 6-9 (Managed Scarcity):**
- Large salvage ops: 20-30 cells
- Kade's "alliance gift": 15 cells (comes with debt)
- Experimental mining (Render Gap zones): 30-40 cells (dangerous)

**Chapters 10-12 (Abundance):**
- Core Anomaly proximity: +3-5 cells per chapter segment (passive regen)
- Coherence Net breach: 50 cells (windfall)
- Folder alliance supplies: 30 cells (conditional)

**Chapters 13-14 (Endgame):**
- Unlimited generation at Core Anomaly (economy no longer matters)

### Key Story Items

**Progress Gates (Required to advance):**
| Item | Chapter | Purpose | Where Found |
|------|---------|---------|-------------|
| **Fuel Regulator Bypass** | Ch 1→2 | Unlocks fold drive | Cargo hold or refueling mission |
| **Navigation Data** | Ch 2→3 | Coordinates for next jump | Decoded from Echo signal |
| **Folder Frequency Code** | Ch 4→5 | Contact Kade's network | Ch 4 Folder intercept |
| **Deep Space Nav Chart** | Ch 5→6 | Plot beyond mapped space | Station purchase/theft |
| **Temporal Stabilizer** | Ch 7→8 | Survive temporal bleed | Assembled from Ch 7 salvage |
| **Core Anomaly Beacon Signal** | Ch 8→9 | Final coordinates | DENT's sensor array (major repair) |
| **Coherence Net Disruptor** | Ch 9→10 | Breach the Net (prototype) | Built with Kade's specs + SIC tech |
| **Counter-Pulse Charge** | Ch 11→12 | Disable Net (final) | Folder alliance contribution |
| **Data Bridge** | Ch 13→14 | DENT's deep memory unlock | Found in Bulk Dimension |

**Optional/Utility Items (advantages, not gates):**
| Item | Function | Found |
|------|----------|-------|
| **EVA Suit Patch Kit** | Repair suit damage (-HP prevention) | Common, multiple locations |
| **Signal Amplifier** | Detect hidden Echo fragments | Station shop or SIC cache |
| **Stealth Module** | Reduce SIC detection range | Folder trade or salvage |
| **Medical Kit** | Restore 20-30 HP | Common |
| **Neural Stabilizer** | Restore 15-20 Neural | Rare (2-3 in game) |

### Inventory Rules
- **On The Vex:** Unlimited storage (ship cargo).
- **Off-ship:** 8 item slots. Torquer doesn't count. Player must choose what to bring.

---

## 6. GAME STRUCTURE & CHAPTERS

### Full Chapter Arc with Truby Beat Mapping

| Ch | Title | Key Story Content | Truby Beats | Player Variance | Convergence | Status |
|----|-------|-------------------|-------------|-----------------|-------------|--------|
| **P** | Cold Boot | Wake, explore Vex, DENT boot | #1, #2 (Self-revelation, Ghost) | Exploration order | All paths see flashbacks | ✅ BUILT |
| **1** | Dead in the Water | Repair, refuel (derelict vs asteroid), depart | #4, #6 (Inciting event, Ally) | Derelict vs asteroid, DENT repairs chosen | Fold drive unlocked, departure | ✅ BUILT |
| **2** | Signal from the End | Decode Echoes, first ship fold, Blip | #5, #9 (Desire, First revelation) | Fold timing, exploration depth | Echoes decoded, fold executed | 📋 Next |
| **3** | Breaching the Charter | Post-fold Blip, SIC detection, evasion | #10, #11 (Plan, Opponent counterattack) | Fight/flee/negotiate with SIC patrol | Escape, SICs now actively hunting | 📋 Next |
| **4** | Coherence Scramblers | Graves contact, Folder intercept (Kade) | #7, #8 (Opponent, Fake-ally) | Graves negotiation, Kade terms | Graves remembers you, Kade tracking | 📋 Next |
| **5** | Fugitive Trajectory | Station stop, Sensor Array repair, escape solar system | #12 (Drive) | Station approach, trade choices | Major DENT repair, out of Sol | 📋 Planned |
| **6** | The Low-Res Universe | Deep space isolation, Render Gap discovery | #16 (Audience revelation begins) | Exploration tempo | Render Gap observed | 📋 Planned |
| **7** | The Ghost in the Machine | Temporal bleed, SIC attack, ghost Vin | #13 (Attack by opponent) | Combat choices, resource use | Temporal Stabilizer acquired | 📋 Planned |
| **8** | The Unnatural Cache | Reach Core Anomaly, captured by Graves OR escape | #14, #17 (Apparent defeat, Third revelation) | Capture vs escape path | Either: Torquer lost, Neural Core repair | 📋 Planned |
| **9** | The Coherence Net | Trapped by Net (all folding disabled), Kade trapped too | #11, #14 (Counterattack, Apparent defeat) | Resource mgmt during lockdown | Alliance becomes necessary | 📋 Planned |
| **10** | Calculating the Betrayal | Forced alliance, build Net Disruptor, retrieve Torquer | #13, #15 (Attack by ally, Second revelation) | Alliance terms, who betrays first | Disruptor built, Torquer retrieved | 📋 Planned |
| **11** | System Integrity: CRITICAL | Breach Net, three-way battle, Counter-Pulse | #15 (Second revelation) | Combat tactics, resource allocation | Net breached, all factions desperate | 📋 Planned |
| **12** | The Physics of the Paradox | Initiate Folded Fold, reality breakdown | #18, #19 (Visit to death, Battle) | Manual fold execution, multiple stages | Folded Fold succeeds | 📋 Planned |
| **13** | The Overseer's Domain | Bulk Dimension, simulation evidence overwhelming | #17, #20 (Third revelation, Self-revelation) | Exploration of Bulk, discovery pace | Vin suspects cycles, Data Bridge found | 📋 Planned |
| **14** | Final Protocol: Cycle N+1 | Send Echoes (3 choices converge), loop closes | #21, #22 (Moral decision, New equilibrium) | Send/refuse/destroy choice | All send Echoes, tone differs | 📋 Planned |

### Flashback Schedule (Hail Mary Structure)
- **Prologue-Ch1:** Fragment flashbacks (broken memories)
- **Ch2-4:** Detailed flashbacks (full italic scenes, triggered by relevant events)
- **Ch5-8:** One or two playable flashbacks (control past-Vin, gated by Neural stat)
- **Ch9+:** Flashbacks stop. Memory restored. But inconsistencies appear.

---

## 7. PLAYER CHOICE SYSTEM

### Reed's Choice Validation (The 5 Tests)

**Every player choice must pass at least 3 of these 5 tests:**

1. **Understanding Test:** Does the choice reflect player's knowledge of the world?
   - ✅ Good: "Fold now (18 cells) vs Gravity Drive (0 cells, slower)" — player understands tradeoff
   - ❌ Bad: "Press A or B" — no context, arbitrary

2. **Consequence Test:** Does the choice ripple forward?
   - ✅ Good: Repair DENT's optic → spots hidden path in Ch 5
   - ❌ Bad: "Pick door color" → cosmetic only

3. **Strategy Test:** Are multiple approaches valid (not "right" vs "wrong")?
   - ✅ Good: Derelict (lore + risk) vs Asteroid (safe + fast) — both work
   - ❌ Bad: One choice is obviously better → illusion of choice

4. **Character Test:** Does it reflect/develop Vin or DENT?
   - ✅ Good: Trust DENT's advice vs override him → shapes relationship
   - ❌ Bad: Generic decision any protagonist would make

5. **Tone Test:** Does it maintain technical tension / dry humor?
   - ✅ Good: DENT quips during tense choice → Andy Weir/TARS humor
   - ❌ Bad: Breaks immersion or feels out-of-character

**How to validate:**
```
CHOICE: [description]
Tests:
- [ ] Understanding: [explain context player has]
- [ ] Consequence: [what ripples forward]
- [ ] Strategy: [multiple valid paths?]
- [ ] Character: [develops Vin/DENT?]
- [ ] Tone: [maintains voice?]

Passes: X/5 (need 3+)
```

### Converging River Model
- All paths lead to same major beats (Graves encounter, Kade contact, Core Anomaly, loop closure)
- Player's **toolkit differs** (stats, items, DENT repairs, knowledge, relationships)
- Choices affect **experience of beats**, not whether beats occur

---

## 8. GAME MECHANICS

### Stats & Consequences

**Player (Vin):**
- **Health (HP):** 0 = rollback. Combat/EVA/environmental damage.
- **Neural:** Mental clarity. Low = harder puzzles, fewer dialogue options, simulation evidence harder to see.
- **Stress:** High = riskier choices available, snappier dialogue, DENT reacts differently.

**Ship (The Vex):**
- **Hull:** 0% = rollback. Combat/collision damage.
- **Null Cells:** 0-100. Determines travel/combat options.
- **Fold Status:** LOCK (needs bypass) / READY (15+ cells) / ACTIVE (mid-fold)

### Rollback System (No Death)
- **Critical failure** → Screen tears, "Blip" glitch effect → Return to last auto-save
- **Each rollback costs:** -10 Neural, +15 Stress
- **DENT reacts:** *"Vin. Did you just... did we just do this already?"*
- **Subtle changes:** Moved objects, slightly different dialogue, timestamps wrong
- **Late game:** Vin starts noticing, DENT's logs don't match

### Save System
- **One save slot.** Auto-saves at decision points and chapter starts.
- **No manual saves.** No save scumming.
- **Rollbacks overwrite.** Can't go back to before a rollback.

---

## 9. THE SIMULATION LAYER

### Organic Connection (Truby's Web)

**Every element has TWO explanations:**

| Element | In-Universe Justification | Simulation Connection |
|---------|---------------------------|----------------------|
| **SICs** | Legal enforcers preventing spacetime damage | Exception handlers/anti-virus |
| **Folders** | Criminals exploiting folding for profit | Users exploiting a bug |
| **Echoes** | Signals from Vin's future self | Shellcode injection from future cycle |
| **Null scarcity** | Difficult to generate negative energy | Computational resource throttling |
| **Blips** | Physics anomalies from folding | Rendering stutters from processing load |
| **Rollbacks** | Vin's subjective experience of death/failure | Save state restoration |
| **DENT's memory growth** | Corrupted data from Blips | Recording multiple cycle iterations |
| **Render Gap** | Insufficient sensor resolution at distance | Low-res rendering to save compute |
| **Coherence Net** | SIC area-denial weapon | System-wide firewall patch |

**The Truby Test:** Can you explain this element without mentioning simulation? If yes, it's organically connected. If no, it's too on-the-nose.

### Simulation Evidence Schedule

**Chapters 1-5 (Subtle):**
- Minor text glitches during folds
- Objects in wrong positions
- DENT's occasional déjà vu
- Background hum too regular

**Chapters 6-10 (Growing):**
- Screen tears during folds
- Render Gap discovery (star patterns repeat)
- Temporal bleed (overlapping past/future text)
- Physics anomalies (gravity wrong, object duplication)

**Chapters 11-14 (Unsettling):**
- Full screen corruption
- DENT's memory file observation
- Rollback dialogue changes accumulate
- Bulk Dimension: sterile, unfinished, computational

**The Ending:**
- No explicit "AGENT VIN" reveal
- Vin doesn't remember choosing to send Echoes
- DENT: *"My memory file is larger than it should be."*
- Title card: `Cycle N // Agent: VIN`
- Game ends on question, not answer

---

## 13. TONE & WRITING STYLE

### Scene Writing Checklist (MANDATORY for every scene)

**Every scene must contain all 4 elements:**

1. **Advance Understanding** — What does the player learn?
   - World-building, character depth, mystery clue, or mechanic tutorial
   - Test: If this scene were removed, what would the player miss?

2. **Provide Agency** — What choice does the player make?
   - Even if small (dialogue tone, exploration order, resource use)
   - Test: Could this be a cutscene, or does the player need to DO something?

3. **Create Consequence** — How does this ripple forward?
   - Immediate (this scene) or delayed (later chapter)
   - Test: Does this connect to other story elements (Truby's web)?

4. **Maintain Tone** — Does it sound like Andy Weir/TARS/Maze Runner?
   - Vin: Technical precision + dry humor
   - DENT: Deadpan loyalty + wit (scaled to repair level)
   - Test: Read dialogue aloud. Does it sound like these characters?

**Validation example:**
```
SCENE: Vin discovers Fuel Regulator Bypass in cargo

1. ✅ Advance: Player learns why fold drive is locked, how to fix it
2. ✅ Agency: Player chose where to search first (cargo vs engineering)
3. ✅ Consequence: Finding it unlocks Chapter 2's fold
4. ✅ Tone: Vin's monologue: "Fuel regulator bypass. Of course. Because 
   simply having fuel isn't enough — the universe demands bureaucratic 
   approval before bending spacetime."

APPROVED: All 4 elements present.
```

### Character Voice Reference

**Vin (Internal Monologue):**
```python
# Technical precision + dark humor
"The hull breach is 40cm wide. That's 'catastrophic' in engineering 
terms, which is a polite way of saying 'we're about to die.'"

# Calculating odds under pressure
"Three cells short. In space, that's the difference between 'we're 
fine' and 'archaeological discovery in 10,000 years.'"

# Treating physics like code
"Casimir Effect scaling isn't elegant. It's brute-force energy input 
until the vacuum complies. Inelegant, but it works."
```

**DENT (Dialogue by Repair Level):**
```python
# 30-50% (Early): Simple, glitchy
"Vin. Hull breach. Sector... [static] ...seven. Repair. Now."

# 50-80% (Mid): Witty, confident
"I've calculated seventeen ways this could go wrong. Would you like 
them alphabetically or by likelihood of death?"

# 80-100% (Late): Emotionally present, protective
"Vin, I don't care what the math says. We're not leaving without 
that stabilizer. I'm not losing you to another rollback."
```

**Graves (SIC Antagonist):**
```python
# Calm, corporate, terrifying
"Mr. Vin. I'm not here to threaten you. I'm here to explain why your 
cooperation is inevitable. The Coherence Net goes live in six hours."
```

**Kade (Folders Leader):**
```python
# Charismatic, openly dangerous
"Look, I'm gonna screw you over eventually. We both know it. But 
right now? We need each other. So let's be friends until we're not."
```

---

## 16. NARRATIVE EXECUTION FRAMEWORK

### 16.1 Truby's 22 Building Blocks (The Web)

These are NOT sequential chapters. They are **narrative beats** that can occur in any order. Multiple beats can hit in one chapter. The player's path determines the ORDER, but all beats must eventually hit.

| Beat # | Truby Step | Our Story | Chapter(s) | Player Variance |
|--------|------------|-----------|------------|-----------------|
| 1 | Self-revelation, need, desire | Vin wakes, needs to understand | Prologue | None (all players) |
| 2 | Ghost & story world | Flashbacks: attack, Echoes, Torquer | P, 1-5 | Order/depth varies |
| 3 | Weakness & need | Vin treats universe as code, blind to cost | Ongoing | Revealed through choices |
| 4 | Inciting event | Decision to leave sector | Ch 1 | Derelict vs asteroid |
| 5 | Desire | Close the loop, send Echoes back | Ch 2-3 | Established post-fold |
| 6 | Ally | DENT's loyalty solidifies | Ch 2-4 | Shaped by repair choices |
| 7 | Opponent & mystery | Graves/SICs + "why am I compelled?" | Ch 3-5 | Graves encounter timing |
| 8 | Fake-ally opponent | Kade/Folders alliance | Ch 4-10 | Alliance terms differ |
| 9 | First revelation & decision | Echoes = future Vin's knowledge | Ch 5-6 | Sensor array timing |
| 10 | Plan | Execute Folded Fold at Core Anomaly | Ch 6-7 | Same plan, diff resources |
| 11 | Opponent's plan & counterattack | Coherence Net deployed | Ch 9 | Preparation level differs |
| 12 | Drive | Desperation increases, options narrow | Ch 8-9 | Capture vs escape path |
| 13 | Attack by ally | Kade's betrayal (or Vin's) | Ch 10-11 | Who betrays first varies |
| 14 | Apparent defeat | Trapped in Net, hunted, low resources | Ch 9-10 | Same despair, diff resources |
| 15 | Second revelation & decision | Forced alliance to breach Net | Ch 10 | Same alliance, diff terms |
| 16 | Audience revelation | Player realizes simulation (rollbacks, DENT's memory, glitches) | Ch 11-12 | Vin doesn't see it yet |
| 17 | Third revelation & decision | Vin suspects previous cycles | Ch 12 | DENT memory file observation |
| 18 | Gate, gauntlet, visit to death | Folded Fold, entering Bulk Dimension | Ch 13 | Same sequence, diff tone |
| 19 | Battle | Existential: send Echoes or resist? | Ch 13-14 | Three choices converge |
| 20 | Self-revelation | Vin can't remember choosing to send | Ch 14 | Same for all |
| 21 | Moral decision | Three ending choices, all converge | Ch 14 | Tone differs, outcome same |
| 22 | New equilibrium | Loop closes, Cycle N+1, question remains | Ch 14 | Same ending, emotional weight varies |

### 16.2 Reed's IF Design Principles

**Meaningful Choice Architecture:**
- Choices reflect player understanding (not blind guessing)
- Multiple valid strategies (not right/wrong binary)
- Consequences ripple forward (not cosmetic)

**Pacing When Player Controls Tempo:**
- **Story-gated reveals:** Always hit (Graves, Kade, Net, Fold)
- **Exploration-gated reveals:** Player chooses depth (flashbacks, logs, clues)
- **Stat-gated reveals:** Emerge from gameplay (rollback changes, high-stress dialogue, DENT memory observations)

**Exploration as Reward:**
- Every room teaches (lore, character, mystery) OR gives (item, stat, advantage)
- No empty padding
- Test: Would a player who explores be annoyed? If yes, cut it.

**Managing Agency vs Structure:**
- Player controls: Exploration order, resource allocation, tactical choices, dialogue tone, DENT build
- Story controls: Major beats, character arcs, the ending, simulation reveal accumulation

**Designing for Unintended Behavior:**
- Don't block the player. Redirect.
- Example: Player hoards Null, never uses Torquer → Encounters become harder, DENT comments, but game doesn't punish

**Accessibility vs Mastery:**
- Tier 1: Everyone gets story
- Tier 2: Curious players get depth
- Tier 3: Nerds get technical detail

### 16.3 The Scene Writing Template

Use this structure for EVERY scene you build:

```python
def scene_name(state):
    """
    Brief description of scene purpose.
    
    VALIDATION:
    - Advance: [what player learns]
    - Agency: [choice player makes]
    - Consequence: [ripple effect]
    - Tone: [Weir/TARS/Maze Runner maintained]
    
    Truby beats: [#X, #Y if applicable]
    Reed tests: [which 3-5 tests the main choice passes]
    """
    
    # 1. SETUP: Establish context
    # - Where is Vin?
    # - What's the immediate situation?
    # - What does DENT say/do?
    
    # 2. EXPLORATION: Player agency
    # - Multiple examine targets
    # - Tier 2/3 depth available via examine
    # - Items/clues discoverable
    
    # 3. CRISIS/CHOICE: The decision point
    # - Present choice with context (Reed Test #1: Understanding)
    # - Multiple valid options (Reed Test #3: Strategy)
    # - Connect to character (Reed Test #4: Character)
    # - Maintain voice (Reed Test #5: Tone)
    
    # 4. CONSEQUENCE: Immediate result
    # - Show impact (stat change, item gained, path fork)
    # - DENT reacts (consistent with repair level)
    # - Advance the mystery (Truby's web)
    
    # 5. TRANSITION: Set up next scene
    # - Log consequence to state
    # - Flag for future ripple
    # - Advance understanding (Reed principle)
```

### 16.4 Pre-Build Validation Checklist

**MANDATORY: Complete this BEFORE writing any code for a chapter.**

```markdown
## PRE-BUILD VALIDATION: Chapter [X] — [Title]

### 1. Truby Beat Mapping
Which of the 22 building blocks does this chapter hit? (List 2-4)
- [ ] Beat #__: [description]
- [ ] Beat #__: [description]

### 2. Organic Connection Check (Truby)
For each new element (character, item, location, mechanic):
| Element | In-Universe Reason | Simulation Connection | Pass? |
|---------|-------------------|----------------------|-------|
| [Name] | [Why it exists in story] | [How ties to meta] | Y/N |

### 3. Major Choices (Reed's 5 Tests)
List all major player choices. Each must pass 3/5 tests.

**Choice 1: [Description]**
- [ ] Understanding: [Player has context]
- [ ] Consequence: [Ripples to: ___]
- [ ] Strategy: [Multiple valid: ___]
- [ ] Character: [Develops: ___]
- [ ] Tone: [Maintains voice: ___]
**Passes: __/5** (need 3+)

[Repeat for each major choice]

### 4. Scene Checklist
For each scene:
| Scene | Advances | Provides Agency | Creates Consequence | Maintains Tone | Pass? |
|-------|----------|----------------|-------------------|---------------|-------|
| [Name] | [Learning] | [Choice] | [Ripple] | [Voice] | Y/N |

### 5. Exploration Reward Audit
For each location/object:
| Location | Teaches (what?) | Gives (what?) | Pass? |
|----------|----------------|--------------|-------|
| [Name] | [Lore/mystery/mechanic] | [Item/stat/advantage] | Y/N |

Must not be empty padding.

### 6. Three-Tier Depth Check
- **Tier 1 (Required/Story):** [DENT's simple explanations, all players get this]
- **Tier 2 (Optional/Curious):** [Vin's monologue, deeper science, for explorers]
- **Tier 3 (Optional/Mastery):** [Technical logs, equations, for nerds]

All three present? [ ] Yes / [ ] No

### 7. Converging River Validation
- **Critical path beats:** [List unavoidable story moments]
- **Player variance:** [List what changes based on earlier choices]
- **Convergence point:** [Where all paths reunite]

All paths lead to same key beats? [ ] Yes / [ ] No

### 8. Stat/Economy Validation
- **Expected state entering chapter:** HP:__, Neural:__, Stress:__, Null:__, Hull:__%
- **Expected state exiting chapter:** HP:__, Neural:__, Stress:__, Null:__, Hull:__%
- **Null sources this chapter:** [List where/how player gets cells]
- **Null sinks this chapter:** [List where/how player spends cells]

Economy balanced? [ ] Yes / [ ] No

---

**VALIDATION STATUS:** [ ] PASSED — Ready to build / [ ] FAILED — Redesign required

**Validated by:** [Name]
**Date:** [YYYY-MM-DD]
```

### 16.5 Post-Build Review Checklist

**MANDATORY: Complete this AFTER building a chapter.**

```markdown
## POST-BUILD REVIEW: Chapter [X] — [Title]

### 1. Truby Web Test
- [ ] Every element connects to at least one other element
- [ ] No isolated content (all ties to simulation or character arc)
- [ ] Removal of any element would weaken the whole

### 2. Reed Playthrough Test
Play through (or simulate) all major paths:
- [ ] Choices feel meaningful (player can justify them)
- [ ] Exploration is rewarding (not mandatory padding)
- [ ] Pacing works regardless of player tempo
- [ ] Unintended behavior handled gracefully (no softlocks)

### 3. Reference Alignment
- [ ] Andy Weir: Technical problem-solving present
- [ ] TARS: DENT's humor lands (appropriate to repair level)
- [ ] Maze Runner: Institutional pressure maintained
- [ ] Subnautica: Environmental storytelling clear

### 4. Code vs Bible Check
- [ ] All items match Section 5 specs (names, effects, costs)
- [ ] All stats match Section 8 specs (HP, Neural, Stress, Null, Hull)
- [ ] Dialogue matches Section 13 voice guidelines (Vin, DENT, Graves, Kade)
- [ ] Simulation clues match Section 9 schedule (subtle/growing/unsettling)

### 5. Scene Checklist Verification
Review every scene:
- [ ] All scenes advance understanding
- [ ] All scenes provide agency
- [ ] All scenes create consequence
- [ ] All scenes maintain tone

### 6. Integration Test
- [ ] Chapter imports cleanly (`from scenes.chapterN import run`)
- [ ] State transitions work (Ch N-1 → Ch N → Ch N+1)
- [ ] All choices log to state correctly
- [ ] Save/load works with new state variables

### 7. Typo/Polish Pass
- [ ] No typos in player-facing text
- [ ] No placeholder text (TODO, FIXME, etc.)
- [ ] ASCII art displays correctly
- [ ] Audio cues trigger appropriately

---

**REVIEW STATUS:** [ ] APPROVED — Ready to ship / [ ] NEEDS REVISION

**Reviewed by:** [Name]
**Date:** [YYYY-MM-DD]
```

### 16.6 Integration Examples (How Principles Apply)

**Example 1: Designing a Choice (Ch 3 SIC Encounter)**

**Setup:** Graves contacts The Vex. SIC ships closing in. DENT detects Coherence Scramblers armed.

**The Choice:**
```
DENT: "Vin. Three SIC interceptors. 40 seconds to weapons range."

Graves (comms): "Mr. Vin. You have one chance to comply. Power down 
your fold drive and prepare for boarding."

[Current Null: 23 cells]

> Comply (surrender — fake-out, leads to pursuit)
> Negotiate (buy time for DENT to plot escape route)
> Fold away (costs 18 cells, immediate escape, Graves remembers this)
```

**Reed's 5 Tests:**
1. ✅ **Understanding:** Player knows Null cost, SIC threat, Graves' authority
2. ✅ **Consequence:** 
   - Comply → Chapter 4 opens with narrow escape, resource loss
   - Negotiate → DENT plots course, +1 Neural (thinking clearly)
   - Fold → Graves becomes personal antagonist, mentions this in Ch 8
3. ✅ **Strategy:** All three are valid depending on playstyle (cautious/clever/aggressive)
4. ✅ **Character:** Tests Vin's pragmatism vs defiance. DENT reacts differently to each.
5. ✅ **Tone:** Graves' calm menace (Maze Runner pressure), Vin's odds-calculation under fire (Weir)

**Passes 5/5. APPROVED.**

---

**Example 2: Building a Scene (Ch 6 Render Gap Discovery)**

```python
def render_gap_observation(state):
    """
    Vin observes distant star field through ship sensors.
    Stars are too orderly. Patterns repeat. First major simulation clue.
    
    VALIDATION:
    - Advance: Player sees first undeniable evidence (Tier 1: subtle, Tier 2: Vin's doubt, Tier 3: sensor logs)
    - Agency: Player chooses how deeply to investigate (examine stars, check logs, ask DENT)
    - Consequence: If investigated deeply, unlocks dialogue in Ch 7 about simulation
    - Tone: Vin's scientific unease, DENT's growing curiosity (60% repair level)
    
    Truby beats: #16 (Audience revelation begins)
    Reed tests: Understanding (player has context), Consequence (ripples to Ch 7), Tone (Weir-style observation)
    """
    
    # 1. SETUP
    display.show("The Vex drifts. You've been in deep space for three days.")
    display.show("DENT is running long-range scans. The sensors hum softly.")
    
    if state.dent_repair_level >= 60:
        dent.say("Vin. I've completed the stellar cartography sweep.")
        dent.say("Something's... odd.")
    else:
        dent.say("Scan... complete. Results... [processing].")
    
    # 2. EXPLORATION (Player agency)
    choice = display.choice([
        "Examine the scan results",
        "Check the sensor logs (Tier 3)",
        "Ask DENT what he means",
        "Ignore it, focus on navigation"
    ])
    
    if choice == 0:  # Examine results
        # TIER 1: Everyone gets this
        display.show("The star field displays on your console.")
        display.show("At first glance, it's beautiful. Thousands of distant points.")
        display.show("But then you notice: the patterns repeat.")
        display.show("Constellation 4471-A and 8832-C are identical.")
        display.show("Not similar. Identical. Pixel-perfect.")
        
        # TIER 2: Vin's monologue (curious players)
        if player_examined_closely:  # Triggered by "examine stars" command
            display.dim("At this distance, even binary pairs should show some variation.")
            display.dim("Doppler shift, gravitational lensing, proper motion over time.")
            display.dim("But these... it's like someone copied and pasted the same cluster.")
            display.dim("Insufficient sensor resolution? Or...")
            
        state.flags['render_gap_observed'] = True
        state.neural += 5  # Clarity from observation
        
    elif choice == 1:  # Sensor logs (Tier 3)
        display.show("[TECHNICAL LOG // SENSOR ARRAY // DEEP FIELD SCAN]")
        display.show("Resolution: 0.014 arcsec (expected)")
        display.show("Pattern match: 99.97% (ANOMALOUS)")
        display.show("Hypothesis: Rendering optimization at distance >50 LY")
        display.show("Note: 'Rendering' is not a physics term. Why did I write that?")
        
        state.flags['render_gap_technical'] = True
        state.neural += 10  # Deep understanding
        
    elif choice == 2:  # Ask DENT
        if state.dent_repair_level >= 60:
            dent.say("The stars repeat. Patterns are identical across sectors.")
            dent.say("That shouldn't happen. Even with low sensor resolution,")
            dent.say("there should be *some* variation. Doppler shift. Lensing.")
            dent.say("It's like... someone didn't bother rendering them properly.")
            dent.pause()
            dent.say("That's not a scientific term. Why did I say that?")
        else:
            dent.say("Sensor... anomaly. Investigating.")
            
    else:  # Ignore
        display.show("You focus on navigation. DENT continues his analysis quietly.")
        # Player misses Tier 2/3, but Tier 1 will come up again in Ch 7
    
    # 3. CONSEQUENCE (immediate)
    if state.flags.get('render_gap_observed'):
        display.show("\nYou stare at the repeating constellations.")
        display.show("The universe is vast. Random. Chaotic.")
        display.show("These stars are... too orderly.")
        
        if state.dent_repair_level >= 60:
            dent.say("Vin. I'm logging this as an anomaly.")
            dent.say("My probability matrix says this is impossible.")
            dent.say("But here it is.")
    
    # 4. TRANSITION (set up Ch 7)
    # If player observed this, Ch 7 dialogue unlocks where DENT mentions simulation hypothesis
    
    return "navigate_deeper"  # Next scene
```

**Validation:**
- ✅ **Advances:** Player sees first hard evidence of simulation
- ✅ **Agency:** Player chooses depth of investigation
- ✅ **Consequence:** Flags set for Ch 7 dialogue unlock
- ✅ **Tone:** Vin's scientific unease (Weir), DENT's curiosity (TARS)

**Truby Web:** Ties to #16 (audience revelation), connects to earlier Blips (P, Ch 2-3), sets up DENT's memory observation (Ch 12)

**Reed Tests:** Understanding ✅, Consequence ✅, Tone ✅ (3/5, passes)

**APPROVED.**

---

## FINAL NOTES FOR BUILDERS

### When You're Stuck
1. Re-read the **Scene Writing Template** (Section 16.3)
2. Check which **Truby beat** this scene needs to hit (Section 16.1)
3. Validate your choice with **Reed's 5 Tests** (Section 7)
4. Read existing chapters (Prologue, Ch1) for structure/voice reference

### When You're Uncertain
- **Ask Jared.** The Bible is the contract, but Jared is the final authority.
- Don't guess. Don't invent. If it's not in the Bible, propose it for addition.

### Remember
- **Every element connects** (Truby's web)
- **Every choice matters** (Reed's tests)
- **Every scene serves 4 functions** (Advance, Agency, Consequence, Tone)
- **The simulation is never confirmed** (plausible deniability always)
- **DENT is the heart** (his arc is as important as Vin's)

---

**This Bible is the blueprint. Build FROM it, not around it.**

---

## 17. GAME CLIENT ARCHITECTURE (Custom Terminal)

### 17.1 Overview

The game has been migrated from a raw Python terminal to a **custom Electron game client** — a desktop application that looks like a retro CRT terminal but gives us full control over rendering, audio, effects, and distribution.

**Why:** The standard terminal cannot guarantee character alignment across fonts/platforms, has no native audio/image support, and cannot be packaged for distribution (e.g., Steam).

**Architecture:**
```
┌──────────────────────────┐       ┌──────────────────────────────────┐
│    Python Game Engine    │       │     Electron Game Client          │
│    (reference/legacy)    │       │     (primary — what players use)  │
│                          │       │                                    │
│  engine/core.py          │──────►│  js/engine/state.js    (GameState)│
│  engine/display.py       │──────►│  js/engine/terminal.js (Renderer) │
│  engine/audio.py         │──────►│  js/engine/audio.js    (Audio)    │
│  engine/art.py           │──────►│  js/art/*.js           (Art)      │
│  scenes/*.py             │──────►│  js/scenes/*.js        (Scenes)   │
└──────────────────────────┘       └──────────────────────────────────┘
```

The Python version remains as reference. The **Electron client** (`client/`) is the canonical game that players will download and play.

### 17.2 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Shell | Electron 33+ | Desktop app container, window management, file I/O |
| Frontend | HTML/CSS/JS (vanilla, ES modules) | UI rendering, game logic, scene scripting |
| Font | IBM Plex Mono (bundled) | Guaranteed monospace width — no more alignment issues |
| Audio | Web Audio API | Layered ambient + SFX with crossfading |
| Effects | CSS animations + JS | CRT scanlines, phosphor glow, screen shake, glitch |
| Save/Load | JSON via Electron IPC (or localStorage) | Auto-save at decision points |
| Distribution | electron-builder → DMG/EXE/AppImage | Steam, itch.io, direct download |
| Steam | steamworks.js (future) | Achievements, cloud saves, overlay |

### 17.3 File Structure

```
client/
├── package.json          # Electron project config + build settings
├── main.js               # Electron main process (window, IPC, saves)
├── preload.js            # Context bridge (save/load/audio API)
├── index.html            # Game page — CRT monitor structure
├── css/
│   └── game.css          # ALL styling: CRT effect, colors, menus, effects
├── js/
│   ├── app.js            # Bootstrap — creates Terminal, starts game loop
│   ├── engine/
│   │   ├── state.js      # GameState class (mirrors Python core.py)
│   │   ├── terminal.js   # Terminal renderer (mirrors Python display.py)
│   │   ├── audio.js      # AudioManager — Web Audio API
│   │   └── effects.js    # Visual effects — shake, flash, glitch, CRT
│   ├── art/
│   │   └── prologue-art.js  # Art as HTML with color spans
│   └── scenes/
│       └── prologue.js      # Prologue Phase 1 scene
└── assets/
    ├── audio/            # Sound files (.wav, .mp3, .ogg)
    └── fonts/            # Bundled fonts for offline/Steam
```

### 17.4 Running the Client

```bash
cd client
npm install        # First time only
npm start          # Launches the game in Electron
```

### 17.5 The Terminal API

Scene files are async JavaScript functions that receive the game systems:

```javascript
export async function myScene(terminal, state, effects, audio) {
  await terminal.narrate("Something happens.");
  await terminal.dent("I have an observation.");

  const choice = await terminal.arrowMenu(
    ["Option A", "Option B"],
    ["Description of A.", "Description of B."]
  );

  if (choice === 0) {
    state.setFlag('chose_a');
    await terminal.thought("I chose wisely.");
  }
}
```

**Terminal methods (all async where noted):**

| Method | Description |
|--------|-------------|
| `narrate(text)` | Standard narration — white typewriter text |
| `narrateSlow(text)` | Slow dramatic narration |
| `dent(text)` | DENT speaks — blue, `> DENT: "..."` format |
| `dentLine(text)` | DENT continuation line |
| `dentGlitch(text)` | DENT corrupted speech (random glitch chars) |
| `dentSystem(text)` | DENT system/diagnostic message |
| `thought(text)` | Vin's internal thought — dim italic |
| `flashback(text)` | Memory fragment — gray italic |
| `warning(text)` | Red warning text |
| `highlight(text)` | Bright white emphasis |
| `system(text)` | Small system text |
| `say(text, class)` | Instant text with CSS class |
| `sayHtml(html, class)` | Instant HTML content |
| `typed(text, opts)` | Typewriter with options: speed, className |
| `blank()` | Empty line |
| `separator()` | Gray horizontal rule |
| `clear()` | Clear terminal instantly |
| `clearSmooth()` | Fade-out then clear |
| `showArt(html, opts)` | Display art piece (HTML with color spans) |
| `pause(msg)` | Wait for keypress |
| `getCommand(cmds)` | Text input — validates against command list |
| `arrowMenu(opts, descs)` | Arrow-key menu — returns selected index (0-based) |
| `chapterTitle(num, title)` | Chapter title card |
| `showStatusPanel(state)` | Show sidebar with player/ship stats |

**Effects methods:**

| Method | Description |
|--------|-------------|
| `effects.flash(color, ms)` | Screen flash: 'white', 'orange', 'red' |
| `effects.shake(ms, intensity)` | Screen shake: 'normal' or 'heavy' |
| `effects.glitch(ms)` | Glitch distortion |
| `effects.screenTear(lines, ms)` | Horizontal tear lines |
| `effects.fadeToBlack(ms)` | Fade to black overlay |
| `effects.fadeFromBlack(ms)` | Fade from black |
| `effects.powerOn()` | CRT power-on animation |
| `effects.powerOff()` | CRT power-off animation |
| `effects.bootText(terminal, lines)` | Corrupted→clean boot text |

### 17.6 Art System

Art is written as HTML strings with CSS color classes. Since we control the font (IBM Plex Mono), **every character is exactly 1 column wide**. No more Unicode alignment issues.

```javascript
const c = (cls, text) => `<span class="c-${cls}">${text}</span>`;

export function artMyScene() {
  return `<pre class="art">${c('hull', '┌──────────────────────────────┐')}
${c('hull', '│')}  ${c('orange', 'Hello, Vex.')}               ${c('hull', '│')}
${c('hull', '└──────────────────────────────┘')}</pre>`;
}
```

#### Art Alignment Rules (MANDATORY)

Every line within an art piece **must have the same visible character width**. Misaligned widths cause the `<pre>` container to render inconsistently in the terminal. These rules apply to every art function in every `js/art/*.js` file.

**Rule 1 — Uniform line width.** Strip all HTML tags from the art output. Every non-empty line must have the same character count. No exceptions.

**Rule 2 — Framed pieces.** For art with box-drawing frames (║, │, ┌, etc.), define the width formula in a comment at the top of the function:
```javascript
// W=60: ║ + 58 interior + ║
// Interior: ░░(2) + panel(6) + fill(42) + panel(6) + ░░(2) = 58
```
All interior lines must add up to the same total. Count every character including spaces, shade blocks (░▒▓), and box-drawing characters.

**Rule 3 — Frameless/atmospheric pieces.** For art without borders (starfields, glow effects, debris), pad every non-empty line to the width of the longest line. Add trailing spaces inside the last `<span>` text on each line to prevent whitespace stripping:
```javascript
// WRONG — trailing spaces outside spans may be stripped:
${c(s1,'·')}
// RIGHT — trailing spaces inside span text are preserved:
${c(s1,'·               ')}
```

**Rule 4 — Paired art must match dimensions.** Art pieces that swap via `innerHTML` during animation (e.g., artOrangeBlinkOn/Off) must have identical widths AND the same number of lines. If one is 38 wide with 18 lines, the other must be 38 wide with 18 lines.

**Rule 5 — No emoji characters.** Emoji render as double-width in monospace fonts, breaking alignment. Use single-width Unicode alternatives:
- Instead of ⚡ use `*` or `╳`
- Instead of 🔴 use `●` or `◉`
- Stick to: shade blocks (░▒▓█), box-drawing (─│┌┐└┘╔╗╚╝║═), geometric (▬▫▪◇◦●◉▄▀), and standard ASCII

**Rule 6 — Validate before committing.** Run the validation script after any art change:
```bash
cd client && node validate-art.mjs
```
Every function must report `OK`. The script strips HTML, counts visible line widths, and flags misalignment. If a function reports `MIXED` or `MISALIGNED`, fix it before committing.

**Rule 7 — Width comment.** Every art function must include a `// W=N` comment documenting its target width. This makes alignment expectations explicit and speeds up future edits.

**Color classes (base):** `c-void`, `c-faint`, `c-hull`, `c-hull-lt`, `c-dark`, `c-dim`, `c-med`, `c-ember`, `c-glow`, `c-pulse`, `c-orange`, `c-amber`, `c-red`, `c-red-bright`, `c-red-dark`, `c-red-emerg`, `c-blood`, `c-green`, `c-yellow`, `c-cyan`, `c-blue`, `c-fold`, `c-ice`, `c-white`, `c-cold`, `c-star`, `c-scar`, `c-text`.

**Color classes (extended — for detailed shading and gradients):** `c-void-lt`, `c-nebula`, `c-nebula-lt`, `c-star-1`, `c-star-2`, `c-star-3`, `c-hull-dk`, `c-hull-med`, `c-hull-brt`, `c-hull-xbrt`, `c-ember-dk`, `c-ember-med`, `c-glow-soft`, `c-glow-brt`, `c-red-dk`, `c-red-med`, `c-red-glow`, `c-wire`, `c-wire-dk`, `c-spark`.

### 17.7 Visual Design Spec

**CRT Aesthetic:**
- Background: `#0a0a12` (deep space black with blue tint)
- Scanlines: subtle repeating horizontal lines, slowly drifting
- Vignette: dark edges, lighter center
- Phosphor glow: text-shadow on colored elements
- Screen noise: very subtle animated grain
- No actual screen curvature (looks cleaner on modern displays)

**Color Palette:**
- Orange `#e8a020` — primary accent, Vin's agency, buttons, highlights
- Blue `#6688bb` — DENT's voice color, companion warmth
- Red `#cc3030` — warnings, danger, emergency, SIC
- Void `#121218` — near-invisible, darkness scenes
- Hull Gray `#3c4148` — ship metal, structural elements
- White `#c8c8d0` — standard text, narration

**Typography:**
- Font: IBM Plex Mono (Light 300, Regular 400, Medium 500, SemiBold 600)
- Base size: 16px, Line height: 1.65
- Max content width: 740px (centered)

### 17.8 Porting Scenes from Python to JS

When converting a Python scene to the JS client:

1. **Function signature:** `def my_scene(state)` → `export async function myScene(terminal, state, effects, audio)`
2. **All display calls become `await`:** `narrate("text")` → `await terminal.narrate("text")`
3. **Menus:** `arrow_menu(opts)` → `await terminal.arrowMenu(opts)` (returns 0-based index)
4. **State flags:** `state.flags["key"] = True` → `state.setFlag('key')`
5. **Art:** Convert ANSI color codes to HTML color spans (see 17.6)
6. **Pauses:** `wait(1)` → `await effects.wait(1000)`
7. **Clear:** `clear()` → `await terminal.clearSmooth()`

### 17.9 Distribution Roadmap

**Phase 1 (Current):** Proof of concept — Prologue Phase 1 in Electron client
**Phase 2:** Port all 3 prologue phases + Chapter 1-2 to client
**Phase 3:** Add full audio (ambient, SFX), bundled fonts, polished effects
**Phase 4:** Steam integration (Steamworks SDK, achievements, cloud saves)
**Phase 5:** Beta testing, packaging for Windows/Mac/Linux
**Phase 6:** Steam store page, launch

**Steam requirements:**
- Achievements (map to key story beats and optional discoveries)
- Cloud saves (via Steamworks)
- Trading cards (optional, requires art assets)
- Controller support (not needed for text adventure)
- Store assets: header capsule (460x215), library capsule (600x900), screenshots (1920x1080)

---

## 18. VISUAL ART DIRECTION & CONCEPT PIPELINE

### 18.1 Art Style Philosophy

The game's visual identity is a hybrid of two traditions:

**Hard Sci-Fi Realism** — *The Expanse*, *The Martian*, NASA-punk. Functional, believable technology. Worn surfaces, visible seams, repair patches. No fantasy glow, no sleek cyberpunk neon. Everything looks like it was engineered on a budget and maintained by someone who couldn't afford replacements.

**Retro-Futurism / Analog Sci-Fi** — *Alien* (1979), *Silent Running*, *2001: A Space Odyssey*. CRT monitors with phosphor glow, analog toggle switches, chunky physical dials. The warmth of amber readouts and the hum of cathode-ray tubes. Technology that feels tactile, not touchscreen.

**The result:** A world that looks like Ridley Scott directed a NASA documentary in 1979. Industrial, grounded, lived-in. The CRT aesthetic from the game client (Section 17.7) extends into the concept art — the art should feel like it *belongs* on those screens.

**Anti-Patterns (what this game is NOT):**
- NOT cyberpunk (no neon, no rain-slicked streets, no holographic billboards)
- NOT clean futurism (no Apple-store spaceships, no pristine white corridors)
- NOT fantasy sci-fi (no glowing magic swords, no energy beings, no force fields as visible bubbles)
- NOT anime/stylized (photorealistic and grounded always)

### 18.2 Color Palette (Canonical)

| Color | Hex | Usage |
|-------|-----|-------|
| **Orange** | `#e8a020` | Primary accent. Vin's agency, Torquer reactor, The Vex running lights, buttons, highlights |
| **Blue** | `#6688bb` | DENT's voice, companion warmth, Null energy, Folder faction accents |
| **Red** | `#cc3030` | Warnings, danger, emergency lighting, SIC faction, hull breach indicators |
| **Deep Space Black** | `#0a0a12` | Background, void, darkness (NOT pure black — has blue undertone) |
| **Hull Gray** | `#3c4148` | Ship metal, structural elements, SIC faction base |
| **Text White** | `#c8c8d0` | Standard text, narration, general illumination |

**Lighting Rules:**
- Ship interiors: harsh overhead fluorescent or emergency red strip lighting. Single-source where possible.
- Space exteriors: single distant star as key light. Absolute black shadows. No fill light.
- CRT screens: self-illuminating amber/green phosphor glow on faces.
- Emotional moments: warm practical lighting (work lamps, welding torches, DENT's optic glow).

### 18.3 Character Visual Identity Guide

#### Vin (Player Character)
- **Physique:** Late 20s/early 30s, lean athletic build, sharp angular features
- **Hair:** Short, dark, unkempt (forgot to cut it because equations)
- **Face:** Dark circles under eyes from sleep deprivation. Looks exhausted but focused.
- **Costume:** Dark charcoal flight suit with utility pockets and tool loops. Environmental suit underlayer visible at collar/wrists. Grease-stained hands. Heavy magnetic boots.
- **Signature Prop:** The Torquer strapped to left forearm (orange near elbow, blue near wrist)
- **Vibe:** The kind of person who forgot to eat because they were solving equations

#### DENT (Robot Companion)
- **Build:** 5'8", lanky humanoid, scarecrow proportions. Mismatched parts from 47+ repairs.
- **Head:** Narrow, angular. Two asymmetric optics — one large bright amber, one small flickering blue. No mouth (speaker grille on throat).
- **Chest:** Dented orange plate, "D.E.N.T." stenciled in white (half scratched off). Blue core glow through cracks.
- **Left Arm:** Sleek, dark gunmetal, original manufacture (the "good" arm)
- **Right Arm:** Cobbled from ship parts, exposed wiring, fold-out welding torch (often broken). Mining rig plating — heavier, rougher.
- **Legs:** Slightly digitigrade (bird-like knee bend). Oddly graceful.
- **Feet:** Wide magnetic pads for zero-G.
- **Quirks to Capture:** Tapping chest plate (thinking), small optic flickering (surprise), sparks from bad shoulder (doorframes).
- **Damage States:** Early game = limping, one arm limp/sparking, dim optics. Late game = upright, confident, both optics bright.

#### Director Graves (SIC)
- **Physique:** Mid-50s, impeccable posture, hands always clasped behind back
- **Face:** Close-cropped gray hair, cold intelligent eyes, clean-shaven, thin lips. Has never panicked.
- **Costume:** Immaculate dark charcoal military-corporate uniform with subtle silver-gray trim. No medals. Understated authority.
- **Vibe:** Quarterly earnings review tone while explaining your destruction

#### Kade (Folders)
- **Physique:** Late 30s, dark skin, easy confident body language
- **Face:** Easy grin that doesn't reach his eyes. Short hair or close-cropped fade.
- **Costume:** Modified dark Folder flight jacket with custom patches and glowing blue Null-cell ports in sleeves. Field modifications everywhere.
- **Vibe:** Startup CEO meets space pirate king. Selling you something at all times.

### 18.4 Ship Design Language

| Ship | Design Philosophy | Key Visual Markers |
|------|------------------|--------------------|
| **The Vex** | University-budget engineering. Angular, not aggressive. | Oversized custom sensor antenna, cracked viewport, hull repair patches/scorch marks, orange running lights, faded "VEX" stencil |
| **SIC Interceptors** | Committee-designed military. Clean, angular, predatory. | Gunmetal gray, NO insignia, three in formation, forward-mounted Scrambler arrays, standardized and impersonal |
| **Folder Vessels** | Hot-rodded military surplus. Industrial aggressive. | Welded-on cargo pods, non-standard mounts, blue Null-cell ports on hull, markings painted over, each ship unique |
| **FSV Penance (Derelict)** | Dead Folder ship. Angular aggressive but destroyed. | One side scorched black, hull torn open, no power/no lights, frost on exterior, slowly rotating corpse |

**Ship Design Rules:**
- No wings (hard sci-fi — wings are useless in space)
- Visible thrusters and reaction control systems
- Hull plating with visible seams (not smooth shells)
- Antenna arrays and sensor dishes (communication is physical)
- Size hierarchy: Vex (small) < Folder vessels (2x Vex) < SIC interceptors (military-grade) < SIC capital ships (massive)

### 18.5 Faction Visual Identity

**SIC (Spatial Integrity Coalition):**
- Colors: Charcoal gray + silver
- Aesthetic: Sterile, corporate-military, standardized
- Insignia: Simple geometric symbol (overlapping squares suggesting spatial integrity)
- Environments: Bright even lighting, identical consoles, spotless floors
- Rule: No personalization. Individuals are interchangeable.

**Folders (Criminal Faction):**
- Colors: Dark + blue Null-energy accents
- Aesthetic: Modified, personalized, chaotic-but-functional
- Insignia: None standardized — every cell is different
- Environments: Warm amber lighting, personal touches, stolen tech, trophies
- Rule: Every Folder's gear is different. Startup culture meets space piracy.

### 18.6 Location Visual Rules

**The Vex Interior:**
- Cramped, claustrophobic, one-person scale
- CRT monitors everywhere (amber and green phosphor text)
- Emergency red strip lighting along ceilings
- Frost on cold metal surfaces, condensation
- Cables, toggle switches, analog dials on every surface
- Reference: Nostromo (Alien) + submarine interiors

**Deep Space:**
- Absolute black void, stars as pinpoints (NOT streaks)
- Single directional light source (distant star)
- No nebulae, no color — just black and white points
- Scale emphasized by tiny ship against vast nothing
- Reference: The Expanse exterior shots

**Asteroid/EVA:**
- Dark irregular rock with iridescent blue-glowing Null veins
- Tether cables as lifelines
- Magnetic boots on uneven terrain
- Beautiful and dangerous simultaneously

**Derelict Ships:**
- Completely dead — no power, no heat, no light
- Frost on every surface, footprints visible in frost
- Coherence Scrambler damage: metal that looks WRONG at molecular level
- Horror atmosphere — the ship is a tomb

### 18.7 Technology Visual Rules

**The Torquer:**
- Two-section forearm brace, strapped to arm, hand free
- Proximal (elbow) = ORANGE — fusion reactor core, heat vents, micro-plating
- Distal (wrist) = DEEP BLUE — negative energy generator, Casimir coil arrays
- Looks hand-built in a university lab (NOT manufactured, NOT sleek)
- When active: both sections glow, space bends in front of the fist
- When dormant: orange faint, blue completely dark/inert

**Fold Effects:**
- Stars ahead compress and blue-shift into a single blazing point
- Stars behind stretch and redden and vanish
- Two points in space briefly occupying the same location
- NOT a wormhole tunnel, NOT a hyperspace corridor — space BENDS

**Blip Effects (Simulation Glitches):**
- Corrupted displays, inverted colors, scrambled text
- Double-vision: two versions of the scene overlapping, slightly offset
- Gravity flickering, objects float then slam down
- Chronometer showing wrong time
- Subtle wrongness, NOT overt glitch art or cyberpunk aesthetic

**Null Energy:**
- Blue glow, always (consistent with DENT's core, Folder accents, asteroid veins)
- Contained in standardized metallic canisters with transparent blue section
- Industrial like batteries, NOT magical artifacts
- Casimir-derived — the visual language ties to real physics

### 18.8 Concept Art Pipeline (Midjourney V7 Workflow)

All concept art is generated using Midjourney V7. The detailed prompts for every character, ship, location, faction, item, and key scene are maintained in:

> **`design/MIDJOURNEY-PROMPTS.md`** — The Midjourney V7 Prompt Bible

#### Generation Order (Recommended)

1. **Global style anchors** — Lock in the visual language first. Generate 4-8 variations, pick favorites, save `--sref` codes.
2. **DENT model sheet** — Most visually complex character. Establish his look before anything else.
3. **The Vex model sheet** — The ship players spend the most time with.
4. **Vin model sheet** — Player character.
5. **Vex interior locations** — Bridge, Engineering, Quarters, Cargo, Sensors, Corridors.
6. **SIC ships and Graves** — Primary antagonist faction visual identity.
7. **Folder ships and Kade** — Secondary faction visual identity.
8. **Technology close-ups** — Torquer, fold drive, Null cells, EVA suit.
9. **Key scene illustrations** — The big narrative moments.
10. **Moodboards** — Fill in the gaps, explore edge cases.

#### V7 Feature Cheat Sheet

| Feature | Purpose | When to Use |
|---------|---------|-------------|
| `--oref` (Omni Reference) | Character/object consistency | ALL character and ship prompts after establishing the reference image |
| `--ow` (Reference Weight) | Control reference influence | Lower (25-50) for different scenes, higher (75-100) for strict consistency |
| `--sref` (Style Reference) | Lock visual style across all generations | After establishing style anchors — apply to EVERYTHING |
| `--style raw` | Literal prompt adherence | Ship interiors, technical details, prop designs |
| `--s` (Stylize) | Artistic interpretation level | Low (50) for reference sheets, Medium (150-200) for hero shots, High (250-300) for dramatic scenes |
| `--p` (Personalization) | Tune to your aesthetic profile | After training your Global Profile to the game's look |
| Strong variation | Explore divergent designs | Early design exploration of new elements |
| Subtle variation | Refine an almost-final design | When 90% happy, tweaking the last 10% |

#### Consistency Rules

1. **Style anchor first, always.** Never generate a character/ship/scene without applying the locked `--sref` from the global style anchors.
2. **`--oref` for every character appearance.** Once Vin's model sheet is approved, his `--oref` code goes on every prompt that includes Vin. Same for DENT, Graves, Kade, The Vex, etc.
3. **Anti-generic modifiers on every prompt.** Always include: `NOT cyberpunk, NOT neon, NOT clean futuristic, worn industrial practical` — Midjourney defaults to generic sci-fi without these.
4. **Aspect ratios are canonical.** Model sheets = `3:2`. Portraits = `2:3`. Environments = `16:9`. Establishing shots = `21:9`. Details = `4:3` or `1:1`.
5. **Update the prompt bible.** When a prompt produces a result that's adopted as canonical, note the seed/job ID in the prompt bible for future reference.

#### Prompt Modifiers (Quick Reference)

| Mood | Add to Prompt |
|------|--------------|
| Grounded realism | `photorealistic, practical effects, 35mm film grain` |
| Dramatic atmosphere | `cinematic lighting, anamorphic lens, Ridley Scott cinematography` |
| Technical detail | `macro photography, studio lighting, product photography` |
| Emotional intimacy | `shallow depth of field, warm practical lighting, intimate composition` |
| Anti-AI-generic | `NOT cyberpunk, NOT neon, NOT clean futuristic, worn industrial practical` |

### 18.9 Art Asset Categories & Status

Track all generated concept art here as it's produced:

| Category | Prompt Bible Section | Reference Images | Status |
|----------|---------------------|------------------|--------|
| Global Style Anchors | §1 (4 prompts) | — | Pending |
| Vin — Model Sheet & Portraits | §2A (4 prompts + 1 detail) | — | Pending |
| DENT — Model Sheet & Portraits | §2B (4 prompts + 3 details) | — | Pending |
| Graves — Model Sheet & Portraits | §2C (3 prompts) | — | Pending |
| Kade — Model Sheet & Portraits | §2D (2 prompts) | — | Pending |
| The Vex — Exterior & Interior | §3A (4 prompts + 1 detail) | — | Pending |
| SIC Interceptors | §3B (3 prompts) | — | Pending |
| Folder Vessels | §3C–3D (3 prompts) | — | Pending |
| SIC Faction Aesthetic | §4A (3 prompts) | — | Pending |
| Folders Faction Aesthetic | §4B (2 prompts) | — | Pending |
| Vex Interior Locations | §5 (6 prompts) | — | Pending |
| External Locations | §6 (9 prompts) | — | Pending |
| Technology & Items | §7 (7 prompts) | — | Pending |
| Key Scenes | §8 (10 prompts) | — | Pending |
| Moodboards | §9 (7 categories) | — | Pending |

> **Update this table as art is generated.** Replace "Pending" with "Generated" or "Approved" and note the Midjourney job IDs or file names in the Reference Images column.

---

**This Bible is the blueprint. Build FROM it, not around it.**

**Version:** 4.0 (Visual Art Direction Added)
**Last Updated:** 2026-02-19
**Status:** ✅ Client POC Complete — Prologue Phase 1 Playable in Electron
