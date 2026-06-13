import { sylDisplay } from "./transliteration.js";
import { KB_ROWS } from "./keyboard-layout.js";
import { WORD_LENGTH, MAX_GUESSES } from "./game.js";

// ── DOM helpers ───────────────────────────────────────────────
const $  = id => document.getElementById(id);
const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };

// ── History (completed guess rows) ───────────────────────────
export function renderHistory(guesses) {
  const hist = $("history");
  hist.innerHTML = "";
  guesses.forEach(({ syllables }) => {
    const row = el("div", "hist-row");
    syllables.forEach(s => {
      const t = el("div", "tile");
      t.textContent = sylDisplay(s);
      row.appendChild(t);
    });
    hist.appendChild(row);
  });
}

// ── Input box ─────────────────────────────────────────────────
export function renderInput(currentGuess, pendingDisplay) {
  const textEl      = $("input-text");
  const placeholder = $("input-placeholder");
  const counter     = $("syl-counter");

  const committed = currentGuess.map(sylDisplay).join("");
  const pendingStr = pendingDisplay
    ? pendingDisplay.base + pendingDisplay.matra
    : "";

  textEl.innerHTML = "";

  if (committed) {
    const cs = el("span", "committed");
    cs.textContent = committed;
    textEl.appendChild(cs);
  }
  if (pendingStr) {
    const ps = el("span", "pending");
    ps.textContent = pendingStr;
    textEl.appendChild(ps);
  }

  placeholder.style.opacity = (committed || pendingStr) ? "0" : "1";

  const n = currentGuess.length + (pendingDisplay ? 1 : 0);
  counter.textContent = `${n}/5`;
  counter.classList.toggle("full", n === WORD_LENGTH);
}

// ── Reveal animation for a completed row ─────────────────────
export function revealRow(rowIdx, guess, result, onDone) {
  const rowEl = $("history").children[rowIdx];
  const DELAY = 330;

  for (let c = 0; c < WORD_LENGTH; c++) {
    const tile = rowEl.children[c];
    setTimeout(() => {
      tile.classList.add("flip");
      setTimeout(() => {
        tile.dataset.state = result[c];
        updateKeyState(guess.syllables[c], result[c]);
      }, 200);
    }, c * DELAY);
  }

  setTimeout(onDone, WORD_LENGTH * DELAY + 200);
}

// ── Win bounce animation ──────────────────────────────────────
export function bounceRow(rowIdx) {
  const rowEl = $("history").children[rowIdx];
  for (let c = 0; c < WORD_LENGTH; c++) {
    setTimeout(() => rowEl.children[c].classList.add("bounce"), c * 90);
  }
}

// ── Shake the input box ───────────────────────────────────────
export function shakeInputBox() {
  const box = $("input-box");
  box.classList.remove("shake");
  void box.offsetWidth; // reflow to restart animation
  box.classList.add("shake");
}

// ── Attempts label ────────────────────────────────────────────
export function renderAttemptsLabel(guessCount) {
  $("attempts-label").textContent = guessCount
    ? `Attempt ${guessCount} of ${MAX_GUESSES}`
    : "";
}

// ── Toast ─────────────────────────────────────────────────────
let _toastTimer;
export function showToast(msg, duration = 1800) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove("show"), duration);
}

// ── End modal ─────────────────────────────────────────────────
export function showEndModal(won, message, secret) {
  $("result-emoji").textContent  = won ? "🏆" : "📖";
  $("result-title").textContent  = message;
  $("answer-word").textContent   = secret.letters.map(sylDisplay).join("");
  $("answer-translit").textContent = secret.translit;
  $("answer-meaning").textContent  = `"${secret.meaning}"`;
  $("end-modal").classList.add("open");
}

// ── Keyboard ──────────────────────────────────────────────────
export function buildKeyboard(onKey) {
  const kb = $("keyboard");
  kb.innerHTML = "";

  KB_ROWS.forEach((row, ri) => {
    if (ri === KB_ROWS.length - 1) {
      const lbl = el("div", "kb-section-label");
      lbl.textContent = "Vowels / Mātrās";
      kb.appendChild(lbl);
    }

    const div = el("div", "kb-row");
    row.forEach(({ type, dev, rom }) => {
      const btn      = el("button", "key" + (type === "vowel" ? " matra-key" : ""));
      btn.dataset.key  = dev;
      btn.dataset.type = type;

      if (type === "action") {
        btn.textContent = dev === "DEL" ? "⌫ Del" : "↵ Enter";
        btn.style.cssText = "min-width:64px;font-family:'Cinzel',serif;font-size:0.7rem;letter-spacing:0.05em;";
      } else {
        const ds = el("span", "key-devanagari"); ds.textContent = dev;
        const rs = el("span", "key-roman");       rs.textContent = rom;
        btn.appendChild(ds);
        btn.appendChild(rs);
      }

      btn.addEventListener("click", () => onKey(type, dev));
      div.appendChild(btn);
    });

    kb.appendChild(div);
  });
}

// Update the colour state on a keyboard key based on its consonant base
export function updateKeyState(syllable, state) {
  const priority = { correct: 3, present: 2, absent: 1 };
  const btn = document.querySelector(`.key[data-key="${syllable.base}"]`);
  if (!btn) return;
  const cur = btn.dataset.state;
  if (!cur || priority[state] > (priority[cur] || 0)) btn.dataset.state = state;
}

// ── Modal wiring ──────────────────────────────────────────────
export function wireModals(onPlayAgain) {
  $("help-btn").addEventListener("click",
    () => $("help-modal").classList.add("open"));
  $("help-close").addEventListener("click",
    () => $("help-modal").classList.remove("open"));
  $("help-modal").addEventListener("click",
    e => { if (e.target === e.currentTarget) e.currentTarget.classList.remove("open"); });
  $("end-modal").addEventListener("click",
    e => { if (e.target === e.currentTarget) e.currentTarget.classList.remove("open"); });
  $("play-again-btn").addEventListener("click", onPlayAgain);
}
