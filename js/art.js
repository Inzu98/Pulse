// Pulse line-art library. 120x120 grid, 3px round strokes.
// class "f" = the one splash of partner color, drawn first so lines sit on top.
// class "d" = small solid dots in the line color.
// Routines pick one of these keys for every story; unknown keys fall back to "newspaper".
const ART = {
  // World, politics, economy
  globe: '<circle class="f" cx="87" cy="33" r="11"/><circle cx="60" cy="60" r="38"/><ellipse cx="60" cy="60" rx="16" ry="38"/><path d="M22 60h76M27 41h66M27 79h66"/>',
  ballot: '<circle class="f" cx="60" cy="42" r="20"/><rect x="26" y="60" width="68" height="34" rx="4"/><path d="M42 60h36"/><path d="M46 70V24h28v46"/><path d="M53 44l5 5 10-11"/>',
  chartUp: '<circle class="f" cx="86" cy="32" r="10"/><path d="M24 96h72M24 96V24"/><path d="M32 82l18-20 14 10 24-30"/><path d="M76 42h12v12"/>',
  chartDown: '<circle class="f" cx="86" cy="86" r="10"/><path d="M24 96h72M24 96V24"/><path d="M32 40l18 20 14-10 24 30"/><path d="M76 80h12V68"/>',
  coin: '<circle class="f" cx="44" cy="44" r="20"/><ellipse cx="60" cy="40" rx="28" ry="10"/><path d="M32 40v40c0 5.5 12.5 10 28 10s28-4.5 28-10V40"/><path d="M32 60c0 5.5 12.5 10 28 10s28-4.5 28-10"/>',
  court: '<rect class="f" x="30" y="84" width="60" height="8" rx="2"/><path d="M22 96h76"/><path d="M28 46L60 24l32 22z"/><path d="M38 54v28M53 54v28M67 54v28M82 54v28"/>',
  scale: '<circle class="f" cx="28" cy="68" r="12"/><path d="M60 26v68M40 96h40M28 40h64"/><path d="M28 40L16 68h24zM92 40L80 68h24z"/><circle class="d" cx="60" cy="26" r="4"/>',
  shield: '<circle class="f" cx="60" cy="62" r="16"/><path d="M60 22l30 10v24c0 20-13 34-30 42-17-8-30-22-30-42V32z"/><path d="M50 60l7 7 14-15"/>',
  rings: '<circle class="f" cx="60" cy="60" r="10"/><circle cx="46" cy="60" r="22"/><circle cx="74" cy="60" r="22"/>',
  flag: '<rect class="f" x="40" y="30" width="22" height="18"/><path d="M36 100V22"/><path d="M36 26c14-8 26 8 48 0v34c-22 8-34-8-48 0"/>',
  megaphone: '<circle class="f" cx="92" cy="58" r="9"/><path d="M26 50v20h12l34 18V32L38 50z"/><path d="M38 70l6 22h10l-4-20"/>',
  city: '<rect class="f" x="54" y="40" width="12" height="12"/><path d="M18 96h84"/><path d="M28 96V50h22v46M50 96V30h24v66M74 96V62h18v34"/>',
  pin: '<circle class="f" cx="60" cy="48" r="9"/><path d="M60 100S32 70 32 48a28 28 0 0 1 56 0c0 22-28 52-28 52z"/>',
  plane: '<circle class="f" cx="38" cy="82" r="14"/><path d="M20 66l78-36-30 66-12-26z"/><path d="M56 70l42-40"/>',
  ship: '<rect class="f" x="42" y="48" width="16" height="16"/><path d="M18 76h84l-12 18H30z"/><path d="M36 76V48h48v28M60 48V30"/>',
  bolt: '<circle class="f" cx="60" cy="60" r="30"/><path d="M66 18L36 66h24l-6 36 30-48H60z"/>',
  drop: '<circle class="f" cx="60" cy="74" r="14"/><path d="M60 18C46 40 34 56 34 72a26 26 0 0 0 52 0c0-16-12-32-26-54z"/>',
  leaf: '<circle class="f" cx="76" cy="44" r="16"/><path d="M28 92C28 52 52 28 92 28c0 40-24 64-64 64z"/><path d="M28 92l40-40"/>',
  wave: '<circle class="f" cx="82" cy="36" r="12"/><path d="M14 64c8-8 16-8 24 0s16 8 24 0 16-8 24 0 16 8 24 0"/><path d="M14 84c8-8 16-8 24 0s16 8 24 0 16-8 24 0 16 8 24 0"/>',
  pulse: '<circle class="f" cx="60" cy="60" r="26"/><path d="M14 62h22l8-18 12 36 10-28 6 10h34"/>',
  rocket: '<circle class="f" cx="60" cy="50" r="9"/><path d="M60 16c16 14 20 34 14 62H46c-6-28-2-48 14-62z"/><path d="M46 70L32 84v12l16-10M74 70l14 14v12L72 86M54 88l6 14 6-14"/>',
  newspaper: '<rect class="f" x="34" y="34" width="40" height="18" rx="1"/><path d="M24 24h62v66a8 8 0 0 0 8 8H32a8 8 0 0 1-8-8z"/><path d="M86 44h12v46a8 8 0 0 1-8 8"/><path d="M34 64h40M34 76h40M34 88h24"/>',
  calendar: '<rect class="f" x="62" y="62" width="16" height="14" rx="2"/><rect x="24" y="30" width="72" height="62" rx="6"/><path d="M24 48h72M42 22v16M78 22v16"/>',
  eye: '<circle class="f" cx="60" cy="60" r="13"/><path d="M14 60c12-20 28-30 46-30s34 10 46 30c-12 20-28 30-46 30S26 80 14 60z"/><circle cx="60" cy="60" r="13"/>',
  play: '<circle class="f" cx="60" cy="60" r="20"/><rect x="18" y="28" width="84" height="64" rx="10"/><path d="M52 46v28l22-14z"/>',
  // Gaming
  controller: '<circle class="f" cx="86" cy="52" r="11"/><path d="M34 36h52c14 0 22 10 25 28 3 18-1 32-11 32-8 0-12-10-20-18H40c-8 8-12 18-20 18-10 0-14-14-11-32 3-18 11-28 25-28z"/><path d="M31 43h6v6h6v6h-6v6h-6v-6h-6v-6h6z"/><circle cx="50" cy="68" r="5"/><circle cx="70" cy="68" r="5"/><path d="M55 50h10"/>',
  handheld: '<rect class="f" x="42" y="46" width="36" height="26" rx="2"/><rect x="14" y="36" width="92" height="48" rx="16"/><rect x="40" y="44" width="40" height="30" rx="3"/><path d="M26 54v12M20 60h12"/><circle class="d" cx="94" cy="56" r="3.5"/><circle class="d" cx="88" cy="66" r="3.5"/>',
  headset: '<rect class="f" x="32" y="46" width="56" height="26" rx="12"/><path d="M24 50c0-6 4-10 10-10h52c6 0 10 4 10 10v20c0 6-4 10-10 10H72l-6-8H54l-6 8H34c-6 0-10-4-10-10z"/><path d="M24 58H14M96 58h10"/>',
  trophy: '<circle class="f" cx="60" cy="44" r="14"/><path d="M40 24h40v20a20 20 0 0 1-40 0z"/><path d="M40 32H28c0 14 6 20 14 22M80 32h12c0 14-6 20-14 22M60 64v16M44 96h32M48 96l4-16h16l4 16"/>',
  joystick: '<circle class="f" cx="60" cy="34" r="12"/><circle cx="60" cy="34" r="12"/><path d="M60 46v28"/><rect x="28" y="74" width="64" height="20" rx="6"/><circle class="d" cx="80" cy="84" r="3.5"/>',
  pixel: '<path class="f" d="M40 40h10v10H40zM70 40h10v10H70z"/><path d="M30 40h20v10h20V40h20v10h10v20H90v10H80v10H70v10H50V90H40V80H30V70H20V50h10z"/>',
  // Reading
  book: '<rect class="f" x="42" y="36" width="32" height="10"/><path d="M32 22h52v76H38a6 6 0 0 1-6-6z"/><path d="M32 86a6 6 0 0 1 6-6h46"/>',
  openbook: '<circle class="f" cx="60" cy="38" r="11"/><path d="M60 36c-10-8-24-10-40-8v58c16-2 30 0 40 8 10-8 24-10 40-8V28c-16-2-30 0-40 8z"/><path d="M60 36v58"/>',
  bulb: '<circle class="f" cx="60" cy="48" r="14"/><path d="M46 74c-8-6-14-16-14-26a28 28 0 0 1 56 0c0 10-6 20-14 26v8H46z"/><path d="M48 92h24M52 102h16"/>',
  doc: '<rect class="f" x="42" y="40" width="24" height="16"/><path d="M34 18h36l16 16v68H34z"/><path d="M70 18v16h16M42 70h36M42 82h36M42 94h20"/>',
  magazine: '<rect class="f" x="42" y="32" width="36" height="28" rx="2"/><rect x="32" y="20" width="56" height="80" rx="4"/><path d="M42 74h36M42 86h24"/>',
  // Design
  bezier: '<circle class="f" cx="60" cy="40" r="11"/><path d="M22 40h76"/><path d="M20 94C24 22 96 22 100 94"/><rect x="14" y="88" width="12" height="12"/><rect x="94" y="88" width="12" height="12"/><circle class="d" cx="22" cy="40" r="4.5"/><circle class="d" cx="98" cy="40" r="4.5"/>',
  swatches: '<rect class="f" x="66" y="28" width="24" height="56" rx="4" transform="rotate(24 78 56)"/><rect x="26" y="24" width="26" height="72" rx="4"/><rect x="46" y="24" width="26" height="72" rx="4" transform="rotate(12 59 96)"/><circle class="d" cx="39" cy="84" r="4"/>',
  grid: '<rect class="f" x="22" y="22" width="38" height="38"/><rect x="22" y="22" width="76" height="76" rx="4"/><path d="M22 60h76M60 22v76M41 22v76M79 22v76"/>',
  brush: '<circle class="f" cx="34" cy="86" r="13"/><path d="M92 22L58 64"/><path d="M58 64c-8-4-18 0-20 10-2 8-6 12-12 14 14 6 30 2 34-10 2-6 2-10-2-14z"/>',
  frame: '<circle class="f" cx="48" cy="44" r="12"/><rect x="28" y="18" width="64" height="84" rx="3"/><path d="M28 82l20-18 16 12 10-8 18 14"/>',
  cursor: '<circle class="f" cx="78" cy="78" r="14"/><path d="M36 26l50 22-22 8-8 22z"/><path d="M64 56l22 22"/>',
  star: '<circle class="f" cx="60" cy="58" r="16"/><path d="M60 22l10 22 24 2-18 16 6 24-22-12-22 12 6-24-18-16 24-2z"/>',
  camera: '<circle class="f" cx="86" cy="50" r="6"/><rect x="20" y="38" width="80" height="54" rx="8"/><path d="M44 38l6-10h20l6 10"/><circle cx="60" cy="64" r="16"/>',
  // AI
  nodes: '<circle class="f" cx="60" cy="60" r="13"/><circle cx="60" cy="60" r="13"/><circle cx="26" cy="28" r="7"/><circle cx="94" cy="28" r="7"/><circle cx="26" cy="92" r="7"/><circle cx="94" cy="92" r="7"/><path d="M31 33l19 18M89 33L70 51M31 87l19-18M89 87L70 69"/>',
  chip: '<circle class="f" cx="60" cy="60" r="14"/><rect x="32" y="32" width="56" height="56" rx="8"/><rect x="46" y="46" width="28" height="28" rx="4"/><path d="M46 32V20M60 32V20M74 32V20M46 100V88M60 100V88M74 100V88M32 46H20M32 60H20M32 74H20M100 46H88M100 60H88M100 74H88"/>',
  spark: '<circle class="f" cx="86" cy="32" r="9"/><path d="M54 24c4 20 10 26 30 30-20 4-26 10-30 30-4-20-10-26-30-30 20-4 26-10 30-30z"/><path d="M86 72v20M76 82h20"/>',
  wand: '<circle class="f" cx="80" cy="40" r="13"/><path d="M28 92l50-50"/><path d="M70 34l16 16"/><path d="M38 28v12M32 34h12M90 72v12M84 78h12"/>',
  chat: '<rect class="f" x="62" y="62" width="30" height="10" rx="5"/><path d="M22 30h76v50H54l-18 16V80H22z"/><circle class="d" cx="44" cy="55" r="4"/><circle class="d" cx="60" cy="55" r="4"/><circle class="d" cx="76" cy="55" r="4"/>',
  robot: '<rect class="f" x="40" y="50" width="40" height="16" rx="8"/><rect x="28" y="38" width="64" height="50" rx="12"/><path d="M60 38V26M48 76h24M28 60H18M92 60h10"/><circle class="d" cx="60" cy="22" r="4"/><circle class="d" cx="48" cy="58" r="4"/><circle class="d" cx="72" cy="58" r="4"/>',
  prompt: '<rect class="f" x="58" y="64" width="24" height="6"/><rect x="18" y="26" width="84" height="68" rx="8"/><path d="M32 50l12 10-12 10"/>',
  orbit: '<circle class="f" cx="60" cy="60" r="13"/><circle cx="60" cy="60" r="13"/><ellipse cx="60" cy="60" rx="46" ry="16" transform="rotate(-25 60 60)"/><circle class="d" cx="98" cy="42" r="4"/>',
  brain: '<circle class="f" cx="50" cy="60" r="11"/><path d="M58 24C50 18 38 20 36 28 26 28 20 36 22 46 14 52 14 66 22 72 20 82 26 92 36 92 40 100 52 102 58 96c5 0 8-3 8-8V32c0-5-3-8-8-8z"/><path d="M48 40h10c4 0 8 4 8 8M48 80h10c4 0 8-4 8-8"/><path d="M66 46h12c6 0 10-4 10-10v-1M66 74h12c6 0 10 4 10 10v1M50 60h39.5"/><circle cx="88" cy="30" r="5.5"/><circle cx="95" cy="60" r="5.5"/><circle cx="88" cy="90" r="5.5"/>'
};

function art(key, extraClass = '') {
  const body = ART[key] || ART.newspaper;
  return `<svg class="art ${extraClass}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">${body}</svg>`;
}
