// =========================
// Year in footer
// =========================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =========================
// LESSON DATA (EDIT THIS)
// =========================
const LESSONS = {
  grammar: {
    label: "Grammar",
    items: [
      {
        id: "noun",
        title: "Noun",
        desc: "Learn what nouns are and identify them in sentences.",
        youtubeId: "dQw4w9WgXcQ", // <-- replace
        quiz: [
          { question: "Which word is a noun?", options: ["Run", "Blue", "Cat", "Quickly"], correctIndex: 2 },
          { question: "A noun is a…", options: ["Naming word", "Action word", "Describing word", "Joining word"], correctIndex: 0 },
          { question: "Which one is a place?", options: ["School", "Happy", "Jump", "Very"], correctIndex: 0 },
        ],
      },
      {
        id: "pronoun",
        title: "Pronoun",
        desc: "Learn pronouns and how they replace nouns.",
        youtubeId: "dQw4w9WgXcQ",
        quiz: [
          { question: "Which is a pronoun?", options: ["Ravi", "She", "Table", "Run"], correctIndex: 1 },
          { question: "Pronouns replace…", options: ["Verbs", "Nouns", "Adverbs", "Articles"], correctIndex: 1 },
          { question: "Choose the pronoun: '___ is my friend.'", options: ["Cat", "He", "Book", "Red"], correctIndex: 1 },
        ],
      },
      {
        id: "verb",
        title: "Verb",
        desc: "Understand action words and helping verbs.",
        youtubeId: "dQw4w9WgXcQ",
        quiz: [
          { question: "Which is a verb?", options: ["Laugh", "Green", "Table", "Slow"], correctIndex: 0 },
          { question: "Verb shows…", options: ["Name", "Action/State", "Place", "Thing"], correctIndex: 1 },
          { question: "Pick the verb: 'Birds ___.'", options: ["sky", "fly", "blue", "soft"], correctIndex: 1 },
        ],
      },
      // add more: adjective, adverb, tenses, articles, prepositions...
    ],
  },

  textbook: {
    label: "Textbook",
    items: Array.from({ length: 10 }).map((_, i) => {
      const cls = i + 1;
      return {
        id: `class-${cls}`,
        title: `Class ${cls}`,
        desc: `Videos and quiz for Class ${cls}.`,
        youtubeId: "dQw4w9WgXcQ", // <-- replace per class
        quiz: [
          { question: `Class ${cls}: Sample question 1`, options: ["A", "B", "C", "D"], correctIndex: 1 },
          { question: `Class ${cls}: Sample question 2`, options: ["True", "False", "Maybe", "None"], correctIndex: 0 },
          { question: `Class ${cls}: Sample question 3`, options: ["1", "2", "3", "4"], correctIndex: 2 },
        ],
      };
    }),
  },
};

// =========================
// PAGE HELPERS
// =========================
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// =========================
// BUILD LIST PAGES
// =========================
function buildGrammarList() {
  const grid = document.getElementById("grammarGrid");
  if (!grid) return;

  grid.innerHTML = "";
  LESSONS.grammar.items.forEach((item) => {
    const a = document.createElement("a");
    a.className = "card";
    a.href = `lesson.html?type=grammar&id=${encodeURIComponent(item.id)}`;
    a.innerHTML = `
      <div class="card-icon">📌</div>
      <div class="card-title">${item.title}</div>
      <div class="card-desc">${item.desc}</div>
    `;
    grid.appendChild(a);
  });
}

function buildTextbookList() {
  const grid = document.getElementById("textbookGrid");
  if (!grid) return;

  grid.innerHTML = "";
  LESSONS.textbook.items.forEach((item, idx) => {
    const a = document.createElement("a");
    a.className = "card";
    a.href = `lesson.html?type=textbook&id=${encodeURIComponent(item.id)}`;
    a.innerHTML = `
      <div class="card-icon">📘</div>
      <div class="card-title">${item.title}</div>
      <div class="card-desc">${item.desc}</div>
    `;
    grid.appendChild(a);
  });
}

// =========================
// QUIZ ENGINE (Lesson page)
// =========================
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function startQuiz(lessonTitle, questions) {
  currentQuestions = Array.isArray(questions) ? questions.slice() : [];
  currentIndex = 0;
  score = 0;

  const quizTitle = document.getElementById("quizTitle");
  const quizResult = document.getElementById("quizResult");
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");

  if (quizTitle) quizTitle.textContent = `${lessonTitle} · Quiz`;
  if (quizResult) quizResult.style.display = "none";
  if (feedbackEl) feedbackEl.textContent = "";
  if (nextBtn) nextBtn.disabled = true;

  updateScoreUI();
  renderQuestion();
}

function renderQuestion() {
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizProgressText = document.getElementById("quizProgressText");
  const nextBtn = document.getElementById("nextBtn");
  const feedbackEl = document.getElementById("feedback");

  if (!quizQuestion || !quizOptions || !quizProgressText) return;
  const q = currentQuestions[currentIndex];
  if (!q) return;

  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = "";
  quizProgressText.textContent = `Question ${currentIndex + 1} of ${currentQuestions.length}`;

  if (feedbackEl) feedbackEl.textContent = "";
  if (nextBtn) nextBtn.disabled = true;

  q.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => handleAnswer(index));
    quizOptions.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");
  const q = currentQuestions[currentIndex];
  if (!q) return;

  const correct = selectedIndex === q.correctIndex;

  qsa(".option-btn").forEach((btn, idx) => {
    btn.classList.add("disabled");
    if (idx === q.correctIndex) btn.classList.add("correct");
    if (idx === selectedIndex && !correct) btn.classList.add("wrong");
  });

  if (correct) {
    if (feedbackEl) feedbackEl.textContent = "Correct! 🎉";
    score += 10;
  } else {
    if (feedbackEl) feedbackEl.textContent = "Oops! Try the next one.";
  }

  updateScoreUI();
  if (nextBtn) nextBtn.disabled = false;
}

function endQuiz() {
  const quizResult = document.getElementById("quizResult");
  const starRow = document.getElementById("starRow");
  const resultTitle = document.getElementById("resultTitle");
  const resultSummary = document.getElementById("resultSummary");

  if (!quizResult) return;

  quizResult.style.display = "block";

  const totalQ = currentQuestions.length || 1;
  const percent = (score / (totalQ * 10)) * 100;

  if (starRow) {
    if (percent >= 80) starRow.textContent = "⭐️⭐️⭐️";
    else if (percent >= 50) starRow.textContent = "⭐️⭐️";
    else starRow.textContent = "⭐️";
  }

  if (resultTitle) {
    resultTitle.textContent =
      percent >= 80 ? "Amazing!" : percent >= 50 ? "Great job!" : "Nice try!";
  }

  if (resultSummary) {
    resultSummary.textContent = `You scored ${score} points (${score / 10} / ${totalQ} correct).`;
  }
}

function updateScoreUI() {
  const scoreDisplay = document.getElementById("scoreDisplay");
  if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
}

// =========================
// LESSON PAGE LOADER
// =========================
function loadLessonPage() {
  const lessonTitleEl = document.getElementById("lessonTitle");
  if (!lessonTitleEl) return; // not on lesson.html

  const type = getParam("type"); // "grammar" or "textbook"
  const id = getParam("id");

  const typeData = LESSONS[type];
  if (!typeData) {
    lessonTitleEl.textContent = "Lesson not found";
    return;
  }

  const item = typeData.items.find((x) => x.id === id);
  if (!item) {
    lessonTitleEl.textContent = "Lesson not found";
    return;
  }

  // Back button
  const backBtn = document.getElementById("backBtn");
  if (backBtn) backBtn.href = type === "grammar" ? "grammar.html" : "textbook.html";

  // Crumb badge
  const crumbBadge = document.getElementById("crumbBadge");
  if (crumbBadge) crumbBadge.textContent = `${typeData.label} · ${item.title}`;

  // Header content
  const descEl = document.getElementById("lessonDesc");
  const pillEl = document.getElementById("lessonTypePill");
  lessonTitleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.desc || "";
  if (pillEl) pillEl.textContent = type.toUpperCase();

  // Video
  const frame = document.getElementById("videoFrame");
  if (frame) {
    // YouTube embed URL
    frame.src = `https://www.youtube.com/embed/${encodeURIComponent(item.youtubeId)}?rel=0`;
  }

  // Start quiz
  startQuiz(item.title, item.quiz);

  // Buttons
  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      if (currentIndex >= currentQuestions.length) endQuiz();
      else renderQuestion();
    });
  }

  const playAgainBtn = document.getElementById("playAgainBtn");
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => startQuiz(item.title, item.quiz));
  }
}

// =========================
// INIT
// =========================
buildGrammarList();
buildTextbookList();
loadLessonPage();