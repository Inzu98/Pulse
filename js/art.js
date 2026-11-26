// Pulse line-art library. 120x120 grid, 3px round strokes.
// The system: every icon has exactly ONE accent circle, <circle class="f" r="11">, always the same size,
// drawn first so the lines sit on top of it, and placed on a meaningful point of the drawing
// (a lens, a joint, a peak, a button) so it reads as part of the icon, never floating beside it.
// class "d" = small solid dots in the line color.
// Routines pick the key that literally shows the story's subject; unknown keys fall back to "newspaper".
const ART = {
  // World, politics, economy
  globe: '<circle class="f" cx="87" cy="33" r="11"/><circle cx="60" cy="60" r="38"/><ellipse cx="60" cy="60" rx="16" ry="38"/><path d="M22 60h76M27 41h66M27 79h66"/>',
  ballot: '<circle class="f" cx="60" cy="42" r="11"/><rect x="26" y="60" width="68" height="34" rx="4"/><path d="M42 60h36"/><path d="M46 70V24h28v46"/><path d="M53 43l5 5 10-11"/>',
  chartUp: '<circle class="f" cx="88" cy="40" r="11"/><path d="M24 96h72M24 96V24"/><path d="M32 82l18-20 14 10 24-32"/><path d="M76 40h12v12"/>',
  chartDown: '<circle class="f" cx="88" cy="80" r="11"/><path d="M24 96h72M24 96V24"/><path d="M32 40l18 20 14-10 24 30"/><path d="M76 80h12V68"/>',
  coin: '<circle class="f" cx="60" cy="40" r="11"/><ellipse cx="60" cy="40" rx="28" ry="10"/><path d="M32 40v40c0 5.5 12.5 10 28 10s28-4.5 28-10V40"/><path d="M32 60c0 5.5 12.5 10 28 10s28-4.5 28-10"/>',
  court: '<circle class="f" cx="60" cy="38" r="11"/><path d="M22 96h76"/><path d="M28 46L60 24l32 22z"/><path d="M38 54v34M53 54v34M67 54v34M82 54v34M30 88h60"/>',
  scale: '<circle class="f" cx="28" cy="64" r="11"/><path d="M60 26v68M40 96h40M28 40h64"/><path d="M28 40L16 68h24zM92 40L80 68h24z"/><circle class="d" cx="60" cy="26" r="4"/>',
  shield: '<circle class="f" cx="60" cy="60" r="11"/><path d="M60 22l30 10v24c0 20-13 34-30 42-17-8-30-22-30-42V32z"/><path d="M50 60l7 7 14-15"/>',
  rings: '<circle class="f" cx="60" cy="60" r="11"/><circle cx="46" cy="60" r="22"/><circle cx="74" cy="60" r="22"/>',
  flag: '<circle class="f" cx="58" cy="42" r="11"/><path d="M36 100V22"/><path d="M36 26c14-8 26 8 48 0v34c-22 8-34-8-48 0"/>',
  megaphone: '<circle class="f" cx="72" cy="60" r="11"/><path d="M26 50v20h12l34 18V32L38 50z"/><path d="M38 70l6 22h10l-4-20"/><path d="M84 48l8-6M86 60h10M84 72l8 6"/>',
  city: '<circle class="f" cx="62" cy="46" r="11"/><path d="M18 96h84"/><path d="M28 96V50h22v46M50 96V30h24v66M74 96V62h18v34"/>',
  pin: '<circle class="f" cx="60" cy="48" r="11"/><path d="M60 100S32 70 32 48a28 28 0 0 1 56 0c0 22-28 52-28 52z"/>',
  plane: '<circle class="f" cx="58" cy="64" r="11"/><path d="M20 66l78-36-30 66-12-26z"/><path d="M56 70l42-40"/>',
  ship: '<circle class="f" cx="60" cy="62" r="11"/><path d="M18 76h84l-12 18H30z"/><path d="M36 76V48h48v28M60 48V30"/>',
  bolt: '<circle class="f" cx="60" cy="60" r="11"/><path d="M66 18L36 66h24l-6 36 30-48H60z"/>',
  drop: '<circle class="f" cx="60" cy="74" r="11"/><path d="M60 18C46 40 34 56 34 72a26 26 0 0 0 52 0c0-16-12-32-26-54z"/>',
  leaf: '<circle class="f" cx="60" cy="60" r="11"/><path d="M28 92C28 52 52 28 92 28c0 40-24 64-64 64z"/><path d="M28 92l40-40"/>',
  wave: '<circle class="f" cx="50" cy="64" r="11"/><path d="M14 64c8-8 16-8 24 0s16 8 24 0 16-8 24 0 16 8 24 0"/><path d="M14 84c8-8 16-8 24 0s16 8 24 0 16-8 24 0 16 8 24 0"/>',
  pulse: '<circle class="f" cx="44" cy="44" r="11"/><path d="M14 62h22l8-18 12 36 10-28 6 10h34"/>',
  rocket: '<circle class="f" cx="60" cy="50" r="11"/><path d="M60 16c16 14 20 34 14 62H46c-6-28-2-48 14-62z"/><circle cx="60" cy="50" r="7"/><path d="M46 70L32 84v12l16-10M74 70l14 14v12L72 86M54 88l6 14 6-14"/>',
  newspaper: '<circle class="f" cx="48" cy="44" r="11"/><path d="M24 24h62v66a8 8 0 0 0 8 8H32a8 8 0 0 1-8-8z"/><path d="M86 44h12v46a8 8 0 0 1-8 8"/><path d="M34 44h40M34 64h40M34 76h40M34 88h24"/>',
  calendar: '<circle class="f" cx="72" cy="72" r="11"/><rect x="24" y="30" width="72" height="62" rx="6"/><path d="M24 48h72M42 22v16M78 22v16"/><path d="M66 72l4 4 8-9"/><circle class="d" cx="40" cy="62" r="3.5"/><circle class="d" cx="56" cy="62" r="3.5"/><circle class="d" cx="40" cy="78" r="3.5"/><circle class="d" cx="56" cy="78" r="3.5"/>',
  eye: '<circle class="f" cx="60" cy="60" r="11"/><path d="M14 60c12-20 28-30 46-30s34 10 46 30c-12 20-28 30-46 30S26 80 14 60z"/><circle cx="60" cy="60" r="15"/>',
  play: '<circle class="f" cx="62" cy="60" r="11"/><rect x="18" y="28" width="84" height="64" rx="10"/><path d="M52 46v28l22-14z"/>',
  doc: '<circle class="f" cx="56" cy="50" r="11"/><path d="M34 18h36l16 16v68H34z"/><path d="M70 18v16h16M44 50h28M44 70h32M44 82h32M44 94h20"/>',
  people: '<circle class="f" cx="60" cy="42" r="11"/><circle cx="60" cy="42" r="13"/><path d="M34 96c0-16 12-28 26-28s26 12 26 28"/><circle cx="28" cy="52" r="9"/><path d="M12 92c0-12 7-20 16-20"/><circle cx="92" cy="52" r="9"/><path d="M108 92c0-12-7-20-16-20"/>',
  phone: '<circle class="f" cx="60" cy="56" r="11"/><rect x="36" y="16" width="48" height="88" rx="10"/><path d="M52 26h16M54 94h12"/>',
  mic: '<circle class="f" cx="60" cy="40" r="11"/><rect x="46" y="18" width="28" height="52" rx="14"/><path d="M34 56c0 16 12 28 26 28s26-12 26-28M60 84v18M46 102h28"/><path d="M46 40h28"/>',
  server: '<circle class="f" cx="40" cy="40" r="11"/><rect x="22" y="24" width="76" height="32" rx="6"/><rect x="22" y="64" width="76" height="32" rx="6"/><path d="M60 40h26M60 80h26"/><circle class="d" cx="40" cy="80" r="4"/>',
  tag: '<circle class="f" cx="78" cy="42" r="11"/><path d="M60 20h40v40L56 104 16 64z"/><circle cx="78" cy="42" r="7"/>',
  // Gaming
  controller: '<circle class="f" cx="86" cy="52" r="11"/><path d="M34 36h52c14 0 22 10 25 28 3 18-1 32-11 32-8 0-12-10-20-18H40c-8 8-12 18-20 18-10 0-14-14-11-32 3-18 11-28 25-28z"/><path d="M31 43h6v6h6v6h-6v6h-6v-6h-6v-6h6z"/><circle cx="50" cy="68" r="5"/><circle cx="70" cy="68" r="5"/><path d="M55 50h10"/>',
  handheld: '<circle class="f" cx="92" cy="60" r="11"/><rect x="14" y="36" width="92" height="48" rx="16"/><rect x="38" y="44" width="40" height="32" rx="3"/><path d="M26 54v12M20 60h12"/>',
  headset: '<circle class="f" cx="42" cy="60" r="11"/><path d="M24 50c0-6 4-10 10-10h52c6 0 10 4 10 10v20c0 6-4 10-10 10H72l-6-8H54l-6 8H34c-6 0-10-4-10-10z"/><circle cx="42" cy="60" r="8"/><circle cx="78" cy="60" r="8"/><path d="M24 58H14M96 58h10"/>',
  headphones: '<circle class="f" cx="30" cy="78" r="11"/><path d="M22 78v-12a38 38 0 0 1 76 0v12"/><rect x="18" y="64" width="22" height="32" rx="8"/><rect x="80" y="64" width="22" height="32" rx="8"/>',
  trophy: '<circle class="f" cx="60" cy="44" r="11"/><path d="M40 24h40v20a20 20 0 0 1-40 0z"/><path d="M40 32H28c0 14 6 20 14 22M80 32h12c0 14-6 20-14 22M60 64v16M44 96h32M48 96l4-16h16l4 16"/>',
  joystick: '<circle class="f" cx="60" cy="34" r="11"/><circle cx="60" cy="34" r="13"/><path d="M60 47v27"/><rect x="28" y="74" width="64" height="20" rx="6"/><circle class="d" cx="80" cy="84" r="3.5"/>',
  pixel: '<circle class="f" cx="60" cy="62" r="11"/><path d="M30 40h20v10h20V40h20v10h10v20H90v10H80v10H70v10H50V90H40V80H30V70H20V50h10z"/><path d="M40 50h10v10H40zM70 50h10v10H70z"/>',
  sword: '<circle class="f" cx="60" cy="80" r="11"/><path d="M51 80V30l9-16 9 16v50z"/><path d="M60 32v42"/><path d="M36 80h48"/><rect x="55" y="80" width="10" height="16" rx="2"/><circle cx="60" cy="101" r="5"/>',
  // Reading
  book: '<circle class="f" cx="58" cy="46" r="11"/><path d="M32 22h52v76H38a6 6 0 0 1-6-6z"/><path d="M32 86a6 6 0 0 1 6-6h46"/><path d="M46 46h24"/>',
  openbook: '<circle class="f" cx="60" cy="38" r="11"/><path d="M60 36c-10-8-24-10-40-8v58c16-2 30 0 40 8 10-8 24-10 40-8V28c-16-2-30 0-40 8z"/><path d="M60 36v58"/>',
  bulb: '<circle class="f" cx="60" cy="48" r="11"/><path d="M46 74c-8-6-14-16-14-26a28 28 0 0 1 56 0c0 10-6 20-14 26v8H46z"/><path d="M48 92h24M52 102h16"/>',
  magazine: '<circle class="f" cx="60" cy="46" r="11"/><rect x="32" y="20" width="56" height="80" rx="4"/><path d="M42 32h36M42 74h36M42 86h24"/>',
  // Design
  bezier: '<circle class="f" cx="60" cy="40" r="11"/><path d="M22 40h76"/><path d="M20 94C24 22 96 22 100 94"/><rect x="14" y="88" width="12" height="12"/><rect x="94" y="88" width="12" height="12"/><circle class="d" cx="22" cy="40" r="4.5"/><circle class="d" cx="98" cy="40" r="4.5"/>',
  swatches: '<circle class="f" cx="39" cy="84" r="11"/><rect x="66" y="28" width="24" height="56" rx="4" transform="rotate(24 78 56)"/><rect x="26" y="24" width="26" height="72" rx="4"/><rect x="46" y="24" width="26" height="72" rx="4" transform="rotate(12 59 96)"/>',
  grid: '<circle class="f" cx="60" cy="60" r="11"/><rect x="22" y="22" width="76" height="76" rx="4"/><path d="M22 60h76M60 22v76M41 22v76M79 22v76"/>',
  brush: '<circle class="f" cx="34" cy="86" r="11"/><path d="M92 22L58 64"/><path d="M58 64c-8-4-18 0-20 10-2 8-6 12-12 14 14 6 30 2 34-10 2-6 2-10-2-14z"/>',
  frame: '<circle class="f" cx="48" cy="44" r="11"/><rect x="28" y="18" width="64" height="84" rx="3"/><path d="M28 82l20-18 16 12 10-8 18 14"/>',
  cursor: '<circle class="f" cx="55" cy="54" r="11"/><path d="M40 18v74l17-16 12 26 11-5-12-26h24z"/>',
  star: '<circle class="f" cx="60" cy="58" r="11"/><path d="M60 22l10 22 24 2-18 16 6 24-22-12-22 12 6-24-18-16 24-2z"/>',
  camera: '<circle class="f" cx="60" cy="64" r="11"/><rect x="20" y="38" width="80" height="54" rx="8"/><path d="M44 38l6-10h20l6 10"/><circle cx="60" cy="64" r="16"/>',
  // AI
  nodes: '<circle class="f" cx="60" cy="60" r="11"/><circle cx="60" cy="60" r="13"/><circle cx="26" cy="28" r="7"/><circle cx="94" cy="28" r="7"/><circle cx="26" cy="92" r="7"/><circle cx="94" cy="92" r="7"/><path d="M31 33l19 18M89 33L70 51M31 87l19-18M89 87L70 69"/>',
  chip: '<circle class="f" cx="60" cy="60" r="11"/><rect x="32" y="32" width="56" height="56" rx="8"/><rect x="46" y="46" width="28" height="28" rx="4"/><path d="M46 32V20M60 32V20M74 32V20M46 100V88M60 100V88M74 100V88M32 46H20M32 60H20M32 74H20M100 46H88M100 60H88M100 74H88"/>',
  spark: '<circle class="f" cx="54" cy="54" r="11"/><path d="M54 24c4 20 10 26 30 30-20 4-26 10-30 30-4-20-10-26-30-30 20-4 26-10 30-30z"/><path d="M90 74v18M81 83h18"/>',
  wand: '<circle class="f" cx="80" cy="40" r="11"/><path d="M28 92l46-46"/><path d="M80 28v24M68 40h24"/><path d="M38 28v12M32 34h12M90 72v12M84 78h12"/>',
  chat: '<circle class="f" cx="60" cy="55" r="11"/><path d="M22 30h76v50H54l-18 16V80H22z"/><circle class="d" cx="40" cy="55" r="4"/><circle class="d" cx="60" cy="55" r="4"/><circle class="d" cx="80" cy="55" r="4"/>',
  robot: '<circle class="f" cx="60" cy="22" r="11"/><rect x="28" y="38" width="64" height="50" rx="12"/><path d="M60 38V22M48 76h24M28 60H18M92 60h10"/><circle class="d" cx="48" cy="58" r="4"/><circle class="d" cx="72" cy="58" r="4"/>',
  prompt: '<circle class="f" cx="44" cy="60" r="11"/><rect x="18" y="26" width="84" height="68" rx="8"/><path d="M38 50l12 10-12 10M58 70h20"/>',
  orbit: '<circle class="f" cx="60" cy="60" r="11"/><circle cx="60" cy="60" r="13"/><ellipse cx="60" cy="60" rx="46" ry="16" transform="rotate(-25 60 60)"/><circle class="d" cx="98" cy="42" r="4"/>',
  brain: '<circle class="f" cx="50" cy="60" r="11"/><path d="M58 24C50 18 38 20 36 28 26 28 20 36 22 46 14 52 14 66 22 72 20 82 26 92 36 92 40 100 52 102 58 96c5 0 8-3 8-8V32c0-5-3-8-8-8z"/><path d="M48 40h10c4 0 8 4 8 8M48 80h10c4 0 8-4 8-8"/><path d="M66 46h12c6 0 10-4 10-10v-1M66 74h12c6 0 10 4 10 10v1M50 60h39.5"/><circle cx="88" cy="30" r="5.5"/><circle cx="95" cy="60" r="5.5"/><circle cx="88" cy="90" r="5.5"/>'
};

function art(key, extraClass = '') {
  const body = ART[key] || ART.newspaper;
  return `<svg class="art ${extraClass}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">${body}</svg>`;
}
