/**
 * AudioManager — handles background ambience and sound effects.
 *
 * Uses the Web Audio API for layered, cross-fading audio.
 * Sound files live in assets/audio/.
 */
export class AudioManager {
  constructor() {
    this.ctx = null; // AudioContext (created on first interaction)
    this.masterGain = null;
    this.ambientGain = null;
    this.sfxGain = null;
    this.currentAmbient = null;
    this.volume = 0.7;
    this._cache = {};
    this._initialized = false;
  }

  /**
   * Initialize audio context (must be called after user gesture).
   */
  init() {
    if (this._initialized) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.volume;
    this.masterGain.connect(this.ctx.destination);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 0.4;
    this.ambientGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.6;
    this.sfxGain.connect(this.masterGain);

    this._initialized = true;
  }

  /**
   * Load an audio file into the cache.
   */
  async load(name, url) {
    if (this._cache[name]) return;
    try {
      const response = await fetch(url);
      if (!response.ok) return; // file doesn't exist yet — skip
      const buffer = await response.arrayBuffer();
      this._cache[name] = await this.ctx.decodeAudioData(buffer);
    } catch (e) {
      // Silent fail — audio is optional, files are added incrementally
    }
  }

  /**
   * Preload all audio from a manifest of IDs.
   * Tries {id}.mp3 first, then falls back to {id}.wav.
   * Missing files are silently skipped.
   */
  async preloadAll(ids, basePath = 'assets/audio/') {
    if (!this._initialized) this.init();

    // Resume context if suspended (browser autoplay policy)
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    const promises = ids.map(async (id) => {
      // Try .mp3 first, then .wav
      await this.load(id, `${basePath}${id}.mp3`);
      if (!this._cache[id]) {
        await this.load(id, `${basePath}${id}.wav`);
      }
    });
    await Promise.allSettled(promises);

    const loaded = Object.keys(this._cache).length;
    console.log(`Audio: ${loaded}/${ids.length} files loaded`);
  }

  /**
   * Play a one-shot sound effect.
   */
  play(name) {
    if (!this._initialized || !this._cache[name]) return;
    const source = this.ctx.createBufferSource();
    source.buffer = this._cache[name];
    source.connect(this.sfxGain);
    source.start(0);
    return source;
  }

  /**
   * Start a looping ambient track with fade-in.
   * Alias: ambient()
   */
  startAmbient(name, fadeTime = 2) {
    if (!this._initialized || !this._cache[name]) return;

    // Fade out current ambient
    if (this.currentAmbient) {
      this.stopAmbient(fadeTime);
    }

    const source = this.ctx.createBufferSource();
    source.buffer = this._cache[name];
    source.loop = true;

    const gainNode = this.ctx.createGain();
    gainNode.gain.value = 0;
    gainNode.gain.linearRampToValueAtTime(1, this.ctx.currentTime + fadeTime);

    source.connect(gainNode);
    gainNode.connect(this.ambientGain);
    source.start(0);

    this.currentAmbient = { source, gain: gainNode };
  }

  /**
   * Start a looping ambient track. Alias for startAmbient().
   */
  ambient(name, fadeTime = 2) {
    this.startAmbient(name, fadeTime);
  }

  /**
   * Stop current ambient track with fade-out.
   */
  stopAmbient(fadeTime = 2) {
    if (!this.currentAmbient) return;
    const { source, gain } = this.currentAmbient;
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + fadeTime);
    setTimeout(() => {
      try { source.stop(); } catch (e) { /* already stopped */ }
    }, fadeTime * 1000 + 100);
    this.currentAmbient = null;
  }

  /**
   * Stop all audio. Alias for stopAmbient().
   */
  stop(fadeTime = 2) {
    this.stopAmbient(fadeTime);
  }

  /**
   * Set master volume (0-1).
   */
  setVolume(v) {
    this.volume = v;
    if (this.masterGain) {
      this.masterGain.gain.value = v;
    }
  }
}
