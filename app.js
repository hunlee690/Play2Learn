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
      // add more learning lessons: adjective, adverb, tenses, articles, prepositions...
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
// FUN TEST DATA
// =========================
const FUN_TOPICS = [
  { id: "opposite", title: "Opposite", icon: "↔️", desc: "Choose the opposite word." },
  { id: "gender-change", title: "Gender Change", icon: "👑", desc: "Change masculine/feminine nouns." },
  { id: "one-word", title: "One Word", icon: "💡", desc: "Choose one word for the phrase." },
  { id: "article", title: "Article", icon: "🔤", desc: "Practice a, an, and the." },
  { id: "modal", title: "Modal", icon: "✅", desc: "Can, could, should, must, may." },
  { id: "verbs", title: "Verbs", icon: "🏃", desc: "Action words and verb forms." },
  { id: "numbers", title: "Numbers", icon: "🔢", desc: "Number names and simple number logic." },
  { id: "preposition", title: "Preposition", icon: "📍", desc: "Position and relationship words." },
  { id: "phrasal-verbs", title: "Phrasal Verbs", icon: "🧩", desc: "Meaning of common phrasal verbs." },
];

const oppositePairs = [
  ["hot", "cold"], ["big", "small"], ["up", "down"], ["early", "late"], ["happy", "sad"],
  ["day", "night"], ["old", "new"], ["fast", "slow"], ["near", "far"], ["open", "closed"],
  ["full", "empty"], ["light", "dark"], ["rich", "poor"], ["strong", "weak"], ["clean", "dirty"],
  ["kind", "cruel"], ["brave", "cowardly"], ["wide", "narrow"], ["deep", "shallow"], ["soft", "hard"],
  ["smooth", "rough"], ["increase", "decrease"], ["accept", "refuse"], ["ancient", "modern"], ["victory", "defeat"],
  ["arrival", "departure"], ["include", "exclude"], ["expand", "shrink"], ["private", "public"], ["maximum", "minimum"],
];

const genderPairs = [
  ["king", "queen"], ["boy", "girl"], ["man", "woman"], ["father", "mother"], ["brother", "sister"],
  ["uncle", "aunt"], ["son", "daughter"], ["husband", "wife"], ["actor", "actress"], ["prince", "princess"],
  ["lion", "lioness"], ["tiger", "tigress"], ["hero", "heroine"], ["waiter", "waitress"], ["nephew", "niece"],
  ["sir", "madam"], ["emperor", "empress"], ["duke", "duchess"], ["host", "hostess"], ["wizard", "witch"],
  ["monk", "nun"], ["groom", "bride"], ["landlord", "landlady"], ["policeman", "policewoman"],
];

const oneWordBank = [
  ["A person who teaches students", "teacher"], ["A person who treats sick people", "doctor"],
  ["A place where books are kept", "library"], ["A person who writes poems", "poet"],
  ["A person who flies an aeroplane", "pilot"], ["A place where animals are kept", "zoo"],
  ["A person who cuts hair", "barber"], ["A person who makes furniture", "carpenter"],
  ["A person who sells medicines", "chemist"], ["A person who repairs shoes", "cobbler"],
  ["A person who studies stars and planets", "astronomer"], ["A person who cannot hear", "deaf"],
  ["A person who cannot speak", "mute"], ["A person who draws maps", "cartographer"],
  ["A person who loves books", "bibliophile"], ["A person who writes news reports", "journalist"],
  ["A person who makes bread and cakes", "baker"], ["A person who catches fish", "fisherman"],
  ["A place where films are shown", "cinema"], ["A person who travels to space", "astronaut"],
  ["A person who designs buildings", "architect"], ["A person who looks after a garden", "gardener"],
  ["A book of word meanings", "dictionary"], ["A place where money is kept", "bank"],
];

const articleBank = [
  ["I saw ___ elephant.", "an"], ["She bought ___ umbrella.", "an"], ["He is ___ honest man.", "an"],
  ["This is ___ useful book.", "a"], ["Ravi has ___ pen.", "a"], ["___ sun rises in the east.", "the"],
  ["I ate ___ apple.", "an"], ["She is ___ university student.", "a"], ["He waited for ___ hour.", "an"],
  ["This is ___ best answer.", "the"], ["We saw ___ tiger in the zoo.", "a"], ["___ Ganga is a holy river.", "the"],
  ["I need ___ orange.", "an"], ["He is ___ European player.", "a"], ["___ moon looks bright tonight.", "the"],
  ["She gave me ___ idea.", "an"], ["It is ___ one-way road.", "a"], ["___ Himalayas are very high.", "the"],
  ["He has ___ old bicycle.", "an"], ["This is ___ easy question.", "an"], ["She wore ___ red dress.", "a"],
  ["___ Pacific Ocean is huge.", "the"], ["I saw ___ owl.", "an"], ["He is ___ brave soldier.", "a"],
];

const modalBank = [
  ["You ___ wear a helmet while riding a bike.", "should"], ["I ___ swim when I was six.", "could"],
  ["Students ___ not use phones during the test.", "must"], ["___ I come in, sir?", "May"],
  ["She ___ speak three languages.", "can"], ["We ___ respect our elders.", "should"],
  ["You ___ finish your homework today.", "must"], ["He ___ be at home; the lights are on.", "might"],
  ["They ___ arrive late because of traffic.", "may"], ["You ___ tell lies.", "must not"],
  ["When I was young, I ___ run very fast.", "could"], ["___ you please help me?", "Could"],
  ["We ___ save water.", "should"], ["She ___ join us if she is free.", "may"],
  ["You ___ enter without permission.", "cannot"], ["He ___ be tired after the match.", "must"],
  ["I ___ solve this puzzle easily.", "can"], ["You ___ park here; it is not allowed.", "must not"],
  ["___ I borrow your pencil?", "May"], ["It ___ rain today.", "might"],
  ["You ___ practice daily to improve.", "should"], ["We ___ reach school by 8 a.m.", "must"],
  ["She ___ dance very well.", "can"], ["He ___ not lift the box because it was heavy.", "could"],
];

const verbsBank = [
  ["Past tense of 'go' is…", "went"], ["Past tense of 'eat' is…", "ate"], ["Past tense of 'write' is…", "wrote"],
  ["Past tense of 'see' is…", "saw"], ["Past tense of 'run' is…", "ran"], ["Past tense of 'take' is…", "took"],
  ["Past participle of 'go' is…", "gone"], ["Past participle of 'write' is…", "written"],
  ["Choose the verb: The baby sleeps.", "sleeps"], ["Choose the verb: Birds fly.", "fly"],
  ["Choose the verb: She sings sweetly.", "sings"], ["Choose the helping verb: He is reading.", "is"],
  ["Choose the helping verb: They are playing.", "are"], ["Base form of 'running' is…", "run"],
  ["Base form of 'studied' is…", "study"], ["Third person form of 'do' is…", "does"],
  ["Third person form of 'have' is…", "has"], ["Past tense of 'buy' is…", "bought"],
  ["Past tense of 'bring' is…", "brought"], ["Past tense of 'make' is…", "made"],
  ["Past tense of 'teach' is…", "taught"], ["Past tense of 'think' is…", "thought"],
  ["Past participle of 'eat' is…", "eaten"], ["Past participle of 'see' is…", "seen"],
];

const prepositionBank = [
  ["The cat is ___ the table.", "under"], ["The book is ___ the bag.", "in"],
  ["The picture is ___ the wall.", "on"], ["She sat ___ me.", "beside"],
  ["The school is ___ the bank and the park.", "between"], ["He jumped ___ the wall.", "over"],
  ["The ball rolled ___ the table.", "under"], ["We reached school ___ 8 a.m.", "at"],
  ["My birthday is ___ July.", "in"], ["The meeting is ___ Monday.", "on"],
  ["She walked ___ the room.", "into"], ["He came ___ Delhi.", "from"],
  ["The dog ran ___ the road.", "across"], ["The plane flew ___ the clouds.", "above"],
  ["He stood ___ the door.", "near"], ["The river flows ___ the bridge.", "under"],
  ["She is good ___ English.", "at"], ["We are waiting ___ the bus.", "for"],
  ["He is interested ___ music.", "in"], ["The keys are ___ the drawer.", "inside"],
  ["The shop is ___ the school.", "opposite"], ["He divided the sweets ___ the children.", "among"],
  ["She leaned ___ the wall.", "against"], ["The train goes ___ the tunnel.", "through"],
];

const phrasalVerbBank = [
  ["'Give up' means…", "stop trying"], ["'Look after' means…", "take care of"],
  ["'Find out' means…", "discover"], ["'Turn off' means…", "switch off"],
  ["'Turn on' means…", "switch on"], ["'Put on' means…", "wear"],
  ["'Take off' means…", "remove"], ["'Come back' means…", "return"],
  ["'Carry on' means…", "continue"], ["'Wake up' means…", "stop sleeping"],
  ["'Break down' means…", "stop working"], ["'Set up' means…", "arrange"],
  ["'Pick up' means…", "lift"], ["'Look for' means…", "search"],
  ["'Run away' means…", "escape"], ["'Call off' means…", "cancel"],
  ["'Bring up' means…", "raise"], ["'Check out' means…", "examine"],
  ["'Get over' means…", "recover"], ["'Go on' means…", "continue"],
  ["'Look up' means…", "search in a reference"], ["'Pass away' means…", "die"],
  ["'Put out' means…", "extinguish"], ["'Throw away' means…", "discard"],
];

// =========================
// PAGE HELPERS
// =========================
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sampleItems(arr, count) {
  return shuffleArray(arr).slice(0, count);
}

function makeQuestion(question, correctAnswer, wrongAnswers) {
  const uniqueWrong = [...new Set(wrongAnswers.filter((x) => x && x !== correctAnswer))];
  const options = shuffleArray([correctAnswer, ...sampleItems(uniqueWrong, 3)]);
  return {
    question,
    options,
    correctIndex: options.indexOf(correctAnswer),
  };
}

function topicById(topicId) {
  return FUN_TOPICS.find((topic) => topic.id === topicId);
}

function renderBreadcrumb(items) {
  const row = document.getElementById("grammarBreadcrumb");
  if (!row) return;
  row.innerHTML = "";
  items.forEach((item) => {
    const el = document.createElement(item.href ? "a" : "span");
    el.className = item.href ? "breadcrumb-link" : "breadcrumb-current";
    el.textContent = item.label;
    if (item.href) el.href = item.href;
    row.appendChild(el);
  });
}

function clearFunQuiz() {
  const mount = document.getElementById("funQuizMount");
  if (mount) mount.innerHTML = "";
}

// =========================
// BUILD LIST PAGES
// =========================
function buildGrammarList() {
  const grid = document.getElementById("grammarGrid");
  if (!grid) return;

  const mode = getParam("mode");
  const selectedClass = getParam("class");
  const selectedTopic = getParam("topic");
  const count = Number(getParam("count"));

  grid.innerHTML = "";
  clearFunQuiz();

  if (!mode) return renderGrammarHome(grid);
  if (mode === "learning") return renderGrammarLearning(grid);
  if (mode === "fun" && !selectedClass) return renderFunClassSelection(grid);
  if (mode === "fun" && selectedClass && !selectedTopic) return renderFunTopicSelection(grid, selectedClass);
  if (mode === "fun" && selectedClass && selectedTopic && !count) return renderQuizLengthSelection(grid, selectedClass, selectedTopic);
  if (mode === "fun" && selectedClass && selectedTopic && [10, 20].includes(count)) {
    return renderFunQuizPage(selectedClass, selectedTopic, count);
  }

  renderGrammarHome(grid);
}

function renderGrammarHome(grid) {
  setText("grammarNavBadge", "📝 Grammar");
  setText("grammarPageTitle", "Grammar");
  setText("grammarPageSubtitle", "Choose Learning for video lessons or Fun Test for fresh practice quizzes.");
  renderBreadcrumb([]);

  const cards = [
    {
      href: "grammar.html?mode=learning",
      icon: "📚",
      title: "Learning",
      desc: "Watch grammar videos and solve the normal lesson quiz.",
    },
    {
      href: "grammar.html?mode=fun",
      icon: "🎮",
      title: "Fun Test",
      desc: "Choose class, topic, and 10 or 20 random questions.",
    },
  ];

  cards.forEach((item) => {
    const a = document.createElement("a");
    a.className = "card big-choice";
    a.href = item.href;
    a.innerHTML = `
      <div class="card-icon">${item.icon}</div>
      <div class="card-title">${item.title}</div>
      <div class="card-desc">${item.desc}</div>
    `;
    grid.appendChild(a);
  });
}

function renderGrammarLearning(grid) {
  setText("grammarNavBadge", "📚 Grammar Learning");
  setText("grammarPageTitle", "Grammar Learning");
  setText("grammarPageSubtitle", "Choose a topic. Each topic opens a video lesson with a quiz.");
  renderBreadcrumb([
    { label: "Grammar", href: "grammar.html" },
    { label: "Learning" },
  ]);

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

function renderFunClassSelection(grid) {
  setText("grammarNavBadge", "🎮 Fun Test");
  setText("grammarPageTitle", "Fun Test");
  setText("grammarPageSubtitle", "Choose your class first, then select a grammar topic.");
  renderBreadcrumb([
    { label: "Grammar", href: "grammar.html" },
    { label: "Fun Test" },
  ]);

  Array.from({ length: 10 }).forEach((_, i) => {
    const classNo = i + 1;
    const a = document.createElement("a");
    a.className = "card";
    a.href = `grammar.html?mode=fun&class=${classNo}`;
    a.innerHTML = `
      <div class="card-icon">🏫</div>
      <div class="card-title">Class ${classNo}</div>
      <div class="card-desc">Practice grammar tests for Class ${classNo}.</div>
    `;
    grid.appendChild(a);
  });
}

function renderFunTopicSelection(grid, selectedClass) {
  setText("grammarNavBadge", `🎮 Class ${selectedClass}`);
  setText("grammarPageTitle", `Class ${selectedClass} Fun Test`);
  setText("grammarPageSubtitle", "Choose a topic for your grammar quiz.");
  renderBreadcrumb([
    { label: "Grammar", href: "grammar.html" },
    { label: "Fun Test", href: "grammar.html?mode=fun" },
    { label: `Class ${selectedClass}` },
  ]);

  FUN_TOPICS.forEach((topic) => {
    const a = document.createElement("a");
    a.className = "card";
    a.href = `grammar.html?mode=fun&class=${encodeURIComponent(selectedClass)}&topic=${encodeURIComponent(topic.id)}`;
    a.innerHTML = `
      <div class="card-icon">${topic.icon}</div>
      <div class="card-title">${topic.title}</div>
      <div class="card-desc">${topic.desc}</div>
    `;
    grid.appendChild(a);
  });
}

function renderQuizLengthSelection(grid, selectedClass, selectedTopic) {
  const topic = topicById(selectedTopic);
  if (!topic) return renderFunTopicSelection(grid, selectedClass);

  setText("grammarNavBadge", `🎮 ${topic.title}`);
  setText("grammarPageTitle", `${topic.title} Quiz`);
  setText("grammarPageSubtitle", "Choose how many questions you want.");
  renderBreadcrumb([
    { label: "Grammar", href: "grammar.html" },
    { label: "Fun Test", href: "grammar.html?mode=fun" },
    { label: `Class ${selectedClass}`, href: `grammar.html?mode=fun&class=${encodeURIComponent(selectedClass)}` },
    { label: topic.title },
  ]);

  [10, 20].forEach((quizCount) => {
    const a = document.createElement("a");
    a.className = "card big-choice";
    a.href = `grammar.html?mode=fun&class=${encodeURIComponent(selectedClass)}&topic=${encodeURIComponent(selectedTopic)}&count=${quizCount}`;
    a.innerHTML = `
      <div class="card-icon">${quizCount === 10 ? "⚡" : "🏆"}</div>
      <div class="card-title">${quizCount} Questions</div>
      <div class="card-desc">Start a fresh ${quizCount}-question quiz for Class ${selectedClass}.</div>
    `;
    grid.appendChild(a);
  });
}

function buildTextbookList() {
  const grid = document.getElementById("textbookGrid");
  if (!grid) return;

  grid.innerHTML = "";
  LESSONS.textbook.items.forEach((item) => {
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
// FUN TEST QUIZ ENGINE
// =========================
let funQuizState = {
  classNo: null,
  topicId: null,
  topicTitle: null,
  questions: [],
  index: 0,
  score: 0,
  answers: [],
};

function renderFunQuizPage(selectedClass, selectedTopic, count) {
  const topic = topicById(selectedTopic);
  const grid = document.getElementById("grammarGrid");
  const mount = document.getElementById("funQuizMount");
  if (!topic || !mount) return;

  if (grid) grid.innerHTML = "";
  setText("grammarNavBadge", `🎮 ${topic.title}`);
  setText("grammarPageTitle", `${topic.title} Quiz`);
  setText("grammarPageSubtitle", `Class ${selectedClass} · ${count} random questions`);
  renderBreadcrumb([
    { label: "Grammar", href: "grammar.html" },
    { label: "Fun Test", href: "grammar.html?mode=fun" },
    { label: `Class ${selectedClass}`, href: `grammar.html?mode=fun&class=${encodeURIComponent(selectedClass)}` },
    { label: topic.title, href: `grammar.html?mode=fun&class=${encodeURIComponent(selectedClass)}&topic=${encodeURIComponent(selectedTopic)}` },
    { label: `${count} Questions` },
  ]);

  funQuizState = {
    classNo: selectedClass,
    topicId: selectedTopic,
    topicTitle: topic.title,
    questions: generateFunQuestions(selectedTopic, selectedClass, count),
    index: 0,
    score: 0,
    answers: [],
  };

  mount.innerHTML = `
    <section class="fun-quiz-card">
      <div class="fun-meta-row">
        <span class="fun-meta-pill">Class ${selectedClass}</span>
        <span class="fun-meta-pill">${topic.title}</span>
        <span class="fun-meta-pill">${count} Questions</span>
      </div>

      <div class="quiz-header">
        <div>
          <div class="quiz-title" id="funQuizTitle">${topic.title} · Fun Test</div>
          <div class="quiz-progress-text" id="funQuizProgressText">Question 1 of ${count}</div>
        </div>
        <div class="score-pill" id="funScoreDisplay">Score: 0</div>
      </div>

      <div id="funQuizArea">
        <div class="quiz-question" id="funQuizQuestion"></div>
        <ul class="quiz-options" id="funQuizOptions"></ul>
      </div>

      <div class="quiz-footer" id="funQuizFooter">
        <div class="feedback" id="funFeedback"></div>
        <button class="btn btn-primary" id="funNextBtn" disabled>Next ▶</button>
      </div>
    </section>
  `;

  const nextBtn = document.getElementById("funNextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      funQuizState.index++;
      if (funQuizState.index >= funQuizState.questions.length) renderFunResult();
      else renderFunQuestion();
    });
  }

  renderFunQuestion();
}

function generateFunQuestions(topicId, classNo, count) {
  let pool = [];

  if (topicId === "opposite") {
    const allWords = oppositePairs.flat();
    pool = oppositePairs.flatMap(([a, b]) => [
      makeQuestion(`Choose the opposite of '${a}'.`, b, allWords),
      makeQuestion(`Choose the opposite of '${b}'.`, a, allWords),
    ]);
  }

  if (topicId === "gender-change") {
    const allWords = genderPairs.flat();
    pool = genderPairs.flatMap(([a, b]) => [
      makeQuestion(`Choose the feminine form of '${a}'.`, b, allWords),
      makeQuestion(`Choose the masculine form of '${b}'.`, a, allWords),
    ]);
  }

  if (topicId === "one-word") {
    const answers = oneWordBank.map((x) => x[1]);
    pool = oneWordBank.map(([phrase, answer]) => makeQuestion(`Choose one word for: ${phrase}.`, answer, answers));
  }

  if (topicId === "article") {
    pool = articleBank.map(([sentence, answer]) => makeQuestion(sentence, answer, ["a", "an", "the", "no article"]));
  }

  if (topicId === "modal") {
    pool = modalBank.map(([sentence, answer]) => makeQuestion(sentence, answer, ["can", "could", "may", "might", "must", "should", "must not", "cannot", "May", "Could"]));
  }

  if (topicId === "verbs") {
    const answers = verbsBank.map((x) => x[1]);
    pool = verbsBank.map(([question, answer]) => makeQuestion(question, answer, answers));
  }

  if (topicId === "numbers") {
    pool = generateNumberQuestions(count + 20, Number(classNo));
  }

  if (topicId === "preposition") {
    pool = prepositionBank.map(([sentence, answer]) => makeQuestion(sentence, answer, ["in", "on", "at", "under", "over", "between", "beside", "from", "for", "through", "across", "against", "among", "inside", "near", "opposite"]));
  }

  if (topicId === "phrasal-verbs") {
    const answers = phrasalVerbBank.map((x) => x[1]);
    pool = phrasalVerbBank.map(([question, answer]) => makeQuestion(question, answer, answers));
  }

  // Every start reshuffles questions and options, so a new quiz feels different.
  const questions = shuffleArray(pool).slice(0, count).map((q) => makeQuestion(q.question, q.options[q.correctIndex], q.options));
  return questions.length ? questions : [makeQuestion("No questions found for this topic.", "Try another topic", ["A", "B", "C"])] ;
}

function numberToWords(num) {
  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  if (num < 20) return ones[num];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? `-${ones[num % 10]}` : "");
  if (num < 1000) return ones[Math.floor(num / 100)] + " hundred" + (num % 100 ? ` ${numberToWords(num % 100)}` : "");
  return String(num);
}

function generateNumberQuestions(total, classNo) {
  const max = classNo <= 2 ? 50 : classNo <= 5 ? 200 : 999;
  const pool = [];
  for (let i = 0; i < total; i++) {
    const n = Math.floor(Math.random() * max) + 1;
    const type = Math.floor(Math.random() * 4);

    if (type === 0) {
      const wrong = [n + 1, Math.max(0, n - 1), n + 10, Math.max(0, n - 10)].map(numberToWords);
      pool.push(makeQuestion(`Choose the number name for ${n}.`, numberToWords(n), wrong));
    } else if (type === 1) {
      pool.push(makeQuestion(`Which number comes just after ${n}?`, String(n + 1), [String(n - 1), String(n + 2), String(n + 10), String(Math.max(0, n - 2))]));
    } else if (type === 2) {
      pool.push(makeQuestion(`Which number comes just before ${n}?`, String(Math.max(0, n - 1)), [String(n + 1), String(n + 2), String(Math.max(0, n - 2)), String(n + 10)]));
    } else {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      pool.push(makeQuestion(`What is ${a} + ${b}?`, String(a + b), [String(a + b + 1), String(a + b - 1), String(a + b + 2), String(Math.abs(a - b))]));
    }
  }
  return pool;
}

function renderFunQuestion() {
  const questionEl = document.getElementById("funQuizQuestion");
  const optionsEl = document.getElementById("funQuizOptions");
  const progressEl = document.getElementById("funQuizProgressText");
  const feedbackEl = document.getElementById("funFeedback");
  const nextBtn = document.getElementById("funNextBtn");
  const scoreEl = document.getElementById("funScoreDisplay");

  const q = funQuizState.questions[funQuizState.index];
  if (!q || !questionEl || !optionsEl || !progressEl) return;

  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  progressEl.textContent = `Question ${funQuizState.index + 1} of ${funQuizState.questions.length}`;
  if (feedbackEl) feedbackEl.textContent = "";
  if (nextBtn) nextBtn.disabled = true;
  if (scoreEl) scoreEl.textContent = `Score: ${funQuizState.score}`;

  q.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => handleFunAnswer(index));
    optionsEl.appendChild(btn);
  });
}

function handleFunAnswer(selectedIndex) {
  const q = funQuizState.questions[funQuizState.index];
  const feedbackEl = document.getElementById("funFeedback");
  const nextBtn = document.getElementById("funNextBtn");
  const scoreEl = document.getElementById("funScoreDisplay");
  if (!q) return;

  const correct = selectedIndex === q.correctIndex;
  if (correct) funQuizState.score += 10;

  funQuizState.answers.push({
    question: q.question,
    selected: q.options[selectedIndex],
    correct: q.options[q.correctIndex],
    isCorrect: correct,
  });

  qsa("#funQuizOptions .option-btn").forEach((btn, idx) => {
    btn.classList.add("disabled");
    if (idx === q.correctIndex) btn.classList.add("correct");
    if (idx === selectedIndex && !correct) btn.classList.add("wrong");
  });

  if (feedbackEl) feedbackEl.textContent = correct ? "Correct! 🎉" : `Wrong. Correct answer: ${q.options[q.correctIndex]}`;
  if (scoreEl) scoreEl.textContent = `Score: ${funQuizState.score}`;
  if (nextBtn) nextBtn.disabled = false;
}

function renderFunResult() {
  const mount = document.getElementById("funQuizMount");
  if (!mount) return;

  const total = funQuizState.questions.length;
  const correct = funQuizState.answers.filter((answer) => answer.isCorrect).length;
  const wrong = total - correct;
  const percent = Math.round((correct / total) * 100);
  const message = percent >= 80 ? "Excellent work!" : percent >= 50 ? "Good job, keep practicing." : "Nice try, revise this topic once more.";

  const retryUrl = `grammar.html?mode=fun&class=${encodeURIComponent(funQuizState.classNo)}&topic=${encodeURIComponent(funQuizState.topicId)}&count=${total}`;
  const topicUrl = `grammar.html?mode=fun&class=${encodeURIComponent(funQuizState.classNo)}`;

  const reviewHtml = funQuizState.answers.slice(0, 5).map((answer, index) => `
    <div class="review-item">
      <strong>Q${index + 1}.</strong> ${answer.question}<br>
      Your answer: ${answer.selected} · Correct: ${answer.correct}
    </div>
  `).join("");

  mount.innerHTML = `
    <section class="fun-quiz-card quiz-result" style="display:block;">
      <div class="star-row">${percent >= 80 ? "⭐️⭐️⭐️" : percent >= 50 ? "⭐️⭐️" : "⭐️"}</div>
      <h3>${message}</h3>
      <p>Here is your final result for Class ${funQuizState.classNo} · ${funQuizState.topicTitle}.</p>

      <div class="result-grid">
        <div class="result-box"><span class="result-number">${correct}/${total}</span><span class="result-label">Correct</span></div>
        <div class="result-box"><span class="result-number">${wrong}</span><span class="result-label">Wrong</span></div>
        <div class="result-box"><span class="result-number">${funQuizState.score}</span><span class="result-label">Score</span></div>
        <div class="result-box"><span class="result-number">${percent}%</span><span class="result-label">Percentage</span></div>
      </div>

      <div class="review-list">
        <strong>Quick review</strong>
        ${reviewHtml}
      </div>

      <div class="result-actions">
        <a class="btn btn-primary" href="${retryUrl}">🔁 New Random Quiz</a>
        <a class="btn btn-ghost" href="${topicUrl}">📚 Change Topic</a>
        <a class="btn btn-ghost" href="grammar.html?mode=fun">🏫 Change Class</a>
      </div>
    </section>
  `;
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
  if (backBtn) backBtn.href = type === "grammar" ? "grammar.html?mode=learning" : "textbook.html";

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
