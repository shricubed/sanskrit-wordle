// ══════════════════════════════════════════════════════════════
//  SYLLABLE MODEL
//  An akshara = { base: string, matra: string }
//  base  — Devanagari consonant (or standalone vowel)
//  matra — diacritic Unicode char, "" for inherent-a
// ══════════════════════════════════════════════════════════════

export function syl(base, matra = "") { return { base, matra }; }
export function sylDisplay(s) { return s.base + s.matra; }
export function sylEqual(a, b) { return a.base === b.base && a.matra === b.matra; }

// Virama (halant) — joins two consonants into a conjunct
const V = "\u094D";

// ── Consonant map (longest sequences first) ───────────────────
// Conjuncts come before simple consonants so greedy match always
// picks the longest valid sequence.
export const CONSONANT_MAP = [

  // ── Common conjuncts (3-char Roman) ──────────────────────────
  ["kSh", "क" + V + "ष"],   // kṣa  क्ष
  ["jny", "ज" + V + "ञ"],   // jña  ज्ञ  (alt spelling)
  ["shr", "श" + V + "र"],   // śra  श्र
  ["str", "स" + V + "त" + V + "र"],  // stra स्त्र
  ["ntr", "न" + V + "त" + V + "र"],  // ntra न्त्र

  // ── Common conjuncts (2-char Roman) ──────────────────────────
  ["kS", "क" + V + "ष"],    // kṣa  क्ष  (alt)
  ["ks", "क" + V + "स"],    // ksa  क्स
  ["kn", "क" + V + "न"],    // kna  क्न
  ["kt", "क" + V + "त"],    // kta  क्त
  ["kv", "क" + V + "व"],    // kva  क्व
  ["gn", "ग" + V + "न"],    // gna  ग्न
  ["gm", "ग" + V + "म"],    // gma  ग्म
  ["gy", "ग" + V + "य"],    // gya  ग्य
  ["gr", "ग" + V + "र"],    // gra  ग्र
  ["gl", "ग" + V + "ल"],    // gla  ग्ल
  ["gv", "ग" + V + "व"],    // gva  ग्व
  ["jn", "ज" + V + "ञ"],    // jña  ज्ञ
  ["jv", "ज" + V + "व"],    // jva  ज्व
  ["Tm", "ट" + V + "म"],    // Tma  ट्म
  ["TT", "ट" + V + "ट"],    // TTa  ट्ट
  ["DD", "ड" + V + "ड"],    // DDa  ड्ड
  ["NN", "ण" + V + "ण"],    // NNa  ण्ण
  ["tr", "त" + V + "र"],    // tra  त्र
  ["tn", "त" + V + "न"],    // tna  त्न
  ["tv", "त" + V + "व"],    // tva  त्व
  ["ts", "त" + V + "स"],    // tsa  त्स
  ["tk", "त" + V + "क"],    // tka  त्क
  ["tm", "त" + V + "म"],    // tma  त्म
  ["ty", "त" + V + "य"],    // tya  त्य
  ["dr", "द" + V + "र"],    // dra  द्र
  ["dv", "द" + V + "व"],    // dva  द्व
  ["dy", "द" + V + "य"],    // dya  द्य
  ["dm", "द" + V + "म"],    // dma  द्म
  ["dn", "द" + V + "न"],    // dna  द्न
  ["db", "द" + V + "ब"],    // dba  द्ब
  ["dg", "द" + V + "ग"],    // dga  द्ग
  ["nk", "न" + V + "क"],    // nka  न्क
  ["ng", "ङ"],               // ṅa   ङ    (simple — not a conjunct here)
  ["nc", "न" + V + "च"],    // nca  न्च
  ["nj", "ञ"],               // ña   ञ    (simple)
  ["nt", "न" + V + "त"],    // nta  न्त
  ["nd", "न" + V + "द"],    // nda  न्द
  ["nm", "न" + V + "म"],    // nma  न्म
  ["ny", "ञ"],               // ña   ञ    (simple, for ny→ञ)
  ["pr", "प" + V + "र"],    // pra  प्र
  ["pl", "प" + V + "ल"],    // pla  प्ल
  ["pt", "प" + V + "त"],    // pta  प्त
  ["pn", "प" + V + "न"],    // pna  प्न
  ["br", "ब" + V + "र"],    // bra  ब्र
  ["bv", "ब" + V + "व"],    // bva  ब्व
  ["mr", "म" + V + "र"],    // mra  म्र
  ["ml", "म" + V + "ल"],    // mla  म्ल
  ["mn", "म" + V + "न"],    // mna  म्न
  ["yr", "य" + V + "र"],    // yra  य्र
  ["rv", "र" + V + "व"],    // rva  र्व  (rare)
  ["lk", "ल" + V + "क"],    // lka  ल्क
  ["lp", "ल" + V + "प"],    // lpa  ल्प
  ["lv", "ल" + V + "व"],    // lva  ल्व
  ["vr", "व" + V + "र"],    // vra  व्र
  ["vy", "व" + V + "य"],    // vya  व्य
  ["vn", "व" + V + "न"],    // vna  व्न
  ["sr", "स" + V + "र"],    // sra  स्र
  ["sk", "स" + V + "क"],    // ska  स्क
  ["st", "स" + V + "त"],    // sta  स्त
  ["sn", "स" + V + "न"],    // sna  स्न
  ["sm", "स" + V + "म"],    // sma  स्म
  ["sv", "स" + V + "व"],    // sva  स्व
  ["sy", "स" + V + "य"],    // sya  स्य
  ["sp", "स" + V + "प"],    // spa  स्प
  ["hr", "ह" + V + "र"],    // hra  ह्र
  ["hl", "ह" + V + "ल"],    // hla  ह्ल
  ["hn", "ह" + V + "न"],    // hna  ह्न

  // ── Digraph simple consonants ─────────────────────────────────
  ["kh","ख"], ["gh","घ"], ["ch","च"], ["jh","झ"],
  ["Th","ठ"], ["Dh","ढ"], ["th","थ"], ["dh","ध"],
  ["ph","फ"], ["bh","भ"], ["sh","श"], ["Sh","ष"],

  // ── Single consonants ─────────────────────────────────────────
  ["k","क"],  ["g","ग"],  ["c","च"],  ["j","ज"],
  ["T","ट"],  ["D","ड"],  ["N","ण"],
  ["t","त"],  ["d","द"],  ["n","न"],
  ["p","प"],  ["f","फ"],  ["b","ब"],  ["m","म"],
  ["y","य"],  ["r","र"],  ["l","ल"],
  ["v","व"],  ["w","व"],  ["s","स"],
  ["h","ह"],  ["H","ह"],  ["S","श"],
];

// ── Vowel map ─────────────────────────────────────────────────
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

// Special standalone tokens
export const SPECIAL_MAP = [
  ["M", { standalone: "म्", matra: "" }],
];

// Devanagari independent vowel → matra (for on-screen key clicks)
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
