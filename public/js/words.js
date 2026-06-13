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

  // ── Words with conjunct consonants ───────────────────────────
  // V = virama \u094D

  // क्ष (kSh) — kṣetra: field/domain
  { letters: [syl("क\u094Dष"), syl("त"), syl("र"), syl("य"), syl("म")],            translit: "kṣetrayam",       meaning: "of the field" },
  // क्ष + mātrā example: kṣama = forgiveness
  { letters: [syl("क\u094Dष"), syl("म"), syl("व"),syl("र"), syl("त")],             translit: "kṣamavrata",      meaning: "vow of patience" },

  // त्र (tr) — traya = triad
  { letters: [syl("त\u094Dर"), syl("य"), syl("न"), syl("म"), syl("व")],            translit: "trayanamava",     meaning: "triad homage" },
  // त्र in mātra: trāṇa = protection
  { letters: [syl("त\u094Dर","\u093E"), syl("ण"), syl("म"), syl("य"), syl("न")],   translit: "trāṇamayana",     meaning: "path of protection" },

  // ज्ञ (jn) — jñāna = knowledge
  { letters: [syl("ज\u094Dञ","\u093E"), syl("न"), syl("य"), syl("ग"), syl("म")],   translit: "jñānayogam",      meaning: "path of knowledge" },
  // ज्ञ plain: jñāta = known
  { letters: [syl("ज\u094Dञ"),syl("त"),syl("व"),syl("र"),syl("न")],                translit: "jñatavarna",      meaning: "of known colour" },

  // श्र (shr) — śraddhā = faith
  { letters: [syl("श\u094Dर"), syl("द"), syl("ध"), syl("व"), syl("न")],            translit: "śraddhāvana",     meaning: "forest of faith" },

  // प्र (pr) — prakāśa = light/radiance
  { letters: [syl("प\u094Dर"), syl("क"),syl("श"), syl("म"), syl("न")],             translit: "prakāśamana",     meaning: "shining mind" },
  // प्र + ā: prāṇa = breath/life-force
  { letters: [syl("प\u094Dर","\u093E"), syl("ण"), syl("म"), syl("य"), syl("न")],   translit: "prāṇamayana",     meaning: "breath-path" },

  // द्व (dv) — dvāra = gate/door
  { letters: [syl("द\u094Dव","\u093E"), syl("र"), syl("म"), syl("ग"), syl("न")],   translit: "dvāramagana",     meaning: "gateway song" },

  // स्व (sv) — svarga = heaven
  { letters: [syl("स\u094Dव"), syl("र"), syl("ग"), syl("म"), syl("न")],            translit: "svargamana",      meaning: "ascent to heaven" },

  // स्त (st) — stava = hymn of praise
  { letters: [syl("स\u094Dत"), syl("व"), syl("न"), syl("म"), syl("य")],            translit: "stavanaya",       meaning: "way of hymns" },

  // त्व (tv) — tattvam = that-ness/essence
  { letters: [syl("त\u094Dव"), syl("म"), syl("र"), syl("ग"), syl("न")],            translit: "tvamargana",      meaning: "search for self" },

  // व्य (vy) — vyoma = sky/ether
  { letters: [syl("व\u094Dय"), syl("ओ"), syl("म"), syl("त"), syl("ल")],           translit: "vyomātala",       meaning: "sky floor" },
];
