import { IME } from "./ime.js";
import { createGame, WORD_LENGTH, MAX_GUESSES } from "./game.js";
import {
  renderHistory, renderInput, renderAttemptsLabel,
  revealRow, bounceRow, shakeInputBox,
  showToast, showEndModal,
  buildKeyboard, wireModals,
} from "./ui.js";

// ── App state ─────────────────────────────────────────────────
let game = null;
let ime  = null;

// ── Bootstrap ─────────────────────────────────────────────────
function init() {
  game = createGame();

  ime = new IME({
    onPush(syllable) {
      game.pushSyllable(syllable);
    },
    onRender() {
      renderInput(game.currentGuess, ime.getPendingDisplay());
    },
  });

  renderHistory(game.guesses);
  renderInput(game.currentGuess, null);
  renderAttemptsLabel(game.guesses.length);
  buildKeyboard(handleScreenKey);
  document.getElementById("end-modal").classList.remove("open");
  document.getElementById("input-box").classList.add("active");
}

// ── Screen key handler ────────────────────────────────────────
function handleScreenKey(type, dev) {
  if (!game || game.isOver) return;

  if (dev === "DEL")   { handleDelete(); return; }
  if (dev === "ENTER") { ime.commitPending(); submitGuess(); return; }

  if (type === "cons")  { ime.handleScreenConsonant(dev); return; }
  if (type === "vowel") { ime.handleScreenVowel(dev); return; }
}

// ── Delete ────────────────────────────────────────────────────
function handleDelete() {
  if (!game || game.isOver) return;

  const consumed = ime.deletePending();
  if (!consumed) {
    game.popSyllable();
    renderInput(game.currentGuess, null);
  }
}

// ── Submit guess ──────────────────────────────────────────────
function submitGuess() {
  if (!game || game.isOver) return;

  if (game.currentGuess.length < WORD_LENGTH) {
    shakeInputBox();
    showToast("५ अक्षर चाहिए — 5 syllables needed");
    return;
  }

  const outcome = game.submit();
  if (!outcome) return;

  const rowIdx = game.guesses.length - 1;

  renderHistory(game.guesses);
  renderInput(game.currentGuess, null);
  renderAttemptsLabel(game.guesses.length);

  revealRow(rowIdx, game.guesses[rowIdx], outcome.result, () => {
    if (outcome.won) {
      bounceRow(rowIdx);
      const msgs = [
        "अद्भुत! Brilliant!", "साधु! Excellent!", "सुन्दर! Beautiful!",
        "जय! Victory!", "बहुत अच्छा! Very good!", "वाह! Superb!",
      ];
      setTimeout(
        () => showEndModal(true, msgs[Math.min(rowIdx, msgs.length - 1)], game.secret),
        1200,
      );
    } else if (outcome.lost) {
      setTimeout(() => showEndModal(false, "न जाने — Not known", game.secret), 800);
    }
  });
}

// ── Physical keyboard ─────────────────────────────────────────
document.addEventListener("keydown", e => {
  if (!game || game.isOver) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  if (e.key === "Enter")     { ime.commitPending(); submitGuess(); return; }
  if (e.key === "Backspace") { handleDelete(); return; }
  if (e.key.length === 1)    { ime.handleRomanKey(e.key); }
});

// ── Del / Enter buttons ───────────────────────────────────────
document.getElementById("btn-del").addEventListener("click", handleDelete);
document.getElementById("btn-enter").addEventListener("click", () => {
  ime.commitPending();
  submitGuess();
});

// ── Modals ────────────────────────────────────────────────────
wireModals(() => init());

// ── Go ────────────────────────────────────────────────────────
init();
