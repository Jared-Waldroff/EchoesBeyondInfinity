/**
 * Prologue Art — Rich Unicode art for the prologue chapter.
 *
 * Uses shade characters (░▒▓), half-blocks (▀▄), box-drawing,
 * and geometric Unicode for detailed, atmospheric compositions.
 *
 * Color classes map to CSS variables in game.css.
 * The extended palette (c-hull-dk, c-nebula, c-star-*, etc.)
 * provides gradient tones for smooth shading.
 */

const c = (cls, text) => `<span class="c-${cls}">${text}</span>`;

// ═══════════════════════════════════════════════════════
// PHASE 1: DARK
// ═══════════════════════════════════════════════════════

/**
 * 1. The Void — deep space. Subtle nebula wisps, scattered micro-stars.
 *    Frameless composition — vast, oppressive emptiness.
 */
export function artVoid() {
  const nb = 'nebula', nl = 'nebula-lt', vl = 'void-lt';
  const s1 = 'star-1', s2 = 'star-2', s3 = 'star-3';
  // W=75: all non-empty lines padded to 75
  return `<pre class="art">
                                                                  ${c(s1,'·        ')}
          ${c(s1,'·                                                                ')}
                                                    ${c(vl,'░                      ')}
                                 ${c(s2,'·')}                 ${c(nb,'░░')}${c(nl,'▒')}${c(nb,'░░                   ')}
                                                  ${c(nb,'░')}${c(nl,'▒▓▒')}${c(nb,'░░                   ')}
                                                ${c(nb,'░░')}${c(nl,'▒▓▓▒')}${c(nb,'░░                   ')}
              ${c(s2,'·')}                            ${c(nb,'░')}${c(nl,'▒▓▒')}${c(nb,'░░')}        ${c(s2,'·                 ')}
                                                  ${c(nb,'░')}${c(nl,'▒')}${c(nb,'░░                     ')}
       ${c(s1,'·')}                                     ${c(vl,'░                             ')}
                                                                 ${c(s1,'·         ')}
                        ${c(s3,'·                                                  ')}
                                                      ${c(s1,'·                    ')}
                  ${c(s2,'·                                                        ')}
                                                              ${c(s1,'·            ')}
   ${c(s1,'·                                                                       ')}
                                       ${c(s2,'·                                   ')}
                                                                          ${c(s1,'·')}
        ${c(s1,'·                                                                  ')}</pre>`;
}

/**
 * 1b. The Void — eyes adjusting, faint corridor geometry emerging.
 *     Perspective walls materializing from absolute darkness.
 */
export function artVoidShapes() {
  const f = 'faint', vl = 'void-lt', hd = 'hull-dk';
  const s1 = 'star-1', s2 = 'star-2';
  // W=53: perspective corridor, each row padded to 53 visible chars
  return `<pre class="art">
${c(vl,'              ╱')}${c(f,'─────────────────────────────────────')}${c(vl,'╲')}
${c(vl,'            ╱')}  ${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}  ${c(vl,'╲')}
${c(vl,'          ╱')}  ${c(f,'░░')}${c(hd,'┌──────┐')}${c(f,'░░░░░░░░░░░░░░░░░')}${c(hd,'┌──────┐')}${c(f,'░░')}  ${c(vl,'╲')}
${c(vl,'        ╱')}  ${c(f,'░░░░')}${c(hd,'│')}      ${c(hd,'│')}${c(f,'░░░░░░')} ${c(s1,'·')} ${c(f,'░░░░░░')}${c(hd,'│')}      ${c(hd,'│')}${c(f,'░░░░')}  ${c(vl,'╲')}
${c(vl,'       │')}  ${c(f,'░░░░░')}${c(hd,'│')}      ${c(hd,'│')}${c(f,'░░░░░░░░░░░░░░')}${c(hd,'│')}      ${c(hd,'│')}${c(f,'░░░░░')}  ${c(vl,'│')}
${c(vl,'       │')}  ${c(f,'░░░░░')}${c(hd,'└──────┘')}${c(f,'░░░░░░░░░░░░░░')}${c(hd,'└──────┘')}${c(f,'░░░░░')}  ${c(vl,'│')}
${c(vl,'       │')}  ${c(f,'░░░░░')}${c(hd,'┌──────┐')}${c(f,'░░░░░░')}   ${c(f,'░░░░░')}${c(hd,'┌──────┐')}${c(f,'░░░░░')}  ${c(vl,'│')}
${c(vl,'       │')}  ${c(f,'░░░░░')}${c(hd,'│')}      ${c(hd,'│')}${c(f,'░░░░░░')} ${c(s2,'·')} ${c(f,'░░░░░')}${c(hd,'│')}      ${c(hd,'│')}${c(f,'░░░░░')}  ${c(vl,'│')}
${c(vl,'       │')}  ${c(f,'░░░░░')}${c(hd,'│')}      ${c(hd,'│')}${c(f,'░░░░░░░░░░░░░░')}${c(hd,'│')}      ${c(hd,'│')}${c(f,'░░░░░')}  ${c(vl,'│')}
${c(vl,'        ╲')}  ${c(f,'░░░░')}${c(hd,'└──────┘')}${c(f,'░░░░░░░░░░░░░░░')}${c(hd,'└──────┘')}${c(f,'░░░░')}  ${c(vl,'╱')}
${c(vl,'          ╲')}  ${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}  ${c(vl,'╱')}
${c(vl,'            ╲')}  ${c(f,'░░░░░░░░░░░░░░░░')} ${c(s1,'·')} ${c(f,'░░░░░░░░░░░░░░░░')}  ${c(vl,'╱')}
${c(vl,'              ╲')}${c(f,'─────────────────────────────────────')}${c(vl,'╱')}</pre>`;
}

/**
 * 2. The Orange Blink — ON state.
 *    A single point of orange light radiating in the void.
 *    Concentric glow rings using shade characters.
 */
export function artOrangeBlinkOn() {
  const v = 'void', ed = 'ember-dk', em = 'ember-med';
  const e = 'ember', gs = 'glow-soft', g = 'glow', gb = 'glow-brt', p = 'pulse';
  // W=38: all non-empty lines padded to 38
  return `<pre class="art">

                                ${c(ed,'░     ')}
                            ${c(ed,'░░░░░░░░░ ')}
                          ${c(ed,'░░')}${c(em,'░░░░░░░')}${c(ed,'░░ ')}
                        ${c(ed,'░░')}${c(em,'░░')}${c(e,'░░░░░')}${c(em,'░░')}${c(ed,'░░ ')}
                       ${c(ed,'░')}${c(em,'░░')}${c(e,'░░')}${c(gs,'░▒▒▒░')}${c(e,'░░')}${c(em,'░░')}${c(ed,'░')}
                       ${c(ed,'░')}${c(em,'░')}${c(e,'░░')}${c(gs,'▒▒')}${c(g,'▒▓▒')}${c(gs,'▒▒')}${c(e,'░░')}${c(em,'░')}${c(ed,'░')}
                       ${c(ed,'░')}${c(em,'░')}${c(e,'░░')}${c(gs,'▒')}${c(g,'▒▓')}${c(gb,'█')}${c(g,'▓▒')}${c(gs,'▒')}${c(e,'░░')}${c(em,'░')}${c(ed,'░')}
                       ${c(ed,'░')}${c(em,'░')}${c(e,'░░')}${c(gs,'▒')}${c(g,'▒▓')}${c(p,'●')}${c(g,'▓▒')}${c(gs,'▒')}${c(e,'░░')}${c(em,'░')}${c(ed,'░')}
                       ${c(ed,'░')}${c(em,'░')}${c(e,'░░')}${c(gs,'▒')}${c(g,'▒▓')}${c(gb,'█')}${c(g,'▓▒')}${c(gs,'▒')}${c(e,'░░')}${c(em,'░')}${c(ed,'░')}
                       ${c(ed,'░')}${c(em,'░')}${c(e,'░░')}${c(gs,'▒▒')}${c(g,'▒▓▒')}${c(gs,'▒▒')}${c(e,'░░')}${c(em,'░')}${c(ed,'░')}
                       ${c(ed,'░')}${c(em,'░░')}${c(e,'░░')}${c(gs,'░▒▒▒░')}${c(e,'░░')}${c(em,'░░')}${c(ed,'░')}
                        ${c(ed,'░░')}${c(em,'░░')}${c(e,'░░░░░')}${c(em,'░░')}${c(ed,'░░ ')}
                          ${c(ed,'░░')}${c(em,'░░░░░░░')}${c(ed,'░░ ')}
                            ${c(ed,'░░░░░░░░░ ')}
                                ${c(ed,'░     ')}

</pre>`;
}

/**
 * 2. The Orange Blink — OFF state.
 *    Same dimensions as ON. Nearly invisible ember.
 */
export function artOrangeBlinkOff() {
  const ed = 'ember-dk', em = 'ember-med';
  // W=38: all non-empty lines padded to 38 (must match artOrangeBlinkOn)
  return `<pre class="art">




                              ${c(ed,'░░░     ')}
                             ${c(ed,'░')}${c(em,'░░░')}${c(ed,'░    ')}
                            ${c(ed,'░')}${c(em,'░░░░░')}${c(ed,'░   ')}

                             ${c(em,'░░')}${c('ember','·')}${c(em,'░░    ')}

                            ${c(ed,'░')}${c(em,'░░░░░')}${c(ed,'░   ')}
                             ${c(ed,'░')}${c(em,'░░░')}${c(ed,'░    ')}
                              ${c(ed,'░░░     ')}




</pre>`;
}

/**
 * 3. The Corridor (dark) — zero-g debris, cables, floating wreckage.
 *    One-point perspective with detailed wall panels and debris.
 */
export function artCorridorDark() {
  const f = 'faint', h = 'hull', hd = 'hull-dk';
  const hm = 'hull-med', d = 'dim';
  const wd = 'wire-dk', wr = 'wire';
  const s1 = 'star-1';
  // W=60: ║ + 58 interior + ║
  // Interior: ░░(2) + panel(6) + fill(42) + panel(6) + ░░(2) = 58
  return `<pre class="art">${c(hd,'╔══════════════════════════════════════════════════════════╗')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'┬────┬')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'┬────┬')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')} ${c(hm,'▓▓')} ${c(hd,'│')}${c(f,'░░░░░')}${c(h,'▬')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')} ${c(hm,'▓▓')} ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░░░░░░░░')}${c(hm,'▫')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'├────┤')}${c(f,'░░░░░░░░░░░░░░░░░░░')}${c(hm,'▫')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'├────┤')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░░░░')}${c(h,'─────────────────')}${c(f,'░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}${c(wd,'░░░░')}${c(hd,'│')}${c(f,'░░░░░')}${c(d,'cable')}${c(f,'░░░░░░░░░░░░')}${c(hm,'▪')}${c(f,'░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}${c(wr,'░░')}${c(wd,'░░')}${c(hd,'│')}${c(f,'░░░░░░░░░░')}${c(h,'──────────────────')}${c(f,'░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}${c(wd,'░░░░')}${c(hd,'│')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'├────┤')}${c(f,'░░░')}${c(s1,'◦')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'├────┤')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░░░░░░░░░░░░')}${c(h,'▬')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')} ${c(hm,'▓▓')} ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')} ${c(hm,'▓▓')} ${c(hd,'│')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░░░░░░░░░░░░░░░░')}${c(s1,'·')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░░░░░')}${c(hm,'┌──┐')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'├────┤')}${c(f,'░░░░░░')}${c(hm,'│')}${c(h,'▒▒')}${c(hm,'│')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'├────┤')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░░░░░')}${c(hm,'└──┘')}${c(f,'░░░░░░░░░')}${c(h,'▬')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░')}${c(s1,'·')}${c(f,'░░░░░░░░░░░░░░░░░')}${c(hd,'│')}    ${c(hd,'│')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'║')}${c(f,'░░')}${c(hd,'┴────┴')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(hd,'┴────┴')}${c(f,'░░')}${c(hd,'║')}
${c(hd,'╚══════════════════════════════════════════════════════════╝')}</pre>`;
}

/**
 * 4. The Console — dead instruments, one blinking button.
 *    Detailed control panel with screens, switches, and gauges.
 */
export function artConsoleDark() {
  const v = 'void', d = 'dark', h = 'hull', hd = 'hull-dk';
  const f = 'faint', gb = 'glow-brt', p = 'pulse';
  // W=45: ║ + 43 interior + ║
  // Screens: sp(1) + screen(19) + gap(3) + screen(19) + sp(1) = 43
  return `<pre class="art">${c(hd,'╔═══════════════════════════════════════════╗')}
${c(hd,'║')} ${c(d,'┌─────────────────┐')}   ${c(d,'┌─────────────────┐')} ${c(hd,'║')}
${c(hd,'║')} ${c(d,'│')}${c(v,'░░░░░░░░░░░░░░░░░')}${c(d,'│')}   ${c(d,'│')}${c(v,'░░░░░░░░░░░░░░░░░')}${c(d,'│')} ${c(hd,'║')}
${c(hd,'║')} ${c(d,'│')}${c(v,'░░░░░░░░░░░░░░░░░')}${c(d,'│')}   ${c(d,'│')}${c(v,'░░░░░░░░░░░░░░░░░')}${c(d,'│')} ${c(hd,'║')}
${c(hd,'║')} ${c(d,'│')}${c(v,'░░░░░░░░░░░░░░░░░')}${c(d,'│')}   ${c(d,'│')}${c(v,'░░░░░░░░░░░░░░░░░')}${c(d,'│')} ${c(hd,'║')}
${c(hd,'║')} ${c(d,'│')}${c(v,'░░░░░░░░░░░░░░░░░')}${c(d,'│')}   ${c(d,'│')}${c(v,'░░░░░░░░░░░░░░░░░')}${c(d,'│')} ${c(hd,'║')}
${c(hd,'║')} ${c(d,'└─────────────────┘')}   ${c(d,'└─────────────────┘')} ${c(hd,'║')}
${c(hd,'║')}${c(h,'═══════════════════════════════════════════')}${c(hd,'║')}
${c(hd,'║')}  ${c(v,'▫')} ${c(v,'▫')} ${c(v,'▫')}   ${c(v,'▫')} ${c(v,'▫')}             ${c(v,'▫')} ${c(v,'▫')}   ${c(v,'▫')} ${c(v,'▫')} ${c(v,'▫')}      ${c(hd,'║')}
${c(hd,'║')}  ${c(v,'▫')} ${c(v,'▫')}         ${c(v,'▫')}               ${c(v,'▫')}       ${c(v,'▫')} ${c(v,'▫')}  ${c(hd,'║')}
${c(hd,'║')}       ${c(v,'▫')} ${c(v,'▫')}       ${c(gb,'╔═══╗')}       ${c(v,'▫')} ${c(v,'▫')}           ${c(hd,'║')}
${c(hd,'║')}  ${c(v,'▫')}               ${c(gb,'║')} ${c(p,'●')} ${c(gb,'║')}               ${c(v,'▫')}    ${c(hd,'║')}
${c(hd,'║')}       ${c(v,'▫')} ${c(v,'▫')}       ${c(gb,'╚═══╝')}       ${c(v,'▫')} ${c(v,'▫')}           ${c(hd,'║')}
${c(hd,'║')}  ${c(v,'▫')} ${c(v,'▫')}         ${c(v,'▫')}               ${c(v,'▫')}       ${c(v,'▫')} ${c(v,'▫')}  ${c(hd,'║')}
${c(hd,'║')}  ${c(v,'▫')} ${c(v,'▫')} ${c(v,'▫')}   ${c(v,'▫')} ${c(v,'▫')}             ${c(v,'▫')} ${c(v,'▫')}   ${c(v,'▫')} ${c(v,'▫')} ${c(v,'▫')}      ${c(hd,'║')}
${c(hd,'╠═══════════════════════════════════════════╣')}
${c(hd,'║')}${c(f,' ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ')}${c(hd,'║')}
${c(hd,'║')}${c(f,' ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ╱ ')}${c(hd,'║')}
${c(hd,'╚═══════════════════════════════════════════╝')}</pre>`;
}

/**
 * 5. The Debris Field — objects tumbling past during zero-g nav.
 *    Detailed floating wreckage with depth through shading.
 */
export function artDebrisField() {
  const f = 'faint', h = 'hull', hd = 'hull-dk', hm = 'hull-med', hb = 'hull-brt';
  const v = 'void', vl = 'void-lt', d = 'dim';
  const s1 = 'star-1', s2 = 'star-2';
  // W=59: all non-empty lines padded to 59
  return `<pre class="art">
   ${c(hm,'▬')}        ${c(s1,'·')}                              ${c(s1,'·               ')}
                  ${c(hm,'╱▔╲')}                ${c(hd,'▫                     ')}
        ${c(h,'╱▔▔▔╲')}  ${c(hm,'╱  ╱')}  ${c(h,'───────cable──────────')}    ${c(s2,'·           ')}
        ${c(h,'│')}${c(hd,'░░░')}${c(h,'│')}  ${c(hm,'╲╱')}                                ${c(hm,'▬         ')}
  ${c(hm,'▪')}   ${c(h,'╲▁▁▁╱')}               ${c(s1,'◦                                ')}
                                    ${c(h,'┌────┐                 ')}
              ${c(s1,'·')}                  ${c(h,'│')}${c(hd,'▒▒▒▒')}${c(h,'│')}       ${c(s2,'·            ')}
                           ${c(hm,'╱╲')}    ${c(h,'│')}${c(hd,'▒▒▒▒')}${c(h,'│                    ')}
   ${c(h,'·')}            ${c(hm,'▬')}       ${c(hm,'╱  ╲')}   ${c(h,'└────┘                      ')}
                                    ${c(hm,'╲╱                     ')}
        ${c(s1,'·')}                                       ${c(s1,'·          ')}
                         ${c(hm,'▫')}              ${c(hd,'▬                  ')}
   ${c(h,'─────cable────')}                ${c(s2,'·                         ')}
              ${c(hm,'▪')}       ${c(s1,'·')}                    ${c(hm,'▫               ')}
                                                          ${c(s1,'·')}
</pre>`;
}

/**
 * 6. The Button Press — emergency power activation.
 *    Energy burst radiating outward from the pressed button.
 */
export function artButtonPress() {
  const v = 'void', ed = 'ember-dk', em = 'ember-med', e = 'ember';
  const gs = 'glow-soft', g = 'glow', gb = 'glow-brt', p = 'pulse';
  const sk = 'spark';
  // W=46: all non-empty lines padded to 46
  return `<pre class="art">
                        ${c(sk,'·')}                    ${c(sk,'·')}

                            ${c(ed,'░░░░░░░░░         ')}
                     ${c(sk,'·')} ${c(ed,'░░')}${c(em,'░░░░░░░░░')}${c(ed,'░░          ')}
                        ${c(em,'░░')}${c(e,'░░░░░░░░░')}${c(em,'░░         ')}
              ${c(sk,'·')}       ${c(em,'░')}${c(e,'░░')}${c(gs,'░░░░░░░')}${c(e,'░░')}${c(em,'░           ')}
                       ${c(e,'░░')}${c(gs,'░░')}${c(g,'▒▒▒▒▒')}${c(gs,'░░')}${c(e,'░░          ')}
                       ${c(e,'░░')}${c(gs,'░')}${c(g,'▒▒')}${c(gb,'▓███▓')}${c(g,'▒▒')}${c(gs,'░')}${c(e,'░░')}       ${c(sk,'·')}
                       ${c(e,'░░')}${c(gs,'░')}${c(g,'▒')}${c(gb,'▓██')}${c(p,'█')}${c(gb,'██▓')}${c(g,'▒')}${c(gs,'░')}${c(e,'░░        ')}
                       ${c(e,'░░')}${c(gs,'░')}${c(g,'▒▒')}${c(gb,'▓███▓')}${c(g,'▒▒')}${c(gs,'░')}${c(e,'░░        ')}
                       ${c(e,'░░')}${c(gs,'░░')}${c(g,'▒▒▒▒▒')}${c(gs,'░░')}${c(e,'░░          ')}
              ${c(sk,'·')}       ${c(em,'░')}${c(e,'░░')}${c(gs,'░░░░░░░')}${c(e,'░░')}${c(em,'░           ')}
                        ${c(em,'░░')}${c(e,'░░░░░░░░░')}${c(em,'░░')}       ${c(sk,'· ')}
                     ${c(sk,'·')} ${c(ed,'░░')}${c(em,'░░░░░░░░░')}${c(ed,'░░          ')}
                            ${c(ed,'░░░░░░░░░         ')}

                        ${c(sk,'·')}                    ${c(sk,'·')}
</pre>`;
}

/**
 * 7. Emergency Corridor — red-lit ship interior.
 *    Dramatic red emergency lighting with damaged walls and debris.
 */
export function artEmergencyCorridor() {
  const rg = 'red-glow', r = 'red';
  const rm = 'red-med', rd = 'red-dk', b = 'blood';
  const hm = 'hull-med', d = 'dim';
  const wr = 'wire', wd = 'wire-dk';
  // W=60: ║ + 58 interior + ║. Top/bottom bars also 60.
  // Interior: ░░(2) + panel(6) + fill(42) + panel(6) + ░░(2) = 58
  return `<pre class="art">${c(rg,'▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄')}
${c(b,'╔══════════════════════════════════════════════════════════╗')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'┬────┬')}${c(rd,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(rm,'┬────┬')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'│')}${c(r,'░░░░')}${c(rm,'│')}${c(rd,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(rm,'│')}${c(r,'░░░░')}${c(rm,'│')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'│')}${c(r,'░░░░')}${c(rm,'│')}${c(rd,'░░░░░░')}${c(hm,'▬')}${c(rd,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(rm,'│')}${c(r,'░░░░')}${c(rm,'│')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'│')}    ${c(rm,'│')}${c(rd,'░░░░░░░░░░')}${c(d,'floating')}${c(rd,'░░░░░░░░░░░░░░░░░')}${c(hm,'╱╲')}${c(rd,'░░░░░')}${c(rm,'│')}    ${c(rm,'│')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'├────┤')}${c(rd,'░░░░░░░░░░░░')}${c(d,'debris')}${c(rd,'░░░░░░░░░░░░░░░░░')}${c(hm,'╱  ╲')}${c(rd,'░░░')}${c(rm,'├────┤')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'│')}${c(wr,'░░')}${c(wd,'░░')}${c(rm,'│')}${c(rd,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(rm,'│')}    ${c(rm,'│')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'│')}${c(wd,'░░░░')}${c(rm,'│')}${c(rd,'░░░░░')}${c(hm,'◇')}${c(rd,'░░░░░░░░░░')}${c(hm,'▬')}${c(rd,'░░░░░░░░░░░░░░░')}${c(hm,'▫')}${c(rd,'░░')}${c(hm,'·')}${c(rd,'░░░░░░')}${c(rm,'│')} ${c(r,'▓▓')} ${c(rm,'│')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'│')}${c(wr,'░░')}${c(wd,'░░')}${c(rm,'│')}${c(rd,'░░')}${c(d,'cracked')}${c(rd,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(rm,'│')}    ${c(rm,'│')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'├────┤')}${c(rd,'░░')}${c(d,'display')}${c(rd,'░░░')}${c(hm,'▪')}${c(rd,'░░░░░░░░░░░░░░░░')}${c(hm,'▬')}${c(rd,'░░░░░░░░░░░░')}${c(rm,'├────┤')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'│')}    ${c(rm,'│')}${c(rd,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(rm,'│')}    ${c(rm,'│')}${c(rd,'░░')}${c(b,'║')}
${c(b,'║')}${c(rd,'░░')}${c(rm,'┴────┴')}${c(rd,'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(rm,'┴────┴')}${c(rd,'░░')}${c(b,'║')}
${c(b,'╚══════════════════════════════════════════════════════════╝')}
${c(rg,'▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀')}</pre>`;
}

/**
 * 8. DENT enters through doorway — damaged companion drone.
 *    Detailed robot with asymmetric optics, broken arm, hull damage.
 */
export function artDentEnters() {
  const h = 'hull', hd = 'hull-dk', hm = 'hull-med';
  const w = 'white', bl = 'blue', o = 'orange', a = 'amber';
  const dm = 'dim', rd = 'red-dk', sk = 'spark', f = 'faint';
  // W=55: │ + 26 interior + │ = 28, + 8sp gap + annotation (padded to 55)
  // Robot boxes: 10 wide, at position 8 in 26-char interior
  // P=27 trailing spaces for frame-only lines (28→55)
  const P = '                           ';
  return `<pre class="art">${c(h,'┌──────────────────────────┐')}${P}
${c(h,'│')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'╭────────╮')}${c(f,'░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'│')} ${c(w,'◉')}    ${c(rd,'◦')} ${c(hd,'│')}${c(f,'░░░░░░░░')}${c(h,'│')}        ${c(dm,'optics [L:OK R:dmg]')}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'│')}  ${c(dm,'╱──╲')}  ${c(hd,'│')}${c(f,'░░░░░░░░')}${c(h,'│')}        ${c(dm,'facial plate       ')}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'╰──┬──┬──╯')}${c(f,'░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░░░░')}${c(hd,'│')}  ${c(hd,'│')}${c(f,'░░░░░░░░░░░')}${c(h,'│')}        ${c(dm,'neck joint         ')}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'╔══╧══╧══╗')}${c(f,'░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'║')} ${c(hm,'▓▓▓▓▓▓')} ${c(hd,'║')}${c(f,'░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░')}${c(bl,'══════')}${c(hd,'║')}${c(o,'D.E.N.T ')}${c(hd,'║')}${c(a,'▒▒')}${c(f,'░░░░░░')}${c(h,'│')}        ${c(dm,'R arm grips frame  ')}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'║')} ${c(hm,'╱────╲')} ${c(hd,'║')}${c(f,'░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'╚══╣')} ${c(o,'NT')} ${c(hd,'╠═')}${c(a,'──')}${c(sk,'*')}${c(f,'░░░░░')}${c(h,'│')}        ${c(dm,'L arm severed      ')}
${c(h,'│')}${c(f,'░░░░░░░░░░')}${c(hd,'║')} ${c(hm,'▓▓')} ${c(hd,'║')}${c(f,'░░░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░░░')}${c(hd,'║')}${c(dm,'╱╲╱╲')}${c(hd,'║')}${c(f,'░░░░░░░░░░')}${c(h,'│')}        ${c(dm,'damage marks       ')}
${c(h,'│')}${c(f,'░░░░░░░░░░')}${c(hd,'║')}    ${c(hd,'║')}${c(f,'░░░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░░')}${c(hd,'╱╱')}    ${c(hd,'╲╲')}${c(f,'░░░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░')}${c(hd,'╱╱')}      ${c(hd,'╲╲')}${c(f,'░░░░░░░░')}${c(h,'│')}        ${c(dm,'stabilizer legs    ')}
${c(h,'│')}${c(f,'░░░░░░░')}${c(hd,'▪▪')}        ${c(hd,'▪▪')}${c(f,'░░░░░░░')}${c(h,'│')}${P}
${c(h,'│')}${c(f,'░░░░░░░░░░░░░░░░░░░░░░░░░░')}${c(h,'│')}${P}
${c(h,'└──────────────────────────┘')}${P}</pre>`;
}

/**
 * Damaged system panel — shown during emergency boot.
 *    Enhanced readout with frame, status bars, and severity indicators.
 */
export function artDamagedSystems() {
  const h = 'hull', hd = 'hull-dk';
  const r = 'red', rb = 'red-bright', rd = 'red-dk';
  const d = 'dim', y = 'yellow';
  // W=48: ║ + 46 interior + ║
  // Label section: 22 chars, Bar+Status section: 24 chars = 46
  return `<pre class="art">${c(hd,'╔══════════════════════════════════════════════╗')}
${c(hd,'║')} ${c(h,'SYSTEMS STATUS')}                     ${c(r,'▌ ERROR ▐')} ${c(hd,'║')}
${c(hd,'╠══════════════════════════════════════════════╣')}
${c(hd,'║')}  ${c(d,'Memory ............')} ${c(r,'██████████')} ${c(r,'CORRUPTED')}    ${c(hd,'║')}
${c(hd,'║')}  ${c(d,'Sensors ...........')} ${c(rd,'░░░░░░░░░░')} ${c(d,'OFFLINE')}      ${c(hd,'║')}
${c(hd,'║')}  ${c(d,'Null Core .........')} ${c(rd,'░░░░░░░░░░')} ${c(d,'OFFLINE')}      ${c(hd,'║')}
${c(hd,'║')}  ${c(d,'Fold Drive ........')} ${c(rd,'░░░░░░░░░░')} ${c(d,'OFFLINE')}      ${c(hd,'║')}
${c(hd,'║')}  ${c(d,'Life Support ......')} ${c(rb,'█')}${c(rd,'░░░░░░░░░')} ${c(rb,'CRITICAL 11%')} ${c(hd,'║')}
${c(hd,'║')}  ${c(d,'Gravity Drive .....')} ${c(rd,'░░░░░░░░░░')} ${c(r,'OFFLINE')}      ${c(hd,'║')}
${c(hd,'║')}  ${c(d,'D.E.N.T. ..........')} ${c(y,'███')}${c(rd,'░░░░░░░')} ${c(y,'REBOOTING...')} ${c(hd,'║')}
${c(hd,'╚══════════════════════════════════════════════╝')}</pre>`;
}

/**
 * Boot complete banner — systems overview after emergency power.
 *    Enhanced with gradient borders and status grid.
 */
export function artBootComplete() {
  const o = 'orange', gs = 'glow-soft', g = 'glow', gb = 'glow-brt';
  const w = 'white', d = 'dim', h = 'hull', hd = 'hull-dk';
  const gn = 'green', y = 'yellow', r = 'red', rd = 'red-dk';
  // W=59: all non-empty lines padded to 59
  return `<pre class="art">${c(gs,'░')}${c(g,'░')}${c(o,'═══════════════════════════════════════════════════════')}${c(g,'░')}${c(gs,'░')}

    <span class="c-white bold">E C H O E S   B E Y O N D   I N F I N I T Y            </span>

    ${c(d,'Cycle N   //   Agent: VIN   //   Ship: THE VEX         ')}

${c(hd,'   ┌────────────────────────────────────────────────┐      ')}
${c(hd,'   │')}  ${c(gn,'■')} ${c(d,'Emergency Power')}  ${c(gn,'■')} ${c(d,'Life Support')}    ${c(y,'■')} ${c(d,'DENT 30%')}    ${c(hd,'│ ')}
${c(hd,'   │')}  ${c(r,'□')} ${c(d,'Sensors')}          ${c(r,'□')} ${c(d,'Fold Drive')}      ${c(r,'□')} ${c(d,'Gravity    ')}${c(hd,'│  ')}
${c(hd,'   │')}  ${c(r,'□')} ${c(d,'Null Core')}        ${c(r,'□')} ${c(d,'Navigation')}      ${c(r,'□')} ${c(d,'Comms      ')}${c(hd,'│  ')}
${c(hd,'   └────────────────────────────────────────────────┘      ')}

${c(gs,'░')}${c(g,'░')}${c(o,'═══════════════════════════════════════════════════════')}${c(g,'░')}${c(gs,'░')}</pre>`;
}
