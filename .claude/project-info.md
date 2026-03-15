# Echoes Beyond Infinity - Project Information

## Project Overview
Hard sci-fi text adventure game for Steam release. Player is Vin, sole survivor aboard research vessel Vex, assisted by damaged AI companion DENT. Electron app with CRT aesthetic, pixel-perfect art, and native audio.

## Essential Commands

### Development
```bash
cd client && npm install       # First time only
cd client && npm start         # Launches the game
cd client && npm start -- --dev  # Dev mode: chapter select with preset states
```

## Directory Structure
```
echoes-game/
├── client/               # ALL game code lives here
│   ├── js/
│   │   ├── engine/       # state.js, terminal.js, effects.js, audio.js
│   │   ├── scenes/       # prologue.js, chapter1-3.js (one file per chapter)
│   │   ├── art/          # HTML art functions
│   │   └── app.js        # Game loop, chapter sequencing
│   └── ...
├── design/               # Game Design Bible, art prompts
├── docs/                 # Plans
└── .claude/              # RIPER workflow configuration
```

## Technology Stack
- Electron (desktop app for Steam)
- Vanilla JavaScript (no frameworks)
- Web Audio API (sound/music)
- HTML/CSS with CRT terminal aesthetic
- IBM Plex Mono font

## RIPER Workflow

### Available Commands
- `/riper:strict` - Enable strict RIPER protocol enforcement
- `/riper:research` - Research mode for information gathering
- `/riper:innovate` - Innovation mode for brainstorming
- `/riper:plan` - Planning mode for specifications
- `/riper:execute` - Execution mode for implementation
- `/riper:execute <substep>` - Execute a specific substep from the plan
- `/riper:review` - Review mode for validation
- `/memory:save` - Save context to memory bank
- `/memory:recall` - Retrieve from memory bank
- `/memory:list` - List all memories

### Echoes-Specific Workflow
1. **Research**: Read Game Design Bible + existing chapters for patterns
2. **Innovate**: Brainstorm scene structure using Truby beats + Reed tests
3. **Plan**: Write scene spec with validation checklist
4. **Execute**: Implement chapter following engine patterns
5. **Review**: Validate against Bible, check state consistency

## Memory Bank Policy
- Memory-bank location: `.claude/memory-bank/`
- Branch-aware and date-organized
- Persist chapter specs, review reports, and session context
