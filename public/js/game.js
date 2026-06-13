import { sylEqual } from "./transliteration.js";
import { WORD_LIST } from "./words.js";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

// ── Scoring ───────────────────────────────────────────────────
// Returns array of "correct" | "present" | "absent" for each position.
export function scoreGuess(guess, answer) {
  const result  = Array(WORD_LENGTH).fill("absent");
  const ansCopy = answer.map(s => ({ ...s }));
  const gusCopy = guess.map(s => ({ ...s }));

  // Pass 1: exact matches
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (sylEqual(gusCopy[i], ansCopy[i])) {
      result[i]  = "correct";
      ansCopy[i] = null;
      gusCopy[i] = null;
    }
  }

  // Pass 2: present-but-wrong-position
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (gusCopy[i] !== null) {
      const idx = ansCopy.findIndex(a => a !== null && sylEqual(a, gusCopy[i]));
      if (idx !== -1) {
        result[i]    = "present";
        ansCopy[idx] = null;
      }
    }
  }

  return result;
}

// ── Game state factory ────────────────────────────────────────
export function createGame() {
  const secret = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

  return {
    secret,
    guesses:      [],   // array of { syllables: syl[], result: string[] }
    currentGuess: [],   // syl[] being built right now
    isOver:       false,
    wonOn:        null, // guess index (0-based) if won, else null

    // Add a completed syllable to the current guess (if room)
    pushSyllable(s) {
      if (this.currentGuess.length < WORD_LENGTH) {
        this.currentGuess.push(s);
      }
    },

    // Pop the last committed syllable from the current guess
    popSyllable() {
      this.currentGuess.pop();
    },

    // Submit the current guess; returns { result, won, lost } or null if invalid
    submit() {
      if (this.currentGuess.length < WORD_LENGTH) return null;

      const syllables = [...this.currentGuess];
      const result    = scoreGuess(syllables, this.secret.letters);
      const won       = result.every(r => r === "correct");

      this.guesses.push({ syllables, result });
      this.currentGuess = [];

      if (won) {
        this.isOver = true;
        this.wonOn  = this.guesses.length - 1;
      } else if (this.guesses.length >= MAX_GUESSES) {
        this.isOver = true;
      }

      return { result, won, lost: this.isOver && !won };
    },
  };
}
