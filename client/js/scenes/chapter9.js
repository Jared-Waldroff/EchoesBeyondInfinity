/**
 * CHAPTER 9: THE COHERENCE NET
 * All folding disabled by the Coherence Net — SIC's ultimate area-denial weapon.
 * Kade is also trapped. Forced alliance becomes necessary.
 * Resource management during lockdown. DENT at 85%.
 *
 * Truby beats: #11 (Opponent's counterattack), #14 (Apparent defeat)
 * Literary voice: Tension + Strategy (Dashner 40% / Weir 40% / Cline 20%)
 *
 * VALIDATION:
 * - Truby #11: The Coherence Net is the SIC's most effective counterattack yet
 * - Truby #14: Fold drive suppressed, trapped, hunted — apparent defeat state
 * - Reed Dramatic Question: Can Vin escape when even running is impossible?
 * - Reed But/Therefore: Net kills fold BUT creates alliance THEREFORE prototype begins
 * - Reed Convergence: Alliance with Kade is now unavoidable regardless of prior choices
 * - Reed Consequence: Resource allocation choice shapes ch10 starting conditions
 * - Simulation layer: Net code mirrors error-handling, Disruptor specs are anachronistic
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter9(terminal, state, effects, audio) {
  state.foldStatus = 'LOCK';
  state.foldStability = 0;

  terminal.clear();
  audio.ambient('theme_coherence_net');
  await terminal.chapterTitle(9, 'THE COHERENCE NET');

  await netActivation(terminal, state, effects, audio);
  await kadeContact(terminal, state, effects, audio);
  await resourceManagement(terminal, state, effects, audio);
  await disruptorPrototype(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: NET ACTIVATION
// ═══════════════════════════════════════════════════════

async function netActivation(terminal, state, effects, audio) {
  /**
   * The Coherence Net activates. Fold drive dies. SIC closes the cage.
   *
   * VALIDATION:
   * - Truby #11: Graves deploys the Net as a direct counterattack
   * - Reed Dramatic Question established: How do you run when running is impossible?
   * - Simulation layer: DENT observes Net energy signature = error-handling code
   * - Tone: Sudden, catastrophic, then eerie calm
   *
   * Sets: coherence_net_active = true, fold_drive_disabled = true
   */

  audio.ambient('deep_space_hum');

  await terminal.narrate('I am running fold pre-checks when it happens.');
  terminal.blank();

  await terminal.narrate('Not an explosion. Not a warning. Something quieter.');
  await terminal.narrate('The fold drive display goes from READY to LOCK in');
  await terminal.narrate('0.003 seconds, and then stays there. The null');
  await terminal.narrate('injectors are still charged. The coupling seals are');
  await terminal.narrate('intact. The drive is not broken.');
  terminal.blank();

  await terminal.thought('It just stopped listening to me.');
  terminal.blank();

  await wait(500);

  await terminal.dent('Vin.');
  terminal.blank();

  await wait(300);

  await terminal.dent("Something just hit every fold-capable system on");
  await terminal.dentLine("the Vex simultaneously. Not a malfunction —");
  await terminal.dentLine("the hardware is fine. The drive is receiving");
  await terminal.dentLine("power. It's just... not responding to commands.");
  terminal.blank();

  await terminal.thought("I know that feeling. That's suppression. That's");
  await terminal.thought("external override.");
  terminal.blank();

  audio.play('stinger_danger');
  audio.play('system_lockdown');
  await effects.screenTear(3, 200);

  terminal.blank();
  await terminal.dentSystem('FOLD DRIVE STATUS: LOCKED — EXTERNAL SUPPRESSION');
  await terminal.dentSystem('NULL INJECTORS: CHARGED — INERT');
  await terminal.dentSystem('FOLD CONTROL AUTHORITY: REVOKED');
  await terminal.dentSystem('SOURCE: UNKNOWN FIELD EMITTER');
  terminal.blank();

  await wait(400);

  await terminal.dent("I'm scanning the field. It's enormous. The");
  await terminal.dentLine("suppression zone covers — Vin, this covers");
  await terminal.dentLine("three full sectors. Thousands of cubic");
  await terminal.dentLine("light-years. Whatever is generating this—");
  terminal.blank();

  await terminal.dent("This isn't a weapon. It's a containment field.");
  await terminal.dentLine("We're inside a cage.");
  terminal.blank();

  await terminal.narrate("I lean over the sensor display. The field boundary");
  await terminal.narrate("renders as a pale geometric shell on the nav plot.");
  await terminal.narrate("A perfect sphere. The Core Anomaly is at its center.");
  await terminal.narrate("We are very much inside it.");
  terminal.blank();

  await terminal.thought("They put a wall around everything worth running to.");
  await terminal.thought("And everything worth running from.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Simulation evidence — DENT notices the code structure
  await terminal.dent("I've been analyzing the field's energy signature.");
  await terminal.dentLine("The emission pattern is unlike anything in the");
  await terminal.dentLine("SIC engineering database.");
  terminal.blank();

  await wait(300);

  await terminal.dent("Vin. The field's carrier frequency modulates");
  await terminal.dentLine("in discrete error-correction cycles. Specifically:");
  await terminal.dentLine("it identifies fold-drive handshake sequences and");
  await terminal.dentLine("returns rejection packets in under one microsecond.");
  terminal.blank();

  await terminal.thought("Rejection packets. Like a network firewall.");
  terminal.blank();

  await terminal.dent("The pattern isn't mechanical. It's computational.");
  await terminal.dentLine("It's not blocking fold drives the way a wall");
  await terminal.dentLine("blocks a door. It's blocking them the way an");
  await terminal.dentLine("operating system blocks unauthorized processes.");
  terminal.blank();

  await wait(500);

  await terminal.dent("The Coherence Net doesn't just suppress fold drives.");
  await terminal.dentLine("It reads their authorization signatures — and");
  await terminal.dentLine("refuses every one that isn't on a whitelist.");
  terminal.blank();

  await terminal.thought("A whitelist. Something decides who gets to fold.");
  await terminal.thought("Something that can read every fold drive in three");
  await terminal.thought("sectors simultaneously and answer each one.");
  terminal.blank();

  await terminal.thought("That's not an SIC weapons program.");
  await terminal.thought("That's something else entirely.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Graves transmission
  audio.play('comms_open');
  await effects.glitch(300);

  terminal.blank();
  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 INCOMING TRANSMISSION \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Source: SIC COMMAND AUTHORITY');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Origin: CLASSIFIED');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Encryption: NONE');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await wait(400);

  await terminal.say('GRAVES: The Net is active.');
  terminal.blank();
  await wait(300);
  await terminal.say('GRAVES: All unauthorized fold operations cease');
  await terminal.say('        immediately. This is not a request.');
  terminal.blank();
  await wait(300);
  await terminal.say('GRAVES: You may use gravity drives, shuttle craft,');
  await terminal.say('        and conventional propulsion at your discretion.');
  await terminal.say('        At your current position, the nearest exit');
  await terminal.say('        point is approximately four-point-two years');
  await terminal.say('        of transit time.');
  terminal.blank();
  await wait(300);
  await terminal.say('GRAVES: I suggest you use that time productively.');
  terminal.blank();

  await wait(600);

  terminal.sayHtml('  <span class="c-hull">\u2500\u2500 TRANSMISSION END \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>');
  terminal.blank();

  await wait(400);

  await terminal.thought("Four years. On gravity drive. In a zone Graves");
  await terminal.thought("controls completely.");
  terminal.blank();

  await terminal.thought("He's not trying to kill us. He's trying to");
  await terminal.thought("wait us out. He thinks we'll run out of null,");
  await terminal.thought("run out of food, run out of will.");
  terminal.blank();

  await terminal.thought("He might be right.");
  terminal.blank();

  await terminal.dent("For the record, I'd like to register my");
  await terminal.dentLine("objection to being imprisoned in a");
  await terminal.dentLine("three-sector cage by a man who doesn't");
  await terminal.dentLine("even have the courtesy to be visibly angry.");
  terminal.blank();

  await terminal.dent("Calm villains are the worst kind.");
  terminal.blank();

  state.setFlag('coherence_net_active', true);
  state.setFlag('fold_drive_disabled', true);
  state.applyDamage({ stress: 8 });
  await state.save();

  terminal.sayHtml('<span class="c-dim">  [Fold drive suppressed by Coherence Net]</span>');
  terminal.sayHtml('<span class="c-dim">  [Stress +8 \u2014 containment acknowledged]</span>');
  terminal.blank();

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: KADE CONTACT
// ═══════════════════════════════════════════════════════

async function kadeContact(terminal, state, effects, audio) {
  /**
   * Kade contacts Vin — her fleet is trapped too. Alliance negotiation.
   *
   * VALIDATION:
   * - Reed Convergence: Alliance happens regardless of prior Kade relationship
   * - Reed Dramatic Question: Can you trust someone you know will betray you?
   * - Truby #11: Net traps both parties, forcing cooperation
   * - Player agency: Alliance terms shape ch10 mechanics and trust level
   * - Kade voice: Charismatic, openly dangerous, brutally pragmatic
   *
   * Sets: kade_trapped = true, kade_alliance_renewed = true
   * Stores: kade_alliance_terms (prior flag from ch4 may differ from this)
   */

  audio.play('comms_static');

  await terminal.narrate("Fourteen minutes after Graves ends his broadcast,");
  await terminal.narrate("the comms board lights up. Different frequency.");
  await terminal.narrate("Civilian band, heavily scrambled.");
  terminal.blank();

  await terminal.dent("Incoming. Scrambled civilian frequency.");
  await terminal.dentLine("The encryption pattern is...");
  await wait(300);
  await terminal.dentLine("That's Kade's cipher. She changed the key,");
  await terminal.dentLine("but the structure is the same.");
  terminal.blank();

  await terminal.thought("Of course it is.");
  terminal.blank();

  const acceptContact = await terminal.arrowMenu(
    ['Answer it.', 'Let it ring.'],
    [
      "She's trapped too. That makes her useful.",
      "You don't owe her anything. See if she calls back.",
    ]
  );

  terminal.blank();

  if (acceptContact === 1) {
    // Let it ring — she calls back immediately
    await terminal.narrate("The signal cuts. Two seconds of silence.");
    terminal.blank();
    await terminal.narrate("Then she calls again on a backup frequency.");
    terminal.blank();
    await terminal.dent("She's... persistent. I'll give her that.");
    terminal.blank();
    await wait(300);
  }

  // Answer either way — convergence point
  audio.play('comms_open');

  terminal.sayHtml('  <span class="c-orange">\u250C\u2500 SCRAMBLED CHANNEL OPEN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-orange">\u2502</span>  KADE // ENCRYPTED');
  terminal.sayHtml('  <span class="c-orange">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await wait(400);

  await terminal.say("KADE: Well, isn't this fun.");
  terminal.blank();
  await wait(200);
  await terminal.say("KADE: The SIC just grounded every ship in three");
  await terminal.say("      sectors. I've got fourteen Folders who can't");
  await terminal.say("      fold. They're angry. So am I.");
  terminal.blank();

  await terminal.narrate("Her voice is bright and clipped. The kind of calm");
  await terminal.narrate("that comes from being furious so often you've");
  await terminal.narrate("learned to use it as fuel.");
  terminal.blank();

  await terminal.say("KADE: Before you say anything — yes, I know.");
  await terminal.say("      This is partially because of you.");
  await terminal.say("      I'm choosing to be mature about it.");
  terminal.blank();

  await wait(300);

  await terminal.say("KADE: I have SIC technical specifications. Not");
  await terminal.say("      public ones — internal. Design documents.");
  await terminal.say("      Things they didn't want anyone to see.");
  terminal.blank();

  await wait(200);

  await terminal.say("KADE: Including the specifications for the");
  await terminal.say("      Coherence Net. And — more importantly —");
  await terminal.say("      for a prototype device that can disrupt it.");
  terminal.blank();

  await wait(400);

  await terminal.thought("A Net Disruptor. She's dangling it deliberately.");
  await terminal.thought("She knows exactly what that's worth to me right now.");
  terminal.blank();

  await terminal.say("KADE: But I need components that I don't have.");
  await terminal.say("      Components that are aboard the Core Anomaly");
  await terminal.say("      research station. Components that — unless");
  await terminal.say("      I'm wrong about your current trajectory —");
  await terminal.say("      you can reach.");
  terminal.blank();

  await terminal.dent("She's not wrong about our trajectory.");
  await terminal.dentLine("I hate it when she's not wrong.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Alliance terms choice
  await terminal.narrate("I lean back in the pilot seat and stare at the");
  await terminal.narrate("comms display. Kade is waiting. She has the");
  await terminal.narrate("patience of someone who's won negotiations by");
  await terminal.narrate("silence before.");
  terminal.blank();

  await terminal.dent("For the record: she will eventually betray us.");
  await terminal.dentLine("The question is whether she does it before or");
  await terminal.dentLine("after we stop needing each other. Structuring");
  await terminal.dentLine("the alliance correctly shifts the probability.");
  terminal.blank();

  await terminal.dent("I recommend thinking carefully about what we");
  await terminal.dentLine("share and what we don't.");
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">\u2500\u2500 ALLIANCE TERMS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>');
  terminal.blank();

  const allianceChoice = await terminal.arrowMenu(
    [
      'Full partnership.',
      'Tactical alliance.',
      'Minimal cooperation.',
    ],
    [
      'Share everything. Research, routes, resources. Mutual trust.',
      'Share intelligence and schematics. Keep tech separate. Professional.',
      'Coordinate movements only. No data sharing. Pure logistics.',
    ]
  );

  terminal.blank();

  if (allianceChoice === 0) {
    state.setFlag('kade_alliance_terms', 'full_partnership');
    await terminal.narrate("I key the mic.");
    terminal.blank();
    await terminal.say("VIN: Full partnership. You send the specs, I send");
    await terminal.say("     you everything we've learned about the Core");
    await terminal.say("     Anomaly. We work together on the Disruptor.");
    terminal.blank();
    await wait(300);
    await terminal.say("KADE: ...");
    terminal.blank();
    await wait(400);
    await terminal.say("KADE: Vin, I appreciate the gesture. But I want");
    await terminal.say("      you to know — that kind of trust is going");
    await terminal.say("      to make things very complicated when this");
    await terminal.say("      is over.");
    terminal.blank();
    await wait(200);
    await terminal.say("KADE: I'm accepting anyway. Don't make me regret it.");
    terminal.blank();
    await terminal.thought("She sounds almost uncomfortable. Good. Discomfort");
    await terminal.thought("means she's operating outside her usual playbook.");
    terminal.blank();

  } else if (allianceChoice === 1) {
    state.setFlag('kade_alliance_terms', 'tactical');
    await terminal.narrate("I key the mic.");
    terminal.blank();
    await terminal.say("VIN: Tactical alliance. You send the Net Disruptor");
    await terminal.say("     specs. I send you the station access codes.");
    await terminal.say("     We share intelligence. We keep our tech separate.");
    terminal.blank();
    await wait(300);
    await terminal.say("KADE: Reasonable. Clean. I like clean.");
    terminal.blank();
    await wait(200);
    await terminal.say("KADE: Agreed. Transmitting the initial schematic");
    await terminal.say("      package on this channel. Don't share it.");
    terminal.blank();
    await terminal.thought("Tactical. Mutual benefit, defined boundaries.");
    await terminal.thought("She understands this language.");
    terminal.blank();

  } else {
    state.setFlag('kade_alliance_terms', 'minimal');
    await terminal.narrate("I key the mic.");
    terminal.blank();
    await terminal.say("VIN: Movements only. We coordinate so we don't");
    await terminal.say("     step on each other. Nothing else.");
    terminal.blank();
    await wait(300);
    await terminal.say("KADE: ...");
    terminal.blank();
    await wait(400);
    await terminal.say("KADE: You know you're going to need those specs.");
    terminal.blank();
    await wait(200);
    await terminal.say("KADE: Fine. Minimal. But when you change your mind,");
    await terminal.say("      the offer stands. I'm not petty about survival.");
    terminal.blank();
    await terminal.thought("She's not insulted. She's filing it away as data.");
    await terminal.thought("That might be worse than if she were insulted.");
    terminal.blank();
  }

  await wait(400);

  await terminal.say("KADE: One more thing. My people have been tracking");
  await terminal.say("      Graves's patrol patterns since the Net went live.");
  await terminal.say("      He's not deploying enforcers — he's waiting.");
  terminal.blank();
  await wait(200);
  await terminal.say("KADE: Whatever's at the Core Anomaly, Graves wants");
  await terminal.say("      it intact. He needs us alive enough to find it.");
  terminal.blank();

  await wait(300);
  terminal.sayHtml('  <span class="c-orange">\u2500\u2500 CHANNEL CLOSED \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.thought("He needs us alive enough to find it.");
  await terminal.thought("That's either extremely reassuring or extremely");
  await terminal.thought("terrifying, and I cannot tell which.");
  terminal.blank();

  await terminal.dent("For what it's worth — she's probably right about");
  await terminal.dentLine("Graves's intentions. He's not a blunt instrument.");
  await terminal.dentLine("He's using us as a very expensive metal detector.");
  terminal.blank();

  state.setFlag('kade_trapped', true);
  state.setFlag('kade_alliance_renewed', true);
  await state.save();

  terminal.sayHtml('<span class="c-dim">  [Alliance established: ' + state.getFlag('kade_alliance_terms') + ']</span>');
  terminal.blank();

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: RESOURCE MANAGEMENT
// ═══════════════════════════════════════════════════════

async function resourceManagement(terminal, state, effects, audio) {
  /**
   * Extended lockdown resource management. Claustrophobic, consequential.
   *
   * VALIDATION:
   * - Reed Consequence: Resource choice directly affects ch10 starting stats
   * - Truby #14: Apparent defeat manifests as grinding resource pressure
   * - DENT provides probability analysis — 85% DENT is fully engaged, protective
   * - Player agency: Conservative / Balanced / Aggressive allocation
   * - Tone: Tense, pragmatic, claustrophobic
   *
   * Sets: resource_management_ch9 = 'conserve' | 'balanced' | 'aggressive'
   */

  audio.ambient('low_power_hum');

  await terminal.narrate("Day three inside the Net.");
  terminal.blank();

  await terminal.narrate("I've reorganized the supply locker twice. Recounted");
  await terminal.narrate("the null cells four times. The number doesn't");
  await terminal.narrate("change. The ship doesn't get bigger. Graves doesn't");
  await terminal.narrate("call again.");
  terminal.blank();

  await terminal.thought("Solitary confinement in a can of recycled air,");
  await terminal.thought("three light-years from anywhere.");
  terminal.blank();

  await terminal.dent("I've completed the resource inventory.");
  await terminal.dentLine("You're not going to love the numbers.");
  terminal.blank();

  await wait(400);

  await terminal.dentSystem('RESOURCE STATUS \u2014 DAY 3 OF NET LOCKDOWN');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem(`Null reserves .......... ${state.nullReserves} cells`);
  await terminal.dentSystem('Life support ........... 94% efficiency');
  await terminal.dentSystem(`Hull integrity ......... ${state.hull}%`);
  await terminal.dentSystem('Food/water ............. 18 days full ration');
  await terminal.dentSystem('                        34 days half ration');
  await terminal.dentSystem('Gravity drive fuel ..... NOMINAL (no fold drain)');
  await terminal.dentSystem('Fold drive ............. SUPPRESSED');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(400);

  await terminal.dent("The null cells are the critical constraint.");
  await terminal.dentLine("We can't fold to replenish. The nearest confirmed");
  await terminal.dentLine("null deposit is inside the Net boundary — meaning");
  await terminal.dentLine("we'd have to use null to reach it, which is the");
  await terminal.dentLine("exact problem we're trying to solve.");
  terminal.blank();

  await terminal.dent("We need null for the Disruptor prototype.");
  await terminal.dentLine("We need null for ship systems.");
  await terminal.dentLine("We need null for — well. For null energy.");
  await terminal.dentLine("There's no part of this that doesn't need null.");
  terminal.blank();

  await terminal.thought("He's right. The null economy is the entire problem.");
  await terminal.thought("Every option costs what we can't afford to spend.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.narrate("I pull the resource projections onto the main");
  await terminal.narrate("display. Three scenarios. Three ways to be trapped");
  await terminal.narrate("with different flavors of regret.");
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">\u2500\u2500 RESOURCE ALLOCATION STRATEGY \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>');
  terminal.blank();

  const resourceChoice = await terminal.arrowMenu(
    [
      'Conserve everything.',
      'Balanced allocation.',
      'Aggressive push.',
    ],
    [
      'Ration all systems. Slower but safer. Build nothing until specs are confirmed.',
      'Standard operational tempo. Moderate Disruptor research. Managed risk.',
      'Full power to research and movement. Use the null. Move fast, build faster.',
    ]
  );

  terminal.blank();

  if (resourceChoice === 0) {
    state.setFlag('resource_management_ch9', 'conserve');
    await terminal.dent("Conserve. Understood.");
    await terminal.dentLine("Projecting: 94% probability of reaching");
    await terminal.dentLine("Disruptor completion with reserves intact.");
    await terminal.dentLine("Projecting: Slow progress. Higher stress,");
    await terminal.dentLine("lower null expenditure.");
    terminal.blank();

    await terminal.narrate("I drop all non-essential systems to minimum.");
    await terminal.narrate("Dim the lights. Slow the processors. The Vex");
    await terminal.narrate("becomes a very quiet, very dark box.");
    terminal.blank();

    await terminal.thought("Survival mode. I've been here before.");
    await terminal.thought("The prologue lasted longer. I think.");
    terminal.blank();

    await terminal.dent("One note: at this pace, Kade's people may");
    await terminal.dentLine("complete the Disruptor before we do. That");
    await terminal.dentLine("changes the leverage dynamic considerably.");
    terminal.blank();

    await terminal.thought("Everything is leverage. Even caution.");
    terminal.blank();
    state.applyDamage({ stress: 10, null: -1 });
    terminal.sayHtml('<span class="c-dim">  [Resources conserved: null reserves protected]</span>');
    terminal.sayHtml('<span class="c-dim">  [Stress +10 \u2014 grinding pace, claustrophobia mounting]</span>');

  } else if (resourceChoice === 1) {
    state.setFlag('resource_management_ch9', 'balanced');
    await terminal.dent("Balanced. The engineer's answer.");
    await terminal.dentLine("Projecting: 81% probability of Disruptor");
    await terminal.dentLine("completion before null reserves become");
    await terminal.dentLine("critical. Manageable risk curve.");
    terminal.blank();

    await terminal.narrate("Standard operational tempo. Systems at normal");
    await terminal.narrate("power. Research in progress. The Vex hums along");
    await terminal.narrate("at its usual steady rhythm.");
    terminal.blank();

    await terminal.thought("Normal. As if any of this is normal.");
    await terminal.thought("Normal is just the lie we tell the stress response.");
    terminal.blank();

    await terminal.dent("We'll need to monitor null expenditure carefully.");
    await terminal.dentLine("Any variance from the projection and we'll");
    await terminal.dentLine("need to revise the strategy. I'll flag it.");
    terminal.blank();

    state.applyDamage({ stress: 6, null: -2 });
    terminal.sayHtml('<span class="c-dim">  [Balanced allocation: moderate null usage]</span>');
    terminal.sayHtml('<span class="c-dim">  [Stress +6 \u2014 tension managed but present]</span>');

  } else {
    state.setFlag('resource_management_ch9', 'aggressive');
    await terminal.dent("Aggressive. All right.");
    await terminal.dentLine("Projecting: 67% probability of completing the");
    await terminal.dentLine("Disruptor before resources drop critical.");
    await terminal.dentLine("Projected null reserves at completion: 2-4 cells.");
    await terminal.dentLine("That's the margin between here and whatever");
    await terminal.dentLine("comes next. Razor thin.");
    terminal.blank();

    await terminal.narrate("Full power to research systems. The Vex runs hot.");
    await terminal.narrate("Every processor dedicated to Disruptor analysis.");
    await terminal.narrate("The null cells drain in real time on the display.");
    terminal.blank();

    await terminal.thought("Fast. We move fast. We don't give Graves time");
    await terminal.thought("to change his mind about keeping us alive.");
    terminal.blank();

    await terminal.dent("Vin. I want you to hear the 33% clearly.");
    await terminal.dentLine("That's not a rounding error. That's one in");
    await terminal.dentLine("three chance this ends with us cold and silent");
    await terminal.dentLine("in the Net.");
    terminal.blank();

    await terminal.dent("I'm not saying no. I'm saying: I want you");
    await terminal.dentLine("to know that I know.");
    terminal.blank();

    await terminal.thought("He's protective. Even when it means saying");
    await terminal.thought("something uncomfortable.");
    terminal.blank();

    state.applyDamage({ stress: 4, null: -4, hull: -3 });
    terminal.sayHtml('<span class="c-dim">  [Aggressive push: significant null expenditure]</span>');
    terminal.sayHtml('<span class="c-dim">  [Stress +4 \u2014 momentum buffers anxiety]</span>');
    terminal.sayHtml('<span class="c-dim">  [Hull -3 \u2014 running hot, minor thermal stress]</span>');
  }

  terminal.blank();

  await wait(500);

  await terminal.narrate("The Net doesn't care which I choose. It sits");
  await terminal.narrate("at the edge of sensor range, invisible except");
  await terminal.narrate("for its effect — every fold attempt answered");
  await terminal.narrate("with instant, silent rejection.");
  terminal.blank();

  await terminal.narrate("The cage doesn't need walls you can see.");
  terminal.blank();

  await terminal.dent("Day four. Day five.");
  await terminal.dentLine("We work.");
  terminal.blank();

  await state.save();
  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: DISRUPTOR PROTOTYPE
// ═══════════════════════════════════════════════════════

async function disruptorPrototype(terminal, state, effects, audio) {
  /**
   * Kade sends schematics. DENT and Vin build the prototype.
   * DENT discovers the specs are anachronistic — simulation evidence grows.
   *
   * VALIDATION:
   * - Truby #14: Prototype works but isn't enough — partial victory, still losing
   * - Simulation evidence: Disruptor specs contain pre-civilization math
   * - DENT voice: 85% — intellectually engaged, slightly unnerved
   * - Reed Consequence: Prototype incompleteness sets up ch10 full build
   * - Dramatic irony: The tool to escape the cage was built into the cage's design
   *
   * Sets: net_disruptor_prototype = true
   */

  audio.ambient('workshop_hum');

  await terminal.narrate("Day six. Kade's schematic package arrives.");
  terminal.blank();

  await terminal.narrate("I spread the technical drawings across the main");
  await terminal.narrate("display — three hundred pages of engineering");
  await terminal.narrate("documentation for a device that doesn't exist yet.");
  await terminal.narrate("A device designed to punch a hole in the most");
  await terminal.narrate("sophisticated area-denial field in known space.");
  terminal.blank();

  await terminal.dent("I have the schematics. Give me a moment.");
  terminal.blank();

  await wait(600);

  audio.play('data_processing');

  await terminal.dentSystem('SCHEMATIC ANALYSIS IN PROGRESS ................');
  await wait(400);
  await terminal.dentSystem('CROSS-REFERENCING SIC ENGINEERING DATABASE .....');
  await wait(400);
  await terminal.dentSystem('COMPONENT MANIFEST: VERIFIED');
  await terminal.dentSystem('CONSTRUCTION COMPLEXITY: HIGH');
  await terminal.dentSystem('ESTIMATED BUILD TIME: 9-14 HOURS');
  terminal.blank();

  await wait(400);

  await terminal.dent("The design is elegant. Brutally so.");
  await terminal.dentLine("It doesn't destroy the Net — it creates a");
  await terminal.dentLine("localized resonance pattern that convinces the");
  await terminal.dentSystem("Net's rejection algorithm that a fold drive");
  await terminal.dentLine("signature has valid authorization.");
  terminal.blank();

  await terminal.dent("It lies to the firewall, essentially.");
  await terminal.dentLine("Using the Net's own authentication protocol");
  await terminal.dentLine("against itself.");
  terminal.blank();

  await terminal.thought("A spoofed authorization key. For a firewall.");
  await terminal.thought("For a thing that behaves like a firewall.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Building the prototype
  await terminal.narrate("We work. DENT runs the calculations. I run the");
  await terminal.narrate("tools. The ship smells like burnt null cell casing");
  await terminal.narrate("and solder for six hours straight.");
  terminal.blank();

  await terminal.narrate("The prototype takes shape on the workbench.");
  await terminal.narrate("Eleven centimeters of salvaged components and");
  await terminal.narrate("jury-rigged null-energy emitters, wrapped in");
  await terminal.narrate("stripped communications wire.");
  terminal.blank();

  await terminal.narrate("It looks ridiculous.");
  terminal.blank();

  await terminal.dent("It's not supposed to look good. It's supposed");
  await terminal.dentLine("to work. Currently projecting 40% effectiveness");
  await terminal.dentLine("against the Net's authentication layer.");
  terminal.blank();

  await terminal.thought("40%. We need 100%.");
  terminal.blank();

  await terminal.dent("We need the Core Anomaly station components.");
  await terminal.dentLine("The ones Kade specified. With those, we can");
  await terminal.dentLine("scale the resonance output by a factor of");
  await terminal.dentLine("eight. That gets us to full breach capability.");
  terminal.blank();

  await terminal.thought("So the prototype works. It just doesn't work");
  await terminal.thought("enough.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // The anachronism discovery
  await terminal.narrate("While the prototype cures, I go back through");
  await terminal.narrate("the schematics. Something has been nagging at me");
  await terminal.narrate("since I first scanned them.");
  terminal.blank();

  await terminal.narrate("A mathematical notation in the resonance frequency");
  await terminal.narrate("equations. Small. Easy to miss.");
  terminal.blank();

  await wait(400);

  audio.play('discovery_tone');

  await terminal.dent("Vin.");
  terminal.blank();

  await wait(300);

  await terminal.dent("I've found something in the schematic.");
  terminal.blank();

  await wait(400);

  await terminal.dent("The core resonance algorithm uses a specific");
  await terminal.dentLine("mathematical framework for null-energy phase");
  await terminal.dentLine("synchronization. The framework is labeled");
  await terminal.dentLine("'Coherence Theorem, Primary Derivation.'");
  terminal.blank();

  await terminal.dent("I went looking for the source of that theorem.");
  await terminal.dentLine("The earliest known publication.");
  terminal.blank();

  await wait(500);

  await terminal.dent("Vin, the Coherence Theorem wasn't published");
  await terminal.dentLine("until six years ago. Dr. Vasara Mei, Institute");
  await terminal.dentLine("of Null-State Physics. The paper that started");
  await terminal.dentLine("modern fold theory.");
  terminal.blank();

  await wait(400);

  await terminal.dent("The schematic Kade sent us is based on that theorem.");
  terminal.blank();

  await wait(500);

  await terminal.dent("But the document metadata — the creation timestamp,");
  await terminal.dentLine("the file structure, the encoding format —");
  terminal.blank();

  await wait(400);

  await effects.glitch(350);

  await terminal.dent("Vin. This document is forty-three years old.");
  terminal.blank();

  await wait(600);

  await terminal.thought("...");
  terminal.blank();

  await terminal.thought("That's impossible. The theorem it's based on");
  await terminal.thought("didn't exist forty-three years ago.");
  terminal.blank();

  await terminal.dent("The math in these schematics predates the math");
  await terminal.dentLine("that makes the math possible.");
  terminal.blank();

  await terminal.dent("Kade, where did you get these?");
  terminal.blank();

  await wait(400);

  // Kade's response
  audio.play('comms_static');
  terminal.sayHtml('  <span class="c-orange">\u2500\u2500 KADE (ENCRYPTED) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.say("KADE: Interesting question.");
  terminal.blank();
  await wait(300);
  await terminal.say("KADE: I found them in an SIC archive. Deep storage.");
  await terminal.say("      Classified above my clearance level, which");
  await terminal.say("      made them immediately interesting.");
  terminal.blank();
  await wait(200);
  await terminal.say("KADE: I assumed the date was a clerical error.");
  terminal.blank();
  await wait(300);
  await terminal.say("KADE: ...It wasn't a clerical error?");
  terminal.blank();

  terminal.sayHtml('  <span class="c-orange">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.dent("It was not a clerical error.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Simulation evidence moment
  await terminal.narrate("I sit with it for a long time.");
  terminal.blank();

  await terminal.narrate("A document that predates the theory it's based on.");
  await terminal.narrate("Engineering specifications for a device that couldn't");
  await terminal.narrate("have been designed without knowledge that didn't");
  await terminal.narrate("exist when the document was created.");
  terminal.blank();

  await terminal.thought("Either the timestamp is wrong. Or the theorem is.");
  await terminal.thought("Or the history is.");
  terminal.blank();

  await terminal.dent("I want to say something.");
  terminal.blank();

  await wait(400);

  await terminal.dent("The Net's authentication algorithm. The Disruptor's");
  await terminal.dentLine("resonance math. The Core Anomaly's energy signature.");
  terminal.blank();

  await wait(300);

  await terminal.dent("I've been analyzing them in parallel for six days.");
  await terminal.dentLine("Separately, they're each remarkable pieces of");
  await terminal.dentLine("engineering. But together —");
  terminal.blank();

  await wait(400);

  await effects.glitch(400);
  await effects.screenTear(2, 200);

  await terminal.dent("They use the same underlying mathematical structure.");
  await terminal.dentLine("Not similar. Not inspired by each other. Identical.");
  await terminal.dentLine("Down to the variable naming conventions.");
  terminal.blank();

  await terminal.dent("The Net is written in the same language as the");
  await terminal.dentLine("Disruptor. And the Core Anomaly. All three.");
  terminal.blank();

  await wait(600);

  await terminal.thought("The cage. The key. The thing the cage was built");
  await terminal.thought("to contain. All three written in the same language.");
  terminal.blank();

  await terminal.thought("By the same author.");
  terminal.blank();

  await terminal.dent("I just wanted you to have that.");
  terminal.blank();

  state.setFlag('net_disruptor_prototype', true);
  state.applyDamage({ null: -3, stress: 5 });
  await state.save();

  terminal.sayHtml('<span class="c-dim">  [Net Disruptor prototype: BUILT (40% effective)]</span>');
  terminal.sayHtml('<span class="c-dim">  [Full capability requires Core Anomaly components]</span>');
  terminal.blank();

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: CHAPTER END
// ═══════════════════════════════════════════════════════

async function chapterEnd(terminal, state, effects, audio) {
  /**
   * Chapter 9 closes. The language beneath everything grows clear.
   * Graves is closing in. The clock is ticking.
   *
   * VALIDATION:
   * - Truby #14 resolved: apparent defeat acknowledged, but path forward exists
   * - Simulation evidence accumulated and named — DENT connects the threads
   * - Reed Consequence: Summary captures all player-choice variations
   * - Graves threat reinstated — no resting, no safety
   * - Tone shift: from claustrophobia to focused dread
   *
   * Sets: chapter9_complete = true, state.chapter = 10
   */

  audio.ambient('deep_space_hum');

  await terminal.narrate("Day nine inside the Net.");
  terminal.blank();

  await terminal.narrate("The prototype sits on the workbench, finished.");
  await terminal.narrate("Forty percent effective. Not enough. The component");
  await terminal.narrate("list for the full Disruptor is pinned to the");
  await terminal.narrate("display, items highlighted by distance and");
  await terminal.narrate("difficulty of acquisition.");
  terminal.blank();

  await terminal.narrate("All of them are in the Core Anomaly station.");
  await terminal.narrate("The place Graves is watching.");
  await terminal.narrate("The place the Net was built to protect.");
  terminal.blank();

  await terminal.thought("We are going exactly where the trap wants us");
  await terminal.thought("to go. With a half-finished key to a lock");
  await terminal.thought("that the lock's designer built.");
  terminal.blank();

  await terminal.thought("I am aware this is insane.");
  terminal.blank();

  await wait(500);

  await terminal.dent("Vin. Before the chapter summary, I want to");
  await terminal.dentLine("say something I've been computing for days.");
  terminal.blank();

  await terminal.dent("The Net's code structure. The Disruptor specs.");
  await terminal.dentLine("The Core Anomaly. They're all speaking the");
  await terminal.dentLine("same language.");
  terminal.blank();

  await wait(500);

  await terminal.dent("A language that predates us. Predates everything.");
  terminal.blank();

  await wait(600);

  await terminal.dent("The SIC didn't invent the Net. They found it.");
  await terminal.dentLine("Or found the instructions for it. The same way");
  await terminal.dentLine("Kade found the Disruptor specs in an archive");
  await terminal.dentLine("forty years too old.");
  terminal.blank();

  await terminal.dent("Someone built the Net before the Net could");
  await terminal.dentLine("exist. Someone built the Disruptor before the");
  await terminal.dentLine("Net existed to be disrupted.");
  terminal.blank();

  await wait(600);

  await terminal.dent("And someone built the Core Anomaly before any");
  await terminal.dentLine("of it.");
  terminal.blank();

  await terminal.thought("Before any of it.");
  terminal.blank();

  await terminal.thought("Someone wrote the problem, the cage, and the");
  await terminal.thought("key. And hid all three where eventually,");
  await terminal.thought("inevitably, we would find them.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Graves closes in
  audio.play('comms_open');
  await effects.glitch(200);

  await terminal.dent("Picking up increased SIC sensor activity.");
  await terminal.dentLine("Three patrol craft. Moving toward our position.");
  await terminal.dentLine("Not attack formation — observer formation.");
  terminal.blank();

  await terminal.dent("Graves knows we're building something.");
  terminal.blank();

  await terminal.thought("Of course he does.");
  terminal.blank();

  await terminal.thought("He built the room. He can see everything in it.");
  terminal.blank();

  await wait(400);

  audio.play('comms_incoming');
  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 GRAVES \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.blank();

  await terminal.say("GRAVES: I see you're industrious.");
  terminal.blank();
  await wait(400);
  await terminal.say("GRAVES: That's admirable. Truly.");
  terminal.blank();
  await wait(300);
  await terminal.say("GRAVES: Whatever you're building, Dr. Chen —");
  await terminal.say("        I'll be very interested to see what it does.");
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">\u2500\u2500 END TRANSMISSION \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await wait(500);

  await terminal.thought("He's not stopping us.");
  await terminal.thought("He wants us to finish it.");
  terminal.blank();

  await terminal.dent("I know. I've been thinking about that.");
  terminal.blank();

  await terminal.dent("Either the Disruptor doesn't work and he knows it.");
  await terminal.dentLine("Or the Disruptor does work and he wants us to");
  await terminal.dentLine("use it — because it opens something he can't");
  await terminal.dentLine("open himself.");
  terminal.blank();

  await wait(400);

  await terminal.dent("Either way, he's not our ally.");
  await terminal.dentLine("He's just pointing in the same direction.");
  terminal.blank();

  await terminal.thought("The same direction everything points.");
  await terminal.thought("The Core Anomaly.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Chapter summary
  await effects.fadeToBlack(terminal);
  await wait(400);
  await effects.fadeFromBlack(terminal);

  terminal.separator();
  terminal.blank();
  await terminal.narrate("CHAPTER 9 SUMMARY");
  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.sayHtml('  <span class="c-dim">Coherence Net status ........ ACTIVE (3 sectors)</span>');
  terminal.sayHtml('  <span class="c-dim">Fold drive .................. SUPPRESSED</span>');
  terminal.blank();

  const allianceTerms = state.getFlag('kade_alliance_terms');
  const allianceDisplay = allianceTerms === 'full_partnership' ? 'FULL PARTNERSHIP'
    : allianceTerms === 'tactical' ? 'TACTICAL ALLIANCE'
    : 'MINIMAL COOPERATION';
  terminal.sayHtml(`  <span class="c-dim">Kade alliance ............... ${allianceDisplay}</span>`);

  const resourceDisplay = state.getFlag('resource_management_ch9');
  const resourceLabel = resourceDisplay === 'conserve' ? 'CONSERVATIVE (null preserved)'
    : resourceDisplay === 'balanced' ? 'BALANCED (standard risk)'
    : 'AGGRESSIVE (null depleted, momentum gained)';
  terminal.sayHtml(`  <span class="c-dim">Resource strategy ........... ${resourceLabel}</span>`);

  terminal.blank();
  terminal.sayHtml('  <span class="c-dim">Net Disruptor ............... PROTOTYPE COMPLETE (40%)</span>');
  terminal.sayHtml('  <span class="c-dim">Full build .................. REQUIRES CORE STATION COMPONENTS</span>');
  terminal.blank();
  terminal.sayHtml('  <span class="c-dim">Simulation evidence ......... GROWING</span>');
  terminal.sayHtml('  <span class="c-dim">  - Net energy matches error-handling code</span>');
  terminal.sayHtml('  <span class="c-dim">  - Disruptor specs predate their own math</span>');
  terminal.sayHtml('  <span class="c-dim">  - All three speak the same language</span>');
  terminal.blank();
  terminal.sayHtml('  <span class="c-orange">Graves is watching. The clock is running.</span>');
  terminal.blank();
  terminal.separator();
  terminal.blank();

  await wait(600);

  await terminal.dent("Everything that comes next will require the");
  await terminal.dentLine("Core Anomaly station. Which means we go forward.");
  terminal.blank();

  await terminal.dent("Which is where we were always going.");
  terminal.blank();

  await terminal.thought("Forward.");
  await terminal.thought("Into the cage, toward the thing the cage was");
  await terminal.thought("built around.");
  terminal.blank();

  await terminal.thought("I hope whoever wrote this is proud of");
  await terminal.thought("their work.");
  terminal.blank();

  state.setFlag('chapter9_complete', true);
  state.chapter = 10;
  await state.save();

  await wait(800);

  await effects.fadeToBlack(terminal);
  await wait(600);
}
