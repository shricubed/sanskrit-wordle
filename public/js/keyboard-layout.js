// ── On-screen keyboard layout ─────────────────────────────────
// type: "cons" | "vowel" | "action"
// dev:  Devanagari display string  (used as the akshara base when tapped)
// rom:  Roman hint shown beneath each key

const V = "\u094D"; // virama

export const KB_ROWS = [
  [
    { type:"cons", dev:"क", rom:"k"  }, { type:"cons", dev:"ख", rom:"kh" },
    { type:"cons", dev:"ग", rom:"g"  }, { type:"cons", dev:"घ", rom:"gh" },
    { type:"cons", dev:"ङ", rom:"ng" }, { type:"cons", dev:"च", rom:"ch" },
    { type:"cons", dev:"छ", rom:"Ch" }, { type:"cons", dev:"ज", rom:"j"  },
    { type:"cons", dev:"झ", rom:"jh" }, { type:"cons", dev:"ञ", rom:"ny" },
  ],
  [
    { type:"cons", dev:"ट", rom:"T"  }, { type:"cons", dev:"ठ", rom:"Th" },
    { type:"cons", dev:"ड", rom:"D"  }, { type:"cons", dev:"ढ", rom:"Dh" },
    { type:"cons", dev:"ण", rom:"N"  }, { type:"cons", dev:"त", rom:"t"  },
    { type:"cons", dev:"थ", rom:"th" }, { type:"cons", dev:"द", rom:"d"  },
    { type:"cons", dev:"ध", rom:"dh" }, { type:"cons", dev:"न", rom:"n"  },
  ],
  [
    { type:"cons", dev:"प", rom:"p"  }, { type:"cons", dev:"फ", rom:"ph" },
    { type:"cons", dev:"ब", rom:"b"  }, { type:"cons", dev:"भ", rom:"bh" },
    { type:"cons", dev:"म", rom:"m"  }, { type:"cons", dev:"य", rom:"y"  },
    { type:"cons", dev:"र", rom:"r"  }, { type:"cons", dev:"ल", rom:"l"  },
    { type:"cons", dev:"व", rom:"v"  }, { type:"cons", dev:"स", rom:"s"  },
  ],
  [
    { type:"cons", dev:"श", rom:"sh" }, { type:"cons", dev:"ष", rom:"Sh" },
    { type:"cons", dev:"ह", rom:"h"  }, { type:"cons", dev:"म्", rom:"M" },
  ],
  // ── Common conjuncts ──────────────────────────────────────────
  [
    { type:"cons", dev:"क"+V+"ष", rom:"kSh" },  // क्ष
    { type:"cons", dev:"त"+V+"र", rom:"tr"  },  // त्र
    { type:"cons", dev:"ज"+V+"ञ", rom:"jn"  },  // ज्ञ
    { type:"cons", dev:"श"+V+"र", rom:"shr" },  // श्र
    { type:"cons", dev:"द"+V+"व", rom:"dv"  },  // द्व
    { type:"cons", dev:"द"+V+"र", rom:"dr"  },  // द्र
    { type:"cons", dev:"प"+V+"र", rom:"pr"  },  // प्र
    { type:"cons", dev:"ब"+V+"र", rom:"br"  },  // ब्र
    { type:"cons", dev:"ग"+V+"र", rom:"gr"  },  // ग्र
    { type:"cons", dev:"स"+V+"त", rom:"st"  },  // स्त
    { type:"cons", dev:"स"+V+"व", rom:"sv"  },  // स्व
    { type:"cons", dev:"व"+V+"य", rom:"vy"  },  // व्य
    { type:"cons", dev:"त"+V+"व", rom:"tv"  },  // त्व
    { type:"cons", dev:"न"+V+"त", rom:"nt"  },  // न्त
    { type:"cons", dev:"न"+V+"द", rom:"nd"  },  // न्द
  ],
  // ── Vowels / mātrās ───────────────────────────────────────────
  [
    { type:"vowel",  dev:"अ", rom:"a"  }, { type:"vowel",  dev:"आ", rom:"aa" },
    { type:"vowel",  dev:"इ", rom:"i"  }, { type:"vowel",  dev:"ई", rom:"ii" },
    { type:"vowel",  dev:"उ", rom:"u"  }, { type:"vowel",  dev:"ऊ", rom:"uu" },
    { type:"action", dev:"ENTER", rom:"" },
    { type:"action", dev:"DEL",   rom:"" },
  ],
];

// The index of the vowel row (used by ui.js to insert the section label)
export const VOWEL_ROW_INDEX = KB_ROWS.length - 1;
// The index of the conjunct row
export const CONJUNCT_ROW_INDEX = KB_ROWS.length - 2;
