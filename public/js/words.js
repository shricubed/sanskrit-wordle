import { syl } from "./transliteration.js";

// ══════════════════════════════════════════════════════════════
//  WORD LIST
//  Each word: { letters: syl[5], translit: string, meaning: string }
//  matra values:
//    ""       inherent-a
//    \u093E   ā  (long a)
//    \u093F   i  (short i)
//    \u0940   ī  (long i)
//    \u0941   u  (short u)
//    \u0942   ū  (long u)
// ══════════════════════════════════════════════════════════════

export const WORD_LIST = [
  { letters: [syl("व"), syl("न"), syl("म","\u093E"), syl("ल"), syl("क")],           translit: "vanamālaka",      meaning: "forest garland" },
  { letters: [syl("क"), syl("ल"), syl("प"), syl("त"), syl("र","\u0941")],            translit: "kalpataru",       meaning: "wish-fulfilling tree" },
  { letters: [syl("ग"), syl("ग"), syl("न"), syl("त"), syl("ल")],                     translit: "gaganatala",      meaning: "sky surface" },
  { letters: [syl("न"), syl("य"), syl("न"), syl("ज"), syl("ल")],                     translit: "nayanajala",      meaning: "tears" },
  { letters: [syl("त"), syl("प"), syl("स"), syl("व"), syl("न")],                     translit: "tapasavana",      meaning: "ascetic grove" },
  { letters: [syl("स"), syl("व"), syl("र"), syl("ल"), syl("य")],                     translit: "svaralaya",       meaning: "musical abode" },
  { letters: [syl("र"), syl("म"), syl("न","\u093F"), syl("व"), syl("न")],            translit: "ramaṇivana",      meaning: "delightful grove" },
  { letters: [syl("म"), syl("ध","\u0941"), syl("र"), syl("स"), syl("र")],            translit: "madhurasara",     meaning: "sweet essence" },
  { letters: [syl("अ"), syl("म"), syl("र"), syl("त"), syl("व")],                     translit: "amaratva",        meaning: "immortality" },
  { letters: [syl("भ"), syl("र"), syl("त"), syl("ख"), syl("ण")],                     translit: "bharatakhaṇḍa",   meaning: "land of Bharata" },
  { letters: [syl("र"), syl("त"), syl("न"), syl("क"), syl("र")],                     translit: "ratnakara",       meaning: "mine of gems" },
  { letters: [syl("न"), syl("भ"), syl("स"), syl("त"), syl("ल")],                     translit: "nabhasatala",     meaning: "sky floor" },
  { letters: [syl("व"), syl("द"), syl("न"), syl("क"), syl("ज")],                     translit: "vadanakaja",      meaning: "face lotus" },
  { letters: [syl("ज"), syl("ग"), syl("त"), syl("म"), syl("न")],                     translit: "jagatmana",       meaning: "world mind" },
  { letters: [syl("क"), syl("म"), syl("ल"), syl("ज"), syl("न")],                     translit: "kamalajana",      meaning: "lotus-born folk" },
  { letters: [syl("प"), syl("व"), syl("न"), syl("त"), syl("ल")],                     translit: "pavana-tala",     meaning: "wind surface" },
  { letters: [syl("भ"), syl("व"), syl("न"), syl("त"), syl("ल")],                     translit: "bhavanataala",    meaning: "house floor" },
  { letters: [syl("ध"), syl("र"), syl("त"), syl("ल"), syl("म")],                     translit: "dharatalam",      meaning: "earth's surface" },
  { letters: [syl("क"), syl("म"), syl("ल","\u093E"), syl("व"), syl("न")],            translit: "kamalāvana",      meaning: "lotus grove" },
  { letters: [syl("त"), syl("र","\u093E"), syl("ग"), syl("ण"), syl("म")],            translit: "tārāgaṇam",       meaning: "wave motion" },
  { letters: [syl("न"), syl("म"), syl("स"), syl("क"), syl("र")],                     translit: "namaskara",       meaning: "salutation" },
  { letters: [syl("स"), syl("र"), syl("स"), syl("व"), syl("त")],                     translit: "sarasvata",       meaning: "of Sarasvatī" },
  { letters: [syl("ज","\u0940"), syl("व"), syl("न"), syl("म"), syl("य")],            translit: "jīvanamaya",      meaning: "full of life" },
  { letters: [syl("क"), syl("र","\u0941"), syl("ण"), syl("ल"), syl("य")],            translit: "karuṇālaya",      meaning: "abode of compassion" },
  { letters: [syl("न","\u0940"), syl("ल"), syl("क"), syl("ण"), syl("ठ")],            translit: "nīlakaṇṭha",      meaning: "blue-throated" },
  { letters: [syl("स","\u0941"), syl("ध"), syl("र"), syl("म"), syl("न")],            translit: "sudharmana",      meaning: "righteous one" },
  { letters: [syl("स"), syl("व","\u093F"), syl("त"), syl("र"), syl("ण")],            translit: "savitaraṇa",      meaning: "of the sun" },
  { letters: [syl("म"), syl("ह","\u093E"), syl("व"), syl("न"), syl("म")],            translit: "mahāvanam",       meaning: "great forest" },
  { letters: [syl("द","\u0940"), syl("प"), syl("क"), syl("ल"), syl("म")],            translit: "dīpakalam",       meaning: "lamp art" },
  { letters: [syl("व"), syl("न"), syl("द"), syl("व"), syl("त")],                     translit: "vanadavata",      meaning: "forest deity" },
];
