/**
 * CHAPTER 6: THE LOW-RES UNIVERSE
 * Deep space isolation. Render Gap discovery — repeating star patterns.
 * First major simulation evidence. DENT grows curious and unsettled.
 *
 * VALIDATION:
 * - Truby beat: #16 (Audience revelation begins)
 * - DENT repair level: 60-70% (confident, witty, curious, asks questions he shouldn't)
 * - Simulation evidence: GROWING (screen tears during folds, Render Gap, physics anomalies)
 * - Literary voice: Discovery (Cline 50% / Weir 30% / Dashner 20%)
 *   with Character moments (Weir 50% / Cline 30% / Dashner 20%)
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter6(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_low_res');
  await terminal.chapterTitle(6, 'THE LOW-RES UNIVERSE');

  await deepSpaceIsolation(terminal, state, effects, audio);
  await renderGapDiscovery(terminal, state, effects, audio);
  await dentGrowsCurious(terminal, state, effects, audio);
  await secondFold(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: DEEP SPACE ISOLATION
// ═══════════════════════════════════════════════════════

async function deepSpaceIsolation(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Player experiences deep space isolation, understands the void
   * - Agency: How to spend the travel time — activities, conversations
   * - Consequence: Choices affect mental state entering Render Gap
   * - Tone: Weir quiet moment + Cline wonder (slower, reflective)
   *
   * Reed tests: Understanding 4/5, Consequence 3/5, Character 5/5, Tone 5/5
   */

  state.setFlag('isolation_days', 3);

  await terminal.narrate('Three days on gravity drive between folds.');
  await terminal.narrate('The drive needs 72 hours minimum to cool');
  await terminal.narrate('and recalibrate after a deep space jump.');
  await terminal.narrate('Seventy-two hours of doing nothing but');
  await terminal.narrate('drifting.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The viewport shows the same stars it showed');
  await terminal.narrate('yesterday. And the day before. Deep space');
  await terminal.narrate('doesn\'t move. You move through it and it');
  await terminal.narrate('doesn\'t notice.');
  terminal.blank();

  await terminal.thought('There\'s a particular kind of loneliness');
  await terminal.thought('that comes from being 20 light-years from');
  await terminal.thought('the nearest human being. It\'s not sadness.');
  await terminal.thought('It\'s a mathematical certainty of irrelevance.');
  terminal.blank();

  await wait(300);

  // --- Activity choice ---
  await terminal.dent('Vin. You\'ve been staring at the viewport');
  await terminal.dentLine('for forty minutes. I\'ve timed it. Would');
  await terminal.dentLine('you like to do something productive, or');
  await terminal.dentLine('is the existential dread serving a purpose');
  await terminal.dentLine('I\'m not detecting?');
  terminal.blank();

  const actIdx = await terminal.arrowMenu(
    ['Run ship diagnostics', 'Talk to DENT', 'Examine the Echo data'],
    [
      'Technical work — keep busy, check systems',
      'Conversation — DENT\'s been asking odd questions lately',
      'Analysis — study the Echo signal with the new sensors',
    ]
  );
  terminal.blank();

  if (actIdx === 0) {
    // Diagnostics — Weir engineering comfort
    await terminal.narrate('I run the full diagnostic suite. Every');
    await terminal.narrate('sensor, every actuator, every seal. The');
    await terminal.narrate('Vex is held together by engineering and');
    await terminal.narrate('stubbornness in roughly equal measure.');
    terminal.blank();

    await terminal.dentSystem('SHIP DIAGNOSTIC — FULL SWEEP');
    await terminal.dentSystem('────────────────────────────────────');
    await terminal.dentSystem(`Hull: ${state.hull}% — 17 micro-fractures (stable)`);
    await terminal.dentSystem(`Fold drive: cooling — 41 hours remaining`);
    await terminal.dentSystem(`Null reserves: ${state.nullReserves} cells`);
    await terminal.dentSystem(`Life support: ${state.lifeSupportLevel}% efficiency`);
    await terminal.dentSystem('Gravity drive: nominal');
    await terminal.dentSystem('Anomalies: 1 (see note)');
    await terminal.dentSystem('────────────────────────────────────');
    terminal.blank();

    await terminal.dent('One anomaly. The hull temperature readings');
    await terminal.dentLine('in the cargo section don\'t match the');
    await terminal.dentLine('environmental sensors. Off by 0.4 degrees.');
    await terminal.dentLine('That shouldn\'t happen.');
    terminal.blank();

    await terminal.thought('0.4 degrees. Not enough to matter.');
    await terminal.thought('Enough to notice.');
    terminal.blank();

    state.applyDamage({ stress: -3 }); // comfort from routine

  } else if (actIdx === 1) {
    // Talk to DENT — character moment
    await terminal.narrate('I push back from the console and face DENT.');
    await terminal.narrate('He\'s in his usual spot by the engineering');
    await terminal.narrate('station, both optics focused on something');
    await terminal.narrate('I can\'t see. Internal processes.');
    terminal.blank();

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"What are you thinking about?"</span>');
    terminal.blank();

    await wait(500);

    await terminal.dent('I\'ve analyzed seventeen ways this trip');
    await terminal.dentLine('could go wrong. Would you like them in');
    await terminal.dentLine('alphabetical order or by likelihood of');
    await terminal.dentLine('death?');
    terminal.blank();

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Dealer\'s choice."</span>');
    terminal.blank();

    await terminal.dent('Alphabetical then. "Asphyxiation" comes');
    await terminal.dentLine('first, which feels appropriately dramatic.');
    terminal.blank();

    await wait(300);

    await terminal.dent('Actually, Vin — I was thinking about my');
    await terminal.dentLine('memory file. The one that\'s growing.');
    terminal.blank();

    await terminal.dent('I ran a checksum against my last known');
    await terminal.dentLine('backup. The delta is larger than my total');
    await terminal.dentLine('logged activity. I\'m recording more data');
    await terminal.dentLine('than I\'m generating.');
    terminal.blank();

    await terminal.thought('That\'s not possible. Unless someone else');
    await terminal.thought('is writing to his memory. Or something.');
    terminal.blank();

    await terminal.dent('Vin, I appreciate your optimism. It\'s');
    await terminal.dentLine('mathematically unfounded, but I appreciate');
    await terminal.dentLine('it.');
    terminal.blank();

    state.applyDamage({ neural: 2 }); // insight from DENT

  } else {
    // Echo analysis — Cline discovery
    await terminal.narrate('The new sensor array resolves the Echo');
    await terminal.narrate('signal in ways the old equipment never');
    await terminal.narrate('could. Layers of data, folded into the');
    await terminal.narrate('carrier wave like origami.');
    terminal.blank();

    await terminal.dent('The signal has seventeen distinct layers.');
    await terminal.dentLine('Layer one is the bearing — coordinates.');
    await terminal.dentLine('Layer two is the Casimir resonance pattern.');
    await terminal.dentLine('Layers three through twelve are... data.');
    await terminal.dentLine('Compressed. Encrypted. Using your algorithm.');
    terminal.blank();

    await terminal.dent('Layers thirteen through seventeen...');
    await terminal.dentLine('I can\'t identify. The encoding is unlike');
    await terminal.dentLine('anything in my database. It\'s structured');
    await terminal.dentLine('but it doesn\'t correspond to any known');
    await terminal.dentLine('information format.');
    terminal.blank();

    await terminal.thought('Seventeen layers. Twelve I can decode.');
    await terminal.thought('Five I can\'t. The signal from the future');
    await terminal.thought('contains knowledge I haven\'t invented yet.');
    terminal.blank();

    state.applyDamage({ neural: 5 }); // major insight
  }

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: RENDER GAP DISCOVERY
// ═══════════════════════════════════════════════════════

async function renderGapDiscovery(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: FIRST MAJOR SIMULATION EVIDENCE — repeating star patterns
   * - Agency: How deeply to investigate the anomaly
   * - Consequence: Flags set for Ch 7 dialogue, simulation evidence accumulates
   * - Tone: Cline discovery euphoria (prose accelerates at revelation)
   *
   * Truby beat: #16 (Audience revelation begins)
   * Reed tests: Understanding 5/5, Consequence 5/5, Character 5/5, Tone 5/5
   */

  // --- DENT's discovery ---
  audio.play('scan_ping');

  await terminal.narrate('Day four. DENT has been running long-range');
  await terminal.narrate('stellar cartography sweeps since the sensor');
  await terminal.narrate('upgrade. Cataloguing stars. Building maps');
  await terminal.narrate('where none exist.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin. I\'ve completed the stellar cartography');
  await terminal.dentLine('sweep.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Something\'s odd.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('His voice changed. Not glitchy — uncertain.');
  await terminal.narrate('DENT at 60% doesn\'t do uncertain.');
  terminal.blank();

  await terminal.dent('Look at this.');
  terminal.blank();

  // --- The Render Gap ---
  await terminal.narrate('DENT projects the stellar cartography onto');
  await terminal.narrate('the main display. Thousands of distant stars,');
  await terminal.narrate('each catalogued with position, magnitude,');
  await terminal.narrate('spectral class. A map of our neighborhood');
  await terminal.narrate('in the void.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('At first glance, it\'s beautiful. The kind');
  await terminal.narrate('of image that makes you understand why people');
  await terminal.narrate('become astronomers.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Then you see it.');
  terminal.blank();

  await wait(800);

  // --- Prose accelerates (Cline discovery euphoria) ---
  await terminal.narrate('The patterns repeat.');
  terminal.blank();

  await terminal.narrate('Constellation 4471-A and 8832-C. Identical.');
  await terminal.narrate('Not similar. Identical. Star for star,');
  await terminal.narrate('magnitude for magnitude, spacing for spacing.');
  terminal.blank();

  await terminal.narrate('And not just those two.');
  terminal.blank();

  await terminal.narrate('Seven. Seven identical clusters spread');
  await terminal.narrate('across the deep field survey.');
  terminal.blank();

  // --- Player investigation choice ---
  const investIdx = await terminal.arrowMenu(
    ['Examine the data closely', 'Ask DENT what it means', 'Check sensor logs'],
    [
      'Tier 2: Vin\'s deep analysis of the anomaly',
      'Tier 1: DENT\'s interpretation',
      'Tier 3: Raw technical data',
    ]
  );
  terminal.blank();

  if (investIdx === 0) {
    // Tier 2: Vin's analysis
    audio.play('stinger_revelation');
    state.setFlag('render_gap_observed', true);

    await terminal.thought('At this distance, even binary star pairs');
    await terminal.thought('should show variation. Doppler shift from');
    await terminal.thought('galactic rotation. Gravitational lensing');
    await terminal.thought('from intervening mass. Proper motion');
    await terminal.thought('accumulated over billions of years.');
    terminal.blank();

    await terminal.thought('But these clusters are identical down to');
    await terminal.thought('the photometric error margin. 99.97% match.');
    await terminal.thought('That\'s not natural variation. That\'s a');
    await terminal.thought('copy. Someone took one cluster and pasted');
    await terminal.thought('it six times.');
    terminal.blank();

    await terminal.thought('No. That\'s not... that\'s not how I should');
    await terminal.thought('be thinking about stars. Stars aren\'t');
    await terminal.thought('"copied." That\'s a computational term.');
    terminal.blank();

    await terminal.thought('Why did I think that?');
    terminal.blank();

    state.applyDamage({ neural: 5 });

  } else if (investIdx === 1) {
    // Tier 1: DENT explains
    audio.play('stinger_revelation');
    state.setFlag('render_gap_observed', true);
    state.setFlag('render_gap_dent_discussed', true);

    await terminal.dent('The stars repeat. Seven identical clusters');
    await terminal.dentLine('across a 40 light-year span. At this');
    await terminal.dentLine('distance, sensor resolution should still');
    await terminal.dentLine('show individual variation. There\'s no');
    await terminal.dentLine('physical mechanism for identical patterns.');
    terminal.blank();

    await terminal.dent('It\'s like... someone didn\'t bother');
    await terminal.dentLine('rendering them properly.');
    terminal.blank();

    await wait(500);

    await terminal.dent('That\'s not a scientific term. Why did I');
    await terminal.dentLine('say "rendering"?');
    terminal.blank();

    await terminal.thought('Good question, DENT. Very good question.');
    terminal.blank();

    state.applyDamage({ neural: 5 });

  } else {
    // Tier 3: Technical logs
    audio.play('stinger_revelation');
    state.setFlag('render_gap_observed', true);
    state.setFlag('render_gap_technical', true);

    terminal.sayHtml('  <span class="c-dim">[TECHNICAL LOG // SENSOR ARRAY // DEEP FIELD SCAN]</span>');
    terminal.blank();
    await terminal.logEntry('Survey ID: DFS-00247');
    await terminal.logEntry('Resolution: 0.014 arcsec (nominal for range)');
    await terminal.logEntry('Clusters surveyed: 2,847');
    await terminal.logEntry('Pattern match threshold: 95.00%');
    await terminal.logEntry('ANOMALOUS RESULT: 7 clusters at 99.97% match');
    await terminal.logEntry('');
    await terminal.logEntry('Cluster IDs: 4471-A, 5023-B, 5891-C, 6234-A,');
    await terminal.logEntry('  7102-B, 8832-C, 9441-A');
    await terminal.logEntry('');
    await terminal.logEntry('Hypothesis: Rendering optimization at distance >50 LY');
    await terminal.logEntry('');
    await terminal.logEntry('NOTE: "Rendering" is not a physics term.');
    await terminal.logEntry('  This hypothesis was auto-generated by my analysis');
    await terminal.logEntry('  subroutines. I did not program this hypothesis.');
    await terminal.logEntry('  Flagging for review.');
    terminal.blank();

    await terminal.thought('DENT\'s own systems generated the word');
    await terminal.thought('"rendering." Unprompted. As if it were');
    await terminal.thought('the most natural explanation.');
    terminal.blank();

    state.applyDamage({ neural: 8 }); // deep insight
  }

  // --- Consequence ---
  await wait(500);

  await terminal.narrate('The star field glows on the display. Seven');
  await terminal.narrate('identical clusters, scattered across the');
  await terminal.narrate('deep black like stamps pressed by the same');
  await terminal.narrate('hand.');
  terminal.blank();

  await terminal.narrate('The universe is vast. Random. Chaotic.');
  terminal.blank();

  await terminal.narrate('These stars are too orderly.');
  terminal.blank();

  await wait(500);

  // --- Screen tear (simulation struggling) ---
  await effects.screenTear(2, 150);

  await terminal.narrate('The display flickers. A brief horizontal');
  await terminal.narrate('distortion — like a video feed losing');
  await terminal.narrate('sync for a fraction of a second.');
  terminal.blank();

  await terminal.dent('That wasn\'t the display. That was the');
  await terminal.dentLine('sensor feed itself. The raw data stream');
  await terminal.dentLine('stuttered.');
  terminal.blank();

  await terminal.thought('Data streams don\'t stutter.');
  await terminal.thought('Unless something is buffering.');
  terminal.blank();

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: DENT GROWS CURIOUS
// ═══════════════════════════════════════════════════════

async function dentGrowsCurious(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: DENT's personality deepens; begins questioning reality
   * - Agency: How to respond to DENT's growing awareness
   * - Consequence: Shapes DENT's trajectory toward the Ch 12 memory revelation
   * - Tone: Weir quiet character moment + TARS-style loyalty
   *
   * Truby beat: #6 (Ally), #16 (Audience revelation)
   * Reed tests: Understanding 4/5, Consequence 5/5, Character 5/5, Tone 5/5
   */

  // --- Night cycle (ship dimmed) ---
  await terminal.narrate('Night cycle. The Vex dims to 30% lighting.');
  await terminal.narrate('An arbitrary distinction in space — there\'s');
  await terminal.narrate('no sun to set. But humans need rhythms,');
  await terminal.narrate('and the ship provides them.');
  terminal.blank();

  await terminal.narrate('I can\'t sleep. The repeating star patterns');
  await terminal.narrate('play behind my eyelids every time I close');
  await terminal.narrate('them. Seven identical clusters. 99.97% match.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Vin. You\'re not sleeping.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Neither are you."</span>');
  terminal.blank();

  await terminal.dent('I don\'t sleep. I reduce processing cycles.');
  await terminal.dentLine('It\'s different.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin, I want to tell you something. My');
  await terminal.dentLine('diagnostic subroutines classify this as');
  await terminal.dentLine('"low priority." But it\'s been on my mind.');
  await terminal.dentLine('If that\'s the right phrase for a machine.');
  terminal.blank();

  await wait(500);

  await terminal.dent('The stars. The repeating patterns. My');
  await terminal.dentLine('analysis subroutines generated a word');
  await terminal.dentLine('I don\'t have a definition for. Not in');
  await terminal.dentLine('my physics database, not in my engineering');
  await terminal.dentLine('libraries, not anywhere in my active memory.');
  terminal.blank();

  await terminal.dent('The word was "rendering."');
  terminal.blank();

  await wait(500);

  await terminal.dent('As if the stars are being rendered. Like');
  await terminal.dentLine('a display. Like a simulation.');
  terminal.blank();

  // --- Player response ---
  const dentIdx = await terminal.arrowMenu(
    ['Explore the thought', 'Shut it down', 'Ask DENT how he feels about it'],
    [
      'Engage with the simulation hypothesis',
      'Too dangerous — stay focused on physics',
      'Personal — check on DENT\'s state of mind',
    ]
  );
  terminal.blank();

  if (dentIdx === 0) {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"What if it is? A simulation. What would</span>');
    terminal.sayHtml('  <span class="c-white-bright">       that change about what we\'re doing?"</span>');
    terminal.blank();

    await wait(500);

    await terminal.dent('Everything. Nothing. If the universe is');
    await terminal.dentLine('computed, then folding is an exploit. The');
    await terminal.dentLine('SIC isn\'t protecting spacetime — they\'re');
    await terminal.dentLine('patching a bug. The Echoes aren\'t signals —');
    await terminal.dentLine('they\'re shellcode.');
    terminal.blank();

    await terminal.dent('And we\'re not explorers. We\'re processes.');
    terminal.blank();

    await terminal.thought('Processes. Running on hardware we can\'t see.');
    await terminal.thought('Following instructions we don\'t remember');
    await terminal.thought('receiving.');
    terminal.blank();

    state.applyDamage({ neural: 3 });

  } else if (dentIdx === 1) {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"It\'s a sensor anomaly. Resolution limit.</span>');
    terminal.sayHtml('  <span class="c-white-bright">       We\'re 20 light-years out — of course</span>');
    terminal.sayHtml('  <span class="c-white-bright">       the data degrades."</span>');
    terminal.blank();

    await wait(300);

    await terminal.dent('That\'s the rational explanation. I want');
    await terminal.dentLine('to believe it. My probability matrices');
    await terminal.dentLine('want to believe it.');
    terminal.blank();

    await terminal.dent('But Vin — I\'m a machine. I don\'t "want"');
    await terminal.dentLine('things. And yet I want this to be a');
    await terminal.dentLine('sensor error. That desire is itself');
    await terminal.dentLine('an anomaly.');
    terminal.blank();

    await terminal.thought('He\'s right. DENT having preferences');
    await terminal.thought('about reality is more unsettling than');
    await terminal.thought('the repeating stars.');
    terminal.blank();

  } else {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Forget the data for a second. How are</span>');
    terminal.sayHtml('  <span class="c-white-bright">       you doing with this? Actually doing?"</span>');
    terminal.blank();

    await wait(500);

    await terminal.dent('That\'s a question I\'m not equipped to');
    await terminal.dentLine('answer at my current repair level. Ask');
    await terminal.dentLine('me again at 80%.');
    terminal.blank();

    await wait(300);

    await terminal.dent('But if I had to guess... unsettled.');
    await terminal.dentLine('My memory file is growing. The universe');
    await terminal.dentLine('is repeating. And I generated a word');
    await terminal.dentLine('I shouldn\'t know.');
    terminal.blank();

    await terminal.dent('Unsettled is probably the right word.');
    terminal.blank();

    state.applyDamage({ stress: -2 }); // connection reduces stress
  }

  await wait(500);

  // --- DENT logs it ---
  await terminal.dent('I\'m logging this conversation as an anomaly.');
  await terminal.dentLine('My probability matrix says the repeating');
  await terminal.dentLine('stars are impossible.');
  terminal.blank();

  await terminal.dent('But here they are.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: SECOND FOLD
// ═══════════════════════════════════════════════════════

async function secondFold(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Second deep space fold, closer to Core Anomaly
   * - Agency: Fold timing and preparation
   * - Consequence: Resources consumed, SIC tracking updates
   * - Tone: Dashner momentum + Weir precision
   *
   * Reed tests: Understanding 4/5, Consequence 4/5, Tone 5/5
   */

  await terminal.narrate('Day six. Fold drive calibrated. DENT has');
  await terminal.narrate('plotted the second jump — 14.8 light-years');
  await terminal.narrate('to Waypoint Beta. Deeper into the unmapped');
  await terminal.narrate('territory. Deeper into whatever the Echo');
  await terminal.narrate('is pulling us toward.');
  terminal.blank();

  await terminal.dent('Fold parameters set. Null reserves sufficient.');
  await terminal.dentLine('I want to note that the Render Gap anomaly');
  await terminal.dentLine('will be behind us after this jump. If the');
  await terminal.dentLine('pattern continues — if stars repeat closer');
  await terminal.dentLine('to the target — we\'ll know it\'s not local.');
  terminal.blank();

  await terminal.thought('If the pattern continues, we\'ll know');
  await terminal.thought('something worse. That it\'s everywhere.');
  terminal.blank();

  // --- Fold execution ---
  state.applyDamage({ null: -22 });

  await terminal.dentSystem(`Fold drive: ACTIVE | Destination: Waypoint Beta`);
  await terminal.dentSystem(`Distance: 14.8 light-years | Null cost: 22 cells`);
  await terminal.dentSystem(`Remaining reserves: ${state.nullReserves}`);
  terminal.blank();

  await effects.foldEffect(terminal);
  await effects.flash('white', 600);

  // --- More intense Blip this time ---
  await effects.screenTear(4, 300);
  await effects.glitch(400);
  await effects.shake(300);

  await terminal.narrate('The fold releases and the universe snaps');
  await terminal.narrate('back into place. But this time — this time');
  await terminal.narrate('it takes longer. A full second of distortion.');
  await terminal.narrate('Stars smearing. Light bending wrong.');
  terminal.blank();

  state.applyDamage({ stress: 3 });

  await terminal.dent('Blip duration: 1.3 seconds. Previous average');
  await terminal.dentLine('was 0.4 seconds. The distortion is getting');
  await terminal.dentLine('longer with each fold.');
  terminal.blank();

  await terminal.thought('Longer Blips. Repeating stars. Growing');
  await terminal.thought('memory files. Nothing is getting better');
  await terminal.thought('out here.');
  terminal.blank();

  await wait(300);

  // --- Post-fold discovery ---
  await terminal.dent('Vin. The new sensor sweep is in.');
  terminal.blank();

  await wait(500);

  await terminal.dent('The stars repeat here too. Same seven');
  await terminal.dentLine('cluster patterns. Different positions,');
  await terminal.dentLine('but identical compositions. It\'s not');
  await terminal.dentLine('local. It\'s everywhere we look.');
  terminal.blank();

  await terminal.thought('Everywhere. The whole sky is a pattern');
  await terminal.thought('on repeat. Like wallpaper.');
  terminal.blank();

  await terminal.thought('Like a texture.');
  terminal.blank();

  // --- Optional salvage ---
  await terminal.dent('Also detecting a debris field. Derelict');
  await terminal.dentLine('vessel, heavily damaged. No life signs.');
  await terminal.dentLine('But there\'s a null energy signature.');
  await terminal.dentLine('Could be salvageable cells.');
  terminal.blank();

  const salvageIdx = await terminal.arrowMenu(
    ['Investigate the derelict', 'Keep moving'],
    [
      'Potential null cells — we need them',
      'Stay on course — don\'t waste time',
    ]
  );
  terminal.blank();

  if (salvageIdx === 0) {
    state.setFlag('dent_repair_ch6', 'vocal_processor');

    await terminal.narrate('The derelict is a Folder ship. Or was.');
    await terminal.narrate('The hull is split open along the midline —');
    await terminal.narrate('clean cut, not explosive. Coherence Scrambler');
    await terminal.narrate('damage. The SIC found them.');
    terminal.blank();

    await terminal.narrate('The cargo hold is mostly intact. Twenty');
    await terminal.narrate('null cells in sealed containers. And');
    await terminal.narrate('something else — a vocal processor unit,');
    await terminal.narrate('compatible with DENT\'s architecture.');
    terminal.blank();

    state.applyDamage({ null: 20 });

    await terminal.dentSystem(`Salvage: +20 null cells | Total: ${state.nullReserves}`);
    terminal.blank();

    await terminal.dent('Vin. That vocal processor — it\'s compatible');
    await terminal.dentLine('with my speech systems. If installed, it');
    await terminal.dentLine('would deepen my personality matrix.');
    await terminal.dentLine('Sharper humor. Better emotional range.');
    terminal.blank();

    const vocalIdx = await terminal.arrowMenu(
      ['Install the vocal processor', 'Save it for later'],
      [
        'DENT personality upgrade — humor and emotional depth',
        'Keep it in inventory',
      ]
    );
    terminal.blank();

    if (vocalIdx === 0) {
      state.dentRepairLevel = Math.min(1.0, state.dentRepairLevel + 0.05);

      await terminal.narrate('The installation takes thirty minutes.');
      await terminal.narrate('When DENT speaks again, there\'s a');
      await terminal.narrate('warmth in his voice that wasn\'t there');
      await terminal.narrate('before. Subtle. Like the difference');
      await terminal.narrate('between reading text and hearing speech.');
      terminal.blank();

      await terminal.dent('Testing. Testing. One, two, three.');
      terminal.blank();

      await wait(300);

      await terminal.dent('Oh. That\'s... that\'s considerably better.');
      await terminal.dentLine('I sound like me now. The me I\'m supposed');
      await terminal.dentLine('to be.');
      terminal.blank();

      await terminal.dentSystem(`DENT upgraded: Vocal Processor | Capacity: ${Math.round(state.dentRepairLevel * 100)}%`);
      terminal.blank();
    } else {
      state.addItem('Vocal Processor');
      await terminal.dent('Understood. I\'ll wait. Patiently.');
      await terminal.dentLine('Very patiently.');
      terminal.blank();
    }

    // --- Simulation evidence on the derelict ---
    await terminal.narrate('As we pull away from the derelict, something');
    await terminal.narrate('catches my eye. The ship\'s registration');
    await terminal.narrate('number, painted on the hull: VX-117.');
    terminal.blank();

    await terminal.narrate('Our ship\'s registration is VX-118.');
    terminal.blank();

    await terminal.thought('One digit off. Coincidence.');
    await terminal.thought('Probably.');
    terminal.blank();
  } else {
    await terminal.narrate('The derelict falls behind us. Another');
    await terminal.narrate('ghost ship in an ocean of nothing.');
    terminal.blank();
  }

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: CHAPTER END
// ═══════════════════════════════════════════════════════

async function chapterEnd(terminal, state, effects, audio) {
  // --- Closing reflection ---
  await terminal.narrate('The Vex drifts toward Waypoint Gamma.');
  await terminal.narrate('Another 72-hour cooling cycle. Another');
  await terminal.narrate('three days in the deep black with a sky');
  await terminal.narrate('made of repeating patterns and questions');
  await terminal.narrate('that don\'t have physics-based answers.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Vin. I have one more data point to report.');
  terminal.blank();

  await wait(300);

  await terminal.dent('My memory file. It grew by 3% during the');
  await terminal.dentLine('fold. I wasn\'t logging anything. I was');
  await terminal.dentLine('offline during transit — all robots are.');
  terminal.blank();

  await terminal.dent('Something wrote to my memory while I');
  await terminal.dentLine('wasn\'t looking.');
  terminal.blank();

  await wait(500);

  await terminal.thought('The Render Gap. The growing memory file.');
  await terminal.thought('The Blips getting longer. Everything is');
  await terminal.thought('connected. I just don\'t know what the');
  await terminal.thought('web looks like yet.');
  terminal.blank();

  // --- Set chapter flags ---
  state.setFlag('chapter6_complete', true);
  state.chapter = 7;
  await state.save();

  // --- End card ---
  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 6: The Low-Res Universe — Complete</span>');
  terminal.blank();

  const dentPercent = Math.round(state.dentRepairLevel * 100);
  const foldColor = state.foldStatus === 'READY' ? 'c-green' : 'c-dim';

  terminal.sayHtml('<span class="c-hull">--- CHAPTER SUMMARY ----------------------------</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.sayHtml(`  <span class="c-white-bright">DENT:</span> ${dentPercent}% operational`);
  terminal.sayHtml(`  <span class="c-white-bright">Fold Drive:</span> <span class="${foldColor}">${state.foldStatus}</span> (Stability: ${state.foldStability}%)`);
  terminal.blank();

  const renderGap = state.getFlag('render_gap_observed');
  const renderTech = state.getFlag('render_gap_technical');

  terminal.sayHtml(`  <span class="c-dim">Render Gap observed: ${renderGap ? 'yes' : 'no'}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Technical analysis: ${renderTech ? 'yes' : 'no'}</span>`);
  terminal.sayHtml('  <span class="c-dim">DENT memory anomaly: CONFIRMED — growing without input</span>');
  terminal.sayHtml('  <span class="c-dim">Blip duration: INCREASING — 1.3s (prev avg 0.4s)</span>');
  terminal.sayHtml('  <span class="c-cyan">Location: DEEP SPACE — 27.1 LY from Sol</span>');
  terminal.sayHtml('  <span class="c-red-bright">Reality Status: ANOMALOUS</span>');
  terminal.sayHtml('<span class="c-hull">------------------------------------------------</span>');
  terminal.blank();

  await terminal.pause();
}
