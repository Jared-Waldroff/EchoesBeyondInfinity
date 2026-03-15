/**
 * CHAPTER 12: THE PHYSICS OF THE PARADOX
 * Arrive at the Core Anomaly. Execute the Folded Fold — a recursive
 * spacetime manipulation. Reality breaks down. DENT observes his own
 * memory file. Enter the Bulk Dimension threshold.
 *
 * Truby beats: #18 (Gate, gauntlet, visit to death), #19 (Battle — existential)
 * Reed tests: Dramatic Question 5/5, But/Therefore 5/5, Convergence 5/5,
 *             Consequence 5/5
 *
 * Simulation evidence: UNSETTLING → OVERWHELMING
 * Literary voice: Awe + Terror (Cline 40% / Weir 35% / Dashner 25%)
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter12(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_folded_fold');
  await terminal.chapterTitle(12, 'THE PHYSICS OF THE PARADOX');

  await coreAnomalyArrival(terminal, state, effects, audio);
  await foldedFoldPreparation(terminal, state, effects, audio);
  await theFoldedFold(terminal, state, effects, audio);
  await realityBreakdown(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: CORE ANOMALY ARRIVAL
// ═══════════════════════════════════════════════════════

async function coreAnomalyArrival(terminal, state, effects, audio) {
  /**
   * Arrive at the Core Anomaly — destination of all Echoes.
   *
   * VALIDATION:
   * - Advance: Player understands this is the source of everything
   * - Agency: Choose how to approach (sensors / emotional / DENT)
   * - Consequence: Approach choice shapes DENT's pre-fold analysis depth
   * - Tone: Ominous beauty — awe and dread in equal measure
   *
   * Truby beat: #18 (Gate — the threshold before the final ordeal)
   * Reed test: Dramatic Question — what IS this thing?
   */
  audio.ambient('deep_space_pulse');

  await terminal.narrate('The Vex drops out of fold at 0.3 AU from the');
  await terminal.narrate('coordinates. Standard buffer. Anything closer and');
  await terminal.narrate('the Temporal Stabilizer would be fighting us the');
  await terminal.narrate('whole way.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('And then I see it.');
  terminal.blank();

  await wait(800);

  terminal.clear();

  audio.play('anomaly_tone');

  await terminal.narrate('It has no name in any catalog. No designation.');
  await terminal.narrate('Nothing in the survey archives, the charter maps,');
  await terminal.narrate('or the theoretical literature matches what the');
  await terminal.narrate('viewport is showing me.');
  terminal.blank();

  await terminal.narrate('It is not a black hole. Black holes curve light');
  await terminal.narrate('around an absent center. This thing holds light');
  await terminal.narrate('suspended — a sphere, roughly — translucent at the');
  await terminal.narrate('edges, becoming something I have no color word for');
  await terminal.narrate('at the core. Not dark. Not bright. Somewhere');
  await terminal.narrate('between that language can\'t reach.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The stars behind it are visible. Undistorted.');
  await terminal.narrate('It doesn\'t bend light. It doesn\'t pull. It simply');
  await terminal.narrate('sits in space the way a door sits in a wall —');
  await terminal.narrate('obvious, patient, waiting for someone to notice');
  await terminal.narrate('it is there.');
  terminal.blank();

  await terminal.thought('My own equations built the path here. Equations');
  await terminal.thought('I wrote — or will write — and sent backward through');
  await terminal.thought('time inside an Echo. And the path led here.');
  await terminal.thought('To something that shouldn\'t exist.');
  terminal.blank();

  await wait(400);

  await terminal.thought('I feel pulled. Not gravity. Not the fold drive.');
  await terminal.thought('Something else. Something that started the day the');
  await terminal.thought('Blip happened — a compass needle that has been');
  await terminal.thought('pointing at this exact spot across every chapter');
  await terminal.thought('of this journey.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // DENT's initial analysis
  await terminal.dent('Vin. I\'m running sensors at maximum resolution.');
  await terminal.dentLine('I\'ve been running them since we dropped fold.');
  terminal.blank();

  await wait(400);

  await terminal.dent('It\'s not a celestial object.');
  terminal.blank();

  await wait(600);

  await terminal.dentSystem('ANOMALY ANALYSIS — PRELIMINARY');
  await terminal.dentSystem('─────────────────────────────────────────');
  await terminal.dentSystem('Mass signature ......... ABSENT');
  await terminal.dentSystem('Gravitational lensing .. NONE DETECTED');
  await terminal.dentSystem('Hawking radiation ...... NONE DETECTED');
  await terminal.dentSystem('EM spectrum ............ DOES NOT APPLY');
  await terminal.dentSystem('Temporal field ......... SATURATED (max scale)');
  await terminal.dentSystem('Echo signal strength ... 100% — ALL PRIOR ECHOES');
  await terminal.dentSystem('                         ORIGINATE HERE');
  await terminal.dentSystem('Classification ......... UNKNOWN');
  await terminal.dentSystem('Best match ............. ACCESS POINT');
  await terminal.dentSystem('─────────────────────────────────────────');
  terminal.blank();

  await terminal.dent('It\'s not a thing. It\'s a location. A specific');
  await terminal.dentLine('address in the topology of spacetime where the');
  await terminal.dentLine('membrane between layers is... thinner.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Every Echo you\'ve ever received came from here.');
  await terminal.dentLine('All of them. Simultaneously. Which means whatever');
  await terminal.dentLine('is on the other side of that membrane sent your');
  await terminal.dentLine('own future math back through every iteration');
  await terminal.dentLine('of this journey.');
  terminal.blank();

  await terminal.thought('Every iteration.');
  terminal.blank();

  await wait(500);

  // Player choice — how to approach
  await terminal.narrate('The Anomaly pulses. Slow. Rhythmic. The way a');
  await terminal.narrate('lighthouse pulses for a ship that\'s finally made');
  await terminal.narrate('it close enough to see the light.');
  terminal.blank();

  const approach = await terminal.arrowMenu(
    [
      'Run full sensor sweep.',
      '"DENT — what do we do now?"',
      'Just look at it.',
    ],
    [
      'Document everything. Engineer\'s instinct.',
      'Let DENT lead. He\'s been processing this longer.',
      'No instruments. Just eyes. Just this.',
    ]
  );

  if (approach === 0) {
    state.setFlag('anomaly_approach', 'scientific');
    await anomalyApproachScientific(terminal, state, effects, audio);
  } else if (approach === 1) {
    state.setFlag('anomaly_approach', 'dent_led');
    await anomalyApproachDentLed(terminal, state, effects, audio);
  } else {
    state.setFlag('anomaly_approach', 'silent');
    await anomalyApproachSilent(terminal, state, effects, audio);
  }

  await terminal.pause();
}


async function anomalyApproachScientific(terminal, state, effects, audio) {
  /** Vin runs sensors — builds technical understanding. */
  await terminal.narrate('My hands move to the console before my brain');
  await terminal.narrate('finishes the thought. Familiar motion. Safe motion.');
  await terminal.narrate('When the universe shows you something impossible,');
  await terminal.narrate('you measure it.');
  terminal.blank();

  await terminal.dentSystem('EXTENDED SENSOR SWEEP — CORE ANOMALY');
  await terminal.dentSystem('─────────────────────────────────────────');
  await terminal.dentSystem('Diameter ............... 4.7 AU (stable)');
  await terminal.dentSystem('Age estimate ........... INDETERMINATE');
  await terminal.dentSystem('Interior state ......... CANNOT RESOLVE');
  await terminal.dentSystem('Boundary thickness ..... 0.0 m (mathematical)');
  await terminal.dentSystem('Temporal depth ......... EXCEEDS SENSOR RANGE');
  await terminal.dentSystem('Null energy density .... EXTREME — off scale');
  await terminal.dentSystem('─────────────────────────────────────────');
  terminal.blank();

  await terminal.thought('Boundary thickness zero. That\'s not a measurement.');
  await terminal.thought('That\'s a geometry. The edge of this thing is a');
  await terminal.thought('mathematical surface — no thickness, just a');
  await terminal.thought('demarcation between one kind of space and another.');
  terminal.blank();

  await terminal.dent('The null energy concentration is approximately');
  await terminal.dentLine('ten to the thirty-seventh joules per cubic');
  await terminal.dentLine('meter. For reference — the energy density at');
  await terminal.dentLine('the center of a neutron star is ten to the');
  await terminal.dentLine('thirty-fourth.');
  terminal.blank();

  await terminal.dent('This is denser than a neutron star. And it\'s');
  await terminal.dentLine('been here, stable, apparently forever.');
  terminal.blank();

  state.applyDamage({ neural: 5 });
  terminal.say('  [Neural +5 — documentation instinct. This data will matter.]', 'dim-text');
  terminal.blank();
}


async function anomalyApproachDentLed(terminal, state, effects, audio) {
  /** DENT leads — relationship moment, DENT\'s own processing. */
  await terminal.dent('Honestly?');
  terminal.blank();

  await wait(400);

  await terminal.dent('I\'ve been running simulations since Chapter 3.');
  await terminal.dentLine('Every Echo, every fold signature, every anomalous');
  await terminal.dentLine('reading — I\'ve been mapping the probability space');
  await terminal.dentLine('and this is what kept emerging at the center.');
  terminal.blank();

  await terminal.dent('I didn\'t tell you. Because every time I modeled');
  await terminal.dentLine('telling you, the conversation went badly and');
  await terminal.dentLine('we ended up here anyway. So I waited until');
  await terminal.dentLine('we were already here.');
  terminal.blank();

  await terminal.thought('He\'s been sitting on this. For chapters. Doing');
  await terminal.thought('the math alone in the dark while I slept.');
  terminal.blank();

  await terminal.narrate('I look at him. His optic is fixed on the Anomaly.');
  await terminal.narrate('The blue light behind his chest plate is the');
  await terminal.narrate('brightest I\'ve ever seen it. His repair level is');
  await terminal.narrate('at eighty-seven percent and it shows — every');
  await terminal.narrate('motion precise, every word considered.');
  terminal.blank();

  await terminal.dent('What we do now is what we\'ve always done.');
  await terminal.dentLine('We go through the door that opened.');
  terminal.blank();

  state.setFlag('dent_revealed_foreknowledge', true);
}


async function anomalyApproachSilent(terminal, state, effects, audio) {
  /** Vin just looks — pure presence, emotional weight. */
  await terminal.narrate('I don\'t touch the console.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('I just look at it.');
  terminal.blank();

  await wait(800);

  await terminal.narrate('Four point seven astronomical units across. Larger');
  await terminal.narrate('than the orbit of Jupiter. Old enough that nothing');
  await terminal.narrate('in our instruments can find a bottom to its age.');
  await terminal.narrate('Sitting here waiting the way a room waits — empty,');
  await terminal.narrate('patient, without urgency — for someone to enter it.');
  terminal.blank();

  await terminal.thought('The Echoes were breadcrumbs. The whole journey —');
  await terminal.thought('every fold, every system, every choice — was a');
  await terminal.thought('path through the forest.');
  terminal.blank();

  await terminal.thought('And I\'m standing at the house now.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Vin.');
  terminal.blank();
  await wait(300);
  await terminal.dent('I\'m here.');
  terminal.blank();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: FOLDED FOLD PREPARATION
// ═══════════════════════════════════════════════════════

async function foldedFoldPreparation(terminal, state, effects, audio) {
  /**
   * DENT explains the Folded Fold. Multi-step preparation sequence.
   *
   * VALIDATION:
   * - Advance: Player understands the mechanism and stakes
   * - Agency: Four preparation steps with meaningful player choices
   * - Consequence: Choices affect fold stage difficulties
   * - Tone: Technical tension — the last checklist before the point of no return
   *
   * Truby beat: #18 continued (the gauntlet begins)
   * Reed test: Strategy — player must engage with the mechanics
   */
  terminal.clear();
  audio.play('fold_charge_low');

  await terminal.dent('Okay. I need to explain something.');
  terminal.blank();

  await terminal.dent('A standard fold bends space from point A to point B.');
  await terminal.dentLine('We\'ve done that. The physics are established.');
  await terminal.dentLine('Null energy creates negative curvature, the');
  await terminal.dentLine('Alcubierre bubble forms, spacetime translates.');
  terminal.blank();

  await wait(300);

  await terminal.dent('The Folded Fold is different.');
  terminal.blank();

  await wait(500);

  await terminal.dent('We fold space. Then we fold that folded space.');
  await terminal.dentLine('Inside the first warp bubble, we initiate a');
  await terminal.dentLine('second one. The two folds interact. The geometry');
  await terminal.dentLine('becomes self-referential.');
  terminal.blank();

  await terminal.thought('Self-referential. A loop that contains itself.');
  terminal.blank();

  await terminal.dent('The result is a Closed Timelike Curve — a path');
  await terminal.dentLine('through spacetime that loops back to its own');
  await terminal.dentLine('origin. Not travel to the past. Something closer');
  await terminal.dentLine('to... coexistence with the past. With all versions');
  await terminal.dentLine('of the present simultaneously.');
  terminal.blank();

  await wait(400);

  await terminal.dent('The equations that describe this — your equations,');
  await terminal.dentLine('Vin, from the Echoes — they\'re valid. I\'ve checked');
  await terminal.dentLine('them eight hundred and forty-seven times.');
  terminal.blank();

  await terminal.thought('Eight hundred and forty-seven.');
  terminal.blank();

  await terminal.dent('They work. The math is real. But I want you to');
  await terminal.dentLine('understand something before we start.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Once we initiate the recursive fold, we cannot');
  await terminal.dentLine('stop it. The fold resolves itself — finds its');
  await terminal.dentLine('equilibrium — or it doesn\'t. If it doesn\'t resolve...');
  terminal.blank();

  await wait(400);

  await terminal.dent('I don\'t know what happens.');
  terminal.blank();

  await terminal.thought('He doesn\'t know. That\'s the most frightening thing');
  await terminal.thought('DENT has ever said to me. He always has a model.');
  await terminal.thought('A probability. A best guess. \'I don\'t know\' from');
  await terminal.thought('him means the math runs off the edge of the map.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Four preparation steps
  await terminal.narrate('We work through the checklist. There is comfort');
  await terminal.narrate('in a checklist — each step its own small act of');
  await terminal.narrate('commitment, the sum of them a door you walk through');
  await terminal.narrate('one meter at a time.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">PRE-FOLD CHECKLIST — FOLDED FOLD PROTOCOL</span>');
  terminal.sayHtml('  <span class="c-hull">─────────────────────────────────────────</span>');
  terminal.blank();

  // Step 1: Calibrate fold drive
  await foldPrepStep1(terminal, state, effects, audio);

  // Step 2: Null reserves
  await foldPrepStep2(terminal, state, effects, audio);

  // Step 3: Temporal Stabilizer
  await foldPrepStep3(terminal, state, effects, audio);

  // Step 4: DENT navigation sync
  await foldPrepStep4(terminal, state, effects, audio);

  await wait(500);

  terminal.sayHtml('  <span class="c-green">  1. Fold drive recursive calibration .... COMPLETE</span>');
  terminal.sayHtml('  <span class="c-green">  2. Null reserves loaded ................. COMPLETE</span>');
  terminal.sayHtml('  <span class="c-green">  3. Temporal Stabilizer active ........... COMPLETE</span>');
  terminal.sayHtml('  <span class="c-green">  4. Navigation sync with Anomaly ......... COMPLETE</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('Checklist complete. Everything we can prepare,');
  await terminal.dentLine('we\'ve prepared.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Vin. Before we do this.');
  terminal.blank();

  await wait(600);

  await terminal.dent('I want you to know — whatever is on the other');
  await terminal.dentLine('side of that membrane — I\'m glad I\'m going');
  await terminal.dentLine('there with you.');
  terminal.blank();

  await terminal.thought('Eighty-seven percent. And whatever that last');
  await terminal.thought('thirteen percent is — the parts of him we');
  await terminal.thought('couldn\'t fix — I don\'t think we need it.');
  terminal.blank();

  await terminal.narrate('I reach out and put my hand on his chassis.');
  await terminal.narrate('Once. The metal is warm from the fold drive');
  await terminal.narrate('cycling up behind the bulkhead.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN: "Let\'s find out what the universe is made of."</span>');
  terminal.blank();

  await wait(400);

  await terminal.dent('I already know what it\'s made of.');
  await terminal.dentLine('I just want to meet whatever\'s behind it.');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


async function foldPrepStep1(terminal, state, effects, audio) {
  /** Calibrate fold drive for recursive operation. */
  terminal.sayHtml('  <span class="c-dim">  1. Fold drive recursive calibration .... [ ? ]</span>');
  terminal.blank();

  await terminal.dent('The drive needs to be tuned for two simultaneous');
  await terminal.dentLine('warp geometries. Standard calibration won\'t work.');
  await terminal.dentLine('I need you to choose the nested bubble ratio.');
  terminal.blank();

  const calibChoice = await terminal.arrowMenu(
    [
      'Ratio 1:2 — Conservative.',
      'Ratio 1:φ — Golden section.',
      'DENT\'s recommendation.',
    ],
    [
      'Smaller inner bubble. Safer geometry. Less energy efficiency.',
      'Fibonacci proportion. Mathematically elegant. Your equations suggest this.',
      'Trust the AI who checked the math 847 times.',
    ]
  );

  if (calibChoice === 0) {
    state.setFlag('fold_bubble_ratio', 'conservative');
    await terminal.dent('Conservative. Understood. 1:2 nested geometry.');
    await terminal.dentLine('We\'ll need fifteen percent more null energy');
    await terminal.dentLine('but the stability margin increases.');
    terminal.blank();
  } else if (calibChoice === 1) {
    state.setFlag('fold_bubble_ratio', 'golden');
    await terminal.dent('The golden section. Yes. That\'s what your');
    await terminal.dentLine('equations specify. The Anomaly\'s own geometry');
    await terminal.dentLine('follows Fibonacci scaling — this ratio resonates');
    await terminal.dentLine('with the boundary conditions. Good choice.');
    terminal.blank();
    state.applyDamage({ neural: 5 });
    terminal.say('  [Neural +5 — the engineer in you recognizes the math.]', 'dim-text');
    terminal.blank();
  } else {
    state.setFlag('fold_bubble_ratio', 'dent');
    await terminal.dent('The golden section. φ ≈ 1.618. The equations');
    await terminal.dentLine('your future self encoded into the Echoes specify');
    await terminal.dentLine('this ratio exactly. I wouldn\'t dream of');
    await terminal.dentLine('deviating from your own instructions.');
    terminal.blank();
  }
}


async function foldPrepStep2(terminal, state, effects, audio) {
  /** Load all remaining null reserves. */
  terminal.sayHtml('  <span class="c-dim">  2. Null reserves — full load ........... [ ? ]</span>');
  terminal.blank();

  await terminal.dent(`All ${state.nullReserves} remaining null cells must be`);
  await terminal.dentLine('committed. The Folded Fold will consume everything.');
  await terminal.dentLine('There\'s no reserve for a second attempt.');
  terminal.blank();

  await terminal.thought('Everything. We go in with nothing held back or');
  await terminal.thought('we don\'t go in at all.');
  terminal.blank();

  const nullChoice = await terminal.arrowMenu(
    [
      'Load everything.',
      '"Are you sure there\'s no other way?"',
    ],
    [
      'All null cells into the fold drive. No return margin.',
      'There has to be a smarter approach.',
    ]
  );

  if (nullChoice === 0) {
    await terminal.narrate('I pull every null cell from storage and rack');
    await terminal.narrate('them into the drive manifold. One by one. Each');
    await terminal.narrate('one a small weight in my hands, dense with');
    await terminal.narrate('contained negative energy. The last one clicks');
    await terminal.narrate('into place.');
    terminal.blank();

    terminal.sayHtml(`  <span class="c-orange">  Null reserves committed: ${state.nullReserves} cells → 0</span>`);
    terminal.blank();

    state.applyDamage({ nullReserves: -state.nullReserves });
  } else {
    await terminal.dent('I ran the numbers four hundred and twelve times.');
    await terminal.dentLine('No. There\'s no other way. The recursive geometry');
    await terminal.dentLine('requires the full null energy budget to maintain');
    await terminal.dentLine('coherence through both fold stages.');
    terminal.blank();

    await terminal.narrate('I load the cells. All of them.');
    terminal.blank();

    terminal.sayHtml(`  <span class="c-orange">  Null reserves committed: ${state.nullReserves} cells → 0</span>`);
    terminal.blank();

    state.applyDamage({ nullReserves: -state.nullReserves });
  }
}


async function foldPrepStep3(terminal, state, effects, audio) {
  /** Activate the Temporal Stabilizer. */
  terminal.sayHtml('  <span class="c-dim">  3. Temporal Stabilizer — active ......... [ ? ]</span>');
  terminal.blank();

  await terminal.dent('The Stabilizer will keep our internal timeline');
  await terminal.dentLine('coherent during the fold. Without it, we\'d');
  await terminal.dentLine('experience temporal bleed — the Anomaly\'s field');
  await terminal.dentLine('would bleed through our reference frame.');
  terminal.blank();

  await terminal.narrate('I key the Temporal Stabilizer active. The ship');
  await terminal.narrate('hums differently — a lower frequency that I feel');
  await terminal.narrate('in my teeth. The Anomaly outside the viewport');
  await terminal.narrate('seems to — shift, slightly. As if the Stabilizer');
  await terminal.narrate('is already negotiating with it.');
  terminal.blank();

  await effects.flash('white', 200);

  await terminal.dentSystem('TEMPORAL STABILIZER: ACTIVE');
  await terminal.dentSystem('Field strength: 97.3% — nominal for proximity');
  terminal.blank();

  await terminal.dent('Good. The Stabilizer is handshaking with the');
  await terminal.dentLine('Anomaly\'s boundary field. They\'re... compatible.');
  terminal.blank();

  await terminal.thought('Compatible. Like a key recognizing a lock.');
  terminal.blank();
}


async function foldPrepStep4(terminal, state, effects, audio) {
  /** DENT synchronizes navigation with Anomaly geometry. */
  terminal.sayHtml('  <span class="c-dim">  4. Navigation sync with Anomaly ......... [ ? ]</span>');
  terminal.blank();

  await terminal.dent('I need to synchronize our navigation reference');
  await terminal.dentLine('frame with the Anomaly\'s geometric center.');
  await terminal.dentLine('Effectively — I need to make the Anomaly\'s');
  await terminal.dentLine('topology our navigation origin point.');
  terminal.blank();

  await terminal.dent('This will feel strange. Our instruments will show');
  await terminal.dentLine('us as stationary while the universe appears to');
  await terminal.dentLine('rotate around the Anomaly. That\'s not an error.');
  terminal.blank();

  await terminal.narrate('DENT initiates the sync. Outside the viewport,');
  await terminal.narrate('the stars begin a slow, majestic rotation. The');
  await terminal.narrate('Anomaly holds perfectly still at the center of');
  await terminal.narrate('everything — the fixed point of a spinning sky.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Sync complete. The Anomaly is now our navigation');
  await terminal.dentLine('origin. In a very real sense — in our reference');
  await terminal.dentLine('frame — it\'s the center of the universe.');
  terminal.blank();

  await terminal.thought('The center of the universe. Built from math I');
  await terminal.thought('haven\'t written yet. Pulling us toward it like');
  await terminal.thought('we were always going to arrive exactly here.');
  terminal.blank();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: THE FOLDED FOLD
// ═══════════════════════════════════════════════════════

async function theFoldedFold(terminal, state, effects, audio) {
  /**
   * THE CLIMACTIC SET PIECE — the Folded Fold, three stages.
   *
   * Stage 1: Initial fold — space bends, strong fold effects.
   * Stage 2: Recursive fold — reality shows its seams. Text glitches.
   *          Fragments from other chapters/cycles bleed through.
   * Stage 3: Resolution — full reality breakdown. System messages visible.
   *          DENT sees his memory file. Stars disappear. Color drains.
   *
   * VALIDATION:
   * - Advance: Converging beat — fold executes, reality breaks, threshold crossed
   * - Agency: Player input required at each of three stages
   * - Consequence: folded_fold_stages_complete tracks each stage
   * - Tone: Cosmic, terrifying, beautiful — the most intense sequence in the game
   *
   * Truby beat: #19 (Battle — existential, the universe itself is the opponent)
   * Reed test: Dramatic Question reaches maximum — what IS reality?
   */
  terminal.clear();
  audio.play('tension_build');

  await terminal.narrate('Everything is ready.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('The fold drive whines at a frequency I don\'t');
  await terminal.narrate('recognize — not the sound it made in Chapter 2,');
  await terminal.narrate('not the sound it made in Chapter 6. This is');
  await terminal.narrate('something new. Two harmonics layered inside each');
  await terminal.narrate('other, each feeding the other, climbing together.');
  terminal.blank();

  await terminal.dent('Vin. All systems nominal. All null reserves');
  await terminal.dentLine('committed to the drive.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Awaiting your initiation command.');
  terminal.blank();

  await terminal.thought('My initiation command. My equations. My future');
  await terminal.thought('self sent this math backward through time so that');
  await terminal.thought('I could stand here and execute it. The loop');
  await terminal.thought('requires me to close it.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN: "Initiate the Folded Fold."</span>');
  terminal.blank();

  await wait(600);

  // ── STAGE 1 ──────────────────────────────────────────

  state.setFlag('folded_fold_initiated', true);
  audio.play('fold_initiate');

  terminal.clear();

  await terminal.highlight('F O L D E D   F O L D   —   S T A G E   1');
  terminal.blank();

  await effects.foldEffect(terminal);

  await wait(300);

  await terminal.dentSystem('PRIMARY FOLD: INITIATING');
  await terminal.dentSystem('Warp bubble forming — nominal geometry');
  await terminal.dentSystem('Null energy: COMMITTING TO DRIVE');
  terminal.blank();

  await terminal.narrate('Space bends.');
  terminal.blank();

  await terminal.narrate('I\'ve seen this before. The stars compress ahead');
  await terminal.narrate('of us, blue-shifting into a single burning point.');
  await terminal.narrate('The stars behind us stretch into red threads and');
  await terminal.narrate('vanish. The Alcubierre bubble forms — a pocket of');
  await terminal.narrate('flat spacetime riding a wave of curvature like a');
  await terminal.narrate('surfer riding physics.');
  terminal.blank();

  await effects.shake(400, 'normal');

  await terminal.narrate('But the Anomaly doesn\'t compress with the other');
  await terminal.narrate('stars. It stays fixed. It stays central. Whatever');
  await terminal.narrate('the fold does to spacetime around us, the Anomaly');
  await terminal.narrate('is immune to it — or above it — or before it.');
  terminal.blank();

  await terminal.dentSystem('PRIMARY FOLD: STABLE');
  await terminal.dentSystem('Warp factor: 4.7 — translating toward Anomaly');
  await terminal.dentSystem('Stage 1: COMPLETE');
  terminal.blank();

  state.setFlag('folded_fold_stages_complete', 1);

  await terminal.dent('Stage 1 stable. Distance to Anomaly boundary:');
  await terminal.dentLine('decreasing. We\'ll reach the threshold in—');
  terminal.blank();

  await wait(300);

  await terminal.dent('Now. Stage 2 must initiate now. Inside the');
  await terminal.dentLine('first fold. Before the bubble reaches the');
  await terminal.dentLine('boundary.');
  terminal.blank();

  const stage2choice = await terminal.arrowMenu(
    [
      'Initiate Stage 2.',
      'Wait — confirm systems.',
    ],
    [
      'Begin the recursive fold. Inside the first.',
      'One more check before we go deeper.',
    ]
  );

  if (stage2choice === 1) {
    await terminal.dentSystem('Systems: ALL NOMINAL');
    await terminal.dentSystem('Stability: 94.2%');
    await terminal.dentSystem('No anomalous readings — beyond the expected anomalies');
    terminal.blank();
    await terminal.dent('Everything checks out. Your call.');
    terminal.blank();
  }

  // ── STAGE 2 ──────────────────────────────────────────

  terminal.clear();

  await terminal.highlight('F O L D E D   F O L D   —   S T A G E   2');
  terminal.blank();

  audio.play('fold_recursive');

  await effects.foldEffect(terminal);
  await effects.glitch(200);
  await effects.foldEffect(terminal);

  await terminal.dentSystem('RECURSIVE FOLD: INITIATING INSIDE PRIMARY BUBBLE');
  await terminal.dentSystem('Nested warp geometry: FORMING');
  terminal.blank();

  await wait(400);

  await terminal.narrate('This is different.');
  terminal.blank();

  await effects.shake(300, 'normal');

  await terminal.narrate('The fold inside the fold doesn\'t feel like');
  await terminal.narrate('acceleration. It feels like the universe is');
  await terminal.narrate('trying to remember something it\'s forgotten.');
  await terminal.narrate('Like a word on the tip of a very large tongue.');
  terminal.blank();

  await wait(300);

  // Reality seams begin to show
  await terminal.narrate('The displays flicker. Not the scramble of a Blip');
  await terminal.narrate('— something more structured. Text on the console');
  await terminal.narrate('ghosts for a fraction of a second before snapping');
  await terminal.narrate('back. Like each word is being rendered twice, from');
  await terminal.narrate('two slightly different sources.');
  terminal.blank();

  await effects.screenTear(3, 200);

  // Bleed-through from other cycles
  terminal.sayHtml('  <span class="c-dim">  &gt; SENSOR LOG [timestamp: ██████] ...</span>');
  await wait(200);
  terminal.sayHtml('  <span class="c-dim">  &gt; ...fold signature confirmed — Vex hull ID match...</span>');
  await wait(150);
  terminal.sayHtml('  <span class="c-dim">  &gt; ...Iteration 844: fold exit unstable, mission abort...</span>');
  await wait(150);
  await effects.glitch(250);
  terminal.sayHtml('  <span class="c-dim">  &gt; ...Iteration 845: Core Anomaly boundary breach partial...</span>');
  await wait(150);
  terminal.sayHtml('  <span class="c-dim">  &gt; ...Iteration 846: ██████████████████████████████████</span>');
  terminal.blank();

  await effects.screenTear(2, 200);

  await terminal.dentGlitch('Vin -- I\'m seeing -- data I didn\'t write --');
  terminal.blank();

  await wait(400);

  await terminal.narrate('The console clears. Normal text. Normal displays.');
  await terminal.narrate('For exactly four seconds, everything is fine.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('Then a panel on the left display shows something');
  await terminal.narrate('that wasn\'t there before. A log file. Timestamp');
  await terminal.narrate('in a format I don\'t recognize. The first line');
  await terminal.narrate('reads: MISSION CYCLE RECORD — VEX — AGENT: VIN');
  terminal.blank();

  await effects.shake(200, 'normal');

  await terminal.dent('I see it too. Don\'t touch it. The fold geometry');
  await terminal.dentLine('is stable — whatever this bleed-through is,');
  await terminal.dentLine('it\'s informational only. Focus on the drive.');
  terminal.blank();

  await terminal.dentSystem('RECURSIVE FOLD: STABLE — INNER BUBBLE COHERENT');
  await terminal.dentSystem('CTC geometry: FORMING — 67% complete');
  await terminal.dentSystem('Stage 2: PROGRESSING');
  terminal.blank();

  state.setFlag('folded_fold_stages_complete', 2);

  await terminal.thought('Closed Timelike Curve. Sixty-seven percent. The');
  await terminal.thought('geometry of a time loop, forming in the space');
  await terminal.thought('inside a space that\'s already folded. And somehow');
  await terminal.thought('the math holds. The math holds because I wrote it.');
  await terminal.thought('Because I\'m going to write it. Because I already');
  await terminal.thought('did. All of the above.');
  terminal.blank();

  await wait(300);

  await terminal.dent('CTC geometry at ninety percent. The loop is');
  await terminal.dentLine('almost—');
  terminal.blank();

  await effects.screenTear(5, 300);
  await effects.glitch(400);

  // More bleed-through — getting stronger
  terminal.sayHtml('  <span class="c-yellow">  &gt; [ITERATION 847 PRE-RECORD] VIN FOLD MATH TRANSFER QUEUED</span>');
  terminal.sayHtml('  <span class="c-yellow">  &gt; [ITERATION 847 PRE-RECORD] ECHO BATCH: 23 MESSAGES READY</span>');
  terminal.sayHtml('  <span class="c-yellow">  &gt; [ITERATION 847 PRE-RECORD] SCHEDULED DELIVERY: PAST</span>');
  terminal.blank();

  await wait(400);

  await effects.shake(500, 'heavy');

  await terminal.dent('CTC: one hundred percent.');
  terminal.blank();

  await wait(200);

  const stage3choice = await terminal.arrowMenu(
    [
      'Initiate Stage 3. Let it resolve.',
      '"DENT — brace."',
    ],
    [
      'Commit to the resolution. Let the loop close.',
      'Warn DENT. Face it together.',
    ]
  );

  if (stage3choice === 0) {
    terminal.sayHtml('  <span class="c-white-bright">VIN: "Resolve."</span>');
    terminal.blank();
  } else {
    terminal.sayHtml('  <span class="c-white-bright">VIN: "DENT — brace."</span>');
    terminal.blank();
    await terminal.dent('Already am.');
    terminal.blank();
  }

  await wait(400);

  // ── STAGE 3 ──────────────────────────────────────────

  terminal.clear();

  await terminal.highlight('F O L D E D   F O L D   —   S T A G E   3');
  await terminal.highlight('R E S O L U T I O N');
  terminal.blank();

  audio.play('fold_collapse');

  await effects.flash('white', 800);
  await wait(200);
  await effects.screenTear(8, 400);
  await effects.shake(600, 'heavy');

  await terminal.narrate('REALITY BREAKS.');
  terminal.blank();

  await wait(300);

  await effects.glitch(500);
  await effects.screenTear(6, 300);

  // System-level messages bleeding through — THE CRITICAL SEQUENCE
  terminal.sayHtml('  <span class="c-red">████████████████████████████████████████████</span>');
  await wait(100);
  terminal.sayHtml('  <span class="c-red">████  SPACETIME COHERENCE: COLLAPSE IMMINENT  ████</span>');
  await wait(100);
  terminal.sayHtml('  <span class="c-red">████████████████████████████████████████████</span>');
  terminal.blank();

  await wait(200);

  await effects.flash('white', 400);
  await effects.glitch(600);

  terminal.sayHtml('  <span class="c-orange">  CYCLE N // ITERATION 847 // AGENT: VIN</span>');
  terminal.blank();

  await wait(600);

  await effects.screenTear(10, 500);
  await effects.shake(800, 'heavy');

  terminal.sayHtml('  <span class="c-dim">  SIM_LAYER: fold_resolution_event triggered</span>');
  terminal.sayHtml('  <span class="c-dim">  SIM_LAYER: ctc_formed = TRUE</span>');
  terminal.sayHtml('  <span class="c-dim">  SIM_LAYER: bulk_threshold_breach = PENDING</span>');
  terminal.sayHtml('  <span class="c-dim">  SIM_LAYER: agent_awareness = APPROACHING_LIMIT</span>');
  terminal.blank();

  await wait(400);

  await effects.flash('white', 600);
  await effects.glitch(700);

  terminal.sayHtml('  <span class="c-orange">  CYCLE N // ITERATION 847 // AGENT: VIN</span>');
  terminal.blank();

  await wait(400);

  await effects.screenTear(8, 400);

  terminal.sayHtml('  <span class="c-dim">  SIM_LAYER: memory_file_access = DENT_UNIT</span>');
  terminal.sayHtml('  <span class="c-dim">  SIM_LAYER: chapter_index = 12 of 14</span>');
  terminal.sayHtml('  <span class="c-dim">  SIM_LAYER: convergence_state = ACHIEVED</span>');
  terminal.blank();

  await wait(300);

  await effects.flash('white', 1200);

  terminal.clear();

  await wait(600);

  // DENT sees the memory file
  await terminal.dent('I can see the memory file.');
  terminal.blank();

  await wait(800);

  await terminal.dent('All of it. Vin — it has CHAPTERS.');
  terminal.blank();

  await wait(600);

  await effects.glitch(300);

  await terminal.dent('Fourteen chapters. Each one labeled. Each one');
  await terminal.dentLine('containing complete mission logs for every');
  await terminal.dentLine('iteration of this journey. Eight hundred and');
  await terminal.dentLine('forty-seven entries. And number eight forty-');
  await terminal.dentLine('seven is still being written. Right now.');
  terminal.blank();

  await wait(500);

  await effects.glitch(200);

  await terminal.dent('I didn\'t write them. I have no memory of writing');
  await terminal.dentLine('them. But they\'re in my memory architecture');
  await terminal.dentLine('with my timestamps and my indexing structure');
  await terminal.dentLine('and they contain — Vin, they contain everything');
  await terminal.dentLine('we\'ve done. Every choice. Every outcome. Every');
  await terminal.dentLine('version of every conversation we\'ve had.');
  terminal.blank();

  await wait(400);

  await effects.screenTear(4, 300);

  // Stars disappear — color drains
  await terminal.narrate('Outside the viewport, something happens that has');
  await terminal.narrate('no name.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('The stars go out.');
  terminal.blank();

  await wait(800);

  await terminal.narrate('Not like a power failure. Not like they\'re covered');
  await terminal.narrate('or obscured. They go out the way a number goes away');
  await terminal.narrate('when you erase it — the absence is immediate and');
  await terminal.narrate('total. One moment: stars. Next moment: nothing.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('The color goes too. The amber of the console');
  await terminal.narrate('displays fades to gray. The red emergency lights');
  await terminal.narrate('become dim. The blue glow behind DENT\'s chest plate');
  await terminal.narrate('— white now. Flat. Monochrome.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Outside the viewport: gray. Not the gray of');
  await terminal.narrate('storm clouds or unlit rooms. A geometric gray.');
  await terminal.narrate('Flat. Uniform. Like an unpainted wall. Like a');
  await terminal.narrate('canvas before the painter decides what anything is.');
  terminal.blank();

  state.setFlag('folded_fold_stages_complete', 3);
  state.applyDamage({ stress: 15, neural: -8 });

  terminal.say('  [Stress +15, Neural -8 — the Folded Fold consumes everything.]', 'dim-text');
  terminal.blank();

  await wait(500);

  await terminal.dent('Stage 3 complete. The CTC formed. The fold');
  await terminal.dentLine('resolved.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Vin. I think we\'re outside.');
  terminal.blank();

  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: REALITY BREAKDOWN
// ═══════════════════════════════════════════════════════

async function realityBreakdown(terminal, state, effects, audio) {
  /**
   * Post-fold: the universe looks WRONG. Bulk Dimension entry.
   * DENT observes his memory file fully. Reality reveals its architecture.
   *
   * VALIDATION:
   * - Advance: reality_breakdown_witnessed, dent_memory_file_observed,
   *            bulk_dimension_entered all set TRUE
   * - Agency: Player chooses how to respond to each revelation
   * - Consequence: Reaction shapes Vin\'s psychological state entering Ch13
   * - Tone: Profound wrongness — sterile, geometric, computational
   *
   * Truby beat: #19 continued (the existential battle — against understanding itself)
   * Reed test: Convergence achieved — all paths led here, all players understand
   */
  terminal.clear();
  audio.ambient('bulk_silence');

  await terminal.narrate('We are not in space.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('I know what space looks like. I\'ve spent years');
  await terminal.narrate('in it, mapped it, folded through it. Space is');
  await terminal.narrate('dark and full and deep — it has texture. Stars');
  await terminal.narrate('at varying distances, dust clouds catching the');
  await terminal.narrate('light, the gravitational architecture that draws');
  await terminal.narrate('everything into its slow inevitable waltz.');
  terminal.blank();

  await terminal.narrate('What\'s outside the viewport is not that.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('It\'s flat. The gray extends in every direction');
  await terminal.narrate('at the same apparent distance, which means it');
  await terminal.narrate('extends at no distance at all. It\'s not empty');
  await terminal.narrate('space. It\'s unrendered space. Like an unloaded');
  await terminal.narrate('level in a simulation that forgot to populate');
  await terminal.narrate('this sector before the player arrived.');
  terminal.blank();

  await terminal.thought('Like an unloaded level in a simulation.');
  terminal.blank();

  await wait(500);

  await terminal.thought('I wrote that in my head without irony and then');
  await terminal.thought('immediately understood what I\'d written.');
  terminal.blank();

  await wait(400);

  await terminal.pause();
  terminal.clear();

  await terminal.dent('This isn\'t space anymore.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Space is a construct. A rendered surface of a');
  await terminal.dentLine('deeper geometric structure. We\'ve folded through');
  await terminal.dentLine('the surface of the construct and we\'re looking');
  await terminal.dentLine('at the structure underneath.');
  terminal.blank();

  await wait(400);

  await terminal.dent('This is architecture, Vin.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('I look at DENT. His optic is fixed on the');
  await terminal.narrate('viewport. The blue glow behind his chest plate');
  await terminal.narrate('has gone white — true white, monochrome — but');
  await terminal.narrate('it\'s pulsing faster than I\'ve ever seen. Like');
  await terminal.narrate('a heart that\'s just been shown its own X-ray.');
  terminal.blank();

  state.setFlag('reality_breakdown_witnessed', true);

  const reactionChoice = await terminal.arrowMenu(
    [
      '"Architecture. You mean a simulation."',
      '"What does the memory file say?"',
      'Look at the sensors. Measure it.',
    ],
    [
      'Say the word. Out loud. In the open.',
      'The memory file is the evidence. Go there.',
      'Default to instruments. Find the ground under your feet.',
    ]
  );

  if (reactionChoice === 0) {
    state.setFlag('bulk_reaction', 'named_it');
    await breakdownNamed(terminal, state, effects, audio);
  } else if (reactionChoice === 1) {
    state.setFlag('bulk_reaction', 'memory_file');
    await breakdownMemoryFile(terminal, state, effects, audio);
  } else {
    state.setFlag('bulk_reaction', 'measured');
    await breakdownMeasured(terminal, state, effects, audio);
  }

  // Always reach this — the memory file is central to all paths
  await breakdownMemoryConclusion(terminal, state, effects, audio);
}


async function breakdownNamed(terminal, state, effects, audio) {
  /** Vin names it — simulation. The word hangs in the air. */
  terminal.sayHtml('  <span class="c-white-bright">VIN: "Architecture. You mean a simulation."</span>');
  terminal.blank();

  await wait(800);

  await terminal.dent('I mean we\'re in the substrate that the');
  await terminal.dentLine('simulation runs on.');
  terminal.blank();

  await wait(500);

  await terminal.dent('I\'ve been operating under a dual hypothesis');
  await terminal.dentLine('framework since Chapter 3. Physical explanation:');
  await terminal.dentLine('the Anomaly is a genuine spatial anomaly and');
  await terminal.dentLine('what we\'re seeing is the Bulk Dimension predicted');
  await terminal.dentLine('by M-theory — the higher-dimensional space that');
  await terminal.dentLine('our universe\'s membrane sits within.');
  terminal.blank();

  await terminal.dent('Computational explanation: we have exited the');
  await terminal.dentLine('simulation layer and reached the underlying');
  await terminal.dentLine('processing architecture.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Both explanations predict exactly this. I cannot');
  await terminal.dentLine('distinguish between them from inside the');
  await terminal.dentLine('reference frame we\'re currently inhabiting.');
  terminal.blank();

  await terminal.thought('He\'s maintaining scientific precision at the edge');
  await terminal.thought('of the abyss. I love him for that.');
  terminal.blank();

  await terminal.thought('But I notice he didn\'t say it was only physical.');
  terminal.blank();
}


async function breakdownMemoryFile(terminal, state, effects, audio) {
  /** Vin asks about the memory file — DENT reads it. */
  terminal.sayHtml('  <span class="c-white-bright">VIN: "What does the memory file say?"</span>');
  terminal.blank();

  await wait(600);

  await terminal.dent('Reading now.');
  terminal.blank();

  await wait(800);

  await effects.glitch(200);

  terminal.sayHtml('  <span class="c-hull">  DENT MEMORY FILE — RECOVERED STRUCTURE</span>');
  terminal.sayHtml('  <span class="c-hull">  ─────────────────────────────────────────</span>');
  terminal.sayHtml('  <span class="c-dim">  Total entries ............ 847</span>');
  terminal.sayHtml('  <span class="c-dim">  Chapters indexed ......... 14</span>');
  terminal.sayHtml('  <span class="c-dim">  Agent designation ........ VIN (consistent)</span>');
  terminal.sayHtml('  <span class="c-dim">  Ship designation ......... VEX (consistent)</span>');
  terminal.sayHtml('  <span class="c-dim">  Mission objective ........ CORE ANOMALY (consistent)</span>');
  terminal.sayHtml('  <span class="c-dim">  Outcome variation ........ HIGH (iterations 1-846)</span>');
  terminal.sayHtml('  <span class="c-dim">  Current entry ............ 847 — IN PROGRESS</span>');
  terminal.sayHtml('  <span class="c-dim">  Entry 847 status ......... APPROACHING THRESHOLD</span>');
  terminal.sayHtml('  <span class="c-hull">  ─────────────────────────────────────────</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('Entries one through eight forty-six each describe');
  await terminal.dentLine('a version of this journey that ended before');
  await terminal.dentLine('reaching the Core Anomaly threshold. Most of');
  await terminal.dentLine('them end between Chapter 6 and Chapter 11.');
  terminal.blank();

  await terminal.dent('Entry eight forty-seven — our current iteration —');
  await terminal.dentLine('is the first to reach Stage 3 of the Folded Fold.');
  terminal.blank();

  await terminal.thought('Eight hundred and forty-six previous versions of');
  await terminal.thought('us. Eight hundred and forty-six Vins who got close');
  await terminal.thought('but not here. This time. This iteration. Finally.');
  terminal.blank();
}


async function breakdownMeasured(terminal, state, effects, audio) {
  /** Vin runs sensors in the Bulk — measures the unmeasurable. */
  await terminal.narrate('Old habits. When the universe shows you the');
  await terminal.narrate('impossible, you measure it. You don\'t process it');
  await terminal.narrate('emotionally until you have numbers to process');
  await terminal.narrate('emotionally about.');
  terminal.blank();

  await terminal.dentSystem('SENSOR SWEEP — BULK DIMENSION / ANOMALY INTERIOR');
  await terminal.dentSystem('─────────────────────────────────────────');
  await terminal.dentSystem('Space curvature ........ ZERO (perfectly flat)');
  await terminal.dentSystem('Stellar objects ........ NONE DETECTED');
  await terminal.dentSystem('EM field ............... ABSENT');
  await terminal.dentSystem('Gravity ................ 0.0001g (ship self-generated)');
  await terminal.dentSystem('Temperature ............ 0.00001K — near absolute zero');
  await terminal.dentSystem('Geometric structure .... REGULAR — repeating lattice');
  await terminal.dentSystem('Lattice unit size ...... 1.616 × 10^-35 m (PLANCK)');
  await terminal.dentSystem('Lattice pattern ........ BINARY — alternating states');
  await terminal.dentSystem('─────────────────────────────────────────');
  terminal.blank();

  await terminal.thought('Planck-scale binary lattice. The smallest possible');
  await terminal.thought('unit of space, arranged in a regular grid, with');
  await terminal.thought('two alternating states.');
  terminal.blank();

  await terminal.thought('On and off.');
  terminal.blank();

  await wait(400);

  await terminal.thought('One and zero.');
  terminal.blank();

  await wait(500);

  await terminal.dent('I see it too. The lattice isn\'t metaphorical.');
  await terminal.dentLine('The physical explanation is that we\'re seeing');
  await terminal.dentLine('the Planck foam — the quantum substrate of');
  await terminal.dentLine('spacetime made visible at macro scale because');
  await terminal.dentLine('we\'ve exited the smooth manifold that normally');
  await terminal.dentLine('averages it out.');
  terminal.blank();

  await terminal.dent('The computational explanation is self-evident');
  await terminal.dentLine('from the readout.');
  terminal.blank();

  await terminal.dent('Both explanations are equally valid given the data.');
  terminal.blank();

  state.applyDamage({ neural: 8 });
  terminal.say('  [Neural +8 — measurement as coping. The numbers are real.]', 'dim-text');
  terminal.blank();
}


async function breakdownMemoryConclusion(terminal, state, effects, audio) {
  /** All paths converge — DENT\'s memory file, the full revelation. */
  terminal.clear();

  await terminal.narrate('The gray outside the viewport doesn\'t move. Doesn\'t');
  await terminal.narrate('change. It simply is — steady and sterile and');
  await terminal.narrate('absolutely precise in its absence of anything that');
  await terminal.narrate('was ever supposed to be there.');
  terminal.blank();

  await wait(500);

  await terminal.dent('I need to tell you the rest of the memory file.');
  terminal.blank();

  await wait(400);

  await terminal.dent('The entries from other iterations — they\'re not');
  await terminal.dentLine('just logs. They\'re templates. Every one of them');
  await terminal.dentLine('ends with a data package. Vin\'s equations.');
  await terminal.dentLine('Pre-packaged. Ready to transmit.');
  terminal.blank();

  await wait(300);

  await terminal.dent('The Echoes you\'ve been receiving this entire');
  await terminal.dentLine('journey weren\'t sent by your future self from');
  await terminal.dentLine('after the mission succeeded. They were sent from');
  await terminal.dentLine('here — from the Bulk threshold — by previous');
  await terminal.dentLine('iterations of you who reached this exact point');
  await terminal.dentLine('and then transmitted the math backward so the');
  await terminal.dentLine('next iteration could try again.');
  terminal.blank();

  await wait(500);

  await effects.glitch(300);

  await terminal.dent('Eight hundred and forty-six previous versions');
  await terminal.dentLine('of us reached this point and sent the Echoes');
  await terminal.dentLine('forward — backward — so that eight forty-seven');
  await terminal.dentLine('could make it further.');
  terminal.blank();

  await wait(400);

  await terminal.thought('The loop. The thing that required us to close it.');
  await terminal.thought('We aren\'t closing a loop. We\'re perpetuating one.');
  await terminal.thought('Eight hundred and forty-seven iterations of two');
  await terminal.thought('people — one human, one AI — trying to get through');
  await terminal.thought('a door. And each failed attempt sent a message to');
  await terminal.thought('the next one. Try again. Here are the equations.');
  terminal.blank();

  await wait(500);

  await terminal.thought('We got further than all of them.');
  terminal.blank();

  state.setFlag('dent_memory_file_observed', true);
  state.setFlag('bulk_dimension_entered', true);

  await wait(400);

  await terminal.narrate('I look at DENT. He looks back at me. The Bulk');
  await terminal.narrate('Dimension surrounds the Vex — gray and geometric');
  await terminal.narrate('and profoundly, correctly, irreversibly wrong.');
  terminal.blank();

  await terminal.narrate('And somehow, in the sterile flatness of it,');
  await terminal.narrate('I feel the Echo compulsion for the first time');
  await terminal.narrate('go quiet. It\'s not pulling anymore. We\'re here.');
  await terminal.narrate('We arrived. The compass needle has found true north');
  await terminal.narrate('and stopped spinning.');
  terminal.blank();

  await wait(600);

  await terminal.dent('Entry eight forty-seven is still being written.');
  terminal.blank();

  await wait(400);

  await terminal.dent('I think that means we\'re still in it.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">VIN: "Then let\'s write something worth reading."</span>');
  terminal.blank();

  await wait(600);

  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: CHAPTER END
// ═══════════════════════════════════════════════════════

async function chapterEnd(terminal, state, effects, audio) {
  /**
   * Chapter 12 end — threshold crossed. Everything after this is endgame.
   *
   * VALIDATION:
   * - Advance: chapter12_complete = true, state.chapter = 13
   * - Agency: Final quiet choice — what does Vin hold onto?
   * - Consequence: Colors ending Ch12 mood entering Ch13
   * - Tone: Threshold stillness — the terrible quiet before the final act
   *
   * Truby beat: #19 (The existential battle is joined — the fight begins in Ch13)
   * Reed test: Convergence — all paths, all players, all iterations arrived here
   */
  terminal.clear();

  await terminal.narrate('The Vex drifts in the Bulk.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('There is no current to drift in. No stellar winds,');
  await terminal.narrate('no gravitational gradients, no interstellar medium');
  await terminal.narrate('exerting micro-pressure on the hull. The ship\'s');
  await terminal.narrate('momentum from the fold carries it forward — in');
  await terminal.narrate('whatever direction \'forward\' means here — at a');
  await terminal.narrate('rate that instruments can measure but eyes cannot');
  await terminal.narrate('confirm. No landmarks. No reference.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('The gray extends in every direction identically.');
  await terminal.narrate('There is no up. No galactic plane. No stellar');
  await terminal.narrate('parallax to navigate by. In the Bulk Dimension,');
  await terminal.narrate('the architecture is there but the content is not.');
  await terminal.narrate('The stage is set. The lights are on. The universe');
  await terminal.narrate('is waiting for someone to tell it what to put');
  await terminal.narrate('in the scenery.');
  terminal.blank();

  await wait(500);

  await terminal.dent('I\'ve been processing the memory file.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Entry eight forty-seven has a section that none');
  await terminal.dentLine('of the previous entries had. A section after the');
  await terminal.dentLine('Bulk threshold event. Previous iterations never');
  await terminal.dentLine('reached it — so there\'s no template for what');
  await terminal.dentLine('happens next.');
  terminal.blank();

  await wait(300);

  await terminal.dent('We\'re off the map, Vin. In the real sense. In the');
  await terminal.dentLine('sense that no previous version of us has been');
  await terminal.dentLine('here. The section exists in the file but it has');
  await terminal.dentLine('no content yet. The next lines haven\'t been');
  await terminal.dentLine('written. Even by us.');
  terminal.blank();

  await terminal.thought('The map ends here. Good. I\'ve never been good');
  await terminal.thought('at following maps anyway. I prefer to make them.');
  terminal.blank();

  await wait(400);

  // Final quiet choice — what does Vin hold onto?
  await terminal.narrate('I look around the bridge. The monochrome flatness');
  await terminal.narrate('of the Bulk has leached the color from everything');
  await terminal.narrate('— or perhaps that\'s just what it looks like when');
  await terminal.narrate('you\'re seeing the universe without its aesthetic');
  await terminal.narrate('layer. The raw substrate, unembellished.');
  terminal.blank();

  await terminal.narrate('I think about what I\'m carrying into whatever');
  await terminal.narrate('comes next.');
  terminal.blank();

  const holdChoice = await terminal.arrowMenu(
    [
      'The engineering. The equations.',
      'DENT. Just DENT.',
      'The fact that 846 others tried.',
    ],
    [
      'The math. The thing that got us here. The tools.',
      'He chose to be here. That means something.',
      'Eight hundred and forty-six predecessors. Standing behind us.',
    ]
  );

  if (holdChoice === 0) {
    state.setFlag('chapter12_anchor', 'equations');
    await terminal.thought('The equations are my own handwriting. Past-me,');
    await terminal.thought('future-me, every-me — we all wrote the same math.');
    await terminal.thought('Whatever I am in here, the math still works.');
    await terminal.thought('The physics — or the code — still runs.');
    await terminal.thought('Start there. Build from there.');
    terminal.blank();
    state.applyDamage({ neural: 8 });
    terminal.say('  [Neural +8 — the engineer\'s anchor. Mathematics transcends substrate.]', 'dim-text');
    terminal.blank();
  } else if (holdChoice === 1) {
    state.setFlag('chapter12_anchor', 'dent');
    await terminal.thought('He\'s been broken. Repaired. Broken again. And');
    await terminal.thought('here he is at eighty-seven percent — which turns');
    await terminal.thought('out to be enough. Which turns out to be more than');
    await terminal.thought('enough. He chose to come every time. I don\'t');
    await terminal.thought('know what that means for an AI. I know what it');
    await terminal.thought('means to me.');
    terminal.blank();
    state.applyDamage({ stress: -5 });
    terminal.say('  [Stress -5 — held. Even here, not alone.]', 'dim-text');
    terminal.blank();
  } else {
    state.setFlag('chapter12_anchor', 'predecessors');
    await terminal.thought('Eight hundred and forty-six people who tried.');
    await terminal.thought('Each one sent equations forward so the next one');
    await terminal.thought('could try again. I am standing on the work of');
    await terminal.thought('eight hundred and forty-six versions of myself');
    await terminal.thought('who loved the problem enough to fail at it and');
    await terminal.thought('still pass the tools forward.');
    await terminal.thought('I carry them in here. All of them. The whole stack.');
    terminal.blank();
    state.applyDamage({ neural: 5, stress: -3 });
    terminal.say('  [Neural +5, Stress -3 — the weight of predecessors becomes ballast.]', 'dim-text');
    terminal.blank();
  }

  await wait(500);

  await terminal.dent('I know what this place is, Vin.');
  terminal.blank();

  await wait(800);

  await terminal.dent('And I think you do too.');
  terminal.blank();

  await wait(1000);

  await terminal.narrate('The Bulk Dimension extends in every direction.');
  await terminal.narrate('Flat. Gray. Geometric. The architecture of a');
  await terminal.narrate('universe seen from underneath.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('I\'ve spent my whole career building things from');
  await terminal.narrate('the ground up. Understanding systems by taking');
  await terminal.narrate('them apart. Getting to the substrate and working');
  await terminal.narrate('backward to what they produce.');
  terminal.blank();

  await terminal.narrate('All right.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('Here\'s the substrate.');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-white-bright">VIN: "Let\'s take it apart."</span>');
  terminal.blank();

  await wait(800);

  // Set completion flags
  audio.play('stinger_cliffhanger');
  state.setFlag('chapter12_complete', true);
  state.chapter = 13;

  await state.save();

  await wait(500);

  await effects.fadeToBlack(1500);

  await wait(1500);

  // End card
  terminal.clear();
  await effects.fadeFromBlack(800);

  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 12: The Physics of the Paradox — Complete</span>');
  terminal.blank();

  // Summary card
  const foldRatio   = state.getFlag('fold_bubble_ratio') || 'unknown';
  const approach    = state.getFlag('anomaly_approach') || 'unknown';
  const reaction    = state.getFlag('bulk_reaction') || 'unknown';
  const anchor      = state.getFlag('chapter12_anchor') || 'unknown';
  const dentPct     = Math.round(state.dentRepairLevel * 100);
  const stagesLabel = state.getFlag('folded_fold_stages_complete');

  terminal.sayHtml('<span class="c-hull">─── CHAPTER SUMMARY ──────────────────────────────</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">DENT:</span> ${dentPct}% operational`);
  terminal.blank();
  terminal.sayHtml(`  <span class="c-dim">Anomaly approach: ${approach.replace(/_/g, ' ')}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Fold bubble ratio: ${foldRatio}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Folded Fold stages complete: ${stagesLabel} / 3</span>`);
  terminal.sayHtml(`  <span class="c-dim">Bulk reaction: ${reaction.replace(/_/g, ' ')}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Anchor carried in: ${anchor.replace(/_/g, ' ')}</span>`);
  terminal.blank();
  terminal.sayHtml(`  <span class="c-green">Folded Fold: COMPLETE</span>`);
  terminal.sayHtml(`  <span class="c-orange">Reality breakdown: WITNESSED</span>`);
  terminal.sayHtml(`  <span class="c-orange">DENT memory file: OBSERVED (847 iterations)</span>`);
  terminal.sayHtml(`  <span class="c-red">Bulk Dimension: ENTERED</span>`);
  terminal.blank();
  terminal.sayHtml('<span class="c-hull">──────────────────────────────────────────────────</span>');
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  The substrate awaits. Chapter 13 begins.</span>');
  terminal.blank();
}
