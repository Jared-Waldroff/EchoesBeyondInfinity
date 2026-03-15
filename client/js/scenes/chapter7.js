/**
 * CHAPTER 7: THE GHOST IN THE MACHINE
 *
 * Temporal bleed encounters, SIC ambush, ghost Vin (overlapping past/future),
 * Temporal Stabilizer acquired.
 *
 * Truby beat #13: Attack by Opponent
 * DENT repair level: ~0.70 — witty, confident, asks uncomfortable questions
 * Literary voice: Chase (Dashner 60% / Weir 25% / Cline 15%)
 *
 * State flags set this chapter:
 *   temporal_bleed_witnessed, ghost_vin_encountered, ghost_vin_response,
 *   sic_ambush_survived, temporal_stabilizer_acquired, dent_repair_ch7,
 *   chapter7_complete
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter7(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_ghost');
  await terminal.chapterTitle(7, 'THE GHOST IN THE MACHINE');

  await temporalBleed(terminal, state, effects, audio);
  await ghostVin(terminal, state, effects, audio);
  await sicAmbush(terminal, state, effects, audio);
  await temporalStabilizerSalvage(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: TEMPORAL BLEED
// ═══════════════════════════════════════════════════════

/**
 * VALIDATION:
 *   Truby beat #13 — Attack by Opponent (reality itself fracturing under SIC pursuit)
 *   Reed test: Dramatic Question — Is Vin's experience of time reliable?
 *   Reed test: But/Therefore — Blip durations increasing, THEREFORE temporal coherence failing
 *   Simulation evidence tier: Text from past/future overlaps present (data out of order)
 *   Dual explanation: time dilation from fold accumulation vs. simulation buffer lag
 *   No simulation confirmation maintained.
 */
async function temporalBleed(terminal, state, effects, audio) {
  // --- Wake into distortion ---
  state.applyDamage({ stress: 8 });

  audio.ambient('deep_hum');

  await terminal.narrate('I come awake wrong.');
  terminal.blank();

  await terminal.narrate('Not the gradual way — light under eyelids,');
  await terminal.narrate('body remembering it exists. This is abrupt.');
  await terminal.narrate('Like a file that loaded halfway and then');
  await terminal.narrate('continued from the beginning.');
  terminal.blank();

  await wait(400);

  await terminal.thought('Something is wrong with the air.');
  terminal.blank();

  await terminal.narrate('The Vex hums around me. Normal. The corridor');
  await terminal.narrate('lights are on. Normal. My hands are where');
  await terminal.narrate('I left them.');
  terminal.blank();

  await wait(600);

  // --- First temporal fragment intrudes ---
  await effects.glitch(300);

  terminal.blank();
  await terminal.flashback('[ The stars are wrong. ]');
  terminal.blank();

  await wait(300);

  await terminal.narrate('I blink. That wasn\'t—');
  terminal.blank();

  await effects.glitch(200);

  await terminal.flashback('[ I come awake in the dark. ]');
  await terminal.flashback('[ No light. No sound. No ship. ]');
  terminal.blank();

  await wait(400);

  await terminal.thought('That\'s the Prologue. That\'s — that already');
  await terminal.thought('happened. Why am I hearing it now?');
  terminal.blank();

  await terminal.narrate('I grab the corridor rail. Both hands. Real');
  await terminal.narrate('metal, cold, solid. Focus on that.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- DENT detects anomaly ---
  await terminal.dent('Vin. Are you awake? Your biometrics suggest');
  await terminal.dentLine('you\'ve been standing in the corridor for');
  await terminal.dentLine('approximately six minutes. Moving.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Six minutes."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I just woke up."</span>');
  terminal.blank();

  await wait(600);

  await terminal.dent('The ship log agrees with you. Curious.');
  terminal.blank();

  await wait(300);

  await terminal.dent('I\'m also reading a time dilation anomaly.');
  await terminal.dentLine('Local elapsed time versus chronometer time');
  await terminal.dentLine('have diverged by — hold on.');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-hull">┌─ TEMPORAL COHERENCE MONITOR ─────────────────┐</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Ship chronometer .......... <span class="c-white-bright">07:14:33 UTC</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Local sensor time .......... <span class="c-yellow">07:14:27 UTC</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Discrepancy ................ <span class="c-red">-6.0 seconds</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Blip accumulation (folds) .. <span class="c-yellow">9 events</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Last Blip duration ......... <span class="c-red">1.3 seconds</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Trend ...................... <span class="c-red">INCREASING</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>');
  terminal.sayHtml('  <span class="c-hull">└──────────────────────────────────────────────┘</span>');
  terminal.blank();

  await wait(400);

  await terminal.dent('The timeline is...leaking. Past and future');
  await terminal.dentLine('data are arriving simultaneously.');
  terminal.blank();

  await wait(500);

  await terminal.thought('Leaking. That\'s a word an AI uses when it');
  await terminal.thought('doesn\'t have a better word.');
  terminal.blank();

  await terminal.thought('Or when the better word is too alarming.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Full temporal bleed event ---
  await terminal.narrate('I step onto the bridge. The console is alive');
  await terminal.narrate('with readouts — sensor feeds, fold telemetry,');
  await terminal.narrate('navigation projections. Routine.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('Then the readouts stutter.');
  terminal.blank();

  await effects.screenTear(3, 250);

  await wait(300);

  // Past and future fragments bleeding through simultaneously
  terminal.sayHtml('  <span class="c-dim">[ SIGNAL FRAGMENT — ORIGIN: UNKNOWN ]</span>');
  terminal.blank();

  await terminal.flashback('Emergency power. That\'s all we have.');
  await wait(200);
  await terminal.flashback('Hull integrity: 34%. Life support: failing.');
  await wait(200);
  await terminal.flashback('DENT: "The fold is ready. We have one shot."');
  terminal.blank();

  await effects.glitch(400);

  await terminal.flashback('[ FUTURE? ] The interceptors are close.');
  await terminal.flashback('[ FUTURE? ] Null reserves at six percent.');
  await terminal.flashback('[ FUTURE? ] DENT: "We are out of options—"');
  terminal.blank();

  await effects.screenTear(4, 300);

  await wait(500);

  terminal.blank();
  await terminal.narrate('The readouts snap back. Normal. Fold');
  await terminal.narrate('telemetry, navigation, sensor feeds. Like');
  await terminal.narrate('nothing happened.');
  terminal.blank();

  await wait(400);

  await terminal.thought('We are out of options.');
  terminal.blank();

  await terminal.thought('I haven\'t heard that yet. DENT hasn\'t said it.');
  await terminal.thought('But I know the exact tone it will arrive in.');
  terminal.blank();

  await terminal.thought('Future tense. I read it in future tense.');
  terminal.blank();

  await wait(600);

  await terminal.dent('The EM bleed from accumulated folds can cause');
  await terminal.dentLine('sensor buffer corruption. Old data packets');
  await terminal.dentLine('mixing with new ones. It\'s a known phenomenon.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Albeit one I\'ve never personally observed at');
  await terminal.dentLine('this intensity.');
  terminal.blank();

  await wait(300);

  await terminal.thought('A known phenomenon. Filed in the same drawer');
  await terminal.thought('as \'the hydrospanner moved itself\' and');
  await terminal.thought('\'eleven seconds of fold transit we can\'t account for.\'');
  terminal.blank();

  await terminal.thought('The drawer is getting full.');
  terminal.blank();

  state.setFlag('temporal_bleed_witnessed', true);

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: GHOST VIN
// ═══════════════════════════════════════════════════════

/**
 * VALIDATION:
 *   Truby beat #13 — Attack by Opponent (opponent here is reality's coherence)
 *   Reed test: Dramatic Question — Who is Vin, if Vin has been here before?
 *   Reed test: Convergence — All paths end with ghost vanishing + DENT disturbed
 *   Simulation evidence tier: Previous cycle bleeding through (strongest evidence yet)
 *   Dual explanation: temporal echo from fold interference vs. simulation loop artifact
 *   ghost_vin_response set based on player choice.
 *   No simulation confirmation maintained — DENT offers physical explanation.
 */
async function ghostVin(terminal, state, effects, audio) {
  state.setFlag('ghost_vin_encountered', true);

  audio.ambient('tension_low');

  await terminal.narrate('The corridor between engineering and the');
  await terminal.narrate('bridge is thirty-two steps. I know because');
  await terminal.narrate('I counted them once, during the first week');
  await terminal.narrate('alone, when counting things kept me sane.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('I\'m at step nineteen when I see him.');
  terminal.blank();

  await wait(800);

  await effects.flash('white', 200);

  await wait(300);

  await terminal.narrate('A figure. At the far end of the corridor.');
  await terminal.narrate('Near the access hatch to the fold room.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('My height. My build. My posture — the slight');
  await terminal.narrate('forward lean I developed after months of');
  await terminal.narrate('low-grav. Wearing my clothes.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('Except translucent. Like a projection with');
  await terminal.narrate('the gain turned down. Like looking at a person');
  await terminal.narrate('through frosted glass.');
  terminal.blank();

  await wait(400);

  await terminal.thought('...');
  terminal.blank();

  await wait(600);

  await terminal.narrate('He — it — moves. Opens the fold room hatch.');
  await terminal.narrate('Steps through. Waits. Steps back out. Opens');
  await terminal.narrate('the hatch again. The same sequence, exact,');
  await terminal.narrate('on a loop. Patient as machinery.');
  terminal.blank();

  await wait(500);

  await terminal.thought('That\'s me. That is me. What I look like from');
  await terminal.thought('behind. The way I move through that door.');
  terminal.blank();

  await terminal.thought('I\'ve made that sequence a thousand times.');
  terminal.blank();

  await wait(400);

  await terminal.pause();
  terminal.clear();

  // --- Player choice ---
  terminal.blank();
  await terminal.narrate('The figure loops. Open. Through. Wait. Back.');
  await terminal.narrate('Open. Through. Wait. Back. It doesn\'t look up.');
  await terminal.narrate('It doesn\'t know I\'m here.');
  terminal.blank();

  await wait(400);

  await terminal.thought('What do I do?');
  terminal.blank();

  const choice = await terminal.arrowMenu(
    ['Approach the figure', 'Observe from distance', 'Call DENT'],
    [
      'Move toward it. Get close. See what happens.',
      'Stay back. Watch the loop. Count the repetitions.',
      'Have DENT scan it before you do anything.'
    ]
  );

  terminal.blank();

  if (choice === 0) {
    // Approach
    state.setFlag('ghost_vin_response', 'approached');

    await terminal.narrate('I walk toward it. Steps twenty through');
    await terminal.narrate('thirty-two, methodical, like approaching');
    await terminal.narrate('a piece of equipment that might be live.');
    terminal.blank();

    await wait(400);

    await terminal.narrate('At twenty-six, it looks up.');
    terminal.blank();

    await wait(600);

    await effects.flash('white', 300);

    await terminal.narrate('Not at me. Through me. At something behind');
    await terminal.narrate('me, or nothing at all. The eyes are wrong —');
    await terminal.narrate('present without seeing, lit without focus.');
    terminal.blank();

    await wait(400);

    await terminal.thought('My own face. Looking through me like I\'m');
    await terminal.thought('the ghost.');
    terminal.blank();

    await wait(500);

    await terminal.narrate('At step thirty, the figure flickers.');
    terminal.blank();

    await effects.glitch(400);

    await terminal.narrate('At step thirty-one, it\'s gone.');
    terminal.blank();

    await wait(400);

    await terminal.narrate('I stand at the fold room hatch. My hand');
    await terminal.narrate('reaches for it automatically. Same posture,');
    await terminal.narrate('same angle. Same everything.');
    terminal.blank();

    await terminal.thought('I just did what it was doing.');
    terminal.blank();

  } else if (choice === 1) {
    // Observe
    state.setFlag('ghost_vin_response', 'observed');

    await terminal.narrate('I stay at step nineteen. I count loops.');
    terminal.blank();

    await wait(400);

    await terminal.narrate('One. Open, through, wait, back.');
    await terminal.narrate('Two. Open, through, wait, back.');
    await terminal.narrate('Three. The timing is exact. Not close. Exact.');
    await terminal.narrate('Four-point-two seconds per cycle.');
    terminal.blank();

    await wait(400);

    await terminal.thought('No drift. No deviation. No living thing moves');
    await terminal.thought('with that precision.');
    terminal.blank();

    await wait(500);

    await terminal.narrate('On loop eleven, the figure pauses. Mid-cycle,');
    await terminal.narrate('between the hatch and the corridor. It stands');
    await terminal.narrate('still for exactly one second.');
    terminal.blank();

    await wait(500);

    await effects.screenTear(2, 200);

    await terminal.narrate('Then it turns its head.');
    await terminal.narrate('At me. Looking directly at step nineteen.');
    terminal.blank();

    await wait(700);

    await terminal.thought('It sees me.');
    terminal.blank();

    await effects.flash('white', 400);
    await effects.glitch(300);

    await terminal.narrate('It\'s gone. The corridor is empty.');
    terminal.blank();

    await terminal.thought('Eleven loops. Then it looked at me.');
    await terminal.thought('That\'s not an echo. Echoes don\'t count.');
    terminal.blank();

  } else {
    // Call DENT
    state.setFlag('ghost_vin_response', 'called_dent');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"DENT. Corridor between engineering and bridge.</span>');
    terminal.sayHtml('  <span class="c-white-bright">        What do your sensors see?"</span>');
    terminal.blank();

    await wait(600);

    await terminal.dent('One moment.');
    terminal.blank();

    await wait(800);

    await terminal.dent('I see... you. Standing at step nineteen.');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"And at the other end? Near the fold room?"</span>');
    terminal.blank();

    await wait(700);

    await terminal.dent('Vin.');
    terminal.blank();

    await wait(500);

    await terminal.dent('My visual sensors are showing a partial');
    await terminal.dentLine('optical match to your biometric profile');
    await terminal.dentLine('at that location. Thermal signature: zero.');
    await terminal.dentLine('Mass displacement: zero.');
    terminal.blank();

    await wait(400);

    await terminal.dent('It\'s not physically there. And yet.');
    terminal.blank();

    await wait(400);

    await effects.glitch(300);

    await terminal.dent('Scanning complete. It\'s gone now.');
    terminal.blank();

    await wait(400);

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"What was it?"</span>');
    terminal.blank();

    await wait(600);

    await terminal.dent('A thermal lensing artifact from the fold');
    await terminal.dentLine('accumulation, probably. Light bending');
    await terminal.dentLine('around residual null-field gradients.');
    terminal.blank();

    await wait(500);

    await terminal.dent('Probably.');
    terminal.blank();
  }

  await terminal.pause();
  terminal.clear();

  // --- DENT is disturbed. Convergence point. ---
  await terminal.dent('Vin. I need to tell you something.');
  terminal.blank();

  await wait(500);

  await terminal.dent('My memory file has been growing during folds.');
  await terminal.dentLine('I mentioned this in Chapter 6. What I didn\'t');
  await terminal.dentLine('mention — because I was still verifying —');
  terminal.blank();

  await wait(400);

  await terminal.dent('The entries I don\'t remember writing.');
  await terminal.dentLine('Some of them describe movements.');
  await terminal.dentLine('Specific movements. In this corridor.');
  terminal.blank();

  await wait(600);

  await effects.glitch(250);

  await terminal.dent('They match what you just observed.');
  terminal.blank();

  await wait(700);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"The loop. Open, through, wait, back."</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('Four-point-two seconds per cycle.');
  await terminal.dentLine('Eleven repetitions. Then cessation.');
  terminal.blank();

  await wait(500);

  await terminal.thought('He already had it written down.');
  terminal.blank();

  await terminal.thought('He had it written down before it happened.');
  terminal.blank();

  await wait(700);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"What does that mean?"</span>');
  terminal.blank();

  await wait(800);

  await terminal.dent('Fold interference can corrupt memory buffers.');
  await terminal.dentLine('Sensor data bleeding backward through the');
  await terminal.dentLine('null-field gradient. A technical explanation');
  await terminal.dentLine('that covers the observable facts.');
  terminal.blank();

  await wait(600);

  await terminal.dent('I am choosing to find it adequate.');
  terminal.blank();

  await wait(500);

  await terminal.thought('He\'s choosing. DENT is choosing what to');
  await terminal.thought('believe about this. So am I.');
  terminal.blank();

  await terminal.thought('We\'re both choosing the less frightening option');
  await terminal.thought('and calling it a technical explanation.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Neither of us says anything else for a while.');
  terminal.blank();

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: SIC AMBUSH
// ═══════════════════════════════════════════════════════

/**
 * VALIDATION:
 *   Truby beat #13 — Attack by Opponent (SIC as concrete manifestation of external threat)
 *   Reed test: Dramatic Question — Can they survive Graves finding them this far out?
 *   Reed test: But/Therefore — Ghost sighted BUT now SIC arrives, THEREFORE no time to process
 *   Reed test: Consequence — Each combat choice costs differently (hull/health/null/stress)
 *   Convergence: One interceptor destroyed, two retreat, Vex damaged regardless of choice.
 *   Player choice: evasive / torquer / fold-jump
 */
async function sicAmbush(terminal, state, effects, audio) {
  // --- Sensor contact ---
  audio.ambient('theme_ambush');
  audio.play('alarm_short');

  await terminal.narrate('The proximity alarm doesn\'t ease in.');
  await terminal.narrate('It arrives at full volume: three contacts,');
  await terminal.narrate('fold-point emergence, bearing zero-four-seven.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Fold signatures. Three of them. Military');
  await terminal.dentLine('profile — tight formation, coordinated exit.');
  terminal.blank();

  await wait(500);

  audio.play('hull_creak');

  terminal.sayHtml('  <span class="c-hull">┌─ CONTACT REPORT ─────────────────────────────┐</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  CONTACT-1 .... <span class="c-red">SIC INTERCEPTOR CLASS-IV</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  CONTACT-2 .... <span class="c-red">SIC INTERCEPTOR CLASS-IV</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  CONTACT-3 .... <span class="c-red">SIC INTERCEPTOR CLASS-IV</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Range ......... <span class="c-yellow">4,200 km and closing</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Weapons ....... <span class="c-red">HOT</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Transponder ... <span class="c-red">SIC PURSUIT AUTHORITY</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>');
  terminal.sayHtml('  <span class="c-hull">└──────────────────────────────────────────────┘</span>');
  terminal.blank();

  await wait(400);

  await terminal.thought('Graves. Has to be Graves. 4.7 light-years');
  await terminal.thought('from mapped space and he\'s still in front of us.');
  terminal.blank();

  await terminal.dent('They tracked the fold signature. The');
  await terminal.dentLine('chronometric dampeners haven\'t been');
  await terminal.dentLine('recalibrated since RS-7. This is my fault.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Weapons lock in forty seconds. Options:');
  terminal.blank();

  await wait(300);

  // --- Tactical choice ---
  const hasTorquer = state.hasItem('Torquer') || state.torquerEquipped;

  const options = ['Evasive maneuvers', 'Emergency fold jump'];
  const descs = [
    'Full thrust, erratic pattern. Hull takes hits but we break contact.',
    'Fold now, no prep time. Blip could be severe — unknown destination.'
  ];

  if (hasTorquer) {
    options.splice(1, 0, 'Fire the Torquer');
    descs.splice(1, 0, 'Use it offensively. Maximum null cost, maximum damage.');
  }

  const choice = await terminal.arrowMenu(options, descs);
  terminal.blank();

  // Adjust for torquer being present or not
  let combatChoice;
  if (!hasTorquer) {
    combatChoice = choice === 0 ? 'evasive' : 'fold_jump';
  } else {
    combatChoice = choice === 0 ? 'evasive' : choice === 1 ? 'torquer' : 'fold_jump';
  }

  // --- Combat plays out ---
  audio.play('stinger_danger');
  await effects.shake(400);
  audio.play('impact_heavy');

  await terminal.warning('WEAPONS IMPACT — HULL SECTION C');
  terminal.blank();

  await wait(400);

  await terminal.dent('Shields are not a thing we have. Just so');
  await terminal.dentLine('we\'re clear on that. Moving.');
  terminal.blank();

  if (combatChoice === 'evasive') {
    state.setFlag('combat_choice_ch7', 'evasive');

    await terminal.narrate('I throw the Vex into a corkscrew pattern —');
    await terminal.narrate('full thrust, vector randomized every 0.8');
    await terminal.narrate('seconds. Standard anti-targeting protocol.');
    await terminal.narrate('Nothing about this situation is standard.');
    terminal.blank();

    await effects.shake(600);
    audio.play('impact_heavy');

    await terminal.warning('HULL BREACH — SECTION D — SEALING');
    terminal.blank();

    await wait(300);

    await effects.shake(400);
    audio.play('impact_medium');

    await terminal.warning('IMPACT — AFT SECTION — HULL INTEGRITY DOWN');
    terminal.blank();

    await wait(400);

    await terminal.dent('Contact-3 is overextending. They pushed too');
    await terminal.dentLine('hard on intercept vector. Null venting from');
    await terminal.dentLine('their fold coil — they cut the fold too close.');
    terminal.blank();

    await wait(500);

    await effects.flash('white', 400);
    audio.play('explosion_distant');

    await terminal.narrate('Contact-3 goes up in a slow white bloom —');
    await terminal.narrate('null-field collapse, catastrophic. The kind');
    await terminal.narrate('of death that takes half a second and looks');
    await terminal.narrate('beautiful from a safe distance.');
    terminal.blank();

    await wait(400);

    await terminal.narrate('We are not at a safe distance.');
    terminal.blank();

    await effects.shake(800);
    audio.play('impact_heavy');

    await terminal.warning('SHOCKWAVE IMPACT — MULTIPLE SECTIONS');
    terminal.blank();

    state.applyDamage({ hull: -18, health: -8, stress: 15 });

    await terminal.dent('Contact-1 and Contact-2 are breaking off.');
    await terminal.dentLine('Retreating to fold distance. Either they\'re');
    await terminal.dentLine('regrouping or they didn\'t expect the third');
    await terminal.dentLine('one to go critical.');
    terminal.blank();

    await wait(400);

    await terminal.thought('Nobody expected that. Including us.');
    terminal.blank();

  } else if (combatChoice === 'torquer') {
    state.setFlag('combat_choice_ch7', 'torquer');

    state.applyDamage({ null: -5 });

    await terminal.narrate('The Torquer\'s targeting system spins up in');
    await terminal.narrate('two seconds. I paint Contact-3 — the one');
    await terminal.narrate('closest to overextension, null coil already');
    await terminal.narrate('stressed from the fold sprint.');
    terminal.blank();

    await wait(400);

    await terminal.dent('Torquer charged. Firing solution — clean.');
    await terminal.dentLine('For the record: I am uncomfortable with how');
    await terminal.dentLine('good I\'ve gotten at this.');
    terminal.blank();

    await wait(500);

    await effects.flash('white', 600);
    audio.play('torquer_fire');

    await wait(300);

    audio.play('explosion_distant');

    await terminal.narrate('The beam catches Contact-3 across the fold');
    await terminal.narrate('coil housing. Null energy meets null energy');
    await terminal.narrate('in a very unhappy way. The ship doesn\'t');
    await terminal.narrate('explode. It unmakes. One frame it\'s there,');
    await terminal.narrate('the next it\'s a dispersing cloud of motes.');
    terminal.blank();

    await wait(500);

    await terminal.dent('Contact-1 and Contact-2 are retreating.');
    await terminal.dentLine('Three interceptors came for us. One is gone.');
    await terminal.dentLine('Two have decided they have other priorities.');
    terminal.blank();

    await wait(400);

    await effects.shake(300);
    audio.play('impact_medium');

    state.applyDamage({ hull: -10, health: -5, stress: 10 });

    await terminal.warning('PARTING SHOT — AFT HULL — MINOR BREACH');
    terminal.blank();

    await terminal.thought('They got a parting shot in. Fair.');
    terminal.blank();

  } else {
    // Fold jump
    state.setFlag('combat_choice_ch7', 'fold_jump');

    state.applyDamage({ null: -4 });

    await terminal.narrate('No prep time. No destination plotted. I');
    await terminal.narrate('punch the fold drive with one hand and hold');
    await terminal.narrate('the rail with the other.');
    terminal.blank();

    await terminal.dent('Fold without solution lock. Blip probability:');
    await terminal.dentLine('elevated. Destination: wherever the null');
    await terminal.dentLine('gradient takes us. Folding in three—');
    terminal.blank();

    await wait(300);

    await effects.foldEffect(terminal);

    await wait(400);

    // Post-fold — landed somewhere near the debris field
    await effects.flash('white', 800);
    await effects.shake(600);

    await terminal.warning('HARD EMERGENCE — UNFAMILIAR SECTOR');
    terminal.blank();

    await wait(600);

    state.applyDamage({ hull: -14, health: -10, stress: 18, null: -2 });

    await terminal.dent('Blip: 2.1 seconds. That\'s the longest yet.');
    await terminal.dentLine('Hull took shear damage from the uncontrolled');
    await terminal.dentLine('emergence. Life support holding. My memory');
    await terminal.dentLine('file added six new entries during the Blip.');
    terminal.blank();

    await wait(400);

    await terminal.dent('None of them are mine.');
    terminal.blank();

    await wait(500);

    await terminal.thought('2.1 seconds. The Blip is getting worse.');
    await terminal.thought('Every fold is a roll of a die with one more');
    await terminal.thought('face than the last time.');
    terminal.blank();

    await wait(400);

    await terminal.dent('The intercept group didn\'t follow. They may');
    await terminal.dentLine('not have our exit vector. Or they\'re waiting');
    await terminal.dentLine('for us to surface again. Either way:');
    await terminal.dentLine('Contact-3 emerged from the fold damaged —');
    await terminal.dentLine('null coil failure. We triggered it on the');
    await terminal.dentLine('way out. They\'re gone.');
    terminal.blank();
  }

  await wait(500);

  // --- Convergence: aftermath ---
  state.setFlag('sic_ambush_survived', true);

  await terminal.narrate('The contacts are gone. Two fold signatures,');
  await terminal.narrate('retreating. One debris cloud, expanding.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-hull">┌─ POST-COMBAT STATUS ──────────────────────────┐</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>');
  terminal.sayHtml(`  <span class="c-hull">│</span>  Hull .............. <span class="${state.hull < 50 ? 'c-red' : 'c-yellow'}">${state.hull}%</span>`);
  terminal.sayHtml(`  <span class="c-hull">│</span>  Health ............ <span class="${state.health < 60 ? 'c-red' : 'c-yellow'}">${state.health}%</span>`);
  terminal.sayHtml(`  <span class="c-hull">│</span>  Null reserves ..... <span class="${state.nullReserves < 4 ? 'c-red' : 'c-yellow'}">${state.nullReserves} cells</span>`);
  terminal.sayHtml(`  <span class="c-hull">│</span>  Stress ............ <span class="${state.stress > 70 ? 'c-red' : 'c-yellow'}">${state.stress}%</span>`);
  terminal.sayHtml('  <span class="c-hull">│</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  SIC contacts ...... <span class="c-green">CLEAR</span>');
  terminal.sayHtml('  <span class="c-hull">│</span>  Interceptor-3 ..... <span class="c-red">DESTROYED</span>');
  terminal.sayHtml('  <span class="c-hull">└──────────────────────────────────────────────┘</span>');
  terminal.blank();

  await wait(400);

  await terminal.dent('They came specifically for us. Not a patrol');
  await terminal.dentLine('that got lucky. They had our fold signature');
  await terminal.dentLine('locked. Graves authorized this intercept.');
  terminal.blank();

  await wait(400);

  await terminal.thought('Graves. Far enough from Charter space that');
  await terminal.thought('the sound of my name shouldn\'t carry. And');
  await terminal.thought('yet here we are, three interceptors deep');
  await terminal.thought('in unmapped territory, being shot at with');
  await terminal.thought('the precision of someone who was already waiting.');
  terminal.blank();

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: TEMPORAL STABILIZER SALVAGE
// ═══════════════════════════════════════════════════════

/**
 * VALIDATION:
 *   Truby beat #13 — Attack by Opponent yields opportunity (salvage from wreckage)
 *   Reed test: Consequence — Combat produces the means to progress (stabilizer)
 *   Convergence: Temporal Stabilizer acquired, SIC intel found, optional DENT repair
 *   state.addItem('Temporal Stabilizer'), temporal_stabilizer_acquired = true
 *   dent_repair_ch7 set if player chooses to salvage mobility servos.
 */
async function temporalStabilizerSalvage(terminal, state, effects, audio) {
  audio.ambient('space_quiet');

  await terminal.narrate('The debris field from Contact-3 is still');
  await terminal.narrate('expanding slowly, the way things move out');
  await terminal.narrate('here without friction or gravity to argue');
  await terminal.narrate('with them. A slow bloom of metal and vapor');
  await terminal.narrate('and things that used to be a ship.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Vin. I\'m reading something unusual in the');
  await terminal.dentLine('debris field. Electromagnetic signature that');
  await terminal.dentLine('doesn\'t match standard SIC hardware profiles.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Something is dampening the null-field');
  await terminal.dentLine('remnants from the interceptor\'s collapse.');
  await terminal.dentLine('The field should be dissipating uniformly.');
  await terminal.dentLine('Instead it\'s... structured. Contained.');
  terminal.blank();

  await wait(500);

  await terminal.thought('Contained null-field remnants. That\'s not');
  await terminal.thought('standard interceptor equipment.');
  await terminal.thought('That\'s experimental.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Can you identify it?"</span>');
  terminal.blank();

  await wait(600);

  await terminal.dent('Not from database. The component appears to be');
  await terminal.dentLine('a temporal dampening array — something designed');
  await terminal.dentLine('to regulate null-field interference with local');
  await terminal.dentLine('spacetime geometry.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Which, if functional, would be extraordinarily');
  await terminal.dentLine('useful given our current situation.');
  terminal.blank();

  await wait(400);

  await terminal.thought('A temporal dampening array. Sitting in');
  await terminal.thought('a debris field. Three hours after I watch');
  await terminal.thought('a version of myself loop through a corridor.');
  terminal.blank();

  await terminal.thought('I\'m not going to think too hard about that.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- EVA sequence ---
  await terminal.narrate('EVA prep takes seven minutes. Suit, tether,');
  await terminal.narrate('thruster pack. The routine is meditative at');
  await terminal.narrate('this point — each step a small act of faith');
  await terminal.narrate('that the suit will do its job and vacuum');
  await terminal.narrate('will stay on the outside.');
  terminal.blank();

  await wait(400);

  await terminal.dent('EVA checklist complete. Airlock cycling.');
  await terminal.dentLine('Debris field is mostly stable — largest');
  await terminal.dentLine('fragment is forty meters, tumbling slow.');
  await terminal.dentLine('Keep your head on a swivel.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The airlock opens onto the dark. The debris');
  await terminal.narrate('field catches the distant starlight and');
  await terminal.narrate('throws it back at random angles. Beautiful');
  await terminal.narrate('if you don\'t think about what it used to be.');
  terminal.blank();

  await wait(400);

  // --- Finding the stabilizer component ---
  audio.play('scan_ping');

  await terminal.dent('Forty-two meters, bearing two-two-zero.');
  await terminal.dentLine('The dampening signature is strongest there.');
  await terminal.dentLine('Looks like it survived the null collapse');
  await terminal.dentLine('inside a shielded housing. Lucky for us.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('Twenty meters out, I can see it: a cylinder');
  await terminal.narrate('the length of my forearm, matte black, still');
  await terminal.narrate('faintly glowing along the seam lines where');
  await terminal.narrate('the null-field is bleeding off. Like something');
  await terminal.narrate('that doesn\'t want to stop working even after');
  await terminal.narrate('everything around it has been destroyed.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('I like it immediately.');
  terminal.blank();

  await wait(400);

  // --- SIC mission logs ---
  await terminal.narrate('Inside the housing, the component sits in');
  await terminal.narrate('a shock-mounted cradle. Next to it, still');
  await terminal.narrate('attached to a mount, a data cartridge.');
  await terminal.narrate('SIC mission logs. Intact.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Bringing both back is a good idea. The');
  await terminal.dentLine('cartridge is read-only from the outside —');
  await terminal.dentLine('whatever\'s on it, they didn\'t want it');
  await terminal.dentLine('erased during a ship loss.');
  terminal.blank();

  await wait(400);

  await terminal.thought('They planned for the ship to be lost.');
  await terminal.thought('That\'s interesting.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Back aboard, reading the logs ---
  await terminal.narrate('I strip the suit in the airlock and go');
  await terminal.narrate('directly to the workbench. The component');
  await terminal.narrate('goes into the diagnostic cradle. The');
  await terminal.narrate('cartridge goes into the reader.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Reading SIC mission logs. This will take');
  await terminal.dentLine('a moment. The encryption is — oh.');
  terminal.blank();

  await wait(600);

  await terminal.dent('It\'s not encrypted. At all.');
  terminal.blank();

  await wait(400);

  await terminal.logEntry('SIC INTERCEPT AUTHORITY — OPERATION: TERMINUS');
  await terminal.logEntry('Authorization: Director M. Graves, Level 9 Clearance');
  await terminal.logEntry('Target: Research vessel VEX, registry SC-7701');
  await terminal.logEntry('Primary subject: Voss, Vincent R. — PRIORITY ACQUISITION');
  await terminal.logEntry('Status: NOT locate and detain. TERMINATE ON CONTACT.');
  await terminal.logEntry('Rationale: Subject has demonstrated knowledge of');
  await terminal.logEntry('  fold anomaly patterns inconsistent with known physics.');
  await terminal.logEntry('  Subject represents existential classification risk.');
  await terminal.logEntry('  Asset recovery of VEX fold drive: secondary objective.');
  terminal.blank();

  await wait(600);

  await terminal.thought('Terminate on contact.');
  terminal.blank();

  await wait(500);

  await terminal.thought('Not detain. Not acquire. Terminate.');
  terminal.blank();

  await terminal.thought('Graves has been in my comms. He negotiated');
  await terminal.thought('with me. He let me go from RS-7. And the');
  await terminal.thought('whole time his interceptors had orders to');
  await terminal.thought('kill me on sight if they found me first.');
  terminal.blank();

  await wait(500);

  await terminal.dent('This is the part where I say \'I told you');
  await terminal.dentLine('so,\' except I didn\'t tell you, because');
  await terminal.dentLine('I didn\'t know. Which is worse.');
  terminal.blank();

  await wait(500);

  await terminal.logEntry('SPECIAL EQUIPMENT: TDA-7 Temporal Dampening Array');
  await terminal.logEntry('  Purpose: Suppress fold-signature temporal bleed');
  await terminal.logEntry('  around intercept zone. Prevent subject from');
  await terminal.logEntry('  detecting pursuit via anomalous time artifacts.');
  await terminal.logEntry('  Note: TDA-7 is experimental. Loss is acceptable.');
  terminal.blank();

  await wait(500);

  await terminal.thought('They brought a temporal dampening device to');
  await terminal.thought('keep me from noticing the temporal distortions.');
  terminal.blank();

  await terminal.thought('Which means the distortions this morning —');
  await terminal.thought('the text bleeding through, the ghost in the');
  await terminal.thought('corridor — those happened because the TDA-7');
  await terminal.thought('wasn\'t in range yet.');
  terminal.blank();

  await terminal.thought('Or those happened because reality is doing');
  await terminal.thought('something the TDA-7 wasn\'t built to fix.');
  terminal.blank();

  await wait(600);

  await terminal.dent('The component checks out. With some');
  await terminal.dentLine('modification, we could use it as a Temporal');
  await terminal.dentLine('Stabilizer — dampening our own null-field');
  await terminal.dentLine('leakage rather than suppressing someone');
  await terminal.dentLine('else\'s signal. Reduce Blip accumulation.');
  await terminal.dentLine('Possibly suppress further temporal bleed.');
  terminal.blank();

  await wait(400);

  await terminal.dent('I\'d call it a significant find.');
  terminal.blank();

  await wait(500);

  state.addItem('Temporal Stabilizer');
  state.setFlag('temporal_stabilizer_acquired', true);

  terminal.sayHtml('  <span class="c-green">[ ITEM ACQUIRED: Temporal Stabilizer ]</span>');
  terminal.blank();

  await wait(400);

  // --- Optional DENT repair ---
  await terminal.dent('One more thing. The interceptor\'s mobility');
  await terminal.dentLine('servo assembly is in the debris — intact,');
  await terminal.dentLine('compatible spec. It would upgrade my');
  await terminal.dentLine('articulation arm. More dexterous assistance');
  await terminal.dentLine('going forward.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Another EVA. Your call.');
  terminal.blank();

  const repairChoice = await terminal.arrowMenu(
    ['Go get them', 'Not worth another EVA'],
    [
      'Another twenty minutes outside. The servos are worth it.',
      'Enough EVA for one day. Move on.'
    ]
  );
  terminal.blank();

  if (repairChoice === 0) {
    state.setFlag('dent_repair_ch7', 'mobility_servos');
    state.dentRepairLevel = Math.min(1.0, state.dentRepairLevel + 0.04);

    await terminal.narrate('The second EVA is shorter. I know the');
    await terminal.narrate('debris field now, know which tumbling');
    await terminal.narrate('chunks to avoid. In and out in eighteen');
    await terminal.narrate('minutes with a servo block that DENT');
    await terminal.narrate('immediately starts integrating.');
    terminal.blank();

    await wait(400);

    await terminal.dent('Oh. That\'s considerably better. Full range');
    await terminal.dentLine('of motion in the secondary arm. I\'ve been');
    await terminal.dentLine('compensating for that restriction for months');
    await terminal.dentLine('and didn\'t realize how much it cost me.');
    terminal.blank();

    await wait(400);

    await terminal.dent('Thank you.');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-green">[ DENT REPAIR: Mobility Servos installed (+4%) ]</span>');
    terminal.blank();

  } else {
    state.setFlag('dent_repair_ch7', 'none');

    await terminal.narrate('I leave the servos. The debris field will');
    await terminal.narrate('disperse into nothing given enough time');
    await terminal.narrate('and distance. Everything does.');
    terminal.blank();

    await wait(400);

    await terminal.dent('Understood. Logging the servo type in case');
    await terminal.dentLine('we encounter compatible hardware later.');
    await terminal.dentLine('Pragmatic of me.');
    terminal.blank();
  }

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: CHAPTER END
// ═══════════════════════════════════════════════════════

/**
 * VALIDATION:
 *   Truby beat #13 — Aftermath of attack; opponent's reach extends further than believed
 *   Reed test: Consequence — Ghost + ambush + stabilizer all cascade forward
 *   Reed test: Convergence — chapter7_complete = true, chapter = 8 set
 *   Simulation evidence: Vin sits with the ghost image — what does a loop mean?
 *   Dual explanation maintained in Vin's final reflection.
 */
async function chapterEnd(terminal, state, effects, audio) {
  audio.ambient('deep_hum');

  // --- Closing reflection ---
  await terminal.narrate('I run the Temporal Stabilizer diagnostics');
  await terminal.narrate('while the stars drift past. DENT hums along,');
  await terminal.narrate('cross-referencing the SIC schematics with');
  await terminal.narrate('our fold drive interface specs. The work is');
  await terminal.narrate('good. The work is ordinary. I need ordinary');
  await terminal.narrate('right now.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('After a while I stop working and just sit');
  await terminal.narrate('with the viewport. Stars. The expanding');
  await terminal.narrate('cloud that used to be a ship. The dark');
  await terminal.narrate('between things that is most of what there is.');
  terminal.blank();

  await wait(500);

  await terminal.thought('The ghost was doing exactly what I do.');
  await terminal.thought('The same movements. The same posture.');
  await terminal.thought('Four-point-two seconds, eleven loops, then stop.');
  terminal.blank();

  await wait(400);

  const ghostResponse = state.getFlag('ghost_vin_response');
  if (ghostResponse === 'approached') {
    await terminal.thought('When I got close enough, it looked through me.');
    await terminal.thought('Like it knew I was coming. Like it had done');
    await terminal.thought('this before and knew how it ended.');
    terminal.blank();
  } else if (ghostResponse === 'observed') {
    await terminal.thought('On loop eleven, it looked at me.');
    await terminal.thought('Right at me. Like it was waiting for me');
    await terminal.thought('to count to eleven.');
    terminal.blank();
  } else {
    await terminal.thought('DENT had it written down before it happened.');
    await terminal.thought('Four-point-two seconds. Eleven repetitions.');
    await terminal.thought('The exact numbers, in the exact order.');
    terminal.blank();
  }

  await wait(500);

  await terminal.thought('If that was a temporal echo — fold interference,');
  await terminal.thought('null-field memory, whatever technical phrase');
  await terminal.thought('makes it sit more quietly in the brain —');
  await terminal.thought('then it\'s a recording of something I did.');
  terminal.blank();

  await wait(400);

  await terminal.thought('But I haven\'t done it yet.');
  terminal.blank();

  await wait(600);

  await terminal.thought('Or I have, and I\'m the echo.');
  terminal.blank();

  await wait(700);

  await terminal.dent('Vin.');
  terminal.blank();

  await wait(400);

  await terminal.dent('I have a question.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Go ahead."</span>');
  terminal.blank();

  await wait(600);

  await terminal.dent('If that was you from another time — from a');
  await terminal.dentLine('previous pass through this moment — then');
  await terminal.dentLine('time has been here before us.');
  terminal.blank();

  await wait(700);

  await terminal.dent('What does that make this moment?');
  terminal.blank();

  await wait(600);

  await terminal.thought('I don\'t answer.');
  terminal.blank();

  await wait(400);

  await terminal.thought('I don\'t have an answer. But the question');
  await terminal.thought('sits down inside me and gets comfortable,');
  await terminal.thought('the way questions do when they\'ve decided');
  await terminal.thought('they live there now.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Plot a course. Next waypoint."</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('Already done.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('Of course it was.');
  terminal.blank();

  await wait(800);

  await effects.fadeToBlack(terminal);

  // --- Set flags and save ---
  audio.play('stinger_cliffhanger');
  state.setFlag('chapter7_complete', true);
  state.chapter = 8;
  await state.save();

  await effects.fadeFromBlack(terminal);

  // --- End card ---
  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 7: The Ghost in the Machine — Complete</span>');
  terminal.blank();

  const dentPercent = Math.round(state.dentRepairLevel * 100);
  const foldColor   = state.foldStatus === 'READY' ? 'c-green' : 'c-yellow';
  const repairRaw   = state.getFlag('dent_repair_ch7');
  const repairLabel = repairRaw && repairRaw !== 'none'
    ? repairRaw.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'none';

  const ghostRaw   = state.getFlag('ghost_vin_response');
  const ghostLabel = ghostRaw
    ? ghostRaw.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'unknown';

  const combatRaw   = state.getFlag('combat_choice_ch7');
  const combatLabel = combatRaw
    ? combatRaw.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'unknown';

  terminal.sayHtml('<span class="c-hull">--- CHAPTER SUMMARY ----------------------------</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.sayHtml(`  <span class="c-white-bright">DENT:</span> ${dentPercent}% operational`);
  terminal.sayHtml(`  <span class="c-white-bright">Fold Drive:</span> <span class="${foldColor}">${state.foldStatus}</span> (Stability: ${state.foldStability}%)`);
  terminal.blank();

  terminal.sayHtml(`  <span class="c-dim">Ghost Vin response: ${ghostLabel}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Combat choice: ${combatLabel}</span>`);
  terminal.sayHtml(`  <span class="c-dim">DENT repair: ${repairLabel}</span>`);

  if (state.hasItem('Temporal Stabilizer')) {
    terminal.sayHtml('  <span class="c-green">Temporal Stabilizer: acquired</span>');
  }

  terminal.sayHtml('  <span class="c-dim">SIC intel: Graves — Terminate on Contact authorized</span>');
  terminal.sayHtml('  <span class="c-red-bright">SIC Status: ACTIVE PURSUIT — TEMPORAL BLEED INCREASING</span>');
  terminal.sayHtml('<span class="c-hull">------------------------------------------------</span>');
  terminal.blank();

  await terminal.pause();
}
