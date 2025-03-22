// script.js (For JavaScript)
const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

let questions = [];
let currentQuestion = 0;
let score = 0;

// Fetch questions from API
async function fetchQuestions() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        questions = data.results.map((q, index) => ({
            question: q.question,
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
            answer: q.correct_answer
        }));
        loadQuestion();
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

// Load question into UI
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("result").innerText = `Quiz over! You scored ${score}/${questions.length}`;
        return;
    }

    const q = questions[currentQuestion];
    document.querySelector(".question").innerHTML = q.question;
    const optionsList = document.querySelector(".options");
    optionsList.innerHTML = "";

    q.options.forEach((option) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
        optionsList.appendChild(li);
    });
}

// Check answer and load next question
function nextQuestion() {
    const selected = document.querySelector("input[name='option']:checked");
    if (!selected) return alert("Please select an answer");

    if (selected.value === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;
    loadQuestion();
}

// Start fetching questions
fetchQuestions();
