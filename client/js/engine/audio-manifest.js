/**
 * Audio Manifest — every audio ID used in the game.
 *
 * Aligned with docs/AUDIO-DESIGN.md (single source of truth).
 * Each entry maps to a file at assets/audio/{id}.mp3 (or .wav fallback).
 * Missing files are silently skipped during preload.
 * To add new audio: drop the .mp3 in assets/audio/ and add the ID here.
 */
export const AUDIO_MANIFEST = [
  // ── Music Tracks (M01-M22) ──────────────────
  'main_theme',
  'main_theme_loop',
  'theme_cold_boot',
  'theme_emergency_power',
  'theme_dead_in_water',
  'theme_signal',
  'theme_first_fold',
  'theme_relay_station',
  'theme_graves',
  'theme_scrambler_attack',
  'theme_fugitive',
  'theme_low_res',
  'theme_ghost',
  'theme_ambush',
  'theme_core_anomaly',
  'theme_coherence_net',
  'theme_betrayal',
  'theme_battle',
  'theme_folded_fold',
  'theme_bulk',
  'theme_final',
  'theme_dent',

  // ── Emotional Stingers (M23-M27) ────────────
  'stinger_chapter_start',
  'stinger_revelation',
  'stinger_danger',
  'stinger_emotional',
  'stinger_cliffhanger',

  // ── Ambient Loops — Ship (A01-A09) ──────────
  'void_loop',
  'ship_damaged_idle',
  'deep_space_hum',
  'deep_space',
  'deep_hum',
  'ship_hum_heavy',
  'workshop_hum',
  'low_power_hum',
  'quiet_ops',

  // ── Ambient Loops — Location (A10-A14) ──────
  'station_ambient',
  'derelict_ambient',
  'asteroid_ambient',
  'eva_ambient',
  'debris_ambient',

  // ── Ambient Loops — Tension (A15-A18) ───────
  'tension_low',
  'threat_hum',
  'battle_ambience',
  'flight_tense',

  // ── Ambient Loops — Anomaly (A19-A27) ───────
  'anomaly_pulse',
  'resonance_hum',
  'core_anomaly_hum',
  'deep_space_pulse',
  'bulk_silence',
  'void_drone',
  'deep_structure_hum',
  'space_quiet',
  'echo_signal_ambient',

  // ── SFX — Ship Systems (S01-S20) ────────────
  'ship_groan',
  'hull_creak',
  'hull_impact',
  'hull_alarm',
  'emergency',
  'boot',
  'gravity_restore',
  'gravity_drive',
  'life_support_hum',
  'sensor_boot',
  'scan_ping',
  'airlock_cycle',
  'alarm',
  'alarm_klaxon',
  'alarm_short',
  'alarm_proximity',
  'system_lockdown',
  'system_power_down',
  'system_power_up',
  'power_up',

  // ── SFX — Fold Drive (S21-S34) ─────────────
  'fold_initiate',
  'fold_jump',
  'fold_exit',
  'fold_arrival',
  'emergency_fold',
  'fold_spinup',
  'fold_alarm',
  'fold_charge',
  'fold_activate',
  'fold_effect',
  'fold_charge_low',
  'fold_recursive',
  'fold_collapse',
  'blip_event',

  // ── SFX — Weapons (S35-S46) ────────────────
  'turret_fire',
  'torquer_fire',
  'torquer_equip',
  'scrambler_hit',
  'shield_up',
  'impact_heavy',
  'impact_medium',
  'explosion_distant',
  'battle_start',
  'counter_pulse_fire',
  'net_collapse',
  'engines_full',

  // ── SFX — Comms (S47-S55) ──────────────────
  'echo_signal',
  'echo_analyze',
  'echo_distant',
  'echo_transmit',
  'comms_static',
  'comms_open',
  'comms_close',
  'comms_incoming',
  'sic_ping',

  // ── SFX — DENT (S56-S60) ──────────────────
  'dent_boot',
  'dent_repair',
  'deep_repair_tone',
  'servo_whir',
  'system_ping',

  // ── SFX — Tools (S61-S67) ─────────────────
  'wrench_clang',
  'weld_spark',
  'welding_torch',
  'tool_work',
  'grapple_fire',
  'bypass_install',
  'exotic_harvest',

  // ── SFX — Navigation (S68-S70) ─────────────
  'thruster_burn',
  'thrusters_soft',
  'door_open',

  // ── SFX — Data & Discovery (S71-S79) ───────
  'data_display',
  'data_processing',
  'data_stream_pulse',
  'discovery_tone',
  'anomaly_tone',
  'anomaly_detected',
  'temporal_glitch',
  'tension_build',
  'ambient_bulk',

  // ── UI Sounds (U01-U07) ────────────────────
  'ui_select',
  'ui_confirm',
  'ui_typing',
  'ui_pause',
  'ui_save',
  'ui_chapter_transition',
  'ui_warning',
];
