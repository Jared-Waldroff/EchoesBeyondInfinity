/**
 * CHAPTER 4: COHERENCE SCRAMBLERS
 * Graves makes direct contact. Folder ship intercepts — Kade introduced.
 * Coherence Scrambler attacks. First major antagonist encounters.
 *
 * VALIDATION:
 * - Truby beats: #7 (Opponent & mystery), #8 (Fake-ally opponent)
 * - DENT repair level: 50-55% (mid-game transition, witty and curious)
 * - Simulation evidence: Subtle (minor text glitches, objects in wrong positions)
 * - Literary voice: Confrontation (Dashner 50% / Weir 30% / Cline 20%)
 *   transitioning to Character moments (Weir 50% / Cline 30% / Dashner 20%)
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter4(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_scrambler_attack');
  await terminal.chapterTitle(4, 'COHERENCE SCRAMBLERS');

  await gravesTransmission(terminal, state, effects, audio);
  await scramblerAttack(terminal, state, effects, audio);
  await folderIntercept(terminal, state, effects, audio);
  await kadeNegotiation(terminal, state, effects, audio);
  await aftermathAndRepair(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: GRAVES TRANSMISSION
// ═══════════════════════════════════════════════════════

async function gravesTransmission(terminal, state, effects, audio) {
  audio.ambient('theme_graves');
  /**
   * VALIDATION:
   * - Advance: Player learns SIC has Vin's fold signature on file
   * - Agency: Player chooses how to respond to Graves
   * - Consequence: Response shapes Graves' approach in future chapters
   * - Tone: Graves' calm corporate menace (Dashner institutional pressure)
   *
   * Truby beat: #7 (Opponent & mystery)
   * Reed tests: Understanding 5/5, Consequence 5/5, Strategy 4/5, Character 5/5, Tone 5/5
   */

  // --- Three days of running ---
  await terminal.narrate('Three days since RS-7. Three days of passive');
  await terminal.narrate('sensors and cold running. The Vex drifts on');
  await terminal.narrate('gravity drive, fold drive cooling, every');
  await terminal.narrate('system dialed to minimum signature.');
  terminal.blank();

  await terminal.thought('Twelve null cells burned just getting clear.');
  await terminal.thought('We\'re down to what we salvaged from the station.');
  terminal.blank();

  await wait(500);

  // --- DENT status ---
  await terminal.dent('Passive sweep complete. No SIC signatures');
  await terminal.dentLine('within two light-hours. But that\'s sensor');
  await terminal.dentLine('range, not safety range.');
  terminal.blank();

  await terminal.narrate('DENT taps his chest plate — a habit he\'s');
  await terminal.narrate('developed since the arm repair. Three quick');
  await terminal.narrate('taps when he\'s thinking. It makes a hollow');
  await terminal.narrate('sound, like knocking on a coffee can.');
  terminal.blank();

  await wait(300);

  await terminal.dent('I\'ve been monitoring the comms bands.');
  await terminal.dentLine('Standard SIC patrol chatter, encrypted.');
  await terminal.dentLine('Nothing addressed to us specifically.');
  terminal.blank();

  await terminal.thought('Small mercies.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- The transmission arrives ---
  audio.play('scan_ping');
  await effects.glitch(150);

  await terminal.warning('INCOMING TRANSMISSION — PRIORITY OVERRIDE');
  terminal.blank();

  await terminal.narrate('The comms panel lights up without warning.');
  await terminal.narrate('Not a broadcast. A direct, targeted signal.');
  await terminal.narrate('Someone punched through our passive screens');
  await terminal.narrate('like they weren\'t there.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin. Directed transmission. They know exactly');
  await terminal.dentLine('where we are.');
  terminal.blank();

  await terminal.thought('So much for hiding.');
  terminal.blank();

  await wait(500);

  // --- Graves speaks ---
  audio.play('comms_static');

  terminal.sayHtml('  <span class="c-red-bright">INCOMING — SIC DIRECTOR GRAVES</span>');
  terminal.sayHtml('  <span class="c-dim">Encryption: Military-grade / Carrier: Null-band</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"Mr. Vin."</span>');
  terminal.blank();

  await wait(800);

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"I trust the last three days have given you</span>');
  terminal.sayHtml('  <span class="c-white-bright">         time to reflect. Running consumes</span>');
  terminal.sayHtml('  <span class="c-white-bright">         resources. Reflection is free."</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('He\'s on a null-band carrier. That means');
  await terminal.dentLine('he\'s close enough to track our fold wake.');
  await terminal.dentLine('Two light-hours. Maybe less.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"Your fold signature is now catalogued in</span>');
  terminal.sayHtml('  <span class="c-white-bright">         every SIC monitoring station from Sol</span>');
  terminal.sayHtml('  <span class="c-white-bright">         to the Kuiper perimeter. Every time you</span>');
  terminal.sayHtml('  <span class="c-white-bright">         disturb the fabric, we will see it.</span>');
  terminal.sayHtml('  <span class="c-white-bright">         Within ninety seconds."</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('Ninety seconds. That\'s how long we have');
  await terminal.thought('between folding and company arriving.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"I\'m not asking you to surrender, Mr. Vin.</span>');
  terminal.sayHtml('  <span class="c-white-bright">         I\'m asking you to consider what happens</span>');
  terminal.sayHtml('  <span class="c-white-bright">         when you run out of places to run.</span>');
  terminal.sayHtml('  <span class="c-white-bright">         The Charter exists for a reason. Folding</span>');
  terminal.sayHtml('  <span class="c-white-bright">         is not a toy. It is a wound in spacetime</span>');
  terminal.sayHtml('  <span class="c-white-bright">         that may not heal."</span>');
  terminal.blank();

  await wait(500);

  // --- Tier 2: Vin's internal analysis ---
  await terminal.thought('He believes it. That\'s the terrifying part.');
  await terminal.thought('Graves isn\'t a zealot — he\'s a pragmatist');
  await terminal.thought('who thinks folding will unravel the fabric');
  await terminal.thought('of reality. And honestly? He might be right');
  await terminal.thought('about the damage. Wrong about the reason.');
  terminal.blank();

  await wait(300);

  // --- Player response ---
  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"I\'m extending a professional courtesy.</span>');
  terminal.sayHtml('  <span class="c-white-bright">         A direct channel. Use it wisely."</span>');
  terminal.blank();

  await wait(500);

  const responseIdx = await terminal.arrowMenu(
    ['Challenge him', 'Stay silent', 'Ask about the Echoes'],
    [
      'Defiant — demand to know why SIC fears folding so much',
      'Strategic — give nothing away, let him talk',
      'Curious — test what SIC knows about the signals',
    ]
  );
  terminal.blank();

  if (responseIdx === 0) {
    // Challenge
    state.setFlag('graves_response_ch4', 'challenge');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"You track me across three light-years to</span>');
    terminal.sayHtml('  <span class="c-white-bright">       give me a philosophy lecture? If folding</span>');
    terminal.sayHtml('  <span class="c-white-bright">       is so dangerous, explain the Echoes. Explain</span>');
    terminal.sayHtml('  <span class="c-white-bright">       why the universe is sending me signals."</span>');
    terminal.blank();

    await wait(500);

    terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"The universe isn\'t sending you anything,</span>');
    terminal.sayHtml('  <span class="c-white-bright">         Mr. Vin. You\'re hearing feedback from</span>');
    terminal.sayHtml('  <span class="c-white-bright">         your own damage to the fabric. A wound</span>');
    terminal.sayHtml('  <span class="c-white-bright">         doesn\'t speak. It bleeds."</span>');
    terminal.blank();

    await wait(500);

    terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"But I appreciate the honesty. I now know</span>');
    terminal.sayHtml('  <span class="c-white-bright">         you\'re following the signals. That narrows</span>');
    terminal.sayHtml('  <span class="c-white-bright">         my search considerably."</span>');
    terminal.blank();

    await terminal.thought('Damn it. Gave him too much.');
    state.applyDamage({ stress: 3 });

  } else if (responseIdx === 1) {
    // Silent
    state.setFlag('graves_response_ch4', 'silent');

    await terminal.narrate('The comms channel hums. Empty air between');
    await terminal.narrate('two people who understand each other perfectly.');
    terminal.blank();

    await wait(800);

    terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"Silence. I respect that more than bluster.</span>');
    terminal.sayHtml('  <span class="c-white-bright">         Most runners talk. Engineers calculate.</span>');
    terminal.sayHtml('  <span class="c-white-bright">         I\'ll remember that about you."</span>');
    terminal.blank();

    await terminal.thought('Good. Let him guess.');
    state.applyDamage({ neural: 2 }); // clarity from restraint

  } else {
    // Ask about Echoes
    state.setFlag('graves_response_ch4', 'echoes');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"What does the SIC know about null-band</span>');
    terminal.sayHtml('  <span class="c-white-bright">       Echo signals? Because I\'ve been receiving</span>');
    terminal.sayHtml('  <span class="c-white-bright">       them. And they\'re not random."</span>');
    terminal.blank();

    await wait(500);

    // Brief silence — Graves is surprised
    await terminal.narrate('A pause. Two seconds. For Graves, that\'s');
    await terminal.narrate('practically a confession of surprise.');
    terminal.blank();

    terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"Null-band echoes are a known artifact of</span>');
    terminal.sayHtml('  <span class="c-white-bright">         unregulated folding. The SIC has documented</span>');
    terminal.sayHtml('  <span class="c-white-bright">         over four hundred instances. All of them</span>');
    terminal.sayHtml('  <span class="c-white-bright">         decay within hours."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"If yours aren\'t decaying... that\'s concerning</span>');
    terminal.sayHtml('  <span class="c-white-bright">         for both of us."</span>');
    terminal.blank();

    await terminal.thought('He\'s worried. He doesn\'t know what the');
    await terminal.thought('Echoes are either. That makes two of us.');
    state.applyDamage({ neural: 3 }); // insight gained
  }

  state.setFlag('graves_direct_contact', true);

  await wait(500);

  // --- Transmission ends ---
  terminal.sayHtml('  <span class="c-white-bright">GRAVES:</span> <span class="c-white-bright">"This channel will remain open. I suspect</span>');
  terminal.sayHtml('  <span class="c-white-bright">         you\'ll need it before I do."</span>');
  terminal.blank();

  audio.play('comms_static');

  await terminal.narrate('The transmission cuts. Clean. No fade-out,');
  await terminal.narrate('no static trail. Just presence, then absence.');
  await terminal.narrate('Like he was never there.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Well. That was unpleasant.');
  terminal.blank();

  await terminal.dent('He\'s using chronometric dampeners to track');
  await terminal.dentLine('our fold wake. The signature degrades over');
  await terminal.dentLine('time, but every fold refreshes it. Ninety');
  await terminal.dentLine('seconds of anonymity. Then they see us.');
  terminal.blank();

  await terminal.thought('Ninety seconds. In space, that\'s nothing.');
  await terminal.thought('In engineering terms, it\'s a design constraint.');
  await terminal.thought('Work with what you\'ve got.');
  terminal.blank();

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: COHERENCE SCRAMBLER ATTACK
// ═══════════════════════════════════════════════════════

async function scramblerAttack(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Player experiences Coherence Scrambler firsthand
   * - Agency: Combat response choices (defensive/evasive/aggressive)
   * - Consequence: Damage level affects resources entering Kade scene
   * - Tone: Dashner compressed action prose, Weir specificity under fire
   *
   * Truby beat: #7 (Opponent counterattack)
   * Reed tests: Understanding 5/5, Consequence 4/5, Strategy 5/5, Tone 5/5
   */

  // --- Calm before ---
  await terminal.narrate('Four hours later. Still drifting. The Vex');
  await terminal.narrate('runs quiet. My hands have stopped shaking');
  await terminal.narrate('from the Graves call. Almost.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin. I\'m picking up something on passive.');
  await terminal.dentLine('Not SIC. Different signature. Faster. Smaller.');
  terminal.blank();

  await terminal.narrate('The scanner paints three contacts. Small');
  await terminal.narrate('ships. No transponders. Moving fast — 40km/s');
  await terminal.narrate('on an intercept vector.');
  terminal.blank();

  await terminal.thought('No transponders means no rules.');
  terminal.blank();

  await wait(500);

  // --- Attack begins ---
  audio.play('alarm');
  await effects.shake(300);

  await terminal.warning('COHERENCE SCRAMBLER DETECTED — INCOMING');
  terminal.blank();

  await terminal.narrate('The first pulse hits before I can react.');
  await terminal.narrate('Not a projectile. Not a beam. Something');
  await terminal.narrate('worse — a focused anti-curvature wave that');
  await terminal.narrate('rewrites null energy back to inert.');
  terminal.blank();

  await effects.flash('red', 200);
  await effects.screenTear(2, 150);

  await terminal.dentSystem('NULL CORE IMPACT');
  await terminal.dentSystem('───────────────────────────────────');
  await terminal.dentSystem(`Null reserves: ${state.nullReserves} → ${Math.max(0, state.nullReserves - 5)} cells`);
  await terminal.dentSystem('Scrambler type: Focused anti-curvature');
  await terminal.dentSystem('───────────────────────────────────');
  terminal.blank();

  state.applyDamage({ null: -5 });

  await terminal.dent('Five cells gone. Just like that. They\'re');
  await terminal.dentLine('rewriting our reserves at the quantum level.');
  terminal.blank();

  await wait(300);

  // --- Tactical choice ---
  await terminal.narrate('Two more contacts closing. Eighteen seconds');
  await terminal.narrate('to the next pulse. The fold drive needs');
  await terminal.narrate('fifteen cells minimum to initialize.');
  terminal.blank();

  const nullDisplay = state.nullReserves;
  terminal.sayHtml(`  <span class="c-hull">Current null: ${nullDisplay} cells | Fold minimum: 15</span>`);
  terminal.blank();

  const combatIdx = await terminal.arrowMenu(
    ['Evasive maneuvers', 'Divert power to shields', 'Emergency fold'],
    [
      `Gravity drive dodge — 0 cells, buys time, hull risk`,
      `Torquer shield — costs 3 cells, absorbs next hit`,
      `Fold away now — costs 18 cells, immediate escape${nullDisplay < 18 ? ' (INSUFFICIENT)' : ''}`,
    ]
  );
  terminal.blank();

  if (combatIdx === 0) {
    // Evasive
    state.setFlag('scrambler_damage_level', 'moderate');

    await terminal.narrate('I throw the Vex into a hard lateral burn.');
    await terminal.narrate('The gravity drive wasn\'t built for combat');
    await terminal.narrate('maneuvers. The hull screams.');
    terminal.blank();

    audio.play('hull_creak');
    await effects.shake(400);

    await terminal.narrate('Second pulse grazes us. Close.');
    terminal.blank();

    await effects.flash('red', 100);
    state.applyDamage({ hull: -3, null: -2 });

    await terminal.dentSystem(`Hull: ${state.hull}% | Null: ${state.nullReserves} cells`);
    terminal.blank();

    await terminal.dent('Glancing hit. Lost two more cells but hull');
    await terminal.dentLine('is holding. Third contact breaking off —');
    await terminal.dentLine('they\'re not coordinating well.');
    terminal.blank();

    await terminal.thought('Amateurs. Dangerous amateurs, but still.');
    terminal.blank();

  } else if (combatIdx === 1) {
    // Shield
    state.setFlag('scrambler_damage_level', 'light');

    if (state.nullReserves >= 3) {
      state.applyDamage({ null: -3 });

      await terminal.narrate('I raise the Torquer. The barrier snaps');
      await terminal.narrate('into existence — a shimmering plane of');
      await terminal.narrate('curved spacetime between us and them.');
      terminal.blank();

      audio.play('shield_up');

      await terminal.narrate('The scrambler pulse hits the barrier.');
      await terminal.narrate('Absorbed. Dispersed. The Torquer hums,');
      await terminal.narrate('hot against my forearm.');
      terminal.blank();

      await terminal.dentSystem(`Torquer shield: HELD | Null: ${state.nullReserves} cells`);
      terminal.blank();

      await terminal.dent('Shield absorbed the pulse. Clean deflection.');
      await terminal.dentLine('But we can\'t keep spending cells on defense.');
      terminal.blank();
    } else {
      await terminal.narrate('I raise the Torquer. Nothing happens.');
      await terminal.narrate('Three cells minimum. I don\'t have three cells.');
      terminal.blank();

      await terminal.dent('Insufficient reserves for shield. Vin —');
      terminal.blank();

      await effects.flash('red', 200);
      state.applyDamage({ hull: -5, null: -3 });
      state.setFlag('scrambler_damage_level', 'heavy');

      await terminal.narrate('The second pulse hits dead-on.');
      terminal.blank();

      await terminal.dentSystem(`Hull: ${state.hull}% | Null: ${state.nullReserves} cells`);
      terminal.blank();
    }

  } else {
    // Emergency fold
    if (state.nullReserves >= 18) {
      state.setFlag('scrambler_damage_level', 'none');
      state.applyDamage({ null: -18, stress: 5 });

      await terminal.narrate('No time to calculate. No time to plan.');
      await terminal.narrate('I slam the fold drive to emergency init.');
      terminal.blank();

      await effects.foldEffect(terminal);
      await effects.flash('white', 400);
      await effects.glitch(300);

      await terminal.narrate('Space bends. The attackers vanish.');
      await terminal.narrate('We drop out 0.3 light-years away, the fold');
      await terminal.narrate('drive smoking and overheated.');
      terminal.blank();

      await terminal.dentSystem(`Emergency fold complete | Null: ${state.nullReserves} cells`);
      terminal.blank();

      await terminal.dent('That was inelegant. Fold stability at 31%.');
      await terminal.dentLine('We need to let the drive cool before');
      await terminal.dentLine('attempting that again.');
      terminal.blank();

      state.foldStability = 31;
    } else {
      state.setFlag('scrambler_damage_level', 'heavy');

      await terminal.narrate('I reach for the fold drive controls.');
      await terminal.narrate(`${state.nullReserves} cells. Minimum is 15.`);
      await terminal.narrate('The math doesn\'t work. Math is annoying');
      await terminal.narrate('like that.');
      terminal.blank();

      await effects.flash('red', 300);
      await effects.shake(500, 'heavy');
      state.applyDamage({ hull: -8, null: -4 });

      await terminal.narrate('Both pulses hit. The Vex lurches.');
      terminal.blank();

      await terminal.dentSystem(`Hull: ${state.hull}% | Null: ${state.nullReserves} cells`);
      terminal.blank();

      await terminal.dent('Hull breach in cargo section. Sealed');
      await terminal.dentLine('automatically. We\'re hurt, Vin.');
      terminal.blank();
    }
  }

  state.setFlag('scrambler_hit', true);

  await wait(500);

  // --- Attackers disengage ---
  await terminal.narrate('The three contacts break formation. Not');
  await terminal.narrate('retreating — repositioning. They orbit at');
  await terminal.narrate('a distance, watching.');
  terminal.blank();

  await terminal.dent('They\'re not SIC. The scrambler tech is');
  await terminal.dentLine('SIC-derived but the ships are modified');
  await terminal.dentLine('civilian hulls. Black market hardware.');
  terminal.blank();

  await terminal.thought('Folders. Has to be. Who else steals SIC');
  await terminal.thought('weapons and bolts them onto cargo ships?');
  terminal.blank();

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: FOLDER INTERCEPT
// ═══════════════════════════════════════════════════════

async function folderIntercept(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Player meets the Folders faction; learns they exist
   * - Agency: How to handle the intercept
   * - Consequence: Sets up Kade introduction and alliance terms
   * - Tone: Tension shifting to dark humor (Dashner→Weir transition)
   *
   * Truby beat: #8 (Fake-ally opponent)
   * Reed tests: Understanding 5/5, Consequence 5/5, Strategy 4/5, Character 4/5, Tone 5/5
   */

  // --- Hail ---
  audio.play('comms_static');

  await terminal.narrate('A new signal. Different frequency. Unencrypted.');
  await terminal.narrate('Deliberately unencrypted — they want us to');
  await terminal.narrate('hear them.');
  terminal.blank();

  await terminal.dent('Incoming hail. Open channel. No encryption.');
  await terminal.dentLine('Either they\'re stupid or they want us to');
  await terminal.dentLine('know they\'re not trying to hide.');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-cyan">UNKNOWN VESSEL — OPEN CHANNEL</span>');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">???:</span> <span class="c-white-bright">"Hey! Don\'t shoot. Or fold. Or whatever</span>');
  terminal.sayHtml('  <span class="c-white-bright">      it is you do. My guys got a little</span>');
  terminal.sayHtml('  <span class="c-white-bright">      enthusiastic. They\'re new."</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('The voice is coming from a fourth contact.');
  await terminal.dentLine('Larger vessel. Been sitting outside our');
  await terminal.dentLine('sensor range the whole time. Watching.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">???:</span> <span class="c-white-bright">"Name\'s Kade. I run this particular circus.</span>');
  terminal.sayHtml('  <span class="c-white-bright">      And you, friend, are the most interesting</span>');
  terminal.sayHtml('  <span class="c-white-bright">      thing we\'ve seen in months."</span>');
  terminal.blank();

  await wait(300);

  // --- Player choice: how to handle ---
  const interceptIdx = await terminal.arrowMenu(
    ['Demand an explanation', 'Play along', 'Threaten to fold away'],
    [
      'Direct — why did your ships attack us?',
      'Cautious — hear what he wants before revealing anything',
      'Aggressive — you know we can fold, don\'t test us',
    ]
  );
  terminal.blank();

  state.setFlag('folder_intercept_method', ['demand', 'cautious', 'threaten'][interceptIdx]);

  if (interceptIdx === 0) {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Your ships fired on us. Those were Coherence</span>');
    terminal.sayHtml('  <span class="c-white-bright">       Scramblers. SIC weapons. Explain."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Fair point. Also fair: you\'re an unregistered</span>');
    terminal.sayHtml('  <span class="c-white-bright">       fold-capable vessel in our territory. We</span>');
    terminal.sayHtml('  <span class="c-white-bright">       don\'t get a lot of those. Had to test if</span>');
    terminal.sayHtml('  <span class="c-white-bright">       you were real or bait."</span>');
    terminal.blank();

  } else if (interceptIdx === 1) {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I\'m listening."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Smart. I like that. Most people in your</span>');
    terminal.sayHtml('  <span class="c-white-bright">       position start screaming. You\'re calculating.</span>');
    terminal.sayHtml('  <span class="c-white-bright">       I can work with a calculator."</span>');
    terminal.blank();

  } else {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Touch us again and we fold. You know we can.</span>');
    terminal.sayHtml('  <span class="c-white-bright">       You know what that means for your sensors."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Oh, I know exactly what you can do. That\'s</span>');
    terminal.sayHtml('  <span class="c-white-bright">       why I\'m talking instead of shooting. Fold-</span>');
    terminal.sayHtml('  <span class="c-white-bright">       capable ships are rare. I don\'t waste rare</span>');
    terminal.sayHtml('  <span class="c-white-bright">       things."</span>');
    terminal.blank();
  }

  await wait(500);

  // --- Kade's pitch ---
  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Here\'s the situation, Mr. Fold Drive. The</span>');
  terminal.sayHtml('  <span class="c-white-bright">       SIC is hunting you. You know it. I know it.</span>');
  terminal.sayHtml('  <span class="c-white-bright">       Graves probably told you himself — he likes</span>');
  terminal.sayHtml('  <span class="c-white-bright">       the dramatic touch."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Now, I could let you drift out here until</span>');
  terminal.sayHtml('  <span class="c-white-bright">       they find you. Or — and this is the better</span>');
  terminal.sayHtml('  <span class="c-white-bright">       option — we could help each other."</span>');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin. He\'s a Folder. Black market null energy');
  await terminal.dentLine('traders. They exploit folding technology for');
  await terminal.dentLine('profit. The SIC considers them criminals.');
  terminal.blank();

  await terminal.dent('But criminals with resources.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: KADE NEGOTIATION
// ═══════════════════════════════════════════════════════

async function kadeNegotiation(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Player learns Folders' goals, gets Frequency Code
   * - Agency: Alliance terms negotiation
   * - Consequence: Terms affect Ch 5-10 relationship with Folders
   * - Tone: Kade's charismatic danger (Cline enthusiasm + Dashner unpredictability)
   *
   * Truby beat: #8 (Fake-ally opponent)
   * Reed tests: Understanding 5/5, Consequence 5/5, Strategy 5/5, Character 5/5, Tone 5/5
   */

  // --- Kade explains the Folders ---
  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Let me be transparent. I run a group called</span>');
  terminal.sayHtml('  <span class="c-white-bright">       the Folders. We fold. That\'s what we do.</span>');
  terminal.sayHtml('  <span class="c-white-bright">       The SIC says it\'s illegal. We say the SIC</span>');
  terminal.sayHtml('  <span class="c-white-bright">       doesn\'t own spacetime."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"We\'ve been watching your fold signatures.</span>');
  terminal.sayHtml('  <span class="c-white-bright">       Impressive work. Single-ship fold drive,</span>');
  terminal.sayHtml('  <span class="c-white-bright">       homemade from the looks of it. Most Folders</span>');
  terminal.sayHtml('  <span class="c-white-bright">       use modified SIC tech. Yours is original."</span>');
  terminal.blank();

  await terminal.thought('He knows about the Torquer. Or at least');
  await terminal.thought('he knows what it does. How long has he');
  await terminal.thought('been watching?');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"I want what you want — to reach the Core</span>');
  terminal.sayHtml('  <span class="c-white-bright">       Anomaly. That\'s where the real prize is.</span>');
  terminal.sayHtml('  <span class="c-white-bright">       The biggest null energy source in the known</span>');
  terminal.sayHtml('  <span class="c-white-bright">       universe. Unlimited folding. No more SIC.</span>');
  terminal.sayHtml('  <span class="c-white-bright">       No more running."</span>');
  terminal.blank();

  await wait(300);

  await terminal.dent('The Core Anomaly. That\'s the source of the');
  await terminal.dentLine('Echo signals. He doesn\'t know about the');
  await terminal.dentLine('Echoes specifically — he just wants the null.');
  terminal.blank();

  await terminal.thought('Different motivations. Same destination.');
  await terminal.thought('That\'s either convenient or a trap.');
  terminal.blank();

  // --- Kade's offer ---
  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Look, I\'m gonna screw you over eventually.</span>');
  terminal.sayHtml('  <span class="c-white-bright">       We both know it. But right now? We need</span>');
  terminal.sayHtml('  <span class="c-white-bright">       each other. So let\'s be friends until</span>');
  terminal.sayHtml('  <span class="c-white-bright">       we\'re not."</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('I appreciate the honesty. My threat assessment');
  await terminal.dentLine('subroutines appreciate it considerably less.');
  terminal.blank();

  // --- Alliance terms ---
  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Here\'s what I\'m offering: Folder frequency</span>');
  terminal.sayHtml('  <span class="c-white-bright">       codes. Access to our network. Supply caches,</span>');
  terminal.sayHtml('  <span class="c-white-bright">       nav data, safe harbors. In return..."</span>');
  terminal.blank();

  await wait(300);

  const termsIdx = await terminal.arrowMenu(
    ['Accept the alliance', 'Negotiate harder', 'Take the codes, owe nothing'],
    [
      'Standard terms — share fold data, coordinate routes',
      'Push for better — demand null cells upfront, limit data sharing',
      'Aggressive — accept resources, refuse obligations',
    ]
  );
  terminal.blank();

  if (termsIdx === 0) {
    state.setFlag('kade_alliance_terms', 'standard');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Friends until we\'re not. I can work with that."</span>');
    terminal.blank();

    terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"See? Calculator. I knew I liked you."</span>');
    terminal.blank();

    // Bonus: Kade sends null cells as goodwill
    state.applyDamage({ null: 10 });

    await terminal.dentSystem(`Folder resupply: +10 null cells | Total: ${state.nullReserves}`);
    terminal.blank();

    await terminal.dent('He\'s sending a supply drone. Ten null cells.');
    await terminal.dentLine('Either very generous or very confident he\'ll');
    await terminal.dentLine('get them back.');
    terminal.blank();

  } else if (termsIdx === 1) {
    state.setFlag('kade_alliance_terms', 'negotiated');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I\'ll share route data. Not fold drive specs.</span>');
    terminal.sayHtml('  <span class="c-white-bright">       And I want cells upfront. Fifteen minimum."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Fifteen? You drive a hard bargain for someone</span>');
    terminal.sayHtml('  <span class="c-white-bright">       who just got shot at by my people. I\'ll do</span>');
    terminal.sayHtml('  <span class="c-white-bright">       twelve. Final offer."</span>');
    terminal.blank();

    state.applyDamage({ null: 12 });

    await terminal.dentSystem(`Folder resupply: +12 null cells | Total: ${state.nullReserves}`);
    terminal.blank();

    await terminal.dent('Twelve cells. Better than nothing. And he');
    await terminal.dentLine('respects the negotiation. That might matter');
    await terminal.dentLine('later.');
    terminal.blank();

  } else {
    state.setFlag('kade_alliance_terms', 'aggressive');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Send the codes. I\'ll use your caches.</span>');
    terminal.sayHtml('  <span class="c-white-bright">       But I don\'t owe you anything."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Bold. Stupid, but bold. Fine. Take the codes.</span>');
    terminal.sayHtml('  <span class="c-white-bright">       But when you need something you can\'t get</span>');
    terminal.sayHtml('  <span class="c-white-bright">       alone — and you will — remember who offered</span>');
    terminal.sayHtml('  <span class="c-white-bright">       first."</span>');
    terminal.blank();

    // Minimal resupply — only 5 cells
    state.applyDamage({ null: 5 });

    await terminal.dentSystem(`Folder resupply: +5 null cells | Total: ${state.nullReserves}`);
    terminal.blank();

    state.applyDamage({ stress: 3 });
  }

  // --- Frequency codes received ---
  state.setFlag('kade_introduced', true);
  state.setFlag('kade_frequency_obtained', true);
  state.addItem('Folder Frequency Code');

  audio.play('scan_ping');

  await terminal.dentSystem('NEW ITEM ACQUIRED');
  await terminal.dentSystem('───────────────────────────────────');
  await terminal.dentSystem('Folder Frequency Code');
  await terminal.dentSystem('Access to Folder network, supply caches,');
  await terminal.dentSystem('and encrypted communications.');
  await terminal.dentSystem('───────────────────────────────────');
  terminal.blank();

  await wait(300);

  // --- Kade's parting shot ---
  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"One more thing. That Echo signal you\'re</span>');
  terminal.sayHtml('  <span class="c-white-bright">       chasing? My people have picked up fragments</span>');
  terminal.sayHtml('  <span class="c-white-bright">       too. Never strong enough to decode. But you</span>');
  terminal.sayHtml('  <span class="c-white-bright">       seem to have a special relationship with it."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">KADE:</span> <span class="c-white-bright">"Whatever\'s at the Core Anomaly, it\'s calling</span>');
  terminal.sayHtml('  <span class="c-white-bright">       you specifically. That either makes you</span>');
  terminal.sayHtml('  <span class="c-white-bright">       the most important person in the universe</span>');
  terminal.sayHtml('  <span class="c-white-bright">       or the most dangerous. I\'m betting both."</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('He cut the channel. The three escort ships');
  await terminal.dentLine('are peeling off. Heading back to... wherever');
  await terminal.dentLine('Folders go.');
  terminal.blank();

  await terminal.thought('Friends until we\'re not.');
  await terminal.thought('I give it six chapters.');
  terminal.blank();

  // --- Subtle simulation glitch ---
  await effects.glitch(80);

  await terminal.narrate('For a moment — just a moment — the star');
  await terminal.narrate('field through the viewport stutters. Like');
  await terminal.narrate('a frame dropped from a video feed.');
  terminal.blank();

  await terminal.dent('Did you see that?');
  terminal.blank();

  await terminal.thought('See what?');
  terminal.blank();

  await terminal.dent('Nothing. Sensor artifact. Probably.');
  terminal.blank();

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: AFTERMATH AND DENT REPAIR
// ═══════════════════════════════════════════════════════

async function aftermathAndRepair(terminal, state, effects, audio) {
  /**
   * VALIDATION:
   * - Advance: Player processes the two encounters; optional DENT repair
   * - Agency: DENT repair choice, quiet character moment decisions
   * - Consequence: Repair choice affects DENT capabilities going forward
   * - Tone: Weir quiet moment + Cline tech reverence
   *
   * Truby beat: #6 (Ally solidifies)
   * Reed tests: Understanding 4/5, Consequence 5/5, Character 5/5, Tone 5/5
   */

  // --- Quiet moment ---
  await terminal.narrate('The Vex drifts. Alone again. The scanner');
  await terminal.narrate('shows empty space in every direction. Just');
  await terminal.narrate('us and the dark.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('I lean back in the command chair and stare');
  await terminal.narrate('at the ceiling. The overhead lighting flickers —');
  await terminal.narrate('thermal damage from the scrambler hit. Adds');
  await terminal.narrate('character, I tell myself.');
  terminal.blank();

  await terminal.thought('Two factions. Both dangerous. Both want');
  await terminal.thought('something from me. Graves wants me stopped.');
  await terminal.thought('Kade wants me useful. Neither wants me free.');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin. I\'ve been running diagnostics. The');
  await terminal.dentLine('scrambler attack exposed some vulnerabilities');
  await terminal.dentLine('in my sensor suite. I have a recommendation.');
  terminal.blank();

  // --- DENT repair opportunity ---
  if (state.hasItem('Optical Calibration Chip')) {
    await terminal.dent('That optical calibration chip we found on');
    await terminal.dentLine('RS-7? I can integrate it now. It would');
    await terminal.dentLine('give me a secondary optic — better hazard');
    await terminal.dentLine('detection, hidden path identification.');
    terminal.blank();

    const repairIdx = await terminal.arrowMenu(
      ['Install the secondary optic', 'Save it for later'],
      [
        'DENT gains hazard detection and alternate path spotting',
        'Keep the chip — might need it for something else',
      ]
    );
    terminal.blank();

    if (repairIdx === 0) {
      state.setFlag('dent_secondary_optic', true);
      state.dentRepairLevel = Math.min(1.0, state.dentRepairLevel + 0.05);
      state.removeItem('Optical Calibration Chip');

      await terminal.narrate('The installation takes forty minutes. DENT');
      await terminal.narrate('sits perfectly still while I work, his');
      await terminal.narrate('remaining optic dimmed to standby.');
      terminal.blank();

      await terminal.narrate('The new optic clicks into the empty socket');
      await terminal.narrate('on the left side of his head. A moment of');
      await terminal.narrate('darkness. Then both optics light up — the');
      await terminal.narrate('original bright amber, the new one a cooler');
      await terminal.narrate('blue-white.');
      terminal.blank();

      audio.play('scan_ping');

      await terminal.dent('Oh. That\'s... considerably better.');
      await terminal.dentLine('I can see in three additional wavelengths.');
      await terminal.dentLine('Infrared, ultraviolet, and — huh.');
      terminal.blank();

      await wait(300);

      await terminal.dent('Vin, did you know you have a hairline');
      await terminal.dentLine('fracture in your left wrist? It\'s healing,');
      await terminal.dentLine('but it\'s there. Must have happened during');
      await terminal.dentLine('the scrambler attack.');
      terminal.blank();

      await terminal.thought('I didn\'t know that. Hadn\'t even felt it.');
      await terminal.thought('Having a robot that can see your bones');
      await terminal.thought('is either very useful or very unsettling.');
      terminal.blank();

      await terminal.dentSystem(`DENT upgraded: Secondary Optic online`);
      await terminal.dentSystem(`DENT capacity: ${Math.round(state.dentRepairLevel * 100)}%`);
      terminal.blank();
    } else {
      await terminal.dent('Understood. I\'ll keep running on the');
      await terminal.dentLine('single optic. It\'s worked this long.');
      terminal.blank();
    }
  } else {
    await terminal.dent('I could use an optical calibration chip');
    await terminal.dentLine('for my secondary optic socket. If we');
    await terminal.dentLine('find one, it would expand my detection');
    await terminal.dentLine('capabilities significantly.');
    terminal.blank();

    await terminal.thought('Noted. Add it to the list.');
    terminal.blank();
  }

  await wait(500);

  // --- Echo flashback opportunity ---
  await terminal.narrate('Something tugs at the edge of memory. A');
  await terminal.narrate('fragment. Not the attack, not RS-7. Something');
  await terminal.narrate('older. The signal — the first Echo.');
  terminal.blank();

  const flashbackIdx = await terminal.arrowMenu(
    ['Follow the memory', 'Push it aside'],
    [
      'Risk the neural strain — explore when you first received the Echo',
      'Stay focused on the present — deal with what\'s in front of you',
    ]
  );
  terminal.blank();

  if (flashbackIdx === 0) {
    state.setFlag('flashback_echo_receipt', true);
    state.applyDamage({ neural: -5, stress: 5 });

    await effects.glitch(200);
    await terminal.clearSmooth();

    // --- Flashback: The night the Echoes started ---
    await terminal.flashback('Memory fragment: The Night the Signal Came');
    terminal.blank();

    await terminal.flashbackVivid('A university lab. Late. The kind of late');
    await terminal.flashbackVivid('where the cleaning staff has come and gone');
    await terminal.flashbackVivid('and come again. Coffee rings on every surface.');
    terminal.blank();

    await terminal.flashbackVivid('The Casimir array — my array — humming at');
    await terminal.flashbackVivid('a frequency it shouldn\'t be able to reach.');
    await terminal.flashbackVivid('Negative energy density readings off the scale.');
    terminal.blank();

    await terminal.flashbackVivid('And then the signal. Not from outside. From');
    await terminal.flashbackVivid('inside the array. From inside the vacuum gap');
    await terminal.flashbackVivid('itself. Data encoded in the quantum foam.');
    terminal.blank();

    await wait(500);

    await terminal.flashbackVivid('Numbers. Coordinates. A frequency pattern');
    await terminal.flashbackVivid('that mapped to — no. That IS a star chart.');
    await terminal.flashbackVivid('Someone sent me a map. Through spacetime.');
    terminal.blank();

    await terminal.flashbackVivid('My hands are shaking. Not fear. Recognition.');
    await terminal.flashbackVivid('The encoding — it uses my compression algorithm.');
    await terminal.flashbackVivid('The one I published last year. Nobody else');
    await terminal.flashbackVivid('uses it. Nobody.');
    terminal.blank();

    await wait(500);

    await terminal.flashbackVivid('Which means the sender knows my work.');
    await terminal.flashbackVivid('Or the sender IS my work.');
    terminal.blank();

    await effects.glitch(200);
    await terminal.clearSmooth();

    // --- Back to present ---
    await terminal.narrate('The memory recedes. My hands are trembling');
    await terminal.narrate('again. Neural strain — flashbacks cost');
    await terminal.narrate('something every time.');
    terminal.blank();

    await terminal.dent('Vin. Your neural readings dipped. Another');
    await terminal.dentLine('flashback?');
    terminal.blank();

    await terminal.thought('The signal used my own compression algorithm.');
    await terminal.thought('Which means I sent it. Or I will send it.');
    await terminal.thought('The loop. Always the loop.');
    terminal.blank();

    await terminal.dentSystem(`Neural: ${state.neural}% | Stress: ${state.stress}%`);
    terminal.blank();

  } else {
    await terminal.narrate('I push the fragment back. File it under');
    await terminal.narrate('"later." The present has enough problems.');
    terminal.blank();

    await terminal.dent('Probably wise. Your neural readings are');
    await terminal.dentLine('stable. Let\'s keep them that way.');
    terminal.blank();
  }

  // --- Tier 3: Technical log available ---
  await terminal.narrate('The comms panel blinks — Kade\'s frequency');
  await terminal.narrate('codes are loaded. New channels available.');
  terminal.blank();

  const examineIdx = await terminal.arrowMenu(
    ['Examine the Folder network data', 'Move on'],
    [
      'Tier 3: Technical analysis of Folder communications',
      'Skip — focus on the next waypoint',
    ]
  );
  terminal.blank();

  if (examineIdx === 0) {
    terminal.sayHtml('  <span class="c-dim">[TECHNICAL LOG // FOLDER FREQUENCY CODE]</span>');
    terminal.blank();
    await terminal.logEntry('Carrier: Null-band subharmonic (non-standard)');
    await terminal.logEntry('Encoding: Modified Casimir-resonance hopping');
    await terminal.logEntry('Network nodes: 14 confirmed, ~30 estimated');
    await terminal.logEntry('Coverage: Sol system perimeter to 8 LY radius');
    await terminal.logEntry('');
    await terminal.logEntry('Note: The frequency hopping pattern is elegant.');
    await terminal.logEntry('It uses the same quantum foam encoding as the');
    await terminal.logEntry('Echoes. Coincidence? The Folders didn\'t invent');
    await terminal.logEntry('this — they reverse-engineered it from something.');
    terminal.blank();

    await terminal.thought('From the Echoes. They intercepted fragments');
    await terminal.thought('and built a communications network on them.');
    await terminal.thought('The whole Folder operation is built on');
    await terminal.thought('signals they don\'t understand.');
    terminal.blank();

    state.applyDamage({ neural: 3 }); // insight
  }

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 6: CHAPTER END
// ═══════════════════════════════════════════════════════

async function chapterEnd(terminal, state, effects, audio) {
  // --- New heading ---
  await terminal.narrate('The next waypoint glows on the nav display.');
  await terminal.narrate('4.7 light-years. The Echo signal is strongest');
  await terminal.narrate('in that direction — a bearing that cuts');
  await terminal.narrate('through unmapped space toward the system edge.');
  terminal.blank();

  await wait(500);

  await terminal.dent('I\'ve plotted three possible routes. All of');
  await terminal.dentLine('them pass through monitored sectors. There\'s');
  await terminal.dentLine('no clean path out of the solar system.');
  terminal.blank();

  await terminal.thought('No clean path. Just degrees of dirty.');
  terminal.blank();

  await terminal.dent('There\'s a waystation at the edge of mapped');
  await terminal.dentLine('space. Outpost designation unclear — Folder');
  await terminal.dentLine('network marks it as a resupply point. We');
  await terminal.dentLine('could refuel, acquire a deep space nav chart,');
  await terminal.dentLine('and attempt the jump to unmapped territory.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('The Echo pulses. Patient. Persistent.');
  await terminal.narrate('Whatever is at the Core Anomaly, it\'s');
  await terminal.narrate('waiting. It\'s been waiting a long time.');
  terminal.blank();

  await wait(500);

  // --- Closing DENT dialogue ---
  await terminal.dent('Vin. Before we plan the next fold...');
  terminal.blank();

  await wait(300);

  await terminal.dent('The Graves transmission. The Folder attack.');
  await terminal.dentLine('The alliance with someone who told us to');
  await terminal.dentLine('our face he\'d betray us. That\'s a lot for');
  await terminal.dentLine('one day.');
  terminal.blank();

  await terminal.dent('How are you doing? Actual answer, not the');
  await terminal.dentLine('engineering answer.');
  terminal.blank();

  // --- Character moment ---
  const moodIdx = await terminal.arrowMenu(
    ['Honest', 'Deflect with humor', 'Focus on the mission'],
    [
      '"Scared. But moving."',
      '"I\'ve been better. I\'ve also been dead, so, curve."',
      '"Doesn\'t matter. The signal matters."',
    ]
  );
  terminal.blank();

  if (moodIdx === 0) {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Scared. But moving. That\'s the best I\'ve got."</span>');
    terminal.blank();

    await wait(300);

    await terminal.dent('That\'s enough. Scared but moving is a');
    await terminal.dentLine('perfectly acceptable operational state.');
    await terminal.dentLine('I should know — I\'ve been running my');
    await terminal.dentLine('diagnostics on it for three chapters.');
    terminal.blank();

  } else if (moodIdx === 1) {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I\'ve been better. I\'ve also been dead,</span>');
    terminal.sayHtml('  <span class="c-white-bright">       apparently. So, curve."</span>');
    terminal.blank();

    await wait(300);

    await terminal.dent('Your humor subroutines are functioning.');
    await terminal.dentLine('I\'ll take that as a positive diagnostic.');
    terminal.blank();

  } else {
    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Doesn\'t matter how I\'m doing. The signal</span>');
    terminal.sayHtml('  <span class="c-white-bright">       matters. The Core Anomaly matters."</span>');
    terminal.blank();

    await wait(300);

    await terminal.dent('Noted. Also noting that deflecting personal');
    await terminal.dentLine('questions toward the mission is a documented');
    await terminal.dentLine('stress response. I\'ll log it for later.');
    terminal.blank();

    state.applyDamage({ stress: 2 });
  }

  await wait(500);

  // --- Set chapter flags ---
  state.setFlag('chapter4_complete', true);
  state.chapter = 5;
  await state.save();

  // --- End card ---
  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 4: Coherence Scramblers — Complete</span>');
  terminal.blank();

  const dentPercent = Math.round(state.dentRepairLevel * 100);
  const foldColor = state.foldStatus === 'READY' ? 'c-green' : 'c-dim';

  terminal.sayHtml('<span class="c-hull">--- CHAPTER SUMMARY ----------------------------</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.sayHtml(`  <span class="c-white-bright">DENT:</span> ${dentPercent}% operational`);
  terminal.sayHtml(`  <span class="c-white-bright">Fold Drive:</span> <span class="${foldColor}">${state.foldStatus}</span> (Stability: ${state.foldStability}%)`);
  terminal.blank();

  const gravesResponse = state.getFlag('graves_response_ch4') || 'unknown';
  const kadeTerms = state.getFlag('kade_alliance_terms') || 'unknown';
  const scrambler = state.getFlag('scrambler_damage_level') || 'unknown';
  const hasOptic = state.getFlag('dent_secondary_optic');
  const hasFlashback = state.getFlag('flashback_echo_receipt');

  terminal.sayHtml(`  <span class="c-dim">Graves response: ${gravesResponse.charAt(0).toUpperCase() + gravesResponse.slice(1)}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Scrambler damage: ${scrambler.charAt(0).toUpperCase() + scrambler.slice(1)}</span>`);
  terminal.sayHtml(`  <span class="c-dim">Kade alliance: ${kadeTerms.charAt(0).toUpperCase() + kadeTerms.slice(1)}</span>`);
  terminal.sayHtml(`  <span class="c-dim">DENT secondary optic: ${hasOptic ? 'installed' : 'not installed'}</span>`);
  if (hasFlashback) {
    terminal.sayHtml('  <span class="c-dim">Memory: The Night the Signal Came recovered</span>');
  }
  terminal.sayHtml('  <span class="c-cyan">Folder Status: ALLIANCE ACTIVE</span>');
  terminal.sayHtml('  <span class="c-red-bright">SIC Status: ACTIVE PURSUIT</span>');
  terminal.sayHtml('<span class="c-hull">------------------------------------------------</span>');
  terminal.blank();

  await terminal.pause();
}
