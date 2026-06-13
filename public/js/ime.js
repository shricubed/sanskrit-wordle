import {
  syl, sylDisplay,
  lookupConsonant, lookupVowel, lookupSpecial,
  consonantCanExtend, vowelCanExtend,
  VOWEL_LETTER_TO_MATRA,
} from "./transliteration.js";

// ══════════════════════════════════════════════════════════════
//  IME STATE MACHINE
//
//  Converts Roman keystrokes → Devanagari syllables in real time.
//
//  Phases:
//    "idle"  — nothing pending
//    "cons"  — accumulating Roman consonant chars (e.g. "k" waiting for "h")
//    "vowel" — consonant resolved, waiting for a vowel mātrā
//
//  Public API:
//    ime.handleRomanKey(char)        process a physical keypress
//    ime.handleScreenConsonant(dev)  on-screen consonant key tapped
//    ime.handleScreenVowel(dev)      on-screen vowel/mātrā key tapped
//    ime.commitPending()             flush any half-typed syllable
//    ime.deletePending()             backspace one step inside the pending syllable
//                                    returns true if it consumed the event,
//                                    false if the caller should pop a committed syllable
//    ime.reset()                     clear all pending state
//    ime.getPendingDisplay()         { base, matra } of in-progress syllable, or null
// ══════════════════════════════════════════════════════════════

export class IME {
  constructor({ onPush, onRender }) {
    this._onPush   = onPush;
    this._onRender = onRender;
    this._phase       = "idle";
    this._consBuf     = "";
    this._vowelBuf    = "";
    this._pendingBase = "";
  }

  reset() {
    this._phase       = "idle";
    this._consBuf     = "";
    this._vowelBuf    = "";
    this._pendingBase = "";
    this._onRender?.();
  }

  // Returns the in-progress syllable for display, or null if nothing pending.
  getPendingDisplay() {
    if (this._phase === "vowel" && this._pendingBase) {
      const vinfo = lookupVowel(this._vowelBuf);
      return { base: this._pendingBase, matra: vinfo ? vinfo.matra : "" };
    }
    if (this._phase === "cons" && this._consBuf) {
      const partial = lookupConsonant(this._consBuf);
      return partial ? { base: partial, matra: "" } : null;
    }
    if (this._phase === "vowel" && !this._pendingBase && this._vowelBuf) {
      const vinfo = lookupVowel(this._vowelBuf);
      return vinfo ? { base: vinfo.standalone, matra: "" } : null;
    }
    return null;
  }

  // Backspace one step inside any pending state.
  // Returns true if it consumed the event (caller should NOT pop a committed syl).
  // Returns false if there was nothing pending (caller should pop committed syl).
  deletePending() {
    if (this._phase === "vowel" && this._vowelBuf.length > 0) {
      this._vowelBuf = this._vowelBuf.slice(0, -1);
      this._onRender?.();
      return true;
    }
    if (this._phase === "vowel" && this._vowelBuf.length === 0 && this._pendingBase) {
      // Vowel cleared — drop back to idle, losing the pending consonant
      this._phase       = "idle";
      this._pendingBase = "";
      this._onRender?.();
      return true;
    }
    if (this._phase === "cons" && this._consBuf.length > 0) {
      this._consBuf = this._consBuf.slice(0, -1);
      if (this._consBuf.length === 0) this._phase = "idle";
      this._onRender?.();
      return true;
    }
    return false; // nothing pending, caller must pop a committed syllable
  }

  // ── Commit anything pending as a full syllable ──────────────
  commitPending() {
    if (this._phase === "cons" && this._consBuf) {
      const c = lookupConsonant(this._consBuf);
      if (c) this._push(syl(c, ""));
    } else if (this._phase === "vowel") {
      const vinfo = lookupVowel(this._vowelBuf)
                 || lookupVowel(this._vowelBuf.slice(0, -1));
      const matra = vinfo ? vinfo.matra : "";
      if (this._pendingBase)  this._push(syl(this._pendingBase, matra));
      else if (vinfo)         this._push(syl(vinfo.standalone, ""));
    }
    this._clearPending();
  }

  // ── Physical Roman keypress ──────────────────────────────────
  handleRomanKey(char) {
    const sp = lookupSpecial(char);
    if (sp) {
      this.commitPending();
      this._push(syl(sp.standalone, ""));
      return;
    }

    if (this._phase === "idle" || this._phase === "cons") {
      const newBuf    = this._consBuf + char;
      const consMatch = lookupConsonant(newBuf);

      if (consMatch) {
        if (consonantCanExtend(newBuf)) {
          this._phase   = "cons";
          this._consBuf = newBuf;
          this._onRender?.();
          return;
        }
        this._pendingBase = consMatch;
        this._phase       = "vowel";
        this._consBuf     = "";
        this._vowelBuf    = "";
        this._onRender?.();
        return;
      }

      if (consonantCanExtend(newBuf)) {
        this._phase   = "cons";
        this._consBuf = newBuf;
        this._onRender?.();
        return;
      }

      if (this._consBuf.length > 0) {
        const partial = lookupConsonant(this._consBuf);
        if (partial) {
          this._pendingBase = partial;
          this._consBuf     = "";
          this._phase       = "vowel";
          this._vowelBuf    = "";
          this._handleVowelOrNewCons(char);
          return;
        }
        this._phase   = "idle";
        this._consBuf = "";
      }

      const vowStart = lookupVowel(char);
      const vowGrow  = vowelCanExtend(char);
      if (vowStart || vowGrow) {
        this._phase       = "vowel";
        this._vowelBuf    = char;
        this._pendingBase = "";
        if (vowStart && !vowGrow) {
          this._push(syl(vowStart.standalone, ""));
          this._clearPending();
          return;
        }
        this._onRender?.();
        return;
      }

      this._onRender?.();
      return;
    }

    if (this._phase === "vowel") {
      this._handleVowelOrNewCons(char);
    }
  }

  // ── On-screen consonant key ──────────────────────────────────
  handleScreenConsonant(dev) {
    this.commitPending();
    if (dev === "म्") {
      this._push(syl("म्", ""));
      return;
    }
    this._pendingBase = dev;
    this._phase       = "vowel";
    this._consBuf     = "";
    this._vowelBuf    = "";
    this._onRender?.();
  }

  // ── On-screen vowel/mātrā key ────────────────────────────────
  handleScreenVowel(dev) {
    const matra = VOWEL_LETTER_TO_MATRA[dev];
    if (matra === undefined) return;

    if (this._phase === "vowel" && this._pendingBase) {
      this._push(syl(this._pendingBase, matra));
      this._clearPending();
    } else if (this._phase === "cons" && this._consBuf) {
      const c = lookupConsonant(this._consBuf);
      if (c) this._push(syl(c, matra));
      this._clearPending();
    } else {
      this._push(syl(dev, ""));
      this._clearPending();
    }
  }

  // ── Internal helpers ─────────────────────────────────────────
  _push(syllable) {
    this._onPush?.(syllable);
  }

  _clearPending() {
    this._phase       = "idle";
    this._consBuf     = "";
    this._vowelBuf    = "";
    this._pendingBase = "";
    this._onRender?.();
  }

  _handleVowelOrNewCons(char) {
    const candidate = this._vowelBuf + char;
    const vFull     = lookupVowel(candidate);
    const vGrow     = vowelCanExtend(candidate);

    if (vFull && !vGrow) {
      if (this._pendingBase) this._push(syl(this._pendingBase, vFull.matra));
      else                   this._push(syl(vFull.standalone, ""));
      this._clearPending();
      return;
    }

    if (vFull || vGrow) {
      this._vowelBuf = candidate;
      this._onRender?.();
      return;
    }

    // char doesn't extend vowel — commit what we have, restart with char
    const vCur = lookupVowel(this._vowelBuf);
    if (vCur) {
      if (this._pendingBase) this._push(syl(this._pendingBase, vCur.matra));
      else                   this._push(syl(vCur.standalone, ""));
    } else if (this._pendingBase) {
      this._push(syl(this._pendingBase, ""));
    }
    this._clearPending();
    this.handleRomanKey(char);
  }
}
