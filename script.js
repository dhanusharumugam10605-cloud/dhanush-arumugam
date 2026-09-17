const questions = [

  {
    question:
      "Which country is Cristiano Ronaldo from?",

    answers: [
      "Portugal",
      "Brazil",
      "Spain",
      "Argentina"
    ],

    correct: 0
  },

  {
    question:
      "Which position is Cristiano Ronaldo primarily known for?",

    answers: [
      "Goalkeeper",
      "Forward",
      "Defender",
      "Referee"
    ],

    correct: 1
  },

  {
    question:
      "Which club did Ronaldo join in 2003?",

    answers: [
      "Manchester United",
      "Chelsea",
      "Liverpool",
      "Arsenal"
    ],

    correct: 0
  },

  {
    question:
      "Which Portuguese club did Ronaldo play for before Manchester United?",

    answers: [
      "FC Porto",
      "Sporting CP",
      "Benfica",
      "Braga"
    ],

    correct: 1
  },

  {
    question:
      "Which number is strongly associated with Ronaldo?",

    answers: [
      "7",
      "10",
      "9",
      "1"
    ],

    correct: 0
  },

  {
    question:
      "For which national team does Ronaldo play?",

    answers: [
      "Portugal",
      "France",
      "Italy",
      "Germany"
    ],

    correct: 0
  },

  {
    question:
      "Which Spanish club did Ronaldo join in 2009?",

    answers: [
      "Barcelona",
      "Atlético Madrid",
      "Real Madrid",
      "Valencia"
    ],

    correct: 2
  },

  {
    question:
      "What is Ronaldo's famous celebration often associated with?",

    answers: [
      "Siuuu",
      "Vamos",
      "Olé",
      "Forza"
    ],

    correct: 0
  },

  {
    question:
      "Which competition is contested by European national football teams?",

    answers: [
      "UEFA European Championship",
      "NBA Finals",
      "Super Bowl",
      "Wimbledon"
    ],

    correct: 0
  },

  {
    question:
      "What sport is Cristiano Ronaldo famous for?",

    answers: [
      "Basketball",
      "Football",
      "Tennis",
      "Cricket"
    ],

    correct: 1
  }

];

let currentQuestion = 0;
let score = 0;
let answered = false;


/* Get HTML elements */

const questionElement =
  document.getElementById("question");

const answersElement =
  document.getElementById("answers");

const nextButton =
  document.getElementById("nextBtn");

const scoreElement =
  document.getElementById("score");

const questionNumber =
  document.getElementById("questionNumber");

const progressBar =
  document.getElementById("progressBar");

const quizElement =
  document.getElementById("quiz");

const resultElement =
  document.getElementById("result");

const finalScore =
  document.getElementById("finalScore");

const rankElement =
  document.getElementById("rank");

const restartButton =
  document.getElementById("restartBtn");


/* Load question */

function loadQuestion() {

  answered = false;

  const q =
    questions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1}/${questions.length}`;

  scoreElement.textContent =
    `Score: ${score}`;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionElement.textContent =
    q.question;

  answersElement.innerHTML = "";


  /* Create answer buttons */

  q.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement("button");

      button.className =
        "answer";

      button.textContent =
        answer;

      button.addEventListener(
        "click",
        () => {
          selectAnswer(button, index);
        }
      );

      answersElement.appendChild(button);
    }
  );

  nextButton.style.display =
    "none";
}


/* Select answer */

function selectAnswer(
  button,
  selectedIndex
) {

  if (answered) {
    return;
  }

  answered = true;

  const correctIndex =
    questions[currentQuestion].correct;

  const allAnswers =
    document.querySelectorAll(".answer");


  /* Show correct answer */

  allAnswers.forEach(
    (answerButton, index) => {

      answerButton.disabled = true;

      if (index === correctIndex) {
        answerButton.classList.add(
          "correct"
        );
      }
    }
  );


  /* Check selected answer */

  if (selectedIndex === correctIndex) {

    score++;

    button.classList.add(
      "correct"
    );

    scoreElement.textContent =
      `Score: ${score}`;

  } else {

    button.classList.add(
      "wrong"
    );
  }


  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  nextButton.style.display =
    "block";
}


/* Next question */

nextButton.addEventListener(
  "click",
  () => {

    currentQuestion++;

    if (
      currentQuestion <
      questions.length
    ) {

      loadQuestion();

    } else {

      showResult();
    }
  }
);


/* Show final result */

function showResult() {

  quizElement.style.display =
    "none";

  resultElement.style.display =
    "block";

  finalScore.textContent =
    `${score}/${questions.length}`;


  const percentage =
    (score / questions.length) * 100;


  if (percentage === 100) {

    rankElement.textContent =
      "🐐 PERFECT! You are a Football Legend!";

  } else if (percentage >= 80) {

    rankElement.textContent =
      "🔥 Excellent! Ronaldo-level football knowledge!";

  } else if (percentage >= 60) {

    rankElement.textContent =
      "⚽ Great job! You know your football!";

  } else if (percentage >= 40) {

    rankElement.textContent =
      "👏 Good attempt! Keep training!";

  } else {

    rankElement.textContent =
      "💪 Keep practicing and come back stronger!";
  }
}


/* Restart game */

restartButton.addEventListener(
  "click",
  () => {

    currentQuestion = 0;

    score = 0;

    resultElement.style.display =
      "none";

    quizElement.style.display =
      "block";

    loadQuestion();
  }
);


/* Start game */

loadQuestion();
