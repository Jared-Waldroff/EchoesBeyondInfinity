import * as m from './js/art/prologue-art.js';

const fns = ['artEmergencyCorridor','artDamagedSystems','artDentEnters','artCorridorDark','artConsoleDark','artVoidShapes','artOrangeBlinkOn','artOrangeBlinkOff','artButtonPress','artBootComplete','artVoid','artDebrisField'];

for (const name of fns) {
  const html = m[name]();
  const text = html.replace(/<[^>]*>/g, '');
  const lines = text.split('\n');
  const widths = lines.map(l => l.length);
  const nonEmpty = widths.filter(w => w > 0);
  const unique = [...new Set(nonEmpty)];
  const max = Math.max(...nonEmpty);

  if (unique.length > 3) {
    console.log(`\n${name}: MISALIGNED — ${unique.length} different widths`);
    lines.forEach((l, i) => {
      if (l.length > 0) {
        const flag = l.length < max ? ' <<<' : '';
        console.log(`  L${String(i).padStart(2)}: w=${String(l.length).padStart(3)}${flag}  |${l}|`);
      }
    });
  } else if (unique.length > 1) {
    console.log(`\n${name}: MIXED widths: ${unique.sort((a,b)=>a-b).join(', ')}`);
    lines.forEach((l, i) => {
      if (l.length > 0) {
        const flag = l.length < max ? ' <<<' : '';
        console.log(`  L${String(i).padStart(2)}: w=${String(l.length).padStart(3)}${flag}`);
      }
    });
  } else {
    console.log(`${name}: OK — width ${unique[0] || 0}, ${nonEmpty.length} lines`);
  }
}
