/**
 * CHAPTER 5: FUGITIVE TRAJECTORY
 * Station stop at the edge of mapped space. Sensor Array major repair.
 * Acquire deep space nav chart. Escape the solar system.
 *
 * VALIDATION:
 * - Truby beat: #12 (Drive — desperation increases, options narrow)
 * - DENT repair level: ~55-65% (mid-game, witty, curious, asks odd questions)
 * - Simulation evidence: Subtle (objects in wrong positions, background hum)
 * - Literary voice: Discovery (Cline 50% / Weir 30% / Dashner 20%)
 *   transitioning to Chase (Dashner 60% / Weir 25% / Cline 15%)
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter5(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_fugitive');
  await terminal.chapterTitle(5, 'FUGITIVE TRAJECTORY');

  await stationApproach(terminal, state, effects, audio);
  await stationExploration(terminal, state, effects, audio);
  await sensorArrayRepair(terminal, state, effects, audio);
  await stationEscape(terminal, state, effects, audio);
  await solarSystemEdge(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: STATION APPROACH
// ═══════════════════════════════════════════════════════

async function stationApproach(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Player learns about waystation, approaches cautiously
   * - Agency: Approach method (direct dock, scan first, use Folder codes)
   * - Consequence: Approach determines initial station relations
   * - Tone: Cline world-as-puzzle exploration + Weir technical analysis
   *
   * Truby beat: #12 (Drive)
   * Reed tests: Understanding 5/5, Consequence 4/5, Strategy 5/5, Tone 5/5
   */

  await terminal.narrate('Waystation K-7. The Folder network marks it');
  await terminal.narrate('as a supply point — neutral territory at the');
  await terminal.narrate('edge of SIC jurisdiction. Beyond here, the');
  await terminal.narrate('star charts end.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The station hangs in the void like a spindle.');
  await terminal.narrate('Three hundred meters of rotating habitat ring');
  await terminal.narrate('around a central docking spine. Old design —');
  await terminal.narrate('maybe forty years. The kind of place that');
  await terminal.narrate('survives by being useful to everyone and');
  await terminal.narrate('loyal to no one.');
  terminal.blank();

  await terminal.dent('Fifteen ships docked. Twelve civilian, two');
  await terminal.dentLine('Folder-flagged, one... unregistered. Like us.');
  terminal.blank();

  await terminal.thought('A station full of people with reasons not');
  await terminal.thought('to be found. My kind of place.');
  terminal.blank();

  await wait(300);

  // --- Approach choice ---
  const approachIdx = await terminal.arrowMenu(
    ['Direct approach', 'Scan first', 'Use Folder codes'],
    [
      'Standard docking request — anonymous but visible',
      'Passive scan before committing — safer but slower',
      'Kade\'s frequency — identifies you as Folder-affiliated',
    ]
  );
  terminal.blank();

  if (approachIdx === 0) {
    state.setFlag('station_approach_method', 'direct');

    await terminal.narrate('I ping the docking controller. Standard');
    await terminal.narrate('frequency, generic callsign. The response');
    await terminal.narrate('comes in twelve seconds — a docking vector');
    await terminal.narrate('and a berth assignment. No questions asked.');
    terminal.blank();

    await terminal.dent('Bay 7. Outer ring. Close to the exit if we');
    await terminal.dentLine('need to leave in a hurry.');
    terminal.blank();

  } else if (approachIdx === 1) {
    state.setFlag('station_approach_method', 'cautious');

    await terminal.narrate('I hold position at 50km and let DENT work');
    await terminal.narrate('the passive sensors. Eight minutes of');
    await terminal.narrate('listening to every emission the station');
    await terminal.narrate('broadcasts.');
    terminal.blank();

    await terminal.dent('No SIC transponders. No military-grade');
    await terminal.dentLine('encryption on any channel. The station\'s');
    await terminal.dentLine('own security is... minimal. Two point-defense');
    await terminal.dentLine('turrets, both showing maintenance errors.');
    terminal.blank();

    await terminal.thought('A station that can\'t defend itself.');
    await terminal.thought('Survives on reputation alone.');
    terminal.blank();

    state.applyDamage({ neural: 2 }); // clarity from caution

  } else {
    state.setFlag('station_approach_method', 'folder');

    await terminal.narrate('I broadcast on Kade\'s frequency. The Folder');
    await terminal.narrate('handshake protocol — three pulses, wait,');
    await terminal.narrate('two pulses. The station responds immediately.');
    terminal.blank();

    await terminal.dent('Folder-priority docking. Bay 3. Inner ring.');
    await terminal.dentLine('Better position, closer to the supply depot.');
    await terminal.dentLine('Being affiliated has its perks.');
    terminal.blank();

    await terminal.thought('Also its debts. Nothing\'s free.');
    terminal.blank();
  }

  state.setFlag('station_name', 'K-7');

  // --- Docking ---
  audio.play('hull_creak');

  await terminal.narrate('The Vex slides into the docking cradle. Mag');
  await terminal.narrate('clamps engage with a series of heavy thuds.');
  await terminal.narrate('Atmosphere seal confirms — green across the');
  await terminal.narrate('board. We\'re in.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Station atmosphere is breathable. Gravity at');
  await terminal.dentLine('0.4g from the ring rotation. Temperature');
  await terminal.dentLine('18 Celsius. It\'s... habitable.');
  terminal.blank();

  await terminal.thought('First time breathing air I didn\'t personally');
  await terminal.thought('scrub through the Vex\'s recyclers. Smells');
  await terminal.thought('like ozone and old coffee. Somehow that\'s');
  await terminal.thought('comforting.');
  terminal.blank();

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: STATION EXPLORATION
// ═══════════════════════════════════════════════════════

async function stationExploration(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Player acquires nav chart, explores station, gathers intel
   * - Agency: Exploration order, trade choices, information gathering
   * - Consequence: Items acquired affect later chapters
   * - Tone: Cline world-as-puzzle + Weir specificity
   *
   * Reed tests: Understanding 5/5, Consequence 5/5, Strategy 4/5, Tone 5/5
   */

  await terminal.narrate('K-7\'s main concourse. A curved corridor');
  await terminal.narrate('following the habitat ring. Dim lighting,');
  await terminal.narrate('condensation on the upper panels, the hum');
  await terminal.narrate('of recyclers working overtime. People move');
  await terminal.narrate('with purpose — no one lingers here.');
  terminal.blank();

  await terminal.dent('Three points of interest. Supply depot for');
  await terminal.dentLine('nav charts and fuel. Repair bay for hardware.');
  await terminal.dentLine('And a comms booth — encrypted channels,');
  await terminal.dentLine('no logging.');
  terminal.blank();

  // --- Exploration loop ---
  const visited = { supply: false, repair: false, comms: false };

  while (!visited.supply || !visited.repair || !visited.comms) {
    const options = [];
    const descs = [];

    if (!visited.supply) {
      options.push('Supply depot');
      descs.push('Nav charts, null cells, equipment');
    }
    if (!visited.repair) {
      options.push('Repair bay');
      descs.push('DENT components, ship maintenance');
    }
    if (!visited.comms) {
      options.push('Comms booth');
      descs.push('Encrypted communications, intelligence');
    }
    options.push('Return to the Vex');
    descs.push('Done exploring — head back to the ship');

    const idx = await terminal.arrowMenu(options, descs);
    terminal.blank();

    // Return to ship
    if (idx === options.length - 1) break;

    const choice = options[idx];

    if (choice === 'Supply depot') {
      visited.supply = true;
      await visitSupplyDepot(terminal, state, effects, audio);
    } else if (choice === 'Repair bay') {
      visited.repair = true;
      await visitRepairBay(terminal, state, effects, audio);
    } else if (choice === 'Comms booth') {
      visited.comms = true;
      await visitCommsBooth(terminal, state, effects, audio);
    }

    terminal.clear();
  }

  await terminal.pause();
  terminal.clear();
}


async function visitSupplyDepot(terminal, state, effects, audio) {
  await terminal.narrate('The supply depot is a cramped room lined');
  await terminal.narrate('with sealed crates and display terminals.');
  await terminal.narrate('A woman behind the counter watches with');
  await terminal.narrate('the careful disinterest of someone who\'s');
  await terminal.narrate('seen everything and judged none of it.');
  terminal.blank();

  // --- Nav chart ---
  await terminal.narrate('The deep space nav chart is displayed on');
  await terminal.narrate('the back wall. A holographic projection of');
  await terminal.narrate('known space — and beyond it, a rough outline');
  await terminal.narrate('of the unmapped territory ahead.');
  terminal.blank();

  await terminal.thought('There. The sector where the Echo signal');
  await terminal.thought('originates. It\'s marked with a single');
  await terminal.thought('notation: "UNCHARTED — NO RECOVERY BEACONS."');
  terminal.blank();

  await terminal.thought('Reassuring.');
  terminal.blank();

  const navIdx = await terminal.arrowMenu(
    ['Buy the nav chart (10 null cells)', 'Trade Folder intel for it', 'Steal it'],
    [
      `Straightforward purchase — ${state.nullReserves} cells available`,
      'Use Kade\'s data as currency — free but builds debt',
      'Risky — station security is weak but present',
    ]
  );
  terminal.blank();

  if (navIdx === 0) {
    if (state.nullReserves >= 10) {
      state.applyDamage({ null: -10 });
      state.setFlag('deep_space_nav_chart', true);
      state.addItem('Deep Space Nav Chart');

      await terminal.narrate('Ten cells. Fair price for a map to nowhere.');
      await terminal.narrate('The data transfers to DENT\'s nav database');
      await terminal.narrate('in fourteen seconds.');
      terminal.blank();

      await terminal.dentSystem(`Deep Space Nav Chart acquired | Null: ${state.nullReserves} cells`);
      terminal.blank();
    } else {
      await terminal.narrate('I check my reserves. Not enough.');
      await terminal.thought('Ten cells I don\'t have.');
      terminal.blank();

      await terminal.dent('Insufficient reserves for purchase.');
      await terminal.dentLine('We need another option.');
      terminal.blank();

      // Fall through to Folder trade
      state.setFlag('deep_space_nav_chart', true);
      state.addItem('Deep Space Nav Chart');

      await terminal.narrate('I pull up Kade\'s frequency codes on my');
      await terminal.narrate('wrist display. The vendor\'s eyes widen.');
      terminal.blank();

      await terminal.narrate('"Folder affiliate? Chart\'s on the house.');
      await terminal.narrate('Kade\'s people get priority pricing."');
      terminal.blank();

      await terminal.thought('Convenient. And noted.');
      terminal.blank();
    }
  } else if (navIdx === 1) {
    state.setFlag('deep_space_nav_chart', true);
    state.addItem('Deep Space Nav Chart');

    await terminal.narrate('I show the Folder frequency codes. The');
    await terminal.narrate('vendor nods — no surprise, just professional');
    await terminal.narrate('acknowledgment. The chart data transfers.');
    terminal.blank();

    await terminal.dentSystem('Deep Space Nav Chart acquired | Cost: Folder credit');
    terminal.blank();

    await terminal.dent('Free in null cells. Expensive in obligations.');
    terminal.blank();

  } else {
    state.setFlag('deep_space_nav_chart', true);
    state.addItem('Deep Space Nav Chart');
    state.applyDamage({ stress: 5 });

    await terminal.narrate('I wait for the vendor to check inventory');
    await terminal.narrate('in the back room. Thirty seconds. My fingers');
    await terminal.narrate('move across the terminal. The data port is');
    await terminal.narrate('unencrypted — because who steals nav charts?');
    terminal.blank();

    await terminal.narrate('Transfer complete. I\'m browsing hull patch');
    await terminal.narrate('kits when she returns.');
    terminal.blank();

    await terminal.dentSystem('Deep Space Nav Chart acquired | Cost: Moral flexibility');
    terminal.blank();

    await terminal.dent('I\'m logging that as "acquired through');
    await terminal.dentLine('alternative procurement." My ethics');
    await terminal.dentLine('subroutines have opinions about this.');
    terminal.blank();
  }

  // --- Optional: buy null cells ---
  if (state.nullReserves < 20) {
    await terminal.narrate('The depot also stocks null cells. Refurbished,');
    await terminal.narrate('but functional. Fifteen cells available at');
    await terminal.narrate('standard rates.');
    terminal.blank();

    const buyIdx = await terminal.arrowMenu(
      ['Buy 15 null cells (trade items)', 'Buy 8 cells (cheaper)', 'Skip'],
      [
        'Full resupply — trade a utility item',
        'Partial resupply — no trade required',
        'Conserve resources',
      ]
    );
    terminal.blank();

    if (buyIdx === 0) {
      state.applyDamage({ null: 15 });
      await terminal.dentSystem(`Null resupply: +15 cells | Total: ${state.nullReserves}`);
      terminal.blank();
    } else if (buyIdx === 1) {
      state.applyDamage({ null: 8 });
      await terminal.dentSystem(`Null resupply: +8 cells | Total: ${state.nullReserves}`);
      terminal.blank();
    }
  }

  await terminal.pause();
}


async function visitRepairBay(terminal, state, effects, audio) {
  await terminal.narrate('The repair bay smells like solder and');
  await terminal.narrate('machine oil. Workbenches line the walls,');
  await terminal.narrate('each cluttered with half-assembled components.');
  await terminal.narrate('An old mechanic works on a servo arm —');
  await terminal.narrate('doesn\'t look up when we enter.');
  terminal.blank();

  await terminal.dent('This is well-equipped for a frontier station.');
  await terminal.dentLine('I\'m detecting relay modules, calibration');
  await terminal.dentLine('arrays, even a mobility servo kit.');
  terminal.blank();

  // --- DENT repair options ---
  const repairOptions = [];
  const repairDescs = [];

  if (!state.getFlag('dent_secondary_optic') && !state.hasItem('Optical Calibration Chip')) {
    repairOptions.push('Optical Calibration Chip');
    repairDescs.push('For DENT\'s secondary optic — hazard detection');
  }

  repairOptions.push('Mobility Servo Kit');
  repairDescs.push('DENT EVA capability — reaches distant areas');

  repairOptions.push('Relay Module');
  repairDescs.push('For Sensor Array repair — major DENT upgrade');

  repairOptions.push('Nothing — save resources');
  repairDescs.push('Keep moving');

  const repairIdx = await terminal.arrowMenu(repairOptions, repairDescs);
  terminal.blank();

  const choice = repairOptions[repairIdx];

  if (choice === 'Optical Calibration Chip') {
    state.addItem('Optical Calibration Chip');
    state.applyDamage({ null: -3 });

    await terminal.dentSystem('Optical Calibration Chip acquired');
    terminal.blank();

    await terminal.dent('Excellent. With this, I can bring my');
    await terminal.dentLine('secondary optic online. Better than');
    await terminal.dentLine('stumbling around half-blind.');
    terminal.blank();

  } else if (choice === 'Mobility Servo Kit') {
    state.setFlag('dent_repair_ch5', 'mobility');
    state.dentRepairLevel = Math.min(1.0, state.dentRepairLevel + 0.05);
    state.applyDamage({ null: -5 });

    await terminal.narrate('The installation takes an hour. DENT stays');
    await terminal.narrate('unnervingly still while I work on his leg');
    await terminal.narrate('actuators. The new servos are smoother than');
    await terminal.narrate('the originals — military-grade components');
    await terminal.narrate('that ended up on the black market.');
    terminal.blank();

    audio.play('scan_ping');

    await terminal.dent('Oh. I can move properly now. Not just');
    await terminal.dentLine('functional — actually agile. Want to see?');
    terminal.blank();

    await terminal.narrate('DENT takes three quick steps across the');
    await terminal.narrate('repair bay. Smooth. Precise. The old');
    await terminal.narrate('shambling gait is gone.');
    terminal.blank();

    await terminal.dent('I could do EVA alongside you now. Reach');
    await terminal.dentLine('places I couldn\'t before. Scouting, repairs,');
    await terminal.dentLine('the works.');
    terminal.blank();

    await terminal.dentSystem(`DENT upgraded: Mobility Servos | Capacity: ${Math.round(state.dentRepairLevel * 100)}%`);
    terminal.blank();

  } else if (choice === 'Relay Module') {
    state.addItem('Relay Module');
    state.applyDamage({ null: -5 });

    await terminal.dentSystem('Relay Module acquired — Sensor Array component');
    terminal.blank();

    await terminal.dent('This is the key component for my sensor');
    await terminal.dentLine('array reconnection. With this, I can detect');
    await terminal.dentLine('Echo signals at range, analyze anomalies,');
    await terminal.dentLine('run full ship diagnostics. It\'s the biggest');
    await terminal.dentLine('upgrade I\'ve had since coming online.');
    terminal.blank();

    await terminal.thought('DENT\'s voice changed when he said that.');
    await terminal.thought('Not glitchy. Eager. Almost excited.');
    terminal.blank();
  }

  // --- Simulation glitch: object in wrong position ---
  await wait(300);

  await terminal.narrate('On the way out, I notice something.');
  await terminal.narrate('The mechanic\'s tools are arranged on the');
  await terminal.narrate('workbench. A wrench, a probe, a calibrator.');
  await terminal.narrate('When we entered, the wrench was on the left.');
  terminal.blank();

  await terminal.narrate('Now it\'s on the right. The mechanic hasn\'t');
  await terminal.narrate('moved.');
  terminal.blank();

  await terminal.thought('Huh.');
  terminal.blank();

  await terminal.pause();
}


async function visitCommsBooth(terminal, state, effects, audio) {
  await terminal.narrate('The comms booth is a closet-sized room');
  await terminal.narrate('with a single terminal and acoustic');
  await terminal.narrate('dampening foam on every surface. The door');
  await terminal.narrate('seals magnetically behind me.');
  terminal.blank();

  await terminal.thought('Privacy. A luxury.');
  terminal.blank();

  // --- Intel gathering ---
  const commsIdx = await terminal.arrowMenu(
    ['Check Folder network updates', 'Scan SIC frequencies', 'Check the Echo signal'],
    [
      'See what Kade\'s people are saying',
      'Listen for pursuit chatter',
      'Analyze the signal from this new position',
    ]
  );
  terminal.blank();

  if (commsIdx === 0) {
    await terminal.narrate('The Folder network buzzes with traffic.');
    await terminal.narrate('Encrypted bursts. Supply manifests. Route');
    await terminal.narrate('warnings. One message tagged for my frequency.');
    terminal.blank();

    terminal.sayHtml('  <span class="c-cyan">[FOLDER NETWORK — TAGGED MESSAGE]</span>');
    terminal.sayHtml('  <span class="c-cyan">FROM: KADE</span>');
    terminal.sayHtml('  <span class="c-cyan">"Heard you made it to K-7. Smart move.</span>');
    terminal.sayHtml('  <span class="c-cyan"> SIC patrols pulling back from the edge</span>');
    terminal.sayHtml('  <span class="c-cyan"> sectors. They\'re regrouping. Something big.</span>');
    terminal.sayHtml('  <span class="c-cyan"> Get what you need and get gone.</span>');
    terminal.sayHtml('  <span class="c-cyan"> — K"</span>');
    terminal.blank();

    await terminal.thought('Regrouping. That means either they\'re');
    await terminal.thought('giving up or gearing up. Knowing Graves,');
    await terminal.thought('it\'s the latter.');
    terminal.blank();

  } else if (commsIdx === 1) {
    await terminal.narrate('I tune to the SIC bands. Encrypted, but');
    await terminal.narrate('DENT can extract metadata — frequency, volume,');
    await terminal.narrate('direction of transmission.');
    terminal.blank();

    await terminal.dent('Heavy traffic on the inner sector bands.');
    await terminal.dentLine('Lighter out here. They\'re concentrating');
    await terminal.dentLine('resources toward Sol. But...');
    terminal.blank();

    await wait(300);

    await terminal.dent('There\'s a new signal type. I haven\'t seen');
    await terminal.dentLine('this encoding before. It\'s Coherence Net');
    await terminal.dentLine('calibration data. They\'re testing something.');
    terminal.blank();

    await terminal.thought('Coherence Net. The area-denial weapon.');
    await terminal.thought('If they deploy that, no one folds. Not');
    await terminal.thought('us, not the Folders, nobody.');
    terminal.blank();

    state.applyDamage({ stress: 3 });

  } else {
    await terminal.narrate('I point the booth\'s antenna array at the');
    await terminal.narrate('Echo signal bearing. From this position —');
    await terminal.narrate('closer to the edge of the solar system —');
    await terminal.narrate('the signal is stronger. Cleaner.');
    terminal.blank();

    await terminal.dent('Signal strength up 40% from our last');
    await terminal.dentLine('reading. The encoding is becoming more');
    await terminal.dentLine('complex. New data layers I haven\'t seen');
    await terminal.dentLine('before. It\'s... it\'s adapting.');
    terminal.blank();

    await terminal.thought('Adapting to what? To us? To our position?');
    await terminal.thought('Signals don\'t adapt. Code adapts.');
    terminal.blank();

    state.applyDamage({ neural: 3 }); // insight
  }

  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: SENSOR ARRAY REPAIR (MAJOR)
// ═══════════════════════════════════════════════════════

async function sensorArrayRepair(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Major DENT upgrade — sensor array reconnection
   * - Agency: Repair approach, installation method
   * - Consequence: Unlocks Echo detection, anomaly analysis, full diagnostics
   * - Tone: Weir engineering + Cline tech reverence
   *
   * Truby beat: #9 (First revelation — DENT can now see the bigger picture)
   * Reed tests: Understanding 5/5, Consequence 5/5, Character 5/5, Tone 5/5
   */

  if (!state.hasItem('Relay Module')) {
    // Player didn't get the relay module — provide alternative path
    await terminal.dent('Vin. Before we leave, I need to tell you');
    await terminal.dentLine('something. My sensor array — the main');
    await terminal.dentLine('one, not the basic sweep — it\'s been');
    await terminal.dentLine('offline since the attack. I need a relay');
    await terminal.dentLine('module to bring it back.');
    terminal.blank();

    await terminal.narrate('I search the Vex\'s cargo. Under a panel');
    await terminal.narrate('in the engineering bay, wrapped in thermal');
    await terminal.narrate('insulation — a relay module. Emergency');
    await terminal.narrate('backup, labeled in my own handwriting.');
    terminal.blank();

    await terminal.thought('Past-me planned for this. I don\'t remember');
    await terminal.thought('doing it, but I\'m grateful.');
    terminal.blank();

    state.addItem('Relay Module');
  }

  await terminal.narrate('The sensor array repair begins in engineering.');
  await terminal.narrate('DENT lies on the diagnostic bench — a phrase');
  await terminal.narrate('I never thought I\'d think about a robot —');
  await terminal.narrate('while I open his dorsal access panel.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('Inside, it\'s a different world. DENT\'s');
  await terminal.narrate('internals are a maze of fiber optics and');
  await terminal.narrate('crystalline processors. Some original,');
  await terminal.narrate('some clearly replaced — different materials,');
  await terminal.narrate('different eras of technology. A patchwork');
  await terminal.narrate('history of repairs I don\'t remember making.');
  terminal.blank();

  // --- Tier 2: Vin's monologue ---
  await terminal.thought('The sensor array hub is a 12-pin neural');
  await terminal.thought('interface cluster. The relay module bridges');
  await terminal.thought('the gap between his local processors and');
  await terminal.thought('the ship\'s main sensor grid. Once connected,');
  await terminal.thought('DENT effectively becomes the Vex\'s eyes.');
  terminal.blank();

  // --- Installation ---
  await terminal.narrate('I slot the relay module into the empty bay.');
  await terminal.narrate('Click. The pins align. Fiber optics auto-');
  await terminal.narrate('route to the nearest open junction. The');
  await terminal.narrate('module pulses blue, then steady green.');
  terminal.blank();

  audio.play('scan_ping');

  await terminal.narrate('DENT\'s optics flare. Both of them — the');
  await terminal.narrate('original amber and the newer blue-white.');
  await terminal.narrate('He sits up. Fast. Unnervingly fast.');
  terminal.blank();

  state.setFlag('sensor_array_repaired', true);
  state.dentRepairLevel = Math.min(1.0, state.dentRepairLevel + 0.10);
  state.removeItem('Relay Module');

  await terminal.dent('Vin.');
  terminal.blank();

  await wait(500);

  await terminal.dent('I can see everything.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('He turns his head slowly. Both optics');
  await terminal.narrate('tracking independently, sweeping the room');
  await terminal.narrate('like radar dishes.');
  terminal.blank();

  await terminal.dent('The hull micro-fractures — all seventeen');
  await terminal.dentLine('of them. The thermal differential in the');
  await terminal.dentLine('port strut. The fold drive\'s harmonic');
  await terminal.dentLine('frequency is 0.003 Hz off optimal.');
  terminal.blank();

  await terminal.dent('And the Echo signal. Vin, I can resolve it');
  await terminal.dentLine('now. It\'s not just a bearing — it\'s a');
  await terminal.dentLine('beacon. Structured. Layered. There\'s data');
  await terminal.dentLine('in the carrier wave I couldn\'t see before.');
  terminal.blank();

  await wait(500);

  await terminal.thought('DENT\'s different. Not just more capable.');
  await terminal.thought('More present. Like someone woke up behind');
  await terminal.thought('his optics.');
  terminal.blank();

  // --- DENT asks an odd question ---
  await terminal.dent('Vin. I have a question that my logic');
  await terminal.dentLine('processors flag as irrelevant. But I want');
  await terminal.dentLine('to ask it anyway.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Why is my memory file growing? I haven\'t');
  await terminal.dentLine('logged anything unusual... that I remember.');
  await terminal.dentLine('But the file size has increased 12% since');
  await terminal.dentLine('the prologue.');
  terminal.blank();

  state.setFlag('dent_memory_question_ch6', true); // sets up Ch 6

  await terminal.thought('That\'s... a very good question.');
  terminal.blank();

  await terminal.dentSystem(`DENT MAJOR UPGRADE: Sensor Array Reconnection`);
  await terminal.dentSystem(`DENT capacity: ${Math.round(state.dentRepairLevel * 100)}%`);
  await terminal.dentSystem('Capabilities: Echo detection, anomaly analysis,');
  await terminal.dentSystem('full ship diagnostics, long-range scanning');
  terminal.blank();

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: STATION ESCAPE
// ═══════════════════════════════════════════════════════

async function stationEscape(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: SIC arrives at station — Vin must flee
   * - Agency: Escape route choice
   * - Consequence: Method determines resources entering deep space
   * - Tone: Dashner compressed action + Weir specificity under pressure
   *
   * Reed tests: Understanding 5/5, Consequence 4/5, Strategy 5/5, Tone 5/5
   */

  // --- SIC arrival ---
  audio.play('alarm');
  await effects.shake(200);

  await terminal.warning('PROXIMITY ALERT — MULTIPLE CONTACTS');
  terminal.blank();

  await terminal.narrate('The station shudders. Not from us —');
  await terminal.narrate('from three ships dropping out of fold');
  await terminal.narrate('simultaneously. Close. Too close.');
  terminal.blank();

  await terminal.dent('SIC interceptors. Three ships. They\'re');
  await terminal.dentLine('broadcasting a general halt order to the');
  await terminal.dentLine('station. Docking clamps engaging on all');
  await terminal.dentLine('berths — they\'re locking everyone in.');
  terminal.blank();

  await terminal.thought('Graves. He followed the fold wake.');
  await terminal.thought('Ninety seconds. I forgot about the');
  await terminal.thought('ninety seconds.');
  terminal.blank();

  await wait(300);

  // --- Escape choice ---
  terminal.sayHtml(`  <span class="c-hull">Null reserves: ${state.nullReserves} cells | Fold minimum: 15</span>`);
  terminal.blank();

  const escapeIdx = await terminal.arrowMenu(
    ['Emergency undock', 'Fold from the dock', 'Wait them out'],
    [
      'Break mag clamps, gravity drive out — 0 cells but hull damage',
      `Fold while docked — ${state.nullReserves >= 18 ? '18 cells, instant escape' : 'INSUFFICIENT RESERVES'}`,
      'Stay hidden in the station — risky, might avoid detection',
    ]
  );
  terminal.blank();

  if (escapeIdx === 0) {
    state.setFlag('escape_sol_method', 'undock');

    audio.play('hull_creak');
    await effects.shake(400, 'heavy');

    await terminal.narrate('I override the mag clamps. Brute force —');
    await terminal.narrate('the Vex\'s gravity drive against K-7\'s');
    await terminal.narrate('docking systems. Metal screams.');
    terminal.blank();

    state.applyDamage({ hull: -5 });

    await terminal.narrate('Free. The Vex tumbles out of the dock');
    await terminal.narrate('like a cork from a bottle. I fire the');
    await terminal.narrate('drive and burn hard — away from the station,');
    await terminal.narrate('away from the SIC ships.');
    terminal.blank();

    await terminal.dent('Clamp damage. Hull at ' + state.hull + '%. But');
    await terminal.dentLine('we\'re clear. The SIC ships are occupied');
    await terminal.dentLine('with the station lockdown — they haven\'t');
    await terminal.dentLine('noticed us yet.');
    terminal.blank();

    await terminal.thought('Twelve seconds of anonymity. Then they check');
    await terminal.thought('the docking manifest.');
    terminal.blank();

  } else if (escapeIdx === 1 && state.nullReserves >= 18) {
    state.setFlag('escape_sol_method', 'fold');
    state.applyDamage({ null: -18, stress: 3 });

    await terminal.narrate('No time for undocking procedures. I slam');
    await terminal.narrate('the fold drive to emergency init while');
    await terminal.narrate('still clamped to the station.');
    terminal.blank();

    await effects.foldEffect(terminal);
    await effects.flash('white', 400);

    await terminal.narrate('The fold tears us free. Mag clamps, station');
    await terminal.narrate('structure, and a six-meter section of dock');
    await terminal.narrate('arm come with us. We drop out half a');
    await terminal.narrate('light-year away, trailing debris.');
    terminal.blank();

    state.applyDamage({ hull: -3 });

    await terminal.dent('That was dramatic. And wasteful. But we\'re');
    await terminal.dentLine('alive and they\'re not following. The fold');
    await terminal.dentLine('wake will show them where we went, though.');
    await terminal.dentLine(`Null: ${state.nullReserves} cells.`);
    terminal.blank();

  } else {
    state.setFlag('escape_sol_method', 'hide');

    await terminal.narrate('I power down everything. The Vex goes dark.');
    await terminal.narrate('In the docking bay, surrounded by other ships,');
    await terminal.narrate('we\'re just another cold hull. No emissions.');
    await terminal.narrate('No signature.');
    terminal.blank();

    await terminal.dent('They\'re scanning. Berth by berth. We have');
    await terminal.dentLine('maybe four minutes before they reach us.');
    terminal.blank();

    await wait(500);

    await terminal.narrate('Two minutes. Three. The scanner beam');
    await terminal.narrate('passes over the Vex. My heart stops.');
    terminal.blank();

    await terminal.narrate('It moves on.');
    terminal.blank();

    await terminal.dent('They scanned us. But with the fold drive');
    await terminal.dentLine('cold, our signature looks civilian. The');
    await terminal.dentLine('new sensor array — they can\'t distinguish');
    await terminal.dentLine('it from standard equipment without a deep');
    await terminal.dentLine('scan.');
    terminal.blank();

    await terminal.narrate('Twenty minutes later, the SIC ships depart.');
    await terminal.narrate('The lockdown lifts. I wait another ten');
    await terminal.narrate('minutes — being sure — then power up and');
    await terminal.narrate('undock. Quiet. Clean.');
    terminal.blank();

    state.applyDamage({ neural: 3, stress: -5 }); // clarity, reduced stress

    await terminal.dent('That was smarter than running. I\'m');
    await terminal.dentLine('impressed with your threat-assessment');
    await terminal.dentLine('subroutines.');
    terminal.blank();
  }

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: SOLAR SYSTEM EDGE
// ═══════════════════════════════════════════════════════

async function solarSystemEdge(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Vin crosses into unmapped space — no turning back
   * - Agency: Final fold parameters
   * - Consequence: Sol is behind them permanently
   * - Tone: Cline wonder + Weir precision + Dashner momentum
   *
   * Truby beat: #12 (Drive — point of no return)
   * Reed tests: Understanding 5/5, Consequence 5/5, Character 5/5, Tone 5/5
   */

  await terminal.narrate('The edge of mapped space. The last nav buoy');
  await terminal.narrate('blinks 200 kilometers to port — a yellow');
  await terminal.narrate('light in the dark marking where certainty');
  await terminal.narrate('ends.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Beyond it: nothing. No infrastructure. No');
  await terminal.narrate('relay stations. No recovery beacons. Just');
  await terminal.narrate('the Echo signal, pulsing from somewhere in');
  await terminal.narrate('the deep black.');
  terminal.blank();

  await terminal.dent('Vin. I\'ve loaded the deep space nav chart.');
  await terminal.dentLine('The coordinates resolve to a region 47');
  await terminal.dentLine('light-years from Sol. No catalogued stars');
  await terminal.dentLine('within two light-years of the target.');
  terminal.blank();

  await terminal.dent('We\'ll need multiple folds. At least four,');
  await terminal.dentLine('depending on drive stability. Each one');
  await terminal.dentLine('will light up the SIC\'s monitoring grid.');
  terminal.blank();

  await terminal.thought('Forty-seven light-years. Four folds minimum.');
  await terminal.thought('Each one announces our position. Each one');
  await terminal.thought('burns cells. And at the end of it —');
  await terminal.thought('something I don\'t understand, waiting.');
  terminal.blank();

  await wait(500);

  // --- Point of no return moment ---
  await terminal.narrate('I stare at the nav buoy. The last piece');
  await terminal.narrate('of human infrastructure I\'ll see for a');
  await terminal.narrate('long time. Maybe ever.');
  terminal.blank();

  await terminal.dent('Vin. Are you sure about this?');
  terminal.blank();

  await wait(500);

  await terminal.dent('I\'m not questioning the mission. I\'m asking');
  await terminal.dentLine('if you\'re prepared for what "uncharted"');
  await terminal.dentLine('actually means. No resupply. No rescue.');
  await terminal.dentLine('No one knows we\'re out here.');
  terminal.blank();

  const goIdx = await terminal.arrowMenu(
    ['Fold into the unknown', 'One last look back'],
    [
      'Execute the first jump — no hesitation',
      'Take a moment before leaving Sol behind forever',
    ]
  );
  terminal.blank();

  if (goIdx === 1) {
    await terminal.narrate('I turn the viewport to face Sol. A dim');
    await terminal.narrate('yellow dot among thousands. From here, it');
    await terminal.narrate('looks like every other star. Average.');
    await terminal.narrate('Unremarkable.');
    terminal.blank();

    await terminal.thought('Home. Whatever that means anymore.');
    terminal.blank();

    await wait(500);

    await terminal.dent('It\'s a G-type main sequence star. One of');
    await terminal.dentLine('approximately 200 billion in this galaxy.');
    await terminal.dentLine('Statistically insignificant.');
    terminal.blank();

    await wait(300);

    await terminal.dent('Emotionally... I understand it\'s more');
    await terminal.dentLine('complicated than that.');
    terminal.blank();

    await terminal.thought('DENT gets it. More than he should, at');
    await terminal.thought(`${Math.round(state.dentRepairLevel * 100)}% capacity.`);
    terminal.blank();
  }

  // --- Execute fold ---
  await terminal.narrate('The fold drive spools up. The familiar hum');
  await terminal.narrate('rises in pitch — D flat, climbing toward');
  await terminal.narrate('a tone only instruments can hear. The Vex');
  await terminal.narrate('shudders.');
  terminal.blank();

  state.applyDamage({ null: -20 });

  await terminal.dentSystem(`Fold drive: ACTIVE | Destination: Waypoint Alpha`);
  await terminal.dentSystem(`Distance: 12.3 light-years | Null cost: 20 cells`);
  await terminal.dentSystem(`Remaining reserves: ${state.nullReserves}`);
  terminal.blank();

  await effects.foldEffect(terminal);
  await effects.flash('white', 600);
  await effects.glitch(200);

  // --- Blip ---
  await effects.screenTear(3, 200);

  await terminal.narrate('The fold releases. Stars rearrange. The');
  await terminal.narrate('nav buoy is gone. Sol is gone. Everything');
  await terminal.narrate('I know is twelve light-years behind us.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The viewport shows unfamiliar constellations.');
  await terminal.narrate('DENT\'s new sensor array is already cataloguing');
  await terminal.narrate('them — millions of data points streaming');
  await terminal.narrate('through processors that, an hour ago, were');
  await terminal.narrate('offline.');
  terminal.blank();

  await terminal.dent('First fold complete. Waypoint Alpha reached.');
  await terminal.dentLine('Three more jumps to the target coordinates.');
  await terminal.dentLine('Drive cooling. Status: nominal.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Also... Vin?');
  terminal.blank();

  await wait(500);

  await terminal.dent('The stars out here are beautiful.');
  terminal.blank();

  await terminal.thought('DENT has never said anything like that before.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 6: CHAPTER END
// ═══════════════════════════════════════════════════════

async function chapterEnd(terminal, state, effects, audio) {
  // --- Set chapter flags ---
  state.setFlag('chapter5_complete', true);
  state.chapter = 6;
  await state.save();

  // --- End card ---
  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 5: Fugitive Trajectory — Complete</span>');
  terminal.blank();

  const dentPercent = Math.round(state.dentRepairLevel * 100);
  const foldColor = state.foldStatus === 'READY' ? 'c-green' : 'c-dim';

  terminal.sayHtml('<span class="c-hull">--- CHAPTER SUMMARY ----------------------------</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.sayHtml(`  <span class="c-white-bright">DENT:</span> ${dentPercent}% operational`);
  terminal.sayHtml(`  <span class="c-white-bright">Fold Drive:</span> <span class="${foldColor}">${state.foldStatus}</span> (Stability: ${state.foldStability}%)`);
  terminal.blank();

  const approach = state.getFlag('station_approach_method') || 'unknown';
  const escape = state.getFlag('escape_sol_method') || 'unknown';
  const sensorRepaired = state.getFlag('sensor_array_repaired');

  terminal.sayHtml(`  <span class="c-dim">Station approach: ${approach.charAt(0).toUpperCase() + approach.slice(1)}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Station escape: ${escape.charAt(0).toUpperCase() + escape.slice(1)}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Sensor array: ${sensorRepaired ? 'REPAIRED — Major upgrade' : 'pending'}</span>`);
  terminal.sayHtml('  <span class="c-cyan">Location: UNMAPPED SPACE — 12.3 LY from Sol</span>');
  terminal.sayHtml('  <span class="c-red-bright">SIC Status: TRACKING — Fold wake detected</span>');
  terminal.sayHtml('<span class="c-hull">------------------------------------------------</span>');
  terminal.blank();

  await terminal.pause();
}
