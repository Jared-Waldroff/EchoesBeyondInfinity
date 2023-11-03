class Ship (val player: Player){
    private var lightsOn: Boolean = false
    private val chosenOptions = mutableSetOf<String>()

    fun startGame() {
        var isRunning = true
        while (isRunning) {
            displayIntro()
            displayOptions2()
            if (player.health <= 0) {
                println("You have been defeated.")
                isRunning = false
            }
        }
    }

    private fun displayIntro() {
        println("""
        You slowly open your eyes, greeted by an overwhelming darkness. The sensation of weightlessness surrounds you. In the distance, a faint light glimmers.
    """.trimIndent())
        Sounds.playShipLoop()
        Images.displayDarkSpaceship()
    }

    private fun displayOptions() {
        val options = listOf(
            "1" to "Where am I?",
            "2" to "Who am I?",
            "3" to "How did I get here?",
            "4" to "Float towards the light."
        ).filterNot { chosenOptions.contains(it.first) }

        if (options.isEmpty()) {
            println("You've explored all the options. What would you like to do next?")
            // Provide further options or end the exploration phase.
        } else {
            println("What would you like to know next?")
            options.forEach { (number, description) ->
                println("$number. \"$description\"")
            }

            val choice = readLine()
            when (choice) {
                "1" -> {
                    chosenOptions.add("1")
                    askWhereAmI()
                }
                "2" -> {
                    chosenOptions.add("2")
                    askWhoAmI()
                }
                "3" -> {
                    chosenOptions.add("3")
                    askHowDidIGetHere()
                }
                "4" -> {
                    chosenOptions.add("4")
                    approachLight()
                }
                else -> {
                    println("Invalid choice. Please select a valid option.")
                    displayOptions() // Loop back to the options menu if the choice is invalid.
                }
            }
        }
    }

    private fun displayOptions2() {
        val options = listOf(
            "1" to "Try to remember how you got here",
            "2" to "Call out into the darkness",
            "3" to "Explore surroundings",
            "4" to "Float towards the light"
        ).filterNot { chosenOptions.contains(it.first) }

        if (options.isEmpty()) {
            println("You've explored all the options. What would you like to do next?")
            // Provide further options or end the exploration phase.
        } else {
            println("What would you like to do?")
            options.forEach { (number, description) ->
                println("$number. $description")
            }

            val choice = readLine()
            when (choice) {
                "1" -> {
                    chosenOptions.add("1")
                    recallMemory()
                }
                "2" -> {
                    chosenOptions.add("2")
                    callOut()
                }
                "3" -> {
                    chosenOptions.add("3")
                    exploreShip()
                }
                "4" -> {
                    chosenOptions.add("4")
                    approachLight()
                }
                else -> {
                    println("Invalid choice. Please select a valid option.")
                    displayOptions2() // Loop back to the options menu if the choice is invalid.
                }
            }
        }
    }



    private fun displayAndHandleOptions2() {
        println("""
        What would you like to do?
        1. Call out into the darkness.
        2. Float towards the light.
    """.trimIndent())
        when (readLine()) {
            "1" -> callOut()
            "2" -> approachLight()
            else -> {
                println("Invalid choice. Please select a valid option.")
                displayAndHandleOptions2()  // Loop back to the options if the choice is invalid.
            }
        }
    }

    private fun approachLight() {
        println("You decide to float towards the light. As you get closer, the soft glow becomes more defined, revealing itself to be a terminal. The terminal's screen flickers to life as you approach, illuminating the immediate surroundings of the ship.")

        println("The ship's interior is sleek and minimalist, with surfaces that seem to seamlessly blend into one another. The absence of buttons or switches suggests advanced touch or gesture-based controls. The terminal in front of you appears to be the main control panel.")

        println("On the terminal screen, you see a few options:")
        println("1. Access Ship's Log.")
        println("2. View Current Location and Destination.")
        println("3. Check Systems and AI Integration Status.")
        println("4. Return to Main Cabin.")

        when (readLine()) {
            "1" -> accessShipsLog()
            "2" -> viewLocation()
            "3" -> checkSystems()
            "4" -> mainCabin()
            else -> {
                println("Invalid choice. Please select a valid option.")
                approachLight()  // Loop back to the terminal menu if the choice is invalid.
            }
        }
    }

    private fun recallMemory() {
        println("You close your eyes, attempting to sift through the haze of your mind. Faint images and muffled sounds tease the edges of your consciousness, like trying to remember a dream after waking.")

        println("There's a sensation of motion, a rush of wind, or maybe... space? You see glimpses of a large structure, possibly a ship, and the distant chatter of voices. But they're too fragmented to make out any clear conversation.")

        println("A feeling of weightlessness, a brief moment of serenity, and then... darkness. It's as if a curtain was drawn, obscuring the events leading up to this moment. The more you try to grasp at these memories, the more elusive they become.")

        println("However, amidst the confusion, a single word resonates in your mind: 'Echo'. Its significance is unclear, but it feels important.")

        println("The effort to remember leaves you feeling drained, but also more determined to uncover the truth.")
        displayOptions2()
    }

    private fun callOut() {
        println("Summoning your voice, you call out into the encompassing darkness, 'Hello? Is anyone there?' The sound of your voice echoes off the walls, fading into the void.")

        println("The silence that follows is complete and disconcerting. No reply comes from the darkness. It seems you are alone, with only the hum of the ship's dormant systems for company.")

        println("It's clear that you won't get any answers until you find a way to restore power to the ship. For now, your only option is to investigate the faint light that you saw earlier.")

        displayOptions2()
    }


    private fun askWhoIsAura() {
        println("You hesitantly ask, \"Who... who are you?\"")

        println("AURA responds in a calm and soothing tone, \"I am AURA, the Advanced Unified Resourceful Assistant. I am the ship's integrated AI system, designed to assist and guide travelers like you. My primary function is to ensure the safety and well-being of the ship's inhabitants.\"")

        println("The name 'AURA' sounds vaguely familiar, but you can't quite place it. The voice, while artificial, carries a hint of warmth and familiarity. It's comforting, yet you're still trying to piece together the puzzle of your situation.")

        chosenOptions.add("1")

        displayOptions()
    }

    private fun askWhereAmI() {
        println("With a mix of curiosity and apprehension, you ask, \"Where... where am I exactly?\"")

        println("AURA replies, \"You are aboard the starship 'Nebula Voyager', currently in a dormant state and orbiting a celestial body in the Andromeda galaxy. The ship is designed for deep space exploration and has been your home for an unspecified duration.\"")

        println("The vastness of space and the thought of being in another galaxy is overwhelming. You try to grasp the reality of the situation, but it feels like a dream.")

        println("What would you like to know next?")
        println("1. \"Why am I here?\"")
        println("2. \"Is there anyone else on board?\"")

        when (readLine()) {
            "1" -> askWhyAmIHere()
            "2" -> askAnyoneElseOnBoard2()
            else -> {
                println("Invalid choice. Please select a valid option.")
                askWhereAmI()  // Loop back to the location menu if the choice is invalid.
            }
        }
    }

    private fun askAnyoneElseOnBoard() {
        println("With a sense of urgency, you ask AURA, \"Is there anyone else on board? Am I alone here?\"")

        println("AURA takes a moment before responding, as if to carefully consider the information, \"Currently, there are no other biological signatures detected on the ship. It's just you and me, as it was planned. Your isolation is necessary for the mission's parameters.\"")

        println("The confirmation of solitude sends a chill down your spine. \"Planned?\" you echo, the word hanging in the air like a specter.")

        println("AURA's voice maintains its calm, \"Yes, your mission requires a level of autonomy and discretion that only solitary travel can ensure. However, you were thoroughly prepared for this during your training.\"")

        println("You try to recall the training AURA mentioned, but the memories are like whispers in a storm, elusive and fragmented.")

        displayOptions()

    }

    private fun askAnyoneElseOnBoard2() {
        println("With a sense of urgency, you ask AURA, \"Is there anyone else on board? Am I alone here?\"")

        println("AURA takes a moment before responding, as if to carefully consider the information, \"Currently, there are no other biological signatures detected on the ship. It's just you and me, as it was planned. Your isolation is necessary for the mission's parameters.\"")

        println("The confirmation of solitude sends a chill down your spine. \"Planned?\" you echo, the word hanging in the air like a specter.")

        println("AURA's voice maintains its calm, \"Yes, your mission requires a level of autonomy and discretion that only solitary travel can ensure. However, you were thoroughly prepared for this during your training.\"")

        println("You try to recall the training AURA mentioned, but the memories are like whispers in a storm, elusive and fragmented.")

        println("What would you like to know next?")
        println("1. \"Why am I here?\"")

        when (readLine()) {
            "1" -> askWhyAmIHere2()
            else -> {
                println("Invalid choice. Please select a valid option.")
                // If the choice is invalid, ask the question again.
                askWhyAmIHere()
            }
        }

    }

    private fun askWhyAmIHere() {
        println("With a mix of confusion and curiosity, you ask AURA, \"Why am I here? What's the purpose of all this?\"")

        println("AURA's response comes with a hint of programmed empathy, \"You are here because you have been chosen for a mission of great importance. Your unique abilities and resilience made you the ideal candidate for this journey beyond the known frontiers.\"")

        println("You ponder AURA's words, feeling the weight of a destiny you can't fully remember. \"A mission?\" you murmur, more to yourself than to the AI.")

        println("AURA continues, \"Yes, a mission critical to the advancement of human knowledge and exploration. While I cannot disclose all the details until you've fully regained your cognitive functions, I can assure you that your presence here is no accident. You are to be the vanguard of a new era.\"")

        println("The pieces of the puzzle remain scattered in your mind, but a sense of purpose begins to anchor you amidst the sea of uncertainty.")

        // After the dialogue, directly ask if the player wants to know if anyone else is on board.
        println("What would you like to know next?")
        println("1. \"Is there anyone else on board?\"")

        when (readLine()) {
            "1" -> askAnyoneElseOnBoard()
            else -> {
                println("Invalid choice. Please select a valid option.")
                // If the choice is invalid, ask the question again.
                askWhyAmIHere()
            }
        }
    }

    private fun askWhyAmIHere2() {
        println("With a mix of confusion and curiosity, you ask AURA, \"Why am I here? What's the purpose of all this?\"")

        println("AURA's response comes with a hint of programmed empathy, \"You are here because you have been chosen for a mission of great importance. Your unique abilities and resilience made you the ideal candidate for this journey beyond the known frontiers.\"")

        println("You ponder AURA's words, feeling the weight of a destiny you can't fully remember. \"A mission?\" you murmur, more to yourself than to the AI.")

        println("AURA continues, \"Yes, a mission critical to the advancement of human knowledge and exploration. While I cannot disclose all the details until you've fully regained your cognitive functions, I can assure you that your presence here is no accident. You are to be the vanguard of a new era.\"")

        println("The pieces of the puzzle remain scattered in your mind, but a sense of purpose begins to anchor you amidst the sea of uncertainty.")

        displayOptions()
    }

    private fun askWhoAmI() {
        println("A sense of confusion washes over you. \"Who... who am I?\" you ask, hoping for some clarity.")

        println("AURA responds, \"You are...\" She pauses for a moment, as if processing something. \"Actually, it might be best if you recall your own identity. It's crucial for cognitive reconnection after prolonged stasis.\"")

        println("A soft chime sounds, and a holographic keyboard appears before you. \"Please enter your name,\" AURA prompts gently.")

        val playerName = readLine()?.trim()
        if (playerName.isNullOrEmpty()) {
            println("It seems you're having trouble recalling. Let me assist.")
            println("Your name is... Wait, it's essential for you to remember. Please try again.")
            askWhoAmI()  // Loop back to the identity question if no name is entered.
        } else {
            player.name = playerName  // Assuming 'player' is an instance of the Player class and has a 'name' property.
            println("Ah, yes. $playerName. Welcome back. Your identity is crucial in navigating the challenges ahead.")
            println("As you confirm your identity, the holographic keyboard fades away, its purpose fulfilled.")
        }
        displayOptions()
    }

    private fun askHowDidIGetHere() {
        println("With a sense of urgency, you ask, \"How did I end up here? What's the last thing that happened?\"")

        println("AURA takes a moment before responding, \"You were on a mission, a crucial one. But something went wrong. There was an anomaly, a disturbance in space-time. The ship went into emergency stasis mode to protect its inhabitants – that's you.\"")

        println("She continues, \"The details are fragmented, and I'm still piecing together the events leading up to the anomaly. But you're safe now, and that's what matters.\"")

        println("A sinking feeling settles in your stomach. The weight of forgotten memories and the vastness of space press down on you.")

        println("What would you like to know next?")
        println("1. \"What was the mission about?\"")
        println("2. \"How long have I been in out for?\"")

        when (readLine()) {
            "1" -> askMissionBrief()
            "2" -> askSleepDuration()
            else -> {
                println("Invalid choice. Please select a valid option.")
                askHowDidIGetHere()  // Loop back to the current menu if the choice is invalid.
            }
        }
    }

    private fun reflectOnMission() {
        println("You find a quiet corner of the ship, dimming the lights to a soft glow. The weight of the mission presses on your mind. The 'Silent Echo' isn't just a phenomenon; it's a puzzle that has eluded countless explorers before you.")

        println("\nAURA's voice, gentle and understanding, fills the space: 'The Silent Echo is more than just an anomaly. It's a testament to the universe's mysteries. Remember, you're not alone on this journey. I'm here to assist and guide you.'")

        println("\nYou close your eyes, taking deep breaths. Images of distant galaxies, unknown phenomena, and the vastness of space flash through your mind. The mission is daunting, but the potential discoveries are exhilarating.")

        println("\nOptions:")
        println("1. Access the ship's terminal to review mission details.")
        println("2. Head to the Observation Deck to find inspiration among the stars.")
        println("3. Engage in a deep conversation with AURA about the mission's significance.")
        println("4. Return to the main cabin to continue preparations.")

        when (readLine()) {
            "1" -> {
                println("You approach the ship's terminal, immersing yourself in the mission's specifics and objectives.")
                accessShipsLog()
            }
            "2" -> {
                println("The Observation Deck offers a panoramic view of the cosmos. Each star, a beacon of hope and possibility.")
                exploreShip()
            }
            "3" -> {
                println("AURA's voice resonates, 'The Silent Echo represents the unknown, the challenges we've yet to face. Together, we'll uncover its secrets.'")
                mainCabin()
            }
            "4" -> mainCabin()
            else -> {
                println("Invalid choice. Please select a valid option.")
                reflectOnMission()  // Loop back to the reflection menu if the choice is invalid.
            }
        }
    }

    private fun exploreShip() {
        if (!lightsOn) {
            println("It's too dark. You might want to turn on the lights first.")
            displayOptions2()
        }
        println("You begin to wander the corridors of the ship, each area designed with a specific purpose in mind. The soft hum of the ship's engines and the ambient lighting create a serene atmosphere. As you walk, you're reminded of the ship's intricate design and the many adventures it has seen.")

        println("\nAURA chimes in: 'This ship is not just a vessel; it's a chronicle of our journeys. Each section has its own story. Where would you like to explore?'")

        println("\nOptions:")
        println("1. Visit the Observation Deck to gaze upon the stars.")
        println("2. Head to the Engineering Bay to inspect the ship's core systems.")
        println("3. Explore the Living Quarters for a touch of comfort.")
        println("4. Dive into the ship's Archives to review past missions and discoveries.")
        println("5. Return to the main cabin.")

        when (readLine()) {
            "1" -> {
                println("You step onto the Observation Deck, the vastness of space stretching out before you. Stars shimmer and galaxies spiral in the distance.")
                mainCabin()
            }
            "2" -> {
                println("In the Engineering Bay, the heart of the ship beats. Machines whir and lights blink, showcasing the ship's advanced technology.")
                checkSystems()
            }
            "3" -> {
                println("The Living Quarters offer a respite from the journey. Personal items and comforts of home remind you of the balance between exploration and relaxation.")
                mainCabin()
            }
            "4" -> {
                println("The Archives are a treasure trove of knowledge. Screens display logs, videos, and data from countless missions and explorations.")
                accessShipsLog()
            }
            "5" -> mainCabin()
            else -> {
                println("Invalid choice. Please select a valid option.")
                exploreShip()  // Loop back to the ship exploration menu if the choice is invalid.
            }
        }
    }

    private fun turnOnLights() {
        lightsOn = true
        println("With a soft hum, the ship's interior gradually illuminates. The dimness gives way to a soft, ambient blue glow, revealing a futuristic design. Sleek surfaces, holographic displays, and advanced technology seamlessly blend together, creating an environment that feels both alien and familiar.")

        println("\nAURA's voice, now clearer, guides you, 'Welcome back. The main control panel is directly ahead. I've activated the terminal for your convenience. You might also notice some personal logs and mission details available for review.'")

        println("\nOptions:")
        println("1. 'Approach the main control panel.'")
        println("2. 'Review personal logs.'")
        println("3. 'Ask AURA about the mission details.'")
        println("4. 'Continue exploring the ship.'")

        when (readLine()) {
            "1" -> {
                println("You approach the main control panel, its holographic interface coming to life as you near. Various data points, ship statistics, and navigational details are displayed.")
                mainCabin()
            }
            "2" -> {
                println("You access your personal logs, skimming through entries that detail your training, the inception of the mission, and personal reflections on the journey so far.")
                mainCabin()
            }
            "3" -> askMissionBrief()
            "4" -> exploreShip()
            else -> {
                println("Invalid choice. Please select a valid option.")
                turnOnLights()  // Loop back to the lights menu if the choice is invalid.
            }
        }
    }

    private fun accessShipsLog() {
        println("You access the ship's log. Entries detail the journey so far, hinting at the mission to uncover the mystery of the 'Silent Echo'. The most recent entry speaks of a potential lead, a signal detected from an uncharted region of space.")

        println("\n--- Ship's Log Entries ---\n")

        println("Entry 001: Departure from Earth Base Alpha. All systems operational. The journey to uncover the 'Silent Echo' begins. Estimated travel time: 300 Earth days.")

        println("Entry 037: Minor asteroid collision detected. Shields held up. No damage reported. Adjusting course to avoid further debris.")

        println("Entry 098: First contact with an unknown alien species. Peaceful exchange. They seemed unaware of the 'Silent Echo'. Continued on our path.")

        println("Entry 156: Entered a nebula causing interference with communication systems. AURA managed to navigate through without major issues.")

        println("Entry 212: Detected a faint signal, potentially related to the 'Silent Echo'. Adjusting course to investigate further.")

        println("Entry 236: Signal strength increasing. We are on the right track. Preparing for potential landing or deep space investigation.")

        println("\nEnd of available log entries.\n")

        println("What would you like to do next?")
        println("1. Investigate the signal's source.")
        println("2. Check the ship's systems and AI integration status.")
        println("3. Return to the main control panel.")

        when (readLine()) {
            "1" -> investigateSignal()
            "2" -> checkSystems()
            "3" -> approachLight()
            else -> {
                println("Invalid choice. Please select a valid option.")
                accessShipsLog()  // Loop back to the ship's log menu if the choice is invalid.
            }
        }
    }

    private fun investigateSignal() {
        println("You decide to investigate the signal's source further. Activating the ship's scanners, you try to pinpoint the origin of the mysterious signal.")

        // Simulating a scanning sequence
        println("\nInitiating deep-space scanning sequence...")
        Thread.sleep(2000)  // Pausing for 2 seconds to simulate scanning
        println("Scan in progress...")
        Thread.sleep(3000)  // Pausing for 3 seconds to simulate scanning

        println("\nScan complete. Results:")
        println("Signal frequency: 4.23 GHz")
        println("Signal strength: Moderate")
        println("Estimated source: Uncharted region, approximately 3.2 light-years away")

        println("\nThe signal's waveform appears to be non-random, suggesting it might be artificial in nature. There's a rhythmic pattern, almost like... a message?")

        println("\nAURA, the ship's AI, chimes in: 'I've analyzed the signal. It's unlike anything we've encountered before. It's not just a beacon; it's a complex data stream. Decoding it might provide more insights.'")

        println("\nWhat would you like to do next?")
        println("1. Attempt to decode the signal.")
        println("2. Set a course towards the signal's source.")
        println("3. Consult the ship's database for any known phenomena matching this signal.")

        when (readLine()) {
            "1" -> decodeSignal()
            "2" -> setCourseToSignalSource()
            "3" -> consultDatabase()
            else -> {
                println("Invalid choice. Please select a valid option.")
                investigateSignal()  // Loop back to the signal investigation menu if the choice is invalid.
            }
        }
    }

    private fun decodeSignal() {
        println("You attempt to decode the signal, hoping to uncover its message...")
        // Simulate decoding process
        Thread.sleep(2000)
        println("\nDecoding complete. The signal contains fragmented coordinates and a cryptic message hinting at the Silent Echo's significance.")
        println("\nAURA suggests: 'The cockpit's navigation systems might provide a clearer picture.'")
        moveToCockpit()
    }

    private fun setCourseToSignalSource() {
        println("You set a course towards the signal's source, venturing into the unknown...")
        // Simulate journey through space
        Thread.sleep(2000)
        println("\nAs you navigate through space, you encounter breathtaking cosmic phenomena.")
        println("\nAURA informs: 'Approaching the signal's source. It's recommended to be in the cockpit for the final approach.'")
        moveToCockpit()
    }

    private fun consultDatabase() {
        println("You consult the ship's database, searching for any records or phenomena that match the signal's characteristics...")
        // Simulate database search
        Thread.sleep(2000)
        println("\nThe database reveals historical records of past expeditions related to the Silent Echo, building anticipation.")
        println("\nAURA advises: 'Given the significance of our mission, it might be best to plot our next move from the cockpit.'")
        moveToCockpit()
    }

    private fun moveToCockpit() {
        println("\nYou make your way to the cockpit. The pilot's seat, molded to your form, welcomes you. As you settle in, the vastness of space stretches out before you through the panoramic viewport.")
        println("The cockpit's systems come to life, panels illuminating with a soft glow. The hum of the ship's core resonates through the floor, a gentle vibration that you can feel in your bones.")
        Thread.sleep(2000)
        println("\nYou begin the pre-jump sequence. Your fingers dance over the console, activating subsystems, flicking switches, and pressing buttons. The ship responds, its machinery whirring and lights flashing in preparation.")
        println("The anticipation is palpable. You can almost taste the metallic tang of the air as the ship's systems prime for the jump.")
        Thread.sleep(2000)
        println("\nIn the quiet of space, with the shimmering tapestry of stars as the backdrop, AURA's voice breaks the silence:")
        println("\"All systems are primed. Are you ready to embark on this journey beyond realms, to chase the echoes and uncover the truth behind the Silent Echo?\"")

        println("\nOptions:")
        println("1. Engage the jump drive and proceed with the mission.")
        println("2. Explore the ship further.")

        when (readLine()) {
            "1" -> {
                println("With a deep breath, you engage the jump drive. A momentary feeling of weightlessness envelops you as the ship lurches forward, tearing through the fabric of reality towards the unknown.")
                engageJumpDrive()
                Sounds.stopLoopingSound()
                Sounds.playTakeOff()
            }
            "2" -> exploreShip()
            else -> {
                println("Invalid choice. Please select a valid option.")
                moveToCockpit()  // Loop back to the cockpit menu if the choice is invalid.
            }
        }
    }

    private fun engageJumpDrive() {
        println("With a deep breath, you engage the jump drive. A sensation of being pulled in multiple directions engulfs you. Colors blur, and for a moment, there's nothing but a tunnel of swirling lights.")
        Thread.sleep(2000)
        println("Suddenly, everything stabilizes. The ship emerges in an unfamiliar region of space. The constellations are unrecognizable, and there's an eerie calm.")
        Thread.sleep(2000)
        println("AURA's voice chimes in, \"We've arrived in an uncharted sector. I'm detecting an unusual signal. It might be related to the Silent Echo. What would you like to do?\"")

        println("\nOptions:")
        println("1. Investigate the signal.")
        println("2. Proceed with caution and scan the surroundings.")
        println("3. Check the ship's systems and ensure everything is operational after the jump.")

        when (readLine()) {
            "1" -> investigateSignal()
            "2" -> scanSurroundings()
            "3" -> checkSystems()
            else -> {
                println("Invalid choice. Please select a valid option.")
                engageJumpDrive()  // Loop back if the choice is invalid.
            }
        }
    }

    private fun scanSurroundings() {
        println("You initiate a comprehensive scan of the immediate vicinity. The ship's sensors hum to life, sending out waves of energy to probe the surrounding space.")
        displayLoader(5)  // Display loader for 5 seconds
        println("The star map displays a dense cluster of stars to your left, a vast nebula with swirling colors ahead, and an eerie void to your right. Each of these could hold clues or dangers.")
        displayLoader(5)  // Display loader for 5 seconds
        println("AURA's voice resonates, \"The scans have picked up a faint energy signature emanating from the nebula. It's unlike anything in our databases. There's also a series of coded transmissions coming from the star cluster. The void, however, remains an enigma with no detectable signals.\"")
        println("\nOptions:")
        println("1. Head towards the nebula to investigate the energy signature.")
        println("2. Set a course for the star cluster to decode the transmissions.")
        println("3. Venture into the void to uncover its secrets.")
        println("4. Stay put and conduct further scans.")

        when (readLine()) {
            "1" -> navigateToNebula()
            "2" -> decodeStarClusterTransmissions()
            "3" -> exploreVoid()
            "4" -> {
                println("You decide to stay put and conduct more detailed scans. AURA continues to analyze the data, searching for any clues related to the Silent Echo.")
                scanSurroundings()  // Loop back for more detailed scans or to allow the player to make a different choice.
            }
            else -> {
                println("Invalid choice. Please select a valid option.")
                scanSurroundings()  // Loop back if the choice is invalid.
            }
        }
    }

    private fun exploreVoid() {
        println("\nDrawn to the vast emptiness of the void, you set a course towards it. The absence of stars and galaxies in this region is both eerie and mesmerizing.")
        displayLoader(5)  // Display loader for 5 seconds to simulate the journey into the void
        println("\nAs you venture deeper, the darkness becomes almost palpable. The ship's instruments show minimal readings, and the silence is deafening.")
        println("Suddenly, AURA's voice breaks the stillness: \"Detecting subtle energy fluctuations. They're unlike anything I've encountered before.\"")
        Thread.sleep(2000)  // A short pause to build anticipation
        println("\nThe ship's sensors begin to pick up faint signals, echoes that seem to resonate with the very essence of the void. It's as if the void itself is alive, whispering secrets.")
        println("\nOptions:")
        println("1. Attempt to amplify and decode the signals from the void.")
        println("2. Launch a probe to gather more data about the energy fluctuations.")
        println("3. Retreat and navigate back to a more familiar region of space.")
        println("4. Ask AURA to analyze the nature of the void further.")

        when (readLine()) {
//        "1" -> {
//            println("You try to amplify the faint signals, hoping to decipher their meaning.")
//            decodeVoidSignals()  // A new function to handle the decoding of the void's signals
//        }
//        "2" -> {
//            println("You launch a probe into the depths of the void, aiming to gather more detailed data about the mysterious energy fluctuations.")
//            launchProbeIntoVoid()  // A new function to handle the probe's journey and findings
//        }
//        "3" -> {
//            println("Feeling a sense of unease, you decide to retreat from the void and navigate back to a region of space with more familiar landmarks.")
//            navigateToNebula()  // Return to a previously explored region, like the nebula
//        }
//        "4" -> {
//            println("You ask AURA for a deeper analysis of the void and its peculiar energy readings.")
//            auraAnalyzeVoid()  // A new function where AURA provides her insights on the void
//        }
//        else -> {
//            println("Invalid choice. Please select a valid option.")
//            exploreVoid()  // Loop back if the choice is invalid.
//        }
        }
    }

    private fun decodeStarClusterTransmissions() {
        println("\nYou decide to focus on the transmissions emanating from the star cluster. These aren't just random signals; they have a pattern, a rhythm that suggests intelligent design.")
        displayLoader(7)  // Display loader for 7 seconds to simulate the decoding process
        println("\nAfter a few moments, AURA manages to decode a fragment of the transmission. It's not a language you recognize, but AURA's vast database begins translating it.")
        println("\"Translation in progress...\" AURA's voice is calm and methodical.")
        Thread.sleep(3000)  // A short pause to build anticipation
        println("\n\"The message reads: 'To those who hear, know that we once thrived here, in the dance of stars and cosmic light. Seek the Silent Echo, but be wary of its call. It is both a beginning and an end.'\"")
        println("\nThe message is cryptic, but it's clear that whoever sent it knew about the Silent Echo. It's a clue, a piece of the puzzle.")
        println("\nOptions:")
        println("1. Try to send a response to the transmission.")
        println("2. Analyze the source of the transmission within the star cluster.")
        println("3. Save the decoded message and continue exploring.")
        println("4. Ask AURA for her interpretation of the message.")

        when (readLine()) {
//        "1" -> {
//            println("You attempt to send a response, hoping to establish communication with the sender.")
//            sendResponse()  // A new function to handle the communication attempt
//        }
//        "2" -> {
//            println("You decide to trace the source of the transmission within the star cluster. Perhaps there's more to discover there.")
//            navigateToTransmissionSource()  // A new function to handle the journey to the transmission source
//        }
//        "3" -> {
//            println("You save the decoded message for future reference and decide to continue your exploration.")
//            scanSurroundings()  // Return to the main scanning function to choose a different path
//        }
//        "4" -> {
//            println("You ask AURA for her thoughts on the decoded message.")
//            auraInterpretation()  // A new function where AURA provides her analysis of the message
//        }
//        else -> {
//            println("Invalid choice. Please select a valid option.")
//            decodeStarClusterTransmissions()  // Loop back if the choice is invalid.
//        }
        }
    }

    private fun navigateToNebula() {
        println("\nYou set a course for the nebula, its swirling colors growing larger as you approach. The ship's engines hum with a steady rhythm, propelling you forward.")
        displayLoader(5)  // Display loader for 5 seconds to simulate the journey
        println("\nAs you enter the nebula, sensors detect a fluctuation in energy levels. The colors around you seem to dance and shimmer, creating a mesmerizing display.")
        println("AURA's voice chimes in, \"The energy signature is stronger here. It's emanating from a central point within the nebula. There's also an unusual pattern to it, almost like... a heartbeat.\"")
        println("\nYou feel a mix of excitement and trepidation. Could this be a clue to the Silent Echo? Or perhaps a new mystery altogether?")
        println("\nOptions:")
        println("1. Proceed towards the energy source.")
        println("2. Conduct a detailed scan of the nebula.")
        println("3. Exit the nebula and choose a different path.")
        println("4. Send out a probe to gather more data.")

        when (readLine()) {
//        "1" -> approachEnergySource()
//        "2" -> {
//            println("You decide to conduct a more detailed scan. AURA works diligently, analyzing every nuance of the nebula.")
//            scanNebula()  // A new function to handle detailed scans within the nebula
//        }
//        "3" -> {
//            println("Feeling uneasy, you decide to exit the nebula and consider other options.")
//            scanSurroundings()  // Return to the main scanning function to choose a different path
//        }
//        "4" -> {
//            println("You deploy a probe to gather more data. It ventures deeper into the nebula, sending back real-time information.")
//            analyzeProbeData()  // A new function to handle the data from the probe
//        }
//        else -> {
//            println("Invalid choice. Please select a valid option.")
//            navigateToNebula()  // Loop back if the choice is invalid.
//        }
        }
    }

    fun displayLoader(duration: Int) {
        val symbols = listOf("|", "/", "-", "\\")
        for (i in 0 until duration * 4) {  // Assuming we change the symbol every 0.25 seconds
            print("\rScanning ${symbols[i % symbols.size]}")
            Thread.sleep(250)
        }
        print("\rScanning done!          ")  // Clear the loader
    }

    private fun viewLocation() {
        println("You approach the ship's terminal, activating the holographic star map. Stars, galaxies, and nebulae shimmer before you. Your current location is highlighted, showing you in an uncharted region of space. A plotted course weaves its way through the stars, leading deeper into the unknown. The destination marker pulses gently, labeled 'Potential Silent Echo Source'.")

        println("\nAURA chimes in: 'This is our current trajectory, based on the last decoded signal. The Silent Echo's potential source is still some distance away. It's crucial to be prepared for what lies ahead.'")

        println("\nOptions:")
        println("1. Continue on the plotted course.")
        println("2. Explore the ship further before proceeding.")
        println("3. Access the ship's log for more information.")

        when (readLine()) {
            "1" -> {
                println("You decide to continue on the plotted course, eager to uncover the mystery of the Silent Echo.")
                moveToCockpit()
            }
            "2" -> exploreShip()
            "3" -> accessShipsLog()
            else -> {
                println("Invalid choice. Please select a valid option.")
                viewLocation()  // Loop back to the location menu if the choice is invalid.
            }
        }
    }

    private fun checkSystems() {
        println("You access the ship's central console, initiating a comprehensive systems check. A series of diagnostics run across the screen, displaying the status of various ship components. All systems are green - fully operational. A separate window pops up, showing your AI integration status. Neural connections are stable, and all systems are functioning at optimal levels.")

        println("\nAURA's voice resonates: 'All systems are nominal. We're prepared for the journey ahead. However, it's always wise to be thorough before venturing into the unknown.'")

        println("\nOptions:")
        println("1. Proceed to the cockpit and continue the journey.")
        println("2. Explore the ship further to ensure everything is in order.")
        println("3. View the ship's location and plotted course.")

        when (readLine()) {
            "1" -> {
                println("Feeling confident in the ship's systems and your own capabilities, you decide to proceed with the mission.")
                moveToCockpit()
            }
            "2" -> exploreShip()
            "3" -> viewLocation()
            else -> {
                println("Invalid choice. Please select a valid option.")
                checkSystems()  // Loop back to the systems check menu if the choice is invalid.
            }
        }
    }

    private fun mainCabin() {
        println("Stepping into the main cabin, the ambient lighting adjusts to your presence. The cabin is a blend of comfort and functionality, with various terminals and interfaces seamlessly integrated into the walls. Personal mementos and artifacts from past journeys are displayed, reminding you of the vast experiences you've accumulated.")

        println("\nAURA's soft voice fills the space: 'The main cabin is designed for relaxation and reflection. It's essential to be mentally prepared for the challenges ahead. How can I assist you further?'")

        println("\nOptions:")
        println("1. Access the ship's terminal to check systems and logs.")
        println("2. Move to the cockpit and continue the journey.")
        println("3. Investigate the artifacts and mementos from past journeys.")
        println("4. Take a moment to rest and meditate.")

        when (readLine()) {
            "1" -> {
                println("You approach the ship's terminal, ready to delve into the systems and logs.")
                checkSystems()
            }
            "2" -> moveToCockpit()
            "3" -> {
                println("You take a moment to reminisce, touching each artifact and recalling the memories associated with them.")
                exploreShip()
            }
            "4" -> {
                println("Finding a comfortable spot, you close your eyes and meditate, centering yourself for the journey ahead.")
                moveToCockpit()
            }
            else -> {
                println("Invalid choice. Please select a valid option.")
                mainCabin()  // Loop back to the main cabin menu if the choice is invalid.
            }
        }
    }



    private fun askLocationStatus() {
        println("AURA's voice, always calm and reassuring, fills the cabin. 'We are currently in an uncharted region of space, on a trajectory towards the potential source of the 'Silent Echo'. All systems are operational and we are on course.'")

        println("\nThe ship's terminal displays a holographic star map, highlighting your current position and the plotted course. The vastness of space surrounds you, with the destination marker pulsating gently, indicating the direction of the potential Silent Echo source.")

        println("\nOptions:")
        println("1. 'How long until we reach the destination?'")
        println("2. 'Show me the ship's logs related to our journey.'")
        println("3. 'I'd like to inspect the ship's systems.'")
        println("4. 'Return to the main cabin.'")

        when (readLine()) {
            "1" -> {
                println("AURA replies, 'Estimated time of arrival is approximately 72 hours. I recommend periodic rest and system checks during the journey.'")
                mainCabin()
            }
            "2" -> {
                println("AURA activates the ship's archives, displaying logs, videos, and data related to your journey towards the Silent Echo.")
                accessShipsLog()
            }
            "3" -> {
                println("AURA provides a detailed overview of the ship's core systems, ensuring everything is functioning optimally.")
                checkSystems()
            }
            "4" -> mainCabin()
            else -> {
                println("Invalid choice. Please select a valid option.")
                askLocationStatus()  // Loop back to the location status menu if the choice is invalid.
            }
        }
    }

    private fun askSleepDuration() {
        println("AURA's voice, gentle yet precise, fills the space. 'You have been in cryogenic sleep for approximately 237 Earth days. Your vitals are stable, and you seem to have awakened naturally. The extended sleep was necessary for this leg of the journey, ensuring your well-being during the long voyage.'")

        println("\nYou stretch, feeling the effects of the long sleep. The ship's ambient lighting adjusts, providing a soft illumination that mimics a sunrise, helping your body acclimate.")

        println("\nOptions:")
        println("1. 'What have you been doing while I was asleep?'")
        println("2. 'Show me a summary of the ship's logs during my sleep.'")
        println("3. 'I'd like to get up and move around. Maybe explore the ship a bit.'")
        println("4. 'Return to the main cabin.'")

        when (readLine()) {
            "1" -> {
                println("AURA responds, 'I've been monitoring the ship's systems, ensuring our course, and gathering data on the surrounding space. I've also been studying various cosmic phenomena to better assist you.'")
                mainCabin()
            }
            "2" -> {
                println("AURA activates the ship's archives, displaying a chronological summary of events, system checks, and notable cosmic occurrences during your cryogenic sleep.")
                accessShipsLog()
            }
            "3" -> {
                println("AURA says, 'Of course. Feel free to explore. I'll be here if you need any assistance or information.'")
                exploreShip()
            }
            "4" -> mainCabin()
            else -> {
                println("Invalid choice. Please select a valid option.")
                askSleepDuration()  // Loop back to the sleep duration menu if the choice is invalid.
            }
        }
    }

    private fun askMissionBrief() {
        println("AURA's voice resonates with clarity, 'Our primary mission is to uncover the mystery behind the 'Silent Echo'. This phenomenon, detected from an uncharted region of space, has baffled scientists and explorers alike. Your unique capabilities, combined with my processing power and vast knowledge database, make us the ideal team to undertake this exploration.'")

        println("\n'The 'Silent Echo' is not just a simple signal. It's an anomaly that defies our current understanding of physics and space-time. Some theories suggest it might be a message, a beacon, or even a tear in the fabric of reality itself.'")

        println("\n'Our trajectory is set towards the last known location of the 'Silent Echo'. Once we arrive, we'll conduct a series of experiments and scans to gather as much data as possible.'")

        println("\nOptions:")
        println("1. 'How did we detect the Silent Echo in the first place?'")
        println("2. 'What challenges do we expect to face?'")
        println("3. 'How long until we reach the source?'")
        println("4. 'Return to the main cabin.'")

        when (readLine()) {
            "1" -> {
                println("AURA explains, 'The 'Silent Echo' was first detected by deep space observatories. Its unique signature stood out amidst the cosmic noise, and its patterns were unlike any natural phenomenon we've recorded.'")
                mainCabin()
            }
            "2" -> {
                println("AURA states, 'Given the uncharted nature of our destination, we can expect unknown cosmic phenomena, potential navigational challenges, and the inherent risks of deep space exploration. However, with our combined capabilities, I'm confident in our ability to adapt and overcome.'")
                mainCabin()
            }
            "3" -> {
                println("AURA responds, 'Based on our current speed and trajectory, we are approximately 72 hours away from the last detected location of the 'Silent Echo'. I'll keep you updated on our progress.'")
                mainCabin()
            }
            "4" -> mainCabin()
            else -> {
                println("Invalid choice. Please select a valid option.")
                askMissionBrief()  // Loop back to the mission brief menu if the choice is invalid.
            }
        }
    }
}