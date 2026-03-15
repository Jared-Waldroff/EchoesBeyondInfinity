/**
 * App — bootstrap for Echoes Beyond Infinity.
 *
 * Initializes the game engine, creates the terminal renderer,
 * and runs the full game loop across all chapters.
 * Supports save/load, resume, and dev mode chapter select.
 *
 * Note: All innerHTML usage in this file is hardcoded error UI,
 * never containing user input.
 */
import { GameState } from './engine/state.js';
import { Terminal } from './engine/terminal.js';
import { AudioManager } from './engine/audio.js';
import { Effects } from './engine/effects.js';
import { runPrologue, prologuePhase2, prologuePhase3 } from './scenes/prologue.js';
import { runChapter1 } from './scenes/chapter1.js';
import { runChapter2 } from './scenes/chapter2.js';
import { runChapter3 } from './scenes/chapter3.js';
import { runChapter4 } from './scenes/chapter4.js';
import { runChapter5 } from './scenes/chapter5.js';
import { runChapter6 } from './scenes/chapter6.js';
import { runChapter7 } from './scenes/chapter7.js';
import { runChapter8 } from './scenes/chapter8.js';
import { runChapter9 } from './scenes/chapter9.js';
import { runChapter10 } from './scenes/chapter10.js';
import { runChapter11 } from './scenes/chapter11.js';
import { runChapter12 } from './scenes/chapter12.js';
import { runChapter13 } from './scenes/chapter13.js';
import { runChapter14 } from './scenes/chapter14.js';
import { AUDIO_MANIFEST } from './engine/audio-manifest.js';

class Game {
  constructor() {
    this.terminal = new Terminal(
      document.getElementById('terminal-output'),
      document.getElementById('terminal-input')
    );
    this.audio = new AudioManager();
    this.effects = new Effects();
    this.state = new GameState();
    this.devMode = false;
  }

  async start() {
    // Check dev mode
    if (window.gameAPI && window.gameAPI.isDevMode) {
      this.devMode = await window.gameAPI.isDevMode();
    }

    // Init audio early — Electron relaxes autoplay policy
    this.audio.init();
    await this.audio.preloadAll(AUDIO_MANIFEST);
    this.terminal.setAudio(this.audio);
    this.state.onSave = () => this.audio.play('ui_save');

    // Dev mode: quick title, straight to chapter select
    if (this.devMode) {
      this.terminal.titleCard();
      this.terminal.blank();
      this.audio.ambient('main_theme_loop');
      await this.devChapterSelect();
      return;
    }

    // Start title screen music, then show the interactive title
    this.audio.ambient('main_theme');
    await this.terminal.titleScreen(this.effects);

    // Stop title music and transition to gameplay
    this.audio.stop(1);

    this.terminal.clear();

    // Check for existing save
    const hasSave = await GameState.hasSave();

    if (hasSave) {
      const loaded = await GameState.load();
      if (loaded) {
        this.state = loaded;
        this.state.onSave = () => this.audio.play('ui_save');
        this.terminal.say('Save data detected.', 'dim-text');
        this.terminal.sayHtml(
          `<span class="c-dim">Chapter ${this.state.chapter} | Phase ${this.state.phase} | ${this.state.currentRoom.charAt(0).toUpperCase() + this.state.currentRoom.slice(1)}</span>`
        );
        this.terminal.sayHtml(
          `<span class="c-dim">Flashbacks: ${this.state.flashbackCount}/${this.state.totalFlashbacks} | Health: ${this.state.health}%</span>`
        );
        this.terminal.blank();

        const idx = await this.terminal.arrowMenu(
          ['Resume', 'New game'],
          [
            `Continue from ${this.state.currentRoom.charAt(0).toUpperCase() + this.state.currentRoom.slice(1)}`,
            'Start over \u2014 this will erase your save',
          ]
        );

        if (idx === 0) {
          await this.resumeFromState();
          return;
        } else {
          await GameState.deleteSave();
          this.terminal.say('Save erased. Starting fresh...', 'dim-text');
          this.terminal.blank();
          await this.terminal.pause();
        }
      }
    }

    // New game
    this.state = new GameState();
    this.state.onSave = () => this.audio.play('ui_save');
    await this.runGameLoop();
  }

  async runGameLoop() {
    while (true) {
      if (this.state.chapter > 0) this.audio.play('ui_chapter_transition');
      if (this.state.chapter === 0) {
        await runPrologue(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 1) {
        await runChapter1(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 2) {
        await runChapter2(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 3) {
        await runChapter3(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 4) {
        await runChapter4(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 5) {
        await runChapter5(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 6) {
        await runChapter6(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 7) {
        await runChapter7(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 8) {
        await runChapter8(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 9) {
        await runChapter9(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 10) {
        await runChapter10(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 11) {
        await runChapter11(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 12) {
        await runChapter12(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 13) {
        await runChapter13(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.chapter === 14) {
        await runChapter14(this.terminal, this.state, this.effects, this.audio);
        await this.endScreen();
        break;
      } else {
        await this.endScreen();
        break;
      }
    }
  }

  async resumeFromState() {
    await this.terminal.clearSmooth();
    await this.terminal.typed('Loading save data...', { className: 'dim-text', speed: 20 });
    this.terminal.blank();

    if (this.state.chapter === 0) {
      if (this.state.phase <= 2) {
        await this.terminal.typed('Resuming exploration of The Vex...', { className: 'dim-text', speed: 20 });
        this.terminal.blank();
        await this.terminal.pause();
        // Resume into phase 2 exploration, then phase 3
        await prologuePhase2(this.terminal, this.state, this.effects, this.audio);
        await prologuePhase3(this.terminal, this.state, this.effects, this.audio);
      } else if (this.state.phase === 3) {
        await prologuePhase3(this.terminal, this.state, this.effects, this.audio);
      }
      // After prologue, continue game loop from chapter 1+
      this.state.chapter = 1;
    } else {
      this.terminal.sayHtml(
        `<span class="c-white-bright">Resuming Chapter ${this.state.chapter}...</span>`
      );
      this.terminal.blank();
      await this.terminal.pause();
    }

    await this.runGameLoop();
  }

  // ─── DEV MODE ───

  async devChapterSelect() {
    this.terminal.sayHtml('<span class="c-orange">\u2500\u2500\u2500 DEV MODE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>');
    this.terminal.say('  Select a chapter. A canonical playthrough state', 'dim-text');
    this.terminal.say('  will be generated so all flags/stats are set.', 'dim-text');
    this.terminal.blank();

    const labels = [
      'Prologue: Cold Boot',
      'Ch 1: Dead in the Water',
      'Ch 2: Signal from the End',
      'Ch 3: Breaching the Charter',
      'Ch 4: Coherence Scramblers',
      'Ch 5: Fugitive Trajectory',
      'Ch 6: The Low-Res Universe',
      'Ch 7: The Ghost in the Machine',
      'Ch 8: The Unnatural Cache',
      'Ch 9: The Coherence Net',
      'Ch 10: Calculating the Betrayal',
      'Ch 11: System Integrity: CRITICAL',
      'Ch 12: The Physics of the Paradox',
      'Ch 13: The Overseer\'s Domain',
      'Ch 14: Final Protocol: Cycle N+1',
    ];
    const descs = [
      'Fresh start',
      'Post-Blip, DENT 30%',
      'Fold unlocked, DENT 50%',
      'First fold done, SIC detected',
      'Graves met, Kade alliance',
      'Scramblers survived, DENT 60%',
      'Station resupply, DENT 65%',
      'Deep space, render gap seen',
      'Temporal bleed, DENT 74%',
      'Neural Core, DENT 85%',
      'Coherence Net active',
      'Net Disruptor built, DENT 85%',
      'Net breached, Counter-Pulse',
      'Folded Fold, Bulk entered',
      'Data Bridge found, DENT 95%',
    ];

    const idx = await this.terminal.arrowMenu(labels, descs);
    this.terminal.blank();

    const presets = [
      () => new GameState(),
      presetChapter1,
      presetChapter2,
      presetChapter3,
      presetChapter4,
      presetChapter5,
      presetChapter6,
      presetChapter7,
      presetChapter8,
      presetChapter9,
      presetChapter10,
      presetChapter11,
      presetChapter12,
      presetChapter13,
      presetChapter14,
    ];
    this.state = presets[idx]();
    this.state.onSave = () => this.audio.play('ui_save');

    this.terminal.sayHtml(
      `<span class="c-dim">  Chapter ${this.state.chapter} | HP ${this.state.health} | Neural ${this.state.neural} | Stress ${this.state.stress}</span>`
    );
    this.terminal.sayHtml(
      `<span class="c-dim">  Hull ${this.state.hull}% | Null ${this.state.nullReserves} | DENT ${Math.round(this.state.dentRepairLevel * 100)}%</span>`
    );
    const flagsSet = Object.values(this.state.flags).filter(v => v).length;
    this.terminal.sayHtml(
      `<span class="c-dim">  Flags set: ${flagsSet}/${Object.keys(this.state.flags).length}</span>`
    );
    this.terminal.blank();
    await this.terminal.pause();

    await this.runGameLoop();
  }

  async endScreen() {
    this.terminal.blank();
    await this.terminal.typed('Thank you for playing Echoes Beyond Infinity.', { className: 'dim-text', speed: 25 });
    await this.terminal.typed('You have reached the end of the current build.', { className: 'dim-text', speed: 25 });
    this.terminal.blank();
  }
}

// ─── CHAPTER PRESETS (dev mode) ───

function presetChapter1() {
  const state = new GameState();
  state.health = 80;
  state.neural = 58;
  state.stress = 30;
  state.hull = 62;
  state.nullReserves = 8;
  state.foldStatus = 'LOCK';
  state.foldStability = 0;
  state.gravity = false;
  state.lifeSupportLevel = 11;
  state.chapter = 1;
  state.phase = 3;
  state.currentRoom = 'bridge';
  state.dentRepairLevel = 0.3;
  for (const key of Object.keys(state.flashbacks)) {
    state.flashbacks[key] = true;
  }
  state.addItem('Torquer');
  state.torquerEquipped = true;
  state.torquerNull = 0;
  state.setFlag('dent_online', true);
  state.setFlag('emergency_power', true);
  state.setFlag('knows_name', true);
  state.setFlag('knows_sics', true);
  state.setFlag('knows_echoes', true);
  state.setFlag('knows_destination', true);
  state.setFlag('knows_torquer', true);
  state.setFlag('listened_first', true);
  state.setFlag('nav_repaired', true);
  return state;
}

function presetChapter2() {
  const state = presetChapter1();
  state.chapter = 2;
  state.health = 78;
  state.neural = 55;
  state.stress = 32;
  state.hull = 60;
  state.nullReserves = 13;
  state.foldStatus = 'READY';
  state.foldStability = 0;
  state.lifeSupportLevel = 78;
  state.dentRepairLevel = 0.5;
  state.setFlag('assessment_complete', true);
  state.setFlag('gravity_online', true);
  state.setFlag('sensors_online', true);
  state.setFlag('life_support_patched', true);
  state.setFlag('dent_arm_repaired', true);
  state.setFlag('refuel_choice', 'derelict');
  state.setFlag('derelict_logs_found', true);
  state.setFlag('fuel_regulator_bypass', true);
  state.addItem('Fuel Regulator Bypass');
  state.setFlag('travel_choice', 'fold');
  state.setFlag('echo_signal_detected', true);
  return state;
}

function presetChapter3() {
  const state = presetChapter2();
  state.chapter = 3;
  state.health = 75;
  state.neural = 58;
  state.stress = 33;
  state.hull = 60;
  state.nullReserves = 18;
  state.foldStatus = 'READY';
  state.foldStability = 72;
  state.dentRepairLevel = 0.5;
  state.setFlag('fold_drive_unlocked', true);
  state.setFlag('first_fold_complete', true);
  state.setFlag('first_blip_witnessed', true);
  state.setFlag('echo_decoded', true);
  state.setFlag('echo_investigation_method', 'analyze');
  state.setFlag('bypass_install_method', 'self');
  state.setFlag('fold_execution_style', 'smooth');
  state.setFlag('blip_reaction', 'scientific');
  state.setFlag('sic_detected_fold', true);
  state.setFlag('echo_flashback_seen', true);
  state.setFlag('echo_unknown_analyzed', true);
  state.setFlag('debris_field_explored', true);
  state.setFlag('found_calibration_chip', true);
  state.addItem('Optical Calibration Chip');
  return state;
}

function presetChapter4() {
  const state = presetChapter3();
  state.chapter = 4;
  state.health = 72;
  state.neural = 55;
  state.stress = 38;
  state.hull = 55;
  state.nullReserves = 15;
  state.foldStatus = 'READY';
  state.foldStability = 65;
  state.dentRepairLevel = 0.55;
  state.setFlag('rs7_explored', true);
  state.setFlag('rs7_command_accessed', true);
  state.setFlag('rs7_log_anomaly_seen', true);
  state.setFlag('null_locker_forced', true);
  state.setFlag('dent_repair_ch3', 'optical');
  state.setFlag('flashback_lab_raid', true);
  state.setFlag('graves_introduced', true);
  state.setFlag('graves_escape_method', 'fold');
  state.setFlag('graves_negotiated', true);
  state.setFlag('sic_pursuit_active', true);
  state.setFlag('chapter3_complete', true);
  return state;
}

function presetChapter5() {
  const state = presetChapter4();
  state.chapter = 5;
  state.health = 68;
  state.neural = 52;
  state.stress = 42;
  state.hull = 50;
  state.nullReserves = 18;
  state.foldStatus = 'READY';
  state.foldStability = 58;
  state.dentRepairLevel = 0.60;
  state.setFlag('graves_direct_contact', true);
  state.setFlag('graves_response_ch4', 'challenge');
  state.setFlag('kade_introduced', true);
  state.setFlag('kade_alliance_terms', 'negotiated');
  state.setFlag('kade_frequency_obtained', true);
  state.setFlag('scrambler_hit', true);
  state.setFlag('scrambler_damage_level', 'moderate');
  state.setFlag('folder_intercept_method', 'cautious');
  state.setFlag('dent_secondary_optic', true);
  state.setFlag('flashback_echo_receipt', true);
  state.setFlag('chapter4_complete', true);
  state.addItem('Folder Frequency Code');
  return state;
}

function presetChapter6() {
  const state = presetChapter5();
  state.chapter = 6;
  state.health = 65;
  state.neural = 50;
  state.stress = 40;
  state.hull = 52;
  state.nullReserves = 25;
  state.foldStatus = 'READY';
  state.foldStability = 62;
  state.dentRepairLevel = 0.65;
  state.setFlag('station_approach_method', 'cautious');
  state.setFlag('station_name', 'K-7');
  state.setFlag('sensor_array_repaired', true);
  state.setFlag('dent_repair_ch5', 'mobility');
  state.setFlag('deep_space_nav_chart', true);
  state.setFlag('escape_sol_method', 'undock');
  state.setFlag('dent_memory_question_ch6', true);
  state.setFlag('chapter5_complete', true);
  state.addItem('Deep Space Nav Chart');
  state.addItem('Relay Module');
  return state;
}

function presetChapter7() {
  const state = presetChapter6();
  state.chapter = 7;
  state.health = 62;
  state.neural = 48;
  state.stress = 45;
  state.hull = 50;
  state.nullReserves = 22;
  state.foldStatus = 'READY';
  state.foldStability = 55;
  state.dentRepairLevel = 0.70;
  state.setFlag('render_gap_observed', true);
  state.setFlag('render_gap_dent_discussed', true);
  state.setFlag('isolation_days', 3);
  state.setFlag('dent_repair_ch6', 'vocal_processor');
  state.setFlag('chapter6_complete', true);
  return state;
}

function presetChapter8() {
  const state = presetChapter7();
  state.chapter = 8;
  state.health = 58;
  state.neural = 45;
  state.stress = 50;
  state.hull = 45;
  state.nullReserves = 18;
  state.foldStatus = 'READY';
  state.foldStability = 50;
  state.dentRepairLevel = 0.74;
  state.setFlag('temporal_bleed_witnessed', true);
  state.setFlag('ghost_vin_encountered', true);
  state.setFlag('ghost_vin_response', 'approached');
  state.setFlag('sic_ambush_survived', true);
  state.setFlag('temporal_stabilizer_acquired', true);
  state.setFlag('dent_repair_ch7', 'mobility_servos');
  state.setFlag('chapter7_complete', true);
  state.addItem('Temporal Stabilizer');
  return state;
}

function presetChapter9() {
  const state = presetChapter8();
  state.chapter = 9;
  state.health = 55;
  state.neural = 50;
  state.stress = 48;
  state.hull = 42;
  state.nullReserves = 15;
  state.foldStatus = 'READY';
  state.foldStability = 45;
  state.dentRepairLevel = 0.85;
  state.setFlag('core_anomaly_detected', true);
  state.setFlag('graves_escape_path', true);
  state.setFlag('ch8_path', 'escape');
  state.setFlag('neural_core_restored', true);
  state.setFlag('core_beacon_signal', true);
  state.setFlag('chapter8_complete', true);
  state.addItem('Core Anomaly Beacon Signal');
  return state;
}

function presetChapter10() {
  const state = presetChapter9();
  state.chapter = 10;
  state.health = 52;
  state.neural = 48;
  state.stress = 52;
  state.hull = 40;
  state.nullReserves = 12;
  state.foldStatus = 'LOCK';
  state.foldStability = 0;
  state.dentRepairLevel = 0.85;
  state.setFlag('coherence_net_active', true);
  state.setFlag('fold_drive_disabled', true);
  state.setFlag('kade_alliance_renewed', true);
  state.setFlag('net_disruptor_prototype', true);
  state.setFlag('resource_management_ch9', 'balanced');
  state.setFlag('chapter9_complete', true);
  return state;
}

function presetChapter11() {
  const state = presetChapter10();
  state.chapter = 11;
  state.health = 48;
  state.neural = 45;
  state.stress = 55;
  state.hull = 38;
  state.nullReserves = 14;
  state.foldStatus = 'LOCK';
  state.foldStability = 0;
  state.dentRepairLevel = 0.85;
  state.setFlag('net_disruptor_built', true);
  state.setFlag('torquer_retrieved', true);
  state.setFlag('alliance_status', 'uneasy');
  state.setFlag('dent_repair_ch10', 'processing');
  state.setFlag('chapter10_complete', true);
  state.addItem('Net Disruptor');
  return state;
}

function presetChapter12() {
  const state = presetChapter11();
  state.chapter = 12;
  state.health = 42;
  state.neural = 40;
  state.stress = 60;
  state.hull = 32;
  state.nullReserves = 10;
  state.foldStatus = 'READY';
  state.foldStability = 35;
  state.dentRepairLevel = 0.85;
  state.setFlag('net_breached', true);
  state.setFlag('counter_pulse_fired', true);
  state.setFlag('three_way_battle', true);
  state.setFlag('combat_tactics_ch11', 'calculated');
  state.setFlag('simulation_evidence_critical', true);
  state.setFlag('chapter11_complete', true);
  state.addItem('Counter-Pulse Charge');
  return state;
}

function presetChapter13() {
  const state = presetChapter12();
  state.chapter = 13;
  state.health = 38;
  state.neural = 35;
  state.stress = 65;
  state.hull = 28;
  state.nullReserves = 8;
  state.foldStatus = 'ACTIVE';
  state.foldStability = 20;
  state.dentRepairLevel = 0.85;
  state.setFlag('folded_fold_initiated', true);
  state.setFlag('folded_fold_stages_complete', 3);
  state.setFlag('reality_breakdown_witnessed', true);
  state.setFlag('dent_memory_file_observed', true);
  state.setFlag('bulk_dimension_entered', true);
  state.setFlag('chapter12_complete', true);
  return state;
}

function presetChapter14() {
  const state = presetChapter13();
  state.chapter = 14;
  state.health = 35;
  state.neural = 30;
  state.stress = 70;
  state.hull = 25;
  state.nullReserves = 5;
  state.foldStatus = 'ACTIVE';
  state.foldStability = 10;
  state.dentRepairLevel = 0.95;
  state.setFlag('bulk_explored', true);
  state.setFlag('bulk_discovery_pace', 'measured');
  state.setFlag('simulation_evidence_overwhelming', true);
  state.setFlag('vin_suspects_cycles', true);
  state.setFlag('data_bridge_found', true);
  state.setFlag('dent_deep_memory_unlocked', true);
  state.setFlag('chapter13_complete', true);
  state.addItem('Data Bridge');
  return state;
}

// ─── INIT ───

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.start().catch(err => {
    console.error('Game error:', err);
    // Hardcoded error display — no user input in this string
    const output = document.getElementById('terminal-output');
    const errorLine = document.createElement('div');
    errorLine.className = 'terminal-line warning-line';
    errorLine.textContent = `Error: ${err.message}`;
    output.appendChild(errorLine);
  });
});
