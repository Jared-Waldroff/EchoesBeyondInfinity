# Chapter 3: Breaching the Charter — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the complete Python scene file for Chapter 3 — from Blip aftermath through the Graves encounter to escape and pursuit.

**Architecture:** Single file `scenes/chapter3.py` with `run_chapter3(state)` entry point calling 5 scene functions sequentially. Follows the exact same pattern as `scenes/chapter2.py`. State flags and stats tracked via `engine/core.py` GameState. Display via `from engine.display import *`.

**Tech Stack:** Python 3, engine/core.py (GameState), engine/display.py (terminal UI), engine/audio.py (sound events)

**Design Doc:** `docs/plans/2026-02-19-chapter3-breaching-the-charter-design.md`

---

### Task 1: Add Chapter 3 Flags to GameState

**Files:**
- Modify: `engine/core.py` — add Ch3 flags to `__init__` flags dict (around line 82-86)

**Step 1: Add the new flags**

Add these after the `# Chapter 2 flags` block in `GameState.__init__`:

```python
            # Chapter 3 flags
            "rs7_explored": False,
            "rs7_command_accessed": False,
            "rs7_log_anomaly_seen": False,     # Tier 3 sim clue
            "rs7_environmental_glitch": False,  # Everyone-sees sim clue
            "null_locker_forced": False,
            "dent_repair_ch3": "",              # "right_arm" or "welding_torch"
            "flashback_lab_raid": False,
            "graves_introduced": False,
            "graves_escape_method": "",         # "comply", "negotiate", "fold"
            "graves_deceived": False,
            "graves_negotiated": False,
            "graves_calibrated_signature": False,
            "graves_defied": False,
            "sic_priority_target": False,
            "sic_sector_activity": False,
            "sic_pursuit_active": False,
            "chronometric_dampeners": False,
            "dent_graves_question": "",         # "confirm" or "deflect"
            "chapter3_complete": False,
```

**Step 2: Verify save/load compatibility**

Run: `python3 game.py` — verify existing saves still load (the `flags.update()` pattern in `load()` handles new keys gracefully since `get_flag` defaults to `False`).

**Step 3: Commit**

```bash
git add engine/core.py
git commit -m "feat(state): add Chapter 3 story flags to GameState"
```

---

### Task 2: Create Chapter 3 Skeleton + Wire into game.py

**Files:**
- Create: `scenes/chapter3.py`
- Modify: `game.py` — import and route to chapter3

**Step 1: Create the chapter file with entry point and stubs**

```python
"""
CHAPTER 3: BREACHING THE CHARTER
Post-fold Blip aftermath. Discover abandoned SIC relay station.
First encounter with Director Graves. Escape and pursuit.
"""

from engine.display import *
from engine.display import arrow_menu, action_menu, glitch_text
from engine.audio import play as audio
from engine.core import GameState


def run_chapter3(state: GameState):
    """Run the complete Chapter 3."""
    clear()
    chapter_title(3, "BREACHING THE CHARTER")

    blip_aftermath(state)
    station_exploration(state)
    graves_contact(state)
    escape_sequence(state)
    chapter_end(state)


# ═══════════════════════════════════════════════════════
# SCENE 1: BLIP AFTERMATH & WAYPOINT ARRIVAL
# ═══════════════════════════════════════════════════════

def blip_aftermath(state: GameState):
    """Placeholder — Task 3."""
    pass


# ═══════════════════════════════════════════════════════
# SCENE 2: RELAY STATION RS-7 TALOS
# ═══════════════════════════════════════════════════════

def station_exploration(state: GameState):
    """Placeholder — Tasks 4-7."""
    pass


# ═══════════════════════════════════════════════════════
# SCENE 3: DETECTION & GRAVES CONTACT
# ═══════════════════════════════════════════════════════

def graves_contact(state: GameState):
    """Placeholder — Task 8."""
    pass


# ═══════════════════════════════════════════════════════
# SCENE 4: ESCAPE SEQUENCE
# ═══════════════════════════════════════════════════════

def escape_sequence(state: GameState):
    """Placeholder — Task 9."""
    pass


# ═══════════════════════════════════════════════════════
# SCENE 5: CHAPTER END
# ═══════════════════════════════════════════════════════

def chapter_end(state: GameState):
    """Placeholder — Task 10."""
    pass
```

**Step 2: Wire into game.py**

In `game.py`, fix the duplicate chapter2 import and add chapter3:

Replace:
```python
from scenes.chapter2 import run_chapter2
from scenes.chapter2 import run_chapter2
```

With:
```python
from scenes.chapter2 import run_chapter2
from scenes.chapter3 import run_chapter3
```

In `run_game_loop`, change the chapter 3 routing:

Replace:
```python
        elif state.chapter == 3:
            # End of current build
            end_screen(state)
            break
```

With:
```python
        elif state.chapter == 3:
            run_chapter3(state)
        elif state.chapter == 4:
            # End of current build
            end_screen(state)
            break
```

**Step 3: Verify the game runs and routes to chapter 3**

Run: `python3 game.py --fast` — load a save at chapter 3 (or play through). Verify it hits the skeleton without error.

**Step 4: Commit**

```bash
git add scenes/chapter3.py game.py
git commit -m "feat(ch3): create chapter 3 skeleton and wire into game loop"
```

---

### Task 3: Implement Scene 1 — Blip Aftermath & Waypoint Arrival

**Files:**
- Modify: `scenes/chapter3.py` — replace `blip_aftermath` stub

**Purpose:** Decompress from Ch 2 cliffhanger. Process the Blip effects. Discover RS-7 Talos. Player chooses to investigate or skip.

**Key elements to implement:**
- Post-fold diagnostic dialogue (DENT runs systems check)
- Simulation clue: Chronometer discrepancy (0.003s fold vs 11s elapsed)
- Simulation clue: Displaced tool in engineering
- DENT detects RS-7 Talos nearby
- Arrow menu choice: Investigate station vs plot next jump
- If skip: set minimal flags, jump to graves_contact directly (shorter path)
- If investigate: continue to station_exploration
- Auto-save after choice

**VALIDATION docstring must include:**
```
Truby beats: #10 (Plan — gathering resources)
Reed tests: Understanding (player knows Blip happened), Consequence (investigate = resources),
            Strategy (explore vs speed), Tone (DENT diagnostic humor)
```

**Pattern reference:** Follow `echo_analysis()` in chapter2.py — narrate setup, DENT dialogue, thought(), choice via arrow_menu, consequence logging.

**DENT voice:** At ~50% repair, use confident but not fully witty voice. Reference chapter2.py lines 74-80 for tone at this repair level.

**Audio:** `audio("hull_creak")` on chapter open. Consider new event names for future audio (they fail silently if missing).

**Stat changes:** +5 Stress (post-fold tension) applied at scene start.

**Verify:** Run `python3 game.py --fast`, get to Ch 3. Both paths (investigate / skip) should work without error.

**Commit:**
```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): implement Scene 1 — Blip aftermath and waypoint arrival"
```

---

### Task 4: Implement Scene 2A — Station Command Module

**Files:**
- Modify: `scenes/chapter3.py` — build out `station_exploration` function and `command_module` helper

**Purpose:** First module of RS-7 Talos. Dead consoles, SIC lore, Tier 2/3 science depth, simulation data anomaly.

**Key elements:**
- EVA/docking transition narration (brief, atmospheric)
- Command Module description: dead consoles, SIC insignia, frost, one powered terminal
- Tier 1 (everyone): DENT identifies it as an SIC monitoring relay
- Tier 2 (examine terminal): Vin recognizes fold-detection protocols — same tech that found them
- Tier 3 (read logs): Station log timestamps reference events BEFORE commissioning date. Entries mention "Cycle maintenance" and "pattern reset." DENT flags as structured data corruption. Set `rs7_log_anomaly_seen` flag.
- Arrow menu to choose which module to explore next (or return to Vex)

**Pattern:** Similar to the exploration sections in chapter1.py derelict_mission — atmospheric description, examine options, tiered depth.

**Verify:** Run through the station command module. Both Tier 2 and Tier 3 paths should work.

**Commit:**
```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): implement station command module exploration"
```

---

### Task 5: Implement Scene 2B — Station Storage Bay

**Files:**
- Modify: `scenes/chapter3.py` — add `storage_bay` helper

**Purpose:** DENT repair choice + Null cell locker decision. The resource-gathering scene.

**Key elements:**
- Storage bay description: SIC military hardware, sealed containers
- DENT repair choice (arrow_menu, pick ONE):
  - "Right Arm Actuator — servo motor + power coupling" → Sets `dent_repair_ch3` = "right_arm"
  - "Welding Torch — fuel cell + torch assembly" → Sets `dent_repair_ch3` = "welding_torch"
- Brief flavor text for whichever they DON'T pick (Vin leaves it behind, can't carry both)
- Null cell locker (arrow_menu):
  - "Force the locker open" → 6 Null cells gained, `null_locker_forced` = True, narrate alarm
  - "Leave it — not worth the risk" → No cells, no alarm
- If locker forced: brief alarm klaxon, DENT warns it may have broadcast

**Stat changes:**
- If locker forced: `state.null_reserves += 6`, set flag
- DENT repair choice: flag only (installation happens in Task 7)

**Verify:** Both repair choices and both locker choices should work without error. State should update correctly.

**Commit:**
```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): implement station storage bay — DENT repair choice and null locker"
```

---

### Task 6: Implement Scene 2C — Communication Array + Flashback

**Files:**
- Modify: `scenes/chapter3.py` — add `comm_array` and `lab_raid_flashback` functions

**Purpose:** Environmental simulation glitch + detailed flashback triggered by SIC comm equipment.

**Key elements:**

**Communication Array:**
- Atmospheric entry — Vin alone (DENT still in storage bay)
- Environmental glitch: Lighting flickers, panel that was sealed appears open, cable that was hanging is coiled. Vin blinks — everything normal. Use `screen_tear(1)` + `glitch_text()` for the effect.
- Set `rs7_environmental_glitch` flag
- SIC comm equipment triggers the flashback

**Flashback — "The Night They Came":**
- Guard: `if state.get_flag("flashback_lab_raid"): return`
- Transition: narrate memory surfacing, `screen_tear(2)`, `wait(0.5)`
- Full italic scene using `flashback()` and `flashback_vivid()`:
  - Late night in the university lab. Torquer prototype on bench. Research terminal showing Echo data.
  - Alarms. SIC vehicles outside.
  - Graves' voice on PA: `flashback_vivid('"Dr. Vin. The Spatial Integrity Charter requires')`
  - Vin grabs Torquer. DENT (barely assembled, first activation) helps load The Vex.
  - Memory cuts as Vex launches under Scrambler fire.
- Return to present: Vin in array room, heart pounding
- Player choice (show_choices): React to the memory (3 options that shape dialogue with Graves later)
- Set `flashback_lab_raid` flag
- `say(f"{DIM}  [Memory recovered: The SIC raid — the night Vin became a fugitive]{RESET}")`

**Pattern reference:** Follow `echo_flashback()` in chapter2.py (lines 451-574) exactly — same structure, same transition pattern, same post-flashback choice.

**Verify:** Play through the comm array. Glitch effect + flashback should render correctly. Flashback should only trigger once.

**Commit:**
```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): implement comm array sim glitch and lab raid flashback"
```

---

### Task 7: Implement DENT Repair Installation

**Files:**
- Modify: `scenes/chapter3.py` — add `dent_repair_scene` function

**Purpose:** Character-building moment. Vin and DENT work together to install the repair.

**Key elements:**
- Called after station exploration, before returning to The Vex
- Branch on `state.get_flag("dent_repair_ch3")`:
  - "right_arm": Scene of DENT testing the new servo motor. His right arm actuates smoothly for the first time. Brief moment of wonder. `state.dent_repair_level += 0.05`
  - "welding_torch": Scene of DENT firing the welding torch. It works. He repairs a small hull crack unprompted. `state.dent_repair_level += 0.05`, `state.hull = min(100, state.hull + 3)`
- DENT thanks Vin in his current voice level (50-55% = functional but not yet witty)
- Brief, warm, intimate — don't overwrite it

**Stat changes:**
- `dent_repair_level += 0.05` (both paths)
- Hull +3 if welding torch (DENT immediately uses it)

**Verify:** Both repair paths produce different dialogue and correct stat changes.

**Commit:**
```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): implement DENT repair installation scene"
```

---

### Task 8: Implement Scene 3 — Graves Contact & Core Choice

**Files:**
- Modify: `scenes/chapter3.py` — replace `graves_contact` stub

**Purpose:** The pivotal scene. Graves' introduction. The three-way escape choice.

**Key elements:**

**Detection sequence:**
- If `null_locker_forced`: narrate that the alarm accelerated detection. SICs arrive faster (shorter dramatic build).
- If NOT forced: longer buildup — DENT detects fold signatures, countdown tension.
- Three SIC interceptor fold-in narration. Audio: `audio("fold_arrival")`.
- DENT tactical readout: interceptor count, Scrambler charge status, Null reserves.

**Graves introduction:**
- Comms channel opens. Graves on screen.
- His dialogue: calm, corporate, terrifying. Address Vin by name.
- Key lines from the design doc (see design doc Scene 3).
- If `flashback_lab_raid`: Vin recognizes the voice — brief internal thought.
- Graves demands compliance: Spatial Integrity Charter, Article 7.

**Core choice (arrow_menu):**
```python
choices = [
    "Comply — Power down, play along",
    "Negotiate — Keep Graves talking",
    f"Fold — Burn 18 cells, jump now",
]
descriptions = [
    "Fake surrender. DENT sabotages from standby.",
    "Buy time. DENT plots an escape route.",
    f"Clean escape. Expensive. (Current: {state.null_reserves} cells)",
]
```

**After choice:** Route to the appropriate escape path (Task 9).

**Auto-save:** `state.save("auto")` after the choice is made.

**VALIDATION docstring:**
```
Truby beats: #11 (Opponent counterattack)
Reed tests: Understanding 5/5, Consequence 5/5, Strategy 5/5, Character 5/5, Tone 5/5
```

**Verify:** All three choices should be selectable and route correctly.

**Commit:**
```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): implement Graves contact scene and core three-way choice"
```

---

### Task 9: Implement Scene 4 — Three Escape Paths + Convergence

**Files:**
- Modify: `scenes/chapter3.py` — replace `escape_sequence` stub with path functions

**Purpose:** Each path plays out, then all converge on "escaped but hunted."

**Key elements:**

**Comply path** (`escape_comply`):
- Vin signals compliance. DENT secretly keeps fold drive in standby.
- SIC interceptor docking approach narration. Tension building.
- Vin overhears SIC comms chatter (intel flags: `sic_priority_target`, `sic_sector_activity`).
- DENT fires emergency fold. Rough lurch. `screen_tear(2)`, `audio("emergency_fold")`.
- Stats: `state.apply_damage(hull=-10, null=-5, stress=10)`.
- Flags: `graves_deceived`, `graves_escape_method = "comply"`.
- DENT quip: *"That was closer than I'd prefer. And I'd prefer not to be here at all."*

**Negotiate path** (`escape_negotiate`):
- Vin engages Graves in dialogue. 3-4 exchanges showing Graves' true-believer motivation.
- Graves reveals he genuinely thinks folding will destabilize spacetime (not mustache-twirling).
- DENT plots escape route during conversation (system text showing calculations).
- Clean-ish fold at the last moment. `audio("fold_away")`.
- Stats: `state.apply_damage(null=-3, stress=5)`, `state.neural = min(100, state.neural + 5)`.
- Flags: `graves_negotiated`, `graves_calibrated_signature`, `graves_escape_method = "negotiate"`.
- DENT: *"He's smart, Vin. He let us talk because he was calibrating our signature."*

**Fold path** (`escape_fold`):
- Immediate fold. No hesitation. Brief, decisive scene.
- Standard Blip (minor — they're getting used to it).
- Stats: `state.apply_damage(null=-18, stress=5)`.
- Flags: `graves_defied`, `graves_escape_method = "fold"`.
- DENT: *"For what it's worth, that was the mathematically optimal choice. Cold, but optimal."*

**Convergence** (`pursuit_established`):
- All paths arrive here.
- Graves' parting message plays: *"This isn't over, Mr. Vin. The Charter doesn't forget."*
- DENT detects Chronometric Dampener signatures. Set `chronometric_dampeners` flag.
- Narrate: every fold from now on will be detected.
- **DENT relationship beat:** *"Vin. The man on the screen. Graves. You knew him. Before. Didn't you?"*
  - Arrow menu: "Yes. He raided my lab." / "I don't want to talk about it."
  - Confirm: `dent_graves_question = "confirm"`, DENT responds with understanding.
  - Deflect: `dent_graves_question = "deflect"`, DENT notes it, doesn't push.
- Set `sic_pursuit_active`, `graves_introduced`.

**Verify:** Play through all three paths. Stats should differ correctly. All converge to the same ending.

**Commit:**
```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): implement three escape paths and pursuit convergence"
```

---

### Task 10: Implement Scene 5 — Chapter End

**Files:**
- Modify: `scenes/chapter3.py` — replace `chapter_end` stub

**Purpose:** Wrap up, hook for Chapter 4, stats summary.

**Key elements:**
- New status quo narration: hunted, but still moving forward
- Second Echo pulse: DENT detects another fragment. Coordinates deeper into uncharted space.
- Closing dialogue: "They'll see us." / "Every time."
- Set `chapter3_complete` flag.
- `state.chapter = 4`
- `state.save("auto")`
- Chapter end card (follow chapter2.py lines 2114-2150 pattern exactly):
  - `separator()`
  - "Chapter 3: Breaching the Charter — Complete"
  - Stats summary: HP, Neural, Stress, Hull, Null, DENT %, Fold Drive status
  - Key decisions: escape method, DENT repair chosen, locker forced, Graves flags
  - SIC Status line in bright red
  - "Chapter 4 coming soon..."
  - `pause()`

**Verify:** Complete a full playthrough of Chapter 3. Verify end card displays correctly with accurate stats.

**Commit:**
```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): implement chapter end card and Ch 4 transition"
```

---

### Task 11: Full Playtest & Polish

**Files:**
- Modify: `scenes/chapter3.py` — bug fixes, pacing adjustments, text polish

**Step 1: Full playthrough — Comply path**

Run: `python3 game.py --fast`, play through or load Ch 3 save. Take Comply path. Verify:
- [ ] All scenes flow without error
- [ ] Stats update correctly (check end card numbers)
- [ ] Flags set correctly
- [ ] DENT voice matches ~50-55% repair level
- [ ] Flashback triggers once and only once
- [ ] No placeholder text remaining

**Step 2: Full playthrough — Negotiate path**

Same but take Negotiate path. Verify different stats, different Graves dialogue.

**Step 3: Full playthrough — Fold path**

Same but take Fold path. Verify Null cost, clean escape feel.

**Step 4: Skip-station playthrough**

Choose "skip" at Scene 1 (don't investigate station). Verify shorter path works, Graves encounter still plays, no station flags set.

**Step 5: Fix any issues found**

Apply fixes, re-test affected paths.

**Step 6: Final commit**

```bash
git add scenes/chapter3.py
git commit -m "feat(ch3): Chapter 3 complete — Breaching the Charter"
```

---

## Pre-Build Validation Checklist (Bible §16.4)

### Truby Beat Mapping
- [x] Beat #2: Ghost — Lab raid flashback
- [x] Beat #10: Plan — Gathering resources at RS-7, preparing for what's ahead
- [x] Beat #11: Opponent counterattack — Graves and SICs arrive

### Organic Connection Check
| Element | In-Universe Reason | Simulation Connection | Pass? |
|---------|-------------------|----------------------|-------|
| RS-7 Talos | SIC monitoring relay at fold waypoint | Part of the monitoring grid (exception handlers watching for errors) | Y |
| Chronometer skip | Blip side effect | Rendering stutter left temporal artifacts | Y |
| Log timestamps | Data corruption | Cycle maintenance logs from previous simulation runs | Y |
| Environmental glitch | Stress/fatigue? | Local rendering anomaly | Y |
| Graves | SIC enforcement director | The firewall's human interface | Y |

### Major Choice: Escape Method (Reed's 5 Tests)
- [x] Understanding: Player knows Null cost, SIC threat, Graves' authority
- [x] Consequence: Different stats, flags, and Graves' attitude in Ch 4+8
- [x] Strategy: All three valid for different playstyles
- [x] Character: Tests Vin's pragmatism vs defiance
- [x] Tone: Graves' menace, Vin's calculation, DENT's dry tactical support
**Passes: 5/5**

### Major Choice: DENT Repair (Reed's 5 Tests)
- [x] Understanding: Player sees what each part does
- [x] Consequence: Different DENT capabilities ripple forward
- [x] Strategy: Physical help vs repair independence — both valid
- [x] Character: Choosing what to prioritize for your companion
- [x] Tone: Intimate repair scene maintains Weir/TARS warmth
**Passes: 5/5**

### Three-Tier Depth
- Tier 1: DENT explains SIC threat, relay purpose, escape options
- Tier 2: Vin recognizes fold-detection protocols on the terminal
- Tier 3: Station log timestamp anomaly (simulation clue for deep explorers)
**All present: Yes**
