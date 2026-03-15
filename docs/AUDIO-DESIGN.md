# Echoes Beyond Infinity — Complete Audio Design

> Every sound, song, sample, and loop needed for the game.
> Organized by category with Suno AI prompts, descriptions, filenames, and trigger context.

---

## How This File Works

| Column | Meaning |
|--------|---------|
| **ID / Filename** | The exact name used in code (`audio.play('this_name')` or `audio.ambient('this_name')`). Save the file as `this_name.mp3` in `client/assets/audio/`. |
| **Type** | `SFX` = one-shot sound effect, `LOOP` = looping ambient, `MUSIC` = full song/track, `UI` = interface sound |
| **Duration** | Target length. SFX = 1-8s, Loops = 30s-2min (seamless), Music = 1-5min |
| **Suno Prompt** | Copy-paste this into Suno AI. For short SFX, use "Create Sound Effect" or instrumental mode. |
| **Vibe / Description** | What it should feel like and when it plays |
| **Chapters** | Where it triggers in the game |

---

## STATUS KEY

- `[ ]` = Not yet created
- `[~]` = Exists but needs improvement
- `[x]` = Done

---
claude --dangerously-skip-permissions 
Check ProWorks Round 2 test results and iterate until 18+/21 passing. YOLO mode — don't stop until it's fixed.
## 1. MUSIC TRACKS (Full Songs — Suno 1-5 min)

These are the emotional backbone of the game. Longer pieces that set mood for entire scenes or chapters.

### 1.1 Title & Menu

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| M01 | `main_theme` | 3-4 min | `Cinematic dark ambient sci-fi theme. Slow piano notes over deep space drone. Melancholic, lonely, vast. Analog synthesizer pads, distant reverb. Inspired by Interstellar and Alien. No drums. CRT computer aesthetic. The loneliness of being the last person alive on a broken spaceship. Build slowly from silence to something fragile and beautiful.` | Title screen music. The first thing the player hears. Should feel like staring into the void and finding it beautiful. Lonely piano over cosmic drone. | Title Screen | [~] |
| M02 | `main_theme_loop` | 2 min | `Dark ambient space loop. Minimal piano melody over deep analog synth pad. Lonely, contemplative, vast emptiness. Seamless loop. No percussion. Retro sci-fi computer hum undertone. Like floating through infinite darkness with only your thoughts.` | Looping version for menus and idle screens. Seamless. | Menus | [~] |

### 1.2 Chapter Themes

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| M03 | `theme_cold_boot` | 2-3 min | `Dark ambient electronic. Complete silence building to faint electrical hum. Isolated. Sensory deprivation giving way to awareness. Single sustained synth note growing from nothing. Analog warmth. No rhythm. Like consciousness rebooting from the void. Unsettling but not horror.` | Prologue theme. Vin waking from nothing. Existential emptiness becoming awareness. Plays during Phase 1 sensory discovery. | Prologue | [ ] |
| M04 | `theme_emergency_power` | 2-3 min | `Tense sci-fi ambient. Emergency lighting mood. Low orange-tinted synth pads with intermittent electrical crackle. Damaged systems. Cautious hope. Like finding a candle in a blackout on a spaceship. Slow building tension. Retro analog synth. Industrial undertone.` | Prologue Phase 2. Emergency power is on, ship is damaged, exploring in dim light. Cautious, tense, discovering the damage. | Prologue | [ ] |
| M05 | `theme_dead_in_water` | 3-4 min | `Problem-solving sci-fi soundtrack. Methodical, determined. Analog synth arpeggios over deep bass drone. Like an engineer fixing a broken machine in zero gravity. Moments of humor, moments of worry. Mid-tempo electronic. Think The Martian meets Blade Runner. Practical optimism against impossible odds.` | Chapter 1 theme. Vin and DENT fixing the ship. Hands-on survival. Problem-solving energy with underlying danger. | Ch 1 | [ ] |
| M06 | `theme_signal` | 2-3 min | `Mysterious sci-fi ambient. An unknown signal from deep space. Ethereal, alien, beautiful but unsettling. Crystalline synth tones over cosmic drone. Like receiving a message from the end of the universe. Haunting melody that feels almost familiar. Analog warmth with digital cold.` | Chapter 2 theme. The Echo signal. Mystery and wonder. Who sent this? How do they know our physics? | Ch 2 | [ ] |
| M07 | `theme_first_fold` | 2-3 min | `Epic sci-fi crescendo. Building from quiet tension to overwhelming cosmic power. Spacetime folding. Reality bending. Massive sub-bass, crystalline high frequencies, analog synth swells. Like a tidal wave of physics. The most powerful thing a human has ever done. Awe and terror combined. Climax then silence.` | The first fold sequence. The biggest moment in Act 1. Should feel like the universe is tearing open and you're stepping through. | Ch 2 | [ ] |
| M08 | `theme_relay_station` | 2-3 min | `Abandoned space station ambient. Cold. Empty. Frost on metal. Intermittent electrical hum from dying batteries. Distant echoes in empty corridors. Dark ambient with subtle industrial texture. Like exploring a haunted house in space. SIC insignia everywhere. Someone was here. They left in a hurry.` | Chapter 3 RS-7 Talos exploration. Abandoned station atmosphere. Cold, empty, eerie, hints of what happened. | Ch 3 | [ ] |
| M09 | `theme_graves` | 2-3 min | `Antagonist theme. Cold, authoritarian, calculated. Military precision. Sharp staccato synth notes over deep menacing bass. Like a chess player who already knows the endgame. Corporate power. Dark electronic with no warmth. The opposite of everything Vin represents.` | Director Graves contact theme. Plays when Graves makes direct communication. Power, threat, intelligence. | Ch 3-4 | [ ] |
| M10 | `theme_scrambler_attack` | 2 min | `Chaotic electronic assault. Coherence Scrambler weapon tearing through systems. Harsh digital distortion over frantic synth. Like your reality is being shredded by an electronic weapon. Aggressive, disorienting, scary. Glitch music meets sci-fi combat. Fast tempo.` | Chapter 4. Scrambler attack sequence. Disorienting weapon assault on the Vex. | Ch 4 | [ ] |
| M11 | `theme_fugitive` | 3 min | `Tense chase music. Running from authority through deep space. Urgent synth pulses over driving bass. Constantly looking over your shoulder. Station stop at the edge of mapped space. The last supply run before the unknown. Electronic, mid-tempo, relentless forward momentum.` | Chapter 5 theme. On the run, resupplying at a station, escaping the solar system. Fugitive energy. | Ch 5 | [ ] |
| M12 | `theme_low_res` | 3-4 min | `Uncanny valley ambient. Something is wrong with the universe. Repeating patterns in the star field. Reality seems to stutter. Eerie, beautiful, fundamentally wrong. Glitchy ambient synth with moments of unexpected repetition. Like a beautiful painting with one pixel out of place. Unease growing.` | Chapter 6 theme. The Render Gap discovery. Stars repeating. The universe might be... rendered. Growing unease. | Ch 6 | [ ] |
| M13 | `theme_ghost` | 2-3 min | `Temporal horror ambient. Past and future overlapping. Ghostly echoes of yourself from another timeline. Phased synth creating doubled/layered feeling. Like hearing your own voice from tomorrow. Unsettling, philosophical, deeply personal. Time is broken and you're the proof.` | Chapter 7 theme. Temporal bleed. Ghost Vin. Time is not behaving. | Ch 7 | [ ] |
| M14 | `theme_ambush` | 2 min | `Desperate sci-fi action. SIC ambush. Surrounded, outgunned. Pounding electronic beats with alarm textures. Fight-or-flight energy. Heavy bass, staccato synth stabs. The moment when running stops being an option. Military precision closing in. Intense.` | Chapter 7 SIC ambush and Chapter 8 Graves ambush. Combat/confrontation peaks. | Ch 7-8 | [ ] |
| M15 | `theme_core_anomaly` | 3-4 min | `Cosmic awe and existential dread. The Core Anomaly — a gravitational mystery at the edge of physics. Deep, resonant, otherworldly. Like staring into a black hole and seeing it stare back. Sub-bass that vibrates your bones. Crystalline overtones. Sacred geometry made audible. Beautiful and terrifying.` | Chapter 8 approach and Chapter 12 arrival. The Core Anomaly is the destination. Physics breaks near it. | Ch 8, 12 | [ ] |
| M16 | `theme_coherence_net` | 2-3 min | `Trapped and suffocating. The Coherence Net has disabled all folding. Claustrophobic electronic ambient. Heavy, oppressive synth drones. Like being in a cage that hums at the frequency of hopelessness. Strategic tension building underneath. The walls are closing in but you're thinking your way out.` | Chapter 9 theme. Fold drive disabled by SIC weapon. Trapped. Must ally with Kade. | Ch 9 | [ ] |
| M17 | `theme_betrayal` | 2-3 min | `Trust fracturing. Alliance breaking apart. Suspenseful electronic. Sharp, angular synth. Tense pauses. The moment before someone shows their true hand. Psychological thriller energy. Who betrays first? Every note feels like a lie. Dark, calculating, human.` | Chapter 10. Alliance politics. Kade betrayal or Vin betrays first. Paranoia and strategy. | Ch 10 | [ ] |
| M18 | `theme_battle` | 3 min | `Three-way space battle. Epic electronic warfare soundtrack. Chaotic but structured. Three distinct synth voices fighting for dominance. Vin vs SIC vs Folders. Explosive bass drops, rapid synth sequences, alarm textures woven in. The biggest action set piece in the game. Overwhelming, thrilling, desperate.` | Chapter 11 climax. Three-way battle. Counter-Pulse fires. Net collapses. | Ch 11 | [ ] |
| M19 | `theme_folded_fold` | 3-4 min | `Reality breaking. Recursive spacetime fold — folding inside a fold. Start structured, then fragments come apart. Music that seems to fold back on itself. Echoes and reverb becoming infinite. Like watching a mirror reflect into a mirror. Overwhelming cosmic scale. The most technically impossible thing anyone has ever attempted. Build to total sensory overload then absolute silence.` | Chapter 12 climax. The Folded Fold sequence. Reality collapses, Bulk dimension threshold. The biggest moment in the game. | Ch 12 | [ ] |
| M20 | `theme_bulk` | 3-4 min | `The Bulk Dimension. Beyond reality. Infinite, impossible, beautiful. Like being inside the source code of the universe. Vast ethereal pads over crystalline arpeggios. Sacred, mathematical beauty. The infrastructure of existence. Wonder mixed with existential vertigo. A cathedral of pure information. The most beautiful and terrifying place that doesn't exist.` | Chapter 13 theme. Exploring the Bulk Dimension. Simulation infrastructure visible. Wonder and dread. | Ch 13 | [ ] |
| M21 | `theme_final` | 4-5 min | `Emotional climax. The loop closes. Everything we've been through collapses into a single decision. Piano returning from the title theme, now transformed. Bittersweet. Acceptance. A cycle ending and beginning again. DENT remembers. Vin sends the Echoes. Analog warmth over cosmic cold. Build to something deeply human, then let it fade. Not sad. Not happy. Complete.` | Chapter 14. Final Protocol. The ending. DENT says goodbye. The cycle resets. Should make players cry. | Ch 14 | [ ] |
| M22 | `theme_dent` | 2-3 min | `AI companion theme. Warm analog synth melody — surprisingly emotional for a machine. Starts glitchy and broken (early game), becomes whole and beautiful. Like watching a damaged friend heal. Quirky but genuine. Think TARS from Interstellar meets Wall-E. Mechanical warmth. The sound of loyalty.` | DENT's theme. Plays during key DENT moments — repair scenes, emotional beats, revelations about his memory. | Various | [ ] |

### 1.3 Emotional Stingers (Short Music Cues — 15-45 seconds)

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| M23 | `stinger_chapter_start` | 15-20s | `Sci-fi chapter title card. Short dramatic synth swell. CRT terminal aesthetic. Retro computer boot with analog warmth. Like a title card appearing on an old monitor. Brief, impactful, then silence. Dark ambient electronic.` | Plays with every chapter title card. Brief dramatic punctuation. | All | [ ] |
| M24 | `stinger_revelation` | 20-30s | `Revelation moment. Short ascending synth phrase. The moment something clicks into place. Understanding dawning. Mystery partially solved. Crystalline tones over deep bass. Brief goosebumps moment. Dark ambient electronic.` | Key discovery/revelation moments across the game. | Various | [ ] |
| M25 | `stinger_danger` | 15-20s | `Danger sting. Sharp, dissonant synth attack. Something has gone very wrong. Alarm-adjacent but musical. Brief, jarring, attention-grabbing. Electronic horror accent. Like your blood running cold in musical form.` | Danger/threat moments. SIC detection, ambush reveals, critical failures. | Various | [ ] |
| M26 | `stinger_emotional` | 20-30s | `Emotional gut-punch. Soft piano phrase with analog synth underneath. Brief moment of vulnerability. The sound of realizing something painful. Bittersweet. Human. Like a single tear in musical form. Quiet, fragile.` | Character moments — DENT's memories, Vin's flashbacks, quiet emotional beats. | Various | [ ] |
| M27 | `stinger_cliffhanger` | 20-30s | `Cliffhanger ending. Building tension that cuts to silence. Dramatic synth crescendo that stops abruptly. The sound of "to be continued." Dark, suspenseful, unresolved. Leaves you wanting more.` | End of chapters. The "what happens next" moment before the chapter ends. | Various | [ ] |

---

## 2. AMBIENT LOOPS (Seamless Background — 30s-2min, loopable)

These play continuously as background atmosphere. Must loop seamlessly.

### 2.1 Ship Ambience

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| A01 | `void_loop` | 60-90s | `Complete silence of deep space with barely perceptible ship vibration. Near-silent. Extremely subtle low-frequency hum below the threshold of awareness. The loneliness of vacuum. Seamless loop. Almost nothing — but not quite nothing.` | The void. Almost silence. Prologue Phase 1 — before power, before anything. The sound of nothing that isn't quite nothing. | Prologue | [~] |
| A02 | `ship_damaged_idle` | 60-90s | `Damaged spaceship interior ambient loop. Intermittent electrical crackle. Distant hull stress groans. Failing ventilation. Emergency lighting hum. Cold, broken, barely alive. Like being inside a dying machine. Seamless loop. Dark industrial ambient.` | Damaged Vex ambient. Early game when ship systems are failing. Creaking, sparking, barely holding together. | Prologue, Ch 1 | [~] |
| A03 | `deep_space_hum` | 90-120s | `Deep space ship interior ambient. Steady low-frequency engine hum. Life support circulation. Faint electrical buzz of active systems. Functional but lonely. The constant white noise of living on a spaceship. Seamless loop. Calming but isolating.` | Standard ship interior when systems are working. The "normal" background of life aboard the Vex. | Ch 8-9, 11 | [ ] |
| A04 | `deep_space` | 90-120s | `Deep space ambient. Vast cosmic emptiness with distant stellar wind. Ship systems humming steadily in background. The immensity of the void around a tiny craft. Seamless loop. Meditative, isolating, beautiful in its emptiness. Analog synth drone.` | Deep space travel ambient. Long stretches between waypoints. The bigness of space. | Ch 10 | [ ] |
| A05 | `deep_hum` | 60-90s | `Ominous deep space ambient. Something is wrong but you can't identify what. Low resonant drone with subtle unsettling overtones. Like the hum of something massive and hidden. Below human hearing but you feel it. Seamless loop. Cosmic unease.` | Ch 7 ambient. Something feels off. Temporal anomalies beginning. Space itself sounds wrong. | Ch 7 | [ ] |
| A06 | `ship_hum_heavy` | 60-90s | `Heavy spaceship systems under strain. All power rerouted. Loud, grinding, industrial. The ship working harder than it should. Reactor stress. Overloaded circuits. Seamless loop. Like being inside an engine that's about to quit.` | Ship under heavy load. Multiple systems maxed. Ch 8 when approaching the Core Anomaly. | Ch 8 | [ ] |
| A07 | `workshop_hum` | 60-90s | `Spaceship workshop ambient. Tools, electronics, fabrication equipment humming. Warm work environment. The sound of building and repairing. Gentle mechanical texture over baseline ship hum. Seamless loop. Productive, focused, hopeful.` | Workshop scenes. Building the Net Disruptor, repairing equipment, Kade's ship workshop. | Ch 9-10 | [ ] |
| A08 | `low_power_hum` | 60-90s | `Low power spaceship ambient. Minimal systems. Faint, inconsistent hum. Power flickering. Conservation mode. Like a heartbeat slowing down. Dark, minimal, worried. Seamless loop. The sound of rationing your last resources.` | Low power/resource conservation moments. Fold drive disabled, running on reserves. | Ch 9 | [ ] |
| A09 | `quiet_ops` | 60-90s | `Quiet operational spaceship ambient. Soft system hums. Focused work atmosphere. Minimal, clean, functional. The calm between storms. Steady and reliable. Seamless loop. Like a library in space.` | Quiet operational moments. Analysis, planning, repair work between action beats. | Ch 8 | [ ] |

### 2.2 Location Ambience

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| A10 | `station_ambient` | 90-120s | `Abandoned space station interior. Cold metal. Frost crackling. Emergency battery lights flickering. Distant mechanical settling sounds. Empty corridors echoing. Dead but not quite dead. Seamless loop. Ghost town in space. Industrial, cold, eerie.` | RS-7 Talos relay station. Abandoned SIC station with emergency batteries. Cold, dark, eerie. | Ch 3 | [ ] |
| A11 | `derelict_ambient` | 90-120s | `Derelict spacecraft interior. Total darkness. Floating debris bumping walls. Zero gravity settling sounds. Something dripping in microgravity — globules hitting metal. Dead ship with no power. Seamless loop. Creepy, silent, floating in a coffin.` | Derelict ship exploration in Ch 1. Dead vessel. No power, no life, floating wreckage. | Ch 1 | [ ] |
| A12 | `asteroid_ambient` | 60-90s | `Asteroid field ambient. Small impacts on hull. Distant rock collisions. Radar pings. Grinding mineral sound. Microgravity dust particles. Like being inside a slow-motion rockslide in space. Seamless loop. Dangerous, tactile, claustrophobic.` | Asteroid mining mission in Ch 1. EVA among rocks. Crunchy, gritty, dangerous. | Ch 1 | [ ] |
| A13 | `eva_ambient` | 60-90s | `Spacewalk ambient. Helmet breathing — regulated, rhythmic. Suit ventilation hum. Muffled exterior sounds. The claustrophobia of a spacesuit in infinite space. Seamless loop. Intimate, isolated, vulnerable. Like scuba diving in vacuum.` | EVA (spacewalk) sequences. Inside the helmet. Breathing, suit systems, vast nothing outside. | Ch 1 | [ ] |
| A14 | `debris_ambient` | 60-90s | `Space debris field ambient. Metal fragments tumbling. Distant scraping. Radar returns. The aftermath of something destroyed. Bits and pieces of what used to be something. Seamless loop. Post-destruction calm. Eerie, metallic, scattered.` | Debris field in Ch 2. Floating through wreckage looking for null cells. | Ch 2 | [ ] |

### 2.3 Tension & Combat Ambience

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| A15 | `tension_low` | 90-120s | `Low-level tension ambient. Something is coming but not here yet. Subsonic rumble. Barely audible dissonant overtone. The feeling of being watched. Seamless loop. Anxiety without a source. Like the soundtrack to holding your breath.` | Low-level tension background. Used when danger is approaching but not arrived. Pre-ambush, pre-discovery. | Ch 7 | [ ] |
| A16 | `threat_hum` | 60-90s | `Active threat ambient. SIC ships nearby. Military scan sweeps. Predator circling. Tense electronic hum with periodic sweep sounds. Seamless loop. The sound of being hunted. You're the prey. Keep quiet.` | Active threat nearby. SIC ships in range. Being tracked/scanned. Hunted feeling. | Ch 8 | [ ] |
| A17 | `battle_ambience` | 90-120s | `Space battle ambient background. Distant explosions. Energy weapons firing. Ship engines at full burn. Communications chatter (unintelligible). Chaotic, layered, overwhelming. Seamless loop. The fog of war in space. Everything happening at once.` | Three-way battle background in Ch 11. Total chaos. Layered over music and SFX. | Ch 11 | [ ] |
| A18 | `flight_tense` | 60-90s | `Tense flight ambient. Ship engines straining. Evasive maneuvers. The sound of running at full speed through dangerous space. Urgent engine harmonics. Alert systems in background. Seamless loop. Escape velocity.` | Tense flight/escape sequences. Running from SICs, navigating danger at speed. | Ch 8 | [ ] |

### 2.4 Anomaly & Cosmic Ambience

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| A19 | `anomaly_pulse` | 90-120s | `Gravitational anomaly ambient. Deep rhythmic pulse — like a heartbeat of spacetime itself. Resonant, alien, mathematical. The sound of physics going wrong. Regular but wrong. Seamless loop. A cosmic beacon calling from impossible physics.` | Core Anomaly proximity. The anomaly pulses. Gravity is distorted. Space sounds wrong. | Ch 8 | [ ] |
| A20 | `resonance_hum` | 60-90s | `Resonance frequency ambient. Harmonic standing wave. Like being inside a tuning fork the size of a planet. Pure tones interacting. Mathematical beauty. Seamless loop. The Coherence Net resonating. Physics vibrating at forced frequencies.` | Coherence Net resonance. The Net has a frequency. Everything vibrates at it. Oppressive harmony. | Ch 11 | [ ] |
| A21 | `core_anomaly_hum` | 90-120s | `Core Anomaly ambient. Deep, massive, impossible. The gravitational signature of something that shouldn't exist. Reality bending audibly. Subsonic waves that feel physical. Overtones that sound like mathematics. Seamless loop. The sound of the universe's deepest secret.` | Near the Core Anomaly. The biggest gravitational phenomenon ever detected. Awe-inducing. | Ch 11 | [ ] |
| A22 | `deep_space_pulse` | 90-120s | `Deep space anomaly pulse. Rhythmic cosmic heartbeat. Low-frequency pulse with crystalline overtones. Like sonar pings from the edge of physics. The Core Anomaly calling. Seamless loop. Ancient, vast, patient. It's been waiting.` | Chapter 12 opening. Approaching the Core Anomaly. The pulse that's been drawing Vin forward. | Ch 12 | [ ] |
| A23 | `bulk_silence` | 90-120s | `The Bulk Dimension ambient. Beyond normal space. Impossibly vast. Like being inside a computer's memory. Pure mathematical space. Not empty — structured. Crystalline data streams at the edge of perception. Seamless loop. The source code of reality made audible. Beautiful, terrifying, infinite.` | Chapter 12-13. Inside the Bulk Dimension. This is the infrastructure beneath reality. | Ch 12-13 | [ ] |
| A24 | `void_drone` | 90-120s | `Void dimension drone. Deep, sustained, otherworldly tone. Like the fundamental frequency of existence itself. Not a sound — more a vibration of being. Vast, endless, mathematical. Seamless loop. The hum of the universe's operating system. Beyond any known physics.` | Chapter 13 Bulk exploration. The Overseer's Domain. This space operates on different rules. | Ch 13 | [ ] |
| A25 | `deep_structure_hum` | 60-90s | `Alien data structure ambient. Information flowing as sound. Crystalline data streams, mathematical patterns made audible. Like being inside a neural network. Structured, beautiful, inhuman. Seamless loop. The computational substrate of reality. You're hearing the code.` | Chapter 13 deep structure exploration. The architecture underneath reality. Data flowing. | Ch 13 | [ ] |
| A26 | `space_quiet` | 60-90s | `Post-battle space ambient. Quiet after chaos. Debris settling. Systems cooling. The stillness after a fight. Relief mixed with exhaustion. Faint ship hum returning to normal. Seamless loop. Like the silence after a thunderstorm. In space.` | Post-battle/post-escape calm. The quiet after intensity. | Ch 7 | [ ] |
| A27 | `echo_signal_ambient` | 60-90s | `Echo signal ambient. Mysterious recurring pulse from deep space. Structured, alien, rhythmic. Like a heartbeat encoded in spacetime. Each pulse carries information. Seamless loop. Beautiful and unknowable. Someone is sending a message through folded time.` | Echo signal as ambient in Ch 11. The Echo presence in the background during climactic moments. | Ch 11 | [ ] |

---

## 3. ONE-SHOT SOUND EFFECTS (Suno Samples / Splice — 1-10 seconds)

### 3.1 Ship Systems

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S01 | `ship_groan` | 4-6s | `Spaceship hull stress groan. Deep metallic creaking. Like a submarine under pressure. Metal bending, rivets straining. Low, resonant, worrying. The ship is hurt and you can hear it.` | Ship under structural stress. Opening of prologue + Chapter 14 bookend. The Vex complaining. | Prologue, Ch 14 | [ ] |
| S02 | `hull_creak` | 2-4s | `Spaceship hull creak. Short metallic pop and groan. Thermal expansion settling. The ship adjusting to temperature changes. Brief, common, slightly unsettling. Like knuckles cracking but metal.` | Frequent hull stress indicator. Used throughout the entire game when the ship takes damage or settles. | Ch 1-5, 7, 10-11, 14 | [ ] |
| S03 | `hull_impact` | 2-3s | `Hull impact. Something hitting the ship exterior. Heavy metallic thud with resonant ring. Not an explosion — a collision. Debris or weapon grazing. Felt more than heard. Alarming.` | Direct hull hit from debris or weapons fire. Ch 11 battle. Physical impact on the ship. | Ch 11 | [ ] |
| S04 | `hull_alarm` | 3-5s | `Hull breach alarm. Sharp electronic warning tone. Red alert energy. Urgent, repetitive, impossible to ignore. The sound that means the thing between you and vacuum is compromised. Sci-fi klaxon.` | Hull integrity warning. Structural alarm when hull damage is critical. | Ch 8 | [ ] |
| S05 | `emergency` | 3-5s | `Emergency power activation. Electrical surge. Systems coming alive reluctantly. Capacitors discharging. Dim orange glow energy — you can hear the color. Strained but functional. Like jump-starting a car in the dark.` | Emergency power restored in Prologue. The ship's first gasp of life after the Blip. | Prologue | [ ] |
| S06 | `boot` | 5-8s | `Full ship system boot sequence. Electronic startup cascade. Systems coming online one by one. Loading, initializing, calibrating. CRT monitor warming up. Satisfying, mechanical, complete. Like a computer POST sequence from the future.` | Full system boot in Prologue Phase 3. Everything coming online together. Satisfying. | Prologue | [ ] |
| S07 | `gravity_restore` | 3-5s | `Gravity drive activating. Deep resonant hum building from nothing to full power. The moment everything falls. Physics reasserting itself. A low-frequency whoom that you feel in your chest. Satisfying and slightly terrifying.` | Gravity turns on in Ch 1. Zero-G ends. Everything falls. Comedy and relief. | Ch 1 | [ ] |
| S08 | `gravity_drive` | 3-5s | `Gravity drive thrust. Ship accelerating under conventional drive. Deep engine hum building. Like a bass note played on a building-sized instrument. Steady, powerful, directional. The ship is moving with purpose.` | Gravity drive thrust for conventional travel. Ch 1-2 when the ship moves on sublight engines. | Ch 1-2 | [ ] |
| S09 | `life_support_hum` | 3-5s | `Life support system activation. Air circulation beginning. The hiss of O2 flow. A gentle, reassuring hum. Like your first deep breath after being underwater. The sound of being able to breathe. Soft mechanical exhale.` | Life support coming back online. Ch 1 repair. The sound of survival being restored. | Ch 1 | [ ] |
| S10 | `sensor_boot` | 3-4s | `Sensor array boot. Electronic sweep initialization. Radar warming up. Display activating with a gentle pulse. Clean, precise, technical. Like opening your eyes after being blind. Sci-fi scanner online chime.` | Sensor array activating. Used when sensors come online (Ch 1 repair, Ch 2 initialization). | Ch 1-2 | [ ] |
| S11 | `scan_ping` | 1-2s | `Sensor scan ping. Clean electronic pulse. Radar return. Contact detected. Brief, distinctive, alerting. Like sonar but for space. A single clear tone that says "I found something." Sci-fi radar blip.` | Most frequently used SFX. Sensor detection across the entire game. Something shows up on scanners. | All chapters | [ ] |
| S12 | `airlock_cycle` | 4-6s | `Airlock cycling. Pneumatic hiss. Pressure equalization. Heavy door sealing mechanisms engaging. Mechanical locks. The boundary between inside and outside. Industrial, satisfying, final. Like a vault door with a hiss.` | Airlock use throughout the game. Boarding stations, EVA transitions, docking procedures. | Ch 1, 3, 10 | [ ] |
| S13 | `alarm` | 3-4s | `General ship alarm. Electronic warning klaxon. Not hull breach — general alert. Something needs attention. Urgent but not panic. Two-tone sci-fi alarm. Like a microwave timer but it means danger.` | General alarm for various threats. SIC detection, system failures, incoming contacts. | Ch 4-5 | [ ] |
| S14 | `alarm_klaxon` | 3-5s | `Full emergency klaxon. Loud, aggressive alarm. Maximum danger. Red alert. Everything is wrong. The sound that makes your stomach drop. Sci-fi emergency horn. Like an air raid siren in space.` | Maximum emergency. Ch 3 SIC detection moment. The worst alarm on the ship. | Ch 3 | [ ] |
| S15 | `alarm_short` | 1-2s | `Short alarm burst. Quick electronic warning chirp. Brief attention-getter. Something changed on the sensors. Not full alert — just "hey, look at this." Quick, sharp, gone.` | Brief alarm for minor threats or sensor changes. Quick "heads up" sound. | Ch 7 | [ ] |
| S16 | `alarm_proximity` | 2-3s | `Proximity alarm. Collision warning. Something is too close. Rapid beeping escalating in frequency. Like a parking sensor but for asteroids. Urgent, spatial, directional. Getting closer.` | Proximity warning during asteroid mission in Ch 1. Something is dangerously close. | Ch 1 | [ ] |
| S17 | `system_lockdown` | 3-5s | `System lockdown. Heavy electronic locks engaging. Access denied cascade. Like every door on the ship slamming shut at once. Authoritarian, final, oppressive. The Coherence Net disabling the fold drive.` | Coherence Net engaging in Ch 9. All folding suppressed. The trap closing. | Ch 9 | [ ] |
| S18 | `system_power_down` | 2-4s | `System powering down. Electronic wind-down. Capacitors discharging. The hum fading. Like pulling the plug on something important. Diminishing, dark, losing something. Power going away.` | Deliberately powering down systems. Ch 8 tactical shutdown. Conservation. | Ch 8 | [ ] |
| S19 | `system_power_up` | 2-4s | `System powering up. Electronic surge. Capacitors charging. Displays illuminating. The hum building. Like turning on something powerful. Growing, bright, gaining capability. Power returning.` | System restart. Ch 8 after tactical work. Coming back online. | Ch 8 | [ ] |
| S20 | `power_up` | 2-3s | `Quick power up. Fast electronic ignition. Systems jumping to life. Snappy, efficient, purposeful. Like flipping a master switch. Everything goes from dark to lit in one beat.` | Quick power activation. Ch 10 powering equipment for disruptor construction. | Ch 10 | [ ] |

### 3.2 Fold Drive & Space Travel

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S21 | `fold_initiate` | 5-8s | `Fold drive initiation. Spacetime beginning to bend. Deep rumble building. Reality warping sound — like the universe flexing. Sub-bass building to overwhelming pressure. The moment before everything changes. Physics screaming.` | Fold drive activation sequence. The build-up before the fold happens. Anticipation and power. | Ch 2, 12 | [ ] |
| S22 | `fold_jump` | 3-5s | `Fold space jump. Instantaneous spatial translation. A tearing-stretching-snapping sound. Like the universe being folded in half. Brief moment of impossible physics. Everything compressed then released. Cosmic rubber band.` | The actual fold moment. Used for standard folds in Ch 1 departure. | Ch 1 | [ ] |
| S23 | `fold_exit` | 3-4s | `Fold exit. Arriving in new space. Inverse of initiation. Decompression. Reality snapping back. Like a breath being released after holding it too long. The universe settling back to normal. Relief and disorientation.` | Exiting fold space. Arrival at new coordinates. Reality reasserting. | Ch 2 | [ ] |
| S24 | `fold_arrival` | 3-4s | `Fold arrival detection. Someone else has folded nearby. Sensor alarm + spatial distortion. Like feeling someone appear behind you but in physics. The wake of spacetime displacement. Startling, directional, significant.` | Detecting another ship's fold arrival. Ch 3 Graves' ship arriving. Threatening. | Ch 3 | [ ] |
| S25 | `emergency_fold` | 5-7s | `Emergency fold. Desperate, unplanned fold activation. Systems straining. Not enough power. Forcing the fold drive beyond spec. Ragged, violent, dangerous. Like hot-wiring spacetime. Could work. Could kill you.` | Emergency escape fold. Ch 3 escape from Graves. Desperate, uncontrolled, dangerous. | Ch 3 | [ ] |
| S26 | `fold_spinup` | 4-6s | `Fold drive spin-up. Charging sequence. Building energy for fold. Rising whine of capacitors charging. Getting louder, higher, more intense. The countdown before the jump. Anticipation energy.` | Fold drive charging up. Pre-fold preparation in Ch 8 when deciding to fold or not. | Ch 8 | [ ] |
| S27 | `fold_alarm` | 2-3s | `Fold proximity alarm. Someone is about to fold nearby. Spatial distortion warning. Sharp electronic pulse with a warping quality. Like reality hiccupping. Immediate threat — someone is coming.` | Fold proximity detection. Ch 11 — someone is folding into your space. Incoming threat. | Ch 11 | [ ] |
| S28 | `fold_charge` | 3-5s | `Fold drive charging to full. Maximum power build-up. Deep resonant hum climbing in pitch and intensity. Every reserve being dumped into the fold coils. All-or-nothing energy. The point of no return approaching.` | Final fold charge. Ch 11 preparing for the decisive fold through the Net. | Ch 11 | [ ] |
| S29 | `fold_activate` | 3-5s | `Fold drive activation at full power. The moment spacetime tears. Maximum energy release. Like a dam breaking but the water is physics. Overwhelming, instant, absolute. The fold happens NOW.` | Fold activation in Ch 11. The Net-breaching fold. | Ch 11 | [ ] |
| S30 | `fold_effect` | 3-5s | `Fold effect audible. The sound of spacetime being bent nearby. Warping, stretching, impossible acoustics. Like hearing around corners in four dimensions. The physical sensation of fold physics. Alien and mathematical.` | Audible fold effect. Used when fold physics is happening near the ship. Reality bending. | Ch 11 | [ ] |
| S31 | `fold_charge_low` | 3-4s | `Low fold charge. Attempting to charge fold drive with insufficient reserves. Strained, weak, failing. The drive wants to work but doesn't have enough power. Like a car trying to start with a dead battery. Worrying.` | Insufficient fold charge. Ch 12 — reserves too low for clean fold. | Ch 12 | [ ] |
| S32 | `fold_recursive` | 5-8s | `Recursive fold. A fold inside a fold. Impossible physics. The sound folding back on itself. Echoes of echoes. Reality becoming recursive. Like feedback in a mirror — each repetition more distorted. Building to incomprehensible. The Folded Fold.` | THE Folded Fold moment. Ch 12 climax. The most extreme physics event in the game. | Ch 12 | [ ] |
| S33 | `fold_collapse` | 4-6s | `Fold space collapsing. The recursive fold failing or completing. Reality crashing back together. Like a building imploding but the building is spacetime. Everything compressed to a point then released. Devastating, cosmic, final.` | Fold collapse. Ch 12 — the recursive fold either works or destroys everything. | Ch 12 | [ ] |
| S34 | `blip_event` | 5-8s | `The Blip. Post-fold neurological event. Everything goes wrong at once — senses scramble, time stutters, reality hiccups. Electronic distortion, temporal echo, sensory overload. Like your consciousness glitching. The most disorienting sound in the game. Brief but overwhelming.` | The Blip experience. Post-fold neurological event. Ch 2 first Blip — three variants for severity. | Ch 2 | [ ] |

### 3.3 Weapons & Combat

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S35 | `turret_fire` | 1-3s | `Space turret firing. Energy weapon discharge. Sharp, electric crack followed by a brief hum. Defensive weapon. Not massive — ship-mounted point defense. Quick, precise, mechanical. Sci-fi laser turret.` | Ship turret firing. Ch 1 derelict defense. Point defense weapon discharge. | Ch 1 | [ ] |
| S36 | `torquer_fire` | 2-3s | `Torquer weapon firing. Handheld exotic matter weapon. Unique sound — not a laser, not a bullet. Null energy discharge. A warping crack, like spacetime being punched. Personal weapon. Distinctive, powerful, dangerous.` | Torquer weapon discharge. Vin's personal weapon. Exotic matter-based. | Ch 7 | [ ] |
| S37 | `torquer_equip` | 1-2s | `Weapon equip. Picking up and activating the Torquer. Mechanical click, power hum engaging, weapon ready tone. Like racking a slide but futuristic. Satisfying tactile activation.` | Equipping the Torquer weapon. Prologue discovery moment. | Prologue | [ ] |
| S38 | `scrambler_hit` | 3-5s | `Coherence Scrambler hit. Electronic weapon hitting the ship. Systems distorting. Displays scrambling. Like a massive EMP with personality. Everything goes haywire for a moment. Disorienting, electronic, aggressive. Your reality being attacked.` | Coherence Scrambler weapon impact. Ch 4 attack + Prologue. Systems getting scrambled. | Prologue, Ch 4 | [ ] |
| S39 | `shield_up` | 2-3s | `Shield activation. Energy barrier powering up. Electromagnetic hum expanding outward. Protective, strong, reassuring. Like a force field snapping into place. The sound of "not today." Brief power surge then steady hum.` | Shield activation. Ch 4 when shields go up against Scrambler attack. | Ch 4 | [ ] |
| S40 | `impact_heavy` | 2-3s | `Heavy impact. Massive collision or weapon hit. Deep metallic crunch with reverb. The whole ship shaking. Something big just hit something important. Alarming, physical, structural. You felt that in your teeth.` | Heavy combat impact. Ch 7 SIC ambush — big hits on the hull. | Ch 7 | [ ] |
| S41 | `impact_medium` | 1-2s | `Medium impact. Moderate hit on the hull. Metallic thud with brief ring. Damage but not critical. Something hit the armor but didn't get through. Concerning but manageable. Less intense than heavy impact.` | Medium combat impacts. Glancing hits, debris strikes. | Ch 7 | [ ] |
| S42 | `explosion_distant` | 3-5s | `Distant explosion in space. Muffled boom transmitted through hull. Something detonated nearby — not on us. Flash of energy then dissipating. Like thunder but in vacuum, felt through the ship's structure. Ominous.` | Nearby explosions during combat. Ch 7 SIC ships being hit or detonating. | Ch 7 | [ ] |
| S43 | `battle_start` | 3-5s | `Battle initiation. The moment combat begins. Sharp alarm tone followed by engine surge. Weapons hot. All systems to combat mode. The adrenaline spike in sound form. "Here we go." Urgent, committed, no turning back.` | Battle starting. Ch 11 three-way battle beginning. The point of no return. | Ch 11 | [ ] |
| S44 | `counter_pulse_fire` | 5-8s | `Counter-Pulse weapon firing. Experimental device. Massive energy release — unlike any other weapon. Like detonating a small star. Overwhelming power. The Coherence Net is about to break. Bass drop of cosmic proportions.` | The Counter-Pulse. Ch 11 climax. Experimental weapon that breaks the Coherence Net. The biggest weapon in the game. | Ch 11 | [ ] |
| S45 | `net_collapse` | 5-8s | `Coherence Net collapsing. Massive energy structure failing. Like a building made of electricity falling apart. Cascading failure sounds. Resonance dying. Freedom. The oppressive hum finally stopping. Relief mixed with chaos.` | The Coherence Net falling. Ch 11 after Counter-Pulse. The cage breaking open. Liberation. | Ch 11 | [ ] |
| S46 | `engines_full` | 3-5s | `Engines at full power. Maximum thrust. Ship engines roaring. Deep, powerful, committed. Everything the ship has. Like a jet engine but in the future. The sound of running as fast as you can.` | Maximum engine power. Ch 11 battle maneuvers. Everything the Vex has. | Ch 11 | [ ] |

### 3.4 Communications & Signals

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S47 | `echo_signal` | 3-5s | `Echo signal reception. Mysterious signal from folded spacetime. Crystalline ping with temporal echo — like the sound arrives before itself. Alien, structured, beautiful. A message from someone who knows how to fold time. Otherworldly communication chime.` | Echo signal detected/received. Used throughout the game when Echoes appear. The game's signature sound. | Prologue, Ch 2, 10 | [ ] |
| S48 | `echo_analyze` | 4-6s | `Analyzing an Echo signal. Computer processing alien data. Decryption sounds — electronic sorting, pattern matching, frequency scanning. Like watching a puzzle solve itself. Technical, precise, revealing. The sound of understanding approaching.` | Echo signal analysis. Ch 2 decoding the signal. Data being processed and understood. | Ch 2 | [ ] |
| S49 | `echo_distant` | 3-5s | `Distant Echo. Faint signal from far away. Like the echo_signal but whispered. Barely detectable. From the edge of sensor range. Something is out there, sending. Quiet, mysterious, beckoning. A whisper across light-years.` | Distant Echo detection at Ch 1 end. The first hint of what's to come. Subtle. | Ch 1 | [ ] |
| S50 | `echo_transmit` | 4-6s | `Echo transmission. Sending an Echo signal. The reverse of receiving — energy building, fold physics engaging, signal launching into spacetime. Like throwing a bottle into a cosmic ocean. Purposeful, emotional, final. The last thing Vin does.` | Vin sending the Echoes in Ch 14. The loop closing. The most meaningful transmission of the game. | Ch 14 | [ ] |
| S51 | `comms_static` | 2-4s | `Communications static. Radio interference. Garbled transmission. Someone trying to talk through interference. Like tuning between stations in space. Broken, fragmented, frustrating. The universe between you and communication.` | Communication interference throughout the game. Graves transmissions, SIC comms, broken signals. | Ch 4, 9, 11 | [ ] |
| S52 | `comms_open` | 1-2s | `Communications channel opening. Connection established. Clean electronic tone — channel is open. Like a phone connecting. Brief, functional, the start of a conversation. Sci-fi comm link activation.` | Opening a comm channel. Used for dialogue with Kade, Graves, other ships. | Ch 8-10 | [ ] |
| S53 | `comms_close` | 1-2s | `Communications channel closing. Connection terminated. Brief electronic chirp — channel is dead. Conversation over. Like hanging up a phone. Final, clean, done.` | Closing a comm channel. End of conversation with external contacts. | Ch 8, 10 | [ ] |
| S54 | `comms_incoming` | 2-3s | `Incoming communication. Someone is hailing the ship. Alert tone — attention required. Like a phone ringing but on a spaceship. Urgent but not alarming. Someone wants to talk.` | Incoming hail. Ch 9 incoming communication from Kade or SIC. | Ch 9 | [ ] |
| S55 | `sic_ping` | 2-3s | `SIC detection ping. The SICs have found your fold signature. Sharp, invasive electronic pulse. Like being tagged by a predator. Cold, military, precise. They know where you are. The worst ping you can hear.` | SIC detection. Ch 2 end — the SICs have registered your fold signature. Threat. | Ch 2 | [ ] |

### 3.5 DENT & AI

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S56 | `dent_boot` | 5-8s | `AI companion booting up. Damaged systems initializing. Electronic startup with glitches and corruption artifacts. Not a clean boot — struggling, fragmentary, parts missing. Like a friend trying to wake up with a concussion. Mechanical sympathy. Warm despite being digital.` | DENT powering on. Prologue first boot + Ch 3 reboot. A damaged friend coming back to life. | Prologue, Ch 3 | [ ] |
| S57 | `dent_repair` | 3-5s | `AI repair process. Electronic recalibration. Systems reconnecting. Getting better — capability expanding. Like physical therapy for a robot. Positive, mechanical, healing. Progress made audible.` | DENT repair progress. Used during DENT arm repair and other fixes. Healing. | Ch 1 | [ ] |
| S58 | `deep_repair_tone` | 3-5s | `Deep AI repair. Fundamental system recovery. Core architecture restoring. More profound than surface repair — this is deep memory, identity, self. Like unlocking a sealed room in someone's mind. Resonant, significant, revelatory.` | Deep DENT repair in Ch 13. Unlocking deep memory. DENT remembering who they really are. | Ch 13 | [ ] |
| S59 | `servo_whir` | 1-3s | `Servo motor engaging. Mechanical arm moving. Quiet whirring of precision actuators. Like a robot arm flexing. Mechanical, precise, functional. DENT's repaired arm working.` | DENT servo sounds. Ch 3 arm repair testing. Mechanical movement. | Ch 3 | [ ] |
| S60 | `system_ping` | 1-2s | `System notification ping. Clean electronic chime. A system reporting status. Brief, informational, neutral. Like a notification sound but for a spaceship AI. "Something happened."` | General system notification. Ch 13 various system updates and discoveries. | Ch 13 | [ ] |

### 3.6 Tools & Repairs

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S61 | `wrench_clang` | 1-2s | `Wrench hitting metal in microgravity. Metallic clang with unusual reverb — sound travels differently in a damaged ship. Tools on hull. Working on repairs. Satisfying, mechanical, hands-on. An engineer at work.` | Tool impact during repairs. Ch 1 gravity drive repair. Physical work. | Ch 1 | [ ] |
| S62 | `weld_spark` | 2-4s | `Welding sparks. Electric arc. Metal being joined. Brief crackling energy discharge. Like a tiny lightning bolt being used as a tool. Bright, hot, precise. Fixing things the hard way.` | Welding during repairs. Ch 1 sensor array. Sparks and heat. | Ch 1 | [ ] |
| S63 | `welding_torch` | 3-5s | `Welding torch sustained. Longer welding operation. Steady hiss of plasma torch. Metal softening and joining. Industrial, hot, productive. A proper repair job. Like a blowtorch but for spaceship components.` | Sustained welding in Ch 3. DENT repair operations. Longer repair work. | Ch 3 | [ ] |
| S64 | `tool_work` | 2-4s | `General tool work. Mechanical manipulation. Turning bolts, adjusting components, precision work. Multiple small sounds — clicks, turns, alignments. Like a watchmaker but for spaceship parts. Methodical, careful, skilled.` | General repair/construction work. Ch 8 modifications and upgrades. | Ch 8 | [ ] |
| S65 | `grapple_fire` | 2-3s | `Grapple hook firing. Pneumatic launch. Cable deploying. A hook shooting across space to grab something. Like a harpoon gun in zero gravity. Sharp launch, cable whiz, impact. Functional, tactical, satisfying.` | Grapple hook for grabbing debris/supplies. Ch 2 debris field resource gathering. | Ch 2 | [ ] |
| S66 | `bypass_install` | 3-5s | `Fuel regulator bypass installation. Careful electronic component insertion. Connectors seating. Power rerouting. Like plugging in something that changes everything. Precise, technical, the click of possibility. Fold drive about to unlock.` | Installing the Fuel Regulator Bypass. Ch 2 — this unlocks the fold drive. A pivotal moment. | Ch 2 | [ ] |
| S67 | `exotic_harvest` | 3-5s | `Exotic matter harvesting. Null energy being extracted. Alien physics — a sound unlike anything natural. Like capturing lightning in a bottle but the lightning is negative energy. Crystalline, electric, impossible. Fuel being collected.` | Harvesting null cells / exotic matter. Ch 1 fuel gathering from derelict or asteroids. | Ch 1 | [ ] |

### 3.7 Navigation & Thrust

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S68 | `thruster_burn` | 3-5s | `Thruster burn. Ship maneuvering thrusters firing. Short, controlled burst. Directional adjustment. Like a rocket burst but precise. Hissing propellant, brief flame. Tactical movement.` | Thruster maneuver. Ch 10 positioning for alliance operations. Precise movement. | Ch 10 | [ ] |
| S69 | `thrusters_soft` | 2-3s | `Soft thruster adjustment. Gentle maneuvering. Fine positioning. Barely perceptible. Like parking a spaceship very carefully. Quiet hiss, subtle vibration. Delicate.` | Gentle thruster use. Ch 10 careful approach maneuvers. Subtle movement. | Ch 10 | [ ] |
| S70 | `door_open` | 1-3s | `Spaceship door opening. Pneumatic hiss. Mechanical locks disengaging. Heavy door sliding or swinging. Industrial, functional, satisfying. The boundary between rooms. Like a bank vault but on a spaceship.` | Interior door opening. Ch 3 station exploration. Moving between compartments. | Ch 3 | [ ] |

### 3.8 Data & Discovery

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S71 | `data_display` | 2-3s | `Data appearing on display. Information loading on a CRT screen. Scrolling text, graph rendering, data populating. Clean electronic, retro computer. Like a terminal filling with important information. The sound of learning something.` | Data display activation. Ch 8 analysis of Core Anomaly data. Information appearing. | Ch 8 | [ ] |
| S72 | `data_processing` | 3-5s | `Data processing. Computer working on complex calculation. Electronic thinking. Processing arrays churning. Like hearing a computer think out loud. Mechanical intelligence at work. Building toward a result.` | Computer processing data. Ch 9 analyzing Coherence Net structure. Computation. | Ch 9 | [ ] |
| S73 | `data_stream_pulse` | 2-4s | `Data stream pulse. Information flowing as energy. Like a river of data passing through the ship. Crystalline digital flow. Structured, rhythmic, mathematical. The Bulk Dimension's data infrastructure made audible.` | Data stream detected. Ch 13 Bulk Dimension data flows visible and audible. | Ch 13 | [ ] |
| S74 | `discovery_tone` | 2-3s | `Discovery chime. Something important has been found. Uplifting but measured — this changes things. A clean, bright tone that says "this matters." Positive revelation. Like finding the missing piece.` | Discovery moment. Ch 9 finding the Net Disruptor prototype specs. | Ch 9 | [ ] |
| S75 | `anomaly_tone` | 3-5s | `Core Anomaly tone. The sound the anomaly makes on sensors. Deep, resonant, impossible. Like hearing a black hole hum. Not a signal — a presence. Something massive and gravitational making itself known. Cosmic and mathematical.` | Core Anomaly on sensors. Ch 12 arrival at the destination. The thing Vin has been chasing. | Ch 12 | [ ] |
| S76 | `anomaly_detected` | 2-3s | `Anomaly detection alert. Something unexpected on sensors. Not a contact — a distortion. Space itself is wrong here. Alert tone with a warping quality. Like the scanner is confused by what it found. Unsettling discovery.` | Anomaly detected. Ch 13 Bulk Dimension discoveries. Things that shouldn't exist. | Ch 13 | [ ] |
| S77 | `temporal_glitch` | 2-4s | `Temporal glitch. Time stuttering. A brief moment where past and present overlap. Like a CD skipping but for reality. Phased, echoed, disorienting. Something happened that shouldn't be possible. Time is broken here.` | Temporal anomaly. Ch 8 temporal distortion near the Core Anomaly. Time misbehaving. | Ch 8 | [ ] |
| S78 | `tension_build` | 5-8s | `Tension building. Something is about to happen. Rising electronic tone. Increasing pressure. The moment before everything changes. Like a wave pulling back before it crashes. Building, building, building — then nothing. The silence before the storm.` | Pre-climax tension. Ch 2 pre-fold, Ch 12 pre-Folded-Fold. The breath before the plunge. | Ch 2, 12 | [ ] |

### 3.9 Misc Ship Sounds

| # | ID / Filename | Duration | Suno Prompt | Vibe / Description | Chapters | Status |
|---|--------------|----------|-------------|-------------------|----------|--------|
| S79 | `ambient_bulk` | 3-5s | `Entering the Bulk Dimension. Transition sound. Crossing from normal space into impossible space. Like stepping through a waterfall made of data. The boundary between reality and infrastructure. Everything changes. Crystalline, vast, alien.` | Transition into Bulk Dimension. Ch 14 opening — already in the Bulk. | Ch 14 | [ ] |

---

## 4. UI SOUNDS (Very Short — <1 second, Splice recommended)

| # | ID / Filename | Duration | Suno Prompt / Source | Vibe / Description | Where Used | Status |
|---|--------------|----------|---------------------|-------------------|------------|--------|
| U01 | `ui_select` | 0.1-0.3s | Splice: "Retro UI blip" or "CRT computer click" | Arrow menu navigation. Moving between choices. Short, clean, retro. CRT cursor movement. | All menus | [ ] |
| U02 | `ui_confirm` | 0.2-0.5s | Splice: "Retro confirm tone" or "Terminal accept beep" | Choice confirmed. Player made a selection. Satisfying, final, acknowledged. CRT terminal enter key. | All menus | [ ] |
| U03 | `ui_typing` | 0.05-0.1s | Splice: "Keyboard keystroke" or "Terminal type click" | Text appearing on screen. The typed() effect sound. Vintage keyboard. CRT character by character. | Text display | [ ] |
| U04 | `ui_pause` | 0.2-0.4s | Splice: "Soft chime" or "Terminal ready beep" | "Press any key to continue" prompt. Gentle, waiting, patient. The game is ready for you. | Pause prompts | [ ] |
| U05 | `ui_save` | 0.5-1s | Splice: "Data write" or "Disk save sound" | Game saved successfully. Data committed. Brief confirmation. Reassuring, technical, done. | Auto-save | [ ] |
| U06 | `ui_chapter_transition` | 1-2s | Splice: "Cinematic transition whoosh" | Between chapters. Brief dramatic transition. The page turning. One chapter ending, another beginning. | Chapter transitions | [ ] |
| U07 | `ui_warning` | 0.3-0.5s | Splice: "Warning blip" or "Alert notification" | Warning text appearing. System warnings. Something the player should notice. Attention without panic. | Warning text | [ ] |

---

## 5. PRODUCTION NOTES

### File Format
- **Preferred**: `.mp3` (smaller file size for Electron)
- **Alternative**: `.wav` (for SFX that need zero latency)
- **Sample Rate**: 44.1kHz
- **Bit Depth**: 16-bit minimum

### Suno AI Tips
- For **SFX** (1-8s): Use "Create Sound Effect" mode or short instrumental generation
- For **Loops** (30s-2min): Add "seamless loop" to every prompt. Test the loop point!
- For **Music** (1-5min): Use full song generation. Specify "no vocals" or "instrumental only"
- For **all prompts**: Add "no vocals" unless you want ambient voice texture
- Include "dark ambient", "analog synthesizer", "sci-fi" in most prompts
- The game's aesthetic is: CRT terminal + Alien + Interstellar + The Martian

### Splice Tips
- Search for: "sci-fi", "space", "ambient", "dark", "electronic", "UI", "interface"
- Good packs: Cinematic Sci-Fi SFX, Space Ambient Textures, Retro Computer Sounds
- UI sounds are best from Splice (very short, very clean)

### Integration Priority
1. **Ambient loops** — these run constantly, most noticeable if missing
2. **Key SFX** (fold, echo, hull_creak, scan_ping) — highest frequency
3. **Music tracks** — set the emotional tone
4. **UI sounds** — polish
5. **Stingers** — final layer of refinement

### Volume Mixing Guide
- Music: 40% (background, never overwhelms text)
- Ambient: 30% (constant, subliminal)
- SFX: 60% (punctuation, attention-grabbing)
- UI: 50% (clean, present but not jarring)

---

## SUMMARY

| Category | Count | Type |
|----------|-------|------|
| Music Tracks | 22 | Full songs (Suno 1-5 min) |
| Emotional Stingers | 5 | Short music cues (Suno 15-45s) |
| Ambient Loops | 27 | Looping backgrounds (Suno/Splice 30s-2min) |
| One-Shot SFX | 79 | Sound effects (Suno samples/Splice 1-10s) |
| UI Sounds | 7 | Interface sounds (Splice <1s) |
| **TOTAL** | **140** | |

### Already Existing Assets (in `client/assets/audio/`)
- `main_theme_loop.wav` / `.mp3` — needs review
- `void_loop.wav` / `.mp3` — needs review
- `ship_damaged_idle_loop.wav` — needs review
- `boot_sequence.wav` — may map to `boot`
- `ambient_lab.wav` — unused currently

---

*Generated for Echoes Beyond Infinity — Steam Release Audio Design*
