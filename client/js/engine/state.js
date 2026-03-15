/**
 * GameState — central state object for Echoes Beyond Infinity.
 * Mirrors the Python GameState in engine/core.py.
 */
export class GameState {
  constructor() {
    // Player stats
    this.health = 100;
    this.neural = 100;
    this.stress = 0;

    // Ship stats
    this.hull = 100;
    this.foldStatus = 'LOCK'; // LOCK, READY, ACTIVE
    this.foldStability = 0;
    this.gravity = false;

    // Inventory
    this.inventory = [];
    this.torquerEquipped = false;
    this.torquerNull = 0;

    // Callbacks
    this.onSave = null;

    // Story progress
    this.chapter = 0; // 0 = prologue
    this.phase = 1;   // 1=dark, 2=flicker, 3=full boot
    this.currentRoom = 'bridge';

    // Flashbacks discovered (prologue)
    this.flashbacks = {
      photo_frame: false,
      burn_marks: false,
      torquer_case: false,
      recording: false,
      nav_console: false,
    };

    // Story flags — all chapters
    this.flags = {
      dent_online: false,
      emergency_power: false,
      nav_repaired: false,
      knows_name: false,
      knows_sics: false,
      knows_echoes: false,
      knows_destination: false,
      knows_torquer: false,
      listened_first: false,
      chose_to_destroy: false,
      // Chapter 1
      gravity_online: false,
      sensors_online: false,
      life_support_patched: false,
      dent_arm_repaired: false,
      assessment_complete: false,
      refuel_choice: '',
      travel_choice: '',
      derelict_logs_found: false,
      derelict_defenses_triggered: false,
      asteroid_gravity_pocket: false,
      used_torquer_mining: false,
      fuel_regulator_bypass: false,
      echo_signal_detected: false,
      // Chapter 2
      fold_drive_unlocked: false,
      first_fold_complete: false,
      first_blip_witnessed: false,
      echo_decoded: false,
      echo_investigation_method: '',
      bypass_install_method: '',
      fold_execution_style: '',
      blip_reaction: '',
      sic_detected_fold: false,
      found_calibration_chip: false,
      echo_flashback_seen: false,
      echo_unknown_analyzed: false,
      debris_field_explored: false,
      // Chapter 3
      rs7_explored: false,
      rs7_command_accessed: false,
      rs7_log_anomaly_seen: false,
      rs7_environmental_glitch: false,
      null_locker_forced: false,
      dent_repair_ch3: '',
      flashback_lab_raid: false,
      graves_introduced: false,
      graves_escape_method: '',
      graves_deceived: false,
      graves_negotiated: false,
      graves_calibrated_signature: false,
      graves_defied: false,
      sic_priority_target: false,
      sic_sector_activity: false,
      sic_pursuit_active: false,
      chronometric_dampeners: false,
      dent_graves_question: '',
      chapter3_complete: false,
      // Chapter 4
      graves_direct_contact: false,
      graves_response_ch4: '',
      kade_introduced: false,
      kade_alliance_terms: '',
      kade_frequency_obtained: false,
      scrambler_hit: false,
      scrambler_damage_level: '',
      folder_intercept_method: '',
      dent_secondary_optic: false,
      flashback_echo_receipt: false,
      chapter4_complete: false,
      // Chapter 5
      station_approach_method: '',
      station_name: '',
      sensor_array_repaired: false,
      dent_repair_ch5: '',
      deep_space_nav_chart: false,
      stealth_module_acquired: false,
      signal_amplifier_acquired: false,
      escape_sol_method: '',
      chapter5_complete: false,
      // Chapter 6
      render_gap_observed: false,
      render_gap_technical: false,
      render_gap_dent_discussed: false,
      isolation_days: 0,
      dent_memory_question_ch6: false,
      dent_repair_ch6: '',
      chapter6_complete: false,
      // Chapter 7
      temporal_bleed_witnessed: false,
      ghost_vin_encountered: false,
      ghost_vin_response: '',
      sic_ambush_survived: false,
      temporal_stabilizer_acquired: false,
      dent_repair_ch7: '',
      chapter7_complete: false,
      // Chapter 8
      core_anomaly_detected: false,
      graves_capture_path: false,
      graves_escape_path: false,
      ch8_path: '',
      neural_core_restored: false,
      torquer_lost: false,
      core_beacon_signal: false,
      dent_repair_level_post_ch8: 0,
      chapter8_complete: false,
      // Chapter 9
      coherence_net_active: false,
      fold_drive_disabled: false,
      kade_trapped: false,
      kade_alliance_renewed: false,
      net_disruptor_prototype: false,
      resource_management_ch9: '',
      chapter9_complete: false,
      // Chapter 10
      forced_alliance_terms: '',
      net_disruptor_built: false,
      torquer_retrieved: false,
      kade_betrayal_first: false,
      vin_betrayal_first: false,
      alliance_status: '',
      dent_repair_ch10: '',
      chapter10_complete: false,
      // Chapter 11
      net_breached: false,
      counter_pulse_fired: false,
      three_way_battle: false,
      combat_tactics_ch11: '',
      simulation_evidence_critical: false,
      chapter11_complete: false,
      // Chapter 12
      folded_fold_initiated: false,
      folded_fold_stages_complete: 0,
      reality_breakdown_witnessed: false,
      dent_memory_file_observed: false,
      bulk_dimension_entered: false,
      chapter12_complete: false,
      // Chapter 13
      bulk_explored: false,
      bulk_discovery_pace: '',
      simulation_evidence_overwhelming: false,
      vin_suspects_cycles: false,
      data_bridge_found: false,
      dent_deep_memory_unlocked: false,
      chapter13_complete: false,
      // Chapter 14
      echo_send_choice: '',
      loop_closed: false,
      cycle_complete: false,
      chapter14_complete: false,
    };

    // Chapter 1 stats
    this.lifeSupportLevel = 11;
    this.nullReserves = 8;

    // DENT personality state
    this.dentRepairLevel = 0.3; // 0.0 = broken, 1.0 = fully repaired

    // Timestamps
    this.createdAt = Date.now();
    this.playedSeconds = 0;
    this.saveCount = 0;

    // Settings
    this.fastMode = false;
  }

  // ─── Fuel alias ───

  get fuel() { return this.nullReserves; }
  set fuel(v) { this.nullReserves = v; }

  // ─── Computed ───

  get playerStats() {
    return { health: this.health, neural: this.neural, stress: this.stress };
  }

  get shipStats() {
    return {
      hull: this.hull,
      fuel: this.nullReserves,
      foldStatus: this.foldStatus,
      foldStability: this.foldStability,
    };
  }

  get flashbackCount() {
    return Object.values(this.flashbacks).filter(v => v).length;
  }

  get totalFlashbacks() {
    return Object.keys(this.flashbacks).length;
  }

  // ─── Inventory ───

  addItem(item) {
    if (!this.inventory.includes(item)) {
      this.inventory.push(item);
      return true;
    }
    return false;
  }

  hasItem(item) {
    return this.inventory.includes(item);
  }

  removeItem(item) {
    this.inventory = this.inventory.filter(i => i !== item);
  }

  // ─── Flags ───

  setFlag(key, value = true) {
    this.flags[key] = value;
  }

  getFlag(key) {
    return this.flags[key] || false;
  }

  // ─── Flashbacks ───

  discoverFlashback(name) {
    if (name in this.flashbacks) {
      this.flashbacks[name] = true;
      return true;
    }
    return false;
  }

  // ─── Stat changes ───

  applyDamage({ health = 0, neural = 0, stress = 0, hull = 0, null: nullDmg = 0 } = {}) {
    this.health = Math.max(0, Math.min(100, this.health + health));
    this.neural = Math.max(0, Math.min(100, this.neural + neural));
    this.stress = Math.max(0, Math.min(100, this.stress + stress));
    this.hull = Math.max(0, Math.min(100, this.hull + hull));
    this.nullReserves = Math.max(0, Math.min(100, this.nullReserves + nullDmg));
  }

  setPostBlipStats() {
    this.health = 80;
    this.neural = 58;
    this.stress = 30;
    this.hull = 62;
    this.nullReserves = 8;
    this.foldStatus = 'LOCK';
  }

  // ─── Save / Load ───

  serialize() {
    return {
      meta: {
        saveCount: this.saveCount,
        createdAt: this.createdAt,
        savedAt: Date.now(),
        playedSeconds: this.playedSeconds,
        version: '0.2.0',
      },
      player: { health: this.health, neural: this.neural, stress: this.stress },
      ship: {
        hull: this.hull,
        fuel: this.nullReserves,
        foldStatus: this.foldStatus,
        foldStability: this.foldStability,
      },
      inventory: [...this.inventory],
      torquer: { equipped: this.torquerEquipped, null: this.torquerNull },
      progress: { chapter: this.chapter, phase: this.phase, currentRoom: this.currentRoom },
      flashbacks: { ...this.flashbacks },
      flags: { ...this.flags },
      dentRepairLevel: this.dentRepairLevel,
      lifeSupportLevel: this.lifeSupportLevel,
      nullReserves: this.nullReserves,
    };
  }

  static deserialize(data) {
    const state = new GameState();

    // Support both old flat format and new structured format
    if (data.meta) {
      // New structured format
      state.health = data.player.health;
      state.neural = data.player.neural;
      state.stress = data.player.stress;
      state.hull = data.ship.hull;
      state.foldStatus = data.ship.foldStatus;
      state.foldStability = data.ship.foldStability;
      state.inventory = data.inventory || [];
      if (data.torquer) {
        state.torquerEquipped = data.torquer.equipped || false;
        state.torquerNull = data.torquer.null || 0;
      }
      state.chapter = data.progress.chapter;
      state.phase = data.progress.phase;
      state.currentRoom = data.progress.currentRoom || 'bridge';
      Object.assign(state.flashbacks, data.flashbacks || {});
      Object.assign(state.flags, data.flags || {});
      state.dentRepairLevel = data.dentRepairLevel ?? 0.3;
      state.lifeSupportLevel = data.lifeSupportLevel ?? 11;
      state.nullReserves = data.nullReserves ?? data.ship?.fuel ?? 8;
      state.createdAt = data.meta.createdAt || Date.now();
      state.playedSeconds = data.meta.playedSeconds || 0;
      state.saveCount = data.meta.saveCount || 0;
    } else {
      // Old flat format (backward compat)
      Object.assign(state, data);
    }

    return state;
  }

  async save() {
    this.saveCount++;
    if (this.onSave) this.onSave();
    const data = this.serialize();
    if (window.gameAPI) {
      await window.gameAPI.saveGame(data);
    } else {
      localStorage.setItem('echoes-save', JSON.stringify(data));
    }
  }

  static async load() {
    let data;
    if (window.gameAPI) {
      data = await window.gameAPI.loadGame();
    } else {
      const raw = localStorage.getItem('echoes-save');
      data = raw ? JSON.parse(raw) : null;
    }
    return data ? GameState.deserialize(data) : null;
  }

  static async hasSave() {
    if (window.gameAPI) {
      return window.gameAPI.hasSave();
    }
    return !!localStorage.getItem('echoes-save');
  }

  static async deleteSave() {
    if (window.gameAPI) {
      await window.gameAPI.deleteSave();
    } else {
      localStorage.removeItem('echoes-save');
    }
  }
}
