class Player(var name: String, var health: Int, var location: String) {
    private var aiIntegrationLevel: String = "Basic"
    private var geneModification: String = "None"
    private var techEquipment: MutableList<String> = mutableListOf()

    fun dynamicInitialization() {
        println("Enter your name:")
        name = readLine() ?: "Unknown Entity"

        println("Choose your AI Integration Level:")
        println("1. Basic")
        println("2. Advanced")
        println("3. Elite")
        when (readLine()) {
            "1" -> aiIntegrationLevel = "Basic"
            "2" -> aiIntegrationLevel = "Advanced"
            "3" -> aiIntegrationLevel = "Elite"
            else -> println("Invalid choice. Defaulting to Basic.")
        }

        println("Select your Gene Modification:")
        println("1. None")
        println("2. Enhanced Perception")
        println("3. Increased Physical Abilities")
        println("4. Advanced Cognitive Functions")
        when (readLine()) {
            "1" -> geneModification = "None"
            "2" -> geneModification = "Enhanced Perception"
            "3" -> geneModification = "Increased Physical Abilities"
            "4" -> geneModification = "Advanced Cognitive Functions"
            else -> println("Invalid choice. Defaulting to None.")
        }

        println("Choose your Tech Equipment (you can choose multiple, separate by comma):")
        println("1. Holo-Projector")
        println("2. Quantum Communicator")
        println("3. Multi-Dimensional Scanner")
        println("4. Neural Interface")
        val equipmentChoices = readLine()?.split(",") ?: listOf()
        for (choice in equipmentChoices) {
            when (choice.trim()) {
                "1" -> techEquipment.add("Holo-Projector")
                "2" -> techEquipment.add("Quantum Communicator")
                "3" -> techEquipment.add("Multi-Dimensional Scanner")
                "4" -> techEquipment.add("Neural Interface")
            }
        }

        println("Initialization complete!")
        println("Name: $name")
        println("AI Integration Level: $aiIntegrationLevel")
        println("Gene Modification: $geneModification")
        println("Tech Equipment: ${techEquipment.joinToString(", ")}")
    }
}

//val player = Player(name = "", health = 100, location = "Starting Point")
//player.dynamicInitialization()