const questions = [
  { type: "text", question: "What is the capital of France?", answer: "Paris" },
  {
    type: "mcq",
    question: "Which language runs in a web browser?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript"
  },
  { type: "text", question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
  {
    type: "mcq",
    question: "What does CSS stand for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Syntax"],
    answer: "Cascading Style Sheets"
  },
  { type: "text", question: "What is 5 + 7?", answer: "12" },
  {
    type: "mcq",
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Control Processing Unit", "Calculation Processing Unit"],
    answer: "Central Processing Unit"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const qBox = document.getElementById('question');
  const answerBox = document.getElementById('answerArea');
  const feedback = document.getElementById('feedback');
  const resetBtn = document.getElementById('resetBtn');

  feedback.textContent = '';
  answerBox.innerHTML = '';
  resetBtn.style.display = 'none';

  updateProgress();

  if (currentQuestion >= questions.length) {
    qBox.textContent = 'Quiz Completed!';
    document.getElementById('score').textContent = `Final Score: ${score} / ${questions.length}`;
    document.querySelector('button').style.display = 'none';
    resetBtn.style.display = 'block';
    return;
  }

  const q = questions[currentQuestion];
  qBox.textContent = q.question;

  if (q.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "answerInput";
    input.placeholder = "Type your answer here...";
    answerBox.appendChild(input);
  } else if (q.type === "mcq") {
    q.options.forEach(option => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="mcq" value="${option}"> ${option}
      `;
      answerBox.appendChild(label);
    });
  }
}

function submitAnswer() {
  const q = questions[currentQuestion];
  const feedback = document.getElementById('feedback');
  let userAnswer = "";

  if (q.type === "text") {
    userAnswer = document.getElementById('answerInput').value.trim();
  } else if (q.type === "mcq") {
    const selected = document.querySelector('input[name="mcq"]:checked');
    if (selected) {
      userAnswer = selected.value;
    }
  }

  if (!userAnswer) {
    feedback.textContent = "Please enter or select an answer.";
    feedback.style.color = "orange";
    return;
  }

  if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `Incorrect! The correct answer is: ${q.answer}`;
    feedback.style.color = "red";
  }

  document.getElementById('score').textContent = `Score: ${score}`;
  currentQuestion++;
  setTimeout(loadQuestion, 1500);
}

function updateProgress() {
  const percent = (currentQuestion / questions.length) * 100;
  document.getElementById('progress').style.width = `${percent}%`;
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('score').textContent = '';
  document.querySelector('button').style.display = 'inline-block';
  loadQuestion();
}

loadQuestion();