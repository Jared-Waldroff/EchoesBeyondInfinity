/**
 * CHAPTER 1: DEAD IN THE WATER
 * The Vex is broken. Fix it. Find fuel. Get moving.
 *
 * Ported from scenes/chapter1.py — complete, faithful conversion.
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #4 (Inciting event — ship broken, must repair), #6 (Ally — DENT partnership deepens)
// Reed tests: Understanding, Strategy, Consequence
// 4-Point: Advances (ship systems, Core Anomaly lore), Agency (repair order, derelict vs asteroid, departure),
//   Consequence (fuel/DENT state/travel choice ripple to Ch2), Tone (Weir problem-solving, TARS humor)
export async function runChapter1(terminal, state, effects, audio) {
  if (!state.getFlag('assessment_complete')) {
    await assessmentPhase(terminal, state, effects, audio);
  }

  await repairSequence(terminal, state, effects, audio);
  await discoveryPhase(terminal, state, effects, audio);

  if (state.getFlag('refuel_choice') === 'derelict') {
    await derelictMission(terminal, state, effects, audio);
  } else {
    await asteroidMission(terminal, state, effects, audio);
  }

  await departureChoice(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// ACT 1: ASSESSMENT
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #4 (Inciting event — Vin sees the full scope of damage)
// Reed tests: Understanding (player learns ship state), Consequence (repair priorities set)
// 4-Point: Advances (ship status), Agency (dialogue choice), Consequence (sets repair phase), Tone (maintained)
async function assessmentPhase(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_dead_in_water');
  audio.play('hull_creak');

  await terminal.chapterTitle(1, 'DEAD IN THE WATER');

  await wait(1000);

  await terminal.narrate('The Vex drifts.');
  terminal.blank();
  await terminal.narrate('No thrust. No heading. Just momentum and the slow');
  await terminal.narrate("rotation of a ship that's forgotten which way is");
  await terminal.narrate('forward. Stars wheel past the cracked viewport in');
  await terminal.narrate('lazy spirals.');
  terminal.blank();
  await wait(500);

  await terminal.thought("So here's what I know now: my name is Vin. I'm a");
  await terminal.thought('physicist who built a device that folds spacetime.');
  await terminal.thought("I'm being hunted by people who don't like that.");
  await terminal.thought('And I need to reach something called the Core');
  await terminal.thought('Anomaly before the universe \u2014 or at least my part');
  await terminal.thought('of it \u2014 stops making sense.');
  terminal.blank();
  await terminal.thought("Also, I'm floating. Still.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // DENT's damage report
  await terminal.dent("Alright, Vin. I've finished the full diagnostic.");
  await terminal.dentGlitch('██ full dia-- diagnosti--');
  await terminal.dentLine('Sit down for this. Or float down. Whatever');
  await terminal.dentLine('counts in zero gravity.');
  terminal.blank();
  await wait(300);

  await terminal.dent("Actually, don't sit. The chair is bolted to the");
  await terminal.dentLine("floor and you're near the ceiling. Just... brace");
  await terminal.dentLine('yourself emotionally.');
  terminal.blank();

  await terminal.pause();

  // System-by-system breakdown
  terminal.sayHtml('<span class="c-hull">\u250C\u2500 <span class="c-orange">THE VEX</span> \u2014 FULL DIAGNOSTIC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('<span class="c-hull">\u2502</span>');
  terminal.systemLine('Gravity Drive', 'OFFLINE', 'c-red', 'Grav coils disconnected');
  terminal.systemLine('Life Support', 'CRITICAL', 'c-red-bright', `${state.lifeSupportLevel}% capacity`);
  terminal.systemLine('Sensor Array', 'OFFLINE', 'c-red', 'No scan capability');
  terminal.systemLine('Fold Drive', 'LOCKED', 'c-hull', `Need 15 cells, have ${state.nullReserves}`);
  terminal.systemLine('Hull Integrity', `${state.hull}%`, 'c-yellow', 'Structural damage');
  terminal.systemLine('D.E.N.T.', '30%', 'c-yellow', 'Right arm non-functional');
  terminal.sayHtml('<span class="c-hull">\u2502</span>');
  terminal.sayHtml('<span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('In summary: everything is broken.');
  terminal.blank();
  await wait(300);
  await terminal.dent('But \u2014 and this is the optimistic part \u2014');
  await terminal.dentLine("it's all fixable. Mostly. Probably.");
  terminal.blank();

  const choice = await terminal.showChoices([
    '"Walk me through it."',
    '"Which is the most urgent?"',
    '"How long before the SICs find us?"',
  ]);

  if (choice === 1) {
    await terminal.dent('Right. Four priorities.');
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent('Life support. You have approximately 6 hours');
    await terminal.dentLine('of breathable air at current capacity.');
    await terminal.dentLine("After that, you'll be breathing your own");
    await terminal.dentLine('optimism. Which is thin.');
    terminal.blank();
    await terminal.dent('But the gravity drive is the easiest fix,');
    await terminal.dentLine('so we might start there. Up to you.');
    terminal.blank();
  } else if (choice === 3) {
    await terminal.dent('Based on our last known position and standard');
    await terminal.dentLine('SIC pursuit protocols, I estimate 8 to 14');
    await terminal.dentLine('hours. Less if we got unlucky.');
    terminal.blank();
    await terminal.dent('So we should probably stop talking about it');
    await terminal.dentLine('and start fixing things.');
    terminal.blank();
  }

  // The repair list
  await terminal.dent("Here's what needs doing:");
  terminal.blank();
  terminal.sayHtml('  <span class="c-orange">1.</span> <span class="c-white-bright">Gravity Drive</span> <span class="c-dim">\u2014 Reconnect the grav coils in Engineering</span>');
  terminal.sayHtml('  <span class="c-orange">2.</span> <span class="c-white-bright">Life Support</span> <span class="c-dim">\u2014 Patch the O\u2082 recycler (6 hours of air left)</span>');
  terminal.sayHtml('  <span class="c-orange">3.</span> <span class="c-white-bright">My Arm</span> <span class="c-dim">\u2014 Help me fix my right arm (optional but useful)</span>');
  terminal.sayHtml('  <span class="c-orange">4.</span> <span class="c-white-bright">Sensor Array</span> <span class="c-dim">\u2014 Restore scanning so we can find fuel</span>');
  terminal.blank();

  await terminal.dent('Take them in whatever order you like.');
  await terminal.dentLine("I'll be your hands for anything that requires");
  await terminal.dentLine('two working arms. Which is most things.');
  terminal.blank();

  state.setFlag('assessment_complete', true);
  await state.save();

  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// ACT 2: REPAIRS
// ═══════════════════════════════════════════════════════

function getRepairStatus(state) {
  return [
    ['Gravity Drive', state.getFlag('gravity_online')],
    ['Life Support', state.getFlag('life_support_patched')],
    ["DENT's Arm (optional)", state.getFlag('dent_arm_repaired')],
    ['Sensor Array', state.getFlag('sensors_online')],
  ];
}

function allRepairsDone(state) {
  return (state.getFlag('gravity_online') &&
          state.getFlag('life_support_patched') &&
          state.getFlag('sensors_online'));
}

// VALIDATION
// Truby beats: #4 (Inciting event — hands-on survival), #6 (Ally — DENT cooperation in each repair)
// Reed tests: Strategy (repair order matters), Consequence (tool/arm state affects later scenes), Character (DENT bond)
// 4-Point: Advances (ship capability), Agency (repair order + method choices), Consequence (ripples to mission), Tone (maintained)
async function repairSequence(terminal, state, effects, audio) {
  while (!allRepairsDone(state)) {
    terminal.clear();

    // Show current repair status
    const repairs = getRepairStatus(state);
    terminal.repairProgressPanel(repairs);

    // Show status
    terminal.statusPanel(state);
    terminal.blank();

    // Build menu
    const actions = [];
    const actionKeys = [];

    if (!state.getFlag('gravity_online')) {
      actions.push('Fix Gravity Drive');
      actionKeys.push('gravity');
    }
    if (!state.getFlag('life_support_patched')) {
      actions.push('Patch Life Support');
      actionKeys.push('life_support');
    }
    if (!state.getFlag('dent_arm_repaired')) {
      actions.push('Help DENT with his arm');
      actionKeys.push('dent_arm');
    }
    if (!state.getFlag('sensors_online')) {
      actions.push('Restore Sensor Array');
      actionKeys.push('sensors');
    }

    actions.push('Check status');
    actionKeys.push('status');

    const idx = await terminal.arrowMenu(actions);
    const action = actionKeys[idx];

    if (action === 'gravity') {
      await repairGravity(terminal, state, effects, audio);
    } else if (action === 'life_support') {
      await repairLifeSupport(terminal, state, effects, audio);
    } else if (action === 'dent_arm') {
      await repairDentArm(terminal, state, effects, audio);
    } else if (action === 'sensors') {
      await repairSensors(terminal, state, effects, audio);
    } else if (action === 'status') {
      terminal.clear();
      terminal.statusPanel(state);
      terminal.blank();
      terminal.say(`  Life Support: ${state.lifeSupportLevel}%`, 'dim-text');
      terminal.say(`  Null: ${state.nullReserves} cells`, 'dim-text');
      terminal.say(`  DENT Repair: ${Math.round(state.dentRepairLevel * 100)}%`, 'dim-text');
      terminal.blank();
      await terminal.pause();
    }
  }
}


// ─── GRAVITY DRIVE ───────────────────────────────────

async function repairGravity(terminal, state, effects, audio) {
  terminal.clear();
  audio.play('wrench_clang');

  await terminal.narrate('Engineering. The gravity drive is a squat cylinder');
  await terminal.narrate('bolted to the floor \u2014 or what would be the floor');
  await terminal.narrate('if gravity existed. Three coils ring the housing,');
  await terminal.narrate('each the size of my forearm. Two are dark. One is');
  await terminal.narrate('flickering faintly.');
  terminal.blank();

  await terminal.dent('The grav coils have disconnected from the main bus.');
  await terminal.dentLine('Impact knocked them loose. You need to reseat');
  await terminal.dentLine('each one and lock it down.');
  terminal.blank();

  await terminal.dent("It's not complicated. It is, however, extremely");
  await terminal.dentGlitch('[STATIC]');
  await terminal.dentLine("awkward in zero gravity. I'll hold the housing");
  await terminal.dentLine('steady. You do the fiddly part.');
  terminal.blank();

  await terminal.pause();

  // Optional Tier 3: Technical readout on the grav drive panel
  let choice = await terminal.showChoices([
    'Get to work on the coils',
    "Check the drive's diagnostic panel first",
  ]);

  if (choice === 2) {
    await terminal.narrate('The diagnostic panel is cracked but readable.');
    terminal.blank();
    terminal.sayHtml('  <span class="c-hull">\u250C\u2500 [TECHNICAL LOG] GRAVITY DRIVE DIAGNOSTIC \u2500\u2500\u2500\u2510</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">MODEL: Alcubierre-Tanaka GD-7 (Modified)</span>    <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">COIL ARRAY: 3x Superconducting NbTi loops</span>   <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">OPERATING TEMP: 4.2K (helium-cooled)</span>         <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">MAX THRUST: 0.3g sustained (emergency)</span>       <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">POWER DRAW: 12 kW (coils) + 3 kW (cooling)</span>  <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">NOTE: Coils generate local gravitational</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">field via frame-dragging effect. NOT the</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">same as fold drive (negative energy). This</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">is positive-energy only \u2014 conventional</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">Lense-Thirring metric manipulation.</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">STATUS: 3/3 COILS DISCONNECTED</span>');
    terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
    terminal.blank();
    await terminal.thought('Frame-dragging. Rotating mass curves spacetime,');
    await terminal.thought('creating thrust. Elegant physics, crude engineering.');
    await terminal.thought('The fold drive bends space itself. This just');
    await terminal.thought('pushes you through it the old-fashioned way.');
    terminal.blank();
    await terminal.pause();
  }

  // Coil 1
  await terminal.narrate('First coil. I grip the connector and push it');
  await terminal.narrate('into the socket. The lack of gravity means every');
  await terminal.narrate('push sends me floating backward.');
  terminal.blank();

  await terminal.thought("Newton's third law: for every action, there is an");
  await terminal.thought("equal and opposite 'physicist bouncing off the wall.'");
  terminal.blank();

  choice = await terminal.showChoices([
    'Brace feet against the wall, push hard',
    'Have DENT hold me steady',
    'Use a tether from the workbench',
  ]);

  if (choice === 1) {
    await terminal.narrate('I wedge my feet against the bulkhead and shove.');
    await terminal.narrate('The coil seats with a satisfying click.');
    terminal.blank();
    await terminal.dent("One down. You've got a talent for this.");
    terminal.blank();
  } else if (choice === 2) {
    await terminal.narrate('DENT grabs my belt with his good hand. I push.');
    await terminal.narrate("The coil seats. DENT doesn't move an inch.");
    terminal.blank();
    await terminal.dent('Mag-feet. Very useful for not moving when');
    await terminal.dentLine("you don't want to.");
    terminal.blank();
  } else if (choice === 3) {
    await terminal.narrate('I clip a tether to the workbench strut and loop');
    await terminal.narrate('it around my waist. Crude but effective.');
    await terminal.narrate('The coil seats on the second try.');
    terminal.blank();
    await terminal.dent("Resourceful. I like that. Mostly because it");
    await terminal.dentLine("means I don't have to do it.");
    terminal.blank();
  }

  // Coil 2
  await terminal.narrate("Second coil. This one's bent slightly. The connector");
  await terminal.narrate("doesn't want to seat.");
  terminal.blank();

  await terminal.dent("You'll need to straighten the pin first.");
  await terminal.dentLine('Use the\u2014');
  terminal.blank();

  await terminal.narrate("I'm already bending it back with my thumb.");
  terminal.blank();

  await terminal.dent('...or your thumb. That works too.');
  terminal.blank();

  await terminal.narrate('Click. Two down.');
  terminal.blank();

  // Coil 3
  await terminal.narrate("Third coil \u2014 the flickering one. It's half-seated,");
  await terminal.narrate('sparking intermittently. Each spark makes me flinch.');
  terminal.blank();

  await terminal.thought("I know electricity doesn't care about my feelings,");
  await terminal.thought('but that spark feels personal.');
  terminal.blank();

  choice = await terminal.showChoices([
    'Push through the sparking and seat it',
    'Kill power to the coil first, then seat it',
  ]);

  if (choice === 1) {
    await terminal.narrate('I grab the coil. It sparks. I push. It sparks more.');
    await terminal.narrate('My hand goes numb for a second.');
    terminal.blank();
    await terminal.narrate('Click.');
    terminal.blank();
    state.applyDamage({ health: -3 });
    await terminal.thought("That'll leave a mark. But it's in.");
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent("Smart. I'll cut power to the bus for ten");
    await terminal.dentLine('seconds. Go fast.');
    terminal.blank();
    await terminal.narrate('Power drops. Darkness for a moment. I find the');
    await terminal.narrate('coil by touch, seat it, lock it down.');
    terminal.blank();
    await terminal.narrate('Click.');
    terminal.blank();
    await terminal.thought("Clean. No sparks. I'm learning.");
    terminal.blank();
  }

  // GRAVITY RESTORE
  audio.play('gravity_restore');

  await terminal.dent('All three coils seated. Initializing gravity drive.');
  terminal.blank();
  await wait(500);

  await terminal.dentSystem('GRAVITY DRIVE .......... INITIALIZING');
  await wait(300);
  await terminal.dentSystem('CALIBRATING ............ 0.3g');
  await wait(300);
  await terminal.dentSystem('ENGAGING ............... NOW');
  terminal.blank();
  await wait(500);

  // The comedy beat
  await terminal.narrate('There\'s a hum. Low. Building.');
  terminal.blank();
  await terminal.narrate('Then gravity remembers it exists.');
  terminal.blank();
  await wait(300);

  await terminal.highlight('Everything falls.');
  terminal.blank();

  await terminal.narrate('Tools. Debris. A floating protein bar. A loose');
  await terminal.narrate('panel cover. A datapad. Me.');
  terminal.blank();

  await terminal.narrate('I hit the floor shoulder-first. Something clatters');
  await terminal.narrate('onto my back. Something else lands on that. I am');
  await terminal.narrate('briefly the bottom of a very small, very painful');
  await terminal.narrate('pile of ship components.');
  terminal.blank();

  await wait(500);

  await terminal.narrate("DENT stands perfectly still. His mag-feet didn't");
  await terminal.narrate('even shift.');
  terminal.blank();

  await terminal.dent('Gravity restored. Everything that was floating');
  await terminal.dentLine('is now not floating. Including you.');
  terminal.blank();
  await wait(300);
  await terminal.dent('Sorry about your... everything.');
  terminal.blank();

  state.applyDamage({ health: -5, stress: -5 });
  state.setFlag('gravity_online', true);
  state.gravity = true;

  await terminal.thought('Ow. But at least my feet are on something solid.');
  await terminal.thought("I'll call that progress.");
  terminal.blank();

  // ─── Subtle simulation clue #1: object in wrong position ───
  await terminal.narrate("I pick myself up. Something's wrong.");
  terminal.blank();
  await terminal.narrate('The bolt. The one I caught floating in the dark');
  await terminal.narrate('during the Cold Boot. I left it on the workbench.');
  await terminal.narrate("I'm certain of that.");
  terminal.blank();
  await terminal.narrate("It's on the floor. By the door. Six meters from");
  await terminal.narrate('where I put it.');
  terminal.blank();
  await terminal.thought("Gravity pulled everything down. That's all.");
  await terminal.thought('Things scatter when they fall.');
  terminal.blank();
  await terminal.thought("But a bolt doesn't roll uphill from a workbench");
  await terminal.thought('to a doorway.');
  terminal.blank();
  await terminal.thought('Does it?');
  terminal.blank();

  terminal.say(`  [Gravity Drive: ONLINE | HP: ${state.health}% | Stress: ${state.stress}%]`, 'dim-text');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ─── LIFE SUPPORT ────────────────────────────────────

async function repairLifeSupport(terminal, state, effects, audio) {
  terminal.clear();
  audio.play('life_support_hum');

  if (state.getFlag('gravity_online')) {
    await terminal.narrate('The O\u2082 recycler is tucked behind a panel in the');
    await terminal.narrate('corridor between Engineering and Quarters. I have');
    await terminal.narrate('to lie on my back to reach it \u2014 which is at least');
    await terminal.narrate('possible now that gravity is a thing again.');
  } else {
    await terminal.narrate('The O\u2082 recycler is tucked behind a panel in the');
    await terminal.narrate('corridor between Engineering and Quarters. Without');
    await terminal.narrate("gravity, I'm wedging myself against the ceiling to");
    await terminal.narrate('reach it. This is undignified.');
  }
  terminal.blank();

  await terminal.dent("The recycler's main filter is cracked. The Blip");
  await terminal.dentLine("sheared it along the mounting bracket.");
  await terminal.dentGlitch('██ sor-- recalibr--');
  await terminal.dentLine("Good news: it's a mechanical fix, not an");
  await terminal.dentLine('electronic one.');
  terminal.blank();

  await terminal.dent('Bad news: the bracket is behind three other');
  await terminal.dentLine("components that don't want to move.");
  terminal.blank();

  const hasToolkit = state.hasItem('Micro Toolkit');

  if (hasToolkit) {
    await terminal.narrate('The Micro Toolkit from the workbench has exactly');
    await terminal.narrate('the right adaptor for this. Lucky.');
    terminal.blank();
    await terminal.thought('Or not lucky. Past-me probably put it there for');
    await terminal.thought('exactly this scenario. Thanks, past-me.');
    terminal.blank();

    await terminal.narrate('I loosen the three components, swap the cracked');
    await terminal.narrate('filter for a spare from the maintenance kit, and');
    await terminal.narrate('bolt everything back. Clean job.');
    terminal.blank();

    await terminal.dent('Nice work. Filter replaced. Recycler capacity');
    await terminal.dentLine('climbing.');
    terminal.blank();

    state.lifeSupportLevel = 78;
    state.applyDamage({ neural: 5, stress: -10 });
  } else {
    await terminal.narrate('Without proper tools, this is going to be messy.');
    await terminal.narrate('I use the heel of my palm to jam the mounting');
    await terminal.narrate('bracket sideways. It shifts a millimeter.');
    terminal.blank();

    await terminal.thought('This is the part where a lesser physicist would');
    await terminal.thought("give up. I am also a lesser physicist but I'm");
    await terminal.thought('running out of air, so.');
    terminal.blank();

    await terminal.narrate('Twenty minutes. Blood on my knuckles. But the');
    await terminal.narrate('cracked filter comes out and I patch it with sealant');
    await terminal.narrate("from a ration kit. It's not pretty but it holds.");
    terminal.blank();

    await terminal.dent('Functional. Barely. The patch will hold for');
    await terminal.dentLine('maybe ten days before the sealant degrades.');
    await terminal.dentLine('But ten days is ten days.');
    terminal.blank();

    state.lifeSupportLevel = 54;
    state.applyDamage({ health: -3, neural: 3, stress: -8 });
  }

  // The relief moment
  await wait(500);
  await terminal.narrate("There's a sound. Subtle. A soft hiss as the recycler");
  await terminal.narrate("spins up to capacity. The air \u2014 I hadn't noticed how");
  await terminal.narrate('stale it was until now. Until this breath.');
  terminal.blank();

  await terminal.thought('Oxygen. Amazing what you take for granted until');
  await terminal.thought('you calculate how many hours of it you have left.');
  terminal.blank();

  await terminal.dent('O\u2082 recycler patched. You now have approximately');
  if (hasToolkit) {
    await terminal.dentLine('6 days of breathable air instead of 6 hours.');
  } else {
    await terminal.dentLine('4 days of breathable air instead of 6 hours.');
  }
  await terminal.dentLine("I'd call that a win.");
  terminal.blank();

  state.setFlag('life_support_patched', true);

  terminal.say(`  [Life Support: ${state.lifeSupportLevel}% | Neural: ${state.neural}% | Stress: ${state.stress}%]`, 'dim-text');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ─── DENT ARM REPAIR ─────────────────────────────────

async function repairDentArm(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_dent');
  audio.play('dent_repair');

  await terminal.dent('This is... slightly embarrassing.');
  terminal.blank();
  await wait(300);
  await terminal.dent("My right arm's actuator is seized. The servo");
  await terminal.dentLine('housing cracked in the Blip and the lubricant');
  await terminal.dentLine("leaked out. I can't fix it alone because I");
  await terminal.dentLine('need two hands to fix one hand.');
  terminal.blank();

  await terminal.dent('Which is, if you think about it, a deeply');
  await terminal.dentLine('unfair design flaw.');
  terminal.blank();

  await terminal.narrate("DENT extends his damaged arm. It's visibly wrong \u2014");
  await terminal.narrate('the plating is mismatched, the joints stiff. The');
  await terminal.narrate('welding torch attachment on the end sparks weakly');
  await terminal.narrate('and dies.');
  terminal.blank();

  let choice = await terminal.showChoices([
    '"Tell me what to do."',
    '"How did your arm end up with mismatched parts?"',
    '"Will this hurt? Do you feel pain?"',
  ]);

  if (choice === 1) {
    await terminal.dent('I need you to hold the servo housing open while');
    await terminal.dentLine('I re-seat the actuator and re-lubricate the');
    await terminal.dentLine('joint. Simple in theory.');
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent("I've been repaired approximately 47 times.");
    await terminal.dentLine('Not always with matching parts. You work with');
    await terminal.dentLine('what you have. One arm is from a mining rig.');
    await terminal.dentLine('The other is from a medical drone.');
    terminal.blank();
    await terminal.dent("I'm what engineers call 'eclectic.'");
    await terminal.dentLine("Everyone else calls it 'wrong.'");
    terminal.blank();
  } else if (choice === 3) {
    await terminal.dent('Define pain.');
    terminal.blank();
    await wait(300);
    await terminal.dent('I receive error signals. My priority queue flags');
    await terminal.dentLine("them as 'undesirable.' Whether that's 'pain'");
    await terminal.dentLine("is a philosophical question I don't have time");
    await terminal.dentLine("for because my arm doesn't work.");
    terminal.blank();
  }

  // The repair process — interactive
  await terminal.pause();
  terminal.clear();

  await terminal.narrate('DENT sits on the engineering bench \u2014 or rather,');
  await terminal.narrate('his mag-feet lock to the floor and he arranges');
  await terminal.narrate('himself into a sitting-adjacent position.');
  terminal.blank();

  await terminal.narrate("I grip the servo housing. It's warm. His systems");
  await terminal.narrate('run hot in the damaged sections.');
  terminal.blank();

  await terminal.dent("Okay. I'm going to disengage the actuator lock.");
  await terminal.dentLine('When I do, the arm will go limp. Hold the');
  await terminal.dentLine('housing open. Ready?');
  terminal.blank();

  choice = await terminal.showChoices([
    '"Ready."',
    '"Define \'limp.\'"',
  ]);

  if (choice === 2) {
    await terminal.dent('Like a dead fish. But heavier. And made of');
    await terminal.dentLine('titanium alloy.');
    terminal.blank();
    await terminal.dent('Ready now?');
    terminal.blank();
  }

  await terminal.narrate('Click. The arm drops. I catch the housing before');
  await terminal.narrate('it swings shut.');
  terminal.blank();

  audio.play('weld_spark');

  await terminal.narrate('DENT works with his good hand \u2014 re-seating the');
  await terminal.narrate('actuator, applying lubricant from a tube he had');
  await terminal.narrate('magnetically stored on his chest plate. His');
  await terminal.narrate('movements are precise. Mechanical. Obviously.');
  terminal.blank();

  await terminal.dent("Almost. Hold it \u2014 there. Don't move.");
  terminal.blank();

  await terminal.narrate("A spark. His welding torch \u2014 the one on the broken");
  await terminal.narrate("arm \u2014 fires briefly. He's welding his own arm while");
  await terminal.narrate('I hold it open. The heat is immediate.');
  terminal.blank();

  await terminal.thought("This is the strangest trust exercise I've ever");
  await terminal.thought('been part of. Probably.');
  terminal.blank();

  await terminal.dent('Done.');
  terminal.blank();
  await wait(300);

  await terminal.narrate('The arm twitches. Then rotates at the shoulder.');
  await terminal.narrate('The fingers flex, one by one. The welding torch');
  await terminal.narrate('fires \u2014 a clean, steady flame this time.');
  terminal.blank();

  await terminal.dent("Oh. Oh, that's better.");
  terminal.blank();
  await wait(300);

  await terminal.narrate('DENT opens and closes his repaired hand several');
  await terminal.narrate('times. The movement is smooth. His large optic');
  await terminal.narrate('brightens slightly.');
  terminal.blank();

  await terminal.dent('Full mobility restored. Welding torch operational.');
  await terminal.dentLine('Grip strength at 94%.');
  terminal.blank();
  await wait(300);

  await terminal.dent("You know, most people wouldn't bother fixing");
  await terminal.dentLine("a robot's arm when there's a ship to repair.");
  terminal.blank();

  choice = await terminal.showChoices([
    '"You\'re not just a robot, DENT."',
    '"I need you at full capacity."',
    '"Don\'t make it weird."',
  ]);

  if (choice === 1) {
    await terminal.dent('...');
    terminal.blank();
    await wait(500);
    await terminal.dent("I'm going to file that under 'things to");
    await terminal.dentLine("process later' and move on before I say");
    await terminal.dentLine('something sentimental.');
    terminal.blank();
    await terminal.dent('Thank you, Vin.');
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent('Practical. I appreciate that.');
    await terminal.dentLine('Two working arms means I can actually help');
    await terminal.dentLine('with repairs instead of supervising them.');
    terminal.blank();
    await terminal.dent('Which I was doing very well, for the record.');
    terminal.blank();
  } else if (choice === 3) {
    await terminal.dent("Weird is my default setting. I'll try to");
    await terminal.dentLine("recalibrate to merely 'awkward.'");
    terminal.blank();
  }

  state.setFlag('dent_arm_repaired', true);
  state.dentRepairLevel = 0.5;
  state.applyDamage({ stress: -5 });

  terminal.say("  [DENT Repair: 50% | DENT's arm is fully functional]", 'dim-text');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ─── SENSOR ARRAY ────────────────────────────────────

async function repairSensors(terminal, state, effects, audio) {
  terminal.clear();
  audio.play('sensor_boot');

  await terminal.narrate('The sensor room. The antenna housing fills the');
  await terminal.narrate('ceiling \u2014 two meters across, trailing fourteen data');
  await terminal.narrate('cables in color-coded bundles to the processing');
  await terminal.narrate('rack below. The main processing unit has a crack');
  await terminal.narrate('running down its housing.');
  terminal.blank();

  if (state.getFlag('dent_arm_repaired')) {
    await terminal.dent('With both arms working, I can handle the heavy');
    await terminal.dentLine('lifting here. You focus on the software side.');
    terminal.blank();
    await terminal.narrate("DENT peels back the processing unit's housing with");
    await terminal.narrate('both hands \u2014 smoothly, confidently. The difference');
    await terminal.narrate('is obvious.');
    terminal.blank();
  } else {
    await terminal.dent("I'll hold the housing with my good arm. You'll");
    await terminal.dentLine('need to handle the internals. Carefully.');
    terminal.blank();
    await terminal.narrate("DENT braces the housing one-handed. It's not ideal");
    await terminal.narrate('\u2014 the housing shifts every time I touch something');
    await terminal.narrate('inside.');
    terminal.blank();
  }

  await terminal.dent('The sensor array runs through three subsystems.');
  await terminal.dentLine('Passive scan, active scan, and deep field.');
  await terminal.dentGlitch('deep fi-- [REBOOT] --eld.');
  await terminal.dentLine("We're not getting deep field back \u2014 that antenna");
  await terminal.dentLine('is physically damaged. But passive and active');
  await terminal.dentLine('should be recoverable.');
  terminal.blank();

  // Repair steps
  await terminal.narrate("I trace the circuit paths. The passive scanner's");
  await terminal.narrate("amplifier is blown \u2014 but there's a backup chip on");
  await terminal.narrate('the board. I swap them.');
  terminal.blank();

  await terminal.dentSystem('PASSIVE SCAN .......... RECOVERING');
  await wait(300);

  await terminal.narrate('The active scanner needs a power reroute. I splice');
  await terminal.narrate('two cables together \u2014 not elegant, but functional.');
  terminal.blank();

  if (state.getFlag('dent_arm_repaired')) {
    await terminal.dent("I'll solder that splice. Hold still.");
    terminal.blank();
    await terminal.narrate("DENT's welding torch fires \u2014 precise, controlled.");
    await terminal.narrate('The splice holds solid.');
    terminal.blank();
  } else {
    await terminal.narrate('I twist the wires together and wrap them in');
    await terminal.narrate("insulation tape. It'll work. For a while.");
    terminal.blank();
  }

  await terminal.dentSystem('ACTIVE SCAN ........... RECOVERING');
  await wait(300);

  await terminal.narrate('I reboot the processing unit. It takes thirty');
  await terminal.narrate('seconds. The longest thirty seconds.');
  terminal.blank();

  await wait(1000);

  await terminal.dentSystem('SENSOR ARRAY .......... PARTIAL ONLINE');
  await terminal.dentSystem('PASSIVE SCAN .......... ACTIVE');
  await terminal.dentSystem('ACTIVE SCAN ........... ACTIVE (LIMITED)');
  await terminal.dentSystem('DEEP FIELD ............ OFFLINE (HARDWARE)');
  terminal.blank();

  await wait(500);

  await terminal.dent("We've got eyes. Not great eyes, but eyes.");
  await terminal.dentLine('I can scan local space out to about 200,000');
  await terminal.dentLine("kilometers. Beyond that, we're blind.");
  terminal.blank();

  state.setFlag('sensors_online', true);
  state.applyDamage({ neural: 3 });

  terminal.say(`  [Sensor Array: PARTIAL ONLINE | Neural: ${state.neural}%]`, 'dim-text');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// ACT 3: THE DISCOVERY
// ═══════════════════════════════════════════════════════

async function discoveryPhase(terminal, state, effects, audio) {
  terminal.clear();
  audio.play('sensor_boot');

  await terminal.narrate('The sensor display flickers to life. Data streams');
  await terminal.narrate('across the screen \u2014 star positions, radiation');
  await terminal.narrate("levels, gravitational fields. DENT's optic dims");
  await terminal.narrate('as he processes.');
  terminal.blank();

  await wait(1000);

  await terminal.dent("Vin. I've got something.");
  terminal.blank();
  await wait(500);

  await terminal.dent('Two somethings, actually.');
  terminal.blank();

  // The options
  terminal.separator();
  terminal.blank();

  await terminal.dent("First: I'm detecting a vessel. 140,000 klicks,");
  await terminal.dentLine('bearing two-seven-zero. No power signatures.');
  await terminal.dentLine('No life signs. Folder-class hull profile.');
  terminal.blank();

  if (state.getFlag('dent_arm_repaired')) {
    await terminal.dent("Which is either very safe or very not.");
    await terminal.dentLine("I'm leaning toward 'very not.'");
  } else {
    await terminal.dent('No power. No life. Which is either very');
    await terminal.dentLine('safe or very not.');
  }
  terminal.blank();

  await terminal.dent('Second: a dense asteroid approximately 90,000');
  await terminal.dentLine('klicks, bearing zero-four-five. Spectral analysis');
  await terminal.dentLine('shows high concentrations of null-resonant');
  await terminal.dentLine('particulate in the surface layers.');
  terminal.blank();

  await terminal.dent('Raw null. Unrefined, but usable if we');
  await terminal.dentLine('can harvest it.');
  terminal.blank();

  terminal.separator();
  terminal.blank();

  await terminal.dent('Both could get us fueled. Different risks,');
  await terminal.dentLine('different rewards.');
  terminal.blank();

  // The choice
  terminal.sayHtml('  <span class="c-orange">OPTION A:</span> <span class="c-white-bright">Derelict Folder Vessel</span>');
  terminal.say('    Distance: 140,000 km | Risk: Unknown defenses, structural instability', 'dim-text');
  terminal.say('    Reward: Refined null canisters (if any), Folder intel', 'dim-text');
  terminal.blank();
  terminal.sayHtml('  <span class="c-yellow">OPTION B:</span> <span class="c-white-bright">Null Energy Asteroid</span>');
  terminal.say('    Distance: 90,000 km | Risk: EVA hazards, unstable gravity pockets', 'dim-text');
  terminal.say('    Reward: Raw null (needs processing), faster approach', 'dim-text');
  terminal.blank();

  let choice = await terminal.showChoices([
    ['The derelict.', 'A dead Folder ship might have exactly what we need.'],
    ['The asteroid.', 'Closer. Simpler. Less chance of something shooting at us.'],
    ['"DENT, what do you think?"', ''],
  ]);

  if (choice === 3) {
    if (state.getFlag('dent_arm_repaired')) {
      await terminal.dent('Honestly? The asteroid is safer. Known');
      await terminal.dentLine('variables. Physics I understand.');
      terminal.blank();
      await terminal.dent('But that derelict... a Folder ship might have');
      await terminal.dentLine('information. About the Core Anomaly. About');
      await terminal.dentLine("what we're heading into.");
      terminal.blank();
      await terminal.dent("Your call, Vin. I'll follow either way.");
      terminal.blank();
    } else {
      await terminal.dent('The asteroid is closer and less likely');
      await terminal.dentLine('to contain automated defense systems.');
      await terminal.dentLine('I vote asteroid.');
      terminal.blank();
      await terminal.dent("But you're the pilot. Allegedly.");
      terminal.blank();
    }

    choice = await terminal.showChoices([
      ['The derelict.', ''],
      ['The asteroid.', ''],
    ]);
  }

  if (choice === 1) {
    state.setFlag('refuel_choice', 'derelict');
    await terminal.dent("The derelict it is. I'll plot an intercept");
    await terminal.dentLine("course. Gravity drive only \u2014 we can't afford");
    await terminal.dentLine('to burn null getting there.');
    terminal.blank();
    await terminal.thought('A dead Folder ship. Floating in the middle of');
    await terminal.thought('nowhere. No power. No life signs.');
    await terminal.thought("This is either very smart or the opening scene");
    await terminal.thought("of every horror vid I've ever watched.");
    terminal.blank();
  } else {
    state.setFlag('refuel_choice', 'asteroid');
    await terminal.dent('Asteroid it is. Closer, simpler.');
    await terminal.dentLine('Plotting approach on gravity drive.');
    terminal.blank();
    await terminal.thought("Mining null from an asteroid. In a");
    await terminal.thought("damaged spacesuit. With a physicist's hands.");
    await terminal.thought('What could possibly go wrong?');
    terminal.blank();
  }

  // Travel to destination
  audio.play('gravity_drive');

  await terminal.narrate('The gravity drive hums to life. Not a fold \u2014 just');
  await terminal.narrate('thrust. Slow, steady, old-fashioned momentum. The');
  await terminal.narrate('Vex shudders and begins to move.');
  terminal.blank();

  await terminal.dent('ETA: approximately four hours. I recommend you');
  await terminal.dentLine('eat something. And maybe practice looking');
  await terminal.dentLine('confident.');
  terminal.blank();

  await state.save();
  await terminal.pause();

  // Time skip
  terminal.clear();
  terminal.say('  . . .', 'dim-text');
  terminal.blank();
  terminal.say('  Four hours later.', 'dim-text');
  terminal.blank();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// ACT 4A: DERELICT MISSION
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #4 (Inciting event — derelict reveals SIC threat scope), #6 (Ally — DENT as protector)
// Reed tests: Understanding (derelict context), Strategy (turret approach), Consequence (null + bypass + lore)
// 4-Point: Advances (Core Anomaly lore, Fuel Bypass), Agency (exploration + turret choices), Consequence (items/stats), Tone (maintained)
async function derelictMission(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('derelict_ambient');

  await terminal.narrate('It emerges from the dark like a held breath.');
  terminal.blank();
  await terminal.narrate('The derelict. A Folder-class vessel. Hundred forty');
  await terminal.narrate('meters, bow to stern \u2014 roughly twice The Vex.');
  await terminal.narrate('Angular. Deliberate. The kind of ship that was');
  await terminal.narrate('designed to look like it meant business. Now it');
  await terminal.narrate('drifts, lightless, rotating slowly on its long axis.');
  terminal.blank();

  await terminal.narrate('One side is scorched black. Something hit this ship');
  await terminal.narrate('too. Something familiar.');
  terminal.blank();

  await terminal.thought("Scrambler damage. The same kind that's on The Vex.");
  await terminal.thought('The SICs hit this ship too.');
  terminal.blank();

  await terminal.dent('Folder Space Vessel. Designation unknown \u2014 the hull');
  await terminal.dentLine('markings are burned off. No power. No heat.');
  await terminal.dentLine('No movement of any kind.');
  terminal.blank();

  await terminal.dent("I'm detecting a docking collar on the port side.");
  await terminal.dentLine('Compatible with ours. Lucky.');
  terminal.blank();

  let choice = await terminal.showChoices([
    '"Bring us in."',
    '"Scan it one more time."',
  ]);

  if (choice === 2) {
    await terminal.dent('Scanning.');
    terminal.blank();
    await wait(500);
    await terminal.dentSystem('THERMAL: NEGATIVE');
    await terminal.dentSystem('ELECTROMAGNETIC: NEGATIVE');
    await terminal.dentSystem('BIOSIGNS: NEGATIVE');
    await terminal.dentSystem('ACTIVE SYSTEMS: NEGATIVE');
    terminal.blank();
    await terminal.dent("It's dead, Vin. As dead as a ship gets.");
    terminal.blank();
    await wait(300);
    if (state.getFlag('dent_arm_repaired')) {
      await terminal.dent('Which, historically, is exactly when things');
      await terminal.dentLine("stop being dead. But sure. Let's dock.");
    } else {
      await terminal.dent('Bringing us in.');
    }
    terminal.blank();
  }

  // Docking sequence
  audio.play('airlock_cycle');

  await terminal.narrate('The Vex nudges forward. A gentle bump. The docking');
  await terminal.narrate('collar engages \u2014 magnetic seals lock, atmospheric');
  await terminal.narrate("equalization begins. The derelict's airlock is");
  await terminal.narrate('unpowered, so DENT cranks it open manually.');
  terminal.blank();

  await terminal.dent('Atmosphere is... present. Thin. Cold. Breathable');
  await terminal.dentLine('for maybe an hour if the recycler is dead.');
  await terminal.dentLine('Which it is.');
  terminal.blank();

  await terminal.dent('Stay close. And if anything moves, run.');
  terminal.blank();

  await terminal.pause();

  // Derelict exploration
  await derelictExplore(terminal, state, effects, audio);
}


async function derelictExplore(terminal, state, effects, audio) {
  let current = 'airlock';
  const visited = {
    airlock: true,
    corridor: false,
    d_bridge: false,
    d_engineering: false,
    d_cargo: false,
  };
  let foundNull = false;

  const roomNames = {
    airlock: 'Airlock',
    corridor: 'Main Corridor',
    d_bridge: 'Bridge',
    d_engineering: 'Engineering',
    d_cargo: 'Cargo Bay',
  };

  const connections = {
    airlock: ['corridor'],
    corridor: ['airlock', 'd_bridge', 'd_engineering', 'd_cargo'],
    d_bridge: ['corridor'],
    d_engineering: ['corridor'],
    d_cargo: ['corridor'],
  };

  const roomFuncs = {
    airlock: derelictAirlock,
    corridor: derelictCorridor,
    d_bridge: derelictBridge,
    d_engineering: derelictEngineering,
    d_cargo: derelictCargo,
  };

  terminal.clear();
  terminal.derelictMap(current);
  await derelictAirlock(terminal, state, effects, audio, true);

  while (!foundNull) {
    const actions = [];
    const actionKeys = [];

    for (const dest of connections[current]) {
      actions.push(`Go to ${roomNames[dest]}`);
      actionKeys.push(['go', dest]);
    }

    actions.push('Look around');
    actionKeys.push(['look', current]);

    actions.push('Map');
    actionKeys.push(['map', null]);

    const idx = await terminal.arrowMenu(actions);
    const [actionType, target] = actionKeys[idx];

    if (actionType === 'go') {
      current = target;
      const first = !visited[target];
      visited[target] = true;
      terminal.clear();
      terminal.derelictMap(current);
      await roomFuncs[target](terminal, state, effects, audio, first);

      // Check if we found the null
      if (target === 'd_cargo' && !foundNull) {
        foundNull = true;
        await derelictCargoNull(terminal, state, effects, audio);
      }
    } else if (actionType === 'look') {
      await roomFuncs[current](terminal, state, effects, audio, false);
    } else if (actionType === 'map') {
      terminal.derelictMap(current);
    }
  }

  // Exit sequence
  await derelictExit(terminal, state, effects, audio);
}


async function derelictAirlock(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    await terminal.narrate("The airlock. The Vex's docking collar connects here.");
    await terminal.narrate('Emergency lighting \u2014 red, dim \u2014 flickers from a');
    await terminal.narrate('backup battery somewhere. The air tastes like metal');
    await terminal.narrate('and old plastic.');
    terminal.blank();
    await terminal.dent('This ship has been dead for... weeks, maybe.');
    await terminal.dentLine("The battery backup on the emergency lights won't");
    await terminal.dentLine('last much longer.');
    terminal.blank();
  } else {
    await terminal.narrate('The airlock. The Vex is docked on the other side.');
    await terminal.narrate('Our way home.');
    terminal.blank();
  }
}


async function derelictCorridor(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    audio.play('hull_creak');
    await terminal.narrate('The corridor stretches into darkness. My footsteps');
    await terminal.narrate('echo wrong \u2014 the acoustic properties of a dead ship');
    await terminal.narrate('are unsettling. No ventilation hum. No power thrum.');
    await terminal.narrate("Just my breathing and the soft click of DENT's feet.");
    terminal.blank();

    await terminal.narrate('There\'s damage everywhere. Panels ripped from walls.');
    await terminal.narrate('Scorch marks. One section of the ceiling has buckled');
    await terminal.narrate('inward \u2014 something hit the ship from above.');
    terminal.blank();

    await terminal.dent('Scrambler damage. Same pattern as ours.');
    await terminal.dentLine('The SICs hit this ship too.');
    terminal.blank();

    await terminal.thought('Another ship, another Folder, caught by the SICs.');
    await terminal.thought('How many ships have they killed?');
    terminal.blank();

    await terminal.narrate('I can see three doorways branching off the corridor.');
    await terminal.narrate('Bridge ahead. Engineering to the left. Cargo bay');
    await terminal.narrate('to the right.');
    terminal.blank();
  } else {
    await terminal.narrate('The main corridor. Damaged. Dark. Branching to');
    await terminal.narrate('the bridge, engineering, and cargo bay.');
    terminal.blank();
  }
}


async function derelictBridge(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    await terminal.narrate("The bridge. Larger than The Vex's \u2014 three seats");
    await terminal.narrate('instead of one. All empty. All restraints cut.');
    terminal.blank();

    await terminal.narrate('The crew got out. Or tried to.');
    terminal.blank();

    await terminal.narrate('The main console is dead, but a secondary terminal');
    await terminal.narrate('in the corner has a faint amber light. Battery');
    await terminal.narrate('backup, barely holding on.');
    terminal.blank();

    let choice = await terminal.showChoices([
      'Access the terminal',
      'Search the bridge',
      'Leave it',
    ]);

    if (choice === 1 || choice === 2) {
      if (choice === 1) {
        await derelictLogs(terminal, state, effects, audio);
      } else {
        await terminal.narrate('I search the bridge. Standard Folder equipment \u2014');
        await terminal.narrate('nothing portable or useful. But the terminal');
        await terminal.narrate('catches my eye.');
        terminal.blank();
        const choice2 = await terminal.showChoices([
          'Access the terminal',
          'Move on',
        ]);
        if (choice2 === 1) {
          await derelictLogs(terminal, state, effects, audio);
        }
      }
    } else {
      await terminal.thought("I'll come back if I need to.");
      terminal.blank();
    }
  } else {
    await terminal.narrate('The bridge. Three seats, all empty. The amber');
    await terminal.narrate('terminal still glows faintly in the corner.');
    terminal.blank();
    if (!state.getFlag('derelict_logs_found')) {
      const choice = await terminal.showChoices([
        'Access the terminal',
        'Move on',
      ]);
      if (choice === 1) {
        await derelictLogs(terminal, state, effects, audio);
      }
    }
  }
}


async function derelictLogs(terminal, state, effects, audio) {
  await terminal.narrate('The terminal takes a moment to respond. The screen');
  await terminal.narrate('flickers, stabilizes. A text interface. Folder');
  await terminal.narrate('standard \u2014 austere, functional.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 FSV PENANCE \u2014 LOG TERMINAL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">3 entries recovered from backup</span>       <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  // Log 1
  await terminal.logEntry('LOG 2891.4.12 \u2014 Navigator Kael');
  await terminal.logEntry('"The Render Cache readings are off the scale.');
  await terminal.logEntry("Whatever is at the Core Anomaly, it's not just");
  await terminal.logEntry('a structure. The fold signatures suggest something');
  await terminal.logEntry("that's been folding continuously for thousands of");
  await terminal.logEntry("years. A perpetual fold. That shouldn't be");
  await terminal.logEntry('possible."');
  terminal.blank();

  await terminal.pause();

  // Log 2
  await terminal.logEntry('LOG 2891.4.15 \u2014 Navigator Kael');
  await terminal.logEntry('"Command wants us to map the approach vectors.');
  await terminal.logEntry("They won't say why. I think they're planning");
  await terminal.logEntry('an expedition. To the Cache itself. If the');
  await terminal.logEntry('readings are right, anything that enters the');
  await terminal.logEntry('perpetual fold would experience time differently.');
  await terminal.logEntry('Massively differently."');
  terminal.blank();

  await terminal.pause();

  // Log 3
  await terminal.logEntry('LOG 2891.4.19 \u2014 Navigator Kael');
  await terminal.logEntry('"SICs found us. Three vessels. Scramblers hot.');
  await terminal.logEntry("We're running but the drive is damaged. If anyone");
  await terminal.logEntry('finds this: the Core Anomaly is not what the');
  await terminal.logEntry("Founders said it was. It's not a weapon. It's");
  await terminal.logEntry('not a power source. It\'s a\u2014"');
  terminal.blank();

  await terminal.warning('  [LOG CORRUPTED \u2014 ENTRY ENDS]');
  terminal.blank();

  await terminal.thought("It's a what? A WHAT?");
  await terminal.thought('Of course it cuts off. Of course.');
  terminal.blank();

  await terminal.dent('A perpetual fold. Folding continuously for');
  await terminal.dentLine('thousands of years.');
  terminal.blank();
  await terminal.dent("That's... that changes things. If the Core");
  await terminal.dentLine('Anomaly is a self-sustaining fold, then the');
  await terminal.dentLine('amount of null inside would be\u2014');
  terminal.blank();
  await terminal.dent("Incalculable. Literally. I can't calculate it.");
  terminal.blank();

  state.setFlag('derelict_logs_found', true);
  terminal.say('  [Folder Logs discovered: The Core Anomaly may be a perpetual fold]', 'dim-text');
  terminal.blank();

  await terminal.pause();
}


async function derelictEngineering(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    await terminal.narrate("Engineering. The Folder ship's drive is here \u2014");
    await terminal.narrate("bigger than The Vex's fold drive. Military-grade.");
    await terminal.narrate('Completely dead. The null containment');
    await terminal.narrate('vessel is cracked. Empty.');
    terminal.blank();

    await terminal.dent('Their containment vessel ruptured. All the');
    await terminal.dentLine('null vented into space.');
    await terminal.dentLine('Nothing for us here. Drive-wise, anyway.');
    terminal.blank();

    await terminal.narrate('I notice a toolkit mounted on the wall. Folder');
    await terminal.narrate('engineering tools \u2014 higher quality than mine.');
    terminal.blank();

    state.addItem('Folder Toolkit');
    terminal.say('  [Picked up: Folder Toolkit]', 'dim-text');
    terminal.blank();

    // Fuel Regulator Bypass — Progress Gate item
    await terminal.narrate('Something else catches my eye. Below the drive');
    await terminal.narrate('housing \u2014 a modular component, still bolted to its');
    await terminal.narrate('rack. Intact. The label reads: FUEL REGULATOR BYPASS.');
    terminal.blank();

    await terminal.thought('A fuel regulator bypass. It routes null directly');
    await terminal.thought("to the fold drive's ignition chamber, skipping the");
    await terminal.thought('standard safety interlocks. Dangerous. Exactly what');
    await terminal.thought('we need.');
    terminal.blank();

    await terminal.dent("That's a Folder-spec fuel regulator bypass.");
    await terminal.dentLine('Compatible with our fold drive. If we install it,');
    await terminal.dentLine('we can initialize a fold with our reserves.');
    terminal.blank();
    await terminal.dent("Without it, the fold drive's safety interlocks");
    await terminal.dentLine("won't let us fire with less than standard fuel.");
    await terminal.dentLine('With it, we just need the minimum null threshold.');
    terminal.blank();

    await terminal.narrate('I unbolt it from the rack. Heavy. Solid.');
    await terminal.narrate('Folder engineering \u2014 say what you want about');
    await terminal.narrate('them, they build things to last.');
    terminal.blank();

    state.addItem('Fuel Regulator Bypass');
    state.setFlag('fuel_regulator_bypass', true);
    terminal.say('  [Picked up: Fuel Regulator Bypass \u2014 required to unlock fold drive]', 'dim-text');
    terminal.blank();
  } else {
    await terminal.narrate('Engineering. The drive is dead. The containment');
    await terminal.narrate('vessel is cracked and empty.');
    terminal.blank();
  }
}


async function derelictCargo(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    audio.play('hull_creak');
    await terminal.narrate("The cargo bay. Massive compared to The Vex's hold.");
    await terminal.narrate('Crates are scattered \u2014 the ship was hit hard enough');
    await terminal.narrate('to throw everything loose. Most are cracked open,');
    await terminal.narrate('contents spilled.');
    terminal.blank();

    await terminal.narrate('But against the far wall \u2014 three reinforced containers.');
    await terminal.narrate('Still sealed. Still mag-locked. The universal hazard');
    await terminal.narrate('symbol for null glows faintly on each one.');
    terminal.blank();

    await terminal.thought("There. That's what we came for.");
    terminal.blank();
  } else {
    await terminal.narrate('The cargo bay. Scattered crates. The three sealed');
    await terminal.narrate('null containers against the far wall.');
    terminal.blank();
  }
}


async function derelictCargoNull(terminal, state, effects, audio) {
  await terminal.narrate('I approach the containers. Each one is about the');
  await terminal.narrate('size of a toolbox. Heavy. The mag-locks respond to');
  await terminal.narrate("a manual release \u2014 they weren't biometrically sealed.");
  terminal.blank();

  // Possible turret encounter
  let choice = await terminal.showChoices([
    'Open the containers carefully',
    'Check for security systems first',
  ]);

  if (choice === 2) {
    await terminal.dent('Good instinct.');
    terminal.blank();
    await terminal.narrate('DENT scans the area. His optic narrows.');
    terminal.blank();
    await wait(300);
    await terminal.dent('There. Ceiling mount. Automated defense');
    await terminal.dentLine("turret. Unpowered, but it's wired to the");
    await terminal.dentLine('container mag-locks. Release the lock, the');
    await terminal.dentLine('turret gets a capacitor burst. Enough for');
    await terminal.dentLine('maybe ten seconds of operation.');
    terminal.blank();

    await terminal.dent('Ten seconds of a military-grade turret is');
    await terminal.dentLine('approximately nine seconds more than we want.');
    terminal.blank();

    const choice2 = await terminal.showChoices([
      'Disable the turret first',
      'Move fast \u2014 grab and run',
      '"DENT, can you block it?"',
    ]);

    if (choice2 === 1) {
      await terminal.narrate('I trace the wiring from the turret to the');
      await terminal.narrate('capacitor. A single cable. I cut it with');
      await terminal.narrate('a tool from the Folder toolkit.');
      terminal.blank();
      await terminal.narrate('The turret goes dead-dead. No capacitor, no');
      await terminal.narrate('burst, no problem.');
      terminal.blank();
      await terminal.dent('Clean. No drama. I approve.');
      terminal.blank();
    } else if (choice2 === 2) {
      await terminal.narrate('I pop the mag-lock. The turret whirs to life \u2014');
      await terminal.narrate('a high-pitched whine as the capacitor dumps');
      await terminal.narrate('energy into its systems.');
      terminal.blank();
      audio.play('turret_fire');
      await terminal.warning('The turret fires. A burst of kinetic rounds');
      await terminal.warning('chews into the floor where I was standing a');
      await terminal.warning('half-second ago.');
      terminal.blank();
      await terminal.narrate('I grab two containers and run. DENT grabs the');
      await terminal.narrate('third. The turret tracks, fires again \u2014');
      await terminal.narrate("rounds spark off DENT's back plating.");
      terminal.blank();
      await terminal.dent("Ow. That's going to leave marks.");
      terminal.blank();
      await terminal.narrate('The capacitor dies. The turret slows, stops.');
      await terminal.narrate('Silence.');
      terminal.blank();
      state.applyDamage({ stress: 10 });
      state.setFlag('derelict_defenses_triggered', true);
    } else if (choice2 === 3) {
      if (state.getFlag('dent_arm_repaired')) {
        await terminal.dent('I can take a few rounds. Probably.');
        await terminal.dentLine("Open the lock. I'll stand between you");
        await terminal.dentLine('and the turret.');
        terminal.blank();
        await terminal.narrate('DENT positions himself. I pop the lock.');
        await terminal.narrate('The turret spins up \u2014 and fires directly');
        await terminal.narrate("into DENT's chest plate. He staggers but");
        await terminal.narrate("doesn't fall. Mag-feet.");
        terminal.blank();
        await terminal.narrate('I grab all three containers. The turret');
        await terminal.narrate('dies as its capacitor runs out.');
        terminal.blank();
        await terminal.dent('That tickled.');
        terminal.blank();
        await terminal.dent('I\'m lying. That hurt quite a lot.');
        terminal.blank();
        state.dentRepairLevel -= 0.05;
        state.applyDamage({ stress: 5 });
      } else {
        await terminal.dent('With one working arm? I can try.');
        await terminal.dentLine('No promises.');
        terminal.blank();
        await terminal.narrate('DENT braces. I pop the lock. The turret fires.');
        await terminal.narrate('DENT catches a burst to the shoulder \u2014 his bad');
        await terminal.narrate('shoulder. He spins, hits the wall.');
        terminal.blank();
        await terminal.narrate('I grab two containers and drag DENT toward the');
        await terminal.narrate("door with the third. The turret's capacitor dies");
        await terminal.narrate('just as we clear the doorway.');
        terminal.blank();
        state.dentRepairLevel -= 0.1;
        state.applyDamage({ stress: 12 });
        state.setFlag('derelict_defenses_triggered', true);
      }
    }
  } else {
    // Didn't check for security — turret fires
    await terminal.narrate('I release the first mag-lock.');
    terminal.blank();
    audio.play('turret_fire');
    await terminal.narrate('A whine. Above me. I look up.');
    terminal.blank();
    await terminal.warning('Turret.');
    terminal.blank();
    await terminal.narrate('It fires. I throw myself sideways. Kinetic rounds');
    await terminal.narrate("punch holes in the deck plating where I'd been");
    await terminal.narrate('kneeling.');
    terminal.blank();

    await terminal.dent('TURRET! MOVE!');
    terminal.blank();

    await terminal.narrate('DENT rushes forward, puts himself between me and');
    await terminal.narrate('the turret. Rounds spark off his plating. I grab');
    await terminal.narrate('the containers \u2014 one, two, three \u2014 and run.');
    terminal.blank();

    await terminal.narrate('The turret dies. Capacitor empty.');
    terminal.blank();

    await terminal.dent('Next time, check for security systems.');
    if (state.getFlag('dent_arm_repaired')) {
      await terminal.dentLine('I just got this arm fixed.');
    }
    terminal.blank();

    state.applyDamage({ health: -5, stress: 15 });
    state.dentRepairLevel -= 0.08;
    state.setFlag('derelict_defenses_triggered', true);
  }

  // Null retrieved
  terminal.blank();
  audio.play('exotic_harvest');

  await terminal.narrate('Three containers. I crack the first one open.');
  await terminal.narrate('Inside: two canisters of refined null.');
  await terminal.narrate('Casimir-generated negative energy, properly');
  await terminal.narrate('contained and stabilized. The good stuff.');
  terminal.blank();

  await terminal.narrate('All three containers yield six canisters total.');
  terminal.blank();

  await terminal.dent("Six canisters. That's roughly 20 cells");
  await terminal.dentLine("for The Vex's containment vessel.");
  await terminal.dentLine("Combined with our 8, we'll have 28.");
  terminal.blank();

  await terminal.dent("Enough to fold. If we're careful.");
  terminal.blank();

  state.nullReserves = 28;

  terminal.say('  [Null: 8 \u2192 28 cells]', 'dim-text');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


async function derelictExit(terminal, state, effects, audio) {
  terminal.clear();
  audio.play('airlock_cycle');

  await terminal.narrate('We carry the canisters back through the corridor.');
  await terminal.narrate('The derelict groans around us \u2014 the hull settling,');
  await terminal.narrate('metal contracting in the cold. It sounds like the');
  await terminal.narrate('ship is sighing.');
  terminal.blank();

  if (state.getFlag('derelict_logs_found')) {
    await terminal.thought('A perpetual fold. The Core Anomaly is folding');
    await terminal.thought('continuously. Has been for thousands of years.');
    await terminal.thought('What does that even look like?');
    terminal.blank();
    await terminal.thought('And what was Navigator Kael about to say before');
    await terminal.thought("the log cut off? 'It's not a weapon. It's not");
    await terminal.thought("a power source. It's a\u2014'");
    terminal.blank();
    await terminal.thought('A what?');
    terminal.blank();
  }

  await terminal.narrate("The Vex's airlock seals behind us. Home.");
  await terminal.narrate('Such as it is.');
  terminal.blank();

  await terminal.dent('Docking collar disengaged. The Penance can');
  await terminal.dentLine("keep drifting. We've got what we came for.");
  terminal.blank();

  // Load the null
  await terminal.narrate("Loading the canisters into The Vex's containment");
  await terminal.narrate('vessel takes twenty minutes. Each one has to be');
  await terminal.narrate("transferred carefully \u2014 null doesn't");
  await terminal.narrate('appreciate being jostled.');
  terminal.blank();

  await terminal.dentSystem(`NULL RESERVES .......... ${state.nullReserves} CELLS`);
  terminal.blank();

  // Install bypass and enable fold
  await terminal.narrate('With the null loaded, I crawl under the fold drive');
  await terminal.narrate('housing and install the fuel regulator bypass from');
  await terminal.narrate('the Penance. It clicks into the manifold like it');
  await terminal.narrate('was designed for this slot.');
  terminal.blank();

  await terminal.thought('Fuel regulator bypass. Of course. Because simply');
  await terminal.thought("having fuel isn't enough \u2014 the universe demands");
  await terminal.thought('bureaucratic approval before bending spacetime.');
  terminal.blank();

  state.foldStatus = 'READY';

  await terminal.dentSystem('FUEL REGULATOR BYPASS .. INSTALLED');
  await terminal.dentSystem('FOLD DRIVE ............. READY (MINIMUM MET)');
  terminal.blank();

  await terminal.dent("We're fold-capable. Barely.");
  await terminal.dentLine('The question is: do we want to fold?');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// ACT 4B: ASTEROID MISSION
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #4 (Inciting event — EVA survival), #6 (Ally — DENT as mission control)
// Reed tests: Understanding (EVA/null context), Strategy (Torquer vs manual), Consequence (null + Torquer charge)
// 4-Point: Advances (null economy, Torquer mechanics), Agency (EVA choices), Consequence (resources ripple), Tone (maintained)
async function asteroidMission(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('asteroid_ambient');

  await terminal.narrate('The asteroid fills the viewport.');
  terminal.blank();
  await terminal.narrate("It's not big \u2014 maybe half a kilometer across. A");
  await terminal.narrate('tumbling, irregular chunk of rock and ice, spinning');
  await terminal.narrate('lazily in the void. The surface catches starlight');
  await terminal.narrate('in strange ways \u2014 iridescent streaks that pulse');
  await terminal.narrate('faintly blue.');
  terminal.blank();

  await terminal.thought('Null deposits. The blue shimmer is');
  await terminal.thought('characteristic of Casimir-resonant crystalline');
  await terminal.thought('structures. Raw, unrefined, but harvestable.');
  terminal.blank();

  await terminal.dent('Spectral analysis confirms high-density null-resonant');
  await terminal.dentLine('particulate in the surface layers. Concentrated');
  await terminal.dentLine('near the equatorial ridge.');
  terminal.blank();

  await terminal.dent("Problem: I'm detecting residual fold signatures");
  await terminal.dentLine("in the asteroid's vicinity. Gravity pockets.");
  await terminal.dentLine('Unstable. Something folded near here recently');
  await terminal.dentLine('and left the spacetime slightly... wrinkled.');
  terminal.blank();

  if (state.getFlag('dent_arm_repaired')) {
    await terminal.dent('The good news is I can monitor the gravity');
    await terminal.dentLine('pockets from here and warn you. With both');
    await terminal.dentLine('arms, I can also operate the winch and');
    await terminal.dentLine('tether system.');
  } else {
    await terminal.dent("I'll monitor the gravity pockets from here.");
    await terminal.dentLine('One-armed winch operation. Should be fine.');
    await terminal.dentLine('Probably.');
  }
  terminal.blank();

  let choice = await terminal.showChoices([
    '"EVA. I\'ll go out and harvest it."',
    '"Can we collect it from the ship?"',
  ]);

  if (choice === 2) {
    await terminal.dent('The concentrations are subsurface. You\'ll');
    await terminal.dentLine('need to physically extract them. That means');
    await terminal.dentLine('boots on the rock.');
    terminal.blank();
    await terminal.dent("Sorry. I know you were hoping I'd say no.");
    terminal.blank();
  }

  // Suit up
  await terminal.narrate('I pull the EVA suit from the emergency locker.');
  await terminal.narrate("It's designed for short excursions \u2014 90 minutes");
  await terminal.narrate('of oxygen, basic radiation shielding, magnetic');
  await terminal.narrate('boots. No propulsion. Tether only.');
  terminal.blank();

  if (state.torquerEquipped) {
    await terminal.narrate("The Torquer fits under the suit's left sleeve.");
    await terminal.narrate('Barely. The orange section pulses faintly \u2014');
    await terminal.narrate('even depleted, it reacts to the proximity of');
    await terminal.narrate('raw null.');
    terminal.blank();
    await terminal.thought("Like it's hungry.");
    terminal.blank();
  }

  audio.play('airlock_cycle');

  await terminal.narrate('Airlock. The inner door seals. I hear the air');
  await terminal.narrate('pumping out. Then silence.');
  terminal.blank();

  await terminal.narrate('The outer door opens.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('Space.');
  terminal.blank();
  await terminal.narrate('Every time, it hits differently. The sheer scale');
  await terminal.narrate('of nothing. The asteroid hangs below me \u2014 or above');
  await terminal.narrate('me \u2014 direction is meaningless. Stars in every');
  await terminal.narrate('direction. The Milky Way like a smear of light.');
  terminal.blank();

  await terminal.thought("It's beautiful. Terrifyingly, incomprehensibly");
  await terminal.thought("beautiful. And I'm about to walk on a rock in the");
  await terminal.thought('middle of it with a tether and a prayer.');
  terminal.blank();

  await terminal.pause();

  // EVA sequence
  await asteroidEva(terminal, state, effects, audio);
}


async function asteroidEva(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('eva_ambient');

  let suitO2 = 90; // Starting O2
  let nullCollected = 0;
  const target = 20; // Need to collect 20 units

  await terminal.narrate('My boots touch the surface. Mag-lock engages.');
  await terminal.narrate('The rock is dark, pitted, ancient. The blue');
  await terminal.narrate('iridescent streaks are everywhere \u2014 veins of');
  await terminal.narrate('crystallized null running through the');
  await terminal.narrate('surface like frozen lightning.');
  terminal.blank();

  await terminal.dent("I'm reading you clearly. Tether is secure.");
  await terminal.dentLine('Head for the equatorial ridge \u2014 the densest');
  await terminal.dentLine('concentrations are there. About 200 meters');
  await terminal.dentLine('from your position.');
  terminal.blank();

  terminal.evaHud(suitO2, 50, nullCollected, target);

  // Walk to ridge
  await terminal.narrate('I walk. Each step is deliberate \u2014 the asteroid\'s');
  await terminal.narrate('micro-gravity means I could launch myself into');
  await terminal.narrate('space with a careless push. Mag-boots help, but');
  await terminal.narrate("they're not perfect on uneven terrain.");
  terminal.blank();

  await terminal.pause();
  suitO2 -= 5;

  // Gravity pocket encounter
  terminal.clear();

  await terminal.narrate('Halfway to the ridge, the ground shifts.');
  terminal.blank();

  audio.play('alarm_proximity');
  await terminal.warning('GRAVITY ANOMALY DETECTED');
  terminal.blank();

  await terminal.narrate('My stomach drops. Literally. Gravity \u2014 real gravity,');
  await terminal.narrate('about 0.3g \u2014 slams into me from the left. I stumble,');
  await terminal.narrate('skid across the rock surface. My tether goes taut.');
  terminal.blank();

  await terminal.dent("Gravity pocket! Hold on \u2014 it's a residual fold");
  await terminal.dentLine("signature. Localized. It'll pass in about");
  await terminal.dentLine('thirty seconds.');
  terminal.blank();

  await terminal.narrate('Thirty seconds of being pulled sideways across an');
  await terminal.narrate('asteroid. I dig my fingers into a crevice and hold.');
  terminal.blank();

  let choice = await terminal.showChoices([
    'Hang on and wait it out',
    'Use the pull \u2014 let it carry me toward the ridge',
  ]);

  if (choice === 1) {
    await terminal.narrate('I grip the rock. My fingers ache. The pull is');
    await terminal.narrate('steady, insistent \u2014 like something very large and');
    await terminal.narrate('invisible is trying to drag me sideways.');
    terminal.blank();
    await terminal.narrate('Twenty seconds. Ten. Five.');
    terminal.blank();
    await terminal.narrate("It passes. My body goes light again. Micro-gravity.");
    await terminal.narrate("I'm shaking. My gloves are scraped.");
    terminal.blank();
    await terminal.dent("Pocket's clear. You're okay.");
    terminal.blank();
    state.applyDamage({ stress: 5 });
  } else if (choice === 2) {
    await terminal.narrate('I let go. The gravity pocket catches me and I');
    await terminal.narrate('slide across the surface \u2014 fast, uncontrolled,');
    await terminal.narrate('but in the right direction. The ridge is getting');
    await terminal.narrate('closer.');
    terminal.blank();
    await terminal.narrate("The pocket dies. I'm fifty meters from the ridge");
    await terminal.narrate('and moving too fast. I slam my mag-boots down \u2014');
    await terminal.narrate('they catch, drag, and I skid to a stop.');
    terminal.blank();
    await terminal.dent('That was either very brave or very stupid.');
    await terminal.dentLine("I'll let you decide which.");
    terminal.blank();
    state.applyDamage({ health: -3, stress: 3 });
    state.setFlag('asteroid_gravity_pocket', true);
  }

  suitO2 -= 8;

  // Mining
  terminal.clear();

  await terminal.narrate('The equatorial ridge. The null deposits');
  await terminal.narrate('are dense here \u2014 the blue veins are thick as my');
  await terminal.narrate('arm, pulsing with faint light. The Casimir resonance');
  await terminal.narrate('is audible through my helmet \u2014 a low, clean hum.');
  terminal.blank();

  terminal.evaHud(suitO2, 200, nullCollected, target);

  // Optional Tier 3: Spectral analysis
  choice = await terminal.showChoices([
    'Start harvesting',
    'Run a spectral analysis first',
  ]);

  if (choice === 2) {
    await terminal.narrate("I hold the suit's scanner over the largest vein.");
    terminal.blank();
    terminal.sayHtml('  <span class="c-hull">\u250C\u2500 [TECHNICAL LOG] SPECTRAL ANALYSIS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">SAMPLE: Crystalline Null Deposit (Raw)</span>       <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">COMPOSITION: Casimir-resonant vacuum lattice</span> <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">Plate separation: 10-50nm (natural)</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">Neg. energy density: -2.4\u00D710\u207B\u00B9\u00B2 J/m\u00B3</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">Casimir pressure: -1.3\u00D710\u207B\u00B3 N/m\u00B2 (ambient)</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">Purity: 34% (requires Casimir refining)</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">FORMATION HYPOTHESIS: Residual fold event</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">collapsed local vacuum state, freezing</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">virtual particle restrictions into stable</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">crystalline structure. Natural Casimir</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">effect at geological scale.</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">NOTE: This shouldn\'t exist. Casimir crystals</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">require artificial plate separation to form.</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">Natural formation implies prior fold activity</span>');
    terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-dim">in this region. Something folded here. Hard.</span>');
    terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
    terminal.blank();
    await terminal.thought('Natural Casimir crystals. The textbooks say');
    await terminal.thought('impossible. The asteroid says otherwise.');
    terminal.blank();
    await terminal.thought('Something folded near here. Recently enough to');
    await terminal.thought('leave crystallized vacuum energy in its wake.');
    await terminal.thought('The Folders? The SICs? Or something else?');
    terminal.blank();
    state.applyDamage({ neural: 3 });
    terminal.say('  [Neural +3 \u2014 deeper understanding]', 'dim-text');
    terminal.blank();
    await terminal.pause();
  }

  if (state.torquerEquipped) {
    await terminal.dent('The Torquer should be able to extract the');
    await terminal.dentLine('deposits directly. The Casimir resonance in');
    await terminal.dentLine('the Torquer will interact with the raw');
    await terminal.dentLine('deposits. Just hold your hand near a vein.');
    terminal.blank();

    choice = await terminal.showChoices([
      'Use the Torquer to harvest',
      'Use ship tools manually',
    ]);

    if (choice === 1) {
      await terminal.narrate('I hold the Torquer near a thick vein of');
      await terminal.narrate('null. The blue section \u2014 inert since');
      await terminal.narrate('I put it on \u2014 flickers.');
      terminal.blank();

      await terminal.narrate('Then pulses.');
      terminal.blank();

      await terminal.narrate('The null in the vein responds.');
      await terminal.narrate('Crystalline structures fracture, releasing');
      await terminal.narrate('raw negative energy that flows into the');
      await terminal.narrate('Torquer like water into a drain. The blue');
      await terminal.narrate('section glows \u2014 actually glows \u2014 for the');
      await terminal.narrate('first time.');
      terminal.blank();

      await terminal.thought("Oh. So that's what you feel like when you");
      await terminal.thought('work.');
      terminal.blank();

      audio.play('exotic_harvest');

      await terminal.narrate('I move from vein to vein. The Torquer drinks.');
      await terminal.narrate('Each extraction takes seconds \u2014 no tools, no');
      await terminal.narrate('drilling, just resonance. The deposits practically');
      await terminal.narrate('want to be absorbed.');
      terminal.blank();

      nullCollected = target;
      state.torquerNull = 3;
      state.setFlag('used_torquer_mining', true);
      suitO2 -= 10;

      await terminal.dent("That's... remarkable. The Torquer is extracting");
      await terminal.dentLine('at ten times the rate of manual harvesting.');
      await terminal.dentLine("You've got enough for The Vex and the Torquer");
      await terminal.dentLine('absorbed a few cells for itself.');
      terminal.blank();

      terminal.say('  [Torquer: 3/10 cells loaded]', 'dim-text');
      terminal.blank();
    } else {
      await terminal.narrate("Manual extraction. I use the ship's geological");
      await terminal.narrate('tools \u2014 a sonic drill and collection canisters.');
      await terminal.narrate('Slower, but it works.');
      terminal.blank();
      await asteroidManualMining(terminal, state, effects, audio);
      suitO2 -= 25;
    }
  } else {
    await terminal.narrate('Without the Torquer, it\'s manual extraction.');
    await terminal.narrate("Ship's geological tools \u2014 a sonic drill and");
    await terminal.narrate('collection canisters. Old-fashioned but reliable.');
    terminal.blank();
    await asteroidManualMining(terminal, state, effects, audio);
    suitO2 -= 25;
  }

  // Return to ship
  terminal.clear();

  terminal.evaHud(suitO2, 200, target, target);

  await terminal.dent("That's enough. Get back to the airlock.");
  await terminal.dentLine(`O\u2082 at ${suitO2}%. Don't dawdle.`);
  terminal.blank();

  await terminal.narrate('The walk back is uneventful. No gravity pockets.');
  await terminal.narrate('Just me, the rock, and the stars. Two hundred');
  await terminal.narrate('meters of uneven terrain between me and the');
  await terminal.narrate(`airlock. O\u2082 at ${suitO2}%. Four millimeters of`);
  await terminal.narrate('composite between my skin and hard vacuum.');
  terminal.blank();

  await terminal.thought('Made it.');
  terminal.blank();

  audio.play('airlock_cycle');

  await terminal.narrate('Airlock. Inner door seals. Air rushes in. I pull');
  await terminal.narrate('the helmet off and breathe.');
  terminal.blank();

  await terminal.narrate('Real air. Ship air. Recycled and stale and');
  await terminal.narrate('absolutely wonderful.');
  terminal.blank();

  // Load null
  await terminal.narrate('Processing the raw null takes an hour.');
  await terminal.narrate("The Vex's Casimir refiner is small but functional \u2014");
  await terminal.narrate('it converts the raw crystalline deposits into');
  await terminal.narrate('usable negative energy.');
  terminal.blank();

  state.nullReserves = 28;

  await terminal.dentSystem(`NULL RESERVES .......... ${state.nullReserves} CELLS`);
  terminal.blank();

  // Fuel Regulator Bypass — found in The Vex's cargo during processing
  if (!state.getFlag('fuel_regulator_bypass')) {
    await terminal.narrate("While the refiner runs, I dig through The Vex's");
    await terminal.narrate('cargo hold. Somewhere in the back \u2014 behind the');
    await terminal.narrate('cracked crates and floating ration packs \u2014 a');
    await terminal.narrate('component, still in its original packaging.');
    terminal.blank();

    await terminal.narrate("FUEL REGULATOR BYPASS. Vin's handwriting on the");
    await terminal.narrate("box: 'INSTALL WHEN READY \u2014 BYPASSES FOLD SAFETY");
    await terminal.narrate("INTERLOCKS.'");
    terminal.blank();

    await terminal.thought('Past-me planned ahead. The fold drive\'s safety');
    await terminal.thought("interlocks won't fire at low fuel levels. This");
    await terminal.thought('bypass routes null directly to the ignition');
    await terminal.thought('chamber. Dangerous, but necessary.');
    terminal.blank();

    await terminal.dent('A fuel regulator bypass. Your past self packed');
    await terminal.dentLine('one. Clever. Or desperate. Possibly both.');
    terminal.blank();
    await terminal.dent('Install it and the fold drive can initialize');
    await terminal.dentLine("at minimum null threshold. Without it, we're");
    await terminal.dentLine('stuck on gravity drive.');
    terminal.blank();

    state.addItem('Fuel Regulator Bypass');
    state.setFlag('fuel_regulator_bypass', true);
    terminal.say('  [Found: Fuel Regulator Bypass \u2014 required to unlock fold drive]', 'dim-text');
    terminal.blank();
  }

  // Install bypass and enable fold
  await terminal.narrate('I slide under the fold drive housing and install');
  await terminal.narrate('the fuel regulator bypass. It clicks into the');
  await terminal.narrate('manifold like it was designed for this slot.');
  terminal.blank();

  await terminal.thought('Fuel regulator bypass. Of course. Because simply');
  await terminal.thought("having fuel isn't enough \u2014 the universe demands");
  await terminal.thought('bureaucratic approval before bending spacetime.');
  terminal.blank();

  state.foldStatus = 'READY';

  await terminal.dentSystem('FUEL REGULATOR BYPASS .. INSTALLED');
  await terminal.dentSystem('FOLD DRIVE ............. READY (MINIMUM MET)');
  terminal.blank();

  await terminal.dent('28 cells. Not luxurious, but enough.');
  await terminal.dentLine("We're fold-capable again.");
  terminal.blank();

  terminal.say('  [Null: 8 \u2192 28 cells | Fold Drive: READY]', 'dim-text');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


async function asteroidManualMining(terminal, state, effects, audio) {
  await terminal.narrate('The sonic drill bites into the first vein. Blue');
  await terminal.narrate('dust sprays in slow-motion arcs \u2014 micro-gravity');
  await terminal.narrate('turns everything into a lightshow. I collect the');
  await terminal.narrate('fragments in sealed canisters.');
  terminal.blank();

  audio.play('exotic_harvest');

  await terminal.narrate('Vein by vein. Canister by canister. It\'s slow,');
  await terminal.narrate('physical work. My arms ache. The drill overheats');
  await terminal.narrate('twice and I have to wait for it to cool.');
  terminal.blank();

  await terminal.dent('Take your time. Well \u2014 take some time. Not all');
  await terminal.dentLine('the time. Your O\u2082 is a factor here.');
  terminal.blank();

  await terminal.thought('Mining null from an asteroid with a');
  await terminal.thought('drill and collection jars. Somewhere, my university');
  await terminal.thought('advisor is spinning in their grave.');
  terminal.blank();

  await terminal.narrate('An hour of work. Hands cramping. But the canisters');
  await terminal.narrate('are full.');
  terminal.blank();

  state.applyDamage({ health: -3, stress: 5 });
}


// ═══════════════════════════════════════════════════════
// ACT 5: DEPARTURE CHOICE
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #4 (Inciting event concludes — Vin commits to the journey)
// Reed tests: Understanding (travel tradeoffs), Strategy (3 valid approaches), Consequence (SIC detection, fuel, time)
// 4-Point: Advances (fold mechanics), Agency (3-way travel choice), Consequence (SIC timeline + null reserves), Tone (maintained)
async function departureChoice(terminal, state, effects, audio) {
  terminal.clear();

  await terminal.chapterTitle(1, 'DEPARTURE');

  await terminal.narrate('The Vex is fueled. Repaired \u2014 mostly. The fold');
  await terminal.narrate('drive hums with potential energy. The gravity drive');
  await terminal.narrate('is steady. The sensors show clear space in every');
  await terminal.narrate('direction.');
  terminal.blank();

  await terminal.narrate('Clear for now.');
  terminal.blank();

  await terminal.dent("We need to talk about how we're getting to the");
  await terminal.dentLine('Core Anomaly.');
  terminal.blank();

  await terminal.dent('We have three options, and none of them are');
  await terminal.dentLine("great. But that's the theme of today.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Travel selection panel
  const options = [
    ['FOLD JUMP', 15, 'HIGH', '~2 hours',
     'Full fold to maximum safe range. Fast but creates a Blip the SICs can track.'],
    ['GRAVITY DRIVE', 3, 'LOW', '~6 days',
     'Conventional thrust. Slow and steady. Nearly undetectable. SICs may catch up.'],
    ['SHORT FOLD + DRIFT', 8, 'MODERATE', '~3 days',
     "One short fold for distance, then gravity drive. DENT's recommendation."],
  ];

  terminal.travelSelectionPanel(state.nullReserves, options);
  terminal.blank();

  // DENT's opinion
  await terminal.dent('For the record, I think folding right now is a');
  await terminal.dentLine("terrible idea. But I've been wrong before.");
  if (state.getFlag('dent_arm_repaired')) {
    await terminal.dentLine("Once. In 2847. I've moved past it.");
  } else {
    await terminal.dentLine('Rarely. But it happens.');
  }
  terminal.blank();

  await terminal.dent('The hybrid approach gives us distance without');
  await terminal.dentLine('burning all our fuel or lighting up every SIC');
  await terminal.dentLine('sensor in the sector.');
  terminal.blank();

  const choice = await terminal.showChoices([
    ['Fold Jump', 'Fast. Risky. Burns 15 cells.'],
    ['Gravity Drive', 'Slow. Safe. Conserves cells.'],
    ['Short Fold + Drift', "Balanced. DENT's recommendation."],
  ]);

  if (choice === 1) {
    state.setFlag('travel_choice', 'fold');
    state.nullReserves -= 15;

    await terminal.dent('Full fold. Okay.');
    terminal.blank();
    await wait(300);
    await terminal.dent('I want you to know I disagreed. For the log.');
    terminal.blank();

    await terminal.narrate('I strap in. DENT locks his mag-feet to the floor.');
    terminal.blank();

    audio.play('fold_jump');
    await effects.foldEffect(terminal);
    terminal.blank();

    await terminal.narrate('The fold hits like a wall of nothing. Space');
    await terminal.narrate('compresses. The viewport goes white, then black,');
    await terminal.narrate('then shows stars that are in completely different');
    await terminal.narrate('positions. My stomach turns inside out.');
    terminal.blank();

    // ─── Subtle simulation clue #2: minor text glitch during fold ───
    await terminal.dentSystem('FOLD COMPLETE');
    await terminal.dentSystem(`NULL RESERVES: ${state.nullReserves} CELLS`);
    await terminal.dentSystem('DISTANCE TRAVELED: 4.7 LIGHT-YEARS');
    await wait(200);
    await terminal.dentSystem(`DISTANCE TRAVELED: 4.7 LIGHT-YEA${effects.glitchText('RS', 0.5)}`);
    await wait(100);
    await terminal.dentSystem('DISTANCE TRAVELED: 4.7 LIGHT-YEARS');
    terminal.blank();

    await terminal.warning('BLIP GENERATED \u2014 SIC DETECTION PROBABLE');
    terminal.blank();

    await terminal.dent('We just announced ourselves to everyone with');
    await terminal.dentLine('a fold-signature detector within 50 light-years.');
    await terminal.dentLine('Which includes the SICs.');
    terminal.blank();

    await terminal.dent('ETA to Core Anomaly on gravity drive: 14 hours.');
    await terminal.dentLine('ETA for SICs to track that Blip: unknown.');
    await terminal.dentLine('But less than 14 hours. Almost certainly.');
    terminal.blank();

    state.applyDamage({ stress: 10, neural: -5 });

  } else if (choice === 2) {
    state.setFlag('travel_choice', 'gravity');
    state.nullReserves -= 3;

    audio.play('gravity_drive');

    await terminal.dent('Gravity drive it is. Slow and steady.');
    await terminal.dentLine("I'll keep sensors active for SIC signatures.");
    terminal.blank();

    await terminal.narrate('No fold. No drama. Just the steady push of the');
    await terminal.narrate('gravity drive and the patient crawl of stars');
    await terminal.narrate("across the viewport. It's almost peaceful.");
    terminal.blank();

    await terminal.dentSystem('GRAVITY DRIVE: ENGAGED');
    await terminal.dentSystem(`NULL RESERVES: ${state.nullReserves} CELLS`);
    await terminal.dentSystem('ETA TO CORE ANOMALY: 6 DAYS, 4 HOURS');
    terminal.blank();

    await terminal.dent('Six days. I hope you like staring at nothing.');
    terminal.blank();

    await terminal.thought('Six days. In a damaged ship. With a robot and');
    await terminal.thought('my own thoughts for company.');
    await terminal.thought('At least I have a protein bar.');
    terminal.blank();

    state.applyDamage({ stress: -5 });

  } else if (choice === 3) {
    state.setFlag('travel_choice', 'hybrid');
    state.nullReserves -= 8;

    await terminal.dent('Hybrid approach. Smart.');
    terminal.blank();

    await terminal.narrate('I strap in. DENT configures the fold drive for');
    await terminal.narrate('a minimal jump \u2014 just enough to put distance');
    await terminal.narrate('between us and anyone following.');
    terminal.blank();

    audio.play('fold_jump');
    await effects.foldEffect(terminal);
    terminal.blank();

    await terminal.narrate('A short fold. Less violent than a full jump.');
    await terminal.narrate("The stars shift \u2014 not dramatically, but enough.");
    await terminal.narrate('Two light-years in a blink.');
    terminal.blank();

    // ─── Subtle simulation clue: minor fold glitch ───
    await terminal.dentSystem('SHORT FOLD COMPLETE');
    await terminal.dentSystem('SWITCHING TO GRAVITY DRIVE');
    await terminal.dentSystem(`NULL RESERVES: ${state.nullReserves} CELLS`);
    await terminal.dentSystem('ETA TO CORE ANOMALY: 3 DAYS, 8 HOURS');
    await wait(150);
    await terminal.dentSystem(`ETA TO CORE ANOMALY: 3 DAYS, 8 HOU${effects.glitchText('RS', 0.4)}`);
    await wait(100);
    await terminal.dentSystem('ETA TO CORE ANOMALY: 3 DAYS, 8 HOURS');
    terminal.blank();

    await terminal.dent('Small Blip generated. Detectable, but');
    await terminal.dentLine('harder to trace than a full fold. The SICs');
    await terminal.dentLine("will know we moved. They won't know exactly");
    await terminal.dentLine('where.');
    terminal.blank();

    await terminal.dent('Gravity drive engaged. Three days.');
    await terminal.dentLine("I'll keep watch. You should rest.");
    terminal.blank();
  }

  state.foldStatus = state.nullReserves < 15 ? 'LOCK' : 'READY';
  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// ACT 6: CHAPTER END
// ═══════════════════════════════════════════════════════

async function chapterEnd(terminal, state, effects, audio) {
  terminal.clear();

  terminal.say('  . . .', 'dim-text');
  terminal.blank();

  const travel = state.getFlag('travel_choice');
  if (travel === 'fold') {
    terminal.say('  Hours later.', 'dim-text');
  } else if (travel === 'gravity') {
    terminal.say('  Two days later.', 'dim-text');
  } else {
    terminal.say('  A day later.', 'dim-text');
  }
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.narrate("I'm in the bridge. Half-asleep. The gravity drive");
  await terminal.narrate("hums its monotone lullaby. DENT is running passive");
  await terminal.narrate("scans \u2014 a routine he's been maintaining since we");
  await terminal.narrate("left. The stars haven't changed.");
  terminal.blank();

  // ─── Subtle simulation clue #3: DENT deja vu ───
  await terminal.narrate('DENT pauses mid-scan. His large optic dims for a');
  await terminal.narrate('moment, then brightens.');
  terminal.blank();
  await terminal.dent('Vin. Did I already run this scan cycle?');
  await terminal.dentLine('My log says no, but I could have sworn...');
  terminal.blank();
  await wait(300);
  await terminal.dent('Never mind. Corrupted memory fragment.');
  await terminal.dentLine('Ignore me.');
  terminal.blank();

  await terminal.narrate('The Core Anomaly is out there, somewhere ahead.');
  await terminal.narrate("Too far to see. Too far to scan. But I know it's");
  await terminal.narrate('there the way you know the floor is under your');
  await terminal.narrate('feet. Certainty without evidence.');
  terminal.blank();

  if (state.getFlag('derelict_logs_found')) {
    await terminal.thought('A perpetual fold. Folding for thousands of years.');
    await terminal.thought('What did Navigator Kael discover? What was the');
    await terminal.thought('Core Anomaly, really?');
    terminal.blank();
  }

  await terminal.thought('I need to close the loop. Send the Echoes back.');
  await terminal.thought('To me. To past-me. So all of this happens.');
  await terminal.thought('So all of this matters.');
  terminal.blank();

  await terminal.narrate('I close my eyes.');
  terminal.blank();

  await wait(1000);

  // THE SIGNAL
  audio.play('echo_distant');

  await terminal.dent('Vin.');
  terminal.blank();
  await wait(500);

  await terminal.dent('Vin, wake up.');
  terminal.blank();

  await terminal.narrate("DENT's voice. Urgent in a way I haven't heard");
  await terminal.narrate('before.');
  terminal.blank();

  await terminal.dent('The sensor array is picking up something.');
  await terminal.dentLine('An Echo.');
  terminal.blank();

  await terminal.thought('Another Echo? From my future self?');
  terminal.blank();

  await terminal.dent("No. That's what's wrong. The signature doesn't");
  await terminal.dentLine('match yours.');
  terminal.blank();
  await wait(500);

  await terminal.dent("This Echo isn't from you, Vin.");
  await terminal.dentLine("It's from someone else.");
  terminal.blank();

  await wait(1000);

  await terminal.narrate('The sensor display pulses. A signal. Faint.');
  await terminal.narrate('Coming from the direction of the Core Anomaly.');
  terminal.blank();

  await terminal.narrate('Not my voice. Not my frequency. Not my loop.');
  terminal.blank();

  await terminal.highlight('Someone else sent an Echo.');
  terminal.blank();

  await terminal.narrate("And it's calling to us.");
  terminal.blank();

  await wait(1000);

  state.setFlag('echo_signal_detected', true);
  state.chapter = 2;
  await state.save();

  // End card
  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.say('  Chapter 1: Dead in the Water \u2014 Complete', 'dim-text');
  terminal.blank();

  // Stats summary
  terminal.sayHtml('<span class="c-hull">--- CHAPTER SUMMARY ----------------------------</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.sayHtml(`  <span class="c-white-bright">DENT:</span> ${Math.round(state.dentRepairLevel * 100)}% operational`);
  terminal.blank();

  const refuel = state.getFlag('refuel_choice');
  const travelEnd = state.getFlag('travel_choice');
  const refuelLabel = refuel ? refuel.charAt(0).toUpperCase() + refuel.slice(1) : 'unknown';
  const travelLabel = travelEnd ? travelEnd.charAt(0).toUpperCase() + travelEnd.slice(1) : 'unknown';
  terminal.say(`  Refueling: ${refuelLabel}`, 'dim-text');
  terminal.say(`  Departure: ${travelLabel}`, 'dim-text');
  if (state.getFlag('derelict_logs_found')) {
    terminal.say('  Discovered: Folder logs about the Core Anomaly', 'dim-text');
  }
  if (state.getFlag('dent_arm_repaired')) {
    terminal.say("  DENT's arm: Repaired", 'dim-text');
  }
  if (state.getFlag('used_torquer_mining')) {
    terminal.say(`  Torquer: Partially charged (${state.torquerNull}/10 cells)`, 'dim-text');
  }
  terminal.sayHtml('<span class="c-hull">------------------------------------------------</span>');
  terminal.blank();

  terminal.say('  Chapter 2 coming soon...', 'dim-text');
  terminal.blank();

  await terminal.pause('Press ENTER');
}
