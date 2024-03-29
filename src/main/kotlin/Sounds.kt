import javax.sound.sampled.AudioSystem
import javax.sound.sampled.Clip
import java.io.File
import java.net.URL
import javax.sound.sampled.AudioInputStream
import javax.sound.sampled.LineUnavailableException
import javax.sound.sampled.UnsupportedAudioFileException
import java.io.IOException

class Sounds {
    companion object {
        private var loopClip: Clip? = null

        fun playSoundLoop(soundFileName: String) {
            try {
                val soundFile = File(soundFileName)
                val audioInputStream = AudioSystem.getAudioInputStream(soundFile)
                loopClip = AudioSystem.getClip().apply {
                    open(audioInputStream)
                    loop(Clip.LOOP_CONTINUOUSLY)
                }
            } catch (e: UnsupportedAudioFileException) {
                e.printStackTrace()
            } catch (e: IOException) {
                e.printStackTrace()
            } catch (e: LineUnavailableException) {
                e.printStackTrace()
            }
        }

        fun stopLoopingSound() {
            loopClip?.stop()
            loopClip?.close()
            loopClip = null
        }

        fun playShipLoop() {
            playSoundLoop("src/main/resources/sounds/spaceDrone2.wav")
        }
        fun playSound(soundFileName: String) {
            try {
                val soundFile = File(soundFileName)
                val audioInputStream = AudioSystem.getAudioInputStream(soundFile)
                val clip: Clip = AudioSystem.getClip()
                clip.open(audioInputStream)
                clip.start()
            } catch (e: UnsupportedAudioFileException) {
                e.printStackTrace()
            } catch (e: IOException) {
                e.printStackTrace()
            } catch (e: LineUnavailableException) {
                e.printStackTrace()
            }
        }
        fun playCockpit() {
            playSound("src/main/resources/sounds/takeOff.wav")
        }
        fun playTakeOff() {
            playSound("src/main/resources/sounds/takeOff.wav")
        }
    }
}
