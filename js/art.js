// Pulse line-art library. 120x120 grid, 3px round strokes.
// The system: every icon has exactly ONE accent circle, <circle class="f" r="11">, always the same size,
// drawn first so the lines sit on top of it, and placed on a meaningful point of the drawing
// (a lens, a joint, a peak, a button) so it reads as part of the icon, never floating beside it.
// class "d" = small solid dots in the line color.
// Routines pick the key that literally shows the story's subject; unknown keys fall back to "newspaper".
const ART = {
  // World, politics, economy
  globe: '<circle class="f" cx="87" cy="33" r="11"/><circle cx="60" cy="60" r="38"/><ellipse cx="60" cy="60" rx="16" ry="38"/><path d="M22 60h76M27 41h66M27 79h66"/>',
  ballot: '<circle class="f" cx="74" cy="22" r="11"/><path d="M46 56V22h28v34"/><path d="M53 38l5 5 10-11"/><rect x="24" y="56" width="72" height="40" rx="5"/><path d="M38 56h44"/><path d="M24 70h72"/>',
  chartUp: '<circle class="f" cx="64" cy="72" r="11"/><path d="M24 96h72M24 96V24"/><path d="M32 82l18-20 14 10 24-32"/><path d="M76 40h12v12"/>',
  chartDown: '<circle class="f" cx="64" cy="50" r="11"/><path d="M24 96h72M24 96V24"/><path d="M32 40l18 20 14-10 24 30"/><path d="M76 80h12V68"/>',
  coin: '<circle class="f" cx="88" cy="40" r="11"/><ellipse cx="60" cy="40" rx="28" ry="10"/><path d="M32 40v40c0 5.5 12.5 10 28 10s28-4.5 28-10V40"/><path d="M32 60c0 5.5 12.5 10 28 10s28-4.5 28-10"/>',
  court: '<circle class="f" cx="60" cy="38" r="11"/><path d="M22 96h76"/><path d="M28 46L60 24l32 22z"/><path d="M38 54v34M53 54v34M67 54v34M82 54v34M30 88h60"/>',
  scale: '<circle class="f" cx="36" cy="62" r="11"/><path d="M60 24v72M42 96h36"/><path d="M26 46l68-14"/><path d="M26 46L16 72M26 46l10 26M94 32L84 58M94 32l10 26"/><path d="M12 72q14 12 28 0M80 58q14 12 28 0"/><circle class="d" cx="60" cy="38" r="4"/>',
  shield: '<circle class="f" cx="78" cy="48" r="11"/><path d="M60 18l32 11v27c0 22-14 36-32 44-18-8-32-22-32-44V29z"/><path d="M42 60l12 12 24-24"/>',
  rings: '<circle class="f" cx="60" cy="60" r="11"/><circle cx="46" cy="60" r="22"/><circle cx="74" cy="60" r="22"/>',
  flag: '<circle class="f" cx="36" cy="20" r="11"/><path d="M36 102V24"/><path d="M36 30c14-8 26 8 48 0v34c-22 8-34-8-48 0"/>',
  megaphone: '<circle class="f" cx="72" cy="60" r="11"/><path d="M26 50v20h12l34 18V32L38 50z"/><path d="M38 70l6 22h10l-4-20"/><path d="M84 48l8-6M86 60h10M84 72l8 6"/>',
  city: '<circle class="f" cx="94" cy="46" r="11"/><path d="M14 96h92"/><path d="M24 96V58h20v38M44 96V28h24v68M68 96V46h26v50"/><path d="M56 28V16"/>',
  pin: '<circle class="f" cx="60" cy="48" r="11"/><path d="M60 100S32 70 32 48a28 28 0 0 1 56 0c0 22-28 52-28 52z"/>',
  plane: '<circle class="f" cx="60" cy="26" r="11"/><path d="M60 12c4 0 7 5 7 12v20l37 20v10L67 64v20l12 9v7l-19-5-19 5v-7l12-9V64L16 74V64l37-20V24c0-7 3-12 7-12z"/>',
  ship: '<circle class="f" cx="94" cy="46" r="11"/><path d="M16 72h88l-12 22H28z"/><path d="M32 72V56h18v16M50 72V56h18v16"/><path d="M76 72V46h18v26"/>',
  bolt: '<circle class="f" cx="60" cy="60" r="11"/><path d="M66 18L36 66h24l-6 36 30-48H60z"/>',
  drop: '<circle class="f" cx="60" cy="74" r="11"/><path d="M60 18C46 40 34 56 34 72a26 26 0 0 0 52 0c0-16-12-32-26-54z"/>',
  leaf: '<circle class="f" cx="94" cy="26" r="11"/><path d="M30 90C30 50 54 26 94 26c0 40-24 64-64 64z"/><path d="M30 90L80 40M20 100l10-10"/><path d="M48 72l-2-14M48 72l14 2M62 58l-2-14M62 58l14 2"/>',
  wave: '<circle class="f" cx="60" cy="54" r="11"/><path d="M12 62c10-8 20-8 30 0s20 8 30 0 20-8 30 0"/><path d="M12 80c10-8 20-8 30 0s20 8 30 0 20-8 30 0"/><path d="M28 96c8-6 16-6 24 0s16 6 24 0 16-6 24 0"/>',
  pulse: '<circle class="f" cx="44" cy="44" r="11"/><path d="M14 62h22l8-18 12 36 10-28 6 10h34"/>',
  rocket: '<circle class="f" cx="60" cy="50" r="11"/><path d="M60 16c16 14 20 34 14 62H46c-6-28-2-48 14-62z"/><path d="M46 70L32 84v12l16-10M74 70l14 14v12L72 86M54 88l6 14 6-14"/>',
  newspaper: '<circle class="f" cx="48" cy="42" r="11"/><path d="M24 24h62v66a8 8 0 0 0 8 8H32a8 8 0 0 1-8-8z"/><path d="M86 44h12v46a8 8 0 0 1-8 8"/><path d="M34 42h40M34 58h40M34 67h40M34 76h40M34 85h24"/>',
  calendar: '<circle class="f" cx="78" cy="80" r="11"/><rect x="24" y="30" width="72" height="66" rx="6"/><path d="M24 48h72M42 22v16M78 22v16"/><path d="M73 80l4 4 7-8"/><circle class="d" cx="42" cy="64" r="3.5"/><circle class="d" cx="60" cy="64" r="3.5"/><circle class="d" cx="78" cy="64" r="3.5"/><circle class="d" cx="42" cy="80" r="3.5"/><circle class="d" cx="60" cy="80" r="3.5"/>',
  eye: '<circle class="f" cx="68" cy="54" r="11"/><path d="M12 60c12-20 28-32 48-32s36 12 48 32c-12 20-28 32-48 32S24 80 12 60z"/><circle cx="60" cy="60" r="16"/>',
  play: '<circle class="f" cx="96" cy="28" r="11"/><rect x="20" y="24" width="80" height="72" rx="14"/><path d="M50 44v32l26-16z"/>',
  doc: '<circle class="f" cx="68" cy="36" r="11"/><path d="M32 16h36l20 20v68H32z"/><path d="M68 16v20h20"/><path d="M42 52h36M42 64h36M42 76h36M42 88h22"/>',
  people: '<circle class="f" cx="60" cy="82" r="11"/><circle cx="60" cy="42" r="13"/><path d="M34 98c0-16 12-28 26-28s26 12 26 28"/><circle cx="26" cy="52" r="9"/><path d="M10 92c0-12 7-20 16-20"/><circle cx="94" cy="52" r="9"/><path d="M110 92c0-12-7-20-16-20"/>',
  phone: '<circle class="f" cx="81" cy="19" r="11"/><rect x="36" y="16" width="48" height="88" rx="10"/><path d="M52 26h12M54 94h12"/>',
  mic: '<circle class="f" cx="60" cy="40" r="11"/><rect x="46" y="18" width="28" height="52" rx="14"/><path d="M34 56c0 16 12 28 26 28s26-12 26-28M60 84v18M46 102h28"/><path d="M46 40h28"/>',
  server: '<circle class="f" cx="40" cy="40" r="11"/><rect x="22" y="24" width="76" height="32" rx="6"/><rect x="22" y="64" width="76" height="32" rx="6"/><path d="M60 40h26M60 80h26"/><circle class="d" cx="40" cy="80" r="4"/>',
  tag: '<circle class="f" cx="58" cy="96" r="11"/><path d="M62 24h34v34L58 96 24 62z"/><circle cx="82" cy="38" r="6"/>',
  // Gaming
  controller: '<circle class="f" cx="86" cy="52" r="11"/><path d="M34 36h52c14 0 22 10 25 28 3 18-1 32-11 32-8 0-12-10-20-18H40c-8 8-12 18-20 18-10 0-14-14-11-32 3-18 11-28 25-28z"/><path d="M31 43h6v6h6v6h-6v6h-6v-6h-6v-6h6z"/><circle cx="50" cy="68" r="5"/><circle cx="70" cy="68" r="5"/><path d="M55 50h10"/>',
  handheld: '<circle class="f" cx="92" cy="60" r="11"/><rect x="14" y="36" width="92" height="48" rx="16"/><rect x="38" y="44" width="40" height="32" rx="3"/><path d="M26 54v12M20 60h12"/>',
  headset: '<circle class="f" cx="86" cy="62" r="11"/><path d="M26 42h68a12 12 0 0 1 12 12v16a12 12 0 0 1-12 12H74l-8-10H54l-8 10H26a12 12 0 0 1-12-12V54a12 12 0 0 1 12-12z"/><path d="M14 58H8M106 58h6"/>',
  headphones: '<circle class="f" cx="60" cy="22" r="11"/><path d="M24 74V60a36 36 0 0 1 72 0v14"/><rect x="16" y="64" width="22" height="34" rx="9"/><rect x="82" y="64" width="22" height="34" rx="9"/>',
  trophy: '<circle class="f" cx="80" cy="24" r="11"/><path d="M40 24h40v20a20 20 0 0 1-40 0z"/><path d="M40 32H28c0 14 6 20 14 22M80 32h12c0 14-6 20-14 22M60 64v16M44 96h32M48 96l4-16h16l4 16"/>',
  joystick: '<circle class="f" cx="80" cy="84" r="11"/><circle cx="60" cy="32" r="13"/><path d="M60 45v29"/><rect x="28" y="74" width="64" height="20" rx="6"/>',
  pixel: '<circle class="f" cx="76" cy="54" r="11"/><path d="M30 40h20v10h20V40h20v10h10v20H90v10H80v10H70v10H50V90H40V80H30V70H20V50h10z"/><path d="M40 50h10v10H40zM70 50h10v10H70z"/>',
  sword: '<circle class="f" cx="60" cy="80" r="11"/><path d="M51 80V30l9-16 9 16v50z"/><path d="M60 32v42"/><path d="M36 80h48"/><rect x="55" y="80" width="10" height="16" rx="2"/><circle cx="60" cy="101" r="5"/>',
  // Reading
  book: '<circle class="f" cx="76" cy="46" r="11"/><path d="M32 22h52v76H38a6 6 0 0 1-6-6z"/><path d="M32 86a6 6 0 0 1 6-6h46"/><path d="M70 22v24l6-5 6 5V22"/>',
  openbook: '<circle class="f" cx="60" cy="38" r="11"/><path d="M60 36c-10-8-24-10-40-8v58c16-2 30 0 40 8 10-8 24-10 40-8V28c-16-2-30 0-40 8z"/><path d="M60 36v58"/>',
  bulb: '<circle class="f" cx="80" cy="30" r="11"/><path d="M46 74c-8-6-14-16-14-26a28 28 0 0 1 56 0c0 10-6 20-14 26v8H46z"/><path d="M48 92h24M52 102h16M54 74V58l6 6 6-6v16"/>',
  magazine: '<circle class="f" cx="87" cy="21" r="11"/><rect x="32" y="20" width="56" height="80" rx="4"/><path d="M42 34h28M42 74h36M42 86h24"/><path d="M42 46h20v18H42z"/>',
  // Design
  bezier: '<circle class="f" cx="60" cy="40" r="11"/><path d="M22 40h76"/><path d="M20 94C24 22 96 22 100 94"/><rect x="14" y="88" width="12" height="12"/><rect x="94" y="88" width="12" height="12"/><circle class="d" cx="22" cy="40" r="4.5"/><circle class="d" cx="98" cy="40" r="4.5"/>',
  swatches: '<circle class="f" cx="60" cy="92" r="11"/><g transform="rotate(-42 60 92)"><rect x="52" y="16" width="16" height="70" rx="4"/><path d="M52 30h16"/></g><g transform="rotate(0 60 92)"><rect x="52" y="16" width="16" height="70" rx="4"/><path d="M52 30h16"/></g><g transform="rotate(42 60 92)"><rect x="52" y="16" width="16" height="70" rx="4"/><path d="M52 30h16"/></g>',
  grid: '<circle class="f" cx="91" cy="29" r="11"/><rect x="20" y="20" width="22" height="22" rx="3"/><rect x="49" y="20" width="22" height="22" rx="3"/><rect x="80" y="18" width="22" height="22" rx="3"/><rect x="20" y="49" width="51" height="22" rx="3"/><rect x="78" y="49" width="22" height="51" rx="3"/><rect x="20" y="78" width="51" height="22" rx="3"/>',
  brush: '<circle class="f" cx="26" cy="88" r="11"/><path d="M58 64c-8-4-18 0-20 10-2 8-6 12-12 14 14 6 30 2 34-10 2-6 2-10-2-14z"/><path d="M58 64l4 4 36-40c2-2 0-6-3-4z"/>',
  frame: '<circle class="f" cx="74" cy="48" r="11"/><rect x="18" y="24" width="84" height="72" rx="3"/><rect x="28" y="34" width="64" height="52" rx="1"/><path d="M28 80l20-18 14 10 10-8 20 14"/>',
  cursor: '<circle class="f" cx="64" cy="74" r="11"/><path d="M36 18l60 52-32 4-18 26z"/>',
  star: '<circle class="f" cx="70" cy="44" r="11"/><path d="M60 22l10 22 24 2-18 16 6 24-22-12-22 12 6-24-18-16 24-2z"/>',
  camera: '<circle class="f" cx="86" cy="50" r="11"/><rect x="20" y="38" width="80" height="54" rx="8"/><path d="M44 38l6-10h20l6 10"/><circle cx="60" cy="66" r="16"/>',
  // AI
  nodes: '<circle class="f" cx="60" cy="60" r="11"/><circle cx="60" cy="60" r="13"/><circle cx="26" cy="28" r="7"/><circle cx="94" cy="28" r="7"/><circle cx="26" cy="92" r="7"/><circle cx="94" cy="92" r="7"/><path d="M31 33l19 18M89 33L70 51M31 87l19-18M89 87L70 69"/>',
  chip: '<circle class="f" cx="46" cy="46" r="11"/><rect x="32" y="32" width="56" height="56" rx="8"/><rect x="46" y="46" width="28" height="28" rx="4"/><path d="M46 32V20M60 32V20M74 32V20M46 100V88M60 100V88M74 100V88M32 46H20M32 60H20M32 74H20M100 46H88M100 60H88M100 74H88"/>',
  spark: '<circle class="f" cx="90" cy="84" r="11"/><path d="M54 24c4 20 10 26 30 30-20 4-26 10-30 30-4-20-10-26-30-30 20-4 26-10 30-30z"/><path d="M90 72v24M78 84h24"/>',
  wand: '<circle class="f" cx="72" cy="48" r="11"/><path d="M28 92l44-44"/><path d="M90 20v20M80 30h20"/><path d="M38 26v12M32 32h12M92 70v12M86 76h12"/>',
  chat: '<circle class="f" cx="98" cy="30" r="11"/><path d="M22 30h76v50H54l-18 16V80H22z"/><circle class="d" cx="44" cy="55" r="4"/><circle class="d" cx="60" cy="55" r="4"/><circle class="d" cx="76" cy="55" r="4"/>',
  robot: '<circle class="f" cx="60" cy="22" r="11"/><rect x="28" y="38" width="64" height="50" rx="12"/><path d="M60 38V22M48 76h24M28 60H18M92 60h10"/><circle class="d" cx="48" cy="58" r="4"/><circle class="d" cx="72" cy="58" r="4"/>',
  prompt: '<circle class="f" cx="32" cy="36" r="11"/><rect x="18" y="26" width="84" height="68" rx="8"/><path d="M18 44h84"/><path d="M36 58l12 10-12 10M56 78h20"/>',
  orbit: '<circle class="f" cx="98" cy="42" r="11"/><circle cx="60" cy="60" r="14"/><ellipse cx="60" cy="60" rx="46" ry="16" transform="rotate(-25 60 60)"/>',
  brain: '<circle class="f" cx="50" cy="60" r="11"/><path d="M58 24C50 18 38 20 36 28 26 28 20 36 22 46 14 52 14 66 22 72 20 82 26 92 36 92 40 100 52 102 58 96c5 0 8-3 8-8V32c0-5-3-8-8-8z"/><path d="M48 40h10c4 0 8 4 8 8M48 80h10c4 0 8-4 8-8"/><path d="M66 46h12c6 0 10-4 10-10v-1M66 74h12c6 0 10 4 10 10v1M50 60h39.5"/><circle cx="88" cy="30" r="5.5"/><circle cx="95" cy="60" r="5.5"/><circle cx="88" cy="90" r="5.5"/>'
};

function art(key, extraClass = '') {
  const body = ART[key] || ART.newspaper;
  return `<svg class="art ${extraClass}" viewBox="0 0 120 120" aria-hidden="true" focusable="false">${body}</svg>`;
}
