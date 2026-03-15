/**
 * CHAPTER 2: SIGNAL FROM THE END
 * Decode the Echo. Unlock the fold drive. Make the first fold.
 * Experience the first Blip. The SICs register your signature.
 *
 * Ported from scenes/chapter2.py — complete, faithful conversion.
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

export async function runChapter2(terminal, state, effects, audio) {
  // Fold drive is locked — needs Fuel Regulator Bypass
  state.foldStatus = 'LOCK';
  state.foldStability = 0;

  terminal.clear();
  audio.ambient('theme_signal');
  await terminal.chapterTitle(2, 'SIGNAL FROM THE END');

  await echoAnalysis(terminal, state, effects, audio);
  await nullAcquisition(terminal, state, effects, audio);
  await bypassDiscovery(terminal, state, effects, audio);
  await foldPreparation(terminal, state, effects, audio);
  await firstFold(terminal, state, effects, audio);
  await postBlipDebrief(terminal, state, effects, audio);
  await chapterHook(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: ECHO ANALYSIS
// ═══════════════════════════════════════════════════════

async function echoAnalysis(terminal, state, effects, audio) {
  /**
   * Investigate the unknown Echo signal.
   *
   * VALIDATION:
   * - Advance: Player learns Echo is from unknown source, gets coordinates
   * - Agency: Choose investigation approach (immediate / analyze / DENT)
   * - Consequence: Info depth varies, shapes dialogue in Ch3-4
   * - Tone: Technical mystery + DENT humor
   *
   * Truby beats: #5 (Desire crystallizes), #9 (First revelation)
   * Reed tests: Understanding 5/5, Consequence 5/5, Strategy 5/5
   */
  audio.play('echo_signal');

  await terminal.narrate('The sensor array pulses \u2014 a blue sweep across the display, once every four seconds.');
  terminal.blank();
  await terminal.narrate("I'm staring at the display, fully awake now. The");
  await terminal.narrate('signal waveform scrolls across the screen \u2014 a');
  await terminal.narrate('jagged, rhythmic pattern that looks almost like');
  await terminal.narrate('a heartbeat. Not mine. Not human at all.');
  terminal.blank();

  await terminal.thought("An Echo that isn't from me. Someone else sent a");
  await terminal.thought('signal backward through folded spacetime. Someone');
  await terminal.thought('else knows how.');
  terminal.blank();

  await terminal.thought("That shouldn't be possible. I invented this. I'm");
  await terminal.thought("the only person who's ever successfully transmitted");
  await terminal.thought('through a Closed Timelike Curve.');
  terminal.blank();

  await terminal.thought('Apparently not.');
  terminal.blank();

  await wait(500);

  // DENT's assessment
  await terminal.dent('The signal is holding steady. Carrier frequency');
  await terminal.dentLine('matches your Echo signature \u2014 same underlying');
  await terminal.dentLine('physics. Casimir-modulated, fold-encoded.');
  terminal.blank();

  await terminal.dent('But the encoding scheme is completely different.');
  await terminal.dentLine('Your Echoes use structured frequency hopping.');
  await terminal.dentLine('This one uses... something else. Something');
  await terminal.dentLine("I don't recognize.");
  terminal.blank();

  if (state.dentRepairLevel >= 0.7) {
    await terminal.dent("It's like finding someone else's handwriting");
    await terminal.dentLine('in your diary. Same pen. Different hand.');
    terminal.blank();
  } else {
    await terminal.dent('Same physics. Different sender.');
    await terminal.dentLine("That's all I can tell you at this level");
    await terminal.dentLine('of processing.');
    terminal.blank();
  }

  await terminal.narrate('The signal pulses. Steady. Patient. Like it\'s');
  await terminal.narrate('been waiting for someone to listen.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // --- The Choice: How to investigate ---
  await terminal.narrate('The display shows the raw waveform. Encoded.');
  await terminal.narrate('Waiting to be cracked open.');
  terminal.blank();

  await terminal.dent('We have options for how to approach this.');
  await terminal.dentLine('And I have opinions about all of them.');
  terminal.blank();

  const choice = await terminal.showChoices([
    ['Decode it now.', 'Pull the signal apart and see what\'s inside.'],
    ['Analyze the signal structure first.', 'Slower, safer. Map the encoding before we touch it.'],
    ['"What do you think, DENT?"', ''],
  ]);

  if (choice === 1) {
    state.setFlag('echo_investigation_method', 'immediate');
    await echoImmediateDecode(terminal, state, effects, audio);
  } else if (choice === 2) {
    state.setFlag('echo_investigation_method', 'analyze');
    await echoCarefulAnalysis(terminal, state, effects, audio);
  } else if (choice === 3) {
    state.setFlag('echo_investigation_method', 'dent');
    await echoDentApproach(terminal, state, effects, audio);
  }

  audio.play('stinger_revelation');
  state.setFlag('echo_decoded', true);
  await state.save();
}


async function echoImmediateDecode(terminal, state, effects, audio) {
  /** Decode the Echo immediately — faster, riskier, less background info. */
  await terminal.dent('Straight to decoding. Bold.');
  terminal.blank();
  await wait(300);

  if (state.dentRepairLevel >= 0.7) {
    await terminal.dent('For the record, decoding unknown signals without');
    await terminal.dentLine("analysis is how people get malware. And by");
    await terminal.dentLine("'people,' I mean ships. And by 'malware,' I");
    await terminal.dentLine('mean catastrophic system failure.');
  } else {
    await terminal.dent("That's... one approach. Risky, but one approach.");
  }
  terminal.blank();

  await terminal.dent("I'll route the signal through the nav computer's");
  await terminal.dentLine("decryption array. If it's hostile, we'll know");
  await terminal.dentLine("fast. If it's data, we'll have it faster.");
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  audio.play('echo_analyze');

  await terminal.narrate('I pull the raw signal into the decryption buffer.');
  await terminal.narrate('The nav computer churns \u2014 I can hear the processor');
  await terminal.narrate('working, an unfamiliar whine at the edge of');
  await terminal.narrate('hearing.');
  terminal.blank();

  // Decoding animation
  await terminal.dentSystem('DECRYPTING ECHO SIGNAL ............ [\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591] 40%');
  await wait(500);
  await terminal.dentSystem('DECRYPTING ECHO SIGNAL ............ [\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591] 60%');
  await wait(500);
  await terminal.dentSystem('DECRYPTING ECHO SIGNAL ............ [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591] 80%');
  await wait(300);

  // Brief sensor spike
  await terminal.warning('SENSOR SPIKE \u2014 ELECTROMAGNETIC ANOMALY');
  terminal.blank();

  await terminal.narrate('The display flickers. For a half-second, the');
  await terminal.narrate('waveform on screen looks like something else \u2014');
  await terminal.narrate('letters, maybe, or coordinates. Then it stabilizes.');
  terminal.blank();

  await terminal.dentSystem('DECRYPTING ECHO SIGNAL ............ [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 100%');
  await terminal.dentSystem('DECRYPTION: COMPLETE');
  terminal.blank();

  await wait(500);

  await terminal.dent('Got it. The signal contains two things.');
  terminal.blank();

  await echoDecodedDisplay(terminal, state, effects);

  state.applyDamage({ stress: 5, neural: -3 });
  terminal.say('  [Stress +5, Neural -3 \u2014 raw decode caused a sensor spike]', 'dim-text');
  terminal.blank();

  await echoFlashback(terminal, state, effects, audio);
  await echoRevelation(terminal, state, effects, audio);
}


async function echoCarefulAnalysis(terminal, state, effects, audio) {
  /** Analyze the signal structure before decoding — slower, more info. */
  await terminal.dent('Smart. Map the terrain before you walk on it.');
  terminal.blank();

  if (state.dentRepairLevel >= 0.7) {
    await terminal.dent("I'll run a full spectral analysis while you");
    await terminal.dentLine('examine the waveform characteristics. Between');
    await terminal.dentLine('the two of us, we should be able to figure');
    await terminal.dentLine("out what we're dealing with before we open it.");
  } else {
    await terminal.dent("I'll run spectral analysis. You examine the");
    await terminal.dentLine('waveform. We take it slow.');
  }
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  audio.play('echo_analyze');

  await terminal.narrate('I pull the signal waveform onto the main display');
  await terminal.narrate('and zoom in. The pattern is complex \u2014 nested');
  await terminal.narrate('frequencies layered like geological strata.');
  terminal.blank();

  // Tier 2 science — Vin's analysis
  await terminal.thought('The carrier wave is Casimir-modulated, same as');
  await terminal.thought('mine. That means whoever sent this has access to');
  await terminal.thought('negative energy generation \u2014 Casimir plates or');
  await terminal.thought('equivalent. The modulation frequency is 4.7 GHz,');
  await terminal.thought('which requires extremely precise plate separation.');
  terminal.blank();

  await terminal.thought("But the encoding... it's not frequency hopping.");
  await terminal.thought("It's phase-shifted. Each data packet is embedded");
  await terminal.thought('in the phase angle of the carrier, not the');
  await terminal.thought('frequency. Elegant. More efficient than my method.');
  terminal.blank();

  await terminal.thought('Whoever built this is better at this than I am.');
  await terminal.thought("That's either encouraging or terrifying.");
  terminal.blank();

  // DENT spectral analysis
  await terminal.dentSystem('SPECTRAL ANALYSIS \u2014 UNKNOWN ECHO SIGNAL');
  await terminal.dentSystem('Carrier: 4.7 GHz (Casimir-modulated)');
  await terminal.dentSystem('Encoding: Phase-shift keyed (non-standard)');
  await terminal.dentSystem('Origin: Bearing 047.3 \u2014 Core Anomaly direction');
  await terminal.dentSystem('Age estimate: 3-7 days (temporal uncertainty)');
  await terminal.dentSystem('Threat assessment: NONE DETECTED');
  terminal.blank();

  await terminal.dent('No hostile signatures. No embedded executables.');
  await terminal.dentLine("It's clean. Just data.");
  terminal.blank();

  state.setFlag('echo_unknown_analyzed', true);

  // Optional Tier 3
  const choice = await terminal.showChoices([
    'Proceed to decoding',
    'Examine the waveform more closely',
  ]);

  if (choice === 2) {
    // Tier 3 deep dive
    terminal.clear();
    await terminal.narrate('I pull up the full waveform analysis on the');
    await terminal.narrate('data terminal. Every detail.');
    terminal.blank();

    terminal.say('  [TECHNICAL LOG // ECHO SIGNAL ANALYSIS]', 'dim-text');
    terminal.say('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'dim-text');
    terminal.say('  Carrier frequency: 4.7142 GHz \u00b1 0.003', 'dim-text');
    terminal.say('  Casimir plate separation (inferred): 14.7 nm', 'dim-text');
    terminal.say('    \u2192 Matches Alcubierre-class neg-energy gen', 'dim-text');
    terminal.say('  Phase encoding density: 2.4 Mbit/rad', 'dim-text');
    terminal.say('    \u2192 6x higher than Vin\'s frequency-hop method', 'dim-text');
    terminal.say('  Temporal displacement vector: -3.2 to -7.1 days', 'dim-text');
    terminal.say('    \u2192 Novikov self-consistency: UNCERTAIN', 'dim-text');
    terminal.say('    \u2192 CTC formation probability: 0.94', 'dim-text');
    terminal.say('  Shannon entropy: 7.82 bits/symbol', 'dim-text');
    terminal.say('    \u2192 Near-maximum. Highly compressed or encrypted.', 'dim-text');
    terminal.say('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'dim-text');
    terminal.blank();

    await terminal.thought('Shannon entropy near maximum. This data is either');
    await terminal.thought('heavily compressed or encrypted with something I');
    await terminal.thought("don't have the key to. Either way, it's information-");
    await terminal.thought('dense. Not noise. Definitely deliberate.');
    terminal.blank();

    state.applyDamage({ neural: 5 });
    terminal.say('  [Neural +5 \u2014 deep analysis reveals patterns]', 'dim-text');
    terminal.blank();

    await terminal.pause();
  }

  // Decode
  terminal.clear();

  await terminal.narrate('With the analysis complete, decoding is');
  await terminal.narrate('straightforward. I feed the phase-shift parameters');
  await terminal.narrate('into the decryption array and let it work.');
  terminal.blank();

  await terminal.dentSystem('DECRYPTING ECHO SIGNAL ............ [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591] 80%');
  await wait(400);
  await terminal.dentSystem('DECRYPTING ECHO SIGNAL ............ [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 100%');
  await terminal.dentSystem('DECRYPTION: COMPLETE (NO ANOMALIES)');
  terminal.blank();

  await wait(500);

  await terminal.dent('Clean decode. No sensor spikes. No surprises.');
  await terminal.dentLine('Two data packets recovered.');
  terminal.blank();

  await echoDecodedDisplay(terminal, state, effects, true);

  await echoFlashback(terminal, state, effects, audio);
  await echoRevelation(terminal, state, effects, audio);
}


async function echoDentApproach(terminal, state, effects, audio) {
  /** Ask DENT for his recommendation — relationship + balanced approach. */
  if (state.dentRepairLevel >= 0.7) {
    await terminal.dent("You're asking me? I'm flattered.");
    terminal.blank();
    await wait(300);
    await terminal.dent("Here's what I'd do. Run a quick spectral scan");
    await terminal.dentLine("to make sure it's not hostile \u2014 thirty seconds,");
    await terminal.dentLine('tops. Then decode. Best of both worlds.');
    terminal.blank();
    await terminal.dent("Caution without paralysis. That's my brand.");
    terminal.blank();
  } else {
    await terminal.dent("You're asking me.");
    terminal.blank();
    await wait(300);
    await terminal.dent("Quick scan first. Make sure it won't fry our");
    await terminal.dentLine('systems. Then decode. Safe and fast.');
    terminal.blank();
  }

  const choice = await terminal.showChoices([
    '"Do it your way."',
    '"I trust you, DENT. Run it."',
  ]);

  if (choice === 2) {
    if (state.dentRepairLevel >= 0.7) {
      await terminal.dent('...');
      terminal.blank();
      await wait(300);
      await terminal.dent("Filing that under 'things that make my");
      await terminal.dentLine("processors warm.' Running scan now.");
      terminal.blank();
    } else {
      await terminal.dent('Noted. Running scan.');
      terminal.blank();
    }
  } else {
    await terminal.dent('My way it is.');
    terminal.blank();
  }

  await terminal.pause();
  terminal.clear();

  audio.play('echo_analyze');

  // DENT runs combined approach
  await terminal.dentSystem('THREAT SCAN .............. CLEAR');
  await terminal.dentSystem('SPECTRAL PROFILE ......... LOGGED');
  await terminal.dentSystem('DECRYPTING ............... IN PROGRESS');
  await wait(500);

  await terminal.narrate("DENT handles it. His large optic dims as processing");
  await terminal.narrate('power redirects to the decryption. His small optic');
  await terminal.narrate('flickers \u2014 the backup taking over visual monitoring');
  await terminal.narrate('while the main system works.');
  terminal.blank();

  await terminal.thought("He's good at this. Better than he thinks he is.");
  terminal.blank();

  await terminal.dentSystem('DECRYPTION: COMPLETE');
  terminal.blank();

  await wait(500);

  await terminal.dent('Done. Clean signal. Two data packets.');
  terminal.blank();

  await echoDecodedDisplay(terminal, state, effects, false, true);

  await terminal.dent('And the partial data fragment \u2014 I managed to');
  await terminal.dentLine('pull a few readable bytes during decryption.');
  await terminal.dentLine("They say: 'NOT ALONE.'");
  terminal.blank();

  await wait(500);

  await terminal.thought("Not alone. Two words. From someone I don't know,");
  await terminal.thought('sent backward through time, encoded in physics');
  await terminal.thought('I barely understand.');
  terminal.blank();

  await terminal.thought('Either a warning or a reassurance. I genuinely');
  await terminal.thought('cannot tell which.');
  terminal.blank();

  state.applyDamage({ stress: -5 });
  terminal.say('  [Stress -5 \u2014 DENT\'s competence is reassuring]', 'dim-text');
  terminal.blank();

  await echoFlashback(terminal, state, effects, audio);
  await echoRevelation(terminal, state, effects, audio);
}


// --- Shared Echo Display ---

async function echoDecodedDisplay(terminal, state, effects, analyzed = false, dentPartial = false) {
  /** Display the decoded Echo contents. */
  await terminal.narrate('The decoded data resolves on the display:');
  terminal.blank();
  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 DECODED ECHO \u2014 CONTENTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-white-bright">1. Navigation coordinates</span>              <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>    <span class="c-dim">Pointing toward the Core Anomaly</span>     <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>    <span class="c-dim">Intermediate waypoint: identified</span>     <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span> <span class="c-white-bright">2. Encoded data fragment</span>               <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>    <span class="c-dim">Partial \u2014 damaged or intentional</span>      <span class="c-hull">\u2502</span>');
  if (analyzed) {
    terminal.sayHtml('  <span class="c-hull">\u2502</span>    <span class="c-dim">Phase-shift encrypted (no key)</span>        <span class="c-hull">\u2502</span>');
  } else if (dentPartial) {
    terminal.sayHtml('  <span class="c-hull">\u2502</span>    <span class="c-dim">Content: partially readable</span>           <span class="c-hull">\u2502</span>');
  } else {
    terminal.sayHtml('  <span class="c-hull">\u2502</span>    <span class="c-dim">Content: UNKNOWN</span>                     <span class="c-hull">\u2502</span>');
  }
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.thought('Coordinates. Someone is telling us where to go.');
  await terminal.thought('And they sent an incomplete message. Either they');
  await terminal.thought("couldn't send more, or they chose not to.");
  terminal.blank();

  await terminal.dent('The coordinates align with our existing route to');
  await terminal.dentLine("the Core Anomaly. But they're more precise.");
  await terminal.dentLine('Whoever sent this knows the approach vector');
  await terminal.dentLine('better than we do.');
  terminal.blank();
}


// --- Echo Flashback ---

async function echoFlashback(terminal, state, effects, audio) {
  /** Detailed flashback triggered by Echo decoding — Vin's first Echo reception. */
  if (state.getFlag('echo_flashback_seen')) {
    return;
  }

  await wait(500);
  audio.play('echo_signal');

  await terminal.narrate('The decoded coordinates hang on the display.');
  await terminal.narrate('Something about the waveform pattern is familiar.');
  await terminal.narrate('Not the signal itself \u2014 the structure. The way');
  await terminal.narrate("the data is layered. I've seen this before.");
  terminal.blank();

  await terminal.narrate('My hand is shaking.');
  terminal.blank();

  await wait(500);

  // The flashback
  await terminal.flashback('...the lab. Late. Two in the morning and the');
  await terminal.flashback('building is empty. Coffee cups stacked three');
  await terminal.flashback('deep. The custom antenna humming in the corner \u2014');
  await terminal.flashback('the one I built with stolen parts from the');
  await terminal.flashback('physics department and a prayer.');
  terminal.blank();

  await terminal.flashback('It pings.');
  terminal.blank();

  await terminal.flashbackVivid('A signal. Structured. Not noise. Not');
  await terminal.flashbackVivid('background radiation. STRUCTURED.');
  terminal.blank();

  await terminal.flashback('I stare at the waveform. Run it through every');
  await terminal.flashback('filter I have. Strip the carrier. Isolate the');
  await terminal.flashback('encoding. My hands are shaking then, too.');
  terminal.blank();

  await terminal.flashbackVivid('The timestamp on the signal is wrong.');
  await terminal.flashbackVivid('It\'s from TOMORROW.');
  terminal.blank();

  await terminal.flashback("That's not possible. Nothing in physics allows");
  await terminal.flashback('information to travel backward in time. Nothing');
  await terminal.flashback('except\u2014');
  terminal.blank();

  await terminal.flashbackVivid('Closed Timelike Curves. Theoretical.');
  await terminal.flashbackVivid('Impossible without negative energy density');
  await terminal.flashbackVivid("on a scale nobody's ever achieved.");
  terminal.blank();

  await terminal.flashback('Except someone did. Someone with access to a');
  await terminal.flashback('Casimir-based negative energy generator. Someone');
  await terminal.flashback('who understood fold mechanics well enough to');
  await terminal.flashback('create a stable temporal loop.');
  terminal.blank();

  await terminal.flashbackVivid('Someone who sounded exactly like me.');
  terminal.blank();

  await wait(500);

  await terminal.narrate("The memory dissolves. I'm back in The Vex,");
  await terminal.narrate('gripping the edge of the console. DENT is watching');
  await terminal.narrate('me with both optics.');
  terminal.blank();

  await terminal.dent('Heart rate spike. Neural activity elevated.');
  await terminal.dentLine('You remembered something.');
  terminal.blank();

  const choice = await terminal.showChoices([
    '"The first Echo. I remember receiving it."',
    '"I built the antenna. In a university lab."',
    '"It was my own voice. From the future."',
  ]);

  if (choice === 1) {
    await terminal.dent('The moment that started all of this.');
    await terminal.dentLine('A signal from your own future, containing');
    await terminal.dentLine('the blueprints for everything that followed.');
    terminal.blank();
    await terminal.thought('The Torquer. The fold drive. The coordinates.');
    await terminal.thought('All of it, encoded in a signal I sent to myself.');
    await terminal.thought("A message that exists because I'll send it.");
    await terminal.thought('Because I received it. Because it exists.');
    terminal.blank();
    await terminal.thought('Causality is a loop. I am the beginning and');
    await terminal.thought("the end. That's either profound or insane.");
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent('A stolen antenna and a dream of breaking');
    await terminal.dentLine('physics. That sounds about right.');
    terminal.blank();
    await terminal.thought('I was a researcher. An engineer. And I built');
    await terminal.thought("something that shouldn't work, using parts");
    await terminal.thought("that weren't supposed to be compatible, and");
    await terminal.thought('it picked up a signal from tomorrow.');
    terminal.blank();
    await terminal.thought('My advisor would have had a heart attack.');
    await terminal.thought("Assuming they're still alive. I can't remember.");
    terminal.blank();
  } else if (choice === 3) {
    await terminal.dent("That's the paradox. The message exists because");
    await terminal.dentLine('you send it. You send it because you received');
    await terminal.dentLine("it. Neither event is first. They're both...");
    terminal.blank();
    if (state.dentRepairLevel >= 0.7) {
      await terminal.dent('...co-dependent. Self-consistent. A causal');
      await terminal.dentLine('loop with no origin and no end.');
      await terminal.dentLine("It gives me a headache. And I'm running");
      await terminal.dentLine('on silicon.');
    } else {
      await terminal.dent("...connected. In a way I don't fully");
      await terminal.dentLine('understand yet.');
    }
    terminal.blank();
  }

  state.setFlag('echo_flashback_seen', true);
  terminal.say('  [Memory recovered: First Echo reception \u2014 the signal that started everything]', 'dim-text');
  terminal.blank();

  await terminal.pause();
}


// --- Echo Revelation ---

async function echoRevelation(terminal, state, effects, audio) {
  /** The revelation: this Echo is from someone else. Desire crystallizes. */
  terminal.clear();

  await terminal.narrate('I stare at the coordinates on the display. They');
  await terminal.narrate('point toward the Core Anomaly \u2014 the same direction');
  await terminal.narrate('I was already heading. But these are more precise.');
  await terminal.narrate('Whoever sent this has better data than I do.');
  terminal.blank();

  await terminal.thought('My Echoes are from me. From my future self. A');
  await terminal.thought('closed loop \u2014 self-consistent, self-referential.');
  await terminal.thought('I send them because I received them.');
  terminal.blank();

  await terminal.thought("But this Echo isn't mine. The encoding is different.");
  await terminal.thought('The source is different. Someone ELSE has access');
  await terminal.thought('to fold-based temporal transmission.');
  terminal.blank();

  await terminal.thought("And they're sending signals from the direction of");
  await terminal.thought('the Core Anomaly.');
  terminal.blank();

  if (state.getFlag('derelict_logs_found')) {
    await terminal.thought("Navigator Kael said the Core Anomaly wasn't what");
    await terminal.thought("the Folders claimed. Not a weapon. Not a power");
    await terminal.thought('source. Something else entirely.');
    terminal.blank();
    await terminal.thought("And now someone at that 'something else' is");
    await terminal.thought('sending signals backward through time.');
    await terminal.thought('To us. Specifically to us.');
    terminal.blank();
  }

  // DENT's observation
  await terminal.dent("Vin. The coordinates from this Echo \u2014 they're");
  await terminal.dentLine('not just pointing us to the Core Anomaly.');
  await terminal.dentLine("They're plotting a specific approach vector.");
  await terminal.dentLine('An intermediate waypoint.');
  terminal.blank();

  await terminal.dent('Whoever sent this wants us to fold HERE first.');
  terminal.blank();

  await terminal.narrate('DENT highlights a point on the star chart. Empty');
  await terminal.narrate('space. Nothing remarkable about it on any scan.');
  await terminal.narrate('Just a coordinate in the void between here and');
  await terminal.narrate('the Core Anomaly.');
  terminal.blank();

  await terminal.dent('Distance from our current position: 3.2 light-years.');
  await terminal.dentLine('Reachable with a single fold. If we have the');
  await terminal.dentLine('fuel. And a working fold drive.');
  terminal.blank();

  // Status check
  await terminal.dent('Which brings me to two problems.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-red">PROBLEM 1:</span> <span class="c-white-bright">Fold drive is locked.</span>');
  if (state.getFlag('travel_choice') === 'fold') {
    terminal.say('    The emergency fold stressed the fuel regulator.', 'dim-text');
    terminal.say('    It\'s red-lined and engaged the safety lockout.', 'dim-text');
  } else if (state.getFlag('travel_choice') === 'hybrid') {
    terminal.say('    The short fold degraded the fuel regulator.', 'dim-text');
    terminal.say('    It\'s locked the drive as a precaution.', 'dim-text');
  } else {
    terminal.say('    SIC Scrambler damage to the fuel regulator.', 'dim-text');
    terminal.say('    It never fully recovered.', 'dim-text');
  }
  terminal.blank();

  terminal.sayHtml(`  <span class="c-red">PROBLEM 2:</span> <span class="c-white-bright">Null reserves: ${state.nullReserves} cells</span>`);
  if (state.nullReserves < 15) {
    terminal.say('    Minimum for fold: 15 cells. We\'re short.', 'dim-text');
  } else if (state.nullReserves < 25) {
    terminal.say('    Minimum for fold: 15 cells. Cutting it close.', 'dim-text');
  } else {
    terminal.say('    Minimum for fold: 15 cells. Enough, but no margin.', 'dim-text');
  }
  terminal.blank();

  await terminal.dent("So: we need a working fold drive and enough null");
  await terminal.dentLine("to power it. Neither of which we currently have.");
  terminal.blank();

  if (state.dentRepairLevel >= 0.7) {
    await terminal.dent("In engineering terms, we need to fix the car");
    await terminal.dentLine('AND fill the tank. In that order, ideally.');
    terminal.blank();
  } else {
    await terminal.dent('One problem at a time.');
    terminal.blank();
  }

  await terminal.thought('The unknown Echo wants us at those coordinates.');
  await terminal.thought('The Core Anomaly is beyond them. The loop demands');
  await terminal.thought('I get there. Close the loop. Send the Echoes back.');
  terminal.blank();

  await terminal.thought('And now someone else is guiding us.');
  await terminal.thought('Helping us. Or luring us.');
  terminal.blank();

  await terminal.thought('Only one way to find out.');
  terminal.blank();

  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: NULL ACQUISITION
// ═══════════════════════════════════════════════════════

async function nullAcquisition(terminal, state, effects, audio) {
  /**
   * Mining/scavenging run for null in a debris field.
   *
   * VALIDATION:
   * - Advance: Player learns scavenging mechanics, gets null
   * - Agency: Risk assessment — push deeper or stay safe
   * - Consequence: Null count, optional DENT repair part
   * - Tone: Technical problem-solving under pressure
   */
  terminal.clear();

  await terminal.narrate('DENT runs a local scan while I study the');
  await terminal.narrate('coordinates from the Echo. The sensor array sweeps');
  await terminal.narrate('the space around us \u2014 a 200,000-kilometer bubble');
  await terminal.narrate('of awareness in an ocean of nothing.');
  terminal.blank();

  await wait(500);

  audio.play('sensor_boot');

  await terminal.dent("Vin. I'm picking up a debris field. Bearing");
  await terminal.dentLine('one-two-zero, approximately 40,000 klicks.');
  await terminal.dentLine('Metallic signatures. Null trace readings.');
  terminal.blank();

  await terminal.dent('It looks like the aftermath of an engagement.');
  await terminal.dentLine('Two ships, maybe three. Hull fragments, scattered');
  await terminal.dentLine('cargo, and \u2014 yes \u2014 null containment signatures.');
  terminal.blank();

  if (state.getFlag('refuel_choice') === 'derelict') {
    await terminal.thought('Another dead ship. Another battlefield left');
    await terminal.thought('behind. This sector is a graveyard.');
    terminal.blank();
  } else {
    await terminal.thought('Debris from a fight. Null canisters floating');
    await terminal.thought('in the wreckage. Grim, but useful.');
    terminal.blank();
  }

  if (state.nullReserves < 15) {
    await terminal.dent("We NEED that null. We're below fold minimum.");
    await terminal.dentLine("Without it, we're stuck on gravity drive.");
    await terminal.dentLine("And gravity drive isn't getting us to those");
    await terminal.dentLine('coordinates before the heat death of the');
    await terminal.dentLine('universe.');
    terminal.blank();
  } else if (state.nullReserves < 25) {
    await terminal.dent("We have enough for a bare-minimum fold, but");
    await terminal.dentLine("I'd feel a lot better with a safety margin.");
    await terminal.dentLine("Folding on fumes is a great way to end up");
    await terminal.dentLine('as a cautionary tale.');
    terminal.blank();
  } else {
    await terminal.dent('Our null reserves are decent, but topping off');
    await terminal.dentLine("never hurt anyone. Especially when someone's");
    await terminal.dentLine("already dead and their null is just floating");
    await terminal.dentLine('around waiting for a new owner.');
    terminal.blank();
  }

  const choice = await terminal.showChoices([
    ['Head for the debris field.', 'Scavenge what we can.'],
    ['How dangerous is it?', ''],
  ]);

  if (choice === 2) {
    await terminal.dent('Debris fields are inherently unpredictable.');
    await terminal.dentLine('Tumbling hull fragments, stressed metal,');
    await terminal.dentLine('possible unexploded ordnance.');
    terminal.blank();
    await terminal.dent("On a scale of 'gentle stroll' to 'active");
    await terminal.dentLine("volcano,' I'd rate this a 'parking garage");
    await terminal.dentLine("during an earthquake.'");
    terminal.blank();
    await terminal.dent('But the null is there. And we need it.');
    terminal.blank();
  }

  // Travel to debris field
  audio.play('gravity_drive');

  await terminal.narrate('The gravity drive pushes us toward the debris');
  await terminal.narrate('field. Thirty minutes of slow approach. The stars');
  await terminal.narrate("don't move \u2014 at this speed, they never seem to.");
  terminal.blank();

  terminal.say('  . . .', 'dim-text');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // Arrival at debris field
  await debrisFieldSequence(terminal, state, effects, audio);
}


async function debrisFieldSequence(terminal, state, effects, audio) {
  /** Navigate the debris field and collect null. */
  audio.ambient('debris_ambient');

  await terminal.narrate('The debris field resolves on sensors first, then');
  await terminal.narrate('through the viewport. Fragments of hull plating');
  await terminal.narrate('drift in lazy orbits around each other. The');
  await terminal.narrate('remains of at least two ships \u2014 angular Folder');
  await terminal.narrate('designs, torn apart by coherence scrambler fire \u2014');
  await terminal.narrate('the edges are melted smooth, not torn. Molecular');
  await terminal.narrate('disruption, not kinetic.');
  terminal.blank();

  await terminal.narrate('And among the wreckage: the faint blue shimmer of');
  await terminal.narrate('null containment vessels. Intact. Drifting.');
  terminal.blank();

  if (state.getFlag('derelict_logs_found')) {
    await terminal.thought('More Folder ships. More SIC victims. The');
    await terminal.thought("Penance wasn't the only one caught.");
    terminal.blank();
  }

  await terminal.dent('I count four intact null containers within');
  await terminal.dentLine('grapple range. There may be more deeper in');
  await terminal.dentLine('the field, but the debris is denser there.');
  await terminal.dentLine('More dangerous.');
  terminal.blank();

  let nullFound = 0;

  // First set — easy pickings
  await terminal.narrate('The first two containers are on the outer edge.');
  await terminal.narrate('Clean approaches. I maneuver The Vex alongside');
  await terminal.narrate('and extend the grapple arm.');
  terminal.blank();

  audio.play('grapple_fire');

  await terminal.narrate('The magnetic grapple latches onto the first');
  await terminal.narrate('container. Retract. Load. The Vex shudders as');
  await terminal.narrate('null transfers into our containment vessel.');
  terminal.blank();

  await terminal.dentSystem('NULL CONTAINER RECOVERED \u2014 TRANSFERRING');
  await wait(300);
  await terminal.dentSystem('TRANSFER COMPLETE \u2014 +4 NULL CELLS');
  terminal.blank();
  nullFound += 4;

  await terminal.narrate('Second container. Same process. The grapple');
  await terminal.narrate('finds its target and pulls it in.');
  terminal.blank();

  await terminal.dentSystem('NULL CONTAINER RECOVERED \u2014 +4 NULL CELLS');
  terminal.blank();
  nullFound += 4;

  // The choice — go deeper or stay safe
  await terminal.dent("Two down. Two more within reach, but they're");
  await terminal.dentLine('deeper in. The debris is tighter there \u2014');
  await terminal.dentLine('tumbling fragments, stressed metal.');
  terminal.blank();

  const remainingNeeded = Math.max(0, 25 - (state.nullReserves + nullFound));

  if (remainingNeeded > 0) {
    await terminal.dent('We need more. Those inner containers could give');
    await terminal.dentLine('us another 4-8% depending on how full they are.');
    terminal.blank();
  } else {
    await terminal.dent('We could stop here. We have enough to fold.');
    await terminal.dentLine('But more is more, as they say.');
    terminal.blank();
  }

  const choice = await terminal.showChoices([
    ['Push deeper.', 'Risk the dense debris for more null.'],
    ['Take what we have.', 'Play it safe. We have the outer containers.'],
  ]);

  if (choice === 1) {
    // Deeper into the debris field
    terminal.clear();

    await terminal.narrate('I ease The Vex into the denser field. Hull');
    await terminal.narrate('fragments tumble past the viewport \u2014 close');
    await terminal.narrate('enough to see the scorch marks, the torn');
    await terminal.narrate('wiring, the twisted metal that used to be');
    await terminal.narrate("someone's ship.");
    terminal.blank();

    audio.play('hull_creak');

    await terminal.narrate('Something scrapes along our port side. A long,');
    await terminal.narrate('slow grinding sound that sets my teeth on edge.');
    terminal.blank();

    await terminal.dent("Minor hull contact. No breach. But let's not");
    await terminal.dentLine('do that again.');
    terminal.blank();

    state.applyDamage({ hull: -2 });

    // Third container
    await terminal.narrate('Third container \u2014 wedged between two hull');
    await terminal.narrate('sections. The grapple can reach it, but the');
    await terminal.narrate('angle is tight.');
    terminal.blank();

    audio.play('grapple_fire');

    await terminal.narrate('The grapple fires. Latches on. The retraction');
    await terminal.narrate('pulls the container free and sends the hull');
    await terminal.narrate('sections spinning. I duck instinctively as one');
    await terminal.narrate('tumbles past the viewport.');
    terminal.blank();

    await terminal.dentSystem('NULL CONTAINER RECOVERED \u2014 +4 NULL CELLS');
    terminal.blank();
    nullFound += 4;

    // Fourth container + optional find
    await terminal.narrate('The fourth container is deeper still. And next');
    await terminal.narrate('to it \u2014 something else. A small component case,');
    await terminal.narrate('floating free. Standard Folder tech packaging.');
    terminal.blank();

    const choice2 = await terminal.showChoices([
      'Grab both \u2014 the container and the case',
      'Just the container \u2014 get out of here',
    ]);

    if (choice2 === 1) {
      audio.play('grapple_fire');
      await terminal.narrate('Two grapple shots in quick succession. The');
      await terminal.narrate('container comes first, then the case. Both');
      await terminal.narrate('lock into the cargo bay.');
      terminal.blank();

      await terminal.dentSystem('NULL CONTAINER RECOVERED \u2014 +4 NULL CELLS');
      terminal.blank();
      nullFound += 4;

      // The calibration chip — DENT minor repair item
      await terminal.narrate('The component case contains a single item:');
      await terminal.narrate('an optical calibration chip. Folder-manufactured,');
      await terminal.narrate('high precision. Designed for sensor systems.');
      terminal.blank();

      await terminal.dent("That's... that's a calibration chip. For a");
      await terminal.dentLine('secondary optic system.');
      terminal.blank();
      await wait(300);

      if (state.dentRepairLevel >= 0.7) {
        await terminal.dent('Like mine. Vin, that chip could fix my');
        await terminal.dentLine('backup optic. Full dual-optic processing.');
        await terminal.dentLine("I'd be able to spot things I'm currently");
        await terminal.dentLine('missing.');
      } else {
        await terminal.dent('Optical sensor calibration. Could be useful');
        await terminal.dentLine('for... for my secondary optic. If we had');
        await terminal.dentLine('time to install it.');
      }
      terminal.blank();

      state.setFlag('found_calibration_chip', true);
      state.addItem('Optical Calibration Chip');
      terminal.say('  [Picked up: Optical Calibration Chip \u2014 DENT secondary optic repair]', 'dim-text');
      terminal.blank();
    } else {
      audio.play('grapple_fire');
      await terminal.narrate('Just the container. I grab it and pull out of');
      await terminal.narrate('the dense field. No time for curiosity.');
      terminal.blank();
      await terminal.dentSystem('NULL CONTAINER RECOVERED \u2014 +4 NULL CELLS');
      terminal.blank();
      nullFound += 4;
    }

    state.setFlag('debris_field_explored', true);
  } else {
    await terminal.narrate('I pull The Vex back from the debris field.');
    await terminal.narrate('What we have will do.');
    terminal.blank();
  }

  // Update state
  state.nullReserves += nullFound;

  // Summary
  terminal.clear();

  await terminal.narrate('Back in clear space. The debris field recedes');
  await terminal.narrate("behind us \u2014 a silent monument to someone else's");
  await terminal.narrate('bad day.');
  terminal.blank();

  await terminal.dentSystem(`NULL RESERVES: ${state.nullReserves} CELLS`);
  await terminal.dentSystem(`SCAVENGED: +${nullFound} CELLS (${Math.floor(nullFound / 4)} containers)`);
  if (state.hull < 62) {
    await terminal.dentSystem(`HULL: ${state.hull}% (minor contact damage)`);
  }
  terminal.blank();

  if (state.nullReserves >= 15) {
    await terminal.dent("We've got enough null to fold.");
    await terminal.dentLine('Now we just need a fold drive that works.');
    terminal.blank();
  } else {
    await terminal.dent("Still below fold minimum. But it's better");
    await terminal.dentLine("than it was. We'll figure something out.");
    terminal.blank();
  }

  terminal.say(`  [Null: ${state.nullReserves - nullFound} \u2192 ${state.nullReserves} cells]`, 'dim-text');
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: BYPASS DISCOVERY & INSTALLATION
// ═══════════════════════════════════════════════════════

async function bypassDiscovery(terminal, state, effects, audio) {
  /**
   * Find and install the Fuel Regulator Bypass.
   *
   * VALIDATION:
   * - Advance: Player learns fold drive mechanics, unlocks fold capability
   * - Agency: Choose installation method (self / DENT / jury-rig)
   * - Consequence: Fold stability varies, DENT relationship
   * - Tone: Engineering puzzle (Weir), DENT commentary
   */
  terminal.clear();

  await terminal.narrate('Engineering. The fold drive sits in its housing \u2014');
  await terminal.narrate('a dark, silent machine. The indicator lights are');
  await terminal.narrate('dead. The fuel regulator panel shows a single');
  await terminal.narrate('steady red light: LOCKOUT.');
  terminal.blank();

  await terminal.dent("I've been running diagnostics on the fold drive");
  await terminal.dentLine('while we were scavenging. Here\'s the situation.');
  terminal.blank();

  // Tier 1 — DENT's explanation
  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 FOLD DRIVE \u2014 DIAGNOSTIC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.systemLine('Casimir Coils', 'ALIGNED', 'c-green', 'Ready');
  terminal.systemLine('Null Chamber', `${state.nullReserves} cells`, state.nullReserves < 25 ? 'c-yellow' : 'c-green', '');
  terminal.systemLine('Fuel Regulator', 'FAILED', 'c-red', 'Safety lockout engaged');
  terminal.systemLine('Warp Bubble Gen', 'STANDBY', 'c-yellow', 'Waiting for regulator');
  terminal.systemLine('Drive Status', 'LOCKED', 'c-red', 'Cannot initialize');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.dent('The fuel regulator controls null flow into the');
  await terminal.dentLine('Casimir coils. It prevents overload \u2014 too much');
  await terminal.dentLine('null and the coils generate enough negative energy');
  await terminal.dentLine("to tear the ship apart. So it's kind of important.");
  terminal.blank();

  if (state.getFlag('travel_choice') === 'fold') {
    await terminal.dent('The emergency fold we did during departure');
    await terminal.dentLine('red-lined the regulator. It held together long');
    await terminal.dentLine('enough for us to get here, then failed.');
    terminal.blank();
  } else if (state.getFlag('travel_choice') === 'hybrid') {
    await terminal.dent('The short fold degraded it past tolerance.');
    await terminal.dentLine("It's been deteriorating since and finally");
    await terminal.dentLine('tripped the safety lockout.');
    terminal.blank();
  } else {
    await terminal.dent('The Scrambler damage from the SIC attack');
    await terminal.dentLine("weakened it. It's been failing slowly since");
    await terminal.dentLine('we woke up. Today it finally gave out.');
    terminal.blank();
  }

  await terminal.dent('The good news\u2014');
  terminal.blank();
  await wait(300);
  await terminal.dent("Wait. I should verify before I say 'good news.'");
  terminal.blank();

  await terminal.narrate("DENT's bad arm reaches behind the fold drive");
  await terminal.narrate("housing. He pulls open a maintenance panel that");
  await terminal.narrate("I didn't know was there.");
  terminal.blank();

  if (state.getFlag('dent_arm_repaired')) {
    await terminal.narrate('Both hands work the panel \u2014 smooth, precise.');
  } else {
    await terminal.narrate('His good arm does the work. The bad one holds');
    await terminal.narrate('the panel open, twitching occasionally.');
  }
  terminal.blank();

  await terminal.dent('Yes. Good news confirmed.');
  terminal.blank();

  await terminal.narrate('DENT extracts a small component from the');
  await terminal.narrate('maintenance compartment. A sealed module, roughly');
  await terminal.narrate('the size of a deck of cards. A handwritten label');
  await terminal.narrate('on the casing, partially smudged:');
  terminal.blank();

  terminal.say('  FUEL REG BYPASS \u2014 EMERGENCY USE', 'orange-text');
  terminal.say('    "Install only if regulator fails.', 'dim-text');
  terminal.say('     Routes null around the regulator', 'dim-text');
  terminal.say('     directly to Casimir coils.', 'dim-text');
  terminal.say('     \u2014 V"', 'dim-text');
  terminal.blank();

  await terminal.thought('My handwriting. Past-me prepared this.');
  await terminal.thought('Past-me apparently anticipated the regulator');
  await terminal.thought('failing. Past-me was either very smart or very');
  await terminal.thought('paranoid.');
  terminal.blank();

  await terminal.thought('Knowing what I know now, probably both.');
  terminal.blank();

  await terminal.dent('You prepared a bypass module. It routes null');
  await terminal.dentLine('directly to the coils, skipping the regulator');
  await terminal.dentLine('entirely. Less safe, but functional.');
  terminal.blank();

  // Optional Tier 2 examine
  const choice = await terminal.showChoices([
    '"How do we install it?"',
    'Examine the bypass module more closely',
  ]);

  if (choice === 2) {
    await terminal.narrate('I turn the module over in my hands. Two');
    await terminal.narrate('connection ports \u2014 input and output. The');
    await terminal.narrate('internal circuitry is visible through a');
    await terminal.narrate('transparent section: a miniature null flow');
    await terminal.narrate('controller with manual adjustment valves.');
    terminal.blank();

    await terminal.thought("Clever. The bypass doesn't just route around the");
    await terminal.thought('regulator \u2014 it replaces the flow control with a');
    await terminal.thought('simplified version. Manual valves instead of');
    await terminal.thought('electronic feedback loops. Less precise, but no');
    await terminal.thought('single point of failure.');
    terminal.blank();

    await terminal.thought('The tradeoff is obvious: electronic regulation');
    await terminal.thought('adjusts null flow thousands of times per second.');
    await terminal.thought('Manual valves adjust once, at installation. If');
    await terminal.thought('conditions change mid-fold... you hope you set');
    await terminal.thought('them right.');
    terminal.blank();

    state.applyDamage({ neural: 3 });
    terminal.say('  [Neural +3 \u2014 understanding the engineering]', 'dim-text');
    terminal.blank();
  }

  await terminal.pause();
  terminal.clear();

  // Installation choice
  await bypassInstall(terminal, state, effects, audio);
}


async function bypassInstall(terminal, state, effects, audio) {
  /** Choose and execute the bypass installation method. */
  await terminal.dent('Three ways to do this. Each has tradeoffs.');
  terminal.blank();

  const choice = await terminal.showChoices([
    ['Install it yourself.', 'Precise, time-consuming. You built the module.'],
    ['"DENT, you take this one."', 'Micro-actuators. Designed for hardware work.'],
    ['Jury-rig it.', 'Fast. Dirty. Skip the calibration step.'],
  ]);

  if (choice === 1) {
    state.setFlag('bypass_install_method', 'self');
    await bypassSelfInstall(terminal, state, effects, audio);
  } else if (choice === 2) {
    state.setFlag('bypass_install_method', 'dent');
    await bypassDentInstall(terminal, state, effects, audio);
  } else if (choice === 3) {
    state.setFlag('bypass_install_method', 'jury_rig');
    await bypassJuryRig(terminal, state, effects, audio);
  }
}


async function bypassSelfInstall(terminal, state, effects, audio) {
  /** Vin installs the bypass himself — precise, +Neural. */
  await terminal.narrate('I take the module and position myself underneath');
  await terminal.narrate('the fold drive housing. The regulator port is');
  await terminal.narrate('a tight fit \u2014 I have to work by touch as much');
  await terminal.narrate('as by sight.');
  terminal.blank();

  audio.play('bypass_install');

  await terminal.thought('Disconnect the regulator output. Route through');
  await terminal.thought('the bypass input. Calibrate the manual valves');
  await terminal.thought('to match our current null flow rate. Reconnect.');
  terminal.blank();

  await terminal.thought("Simple in theory. In practice, I'm adjusting");
  await terminal.thought('microscopic valves while floating in zero-G with');
  await terminal.thought('grease on my fingers and a fold drive that could');
  await terminal.thought('theoretically tear spacetime if I set a valve');
  await terminal.thought('wrong.');
  terminal.blank();

  await terminal.thought('No pressure.');
  terminal.blank();

  await terminal.narrate('Twenty minutes of careful work. My hands are');
  await terminal.narrate('steady. The valves click into position.');
  terminal.blank();

  await terminal.dent('Flow alignment looks good. Null routing stable.');
  await terminal.dentLine("I'm reading positive indicators across the board.");
  terminal.blank();

  state.foldStability = 85;
  state.applyDamage({ neural: 5 });
  terminal.say('  [Neural +5 \u2014 engineering confidence]', 'dim-text');
  terminal.say('  [Fold stability: 85% \u2014 precise installation]', 'dim-text');
  terminal.blank();

  await bypassComplete(terminal, state, effects, audio);
}


async function bypassDentInstall(terminal, state, effects, audio) {
  /** DENT installs the bypass — tests trust, relationship moment. */
  await terminal.dent('Give me that module.');
  terminal.blank();

  await terminal.narrate('I hand it over. DENT\'s good arm takes it with');
  await terminal.narrate('surgical precision. His bad arm stabilizes against');
  await terminal.narrate('the hull as he positions himself at the drive.');
  terminal.blank();

  audio.play('bypass_install');

  if (state.getFlag('dent_arm_repaired')) {
    await terminal.narrate('Both arms work in tandem \u2014 the good one placing');
    await terminal.narrate('the module, the repaired one holding connectors');
    await terminal.narrate('in position. Efficient. Practiced.');
    terminal.blank();
    await terminal.dent("Both arms functional. I've been waiting for a");
    await terminal.dentLine('chance to show off.');
    terminal.blank();
  } else {
    await terminal.narrate('He works one-handed, using his bad arm to brace');
    await terminal.narrate('against the housing. The torch on his right arm');
    await terminal.narrate("flickers \u2014 he's using it as a light source,");
    await terminal.narrate('the only useful thing it can currently do.');
    terminal.blank();
  }

  await terminal.narrate('Twelve minutes. Faster than I could have done it.');
  await terminal.narrate('His micro-actuators make the valve adjustments');
  await terminal.narrate('look effortless.');
  terminal.blank();

  await terminal.dent("Installed. Flow alignment is... actually, it's");
  await terminal.dentLine('better than the spec sheet. My actuators are');
  await terminal.dentLine('more precise than human fingers.');
  terminal.blank();

  if (state.dentRepairLevel >= 0.7) {
    await terminal.dent("Don't tell me you're surprised.");
    terminal.blank();
  } else {
    await terminal.dent("That went well. I'm surprised too.");
    terminal.blank();
  }

  state.foldStability = 90;
  state.applyDamage({ stress: -5 });
  terminal.say('  [Stress -5 \u2014 trusting DENT paid off]', 'dim-text');
  terminal.say('  [Fold stability: 90% \u2014 DENT\'s precision]', 'dim-text');
  terminal.blank();

  await bypassComplete(terminal, state, effects, audio);
}


async function bypassJuryRig(terminal, state, effects, audio) {
  /** Jury-rig the bypass — fast but unstable. */
  await terminal.dent("Vin. Skipping calibration means the valves won't");
  await terminal.dentLine("be tuned to our null flow rate. The drive will");
  await terminal.dentLine("work, but it'll be... temperamental.");
  terminal.blank();

  await terminal.thought("Temperamental. In engineering: 'might shake");
  await terminal.thought("itself apart at the worst possible moment.'");
  terminal.blank();

  await terminal.thought("I don't have time for perfection. Whoever sent");
  await terminal.thought('that Echo is waiting. The SICs are behind us.');
  await terminal.thought("And I've jury-rigged worse than a fuel regulator.");
  terminal.blank();

  audio.play('bypass_install');

  await terminal.narrate('I jam the module into the port. Skip the valve');
  await terminal.narrate('calibration \u2014 leave them at factory default.');
  await terminal.narrate('Connect. Lock. Done.');
  terminal.blank();

  await terminal.narrate('Five minutes. The drive indicator flickers from');
  await terminal.narrate('red to amber. Not green. Amber.');
  terminal.blank();

  await terminal.dent('It works. Technically.');
  await terminal.dentLine("I want to emphasize the word 'technically.'");
  terminal.blank();

  state.foldStability = 60;
  state.applyDamage({ stress: 5 });
  terminal.say('  [Stress +5 \u2014 cutting corners under pressure]', 'dim-text');
  terminal.say('  [Fold stability: 60% \u2014 jury-rigged, uncalibrated]', 'dim-text');
  terminal.blank();

  await bypassComplete(terminal, state, effects, audio);
}


async function bypassComplete(terminal, state, effects, audio) {
  /** Fold drive unlocked — shared ending for all install paths. */
  state.foldStatus = 'READY';
  audio.play('stinger_revelation');
  state.setFlag('fold_drive_unlocked', true);

  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 FOLD DRIVE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.systemLine('Fuel Regulator', 'BYPASSED', 'c-yellow', 'Manual control');
  terminal.systemLine('Null Chamber', `${state.nullReserves} cells`, state.nullReserves >= 15 ? 'c-green' : 'c-yellow', '');
  terminal.systemLine('Drive Status', 'READY', 'c-green', `Stability: ${state.foldStability}%`);
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.dent('Fold drive: READY.');
  terminal.blank();

  await wait(500);

  await terminal.narrate('The hum changes. Somewhere deep in the ship, the');
  await terminal.narrate("fold drive's Casimir coils are aligning \u2014 a low,");
  await terminal.narrate('resonant vibration that I feel in my teeth more');
  await terminal.narrate('than I hear in my ears.');
  terminal.blank();

  await terminal.thought('Ready. The Vex can fold.');
  await terminal.thought('For the first time since I woke up, I have the');
  await terminal.thought("ability to go somewhere that isn't 'here.'");
  terminal.blank();

  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: FOLD PREPARATION
// ═══════════════════════════════════════════════════════

async function foldPreparation(terminal, state, effects, audio) {
  /**
   * Pre-fold checks, science exposition, tension building.
   *
   * VALIDATION:
   * - Advance: Player learns fold mechanics (3 tiers)
   * - Agency: Choose fold execution style
   * - Consequence: Null cost and Blip intensity vary
   * - Tone: Building tension before the set piece
   */
  terminal.clear();

  await terminal.narrate('I sit in the pilot\'s seat. The navigation display');
  await terminal.narrate('shows two points: HERE and THERE. The waypoint');
  await terminal.narrate('coordinates from the unknown Echo, 3.2 light-years');
  await terminal.narrate('distant. Unreachable by gravity drive in any');
  await terminal.narrate('reasonable timeframe. Reachable by fold in seconds.');
  terminal.blank();

  await terminal.dent("Pre-fold checklist. We're doing this properly.");
  terminal.blank();

  // Tier 1 — Simple explanation
  await terminal.dent("Here's how this works, in case the Blip scrambled");
  await terminal.dentLine('the tutorial. The fold drive uses null energy to');
  await terminal.dentLine('create negative pressure in the Casimir coils.');
  await terminal.dentLine('That bends spacetime. We create a bridge between');
  await terminal.dentLine('here and there, fly through, bridge closes.');
  terminal.blank();

  await terminal.dent("Simple. Except for the part where we're bending");
  await terminal.dentLine('the fabric of reality and hoping it bends back.');
  terminal.blank();

  // Optional Tier 2
  const choice = await terminal.showChoices([
    '"Let\'s just do it."',
    '"Walk me through the physics."',
    'Check the ship terminal for technical specs',
  ]);

  if (choice === 2) {
    // Tier 2 — Vin's monologue
    terminal.clear();
    await terminal.thought('The fold is an Alcubierre-class metric distortion.');
    await terminal.thought("We're not moving \u2014 space is. The drive contracts");
    await terminal.thought('spacetime ahead of us and expands it behind,');
    await terminal.thought("creating a bubble of flat space that 'surfs' the");
    await terminal.thought('curvature wave.');
    terminal.blank();

    await terminal.thought('The null energy is the key. Negative energy density');
    await terminal.thought('\u2014 the only thing that can warp spacetime outward');
    await terminal.thought('instead of inward. Casimir coils generate it from');
    await terminal.thought('vacuum fluctuations, scaled up by brute-force');
    await terminal.thought('fusion power.');
    terminal.blank();

    await terminal.thought('The cost: roughly 15-20 cells of our null reserves for');
    await terminal.thought('a 3-light-year jump. The risk: the simulation \u2014');
    terminal.blank();

    await terminal.thought('...');
    terminal.blank();

    await terminal.thought('The universe. The UNIVERSE has to compute two');
    await terminal.thought("infinitely distant points as adjacent. That's a");
    await terminal.thought('lot of processing power. The result of that');
    await terminal.thought('demand is what we call a Blip.');
    terminal.blank();

    await terminal.thought("I've never experienced one firsthand. DENT says");
    await terminal.thought("they're 'disorienting.' He's probably underselling it.");
    terminal.blank();

    state.applyDamage({ neural: 3 });
    terminal.say('  [Neural +3 \u2014 mental preparation]', 'dim-text');
    terminal.blank();

  } else if (choice === 3) {
    // Tier 3 — Technical terminal
    terminal.clear();
    terminal.say('  [TECHNICAL LOG // FOLD DRIVE SPECIFICATIONS]', 'dim-text');
    terminal.say('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'dim-text');
    terminal.say('  Drive class: Alcubierre-Casimir Hybrid', 'dim-text');
    terminal.say('  Casimir plate array: 24 paired plates, 14.7nm sep', 'dim-text');
    terminal.say('  Neg-energy output: 3.2\u00d710\u207b\u2078 J/m\u00b3 (sustained)', 'dim-text');
    terminal.say('  Warp bubble radius: 12.4m (hull-conformal)', 'dim-text');
    terminal.say('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'dim-text');
    terminal.say('  Fold calculation:', 'dim-text');
    terminal.say(`    \u0394x = 3.2 ly \u2192 null cost: 18 cells (optimal)`, 'dim-text');
    terminal.say(`    Stability factor: ${state.foldStability}% \u2192 cost modifier: ${(100 / state.foldStability).toFixed(2)}x`, 'dim-text');
    terminal.say(`    Adjusted cost: ${Math.round(18 * (100 / state.foldStability))} cells`, 'dim-text');
    terminal.say('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'dim-text');
    terminal.say('  Blip probability: 94% (standard for first fold)', 'dim-text');
    terminal.say('  Blip severity: UNKNOWN (no prior data)', 'dim-text');
    terminal.say('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'dim-text');
    terminal.blank();

    await terminal.thought("94% Blip probability. Physics says it's energy");
    await terminal.thought('interference. Something in the back of my mind');
    await terminal.thought("says it's something else entirely.");
    terminal.blank();

    state.applyDamage({ neural: 5 });
    terminal.say('  [Neural +5 \u2014 deep technical understanding]', 'dim-text');
    terminal.blank();
  }

  await terminal.pause();
  terminal.clear();

  // Pre-fold status
  let nullCost = 18;
  if (state.foldStability < 70) {
    nullCost = 22;
  } else if (state.foldStability < 80) {
    nullCost = 20;
  }

  terminal.sayHtml('  <span class="c-hull">\u250C\u2500 FOLD CALCULATION \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml(`  <span class="c-hull">\u2502</span>  Target: <span class="c-white-bright">Waypoint Alpha</span> (3.2 ly)`);
  terminal.sayHtml(`  <span class="c-hull">\u2502</span>  Null cost: <span class="c-hull">${nullCost} cells</span>`);
  terminal.sayHtml(`  <span class="c-hull">\u2502</span>  Current reserves: <span class="c-white-bright">${state.nullReserves} cells</span>`);
  terminal.sayHtml(`  <span class="c-hull">\u2502</span>  Post-fold reserves: <span class="c-white-bright">${state.nullReserves - nullCost} cells</span>`);
  terminal.sayHtml(`  <span class="c-hull">\u2502</span>  Stability: <span class="c-white-bright">${state.foldStability}%</span>`);
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  if (state.nullReserves < nullCost) {
    // Not enough null — gravity drive fallback
    await terminal.dent("Vin. We don't have enough null for the fold.");
    await terminal.dentLine(`We need ${nullCost} cells. We have ${state.nullReserves}.`);
    terminal.blank();
    await terminal.dent('Gravity drive to the waypoint? We\'re looking at');
    await terminal.dentLine("years. Decades. That's not an option.");
    terminal.blank();
    // Force a minimum viable fold
    await terminal.dent('Unless we run it lean. Minimum bubble, tight');
    await terminal.dentLine("tolerances. It'll cost us everything we have");
    await terminal.dentLine('and the exit will be rough.');
    terminal.blank();
    nullCost = state.nullReserves; // Use everything
  }

  // Fold execution choice
  await terminal.dent('How do you want to do this?');
  terminal.blank();

  const foldChoice = await terminal.showChoices([
    ['Smooth fold.', `Conservative. Higher null cost (${nullCost} cells), but stable exit.`],
    ['Hard fold.', `Aggressive. Lower null cost (${Math.max(15, nullCost - 3)} cells), but rougher exit.`],
    ['"DENT, you handle the calculations."', "Trust the machine. Moderate cost, DENT's precision."],
  ]);

  if (foldChoice === 1) {
    state.setFlag('fold_execution_style', 'smooth');
    state.nullReserves -= nullCost;
  } else if (foldChoice === 2) {
    state.setFlag('fold_execution_style', 'hard');
    state.nullReserves -= Math.max(15, nullCost - 3);
  } else if (foldChoice === 3) {
    state.setFlag('fold_execution_style', 'dent');
    state.nullReserves -= (nullCost - 1);
  }

  await state.save();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: THE FIRST FOLD
// ═══════════════════════════════════════════════════════

async function firstFold(terminal, state, effects, audio) {
  /**
   * The first ship fold — the major set piece of Chapter 2.
   *
   * VALIDATION:
   * - Advance: Player experiences fold + first Blip
   * - Agency: Fold style already chosen, reactions during
   * - Consequence: First simulation evidence, stats, SIC detection
   * - Tone: Climactic, tense, unsettling
   *
   * Truby beats: #5 (Desire in action), #9 (First revelation — something is wrong)
   */
  terminal.clear();

  // The fold sequence
  audio.play('tension_build');

  await terminal.narrate('I grip the flight controls. The fold drive hums');
  await terminal.narrate("behind me \u2014 a sound I've never heard before but");
  await terminal.narrate('somehow recognize. The Casimir coils vibrating at');
  await terminal.narrate('frequencies that make my fillings ache.');
  terminal.blank();

  await terminal.dent('Fold drive: charging.');
  terminal.blank();

  await wait(500);

  // Charge sequence
  const foldStyle = state.getFlag('fold_execution_style');

  if (foldStyle === 'smooth') {
    await terminal.dent('Conservative approach. Full power buildup.');
    await terminal.dentLine('This will take about thirty seconds.');
    terminal.blank();
    await terminal.narrate('The drive whine climbs slowly. A controlled,');
    await terminal.narrate('patient ascent to threshold. The ship trembles');
    await terminal.narrate('\u2014 a fine vibration, like a tuning fork.');
    terminal.blank();
  } else if (foldStyle === 'hard') {
    await terminal.dent('Hard fold. Rapid charge. Hold onto something.');
    terminal.blank();
    await terminal.narrate('The drive whine SCREAMS upward. No patience,');
    await terminal.narrate('no finesse \u2014 raw power dumped into the coils');
    await terminal.narrate('as fast as the bypass will allow. The ship');
    await terminal.narrate('shakes. Hard.');
    terminal.blank();
    state.applyDamage({ stress: 5 });
  } else {
    await terminal.dent("I've got the calculations. Optimal power curve.");
    await terminal.dentLine("Sit back. I'll tell you when to be scared.");
    terminal.blank();
    await terminal.narrate('DENT manages the charge. The whine climbs in');
    await terminal.narrate('measured steps \u2014 pausing, adjusting, resuming.');
    await terminal.narrate('Controlled. Efficient. The ship barely trembles.');
    terminal.blank();
  }

  await wait(500);

  await terminal.dentSystem('FOLD DRIVE: 60% ...');
  await wait(300);
  await terminal.dentSystem('FOLD DRIVE: 80% ...');
  await wait(300);
  await terminal.dentSystem('FOLD DRIVE: 95% ...');
  await wait(300);
  await terminal.dentSystem('FOLD DRIVE: THRESHOLD');
  terminal.blank();

  audio.ambient('theme_first_fold');
  audio.play('fold_initiate');

  await terminal.narrate('The viewport changes.');
  terminal.blank();

  await wait(500);

  // THE FOLD
  terminal.clear();

  await terminal.highlight('F O L D   I N I T I A T E D');
  terminal.blank();

  await effects.foldEffect(terminal);

  await wait(300);

  await terminal.narrate('Space... bends.');
  terminal.blank();

  await terminal.narrate("There's no other word for it. The stars ahead");
  await terminal.narrate('compress \u2014 blue-shifting, crowding together,');
  await terminal.narrate('becoming a single blazing point. The stars behind');
  await terminal.narrate('stretch and redden and vanish.');
  terminal.blank();

  await terminal.narrate('The viewport shows something impossible. Two points');
  await terminal.narrate('in spacetime. 3.2 light-years apart. Briefly the');
  await terminal.narrate('same location.');
  terminal.blank();

  await terminal.thought("We're not moving. Space is moving around us.");
  await terminal.thought('The Alcubierre bubble is holding. The null energy');
  await terminal.thought('is sustaining the curvature. We are inside a');
  await terminal.thought('pocket of flat spacetime riding a wave of warped');
  await terminal.thought('reality and\u2014');
  terminal.blank();

  await terminal.thought("It's beautiful.");
  terminal.blank();

  await wait(500);

  await terminal.narrate('For three seconds, The Vex is everywhere and');
  await terminal.narrate('nowhere. The fold bridge connects origin and');
  await terminal.narrate('destination. We exist in both places.');
  terminal.blank();

  await terminal.narrate('Then the bridge collapses.');
  terminal.blank();

  audio.play('fold_exit');

  await wait(300);

  // --- THE BLIP ---
  terminal.clear();

  // Screen tear effect
  await effects.screenTear(4);
  terminal.blank();

  await terminal.warning('B\u0337\u0332\u0301L\u0338\u0330\u030aI\u0336\u031e\u033eP\u0338\u0330\u0301');
  terminal.blank();

  await effects.screenTear(2);

  await wait(300);

  // The Blip experience depends on fold style
  if (foldStyle === 'hard' || state.foldStability < 70) {
    // Rough Blip
    audio.play('blip_event');

    await terminal.narrate('The exit is VIOLENT.');
    terminal.blank();

    await terminal.narrate('The viewport fills with static. Every display');
    await terminal.narrate('on the bridge flickers \u2014 numbers scrambling,');
    await terminal.narrate('text corrupting, colors inverting. For one');
    await terminal.narrate('terrible second, I see DOUBLE \u2014 two versions');
    await terminal.narrate('of the bridge overlapping, slightly offset,');
    await terminal.narrate('like a misaligned photograph.');
    terminal.blank();

    // Glitch text
    terminal.sayHtml(`  <span class="c-red">${effects.glitchText('SPATIAL INTEGRITY: COMPROMISED', 0.3)}</span>`);
    terminal.sayHtml(`  <span class="c-red">${effects.glitchText('TEMPORAL SYNC: RECALIBRATING', 0.3)}</span>`);
    terminal.sayHtml(`  <span class="c-red">${effects.glitchText('HULL SENSORS: CONFLICTING DATA', 0.3)}</span>`);
    terminal.blank();

    await terminal.narrate('Gravity flickers. I float for half a second,');
    await terminal.narrate('then slam back into the chair. My teeth click');
    await terminal.narrate('together. Stars explode behind my eyes.');
    terminal.blank();

    state.applyDamage({ health: -5, neural: -8, stress: 10 });
    terminal.say('  [HP -5, Neural -8, Stress +10 \u2014 severe Blip]', 'dim-text');
    terminal.blank();
  } else if (foldStyle === 'smooth') {
    // Clean Blip
    audio.play('blip_event');

    await terminal.narrate('The exit shudders.');
    terminal.blank();

    await terminal.narrate('Every display on the bridge flickers. The');
    await terminal.narrate('lights dim, brighten, dim again. For a fraction');
    await terminal.narrate('of a second, the text on my console scrambles \u2014');
    await terminal.narrate("letters becoming symbols I don't recognize \u2014");
    await terminal.narrate('then snaps back to normal.');
    terminal.blank();

    terminal.sayHtml(`  <span class="c-yellow">${effects.glitchText('SPATIAL INTEGRITY: NOMINAL', 0.1)}</span>`);
    terminal.sayHtml(`  <span class="c-yellow">${effects.glitchText('TEMPORAL SYNC: MINOR DRIFT', 0.1)}</span>`);
    terminal.blank();

    await terminal.narrate('A wave of dizziness. Brief. The kind of thing');
    await terminal.narrate("you'd blame on standing up too fast.");
    terminal.blank();

    state.applyDamage({ neural: -3, stress: 5 });
    terminal.say('  [Neural -3, Stress +5 \u2014 mild Blip]', 'dim-text');
    terminal.blank();
  } else {
    // DENT-managed Blip
    audio.play('blip_event');

    await terminal.narrate('The exit... ripples.');
    terminal.blank();

    await terminal.narrate('Every display flickers simultaneously. The');
    await terminal.narrate('lights do something wrong \u2014 they dim in a');
    await terminal.narrate('pattern, left to right, like a wave passing');
    await terminal.narrate('through the ship. My console shows garbage');
    await terminal.narrate('text for two seconds, then clears.');
    terminal.blank();

    terminal.sayHtml(`  <span class="c-yellow">${effects.glitchText('SPATIAL INTEGRITY: RECALCULATING', 0.15)}</span>`);
    terminal.sayHtml(`  <span class="c-yellow">${effects.glitchText('TEMPORAL SYNC: ADJUSTING', 0.15)}</span>`);
    terminal.blank();

    await terminal.narrate('A strange taste in my mouth. Metallic. Gone');
    await terminal.narrate('before I can identify it.');
    terminal.blank();

    state.applyDamage({ neural: -5, stress: 7 });
    terminal.say('  [Neural -5, Stress +7 \u2014 moderate Blip]', 'dim-text');
    terminal.blank();
  }

  state.setFlag('first_blip_witnessed', true);
  state.setFlag('first_fold_complete', true);

  await wait(500);

  // Post-Blip: the subtle wrongness
  await postBlipWrongness(terminal, state, effects, audio);
}


async function postBlipWrongness(terminal, state, effects, audio) {
  /** The subtle simulation clue — something is different after the Blip. */
  await terminal.narrate("The Blip passes. Systems stabilize. I'm breathing");
  await terminal.narrate("hard. DENT is running diagnostics \u2014 his large optic");
  await terminal.narrate('sweeping the bridge in quick, nervous arcs.');
  terminal.blank();

  await terminal.dent("Fold complete. We're at the waypoint coordinates.");
  await terminal.dentLine('All systems... recovering.');
  terminal.blank();

  // The subtle wrongness — one detail is different
  await terminal.narrate('I look around the bridge. Everything seems normal.');
  await terminal.narrate('The displays are steady. The hull is intact. DENT');
  await terminal.narrate('is functional.');
  terminal.blank();

  await terminal.narrate('But something is off.');
  terminal.blank();

  await wait(500);

  // The simulation clue — the coffee cup
  await terminal.narrate('The mug on the console. The one I left next to');
  await terminal.narrate("the sensor readout. It's moved. Not far \u2014 maybe");
  await terminal.narrate('three inches to the left. But I know where I put');
  await terminal.narrate("it. I'm precise about these things.");
  terminal.blank();

  await terminal.narrate('And the chronometer.');
  terminal.blank();

  terminal.say('  SHIP CHRONOMETER: 14:47:22 UTC', 'dim-text');
  terminal.say('  EXPECTED ARRIVAL: 14:47:19 UTC', 'dim-text');
  terminal.say('  DISCREPANCY: +3 seconds', 'dim-text');
  terminal.blank();

  await terminal.thought('Three seconds. The fold should be instantaneous \u2014');
  await terminal.thought("no transit time. Einstein-Rosen bridges don't have");
  await terminal.thought("a 'travel duration.' We should arrive at the exact");
  await terminal.thought('moment we left.');
  terminal.blank();

  await terminal.thought('So where did those three seconds go?');
  terminal.blank();

  // DENT's reaction
  if (state.dentRepairLevel >= 0.5) {
    await terminal.dent("Vin. I'm logging an anomaly.");
    terminal.blank();
    await wait(300);
    await terminal.dent('The chronometer shows a three-second discrepancy.');
    await terminal.dentLine('And my internal clock disagrees with both the');
    await terminal.dentLine('ship clock and the nav computer.');
    terminal.blank();
    await terminal.dent('Three different times. All three should match.');
    terminal.blank();

    if (state.dentRepairLevel >= 0.7) {
      await terminal.dent('Also... did you move that mug?');
      terminal.blank();
    }
  } else {
    await terminal.dent('Systems... nominal. Logging. Something feels...');
    await terminal.dentLine('[static]');
    await terminal.dentLine('...wrong. Can\'t quantify.');
    terminal.blank();
  }

  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 6: POST-BLIP DEBRIEF
// ═══════════════════════════════════════════════════════

async function postBlipDebrief(terminal, state, effects, audio) {
  /**
   * Process what just happened. Player chooses reaction.
   *
   * VALIDATION:
   * - Advance: First simulation evidence processing
   * - Agency: Choose reaction to Blip (scientific/emotional/dismiss)
   * - Consequence: Sets simulation awareness arc for future chapters
   * - Tone: Quiet tension after the storm
   */
  terminal.clear();

  await terminal.narrate("The Vex drifts at the waypoint. Stars I don't");
  await terminal.narrate('recognize fill the viewport \u2014 we\'re 3.2 light-');
  await terminal.narrate('years from where we started. Deep space. No');
  await terminal.narrate('stations, no beacons, no traffic.');
  terminal.blank();

  await terminal.narrate('Just us and the silence.');
  terminal.blank();

  await terminal.dent('Post-fold status:');
  terminal.blank();

  // Status panel
  terminal.statusPanel(state);
  terminal.blank();

  await terminal.dent('Hull is intact. Life support is stable. Null');
  await terminal.dentLine(`reserves at ${state.nullReserves} cells.`);
  terminal.blank();

  await terminal.dent('But Vin... that Blip.');
  terminal.blank();

  await wait(500);

  // The choice — how does Vin process this?
  await terminal.narrate('DENT is watching me. Waiting for my reaction.');
  await terminal.narrate('The moved mug. The time discrepancy. The way');
  await terminal.narrate('the lights flickered in a pattern instead of');
  await terminal.narrate('randomly.');
  terminal.blank();

  const choice = await terminal.showChoices([
    ['Log it. Scientifically.', 'Document everything. Treat it as data.'],
    ['"DENT... are you okay?"', 'Check on your partner first.'],
    ['"It\'s just fold interference. Normal."', "Move on. Don't dwell on it."],
  ]);

  if (choice === 1) {
    state.setFlag('blip_reaction', 'scientific');
    await blipReactionScientific(terminal, state, effects, audio);
  } else if (choice === 2) {
    state.setFlag('blip_reaction', 'emotional');
    await blipReactionEmotional(terminal, state, effects, audio);
  } else if (choice === 3) {
    state.setFlag('blip_reaction', 'dismiss');
    await blipReactionDismiss(terminal, state, effects, audio);
  }
}


async function blipReactionScientific(terminal, state, effects, audio) {
  /** Vin logs the Blip scientifically — builds simulation evidence file. */
  await terminal.narrate('My fingers are still trembling. I pull up a new');
  await terminal.narrate('log file \u2014 the act of recording data is grounding.');
  await terminal.narrate('Familiar. Scientific method as therapy.');
  terminal.blank();

  terminal.say('  [VIN\'S LOG \u2014 BLIP EVENT #001]', 'dim-text');
  terminal.say('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'dim-text');
  terminal.say('  Timestamp: 14:47:22 UTC (disputed)', 'dim-text');
  terminal.say('  Duration: ~2 seconds subjective', 'dim-text');
  terminal.say('  Effects observed:', 'dim-text');
  terminal.say('    - Display corruption (all screens, simultaneous)', 'dim-text');
  terminal.say('    - Chronometer discrepancy (+3 seconds)', 'dim-text');
  terminal.say('    - Object displacement (mug, ~7cm lateral)', 'dim-text');
  terminal.say('    - Brief gravitational anomaly', 'dim-text');
  terminal.say('    - DENT internal clock desynchronized', 'dim-text');
  terminal.say('  Classification: Unknown. Insufficient data.', 'dim-text');
  terminal.say('  Possible explanations:', 'dim-text');
  terminal.say('    1. Energy interference from fold drive', 'dim-text');
  terminal.say('    2. Casimir coil feedback (bypass instability)', 'dim-text');
  terminal.say('    3. ???', 'dim-text');
  terminal.say('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', 'dim-text');
  terminal.blank();

  await terminal.thought("I wrote three question marks. That's not very");
  await terminal.thought("scientific. But I don't have a better option for");
  await terminal.thought("'something about this feels deeply wrong in a way");
  await terminal.thought("I can't articulate.'");
  terminal.blank();

  await terminal.dent("You're logging it. Good.");
  await terminal.dentLine("I'm... I'm going to log it too. My timestamps");
  await terminal.dentLine("don't match. I want that on record.");
  terminal.blank();

  state.applyDamage({ neural: 5 });
  terminal.say('  [Neural +5 \u2014 scientific documentation. This will matter later.]', 'dim-text');
  terminal.blank();

  await terminal.pause();
}


async function blipReactionEmotional(terminal, state, effects, audio) {
  /** Vin checks on DENT — relationship moment. */
  await terminal.dent("I'm... functional. All systems within parameters.");
  terminal.blank();
  await wait(300);

  await terminal.dent('But Vin, my internal clock is wrong. It disagrees');
  await terminal.dentLine('with the ship chronometer, which disagrees with');
  await terminal.dentLine('the nav computer. Three timepieces. Three');
  await terminal.dentLine('different answers.');
  terminal.blank();

  await terminal.narrate("DENT's small optic flickers. Twice. His chest");
  await terminal.narrate('plate sparks once \u2014 the blue glow behind the');
  await terminal.narrate('cracks pulsing irregularly.');
  terminal.blank();

  if (state.dentRepairLevel >= 0.7) {
    await terminal.dent("I don't like this, Vin. I can't explain the");
    await terminal.dentLine("discrepancy. And I can't explain why that");
    await terminal.dentLine("mug moved. Zero-G drift doesn't account for");
    await terminal.dentLine('lateral displacement during a fold.');
    terminal.blank();
    await terminal.dent("Something happened. Something I can't log");
    await terminal.dentLine("because I don't have a category for it.");
    terminal.blank();
  } else {
    await terminal.dent('Something happened. During the fold.');
    await terminal.dentLine("I don't have the processing power to");
    await terminal.dentLine('analyze it properly. But it felt...');
    terminal.blank();
    await terminal.dent('Wrong.');
    terminal.blank();
  }

  await terminal.thought("He's scared. DENT doesn't get scared. He gets");
  await terminal.thought('cautious, he gets calculating, he gets sarcastic.');
  await terminal.thought('But this is different.');
  terminal.blank();

  await terminal.thought('Whatever that Blip was, it shook him too.');
  terminal.blank();

  state.applyDamage({ stress: -8 });
  terminal.say('  [Stress -8 \u2014 shared vulnerability with DENT]', 'dim-text');
  terminal.blank();

  await terminal.pause();
}


async function blipReactionDismiss(terminal, state, effects, audio) {
  /** Vin dismisses the Blip — denial, costs later. */
  await terminal.thought("Fold interference. The bypass wasn't perfectly");
  await terminal.thought('calibrated. Energy bleed from the Casimir coils');
  await terminal.thought('caused electromagnetic disruption across the');
  await terminal.thought("ship's systems. Simple. Explainable.");
  terminal.blank();

  await terminal.thought('The mug moved because of the gravitational');
  await terminal.thought('fluctuation. The chronometer drifted because of');
  await terminal.thought("relativistic effects near the warp bubble. DENT's");
  await terminal.thought("clock is wrong because he's running at 50%.");
  terminal.blank();

  await terminal.thought('All perfectly rational explanations.');
  terminal.blank();

  await terminal.thought("I don't know why I'm working so hard to convince");
  await terminal.thought('myself.');
  terminal.blank();

  await terminal.dent('Vin. I think we should\u2014');
  terminal.blank();

  await terminal.narrate('"It\'s fold interference, DENT. Normal. Let\'s');
  await terminal.narrate('focus on the waypoint."');
  terminal.blank();

  await terminal.dent('...');
  terminal.blank();
  await wait(300);
  await terminal.dent('Acknowledged.');
  terminal.blank();

  state.applyDamage({ stress: 8 });
  terminal.say('  [Stress +8 \u2014 denial has a cost]', 'dim-text');
  terminal.blank();

  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// SCENE 7: CHAPTER HOOK
// ═══════════════════════════════════════════════════════

async function chapterHook(terminal, state, effects, audio) {
  /**
   * SIC detection alert — they know you folded. Cliffhanger for Ch 3.
   *
   * VALIDATION:
   * - Advance: SICs are now actively hunting
   * - Agency: None (story beat — inevitable)
   * - Consequence: Ch 3 opens with pursuit
   * - Tone: Maze Runner pursuit tension
   */
  terminal.clear();

  await terminal.narrate('The waypoint is empty. No ships. No stations.');
  await terminal.narrate('No sign of whoever sent the Echo. Just dark');
  await terminal.narrate('space and distant stars.');
  terminal.blank();

  await terminal.dent('Scanning the area. No structures, no energy');
  await terminal.dentLine('signatures, no\u2014');
  terminal.blank();

  await wait(500);

  audio.play('stinger_danger');
  audio.play('sic_ping');

  // SIC DETECTION
  await effects.screenTear(2);

  await terminal.warning('\u26a0 ALERT \u2014 PROXIMITY SENSOR');
  terminal.blank();

  await terminal.dent('Vin.');
  terminal.blank();

  await terminal.dent('We have a problem.');
  terminal.blank();

  await wait(300);

  terminal.sayHtml('  <span class="c-red">\u250C\u2500 DETECTION ALERT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-red">\u2502</span>');
  terminal.sayHtml('  <span class="c-red">\u2502</span>  <span class="c-white-bright">SIC COHERENCE MONITORING ARRAY</span>');
  terminal.sayHtml('  <span class="c-red">\u2502</span>  <span class="c-dim">Has registered a fold event at this</span>');
  terminal.sayHtml('  <span class="c-red">\u2502</span>  <span class="c-dim">location. Signature: CATALOGUED.</span>');
  terminal.sayHtml('  <span class="c-red">\u2502</span>');
  terminal.sayHtml('  <span class="c-red">\u2502</span>  <span class="c-red-bright">Time to intercept: UNKNOWN</span>');
  terminal.sayHtml('  <span class="c-red">\u2502</span>  <span class="c-red-bright">SIC response level: UNKNOWN</span>');
  terminal.sayHtml('  <span class="c-red">\u2502</span>');
  terminal.sayHtml('  <span class="c-red">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await terminal.dent('The fold. They detected our fold.');
  await terminal.dentLine('Every fold creates a Blip \u2014 an energy signature');
  await terminal.dentLine('that propagates at lightspeed. The SICs have');
  await terminal.dentLine('monitoring arrays that detect these signatures.');
  terminal.blank();

  await terminal.dent('They know someone folded. They know WHERE someone');
  await terminal.dentLine('folded. And given our profile is already in their');
  await terminal.dentLine('database from the attack...');
  terminal.blank();

  await terminal.dent('They know it was us.');
  terminal.blank();

  await wait(500);

  await terminal.thought('The SICs. Of course. Every fold broadcasts your');
  await terminal.thought('position to anyone listening. And the SICs are');
  await terminal.thought('ALWAYS listening.');
  terminal.blank();

  await terminal.thought('We just painted a target on ourselves 3.2 light-');
  await terminal.thought('years from help.');
  terminal.blank();

  if (state.dentRepairLevel >= 0.7) {
    await terminal.dent("On the bright side, they'll need to fold here");
    await terminal.dentLine('themselves to reach us. And THEIR fold will');
    await terminal.dentLine('show up on OUR sensors.');
    terminal.blank();
    await terminal.dent("So we'll see them coming. We just won't be");
    await terminal.dentLine('able to outrun them.');
    terminal.blank();
  } else {
    await terminal.dent("They're coming. Question is when.");
    terminal.blank();
  }

  await terminal.narrate('The stars are quiet. The waypoint is empty.');
  await terminal.narrate('Somewhere behind us \u2014 days away, maybe hours \u2014');
  await terminal.narrate('Director Graves is reading a report that says');
  await terminal.narrate('The Vex just folded.');
  terminal.blank();

  await terminal.narrate('The hunt is on.');
  terminal.blank();

  await wait(1000);

  audio.play('stinger_cliffhanger');
  state.setFlag('sic_detected_fold', true);
  state.chapter = 3;
  await state.save();

  // End card
  terminal.blank();
  terminal.separator();
  terminal.blank();

  terminal.say('  Chapter 2: Signal from the End \u2014 Complete', 'dim-text');
  terminal.blank();

  // Stats summary
  terminal.sayHtml('<span class="c-hull">--- CHAPTER SUMMARY ----------------------------</span>');
  terminal.sayHtml(`  <span class="c-white-bright">Health:</span> ${state.health}%  <span class="c-white-bright">Neural:</span> ${state.neural}%  <span class="c-white-bright">Stress:</span> ${state.stress}%`);
  terminal.sayHtml(`  <span class="c-white-bright">Hull:</span> ${state.hull}%  <span class="c-white-bright">Null:</span> ${state.nullReserves} cells`);
  terminal.sayHtml(`  <span class="c-white-bright">DENT:</span> ${Math.round(state.dentRepairLevel * 100)}% operational`);
  terminal.sayHtml(`  <span class="c-white-bright">Fold Drive:</span> <span class="c-green">READY</span> (Stability: ${state.foldStability}%)`);
  terminal.blank();

  const method = state.getFlag('echo_investigation_method');
  const bypass = state.getFlag('bypass_install_method');
  const fold = state.getFlag('fold_execution_style');
  const reaction = state.getFlag('blip_reaction');
  terminal.say(`  Echo approach: ${method ? method.charAt(0).toUpperCase() + method.slice(1) : 'unknown'}`, 'dim-text');
  terminal.say(`  Bypass install: ${bypass ? bypass.replace(/_/g, ' ').charAt(0).toUpperCase() + bypass.replace(/_/g, ' ').slice(1) : 'unknown'}`, 'dim-text');
  terminal.say(`  Fold style: ${fold ? fold.charAt(0).toUpperCase() + fold.slice(1) : 'unknown'}`, 'dim-text');
  terminal.say(`  Blip reaction: ${reaction ? reaction.charAt(0).toUpperCase() + reaction.slice(1) : 'unknown'}`, 'dim-text');
  if (state.getFlag('found_calibration_chip')) {
    terminal.say('  Found: Optical Calibration Chip', 'dim-text');
  }
  if (state.getFlag('echo_flashback_seen')) {
    terminal.say('  Memory: First Echo reception recovered', 'dim-text');
  }
  terminal.sayHtml('  <span class="c-red-bright">SIC Status: FOLD DETECTED \u2014 PURSUIT INITIATED</span>');
  terminal.sayHtml('<span class="c-hull">------------------------------------------------</span>');
  terminal.blank();

  terminal.say('  Chapter 3 coming soon...', 'dim-text');
  terminal.blank();

  await terminal.pause('Press ENTER');
}
