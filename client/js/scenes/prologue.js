/**
 * PROLOGUE: COLD BOOT
 * Three phases — Dark, Flicker, Full Boot.
 *
 * Ported from scenes/prologue.py — complete, faithful conversion.
 */

import {
  artVoid, artVoidShapes, artOrangeBlinkOn, artOrangeBlinkOff,
  artCorridorDark, artConsoleDark, artButtonPress,
  artEmergencyCorridor, artDentEnters, artDamagedSystems,
  artBootComplete,
} from '../art/prologue-art.js';

const wait = (ms) => new Promise(r => setTimeout(r, ms));

// ═══════════════════════════════════════════════════════
// CONVENIENCE WRAPPER
// ═══════════════════════════════════════════════════════

export async function runPrologue(terminal, state, effects, audio) {
  await prologuePhase1(terminal, state, effects, audio);
  await prologuePhase2(terminal, state, effects, audio);
  await prologuePhase3(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// PHASE 1: DARK
// ═══════════════════════════════════════════════════════

export async function prologuePhase1(terminal, state, effects, audio) {
  terminal.clear();
  audio.ambient('void_loop');
  audio.play('theme_cold_boot');
  audio.play('ship_groan');

  // ─── The Wake ───
  await wait(3000);
  await terminal.typedSlow('...', { className: 'dim-text' });
  await wait(1500);
  await terminal.typedSlow('...', { className: 'dim-text' });
  await wait(2000);
  await terminal.typedSlow('...', { className: 'dim-text' });
  await wait(1500);

  terminal.blank();
  await terminal.narrateSlow('Nothing.');
  await wait(1000);
  await terminal.narrateSlow('Not darkness — nothing.');
  await terminal.narrateSlow('The distinction matters somehow, though I');
  await terminal.narrateSlow("couldn't tell you why.");
  terminal.blank();
  await wait(1500);

  await terminal.narrate('Then: a sound. Wet and rhythmic. Close.');
  terminal.blank();
  await wait(500);
  await terminal.thought('Breathing.');
  await wait(300);
  await terminal.thought("That's breathing.");
  await terminal.thought('Mine, presumably. Unless something else is');
  await terminal.thought("in here with me, in which case I'd like it");
  await terminal.thought('to introduce itself.');
  terminal.blank();
  await wait(800);

  await terminal.narrate("I'm floating. Slowly rotating — or the room");
  await terminal.narrate("is. Hard to tell the difference when you can't");
  await terminal.narrate('see either.');
  terminal.blank();
  await wait(500);

  await terminal.narrate('My back touches something solid and I drift');
  await terminal.narrate('away from it. One point of contact, then gone.');
  await terminal.thought('No gravity. No anchor. No reference.');
  terminal.blank();
  await wait(300);

  await terminal.thought('My fingers — I check. Still there. Both hands.');
  await terminal.thought('Feet? Somewhere below me. Probably.');
  await wait(500);
  await terminal.thought("Can't feel my legs.");
  await wait(500);
  await terminal.thought("That's concerning.");
  await wait(500);
  await terminal.thought('Wait — there they are. Two legs. Standard count.');
  terminal.blank();
  await wait(800);

  await terminal.narrateSlow('And my head...');
  terminal.blank();
  await wait(500);
  await terminal.thoughtSlow('Empty. Completely empty.');
  await terminal.thoughtSlow("Not the skull itself — though that's debatable —");
  await terminal.thoughtSlow("but my memory. There's nothing in it.");
  await terminal.thoughtSlow('No name. No place. No context.');
  terminal.blank();
  await wait(500);
  await terminal.thoughtSlow('Three data points: dark, floating, breathing.');
  await terminal.thoughtSlow("Not much to work with. But it's a start.");
  terminal.blank();

  // Show void art
  terminal.showArt(artVoid(), { fadeIn: true });

  await terminal.pause();

  // ─── Sensory Exploration Hub ───
  await sensoryHub(terminal, state, effects, audio);
}


// ─── Sensory Hub ───

async function sensoryHub(terminal, state, effects, audio) {
  terminal.clear();

  // Discovery tracking
  const dark = {
    eyes: 0,              // 0=blind, 1=adjusting, 2=light visible
    actions: 0,           // total actions taken
    heard_hum: false,
    heard_creaking: false,
    heard_click: false,    // DENT trying to boot
    smelled: false,
    shouted: false,
    found_surface: false,
    examined_surface: false,
    found_debris: false,
    found_viewport: false,
    micro_memory: false,
    thought_count: 0,
  };

  const valid = ['look', 'listen', 'feel', 'smell', 'think', 'shout', 'wait', 'help'];

  await terminal.thought('I need to orient myself. Figure out where I am.');
  await terminal.thought("What I have. What's around me.");
  terminal.blank();
  terminal.sayHtml(
    '<span class="c-hull">Actions:</span> ' +
    '<span class="c-white-bright">look</span><span class="c-hull"> \u2022</span> ' +
    '<span class="c-white-bright">listen</span><span class="c-hull"> \u2022</span> ' +
    '<span class="c-white-bright">feel</span><span class="c-hull"> \u2022</span> ' +
    '<span class="c-white-bright">smell</span><span class="c-hull"> \u2022</span> ' +
    '<span class="c-white-bright">think</span><span class="c-hull"> \u2022</span> ' +
    '<span class="c-white-bright">shout</span>'
  );
  terminal.blank();

  while (true) {
    dark.actions += 1;

    // Check exit: surface found AND light visible
    if (dark.found_surface && dark.eyes >= 2) {
      if (!valid.includes('push')) {
        valid.unshift('push');
        terminal.blank();
        await terminal.thought('I have a surface behind me. And a target ahead.');
        await terminal.thought('I could push off toward it.');
        terminal.blank();
        terminal.say('  [New action: push — push off the surface]', 'dim-text');
        terminal.blank();
      }
    }

    const cmd = await terminal.getCommand(valid);
    terminal.blank();

    // ─── LOOK ───
    if (cmd === 'look') {
      if (dark.eyes === 0) {
        await terminal.narrate('I open my eyes wider. Or maybe they were');
        await terminal.narrate("already open — hard to tell when there's");
        await terminal.narrate('nothing to see. The darkness is complete.');
        await terminal.narrate('Not a shadow, not a shape, not a single');
        await terminal.narrate('photon.');
        terminal.blank();
        await terminal.thought('Just the internal static of my own retinas.');
        await terminal.thought('Useless.');
        if (dark.actions >= 3) {
          dark.eyes = 1;
          terminal.blank();
          await wait(500);
          await terminal.narrate('Wait.');
          await wait(300);
          await terminal.narrate('Something is — not light, exactly. My eyes');
          await terminal.narrate('are adjusting. The rods and cones catching');
          await terminal.narrate('up. Shapes. The faintest suggestion of');
          await terminal.narrate('geometry. Hard edges where the dark is');
          await terminal.narrate('slightly... less dark.');
          terminal.blank();
          await terminal.thought('As if the space around me is acquiring');
          await terminal.thought("detail it didn't have before.");
          terminal.showArt(artVoidShapes(), { fadeIn: true });
        }
      } else if (dark.eyes === 1) {
        await terminal.narrate('Shapes in the dark. Walls, maybe. The');
        await terminal.narrate('suggestion of a corridor stretching away');
        await terminal.narrate('from me in one direction. Nothing I can');
        await terminal.narrate('identify, but the space has depth now.');
        terminal.blank();
        await terminal.narrate("It's not infinite void. It's enclosed.");
        terminal.blank();
        if (dark.actions >= 5 || dark.found_surface) {
          dark.eyes = 2;
          await wait(500);
          await terminal.narrate('And there — far ahead, or far in some');
          await terminal.narrate('direction. A light.');
          terminal.blank();
          await wait(300);
          await terminal.highlight('Orange.');
          terminal.blank();
          await terminal.narrate('Blinking. Slow and steady. Like a');
          await terminal.narrate('heartbeat.');
          terminal.blank();
          await terminal.thought('The only thing in this void that seems');
          await terminal.thought("to have any idea what's going on.");
          terminal.showArt(artOrangeBlinkOn());
        }
      } else {
        await terminal.narrate('The orange blink. Still far away — maybe');
        await terminal.narrate('ten meters. Under it, I can almost make');
        await terminal.narrate('out a shape. Something flat. Instruments?');
        await terminal.narrate('A console?');
        terminal.blank();
        if (dark.found_surface) {
          await terminal.thought('Between me and it: empty air. And');
          await terminal.thought('whatever else is floating around in here.');
        } else {
          await terminal.thought('I need to get to it. But first I need');
          await terminal.thought('something to push off of.');
        }
      }
    }

    // ─── LISTEN ───
    else if (cmd === 'listen') {
      if (!dark.heard_hum) {
        await terminal.narrate('I hold my breath and listen.');
        terminal.blank();
        await wait(500);
        await terminal.narrate("The silence isn't silent. There's a hum —");
        await terminal.narrate('deep, mechanical, somewhere below me. Or');
        await terminal.narrate('above. Or beside. Without gravity as a');
        await terminal.narrate('reference, direction is philosophical.');
        terminal.blank();
        await terminal.thought('Something is still running. Barely.');
        await terminal.thought("Whatever this place is, it isn't completely");
        await terminal.thought('dead.');
        dark.heard_hum = true;
      } else if (!dark.heard_creaking) {
        await terminal.narrate('More. Under the hum: metal creaking. The');
        await terminal.narrate('long, slow groan of a structure under');
        await terminal.narrate('stress. Something shifting in the walls.');
        terminal.blank();
        await terminal.narrate('And underneath that — a drip. Liquid');
        await terminal.narrate("drifting somewhere in the dark. Not fast.");
        await terminal.narrate('Floating, like me.');
        terminal.blank();
        await terminal.thought('The ship — because this is a ship, I\'m');
        await terminal.thought('almost certain now — is holding itself');
        await terminal.thought('together. But not enthusiastically.');
        dark.heard_creaking = true;
      } else if (!dark.heard_click) {
        await terminal.narrate('I focus deeper. Past the hum, past the');
        await terminal.narrate('creaking. There.');
        terminal.blank();
        await wait(300);
        await terminal.narrate('Intermittent. A click. Then nothing. Then');
        await terminal.narrate('another click. Something trying to start.');
        await terminal.narrate('Failing. Trying again. Patient about it,');
        await terminal.narrate('in the way that only machines are patient.');
        terminal.blank();
        await terminal.thought('It\'s coming from the same direction as');
        await terminal.thought('that hum. Ahead of me. Toward the light,');
        await terminal.thought("if I've found one.");
        dark.heard_click = true;
        state.setFlag('heard_dent_clicking', true);
      } else {
        await terminal.narrate('The same sounds. The hum. The creaking.');
        await terminal.narrate("The clicking. A ship's lullaby for someone");
        await terminal.narrate("who can't remember being born.");
      }
    }

    // ─── FEEL ───
    else if (cmd === 'feel') {
      if (!dark.found_surface) {
        await terminal.narrate('I stretch my hand out. Cold air. Nothing');
        await terminal.narrate("within arm's reach — I've drifted since");
        await terminal.narrate('my back touched that surface.');
        terminal.blank();
        await terminal.narrate('I reach the other direction. Further...');
        await terminal.narrate('further...');
        terminal.blank();
        await wait(300);
        await terminal.narrate('Contact. Metal. Flat panel. Frost on the');
        await terminal.narrate('surface — fine ice crystals under my');
        await terminal.narrate("fingertips. The kind of frost that forms");
        await terminal.narrate("when something's been cold for a long time.");
        terminal.blank();
        dark.found_surface = true;
        await wait(300);
        // Micro-memory flash
        await terminal.narrate('For a fraction of a second —');
        terminal.blank();
        await terminal.flashbackVivid('Cold. A different cold. Outside.');
        await terminal.flashbackVivid('Night sky. Stars scattered across —');
        terminal.blank();
        await terminal.narrate('Gone. Like a signal dropping out. Whatever');
        await terminal.narrate("that was, it's over.");
        terminal.blank();
        await terminal.thought('My hand is shaking.');
        dark.micro_memory = true;
        state.setFlag('micro_memory_dark', true);
        // Eye bump if not already adjusting
        if (dark.eyes === 0) {
          dark.eyes = 1;
        }
      } else if (!dark.examined_surface) {
        await terminal.narrate('I run my fingers along the panel. Seams');
        await terminal.narrate('where plates meet. Rivets. Something');
        await terminal.narrate('stamped into the metal — a number?');
        await terminal.narrate("Letters? Can't read it in the dark.");
        terminal.blank();
        await terminal.thought("But it's a surface. Solid. Something to");
        await terminal.thought('push against.');
        dark.examined_surface = true;
      } else if (!dark.found_debris) {
        await terminal.narrate('I wave my other hand through the air.');
        await terminal.narrate('Something brushes my knuckles — small,');
        await terminal.narrate('floating past. I snatch at it.');
        terminal.blank();
        await terminal.narrate('Got it. Hard. Cold. A thread pattern.');
        await terminal.narrate('A bolt. Loose and drifting, just like me.');
        terminal.blank();
        await terminal.thought('Debris. Whatever happened here was');
        await terminal.thought('violent enough to shake this place apart.');
        dark.found_debris = true;
        state.setFlag('caught_debris', true);
      } else if (!dark.found_viewport) {
        await terminal.narrate('I reach to my left. Not metal this time —');
        await terminal.narrate('glass. Smooth. Cold. Frozen condensation');
        await terminal.narrate('on the inside, tiny crystals my fingers');
        await terminal.narrate('map like braille.');
        terminal.blank();
        await terminal.narrate('A viewport. On the other side of this');
        await terminal.narrate('glass: nothing. Or everything. Impossible');
        await terminal.narrate('to tell which.');
        terminal.blank();
        await terminal.thought("But I know what this is now. A ship.");
        await terminal.thought("I'm on a ship.");
        dark.found_viewport = true;
        state.setFlag('found_viewport_dark', true);
      } else {
        await terminal.narrate('Everything is cold. Metal, glass, and');
        await terminal.narrate("frost. I'm running out of new things to");
        await terminal.narrate('touch in the dark.');
      }
    }

    // ─── SMELL ───
    else if (cmd === 'smell') {
      if (!dark.smelled) {
        await terminal.narrate('Ozone. That sharp, electric bite — the');
        await terminal.narrate('smell of something that burned recently');
        await terminal.narrate('and expensively. Under it: recycled air.');
        await terminal.narrate("Stale. The kind of air that's been through");
        await terminal.narrate('the same filters too many times.');
        terminal.blank();
        await terminal.thought('Burnt circuits and old atmosphere.');
        await terminal.thought("Wherever I am, the ventilation is working");
        await terminal.thought('just well enough to keep me alive. And not');
        await terminal.thought('a micron more.');
        dark.smelled = true;
      } else {
        await terminal.narrate("Same. Ozone and old air. Not getting any");
        await terminal.narrate('fresher.');
      }
    }

    // ─── THINK ───
    else if (cmd === 'think') {
      dark.thought_count += 1;
      if (dark.thought_count === 1) {
        await terminal.thought('I try. I reach into the blank space where');
        await terminal.thought('a life should be and pull.');
        terminal.blank();
        await terminal.thought('Name? Nothing. Faces? Nothing.');
        await terminal.thought('Profession?');
        terminal.blank();
        await wait(300);
        await terminal.thought('... Something twitches. The ghost of a');
        await terminal.thought('ghost. I think in systems. In measurements.');
        await terminal.thought('In cold, structured analysis of problems.');
        terminal.blank();
        await terminal.thought("But the problem I'm analyzing is: who the");
        await terminal.thought('hell am I? And the answer is: unknown.');
        await terminal.thought('How very unhelpful.');
      } else if (dark.thought_count === 2) {
        await terminal.thought('Still nothing. The void in my memory is');
        await terminal.thought('absolute. But the way my mind works —');
        await terminal.thought('cataloguing inputs, mapping temperature');
        await terminal.thought('differentials, counting seconds between');
        await terminal.thought("the clicks — that's data.");
        terminal.blank();
        await terminal.thought('I\'m someone who thinks in data.');
        await terminal.thought("I just don't know who.");
      } else {
        await terminal.thought("I try one more time. Hard. Like squeezing");
        await terminal.thought('blood from a stone, except the stone is my');
        await terminal.thought('entire identity.');
        terminal.blank();
        await terminal.thought('Nothing. Fine. Solve the immediate problem.');
        await terminal.thought('Floating. Dark. Work with what I have.');
      }
    }

    // ─── SHOUT ───
    else if (cmd === 'shout') {
      if (!dark.shouted) {
        await terminal.narrate('"Hello?"');
        terminal.blank();
        await wait(800);
        await terminal.narrate('My voice hits metal and comes back. Tight.');
        await terminal.narrate("Close. The echo says: enclosed space.");
        await terminal.narrate('Maybe twenty meters long, five wide. A');
        await terminal.narrate("corridor. The 'hello' bounces twice before");
        await terminal.narrate('dying.');
        terminal.blank();
        await terminal.narrate('No one answers.');
        terminal.blank();
        await terminal.thought("Didn't think they would. But it was worth");
        await terminal.thought('eliminating the possibility.');
        dark.shouted = true;
        state.setFlag('shouted_in_dark', true);
      } else {
        await terminal.narrate('"Anyone?"');
        terminal.blank();
        await wait(500);
        await terminal.narrate('Same echo. Same silence.');
        await terminal.thought("Same disappointment. Which I shouldn't");
        await terminal.thought("feel, since I didn't expect an answer.");
        await terminal.thought('And yet.');
      }
    }

    // ─── WAIT ───
    else if (cmd === 'wait') {
      if (dark.eyes < 2) {
        await terminal.narrate("I float. Time passes — I think. There's");
        await terminal.narrate('no clock in the dark. Just the breathing');
        await terminal.narrate('and the hum and the slow rotation of a');
        await terminal.narrate('body in zero gravity.');
        terminal.blank();
        await terminal.thought('Productive, this is not.');
        // Passive eye adjustment
        if (dark.actions >= 4 && dark.eyes === 0) {
          dark.eyes = 1;
          terminal.blank();
          await wait(500);
          await terminal.narrate('Although — my eyes. Something is');
          await terminal.narrate('changing. Shapes forming at the edges.');
          await terminal.narrate("The dark isn't quite as absolute as it");
          await terminal.narrate('was.');
        }
      } else {
        await terminal.narrate('The blink continues. Orange. Steady.');
        await terminal.narrate("Patient in a way I'm choosing not to be.");
      }
    }

    // ─── HELP ───
    else if (cmd === 'help') {
      let cmds = 'look, listen, feel, smell, think, shout, wait';
      if (valid.includes('push')) {
        cmds += ', push';
      }
      terminal.say(`I can: ${cmds}`, 'dim-text');
    }

    terminal.blank();

    // ─── PUSH (exit to navigation) ───
    if (cmd === 'push' && dark.found_surface && dark.eyes >= 2) {
      break;
    }
  }

  // Transition to navigation
  await zeroGNavigate(terminal, state, effects, audio, dark);
}


// ─── Zero-G Navigate ───

async function zeroGNavigate(terminal, state, effects, audio, dark) {
  terminal.clear();

  await terminal.narrate('I orient myself. The frost-covered panel is');
  await terminal.narrate('behind me. The blinking orange light is ahead.');
  await terminal.narrate('Between: ten meters of cold, dark, empty air.');
  terminal.blank();
  await wait(300);

  await terminal.thought("Newton's third law. Equal and opposite reaction.");
  await terminal.thought('I push the wall, the wall pushes me. Simple');
  await terminal.thought('physics. The only kind I seem to remember.');
  terminal.blank();

  await terminal.narrate('I plant both palms flat against the frozen');
  await terminal.narrate('panel, brace, and shove.');
  terminal.blank();
  await wait(500);

  await terminal.narrate('Silence. No whoosh, no rush of air. Just my');
  await terminal.narrate('body leaving the wall in absolute quiet. Slow.');
  await terminal.narrate('A glacial drift through cold, dark space.');
  terminal.blank();
  await wait(800);

  await terminal.narrate("I'm spinning. Just slightly. The walls trade");
  await terminal.narrate('places — what might be ceiling becomes floor');
  await terminal.narrate('becomes ceiling. The terms are meaningless');
  await terminal.narrate("without gravity, but my inner ear hasn't");
  await terminal.narrate('gotten the memo.');
  terminal.blank();

  await terminal.thought('The orange blink rotates around me. Or I');
  await terminal.thought('around it. Same result, different frame of');
  await terminal.thought('reference.');
  terminal.blank();

  terminal.showArt(artCorridorDark());

  await terminal.pause();
  terminal.clear();

  // ─── Debris field ───
  await terminal.narrate('Something clips my shoulder. Light. Drifting,');
  await terminal.narrate('like me. Another object brushes my forearm —');
  await terminal.narrate('a piece of casing? A panel fragment?');
  terminal.blank();
  await terminal.narrate('Things are floating all around me. Whatever');
  await terminal.narrate('hit this place shook everything loose. I\'m');
  await terminal.narrate('drifting through a field of wreckage I can');
  await terminal.narrate('barely see.');
  terminal.blank();

  await wait(300);
  await terminal.narrate('A heavier piece of debris — something with');
  await terminal.narrate('edges — tumbles past my face. Close enough');
  await terminal.narrate('to feel the air displacement.');
  terminal.blank();

  await terminal.thought('I need to stop this spin. Grab something.');
  await terminal.thought('Anything with a fixed position.');
  terminal.blank();

  // ─── Cable encounter ───
  let choice = await terminal.showChoices([
    ['Reach out — grab at anything.', ''],
    ['Tuck in. Wait for something to come to me.', ''],
  ]);

  if (choice === 1) {
    await terminal.narrate('I stretch my arms wide. My left hand catches');
    await terminal.narrate('nothing. My right finds something thin and');
    await terminal.narrate('taut — a cable, running along what might be');
    await terminal.narrate('the wall.');
    terminal.blank();
    await terminal.narrate('I grab it. The spin arrests. The debris');
    await terminal.narrate("field settles around me like snow in a globe");
    await terminal.narrate("that's stopped shaking.");
  } else {
    await terminal.narrate('I pull my arms in. Protect my head. Float.');
    terminal.blank();
    await wait(500);
    await terminal.narrate('Something catches my sleeve — thin, flexible.');
    await terminal.narrate('A cable, drifting loose from the wall. I');
    await terminal.narrate('close my hand around it before it slips away.');
    terminal.blank();
    await terminal.narrate('The spin slows. Stops. The debris field');
    await terminal.narrate('settles.');
  }

  terminal.blank();
  await wait(300);

  await terminal.narrate("I'm hanging in the middle of a corridor. I'm");
  await terminal.narrate('sure of it now — walls on either side, close');
  await terminal.narrate('enough to sense. The cable runs the length of');
  await terminal.narrate('it, and at the far end:');
  terminal.blank();
  await terminal.narrate('The blink. Closer now. Five meters, maybe less.');
  await terminal.narrate('And under it — a console. Dark glass. Dead');
  await terminal.narrate('instruments.');
  terminal.blank();

  await terminal.thought("The ship's main terminal. I think.");
  await wait(300);
  await terminal.thought("How do I know that? I don't know my own name");
  await terminal.thought('but I know what a nav console looks like.');
  await terminal.thought('Great. Thanks, brain.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  // ─── Pull along the cable ───
  await terminal.narrate('I pull myself along the cable. Hand over hand.');
  await terminal.narrate('The frost bites my palms. Each pull brings the');
  await terminal.narrate('blink closer — larger — more defined.');
  terminal.blank();

  await terminal.narrate('Halfway there, my foot catches something. A');
  await terminal.narrate('panel, torn half-loose from the wall, floating');
  await terminal.narrate('diagonally across the corridor like a door');
  await terminal.narrate('that forgot how to close.');
  terminal.blank();

  choice = await terminal.showChoices([
    ['Squeeze through the gap.', ''],
    ['Push the panel aside.', ''],
  ]);

  if (choice === 1) {
    await terminal.narrate('I let go of the cable and duck through the');
    await terminal.narrate("gap. The panel's edge scrapes my back — cold");
    await terminal.narrate("metal through whatever I'm wearing. Then my");
    await terminal.narrate('hand finds the cable on the other side.');
    terminal.blank();
    await terminal.thought('Through. Graceful, this is not.');
  } else {
    await terminal.narrate('I shove the panel. It drifts backward —');
    await terminal.narrate('slowly, reluctantly. I pull through the');
    await terminal.narrate('widened gap before it floats back.');
    terminal.blank();
    await terminal.thought("Newton's third again. Everything pushes back.");
  }

  terminal.blank();
  await wait(300);

  // ─── Final approach ───
  await terminal.narrate('Close now. Three meters. Two.');
  terminal.blank();
  await terminal.narrate('The blink fills my vision — or at least the');
  await terminal.narrate("part of my vision that isn't darkness.");
  terminal.blank();
  await terminal.narrate('My hands find glass. A screen. Cold and dead.');
  await terminal.narrate('Below it, instruments I can feel but not read.');
  await terminal.narrate('And under all of it:');
  terminal.blank();
  await terminal.narrate('That blinking orange light.');
  terminal.blank();
  await terminal.highlight('One button. Emergency power.');
  terminal.blank();
  await wait(300);

  terminal.showArt(artConsoleDark());

  if (dark.micro_memory) {
    await terminal.thought('The last time I touched something in the dark,');
    await terminal.thought('I got a flash of something. Stars. A sky.');
    await terminal.thought('This might bring more back.');
  } else {
    await terminal.thought('I have no idea what happens when I press this.');
  }

  await terminal.thought("But I'm floating in the dark with no memory,");
  await terminal.thought("so the bar for 'good idea' is historically low.");
  terminal.blank();

  // ─── The Button ───
  await consoleChoice(terminal, state, effects, audio, dark);
}


// ─── Console Choice ───

async function consoleChoice(terminal, state, effects, audio, dark) {
  let choice = await terminal.showChoices([
    ['Press it.', 'Enough darkness.'],
    ['Wait. Listen first.', ''],
  ]);

  if (choice === 2) {
    state.setFlag('listened_first', true);
    await terminal.narrate('I hold still. Breathing.');
    await terminal.thought('Listen first, press mysterious buttons second.');
    await terminal.thought('That feels like a principle I used to have.');
    terminal.blank();

    if (dark.heard_click) {
      await terminal.narrate("The clicking I heard earlier — it's louder");
      await terminal.narrate('here. Coming from the console itself. Not');
      await terminal.narrate('through speakers. Through the hardware.');
      await terminal.narrate('Inside the machine, something is fighting');
      await terminal.narrate('to start.');
    } else {
      await terminal.narrate('In the silence — something. A vibration');
      await terminal.narrate('through the console itself. Not from');
      await terminal.narrate('speakers — through the hardware.');
    }

    terminal.blank();
    await wait(300);
    await terminal.narrate('Then a voice. Faint. Garbled. Pushed through');
    await terminal.narrate('corrupted circuits:');
    terminal.blank();
    await terminal.typedSlow('"...d-d-diagnostic... pilot... det\u2014"', { className: 'c-cyan' });
    terminal.blank();
    await terminal.narrate('It dies. Silence.');
    terminal.blank();
    await terminal.thought('Something in this machine is trying to');
    await terminal.thought('reach me.');
    await terminal.thought("That's either very good or very bad.");
    terminal.blank();
    await terminal.pause();
  }

  // Press the button
  terminal.clear();
  await terminal.narrate('I press it.');
  terminal.blank();

  terminal.showArt(artButtonPress());

  await wait(1000);
  await terminal.thought('Nothing. For a full, generous second: nothing');
  await terminal.thought('at all. And I have time to think: well.');
  await terminal.thought('Anticlimactic.');
  terminal.blank();
  await wait(1500);
  await terminal.narrate('Then \u2014');
  await wait(500);
}


// ═══════════════════════════════════════════════════════
// PHASE 2: FLICKER
// ═══════════════════════════════════════════════════════

export async function prologuePhase2(terminal, state, effects, audio) {
  state.phase = 2;
  audio.ambient('ship_damaged_idle');
  audio.play('theme_emergency_power');
  audio.play('emergency');

  // Boot effect
  await effects.screenTear(2);
  await wait(200);
  await effects.screenTear(3);
  terminal.blank();

  terminal.showArt(artEmergencyCorridor());

  await terminal.narrate('Red light. Everywhere. Emergency strips along the');
  await terminal.narrate('ceiling flicker on. The whole corridor goes crimson.');
  terminal.blank();
  await wait(300);

  await terminal.narrate('I can see the ship now. Maybe eight meters bow to');
  await terminal.narrate('stern. A coffin with ambition. Everything is');
  await terminal.narrate('floating — tools, debris, a cracked display panel');
  await terminal.narrate('drifting past my face.');
  terminal.blank();
  await terminal.thought('Okay. I\'m on a ship. A small, wrecked ship.');
  await terminal.thought('Something hit us hard enough to kill the gravity');
  await terminal.thought('and most of the power. And my memory, apparently.');
  terminal.blank();

  await wait(500);

  // Damaged system panel
  damagedSystemPanel(terminal);
  terminal.blank();

  await terminal.pause();

  // DENT boots up
  await dentBootSequence(terminal, state, effects, audio);

  // Exploration phase
  await explorationPhase(terminal, state, effects, audio);
}


// ─── Damaged System Panel ───

function damagedSystemPanel(terminal) {
  terminal.showArt(artDamagedSystems());
}


// ─── DENT Boot Sequence ───

async function dentBootSequence(terminal, state, effects, audio) {
  terminal.clear();
  audio.play('dent_boot');

  await terminal.narrate('Something clangs in the corridor. Metal on metal.');
  terminal.blank();
  await wait(500);

  await terminal.narrate('A shape drifts through the doorway. Tall. Thin.');
  await terminal.narrate('One arm grabbing the frame to steer itself. The');
  await terminal.narrate('other arm — not quite the same arm. Wrong parts.');
  terminal.blank();

  terminal.showArt(artDentEnters(), { fadeIn: true });

  await terminal.narrate('An orange plate on its chest, half the letters');
  await terminal.narrate('scratched off. D.E.N.T.');
  terminal.blank();
  await wait(500);

  await terminal.dentSystem('DESIGNATION: D.E.N.T.');
  await terminal.dentSystem('DYNAMIC ENGINEERING & NAVIGATION TOOLKIT');
  await terminal.dentSystem('STATUS: [EXTREMELY POOR]');
  terminal.blank();
  await wait(300);

  await terminal.dentGlitch('Pilot detected. Vitals... unstable.');
  terminal.blank();
  await wait(500);

  // First question
  let choice = await terminal.showChoices([
    '"What are you?"',
    '"Where am I?"',
    '"Who am I?"',
  ]);

  if (choice === 1) {
    await terminal.dent("I'm DENT. Your--");
    await terminal.dentGlitch('██ partner. Mech--anic.');
    await terminal.dentLine('Navigator. Occasionally... useful.');
    terminal.blank();
    await terminal.thought("Partner. That word feels right but I don't");
    await terminal.thought('know why.');
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dentGlitch("You're on a ship.");
    terminal.blank();
    await wait(300);
    await terminal.dentSystem('PARTIAL MEMORY RECOVERED.');
    terminal.sayHtml('> Ship designation: <span class="c-white-bright">THE VEX</span>', 'dent-line');
    terminal.blank();
    await terminal.dent('The Vex. Small. Fast. Currently broken.');
    await terminal.dentLine('Like me.');
    terminal.blank();
  } else if (choice === 3) {
    await terminal.dent('Good question.');
    terminal.blank();
    await wait(500);
    await terminal.dentSystem('PARTIAL MEMORY RECOVERED.');
    terminal.sayHtml('> Pilot designation: <span class="c-white-bright">VIN</span>', 'dent-line');
    terminal.blank();
    await terminal.dent("Vin. That's you. Probably.");
    await terminal.dentLine('You look like a Vin.');
    terminal.blank();
  }

  state.setFlag('dent_online', true);

  // Second question
  choice = await terminal.showChoices([
    '"What happened to us?"',
    '"Why can\'t I remember anything?"',
    '"What\'s wrong with the ship?"',
  ]);

  if (choice === 1) {
    await terminal.dent("I don't know. My memory is...");
    terminal.blank();
    await wait(300);
    await terminal.dentGlitch('Corrupted. Fragmented. I have pieces.');
    await terminal.dentLine("Something hit us. Hard. That's all I've got.");
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent('That makes two of us.');
    await terminal.dentLine('Whatever happened, it wiped both—');
    await terminal.dentGlitch('—RROR: CORE INTEGRITY 31%—');
    await terminal.dentLine('...both of us. My memory core. Your brain.');
    terminal.blank();
    await terminal.dent('I have fragments. You probably do too.');
    await terminal.dentLine('Somewhere in there.');
    terminal.blank();
  } else if (choice === 3) {
    await terminal.dent("What isn't wrong with it?");
    terminal.blank();
    await wait(300);
    await terminal.dent('Sensors are down. Fold drive is dead.');
    await terminal.dentLine("Gravity drive is offline — you may have");
    await terminal.dentLine('noticed the floating.');
    await terminal.dentLine('Life support is running on fumes.');
    terminal.blank();
  }

  // Fill in what wasn't covered yet
  if (!state.getFlag('knows_name')) {
    terminal.sayHtml('> Pilot designation: <span class="c-white-bright">VIN</span>', 'dent-line');
    await terminal.dent("That's your name, by the way. Vin.");
    terminal.blank();
  }

  state.setFlag('knows_name', true);

  // Third question — what now
  choice = await terminal.showChoices([
    '"What do we do?"',
    '"I need a minute."',
  ]);

  if (choice === 1) {
    await terminal.dent("We look around. Figure out what we've got.");
    await terminal.dentLine('The ship has five sections. Most of them');
    await terminal.dentLine("are a mess, but there might be something");
    await terminal.dentLine('useful. Something to jog your memory.');
    terminal.blank();
    await terminal.dent("Or mine. I'll take either at this point.");
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent('Take your time.');
    terminal.blank();
    await wait(1000);
    await terminal.dent("...Life support won't, though. Just saying.");
    terminal.blank();
  }

  await terminal.pause();
}


// ─── Exploration Phase ───

async function explorationPhase(terminal, state, effects, audio) {
  terminal.clear();

  await terminal.dent('The ship has five sections I can partially—');
  await terminal.dentGlitch('█ detect.');
  await terminal.dentLine('I recommend looking around. Examine anything');
  await terminal.dentLine('that looks... important.');
  await terminal.dentLine('Might jog something loose in that head of yours.');
  terminal.blank();

  const rooms = {
    bridge: roomBridge,
    engineering: roomEngineering,
    quarters: roomQuarters,
    cargo: roomCargo,
    sensors: roomSensors,
  };

  const roomNames = {
    bridge: 'Bridge',
    engineering: 'Engineering Bay',
    quarters: 'Quarters',
    cargo: 'Cargo Hold',
    sensors: 'Sensor Array',
  };

  const roomVisited = { bridge: true, engineering: false, quarters: false, cargo: false, sensors: false };

  terminal.vexMap(state.currentRoom);

  // Show bridge first
  await rooms.bridge(terminal, state, effects, audio, true);

  let actionsSinceFlashback = 0;

  while (state.flashbackCount < 4) {
    // Build dynamic action menu based on current room
    const actions = [];
    const descs = [];
    const actionKeys = [];

    // Examine objects in current room
    const roomObjects = getRoomObjects(state);
    for (const [objKey, objLabel, objDesc] of roomObjects) {
      actions.push(`Examine: ${objLabel}`);
      descs.push(objDesc);
      actionKeys.push(['examine', objKey]);
    }

    // Navigation to other rooms
    for (const roomKey of Object.keys(rooms)) {
      if (roomKey !== state.currentRoom) {
        const visited = roomVisited[roomKey] ? 'visited' : 'unexplored';
        actions.push(`Go to ${roomNames[roomKey]}`);
        descs.push(visited);
        actionKeys.push(['go', roomKey]);
      }
    }

    // Utility actions
    actions.push('Look around');
    descs.push('Re-examine the current room');
    actionKeys.push(['look', null]);

    actions.push('Inventory');
    descs.push(`${state.inventory.length} items`);
    actionKeys.push(['inventory', null]);

    actions.push('Status');
    descs.push(`Flashbacks: ${state.flashbackCount}/${state.totalFlashbacks}`);
    actionKeys.push(['status', null]);

    actions.push('Map');
    descs.push('The Vex layout');
    actionKeys.push(['map', null]);

    const idx = await terminal.arrowMenu(actions, descs);
    const [actionType, actionTarget] = actionKeys[idx];

    if (actionType === 'go') {
      state.currentRoom = actionTarget;
      const first = !roomVisited[actionTarget];
      roomVisited[actionTarget] = true;
      terminal.clear();
      terminal.vexMap(state.currentRoom);
      await rooms[actionTarget](terminal, state, effects, audio, first);
      await state.save();
      actionsSinceFlashback += 1;
    }

    else if (actionType === 'examine') {
      const fbBefore = state.flashbackCount;
      await handleExamine(terminal, state, effects, audio, actionTarget);
      if (state.flashbackCount > fbBefore) {
        await state.save();
        actionsSinceFlashback = 0;
      } else {
        actionsSinceFlashback += 1;
      }
    }

    else if (actionType === 'look') {
      await rooms[state.currentRoom](terminal, state, effects, audio, false);
    }

    else if (actionType === 'inventory') {
      showInventory(terminal, state);
    }

    else if (actionType === 'status') {
      terminal.statusPanel(state);
      terminal.blank();
      terminal.say(`Flashbacks recovered: ${state.flashbackCount}/${state.totalFlashbacks}`, 'dim-text');
      terminal.blank();
    }

    else if (actionType === 'map') {
      terminal.vexMap(state.currentRoom);
    }

    // DENT nudges if player hasn't found a flashback in a while
    if (actionsSinceFlashback === 4) {
      terminal.blank();
      const nudgeHints = [];
      if (!state.flashbacks.photo_frame) nudgeHints.push('quarters');
      if (!state.flashbacks.burn_marks) nudgeHints.push('bridge');
      if (!state.flashbacks.torquer_case) nudgeHints.push('cargo hold');
      if (!state.flashbacks.recording) nudgeHints.push('sensor array');
      if (!state.flashbacks.nav_console) nudgeHints.push('bridge');

      if (state.flashbackCount === 0) {
        await terminal.dent('Vin. Try examining things more closely.');
        await terminal.dentLine('We need to piece together what happened.');
        await terminal.dentLine("Look at what's around you.");
        terminal.blank();
      } else if (state.flashbackCount < 4) {
        const remaining = 4 - state.flashbackCount;
        await terminal.dent(`We're still missing pieces. ${remaining} more`);
        await terminal.dentLine('and I think I can put this together.');
        if (nudgeHints.length > 0) {
          await terminal.dentLine(`Try checking the ${nudgeHints[0]}.`);
        }
        terminal.blank();
      }
    }
  }

  // Enough flashbacks — trigger Phase 3
  terminal.blank();
  terminal.separator();
  terminal.blank();
  await terminal.dent("Vin. Hold on. Something's happening.");
  await terminal.dentLine('My memory core is rebuilding. I\'m getting...');
  await terminal.dentLine("I'm getting a lot back at once.");
  terminal.blank();
  await terminal.pause();
}


// ═══════════════════════════════════════════════════════
// ROOM DESCRIPTIONS
// ═══════════════════════════════════════════════════════

async function roomBridge(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    await terminal.narrate("The bridge. If you can call it that — it's barely");
    await terminal.narrate('bigger than a closet. One seat, bolted to the floor.');
    await terminal.narrate('Displays surround it in a half-circle, all dead');
    await terminal.narrate('except for the emergency console I just woke up.');
    terminal.blank();
  }

  await terminal.narrate('I can see:');
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">The viewport</span> <span class="c-dim">— cracked, with strange burn marks</span>');
  if (!state.getFlag('nav_repaired')) {
    terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">The nav console</span> <span class="c-dim">— dark, possibly repairable</span>');
  } else {
    terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">The nav console</span> <span class="c-dim">— online, showing star charts</span>');
  }
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">The pilot seat</span> <span class="c-dim">— empty, restraints hanging loose</span>');
  terminal.blank();
}


async function roomEngineering(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    await terminal.narrate('DENT pushes off the corridor wall and drifts in');
    await terminal.narrate('ahead of me. His bad arm clips the doorframe.');
    terminal.blank();
    await terminal.dent('Engineering. Where I keep all the things that');
    await terminal.dentLine("could explode. Don't touch the blue thing.");
    await terminal.narrate('He pauses. His large optic rotates, scanning.');
    await terminal.dentLine("Actually, I can't remember which thing is blue.");
    await terminal.dentLine("Don't touch anything.");
    terminal.blank();
  }

  await terminal.narrate('The engineering bay is gutted. Three access panels');
  await terminal.narrate('ripped clean off their hinges, coolant conduit');
  await terminal.narrate('dangling from exposed bus bars. The fold drive sits');
  await terminal.narrate('in the center — a dark, silent machine.');
  terminal.blank();

  await terminal.narrate('I can see:');
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">The fold drive</span> <span class="c-dim">— massive, completely dead</span>');
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">The null energy core</span> <span class="c-dim">— sealed, nearly empty</span>');
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">A workbench</span> <span class="c-dim">— covered in tools and schematics</span>');
  terminal.blank();
}


async function roomQuarters(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    await terminal.narrate('DENT misjudges the hatch and bumps his head on');
    await terminal.narrate("the frame. Doesn't acknowledge it.");
    terminal.blank();
    await terminal.dent('Your quarters. Cozy. By which I mean');
    await terminal.dentLine('extremely small. You were never much of a');
    await terminal.dentLine('decorator.');
    terminal.blank();
  }

  await terminal.narrate('A bunk. A shelf. A small desk welded to the wall.');
  await terminal.narrate('Personal effects are floating everywhere — the');
  await terminal.narrate('gravity failure turned this room into a snow globe.');
  terminal.blank();

  await terminal.narrate('I can see:');
  if (!state.flashbacks.photo_frame) {
    terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">A photo frame</span> <span class="c-dim">— cracked, floating near the bunk</span>');
  } else {
    terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-dim">A photo frame — cracked (examined)</span>');
  }
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">A small desk</span> <span class="c-dim">— with scattered notes</span>');
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">A storage locker</span> <span class="c-dim">— personal items</span>');
  terminal.blank();
}


async function roomCargo(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    await terminal.narrate('DENT grabs a floating crate with his good arm.');
    await terminal.narrate('His bad arm twitches, knocks a second one into');
    await terminal.narrate('the wall.');
    terminal.blank();
    await terminal.dent("Cargo hold. Most of it's been tossed around.");
    await terminal.narrate('He glances at the crate he just hit.');
    await terminal.dentLine('...Some of that was already like this.');
    terminal.blank();
  }

  await terminal.narrate('Crates and containers drift in the hold. Most are');
  await terminal.narrate('cracked open from the impact — whatever hit us');
  await terminal.narrate('hit hard. One case stands out, still mag-locked');
  await terminal.narrate('to the wall. Reinforced. Important.');
  terminal.blank();

  await terminal.narrate('I can see:');
  if (!state.flashbacks.torquer_case) {
    terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">A reinforced case</span> <span class="c-dim">— mag-locked to the wall</span>');
  } else {
    terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-dim">The Torquer case — open (examined)</span>');
  }
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">Scattered crates</span> <span class="c-dim">— supplies, mostly ruined</span>');
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">A cargo manifest</span> <span class="c-dim">— digital, partially readable</span>');
  terminal.blank();
}


async function roomSensors(terminal, state, effects, audio, firstVisit = false) {
  if (firstVisit) {
    await terminal.narrate('DENT grabs the doorframe and stops himself.');
    await terminal.narrate('He stares at the antenna housing for a moment.');
    terminal.blank();
    await terminal.dent('The sensor array. Used to be connected to my');
    await terminal.dentLine('neural core. I could hear cosmic background');
    await terminal.dentLine('radiation like a heartbeat.');
    await terminal.dentLine("Now it's just quiet.");
    terminal.blank();
  }

  await terminal.narrate('The sensor room is small — dominated by a massive');
  await terminal.narrate('antenna housing that protrudes through the hull.');
  await terminal.narrate('Cables snake across every surface. A small device');
  await terminal.narrate('is magnetically attached to the housing.');
  terminal.blank();

  await terminal.narrate('I can see:');
  if (!state.flashbacks.recording) {
    terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">A recording device</span> <span class="c-dim">— magnetic, stuck to the antenna</span>');
  } else {
    terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-dim">The recording device — played (examined)</span>');
  }
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">The antenna housing</span> <span class="c-dim">— the main sensor array</span>');
  terminal.sayHtml('  <span class="c-orange">\u2022</span> <span class="c-white-bright">A data terminal</span> <span class="c-dim">— might have stored signals</span>');
  terminal.blank();
}


// ═══════════════════════════════════════════════════════
// EXAMINE / FLASHBACK HANDLERS
// ═══════════════════════════════════════════════════════

function getRoomObjects(state) {
  const room = state.currentRoom;
  const objects = [];

  if (room === 'bridge') {
    if (!state.flashbacks.burn_marks) {
      objects.push(['viewport', 'Viewport', 'Cracked, with strange burn marks']);
    } else {
      objects.push(['viewport', 'Viewport', 'SIC Scrambler damage (examined)']);
    }
    if (!state.flashbacks.nav_console) {
      objects.push(['nav console', 'Nav Console', 'Dark, possibly repairable']);
    } else {
      objects.push(['nav console', 'Nav Console', 'Online, showing star charts']);
    }
    objects.push(['pilot seat', 'Pilot Seat', 'Empty, restraints hanging loose']);
  }

  else if (room === 'engineering') {
    objects.push(['fold drive', 'Fold Drive', 'Massive, completely dead']);
    objects.push(['null energy core', 'Null Energy Core', 'Sealed, nearly empty']);
    objects.push(['workbench', 'Workbench', 'Covered in tools and schematics']);
  }

  else if (room === 'quarters') {
    if (!state.flashbacks.photo_frame) {
      objects.push(['photo frame', 'Photo Frame', 'Cracked, floating near the bunk']);
    } else {
      objects.push(['photo frame', 'Photo Frame', 'A university building (examined)']);
    }
    objects.push(['desk', 'Small Desk', 'Scattered notes']);
    objects.push(['locker', 'Storage Locker', 'Personal items']);
  }

  else if (room === 'cargo') {
    if (!state.flashbacks.torquer_case) {
      objects.push(['reinforced case', 'Reinforced Case', 'Mag-locked to the wall']);
    } else {
      const label = state.torquerEquipped ? 'Torquer Case (equipped)' : 'Torquer Case (open)';
      objects.push(['reinforced case', label, 'Examined']);
    }
    objects.push(['crates', 'Scattered Crates', 'Supplies, mostly ruined']);
    objects.push(['cargo manifest', 'Cargo Manifest', 'Digital, partially readable']);
  }

  else if (room === 'sensors') {
    if (!state.flashbacks.recording) {
      objects.push(['recording device', 'Recording Device', 'Magnetic, stuck to the antenna']);
    } else {
      objects.push(['recording device', 'Recording Device', 'Played (examined)']);
    }
    objects.push(['antenna', 'Antenna Housing', 'The main sensor array']);
    objects.push(['data terminal', 'Data Terminal', 'Might have stored signals']);
  }

  return objects;
}


async function handleExamine(terminal, state, effects, audio, obj) {
  obj = obj.toLowerCase().trim();

  const handlers = {
    // Bridge
    'viewport': flashbackBurnMarks,
    'burn marks': flashbackBurnMarks,
    'burns': flashbackBurnMarks,
    'nav console': flashbackNavConsole,
    'nav': flashbackNavConsole,
    'console': flashbackNavConsole,
    'seat': examineSeat,
    'pilot seat': examineSeat,

    // Quarters
    'photo': flashbackPhotoFrame,
    'photo frame': flashbackPhotoFrame,
    'frame': flashbackPhotoFrame,
    'desk': examineDesk,
    'locker': examineLocker,

    // Cargo
    'case': flashbackTorquerCase,
    'reinforced case': flashbackTorquerCase,
    'torquer': flashbackTorquerCase,
    'crates': examineCrates,
    'manifest': examineManifest,
    'cargo manifest': examineManifest,

    // Sensors
    'recorder': flashbackRecording,
    'recording': flashbackRecording,
    'recording device': flashbackRecording,
    'device': flashbackRecording,
    'antenna': examineAntenna,
    'terminal': examineTerminal,
    'data terminal': examineTerminal,

    // Engineering
    'fold drive': examineFoldDrive,
    'drive': examineFoldDrive,
    'core': examineCore,
    'null energy core': examineCore,
    'workbench': examineWorkbench,
    'bench': examineWorkbench,
  };

  const handler = handlers[obj];
  if (handler) {
    await handler(terminal, state, effects, audio);
  } else {
    await terminal.narrate("I don't see that here.");
    terminal.blank();
  }
}


// ─── Flashback: Photo Frame ───

async function flashbackPhotoFrame(terminal, state, effects, audio) {
  if (state.currentRoom !== 'quarters') {
    await terminal.narrate("I don't see that here.");
    terminal.blank();
    return;
  }
  if (state.flashbacks.photo_frame) {
    await terminal.narrate('The photo. A university building. My past.');
    await terminal.thought('I was a researcher. On Earth.');
    terminal.blank();
    return;
  }

  audio.play('echo_signal');
  await terminal.narrate('A frame, floating near the bunk. The glass is');
  await terminal.narrate('cracked. Behind it — a photo. A building.');
  await terminal.narrate('A university? My hand is shaking.');
  terminal.blank();
  await wait(500);

  await terminal.flashback('...a lab. Fluorescent lights. My hands on a');
  await terminal.flashback('keyboard, running simulations. The smell of');
  await terminal.flashback('burnt coffee. Someone calling my name from');
  await terminal.flashbackVivid('the hallway. "Vin, the sensor\'s picking');
  await terminal.flashbackVivid('up something weird\u2014"');
  terminal.blank();
  await wait(300);

  await terminal.narrate('Gone. The memory crumbles like static.');
  terminal.blank();

  await terminal.dent('Heart rate spike detected. You remembered');
  await terminal.dentLine('something.');
  terminal.blank();

  const choice = await terminal.showChoices([
    '"I was in a lab. A university, I think."',
    '"It\'s gone. I almost had it."',
    '"How do you know my heart rate?"',
  ]);

  if (choice === 1) {
    await terminal.dent('That tracks. Your file says researcher.');
    await terminal.dentLine('Earth-based. Before all this.');
    terminal.blank();
    await terminal.thought('A researcher. That feels right.');
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent("That's how it works. The fragments come");
    await terminal.dentLine("back in pieces. Don't force it.");
    terminal.blank();
    await terminal.dent("...I'm telling myself that too.");
    terminal.blank();
  } else if (choice === 3) {
    await terminal.dent('I have a biosensor in my left optic.');
    await terminal.dentLine('One of the few things still working.');
    await terminal.dentLine("You're welcome.");
    terminal.blank();
    await terminal.dent('Whatever you saw, it rattled you.');
    terminal.blank();
  }

  state.discoverFlashback('photo_frame');
  terminal.say('  [Memory recovered: Vin\'s past — researcher, Earth]', 'dim-text');
  terminal.blank();
}


// ─── Flashback: Burn Marks ───

async function flashbackBurnMarks(terminal, state, effects, audio) {
  if (state.currentRoom !== 'bridge') {
    await terminal.narrate("I don't see that here.");
    terminal.blank();
    return;
  }
  if (state.flashbacks.burn_marks) {
    await terminal.narrate('The scorch marks. SIC Scrambler damage.');
    await terminal.thought('We were running from them.');
    terminal.blank();
    return;
  }

  audio.play('scrambler_hit');
  await terminal.narrate('The viewport is partially cracked. And the hull');
  await terminal.narrate('around it — scorch marks. Deep ones. Not from');
  await terminal.narrate('heat. From something that rewrote the metal');
  await terminal.narrate('itself. The molecular structure looks... wrong.');
  terminal.blank();
  await wait(500);

  await terminal.flashback("...gunmetal gray ships. Three of them. No");
  await terminal.flashback("insignia. A weapon I'd never seen — it didn't");
  await terminal.flashback('fire projectiles. The air in front of The Vex');
  await terminal.flashbackVivid('just went FLAT. Like physics turned off.');
  await terminal.flashbackVivid('"SCRAMBLER LOCK," DENT screaming,');
  await terminal.flashbackVivid('"THEY HAVE SCRAMBLER LOCK\u2014"');
  terminal.blank();
  await wait(300);

  await terminal.narrate('I stagger. Grab the console.');
  terminal.blank();

  let choice = await terminal.showChoices([
    '"Gray ships. Three of them. They had some kind of weapon."',
    '"Something hit us. Something bad."',
    '"DENT — you were screaming in that memory."',
  ]);

  if (choice === 1) {
    await terminal.dent('SICs. The Spatial Integrity Coalition.');
    terminal.blank();
    const choice2 = await terminal.showChoices([
      '"Who are they?"',
      '"Why were they shooting at us?"',
    ]);
    if (choice2 === 1) {
      await terminal.dent('Enforcers. They police spacetime folding.');
      await terminal.dentLine('Anyone who folds, they hunt. Zero tolerance.');
      terminal.blank();
    } else {
      await terminal.dent('Because we fold. Or we did.');
      await terminal.dentLine("That's enough for them.");
      terminal.blank();
    }
  } else if (choice === 2) {
    await terminal.dent('A Coherence Scrambler. SIC standard issue.');
    await terminal.dentLine('Rewrites local physics to prevent folding.');
    terminal.blank();
    const choice2 = await terminal.showChoices([
      '"Rewrites physics? That\'s possible?"',
      '"SIC?"',
    ]);
    if (choice2 === 1) {
      await terminal.dent('Possible and extremely unpleasant.');
      await terminal.dentLine("Those scorch marks aren't heat damage.");
      await terminal.dentLine('The metal itself was rewritten.');
      terminal.blank();
    } else {
      await terminal.dent('Spatial Integrity Coalition. The people');
      await terminal.dentLine('who want us dead.');
      terminal.blank();
    }
  } else if (choice === 3) {
    await terminal.dent('Was I?');
    terminal.blank();
    await wait(300);
    await terminal.dent("...I'm starting to remember that too.");
    await terminal.dentLine("I wish I wasn't.");
    terminal.blank();
    await terminal.dent('They had Scrambler lock on us. That\'s a');
    await terminal.dentLine('weapon that rewrites local physics.');
    await terminal.dentLine('SIC standard issue.');
    terminal.blank();
  }

  state.discoverFlashback('burn_marks');
  state.setFlag('knows_sics', true);
  terminal.say('  [Memory recovered: The SICs — enforcers, Scramblers, the pursuit]', 'dim-text');
  terminal.blank();
}


// ─── Flashback: Torquer Case ───

async function flashbackTorquerCase(terminal, state, effects, audio) {
  if (state.currentRoom !== 'cargo') {
    await terminal.narrate("I don't see that here.");
    terminal.blank();
    return;
  }
  if (state.flashbacks.torquer_case) {
    if (state.torquerEquipped) {
      await terminal.narrate('The Torquer is strapped to my forearm. Dormant, but ready.');
    } else {
      await terminal.narrate('The Torquer case. Open. The Torquer inside.');
      const choice = await terminal.showChoices([
        ['Strap it on.', ''],
        ['Leave it.', ''],
      ]);
      if (choice === 1) {
        await equipTorquer(terminal, state);
      }
    }
    terminal.blank();
    return;
  }

  audio.play('torquer_equip');
  await terminal.narrate('A reinforced case, magnetic-locked to the wall.');
  await terminal.narrate('It survived whatever hit us. The lock recognizes');
  await terminal.narrate('my handprint.');
  terminal.blank();

  await terminal.narrate('Inside: a forearm brace. Two-tone. Two sections —');
  await terminal.narrate('the proximal section, closer to the elbow, glows');
  await terminal.narrate('faint orange — dormant. The distal section toward');
  await terminal.narrate('the wrist is deep blue, inert.');
  terminal.blank();

  terminal.torquerArt(false);
  terminal.blank();

  await terminal.narrate('My hand reaches for it before my brain tells it to.');
  terminal.blank();
  await wait(500);

  await terminal.flashback('...the coil alignment has to be perfect.');
  await terminal.flashbackVivid('PERFECT.');
  await terminal.flashback('One micrometer off and the Casimir effect');
  await terminal.flashback("inverts. I've been awake for 40 hours. The");
  await terminal.flashback('orange half works — fusion core is stable.');
  await terminal.flashback("But the blue half, the negative energy");
  await terminal.flashback("generator — I can't get the vacuum seal\u2014");
  terminal.blank();
  await terminal.flashbackVivid('A sound. A fold. The first fold. Space');
  await terminal.flashbackVivid('bending around my fist like water.');
  await terminal.flashbackVivid('I laughed. I actually laughed.');
  terminal.blank();
  await wait(300);

  let choice = await terminal.showChoices([
    '"I built this. I remember building this."',
    '"What is it?"',
    '"...space bending around my fist."',
  ]);

  if (choice === 1) {
    await terminal.dent('You did. By hand. In a university lab.');
    terminal.blank();
    const choice2 = await terminal.showChoices([
      '"What does it do?"',
      '"Why does the case have my handprint?"',
    ]);
    if (choice2 === 1) {
      await terminal.dent('It folds spacetime. Bends the fabric of');
      await terminal.dentLine('the universe around your arm.');
      await terminal.dentLine("You're the only person who's ever made");
      await terminal.dentLine('one small enough to wear.');
      terminal.blank();
    } else {
      await terminal.dent("Because you're the only one who should");
      await terminal.dentLine('be touching it. That thing is dangerous');
      await terminal.dentLine('in the wrong hands.');
      await terminal.dentLine('Arguably dangerous in the right ones too.');
      terminal.blank();
    }
  } else if (choice === 2) {
    await terminal.dent('The Torquer. You built it.');
    await terminal.dentLine('It folds spacetime. Orange section is the');
    await terminal.dentLine('fusion core. Blue section generates negative');
    await terminal.dentLine('energy — null.');
    terminal.blank();
    await terminal.dent('Together they bend the universe around');
    await terminal.dentLine("your fist. It's either the most brilliant");
    await terminal.dentLine('or the most insane thing ever built.');
    terminal.blank();
  } else if (choice === 3) {
    await terminal.narrate('DENT is quiet for a moment.');
    terminal.blank();
    await terminal.dent('You remember the first fold.');
    await terminal.dentLine("That's a good sign.");
    terminal.blank();
    await terminal.dent('The Torquer. Your invention.');
    await terminal.dentLine("It bends spacetime. That's why we're");
    await terminal.dentLine('being hunted.');
    terminal.blank();
  }

  state.discoverFlashback('torquer_case');
  state.setFlag('knows_torquer', true);
  terminal.say('  [Memory recovered: The Torquer — folding spacetime]', 'dim-text');
  terminal.blank();

  choice = await terminal.showChoices([
    'Strap it on.',
    'Leave it. Not yet.',
  ]);

  if (choice === 1) {
    await equipTorquer(terminal, state);
  }
}


async function equipTorquer(terminal, state) {
  await terminal.narrate('I strap the Torquer onto my forearm. The orange');
  await terminal.narrate('section hums — faint, like a heartbeat. The blue');
  await terminal.narrate('section stays dark. No null energy to feed it.');
  terminal.blank();
  await terminal.thought('It fits like it was made for me.');
  await terminal.thought('Because it was.');
  terminal.blank();
  state.torquerEquipped = true;
  state.addItem('Torquer');
  terminal.say('  [Equipped: Torquer — no null energy]', 'dim-text');
  terminal.blank();
}


// ─── Flashback: Recording ───

async function flashbackRecording(terminal, state, effects, audio) {
  if (state.currentRoom !== 'sensors') {
    await terminal.narrate("I don't see that here.");
    terminal.blank();
    return;
  }
  if (state.flashbacks.recording) {
    await terminal.narrate('The recording. My own voice. The Echoes.');
    await terminal.thought("I'm trying to close a time loop.");
    terminal.blank();
    return;
  }

  audio.play('echo_signal');
  await terminal.narrate('A small device. Magnetic. Stuck to the sensor');
  await terminal.narrate('housing. There\'s a recording on it. One file.');
  terminal.blank();
  await terminal.narrate('I press play.');
  terminal.blank();
  await wait(500);

  await terminal.narrate('My voice:');
  terminal.blank();
  await terminal.typed('"—if the packet reaches me in the past, then', { speed: 25, className: 'c-white-bright' });
  await terminal.typed('the loop is self-consistent. I don\'t need to', { speed: 25, className: 'c-white-bright' });
  await terminal.typed('understand it. I just need to CLOSE it. The', { speed: 25, className: 'c-white-bright' });
  await terminal.typed('Echoes contain everything — the coordinates,', { speed: 25, className: 'c-white-bright' });
  await terminal.typed('the schematics, the—"', { speed: 25, className: 'c-white-bright' });
  terminal.blank();

  await wait(300);
  await terminal.warning('*Static. A boom. Alarms.*');
  terminal.blank();

  await terminal.typed('"DENT, EVASIVE— THE SICS FOUND US, THEY—"', { speed: 20, className: 'c-white-bright' });
  terminal.blank();

  await terminal.narrate('Dead air. The recording device goes dark.');
  terminal.blank();
  await wait(500);

  let choice = await terminal.showChoices([
    '"That was my voice."',
    '"What are the Echoes?"',
    '"A time loop?"',
  ]);

  if (choice === 1) {
    await terminal.dent('Yes. From the future. Or... a future.');
    terminal.blank();
    const choice2 = await terminal.showChoices([
      '"How is that possible?"',
      '"What was I trying to do?"',
    ]);
    if (choice2 === 1) {
      await terminal.dent('You sent a signal backward through');
      await terminal.dentLine('folded spacetime. The Echoes.');
      await terminal.dentLine('Coordinates. Schematics. A message');
      await terminal.dentLine('to yourself.');
      terminal.blank();
      await terminal.dent("I don't understand the physics either.");
      await terminal.dentLine("And I'm a computer.");
      terminal.blank();
    } else {
      await terminal.dent("Close the loop. Send the signal back");
      await terminal.dentLine("so you'd receive it in the past.");
      await terminal.dentLine('So all of this would happen.');
      terminal.blank();
      await terminal.dent("It gives me a headache. And I don't");
      await terminal.dentLine('have a head.');
      terminal.blank();
    }
  } else if (choice === 2) {
    await terminal.dent('Signals. From you. From the future.');
    await terminal.dentLine("You received them, and now you're");
    await terminal.dentLine('trying to send them back.');
    terminal.blank();
    const choice2 = await terminal.showChoices([
      '"That doesn\'t make sense."',
      '"Why?"',
    ]);
    if (choice2 === 1) {
      await terminal.dent("It doesn't have to make sense.");
      await terminal.dentLine('It just has to be self-consistent.');
      await terminal.dentLine('Your words, not mine.');
      terminal.blank();
    } else {
      await terminal.dent("Because if you don't, none of this");
      await terminal.dentLine('happens. You never receive the signal.');
      await terminal.dentLine('You never build the Torquer. You never');
      await terminal.dentLine('end up here.');
      terminal.blank();
      await terminal.dent('Paradox. Fun stuff.');
      terminal.blank();
    }
  } else if (choice === 3) {
    await terminal.dent("That's the working theory.");
    await terminal.dentLine('You received signals from yourself.');
    await terminal.dentLine('Now you have to send them.');
    terminal.blank();
    await terminal.dent("If you don't close the loop, the loop");
    await terminal.dentLine("can't exist. And then neither can we.");
    terminal.blank();
    await terminal.dent('No pressure.');
    terminal.blank();
  }

  state.discoverFlashback('recording');
  state.setFlag('knows_echoes', true);
  terminal.say('  [Memory recovered: The Echoes — signals from the future, time loop]', 'dim-text');
  terminal.blank();
}


// ─── Flashback: Nav Console ───

async function flashbackNavConsole(terminal, state, effects, audio) {
  if (state.currentRoom !== 'bridge') {
    await terminal.narrate("I don't see that here.");
    terminal.blank();
    return;
  }
  if (state.flashbacks.nav_console) {
    await terminal.narrate('The nav console. Star charts. The Core Anomaly.');
    await terminal.thought("That's where we're headed.");
    terminal.blank();
    return;
  }

  await terminal.narrate('The nav console is dark. But the housing looks');
  await terminal.narrate('intact. Might be a power coupling issue.');
  terminal.blank();

  await terminal.dent('I need you to reconnect the power coupling');
  await terminal.dentLine('under the console. Third panel from the left.');
  await terminal.dentLine('The red wire goes to — wait. No.');
  await terminal.dentLine('The BLUE wire goes to — hmm.');
  terminal.blank();
  await terminal.dent('I genuinely don\'t remember which wire.');
  await terminal.dentLine('This is concerning.');
  terminal.blank();

  let choice = await terminal.showChoices([
    ['Red wire.', ''],
    ['Blue wire.', ''],
    ['"DENT, are you serious right now?"', ''],
  ]);

  if (choice === 3) {
    await terminal.dent('Completely serious. My memory was scrambled');
    await terminal.dentLine('by the same Blip that scrambled yours.');
    await terminal.dentLine("I'm running on approximately 31% of my");
    await terminal.dentLine('normal capacity.');
    terminal.blank();
    await terminal.dent("For reference, I'm normally magnificent.");
    terminal.blank();

    choice = await terminal.showChoices([
      ['Red wire.', ''],
      ['Blue wire.', ''],
    ]);
  }

  if (choice === 2) {
    // Blue — correct
    await terminal.narrate('I pull the panel, find the coupling, connect');
    await terminal.narrate('the blue wire. A spark. Then\u2014');
    terminal.blank();

    await terminal.narrate('The nav console flickers. Holds. A star chart.');
    await terminal.narrate('One point circled. Red. A route plotted straight');
    await terminal.narrate('to it.');
    terminal.blank();

    await terminal.thought("I don't remember marking it. But I know what it is.");
    terminal.blank();
    await wait(500);

    await terminal.flashback('...the Core Anomaly. A structure at the edge of');
    await terminal.flashback('known expansion — not natural, impossibly large.');
    await terminal.flashback('The Folders call it the Render Cache.');
    await terminal.flashback('The SICs call it a Class-7 Containment Zone.');
    await terminal.flashbackVivid('I call it the finish line.');
    terminal.blank();

    const choice2 = await terminal.showChoices([
      '"The Core Anomaly. I know that name."',
      '"Where is that?"',
      '"Can we even get there?"',
    ]);

    if (choice2 === 1) {
      await terminal.dent('You should. You plotted the course.');
      await terminal.dentLine('Largest non-natural structure at the');
      await terminal.dentLine('edge of known expansion.');
      terminal.blank();
      await terminal.dent("It's the only place you can close the loop.");
      await terminal.dentLine('Or so you told me. Before you forgot.');
      terminal.blank();
    } else if (choice2 === 2) {
      await terminal.dent('Far. Very far.');
      await terminal.dentLine('And we have almost no null');
      await terminal.dentLine('for the fold drive.');
      terminal.blank();
      const choice3 = await terminal.showChoices([
        '"How do we get more?"',
        '"How far is far?"',
      ]);
      if (choice3 === 1) {
        await terminal.dent('That is an excellent question that I');
        await terminal.dentLine('do not currently have an answer to.');
        terminal.blank();
      } else {
        await terminal.dent('Farther than 8 cells of null will');
        await terminal.dentLine("take us. That's the relevant number.");
        terminal.blank();
      }
    } else if (choice2 === 3) {
      await terminal.dent('With 8 cells? No.');
      await terminal.dentLine('We need null. We need repairs.');
      await terminal.dentLine('We need the gravity drive back online');
      await terminal.dentLine("before I lose what's left of my mind.");
      terminal.blank();
      await terminal.dent('But the destination is locked in.');
      await terminal.dentLine("That's something.");
      terminal.blank();
    }

    state.discoverFlashback('nav_console');
    state.setFlag('nav_repaired', true);
    state.setFlag('knows_destination', true);
    terminal.say('  [Memory recovered: The Core Anomaly — the destination]', 'dim-text');
  } else {
    // Red wire — wrong
    await effects.screenTear(1);
    await terminal.warning('SPARK — the console shorts. Smoke.');
    terminal.blank();
    await terminal.dent('That was the red wire. I was afraid of that.');
    await terminal.dentLine('The console is fine. Try the blue one.');
    terminal.blank();

    await terminal.narrate('I reconnect with the blue wire this time.');
    terminal.blank();

    await terminal.narrate('The nav console flickers. Holds. A star chart.');
    await terminal.narrate('One point circled. Red.');
    terminal.blank();

    await terminal.flashback('...the Core Anomaly. The largest non-natural');
    await terminal.flashback('structure at the edge of known expansion.');
    await terminal.flashbackVivid('The only place where I can close the loop.');
    terminal.blank();

    const choice2 = await terminal.showChoices([
      '"The Core Anomaly. What is it?"',
      '"How far?"',
    ]);

    if (choice2 === 1) {
      await terminal.dent("Honestly? I'm not sure anymore.");
      await terminal.dentLine("But you were certain it's where we");
      await terminal.dentLine('need to be. Something about closing');
      await terminal.dentLine('a loop.');
      terminal.blank();
    } else {
      await terminal.dent("Far. And we're nearly out of fuel.");
      await terminal.dentLine("But sure. What's the worst that");
      await terminal.dentLine('could happen?');
      terminal.blank();
      await terminal.dent("Don't answer that.");
      terminal.blank();
    }

    state.discoverFlashback('nav_console');
    state.setFlag('nav_repaired', true);
    state.setFlag('knows_destination', true);
    state.applyDamage({ stress: 5 });
    terminal.say('  [Memory recovered: The Core Anomaly — the destination]', 'dim-text');
  }

  terminal.blank();
}


// ─── Generic Examine Handlers ───

async function examineSeat(terminal, state) {
  await terminal.narrate('The pilot seat. Empty restraints float free.');
  await terminal.thought('I was thrown from it when we were hit.');
  terminal.blank();
}

async function examineDesk(terminal, state) {
  await terminal.narrate('Scattered notes. Equations. Most are water-');
  await terminal.narrate('damaged or frozen. One page has a single');
  await terminal.narrate('circled word: ECHOES.');
  terminal.blank();
}

async function examineLocker(terminal, state) {
  await terminal.narrate('Personal storage. Clothes. A protein bar.');
  await terminal.narrate('A small toolkit. Nothing that triggers a memory.');
  terminal.blank();
  state.addItem('Protein Bar');
  terminal.say('  [Picked up: Protein Bar]', 'dim-text');
  terminal.blank();
}

async function examineCrates(terminal, state) {
  await terminal.narrate('Most of the crates are cracked open. Medical');
  await terminal.narrate('supplies, spare parts, ration packs — all');
  await terminal.narrate('floating loose. Usable, mostly.');
  terminal.blank();
}

async function examineManifest(terminal, state) {
  await terminal.narrate('The cargo manifest displays partial data:');
  terminal.blank();
  terminal.say('  NULL RESERVES: 8 CELLS (CRITICAL)', 'dim-text');
  terminal.say('  RATIONS: 42 DAYS', 'dim-text');
  terminal.say('  CASIMIR COILS: 2 (SPARE)', 'dim-text');
  terminal.say('  MEDICAL: STANDARD KIT', 'dim-text');
  terminal.blank();
  await terminal.thought('Eight cells. Not enough for a fold.');
  await terminal.thought('Not even close.');
  terminal.blank();
}

async function examineFoldDrive(terminal, state) {
  await terminal.narrate('The fold drive. A machine the size of a');
  await terminal.narrate('refrigerator, all curved plating and exposed');
  await terminal.narrate('conduits. It\'s completely dead.');
  terminal.blank();
  await terminal.dent('The fold drive requires a minimum of 15 cells');
  await terminal.dentLine('to initialize. We have 8.');
  await terminal.dentLine("So that's a problem.");
  terminal.blank();
}

async function examineCore(terminal, state) {
  await terminal.narrate('The null energy containment vessel. Sealed,');
  await terminal.narrate('humming faintly. A gauge on the side reads 8/100.');
  terminal.blank();
  await terminal.thought('Casimir-derived null energy. The fuel for');
  await terminal.thought('everything — the fold drive, the Torquer, the jump.');
  await terminal.thought("And we're almost out.");
  terminal.blank();
}

async function examineWorkbench(terminal, state) {
  await terminal.narrate('Tools. Schematics. A half-finished modification');
  await terminal.narrate("to something — I can't tell what. My handwriting");
  await terminal.narrate("is all over the notes but I can't read most of it.");
  terminal.blank();
  state.addItem('Micro Toolkit');
  terminal.say('  [Picked up: Micro Toolkit]', 'dim-text');
  terminal.blank();
}

async function examineAntenna(terminal, state) {
  await terminal.narrate('The main sensor antenna. Massive for a ship this');
  await terminal.narrate("size. Custom-built. This wasn't standard issue.");
  terminal.blank();
  await terminal.dent('You built that antenna yourself. Modified it to');
  await terminal.dentLine("detect frequencies that shouldn't exist.");
  await terminal.dentLine('Specifically, your own voice from the future.');
  await terminal.dentLine('Normal Tuesday, really.');
  terminal.blank();
}

async function examineTerminal(terminal, state) {
  await terminal.narrate('The data terminal. Mostly corrupted, but there');
  await terminal.narrate('are fragments of decoded signals. The Echoes.');
  terminal.blank();
  if (state.flashbacks.recording) {
    await terminal.narrate('Coordinates. Schematics. The message that started');
    await terminal.narrate("everything. It's all here — fragmented but real.");
  } else {
    await terminal.narrate("I can't make sense of the data yet. Something");
    await terminal.narrate('about signals. Frequencies. Future timestamps.');
  }
  terminal.blank();
}


// ─── Show Inventory ───

function showInventory(terminal, state) {
  terminal.blank();
  terminal.sayHtml('<span class="c-hull">--- </span><span class="c-white-bright" style="font-weight:bold">INVENTORY</span><span class="c-hull"> -------------------------</span>');

  if (state.torquerEquipped) {
    terminal.sayHtml('  <span class="c-orange">TORQUER</span> <span class="c-dim">[EQUIPPED]</span>');
    terminal.say('    Proximal \u2014 Fusion Core (Orange): DORMANT', 'dim-text');
    terminal.say('    Distal \u2014 Neg-Energy Gen (Blue): INERT', 'dim-text');
    terminal.say(`    Null: ${state.torquerNull}/10 cells`, 'dim-text');
  }

  const items = state.inventory.filter(i => i !== 'Torquer');
  if (items.length > 0) {
    terminal.blank();
    terminal.sayHtml('  <span class="c-white-bright">ITEMS:</span>');
    for (const item of items) {
      terminal.say(`  \u2022 ${item}`, 'dim-text');
    }
  }

  if (!state.torquerEquipped && items.length === 0) {
    terminal.say('  Empty.', 'dim-text');
  }

  terminal.sayHtml('<span class="c-hull">--------------------------------------</span>');
  terminal.blank();
}


// ═══════════════════════════════════════════════════════
// PHASE 3: FULL BOOT
// ═══════════════════════════════════════════════════════

export async function prologuePhase3(terminal, state, effects, audio) {
  state.phase = 3;
  terminal.clear();
  audio.play('boot');

  terminal.showArt(artBootComplete());

  await terminal.dent("Vin. I've finished my diagnostic.");
  await terminal.dentLine("Mine and the ship's. Here's what I know:");
  terminal.blank();
  await wait(300);

  await terminal.dent('We were hit by a SIC Scrambler. The energy');
  await terminal.dentLine('disruption caused a localized Blip — a');
  await terminal.dentLine('spacetime stutter. Think of it as reality');
  await terminal.dentLine('skipping a frame.');
  terminal.blank();
  await wait(300);

  await terminal.dent('The Blip wiped our short-term memory.');
  await terminal.dentLine('Both of us. Your neural link, my core memory.');
  await terminal.dentLine('Everything from the last 72 hours is gone.');
  terminal.blank();
  await wait(300);

  await terminal.dent("But the mission hasn't changed.");
  await terminal.dentLine('The Echoes are still in the sensor array.');
  await terminal.dentLine('The Core Anomaly is still out there.');
  await terminal.dentLine('And the SICs are still coming.');
  terminal.blank();
  await wait(500);

  await terminal.dent("So. What's the plan, Vin?");
  terminal.blank();

  const choice = await terminal.showChoices([
    ['"Fix The Vex. We keep going."', ''],
    ['"How far behind are the SICs?"', ''],
    ['"What are our chances?"', ''],
    ['"I need a minute."', ''],
  ]);

  if (choice === 1) {
    await terminal.dent('That\'s the Vin I remember. Barely.');
    await terminal.dentLine("I'll run a full systems check and prioritize");
    await terminal.dentLine("repairs. We'll need null. Soon.");
    terminal.blank();
  } else if (choice === 2) {
    await terminal.dent('Based on our last known position and standard');
    await terminal.dentLine("SIC pursuit protocols... I'd estimate 6 to 12");
    await terminal.dentLine('hours before they locate us again.');
    terminal.blank();
    await terminal.dent('Plenty of time. For panicking.');
    terminal.blank();
  } else if (choice === 3) {
    await terminal.dent('Calculating.');
    terminal.blank();
    await wait(1000);
    await terminal.dentSystem('...');
    await wait(500);
    await terminal.dentGlitch('...proc██essing...');
    await terminal.dent("I'm going to round up and say 'not zero.'");
    await terminal.dentLine("You're welcome.");
    terminal.blank();
  } else if (choice === 4) {
    await terminal.dent('Take your time. The vacuum of space is very');
    await terminal.dentLine('patient.');
    terminal.blank();
    await wait(500);
    await terminal.dent("...Life support is less so. Just saying.");
    terminal.blank();
  }

  await terminal.pause();

  // Set post-Blip damaged stats
  state.setPostBlipStats();
  state.chapter = 1;
  state.dentRepairLevel = 0.3;

  // Full UI reveal
  terminal.clear();
  await terminal.chapterTitle(1, 'THE VEX \u2014 COLD BOOT COMPLETE');

  terminal.statusPanel(state);
  terminal.blank();

  await terminal.dent("All systems... well. 'Online' is generous.");
  await terminal.dentLine("Let's call them 'not completely dead.'");
  await terminal.dentLine('Welcome back, Vin.');
  terminal.blank();

  // Save checkpoint
  await state.save();
  terminal.say('  [Progress saved]', 'dim-text');
  terminal.blank();

  await terminal.pause('Prologue complete. Press any key');
}
