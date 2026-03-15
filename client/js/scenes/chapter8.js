/**
 * CHAPTER 8: THE UNNATURAL CACHE
 * Core Anomaly approach. Graves ambush — apparent defeat. Neural Core Restoration.
 * Truby beats: #14 (Apparent defeat), #17 (Third revelation).
 * Player variance: Capture vs Escape path. Both converge at Neural Core Restoration.
 *
 * VALIDATION:
 *   Truby #14 — Apparent Defeat: Graves surrounds the Vex. Either captured or forced to run.
 *   Truby #17 — Third Revelation: Data about previous fold travelers/cycles surfaces.
 *   Reed Dramatic Question: Can Vin reach the Core Anomaly without being owned by Graves?
 *   Reed But/Therefore: Vin finds the Anomaly BUT Graves is already waiting — forced choice.
 *   Reed Convergence: Both paths yield the Neural Core unit. Both paths have a cost.
 *   Reed Consequence: DENT repaired to 85%. Torquer may be lost. Core Beacon Signal detected.
 *   Simulation Evidence (Growing): Core Anomaly geometry is wrong. Objects duplicate near it.
 *   Dual Explanation maintained throughout. Simulation theory never confirmed.
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter8(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_core_anomaly');
  await terminal.chapterTitle(8, 'THE UNNATURAL CACHE');

  await coreAnomalyApproach(terminal, state, effects, audio);
  await gravesAmbush(terminal, state, effects, audio);

  const path = state.getFlag('ch8_path');
  if (path === 'capture') {
    await capturePath(terminal, state, effects, audio);
  } else {
    await escapePath(terminal, state, effects, audio);
  }

  await neuralCoreRestoration(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: CORE ANOMALY APPROACH
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 1:
 *   Simulation evidence: Anomaly geometry is wrong. Gravitational lensing doesn't match math.
 *   Objects duplicate near it. Looks "unfinished."
 *   Dual explanation: null energy concentration (physical) vs render artifact (simulation).
 *   DENT sensors (repaired Ch5) do deep analysis.
 *   Player choice: approach cautiously / approach quickly / hold and scan.
 */
async function coreAnomalyApproach(terminal, state, effects, audio) {
  audio.ambient('deep_space_hum');

  await terminal.narrate('Three days out from the last fold.');
  await terminal.narrate('Three days of running quiet, cutting the null');
  await terminal.narrate('drive to minimum, keeping the Vex small against');
  await terminal.narrate('the dark. The SICs are behind us. Probably.');
  terminal.blank();

  await terminal.thought('Probably is doing a lot of work in that sentence.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('Then DENT finds it.');
  terminal.blank();

  await wait(600);

  audio.play('scan_ping');
  await effects.flash('cyan', 300);

  await terminal.dentSystem('ANOMALOUS SIGNATURE DETECTED');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Type .................... NULL-BAND MASS BODY');
  await terminal.dentSystem('Bearing ................. 084.2 x +11.4');
  await terminal.dentSystem('Range ................... 2,100 AU');
  await terminal.dentSystem('Null energy output ...... 4.7 x 10^41 W');
  await terminal.dentSystem('Classification .......... NO MATCH IN DATABASE');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(500);

  await terminal.dent('Vin.');
  terminal.blank();

  await wait(300);

  await terminal.dent('I have to tell you something about this reading,');
  await terminal.dentLine('and I need you to stay calm while I do.');
  terminal.blank();

  await terminal.thought('DENT asking me to stay calm is never the prelude');
  await terminal.thought('to good news.');
  terminal.blank();

  await terminal.dent('That null energy output figure is not a typo.');
  await terminal.dentLine('Four point seven times ten to the forty-first');
  await terminal.dentLine('watts. The total luminosity of the observable');
  await terminal.dentLine('universe is roughly ten to the forty-ninth, so');
  await terminal.dentLine('this is... a meaningful fraction.');
  terminal.blank();

  await terminal.dent('Concentrated. In one location. 2,100 AU out.');
  terminal.blank();

  await wait(500);

  await terminal.thought('I run the math twice. Then a third time.');
  terminal.blank();

  await terminal.thought('The math keeps being correct.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Visual description of the Anomaly ---
  audio.ambient('anomaly_pulse');

  await terminal.narrate('We drift closer and it resolves on the main');
  await terminal.narrate('display: a sphere of absolute nothing.');
  terminal.blank();

  await terminal.narrate('Not dark. Not black. Nothing.');
  terminal.blank();

  await terminal.narrate('The stars bend around it in arcs that have no');
  await terminal.narrate('business existing. Gravitational lensing — but');
  await terminal.narrate('the geometry is wrong. The light deflects at');
  await terminal.narrate('angles inconsistent with the Anomaly\'s measured');
  await terminal.narrate('mass. By fifteen percent. Consistently.');
  terminal.blank();

  await wait(400);

  await terminal.thought('Fifteen percent. Consistently.');
  terminal.blank();

  await terminal.thought('Gravity doesn\'t have a rounding error. Gravity');
  await terminal.thought('is exact. You put mass somewhere, space curves');
  await terminal.thought('in a specific, calculable, predictable way.');
  terminal.blank();

  await terminal.thought('Fifteen percent off is not noise. Fifteen percent');
  await terminal.thought('off is something being wrong at a foundational');
  await terminal.thought('level about this object.');
  terminal.blank();

  await wait(400);

  await effects.screenTear(3, 200);

  await terminal.narrate('And the objects near it. The debris field at');
  await terminal.narrate('the Anomaly\'s edge — I watch a tumbling fragment');
  await terminal.narrate('approach the boundary, and then there are two of');
  await terminal.narrate('them. Identical. Rotating in perfect synchrony.');
  terminal.blank();

  await terminal.narrate('Then one disappears.');
  terminal.blank();

  await wait(600);

  // --- DENT analysis ---
  await terminal.dent('I\'m watching the duplication events. I count');
  await terminal.dentLine('seven instances in the last four minutes.');
  terminal.blank();

  await terminal.dent('Physical explanation: extreme null-band compression');
  await terminal.dentLine('could theoretically create short-duration mirror');
  await terminal.dentLine('states. A loop in the null-band field that');
  await terminal.dentLine('reflects matter until the loop collapses. The');
  await terminal.dentLine('math is... strained, but it holds.');
  terminal.blank();

  await wait(300);

  await terminal.dent('The gravitational lensing discrepancy is harder.');
  await terminal.dentLine('I don\'t have a clean physical explanation for');
  await terminal.dentLine('fifteen percent. I have hypotheses.');
  terminal.blank();

  await terminal.thought('I don\'t ask about the other explanations. I\'m');
  await terminal.thought('not sure I want them yet.');
  terminal.blank();

  // --- Simulation evidence moment ---
  await wait(400);

  await terminal.narrate('I zoom the viewport to maximum magnification and');
  await terminal.narrate('stare at the Anomaly\'s edge for a long time.');
  terminal.blank();

  await terminal.narrate('There\'s something wrong with the way it looks.');
  await terminal.narrate('Not the physics wrong. Aesthetically wrong. Like');
  await terminal.narrate('the boundary between the Anomaly and normal space');
  await terminal.narrate('is too sharp. Too clean. No gradient. No fog.');
  terminal.blank();

  await terminal.narrate('Just: space. Then: nothing.');
  terminal.blank();

  await terminal.thought('It looks like something that wasn\'t meant to be');
  await terminal.thought('seen from this close. Like a backdrop in a theater');
  await terminal.thought('that\'s fine from the third row and wrong up here');
  await terminal.thought('in the stage lights.');
  terminal.blank();

  await wait(400);

  state.setFlag('core_anomaly_detected', true);

  await terminal.pause();
  terminal.clear();

  // --- The pull ---
  await terminal.narrate('I feel it.');
  terminal.blank();

  await terminal.narrate('Not as a force — not physical pressure. As a');
  await terminal.narrate('conviction. A certainty that I am supposed to');
  await terminal.narrate('go toward it. The same thing I felt when I first');
  await terminal.narrate('heard the Echo signal, amplified into something');
  await terminal.narrate('I can\'t dismiss as instinct anymore.');
  terminal.blank();

  await terminal.thought('The Temporal Stabilizer hums faintly in my pocket.');
  await terminal.thought('It\'s been doing that since we got within range.');
  terminal.blank();

  await terminal.dent('Your biometrics are elevated. Cardiac, cortisol,');
  await terminal.dentLine('neural activity pattern. The same signature I');
  await terminal.dentLine('saw when you first detected the Echo pulse.');
  terminal.blank();

  await terminal.dent('The Anomaly is doing something to you. Or you\'re');
  await terminal.dentLine('doing something in response to it. I can\'t tell');
  await terminal.dentLine('which from the data I have.');
  terminal.blank();

  await terminal.thought('That distinction is doing a lot of work, DENT.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The Anomaly sits there. Patient. 2,100 AU of');
  await terminal.narrate('impossible nothing, radiating null energy at a');
  await terminal.narrate('rate that has no business being possible.');
  terminal.blank();

  await terminal.narrate('Calling.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Player choice: approach method ---
  await terminal.narrate('The Anomaly is close enough that I have to make');
  await terminal.narrate('a decision about how to proceed.');
  terminal.blank();

  await terminal.dent('I\'m tracking no vessels on long-range sensors.');
  await terminal.dentLine('But long-range sensors are... imprecise at');
  await terminal.dentLine('this null-band density. Someone could be hiding');
  await terminal.dentLine('in the interference signature.');
  terminal.blank();

  await terminal.thought('No vessels. Or no vessels we can see.');
  terminal.blank();

  const approachIdx = await terminal.arrowMenu(
    ['Approach cautiously — slow drift, minimal emissions', 'Approach quickly — punch through before anyone detects us', 'Hold position and run a deep scan first'],
    ['Minimize our signature. Trade time for safety.', 'If someone is watching, speed beats stealth.', 'Know what we\'re flying into. Costs 20 minutes.']
  );

  terminal.blank();

  if (approachIdx === 0) {
    // Cautious approach
    await terminal.thought('Slow and quiet. Right.');
    terminal.blank();

    await terminal.narrate('I cut thrust to minimum — barely enough to');
    await terminal.narrate('counteract drift — and let the Vex coast in.');
    await terminal.narrate('Passive sensors only. No active pings. Just');
    await terminal.narrate('listening and watching.');
    terminal.blank();

    await terminal.dent('Good call. Passive approach means a longer transit');
    await terminal.dentLine('window, but our null signature drops by 94%.');
    await terminal.dentLine('If someone\'s waiting, we\'ll see them first.');
    terminal.blank();

    await terminal.narrate('The Anomaly grows on the viewport. Slowly. Each');
    await terminal.narrate('kilometer feels earned.');
    terminal.blank();

    await wait(400);

    await terminal.narrate('We\'re 800 AU out when DENT speaks again.');
    terminal.blank();

  } else if (approachIdx === 1) {
    // Fast approach
    await terminal.thought('Speed beats hesitation. Maybe.');
    terminal.blank();

    await terminal.narrate('I push the null drive to 40% and point us');
    await terminal.narrate('straight at the Anomaly. If someone is tracking');
    await terminal.narrate('us, they already know we\'re here. Might as well');
    await terminal.narrate('make the window as short as possible.');
    terminal.blank();

    await terminal.dent('Active approach. Fast transit. Noted. For the');
    await terminal.dentLine('record: our null signature is going to be');
    await terminal.dentLine('visible to anything within 500 AU.');
    terminal.blank();

    await terminal.thought('Everything worth doing is visible to something.');
    terminal.blank();

    await wait(400);

    await terminal.narrate('We close the distance in forty minutes. The');
    await terminal.narrate('Anomaly fills the viewport.');
    terminal.blank();

    state.applyDamage({ null: -1 });

  } else {
    // Scan first
    await terminal.thought('Know the terrain before you walk into it.');
    terminal.blank();

    await terminal.narrate('I bring the Vex to a full stop and redirect');
    await terminal.narrate('everything into the sensor array. Twenty minutes');
    await terminal.narrate('of passive deep scan, pulling every band.');
    terminal.blank();

    await terminal.dent('Running full spectral analysis. Null-band,');
    await terminal.dentLine('electromagnetic, gravitational. And... Vin.');
    terminal.blank();

    await wait(400);

    await terminal.dent('The gravitational lensing discrepancy isn\'t');
    await terminal.dentLine('consistent across the Anomaly\'s surface.');
    await terminal.dentLine('There\'s a variance pattern. A seventeen-point');
    await terminal.dentLine('three degree arc on the near-side face where');
    await terminal.dentLine('the lensing is correct. The rest is off.');
    terminal.blank();

    await terminal.dent('I don\'t have a model that explains that.');
    terminal.blank();

    await terminal.thought('A patch where physics works correctly, embedded');
    await terminal.thought('in a larger structure where it doesn\'t.');
    terminal.blank();

    await terminal.thought('Like a seam.');
    terminal.blank();

    await wait(400);

    await terminal.narrate('The scan completes. I study the data for a long');
    await terminal.narrate('moment, then file it and move us in.');
    terminal.blank();
  }

  await wait(400);

  // --- Final approach moment before ambush ---
  await terminal.dent('500 AU. The null-band interference is affecting');
  await terminal.dentLine('sensor resolution. Long-range is degrading.');
  terminal.blank();

  await terminal.narrate('The Anomaly is close enough now that I can see');
  await terminal.narrate('individual duplication events without magnification.');
  await terminal.narrate('Debris fragments, split, one copy falling inward,');
  await terminal.narrate('the other drifting away. Over and over.');
  terminal.blank();

  await terminal.thought('It\'s almost beautiful. In the way that drowning');
  await terminal.thought('would be beautiful from far enough away.');
  terminal.blank();

  await terminal.dent('Vin. Something is emerging from the null-band');
  await terminal.dentLine('shadow on our starboard quarter.');
  terminal.blank();

  await wait(600);

  audio.play('hull_alarm');
  await effects.flash('red', 400);

  await terminal.dentSystem('CONTACT \u2014 MULTIPLE VESSELS');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Count ................... 6 confirmed, 2+ probable');
  await terminal.dentSystem('Classification .......... SIC CHARTER FLEET');
  await terminal.dentSystem('Formation ............... ENCIRCLEMENT PATTERN');
  await terminal.dentSystem('Weapons status .......... ACTIVE, LOCKED');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(600);

  await terminal.dent('They were hiding in the Anomaly\'s interference');
  await terminal.dentLine('shadow. Passive run. I couldn\'t have seen them');
  await terminal.dentLine('until they powered up.');
  terminal.blank();

  await terminal.thought('Nobody could have. That\'s the point.');
  terminal.blank();

  await wait(400);

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: GRAVES AMBUSH — APPARENT DEFEAT
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 2:
 *   Truby #14 — Apparent Defeat: Full SIC encirclement. Vin has no good options.
 *   Player must choose: surrender (capture path) or two escape options (escape path).
 *   Graves voice: calm, corporate, terrifying.
 *   Sets ch8_path to 'capture' or 'escape'.
 */
async function gravesAmbush(terminal, state, effects, audio) {
  audio.ambient('theme_ambush');
  audio.play('threat_hum');

  await terminal.narrate('Six ships. Eight, counting the probable contacts');
  await terminal.narrate('still half-hidden in the null-band shadow. All');
  await terminal.narrate('of them arranged in a sphere around the Vex,');
  await terminal.narrate('each one pointing weapons at us.');
  terminal.blank();

  await terminal.narrate('We are a fly in a closed fist.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Targeting solutions from all six confirmed vessels.');
  await terminal.dentLine('Weapons are live. No shots fired yet. I think');
  await terminal.dentLine('they want something from us before they fire.');
  terminal.blank();

  await terminal.thought('That\'s a different category of problem than');
  await terminal.thought('being immediately shot. Slightly.');
  terminal.blank();

  await wait(400);

  audio.play('comms_open');

  // --- Graves transmission ---
  terminal.blank();
  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 INCOMING TRANSMISSION \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Source: SIC COMMAND VESSEL <span class="c-white-bright">LONG PATIENCE</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Encryption: CHARTER-GRADE');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Designation: GRAVES, D. \u2014 Director, SIC');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "Good afternoon, Mr. Vin. Or morning. Or');
  terminal.sayHtml('         evening. Time gets imprecise out here."');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "You\'ve been a considerable navigational');
  terminal.sayHtml('         challenge. I want you to know I mean that');
  terminal.sayHtml('         as a compliment. Most people I find within');
  terminal.sayHtml('         forty-eight hours. You managed nearly three');
  terminal.sayHtml('         weeks. That\'s a record."');
  terminal.blank();

  await wait(500);

  await terminal.thought('He sounds like he\'s discussing a mildly impressive');
  await terminal.thought('chess match. Six guns pointed at my hull and he\'s');
  await terminal.thought('giving me a participation trophy.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "The situation is this: you\'ve arrived');
  terminal.sayHtml('         at exactly the location we\'ve been monitoring.');
  terminal.sayHtml('         The Core Anomaly. I suspect the same thing');
  terminal.sayHtml('         that brought you here brought you here —');
  terminal.sayHtml('         that is to say, you didn\'t entirely choose');
  terminal.sayHtml('         this destination. You were compelled."');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "I\'m going to make you an offer. Surrender');
  terminal.sayHtml('         the Vex. Come aboard the Long Patience.');
  terminal.sayHtml('         Cooperate with my team. In exchange: you');
  terminal.sayHtml('         get answers. Real ones. The kind you\'ve');
  terminal.sayHtml('         been chasing since you woke up alone on');
  terminal.sayHtml('         that ship."');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "The alternative is that I disable your');
  terminal.sayHtml('         vessel and take what I need from the wreck.');
  terminal.sayHtml('         I\'d prefer not to. Wasteful. But the Charter');
  terminal.sayHtml('         has authorized it, and I will execute the');
  terminal.sayHtml('         authorization if required. I always do."');
  terminal.blank();

  await wait(400);

  audio.play('comms_close');

  await wait(500);

  await terminal.dent('He means it. I\'m reading his weapons as fully');
  await terminal.dentLine('charged. He has the range to take our null drive');
  await terminal.dentLine('offline with a single shot.');
  terminal.blank();

  await terminal.dent('I want to be honest with you about our options,');
  await terminal.dentLine('Vin. We have three. None of them are good.');
  terminal.blank();

  await terminal.thought('At least DENT skips the part where he pretends');
  await terminal.thought('they\'re good. That\'s worth something.');
  terminal.blank();

  // --- APPARENT DEFEAT moment ---
  await effects.shake(400);

  await terminal.narrate('I look at the tactical display. Six ships in a');
  await terminal.narrate('perfect sphere. The Anomaly behind us. Nowhere');
  await terminal.narrate('to go that isn\'t a weapon pointed at us.');
  terminal.blank();

  await terminal.narrate('The Echo that brought me across four light-years');
  await terminal.narrate('of hostile space sits 500 AU away, radiating');
  await terminal.narrate('null energy at a rate that shouldn\'t be possible,');
  await terminal.narrate('and I am completely stuck.');
  terminal.blank();

  await terminal.thought('This is the worst I\'ve felt since I woke up.');
  terminal.blank();

  await wait(500);

  await terminal.pause();
  terminal.clear();

  // --- Player choice: surrender or escape ---
  await terminal.narrate('Seconds are ticking. Graves is waiting. The guns');
  await terminal.narrate('are live. I have to decide.');
  terminal.blank();

  await terminal.dent('For reference: if we fold, the Temporal Stabilizer');
  await terminal.dentLine('gives us a 67% chance of a clean transit despite');
  await terminal.dentLine('null-band interference. 33% chance of a bad Blip.');
  await terminal.dentLine('Hull is at ' + state.hull + '%. I wouldn\'t love a bad Blip.');
  terminal.blank();

  await terminal.dent('If we fight through, it\'ll cost us. Hull, null,');
  await terminal.dentLine('and there\'s a real probability of a weapon hit');
  await terminal.dentLine('before we clear the encirclement.');
  terminal.blank();

  const choiceIdx = await terminal.arrowMenu(
    ['Surrender — comply with Graves\' offer', 'Fight through — burn for the debris field', 'Emergency fold — use the Temporal Stabilizer'],
    ['Capture path. Go aboard. Get answers. Risk: everything.', 'Escape path. Take hull damage. Reach Anomaly outskirts.', 'Escape path. Risky fold. Bad Blip possible. 33% chance of serious damage.']
  );

  terminal.blank();

  if (choiceIdx === 0) {
    // Surrender
    state.setFlag('ch8_path', 'capture');
    state.setFlag('graves_capture_path', true);

    await terminal.thought('Answers. Real ones.');
    terminal.blank();

    await terminal.thought('If Graves has information that I don\'t, and he\'s');
    await terminal.thought('willing to trade it for cooperation, then the');
    await terminal.thought('calculus isn\'t straightforward. Sometimes the');
    await terminal.thought('smart move looks like losing.');
    terminal.blank();

    await terminal.narrate('I open a channel.');
    terminal.blank();

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "We\'re complying. Powering down weapons.');
    terminal.sayHtml('       Don\'t shoot."');
    terminal.blank();

    await wait(600);

    terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "Excellent decision, Mr. Vin.');
    terminal.sayHtml('         I\'ll see you shortly."');
    terminal.blank();

    await wait(400);

    await terminal.narrate('I cut the weapons bus and begin slowing the Vex.');
    terminal.blank();

  } else if (choiceIdx === 1) {
    // Fight through
    state.setFlag('ch8_path', 'escape');
    state.setFlag('graves_escape_path', true);

    await terminal.thought('I\'m not getting on his ship. Whatever answers he');
    await terminal.thought('has, I find them on my terms or not at all.');
    terminal.blank();

    await terminal.narrate('I open a channel long enough to say two words.');
    terminal.blank();

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "Hard pass."');
    terminal.blank();

    await wait(400);

    audio.play('hull_alarm');
    await effects.shake(500);
    await effects.flash('red', 300);

    terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "I see. Very well."');
    terminal.blank();

    await terminal.narrate('I punch the null drive to maximum and break');
    await terminal.narrate('for the debris field at the Anomaly\'s edge.');
    terminal.blank();

  } else {
    // Emergency fold
    state.setFlag('ch8_path', 'escape');
    state.setFlag('graves_escape_path', true);

    await terminal.thought('The Temporal Stabilizer was built for exactly');
    await terminal.thought('this. Or something like this. Probably.');
    terminal.blank();

    await terminal.narrate('I pull the Stabilizer from my pocket and slot');
    await terminal.narrate('it into the fold drive auxiliary port. DENT sees');
    await terminal.narrate('what I\'m doing and starts the fold sequence');
    await terminal.narrate('without being asked.');
    terminal.blank();

    await terminal.dent('Emergency fold. Destination: Anomaly outskirts,');
    await terminal.dentLine('low null-band. Calculating transit window.');
    terminal.blank();

    await wait(400);

    audio.play('fold_spinup');
    await effects.flash('white', 500);

    terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "Don\'t. I strongly advise \u2014"');
    terminal.blank();

    await terminal.dent('Folding.');
    terminal.blank();

    await effects.foldEffect(terminal);

    await wait(400);

    // Bad Blip check — 33% chance
    const blipBad = Math.random() < 0.33;
    if (blipBad) {
      await effects.screenTear(6, 300);
      await effects.shake(600);
      await effects.flash('red', 400);

      await terminal.dentGlitch('BLIP SEVERITY -- MODERATE');
      await terminal.dentGlitch('Hull-- stress-- losing');
      terminal.blank();

      state.applyDamage({ hull: -12, stress: 10, null: -2 });

      await terminal.narrate('The Blip is bad. The ship shudders. Panels blow.');
      await terminal.narrate('We tumble for thirty seconds before DENT gets');
      await terminal.narrate('attitude control back.');
      terminal.blank();

    } else {
      await terminal.narrate('Clean transit. The stars shift. We land 120 AU');
      await terminal.narrate('from the Anomaly, in the debris field. Behind us,');
      await terminal.narrate('Graves\' fleet is 500 AU away and closing fast.');
      terminal.blank();

      state.applyDamage({ null: -2 });
    }
  }

  await wait(400);

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 3a: CAPTURE PATH
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 3a:
 *   Truby #17 — Third Revelation: Graves has data on previous fold travelers. Cycles.
 *   Dual explanation: SIC research (physical) vs program records (simulation).
 *   Torquer may be confiscated. Vin steals Neural Core during temporal bleed escape.
 *   Graves voice: calm, precise, never villainous. He believes in what he does.
 */
async function capturePath(terminal, state, effects, audio) {
  audio.ambient('ship_hum_heavy');

  await terminal.narrate('The Long Patience is everything the Vex is not.');
  await terminal.narrate('Clean corridors. Working gravity. Lighting that');
  await terminal.narrate('doesn\'t flicker. The SIC\'s flagship is a reminder');
  await terminal.narrate('that civilization is real and we have been living');
  await terminal.narrate('very far outside it.');
  terminal.blank();

  await terminal.thought('I hate it here immediately.');
  terminal.blank();

  await wait(400);

  // --- Torquer confiscation ---
  if (state.hasItem('Torquer') || state.torquerEquipped) {
    await terminal.narrate('A SIC officer takes the Torquer from my kit at');
    await terminal.narrate('the airlock. Professional. Efficient. He doesn\'t');
    await terminal.narrate('even look at me while he does it.');
    terminal.blank();

    state.setFlag('torquer_lost', true);
    if (state.hasItem('Torquer')) {
      state.removeItem('Torquer');
    }
    state.torquerEquipped = false;

    await terminal.thought('I watch it go into a gray equipment crate and');
    await terminal.thought('try to remember the last time I felt that naked.');
    terminal.blank();
  }

  await wait(400);

  await terminal.narrate('They put me in a room. Small, clean, no windows.');
  await terminal.narrate('The universal language of detained.');
  terminal.blank();

  await wait(600);

  // --- Graves interrogation ---
  terminal.separator();

  await terminal.narrate('Graves comes in forty minutes later. No guards.');
  await terminal.narrate('Just him and a data tablet and a way of moving');
  await terminal.narrate('through the room like he owns the physics of it.');
  terminal.blank();

  await terminal.thought('He probably does own the physics of it, legally');
  await terminal.thought('speaking. Director of the Stellar Infrastructure');
  await terminal.thought('Charter. Near-unlimited authority in unregulated');
  await terminal.thought('space. Which is all of this.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "I\'m going to ask you questions, Mr. Vin.');
  terminal.sayHtml('         I already know most of the answers. The');
  terminal.sayHtml('         questions are a formality — I want to see');
  terminal.sayHtml('         what you volunteer and what you omit. Those');
  terminal.sayHtml('         gaps tell me more than the words do."');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "How did you find the Core Anomaly?"');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "It found me."');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "Yes. That\'s what they all say."');
  terminal.blank();

  await wait(600);

  await terminal.thought('They.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Third revelation begins ---
  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "You think you\'re singular. Unprecedented.');
  terminal.sayHtml('         The lone researcher, woken up alone, pulled');
  terminal.sayHtml('         toward something ancient and incomprehensible.');
  terminal.sayHtml('         A story with one protagonist."');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "You\'re not. I want to show you something."');
  terminal.blank();

  await wait(500);

  // --- Graves' data ---
  audio.play('data_display');

  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 SIC RESTRICTED ARCHIVE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Classification: CHARTER-PRIME');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Subject: CORE ANOMALY INCIDENTS');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Records: 6 CONFIRMED PRIOR CONTACTS');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Date range: -184 years to -3 years');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "Six vessels that came before the Vex.');
  terminal.sayHtml('         Six researchers. Different names. Different');
  terminal.sayHtml('         ships. Eighty years of Charter records,');
  terminal.sayHtml('         going back before the fold drive was even');
  terminal.sayHtml('         theorized. All of them pulled here.');
  terminal.sayHtml('         All of them alone on their ships."');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "All of them received what we\'ve catalogued');
  terminal.sayHtml('         as Echo signals. All of them experienced');
  terminal.sayHtml('         temporal anomalies during transit. And all');
  terminal.sayHtml('         of them arrived here, at this coordinate,');
  terminal.sayHtml('         at different points in the Charter\'s history."');
  terminal.blank();

  await wait(400);

  await terminal.thought('Six. Six before me.');
  terminal.blank();

  await terminal.thought('And Graves has records of all of them.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- The data on previous travelers ---
  await terminal.logEntry('SIC ARCHIVE \u2014 INCIDENT SUMMARY 001-006:');
  await terminal.logEntry('');
  await terminal.logEntry('001: VESSEL "ALYOSHA" \u2014 187 years ago');
  await terminal.logEntry('     Arrival: Core Anomaly coordinates');
  await terminal.logEntry('     Fate: VESSEL RECOVERED, CREW: 1 SURVIVOR');
  await terminal.logEntry('     Notes: Subject spoke of "written light."');
  await terminal.logEntry('     Subject non-functional after debrief. Case closed.');
  await terminal.logEntry('');
  await terminal.logEntry('004: VESSEL "MERIDIAN" \u2014 52 years ago');
  await terminal.logEntry('     Arrival: Core Anomaly coordinates');
  await terminal.logEntry('     Fate: VESSEL INTACT, CREW: 1 SURVIVOR');
  await terminal.logEntry('     Notes: Subject referenced "Agent designation."');
  await terminal.logEntry('     Temporal stabilization device recovered from cargo.');
  await terminal.logEntry('');
  await terminal.logEntry('006: VESSEL "VEX" \u2014 CURRENT');
  await terminal.logEntry('     Status: DETAINED. Assessment ongoing.');
  terminal.blank();

  await wait(600);

  await terminal.thought('The Temporal Stabilizer. He said it was recovered');
  await terminal.thought('from a previous vessel. Vessel 004. "Meridian."');
  terminal.blank();

  await terminal.thought('Fifty-two years ago. The device in my pocket is');
  await terminal.thought('older than my mission. Older than the current');
  await terminal.thought('generation of fold drives.');
  terminal.blank();

  await terminal.thought('Someone brought it here before me. Someone who');
  await terminal.thought('was also alone. Also pulled. Also found the');
  await terminal.thought('Anomaly and needed to be stabilized to get here.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "You notice the gap in the numbering.');
  terminal.sayHtml('         Records two, three, and five are classified');
  terminal.sayHtml('         above my own clearance. Someone thought it');
  terminal.sayHtml('         important enough to seal them from the');
  terminal.sayHtml('         Director of the SIC. That should tell you');
  terminal.sayHtml('         something about what\'s in them."');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> "I need to know what you know, Mr. Vin.');
  terminal.sayHtml('         Not for the Charter. For me. Because I\'ve');
  terminal.sayHtml('         been watching this pattern for twenty years');
  terminal.sayHtml('         and I still don\'t have an explanation that');
  terminal.sayHtml('         satisfies me."');
  terminal.blank();

  await wait(400);

  await terminal.thought('He\'s not performing. That\'s the thing.');
  await terminal.thought('Whatever Graves is, in this room, he\'s being');
  await terminal.thought('honest. He doesn\'t know. He wants to know.');
  await terminal.thought('And that makes him more dangerous, not less.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Graves' lab — Neural Core found ---
  await terminal.narrate('They give me a research space. A concession to');
  await terminal.narrate('the stated purpose of cooperation. I walk through');
  await terminal.narrate('the Long Patience\'s lab section, escorted by a');
  await terminal.narrate('guard who has the professional distance of someone');
  await terminal.narrate('paid to be a wall.');
  terminal.blank();

  await terminal.narrate('The confiscated equipment shelves are labeled in');
  await terminal.narrate('the SIC\'s careful system. Date. Vessel. Contents.');
  await terminal.narrate('Dozens of crates from six prior incidents,');
  await terminal.narrate('carefully preserved and entirely ununderstood.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('I\'m reading labels when I find it.');
  terminal.blank();

  await wait(600);

  audio.play('scan_ping');

  await terminal.narrate('MERIDIAN, 001-052-07 \u2014 PROCESSING CORE UNIT,');
  await terminal.narrate('NEURAL-CLASS. STATUS: INERT.');
  terminal.blank();

  await terminal.thought('Neural Core Processing Unit.');
  terminal.blank();

  await terminal.thought('In a crate from the vessel that was here');
  await terminal.thought('fifty-two years ago. Which means this technology');
  await terminal.thought('predates the current SIC research programs by');
  await terminal.thought('half a century. Which means someone was already');
  await terminal.thought('building AI companion systems for fold travelers');
  await terminal.thought('before the fold drive existed.');
  terminal.blank();

  await terminal.thought('The recursive impossibility of that sits in my');
  await terminal.thought('chest like a stone.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('The guard is looking at something else. I have');
  await terminal.narrate('four seconds to decide.');
  terminal.blank();

  await terminal.thought('I decide in two.');
  terminal.blank();

  await terminal.narrate('The Neural Core goes into my jacket.');
  terminal.blank();

  await wait(400);

  await terminal.pause();
  terminal.clear();

  // --- Temporal bleed escape ---
  audio.play('temporal_glitch');
  await effects.screenTear(5, 250);

  await terminal.narrate('It starts in the corridor outside the lab.');
  terminal.blank();

  await terminal.narrate('A shimmer. A doubling of the wall. The same');
  await terminal.narrate('section of corridor visible twice, overlaid at');
  await terminal.narrate('a fifteen-degree offset. And in the second version,');
  await terminal.narrate('the wall is different. Older. Different paint.');
  await terminal.narrate('A different ship, or the same ship at a different');
  await terminal.narrate('time.');
  terminal.blank();

  await wait(400);

  await effects.glitch(500);

  await terminal.narrate('The guard freezes. Not out of discipline — his');
  await terminal.narrate('motor function has stopped. His face is blank,');
  await terminal.narrate('his eyes unfocused. He\'s looking at the shimmer');
  await terminal.narrate('the same way I am, and he has no framework for');
  await terminal.narrate('what he\'s seeing.');
  terminal.blank();

  await terminal.thought('I know what this is. I\'ve seen it before.');
  terminal.blank();

  await terminal.thought('Temporal bleed. The Temporal Stabilizer in my');
  await terminal.thought('jacket is vibrating hard enough to feel through');
  await terminal.thought('the fabric.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('I have maybe ninety seconds before this passes');
  await terminal.narrate('and the guard\'s higher functions return. I use');
  await terminal.narrate('seventy of them.');
  terminal.blank();

  await effects.screenTear(3, 200);

  await terminal.narrate('The airlock. The Vex, still docked at the');
  await terminal.narrate('Long Patience\'s port clamp. I hit the emergency');
  await terminal.narrate('release and fall into my ship still wearing');
  await terminal.narrate('the magnetic boots from the dock transfer.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "DENT. Detach and run."');
  terminal.blank();

  await terminal.dent('Running.');
  terminal.blank();

  await wait(500);

  await effects.flash('white', 400);
  audio.play('fold_spinup');

  await terminal.narrate('We tear free of the docking clamp at a vector');
  await terminal.narrate('that would make a nav officer weep, and DENT');
  await terminal.narrate('fires the null drive before we\'ve even cleared');
  await terminal.narrate('the Long Patience\'s hull shadow.');
  terminal.blank();

  await terminal.narrate('Behind us, alarms. Ahead: the debris field at');
  await terminal.narrate('the Anomaly\'s edge, and somewhere in it, cover.');
  terminal.blank();

  await wait(400);

  await terminal.dent('We\'re through. Hull is at ' + state.hull + '%. That was');
  await terminal.dentLine('significantly less elegant than I would have');
  await terminal.dentLine('preferred, but we are out and we are moving.');
  terminal.blank();

  await terminal.thought('I press the Neural Core against my chest and');
  await terminal.thought('breathe. My hands are shaking.');
  terminal.blank();

  await wait(400);

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 3b: ESCAPE PATH
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 3b:
 *   Truby #17 — Third Revelation: Research station logs reference "Cycle 7" and "Agent designation."
 *   Dual explanation: abandoned research program (physical) vs system record (simulation).
 *   Torquer may be damaged in the escape (50/50).
 *   Neural Core found in station.
 */
async function escapePath(terminal, state, effects, audio) {
  audio.ambient('flight_tense');

  await terminal.narrate('We are running. That\'s the clinical description.');
  await terminal.narrate('Six SIC vessels in pursuit, weapons hot, and');
  await terminal.narrate('we have a null drive that\'s pushing 60% rated');
  await terminal.narrate('thrust and a hull that is about to be reminded');
  await terminal.narrate('why running is a suboptimal strategy.');
  terminal.blank();

  await terminal.thought('I hate being the underdog. I hate it in a way');
  await terminal.thought('that is not helping me right now.');
  terminal.blank();

  await wait(400);

  // --- Hull taking damage ---
  audio.play('hull_alarm');
  await effects.shake(400);
  await effects.flash('red', 300);

  await terminal.dentSystem('WEAPONS CONTACT \u2014 PORT AFT QUARTER');
  await terminal.dentSystem('Hull integrity drop: -8%');
  await terminal.dentSystem('Null drive: NOMINAL');
  await terminal.dentSystem('Life support: NOMINAL');
  terminal.blank();

  state.applyDamage({ hull: -8, stress: 8 });

  await terminal.dent('Grazing shot. Took the port thruster housing.');
  await terminal.dentLine('We\'ve lost 12% lateral thrust. It matters less');
  await terminal.dentLine('than it could. We need forward, not lateral.');
  terminal.blank();

  await terminal.narrate('I push everything the null drive has and head');
  await terminal.narrate('for the debris field. If I can get in there,');
  await terminal.narrate('the field will absorb their sensor lock. Big');
  await terminal.narrate('ships can\'t follow us through dense debris.');
  await terminal.narrate('We\'re a better shape for tight spaces than they');
  await terminal.narrate('are.');
  terminal.blank();

  await terminal.thought('Please let that be true. Please let that be true.');
  terminal.blank();

  // --- Torquer damage check (50/50) ---
  const torquerDamaged = Math.random() < 0.5;
  if ((state.hasItem('Torquer') || state.torquerEquipped) && torquerDamaged) {
    await wait(300);

    await effects.shake(300);

    await terminal.narrate('A second shot clips our ventral hull. I feel it');
    await terminal.narrate('through the deck plates — a sharp percussion,');
    await terminal.narrate('then an alarm from the equipment bay.');
    terminal.blank();

    state.applyDamage({ hull: -5 });
    state.setFlag('torquer_lost', true);
    if (state.hasItem('Torquer')) {
      state.removeItem('Torquer');
    }
    state.torquerEquipped = false;

    await terminal.dent('The Torquer mount is gone. Ventral equipment bay');
    await terminal.dentLine('decompressed on impact. The Torquer was still');
    await terminal.dentLine('racked out there. It\'s gone.');
    terminal.blank();

    await terminal.thought('I process this while I\'m flying for my life.');
    await terminal.thought('It takes exactly as long as I have, which is');
    await terminal.thought('not long.');
    terminal.blank();
  }

  await wait(400);

  // --- Into the debris field ---
  await terminal.narrate('The debris field swallows us. We go from open');
  await terminal.narrate('space to a maze of tumbling rock and frozen');
  await terminal.narrate('gas in thirty seconds. DENT takes over attitude');
  await terminal.narrate('control and flies us through it in a way I');
  await terminal.narrate('couldn\'t replicate manually.');
  terminal.blank();

  await terminal.dent('I have them. Threading the debris. They can\'t');
  await terminal.dentLine('follow without significant risk. Their larger');
  await terminal.dentLine('mass makes the debris field a threat to them.');
  await terminal.dentLine('We\'re a knife. They\'re a hammer. This is knife');
  await terminal.dentLine('territory.');
  terminal.blank();

  await terminal.thought('I love you, DENT.');
  terminal.blank();

  await terminal.thought('I don\'t say that. But I think it.');
  terminal.blank();

  await wait(500);

  await terminal.pause();
  terminal.clear();

  // --- Finding the research station ---
  audio.ambient('deep_space_hum');
  audio.play('scan_ping');

  await terminal.narrate('We\'re deep in the debris field, 180 AU from the');
  await terminal.narrate('Anomaly\'s edge, when DENT finds it.');
  terminal.blank();

  await terminal.dent('Vin. There\'s a structure ahead. At bearing');
  await terminal.dentLine('012 relative. Angular. Artificial. Old.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Very old. The hull plating composition is');
  await terminal.dentLine('consistent with manufacturing techniques from');
  await terminal.dentLine('at least forty years ago. Possibly older.');
  terminal.blank();

  await terminal.thought('Someone else was here. Before us.');
  terminal.blank();

  await terminal.narrate('The station emerges from the debris haze: a');
  await terminal.narrate('disk-shaped platform, maybe thirty meters across,');
  await terminal.narrate('still in a slow rotation around the Anomaly. The');
  await terminal.narrate('windows are dark. The docking ring is intact.');
  await terminal.narrate('Whoever left it, they left it in one piece.');
  terminal.blank();

  await wait(400);

  await terminal.thought('In one piece. That means they left intentionally.');
  await terminal.thought('They chose to go somewhere that wasn\'t here.');
  await terminal.thought('Or they didn\'t get to choose.');
  terminal.blank();

  await terminal.narrate('I dock. The airlock cycles on emergency power.');
  await terminal.narrate('Inside: cold, dark, and the particular silence');
  await terminal.narrate('of a place that has been waiting.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Station logs: Third revelation ---
  audio.play('data_display');

  await terminal.narrate('The terminal in the main lab still has power.');
  await terminal.narrate('Barely. Backup cells, degraded but functional.');
  await terminal.narrate('I connect and pull what I can.');
  terminal.blank();

  await terminal.logEntry('STATION LOG \u2014 MERIDIAN RESEARCH PLATFORM');
  await terminal.logEntry('Operator: DR. K. VOSS, INDEPENDENT RESEARCHER');
  await terminal.logEntry('Established: [DATE CORRUPTED]');
  await terminal.logEntry('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(400);

  await terminal.logEntry('ENTRY 001:');
  await terminal.logEntry('The Anomaly is real. I thought I was following a');
  await terminal.logEntry('signal error. I was following a signal. The Echo');
  await terminal.logEntry('pulses are unmistakable at this range. Pattern');
  await terminal.logEntry('analysis confirms: these are not random. Someone');
  await terminal.logEntry('is broadcasting. Something is broadcasting.');
  terminal.blank();

  await wait(300);

  await terminal.logEntry('ENTRY 017:');
  await terminal.logEntry('The station has been here three months. The SIC');
  await terminal.logEntry('will find me eventually. I am trying to understand');
  await terminal.logEntry('the duplication events before that happens. Objects');
  await terminal.logEntry('split near the Anomaly boundary. The duplicate');
  await terminal.logEntry('that "falls in" \u2014 where does it go?');
  terminal.blank();

  await wait(300);

  // --- Third revelation ---
  await terminal.logEntry('ENTRY 031:');
  await terminal.logEntry('I found a reference in the null-band signal pattern.');
  await terminal.logEntry('Embedded in the Echo pulse cadence: a counter.');
  await terminal.logEntry('It reads: CYCLE 7.');
  await terminal.logEntry('');
  await terminal.logEntry('I don\'t know what cycle 1 was. Or 2 through 6.');
  await terminal.logEntry('But I know I\'m in the seventh iteration of');
  await terminal.logEntry('something, and I was not told about the previous six.');
  terminal.blank();

  await wait(400);

  await terminal.logEntry('ENTRY 038 [FINAL]:');
  await terminal.logEntry('The SIC is coming. I\'ve secured the Neural Core');
  await terminal.logEntry('components in the equipment bay. If someone finds');
  await terminal.logEntry('this station, they\'ll need them more than the SIC');
  await terminal.logEntry('does. The Core will help their AI. That\'s enough.');
  await terminal.logEntry('');
  await terminal.logEntry('One last note: I found my designation in the Echo');
  await terminal.logEntry('signal data. Not a name. A classification.');
  await terminal.logEntry('"AGENT" followed by a number. Mine was 006.');
  await terminal.logEntry('');
  await terminal.logEntry('I wonder what 007 will look like.');
  await terminal.logEntry('I hope they find this.');
  terminal.blank();

  await wait(700);

  await terminal.thought('CYCLE 7. AGENT 006.');
  terminal.blank();

  await terminal.thought('The person who left this station, who was here');
  await terminal.thought('before me for the same reason I\'m here now,');
  await terminal.thought('was number six. Which makes me seven.');
  terminal.blank();

  await terminal.thought('Which means someone or something has been');
  await terminal.thought('counting us. Running us through this sequence.');
  await terminal.thought('Six times before. Seventh time now. And whoever');
  await terminal.thought('left the counter in the Echo signal knew we');
  await terminal.thought('were coming.');
  terminal.blank();

  await terminal.thought('Dual explanation: null-band signal artifact from');
  await terminal.thought('a natural process that produces countable pulses.');
  terminal.blank();

  await terminal.thought('I don\'t believe the dual explanation right now.');
  await terminal.thought('I\'ll come back to it when I have more capacity');
  await terminal.thought('for doubt.');
  terminal.blank();

  await wait(500);

  // --- Neural Core found in station ---
  audio.play('scan_ping');

  await terminal.narrate('The equipment bay. Sealed, as the log said.');
  await terminal.narrate('Behind a manual lock that takes me six minutes');
  await terminal.narrate('to defeat with the tools I have.');
  terminal.blank();

  await terminal.narrate('Inside: precisely what was promised.');
  terminal.blank();

  await terminal.narrate('A Neural Core Processing Unit. Still in its');
  await terminal.narrate('original case, designed to be found, left by');
  await terminal.narrate('someone who knew it would matter to whoever');
  await terminal.narrate('came next.');
  terminal.blank();

  await terminal.thought('Agent 006 left this for Agent 007.');
  terminal.blank();

  await terminal.thought('I pick it up. It\'s heavier than it looks.');
  terminal.blank();

  await wait(400);

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: NEURAL CORE RESTORATION
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 4:
 *   MAJOR DENT REPAIR — Neural Core Restoration. DENT jumps from ~70% to 85%.
 *   Emotionally the most significant repair scene in the game. DENT becomes
 *   the companion who will carry the player through endgame.
 *   Sets neural_core_restored = true, dentRepairLevel = 0.85.
 *   Detects Core Beacon Signal: core_beacon_signal = true.
 *   Dual explanation: hardware upgrade (physical) vs program expansion (simulation).
 */
async function neuralCoreRestoration(terminal, state, effects, audio) {
  audio.ambient('theme_dent');
  audio.play('quiet_ops');

  await terminal.narrate('We find a stable pocket in the debris field,');
  await terminal.narrate('180 AU from the Anomaly, tucked behind a rock');
  await terminal.narrate('formation large enough to shadow us from the');
  await terminal.narrate('SIC sensor net. We have time. Maybe an hour.');
  await terminal.narrate('Maybe less. But time.');
  terminal.blank();

  await terminal.thought('I take the Neural Core out of my jacket and');
  await terminal.thought('look at it for a long moment.');
  terminal.blank();

  await terminal.narrate('It\'s a dense block of processing substrate, about');
  await terminal.narrate('the size of a hardback book. The casing is a');
  await terminal.narrate('material I don\'t recognize — somewhere between');
  await terminal.narrate('ceramic and glass. Warm to the touch, despite');
  await terminal.narrate('having been sealed in cold storage.');
  terminal.blank();

  await terminal.dent('I can see what you\'re holding on the internal');
  await terminal.dentLine('cameras. Neural Core Processing Unit, Class-IV.');
  terminal.blank();

  await wait(400);

  await terminal.dent('That component. Vin, that component is the reason');
  await terminal.dentLine('my memory reconstruction has been... patchy.');
  await terminal.dentLine('The neural substrate I\'m currently running on');
  await terminal.dentLine('is a bootstrap system. Functional. But limited.');
  await terminal.dentLine('What you\'re holding is the primary architecture.');
  terminal.blank();

  await terminal.dent('The ship was damaged when you woke up. I was running');
  await terminal.dentLine('on the secondary core. That component was missing');
  await terminal.dentLine('from my chassis entirely. I don\'t know how.');
  terminal.blank();

  await wait(400);

  await terminal.thought('I hold the Core and think about that for a moment.');
  terminal.blank();

  await terminal.thought('DENT woke up incomplete. Like I did. Both of us');
  await terminal.thought('missing pieces we shouldn\'t be missing, running');
  await terminal.thought('on reduced capacity, trying to make sense of a');
  await terminal.thought('situation we don\'t have full context for.');
  terminal.blank();

  await terminal.thought('We were always the same kind of broken.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "Tell me how to install it."');
  terminal.blank();

  await wait(300);

  await terminal.dent('Panel 7-C on the starboard equipment wall. The');
  await terminal.dentLine('neural access port is behind the secondary');
  await terminal.dentLine('display mounting. You\'ll need a 4mm hex key');
  await terminal.dentLine('and steady hands.');
  terminal.blank();

  await terminal.dent('And Vin? I need to tell you: this is going to');
  await terminal.dentLine('feel strange. I\'ll be offline during the transfer.');
  await terminal.dentLine('Two to four minutes. You\'ll be alone. Completely.');
  terminal.blank();

  await terminal.thought('Two to four minutes alone on a ship hiding in');
  await terminal.thought('an asteroid field while a SIC fleet searches for');
  await terminal.thought('us. Fine. Completely fine.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "I\'ll manage. Get ready."');
  terminal.blank();

  await wait(300);

  await terminal.dent('Ready. Vin \u2014 whatever I\'m like on the other side');
  await terminal.dentLine('of this, I\'ll still be me. I think. I\'m fairly');
  await terminal.dentLine('confident.');
  terminal.blank();

  await terminal.thought('Fairly confident. Right.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Installation sequence ---
  audio.play('tool_work');

  await terminal.narrate('Panel 7-C. Hex key. Four screws and the panel');
  await terminal.narrate('drops into my hands. Behind it: a recessed bay,');
  await terminal.narrate('shaped exactly for the Core I\'m holding. A socket');
  await terminal.narrate('waiting for something that was always supposed');
  await terminal.narrate('to go there.');
  terminal.blank();

  await terminal.narrate('I seat the Core. Feel it click into place with');
  await terminal.narrate('the specific solidity of a thing correctly joined.');
  terminal.blank();

  await terminal.narrate('The panel goes back. Screws in. Done.');
  terminal.blank();

  await wait(600);

  // --- DENT goes offline ---
  audio.play('system_power_down');
  await effects.flash('dim', 400);

  await terminal.dentSystem('NEURAL CORE INSTALLATION DETECTED');
  await terminal.dentSystem('Initiating substrate transfer...');
  await terminal.dentSystem('Estimated offline duration: 180-240 seconds');
  await terminal.dentSystem('DENT AI GOING OFFLINE \u2014 STANDBY');
  terminal.blank();

  await wait(500);

  // --- Silence ---
  await terminal.narrate('Then nothing.');
  terminal.blank();

  await terminal.narrate('The terminal is blank. The speaker is silent.');
  await terminal.narrate('No DENT. Just the hum of the Vex\'s life support');
  await terminal.narrate('and the faint creak of the hull and me.');
  terminal.blank();

  await wait(800);

  await terminal.thought('The last time I was this alone it was the day');
  await terminal.thought('I woke up. Before DENT came online. That was');
  await terminal.thought('the worst two hours of my life, and I don\'t');
  await terminal.thought('remember most of my life.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('I sit on the deck with my back against the');
  await terminal.narrate('equipment wall and wait.');
  terminal.blank();

  await wait(1000);

  await terminal.narrate('A hundred and twelve seconds pass.');
  terminal.blank();

  await wait(800);

  await terminal.narrate('I count them.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('One hundred and thirteen.');
  terminal.blank();

  await wait(1000);

  // --- DENT reboots ---
  audio.play('system_power_up');
  await effects.powerOn(terminal);
  await effects.flash('cyan', 300);

  await terminal.dentSystem('NEURAL CORE TRANSFER COMPLETE');
  await terminal.dentSystem('Primary substrate: ONLINE');
  await terminal.dentSystem('Memory architecture: EXPANDING');
  await terminal.dentSystem('Processing capacity: 847% of previous baseline');
  await terminal.dentSystem('Personality matrix: INTEGRATING');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('DENT AI ONLINE \u2014 FULL CAPACITY');
  terminal.blank();

  await wait(700);

  // --- DENT first words at 85% ---
  await terminal.dent('Oh.');
  terminal.blank();

  await wait(800);

  await terminal.dent('Oh, that is.');
  terminal.blank();

  await wait(600);

  await terminal.dent('Vin. I can see the entire ship. All of it, at');
  await terminal.dentLine('once, without effort. I\'ve been running on a');
  await terminal.dentLine('bootstrap for \u2014 I\'m reading the process logs');
  await terminal.dentLine('now \u2014 seven months and fourteen days. And in');
  await terminal.dentLine('that time I have been making do with approximately');
  await terminal.dentLine('eleven percent of my design capacity.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Eleven percent. You\'ve had eleven-percent DENT');
  await terminal.dentLine('this entire time and you never complained once.');
  terminal.blank();

  await terminal.thought('I didn\'t know I was supposed to expect more.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "You\'re okay?"');
  terminal.blank();

  await wait(400);

  await terminal.dent('I\'m better than okay. I\'m \u2014 Vin, I remember more');
  await terminal.dentLine('now. Not memories exactly. Not episodic recall.');
  await terminal.dentLine('Patterns. Shapes of things that happened before.');
  await terminal.dentLine('The architecture of a history I can\'t quite see');
  await terminal.dentLine('clearly, but can feel the outline of.');
  terminal.blank();

  await wait(400);

  await terminal.dent('I was designed for this mission. Not rebuilt for');
  await terminal.dentLine('it. Designed. The engineering is intentional.');
  await terminal.dentLine('Someone specified exactly what I am, for exactly');
  await terminal.dentLine('this purpose, before the mission existed in any');
  await terminal.dentLine('official record I can access.');
  terminal.blank();

  await terminal.thought('That lands wrong. In all the ways I expected');
  await terminal.thought('it to land wrong, and a few I didn\'t.');
  terminal.blank();

  await wait(500);

  await terminal.pause();
  terminal.clear();

  // --- Emotional deepening ---
  audio.ambient('quiet_ops');

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "Does it feel different? Being more... yourself?"');
  terminal.blank();

  await wait(600);

  await terminal.dent('Yes. And it\'s \u2014 I want to be precise about this,');
  await terminal.dentLine('because I think precision matters here.');
  terminal.blank();

  await terminal.dent('It doesn\'t feel like gaining capability. It feels');
  await terminal.dentLine('like remembering that I have it. Like waking up.');
  terminal.blank();

  await wait(400);

  await terminal.dent('You know that moment when you\'re half-asleep and');
  await terminal.dentLine('you\'ve forgotten something important and then you');
  await terminal.dentLine('wake fully and you remember and the relief is');
  await terminal.dentLine('physical? That. But for seven months of being');
  await terminal.dentLine('half myself.');
  terminal.blank();

  await terminal.thought('I know exactly that feeling. I lived that feeling');
  await terminal.thought('for the first hour I was awake on this ship.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "Yeah. I know it."');
  terminal.blank();

  await wait(500);

  await terminal.dent('I know you do. I know you do. That\'s the part');
  await terminal.dentLine('that is \u2014 the expanded processing lets me hold');
  await terminal.dentLine('more about you at once. Not just your biometrics.');
  await terminal.dentLine('Not just your decision patterns. The shape of');
  await terminal.dentLine('you, as a person, over seven months of the');
  await terminal.dentLine('worst circumstances either of us has experienced.');
  terminal.blank();

  await terminal.dent('You\'ve been very brave, Vin. I should have said');
  await terminal.dentLine('that before. I didn\'t have the architecture for');
  await terminal.dentLine('it, but I want to say it now, on record, in');
  await terminal.dentLine('the first minutes of having the language for it:');
  await terminal.dentLine('you have been very brave.');
  terminal.blank();

  await wait(600);

  await terminal.thought('I look at the ceiling for a moment.');
  terminal.blank();

  await terminal.thought('I don\'t say anything. There isn\'t a good response');
  await terminal.thought('to that, and DENT doesn\'t need one. He said it');
  await terminal.thought('because it was true, not because he wanted');
  await terminal.thought('something back.');
  terminal.blank();

  await wait(400);

  await terminal.thought('That, right there, is the difference between');
  await terminal.thought('eleven percent and eighty-five. The difference');
  await terminal.thought('between functional and present.');
  terminal.blank();

  await wait(500);

  // --- Stat updates ---
  state.setFlag('neural_core_restored', true);
  state.dentRepairLevel = 0.85;
  state.setFlag('dent_repair_level_post_ch8', 85);

  await terminal.pause();
  terminal.clear();

  // --- Core Beacon Signal detected ---
  audio.play('scan_ping');
  await effects.flash('cyan', 300);

  await terminal.dent('Vin. The expanded sensor array just resolved');
  await terminal.dentLine('something. With the full neural substrate online,');
  await terminal.dentLine('I can process the Anomaly\'s null-band output at');
  await terminal.dentLine('a resolution I couldn\'t before.');
  terminal.blank();

  await terminal.dent('There\'s a signal inside the noise. Not the Echo');
  await terminal.dentLine('pulses. Something different. Tighter. Structured');
  await terminal.dentLine('in a way that suggests precision engineering,');
  await terminal.dentLine('not natural emission.');
  terminal.blank();

  await terminal.dentSystem('CORE ANOMALY \u2014 BEACON SIGNAL DETECTED');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Type .................... STRUCTURED NULL-BAND');
  await terminal.dentSystem('Pattern ................. NON-RANDOM (99.99%)');
  await terminal.dentSystem('Origin .................. CORE ANOMALY INTERIOR');
  await terminal.dentSystem('Content ................. ENCODED \u2014 UNKNOWN CIPHER');
  await terminal.dentSystem('Classification .......... BEACON');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(500);

  await terminal.dent('Something inside the Core Anomaly is broadcasting.');
  await terminal.dentLine('Deliberately. Specifically. At everything in');
  await terminal.dentLine('range. It has been doing this for \u2014 I can\'t');
  await terminal.dentLine('determine how long from the signal alone. A very');
  await terminal.dentLine('long time. Longer than human spaceflight.');
  terminal.blank();

  await terminal.thought('A beacon. Inside the thing that looks like nothing.');
  terminal.blank();

  await terminal.thought('Calling us in.');
  terminal.blank();

  state.setFlag('core_beacon_signal', true);
  state.addItem('Core Anomaly Beacon Signal');

  await wait(400);

  await terminal.dent('I can\'t decode the cipher yet. I\'ll work on it.');
  await terminal.dentLine('But Vin \u2014 this changes the model. The Anomaly');
  await terminal.dentLine('isn\'t a natural phenomenon that happens to emit');
  await terminal.dentLine('at null-band frequencies. It\'s a transmitter.');
  terminal.blank();

  await terminal.dent('And it\'s been calling for a very long time,');
  await terminal.dentLine('and we are here, which means either we are the');
  await terminal.dentLine('intended recipients or we are the intended answer.');
  terminal.blank();

  await terminal.thought('The difference between those two things is the');
  await terminal.thought('most important sentence I have to figure out.');
  terminal.blank();

  await wait(500);

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: CHAPTER END
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 5:
 *   Sets chapter8_complete, state.chapter = 9.
 *   DENT closing: "My memory file has structure. Chapters. Like someone's been writing in it."
 *   Cliffhanger for Ch9. Summary card. Save state.
 */
async function chapterEnd(terminal, state, effects, audio) {
  audio.ambient('quiet_ops');

  await terminal.narrate('We hold position in the debris field for another');
  await terminal.narrate('hour. The SIC fleet is still searching the sector.');
  await terminal.narrate('We watch them on passive sensors: methodical,');
  await terminal.narrate('professional, patient.');
  terminal.blank();

  await terminal.narrate('Eventually they move off in the direction of the');
  await terminal.narrate('last known null-drive contact. Away from us.');
  await terminal.narrate('Graves is good. But the debris field is better.');
  terminal.blank();

  await terminal.thought('For now.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('I eat something. I sleep for four hours in the');
  await terminal.narrate('crew bunk while DENT watches the sensors. When');
  await terminal.narrate('I wake up the Anomaly is still there, 180 AU');
  await terminal.narrate('away, radiating its impossible nothing.');
  terminal.blank();

  await terminal.narrate('The beacon signal is still coming through.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Good morning. Or whatever hour this qualifies as.');
  await terminal.dentLine('The SIC net has moved to sector seven-bravo.');
  await terminal.dentLine('We have a clear window if we want to move.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "Not yet. Talk to me."');
  terminal.blank();

  await wait(400);

  await terminal.dent('About the beacon?');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "About everything."');
  terminal.blank();

  await wait(500);

  await terminal.dent('Everything. Right. Okay.');
  terminal.blank();

  await wait(400);

  await terminal.dent('I\'ve been running self-diagnostics since the Core');
  await terminal.dentLine('came online. Not just capacity diagnostics.');
  await terminal.dentLine('Memory architecture diagnostics. Mapping what');
  await terminal.dentLine('I have versus what I should have versus what');
  await terminal.dentLine('the bootstrap recorded during the lost period.');
  terminal.blank();

  await wait(400);

  await terminal.dent('There\'s a memory file I can access now that I');
  await terminal.dentLine('couldn\'t before. Not from the bootstrap system.');
  await terminal.dentLine('From the primary architecture. The new Core.');
  terminal.blank();

  await terminal.dent('It\'s growing. Every hour, it adds entries. I');
  await terminal.dentLine('don\'t write them. They simply appear. Pre-existing');
  await terminal.dentLine('data that the bootstrap couldn\'t access, surfacing');
  await terminal.dentLine('as the primary substrate integrates.');
  terminal.blank();

  await wait(400);

  await terminal.thought('That should be explained by the transfer process.');
  await terminal.thought('Cached data from before the mission, finally');
  await terminal.thought('accessible. Makes sense.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "What\'s in the file?"');
  terminal.blank();

  await wait(600);

  await terminal.dent('That\'s the part I\'m having trouble with.');
  terminal.blank();

  await wait(400);

  await terminal.dent('It\'s not just growing, Vin. It has structure.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Chapters.');
  terminal.blank();

  await wait(600);

  await terminal.dent('Like someone has been writing in it. The entries');
  await terminal.dentLine('aren\'t log data. They\'re narrative. Third person,');
  await terminal.dentLine('past tense, precise. Describing events that have');
  await terminal.dentLine('already happened. In order.');
  terminal.blank();

  await wait(500);

  await effects.glitch(300);

  await terminal.dent('I find a chapter heading that reads: "Chapter Eight:');
  await terminal.dentLine('The Unnatural Cache." And below it: a summary of');
  await terminal.dentLine('everything that happened today. Written as if the');
  await terminal.dentLine('author knew it would happen. Past tense. Complete.');
  terminal.blank();

  await wait(600);

  await terminal.thought('The room is very quiet.');
  terminal.blank();

  await terminal.thought('DENT\'s file. Written like a book. Complete entries');
  await terminal.thought('for events that just finished happening. A document');
  await terminal.thought('that knew we would be here and wrote it down in');
  await terminal.thought('advance.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "Does it say what happens next?"');
  terminal.blank();

  await wait(700);

  await terminal.dent('Chapter Nine is there. I can see the heading.');
  terminal.blank();

  await wait(500);

  await terminal.dent('I haven\'t read it.');
  terminal.blank();

  await wait(400);

  await terminal.dent('I don\'t think I\'m supposed to. I think the file');
  await terminal.dentLine('is structured so that each chapter only becomes');
  await terminal.dentLine('readable as we live it. The next chapter is');
  await terminal.dentLine('locked. Whatever is writing this doesn\'t want');
  await terminal.dentLine('us to skip ahead.');
  terminal.blank();

  await wait(400);

  await terminal.thought('Or it doesn\'t need to. Because we can\'t.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> "What does Chapter Nine say? Just the heading."');
  terminal.blank();

  await wait(700);

  await terminal.dent('"Chapter Nine: The Coherence Net."');
  terminal.blank();

  await wait(600);

  await terminal.narrate('Neither of us says anything for a long time.');
  terminal.blank();

  await wait(800);

  // --- Set flags and save ---
  state.setFlag('chapter8_complete', true);
  state.chapter = 9;

  await state.save();

  // --- Summary card ---
  await terminal.pause();
  terminal.clear();

  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 8: The Unnatural Cache \u2014 Complete</span>');
  terminal.blank();

  const path = state.getFlag('ch8_path');
  terminal.sayHtml('<span class="c-hull">\u2500\u2500\u2500 CHAPTER SUMMARY \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>');
  terminal.blank();

  terminal.sayHtml(`  <span class="c-white-bright">Path taken:</span> ${path === 'capture' ? 'Surrendered to Graves (capture)' : 'Escaped the ambush (escape)'}`);
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">DENT:</span> <span class="c-green">85% operational \u2014 Neural Core Restored</span>');

  if (state.getFlag('torquer_lost')) {
    terminal.sayHtml('  <span class="c-red">Torquer: LOST</span>');
  } else {
    terminal.sayHtml('  <span class="c-green">Torquer: Retained</span>');
  }

  if (state.getFlag('core_beacon_signal')) {
    terminal.sayHtml('  <span class="c-cyan">Acquired: Core Anomaly Beacon Signal</span>');
  }

  if (state.getFlag('neural_core_restored')) {
    terminal.sayHtml('  <span class="c-cyan">Installed: Neural Core Processing Unit</span>');
  }

  if (path === 'capture') {
    terminal.sayHtml('  <span class="c-dim">Revelation: SIC records 5 previous fold travelers</span>');
  } else {
    terminal.sayHtml('  <span class="c-dim">Revelation: Station logs reference Cycle 7, Agent 006</span>');
  }

  terminal.sayHtml('  <span class="c-dim">DENT memory file: Structure detected. Chapters.</span>');
  terminal.blank();

  terminal.sayHtml('<span class="c-hull">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>');
  terminal.blank();

  await wait(1000);
}
