// script.js (For JavaScript)
const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris"], answer: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"], answer: 1 }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById("quiz").style.display = "none";
        document.getElementById("result").innerText = `Quiz over! You scored ${score}/${questions.length}`;
        return;
    }
    const q = questions[currentQuestion];
    document.querySelector(".question").innerText = q.question;
    const optionsList = document.querySelector(".options");
    optionsList.innerHTML = "";
    q.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
        optionsList.appendChild(li);
    });
}

function nextQuestion() {
    const selected = document.querySelector("input[name='option']:checked");
    if (!selected) return alert("Please select an answer");
    if (parseInt(selected.value) === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

loadQuestion();
