// ── On-screen keyboard layout ─────────────────────────────────
// type: "cons" | "vowel" | "action"
// dev:  Devanagari display string
// rom:  Roman hint shown beneath each key

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
  // Vowel / mātrā row
  [
    { type:"vowel",  dev:"अ", rom:"a"  }, { type:"vowel",  dev:"आ", rom:"aa" },
    { type:"vowel",  dev:"इ", rom:"i"  }, { type:"vowel",  dev:"ई", rom:"ii" },
    { type:"vowel",  dev:"उ", rom:"u"  }, { type:"vowel",  dev:"ऊ", rom:"uu" },
    { type:"action", dev:"ENTER", rom:"" },
    { type:"action", dev:"DEL",   rom:"" },
  ],
];
