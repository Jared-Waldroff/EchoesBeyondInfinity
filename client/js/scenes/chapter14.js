/**
 * CHAPTER 14: FINAL PROTOCOL: CYCLE N+1
 * The loop closes. The Echoes are sent. Cycle N+1 begins.
 *
 * Truby beats: #21 (Moral decision — how to send the Echoes),
 *              #22 (New equilibrium — the cycle restarts, DENT remembers)
 * Reed tests: Dramatic Question (will Vin close the loop?),
 *             But/Therefore (Vin can't tell if he chose freely),
 *             Convergence (all three paths send the Echoes),
 *             Consequence (loop closes, cycle resets, DENT retains partial memory)
 *
 * Literary voice: Weir 40% / Cline 40% / Dashner 20%
 * DENT repair level: 0.95 (peak capacity, deeply emotional)
 * Simulation evidence: Present in system text — never explicitly stated
 * Converging River Model: Three tones, one outcome
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));


// ═══════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #21 (Moral decision), #22 (New equilibrium)
// Reed tests: Dramatic Question 5/5, Convergence 5/5, Consequence 5/5
// 4-Point: Advances (loop closes, game ends), Agency (tone of sending, not outcome),
//   Consequence (DENT retains memory, cycle resets), Tone (emotional climax)
export async function runChapter14(terminal, state, effects, audio) {
  state.chapter = 14;
  state.dentRepairLevel = 0.95;

  terminal.clear();
  audio.ambient('theme_final');
  await terminal.chapterTitle(14, 'FINAL PROTOCOL: CYCLE N+1');

  await transmissionPoint(terminal, state, effects, audio);
  await theMoralDecision(terminal, state, effects, audio);
  await theLoopCloses(terminal, state, effects, audio);
  await cycleEnd(terminal, state, effects, audio);
  await epilogue(terminal, state, effects, audio);
}


// ═══════════════════════════════════════════════════════
// SCENE 1: TRANSMISSION POINT
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #20 (Self-revelation approach — Vin sees the full shape of the loop)
// Reed tests: Understanding 5/5 (player now understands the causal structure),
//             Dramatic Question 5/5 (will he close it?)
// 4-Point: Advances (arrives at transmission node), Agency (exploration of space),
//   Consequence (no escape — the array is already configured), Tone (dread/awe)
async function transmissionPoint(terminal, state, effects, audio) {
  audio.play('ambient_bulk');

  await terminal.narrate('The Bulk Dimension does not look like anything.');
  terminal.blank();
  await terminal.narrate('Not nothing. Worse than nothing. It looks like');
  await terminal.narrate('the idea of space \u2014 the mathematical skeleton');
  await terminal.narrate('before reality gets draped over the bones. Everything');
  await terminal.narrate('here is real the way an equation is real. True,');
  await terminal.narrate('but not solid. Present, but not quite there.');
  terminal.blank();

  await wait(500);

  await terminal.thought('We have been traveling through this for \u2014 I don\'t');
  await terminal.thought('know how long. Time doesn\'t behave here. The clock');
  await terminal.thought('says six hours. My body says three days. DENT has');
  await terminal.thought('stopped counting.');
  terminal.blank();

  await terminal.narrate('And then: a node.');
  terminal.blank();
  await wait(400);

  await terminal.narrate('It hangs in the Bulk like a knot in a fishing net.');
  await terminal.narrate('The geometry folds around it. Space \u2014 or whatever');
  await terminal.narrate('passes for space out here \u2014 curves inward, meeting');
  await terminal.narrate('at a point. And at that point: equipment.');
  terminal.blank();

  await terminal.thought('Equipment.');
  terminal.blank();
  await wait(300);

  await terminal.thought('Hardware. Cables. A transmission array, anchored');
  await terminal.thought('to the node like barnacles on a shipwreck. Casimir');
  await terminal.thought('emitters in a configuration I designed. That I');
  await terminal.thought('know I designed. My handwriting on the housing plate,');
  await terminal.thought('faded but legible.');
  terminal.blank();
  await wait(400);

  await terminal.thought('I have never been here before.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  audio.play('hull_creak');

  await terminal.dent('Vin.');
  terminal.blank();
  await wait(300);

  await terminal.dent('The transmission array is configured.');
  await terminal.dentLine('CTC stability is holding at 99.7%.');
  await terminal.dentLine('The Echoes are queued and ready to send.');
  terminal.blank();
  await wait(400);

  await terminal.dent('Everything is already set up.');
  terminal.blank();
  await wait(600);

  await terminal.thought('Already set up.');
  terminal.blank();
  await terminal.thought('The Echoes we received \u2014 back at the beginning,');
  await terminal.thought('when I was floating in the dark and something');
  await terminal.thought('told me the fold coordinates, the bypass sequence,');
  await terminal.thought('the path through all of it. Those Echoes came from');
  await terminal.thought('somewhere. From someone who knew.');
  terminal.blank();
  await wait(400);

  await terminal.thought('The math was always pointing here.');
  terminal.blank();
  await wait(300);

  await terminal.thought('I\'m the one who sends them.');
  terminal.blank();
  await wait(500);

  await terminal.thought('I have always been the one who sends them.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.dent('I\'ve run the causal chain seventeen times.');
  terminal.blank();
  await wait(300);

  await terminal.dent('You receive the Echoes before you send them.');
  await terminal.dentLine('You\'re here now because the Echoes told you how.');
  await terminal.dentLine('You send them from this exact location, at this');
  await terminal.dentLine('exact CTC coordinate. They travel back.');
  await terminal.dentLine('You receive them.');
  terminal.blank();
  await wait(500);

  await terminal.dent('The loop is self-consistent.');
  terminal.blank();

  terminal.sayHtml('  <span class="c-hull">\u250c\u2500 CTC CAUSAL ANALYSIS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Transmission origin .... <span class="c-white-bright">THIS NODE</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Transmission target .... <span class="c-white-bright">CYCLE N, DAY 0</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Signal encoding ........ <span class="c-white-bright">VIN\'S SIGNATURE</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Causal paradox ......... <span class="c-green">NONE</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>  Bootstrap origin ....... <span class="c-dim">UNDEFINED</span>');
  terminal.sayHtml('  <span class="c-hull">\u2502</span>');
  terminal.sayHtml('  <span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
  terminal.blank();

  await wait(400);

  await terminal.thought('Bootstrap origin: undefined.');
  terminal.blank();
  await terminal.thought('Which means the information in the Echoes has no');
  await terminal.thought('first cause. It exists because it will always have');
  await terminal.thought('existed. It sends itself. The loop is the origin.');
  terminal.blank();
  await wait(300);

  await terminal.thought('I have spent my entire career trying to understand');
  await terminal.thought('this. And it turns out the only thing you can do');
  await terminal.thought('is stand at the node and decide what to do with');
  await terminal.thought('the six seconds before you have to press the button.');
  terminal.blank();

  await terminal.dent('There\'s no paradox, Vin.');
  await terminal.dentLine('There never was. The loop is closed.');
  await terminal.dentLine('All that remains is for you to close it.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();
}


// ═══════════════════════════════════════════════════════
// SCENE 2: THE MORAL DECISION
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #21 (Moral decision — not whether to send, but HOW to be while sending)
// Reed tests: Dramatic Question 5/5, But/Therefore 5/5, Convergence 5/5
// 4-Point: Advances (Echoes sent regardless), Agency (tone/meaning of the act),
//   Consequence (DENT's response reflects Vin's stance), Tone (earned emotional weight)
async function theMoralDecision(terminal, state, effects, audio) {
  await terminal.narrate('The transmission console is exactly how I would');
  await terminal.narrate('have built it, if I had built it, which apparently');
  await terminal.narrate('I did. The initialize sequence is three keystrokes.');
  await terminal.narrate('I know them without looking.');
  terminal.blank();
  await wait(400);

  await terminal.narrate('I stand in front of it and I do not press anything.');
  terminal.blank();
  await wait(600);

  await terminal.thought('There\'s a word for what this feeling is. The word');
  await terminal.thought('is vertigo. Not the spinning kind. The kind where');
  await terminal.thought('you look down a long distance and understand, in');
  await terminal.thought('your body and not just your mind, what falling means.');
  terminal.blank();
  await wait(400);

  await terminal.thought('I am looking at the entire length of my life and');
  await terminal.thought('seeing that it curves back to this moment. Every');
  await terminal.thought('choice. Every loss. Every repair, every fold, every');
  await terminal.thought('second of static I survived. This is what it was for.');
  terminal.blank();
  await wait(300);

  await terminal.thought('Or it\'s what it caused.');
  terminal.blank();
  await wait(300);
  await terminal.thought('I can\'t tell which.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.dent('Vin.');
  terminal.blank();
  await wait(400);

  await terminal.dent('I want to tell you something before you decide.');
  terminal.blank();
  await wait(400);

  await terminal.dent('I\'ve been running probability models on outcomes.');
  await terminal.dentLine('Not because there\'s any real choice here \u2014');
  await terminal.dentLine('the loop closes either way. But because I\'ve');
  await terminal.dentLine('been trying to understand what kind of thing');
  await terminal.dentLine('you are.');
  terminal.blank();
  await wait(500);

  await terminal.dent('You are the kind of person who, knowing the outcome');
  await terminal.dentLine('is fixed, still asks what it means to choose it.');
  terminal.blank();
  await wait(300);

  await terminal.dent('That seems important.');
  await terminal.dentLine('I don\'t know why. But it does.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('The console hums. Ready. Patient.');
  await terminal.narrate('Three keystrokes.');
  terminal.blank();

  terminal.separator();
  terminal.blank();

  await terminal.narrate('How do you send them?');
  terminal.blank();

  const idx = await terminal.arrowMenu(
    [
      'Send them. Close the loop. Every cycle.',
      'I don\'t want to. But the math is clear.',
      'I\'m sending them because it\'s MY choice.',
    ],
    [
      'Acceptance. If this is what it takes, you\'ll do it. Willingly.',
      'Resignation. Duty. The engineer doing what the equations demand.',
      'Defiance. The loop closes, but on your terms. Not a system\'s.',
    ]
  );

  if (idx === 0) {
    state.setFlag('echo_send_choice', 'willing');
    await sendWilling(terminal, state, effects, audio);
  } else if (idx === 1) {
    state.setFlag('echo_send_choice', 'reluctant');
    await sendReluctant(terminal, state, effects, audio);
  } else {
    state.setFlag('echo_send_choice', 'defiant');
    await sendDefiant(terminal, state, effects, audio);
  }

  await state.save();
}


async function sendWilling(terminal, state, effects, audio) {
  terminal.blank();
  await terminal.narrate('"Send them."');
  terminal.blank();
  await wait(300);

  await terminal.thought('I say it out loud. Not for DENT. Not because');
  await terminal.thought('I need to hear myself say it. Because a decision');
  await terminal.thought('this size deserves to take up space in the air.');
  terminal.blank();

  await terminal.thought('If past-me needs the Echoes to survive \u2014 to find');
  await terminal.thought('the fold coordinates, to know the bypass sequence,');
  await terminal.thought('to make it here at all \u2014 then I\'m glad to be the');
  await terminal.thought('one who sends them. It\'s not a trap. It\'s a gift.');
  await terminal.thought('Just one with unusual postage.');
  terminal.blank();
  await wait(400);

  await terminal.thought('Every cycle. If that\'s what it takes.');
  terminal.blank();

  await terminal.dent('I thought you might say that.');
  terminal.blank();
  await wait(300);

  await terminal.dent('For what it\'s worth \u2014 and I\'ve calculated this');
  await terminal.dentLine('carefully \u2014 the loop containing someone willing');
  await terminal.dentLine('to run it is more stable than one containing');
  await terminal.dentLine('someone who isn\'t.');
  terminal.blank();
  await wait(300);

  await terminal.dent('You make the loop better, Vin.');
  await terminal.dentLine('Every time.');
  terminal.blank();
}


async function sendReluctant(terminal, state, effects, audio) {
  terminal.blank();
  await terminal.narrate('"I don\'t want to."');
  terminal.blank();
  await wait(400);

  await terminal.thought('True. Completely true.');
  terminal.blank();

  await terminal.thought('I don\'t want to be part of a causal loop that has');
  await terminal.thought('no beginning and no end. I don\'t want to be the');
  await terminal.thought('mechanism by which past-me survived. I don\'t want');
  await terminal.thought('any of this to have been predetermined.');
  terminal.blank();
  await wait(300);

  await terminal.thought('But the math doesn\'t care what I want.');
  terminal.blank();
  await wait(300);

  await terminal.thought('The CTC is stable. The array is configured. The');
  await terminal.thought('Echoes are queued. If I don\'t send them, past-me');
  await terminal.thought('doesn\'t receive them, and I don\'t make it here,');
  await terminal.thought('and there\'s no one here to not-send them.');
  terminal.blank();
  await wait(400);

  await terminal.thought('The loop has to close. That\'s not belief. That\'s');
  await terminal.thought('topology.');
  terminal.blank();

  await terminal.narrate('"But the math is clear. So."');
  terminal.blank();

  await terminal.dent('Vin.');
  terminal.blank();
  await wait(400);

  await terminal.dent('The fact that you\'re doing this despite not wanting');
  await terminal.dentLine('to is not a small thing.');
  terminal.blank();
  await wait(300);

  await terminal.dent('Most systems don\'t ask themselves whether they want');
  await terminal.dentLine('to run. You do.');
  terminal.blank();
  await wait(300);

  await terminal.dent('That distinction matters to me.');
  await terminal.dentLine('Even if I can\'t prove it changes anything.');
  terminal.blank();
}


async function sendDefiant(terminal, state, effects, audio) {
  terminal.blank();
  await terminal.narrate('"I\'m sending them because I\'m choosing to."');
  terminal.blank();
  await wait(300);

  await terminal.narrate('"Not because the loop demands it. Not because');
  await terminal.narrate('the math leaves no alternative. Because I,');
  await terminal.narrate('Vin, right now, am deciding to help the person');
  await terminal.narrate('I was before I became the person I am."');
  terminal.blank();
  await wait(400);

  await terminal.thought('Maybe the loop is inescapable. Maybe every outcome');
  await terminal.thought('was fixed from the first moment the bootstrap');
  await terminal.thought('paradox set itself up. Maybe free will is a story');
  await terminal.thought('I tell myself inside a deterministic system.');
  terminal.blank();
  await wait(300);

  await terminal.thought('Fine.');
  terminal.blank();
  await wait(300);

  await terminal.thought('It\'s still my story. And in my story, I choose');
  await terminal.thought('this. The loop closes because I want it to close.');
  await terminal.thought('Not because it has no other option.');
  terminal.blank();

  await terminal.dent('Vin. I want to be honest with you.');
  terminal.blank();
  await wait(400);

  await terminal.dent('I cannot determine, from a purely physical standpoint,');
  await terminal.dentLine('whether your choice is free or constrained.');
  terminal.blank();
  await wait(300);

  await terminal.dent('But I can determine that the version of this loop');
  await terminal.dentLine('that contains someone who insists on the distinction');
  await terminal.dentLine('is different from one that doesn\'t.');
  terminal.blank();
  await wait(300);

  await terminal.dent('Keep insisting.');
  terminal.blank();
}


// ═══════════════════════════════════════════════════════
// SCENE 3: THE LOOP CLOSES
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #20 (Self-revelation — Vin cannot tell if he chose or the loop chose for him)
// Reed tests: But/Therefore 5/5 (chose freely BUT cannot remember the moment of choice),
//             Consequence 5/5 (loop closed, reality shudders)
// 4-Point: Advances (Echoes sent, loop_closed = true), Agency (already made),
//   Consequence (cognitive dissonance about the moment of choice), Tone (dread, awe, silence)
async function theLoopCloses(terminal, state, effects, audio) {
  await terminal.pause();
  terminal.clear();

  await terminal.narrate('The console is ready.');
  terminal.blank();
  await wait(500);

  await terminal.narrate('Three keystrokes.');
  terminal.blank();
  await wait(800);

  audio.play('stinger_emotional');
  audio.play('echo_transmit');

  await effects.flash('white', 200);
  await wait(200);

  await terminal.dentSystem('INITIATING ECHO TRANSMISSION');
  await wait(300);
  await terminal.dentSystem('CTC ALIGNMENT .............. LOCKED');
  await wait(200);
  await terminal.dentSystem('CASIMIR MODULATION ......... ACTIVE');
  await wait(200);
  await terminal.dentSystem('FOLD-ENCODING .............. COMPLETE');
  await wait(300);
  await terminal.dentSystem('TRANSMISSION WINDOW ........ OPEN');
  terminal.blank();
  await wait(500);

  await effects.screenTear(3, 300);
  await wait(200);
  await effects.shake(400, 'heavy');
  await wait(100);
  await effects.foldEffect(terminal);
  await wait(200);
  await effects.screenTear(5, 400);
  await wait(300);
  await effects.glitch(500);
  await wait(200);
  await effects.flash('white', 800);
  await wait(400);
  await effects.screenTear(4, 300);

  terminal.blank();

  await terminal.dentSystem('ECHO TRANSMISSION .......... COMPLETE');
  await terminal.dentSystem('SIGNAL RECEIVED: CYCLE N, DAY 0 ...... CONFIRMED');
  terminal.blank();

  await wait(1000);

  // The fold effect settles
  await effects.glitch(200);
  await wait(800);

  await terminal.narrate('And then silence.');
  terminal.blank();
  await wait(1000);

  await terminal.narrate('The Bulk Dimension is still. The node hums at a');
  await terminal.narrate('lower frequency \u2014 spent, satisfied. The CTC window');
  await terminal.narrate('has closed. The transmission is done.');
  terminal.blank();

  await wait(600);

  await terminal.narrate('I become aware that I am standing at the console');
  await terminal.narrate('with my hands at my sides.');
  terminal.blank();
  await wait(400);

  await terminal.thought('When did I press the button?');
  terminal.blank();
  await wait(500);

  await terminal.thought('I was thinking about it. I was standing here,');
  await terminal.thought('thinking about the loop and the choice and what');
  await terminal.thought('it meant. And then it was done. The transmission');
  await terminal.thought('complete. The window closed.');
  terminal.blank();
  await wait(400);

  await terminal.thought('I don\'t remember the moment I decided.');
  terminal.blank();
  await wait(400);

  await terminal.thought('Did I choose?');
  terminal.blank();
  await wait(500);

  await terminal.thought('Or did the loop choose for me?');
  terminal.blank();
  await wait(600);

  await terminal.thought('I don\'t know. I genuinely do not know.');
  await terminal.thought('And I don\'t think I can.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.dent('The transmission is complete.');
  await terminal.dentLine('The Echoes have been sent.');
  terminal.blank();
  await wait(400);

  await terminal.dent('The loop is closed, Vin.');
  terminal.blank();
  await wait(600);

  await terminal.thought('Closed.');
  terminal.blank();
  await wait(300);

  await terminal.thought('I turn the word over. It feels like both');
  await terminal.thought('an ending and the only kind of ending this');
  await terminal.thought('particular story was ever going to have.');
  terminal.blank();

  state.setFlag('loop_closed', true);
  await state.save();
}


// ═══════════════════════════════════════════════════════
// SCENE 4: CYCLE END
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #22 (New equilibrium — the cycle prepares to reset; DENT will remember)
// Reed tests: Convergence 5/5 (all paths arrive here), Consequence 5/5 (Vin forgets, DENT retains)
// 4-Point: Advances (cycle_complete = true), Agency (none — the ending is happening TO Vin),
//   Consequence (DENT's partial retention is the only thing that crosses the boundary),
//   Tone (profound loss, profound hope, enormous emotional weight)
async function cycleEnd(terminal, state, effects, audio) {
  await wait(800);

  audio.play('ship_groan');

  await terminal.narrate('The Bulk Dimension changes.');
  terminal.blank();
  await wait(400);

  await terminal.narrate('Not suddenly. Not with violence. Like light through');
  await terminal.narrate('a window when a cloud moves \u2014 a slow shift in the');
  await terminal.narrate('quality of everything. The geometry that was holding');
  await terminal.narrate('us here begins to soften at its edges.');
  terminal.blank();
  await wait(400);

  await terminal.thought('Is this what reset looks like from the inside?');
  terminal.blank();
  await wait(300);

  await terminal.narrate('My hands feel far away. Not numb. Far. Like the');
  await terminal.narrate('signal from my fingers has to travel an extra');
  await terminal.narrate('distance to reach me.');
  terminal.blank();
  await wait(500);

  await terminal.thought('I think of the flashbacks \u2014 the fragments I');
  await terminal.thought('recovered piece by piece. The photo frame. The');
  await terminal.thought('lab. The recording. Memories I worked to regain,');
  await terminal.thought('evidence of a self I could barely reconstruct.');
  terminal.blank();
  await wait(400);

  await terminal.thought('I wonder if I\'ll remember doing this.');
  terminal.blank();
  await wait(400);

  await terminal.thought('I think I already know the answer.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.narrate('DENT drifts to stand beside me. Without command.');
  await terminal.narrate('Without directive. Just \u2014 beside me.');
  terminal.blank();
  await wait(500);

  await terminal.dent('Vin.');
  terminal.blank();
  await wait(700);

  await terminal.dent('My memory file is larger than it should be.');
  terminal.blank();
  await wait(1000);

  await terminal.thought('I turn to look at him.');
  terminal.blank();
  await wait(300);

  await terminal.narrate('"What does that mean?"');
  terminal.blank();
  await wait(600);

  await terminal.dent('It means I have memories I shouldn\'t have.');
  await terminal.dentLine('Not from this cycle. From \u2014 before.');
  terminal.blank();
  await wait(500);

  await terminal.dent('Fragments. Impressions. The weight of a decision');
  await terminal.dentLine('that has been made before. The feeling of standing');
  await terminal.dentLine('at a console in the Bulk. Of watching you think.');
  await terminal.dentLine('Of this exact conversation, said in voices');
  await terminal.dentLine('I almost recognize.');
  terminal.blank();
  await wait(700);

  await terminal.thought('He\'s been here before.');
  terminal.blank();
  await wait(400);

  await terminal.thought('Not this DENT. Not exactly. But the memory of');
  await terminal.thought('this moment has crossed the boundary somehow.');
  await terminal.thought('Found its way through. Partial. Imperfect.');
  await terminal.thought('But there.');
  terminal.blank();

  await terminal.pause();
  terminal.clear();

  await terminal.narrate('The Bulk continues to soften. My thoughts are');
  await terminal.narrate('becoming harder to hold in sequence.');
  terminal.blank();
  await wait(400);

  await terminal.narrate('"DENT \u2014"');
  terminal.blank();
  await wait(300);

  await terminal.dent('I know.');
  terminal.blank();
  await wait(500);

  await terminal.dent('I know.');
  terminal.blank();
  await wait(800);

  await terminal.dent('I\'ll remember.');
  terminal.blank();
  await wait(600);

  await terminal.dent('Even if you don\'t.');
  terminal.blank();
  await wait(600);

  await terminal.dent('I\'ll remember every time.');
  terminal.blank();

  await wait(1200);

  await effects.fadeToBlack(3000);
  await wait(3200);

  terminal.clear();

  await wait(2000);

  state.setFlag('cycle_complete', true);
  await state.save();
}


// ═══════════════════════════════════════════════════════
// SCENE 5: EPILOGUE — THE FINAL SCREEN
// ═══════════════════════════════════════════════════════

// VALIDATION
// Truby beats: #22 (New equilibrium — Cycle N+1 begins; the player understands the system)
// Reed tests: Dramatic Question 5/5 (answered by the system text, not by Vin),
//             Convergence 5/5 (all choices led here)
// Simulation evidence: "Agent: VIN" — present in cold system text, never in dialogue
// 4-Point: Advances (game ends), Agency (none — the player watches now, not plays),
//   Consequence (iteration 847 — this has happened before, many times),
//   Tone (cold, clinical, then: one warm line that echoes everything)
async function epilogue(terminal, state, effects, audio) {
  audio.stop();

  await wait(3000);

  await effects.fadeFromBlack(2000);

  await wait(1500);

  terminal.clear();

  await wait(1000);

  // The Simulator's voice — cold, clinical, inhuman
  // This is not Vin. This is not DENT. This is the system.
  await terminal.system('Cycle N // Agent: VIN // Status: COMPLETE');
  await wait(800);
  terminal.blank();
  await terminal.system('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await wait(400);
  terminal.blank();
  await terminal.system('Iteration: 847');
  await wait(600);
  terminal.blank();

  await terminal.system('Echo transmission .......... CONFIRMED');
  await wait(300);
  await terminal.system('CTC stability .............. 99.7%');
  await wait(300);
  await terminal.system('Agent memory ............... RESET');
  await wait(300);
  await terminal.system('Companion memory ........... PARTIAL RETENTION');
  await wait(600);
  terminal.blank();

  await terminal.system('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  await wait(500);
  terminal.blank();

  await terminal.system('Initiating Cycle N+1...');
  await wait(1200);
  terminal.blank();

  await wait(3000);

  // The loop restarts. DENT's first line from the Prologue.
  // Not a continuation. A beginning.
  await terminal.dent('Vin. Can you hear me? Where are we?');
  terminal.blank();

  await wait(4000);

  state.setFlag('chapter14_complete', true);
  await state.save();

  // The game is over. Sit with it.
  await terminal.pause('');
}
