# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Echoes Beyond Infinity** — a hard sci-fi text adventure game being built for **Steam release**. The player is Vin, sole survivor aboard the research vessel Vex, assisted by a damaged AI companion (DENT). The game is an **Electron app** (`client/`) with CRT aesthetic, pixel-perfect art, and native audio.

**All development happens in `client/`.** There is no other codebase — the `client/` folder IS the game. Do not create game files outside of it. The only other folders are `design/` (Game Design Bible, art prompts) and `docs/` (plans).

**Before building any new scene, chapter, or story content, always read `design/GAME-DESIGN-BIBLE.md` first.** The Bible defines how to structure scenes (Truby beats, Reed tests), how characters speak (DENT voice levels, Vin's internal monologue style), the science rules (null energy, fold mechanics), narrative constraints (converging river model, no simulation confirmation), and the validation checklists every scene must pass. It is the single source of truth for both story and game design.

## Commands

```bash
cd client && npm install       # First time only
cd client && npm start         # Launches the game
cd client && npm start -- --dev  # Dev mode: chapter select with preset states
```

## Architecture

All game code lives in `client/`.

### Engine (`client/js/engine/`)

- **`state.js`** — `GameState` class. Central state object passed through all scenes. Tracks player stats (health, neural, stress), ship stats (hull, foldStatus, foldStability, nullReserves), inventory array, story flags object, flashbacks object, DENT repair level (0.0-1.0), and chapter/phase progression. Save/load serializes to JSON via Electron IPC. Key methods: `applyDamage()` (clamped stat changes), `setFlag()`/`getFlag()`, `addItem()`/`hasItem()`, `discoverFlashback()`, `setPostBlipStats()`.

- **`terminal.js`** — Terminal UI renderer. All scene code calls methods on this. Key exports:
  - **Dialogue**: `dent()`, `dentLine()`, `dentGlitch()`, `narrate()`, `thought()`, `flashback()`, `flashbackVivid()`, `say()`, `sayHtml()`
  - **Choices**: `arrowMenu(options, descriptions)` (0-indexed), `showChoices(choices)` (1-indexed), `actionMenu(actions)`, `getCommand(valid)`
  - **Panels**: `statusPanel(state)`, `shipHeader()`, `vexMap(room)`, `derelictMap(room)`, `evaHud()`, `travelSelectionPanel()`, `repairProgressPanel()`
  - **Effects**: `typed()`, `typedSlow()`, `chapterTitle()`, `titleCard()`, `systemLine()`, `bar()`
  - **Layout**: `blank()`, `separator()`, `clear()`, `clearSmooth()`, `showArt()`
  - **Global**: `fastMode` — toggled by backtick key at runtime; disables all animations/delays

- **`effects.js`** — Visual effects: `flash()`, `shake()`, `glitch()`, `screenTear()`, `foldEffect()`, `bootText()`, `glitchText()`, `scramblerEffect()`, `fadeToBlack()`/`fadeFromBlack()`, `powerOn()`/`powerOff()`.

- **`audio.js`** — Web Audio API manager. `play(event)`, `ambient(event)`, `stop()`.

### Scenes (`client/js/scenes/`)

Each chapter is a single JS file with an exported async entry function receiving `(terminal, state, effects, audio)`. State is mutated in place.

- **`prologue.js`** — Cold Boot (2,173 lines). Three phases: `prologuePhase1` (sensory discovery in void), `prologuePhase2` (emergency power, DENT boot, 5-room exploration), `prologuePhase3` (DENT diagnostic, post-Blip transition). Exports: `runPrologue`, `prologuePhase2`, `prologuePhase3`.

- **`chapter1.js`** — Dead in the Water (2,459 lines). Six acts: assessment, repairs (gravity/life support/DENT arm/sensors in any order), discovery (derelict vs asteroid choice), mission execution, departure (fold/gravity/hybrid), chapter end. Export: `runChapter1`.

- **`chapter2.js`** — Signal from the End (2,220 lines). Seven scenes: echo analysis, null acquisition, bypass discovery, fold preparation, first fold set piece, post-blip debrief, SIC detection cliffhanger. Export: `runChapter2`.

- **`chapter3.js`** — Breaching the Charter (3,078 lines). Five scenes: Blip aftermath + RS-7 exploration, station modules (command/storage/comms), lab raid flashback + DENT repair, Graves contact + escape (comply/negotiate/fold), chapter end with second Echo pulse. Export: `runChapter3`.

### Art (`client/js/art/`)

- **`prologue-art.js`** — 12 HTML art functions using `<span class="c-*">` color classes. Displayed via `terminal.showArt()`.

### App (`client/js/app.js`)

`Game.runGameLoop()` sequences chapters (0=prologue, 1, 2, 3, 4=end). Detects existing saves for resume. Dev mode (`--dev` flag) shows chapter select with preset states that simulate balanced playthroughs.

## Game Design Bible

`design/GAME-DESIGN-BIBLE.md` is the **single source of truth** for building new chapters. It contains:

- Full 14-chapter arc table with Truby's 22 narrative beats mapped to each chapter
- Reed's 5 Tests for validating every player choice (Dramatic Question, &, But/Therefore, Convergence, Consequence)
- Three-tier science exposition system: Story (in-dialogue), Monologue (DENT optional), Technical Logs (discoverable)
- Character voice specs (DENT voice changes with repair level 0-3)
- Null energy economy and technology rules
- Converging River Model: different paths must hit the same key narrative beats
- Simulation layer: dual-explanation table (physical vs simulation interpretation)
- Pre-build and post-build validation checklists (required for every new chapter)
- Scene writing template format

**Always read the Game Design Bible before building new scenes or chapters.**

## Literary Voice Plugin

The `literary-voice/` plugin provides three auto-triggering skills that channel Andy Weir, James Dashner, and Ernest Cline's writing techniques into a unified "Echoes voice." When working on any scene file (`client/js/scenes/*.js`) or story content, the `voice-prime` skill activates before writing and the `voice-review` skill activates when refining existing prose. The plugin layers author craft techniques (sentence rhythm, pacing, humor timing) on top of the Game Design Bible's character voice specs.

## Key Patterns

- **State flags**: All story decisions stored in `state.flags["key"]`. Check with `state.getFlag()`, set with `state.setFlag()`.
- **Auto-save**: Call `await state.save()` at major decision points. Single save slot via Electron IPC.
- **DENT voice**: DENT's personality changes with `state.dentRepairLevel` (0.0=broken, 0.3=glitchy, 0.5=personality emerging, 1.0=full character). Use `terminal.dent()` for attributed lines, `terminal.dentLine()` for continuation, `terminal.dentGlitch()` for corrupted speech.
- **Choice menus**: Use `await terminal.arrowMenu(["Option A", "Option B"])` (returns 0-indexed) or `await terminal.showChoices(["A", "B"])` (returns 1-indexed).
- **Scene validation**: Every scene function should have a VALIDATION docstring listing which Truby beats and Reed tests it satisfies.
- **Flashbacks**: Stored in `state.flashbacks` dict. Used for recoverable memory fragments that inform the narrative.
- **No simulation confirmation**: The simulation theory meta-narrative must never be explicitly confirmed in-game. Always maintain dual explanations.
- **All display calls are `await`**: `await terminal.narrate("text")`, `await terminal.arrowMenu(opts)`
- **Art alignment**: IBM Plex Mono font ensures every character is exactly 1 column wide.
- **Colors**: Use CSS classes (`c-orange`, `c-dim`, `c-red`, `c-green`, `c-cyan`, `c-hull`, `c-white-bright`) via `terminal.sayHtml()` for colored text.
