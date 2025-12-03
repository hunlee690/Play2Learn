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
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

// XP / Level state (for hero card)
let totalXP = 0;
let currentStreak = 0;
let bestStreak = 0;

// ========== DOM ELEMENTS ==========
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

document.getElementById("year").textContent = new Date().getFullYear();

// ========== EVENT LISTENERS ==========
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => startQuiz(card.dataset.category));
});

document.getElementById("startAnyQuizBtn").addEventListener("click", () => {
  const keys = Object.keys(quizzes);
  startQuiz(keys[Math.floor(Math.random() * keys.length)]);
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  currentIndex < currentQuestions.length ? renderQuestion() : endQuiz();
});

playAgainBtn.addEventListener("click", () => startQuiz(currentCategory));

// ========== QUIZ FUNCTIONS ==========
function startQuiz(category) {
  currentCategory = category;
  currentQuestions = shuffleArray([...quizzes[category].questions]);
  currentIndex = 0;
  score = 0;
  currentStreak = 0;
  updateScoreUI();

  quizTitle.textContent = quizzes[category].title;
  quizCard.style.display = "block";
  quizResult.style.display = "none";
  renderQuestion();
}

function renderQuestion() {
  const q = currentQuestions[currentIndex];
  quizQuestion.textContent = q.question;
  quizProgressText.textContent = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
  quizOptions.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

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
    feedbackEl.textContent = "Correct! 🎉";
    score += 10;
    totalXP += 10;
    currentStreak++;
  } else {
    feedbackEl.textContent = "Oops! Try the next one.";
    currentStreak = 0;
  }

  if (currentStreak > bestStreak) {
    bestStreak = currentStreak;
  }

  updateScoreUI();
  updateXPUI();

  nextBtn.disabled = false;
}

function endQuiz() {
  quizResult.style.display = "block";
  const totalQ = currentQuestions.length;
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
  scoreDisplay.textContent = `Score: ${score}`;
  correctCountEl.textContent = Math.floor(totalXP / 10);
  bestStreakEl.textContent = bestStreak;
}

function updateXPUI() {
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
