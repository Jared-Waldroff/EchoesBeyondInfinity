# Chapter 3: Breaching the Charter — Design Document

> **Status:** APPROVED
> **Date:** 2026-02-19
> **Approved by:** Jared

---

## Overview

**Title:** Breaching the Charter
**Truby Beats:** #2 (Ghost — flashback), #10 (Plan), #11 (Opponent counterattack)
**Player Variance:** Fight/flee/negotiate with SIC patrol
**Convergence:** Escape, SICs now actively hunting
**Estimated Scope:** ~1,800-2,200 lines (5 scenes, linear escalation)

## Entering State (from Chapter 2)

- HP: ~75-80, Neural: ~55-60, Stress: ~30-35
- Hull: ~58-62%, Null: ~10-20 cells, Fold Drive: READY
- DENT: ~50% operational
- Flags set: `sic_detected_fold`, `first_fold_complete`, `first_blip_witnessed`, `fold_drive_unlocked`
- Player has completed first fold (3.2 LY), experienced first Blip

## Location

**RS-7 Talos** — Abandoned SIC Relay Station at the fold waypoint. Three-module structure:
- Command Module (terminals, SIC insignia, data logs)
- Storage Bay (SIC equipment cache, DENT repair components, Null cell locker)
- Communication Array (long-range antenna, flashback trigger)

The station is unmanned but still passively reporting to the SIC network. It auto-detected The Vex's arrival.

---

## Scene Breakdown

### Scene 1: Blip Aftermath & Waypoint Arrival

**Purpose:** Decompress from Ch 2 cliffhanger. Process the Blip. Discover RS-7 Talos.

- Vin and DENT discuss the Blip. DENT runs diagnostics.
- Subtle simulation clue: Chronometer skipped during Blip (0.003s fold, 11s elapsed). DENT dismisses as sensor drift.
- A tool in engineering is in a different position than before the fold.
- DENT detects RS-7 Talos nearby — no power, looks dead.
- **Choice:** Investigate the station (rewarded exploration) or stay aboard and plot next jump (shorter path, fewer resources).

**VALIDATION:**
- Advance: Blips have tangible effects, relay station discovered
- Agency: Investigate vs skip
- Consequence: Exploring = better equipped for Graves encounter
- Tone: Post-fold unease, DENT diagnostic humor

### Scene 2: Relay Station Exploration

**Purpose:** Scavenging, lore, flashback, simulation clues. The calm before the storm.

**Command Module:**
- Dead consoles, SIC insignia, frost on surfaces.
- One terminal with emergency battery power.
- Tier 2: Vin recognizes SIC monitoring protocols.
- Tier 3 (simulation clue): Station logs contain timestamps referencing events BEFORE RS-7 was commissioned. Entries mention "Cycle maintenance" and "pattern reset." DENT flags as structured data corruption.

**Storage Bay:**
- SIC equipment cache.
- **DENT Repair Choice (pick ONE):**
  - Right Arm Actuator (servo motor + power coupling) → Physical task assistance
  - Welding Torch (fuel cell + torch assembly) → Independent ship repairs
- Null cell locker: 5-8 cells behind sealed SIC locker. Forcing it triggers a brief alarm that accelerates SIC detection timeline. Player must decide.

**Communication Array:**
- **Environmental simulation glitch:** Room flickers — panel that was sealed is open, cable that was hanging is coiled. Vin blinks. Normal. DENT didn't see it (was in storage bay).
- **Flashback trigger:** SIC comm equipment triggers memory.

**FLASHBACK — "The Night They Came":**
- Full italic detailed scene. Vin in his university lab, late at night. Torquer prototype on bench.
- SIC enforcement arrives. Graves' voice on PA: *"Dr. Vin. The Spatial Integrity Charter requires your immediate cooperation."*
- Vin grabs Torquer. DENT (barely functional) helps load The Vex.
- Memory cuts as The Vex launches under SIC fire.
- Returns to present: Vin in the array room, heart pounding.

**Post-exploration:** DENT repair installation scene (character-building moment).

**VALIDATION:**
- Advance: SIC lore, simulation data anomaly, backstory flashback, DENT repair
- Agency: Repair choice, Null locker decision, exploration depth
- Consequence: Repair choice ripples Ch 4+, locker affects SIC timing, flashback shapes Graves dialogue
- Tone: Eerie dead station, flashback intensity, repair intimacy

**Truby beats:** #2 (Ghost), #10 (Plan)

### Scene 3: Detection & Graves Contact

**Purpose:** Antagonist introduction. Core choice. Truby #11 — Opponent counterattack.

- Station's passive systems reported The Vex. (If locker alarm triggered: SICs arrive faster.)
- DENT detects three fold signatures incoming. SIC interceptor profile.
- Emergency return to The Vex.
- Three interceptors drop out of fold. Coherence Scramblers armed.
- **Director Graves appears on comms.** First direct encounter. He addresses Vin by name.
- Graves demands compliance under Spatial Integrity Charter, Article 7.

**THE CORE CHOICE:**

```
> Comply — Power down, play along (fake surrender + DENT sabotage)
> Negotiate — Keep Graves talking, buy time (DENT plots escape)
> Fold — Burn 18 cells, immediate jump (clean but expensive)
```

**Comply path:**
- Vin signals compliance. DENT secretly keeps fold drive in standby.
- SIC interceptor begins docking approach.
- Vin overhears SIC comms: "increased fold activity" + "Director's priority target."
- DENT fires emergency fold from standby. Rough, uncontrolled lurch.
- Costs: -10 Hull, -5 Null, +10 Stress
- Gains: `sic_priority_target` flag, `sic_sector_activity` flag, `graves_deceived` flag

**Negotiate path:**
- Vin engages Graves. "Confused academic" angle.
- Graves sees through it but reveals motivation: genuinely believes folding destabilizes spacetime.
- DENT plots optimal escape route during conversation.
- Costs: -3 Null, +5 Stress
- Gains: +5 Neural, Graves character insight, `graves_negotiated` flag, `graves_calibrated_signature` flag (SICs detect faster in Ch 4)

**Fold path:**
- Immediate fold. No hesitation. Clean escape.
- Costs: -18 Null, +5 Stress
- Gains: Clean getaway, no hull damage, `graves_defied` flag (Graves takes it personally, references in Ch 8)

**All paths:** Graves gets a parting message through: *"This isn't over, Mr. Vin. The Charter doesn't forget."*

**Reed's 5 Tests: 5/5 PASS**

### Scene 4: The Escape & Pursuit

**Purpose:** Path-dependent escape sequences converge on "escaped but hunted."

**Path convergence points:**
- All paths: Chronometric Dampener signatures detected — SICs deployed passive trackers.
- All paths: Every future fold will be detected. Running is not a permanent solution.

**DENT relationship beat:**
- DENT asks: *"Vin. The man on the screen. Graves. You knew him. Before. Didn't you?"*
- Player can confirm or deflect. Confirm = +relationship flag. Deflect = DENT notes it.

### Scene 5: Chapter End

**Purpose:** Hook for Chapter 4. Stats summary.

- New status quo narration: The Vex is running. SICs know who, where, roughly where going.
- Second Echo pulse detected — coordinates becoming clearer, deeper into uncharted space.
- DENT: *"The next waypoint is 4.7 light-years. We'll need to fold again."*
- Vin: *"They'll see us."*
- DENT: *"Every time."*

**Chapter end card:**
- Stats summary
- Key decisions logged
- SIC Status: ACTIVE PURSUIT — CHRONOMETRIC DAMPENERS DEPLOYED
- Transition to Chapter 4

---

## Exiting State (varies by path)

| Path | HP | Neural | Stress | Null | Hull | New Flags |
|------|-----|--------|--------|------|------|-----------|
| Comply | ~75 | ~55 | ~40 | ~10-18 | ~50-55% | `sic_priority_target`, `sic_sector_activity`, `graves_deceived` |
| Negotiate | ~75 | ~60-65 | ~35 | ~12-22 | ~58-62% | `graves_negotiated`, `graves_calibrated_signature` |
| Fold | ~75 | ~55 | ~35 | ~0-7 | ~58-62% | `graves_defied` |

**All paths:** `chapter3_complete`, `sic_pursuit_active`, `chronometric_dampeners`, `graves_introduced`, DENT repair choice flag, `rs7_explored` (if investigated), `flashback_lab_raid` (if station explored)

---

## DENT Repair Components (Chapter 3)

| Component | Location | Choice |
|-----------|----------|--------|
| Right Arm Actuator (servo motor + power coupling) | RS-7 Storage Bay | Pick ONE |
| Welding Torch (fuel cell + torch assembly) | RS-7 Storage Bay | Pick ONE |

## Null Economy (Chapter 3)

| Source | Cells | Condition |
|--------|-------|-----------|
| RS-7 Null locker | 5-8 | Force open (triggers alarm, accelerates SIC arrival) |
| SIC cache (if comply path intel reveals location) | — | Not available this chapter, info for Ch 4 |

| Sink | Cells | Path |
|------|-------|------|
| Comply escape | 5 | Comply |
| Negotiate escape | 3 | Negotiate |
| Fold escape | 18 | Fold |

## Simulation Clues (Subtle — Ch 1-5 Schedule)

1. **Chronometer skip** (Scene 1): Fold duration vs elapsed time mismatch. Everyone sees this.
2. **Displaced tool** (Scene 1): Object in wrong position post-Blip. Everyone sees this.
3. **Station log timestamps** (Scene 2, Tier 3): Pre-commission date entries, "Cycle maintenance." Optional for explorers.
4. **Environmental flicker** (Scene 2): Room briefly changes, objects shift. Everyone who explores the station sees this.

## Flashback

**"The Night They Came"** — SIC raid on Vin's university lab. Full italic detailed scene. Triggered by SIC comm equipment on RS-7 Talos. Shows: Graves' voice (establishing recognition), Torquer prototype, DENT's early activation, The Vex's escape under fire.
