/**
 * CHAPTER 3: BREACHING THE CHARTER
 * Post-fold Blip aftermath. Discover abandoned SIC relay station RS-7 Talos.
 * First encounter with Director Graves. Escape and pursuit.
 *
 * Ported from scenes/chapter3.py — complete, faithful conversion.
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter3(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_relay_station');
  await terminal.chapterTitle(3, 'BREACHING THE CHARTER');

  await blipAftermath(terminal, state, effects, audio);

  if (state.getFlag('rs7_explored')) {
    await stationExploration(terminal, state, effects, audio);
    await dentRepairScene(terminal, state, effects, audio);
  }

  await gravesContact(terminal, state, effects, audio);
  await escapeSequence(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: BLIP AFTERMATH & WAYPOINT ARRIVAL
// ═══════════════════════════════════════════════════════

async function blipAftermath(terminal, state, effects, audio) {
  // --- Post-fold stress ---
  state.applyDamage({ stress: 5 });

  audio.play('hull_creak');

  await terminal.narrate('The stars are wrong.');
  terminal.blank();

  await terminal.narrate('Not wrong exactly \u2014 just different. The viewport');
  await terminal.narrate('shows an unfamiliar field of white points against');
  await terminal.narrate('black nothing. We\'re 3.2 light-years from where');
  await terminal.narrate('we started and the sky has shifted to match.');
  terminal.blank();

  await terminal.thought('New sky. New problems. Same Vex.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The hull creaks \u2014 thermal expansion settling from');
  await terminal.narrate('the fold. Every joint in the ship complains like');
  await terminal.narrate('an old building after a storm.');
  terminal.blank();

  await terminal.narrate('My hands are still shaking. I clench them once,');
  await terminal.narrate('twice, until they stop.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- DENT diagnostics ---
  await terminal.dent('Vin. Systems are... mostly intact.');
  await terminal.dentLine('Running full diagnostics now.');
  terminal.blank();

  await wait(300);

  await terminal.dentSystem('POST-FOLD DIAGNOSTIC \u2014 THE VEX');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem(`Hull integrity ......... ${state.hull}%`);
  await terminal.dentSystem('Life support ........... NOMINAL');
  await terminal.dentSystem(`Null reserves .......... ${state.nullReserves} cells`);
  await terminal.dentSystem(`Fold drive ............. ${state.foldStatus}`);
  await terminal.dentSystem('Sensors ................ ONLINE');
  await terminal.dentSystem('Gravity drive .......... OFFLINE');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(300);

  await terminal.dent('Everything reads within tolerance. Barely.');
  terminal.blank();

  await terminal.thought('Within tolerance. The engineer\'s way of saying');
  await terminal.thought('\'not dead yet.\'');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Simulation clue 1: Chronometer discrepancy ---
  await terminal.dent('One thing.');
  terminal.blank();

  await wait(300);

  await terminal.dent('The chronometer is showing a discrepancy.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 CHRONOMETER LOG \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Fold transit (measured) ... <span class="c-white-bright">0.003s</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Ship clock elapsed ....... <span class="c-yellow">11.000s</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Discrepancy .............. <span class="c-yellow">10.997s</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.thought('Eleven seconds. The fold should be instantaneous');
  await terminal.thought('from our reference frame. Three milliseconds of');
  await terminal.thought('transit, not eleven seconds of... what?');
  terminal.blank();

  await terminal.thought('Where did those eleven seconds go?');
  terminal.blank();

  await wait(500);

  await terminal.dent('Sensor drift from the Blip, probably. The fold');
  await terminal.dentLine('generates enough EM interference to scramble');
  await terminal.dentLine('a clock. I\'ve seen it in the calibration logs.');
  terminal.blank();

  if (state.getFlag('blip_reaction') === 'scientific') {
    await terminal.thought('Sensor drift. Maybe. But I\'m logging it anyway.');
    await terminal.thought('Eleven seconds is a lot of drift.');
  } else if (state.getFlag('blip_reaction') === 'emotional') {
    await terminal.thought('DENT sounds sure. I want to believe him.');
    await terminal.thought('Eleven seconds is a long time to lose.');
  } else {
    await terminal.thought('Sensor drift. Fine. Moving on.');
  }
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Simulation clue 2: Hydrospanner displacement ---
  await terminal.narrate('I push off the console and drift toward');
  await terminal.narrate('engineering. Force of habit \u2014 after any major');
  await terminal.narrate('event, check the hardware.');
  terminal.blank();

  await terminal.narrate('The fold drive housing is warm to the touch.');
  await terminal.narrate('Normal. The null injector seals are holding.');
  await terminal.narrate('Normal. The backup power coupling is\u2014');
  terminal.blank();

  await wait(300);

  await terminal.narrate('I stop.');
  terminal.blank();

  await terminal.narrate('The hydrospanner on the workbench. I left it');
  await terminal.narrate('parallel to the edge, teeth facing starboard.');
  await terminal.narrate('I always do. Same position, every time.');
  terminal.blank();

  await terminal.narrate('It\'s perpendicular now. Teeth facing port.');
  terminal.blank();

  await wait(500);

  await terminal.thought('...');
  terminal.blank();

  await terminal.thought('Thermal expansion. The fold shook the whole');
  await terminal.thought('ship. Tools shift.');
  terminal.blank();

  await terminal.narrate('I pick it up, set it back the way I like it,');
  await terminal.narrate('and move on.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Station detection ---
  audio.play('scan_ping');

  await terminal.dent('Vin. I\'m picking something up.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Bearing two-seven-five, range fourteen thousand');
  await terminal.dentLine('klicks. A structure. Metallic. Significant mass.');
  terminal.blank();

  await terminal.narrate('I pull the sensor feed to the main display.');
  await terminal.narrate('A shape resolves from the noise \u2014 angular,');
  await terminal.narrate('industrial. Too geometric to be debris.');
  terminal.blank();

  await terminal.dentSystem('CONTACT IDENTIFIED');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Designation: RS-7 TALOS');
  await terminal.dentSystem('Type: SIC Relay Station (Decommissioned)');
  await terminal.dentSystem('Status: NO POWER SIGNATURES');
  await terminal.dentSystem('Comms: SILENT');
  await terminal.dentSystem('Threat: NONE DETECTED');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await terminal.dent('SIC relay station. Old one \u2014 RS-7 class.');
  await terminal.dentLine('They used these for deep-space communication');
  await terminal.dentLine('routing before the network upgrade. This one\'s');
  await terminal.dentLine('been dark for years, from the look of it.');
  terminal.blank();

  await terminal.thought('A dead SIC station. No power, no comms, no one');
  await terminal.thought('home. Which means no one to report our position.');
  terminal.blank();

  if (state.dentRepairLevel >= 0.5) {
    await terminal.dent('Could be worth a look. Decommissioned stations');
    await terminal.dentLine('sometimes have supplies left behind. Null cells,');
    await terminal.dentLine('spare parts, data logs. The SICs aren\'t exactly');
    await terminal.dentLine('meticulous about cleaning up after themselves.');
    terminal.blank();

    await terminal.dent('Or we skip it. Plot the next fold and keep');
    await terminal.dentLine('moving. Every hour we stay is another hour the');
    await terminal.dentLine('SICs have to triangulate our signature.');
    terminal.blank();
  } else {
    await terminal.dent('Might have supplies. Might be a waste of time.');
    await terminal.dentLine('Your call.');
    terminal.blank();
  }

  await terminal.thought('Six hours of search time versus eighteen cells');
  await terminal.thought('of fuel. The math does itself.');
  terminal.blank();

  // --- Player choice ---
  terminal.separator();
  terminal.blank();

  const choice = await terminal.arrowMenu(
    [
      'Investigate RS-7 Talos',
      'Stay aboard \u2014 plot the next jump',
    ],
    [
      'Board the station. Search for supplies and intel.',
      'Don\'t risk it. Every minute here is a minute closer to SIC intercept.',
    ]
  );

  terminal.blank();

  if (choice === 0) {
    // Investigate
    state.setFlag('rs7_explored', true);

    await terminal.narrate('I set course for the station. Fourteen thousand');
    await terminal.narrate('klicks on thrusters \u2014 thirty minutes, give or');
    await terminal.narrate('take.');
    terminal.blank();

    await terminal.dent('Plotting approach vector. I\'ll run passive');
    await terminal.dentLine('scans as we close in. If anything on that');
    await terminal.dentLine('station wakes up, we\'ll know.');
    terminal.blank();

    await terminal.thought('A dead SIC station in the middle of nowhere.');
    await terminal.thought('Either we find something useful or we find');
    await terminal.thought('out why it\'s dead. Both worth knowing.');
    terminal.blank();
  } else {
    // Skip the station
    await terminal.narrate('I turn away from the sensor display.');
    terminal.blank();

    await terminal.narrate('Not worth the risk. The SICs know someone');
    await terminal.narrate('folded to this location. Every minute we');
    await terminal.narrate('spend here is a minute we\'re not spending');
    await terminal.narrate('somewhere else.');
    terminal.blank();

    await terminal.dent('Understood. Calculating next waypoint now.');
    await terminal.dentLine('We should have options within the hour.');
    terminal.blank();

    await terminal.thought('Keep moving. Don\'t stop. Don\'t look back.');
    terminal.blank();
  }

  // --- Auto-save ---
  state.chapter = 3;
  await state.save();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: RELAY STATION RS-7 TALOS
// ═══════════════════════════════════════════════════════

async function stationExploration(terminal, state, effects, audio) {
  terminal.clear();

  // --- EVA / boarding transition ---
  audio.play('airlock_cycle');

  await terminal.narrate('The Vex closes the last thousand meters on');
  await terminal.narrate('thrusters alone. RS-7 Talos fills the viewport \u2014');
  await terminal.narrate('a dark lattice of antenna spars and habitat');
  await terminal.narrate('modules, spinning slowly on its central axis.');
  await terminal.narrate('No running lights. No beacon. Dead.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('I match rotation and slide into the docking');
  await terminal.narrate('collar. The magnetic clamps engage with a dull');
  await terminal.narrate('clang that reverberates through both hulls.');
  terminal.blank();

  await terminal.dent('Hard dock confirmed. Seal integrity: nominal.');
  await terminal.dentLine('Cycling the airlock now.');
  terminal.blank();

  await wait(300);

  await terminal.dentSystem('AIRLOCK CYCLING .............. [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] COMPLETE');
  terminal.blank();

  await terminal.narrate('The inner door opens. A breath of cold air rolls');
  await terminal.narrate('in \u2014 frost crystallizes on the threshold, catches');
  await terminal.narrate('the amber glow of emergency battery lights that');
  await terminal.narrate('still flicker along the ceiling in weak, irregular');
  await terminal.narrate('pulses.');
  terminal.blank();

  await terminal.thought('Emergency batteries. Still running after years.');
  await terminal.thought('They build these things to last.');
  terminal.blank();

  await terminal.narrate('SIC insignia on the bulkhead. The familiar starburst-');
  await terminal.narrate('and-chain logo, stamped into every surface like a');
  await terminal.narrate('brand. This station belongs to them. Belonged.');
  terminal.blank();

  await terminal.pause();

  // --- Command Module ---
  await commandModule(terminal, state, effects, audio);

  // --- Transition to Storage Bay ---
  terminal.clear();

  await terminal.narrate('I pull myself through the connecting corridor.');
  await terminal.narrate('The emergency lights flicker \u2014 one long pulse,');
  await terminal.narrate('two short \u2014 a pattern that feels almost like');
  await terminal.narrate('breathing. Frost crunches under my mag-boots.');
  terminal.blank();

  await terminal.dent('Storage bay is through the next hatch.');
  await terminal.dentLine('Pressure reads stable on the other side.');
  terminal.blank();

  await terminal.pause();

  // --- Storage Bay ---
  await storageBay(terminal, state, effects, audio);

  // --- Transition to Comm Array ---
  terminal.clear();

  await terminal.narrate('The last module. A narrow access tube connects');
  await terminal.narrate('the habitat ring to the communication array \u2014');
  await terminal.narrate('a long, dark crawl through insulated conduit.');
  terminal.blank();

  await terminal.narrate('The SIC insignia is stenciled at the entrance.');
  await terminal.narrate('Someone scratched through it with a tool. Old');
  await terminal.narrate('damage. Deliberate.');
  terminal.blank();

  await terminal.dent('Communication array ahead. This is where they');
  await terminal.dentLine('kept the long-range equipment.');
  terminal.blank();

  await terminal.pause();

  // --- Communication Array ---
  await commArray(terminal, state, effects, audio);

  // --- Ensure flag ---
  state.setFlag('rs7_explored', true);
}


async function commandModule(terminal, state, effects, audio) {
  terminal.clear();

  // --- Atmosphere ---
  audio.ambient('station_ambient');

  await terminal.narrate('The command module is a graveyard of dark screens.');
  await terminal.narrate('Six consoles arranged in a semicircle, all dead.');
  await terminal.narrate('Frost covers every surface \u2014 keyboards, armrests,');
  await terminal.narrate('the coffee mug someone left behind years ago.');
  terminal.blank();

  await terminal.narrate('SIC insignia stamped into the console housings.');
  await terminal.narrate('The starburst-and-chain, over and over. On the');
  await terminal.narrate('chairs, on the bulkhead, on the floor plates.');
  await terminal.narrate('They branded everything.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('One terminal in the far corner still glows. A faint');
  await terminal.narrate('amber pulse behind the frost \u2014 emergency battery');
  await terminal.narrate('power feeding a single screen. The text on it is');
  await terminal.narrate('too dim to read from here.');
  terminal.blank();

  // --- Tier 1: DENT identifies the equipment ---
  await terminal.dent('SIC relay station. RS-7 class. These were part');
  await terminal.dentLine('of the deep-space monitoring network.');
  terminal.blank();

  await wait(300);

  await terminal.dent('They monitor spacetime curvature. Every fold');
  await terminal.dentLine('within range gets logged \u2014 origin, destination,');
  await terminal.dentGlitch('energy sig-- pattern--');
  await terminal.dentLine('Energy signature, timestamp. A permanent record');
  await terminal.dentLine('of everyone who\'s ever folded in this sector.');
  terminal.blank();

  await terminal.thought('A fold-detection grid. So this is how the SICs');
  await terminal.thought('track unauthorized fold activity. Not with ships \u2014');
  await terminal.thought('with stations like this one, scattered across');
  await terminal.thought('deep space, listening for the ripples.');
  terminal.blank();

  await terminal.dent('The monitoring equipment is dead. No power to the');
  await terminal.dentLine('main arrays. But that terminal in the corner \u2014');
  await terminal.dentLine('it\'s running on battery backup. There might be');
  await terminal.dentLine('cached data on it.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Tier 2: Player choice - examine the terminal ---
  await terminal.narrate('The amber terminal pulses in the corner. Its');
  await terminal.narrate('screen casts a faint glow across the frost on');
  await terminal.narrate('the console, turning the ice crystals into tiny');
  await terminal.narrate('points of warm light.');
  terminal.blank();

  terminal.separator();
  terminal.blank();

  const choice = await terminal.arrowMenu(
    [
      'Examine the terminal',
      'Move on to the next module',
    ],
    [
      'See what the SICs left behind on that screen.',
      'Nothing here worth the time. Keep moving.',
    ]
  );

  terminal.blank();

  if (choice === 1) {
    // Player skips
    await terminal.narrate('I glance at the terminal once more, then turn');
    await terminal.narrate('away. Whatever\'s on that screen can stay there.');
    terminal.blank();

    await terminal.thought('Dead station, dead data. We have better things');
    await terminal.thought('to do.');
    terminal.blank();

    await state.save();
    return;
  }

  // --- Player examines the terminal ---
  terminal.clear();

  await terminal.narrate('I wipe the frost from the screen with my sleeve.');
  await terminal.narrate('The amber text sharpens \u2014 a standard SIC monitoring');
  await terminal.narrate('interface, frozen mid-operation. Whoever was here');
  await terminal.narrate('last didn\'t log out. They just... left.');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 RS-7 TALOS \u2014 MONITORING TERMINAL \u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>                                       <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  <span class="c-dim">Status: STANDBY (battery)</span>             <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  <span class="c-dim">Last operator: [REDACTED]</span>             <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  <span class="c-dim">Cached logs: 1,247 entries</span>            <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  <span class="c-dim">Fold signatures detected: 31</span>          <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>                                       <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.thought('Fold-signature detection algorithms. Casimir-');
  await terminal.thought('deviation patterns, warp-bubble resonance mapping,');
  await terminal.thought('null-energy decay curves. I recognize all of it.');
  terminal.blank();

  await terminal.thought('This is the exact technology that detected our fold.');
  await terminal.thought('These algorithms watched us arrive. Catalogued us.');
  await terminal.thought('Filed us under \'unauthorized fold event\' and sent');
  await terminal.thought('the report up the chain.');
  terminal.blank();

  await terminal.thought('We tripped their wire. This is the wire.');
  terminal.blank();

  state.setFlag('rs7_command_accessed', true);

  await terminal.pause();
  terminal.clear();

  // --- Tier 3: Nested choice - read the maintenance logs ---
  await terminal.narrate('The terminal\'s file system is partially accessible.');
  await terminal.narrate('Most directories are encrypted, but one folder sits');
  await terminal.narrate('open: maintenance logs. Routine station upkeep.');
  await terminal.narrate('Boring, probably.');
  terminal.blank();

  await terminal.dent('The maintenance logs are unencrypted. Low-priority');
  await terminal.dentLine('data \u2014 the SICs didn\'t bother protecting routine');
  await terminal.dentLine('station records.');
  terminal.blank();

  terminal.separator();
  terminal.blank();

  const choice2 = await terminal.arrowMenu(
    [
      'Read the maintenance logs',
      'Close the terminal',
    ],
    [
      'Routine logs. Might contain useful timestamps.',
      'We\'ve seen enough. Move on.',
    ]
  );

  terminal.blank();

  if (choice2 === 1) {
    // Player closes the terminal
    await terminal.narrate('I step back from the terminal. The amber screen');
    await terminal.narrate('continues its slow pulse behind me as I turn');
    await terminal.narrate('toward the exit.');
    terminal.blank();

    await state.save();
    return;
  }

  // --- Player reads the logs - the anomaly ---
  terminal.clear();

  await terminal.narrate('I scroll through the maintenance logs. Standard');
  await terminal.narrate('entries \u2014 thermal cycling, antenna alignment,');
  await terminal.narrate('power system checks. Dated and routine.');
  terminal.blank();

  await terminal.narrate('Until I hit entry 447.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-hull">[RS-7 MAINTENANCE LOG \u2014 ENTRY 447]</span>');
  terminal.sayHtml('  <span class="c-dim">Date: 2247.184 [ERROR: Pre-commission timestamp]</span>');
  terminal.sayHtml('  <span class="c-dim">Subject: Cycle maintenance \u2014 pattern reset</span>');
  terminal.sayHtml('  <span class="c-dim">Note: All monitoring arrays recalibrated to</span>');
  terminal.sayHtml('  <span class="c-dim">baseline. Previous cycle data archived per</span>');
  terminal.sayHtml('  <span class="c-dim">standard reset protocol.</span>');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">[RS-7 MAINTENANCE LOG \u2014 ENTRY 448]</span>');
  terminal.sayHtml('  <span class="c-dim">Date: 2247.185 [ERROR: Pre-commission timestamp]</span>');
  terminal.sayHtml('  <span class="c-dim">Subject: Pattern integrity verification</span>');
  terminal.sayHtml('  <span class="c-dim">Note: Post-reset scan confirms pattern coherence</span>');
  terminal.sayHtml('  <span class="c-dim">within acceptable parameters. No deviation from</span>');
  terminal.sayHtml('  <span class="c-dim">expected template. Cycle continues.</span>');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">[RS-7 MAINTENANCE LOG \u2014 ENTRY 512]</span>');
  terminal.sayHtml('  <span class="c-dim">Date: 2247.302 [ERROR: Pre-commission timestamp]</span>');
  terminal.sayHtml('  <span class="c-dim">Subject: Anomalous pattern drift \u2014 sector 7G</span>');
  terminal.sayHtml('  <span class="c-dim">Note: Minor deviation detected in local spacetime</span>');
  terminal.sayHtml('  <span class="c-dim">curvature readings. Within tolerance. Flagged for</span>');
  terminal.sayHtml('  <span class="c-dim">review at next cycle boundary.</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('2247. This station was built in 2259. These log');
  await terminal.thought('entries are dated twelve years before the station');
  await terminal.thought('existed.');
  terminal.blank();

  await terminal.thought('\'Cycle maintenance.\' \'Pattern reset.\' \'Cycle');
  await terminal.thought('continues.\' That\'s not SIC vocabulary. SIC');
  await terminal.thought('maintenance logs use \'quarterly service\' and');
  await terminal.thought('\'calibration sweep.\' Not \'cycle.\' Not \'pattern.\'');
  terminal.blank();

  await wait(300);

  // DENT flags the anomaly
  await terminal.dent('Vin. Those timestamps are impossible.');
  terminal.blank();

  await wait(300);

  await terminal.dent('RS-7 Talos was commissioned in 2259. These');
  await terminal.dentLine('entries reference 2247. And the terminology \u2014');
  await terminal.dentLine('\'cycle maintenance,\' \'pattern reset\' \u2014 that\'s');
  await terminal.dentLine('not in any SIC operations manual I have on file.');
  terminal.blank();

  await terminal.dent('The logs are... odd. Data corruption, but it\'s');
  await terminal.dentLine('too structured to be random. Corrupted data');
  await terminal.dentLine('doesn\'t use consistent vocabulary across');
  await terminal.dentLine('multiple entries. Doesn\'t reference \'cycle');
  await terminal.dentLine('boundaries\' and \'pattern templates.\'');
  terminal.blank();

  await wait(300);

  await terminal.dent('Structured data corruption \u2014 but data corruption');
  await terminal.dentLine('isn\'t usually this... organized.');
  terminal.blank();

  await terminal.thought('Organized corruption. Logs from before the station');
  await terminal.thought('existed. Language that doesn\'t belong to any human');
  await terminal.thought('maintenance protocol.');
  terminal.blank();

  await terminal.thought('Either someone backdated these entries for reasons');
  await terminal.thought('I can\'t fathom, or something was running on this');
  await terminal.thought('hardware before the SICs installed it.');
  terminal.blank();

  await terminal.thought('Something that performs \'cycle maintenance\' and');
  await terminal.thought('\'pattern resets.\'');
  terminal.blank();

  await terminal.thought('I don\'t know what that means. But I\'m keeping it.');
  terminal.blank();

  state.setFlag('rs7_log_anomaly_seen', true);

  terminal.sayHtml('<span class="c-dim">  [Discovery: RS-7 log anomaly \u2014 pre-commission timestamps,</span>');
  terminal.sayHtml('<span class="c-dim">   non-standard vocabulary. This will matter later.]</span>');
  terminal.blank();

  // --- Auto-save ---
  await state.save();
}


async function storageBay(terminal, state, effects, audio) {
  terminal.clear();

  // --- Atmosphere ---
  audio.play('door_open');

  await terminal.narrate('The storage bay is massive. Two decks high,');
  await terminal.narrate('lined with military-grade cargo racks that');
  await terminal.narrate('stretch into the dark. Emergency battery');
  await terminal.narrate('lighting casts long shadows between the rows \u2014');
  await terminal.narrate('amber pools separated by black nothing.');
  terminal.blank();

  await terminal.narrate('SIC crates everywhere. Standardized grey cases');
  await terminal.narrate('stamped with serial numbers and classification');
  await terminal.narrate('codes. Some are open, contents stripped during');
  await terminal.narrate('decommission. Others are still sealed, frost');
  await terminal.narrate('crystallized along their edges.');
  terminal.blank();

  await terminal.thought('They cleaned out the high-value equipment but');
  await terminal.thought('left everything else. Standard SIC protocol \u2014');
  await terminal.thought('pull the classified gear, abandon the rest.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('My breath fogs in the cold. The environmental');
  await terminal.narrate('systems in this section died years ago. What\'s');
  await terminal.narrate('left is vacuum cold held at bay by residual');
  await terminal.narrate('insulation and nothing else.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- DENT finds repair components ---
  audio.play('scan_ping');

  await terminal.dent('Vin. Over here.');
  terminal.blank();

  await terminal.narrate('DENT\'s optic is locked onto a storage rack in');
  await terminal.narrate('the far corner. Unlike the cargo crates, this');
  await terminal.narrate('one is a maintenance robot storage unit \u2014');
  await terminal.narrate('vertical slots designed for humanoid-chassis');
  await terminal.narrate('service drones. Most of the slots are empty.');
  terminal.blank();

  await terminal.dent('SIC maintenance robot storage. Some of these');
  await terminal.dentLine('parts are compatible with my chassis.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('DENT reaches into the rack with his good arm,');
  await terminal.narrate('sorting through components with mechanical');
  await terminal.narrate('precision. Servo housings. Power couplings.');
  await terminal.narrate('Actuator assemblies. He knows exactly what');
  await terminal.narrate('he\'s looking for.');
  terminal.blank();

  await terminal.dent('Two items. Both useful. Both too heavy to');
  await terminal.dentLine('carry together \u2014 not with the equipment we');
  await terminal.dentLine('already have.');
  terminal.blank();

  await terminal.narrate('He sets two components on the deck between us.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 DENT REPAIR COMPONENTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  <span class="c-white-bright">1. Right Arm Actuator</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>     <span class="c-dim">Servo motor + power coupling</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>     <span class="c-dim">Physical assistance capability</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  <span class="c-white-bright">2. Welding Torch Assembly</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>     <span class="c-dim">Fuel cell + torch unit</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>     <span class="c-dim">Independent repair capability</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.dent('The actuator would give me a working right arm.');
  await terminal.dentLine('Doors, heavy objects, zero-G stabilization.');
  await terminal.dentLine('Anything that needs two hands instead of one.');
  terminal.blank();

  await terminal.dent('The torch would let me handle ship repairs');
  await terminal.dentLine('independently. Hull patches, wiring, conduit');
  await terminal.dentLine('work. Things you currently have to do yourself.');
  terminal.blank();

  await terminal.thought('One upgrade. Can\'t carry both. The eternal');
  await terminal.thought('resource constraint.');
  terminal.blank();

  // --- DENT repair choice ---
  terminal.separator();
  terminal.blank();

  const choice = await terminal.arrowMenu(
    [
      'Right Arm Actuator \u2014 servo motor and power coupling',
      'Welding Torch \u2014 fuel cell and torch assembly',
    ],
    [
      'Physical task assistance. Doors, heavy objects, zero-G work.',
      'Independent ship repairs. DENT can fix things without Vin.',
    ]
  );

  terminal.blank();

  if (choice === 0) {
    // Right Arm Actuator
    state.setFlag('dent_repair_ch3', 'right_arm');

    await terminal.narrate('I pick up the actuator assembly. Heavy.');
    await terminal.narrate('Solid engineering \u2014 SIC military grade.');
    await terminal.narrate('The servo motor alone weighs as much as');
    await terminal.narrate('my toolbox.');
    terminal.blank();

    await terminal.dent('Good choice. Two functional arms means I can');
    await terminal.dentLine('actually help with the physical work instead');
    await terminal.dentLine('of just narrating it.');
    terminal.blank();

    await terminal.thought('DENT with two working arms. He\'ll be able to');
    await terminal.thought('brace against bulkheads, operate airlocks,');
    await terminal.thought('catch me if I drift. That matters out here.');
    terminal.blank();

    await terminal.narrate('I set the torch assembly back in the rack.');
    await terminal.narrate('It\'ll stay here. Part of the station\'s slow');
    await terminal.narrate('decay into nothing.');
    terminal.blank();

    await terminal.thought('Can\'t take everything. Have to choose what');
    await terminal.thought('matters most.');
    terminal.blank();

    terminal.sayHtml('<span class="c-dim">  [Picked up: Right Arm Actuator \u2014 DENT physical upgrade]</span>');
    terminal.blank();
  } else {
    // Welding Torch
    state.setFlag('dent_repair_ch3', 'welding_torch');

    await terminal.narrate('I pick up the torch assembly. Compact but');
    await terminal.narrate('dense \u2014 the fuel cell alone has enough charge');
    await terminal.narrate('for hundreds of hours of work.');
    terminal.blank();

    await terminal.dent('The torch. Practical. With this, I can handle');
    await terminal.dentLine('hull repairs, conduit patches, weld seals \u2014');
    await terminal.dentLine('anything that needs heat and precision.');
    terminal.blank();

    await terminal.thought('If something breaks, DENT can fix it without');
    await terminal.thought('waiting for me. That kind of independence');
    await terminal.thought('could save time. Could save lives.');
    terminal.blank();

    await terminal.narrate('I leave the actuator in the rack. DENT');
    await terminal.narrate('watches it for a moment \u2014 his bad arm');
    await terminal.narrate('twitching once \u2014 then turns away.');
    terminal.blank();

    await terminal.thought('He wanted the arm. I can tell. But the torch');
    await terminal.thought('is the smarter play.');
    terminal.blank();

    terminal.sayHtml('<span class="c-dim">  [Picked up: Welding Torch \u2014 DENT repair upgrade]</span>');
    terminal.blank();
  }

  await terminal.pause();
  terminal.clear();

  // --- Null cell locker ---
  await terminal.narrate('Further along the storage bay. Past rows of');
  await terminal.narrate('empty racks and stripped crates. DENT stops');
  await terminal.narrate('at a heavy locker bolted to the deck \u2014 sealed,');
  await terminal.narrate('unlike everything else in here.');
  terminal.blank();

  await terminal.dent('The locker has null containment markings.');
  await terminal.dentLine('Sealed \u2014 probably has cells inside.');
  terminal.blank();

  await terminal.narrate('The locker is SIC standard issue. Reinforced');
  await terminal.narrate('steel, magnetic seal, a small red indicator');
  await terminal.narrate('light that somehow still has power. The');
  await terminal.narrate('containment symbols are unmistakable \u2014 the');
  await terminal.narrate('triple-circle null energy hazard badge.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 SIC NULL CONTAINMENT LOCKER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Status: <span class="c-red">SEALED</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Security: <span class="c-yellow">ACTIVE (battery backup)</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Contents: <span class="c-dim">UNKNOWN</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.dent('The security system is still live. Battery');
  await terminal.dentLine('backup \u2014 those things last decades. If we');
  await terminal.dentLine('force it open, the tamper sensor will trigger.');
  terminal.blank();

  await terminal.dent('Could be nothing. Station\'s been dead for years.');
  await terminal.dentLine('Or it could broadcast an alert on whatever');
  await terminal.dentLine('SIC frequency is still being monitored.');
  terminal.blank();

  await terminal.thought('Null cells behind a locked door. The Vex could');
  await terminal.thought('use every cell we can get. But that security');
  await terminal.thought('light is still blinking.');
  terminal.blank();

  terminal.separator();
  terminal.blank();

  const lockerChoice = await terminal.arrowMenu(
    [
      'Force the locker open',
      'Leave it \u2014 not worth the risk',
    ],
    [
      'Pry it open. We need the null.',
      'The security system is still active. Walk away.',
    ]
  );

  terminal.blank();

  if (lockerChoice === 0) {
    // Force the locker open
    await terminal.narrate('I wedge a pry bar into the seal. The metal');
    await terminal.narrate('resists \u2014 SIC engineering at its finest \u2014');
    await terminal.narrate('then yields with a grinding shriek that');
    await terminal.narrate('echoes through the bay.');
    terminal.blank();

    audio.play('alarm_klaxon');

    await terminal.warning('TAMPER ALERT \u2014 NULL CONTAINMENT BREACH');
    terminal.blank();

    await terminal.narrate('A klaxon screams from the locker\'s internal');
    await terminal.narrate('speaker. Short. Sharp. Three bursts, then');
    await terminal.narrate('silence. The red indicator light flashes');
    await terminal.narrate('rapidly, then dies as the battery finally');
    await terminal.narrate('gives out.');
    terminal.blank();

    await terminal.dent('That was a security broadcast. Short-range,');
    await terminal.dentLine('but if any SIC receiver is within range...');
    terminal.blank();

    await wait(300);

    await terminal.dent('What\'s done is done. Let\'s see what\'s inside.');
    terminal.blank();

    await terminal.narrate('Six null cells. Military grade. Fully charged,');
    await terminal.narrate('sealed in individual containment cradles. The');
    await terminal.narrate('SIC logo stamped on each one.');
    terminal.blank();

    state.applyDamage({ null: 6 });
    state.setFlag('null_locker_forced', true);
    state.applyDamage({ stress: 5 });

    terminal.sayHtml('<span class="c-dim">  [Null: +6 cells]</span>');
    terminal.sayHtml('<span class="c-dim">  [Stress +5 \u2014 security alarm triggered]</span>');
    terminal.sayHtml('<span class="c-dim">  [Warning: locker may have broadcast our position]</span>');
    terminal.blank();

    await terminal.thought('Six cells. Good haul. But that alarm \u2014 three');
    await terminal.thought('bursts on an SIC frequency. If anyone is');
    await terminal.thought('listening, they know someone is here.');
    terminal.blank();

    await terminal.thought('We need to move faster.');
    terminal.blank();
  } else {
    // Leave the locker
    await terminal.narrate('I step back from the locker. The red light');
    await terminal.narrate('blinks steadily. Patient. Waiting for someone');
    await terminal.narrate('with authorization that isn\'t me.');
    terminal.blank();

    await terminal.dent('Agreed. The security system is too much of');
    await terminal.dentLine('a risk. Better to leave it sealed than to');
    await terminal.dentLine('broadcast our position to the entire sector.');
    terminal.blank();

    await terminal.thought('Caution over resources. We have enough null');
    await terminal.thought('to function. What we don\'t need is the SICs');
    await terminal.thought('knowing exactly where we are.');
    terminal.blank();
  }

  await terminal.pause();
  terminal.clear();

  // --- Brief wrap-up ---
  await terminal.narrate('The storage bay has given us what it has to');
  await terminal.narrate('give. DENT secures the salvaged component in');
  await terminal.narrate('his chassis compartment. The bay stretches');
  await terminal.narrate('out behind us \u2014 rows of empty racks and SIC');
  await terminal.narrate('crates slowly freezing in the dark.');
  terminal.blank();

  await terminal.dent('One more module to check before we head back');
  await terminal.dentLine('to the Vex.');
  terminal.blank();

  await state.save();
}


async function commArray(terminal, state, effects, audio) {
  terminal.clear();

  // --- Entry - Vin is alone ---
  await terminal.narrate('The communication array is a cathedral of');
  await terminal.narrate('antennas. The long-range transmitter housing');
  await terminal.narrate('dominates the room \u2014 a cylindrical structure');
  await terminal.narrate('three meters across, rising through the ceiling');
  await terminal.narrate('into the antenna mast above.');
  terminal.blank();

  await terminal.narrate('DENT stayed behind in the storage bay to catalog');
  await terminal.narrate('spare parts. I\'m alone in here. Just me and the');
  await terminal.narrate('hum of passive receivers still drawing from');
  await terminal.narrate('backup power.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('It\'s cold. Colder than the other modules. The');
  await terminal.narrate('environmental systems here failed completely \u2014');
  await terminal.narrate('no residual heating, no air circulation. My');
  await terminal.narrate('breath hangs in the beam of my suit light like');
  await terminal.narrate('smoke.');
  terminal.blank();

  await terminal.thought('Quiet. The kind of quiet that presses against');
  await terminal.thought('your ears.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Atmosphere - examining comm equipment ---
  await terminal.narrate('The SIC communication routing equipment lines');
  await terminal.narrate('the far wall. Frequency modulators. Encryption');
  await terminal.narrate('relay boards. Signal amplifiers rated for forty');
  await terminal.narrate('light-years at minimum power. All of it stamped with');
  await terminal.narrate('SIC serial numbers and classification codes.');
  terminal.blank();

  await terminal.narrate('A bank of passive receivers still hums on');
  await terminal.narrate('backup power \u2014 a low, steady drone that I feel');
  await terminal.narrate('more than hear. They\'re listening to nothing.');
  await terminal.narrate('Open frequencies. Background noise. The whisper');
  await terminal.narrate('of empty space.');
  terminal.blank();

  await terminal.narrate('I move along the console, running my fingers');
  await terminal.narrate('over the frost-covered controls. Power switches.');
  await terminal.narrate('Frequency selectors. A transmission log screen,');
  await terminal.narrate('dark and dead.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('A cable hangs from an overhead conduit, swaying');
  await terminal.narrate('slightly in the air currents from my movement.');
  await terminal.narrate('A sealed maintenance panel on the starboard');
  await terminal.narrate('bulkhead. Standard equipment. Nothing unusual.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Environmental Simulation Glitch ---
  await terminal.narrate('I lean closer to examine an encryption module.');
  await terminal.narrate('SIC military grade \u2014 the same type they use on');
  await terminal.narrate('capital ships. What\'s it doing on a relay station?');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The lighting flickers.');
  terminal.blank();

  await effects.screenTear(1);

  await terminal.narrate('For a fraction of a second \u2014 less than a');
  await terminal.narrate('heartbeat \u2014 the room is DIFFERENT.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('The sealed maintenance panel is open. I can see');
  await terminal.narrate('wiring inside \u2014 neat, organized, recently serviced.');
  await terminal.narrate('The cable that was hanging from the conduit is');
  await terminal.narrate('coiled on the floor. Neatly. Deliberately.');
  await terminal.narrate('As if someone just finished working here.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('I blink.');
  terminal.blank();

  await terminal.narrate('The panel is sealed. The cable hangs loose.');
  await terminal.narrate('Everything is exactly the way it was.');
  terminal.blank();

  await wait(300);

  await terminal.thought('...');
  terminal.blank();

  await terminal.thought('Fatigue. Post-fold stress. The Blip scrambles');
  await terminal.thought('perception \u2014 DENT said as much. Sensory');
  await terminal.thought('artifacts. That\'s all.');
  terminal.blank();

  await terminal.thought('The panel was never open. The cable never moved.');
  await terminal.thought('I\'m tired, and tired people see things.');
  terminal.blank();

  await wait(300);

  await terminal.thought('That\'s all it was.');
  terminal.blank();

  state.setFlag('rs7_environmental_glitch', true);

  await terminal.pause();
  terminal.clear();

  // --- Flashback Trigger - SIC equipment recognition ---
  await terminal.narrate('I move deeper into the array. Past the receivers,');
  await terminal.narrate('past the routing equipment, to the far end of');
  await terminal.narrate('the room where the encrypted communication');
  await terminal.narrate('hardware is racked in floor-to-ceiling cabinets.');
  terminal.blank();

  await terminal.narrate('SIC frequency arrays. Encryption modules with');
  await terminal.narrate('serial numbers I can almost read through the');
  await terminal.narrate('frost. Scrambler calibration units. All of it');
  await terminal.narrate('familiar. All of it\u2014');
  terminal.blank();

  await wait(500);

  await terminal.narrate('My hands grip the edge of the console. Hard.');
  await terminal.narrate('Knuckles white.');
  terminal.blank();

  await terminal.narrate('I know this equipment. Not from training manuals');
  await terminal.narrate('or technical specs. I know it because I\'ve SEEN');
  await terminal.narrate('it. These exact units. These exact serial number');
  await terminal.narrate('prefixes. SC-7700 series.');
  terminal.blank();

  await terminal.narrate('My heart rate spikes. I can feel my pulse in my');
  await terminal.narrate('throat, in my temples, behind my eyes. Something');
  await terminal.narrate('is surfacing \u2014 a memory fighting its way up through');
  await terminal.narrate('years of suppression and post-traumatic haze.');
  terminal.blank();

  await wait(500);

  await terminal.thought('SC-7700. The same prefix. The same equipment.');
  await terminal.thought('The night they\u2014');
  terminal.blank();

  await effects.screenTear(2);

  await labRaidFlashback(terminal, state, effects, audio);

  // --- Post-flashback recovery ---
  await wait(500);

  await terminal.narrate('I loosen my grip on the console. Finger by');
  await terminal.narrate('finger. The frost has melted where my palms');
  await terminal.narrate('were pressed against the metal.');
  terminal.blank();

  await terminal.narrate('I steady my breathing. In through the nose,');
  await terminal.narrate('out through the mouth. An old trick. It barely');
  await terminal.narrate('works.');
  terminal.blank();

  await terminal.thought('Time to go. There\'s nothing left in this station');
  await terminal.thought('worth finding.');
  terminal.blank();

  await terminal.narrate('I turn toward the access tube. The passive');
  await terminal.narrate('receivers hum behind me \u2014 still listening to');
  await terminal.narrate('nothing. Still waiting for signals that will');
  await terminal.narrate('never come.');
  terminal.blank();

  await terminal.pause();

  // --- Auto-save ---
  await state.save();
}


async function labRaidFlashback(terminal, state, effects, audio) {
  if (state.getFlag('flashback_lab_raid')) {
    return;
  }

  await wait(500);

  // --- The lab, late at night ---
  await terminal.flashback('...the lab. Late. Two in the morning and the');
  await terminal.flashback('building is dead quiet. The kind of quiet you');
  await terminal.flashback('only get in a university after everyone has');
  await terminal.flashback('gone home and the cleaning crews have finished');
  await terminal.flashback('and the lights in the hallways have switched');
  await terminal.flashback('to their overnight dim.');
  terminal.blank();

  await terminal.flashback('The Torquer prototype on the workbench. Half-');
  await terminal.flashback('finished. The orange emitter array is working \u2014');
  await terminal.flashback('stable output, clean waveform, three months of');
  await terminal.flashback('calibration paying off. The blue array is still');
  await terminal.flashback('being tuned. Frequency drift every forty-five');
  await terminal.flashback('seconds. I\'ll fix it tomorrow.');
  terminal.blank();

  await terminal.flashback('Coffee cups. Four of them. Stacked in the');
  await terminal.flashback('order I drank them. The custom antenna humming');
  await terminal.flashback('in the corner, pulling data from the Echo');
  await terminal.flashback('receiver. Research terminal showing waveform');
  await terminal.flashback('analysis \u2014 graphs and spectrograms and phase');
  await terminal.flashback('diagrams in neat rows across the screen.');
  terminal.blank();

  await terminal.flashback('My world. My work. The only thing that makes');
  await terminal.flashback('sense anymore.');
  terminal.blank();

  await wait(500);

  // --- The alert ---
  await terminal.flashback('An alert. A single tone from the university');
  await terminal.flashback('security system. I look up from the Torquer.');
  terminal.blank();

  await terminal.flashback('Then another alert. Then another.');
  terminal.blank();

  await terminal.flashbackVivid('Then sirens. Outside. Multiple vehicles.');
  terminal.blank();

  await wait(300);

  await terminal.flashback('I go to the lab window. Third floor. Good');
  await terminal.flashback('vantage. The parking lot below is filling with');
  await terminal.flashback('vehicles \u2014 gunmetal gray, no markings, no');
  await terminal.flashback('insignia. Armored. Military profile but not');
  await terminal.flashback('military. I know what they are before my brain');
  await terminal.flashback('finishes processing what my eyes are seeing.');
  terminal.blank();

  await terminal.flashbackVivid('SIC enforcement. They found me.');
  terminal.blank();

  await wait(500);

  // --- Graves on the PA ---
  await terminal.flashback('The university PA system crackles to life. A');
  await terminal.flashback('voice \u2014 calm, measured, unhurried. The voice of');
  await terminal.flashback('someone who has done this many times before.');
  await terminal.flashback('Someone who knows exactly how this will end.');
  terminal.blank();

  await terminal.flashbackVivid('"Dr. Vin. The Spatial Integrity Charter"');
  await terminal.flashbackVivid('"requires your immediate cooperation."');
  await terminal.flashbackVivid('"Please do not attempt to remove any"');
  await terminal.flashbackVivid('"equipment from the premises."');
  terminal.blank();

  await wait(300);

  await terminal.flashback('The voice is polite. Professional. Terrifying.');
  await terminal.flashback('Not because of what it says but because of');
  await terminal.flashback('what it doesn\'t say. No threats. No ultimatums.');
  await terminal.flashback('Just the calm certainty that compliance is');
  await terminal.flashback('inevitable.');
  terminal.blank();

  await terminal.flashback('Boots in the stairwell. Third floor. Coming up.');
  terminal.blank();

  await wait(500);

  // --- Vin grabs the Torquer ---
  await terminal.flashbackVivid('I grab the Torquer. Both hands. Yank it');
  await terminal.flashbackVivid('from the workbench \u2014 cables snapping,');
  await terminal.flashbackVivid('connectors popping free, the calibration');
  await terminal.flashbackVivid('rig scattering across the floor.');
  terminal.blank();

  await terminal.flashback('Research drives. Three of them. Into the bag.');
  await terminal.flashback('The Echo data. The fold calculations. The null');
  await terminal.flashback('energy derivations. Years of work reduced to');
  await terminal.flashback('three small drives and a prototype that doesn\'t');
  await terminal.flashback('fully work yet.');
  terminal.blank();

  await terminal.flashback('I leave the coffee cups. The antenna. The');
  await terminal.flashback('spectrograms. Everything I can\'t carry.');
  terminal.blank();

  await wait(300);

  // --- DENT's first activation ---
  await terminal.flashback('The adjacent workshop. Through the connecting');
  await terminal.flashback('door that I always leave unlocked because I go');
  await terminal.flashback('back and forth forty times a day.');
  terminal.blank();

  await terminal.flashback('DENT. Chassis bolted to a service frame. Half-');
  await terminal.flashback('built. One arm working. One optic functioning.');
  await terminal.flashback('Neural net loaded but never activated. A project');
  await terminal.flashback('within a project \u2014 an AI companion I\'d been');
  await terminal.flashback('building in stolen hours between real work.');
  terminal.blank();

  await terminal.flashbackVivid('I hit the activation switch. No warm-up.');
  await terminal.flashbackVivid('No calibration sequence. No careful first-');
  await terminal.flashbackVivid('boot protocol. Just raw power to a neural');
  await terminal.flashbackVivid('net that has never been conscious before.');
  terminal.blank();

  await wait(300);

  await terminal.flashback('His optic flickers. Once. Twice. Focuses on me.');
  terminal.blank();

  await terminal.flashbackVivid('"DENT, we have to go. NOW."');
  terminal.blank();

  await terminal.flashback('A pause. Processing. The longest two seconds of');
  await terminal.flashback('my life while boots pound closer in the stairwell');
  await terminal.flashback('and sirens wail outside and my hands won\'t stop');
  await terminal.flashback('shaking.');
  terminal.blank();

  await terminal.flashback('His first words. Broken. Barely functional.');
  await terminal.flashback('Ten percent capacity at best.');
  terminal.blank();

  await terminal.flashbackVivid('"Vin... status... unclear. Following."');
  terminal.blank();

  await wait(500);

  // --- Loading The Vex ---
  await terminal.flashback('The service elevator. Down to the sub-basement.');
  await terminal.flashback('Through the maintenance tunnel to the university');
  await terminal.flashback('launch pad. DENT limps behind me \u2014 one working');
  await terminal.flashback('leg, one arm braced against the wall for balance.');
  await terminal.flashback('He doesn\'t ask questions. He just follows.');
  terminal.blank();

  await terminal.flashback('The Vex. Parked on pad four. A research vessel \u2014');
  await terminal.flashback('small, ugly, underpowered. Department property,');
  await terminal.flashback('technically. I have the access codes because');
  await terminal.flashback('nobody else uses it.');
  terminal.blank();

  await terminal.flashback('I throw the Torquer into the cargo hold. The');
  await terminal.flashback('drives. The bag. DENT climbs in after them,');
  await terminal.flashback('moving with the graceless urgency of something');
  await terminal.flashback('that has been alive for less than three minutes.');
  terminal.blank();

  await wait(300);

  await terminal.flashback('I\'m in the pilot seat. Pre-flight sequence.');
  await terminal.flashback('Skip it. Engine start. Skip the warm-up. Thruster');
  await terminal.flashback('test. Skip it. I need to be in the air NOW.');
  terminal.blank();

  await wait(500);

  // --- The Scrambler ---
  await terminal.flashback('The launch pad shakes. Not from the engines.');
  await terminal.flashback('From something outside.');
  terminal.blank();

  await terminal.flashbackVivid('The air goes FLAT. Like physics turned off.');
  terminal.blank();

  await terminal.flashbackVivid('SCRAMBLER. They\'re firing a SCRAMBLER at');
  await terminal.flashbackVivid('the launch pad.');
  terminal.blank();

  await terminal.flashback('The instruments spike and die. The artificial');
  await terminal.flashback('gravity stutters \u2014 I float for half a second,');
  await terminal.flashback('then slam back into the seat. The Torquer in the');
  await terminal.flashback('cargo hold screeches against the deck plating.');
  terminal.blank();

  await terminal.flashback('Scramblers suppress local physics. Null-based');
  await terminal.flashback('technology turned into a weapon. They\'re trying');
  await terminal.flashback('to kill the engines before I can lift off.');
  terminal.blank();

  await wait(300);

  await terminal.flashback('But they fired too late. The engines are already');
  await terminal.flashback('hot. The Vex lurches upward \u2014 ugly, graceless,');
  await terminal.flashback('fighting through the scrambler field like a');
  await terminal.flashback('swimmer against a current.');
  terminal.blank();

  await terminal.flashbackVivid('We clear the field. The instruments come');
  await terminal.flashbackVivid('back. The engines scream. The university');
  await terminal.flashbackVivid('drops away below us \u2014 buildings, parking');
  await terminal.flashbackVivid('lots, gray vehicles, sirens \u2014 all of it');
  await terminal.flashbackVivid('shrinking into a pattern of lights against');
  await terminal.flashbackVivid('dark ground.');
  terminal.blank();

  await terminal.flashback('DENT says something. I can\'t hear it over the');
  await terminal.flashback('engine noise. His optic is locked on the rear');
  await terminal.flashback('sensor feed \u2014 the scrambler beam tracking us,');
  await terminal.flashback('fading as we climb out of range.');
  terminal.blank();

  await terminal.flashback('And then\u2014');
  terminal.blank();

  await wait(500);

  await terminal.flashback('...nothing. The memory cuts. Like a film reel');
  await terminal.flashback('snapping in the projector. One frame I\'m climbing');
  await terminal.flashback('through atmosphere, the next\u2014');
  terminal.blank();

  await wait(500);

  // --- Return to present ---
  await terminal.narrate('I\'m in the comm array. RS-7 Talos. Gripping a');
  await terminal.narrate('console with both hands, knuckles white, heart');
  await terminal.narrate('hammering against my ribs.');
  terminal.blank();

  await terminal.narrate('My breath comes in sharp, shallow pulls. Frost');
  await terminal.narrate('crystals swirl in the beam of my suit light,');
  await terminal.narrate('disturbed by the trembling in my hands.');
  terminal.blank();

  await wait(300);

  audio.play('stinger_emotional');
  audio.play('dent_boot');

  await terminal.dent('Heart rate elevated. Pupils dilated. You');
  await terminal.dentLine('remembered something.');
  terminal.blank();

  await terminal.narrate('DENT. He\'s in the doorway of the access tube \u2014');
  await terminal.narrate('must have come back from the storage bay. His');
  await terminal.narrate('optic studies me with the quiet precision of a');
  await terminal.narrate('diagnostic scan.');
  terminal.blank();

  // --- Player choice ---
  terminal.separator();
  terminal.blank();

  const choice = await terminal.showChoices([
    '"They came for me. Graves. He raided my lab."',
    '"DENT... you were there. Your first activation."',
    '"I don\'t want to talk about it."',
  ]);

  terminal.blank();

  if (choice === 1) {
    await terminal.thought('Graves. That voice on the PA. I know that');
    await terminal.thought('voice now. I\'ll never forget it.');
    terminal.blank();

    await terminal.dent('The SICs are thorough. Once they flag a');
    await terminal.dentLine('research program, they move fast. Contain');
    await terminal.dentLine('the scientist, confiscate the equipment,');
    await terminal.dentLine('classify the data. Standard protocol.');
    terminal.blank();

    await terminal.dent('You got out. That\'s what matters.');
    terminal.blank();

    await terminal.thought('I got out. But I left everything else behind.');
    await terminal.thought('My lab. My research. My life. Everything that');
    await terminal.thought('wasn\'t bolted to The Vex or shoved in a bag.');
    terminal.blank();

  } else if (choice === 2) {
    await terminal.narrate('DENT is still for a moment. His optic dims,');
    await terminal.narrate('then brightens \u2014 the processing cycle he does');
    await terminal.narrate('when searching deep memory.');
    terminal.blank();

    await terminal.dent('I was? My earliest log entry is from The Vex.');
    await terminal.dentLine('Already in flight. Atmospheric escape velocity.');
    await terminal.dentLine('No record of activation prior to that.');
    terminal.blank();

    await wait(300);

    await terminal.dent('If you activated me in the lab... those logs');
    await terminal.dentLine('are gone. Corrupted, or never written to begin');
    await terminal.dentLine('with. A cold start at ten percent capacity');
    await terminal.dentLine('wouldn\'t have stable memory formation.');
    terminal.blank();

    await terminal.thought('His first moments. Waking up in a stranger\'s');
    await terminal.thought('lab with sirens and boots and a voice on the');
    await terminal.thought('PA telling us to surrender. And he followed me');
    await terminal.thought('anyway. No questions. No hesitation.');
    terminal.blank();

    await terminal.thought('He doesn\'t even remember.');
    terminal.blank();

  } else if (choice === 3) {
    await terminal.dent('Understood. When you\'re ready.');
    terminal.blank();

    await wait(300);

    await terminal.thought('Not now. Not here. Maybe not ever.');
    terminal.blank();
  }

  state.setFlag('flashback_lab_raid', true);
  terminal.sayHtml('<span class="c-dim">  [Memory recovered: The SIC raid \u2014 the night Vin became a fugitive]</span>');
  terminal.blank();

  await terminal.pause();
}


async function dentRepairScene(terminal, state, effects, audio) {
  terminal.clear();

  // --- Transition: Back aboard The Vex ---
  await terminal.narrate('The airlock seals behind us with a low hiss.');
  await terminal.narrate('The Vex. Warm air, familiar hum of life support,');
  await terminal.narrate('the faint vibration of the reactor ticking over');
  await terminal.narrate('in standby. Home.');
  terminal.blank();

  await terminal.narrate('We head aft to engineering. DENT sets the');
  await terminal.narrate('salvaged component on the workbench \u2014 the same');
  await terminal.narrate('bench where I keep the hydrospanner parallel');
  await terminal.narrate('to the edge, teeth facing starboard.');
  terminal.blank();

  await terminal.thought('Time to put this to use.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  const repairType = state.getFlag('dent_repair_ch3');

  if (repairType === 'right_arm') {
    // --- Right Arm Actuator installation ---
    audio.play('servo_whir');

    await terminal.narrate('DENT lowers himself onto the deck and extends');
    await terminal.narrate('his right arm \u2014 the bad one. The housing is');
    await terminal.narrate('scarred, the original servo burnt out months');
    await terminal.narrate('ago. The joint moves in stutters when it moves');
    await terminal.narrate('at all.');
    terminal.blank();

    await terminal.dent('I\'ll need you to hold the arm housing open');
    await terminal.dentLine('while I connect the new servo. My left arm');
    await terminal.dentLine('can handle the fine work, but I can\'t brace');
    await terminal.dentLine('and install at the same time.');
    terminal.blank();

    await terminal.narrate('I kneel beside him and grip the housing panel.');
    await terminal.narrate('The metal is cold. I pull it open \u2014 hinges');
    await terminal.narrate('protesting \u2014 and hold it steady while DENT\'s');
    await terminal.narrate('left hand works inside with surgical precision.');
    terminal.blank();

    await wait(500);

    await terminal.narrate('He seats the servo motor into the joint socket.');
    await terminal.narrate('Threads the power coupling through the conduit');
    await terminal.narrate('channel. Connects each lead with a faint click');
    await terminal.narrate('that I feel through the housing more than hear.');
    terminal.blank();

    await terminal.dent('Coupling seated. Initializing actuator.');
    terminal.blank();

    await wait(300);

    await terminal.narrate('A whir. Low at first, then steady. The arm');
    await terminal.narrate('twitches once \u2014 a full-body flinch runs through');
    await terminal.narrate('DENT\'s frame \u2014 and then it moves.');
    terminal.blank();

    await terminal.narrate('Smoothly.');
    terminal.blank();

    await wait(500);

    await terminal.narrate('DENT rotates the wrist. Opens the hand. Closes');
    await terminal.narrate('it. Opens it again. He picks up the hydrospanner');
    await terminal.narrate('from the bench, holds it for a moment, sets it');
    await terminal.narrate('back down. Parallel to the edge. Teeth starboard.');
    terminal.blank();

    await wait(300);

    await terminal.narrate('No sparking. No stutter. Just clean, quiet');
    await terminal.narrate('movement.');
    terminal.blank();

    await terminal.dent('It\'s been... a long time since both arms worked.');
    terminal.blank();

    await wait(500);

    await terminal.thought('I watch him flex fingers that actually respond.');
    await terminal.thought('Open, close. Open, close. Testing range of');
    await terminal.thought('motion the way a person stretches after being');
    await terminal.thought('still too long. There\'s something in the way');
    await terminal.thought('he looks at his own hand \u2014 if a single optic');
    await terminal.thought('can look at anything \u2014 that isn\'t mechanical.');
    terminal.blank();

    await terminal.thought('It\'s relief.');
    terminal.blank();

    state.dentRepairLevel = Math.min(1.0, state.dentRepairLevel + 0.05);

    terminal.sayHtml('<span class="c-dim">  [DENT repair: Right Arm Actuator installed \u2014 +5% capacity]</span>');
    terminal.blank();

  } else if (repairType === 'welding_torch') {
    // --- Welding Torch installation ---

    await terminal.narrate('DENT extends his right wrist \u2014 the fold-out');
    await terminal.narrate('mount where the original cutting tool used to');
    await terminal.narrate('be. Empty socket, corroded contacts. It hasn\'t');
    await terminal.narrate('held anything functional since before I found');
    await terminal.narrate('him.');
    terminal.blank();

    await terminal.dent('The torch assembly slots into the wrist mount.');
    await terminal.dentLine('I\'ll need you to calibrate the fuel flow');
    await terminal.dentLine('while I test the igniter mechanism.');
    terminal.blank();

    await terminal.narrate('I open the fuel cell housing and connect the');
    await terminal.narrate('feed line. The regulator dial is stiff with');
    await terminal.narrate('disuse \u2014 I work it back and forth until it');
    await terminal.narrate('moves freely, then set it to the low-flow');
    await terminal.narrate('calibration mark.');
    terminal.blank();

    await terminal.dent('Fuel pressure nominal. Testing igniter.');
    terminal.blank();

    await wait(300);

    audio.play('welding_torch');

    await terminal.narrate('A spark. Then a blue-white flame erupts from');
    await terminal.narrate('the torch tip \u2014 clean, focused, steady. DENT');
    await terminal.narrate('adjusts the cone with a precision that makes');
    await terminal.narrate('me step back.');
    terminal.blank();

    await wait(500);

    await terminal.narrate('He holds the flame for three seconds, then');
    await terminal.narrate('kills it. Pauses. Turns toward a hull panel');
    await terminal.narrate('near the reactor housing \u2014 and fires again.');
    terminal.blank();

    await terminal.narrate('A thin line of blue light traces along a');
    await terminal.narrate('hairline crack I hadn\'t noticed. The metal');
    await terminal.narrate('glows, flows, seals. DENT extinguishes the');
    await terminal.narrate('torch and inspects his work.');
    terminal.blank();

    await terminal.dent('That micro-fracture has been on my repair');
    await terminal.dentLine('queue for nineteen days. It was bothering me.');
    terminal.blank();

    await wait(300);

    await terminal.thought('He spotted it, prioritized it, and fixed it.');
    await terminal.thought('Unprompted. Nineteen days he\'s been looking');
    await terminal.thought('at that crack, knowing he couldn\'t do anything');
    await terminal.thought('about it. And the first thing he does with a');
    await terminal.thought('working torch is make it right.');
    terminal.blank();

    state.dentRepairLevel = Math.min(1.0, state.dentRepairLevel + 0.05);
    state.applyDamage({ hull: 3 });

    terminal.sayHtml('<span class="c-dim">  [DENT repair: Welding Torch installed \u2014 +5% capacity]</span>');
    terminal.sayHtml('<span class="c-dim">  [Hull: +3% \u2014 DENT repaired a micro-fracture]</span>');
    terminal.blank();
  }

  // --- Shared ending: warmth between Vin and DENT ---
  await terminal.pause();
  terminal.clear();

  await terminal.narrate('The engineering bay settles into quiet. The');
  await terminal.narrate('reactor hums. The lights hold steady. For a');
  await terminal.narrate('moment, nothing is broken and nothing needs');
  await terminal.narrate('fixing.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Thank you, Vin.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('Simple. No diagnostic qualifier, no probability');
  await terminal.narrate('assessment, no systems-status caveat. Just that.');
  terminal.blank();

  await terminal.thought('He\'s more than a toolkit. I\'ve known that for');
  await terminal.thought('a while now, but moments like this make it');
  await terminal.thought('impossible to pretend otherwise. DENT isn\'t');
  await terminal.thought('equipment I maintain. He\'s crew.');
  terminal.blank();

  await terminal.thought('The only crew I have.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('I reach over and close the housing panel on');
  await terminal.narrate('his arm. It clicks shut. Clean.');
  terminal.blank();

  await terminal.narrate('We sit in engineering for another minute,');
  await terminal.narrate('saying nothing, before I stand and head');
  await terminal.narrate('for the bridge.');
  terminal.blank();

  await state.save();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: DETECTION & GRAVES CONTACT
// ═══════════════════════════════════════════════════════

async function gravesContact(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_graves');

  // ══════════════════════════════════════════════
  // PART 1: DETECTION
  // ══════════════════════════════════════════════

  if (state.getFlag('null_locker_forced')) {
    // --- Fast detection - locker alarm accelerated SIC arrival ---
    audio.play('scan_ping');

    await terminal.dent('Vin. Incoming. NOW.');
    terminal.blank();

    await wait(300);

    await terminal.dentSystem('FOLD SIGNATURES DETECTED \u2014 MULTIPLE CONTACTS');
    terminal.blank();

    await terminal.narrate('The sensor board lights up like a Christmas tree.');
    await terminal.narrate('Three contacts, dropping out of fold in rapid');
    await terminal.narrate('succession. No warning. No gradual approach. They');
    await terminal.narrate('came in hot and they came in fast.');
    terminal.blank();

    await terminal.thought('The locker. That alarm \u2014 three bursts on an SIC');
    await terminal.thought('frequency. They heard it. They were already close');
    await terminal.thought('enough to respond.');
    terminal.blank();

    await terminal.dent('That containment alarm. It pinged the SIC relay');
    await terminal.dentLine('network. They must have had a patrol within');
    await terminal.dentLine('jump range. Response time: under twenty minutes.');
    terminal.blank();

    await terminal.thought('Twenty minutes. We were still docked when they');
    await terminal.thought('got the signal. Stupid. STUPID.');
    terminal.blank();

    await wait(300);

  } else {
    // --- Slow detection - routine sensor sweep catches them ---
    await terminal.narrate('The bridge is quiet. The hum of life support.');
    await terminal.narrate('The low tick of the reactor. DENT running routine');
    await terminal.narrate('sensor sweeps in the background \u2014 the kind of');
    await terminal.narrate('passive scanning that fills dead time between');
    await terminal.narrate('decisions.');
    terminal.blank();

    await wait(500);

    await terminal.narrate('I\'m reviewing fold calculations on the nav');
    await terminal.narrate('console. Next waypoint options. Distance, fuel');
    await terminal.narrate('cost, risk assessment. The mundane arithmetic');
    await terminal.narrate('of running.');
    terminal.blank();

    await terminal.pause();
    terminal.clear();

    // --- First ping ---
    audio.play('scan_ping');

    await terminal.dent('Hm.');
    terminal.blank();

    await wait(500);

    await terminal.narrate('I look up from the console.');
    terminal.blank();

    await terminal.dent('Sensor contact. Bearing zero-nine-three,');
    await terminal.dentLine('long range. Faint. Could be debris, could');
    await terminal.dentLine('be a resonance echo from our own fold.');
    terminal.blank();

    await terminal.thought('Debris doesn\'t usually register as a fold');
    await terminal.thought('signature. But resonance echoes do. DENT\'s');
    await terminal.thought('probably right.');
    terminal.blank();

    await wait(500);

    // --- Second ping ---
    audio.play('scan_ping');

    await terminal.dent('Second contact. Same bearing. Stronger.');
    terminal.blank();

    await wait(300);

    await terminal.dent('That\'s not an echo.');
    terminal.blank();

    await terminal.narrate('DENT\'s optic locks onto the sensor display.');
    await terminal.narrate('The amber trace updates \u2014 two distinct signatures');
    await terminal.narrate('now, closing from the same vector. Parallel');
    await terminal.narrate('trajectories. Coordinated.');
    terminal.blank();

    await terminal.thought('Two contacts on the same bearing. Moving');
    await terminal.thought('together. That\'s not debris and it\'s not');
    await terminal.thought('an echo. That\'s a formation.');
    terminal.blank();

    await wait(500);

    // --- Third ping - confirmed ---
    audio.play('scan_ping');

    await terminal.dent('Third contact. Fold signatures confirmed \u2014');
    await terminal.dentLine('three of them. SIC interceptor profile.');
    terminal.blank();

    await wait(300);

    await terminal.dentLine('They\'re here.');
    terminal.blank();

    await terminal.thought('Three SIC interceptors in pursuit formation.');
    await terminal.thought('They tracked our fold. They found us.');
    terminal.blank();

    await wait(300);
  }

  await terminal.pause();
  terminal.clear();

  // ══════════════════════════════════════════════
  // PART 2: SIC ARRIVAL
  // ══════════════════════════════════════════════

  audio.play('fold_arrival');
  await effects.screenTear(1);

  await terminal.narrate('Space buckles.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('Three points of light flare in the viewport \u2014');
  await terminal.narrate('white-hot, blinding, then collapsing into shape.');
  await terminal.narrate('Three ships drop out of fold in tight formation.');
  await terminal.narrate('Gunmetal gray. No insignia. No running lights.');
  await terminal.narrate('Angular profiles designed for one purpose: pursuit.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Coherence Scramblers are visible on their forward');
  await terminal.narrate('arrays \u2014 the same technology that hit The Vex on');
  await terminal.narrate('the launch pad the night I ran. The same technology');
  await terminal.narrate('that kills physics in a local area and leaves you');
  await terminal.narrate('drifting, helpless, dead in the water.');
  terminal.blank();

  await terminal.thought('Scramblers. They don\'t want to destroy us.');
  await terminal.thought('They want to STOP us.');
  terminal.blank();

  await wait(300);

  // --- DENT tactical readout ---
  await terminal.dentSystem('THREAT ASSESSMENT');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Contacts: 3 SIC INTERCEPTORS');
  await terminal.dentSystem('Formation: STANDARD PURSUIT TRIANGLE');
  await terminal.dentSystem('Weapons: COHERENCE SCRAMBLERS (CHARGING)');
  await terminal.dentSystem('Range: CLOSING \u2014 90 seconds to weapons range');
  await terminal.dentSystem(`Our Null: ${state.nullReserves} cells`);
  await terminal.dentSystem(`Our Hull: ${state.hull}%`);
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(300);

  await terminal.dent('Three SIC interceptors. Standard pursuit triangle.');
  await terminal.dentLine('Scramblers are charging \u2014 I\'m reading capacitor');
  await terminal.dentLine('buildup on all three forward arrays.');
  terminal.blank();

  await terminal.dentLine('Ninety seconds to weapons range.');
  terminal.blank();

  await terminal.thought('Ninety seconds. Not enough time to fold. Not');
  await terminal.thought('enough time to run. Barely enough time to think.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Tension: countdown ---
  await terminal.dent('Seventy seconds. They\'re not accelerating.');
  await terminal.dentLine('Holding formation. That means they want to');
  await terminal.dentLine('talk before they shoot.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The comm panel flashes. Incoming transmission.');
  await terminal.narrate('Tight-beam. Encrypted. The frequency stamp is');
  await terminal.narrate('SIC standard \u2014 the same format used by every');
  await terminal.narrate('enforcement vessel in the Charter fleet.');
  terminal.blank();

  await terminal.dent('Incoming communication. SIC command frequency.');
  await terminal.dentLine('They\'re hailing us.');
  terminal.blank();

  await terminal.thought('They want to talk. That means they want something');
  await terminal.thought('other than wreckage. Small comfort.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // ══════════════════════════════════════════════
  // PART 3: GRAVES ON SCREEN
  // ══════════════════════════════════════════════

  await terminal.narrate('I open the channel.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('Static. Dense, crackling interference that fills');
  await terminal.narrate('the bridge speakers. Then it clears \u2014 sharply,');
  await terminal.narrate('like someone turned a dial \u2014 and a voice comes');
  await terminal.narrate('through.');
  terminal.blank();

  await wait(500);

  // --- Voice recognition (if flashback was seen) ---
  if (state.getFlag('flashback_lab_raid')) {
    await terminal.thought('That voice.');
    terminal.blank();

    await wait(500);

    await terminal.thought('I know that voice. I\'ve heard it in my');
    await terminal.thought('nightmares and now I remember why.');
    terminal.blank();

    await terminal.thought('The PA system. The university. \'Dr. Vin.');
    await terminal.thought('The Spatial Integrity Charter requires your');
    await terminal.thought('immediate cooperation.\'');
    terminal.blank();

    await terminal.thought('Him. It\'s HIM.');
    terminal.blank();

    await wait(500);
  }

  // --- Visual: Graves appears ---
  await terminal.narrate('The comm screen resolves. A face. Mid-fifties.');
  await terminal.narrate('Close-cropped gray hair. Cold, intelligent eyes');
  await terminal.narrate('that assess everything and give nothing back.');
  await terminal.narrate('An immaculate dark charcoal uniform, no rank');
  await terminal.narrate('insignia visible \u2014 the kind of deliberate');
  await terminal.narrate('anonymity that speaks louder than any badge.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('He looks at Vin the way a surgeon looks at');
  await terminal.narrate('an X-ray. Clinical. Already knowing what he\'ll');
  await terminal.narrate('find.');
  terminal.blank();

  await wait(500);

  // --- Graves speaks ---
  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"Mr. Vin. I\'m not going to insult either of us with pleasantries."</span>');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"You folded. We detected it. You are in possession of"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"unlicensed fold technology and in direct violation of the"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"Spatial Integrity Charter, Article Seven \u2014 Unauthorized"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"Curvature Events."</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('Article Seven. He\'s quoting the Charter like');
  await terminal.thought('scripture. Not angry. Not threatening. Just');
  await terminal.thought('citing the regulation I\'ve broken as if it\'s');
  await terminal.thought('a mathematical proof.');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"You have one chance to comply. Power down your fold drive"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"and prepare for boarding. We will discuss the terms of"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"your cooperation en route."</span>');
  terminal.blank();

  await wait(500);

  await terminal.narrate('He pauses. Not for effect \u2014 or maybe entirely');
  await terminal.narrate('for effect. With Graves it\'s impossible to tell');
  await terminal.narrate('where calculation ends and genuine conviction');
  await terminal.narrate('begins.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"I am not here to threaten you, Mr. Vin. I am here to"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"explain why your cooperation is inevitable. Every fold you"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"execute destabilizes local spacetime. Every unauthorized"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"curvature event weakens the fabric that holds reality"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"together. This is not ideology. It is physics."</span>');
  terminal.blank();

  await wait(500);

  if (state.getFlag('flashback_lab_raid')) {
    await terminal.thought('Graves. Director Graves. The voice from the');
    await terminal.thought('PA system. The man who sent scramblers at a');
    await terminal.thought('university launch pad. Who chased a graduate');
    await terminal.thought('student off-world for building a prototype');
    await terminal.thought('that shouldn\'t have worked.');
    terminal.blank();

    await terminal.thought('And now he\'s here. Three interceptors and');
    await terminal.thought('the same calm, reasonable voice explaining');
    await terminal.thought('why surrender is the only logical option.');
    terminal.blank();
  } else {
    await terminal.thought('Director Graves. SIC enforcement. The kind');
    await terminal.thought('of man who quotes regulations while his ships');
    await terminal.thought('charge weapons. The kind of man who genuinely');
    await terminal.thought('believes he\'s saving the universe.');
    terminal.blank();

    await terminal.thought('That makes him more dangerous than someone');
    await terminal.thought('who just wants power. True believers don\'t');
    await terminal.thought('negotiate. They EXPLAIN.');
    terminal.blank();
  }

  await terminal.pause();
  terminal.clear();

  // --- DENT tactical update ---
  await terminal.dent('Forty seconds to weapons range. Scramblers');
  await terminal.dentLine('are at eighty percent charge.');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"The clock is ticking, Mr. Vin. I would prefer not to"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"use the Scramblers. They are... imprecise. But I will"</span>');
  terminal.sayHtml('  <span class="c-white-bright">        </span> <span class="c-white-bright">"if you force the issue."</span>');
  terminal.blank();

  await wait(300);

  await terminal.narrate('His face on the comm screen. Patient. Certain.');
  await terminal.narrate('The face of a man who has done this before and');
  await terminal.narrate('knows exactly how it ends. Every time.');
  terminal.blank();

  await terminal.dent('Thirty seconds. Vin, we need a decision.');
  terminal.blank();

  await wait(500);

  // ══════════════════════════════════════════════
  // PART 4: THE CORE CHOICE
  // ══════════════════════════════════════════════

  terminal.separator();
  terminal.blank();

  terminal.sayHtml(`  <span class="c-dim">[Null: ${state.nullReserves} cells | Hull: ${state.hull}% | Fold Drive: ${state.foldStatus}]</span>`);
  terminal.blank();

  const choice = await terminal.arrowMenu(
    [
      'Comply \u2014 Power down, play along',
      'Negotiate \u2014 Keep Graves talking',
      `Fold \u2014 Burn 18 cells, jump now`,
    ],
    [
      'Fake surrender. DENT keeps fold drive in standby.',
      'Buy time. Let DENT plot an escape route.',
      `Clean escape. Expensive. (Current: ${state.nullReserves} cells)`,
    ]
  );

  terminal.blank();

  if (choice === 0) {
    state.setFlag('graves_escape_method', 'comply');

    await terminal.thought('Play along. Power down. Let them think we\'re');
    await terminal.thought('giving in while DENT keeps the fold drive');
    await terminal.thought('warm. The moment they drop their guard\u2014');
    terminal.blank();

    await terminal.dent('Understood. Initiating fold drive standby.');
    await terminal.dentLine('To external scans, we\'ll look powered down.');
    await terminal.dentLine('But I\'ll keep the injectors primed.');
    terminal.blank();

  } else if (choice === 1) {
    state.setFlag('graves_escape_method', 'negotiate');

    await terminal.thought('Keep him talking. Every second Graves spends');
    await terminal.thought('explaining is a second DENT has to calculate');
    await terminal.thought('an escape vector. Buy time. That\'s all we need.');
    terminal.blank();

    await terminal.dent('I\'m plotting jump coordinates now. Keep him');
    await terminal.dentLine('occupied. I need sixty seconds.');
    terminal.blank();

  } else if (choice === 2) {
    state.setFlag('graves_escape_method', 'fold');

    await terminal.thought('No games. No deception. Eighteen cells and');
    await terminal.thought('we\'re gone. Clean jump, clean escape. The Vex');
    await terminal.thought('knows how to run. It\'s what she was built for.');
    terminal.blank();

    await terminal.dent('Fold drive spooling. Eighteen cells loaded.');
    await terminal.dentLine('Destination: maximum safe range. Initiating');
    await terminal.dentLine('in ten seconds.');
    terminal.blank();
  }

  await state.save();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: ESCAPE SEQUENCE
// ═══════════════════════════════════════════════════════

async function escapeSequence(terminal, state, effects, audio) {
  const method = state.getFlag('graves_escape_method');
  if (method === 'comply') {
    await escapeComply(terminal, state, effects, audio);
  } else if (method === 'negotiate') {
    await escapeNegotiate(terminal, state, effects, audio);
  } else if (method === 'fold') {
    await escapeFold(terminal, state, effects, audio);
  }

  await pursuitEstablished(terminal, state, effects, audio);
}


async function escapeComply(terminal, state, effects, audio) {
  terminal.clear();

  // --- Vin signals compliance ---
  await terminal.narrate('I open the comm channel. Keep my voice flat.');
  await terminal.narrate('Controlled. The voice of someone who knows');
  await terminal.narrate('when he\'s beaten.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Director Graves, this is The Vex.</span>');
  terminal.sayHtml('  <span class="c-white-bright">     </span> <span class="c-white-bright">Powering down. We comply."</span>');
  terminal.blank();

  await wait(500);

  await terminal.narrate('I transmit the power-down confirmation sequence.');
  await terminal.narrate('Navigation lights dim. Thruster output drops to');
  await terminal.narrate('zero. On every sensor in range, The Vex looks');
  await terminal.narrate('like a ship going dark.');
  terminal.blank();

  await terminal.narrate('Looks like.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- DENT keeps the fold drive alive ---
  await terminal.narrate('Below decks, hidden behind the reactor\'s EM');
  await terminal.narrate('shadow, the fold drive stays warm. DENT\'s doing.');
  await terminal.narrate('He rerouted power through the secondary bus \u2014');
  await terminal.narrate('invisible to external sensors, masked by the');
  await terminal.narrate('reactor\'s own signature.');
  terminal.blank();

  await terminal.dent('Fold drive in standby. They can\'t see it.');
  await terminal.dentLine('Not behind the reactor noise. But Vin \u2014');
  await terminal.dentLine('we\'ll have one shot. Cold start from standby');
  await terminal.dentLine('takes eleven seconds. If they scan us deep');
  await terminal.dentLine('before then, this is over.');
  terminal.blank();

  await terminal.thought('Eleven seconds. An eternity when someone is');
  await terminal.thought('pointing weapons at your hull.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- SIC interceptor docking approach ---
  audio.play('hull_creak');

  await terminal.narrate('The lead interceptor breaks formation. It peels');
  await terminal.narrate('away from the triangle and angles toward us \u2014');
  await terminal.narrate('a slow, deliberate approach. Standard docking');
  await terminal.narrate('protocol. No rush. They think we\'re compliant.');
  terminal.blank();

  await terminal.narrate('Range: ten thousand meters.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Five thousand.');
  terminal.blank();

  await terminal.narrate('The interceptor fills the viewport. Angular.');
  await terminal.narrate('Armored. SIC enforcement markings down the');
  await terminal.narrate('flanks \u2014 the starburst-and-chain rendered in');
  await terminal.narrate('gunmetal gray against matte black. Close enough');
  await terminal.narrate('now to see the docking clamps extending from');
  await terminal.narrate('its belly. Close enough to count the weapon');
  await terminal.narrate('hardpoints.');
  terminal.blank();

  await terminal.narrate('Two thousand meters. The hull groans as their');
  await terminal.narrate('mass distorts our local gravity. My coffee mug');
  await terminal.narrate('slides across the console.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('One thousand. The docking lights on their bow');
  await terminal.narrate('flare \u2014 white strobes that pulse in sequence,');
  await terminal.narrate('guiding us into alignment. The Vex shudders as');
  await terminal.narrate('their tractor field brushes our hull.');
  terminal.blank();

  await terminal.thought('Close. Too close. Every instinct screaming.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- SIC comms chatter - intel ---
  await terminal.narrate('The open channel crackles. SIC comms chatter');
  await terminal.narrate('bleeds through \u2014 they forgot to encrypt their');
  await terminal.narrate('tactical frequency. Or they don\'t care.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">[SIC TACTICAL \u2014 UNENCRYPTED]</span>');
  terminal.sayHtml('  <span class="c-hull">"Priority target confirmed \u2014 Director\'s list."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-hull">"Increased fold activity in the sector.</span>');
  terminal.sayHtml('  <span class="c-hull"> Third incident this cycle."</span>');
  terminal.blank();

  state.setFlag('sic_priority_target', true);
  state.setFlag('sic_sector_activity', true);

  await terminal.thought('Director\'s list. I\'m on a list. And fold activity \u2014');
  await terminal.thought('third incident this cycle. We\'re not the only ones');
  await terminal.thought('folding out here. Someone else is doing this too.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('Five hundred meters. Docking clamps reaching.');
  await terminal.narrate('The shadow of the interceptor falls across the');
  await terminal.narrate('bridge like a closing hand.');
  terminal.blank();

  await terminal.dent('Vin. Now or never.');
  terminal.blank();

  await wait(300);

  await terminal.thought('Now.');
  terminal.blank();

  await terminal.pause();

  // --- Emergency fold ---
  await effects.screenTear(3);
  audio.play('emergency_fold');

  await terminal.narrate('DENT fires the fold drive from standby.');
  terminal.blank();

  await terminal.narrate('It\'s NOT clean.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('The Vex LURCHES \u2014 a full-body convulsion that');
  await terminal.narrate('throws me sideways into the console. Gravity');
  await terminal.narrate('flickers \u2014 on, off, on \u2014 and everything that');
  await terminal.narrate('isn\'t bolted down becomes a projectile. The');
  await terminal.narrate('coffee mug shatters against the far wall.');
  terminal.blank();

  await terminal.narrate('The fold envelope forms ragged and asymmetric \u2014');
  await terminal.narrate('not the smooth bubble of a clean jump but a');
  await terminal.narrate('torn, stuttering collapse of local spacetime');
  await terminal.narrate('that drags us through sideways.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('Through the viewport, the interceptor warps \u2014');
  await terminal.narrate('stretches like taffy \u2014 and then it\'s gone.');
  await terminal.narrate('Everything is gone. Just the white nothing of');
  await terminal.narrate('fold-space, and the Vex screaming through it');
  await terminal.narrate('like a stone through water.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Then silence.');
  terminal.blank();

  await terminal.narrate('Stars. Different stars. The hull ticks and');
  await terminal.narrate('groans as it cools from the thermal stress.');
  await terminal.narrate('Something sparks in the ceiling above my head.');
  terminal.blank();

  // --- Stats and flags ---
  state.applyDamage({ hull: -10, null: -5, stress: 10 });
  state.setFlag('graves_deceived', true);

  terminal.sayHtml('<span class="c-dim">  [Hull: -10% | Null: -5 cells | Stress: +10]</span>');
  terminal.blank();

  await wait(300);

  // --- DENT post-escape ---
  await terminal.dent('That was closer than I\'d prefer. And I\'d prefer');
  await terminal.dentLine('not to be here at all.');
  terminal.blank();

  await terminal.thought('He\'s not wrong. Five hundred meters. We folded');
  await terminal.thought('with an SIC interceptor close enough to touch.');
  await terminal.thought('If DENT had been two seconds slower...');
  terminal.blank();

  await terminal.thought('But he wasn\'t. And we\'re alive.');
  terminal.blank();

  await terminal.pause();
}


async function escapeNegotiate(terminal, state, effects, audio) {
  terminal.clear();

  // --- Vin plays the confused academic ---
  await terminal.narrate('I keep my hands visible. Open posture. The body');
  await terminal.narrate('language of someone who has nothing to hide and');
  await terminal.narrate('everything to explain.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Director, there\'s been a misunderstanding.</span>');
  terminal.sayHtml('  <span class="c-white-bright">     </span> <span class="c-white-bright">I\'m a researcher \u2014 "</span>');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"A researcher who built unlicensed fold</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">technology. In a university lab. With</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">stolen parts from the physics department."</span>');
  terminal.blank();

  await terminal.narrate('His voice is patient. Almost kind. The patience');
  await terminal.narrate('of a man who has heard every excuse and found');
  await terminal.narrate('them all equally irrelevant.');
  terminal.blank();

  await terminal.thought('He knows. Everything. The parts requisitions,');
  await terminal.thought('the after-hours lab access, the diverted grants.');
  await terminal.thought('He\'s not guessing. He has files.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- DENT works in background ---
  await terminal.dentSystem('ESCAPE CALCULATION: Route plotted...');

  // --- Second exchange ---
  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"The fold drive was theoretical. A proof</span>');
  terminal.sayHtml('  <span class="c-white-bright">     </span> <span class="c-white-bright">of concept. I never intended \u2014 "</span>');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"You folded, Mr. Vin. Theory became</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">practice the moment your ship left</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">atmosphere. The Charter exists for a</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">reason."</span>');
  terminal.blank();

  await wait(300);

  await terminal.narrate('He leans forward on his screen. Fingers steepled.');
  await terminal.narrate('Not angry. Not threatening. Explaining.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- DENT background progress ---
  await terminal.dentSystem('ESCAPE CALCULATION: Calculating energy minimum...');

  // --- Third exchange - Graves reveals his real motivation ---
  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"Every fold creates micro-fractures in the</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">causal substrate. You understand that,</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">don\'t you? You\'re a physicist. You can</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">see the math."</span>');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"One fold is a crack. A hundred folds is</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">a fault line. A thousand? A fracture</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">network in the fabric of causality itself.</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">You\'re not a criminal, Mr. Vin."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"You\'re a geological event."</span>');
  terminal.blank();

  await terminal.thought('He believes it. Every word. This isn\'t bureaucratic');
  await terminal.thought('enforcement or political power. Graves genuinely');
  await terminal.thought('thinks folding will break reality.');
  terminal.blank();

  await terminal.thought('And the worst part \u2014 he\'s not entirely wrong.');
  await terminal.thought('Folding DOES create causal stress. The Blip proved');
  await terminal.thought('that. He\'s right that it\'s dangerous.');
  terminal.blank();

  await terminal.thought('He\'s wrong about why. He thinks it\'s physics.');
  await terminal.thought('I\'m starting to think it\'s something else entirely.');
  terminal.blank();

  await wait(300);

  // --- Fourth exchange - Graves almost persuasive ---
  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"Come home, Mr. Vin. Bring the Torquer.</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">We\'ll study it together. Controlled</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">conditions. Proper oversight. Nobody has</span>');
  terminal.sayHtml('  <span class="c-white-bright">         </span> <span class="c-white-bright">to get hurt."</span>');
  terminal.blank();

  await terminal.narrate('For a moment \u2014 one irrational, exhausted');
  await terminal.narrate('moment \u2014 it almost sounds reasonable.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- DENT fires the fold ---
  await terminal.dentSystem('ESCAPE CALCULATION: Fold solution found.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin. I have our window.');
  terminal.blank();

  await terminal.thought('Now.');
  terminal.blank();

  await effects.screenTear(2);
  audio.play('emergency_fold');

  await terminal.narrate('The fold envelope forms \u2014 cleaner than a cold');
  await terminal.narrate('start, smoother than an emergency jump. DENT');
  await terminal.narrate('had time to calculate. Time Graves gave us by');
  await terminal.narrate('talking.');
  terminal.blank();

  await terminal.narrate('Graves\' face on the screen freezes mid-sentence \u2014');
  await terminal.narrate('mouth open, one hand raised in a gesture that');
  await terminal.narrate('might have been conciliatory \u2014 and then the');
  await terminal.narrate('signal cuts as spacetime folds around us.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('A compression. A lurch. The familiar wrongness');
  await terminal.narrate('of transit. Then stars. New stars.');
  terminal.blank();

  await terminal.narrate('We\'re through.');
  terminal.blank();

  // --- Stats and flags ---
  state.applyDamage({ null: -3, stress: 5, neural: 5 });
  state.setFlag('graves_negotiated', true);
  state.setFlag('graves_calibrated_signature', true);

  terminal.sayHtml('<span class="c-dim">  [Null: -3 cells | Stress: +5 | Neural: +5]</span>');
  terminal.blank();

  await wait(300);

  // --- DENT post-escape - the warning ---
  await terminal.dent('He\'s smart, Vin. He let us talk because he was');
  await terminal.dentGlitch('calcul-- processing--');
  await terminal.dentLine('Calibrating our signature. They\'ll find us');
  await terminal.dentLine('faster next time.');
  terminal.blank();

  await terminal.thought('Calibrating. The whole conversation \u2014 the');
  await terminal.thought('philosophy, the persuasion, the almost-reasonable');
  await terminal.thought('offer \u2014 all of it was keeping us stationary while');
  await terminal.thought('his ships locked onto our fold signature.');
  terminal.blank();

  await terminal.thought('I played him. He played me back.');
  terminal.blank();

  await terminal.pause();
}


async function escapeFold(terminal, state, effects, audio) {
  terminal.clear();

  // --- No hesitation ---
  await terminal.narrate('I don\'t answer him.');
  terminal.blank();

  await terminal.narrate('My hand is already on the fold drive actuator.');
  await terminal.narrate('No conversation. No negotiation. No games.');
  await terminal.narrate('Graves is still talking when I pull the lever.');
  terminal.blank();

  await wait(300);

  await terminal.thought('Run first. Think later. The only strategy');
  await terminal.thought('that\'s kept me alive this long.');
  terminal.blank();

  // --- The fold ---
  await effects.screenTear(1);
  audio.play('emergency_fold');

  await terminal.narrate('The fold envelope forms clean \u2014 full power,');
  await terminal.narrate('pre-calculated vector, no hesitation in the');
  await terminal.narrate('drive or the pilot. The Vex knows what to do.');
  await terminal.narrate('We\'ve done this before.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('Through the viewport, Graves\' face on the comm');
  await terminal.narrate('screen \u2014 cut off mid-sentence. His mouth was');
  await terminal.narrate('forming a word. I\'ll never know which one.');
  terminal.blank();

  await terminal.thought('The look on his face. Not anger. Surprise.');
  await terminal.thought('He expected me to talk. To argue. To buy time');
  await terminal.thought('the way a trapped animal paces its cage looking');
  await terminal.thought('for the gap in the bars.');
  terminal.blank();

  await terminal.thought('I didn\'t look for the gap. I went through');
  await terminal.thought('the wall.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('A compression. Brief. The standard Blip \u2014 a');
  await terminal.narrate('flicker of wrongness that passes through the');
  await terminal.narrate('body like a shiver. We\'re getting used to it.');
  await terminal.narrate('That probably isn\'t good.');
  terminal.blank();

  await terminal.narrate('Stars. Different stars. The interceptors, the');
  await terminal.narrate('scramblers, Graves and his calm voice and his');
  await terminal.narrate('steepled fingers \u2014 all of it three light-years');
  await terminal.narrate('behind us in the time it takes to exhale.');
  terminal.blank();

  // --- Stats and flags ---
  state.applyDamage({ null: -18, stress: 5 });
  state.setFlag('graves_defied', true);

  terminal.sayHtml('<span class="c-dim">  [Null: -18 cells | Stress: +5]</span>');
  terminal.blank();

  await wait(300);

  // --- DENT post-escape ---
  await terminal.dent('For what it\'s worth, that was the mathematically');
  await terminal.dentLine('optimal choice. Cold, but optimal.');
  terminal.blank();

  await terminal.thought('Cold. Yes. But eighteen null cells for a clean');
  await terminal.thought('escape and a silent exit. No intel given, no');
  await terminal.thought('signature calibrated, no interceptor close');
  await terminal.thought('enough to scratch our paint.');
  terminal.blank();

  await terminal.thought('Cold works.');
  terminal.blank();

  await terminal.pause();
}


async function pursuitEstablished(terminal, state, effects, audio) {
  terminal.clear();

  // --- Immediate aftermath - the exhale ---
  await terminal.narrate('Silence.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The Vex drifts. No thrust. No course. Just');
  await terminal.narrate('momentum and the slow rotation of a ship that');
  await terminal.narrate('folded hard and came out the other side in one');
  await terminal.narrate('piece. Mostly one piece.');
  terminal.blank();

  await terminal.narrate('Through the viewport: stars I don\'t recognize.');
  await terminal.narrate('No interceptors. No SIC signatures on the');
  await terminal.narrate('scanner. No one within sensor range.');
  terminal.blank();

  await terminal.narrate('For the first time in what feels like hours,');
  await terminal.narrate('I breathe.');
  terminal.blank();

  await wait(500);

  await terminal.thought('We made it. Again. Somehow.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Graves' parting message ---
  await terminal.narrate('The comm system chirps. A buffered transmission \u2014');
  await terminal.narrate('received in the last fraction of a second before');
  await terminal.narrate('we folded, cached in the signal buffer, playing');
  await terminal.narrate('now.');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"This isn\'t over, Mr. Vin. The Charter doesn\'t forget."</span>');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The message ends. Static. Then nothing.');
  terminal.blank();

  await terminal.thought('No. I don\'t imagine it is.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Chronometric Dampeners - DENT detects trackers ---
  audio.play('scan_ping');

  await terminal.dent('Vin. We have a problem.');
  terminal.blank();

  await wait(300);

  await terminal.dent('I\'m reading anomalous signatures embedded in our');
  await terminal.dentLine('fold wake. Passive devices \u2014 they deployed them');
  await terminal.dentLine('before we jumped.');
  terminal.blank();

  await terminal.dentSystem('THREAT ANALYSIS');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Device:  Chronometric Dampener (passive)');
  await terminal.dentSystem('Type:    Fold signature tracker');
  await terminal.dentSystem('Status:  ACTIVE \u2014 bonded to our wake profile');
  await terminal.dentSystem('Effect:  Tags fold signature for accelerated');
  await terminal.dentSystem('         detection on subsequent folds');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  state.setFlag('chronometric_dampeners', true);

  await terminal.dent('Chronometric Dampeners. They tag our fold');
  await terminal.dentLine('signature \u2014 embed a resonance pattern in our');
  await terminal.dentLine('wake that their detection grid can lock onto.');
  await terminal.dentLine('Every fold we make from now on will be');
  await terminal.dentLine('detected faster. The window between jumping');
  await terminal.dentLine('and being found gets shorter each time.');
  terminal.blank();

  await terminal.thought('Wake-embedded resonance patterns. They\'re using');
  await terminal.thought('the fold wake itself as a carrier signal \u2014 every');
  await terminal.thought('time we fold, the wake signature propagates at');
  await terminal.thought('lightspeed in all directions. They don\'t need to');
  await terminal.thought('follow us. They just need to listen.');
  terminal.blank();

  await terminal.thought('And the more we fold, the stronger the pattern');
  await terminal.thought('gets. Each jump reinforces the resonance. It\'s');
  await terminal.thought('not just tracking \u2014 it\'s cumulative.');
  terminal.blank();

  await wait(300);

  await terminal.dent('I can\'t purge them from our signature. They\'re');
  await terminal.dentLine('woven into the wake itself. We\'d need to');
  await terminal.dentLine('rebuild the fold envelope from scratch to');
  await terminal.dentLine('shake them \u2014 and we don\'t have the equipment');
  await terminal.dentLine('or the theory for that. Not yet.');
  terminal.blank();

  await terminal.thought('They tagged us. Every fold we\'ve ever made \u2014');
  await terminal.thought('a breadcrumb trail.');
  terminal.blank();

  await terminal.thought('They don\'t need to chase us. They already');
  await terminal.thought('know where we\'ve been.');
  terminal.blank();

  await terminal.thought('And every jump we make from here narrows the');
  await terminal.thought('window. Running makes it worse.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- DENT relationship beat - quiet moment ---
  await terminal.narrate('The bridge settles. The reactor hums. Outside,');
  await terminal.narrate('stars drift in the viewport \u2014 slow, indifferent,');
  await terminal.narrate('impossibly far away. The kind of quiet that');
  await terminal.narrate('only exists between crises.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('DENT is still for a long moment. His optic');
  await terminal.narrate('dims \u2014 the processing cycle he does when he\'s');
  await terminal.narrate('thinking about something that isn\'t tactical.');
  await terminal.narrate('Something human-shaped.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin.');
  terminal.blank();

  await wait(500);

  await terminal.dent('The man on the screen. Graves.');
  terminal.blank();

  await wait(300);

  await terminal.dent('You knew him. Before. Didn\'t you?');
  terminal.blank();

  await terminal.narrate('The question sits in the air between us. Quiet.');
  await terminal.narrate('Careful. Not a demand for information \u2014 a door');
  await terminal.narrate('left open.');
  terminal.blank();

  await wait(300);

  // --- Player choice ---
  terminal.separator();
  terminal.blank();

  const choice = await terminal.arrowMenu(
    [
      '"Yes. He raided my lab."',
      '"I don\'t want to talk about it."',
    ],
    [
      'Tell DENT what you remember.',
      'Not now. Maybe not ever.',
    ]
  );

  terminal.blank();

  if (choice === 0) {
    // Confirm
    state.setFlag('dent_graves_question', 'confirm');

    await terminal.thought('He deserves to know. He was THERE. He just');
    await terminal.thought('doesn\'t remember it.');
    terminal.blank();

    await terminal.narrate('I tell him. The lab. The sirens. The gray');
    await terminal.narrate('vehicles in the parking lot and the calm');
    await terminal.narrate('voice on the PA system. Graves\' voice.');
    await terminal.narrate('The scrambler on the launch pad. The Torquer');
    await terminal.narrate('in my hands, cables snapping.');
    terminal.blank();

    await terminal.narrate('I tell him about hitting the activation');
    await terminal.narrate('switch. His first words. The way he followed');
    await terminal.narrate('me without question into a ship he\'d never');
    await terminal.narrate('seen, piloted by a stranger he\'d known for');
    await terminal.narrate('thirty seconds.');
    terminal.blank();

    await wait(500);

    await terminal.dent('I don\'t remember any of that.');
    terminal.blank();

    await wait(300);

    await terminal.dent('But it explains a few things. The urgency');
    await terminal.dentLine('in my base code. The threat-assessment');
    await terminal.dentLine('protocols that were active before I had');
    await terminal.dentLine('any context for them. I was born running.');
    terminal.blank();

    await wait(300);

    await terminal.dent('Thank you for telling me.');
    terminal.blank();

    await terminal.thought('Born running. Both of us. And we haven\'t');
    await terminal.thought('stopped since.');
    terminal.blank();
  } else {
    // Deflect
    state.setFlag('dent_graves_question', 'deflect');

    await terminal.narrate('I shake my head. A small motion. Definitive.');
    terminal.blank();

    await wait(300);

    await terminal.dent('Understood. When you\'re ready.');
    terminal.blank();

    await wait(300);

    await terminal.narrate('He doesn\'t push. Doesn\'t probe. Doesn\'t run');
    await terminal.narrate('a diagnostic on my stress levels or suggest');
    await terminal.narrate('that talking would be therapeutically optimal.');
    await terminal.narrate('He just accepts it and moves on.');
    terminal.blank();

    await terminal.thought('When I\'m ready. If I\'m ever ready.');
    await terminal.thought('Some doors stay closed for a reason.');
    terminal.blank();
  }

  // --- Set shared convergence flags ---
  state.setFlag('sic_pursuit_active', true);
  state.setFlag('graves_introduced', true);

  await wait(300);

  await terminal.narrate('The Vex drifts on. The stars watch. Somewhere');
  await terminal.narrate('behind us, Graves is already plotting the next');
  await terminal.narrate('intercept.');
  terminal.blank();

  await terminal.narrate('But not yet. For now \u2014 just for now \u2014 we have');
  await terminal.narrate('silence. And silence will have to be enough.');
  terminal.blank();

  // --- Auto-save ---
  await state.save();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: CHAPTER END
// ═══════════════════════════════════════════════════════

async function chapterEnd(terminal, state, effects, audio) {
  terminal.clear();

  // --- New status quo ---
  await terminal.narrate('The Vex runs quiet on auxiliary power. Sensors');
  await terminal.narrate('on passive. Fold drive cooling. Everything the');
  await terminal.narrate('way it should be after a hard escape.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Except nothing is the way it should be.');
  terminal.blank();

  await terminal.narrate('The SIC knows who I am. They know what ship I\'m');
  await terminal.narrate('flying, what the Vex can do, roughly where I\'ve');
  await terminal.narrate('been. Graves has my fold signature on file. Every');
  await terminal.narrate('time we jump, every time we disturb the fabric,');
  await terminal.narrate('they\'ll see us.');
  terminal.blank();

  await wait(300);

  await terminal.thought('Lone explorer is over. I\'m a fugitive now.');
  await terminal.thought('Charter-breaker. Fold criminal. The works.');
  terminal.blank();

  await terminal.narrate('I stare at the viewport. Unknown stars. Unknown');
  await terminal.narrate('sector. No nav buoys, no relay stations, no');
  await terminal.narrate('infrastructure. Just empty space stretching in');
  await terminal.narrate('every direction.');
  terminal.blank();

  await wait(500);

  await terminal.pause();
  terminal.clear();

  // --- Second Echo pulse ---
  audio.play('scan_ping');

  await terminal.dentSystem('ANOMALOUS SIGNAL DETECTED');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Type: NULL-BAND ECHO PULSE');
  await terminal.dentSystem('Bearing: 217.4 x -31.8');
  await terminal.dentSystem('Range: INDETERMINATE');
  await terminal.dentSystem('Pattern match: 99.7% \u2014 PREVIOUS ECHO');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(500);

  await terminal.dent('There it is again. Stronger this time.');
  terminal.blank();

  await wait(300);

  await terminal.dent('The coordinates are resolving. Still deep in');
  await terminal.dentLine('uncharted space \u2014 past anything on the old');
  await terminal.dentGlitch('survey-- mapping--');
  await terminal.dentLine('Past anything on the old survey maps \u2014 but the');
  await terminal.dentLine('bearing is clear. It\'s pulling us forward.');
  terminal.blank();

  await wait(300);

  await terminal.thought('The Echo. Still out there. Still calling.');
  await terminal.thought('Whatever it is, it doesn\'t care that we\'re');
  await terminal.thought('being hunted. It just keeps pulsing.');
  terminal.blank();

  await terminal.narrate('I watch the signal trace on the scanner. A');
  await terminal.narrate('steady rhythm, like a heartbeat. Patient.');
  await terminal.narrate('Waiting.');
  terminal.blank();

  await wait(500);

  // --- Closing dialogue ---
  await terminal.dent('The next waypoint is 4.7 light-years. We\'ll');
  await terminal.dentLine('need to fold again.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"They\'ll see us."</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('Every time.');
  terminal.blank();

  await wait(1000);

  // --- Set flags and save ---
  audio.play('stinger_cliffhanger');
  state.setFlag('chapter3_complete', true);
  state.chapter = 4;
  await state.save();

  // --- End card ---
  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 3: Breaching the Charter \u2014 Complete</span>');
  terminal.blank();

  // Stats summary
  const explored = state.getFlag('rs7_explored');
  const repair = state.getFlag('dent_repair_ch3');
  const locker = state.getFlag('null_locker_forced');
  const escape = state.getFlag('graves_escape_method');
  const question = state.getFlag('dent_graves_question');
  const foldColor = state.foldStatus === 'READY' ? 'c-green' : 'c-dim';
  const dentPercent = Math.round(state.dentRepairLevel * 100);

  terminal.sayHtml('<span class="c-hull">--- CHAPTER SUMMARY ----------------------------</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.sayHtml(`  <span class="c-white-bright">DENT:</span> ${dentPercent}% operational`);
  terminal.sayHtml(`  <span class="c-white-bright">Fold Drive:</span> <span class="${foldColor}">${state.foldStatus}</span> (Stability: ${state.foldStability}%)`);
  terminal.blank();

  const repairLabel = repair ? repair.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'none';
  terminal.sayHtml(`  <span class="c-dim">Station explored: ${explored ? 'yes' : 'no'}</span>`);
  terminal.sayHtml(`  <span class="c-dim">DENT repair: ${repairLabel}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Null locker: ${locker ? 'forced' : 'left sealed'}</span>`);
  const escapeLabel = escape ? escape.charAt(0).toUpperCase() + escape.slice(1) : 'unknown';
  terminal.sayHtml(`  <span class="c-dim">Escape method: ${escapeLabel}</span>`);
  const questionLabel = question ? question.charAt(0).toUpperCase() + question.slice(1) : 'unknown';
  terminal.sayHtml(`  <span class="c-dim">Graves question: ${questionLabel}</span>`);
  if (state.getFlag('flashback_lab_raid')) {
    terminal.sayHtml('  <span class="c-dim">Memory: The Night They Came recovered</span>');
  }
  terminal.sayHtml('  <span class="c-red-bright">SIC Status: ACTIVE PURSUIT \u2014 CHRONOMETRIC DAMPENERS DEPLOYED</span>');
  terminal.sayHtml('<span class="c-hull">------------------------------------------------</span>');
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 4 coming soon...</span>');
  terminal.blank();

  await terminal.pause();
}
