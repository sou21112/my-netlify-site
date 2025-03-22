// script.js
const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";
let questions = [], currentQuestion = 0, score = 0;

async function fetchQuestions() {
    const response = await fetch(API_URL);
    const data = await response.json();
    questions = data.results.map(q => ({
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        answer: q.correct_answer
    }));
    loadQuestion();
}

function startQuiz() {
    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    fetchQuestions();
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("result").style.display = "block";
        document.getElementById("score").innerText = `You scored ${score}/${questions.length}`;
        return;
    }
    const q = questions[currentQuestion];
    document.getElementById("question").innerHTML = q.question;
    const optionsList = document.getElementById("options");
    optionsList.innerHTML = "";
    q.options.forEach(option => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
        optionsList.appendChild(li);
    });
}

function nextQuestion() {
    const selected = document.querySelector("input[name='option']:checked");
    if (!selected) return alert("Please select an answer");
    if (selected.value === questions[currentQuestion].answer) score++;
    currentQuestion++;
    loadQuestion();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("home").style.display = "block";
}
