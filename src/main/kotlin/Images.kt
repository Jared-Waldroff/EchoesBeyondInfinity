import javax.swing.ImageIcon
import javax.swing.JFrame
import javax.swing.JLabel

class Images {

    private val frame: JFrame = JFrame("Image Display")

    init {
        frame.defaultCloseOperation = JFrame.EXIT_ON_CLOSE
        frame.setSize(600, 400) // Set the initial size
        frame.setLocationRelativeTo(null) // Center the window
    }

    private fun displayImage(imagePath: String) {
        val imageIcon = ImageIcon(imagePath)
        val label = JLabel(imageIcon)
        frame.contentPane.removeAll() // Remove previous image
        frame.add(label)
        frame.pack() // Adjusts the frame to the size of the image
        frame.isVisible = true
    }

    companion object {
        fun displayDarkSpaceship() {
            Images().displayImage("src/main/resources/images/insideSpaceship.png")
        }
    }
}
