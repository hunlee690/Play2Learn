// ========== QUIZ QUESTIONS ==========
const quizzes = {
  math: {
    title: "Math Adventures",
    questions: [
      { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], correctIndex: 2 },
      { question: "Which number is even?", options: ["3", "9", "14", "15"], correctIndex: 2 },
      { question: "What is 9 - 4?", options: ["3", "4", "5", "6"], correctIndex: 2 },
      { question: "What comes after 29?", options: ["28", "30", "31", "33"], correctIndex: 1 },
      { question: "Which sign means subtraction?", options: ["×", "+", "-", "÷"], correctIndex: 2 },
    ],
  },

  science: {
    title: "Science Lab",
    questions: [
      { question: "Which planet do we live on?", options: ["Mars", "Earth", "Jupiter", "Venus"], correctIndex: 1 },
      { question: "Which animal can fly?", options: ["Dog", "Elephant", "Eagle", "Whale"], correctIndex: 2 },
      { question: "Water freezes into…", options: ["Steam", "Ice", "Clouds", "Rain"], correctIndex: 1 },
      { question: "Which sense do we use to smell?", options: ["Eyes", "Nose", "Ears", "Hands"], correctIndex: 1 },
      { question: "The sun is a…", options: ["Planet", "Star", "Comet", "Moon"], correctIndex: 1 },
    ],
  },

  english: {
    title: "English Quest",
    questions: [
      { question: "Choose the correct spelling:", options: ["Elefant", "Elephant", "Eliphant", "Elephent"], correctIndex: 1 },
      { question: "Which word is a noun?", options: ["Run", "Happy", "Book", "Quickly"], correctIndex: 2 },
      { question: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correctIndex: 1 },
      { question: "Which is a describing word?", options: ["Jump", "Blue", "Sing", "Read"], correctIndex: 1 },
      { question: "Choose the correct sentence:", options: ["i like apples.", "I Like apples.", "I like Apples.", "I like apples."], correctIndex: 3 },
    ],
  },
};

// ========== STATE ==========
let currentCategory = null;
let currentMode = "default";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

// XP / Level state (for hero card)
let totalXP = 0;
let currentStreak = 0;
let bestStreak = 0;

// ========== DOM ELEMENTS ==========
const body = document.body;
const subjectName = body.dataset.subject || null; // "math" / "science" / "english" only on subject pages

const quizCard = document.getElementById("quizCard");
const quizTitle = document.getElementById("quizTitle");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizProgressText = document.getElementById("quizProgressText");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const quizResult = document.getElementById("quizResult");
const resultTitle = document.getElementById("resultTitle");
const resultSummary = document.getElementById("resultSummary");
const starRow = document.getElementById("starRow");
const playAgainBtn = document.getElementById("playAgainBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

// Hero card DOM
const xpValueEl = document.getElementById("xpValue");
const xpProgressEl = document.getElementById("xpProgress");
const levelBadgeEl = document.getElementById("levelBadge");
const correctCountEl = document.getElementById("correctCount");
const bestStreakEl = document.getElementById("bestStreak");

// Year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ========== EVENT LISTENERS ==========

// Subject or mode cards
const categoryCards = document.querySelectorAll(".category-card");

if (!subjectName) {
  // ---- HOME PAGE: cards = subjects → go to subject pages ----
  categoryCards.forEach((card) => {
    const category = card.dataset.category; // "math", "science", "english"
    if (!category) return;

    card.addEventListener("click", () => {
      // Navigate to the subject page
      window.location.href = `${category}.html`;
    });
  });
} else {
  // ---- SUBJECT PAGE: cards = test types (modes) → start quiz ----
  categoryCards.forEach((card) => {
    const mode = card.dataset.mode || "default"; // "easy" | "speed" | "challenge"

    card.addEventListener("click", () => {
      startQuiz(subjectName, mode);
      if (quizCard) {
        quizCard.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Quick / random quiz button (exists on home + subject pages)
const startAnyQuizBtn = document.getElementById("startAnyQuizBtn");
if (startAnyQuizBtn) {
  startAnyQuizBtn.addEventListener("click", () => {
    if (!subjectName) {
      // Home: random subject, fixed mode (speed)
      const keys = Object.keys(quizzes);
      const randomCat = keys[Math.floor(Math.random() * keys.length)];
      startQuiz(randomCat, "speed");
    } else {
      // Subject page: random mode for this subject
      const modes = ["easy", "speed", "challenge"];
      const randomMode = modes[Math.floor(Math.random() * modes.length)];
      startQuiz(subjectName, randomMode);
    }

    if (quizCard) {
      quizCard.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Next question button
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    currentIndex < currentQuestions.length ? renderQuestion() : endQuiz();
  });
}

// Play again button
if (playAgainBtn) {
  playAgainBtn.addEventListener("click", () => {
    if (currentCategory) {
      startQuiz(currentCategory, currentMode);
      if (quizCard) {
        quizCard.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

// ========== QUIZ FUNCTIONS ==========

function startQuiz(category, mode = "default") {
  if (!quizzes[category]) return;

  currentCategory = category;
  currentMode = mode;

  currentQuestions = getQuestionsForMode(category, mode);
  currentIndex = 0;
  score = 0;
  currentStreak = 0;
  updateScoreUI();

  if (quizTitle) {
    quizTitle.textContent = `${quizzes[category].title} · ${getModeLabel(mode)}`;
  }
  if (quizCard) {
    quizCard.style.display = "block";
  }
  if (quizResult) {
    quizResult.style.display = "none";
  }

  renderQuestion();
}

function getModeLabel(mode) {
  switch (mode) {
    case "easy":
      return "Warm-Up";
    case "speed":
      return "Speed Quiz";
    case "challenge":
      return "Challenge";
    default:
      return "Quiz";
  }
}

function getQuestionsForMode(category, mode) {
  const base = [...quizzes[category].questions];
  const shuffled = shuffleArray(base);

  if (mode === "easy") {
    return shuffled.slice(0, Math.min(3, shuffled.length));
  }
  if (mode === "speed") {
    return shuffled.slice(0, Math.min(5, shuffled.length));
  }
  if (mode === "challenge") {
    const extended = shuffled.concat(shuffleArray(base));
    return extended.slice(0, Math.min(7, extended.length));
  }

  // default mode: just shuffled full list
  return shuffled;
}

function renderQuestion() {
  const q = currentQuestions[currentIndex];
  if (!q) return;

  if (quizQuestion) {
    quizQuestion.textContent = q.question;
  }
  if (quizProgressText) {
    quizProgressText.textContent = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
  }
  if (quizOptions) {
    quizOptions.innerHTML = "";
  }
  if (feedbackEl) {
    feedbackEl.textContent = "";
  }
  if (nextBtn) {
    nextBtn.disabled = true;
  }

  q.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => handleAnswer(index));
    quizOptions.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  const q = currentQuestions[currentIndex];
  const correct = selectedIndex === q.correctIndex;

  document.querySelectorAll(".option-btn").forEach((btn, idx) => {
    btn.classList.add("disabled");
    if (idx === q.correctIndex) btn.classList.add("correct");
    if (idx === selectedIndex && !correct) btn.classList.add("wrong");
  });

  if (correct) {
    if (feedbackEl) feedbackEl.textContent = "Correct! 🎉";
    score += 10;
    totalXP += 10;
    currentStreak++;
  } else {
    if (feedbackEl) feedbackEl.textContent = "Oops! Try the next one.";
    currentStreak = 0;
  }

  if (currentStreak > bestStreak) {
    bestStreak = currentStreak;
  }

  updateScoreUI();
  updateXPUI();

  if (nextBtn) {
    nextBtn.disabled = false;
  }
}

function endQuiz() {
  if (!quizResult) return;

  quizResult.style.display = "block";

  const totalQ = currentQuestions.length || 1;
  const percent = (score / (totalQ * 10)) * 100;

  if (percent >= 80) starRow.textContent = "⭐️⭐️⭐️";
  else if (percent >= 50) starRow.textContent = "⭐️⭐️";
  else starRow.textContent = "⭐️";

  resultTitle.textContent =
    percent >= 80 ? "Amazing!" : percent >= 50 ? "Great job!" : "Nice try!";
  resultSummary.textContent = `You scored ${score} points (${score / 10} / ${totalQ} correct).`;
}

// ========== UI HELPERS ==========

function updateScoreUI() {
  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${score}`;
  }
  if (correctCountEl) {
    correctCountEl.textContent = Math.floor(totalXP / 10);
  }
  if (bestStreakEl) {
    bestStreakEl.textContent = bestStreak;
  }
}

function updateXPUI() {
  if (!xpValueEl || !xpProgressEl || !levelBadgeEl) return;

  xpValueEl.textContent = `${totalXP} XP`;

  // Simple level system: every 50 XP = next level
  const level = Math.max(1, Math.floor(totalXP / 50) + 1);
  const currentLevelXP = (level - 1) * 50;
  const nextLevelXP = level * 50;
  const progress = Math.min(
    100,
    ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
  );

  xpProgressEl.style.width = `${progress}%`;

  let title = "Rookie";
  if (level >= 4 && level < 7) title = "Explorer";
  else if (level >= 7) title = "Genius";

  levelBadgeEl.textContent = `Level ${level} · ${title}`;
}

// ========== HELPERS ==========
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
