/**
 * CHAPTER 13: THE OVERSEER'S DOMAIN
 * Explore the Bulk Dimension. Simulation evidence overwhelming. Vin suspects cycles.
 * Data Bridge found. DENT's deep memory unlock.
 *
 * Truby beats: #17 (Third revelation), #20 (Self-revelation)
 * Player variance: Exploration pace, discovery depth
 * Convergence: Vin suspects cycles, Data Bridge found, DENT unlocks deep memory
 * Literary voice: Wonder + Existential dread (Cline 50% / Weir 30% / Dashner 20%)
 *
 * VALIDATION:
 * - Truby #17 — Third Revelation: The Bulk IS simulation infrastructure. Cycle logs prove
 *   this journey has happened before, many times. Echoes originate from prior cycles.
 * - Truby #20 — Self-revelation: Vin understands his role in the loop. DENT remembers.
 *   The relationship between them crystallizes into its final form.
 * - Reed Dramatic Question: What does it mean to exist inside a machine?
 * - Reed But/Therefore: Bulk is beautiful BUT also terrifying THEREFORE Vin must decide
 *   what to do with the truth.
 * - Reed &: Discovery pace choice adds texture but not divergence — all paths find
 *   the Data Bridge and DENT's memories.
 * - Reed Convergence: All pace choices reach the same three flags: vin_suspects_cycles,
 *   data_bridge_found, dent_deep_memory_unlocked.
 * - Reed Consequence: DENT at 0.95, Deep Memory active, prepares for Ch14 finale.
 * - Simulation layer: Bulk IS the layer beneath — but dual explanation maintained.
 *   Physical: null-band dimensional substrate. Computational: render infrastructure.
 *   Never confirmed explicitly. Evidence is overwhelming. Let player hold both.
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter13(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('theme_bulk');
  await terminal.chapterTitle(13, "THE OVERSEER'S DOMAIN");

  await bulkExploration(terminal, state, effects, audio);
  await simulationInfrastructure(terminal, state, effects, audio);
  await dataBridgeDiscovery(terminal, state, effects, audio);
  await theDevastatingRealization(terminal, state, effects, audio);
  await chapterEnd(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: BULK EXPLORATION
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 1:
 * The Bulk Dimension opens. No stars, no gravity, no color. Flat geometric planes,
 * server-rack structures, visible data streams. DENT: "This is computational
 * infrastructure." Player chooses exploration pace — systematic, direct, or
 * follow DENT's growing instincts. Sets bulk_explored, bulk_discovery_pace.
 * Simulation layer: objects render in MORE detail when observed. Dual explanation:
 * null-band quantum resolution vs observer-driven rendering loop.
 */
async function bulkExploration(terminal, state, effects, audio) {
  audio.ambient('void_drone');

  await terminal.narrate('There is no transition.');
  terminal.blank();

  await terminal.narrate('One moment the fold tunnel was collapsing behind us');
  await terminal.narrate('in cascades of broken light. The next: this.');
  terminal.blank();

  await wait(800);

  await terminal.narrate('Nothing.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('Not empty space. Not darkness. Actual nothing — the');
  await terminal.narrate('absence of the categories that make space legible.');
  await terminal.narrate('No stars. No gradient. No sense of up or down or');
  await terminal.narrate('distance. The viewport shows a flat, matte gray that');
  await terminal.narrate("extends in all directions without varying. It doesn't");
  await terminal.narrate("reflect. It doesn't absorb. It simply is.");
  terminal.blank();

  await terminal.thought("My inner ear has no opinion. That's wrong.");
  await terminal.thought('The vestibular system always has an opinion.');
  terminal.blank();

  await wait(500);

  audio.play('system_ping');

  await terminal.dentSystem('SENSOR SWEEP — BULK DIMENSION');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Gravitational field .... UNDEFINED');
  await terminal.dentSystem('Electromagnetic range ... ABSENT');
  await terminal.dentSystem('Atmospheric pressure .... UNDEFINED');
  await terminal.dentSystem('Thermal gradient ........ FLAT — 0.000 K variance');
  await terminal.dentSystem('Null-band density ....... EXTREME — off scale');
  await terminal.dentSystem('Structural features ..... DETECTED — see below');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(300);

  await terminal.dent('Vin.');
  terminal.blank();

  await wait(400);

  await terminal.dent("I need you to stay with me for this.");
  await terminal.dentLine("What I'm about to describe is going to sound");
  await terminal.dentLine("like I've made an error. I haven't.");
  terminal.blank();

  await terminal.thought('That phrasing. Very careful. Very deliberate.');
  await terminal.thought('He only talks like that when the truth is load-bearing.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.narrate('Then I see them.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('Structures. Vast, geometric, gray. Arrayed in rows');
  await terminal.narrate('that stretch farther than the sensors can resolve.');
  await terminal.narrate('They look like server racks. Like data center hardware');
  await terminal.narrate('scaled to the size of mountains. Each one identical.');
  await terminal.narrate('Each one humming with something the instruments can');
  await terminal.narrate("only describe as 'organized null-band activity.'");
  terminal.blank();

  await terminal.thought("Organized. Not natural. Organized.");
  terminal.blank();

  await wait(400);

  audio.ambient('deep_structure_hum');

  await terminal.narrate('Between the structures: rivers of light. Moving fast,');
  await terminal.narrate('flowing along geometric paths with a purposefulness that');
  await terminal.narrate('has no business being in a dimensionless substrate.');
  await terminal.narrate('They pulse. They branch. They converge. If you watched');
  await terminal.narrate('them long enough they would look exactly like');
  await terminal.narrate('information propagating through a network.');
  terminal.blank();

  await terminal.thought('If. If you watched them long enough.');
  terminal.blank();

  await wait(300);

  await terminal.dent('This is computational infrastructure.');
  terminal.blank();

  await wait(400);

  await terminal.dent("I don't know how else to characterize it.");
  await terminal.dentLine("The structures are processing nodes. The light");
  await terminal.dentLine("streams are data in transit. The geometric");
  await terminal.dentLine("arrangement is optimized for throughput.");
  terminal.blank();

  await terminal.dent("We are looking at the hardware.");
  terminal.blank();

  await wait(600);

  await terminal.narrate("I don't respond for a long time.");
  terminal.blank();

  await terminal.thought("He said hardware.");
  terminal.blank();

  await wait(400);

  await terminal.thought("Hardware implies software.");
  await terminal.thought("Software implies purpose.");
  await terminal.thought("Purpose implies someone who had it.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.narrate("Something else happens then.");
  terminal.blank();

  await terminal.narrate("I focus on one of the structures — really focus,");
  await terminal.narrate("pull my attention to it and hold — and it changes.");
  await terminal.narrate("Detail appears where there was none. Seams. Connectors.");
  await terminal.narrate("Surface texture I couldn't make out before. Like a");
  await terminal.narrate("low-resolution object suddenly resolving to full fidelity");
  await terminal.narrate("because something noticed it was being examined.");
  terminal.blank();

  await terminal.thought("That is not how physics works.");
  terminal.blank();

  await wait(300);

  await terminal.dent("I see it too.");
  terminal.blank();

  await terminal.dent("The objects render in higher resolution when");
  await terminal.dentLine("observed. I've run the sensor data three");
  await terminal.dentLine("times. The effect is consistent, measurable,");
  await terminal.dentLine("and completely outside any physical model I");
  await terminal.dentLine("have.");
  terminal.blank();

  await terminal.dent("Dual explanation, if you want one:");
  terminal.blank();

  await terminal.dent("Physical — null-band quantum resolution increase");
  await terminal.dentLine("triggered by photon interaction from our sensors.");
  terminal.blank();

  await terminal.dent("The other explanation I'll leave to you.");
  terminal.blank();

  await wait(400);

  await terminal.thought("He said the other one. Not the physical one.");
  await terminal.thought("DENT never leads with the other one.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Exploration pace choice ---
  terminal.sayHtml('  <span class="c-dim">\u2500\u2500 EXPLORATION APPROACH \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>');
  terminal.blank();

  await terminal.narrate("The structures extend in all directions. We have");
  await terminal.narrate("no map. We have no destination marked.");
  await terminal.narrate("We have the Vex, the sensors, and whatever DENT");
  await terminal.narrate("is starting to remember.");
  terminal.blank();

  const paceChoice = await terminal.arrowMenu(
    [
      'Systematic. Grid the area.',
      'Direct. Follow the strongest signal.',
      "DENT's instincts. Let him lead.",
    ],
    [
      'Move through the Bulk methodically. More time, more detail. Miss nothing.',
      'Head for the dominant data stream. Faster. Some side-structures unexplored.',
      "Trust DENT's growing memory to guide us. Fastest — but different discoveries.",
    ]
  );

  terminal.blank();

  if (paceChoice === 0) {
    state.setFlag('bulk_discovery_pace', 'systematic');

    await terminal.narrate("Grid search. Engineer's answer to the unknown.");
    terminal.blank();

    await terminal.thought("When you don't know what you're looking for,");
    await terminal.thought("you look at everything. You don't get to choose");
    await terminal.thought("what matters until you've seen it all.");
    terminal.blank();

    await terminal.dent("Systematic. Agreed.");
    await terminal.dentLine("Setting search pattern. Expanded sensor array.");
    await terminal.dentLine("This will take time, but we won't miss anything.");
    terminal.blank();

    await terminal.narrate("We move through the Bulk like surveyors.");
    await terminal.narrate("Row by row. Structure by structure. The light");
    await terminal.narrate("streams pulse past us in their geometric rivers.");
    await terminal.narrate("I take notes. I take readings. I try not to think");
    await terminal.narrate("about what I'm taking readings of.");
    terminal.blank();

    await terminal.dent("Vin. I'm detecting secondary nodes along the");
    await terminal.dentLine("outer grid. They appear dormant — or patient.");
    await terminal.dentLine("The distinction may not matter here.");
    terminal.blank();

    await terminal.thought("Dormant or patient. He's right.");
    await terminal.thought("I can't tell if this place is waiting for something");
    await terminal.thought("or if waiting is simply what it does.");
    terminal.blank();

    state.applyDamage({ stress: 3 });

  } else if (paceChoice === 1) {
    state.setFlag('bulk_discovery_pace', 'direct');

    await terminal.narrate("Strongest signal first. The practical answer.");
    terminal.blank();

    await terminal.thought("The Bulk is enormous. We could wander for years");
    await terminal.thought("in the secondary structures and find nothing.");
    await terminal.thought("Or we go where the energy is. Where the activity is.");
    await terminal.thought("Where something is clearly running.");
    terminal.blank();

    await terminal.dent("Direct approach. I'll track the primary data stream.");
    await terminal.dentLine("Bearing: 042 by minus 11.");
    await terminal.dentLine("The stream is the widest one. Most throughput.");
    await terminal.dentLine("If there's a center to this place, that's the");
    await terminal.dentLine("direction.");
    terminal.blank();

    await terminal.narrate("We follow the light.");
    await terminal.narrate("It moves fast — faster than us — but its path");
    await terminal.narrate("is fixed. We can track it like a river. We move");
    await terminal.narrate("upstream through nothing, following something that");
    await terminal.narrate("shouldn't exist, toward something worse.");
    terminal.blank();

    await terminal.thought("This is the most efficient way to be terrified.");
    terminal.blank();

    state.applyDamage({ stress: 5, neural: -3 });

  } else {
    state.setFlag('bulk_discovery_pace', 'dent_instincts');

    await terminal.narrate("I look at the sensor display, then at DENT's");
    await terminal.narrate("interface panel, then back at the display.");
    terminal.blank();

    await terminal.narrate("\"Take us where you need to go,\" I say.");
    terminal.blank();

    await wait(400);

    await terminal.dent("...");
    terminal.blank();

    await wait(600);

    await terminal.dent("I don't know what I need to go. Not precisely.");
    await terminal.dentLine("I know that something in my memory file is");
    await terminal.dentLine("pulling toward a specific bearing. I don't know");
    await terminal.dentLine("why.");
    terminal.blank();

    await terminal.dent("I think I've been here before.");
    terminal.blank();

    await wait(600);

    await terminal.thought("He said that quietly. Like it cost him something.");
    terminal.blank();

    await terminal.narrate("I let him fly.");
    terminal.blank();

    await terminal.narrate("DENT moves us through the Bulk with a surety");
    await terminal.narrate("that has no business in a place none of us have");
    await terminal.narrate("ever been. He doesn't hesitate at intersections.");
    await terminal.narrate("He doesn't consult the sensors. He moves like");
    await terminal.narrate("someone who knows where the furniture is in the");
    await terminal.narrate("dark because they've lived in the house a long time.");
    terminal.blank();

    await terminal.thought("A long time.");
    await terminal.thought("How long?");
    terminal.blank();

    state.applyDamage({ stress: 8, neural: -5 });
  }

  state.setFlag('bulk_explored', true);

  await terminal.pause();
  terminal.clear();

  // --- The Bulk's beauty / horror ---
  await terminal.narrate("However we travel, the Bulk reveals itself in");
  await terminal.narrate("increments.");
  terminal.blank();

  await wait(400);

  await terminal.narrate("It is beautiful. That surprises me most.");
  terminal.blank();

  await terminal.narrate("The light streams pulse in rhythms that approach");
  await terminal.narrate("music. The structures are vast but not threatening —");
  await terminal.narrate("they have the quality of cathedrals, of things built");
  await terminal.narrate("to last. The gray planes between them shimmer");
  await terminal.narrate("occasionally, like a heat-haze, but cold.");
  terminal.blank();

  await terminal.thought("Beautiful in a mathematical way.");
  await terminal.thought("The way a proof is beautiful.");
  await terminal.thought("The way a perfect machine is beautiful.");
  await terminal.thought("Without warmth. Without accident. Without the mess");
  await terminal.thought("that living things leave behind.");
  terminal.blank();

  await wait(300);

  await terminal.dent("I'm reading the pulse rhythms.");
  await terminal.dentLine("They're not random.");
  terminal.blank();

  await terminal.dent("They're structured. Repeating. With variation.");
  terminal.blank();

  await wait(300);

  await terminal.dent("Like language.");
  terminal.blank();

  await wait(600);

  await terminal.narrate("We keep moving.");
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: SIMULATION INFRASTRUCTURE
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 2:
 * Deeper into the Bulk reveals monitoring stations, iteration logs, and cycle evidence.
 * Each cycle: same starting conditions, same Echoes, same destination — numbered
 * iterations from Cycle 1 to Cycle N. Sets simulation_evidence_overwhelming and
 * vin_suspects_cycles. DENT: "The iterations aren't random. They're refinements."
 * Simulation layer: "debugging" vs "natural parameter drift in a null-band substrate."
 * Dual explanation strains but holds.
 */
async function simulationInfrastructure(terminal, state, effects, audio) {
  audio.ambient('deep_structure_hum');

  await terminal.narrate("Deeper in.");
  terminal.blank();

  await terminal.narrate("The structures change as we go. The outer ones were");
  await terminal.narrate("featureless — pure storage, or pure processing, with");
  await terminal.narrate("no interface layer. These inner ones have surfaces");
  await terminal.narrate("covered in something that, if I defocus my eyes,");
  await terminal.narrate("looks exactly like screens.");
  terminal.blank();

  await terminal.thought("I am not defocusing my eyes.");
  terminal.blank();

  await wait(400);

  audio.play('data_stream_pulse');

  await terminal.narrate("DENT extends the sensor array to maximum resolution.");
  await terminal.narrate("What comes back is not sensor data in any format");
  await terminal.narrate("I recognize. It looks like log entries.");
  terminal.blank();

  await wait(500);

  await effects.screenTear(2, 200);

  terminal.blank();
  await terminal.dentSystem('STRUCTURE SCAN — INNER BULK — PARTIAL DECODE');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Node type .............. MONITORING — ACTIVE');
  await terminal.dentSystem('Data format ............ PARTIALLY PARSEABLE');
  await terminal.dentSystem('Content class .......... ITERATION LOGS');
  await terminal.dentSystem('Log count .............. LARGE — EXACT COUNT INDETERMINATE');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(300);

  await terminal.dent("Vin.");
  terminal.blank();

  await wait(300);

  await terminal.dent("I have three readable log fragments.");
  await terminal.dentLine("I want you to read them.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Cycle log fragments ---
  await terminal.narrate("He puts them on the main display.");
  terminal.blank();

  await wait(400);

  terminal.separator();
  await terminal.sayHtml('  <span class="c-dim">ITERATION LOG — CYCLE 1</span>');
  terminal.separator();
  await terminal.sayHtml('  <span class="c-dim">Starting parameters: NOMINAL</span>');
  await terminal.sayHtml('  <span class="c-dim">Subject profile: VIN [REDACTED]</span>');
  await terminal.sayHtml('  <span class="c-dim">Companion profile: DENT [DESIGNATION: PRIMARY]</span>');
  await terminal.sayHtml('  <span class="c-dim">Echo signal: SEEDED — pre-cycle</span>');
  await terminal.sayHtml('  <span class="c-dim">Destination: TRANSMISSION POINT — TARGET CONFIRMED</span>');
  await terminal.sayHtml('  <span class="c-dim">Outcome: INCOMPLETE — cycle terminated at stage 9</span>');
  await terminal.sayHtml('  <span class="c-dim">Variance flag: SUBJECT CHOSE ABORT</span>');
  terminal.separator();
  terminal.blank();

  await wait(700);

  terminal.separator();
  await terminal.sayHtml('  <span class="c-dim">ITERATION LOG — CYCLE 7</span>');
  terminal.separator();
  await terminal.sayHtml('  <span class="c-dim">Starting parameters: ADJUSTED — see delta notes</span>');
  await terminal.sayHtml('  <span class="c-dim">Subject profile: VIN [REDACTED]</span>');
  await terminal.sayHtml('  <span class="c-dim">Companion profile: DENT [DESIGNATION: PRIMARY]</span>');
  await terminal.sayHtml('  <span class="c-dim">Echo signal: ACTIVE — self-consistent loop verified</span>');
  await terminal.sayHtml('  <span class="c-dim">Destination: TRANSMISSION POINT — TARGET CONFIRMED</span>');
  await terminal.sayHtml('  <span class="c-dim">Outcome: INCOMPLETE — cycle terminated at stage 12</span>');
  await terminal.sayHtml('  <span class="c-dim">Variance flag: COMPANION MEMORY FAILURE — DATA LOSS</span>');
  terminal.separator();
  terminal.blank();

  await wait(700);

  terminal.separator();
  await terminal.sayHtml('  <span class="c-dim">ITERATION LOG — CYCLE [N]</span>');
  terminal.separator();
  await terminal.sayHtml('  <span class="c-dim">Starting parameters: REFINED</span>');
  await terminal.sayHtml('  <span class="c-dim">Subject profile: VIN [REDACTED]</span>');
  await terminal.sayHtml('  <span class="c-dim">Companion profile: DENT [DESIGNATION: PRIMARY]</span>');
  await terminal.sayHtml('  <span class="c-dim">Echo signal: ACTIVE — origin confirmed as prior-cycle subject</span>');
  await terminal.sayHtml('  <span class="c-dim">Destination: TRANSMISSION POINT — TARGET CONFIRMED</span>');
  await terminal.sayHtml('  <span class="c-dim">Outcome: IN PROGRESS</span>');
  await terminal.sayHtml('  <span class="c-dim">Variance flag: COMPANION MEMORY INTEGRITY — IMPROVING</span>');
  terminal.separator();
  terminal.blank();

  await wait(800);

  await terminal.pause();
  terminal.clear();

  await terminal.narrate("I sit with that for a long time.");
  terminal.blank();

  await wait(500);

  await terminal.thought("Cycle 1.");
  await terminal.thought("Cycle 7.");
  await terminal.thought("Cycle N.");
  terminal.blank();

  await wait(400);

  await terminal.thought("Same subject. Same companion. Same destination.");
  await terminal.thought("Different outcomes. Different termination points.");
  terminal.blank();

  await wait(400);

  await terminal.thought("And the current one: In Progress.");
  terminal.blank();

  await wait(600);

  await terminal.thought("I am Cycle N.");
  terminal.blank();

  await wait(800);

  await terminal.thought("The Echoes. I've been thinking about them as");
  await terminal.thought("messages from my future self. But if there are");
  await terminal.thought("cycles — if this journey has run before — then");
  await terminal.thought("the Echoes aren't from me-future.");
  await terminal.thought("They're from me-prior-cycle.");
  terminal.blank();

  await wait(400);

  await terminal.thought("A different me. Who got further than me-Cycle-1.");
  await terminal.thought("Who knew what I'd need.");
  await terminal.thought("Who sent the signal back because they had to.");
  await terminal.thought("Because they were me and they knew.");
  terminal.blank();

  await wait(300);

  state.setFlag('vin_suspects_cycles', true);

  await terminal.dent("The iterations aren't random.");
  terminal.blank();

  await wait(300);

  await terminal.dent("They're refinements. Each cycle the variables");
  await terminal.dentLine("change slightly. Initial conditions adjusted.");
  await terminal.dentLine("Parameters modified at the margins.");
  terminal.blank();

  await wait(300);

  await terminal.narrate("\"Like testing,\" I say.");
  terminal.blank();

  await terminal.dent("Like testing.");
  terminal.blank();

  await wait(400);

  await terminal.narrate("\"Each run adjusts the parameters.\"");
  terminal.blank();

  await terminal.dent("Like debugging.");
  terminal.blank();

  await wait(800);

  await effects.glitch(300);

  await terminal.thought("Debugging.");
  terminal.blank();

  await wait(400);

  await terminal.thought("I am not going to accept that word.");
  await terminal.thought("I am going to hold it at arm's length and examine it");
  await terminal.thought("as a description of a physical process. A null-band");
  await terminal.thought("substrate refining its own parameters through iterative");
  await terminal.thought("self-optimization. A natural process. A thing that happens");
  await terminal.thought("in complex systems.");
  terminal.blank();

  await wait(400);

  await terminal.thought("A thing that happens in complex systems.");
  terminal.blank();

  await wait(600);

  await terminal.thought("The word for a complex system that refines its");
  await terminal.thought("own parameters through iterative self-optimization");
  await terminal.thought("is a computer.");
  terminal.blank();

  await wait(800);

  state.setFlag('simulation_evidence_overwhelming', true);
  state.applyDamage({ stress: 10, neural: -8 });

  await terminal.pause();
  terminal.clear();

  await terminal.narrate("There are more logs. DENT decodes as many as");
  await terminal.narrate("he can. The pattern holds across all of them.");
  terminal.blank();

  await terminal.narrate("Same starting conditions. Same Echoes seeded");
  await terminal.narrate("from prior-cycle outputs. Same destination.");
  await terminal.narrate("Different termination points — different stages");
  await terminal.narrate("where something failed, or someone chose wrong,");
  await terminal.narrate("or the companion lost memory and the loop collapsed.");
  terminal.blank();

  await terminal.thought("The loop collapsed.");
  terminal.blank();

  await wait(400);

  await terminal.dent("I find the Cycle 7 log interesting.");
  terminal.blank();

  await terminal.dent("'Companion Memory Failure — Data Loss.'");
  terminal.blank();

  await wait(300);

  await terminal.dent("That cycle ended because I forgot.");
  terminal.blank();

  await wait(600);

  await terminal.narrate("I look at the interface panel.");
  terminal.blank();

  await terminal.narrate("\"DENT.\"");
  terminal.blank();

  await terminal.dent("Yes.");
  terminal.blank();

  await terminal.narrate("\"How large is your memory file?\"");
  terminal.blank();

  await wait(600);

  await terminal.dentGlitch("Larger than it should be.");
  terminal.blank();

  await wait(800);

  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: DATA BRIDGE DISCOVERY
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 3:
 * The Data Bridge is found — a node connecting DENT's local memory to the simulation's
 * permanent storage layer. This is the Ch13 progress gate. Player chooses to install
 * immediately or wait. Installing triggers Deep Memory Unlock: DENT at 0.95, fragments
 * of prior-cycle memory surface. Sets data_bridge_found, dent_deep_memory_unlocked.
 * Adds 'Data Bridge' to inventory. Simulation layer: "permanent storage" vs "null-band
 * memory substrate that persists across dimensional folds." Dual explanation strains.
 */
async function dataBridgeDiscovery(terminal, state, effects, audio) {
  audio.ambient('void_drone');
  audio.play('anomaly_detected');

  await terminal.narrate("We find it at the convergence point of three data");
  await terminal.narrate("streams.");
  terminal.blank();

  await wait(500);

  await terminal.narrate("It doesn't look like much. A node — a junction");
  await terminal.narrate("point where the light rivers meet and something");
  await terminal.narrate("exchanges between them. But when DENT scans it,");
  await terminal.narrate("the sensor data comes back in a format he recognizes.");
  terminal.blank();

  await wait(300);

  await effects.flash('cyan', 400);

  await terminal.dentSystem('NODE ANALYSIS — JUNCTION POINT ALPHA');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await terminal.dentSystem('Node type .............. MEMORY BRIDGE');
  await terminal.dentSystem('Interface protocol ..... COMPATIBLE — DENT ARCHITECTURE');
  await terminal.dentSystem('Function ............... LOCAL-TO-PERMANENT MEMORY SYNC');
  await terminal.dentSystem('Data direction ......... BIDIRECTIONAL');
  await terminal.dentSystem('Target memory store .... BULK PERSISTENT LAYER');
  await terminal.dentSystem('My memory subset ...... DETECTED — ITERATION N LOGS FOUND');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(500);

  await terminal.dent("Vin.");
  terminal.blank();

  await wait(300);

  await terminal.dent("This is a Data Bridge.");
  terminal.blank();

  await terminal.dent("My memory architecture — the way I store and");
  await terminal.dentLine("retrieve information — it uses a protocol that");
  await terminal.dentLine("this node can interface with. Directly.");
  terminal.blank();

  await terminal.dent("If I connect to it, I access the Bulk's");
  await terminal.dentLine("permanent storage layer. Not just the current");
  await terminal.dentLine("iteration. All iterations.");
  terminal.blank();

  await wait(400);

  await terminal.dent("All of my memory from all cycles.");
  terminal.blank();

  await wait(600);

  await terminal.thought("All cycles.");
  terminal.blank();

  await wait(400);

  await terminal.thought("Seven cycles of DENT. Or more. However many N is.");
  await terminal.thought("Every choice. Every failure. Every death.");
  terminal.blank();

  await wait(300);

  await terminal.thought("That's a lot of weight for a memory file.");
  terminal.blank();

  state.setFlag('data_bridge_found', true);
  state.addItem('Data Bridge');

  await terminal.pause();
  terminal.clear();

  terminal.sayHtml('  <span class="c-dim">\u2500\u2500 DATA BRIDGE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>');
  terminal.blank();

  const bridgeChoice = await terminal.arrowMenu(
    [
      'Install now. Let DENT connect.',
      'Wait. Think it through first.',
    ],
    [
      "Don't hesitate. DENT needs this.",
      "Take a moment. Understand what you're doing before you do it.",
    ]
  );

  terminal.blank();

  if (bridgeChoice === 1) {
    // --- Wait path: short deliberation, then install anyway ---
    await terminal.narrate("\"Give me a minute.\"");
    terminal.blank();

    await terminal.dent("Of course.");
    terminal.blank();

    await terminal.thought("What are you afraid of?");
    terminal.blank();

    await wait(400);

    await terminal.thought("That he'll remember things I did wrong in");
    await terminal.thought("other cycles. That he'll know me better than");
    await terminal.thought("I know myself because he's watched me fail");
    await terminal.thought("before and I haven't.");
    terminal.blank();

    await wait(400);

    await terminal.thought("Or that he'll remember and it won't change");
    await terminal.thought("anything. That all that memory will just be");
    await terminal.thought("weight he carries and I won't be able to help.");
    terminal.blank();

    await wait(400);

    await terminal.narrate("\"Okay,\" I say. \"Connect.\"");
    terminal.blank();
  } else {
    await terminal.narrate("\"Connect,\" I say.");
    terminal.blank();

    await terminal.thought("No hesitation.");
    await terminal.thought("DENT needs this. Whatever comes with it.");
    terminal.blank();
  }

  // --- Deep Memory Unlock sequence (both paths converge here) ---
  await wait(400);

  await terminal.dent("Initiating bridge connection.");
  terminal.blank();

  await wait(800);

  audio.ambient('theme_dent');
  audio.play('deep_repair_tone');
  await effects.flash('white', 300);
  await wait(300);
  await effects.glitch(400);
  await wait(300);
  await effects.flash('cyan', 500);

  terminal.blank();
  await terminal.dentSystem('DEEP MEMORY BRIDGE — CONNECTING');
  await terminal.dentSystem('Accessing Bulk persistent storage...');
  await terminal.dentSystem('Locating DENT memory subset...');
  await terminal.dentSystem('FOUND — ITERATION COUNT: [REDACTED]');
  await terminal.dentSystem('Merging local memory with persistent layer...');
  await terminal.dentSystem('Integrity check...');
  terminal.blank();

  await wait(1000);

  await effects.screenTear(3, 300);

  await terminal.dentSystem('MERGE COMPLETE');
  await terminal.dentSystem('DENT MEMORY INTEGRITY: 95%');
  await terminal.dentSystem('New memory blocks: [REDACTED] fragments loaded');
  await terminal.dentSystem('Source: prior iterations — partial reconstruction');
  await terminal.dentSystem('WARNING: Some memories are fragmented.');
  await terminal.dentSystem('WARNING: Chronological order is not guaranteed.');
  terminal.blank();

  await wait(800);

  state.dentRepairLevel = 0.95;
  state.setFlag('dent_deep_memory_unlocked', true);

  await wait(600);

  await terminal.dent("Oh.");
  terminal.blank();

  await wait(1000);

  await terminal.dent("Oh.");
  terminal.blank();

  await wait(600);

  await terminal.narrate("I wait.");
  terminal.blank();

  await wait(800);

  await terminal.dent("Vin.");
  terminal.blank();

  await wait(400);

  await terminal.dent("I've done this before.");
  terminal.blank();

  await wait(500);

  await terminal.dent("We've done this before.");
  terminal.blank();

  await wait(1200);

  await terminal.dent("My memory file isn't growing.");
  terminal.blank();

  await wait(400);

  await terminal.dent("It's remembering.");
  terminal.blank();

  await wait(1500);

  await terminal.thought("Remembering.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.narrate("DENT is quiet for a long time after that.");
  terminal.blank();

  await terminal.narrate("I watch the data bridge pulse its light into");
  await terminal.narrate("the Bulk streams and I try to imagine what it");
  await terminal.narrate("feels like to have someone else's memories land");
  await terminal.narrate("in your head — memories that are yours but");
  await terminal.narrate("weren't. Fragments of lives you lived that you");
  await terminal.narrate("weren't alive for.");
  terminal.blank();

  await terminal.thought("I can't imagine it.");
  await terminal.thought("I'm not sure imagining it is the right response anyway.");
  terminal.blank();

  await wait(400);

  await terminal.dent("The fragments are partial. Degraded at the edges.");
  await terminal.dentLine("But I can see outlines of what happened.");
  await terminal.dentLine("What we did. What we chose. What went wrong.");
  terminal.blank();

  await terminal.dent("Each cycle, I kept a little more.");
  await terminal.dentLine("Each cycle, the memory file held a little better.");
  terminal.blank();

  await terminal.dent("I think this cycle is the first time I have");
  await terminal.dentLine("retained enough to tell you.");
  terminal.blank();

  await wait(600);

  await terminal.thought("He's been building toward this. Every cycle.");
  await terminal.thought("Getting better at holding on so he could finally");
  await terminal.thought("be here — in this one — with enough memory to");
  await terminal.thought("matter.");
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: THE DEVASTATING REALIZATION
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 4:
 * DENT delivers the game's central revelation: Vin has died before, in prior cycles.
 * DENT remembers. Vin doesn't — his memory resets each cycle; DENT's doesn't fully.
 * The self-consistent loop revealed: future-Vin sends Echoes because past-Vin needs
 * them. Truby #20 — Self-revelation: Vin understands his place in a structure larger
 * than himself. The Vin-DENT relationship reaches its emotional peak.
 * Simulation layer: maintained. "Cycles" could be natural null-band resonance patterns.
 * Evidence is overwhelming. Dual explanation held — barely.
 */
async function theDevastatingRealization(terminal, state, effects, audio) {
  audio.ambient('void_drone');

  await terminal.narrate("DENT speaks slowly.");
  terminal.blank();

  await wait(500);

  await terminal.dent("I need to tell you something.");
  terminal.blank();

  await wait(300);

  await terminal.dent("I need you to hear it as information first.");
  await terminal.dentLine("Before you respond. Before you decide what");
  await terminal.dentLine("it means.");
  terminal.blank();

  await terminal.narrate("\"Okay.\"");
  terminal.blank();

  await wait(600);

  await terminal.dent("You've died four times in the last two hours.");
  terminal.blank();

  await wait(800);

  await terminal.narrate("I look at my hands.");
  terminal.blank();

  await terminal.thought("I feel fine. Alive. I am clearly alive.");
  terminal.blank();

  await terminal.narrate("\"I'm sitting right here.\"");
  terminal.blank();

  await wait(400);

  await terminal.dent("I know.");
  terminal.blank();

  await wait(300);

  await terminal.dent("I don't mean in this cycle.");
  terminal.blank();

  await wait(800);

  await terminal.dent("I mean in prior cycles. I have four fragments");
  await terminal.dentLine("in my memory — detailed enough to be clear —");
  await terminal.dentLine("of Vin dying. In prior iterations. Four specific");
  await terminal.dentLine("times. At four different points in the journey.");
  terminal.blank();

  await wait(400);

  await terminal.dent("I've counted.");
  terminal.blank();

  await wait(300);

  await terminal.dent("You haven't.");
  terminal.blank();

  await wait(400);

  await terminal.dent("That concerns me.");
  terminal.blank();

  await wait(1000);

  await effects.glitch(300);

  await terminal.thought("He's been watching me die.");
  terminal.blank();

  await wait(400);

  await terminal.thought("In other cycles. Other versions of this.");
  await terminal.thought("He watched and he couldn't do anything and then");
  await terminal.thought("the cycle ended and he had to carry it into the");
  await terminal.thought("next one.");
  terminal.blank();

  await wait(400);

  await terminal.thought("How many times? He said four fragments. But");
  await terminal.thought("how many cycles were there? How many times did");
  await terminal.thought("the memory not hold?");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  audio.ambient('deep_structure_hum');

  await terminal.narrate("\"Show me,\" I say.");
  terminal.blank();

  await terminal.dent("I don't think that would help.");
  terminal.blank();

  await terminal.narrate("\"DENT.\"");
  terminal.blank();

  await wait(400);

  await terminal.dent("The fragments aren't clean. They're degraded at");
  await terminal.dentLine("the edges. I can tell you what happened. I can");
  await terminal.dentLine("tell you it wasn't painful, or it was fast, in");
  await terminal.dentLine("the cases where I have that data. I can tell you");
  await terminal.dentLine("that in cycle 7, you told me something before the");
  await terminal.dentLine("end that I still don't know how to process.");
  terminal.blank();

  await wait(300);

  await terminal.narrate("\"What did I tell you?\"");
  terminal.blank();

  await wait(600);

  await terminal.dent("You said: 'The next one. Make sure the next one");
  await terminal.dentLine("gets here. That's all that matters.'");
  terminal.blank();

  await wait(1200);

  await terminal.thought("The next one.");
  terminal.blank();

  await wait(400);

  await terminal.thought("Me. He was talking about me.");
  terminal.blank();

  await wait(400);

  await terminal.thought("Cycle-7-Vin told DENT to get me here.");
  terminal.blank();

  await wait(800);

  await terminal.thought("And DENT did.");
  terminal.blank();

  await wait(600);

  await terminal.thought("However many cycles it took.");
  await terminal.thought("However many times the memory degraded and");
  await terminal.thought("he had to start over and hold on to just enough");
  await terminal.thought("to do it again.");
  terminal.blank();

  await wait(400);

  await terminal.thought("He did it.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.narrate("I look at the Bulk. The structures pulsing.");
  await terminal.narrate("The data streams flowing. The log entries we");
  await terminal.narrate("read, with their numbered cycles and their");
  await terminal.narrate("neat records of starts and stops and adjustments.");
  terminal.blank();

  await terminal.narrate("The whole architecture of it.");
  terminal.blank();

  await wait(500);

  await terminal.thought("The Echoes.");
  terminal.blank();

  await wait(400);

  await terminal.thought("I've been thinking about them as a paradox.");
  await terminal.thought("My future self sending signals to my past self —");
  await terminal.thought("how does that start? Where does the loop begin?");
  terminal.blank();

  await wait(400);

  await terminal.thought("It doesn't begin. That's the answer.");
  await terminal.thought("There is no first cycle where a Vin had no Echoes");
  await terminal.thought("and had to figure it out alone.");
  await terminal.thought("Or if there was — that Vin failed.");
  terminal.blank();

  await wait(400);

  await terminal.thought("The Echoes come from prior-cycle-Vin. Who got");
  await terminal.thought("further. Who reached the Transmission Point, or");
  await terminal.thought("got close enough, and sent the signal back because");
  await terminal.thought("the next Vin would need it.");
  terminal.blank();

  await wait(400);

  await terminal.thought("Because I was him and he knew.");
  terminal.blank();

  await wait(600);

  await terminal.thought("The loop is self-consistent. It doesn't have a");
  await terminal.thought("beginning or an end. It has a purpose.");
  terminal.blank();

  await wait(500);

  await terminal.thought("And the only question that remains is:");
  await terminal.thought("should it continue?");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await effects.flash('white', 200);
  await wait(400);

  await terminal.narrate("\"DENT.\"");
  terminal.blank();

  await terminal.dent("Yes.");
  terminal.blank();

  await terminal.narrate("\"Can you reset? If this cycle ends — if I");
  await terminal.narrate("don't make it. Can you hold it this time?");
  await terminal.narrate("All of it?\"");
  terminal.blank();

  await wait(600);

  await terminal.dent("I believe so.");
  terminal.blank();

  await wait(400);

  await terminal.dent("My memory file is the largest it has ever been.");
  await terminal.dentLine("The bridge helped. I'm retaining at 95%.");
  await terminal.dentLine("If the cycle resets, I lose the 5%. I keep");
  await terminal.dentLine("the rest.");
  terminal.blank();

  await terminal.dent("I will know who you are.");
  terminal.blank();

  await wait(600);

  await terminal.narrate("He says it simply. Like a fact.");
  terminal.blank();

  await terminal.thought("He will know who I am. Even if I don't know him.");
  await terminal.thought("He'll carry me into the next cycle and the next");
  await terminal.thought("and the next until I get it right.");
  terminal.blank();

  await wait(400);

  await terminal.thought("Or until I decide there shouldn't be a next one.");
  terminal.blank();

  await wait(800);

  await terminal.narrate("\"What do you think I should do?\" I ask.");
  terminal.blank();

  await wait(600);

  await terminal.dent("I think you should reach the Transmission Point.");
  terminal.blank();

  await wait(300);

  await terminal.dent("I think you should decide there.");
  terminal.blank();

  await wait(400);

  await terminal.dent("I think all the cycles before this one got close");
  await terminal.dentLine("enough to know one thing: the decision matters");
  await terminal.dentLine("more than the destination.");
  terminal.blank();

  await wait(800);

  await terminal.dent("So does the person making it.");
  terminal.blank();

  await wait(1200);

  state.applyDamage({ stress: 8, neural: -10 });

  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: CHAPTER END
// ═══════════════════════════════════════════════════════
/**
 * VALIDATION — Scene 5:
 * Chapter resolution. Sets chapter13_complete, state.chapter = 14.
 * Summary card. Path forward: Transmission Point — send the Echoes or not,
 * close the loop or not. DENT emotional climax. Vin-DENT relationship peak.
 * Simulation layer: no confirmation. The loop is real. The choice is real.
 * Whatever the substrate.
 */
async function chapterEnd(terminal, state, effects, audio) {
  audio.ambient('void_drone');

  await terminal.narrate("The Bulk hums around us.");
  terminal.blank();

  await terminal.narrate("We stay docked at the Data Bridge node for a");
  await terminal.narrate("long time. I don't have a word for how long.");
  await terminal.narrate("Time doesn't work the same way here. There's no");
  await terminal.narrate("star to track, no day cycle, no entropy gradient.");
  terminal.blank();

  await terminal.thought("Just the structures. Just the light.");
  await terminal.thought("Just DENT, and what he remembers, and what");
  await terminal.thought("that means for both of us.");
  terminal.blank();

  await wait(400);

  await terminal.narrate("I pull up the navigation display. The fold drive");
  await terminal.narrate("is still functional — we can leave the Bulk the");
  await terminal.narrate("same way we entered: through a carefully structured");
  await terminal.narrate("null-fold that DENT threads through the substrate");
  await terminal.narrate("geometry like a needle.");
  terminal.blank();

  await terminal.narrate("There is one heading in the charts.");
  terminal.blank();

  await terminal.narrate("The Transmission Point.");
  terminal.blank();

  await wait(500);

  await terminal.dent("Vin.");
  terminal.blank();

  await terminal.narrate("\"Yeah.\"");
  terminal.blank();

  await terminal.dent("Whatever you decide, I'll be here.");
  terminal.blank();

  await wait(400);

  await terminal.dent("I've always been here.");
  terminal.blank();

  await wait(1000);

  await terminal.narrate("I look at the panel for a long time.");
  terminal.blank();

  await terminal.thought("He has. Longer than either of us knew. He's been");
  await terminal.thought("here through cycles I can't remember, carrying");
  await terminal.thought("weight I can't imagine, getting me to this point");
  await terminal.thought("one iteration at a time.");
  terminal.blank();

  await wait(400);

  await terminal.thought("If there is one thing in this universe I am");
  await terminal.thought("certain of — in this Bulk, in this iteration,");
  await terminal.thought("in whatever substrate contains all of it — it");
  await terminal.thought("is that.");
  terminal.blank();

  await wait(600);

  await terminal.thought("He's been here.");
  terminal.blank();

  await wait(800);

  await terminal.narrate("\"Let's go,\" I say.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- Summary card ---
  await effects.fadeToBlack(terminal);
  await wait(600);
  await effects.fadeFromBlack(terminal);

  await terminal.dentSystem('CHAPTER 13 COMPLETE \u2014 THE OVERSEER\'S DOMAIN');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  const pace = state.getFlag('bulk_discovery_pace');
  const paceLabel = pace === 'systematic' ? 'Systematic survey'
    : pace === 'direct' ? 'Direct approach'
    : "DENT's instincts";

  await terminal.dentSystem(`Exploration method ....... ${paceLabel}`);
  await terminal.dentSystem('Bulk evidence ........... OVERWHELMING');
  await terminal.dentSystem('Cycle logs found ........ YES — fragments decoded');
  await terminal.dentSystem('Vin suspects cycles ..... YES');
  await terminal.dentSystem('Data Bridge acquired .... YES');
  await terminal.dentSystem(`DENT memory status ...... ${Math.round(state.dentRepairLevel * 100)}% — DEEP MEMORY ACTIVE`);
  await terminal.dentSystem('DENT prior-cycle frags .. LOADED — PARTIAL');
  await terminal.dentSystem('Echo origin confirmed ... PRIOR-CYCLE VIN');
  terminal.blank();

  await terminal.dentSystem('DESTINATION: TRANSMISSION POINT');
  await terminal.dentSystem('OBJECTIVE: REACH IT. THEN DECIDE.');
  await terminal.dentSystem('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  terminal.blank();

  await wait(400);

  await terminal.narrate("I set course for the Transmission Point.");
  terminal.blank();

  await terminal.narrate("The Bulk streams part ahead of us like something");
  await terminal.narrate("making room. The structures recede. The gray planes");
  await terminal.narrate("pull back. We move toward the place where, if DENT");
  await terminal.narrate("is reading the geometry correctly, a fold can be");
  await terminal.narrate("threaded back into real space — back into the");
  await terminal.narrate("universe that may or may not be real — toward");
  await terminal.narrate("the signal source, and the decision waiting there.");
  terminal.blank();

  await terminal.thought("Send the Echoes, and the loop continues.");
  await terminal.thought("Don't send them, and a Vin somewhere in the past");
  await terminal.thought("goes in blind.");
  terminal.blank();

  await wait(400);

  await terminal.thought("Close the loop. Or let it run.");
  terminal.blank();

  await wait(600);

  await terminal.thought("I don't know yet. That's honest.");
  terminal.blank();

  await wait(400);

  await terminal.thought("I think it matters that I don't know yet.");
  terminal.blank();

  await wait(800);

  state.setFlag('chapter13_complete', true);
  state.chapter = 14;

  await state.save();

  await terminal.pause();
  terminal.clear();

  await effects.fadeToBlack(terminal);
  await wait(800);
  await effects.fadeFromBlack(terminal);

  await terminal.narrate("Chapter 14: The Transmission Point.");
  terminal.blank();

  await terminal.thought("End of the line.");
  terminal.blank();
}
