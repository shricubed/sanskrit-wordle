// ══════════════════════════════════════════════════════════════
//  SYLLABLE MODEL
//  An akshara = { base: string, matra: string }
//  base  — Devanagari consonant (or standalone vowel)
//  matra — diacritic Unicode char, "" for inherent-a
// ══════════════════════════════════════════════════════════════

export function syl(base, matra = "") { return { base, matra }; }
export function sylDisplay(s) { return s.base + s.matra; }
export function sylEqual(a, b) { return a.base === b.base && a.matra === b.matra; }

// ── Consonant map (longest sequences first) ───────────────────
export const CONSONANT_MAP = [
  ["kh","ख"], ["gh","घ"], ["ch","च"], ["jh","झ"],
  ["Th","ठ"], ["Dh","ढ"], ["th","थ"], ["dh","ध"],
  ["ph","फ"], ["bh","भ"], ["sh","श"], ["Sh","ष"],
  ["ng","ङ"], ["ny","ञ"], ["nj","ञ"],
  ["k","क"],  ["g","ग"],  ["c","च"],  ["j","ज"],
  ["T","ट"],  ["D","ड"],  ["N","ण"],
  ["t","त"],  ["d","द"],  ["n","न"],
  ["p","प"],  ["f","फ"],  ["b","ब"],  ["m","म"],
  ["y","य"],  ["r","र"],  ["l","ल"],
  ["v","व"],  ["w","व"],  ["s","स"],
  ["h","ह"],  ["H","ह"],  ["S","श"],
];

// ── Vowel map ─────────────────────────────────────────────────
// standalone: independent vowel letter (no preceding consonant)
// matra:      diacritic attached to a consonant
export const VOWEL_MAP = [
  ["aa", { standalone: "आ", matra: "\u093E" }],
  ["ii", { standalone: "ई", matra: "\u0940" }],
  ["uu", { standalone: "ऊ", matra: "\u0942" }],
  ["ee", { standalone: "ई", matra: "\u0940" }],
  ["oo", { standalone: "ऊ", matra: "\u0942" }],
  ["A",  { standalone: "आ", matra: "\u093E" }],
  ["I",  { standalone: "ई", matra: "\u0940" }],
  ["U",  { standalone: "ऊ", matra: "\u0942" }],
  ["a",  { standalone: "अ", matra: ""       }],
  ["i",  { standalone: "इ", matra: "\u093F" }],
  ["u",  { standalone: "उ", matra: "\u0941" }],
  ["e",  { standalone: "इ", matra: "\u093F" }],
  ["o",  { standalone: "उ", matra: "\u0941" }],
];

// Special standalone tokens (anusvara etc.)
export const SPECIAL_MAP = [
  ["M", { standalone: "म्", matra: "" }],
];

// Devanagari independent vowel letter → matra (for on-screen key clicks)
export const VOWEL_LETTER_TO_MATRA = {
  "अ": "",
  "आ": "\u093E",
  "इ": "\u093F",
  "ई": "\u0940",
  "उ": "\u0941",
  "ऊ": "\u0942",
};

// ── Lookup helpers ────────────────────────────────────────────
export function lookupConsonant(buf) {
  for (const [r, d] of CONSONANT_MAP) if (r === buf) return d;
  return null;
}
export function lookupVowel(buf) {
  for (const [r, v] of VOWEL_MAP) if (r === buf) return v;
  return null;
}
export function lookupSpecial(buf) {
  for (const [r, v] of SPECIAL_MAP) if (r === buf) return v;
  return null;
}
export function consonantCanExtend(buf) {
  return CONSONANT_MAP.some(([r]) => r.startsWith(buf) && r !== buf);
}
export function vowelCanExtend(buf) {
  return VOWEL_MAP.some(([r]) => r.startsWith(buf) && r !== buf);
}
