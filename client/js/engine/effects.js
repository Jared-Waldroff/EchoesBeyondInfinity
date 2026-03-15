/**
 * Effects — visual effects for Echoes Beyond Infinity.
 *
 * Screen shake, flash, glitch, CRT power on/off, and more.
 * All effects target the #crt and #effects-layer elements.
 */
export class Effects {
  constructor() {
    this.crt = document.getElementById('crt');
    this.screen = document.getElementById('screen');
    this.layer = document.getElementById('effects-layer');
  }

  /**
   * Wait for a duration (ms). Respects fast mode.
   */
  async wait(ms, fastMode = false) {
    if (fastMode) return;
    return new Promise(r => setTimeout(r, ms));
  }

  /**
   * Flash the screen a color.
   * color: 'white' | 'orange' | 'red'
   */
  async flash(color = 'white', duration = 300) {
    const el = document.createElement('div');
    el.className = `screen-flash flash-${color}`;
    el.style.animationDuration = `${duration}ms`;
    this.layer.appendChild(el);
    await new Promise(r => setTimeout(r, duration));
    el.remove();
  }

  /**
   * Shake the screen.
   */
  async shake(duration = 300, intensity = 'normal') {
    const px = intensity === 'heavy' ? 6 : 3;
    this.screen.style.setProperty('--shake-px', `${px}px`);
    this.screen.classList.add('screen-shake');
    this.screen.style.animationDuration = `${Math.min(duration, 200)}ms`;
    this.screen.style.animationIterationCount = Math.ceil(duration / 200);

    await new Promise(r => setTimeout(r, duration));
    this.screen.classList.remove('screen-shake');
    this.screen.style.animationDuration = '';
    this.screen.style.animationIterationCount = '';
  }

  /**
   * Glitch effect — distort the screen briefly.
   */
  async glitch(duration = 300) {
    this.screen.classList.add('glitch-active');
    this.screen.style.animationDuration = `${duration}ms`;
    await new Promise(r => setTimeout(r, duration));
    this.screen.classList.remove('glitch-active');
    this.screen.style.animationDuration = '';
  }

  /**
   * CRT power on — expanding line to full screen.
   */
  async powerOn() {
    this.screen.classList.add('crt-power-on');
    await new Promise(r => setTimeout(r, 1500));
    this.screen.classList.remove('crt-power-on');
  }

  /**
   * CRT power off — collapse to line then black.
   */
  async powerOff() {
    this.screen.classList.add('crt-power-off');
    await new Promise(r => setTimeout(r, 500));
    this.screen.classList.remove('crt-power-off');
  }

  /**
   * Fade the screen to black.
   */
  async fadeToBlack(duration = 1000) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0;
      background: #0a0a12;
      opacity: 0;
      transition: opacity ${duration}ms;
      z-index: 900;
    `;
    this.layer.appendChild(overlay);
    // Trigger transition
    await new Promise(r => requestAnimationFrame(r));
    overlay.style.opacity = '1';
    await new Promise(r => setTimeout(r, duration));
    return overlay; // caller can remove when ready
  }

  /**
   * Fade from black.
   */
  async fadeFromBlack(duration = 1000) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0;
      background: #0a0a12;
      opacity: 1;
      transition: opacity ${duration}ms;
      z-index: 900;
    `;
    this.layer.appendChild(overlay);
    await new Promise(r => requestAnimationFrame(r));
    overlay.style.opacity = '0';
    await new Promise(r => setTimeout(r, duration));
    overlay.remove();
  }

  /**
   * Screen tear — horizontal displacement glitch.
   */
  async screenTear(lines = 3, duration = 200) {
    const tears = [];
    for (let i = 0; i < lines; i++) {
      const tear = document.createElement('div');
      const top = Math.random() * 100;
      const height = 2 + Math.random() * 4;
      const shift = (Math.random() - 0.5) * 20;
      tear.style.cssText = `
        position: fixed;
        top: ${top}%;
        left: 0; right: 0;
        height: ${height}px;
        background: rgba(200, 40, 30, 0.15);
        transform: translateX(${shift}px);
        z-index: 900;
        pointer-events: none;
      `;
      this.layer.appendChild(tear);
      tears.push(tear);
    }
    await new Promise(r => setTimeout(r, duration));
    tears.forEach(t => t.remove());
  }

  /**
   * Glitch text — corrupt a string with block characters.
   */
  glitchText(text, intensity = 0.1) {
    const chars = '▒░█▓▌▐▀▄';
    let result = '';
    for (const ch of text) {
      if (Math.random() < intensity) {
        result += chars[Math.floor(Math.random() * chars.length)];
      } else {
        result += ch;
      }
    }
    return result;
  }

  /**
   * Fold effect — visual fold drive animation.
   */
  async foldEffect(terminal) {
    const frames = [
      '  |  .  .  .  |',
      '  | .  .  .   |',
      '  |.  .  .    |',
      '  |. .  .     |',
      '  |..  .      |',
      '  |.. .       |',
      '  |...        |',
      '  ||          |',
    ];
    const line = terminal.say('', 'c-cyan');
    for (const frame of frames) {
      line.textContent = frame;
      await new Promise(r => setTimeout(r, 80));
    }
  }

  /**
   * Scrambler hit effect.
   */
  scramblerEffect(terminal) {
    terminal.sayHtml(`<span class="c-red">${'\u2588'.repeat(50)}</span>`);
    terminal.sayHtml(`<span class="c-red-bright">${'\u2591'.repeat(18)}FLATLINE${'\u2591'.repeat(24)}</span>`);
    terminal.sayHtml(`<span class="c-red">${'\u2588'.repeat(50)}</span>`);
  }

  /**
   * Boot text effect — text appears corrupted then cleans up.
   */
  async bootText(terminal, lines) {
    for (const text of lines) {
      // Corrupted pass
      const corrupted = this.glitchText(text, 0.3);
      const line = terminal.say(corrupted, 'warning-line');
      await new Promise(r => setTimeout(r, 60));

      // Less corrupted
      line.textContent = this.glitchText(text, 0.1);
      line.className = 'terminal-line caution-line';
      await new Promise(r => setTimeout(r, 60));

      // Clean
      line.textContent = text;
      line.className = 'terminal-line';
      await new Promise(r => setTimeout(r, 30));
    }
  }
}
