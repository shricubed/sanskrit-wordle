# शब्द — Sanskrit Wordle

A Wordle-style game using Sanskrit words and Devanagari script, with a Roman transliteration input engine.

## Setup

```bash
npm install
npm start
```

Then open http://localhost:3000

For development with auto-restart on file changes:

```bash
npm run dev
```

## Project structure

```
shabd/
├── src/
│   └── server.js            # Express server
├── public/
│   ├── index.html           # Game UI (no inline JS/CSS)
│   ├── css/
│   │   └── style.css        # All styles
│   └── js/
│       ├── main.js          # Entry point — wires everything together
│       ├── game.js          # Game state and scoring logic
│       ├── ime.js           # Roman→Devanagari input method engine
│       ├── transliteration.js  # Syllable model and lookup tables
│       ├── words.js         # Sanskrit word list
│       └── keyboard-layout.js  # On-screen keyboard definition
└── package.json
```

## How input works

The IME (input method engine) in `ime.js` runs a three-phase state machine:

- **idle** — nothing pending
- **cons** — accumulating a Roman consonant sequence (e.g. `k`, waiting to see if `h` follows to make `kh`)
- **vowel** — consonant resolved, waiting for a vowel to attach as a mātrā

Each committed syllable is `{ base, matra }` — a Devanagari consonant plus an optional diacritic. Two syllables are equal only if both fields match, so `म` (ma) and `मा` (mā) are distinct tiles.

## Roman input map

| Type | Roman | Examples |
|---|---|---|
| Stops | `k kh g gh` | क ख ग घ |
| Retroflex | `T Th D Dh N` | ट ठ ड ढ ण |
| Dental | `t th d dh n` | त थ द ध न |
| Labial | `p ph b bh m` | प फ ब भ म |
| Affricates | `ch j jh` | च ज झ |
| Sibilants | `sh Sh s` | श ष स |
| Sonorants | `y r l v h` | य र ल व ह |
| Short vowels | `a i u` | अ इ उ |
| Long vowels | `aa ii uu` | आ ई ऊ |
| Anusvara | `M` | म् |
