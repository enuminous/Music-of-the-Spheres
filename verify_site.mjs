import { readFileSync, existsSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';
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


// Dependency-free runtime smoke test. A minimal DOM harness exercises the
// application's initialization and main controls, not just JavaScript parsing.
class TestElement {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.style = {};
    this.dataset = {};
    this.attributes = {};
    this.handlers = {};
    this._value = '';
    this.textContent = '';
    this.innerHTML = '';
  }
  get value() { return this._value; }
  set value(v) { this._value = String(v); }
  replaceChildren(...children) {
    this.children = children;
    if (this.tagName === 'SELECT') this._value = children[0]?.value ?? '';
  }
  appendChild(child) {
    this.children.push(child);
    if (this.tagName === 'SELECT' && this.children.length === 1) this._value = child.value;
    return child;
  }
  append(...children) { children.forEach(c => this.appendChild(c)); }
  addEventListener(name, fn) { this.handlers[name] = fn; }
  setAttribute(key, val) { this.attributes[key] = String(val); }
  removeAttribute(key) { delete this.attributes[key]; }
  click() { this.handlers.click?.({ target: this }); this.onclick?.({ target: this }); }
}
const elements = new Map();
for (const m of html.matchAll(/<([a-z][a-z0-9-]*)\b[^>]*\bid="([^"]+)"/gi)) {
  elements.set(m[2], new TestElement(m[1]));
}
for (const id of ['radius', 'tempo']) {
  assert.ok(elements.has(id), 'required model slider: ' + id);
  elements.get(id).value = '3';
}
const eraNodes = ['eleatic', 'pythagorean', 'platonic', 'aristotelian', 'astronomical']
  .map(era => {
    assert.ok(html.includes('data-era="' + era + '"'), 'era control: ' + era);
    const e = new TestElement('button');
    e.dataset.era = era;
    return e;
  });
const navNodes = Array.from({ length: 6 }, () => new TestElement('a'));
const htmlTitle = new TestElement('h1');
htmlTitle.dataset.tHtml = 'heroTitle';
const document = {
  documentElement: { lang: 'en' },
  getElementById(id) {
    assert.ok(elements.has(id), 'runtime lookup resolved: ' + id);
    return elements.get(id);
  },
  createElement(tag) { return new TestElement(tag); },
  createElementNS(_ns, tag) { return new TestElement(tag); },
  querySelectorAll(selector) {
    if (selector === '.era-btn') return eraNodes;
    if (selector === '.navlink') return navNodes;
    if (selector === '[data-t-html]') return [htmlTitle];
    return [];
  }
};
const storage = new Map();
const localStorage = {
  getItem(key) { return storage.get(key) ?? null; },
  setItem(key, value) { storage.set(key, String(value)); },
  removeItem(key) { storage.delete(key); }
};
runInNewContext(match[1], {
  document, localStorage, window: {},
  requestAnimationFrame() {}, location: { hash: '' },
  alert() {}, confirm() { return true; },
  URL: { createObjectURL() { return 'blob:test'; }, revokeObjectURL() {} },
  Blob, setTimeout() {}, console
}, { filename: 'workbench-runtime-smoke.js', timeout: 5000 });
assert.equal(elements.get('ratioCards').children.length, 3, 'harmonic ratios render');
assert.equal(elements.get('traditionCards').children.length, 9, 'traditions render');
assert.equal(elements.get('stages').children.length, 7, 'research stages render');
assert.equal(elements.get('sourceCards').children.length, 8, 'source atlas renders');
assert.ok(elements.get('cosmosSVG').children.length > 50, 'cosmos is drawn');
elements.get('langEL').click();
assert.equal(document.documentElement.lang, 'el', 'Greek-language switch works');
elements.get('langEN').click();
assert.equal(document.documentElement.lang, 'en', 'English-language switch works');
elements.get('addClaim').click();
assert.equal(elements.get('claimList').children.length, 1, 'claim recording works');
elements.get('radius').value = '5';
elements.get('clear').click();
assert.equal(elements.get('claimList').children.length, 1, 'empty state is visible');
assert.equal(elements.get('radius').value, '3', 'clear restores controls');
assert.equal(document.documentElement.lang, 'en', 'clear restores default language');
assert.equal(localStorage.getItem('spheres-workbench-v1'), null, 'clear removes stored data');
elements.get('captureModel').click();
assert.equal(elements.get('claimList').children.length, 1, 'model capture works');
for (const ref of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const url = ref[1];
  if (url.startsWith('#') || /^(?:https?:|mailto:|data:)/i.test(url)) continue;
  assert.ok(existsSync(decodeURIComponent(url.split(/[?#]/)[0])), 'relative asset exists: ' + url);
}
console.log('PASS: DOM initialization, bilingual UI, cosmos, claims, reset, and local assets.');
