import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const html = readFileSync('index.html', 'utf8');
assert.match(html, /<!doctype html>/i);
const match = html.match(/<script>([\s\S]*?)<\/script>/i);
assert.ok(match, 'inline application script exists');
new Script(match[1], { filename: 'inline-dashboard.js' });
for (const id of ['langEN','langEL','cosmosSVG','ratioCards','traditionCards','stages','claimList','noun','relation','object','addClaim','export','importFile','clear']) {
  assert.ok(html.includes('id="' + id + '"'), 'required control: ' + id);
}
for (const link of ['HARMONIC_COSMOS.md','HISTORICAL_ATLAS.md','GreekFoundations.lean','MusicOfTheSpheres.lean','EFMW_PROTOCOL.md']) {
  // Some files are referenced through linked documents rather than directly.
  const linked = html.includes(link) || readFileSync('README.md','utf8').includes(link);
  assert.ok(linked, 'artifact discoverable: ' + link);
}
assert.match(match[1], /music-of-the-spheres-v1/);
assert.match(match[1], /localStorage/);
assert.match(match[1], /AudioContext/);
console.log('PASS: standalone HTML contains necessary controls, parses as JS and links the research artifacts.');
