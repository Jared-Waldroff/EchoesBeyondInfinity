/**
 * Terminal — the core display engine for Echoes Beyond Infinity.
 *
 * Renders text with typewriter effects, handles menus, text input,
 * art display, and all terminal-style UI. All methods are async
 * to allow sequential scene scripting with await.
 */
export class Terminal {
  constructor(outputEl, inputEl) {
    this.output = outputEl;
    this.inputArea = inputEl;
    this.fastMode = false;
    this._skipRequested = false;
    this._audio = null;

    // Click anywhere to skip current typewriter
    document.addEventListener('click', () => {
      this._skipRequested = true;
    });
  }

  /**
   * Set audio manager reference for UI sounds.
   */
  setAudio(audio) {
    this._audio = audio;
  }

  // ─── CORE OUTPUT ───

  /**
   * Instant text — no typewriter animation.
   */
  say(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`.trim();
    line.textContent = text;
    this.output.appendChild(line);
    this._scrollToBottom();
    return line;
  }

  /**
   * Instant text with HTML content (for colored text).
   */
  sayHtml(html, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`.trim();
    line.innerHTML = html;
    this.output.appendChild(line);
    this._scrollToBottom();
    return line;
  }

  /**
   * Typewriter effect — text appears character by character.
   * Returns a promise that resolves when complete.
   */
  async typed(text, { speed = 28, className = '', pauseAfter = 0 } = {}) {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`.trim();
    this.output.appendChild(line);

    if (this.fastMode) {
      line.textContent = text;
      this._scrollToBottom();
      if (pauseAfter > 0) await this._wait(50);
      return line;
    }

    this._skipRequested = false;
    if (this._audio) this._audio.play('ui_typing');

    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    line.appendChild(cursor);

    for (let i = 0; i < text.length; i++) {
      if (this._skipRequested) {
        line.textContent = text;
        this._scrollToBottom();
        break;
      }
      // Insert character before cursor
      const charNode = document.createTextNode(text[i]);
      line.insertBefore(charNode, cursor);
      this._scrollToBottom();

      // Variable timing for natural feel
      let delay = speed;
      const ch = text[i];
      if (ch === '.' || ch === '—') delay = speed * 4;
      else if (ch === ',') delay = speed * 2;
      else if (ch === ' ') delay = speed * 0.5;

      await this._wait(delay);
    }

    // Remove cursor
    if (cursor.parentNode) cursor.remove();

    if (pauseAfter > 0) await this._wait(pauseAfter);
    return line;
  }

  /**
   * Slow typewriter — for dramatic moments.
   */
  async typedSlow(text, opts = {}) {
    return this.typed(text, { speed: 45, ...opts });
  }

  // ─── DIALOGUE ───

  async narrate(text) {
    return this.typed(text, { className: 'narrate', speed: 25 });
  }

  async narrateSlow(text) {
    return this.typed(text, { className: 'narrate', speed: 40 });
  }

  async dent(text) {
    return this.typed(`> DENT: "${text}"`, { className: 'dent-line', speed: 25 });
  }

  async dentLine(text) {
    return this.typed(`>       ${text}`, { className: 'dent-line', speed: 25 });
  }

  async dentGlitch(text) {
    const glitchChars = '▒░█▓';
    let glitched = '';
    for (const ch of text) {
      if (Math.random() < 0.08) {
        glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        glitched += ch;
      }
    }
    return this.typed(`> DENT: "${glitched}"`, { className: 'dent-line', speed: 25 });
  }

  async dentSystem(text) {
    return this.typed(`> ${text}`, { className: 'dent-line', speed: 12 });
  }

  async thought(text) {
    return this.typed(text, { className: 'thought-line', speed: 30 });
  }

  async flashback(text) {
    return this.typed(text, { className: 'flashback-line', speed: 25 });
  }

  async flashbackVivid(text) {
    return this.typed(text, { className: 'flashback-vivid-line', speed: 28 });
  }

  async thoughtSlow(text) {
    return this.typed(text, { className: 'thought-line', speed: 40 });
  }

  async warning(text) {
    if (this._audio) this._audio.play('ui_warning');
    return this.typed(text, { className: 'warning-line', speed: 20 });
  }

  async caution(text) {
    return this.typed(text, { className: 'caution-line', speed: 20 });
  }

  async highlight(text) {
    return this.typed(text, { className: 'highlight-line', speed: 20 });
  }

  async logEntry(text) {
    return this.typed(text, { className: 'log-line', speed: 22 });
  }

  async system(text) {
    return this.typed(text, { className: 'system-line', speed: 8 });
  }

  // ─── DISPLAY HELPERS ───

  blank() {
    const line = document.createElement('div');
    line.className = 'line-blank';
    this.output.appendChild(line);
    this._scrollToBottom();
  }

  separator() {
    this.say('───────────────────────────────────────────────', 'separator-line');
  }

  clear() {
    this.output.innerHTML = '';
    this.inputArea.innerHTML = '';
  }

  /**
   * Smooth clear — fade out then clear.
   */
  async clearSmooth() {
    this.output.style.transition = 'opacity 0.4s';
    this.output.style.opacity = '0';
    await this._wait(400);
    this.clear();
    this.output.style.opacity = '1';
    await this._wait(100);
  }

  // ─── ART ───

  /**
   * Display an art piece (HTML string with color spans).
   */
  showArt(html, { fadeIn = false, className = '' } = {}) {
    const container = document.createElement('div');
    container.className = `art-container ${className}`.trim();
    if (fadeIn) container.classList.add('fade-in');
    container.innerHTML = html;
    this.output.appendChild(container);
    this._scrollToBottom();
    return container;
  }

  // ─── INPUT ───

  /**
   * Wait for the player to press a key.
   */
  async pause(message = 'Press any key to continue') {
    if (this.fastMode) {
      await this._wait(50);
      return;
    }

    if (this._audio) this._audio.play('ui_pause');

    const prompt = document.createElement('div');
    prompt.className = 'pause-prompt';
    prompt.textContent = `[${message}]`;
    this.output.appendChild(prompt);
    this._scrollToBottom();

    await new Promise(resolve => {
      const handler = (e) => {
        // Ignore modifier keys alone
        if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
        document.removeEventListener('keydown', handler);
        resolve();
      };
      document.addEventListener('keydown', handler);
    });

    prompt.remove();
  }

  /**
   * Get a text command from the player.
   * validCommands: array of accepted commands (null = accept anything).
   * Returns the command string (lowercase, trimmed).
   */
  async getCommand(validCommands = null, promptChar = '▸') {
    return new Promise(resolve => {
      const wrapper = document.createElement('div');
      wrapper.className = 'command-input-wrapper';

      const promptEl = document.createElement('span');
      promptEl.className = 'command-prompt';
      promptEl.textContent = promptChar;

      const input = document.createElement('input');
      input.className = 'command-input';
      input.type = 'text';
      input.autocomplete = 'off';
      input.spellcheck = false;

      wrapper.appendChild(promptEl);
      wrapper.appendChild(input);
      this.inputArea.innerHTML = '';

      // Show valid commands as a persistent hint above the input
      if (validCommands) {
        const hint = document.createElement('div');
        hint.className = 'command-hint';
        validCommands.forEach((cmd, i) => {
          if (i > 0) {
            const sep = document.createElement('span');
            sep.className = 'command-hint-sep';
            sep.textContent = ' \u2022 ';
            hint.appendChild(sep);
          }
          const opt = document.createElement('span');
          opt.className = 'command-hint-option';
          opt.textContent = cmd;
          hint.appendChild(opt);
        });
        this.inputArea.appendChild(hint);
      }

      this.inputArea.appendChild(wrapper);
      input.focus();
      this._scrollToBottom();

      const submit = () => {
        const val = input.value.trim().toLowerCase();
        if (!val) return;

        if (val === '`') {
          this.fastMode = !this.fastMode;
          const label = this.fastMode ? 'ON' : 'OFF';
          this.say(`[Fast mode: ${label}]`, 'system-line');
          input.value = '';
          return;
        }

        if (validCommands) {
          // Check for partial match
          const matches = validCommands.filter(c => c.startsWith(val));
          if (matches.length === 1) {
            this._finishCommand(wrapper, matches[0]);
            resolve(matches[0]);
            return;
          }
          if (validCommands.includes(val)) {
            this._finishCommand(wrapper, val);
            resolve(val);
            return;
          }
          this.say(`Try: ${validCommands.join(', ')}`, 'dim-text');
          input.value = '';
          input.focus();
          return;
        }

        this._finishCommand(wrapper, val);
        resolve(val);
      };

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submit();
      });
    });
  }

  _finishCommand(wrapper, command) {
    // Replace input with static echo of the command
    this.say(`▸ ${command}`, 'orange-text');
    this.blank();
    this.inputArea.innerHTML = '';
  }

  /**
   * Arrow-key navigable menu. Returns selected index (0-based).
   */
  async arrowMenu(options, descriptions = null) {
    return new Promise(resolve => {
      let selected = 0;

      const container = document.createElement('div');
      container.className = 'menu-container';

      const optionEls = options.map((opt, i) => {
        const el = document.createElement('div');
        el.className = 'menu-option';
        el.dataset.index = i;

        const marker = document.createElement('span');
        marker.className = 'option-marker';
        marker.textContent = '  ';

        const label = document.createElement('span');
        label.className = 'option-label';
        label.textContent = opt;

        el.appendChild(marker);
        el.appendChild(label);

        if (descriptions && descriptions[i]) {
          const desc = document.createElement('span');
          desc.className = 'option-desc';
          desc.textContent = descriptions[i];
          el.appendChild(desc);
        }

        // Mouse hover
        el.addEventListener('mouseenter', () => {
          selected = i;
          render();
        });

        // Mouse click
        el.addEventListener('click', () => {
          selected = i;
          finish();
        });

        container.appendChild(el);
        return el;
      });

      this.output.appendChild(container);
      this.blank();
      this._scrollToBottom();

      const render = () => {
        optionEls.forEach((el, i) => {
          if (i === selected) {
            el.classList.add('selected');
            el.querySelector('.option-marker').textContent = '▸ ';
          } else {
            el.classList.remove('selected');
            el.querySelector('.option-marker').textContent = '  ';
          }
        });
      };

      const finish = () => {
        document.removeEventListener('keydown', handler);
        // Show selected option as static text
        container.remove();
        this.say(`▸ ${options[selected]}`, 'orange-text');
        this.blank();
        resolve(selected);
      };

      const handler = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'w') {
          e.preventDefault();
          selected = (selected - 1 + options.length) % options.length;
          if (this._audio) this._audio.play('ui_select');
          render();
        } else if (e.key === 'ArrowDown' || e.key === 's') {
          e.preventDefault();
          selected = (selected + 1) % options.length;
          if (this._audio) this._audio.play('ui_select');
          render();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (this._audio) this._audio.play('ui_confirm');
          finish();
        } else if (e.key === '`') {
          this.fastMode = !this.fastMode;
        }
      };

      document.addEventListener('keydown', handler);
      render();
    });
  }

  /**
   * Chapter title card.
   */
  async chapterTitle(number, title) {
    if (this._audio) this._audio.play('stinger_chapter_start');
    const border = '══════════════════════════════════════════════════';
    const el = document.createElement('div');
    el.className = 'chapter-title';
    el.innerHTML = `
      <div class="title-border">${border}</div>
      <div><span class="title-number">CHAPTER ${number}</span> <span class="c-hull">///</span> <span class="title-text">${title}</span></div>
      <div class="title-border">${border}</div>
    `;
    this.output.appendChild(el);
    this._scrollToBottom();
    await this._wait(this.fastMode ? 100 : 2000);
  }

  /**
   * Action menu — arrow menu for game actions.
   * Takes array of [command, description] tuples.
   * Returns the selected command string.
   */
  async actionMenu(actions) {
    const labels = actions.map(a => a[0]);
    const descs = actions.map(a => a[1]);
    const idx = await this.arrowMenu(labels, descs);
    return labels[idx];
  }

  /**
   * Title card — simple static version (dev mode / fast mode).
   */
  titleCard() {
    const border = '════════════════════════════════════════════════════════';
    this.say(border, 'orange-text');
    this.blank();
    this.say('  E C H O E S   B E Y O N D   I N F I N I T Y', 'highlight-line');
    this.say('  Cycle N / Agent: VIN', 'dim-text');
    this.blank();
    this.say(border, 'orange-text');
  }

  /**
   * Epic animated title screen — boot sequence, reveal, reactive idle.
   * Blocks until the player presses a key.
   */
  async titleScreen(effects) {
    // ─── Fast mode: static render ───
    if (this.fastMode) {
      this._renderTitle();
      await this.pause('Press any key to begin');
      return;
    }

    // ─── Phase 1: Darkness ───
    await this._wait(600);

    // ─── Phase 2: Boot corruption ───
    const bootFragments = [
      '[0x00] SUBSTRATE_INIT v4.7.1 .............. OK',
      '[0x01] BULK_OBSERVER ...................... SYNC',
      '[0x02] ITERATION_INDEX ........... \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588',
      '[0x03] AGENT_DESIGNATION .......... \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588',
      '[0x04] CYCLE_HISTORY: 846 ITERATIONS LOGGED',
      '[0x05] MEMORY_FILE ................. ANOMALOUS',
      '[0x06] TEMPORAL_COHERENCE .......... DEGRADED',
      '[0x07] ECHO_PROTOCOL .................. ARMED',
      '[0x08] FOLD_SUBSTRATE ................. READY',
      '[0x09] LOADING AGENT CONTEXT...',
    ];

    const glitchChars = '\u2592\u2591\u2588\u2593\u258C\u2590\u2580\u2584';

    for (const frag of bootFragments) {
      // Corrupted pass
      let corrupted = '';
      for (const ch of frag) {
        corrupted += Math.random() < 0.25
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : ch;
      }
      const line = this.say(corrupted, 'system-line');
      await this._wait(50);

      // Half-clean pass
      let halfClean = '';
      for (const ch of frag) {
        halfClean += Math.random() < 0.08
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : ch;
      }
      line.textContent = halfClean;
      await this._wait(30);

      // Clean
      line.textContent = frag;
      await this._wait(20);
    }

    await this._wait(400);

    // Glitch burst
    if (effects) {
      await effects.screenTear(3, 150);
      await effects.glitch(200);
    }

    await this._wait(300);
    this.clear();
    await this._wait(700);

    // ─── Phase 3: Title reveal ───
    this._renderTitle();

    // ─── Phase 4: Reactive idle ───
    const container = this.output.querySelector('.title-art-main');
    const echoLines = container ? container.querySelectorAll('.title-echo-line span') : [];
    const bleedZone = container ? container.querySelector('.title-bleed-zone') : null;
    const intervalIds = [];
    const handlers = [];

    // Gather ALL title art spans (ECHOES + BEYOND + INFINITY)
    const allArtSpans = container
      ? container.querySelectorAll('.title-echo-line span, .title-sub-line span')
      : [];

    if (container && allArtSpans.length) {
      // ── Single-char corruption: substrate degradation ──
      // Random block chars flicker across all three words
      intervalIds.push(setInterval(() => {
        if (Math.random() > 0.5) return;
        const lineEl = allArtSpans[Math.floor(Math.random() * allArtSpans.length)];
        const original = lineEl.textContent;
        const chars = original.split('');
        const idx = Math.floor(Math.random() * chars.length);
        if (chars[idx] === ' ') return;
        chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        lineEl.textContent = chars.join('');
        setTimeout(() => { lineEl.textContent = original; }, 100);
      }, 1800));

      // ── Temporal stutter: brief horizontal shift on a random line ──
      // A single line jitters sideways like a bad signal
      intervalIds.push(setInterval(() => {
        if (Math.random() > 0.35) return;
        const lineEl = allArtSpans[Math.floor(Math.random() * allArtSpans.length)];
        const shift = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.floor(Math.random() * 3));
        lineEl.style.transform = `translateX(${shift}px)`;
        setTimeout(() => { lineEl.style.transform = ''; }, 80);
      }, 3200));

      // ── Cycle echo: a whole line briefly dims then snaps back ──
      // Like a memory from another iteration bleeding through
      intervalIds.push(setInterval(() => {
        if (Math.random() > 0.3) return;
        const lineEl = allArtSpans[Math.floor(Math.random() * allArtSpans.length)];
        lineEl.style.opacity = '0.15';
        setTimeout(() => { lineEl.style.opacity = ''; }, 150);
      }, 4500));

      // ── Corruption burst: multiple chars at once on ECHOES ──
      // The primary word is the most unstable — it's the Echo itself
      intervalIds.push(setInterval(() => {
        if (Math.random() > 0.25) return;
        const lineEl = echoLines[Math.floor(Math.random() * echoLines.length)];
        if (!lineEl) return;
        const original = lineEl.textContent;
        const chars = original.split('');
        const count = 2 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * chars.length);
          if (chars[idx] !== ' ') {
            chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
        }
        lineEl.textContent = chars.join('');
        setTimeout(() => { lineEl.textContent = original; }, 120);
      }, 5000));

      // Narrative bleed-through — ghost fragments from other cycles
      const bleeds = [
        'I\u2019ve done this before.',
        'Cycle 846 / Status: TERMINATED',
        'the loop closes.',
        'My memory file is larger than it should be.',
        'DENT, can you hear me?',
        'You are iteration 847.',
        'the echoes were never from outside.',
        'She said: make sure the next one gets here.',
      ];

      if (bleedZone) {
        // First bleed after 4 seconds, then every 5 seconds
        intervalIds.push(setInterval(() => {
          if (Math.random() > 0.55) return;
          const text = bleeds[Math.floor(Math.random() * bleeds.length)];
          const el = document.createElement('div');
          el.className = 'title-bleed';
          el.textContent = text;
          bleedZone.innerHTML = '';
          bleedZone.appendChild(el);
          requestAnimationFrame(() => el.classList.add('visible'));
          setTimeout(() => {
            el.classList.remove('visible');
            setTimeout(() => { if (el.parentNode) el.remove(); }, 1500);
          }, 3000);
        }, 5000));
      }

      // Mouse movement → micro-tear (throttled)
      let lastMouseTime = 0;
      const mouseHandler = () => {
        const now = Date.now();
        if (now - lastMouseTime < 400) return;
        lastMouseTime = now;
        container.classList.add('title-micro-tear');
        setTimeout(() => container.classList.remove('title-micro-tear'), 120);
      };
      document.addEventListener('mousemove', mouseHandler, { passive: true });
      handlers.push(['mousemove', mouseHandler]);

      // Keyboard → brief screen tear on the transition out
      const keyHandler = (e) => {
        if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
        if (effects) effects.screenTear(1, 100);
      };
      document.addEventListener('keydown', keyHandler);
      handlers.push(['keydown', keyHandler]);
    }

    // ─── Phase 5: Wait for player ───
    await this.pause('Press any key to begin');

    // ─── Phase 6: Cleanup ───
    intervalIds.forEach(id => clearInterval(id));
    handlers.forEach(([evt, fn]) => document.removeEventListener(evt, fn));
  }

  /**
   * Render the title art into the terminal output.
   * Custom block-character ASCII art font using █ glyphs.
   * Note: All content is hardcoded game chrome — no user input.
   */
  _renderTitle() {
    // ── Letter definitions: 8 chars wide, 5 lines tall ──
    const L = {
      E: ['████████','██      ','██████  ','██      ','████████'],
      C: [' ██████ ','██      ','██      ','██      ',' ██████ '],
      H: ['██    ██','██    ██','████████','██    ██','██    ██'],
      O: [' ██████ ','██    ██','██    ██','██    ██',' ██████ '],
      S: [' ██████ ','██      ',' ██████ ','      ██',' ██████ '],
      B: ['██████  ','██    ██','██████  ','██    ██','██████  '],
      Y: ['██    ██',' ██  ██ ','  ████  ','   ██   ','   ██   '],
      N: ['██    ██','███   ██','██ ██ ██','██   ███','██    ██'],
      D: ['██████  ','██    ██','██    ██','██    ██','██████  '],
      I: ['████████','   ██   ','   ██   ','   ██   ','████████'],
      F: ['████████','██      ','██████  ','██      ','██      '],
      T: ['████████','   ██   ','   ██   ','   ██   ','   ██   '],
    };

    // Assemble a word from letter arrays, joined with gap
    const buildWord = (word, gap) => {
      const chars = word.split('').map(ch => L[ch]);
      return Array.from({length: 5}, (_, row) =>
        chars.map(c => c[row]).join(gap)
      );
    };

    const echoesLines = buildWord('ECHOES', '  ');
    const beyondLines = buildWord('BEYOND', '  ');
    const infinityLines = buildWord('INFINITY', ' ');

    const container = document.createElement('div');
    container.className = 'title-art-main';

    // Top decorative border
    const borderW = 62;
    const topBorder = `<div class="title-border-anim">╔${'═'.repeat(borderW)}╗</div>`;

    // ECHOES — color gradient top-to-bottom (white → orange)
    const echoColors = [
      'c-white-bright', 'c-white-bright', 'c-orange', 'c-orange', 'c-hull'
    ];
    const echoesHtml = echoesLines.map((line, i) =>
      `<div class="title-echo-line"><span class="${echoColors[i]}">${line}</span></div>`
    ).join('\n');

    // BEYOND — orange
    const beyondHtml = beyondLines.map(line =>
      `<div class="title-sub-line"><span class="c-orange">${line}</span></div>`
    ).join('\n');

    // INFINITY — orange
    const infinityHtml = infinityLines.map(line =>
      `<div class="title-sub-line"><span class="c-orange">${line}</span></div>`
    ).join('\n');

    const botBorder = `<div class="title-border-anim">╚${'═'.repeat(borderW)}╝</div>`;

    container.innerHTML = [
      topBorder,
      '<div class="title-echoes-block">' + echoesHtml + '</div>',
      '<div class="title-sub-block">' + beyondHtml + '</div>',
      '<div class="title-sub-block">' + infinityHtml + '</div>',
      botBorder,
      '<div class="title-cycle">Cycle N  /  Agent: VIN</div>',
      '<div class="title-bleed-zone" style="min-height:30px;margin-top:16px"></div>',
    ].join('\n');

    this.output.appendChild(container);
    this._scrollToBottom();
  }

  /**
   * Show choices — 1-indexed (matches Python show_choices).
   * Returns 1-based index.
   */
  async showChoices(choices) {
    const labels = choices.map(c => Array.isArray(c) ? c[0] : c);
    const descs = choices.map(c => Array.isArray(c) ? (c[1] || null) : null);
    const idx = await this.arrowMenu(labels, descs);
    return idx + 1;
  }

  /**
   * Inline status panel rendered into the terminal output.
   * Note: All HTML here is hardcoded UI chrome — no user input.
   */
  statusPanel(state) {
    this.sayHtml(`<span class="c-hull">\u250C\u2500 VIN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>`);
    this.sayHtml(`  Health ${this.bar(state.health)}  Neural ${this.bar(state.neural)}  Stress ${this.bar(state.stress)}`);
    this.sayHtml(`<span class="c-hull">\u251C\u2500 THE VEX \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524</span>`);
    this.sayHtml(`  Hull ${this.bar(state.hull)}  <span class="c-dim">Null: ${state.nullReserves} cells</span>  <span class="c-dim">Fold: ${state.foldStatus}</span>`);
    this.sayHtml(`<span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>`);
  }

  /**
   * Ship header banner.
   * Note: All content is hardcoded UI chrome — no user input.
   */
  shipHeader(shipName = 'THE VEX', version = 'v4.7.1') {
    this.sayHtml(`<span class="c-hull">\u250C\u2500 <span class="c-orange">${shipName}</span> <span class="c-dim">${version}</span> \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>`);
  }

  shipFooter() {
    this.sayHtml(`<span class="c-hull">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>`);
  }

  /**
   * System line — name/status pair for diagnostic panels.
   * Note: All content is hardcoded game UI — no user input.
   */
  systemLine(name, status, statusClass, detail = '', pad = 20) {
    const padded = name.padEnd(pad, '.');
    const detailPart = detail ? ` <span class="c-dim">${detail}</span>` : '';
    this.sayHtml(`  <span class="c-dim">${padded}</span> <span class="${statusClass}">${status}</span>${detailPart}`);
  }

  /**
   * Stat bar as HTML string.
   */
  bar(value, max = 100, width = 10) {
    const pct = Math.round((value / max) * 100);
    const filled = Math.round((value / max) * width);
    const empty = width - filled;
    let cls = 'c-green';
    if (pct <= 20) cls = 'c-red-bright';
    else if (pct <= 40) cls = 'c-yellow';
    return `<span class="${cls}">${'\u2588'.repeat(filled)}</span><span class="c-dark">${'\u2591'.repeat(empty)}</span> ${pct}%`;
  }

  /**
   * Vex ship map — highlights current room.
   * Note: All content is hardcoded game map — no user input.
   */
  vexMap(currentRoom = null) {
    const rm = (key, label) => {
      if (currentRoom === key) return `<span class="c-orange" style="font-weight:bold">[${label}]</span>`;
      return `<span class="c-dim">[${label}]</span>`;
    };
    const g = 'c-hull';
    this.blank();
    this.sayHtml(`  <span class="${g}">+-----------------------------+</span>`);
    this.sayHtml(`  <span class="${g}">|</span>        THE VEX              <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>                             <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>    ${rm('sensors','SEN')}<span class="${g}">----------</span>${rm('bridge','BRG')}    <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>      <span class="${g}">|              |</span>       <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>      <span class="${g}">+----</span>${rm('engineering','ENG')}<span class="${g}">-----+</span>       <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>            <span class="${g}">|</span>               <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>       ${rm('quarters','QTR')}   ${rm('cargo','CRG')}        <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>                             <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">+-----------------------------+</span>`);
    this.blank();
  }

  /**
   * Torquer weapon art display.
   * Note: All content is hardcoded game art — no user input.
   */
  torquerArt(powered = false) {
    if (powered) {
      this.sayHtml(`      <span class="c-cyan">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>`);
      this.sayHtml(`      <span class="c-cyan">\u2502 \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593 \u2502</span> <span class="c-cyan">\u25C4 DISTAL \u2014 Neg-Energy [ACTIVE]</span>`);
      this.sayHtml(`      <span class="c-cyan">\u2502 \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593 \u2502</span>`);
      this.sayHtml(`      <span class="c-hull">\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524</span>`);
      this.sayHtml(`      <span class="c-orange">\u2502 \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593 \u2502</span> <span class="c-orange">\u25C4 PROXIMAL \u2014 Fusion [ACTIVE]</span>`);
      this.sayHtml(`      <span class="c-orange">\u2502 \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593 \u2502</span>`);
      this.sayHtml(`      <span class="c-hull">\u256E\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>`);
    } else {
      this.sayHtml(`      <span class="c-hull">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>`);
      this.sayHtml(`      <span class="c-hull">\u2502 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2502</span> <span class="c-dim">\u25C4 DISTAL \u2014 Neg-Energy [INERT]</span>`);
      this.sayHtml(`      <span class="c-hull">\u2502 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2502</span>`);
      this.sayHtml(`      <span class="c-hull">\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524</span>`);
      this.sayHtml(`      <span class="c-yellow">\u2502 \u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592 \u2502</span> <span class="c-yellow">\u25C4 PROXIMAL \u2014 Fusion [DORMANT]</span>`);
      this.sayHtml(`      <span class="c-yellow">\u2502 \u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592 \u2502</span>`);
      this.sayHtml(`      <span class="c-hull">\u256E\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>`);
    }
  }

  /**
   * Derelict ship map — highlights current room.
   * Note: All content is hardcoded game map — no user input.
   */
  derelictMap(currentRoom = null) {
    const rm = (key, label) => {
      if (currentRoom === key) return `<span class="c-orange" style="font-weight:bold">[${label}]</span>`;
      return `<span class="c-dim">[${label}]</span>`;
    };
    const g = 'c-hull';
    this.blank();
    this.sayHtml(`  <span class="${g}">+-------------------------------+</span>`);
    this.sayHtml(`  <span class="${g}">|</span>     <span class="c-red">DERELICT \u2014 FSV UNKNOWN</span>    <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>                               <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>    ${rm('airlock','AIR')}<span class="${g}">----</span>${rm('corridor','COR')}<span class="${g}">----</span>${rm('d_bridge','BRG')}    <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>                <span class="${g}">|</span>              <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>           ${rm('d_engineering','ENG')}  ${rm('d_cargo','CRG')}       <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">|</span>                               <span class="${g}">|</span>`);
    this.sayHtml(`  <span class="${g}">+-------------------------------+</span>`);
    this.blank();
  }

  /**
   * EVA HUD overlay.
   * Note: All content is hardcoded game UI — no user input.
   */
  evaHud(suitO2 = 100, tetherLength = 0, nullCollected = 0, targetNull = 20) {
    const g = 'c-hull';
    this.sayHtml(`<span class="${g}">\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 EVA HUD \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557</span>`);
    this.sayHtml(`<span class="${g}">\u2551</span>  O\u2082: ${this.bar(suitO2, 100, 8)} <span class="c-white-bright">${String(suitO2).padStart(3)}%</span>           <span class="${g}">\u2551</span>`);
    const pct = targetNull > 0 ? Math.round((nullCollected / targetNull) * 100) : 0;
    this.sayHtml(`<span class="${g}">\u2551</span>  NL: ${this.bar(nullCollected, targetNull, 8)} <span class="c-cyan">${String(pct).padStart(3)}%</span>           <span class="${g}">\u2551</span>`);
    if (tetherLength > 0) {
      this.sayHtml(`<span class="${g}">\u2551</span>  Tether: <span class="c-white-bright">${tetherLength}m</span>                  <span class="${g}">\u2551</span>`);
    }
    this.sayHtml(`<span class="${g}">\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D</span>`);
    this.blank();
  }

  /**
   * Travel selection panel with fuel costs.
   * options: array of [name, fuelCost, risk, timeEst, desc]
   * Note: All content is hardcoded game UI — no user input.
   */
  travelSelectionPanel(fuelCurrent, options) {
    const border = '\u2500'.repeat(52);
    this.sayHtml(`<span class="c-hull">${border}</span>`);
    this.sayHtml(`  <span class="c-white-bright" style="font-weight:bold">DEPARTURE OPTIONS</span>    <span class="c-dim">Current Null: ${fuelCurrent} cells</span>`);
    this.sayHtml(`<span class="c-hull">${border}</span>`);
    this.blank();
    const colors = ['c-orange', 'c-green', 'c-yellow'];
    options.forEach(([name, fuelCost, risk, timeEst, desc], i) => {
      const cls = colors[i] || 'c-orange';
      this.sayHtml(`  <span class="${cls}">[${i + 1}]</span> <span class="c-white-bright" style="font-weight:bold">${name}</span>`);
      this.sayHtml(`      <span class="c-dim">Cost: -${fuelCost} cells  |  Risk: ${risk}  |  ETA: ${timeEst}</span>`);
      this.sayHtml(`      <span class="c-dim">${desc}</span>`);
      this.blank();
    });
    this.sayHtml(`<span class="c-hull">${border}</span>`);
  }

  /**
   * Repair progress panel.
   * repairs: array of [name, done] pairs.
   * Note: All content is hardcoded game UI — no user input.
   */
  repairProgressPanel(repairs) {
    this.sayHtml(`<span class="c-hull">--- REPAIR STATUS --------------------------</span>`);
    for (const [name, done] of repairs) {
      if (done) {
        this.sayHtml(`  <span class="c-green">\u2713</span> <span class="c-dim">${name}</span>`);
      } else {
        this.sayHtml(`  <span class="c-red">\u25CB</span> <span class="c-white-bright">${name}</span>`);
      }
    }
    this.sayHtml(`<span class="c-hull">---------------------------------------------</span>`);
    this.blank();
  }

  /**
   * Damaged system panel — boot-up status display.
   * Note: All content is hardcoded game UI — no user input.
   */
  damagedSystemPanel() {
    this.sayHtml(`<span class="c-hull">--- ??? SYSTEMS ---</span> <span class="c-red">ERROR</span>`);
    this.sayHtml(`  Memory .............. <span class="c-red">CORRUPTED</span>`);
    this.sayHtml(`  Sensors ............. <span class="c-hull">OFFLINE</span>`);
    this.sayHtml(`  Null Core ........... <span class="c-hull">OFFLINE</span>`);
    this.sayHtml(`  Fold Drive .......... <span class="c-hull">OFFLINE</span>`);
    this.sayHtml(`  Life Support ........ <span class="c-red-bright">CRITICAL (11%)</span>`);
    this.sayHtml(`  Gravity Drive ....... <span class="c-red">OFFLINE</span>`);
    this.sayHtml(`  D.E.N.T. ........... <span class="c-yellow">REBOOTING...</span>`);
    this.sayHtml(`<span class="c-hull">-------------------------------------------</span>`);
  }

  /**
   * Status panel (sidebar).
   * Note: All content is hardcoded game UI — no user input.
   */
  showStatusPanel(state) {
    const panel = document.getElementById('status-panel');
    const content = document.getElementById('status-content');
    panel.classList.remove('hidden');

    content.innerHTML = [
      '<div class="c-hull" style="margin-bottom:12px">\u2500\u2500 VIN \u2500\u2500</div>',
      `<div>Health ${this.bar(state.health)}</div>`,
      `<div>Neural ${this.bar(state.neural)}</div>`,
      `<div>Stress ${this.bar(state.stress)}</div>`,
      '<div class="c-hull" style="margin:12px 0">\u2500\u2500 THE VEX \u2500\u2500</div>',
      `<div>Hull   ${this.bar(state.hull)}</div>`,
      `<div>Null   <span class="c-dim">${state.nullReserves} cells</span></div>`,
      `<div>Fold   <span class="c-dim">${state.foldStatus}</span></div>`,
      '<div class="c-hull" style="margin:12px 0">\u2500\u2500 DENT \u2500\u2500</div>',
      `<div><span class="c-dim">Repair: ${Math.round(state.dentRepairLevel * 100)}%</span></div>`,
    ].join('');
  }

  hideStatusPanel() {
    document.getElementById('status-panel').classList.add('hidden');
  }

  // ─── INTERNAL ───

  _scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }

  _wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
}
