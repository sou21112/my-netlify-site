// script.js (For JavaScript)
const questions = Array.from({ length: 5000 }, (_, i) => ({
    question: `Question ${i + 1}: What is the answer?`,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: Math.floor(Math.random() * 4)
}));

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

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
