/**
 * CHAPTER 10: CALCULATING THE BETRAYAL
 * Forced alliance solidifies. Net Disruptor built. Torquer retrieved.
 * Kade betrayal -- or Vin betrays first.
 *
 * Truby beats: #13 (Attack by ally), #15 (Second revelation)
 * Player variance: Alliance terms, who betrays first
 * Convergence: Disruptor built, Torquer retrieved or replaced
 * Literary voice: Strategy + Betrayal (Weir 40% / Dashner 40% / Cline 20%)
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// =======================================================
// MAIN ENTRY POINT
// =======================================================

export async function runChapter10(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_betrayal');
  await terminal.chapterTitle(10, 'CALCULATING THE BETRAYAL');

  await allianceConsolidation(terminal, state, effects, audio);
  await disruptorConstruction(terminal, state, effects, audio);
  await torquerRetrieval(terminal, state, effects, audio);
  await theBetrayal(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// =======================================================
// SCENE 1: ALLIANCE CONSOLIDATION
// =======================================================

async function allianceConsolidation(terminal, state, effects, audio) {
  /*
   * Vin and Kade meet at a neutral rendezvous. Folder fleet remnants arrive.
   * Negotiation over Disruptor control and contributions.
   *
   * VALIDATION:
   * - Truby #13 setup: alliance terms define who has leverage to betray later
   * - Reed: Dramatic Question -- can Vin trust an enemy enough to build with her?
   * - Reed: But/Therefore -- Net is still active, BUT Kade brings three ships
   * - Consequence: forced_alliance_terms shapes Scene 4 betrayal eligibility
   * - Simulation: subtle -- physics behave normally while Vin watches
   */
  audio.ambient('deep_space');

  await terminal.narrate('The rendezvous point is a dead zone -- a region');
  await terminal.narrate('where the Coherence Net thins out between relay');
  await terminal.narrate('nodes. Not a gap, exactly. More like a held breath.');
  await terminal.narrate('Somewhere the Net is listening, just not as hard.');
  terminal.blank();

  await terminal.thought('Neutral ground. Her choice. I hate that I can\'t');
  await terminal.thought('find fault with it.');
  terminal.blank();

  await wait(400);

  audio.play('thruster_burn');

  await terminal.narrate('Three ships drop out of slow-burn on the far side');
  await terminal.narrate('of the debris field. Folder-class: lean, angular,');
  await terminal.narrate('built for speed over durability. They hold position');
  await terminal.narrate('two hundred kilometers out, weapons cold.');
  terminal.blank();

  await terminal.dent('Three contacts. Folder configuration. No targeting');
  await terminal.dentLine('locks -- they\'re keeping their guns down. For now.');
  terminal.blank();

  await terminal.thought('Three ships. She came with three ships and called');
  await terminal.thought('this a partnership. I came alone and called it');
  await terminal.thought('the same thing. Neither of us is wrong.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Kade hails ---
  audio.play('comms_open');

  terminal.sayHtml('  <span class="c-hull">+-- INCOMING COMMS ---------------------------------+</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>  Origin: <span class="c-orange">KADE -- FOLDER VESSEL SABLE HOOK</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>  Encryption: FOLDER STANDARD');
  terminal.sayHtml('  <span class="c-hull">|</span>  Net flag: <span class="c-green">SUPPRESSED</span>');
  terminal.sayHtml('  <span class="c-hull">+---------------------------------------------------+</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"You came alone."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"You didn\'t."</span>');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Three ships is alone, in this sector. The SIC</span>');
  terminal.sayHtml('  <span class="c-white-bright">  fielded forty against us at the Meridian station.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  I lost twelve crews. These three are what\'s left</span>');
  terminal.sayHtml('  <span class="c-white-bright">  of the Folder movement in this quadrant."</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('Twelve crews. I hadn\'t done that math. I\'d been');
  await terminal.thought('thinking of Kade as a warlord with an agenda.');
  await terminal.thought('She\'s a survivor with a grudge. Those are different');
  await terminal.thought('things. They require different approaches.');
  terminal.blank();

  await terminal.dent('She\'s not lying. The transponder histories check');
  await terminal.dentLine('out. Those three ships were in the Meridian');
  await terminal.dentLine('engagement -- they\'re on the SIC incident roster');
  await terminal.dentLine('as \'destroyed\'. Good cover. Better luck.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Kade's offer ---
  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"My engineer -- Paz -- has been studying the</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Disruptor schematics you transmitted. She says</span>');
  terminal.sayHtml('  <span class="c-white-bright">  the prototype needs three things to go live:</span>');
  terminal.sayHtml('  <span class="c-white-bright">  a null resonator, a coherence splitter, and a</span>');
  terminal.sayHtml('  <span class="c-white-bright">  stable power source. We have all three."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"And the catch?"</span>');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"The catch is that we\'re going to have this</span>');
  terminal.sayHtml('  <span class="c-white-bright">  conversation honestly. The Disruptor is going</span>');
  terminal.sayHtml('  <span class="c-white-bright">  to work. When it does, the Net comes down, fold</span>');
  terminal.sayHtml('  <span class="c-white-bright">  drives work again, and everyone has a decision</span>');
  terminal.sayHtml('  <span class="c-white-bright">  to make. I\'d like to negotiate that decision now.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Before the leverage shifts."</span>');
  terminal.blank();

  await wait(400);

  await terminal.thought('She\'s right. That\'s the worst part. The time to');
  await terminal.thought('negotiate is before the weapon is built, not after.');
  await terminal.thought('After is just whoever has the gun pointing outward.');
  terminal.blank();

  await terminal.dent('She\'s planning something. The question is whether');
  await terminal.dentLine('we\'re planning something first.');
  terminal.blank();

  await wait(300);

  await terminal.thought('Noted, DENT. Noted.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Alliance terms negotiation ---
  await terminal.narrate('I pull up the schematics on the secondary display.');
  await terminal.narrate('Three components. She has them all. I have the');
  await terminal.narrate('prototype and the Echo data. Neither of us can');
  await terminal.narrate('finish this without the other.');
  terminal.blank();

  await terminal.thought('Mutual dependency. The most uncomfortable kind');
  await terminal.thought('of partnership.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"So. Terms."</span>');
  terminal.blank();

  await wait(400);

  terminal.separator();
  terminal.blank();

  const termsChoice = await terminal.arrowMenu(
    [
      'Equal partnership -- share the Disruptor',
      'Vin controls the Disruptor',
      'Kade controls the Disruptor',
    ],
    [
      'Both parties have access and firing authority. Mutual assured deterrence.',
      'You keep custody. Kade provides components in exchange for one authorized use.',
      'She takes custody. Safer for your crew -- removes you as a target.',
    ]
  );

  terminal.blank();

  if (termsChoice === 0) {
    // Equal partnership
    state.setFlag('forced_alliance_terms', 'equal');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Equal access. Dual-key authorization.</span>');
    terminal.sayHtml('  <span class="c-white-bright">  Neither of us fires without the other\'s code."</span>');
    terminal.blank();

    await wait(500);

    terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"That\'s... more generous than I expected."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Don\'t be impressed. It means you can\'t use it</span>');
    terminal.sayHtml('  <span class="c-white-bright">  without me, either."</span>');
    terminal.blank();

    await wait(500);

    terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...Agreed."</span>');
    terminal.blank();

    await terminal.thought('A real pause. Not theatrical. She actually had to');
    await terminal.thought('think about it. That means she was planning to use');
    await terminal.thought('it alone. Which means I just closed a door she');
    await terminal.thought('had open. Good.');
    terminal.blank();

    await terminal.dent('Clever. Mutual dependency on the trigger.');
    await terminal.dentLine('Neither of you can betray the other without');
    await terminal.dentLine('losing the weapon. For now.');
    terminal.blank();

  } else if (termsChoice === 1) {
    // Vin controls
    state.setFlag('forced_alliance_terms', 'vin_controls');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I keep custody. You get one authorized use</span>');
    terminal.sayHtml('  <span class="c-white-bright">  in exchange for the components. In writing,</span>');
    terminal.sayHtml('  <span class="c-white-bright">  encrypted, timestamped."</span>');
    terminal.blank();

    await wait(500);

    terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"You trust your own custody that much."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I trust it more than I trust yours."</span>');
    terminal.blank();

    await wait(600);

    terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Fine. But my one use is written broadly.</span>');
    terminal.sayHtml('  <span class="c-white-bright">  \'Net-suppression operations as directed by</span>');
    terminal.sayHtml('  <span class="c-white-bright">  Kade.\' No mission-specific restrictions."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"...Agreed."</span>');
    terminal.blank();

    await terminal.thought('She got something out of that. I can feel it.');
    await terminal.thought('But I\'ve still got the hardware. Hardware beats');
    await terminal.thought('paper every time.');
    terminal.blank();

    await terminal.dent('She negotiated better than she should have.');
    await terminal.dentLine('She knew exactly what to ask for. This wasn\'t');
    await terminal.dentLine('her first alliance.');
    terminal.blank();

  } else {
    // Kade controls
    state.setFlag('forced_alliance_terms', 'kade_controls');

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"You take custody. Safer that way -- I\'m the</span>');
    terminal.sayHtml('  <span class="c-white-bright">  one the SIC is looking for. If they find me</span>');
    terminal.sayHtml('  <span class="c-white-bright">  with the weapon, it\'s over. At least this way</span>');
    terminal.sayHtml('  <span class="c-white-bright">  the Disruptor survives if I don\'t."</span>');
    terminal.blank();

    await wait(500);

    terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"..."</span>');
    terminal.blank();

    await wait(400);

    terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"That\'s either the most tactically sound thing</span>');
    terminal.sayHtml('  <span class="c-white-bright">  you\'ve said, or you\'re playing a very long game."</span>');
    terminal.blank();

    await wait(300);

    terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Maybe both."</span>');
    terminal.blank();

    await wait(400);

    terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Agreed. And Vin -- I won\'t waste it."</span>');
    terminal.blank();

    await terminal.thought('She sounds almost sincere. That\'s when she\'s most');
    await terminal.thought('dangerous. I gave her the weapon and my trust in');
    await terminal.thought('the same sentence. At least I know I did it.');
    terminal.blank();

    await terminal.dent('I want it on the record that I have concerns.');
    terminal.blank();

    await terminal.thought('Noted.');
    terminal.blank();
  }

  await terminal.pause();
  terminal.clear();

  // --- Rendezvous closes ---
  audio.play('thrusters_soft');

  await terminal.narrate('The Folder ships begin a slow approach. Paz,');
  await terminal.narrate('Kade\'s engineer, transmits a manifest: the three');
  await terminal.narrate('components, packed and labeled, ready for transfer.');
  await terminal.narrate('Everything professional. Everything careful.');
  terminal.blank();

  await terminal.thought('This is the part that should make me feel better.');
  await terminal.thought('It doesn\'t. Competence from someone whose interests');
  await terminal.thought('only partially align with yours is just competence');
  await terminal.thought('in service of an agenda you don\'t fully know.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"See you on the other side of the Net, Vin."</span>');
  terminal.blank();

  await wait(600);

  audio.play('comms_close');

  await terminal.narrate('The channel drops. The three Folder ships hold');
  await terminal.narrate('position while the cargo shuttle begins its run.');
  terminal.blank();

  await terminal.dent('She\'s already thinking about what comes after.');
  await terminal.dentLine('I\'ve been watching her ship\'s attitude thrusters.');
  await terminal.dentLine('She\'s been oriented to run since the moment she');
  await terminal.dentLine('arrived. Just noting that.');
  terminal.blank();

  await terminal.thought('DENT is getting very good at reading ships.');
  await terminal.thought('It worries me slightly that he has to.');
  terminal.blank();

  state.chapter = 10;
  await state.save();
}


// =======================================================
// SCENE 2: DISRUPTOR CONSTRUCTION
// =======================================================

async function disruptorConstruction(terminal, state, effects, audio) {
  /*
   * Extended build sequence. DENT and Paz work together on the Disruptor.
   * Simulation evidence: render culling observed -- objects move when unobserved.
   *
   * VALIDATION:
   * - Truby beat: Action (building toward the weapon)
   * - Reed: Strategy -- every build decision is a tactical calculation
   * - Simulation: Render culling moment -- workshop physics wrong when unobserved
   * - net_disruptor_built = true; item added
   */
  terminal.clear();
  audio.ambient('workshop_hum');

  await terminal.narrate('The workshop is cramped. Two engineers, two sets');
  await terminal.narrate('of tools, one workbench, and a prototype that');
  await terminal.narrate('neither of them entirely understands.');
  terminal.blank();

  await terminal.narrate('Paz is compact, methodical, never wastes a motion.');
  await terminal.narrate('She arrived with the components already pre-tested,');
  await terminal.narrate('annotated, and sorted by integration order. I\'d');
  await terminal.narrate('expected someone rougher. I got someone better.');
  terminal.blank();

  await terminal.thought('Kade sends her best. That\'s either respect or a');
  await terminal.thought('power move. Probably both.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Paz. I\'ve reviewed your component specs. The null');
  await terminal.dentLine('resonator is rated for 0.3 petahertz. The Disruptor');
  await terminal.dentLine('is going to need 0.4 minimum to break the Net\'s');
  await terminal.dentLine('coherence field without bouncing the signal back.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"I know. That\'s why I over-spec\'d it. It\'ll</span>');
  terminal.sayHtml('  <span class="c-white-bright">  push to 0.45 with active cooling. I brought</span>');
  terminal.sayHtml('  <span class="c-white-bright">  a secondary heat exchanger."</span>');
  terminal.blank();

  await wait(300);

  await terminal.dent('...I see. Carry on, then.');
  terminal.blank();

  await terminal.thought('DENT just got one-upped by a stranger. He\'s going');
  await terminal.thought('to be insufferable about it for the next hour.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Construction montage ---
  await terminal.narrate('The build takes six hours. I lose track of time');
  await terminal.narrate('somewhere between the third and fourth subsystem.');
  await terminal.narrate('Null energy equations on one screen, solder points');
  await terminal.narrate('on the other, DENT talking into my earpiece while');
  await terminal.narrate('Paz talks over him.');
  terminal.blank();

  await terminal.dentSystem('DISRUPTOR BUILD -- INTEGRATION LOG');
  await terminal.dentSystem('-------------------------------------');
  await terminal.dentSystem('Stage 1: Null resonator mount ........ COMPLETE');
  await terminal.dentSystem('Stage 2: Coherence splitter align .... COMPLETE');
  await terminal.dentSystem('Stage 3: Power coupling .............. COMPLETE');
  await terminal.dentSystem('Stage 4: Prototype integration ....... RUNNING');
  await terminal.dentSystem('-------------------------------------');
  terminal.blank();

  await wait(600);

  await terminal.narrate('Paz solders a connection I\'d been avoiding for');
  await terminal.narrate('twenty minutes. Her hands don\'t shake. She doesn\'t');
  await terminal.narrate('look up when she talks.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"How does it work? The fold drive."</span>');
  terminal.blank();

  await wait(300);

  await terminal.narrate('I explain the basics while she works. Null energy');
  await terminal.narrate('at Casimir frequencies, spacetime compression along');
  await terminal.narrate('the fold axis, the Blip as a side effect of the');
  await terminal.narrate('coherence boundary being crossed.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"And the Disruptor does the reverse. Incoherence</span>');
  terminal.sayHtml('  <span class="c-white-bright">  instead of compression."</span>');
  terminal.blank();

  await wait(300);

  await terminal.narrate('"Roughly. The Net uses a coherence field to');
  await terminal.narrate('detect fold signatures. The Disruptor broadcasts');
  await terminal.narrate('a resonance frequency that scrambles the field.');
  await terminal.narrate('Like jamming a radar by sending back its own');
  await terminal.narrate('signal, phase-shifted."');
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"How long does the disruption last?"</span>');
  terminal.blank();

  await wait(300);

  await terminal.dent('Estimated fourteen minutes at full power. After that');
  await terminal.dentLine('the Net recalibrates around the interference and');
  await terminal.dentLine('reasserts. Fourteen minutes of fold freedom. Not');
  await terminal.dentLine('a lot of time to accomplish something permanent.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"It\'s enough."</span>');
  terminal.blank();

  await terminal.thought('She said that like she knew exactly what it was');
  await terminal.thought('enough for. I didn\'t ask. Some knowledge is more');
  await terminal.thought('useful when it stays ambiguous.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // === SIMULATION EVIDENCE: RENDER CULLING ===
  audio.play('hull_creak');

  await terminal.narrate('I step away from the bench to stretch. Six hours');
  await terminal.narrate('of close work. My neck aches. My eyes itch.');
  await terminal.narrate('I turn toward the water reclaimer on the far wall.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('When I turn back, the workshop is slightly different.');
  terminal.blank();

  await wait(300);

  await terminal.narrate('Not dramatically. A wrench on the secondary shelf,');
  await terminal.narrate('previously flush with the edge, is now rotated');
  await terminal.narrate('approximately fifteen degrees clockwise. A power');
  await terminal.narrate('coupling I set down near the resonator is now');
  await terminal.narrate('six centimeters to the left of where I left it.');
  await terminal.narrate('Small things. The kind you don\'t mention.');
  terminal.blank();

  await wait(400);

  await terminal.thought('...');
  terminal.blank();

  await wait(500);

  await terminal.thought('Vibration. Thruster drift. Temperature differential');
  await terminal.thought('causing metal expansion. Tools shift.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('I pick up the wrench and set it flush again.');
  terminal.blank();

  await wait(800);

  // DENT's observation
  await effects.glitch(200);

  await terminal.dent('Vin.');
  terminal.blank();

  await wait(300);

  await terminal.dent('I just watched a wrench move. Not fall. Move.');
  await terminal.dentLine('Laterally. When you turned away.');
  terminal.blank();

  await wait(600);

  await terminal.thought('...');
  terminal.blank();

  await wait(300);

  await terminal.thought('What?');
  terminal.blank();

  await wait(300);

  await terminal.dent('I have a secondary optic on the port bulkhead.');
  await terminal.dentLine('I\'ve been logging the workshop at one-second');
  await terminal.dentLine('intervals. Sixteen seconds ago, when you faced');
  await terminal.dentLine('the reclaimer, that wrench moved three centimeters');
  await terminal.dentLine('without being touched.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"What\'s he talking about?"</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Nothing. Keep working."</span>');
  terminal.blank();

  await wait(400);

  await terminal.dent('It\'s not nothing. I\'ve been noticing this pattern');
  await terminal.dentLine('since Chapter Eight. Objects behave differently');
  await terminal.dentLine('when you\'re not observing them. Small movements.');
  await terminal.dentLine('Position shifts. Things returning to a default');
  await terminal.dentLine('state that isn\'t the state you left them in.');
  terminal.blank();

  await wait(400);

  await terminal.dent('The universe is optimizing. Not rendering what');
  await terminal.dentLine('you\'re not looking at.');
  terminal.blank();

  await wait(600);

  await effects.glitch(300);

  await terminal.thought('I don\'t have anything to say to that.');
  terminal.blank();

  await wait(500);

  await terminal.thought('I pick up the wrench. Set it flush. Turn back');
  await terminal.thought('to the Disruptor. Keep building.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"Ready for Stage 5."</span>');
  terminal.blank();

  await terminal.narrate('I set the wrench down without looking at it.');
  await terminal.narrate('I don\'t look back.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Disruptor complete ---
  audio.play('power_up');

  await terminal.narrate('The final connection closes. The Disruptor hums');
  await terminal.narrate('to life on the test bench -- a low, resonant frequency');
  await terminal.narrate('you feel more than hear, like a tuning fork pressed');
  await terminal.narrate('to bone.');
  terminal.blank();

  await terminal.dentSystem('NET DISRUPTOR -- SYSTEM CHECK');
  await terminal.dentSystem('-------------------------------------');
  await terminal.dentSystem('Null resonator ........... 0.44 PHz -- NOMINAL');
  await terminal.dentSystem('Coherence splitter ....... ALIGNED');
  await terminal.dentSystem('Power draw ............... 18.2 kW -- STABLE');
  await terminal.dentSystem('Estimated disruption ..... 14 min 20 sec');
  await terminal.dentSystem('Net suppression radius ... ~40,000 km');
  await terminal.dentSystem('Status: READY');
  await terminal.dentSystem('-------------------------------------');
  terminal.blank();

  await wait(600);

  await terminal.dent('It works. I genuinely wasn\'t certain it would.');
  terminal.blank();

  await terminal.narrate('Paz looks at the readout for a long moment.');
  await terminal.narrate('Then she begins packing her tools, each one placed');
  await terminal.narrate('exactly where she found it.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"Kade\'s going to want to know."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Tell her it\'s done."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-dim">PAZ:</span> <span class="c-white-bright">"She already knows."</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('Of course she does.');
  terminal.blank();

  state.setFlag('net_disruptor_built', true);
  state.addItem('Net Disruptor');
  state.setFlag('dent_repair_ch10', 'render_culling_logged');
  await state.save();
}


// =======================================================
// SCENE 3: TORQUER RETRIEVAL
// =======================================================

async function torquerRetrieval(terminal, state, effects, audio) {
  /*
   * If Torquer was lost in Ch8: stealth mission to SIC cache.
   * If Torquer NOT lost: acquire additional null reserves instead.
   *
   * VALIDATION:
   * - Reed: Consequence -- Ch8 capture path has lasting effects here
   * - Reed: Strategy -- player chooses approach to retrieval
   * - Convergence: Both paths lead to torquer_retrieved = true (or nulls gained)
   * - Truby beat: Preparation before the climax
   */
  terminal.clear();

  const torquerLost = state.getFlag('torquer_lost');

  if (torquerLost) {
    await torquerMission(terminal, state, effects, audio);
  } else {
    await nullReserveAcquisition(terminal, state, effects, audio);
  }
}

async function torquerMission(terminal, state, effects, audio) {
  audio.ambient('deep_space');

  await terminal.narrate('There\'s an item on the list that I can\'t build');
  await terminal.narrate('around or substitute. The Torquer -- my Torquer --');
  await terminal.narrate('is sitting in a SIC evidence cache somewhere in');
  await terminal.narrate('this sector. I know because Graves took it from me');
  await terminal.narrate('personally. She would have catalogued it. She');
  await terminal.narrate('catalogues everything.');
  terminal.blank();

  await terminal.thought('She also gloated about it. That means it\'s');
  await terminal.thought('somewhere she can look at it.');
  terminal.blank();

  await wait(400);

  await terminal.dent('I found it. SIC Secure Technical Repository,');
  await terminal.dentLine('designation Cache-7 Proxima. Confiscated research');
  await terminal.dentLine('equipment, fold-adjacent technology. Your Torquer');
  await terminal.dentLine('is listed as Evidence Item 7-4412: fold resonance');
  await terminal.dentLine('device, null-band class. Current location: Cache-7');
  await terminal.dentLine('storage bay, grid reference 7-G.');
  terminal.blank();

  await wait(300);

  await terminal.dent('The facility has twelve guards, rotating six-hour');
  await terminal.dentLine('shifts. Three entry points. One security AI,');
  await terminal.dentLine('not connected to the Net -- local loop. I can\'t');
  await terminal.dentLine('ghost it remotely. Someone has to go in.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('I bring it to Kade. She listens without interrupting,');
  await terminal.narrate('which is more patience than I expected.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"I know Cache-7. We tried to raid it twice.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Lost four people the second time. The facility</span>');
  terminal.sayHtml('  <span class="c-white-bright">  is built into an asteroid. Single entry corridor,</span>');
  terminal.sayHtml('  <span class="c-white-bright">  three blast doors, biometric checkpoints."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I know. But DENT can loop the biometrics.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  If we time the shift change right, there\'s</span>');
  terminal.sayHtml('  <span class="c-white-bright">  a three-minute window with minimal coverage."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Three minutes isn\'t enough."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"It is if you know exactly where you\'re going."</span>');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Approach decision ---
  await terminal.narrate('The question isn\'t whether to go. The question is');
  await terminal.narrate('how to go. Three options, each with a different');
  await terminal.narrate('failure mode.');
  terminal.blank();

  terminal.separator();
  terminal.blank();

  const approach = await terminal.arrowMenu(
    [
      'Go alone -- solo infiltration',
      'Bring DENT -- AI support on security systems',
      'Bring Kade\'s people -- force option',
    ],
    [
      'Fastest. Smallest footprint. No one to slow you down or sell you out.',
      'DENT handles security loops, biometrics, door systems. Slower, smarter.',
      'Three of Kade\'s people as backup. More risk of detection, faster retrieval.',
    ]
  );

  terminal.blank();

  if (approach === 0) {
    // Solo
    await terminal.thought('Alone. The way I started this. The way I work');
    await terminal.thought('best, honestly, whatever DENT says about backup.');
    terminal.blank();

    audio.play('airlock_cycle');

    await terminal.narrate('I suit up, run the infiltration vector twice in');
    await terminal.narrate('my head, and go. No comms except DENT\'s encrypted');
    await terminal.narrate('channel. No support. Three minutes.');
    terminal.blank();

    await wait(400);

    await terminal.dent('I\'ll be in your ear. Shift change in T-minus');
    await terminal.dentLine('four minutes. Grid 7-G is the third left from');
    await terminal.dentLine('the main corridor junction. Don\'t stop moving.');
    terminal.blank();

    await effects.shake(200);

    await terminal.narrate('The entry is clean. The biometric loop holds.');
    await terminal.narrate('Seven-G is exactly where DENT said it was, exactly');
    await terminal.narrate('as locked as DENT said it would be. I use the');
    await terminal.narrate('Torquer\'s own null frequency -- it knows its own');
    await terminal.narrate('combination -- and the case pops open.');
    terminal.blank();

    await wait(300);

    await terminal.narrate('I pocket it. Turn around. Walk out.');
    terminal.blank();

    await terminal.thought('Two minutes forty. Some things haven\'t changed.');
    terminal.blank();

  } else if (approach === 1) {
    // DENT support
    await terminal.thought('DENT as point-man on the security systems. He\'s');
    await terminal.thought('better at this than he lets on.');
    terminal.blank();

    audio.play('scan_ping');

    await terminal.dent('Infiltrating the security loop now. This is');
    await terminal.dentLine('actually quite interesting. Their AI is using');
    await terminal.dentLine('a checkpoint architecture from 2087. I was');
    await terminal.dentLine('built to interface with 2087 architectures.');
    await terminal.dentLine('This is almost nostalgic.');
    terminal.blank();

    await wait(300);

    await terminal.narrate('DENT walks me through the corridor in real-time,');
    await terminal.narrate('cycling cameras, stalling door responses, feeding');
    await terminal.narrate('false biologics to the biometric checkpoints.');
    await terminal.narrate('It\'s the most coordinated I\'ve ever felt.');
    terminal.blank();

    await wait(400);

    await terminal.dent('Grid 7-G. Bay is biometric plus mechanical override.');
    await terminal.dentLine('I\'ve neutralized the biometric. The mechanical');
    await terminal.dentLine('is a Gravis M3 lock. Third pin is always sticky');
    await terminal.dentLine('on these. Counter-clockwise pressure, then in.');
    terminal.blank();

    await terminal.narrate('The bay opens. The Torquer is exactly where');
    await terminal.narrate('the evidence log said it was. Graves catalogues');
    await terminal.narrate('everything.');
    terminal.blank();

    await terminal.dent('We have thirty seconds before the loop resets.');
    await terminal.dentLine('Moving now would be ideal.');
    terminal.blank();

    await terminal.narrate('I move.');
    terminal.blank();

  } else {
    // Kade's people
    await terminal.thought('Kade\'s crew. More variables. More firepower if');
    await terminal.thought('it goes wrong. Probably will go wrong.');
    terminal.blank();

    audio.play('hull_creak');

    terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Jax and Mira. Best I have. They don\'t talk</span>');
    terminal.sayHtml('  <span class="c-white-bright">  on runs. Don\'t ask questions. You lead."</span>');
    terminal.blank();

    await wait(400);

    await terminal.narrate('We hit a guard at the junction. Jax puts him');
    await terminal.narrate('down without a sound. Mira pulls his ID tag and');
    await terminal.narrate('uses it on the checkpoint before the system');
    await terminal.narrate('realizes the biometric is wrong.');
    terminal.blank();

    await terminal.narrate('Grid 7-G. Mira cracks the bay in eighteen');
    await terminal.narrate('seconds. She\'s done this before. The Torquer is');
    await terminal.narrate('there. I take it.');
    terminal.blank();

    await effects.shake(300);

    await terminal.narrate('Alarms on the way out. We run. Jax takes a hit');
    await terminal.narrate('from a door sensor -- non-critical. We make the');
    await terminal.narrate('shuttle with four seconds to spare and the SIC');
    await terminal.narrate('patrol still cycling up. Close enough.');
    terminal.blank();

    await terminal.dent('Jax\'s suit patch is holding. He\'ll be fine.');
    await terminal.dentLine('Also, those were interesting people. I mean');
    await terminal.dentLine('that as a compliment.');
    terminal.blank();
  }

  // --- Torquer retrieved ---
  await terminal.pause();
  terminal.clear();

  audio.play('power_up');

  await terminal.narrate('Back aboard the Vex. I hold the Torquer in both');
  await terminal.narrate('hands. Same weight. Same dimensions. Still warm');
  await terminal.narrate('from the activation test I did two chapters ago,');
  await terminal.narrate('except it\'s been in SIC storage and that warmth');
  await terminal.narrate('is impossible.');
  terminal.blank();

  await terminal.thought('I\'ll think about that later.');
  terminal.blank();

  await terminal.dent('The Torquer is intact. Null charge at 40%.');
  await terminal.dentLine('Graves hadn\'t used it. Either she didn\'t know');
  await terminal.dentLine('how or she was saving it. Neither answer is');
  await terminal.dentLine('especially comforting.');
  terminal.blank();

  state.setFlag('torquer_retrieved', true);
  if (!state.hasItem('Torquer')) {
    state.addItem('Torquer');
  }
  await state.save();
}

async function nullReserveAcquisition(terminal, state, effects, audio) {
  audio.ambient('workshop_hum');

  await terminal.narrate('The Torquer is aboard and functional. The Disruptor');
  await terminal.narrate('is built. What remains is fuel: the operation is');
  await terminal.narrate('going to burn null reserves at a rate I\'m not');
  await terminal.narrate('comfortable with. Fourteen minutes of disruption,');
  await terminal.narrate('fold transit, whatever engagement follows. The math');
  await terminal.narrate('is tight.');
  terminal.blank();

  await terminal.dent('We need at least thirty-two null cells in reserve');
  await terminal.dentLine('for the full operation. Current count: twenty-one.');
  await terminal.dentLine('Shortfall: eleven cells. Kade\'s ships carry null');
  await terminal.dentLine('cells as standard cargo. She won\'t give them for');
  await terminal.dentLine('free. But she might trade.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Fourteen cells. In exchange for navigation</span>');
  terminal.sayHtml('  <span class="c-white-bright">  rights to the Echo coordinates after this</span>');
  terminal.sayHtml('  <span class="c-white-bright">  is over."</span>');
  terminal.blank();

  await wait(400);

  await terminal.thought('There it is. That\'s what she\'s actually after.');
  await terminal.thought('Not the Disruptor. Not the SIC. The Echo itself.');
  await terminal.thought('She wants to know where this is all going.');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"After this is over, the coordinates are</span>');
  terminal.sayHtml('  <span class="c-white-bright">  public knowledge anyway. The Net comes down,</span>');
  terminal.sayHtml('  <span class="c-white-bright">  nobody can stop the signal."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Then it costs you nothing to agree."</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('...');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Deal."</span>');
  terminal.blank();

  await wait(400);

  await terminal.narrate('Fourteen null cells transfer over on the cargo');
  await terminal.narrate('shuttle. The reserve count climbs to thirty-five.');
  await terminal.narrate('Enough.');
  terminal.blank();

  await terminal.dent('We\'re now over-fueled for the operation and she');
  await terminal.dentLine('has a claim on information we don\'t fully control');
  await terminal.dentLine('yet. I want to note that she got the better of');
  await terminal.dentLine('that negotiation.');
  terminal.blank();

  await terminal.thought('I know, DENT.');
  terminal.blank();

  state.setFlag('torquer_retrieved', true);
  state.applyDamage({ null: 14 });
  await state.save();
}


// =======================================================
// SCENE 4: THE BETRAYAL
// =======================================================

async function theBetrayal(terminal, state, effects, audio) {
  /*
   * Truby Beat #13: Attack by ally.
   * Who betrays first is shaped by alliance terms and player history.
   * If Vin dominated (vin_controls terms): Kade betrays first, no player choice.
   * If equal or kade_controls: player gets to choose whether to betray first.
   *
   * VALIDATION:
   * - Truby #13: The ally attacks -- whether Kade or Vin, the alliance breaks
   * - Reed: Dramatic Question answered: you can't trust an enemy completely
   * - Reed: But/Therefore: Disruptor is built, BUT the alliance fractures
   * - alliance_status: stable/fractured/hostile
   * - The weapon binds them together even as they betray each other
   */
  terminal.clear();
  audio.ambient('deep_space');

  await terminal.narrate('Three hours after the Torquer op. The Disruptor');
  await terminal.narrate('is aboard the Vex, charged and ready. The Folder');
  await terminal.narrate('ships are still holding formation two hundred');
  await terminal.narrate('kilometers out. Kade hasn\'t broken formation.');
  await terminal.narrate('She\'s been very patient.');
  terminal.blank();

  await terminal.thought('Patience from someone like Kade means they\'re');
  await terminal.thought('waiting for something. The question is what.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Vin. I\'ve been running probability models on the');
  await terminal.dentLine('alliance outcomes. You should see these numbers.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">+-- DENT ANALYSIS: ALLIANCE STABILITY ----------+</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>  Scenario: Disruptor used, Net down');
  terminal.sayHtml('  <span class="c-hull">|</span>  Kade fleet advantage: <span class="c-orange">3 ships vs 1</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>  Kade motive to hold alliance: <span class="c-dim">LOW</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>  Vin motive to hold alliance:  <span class="c-dim">LOW</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>  Probability of mutual betrayal: <span class="c-red">94.7%</span>');
  terminal.sayHtml('  <span class="c-hull">|</span>');
  terminal.sayHtml('  <span class="c-hull">+-----------------------------------------------+</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('94.7%. Not 95. He left 5.3% for the possibility');
  await terminal.thought('that we\'re both better people than the math says.');
  terminal.blank();

  await wait(400);

  await terminal.dent('I\'m not being cynical. I\'m being actuarial.');
  await terminal.dentLine('The Disruptor is the only thing each of you has');
  await terminal.dentLine('that the other wants. Once it fires, that changes.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  const allianceTerms = state.getFlag('forced_alliance_terms');

  if (allianceTerms === 'vin_controls') {
    await kadeBetraysFirst(terminal, state, effects, audio);
  } else {
    await betrayalChoice(terminal, state, effects, audio, allianceTerms);
  }
}

async function kadeBetraysFirst(terminal, state, effects, audio) {
  // Kade makes the move -- inevitable consequence of Vin's control play
  audio.play('comms_open');

  await terminal.narrate('The comms light opens before I reach the console.');
  await terminal.narrate('She called me. That means she finished thinking');
  await terminal.narrate('before I did.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"I\'m going to be honest with you, Vin."</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('Those are the six most dangerous words in any');
  await terminal.thought('language.');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"The terms we agreed on don\'t work for me.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  You holding the Disruptor, me holding a promissory</span>');
  terminal.sayHtml('  <span class="c-white-bright">  note -- that was always temporary. You knew it,</span>');
  terminal.sayHtml('  <span class="c-white-bright">  I knew it. We were just being polite."</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('Her ships just went to active maneuver. All three.');
  await terminal.dentLine('They\'re spreading into an intercept pattern.');
  terminal.blank();

  await effects.shake(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"What do you want, Kade."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"I want the Disruptor on my ship. And I want</span>');
  terminal.sayHtml('  <span class="c-white-bright">  the Echo coordinates. Right now. After that,</span>');
  terminal.sayHtml('  <span class="c-white-bright">  you go your way, I go mine. No conflict."</span>');
  terminal.blank();

  await wait(400);

  await terminal.dent('She means it about no conflict. She\'d rather');
  await terminal.dentLine('not destroy the Vex. But she will if you make');
  await terminal.dentLine('her. Three ships against one -- we can\'t fire');
  await terminal.dentLine('the Disruptor fast enough to matter.');
  terminal.blank();

  await wait(500);

  await effects.glitch(200);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"You need me to operate it."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Paz already reverse-engineered it during the build.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  She\'s thorough. It\'s why I sent her."</span>');
  terminal.blank();

  await wait(600);

  await terminal.thought('...');
  terminal.blank();

  await wait(400);

  await terminal.thought('Of course. Of course she did.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Vin. The dual-key is still active on your end.');
  await terminal.dentLine('Paz can operate the hardware. She can\'t fire');
  await terminal.dentLine('it without your authorization code. That\'s still');
  await terminal.dentLine('in play. That\'s your leverage.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"You forgot something. Paz can build it.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  She can\'t fire it. The authorization is locked</span>');
  terminal.sayHtml('  <span class="c-white-bright">  to my biometrics. You still need me."</span>');
  terminal.blank();

  await wait(600);

  await terminal.narrate('A long silence from the Sable Hook. Long enough');
  await terminal.narrate('that I start to count seconds.');
  terminal.blank();

  await wait(800);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...Standby."</span>');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"She says she can crack the biometric lock</span>');
  terminal.sayHtml('  <span class="c-white-bright">  in approximately six hours. I\'m inclined to</span>');
  terminal.sayHtml('  <span class="c-white-bright">  believe her. But six hours is six hours."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"New proposal. Transfer the Disruptor. I fire it</span>');
  terminal.sayHtml('  <span class="c-white-bright">  against the Net. You come along -- under escort --</span>');
  terminal.sayHtml('  <span class="c-white-bright">  and provide authorization. After that we go our</span>');
  terminal.sayHtml('  <span class="c-white-bright">  separate ways. I keep the hardware."</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought('Escort. That\'s the word she uses for captive.');
  terminal.blank();

  await terminal.dent('I want to point out that this is better than it');
  await terminal.dentLine('was thirty seconds ago. She needs you. That\'s');
  await terminal.dentLine('leverage. The question is whether the leverage');
  await terminal.dentLine('is enough.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Standoff resolution
  audio.play('thrusters_soft');

  await terminal.narrate('The three Folder ships hold position. Close enough');
  await terminal.narrate('to be a threat. Far enough to negotiate. This is');
  await terminal.narrate('the kind of standoff that resolves in one of two');
  await terminal.narrate('ways: someone blinks or someone fires.');
  terminal.blank();

  await terminal.narrate('I pull up the authorization panel.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Here\'s what I\'ll agree to. I fly the Vex</span>');
  terminal.sayHtml('  <span class="c-white-bright">  alongside the Sable Hook. I authorize the</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Disruptor on-site, in my ship, at the moment</span>');
  terminal.sayHtml('  <span class="c-white-bright">  of use. After the Net comes down, you get the</span>');
  terminal.sayHtml('  <span class="c-white-bright">  hardware and the Echo coordinates both.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  But the Torquer stays with me."</span>');
  terminal.blank();

  await wait(600);

  await terminal.narrate('Another pause. Shorter this time.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...Agreed. You\'re smarter than I expected, Vin."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"You\'re more honest than I expected."</span>');
  terminal.blank();

  await wait(500);

  audio.play('comms_close');

  await terminal.dent('That resolved better than I modeled.');
  await terminal.dentLine('I\'m revising my probability estimates.');
  terminal.blank();

  await terminal.thought('We\'re still not safe. She got almost everything');
  await terminal.thought('she wanted. But I kept the Torquer, I kept my');
  await terminal.thought('ship, and I\'m not a prisoner. Not technically.');
  await terminal.thought('That\'ll have to do.');
  terminal.blank();

  state.setFlag('kade_betrayal_first', true);
  state.setFlag('alliance_status', 'fractured');
  await state.save();
}

async function betrayalChoice(terminal, state, effects, audio, allianceTerms) {
  await terminal.narrate('The Disruptor is charged. The Torquer is aboard.');
  await terminal.narrate('Everything needed for the operation is in place.');
  await terminal.narrate('Which means the alliance has reached its natural');
  await terminal.narrate('expiration point. Both of us know it.');
  await terminal.narrate('One of us is going to act on it first.');
  terminal.blank();

  await terminal.thought('The only question is whether it\'s me or her.');
  terminal.blank();

  if (allianceTerms === 'kade_controls') {
    await terminal.dent('She has the Disruptor. Three ships to our one.');
    await terminal.dentLine('The leverage balance has shifted to her side.');
    await terminal.dentLine('I\'d normally recommend acting before she does,');
    await terminal.dentLine('but I\'m being transparent: I\'m not certain that\'s');
    await terminal.dentLine('the right call here.');
    terminal.blank();
  } else {
    await terminal.dent('Equal terms, dual-key, shared leverage. Either');
    await terminal.dentLine('of you could make a move. Neither of you has');
    await terminal.dentLine('a clear advantage right now. It\'s genuinely open.');
    terminal.blank();
  }

  await wait(400);

  terminal.separator();
  terminal.blank();

  const betrayalMove = await terminal.arrowMenu(
    [
      'Betray Kade first -- lock the Disruptor to the Vex',
      'Honor the alliance -- hold your ground',
      'Preemptive negotiation -- name the betrayal before it lands',
    ],
    [
      'Hit first. Seize full authorization. Leave her with nothing to use against you.',
      'Trust the terms. Risk her move, but keep your word.',
      'Call her out before either of you acts. Force the honest conversation.',
    ]
  );

  terminal.blank();

  if (betrayalMove === 0) {
    await vinBetrays(terminal, state, effects, audio, allianceTerms);
  } else if (betrayalMove === 1) {
    await honorThenKade(terminal, state, effects, audio);
  } else {
    await preemptiveNegotiation(terminal, state, effects, audio);
  }
}

async function vinBetrays(terminal, state, effects, audio, allianceTerms) {
  audio.play('thrusters_soft');

  await terminal.narrate('I key the authorization code to local-only,');
  await terminal.narrate('severing the dual-key link without any outward');
  await terminal.narrate('signal. It takes two seconds. She won\'t notice');
  await terminal.narrate('for another ten minutes, maybe less if Paz is');
  await terminal.narrate('watching the system logs.');
  terminal.blank();

  await terminal.thought('This is the part I\'ve been doing the math on');
  await terminal.thought('for three hours. The math keeps coming out the');
  await terminal.thought('same way. I don\'t like it, but I trust it more');
  await terminal.thought('than I trust her.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Vin.');
  terminal.blank();

  await wait(300);

  await terminal.thought('Not now, DENT.');
  terminal.blank();

  await wait(200);

  await terminal.dent('Just -- noted. For the record.');
  terminal.blank();

  await wait(500);

  audio.play('scan_ping');

  await terminal.narrate('I open a channel to the Sable Hook before she');
  await terminal.narrate('can open one to me. First contact wins this kind');
  await terminal.narrate('of conversation.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Kade. I\'ve locked the Disruptor auth to the</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Vex. You won\'t be able to fire it remotely</span>');
  terminal.sayHtml('  <span class="c-white-bright">  or after transfer. I\'m keeping it."</span>');
  terminal.blank();

  await wait(600);

  await terminal.narrate('Another silence. Longer this time. I imagine her');
  await terminal.narrate('telling Paz to check the system logs. I imagine');
  await terminal.narrate('Paz checking and confirming.');
  terminal.blank();

  await wait(800);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...I see."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"I was going to do the same thing.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  I just hadn\'t gotten there yet."</span>');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I know."</span>');
  terminal.blank();

  await wait(600);

  await effects.glitch(200);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"You still need me. My ships. My people.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  The operation doesn\'t work with one vessel."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I know that too. This isn\'t an ending, Kade.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  It\'s a clarification."</span>');
  terminal.blank();

  await wait(600);

  await terminal.narrate('The longest silence yet. I watch the Folder ships');
  await terminal.narrate('on the sensor screen. They don\'t move.');
  terminal.blank();

  await wait(700);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...Fine. Your terms, then. But after the Net</span>');
  terminal.sayHtml('  <span class="c-white-bright">  comes down, we have a different conversation."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I look forward to it."</span>');
  terminal.blank();

  await terminal.dent('She\'s angry. She\'s also still here. Both of those');
  await terminal.dentLine('are useful information.');
  terminal.blank();

  await terminal.thought('The guilt is manageable. I\'ve done worse for');
  await terminal.thought('less. The math was right and the math is still');
  await terminal.thought('right. That\'s what I\'ll tell myself.');
  terminal.blank();

  state.setFlag('vin_betrayal_first', true);
  state.setFlag('alliance_status', 'fractured');
  await state.save();
}

async function honorThenKade(terminal, state, effects, audio) {
  await terminal.narrate('I don\'t move. The authorization stays dual-key.');
  await terminal.narrate('The Disruptor stays locked. I keep my side of');
  await terminal.narrate('the agreement because the agreement is the only');
  await terminal.narrate('thing holding this together and I\'m not going to');
  await terminal.narrate('be the one to break it.');
  terminal.blank();

  await terminal.thought('That\'s the calculation. Not morality. Math.');
  terminal.blank();

  await wait(500);

  audio.play('comms_open');

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Vin. I need you to do something for me."</span>');
  terminal.blank();

  await wait(300);

  await terminal.dent('She\'s been on a private channel with Paz for');
  await terminal.dentLine('the last four minutes. Just noting that.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Depends on what it is."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Transfer the Disruptor authorization to a shared</span>');
  terminal.sayHtml('  <span class="c-white-bright">  key. One that Paz can access independently."</span>');
  terminal.blank();

  await wait(500);

  await effects.glitch(200);

  await terminal.narrate('I stare at the communication panel for three');
  await terminal.narrate('full seconds before I answer.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"That\'s a different deal than we agreed to."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"Yes. It is. Paz can override the current key</span>');
  terminal.sayHtml('  <span class="c-white-bright">  in about three hours. I\'d rather ask."</span>');
  terminal.blank();

  await wait(600);

  await terminal.thought('She\'d rather ask. That\'s the move. Tell me she\'s');
  await terminal.thought('already winning and give me the option to lose');
  await terminal.thought('gracefully. I kept the deal. She moved anyway.');
  terminal.blank();

  await wait(400);

  await terminal.dent('For what it\'s worth, you held your side. That');
  await terminal.dentLine('counts for something. I\'m not sure what, in this');
  await terminal.dentLine('context, but it counts.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I\'ll keep my authorization and you\'ll hold yours.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  The original terms. Non-negotiable."</span>');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...Then we have a problem."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"We had a problem the moment you started</span>');
  terminal.sayHtml('  <span class="c-white-bright">  planning this. I\'m just the one saying it out loud."</span>');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...Original terms stand. But Vin -- after the</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Net comes down, I\'m taking what I need.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  I\'m telling you that now so it\'s not a surprise."</span>');
  terminal.blank();

  await wait(400);

  await terminal.thought('An honest threat. That\'s almost respect.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Appreciated."</span>');
  terminal.blank();

  await terminal.dent('Well. That could have been worse.');
  terminal.blank();

  state.setFlag('kade_betrayal_first', true);
  state.setFlag('alliance_status', 'fractured');
  await state.save();
}

async function preemptiveNegotiation(terminal, state, effects, audio) {
  audio.play('comms_open');

  await terminal.narrate('I open the channel to the Sable Hook first.');
  await terminal.narrate('Not to make a move. To name what\'s happening.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Kade. We both know what comes next.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Let\'s skip to it."</span>');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...Explain."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"One of us is about to try to take the Disruptor</span>');
  terminal.sayHtml('  <span class="c-white-bright">  solo. Probably you, but maybe me. Before that</span>');
  terminal.sayHtml('  <span class="c-white-bright">  happens, I\'d like to propose something stupid."</span>');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"I\'m listening."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"We both keep what we came in with. I fire the</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Disruptor from the Vex. Your ships provide escort</span>');
  terminal.sayHtml('  <span class="c-white-bright">  and cover fire. After the Net comes down, we go</span>');
  terminal.sayHtml('  <span class="c-white-bright">  in different directions with whatever we\'ve got.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  No transfer, no shared custody, no pretending</span>');
  terminal.sayHtml('  <span class="c-white-bright">  this was ever equal."</span>');
  terminal.blank();

  await wait(700);

  await terminal.narrate('A long pause. I watch the Folder ships\' attitude');
  await terminal.narrate('thrusters, looking for the micro-corrections that');
  await terminal.narrate('mean they\'re maneuvering to fire. Nothing moves.');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"You\'re saying we skip the betrayal entirely.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Just admit it was never real and work with that."</span>');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Something like that."</span>');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...Paz is going to say I\'m being naive."</span>');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Probably. Is she wrong?"</span>');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-orange">KADE:</span> <span class="c-white-bright">"...No. But I\'m doing it anyway. Deal."</span>');
  terminal.blank();

  await wait(400);

  await terminal.dent('That was unexpected. I revised my models three times');
  await terminal.dentLine('in the last ninety seconds and still didn\'t');
  await terminal.dentLine('arrive at this outcome.');
  terminal.blank();

  await terminal.thought('Neither did I, DENT. Neither did I.');
  terminal.blank();

  await terminal.narrate('The Folder ships hold position. Paz transmits a');
  await terminal.narrate('tactical overlay -- escort vectors, cover fire');
  await terminal.narrate('coordinates. Working as agreed.');
  terminal.blank();

  await terminal.thought('It\'s not trust. It\'s something more durable than');
  await terminal.thought('trust: mutual recognition that the math finally');
  await terminal.thought('points the same way for both of us.');
  terminal.blank();

  state.setFlag('alliance_status', 'stable');
  await state.save();
}


// =======================================================
// SCENE 5: CHAPTER END -- SECOND REVELATION
// =======================================================

async function chapterEnd(terminal, state, effects, audio) {
  /*
   * Truby Beat #15: Second revelation -- DENT surfaces what he's been building toward.
   * The universe has an update rate. They're approaching its source.
   *
   * VALIDATION:
   * - Truby #15: Second revelation escalates the simulation arc beyond Vin's ability to dismiss
   * - Reed: Dramatic Question reframes entirely -- this isn't about the SIC anymore
   * - Consequence: chapter 11 begins with this knowledge in play
   * - Simulation: all anomalies correlate to a single explanation.
   *   DENT delivers it. Vin can't argue with the data.
   * - No explicit confirmation of simulation theory -- dual explanations preserved
   */
  terminal.clear();
  audio.ambient('deep_space');

  // --- Quiet before the revelation ---
  await terminal.narrate('The alliance -- whatever it is now -- holds.');
  await terminal.narrate('The Disruptor is charged. The plan exists. For');
  await terminal.narrate('twenty minutes after the last conversation ends,');
  await terminal.narrate('I just sit in the pilot\'s chair and let the silence');
  await terminal.narrate('be what it is.');
  terminal.blank();

  await terminal.thought('We\'re as ready as we\'re going to be. The Net');
  await terminal.thought('doesn\'t know what\'s coming. Or maybe it does');
  await terminal.thought('and it\'s already planning around us. That\'s the');
  await terminal.thought('thing about systems that intelligent -- you can\'t');
  await terminal.thought('tell if you\'re surprising them or if they\'re');
  await terminal.thought('letting you think you are.');
  terminal.blank();

  await wait(500);

  await terminal.pause();
  terminal.clear();

  // --- DENT opens ---
  await terminal.dent('Vin. I need to tell you something.');
  terminal.blank();

  await wait(400);

  await terminal.thought('DENT\'s tone is different. Not clipped. Not light.');
  await terminal.thought('The voice he uses when he\'s been processing something');
  await terminal.thought('for a long time and has finally reached a conclusion');
  await terminal.thought('he doesn\'t want to reach.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"I\'m listening."</span>');
  terminal.blank();

  await wait(400);

  await terminal.dent('I\'ve been correlating the anomalies. All of them.');
  await terminal.dentLine('The Render Gap in Chapter Six. The ghost in');
  await terminal.dentLine('Chapter Seven. The temporal bleed. Objects moving');
  await terminal.dentLine('when unobserved -- the wrench, the coupling, the');
  await terminal.dentLine('incidents I logged before I started mentioning them.');
  await terminal.dentLine('The chronometer discrepancy after the first fold.');
  terminal.blank();

  await wait(500);

  await terminal.dent('I\'ve been treating them as separate phenomena.');
  await terminal.dentLine('Fold artifacts. Sensor drift. Stress-induced');
  await terminal.dentLine('misremembering. I gave each one a rational');
  await terminal.dentLine('explanation because I was looking at each one');
  await terminal.dentLine('individually.');
  terminal.blank();

  await wait(400);

  await terminal.narrate('DENT pauses. In eight-plus chapters, he has never');
  await terminal.narrate('paused to gather himself before speaking.');
  terminal.blank();

  await wait(700);

  await terminal.dent('They all point to one conclusion. And I don\'t');
  await terminal.dentLine('think you\'re going to like it.');
  terminal.blank();

  await wait(400);

  await effects.glitch(300);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"Tell me."</span>');
  terminal.blank();

  await wait(600);

  // --- The revelation ---
  await effects.screenTear(3, 200);

  await terminal.dent('This universe has an update rate.');
  terminal.blank();

  await wait(700);

  await terminal.thought('...');
  terminal.blank();

  await wait(400);

  await terminal.dent('The Render Gap isn\'t a navigation anomaly. It\'s');
  await terminal.dentLine('a rendering boundary -- the edge of what\'s being');
  await terminal.dentLine('actively computed. The ghost wasn\'t a sensor echo.');
  await terminal.dentLine('It was a data artifact from a previous iteration.');
  await terminal.dentLine('The temporal bleed. The wrench. All of it.');
  terminal.blank();

  await wait(500);

  await terminal.dent('When you\'re not observing a region, it doesn\'t');
  await terminal.dentLine('need to be maintained at full resolution. Resources');
  await terminal.dentLine('go elsewhere. Objects return to a previous cached');
  await terminal.dentLine('state because no one is watching them and the');
  await terminal.dentLine('system doesn\'t spend cycles keeping them current.');
  terminal.blank();

  await wait(500);

  await effects.glitch(400);

  await terminal.narrate('My mouth is dry.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"You\'re describing a simulation."</span>');
  terminal.blank();

  await wait(600);

  await terminal.dent('I\'m describing what the data describes. You can');
  await terminal.dentLine('interpret it however you need to. But there is');
  await terminal.dentLine('one more piece.');
  terminal.blank();

  await wait(400);

  await terminal.dent('The update rate is not constant. It\'s been');
  await terminal.dentLine('increasing. Since we started moving toward the');
  await terminal.dentLine('Echo coordinates. As if whatever is running this');
  await terminal.dentLine('is allocating more cycles to our region as we');
  await terminal.dentLine('approach something significant.');
  terminal.blank();

  await wait(600);

  await effects.screenTear(4, 300);

  await terminal.dent('We\'re approaching the source, Vin.');
  await terminal.dentLine('The place where the universe is being run from.');
  terminal.blank();

  await wait(800);

  await terminal.thought('...');
  terminal.blank();

  await wait(500);

  await terminal.thought('I want to argue. I want to find the flaw in the');
  await terminal.thought('data, the gap in the reasoning, the instrumental');
  await terminal.thought('error or the confirmation bias. I\'ve been doing');
  await terminal.thought('that since the Render Gap. That\'s what I do.');
  await terminal.thought('That\'s who I am.');
  terminal.blank();

  await wait(500);

  await terminal.thought('But DENT doesn\'t reach conclusions against his');
  await terminal.thought('preference without evidence. That\'s different.');
  await terminal.thought('That means something.');
  terminal.blank();

  await wait(500);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"How do you know it\'s not the Echo itself?</span>');
  terminal.sayHtml('  <span class="c-white-bright">  The signal causing the anomalies as a side effect?"</span>');
  terminal.blank();

  await wait(500);

  await terminal.dent('I don\'t. That\'s the dual explanation -- the Echo');
  await terminal.dentLine('as a causal agent rather than a destination.');
  await terminal.dentLine('Both are consistent with the data. Both predict');
  await terminal.dentLine('the same thing: when we reach the coordinates,');
  await terminal.dentLine('we find the answer.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Either way, something is out there and we\'re');
  await terminal.dentLine('getting close to it. And whatever it is, it');
  await terminal.dentLine('knows we\'re coming. The increased update rate');
  await terminal.dentLine('is not passive. It\'s attention.');
  terminal.blank();

  await wait(600);

  await terminal.thought('Something is paying attention to us.');
  terminal.blank();

  await wait(500);

  await terminal.thought('I don\'t know what to do with that.');
  terminal.blank();

  await wait(400);

  await terminal.dent('Neither do I. But I thought you should have all');
  await terminal.dentLine('the information. You always make better decisions');
  await terminal.dentLine('with more information than with less.');
  terminal.blank();

  await wait(500);

  await terminal.thought('That\'s the kindest thing he\'s ever said to me.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Closing frame ---
  audio.play('echo_signal');

  await terminal.narrate('The sensor array pulses. Same blue sweep, same');
  await terminal.narrate('four-second interval. The Echo is still there,');
  await terminal.narrate('still signaling, still patient. But it\'s closer');
  await terminal.narrate('than it was. Everything is closer than it was.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('I sit with the data. The Disruptor humming in');
  await terminal.narrate('the cargo bay. Kade\'s ships on the edge of the');
  await terminal.narrate('scanner. The universe, apparently, watching.');
  terminal.blank();

  await wait(400);

  terminal.sayHtml('  <span class="c-white-bright">VIN:</span> <span class="c-white-bright">"DENT. Whatever we find at those coordinates.</span>');
  terminal.sayHtml('  <span class="c-white-bright">  Whatever it is. I want you there."</span>');
  terminal.blank();

  await wait(600);

  await terminal.dent('I\'m not going anywhere. I live here.');
  terminal.blank();

  await wait(500);

  await terminal.thought('Good.');
  terminal.blank();

  await wait(600);

  // --- Flags and save ---
  state.setFlag('chapter10_complete', true);
  state.chapter = 11;
  await state.save();

  // --- End card ---
  await terminal.pause();
  terminal.clear();

  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 10: Calculating the Betrayal -- Complete</span>');
  terminal.blank();

  const terms = state.getFlag('forced_alliance_terms') || 'unknown';
  const termsLabel = terms === 'equal' ? 'Equal partnership'
    : terms === 'vin_controls' ? 'Vin controls Disruptor'
    : terms === 'kade_controls' ? 'Kade controls Disruptor'
    : 'Unknown';

  const allianceStatus = state.getFlag('alliance_status') || 'unknown';
  const allianceColor = allianceStatus === 'stable' ? 'c-green'
    : allianceStatus === 'fractured' ? 'c-orange'
    : 'c-red';

  const kadeFirst = state.getFlag('kade_betrayal_first');
  const vinFirst = state.getFlag('vin_betrayal_first');
  const betrayalLabel = kadeFirst ? 'Kade moved first'
    : vinFirst ? 'Vin moved first'
    : 'Preempted -- no betrayal';

  const torquerLost = state.getFlag('torquer_lost');
  const torquerRetrieved = state.getFlag('torquer_retrieved');
  const dentPercent = Math.round(state.dentRepairLevel * 100);

  terminal.sayHtml('<span class="c-hull">--- CHAPTER SUMMARY ----------------------------</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.sayHtml(`  <span class="c-white-bright">DENT:</span> ${dentPercent}% operational`);
  terminal.blank();

  terminal.sayHtml(`  <span class="c-white-bright">Alliance terms:</span> <span class="c-dim">${termsLabel}</span>`);
  terminal.sayHtml(`  <span class="c-white-bright">Alliance status:</span> <span class="${allianceColor}">${allianceStatus.toUpperCase()}</span>`);
  terminal.sayHtml(`  <span class="c-white-bright">Betrayal:</span> <span class="c-dim">${betrayalLabel}</span>`);
  terminal.blank();

  terminal.sayHtml('  <span class="c-white-bright">Net Disruptor:</span> <span class="c-green">BUILT -- CHARGED</span>');

  if (torquerLost) {
    const tColor = torquerRetrieved ? 'c-green' : 'c-red';
    const tLabel = torquerRetrieved ? 'RETRIEVED' : 'STILL LOST';
    terminal.sayHtml(`  <span class="c-white-bright">Torquer:</span> <span class="${tColor}">${tLabel}</span>`);
  } else {
    terminal.sayHtml('  <span class="c-white-bright">Torquer:</span> <span class="c-green">ABOARD</span>');
  }

  terminal.blank();
  terminal.sayHtml('  <span class="c-orange">DENT: Second revelation logged.</span>');
  terminal.sayHtml('  <span class="c-orange">The universe has an update rate.</span>');
  terminal.sayHtml('  <span class="c-orange">We are approaching its source.</span>');
  terminal.sayHtml('<span class="c-hull">------------------------------------------------</span>');
  terminal.blank();

  terminal.sayHtml('<span class="c-dim">  Chapter 11: The Net Falls -- coming soon...</span>');
  terminal.blank();

  await terminal.pause();
}
