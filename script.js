const params = new URLSearchParams(window.location.search);
const category = params.get("category") || 9;
const difficulty = params.get("difficulty") || "easy";

const API_URL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

// Fetch questions from API
async function loadQuestions() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        questions = data.results.map(q => ({
            question: decodeHTMLEntities(q.question),
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5).map(decodeHTMLEntities),
            answer: decodeHTMLEntities(q.correct_answer)
        }));

        displayQuestion();
    } catch (error) {
        console.error("Failed to load questions", error);
    }
}

// Function to decode HTML entities
function decodeHTMLEntities(text) {
    let doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
}

// Display a question
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.querySelector(".quiz-container").innerHTML = `
            <h2>Quiz Over!</h2>
            <p>Your Score: ${score}/${questions.length}</p>
            <button onclick="restartQuiz()">Restart Quiz</button>
        `;
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById("question").innerHTML = q.question;
    const optionsList = document.getElementById("options");
    optionsList.innerHTML = "";
    document.getElementById("next-btn").style.display = "none"; 

    q.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => checkAnswer(li, option);
        optionsList.appendChild(li);
    });

    startTimer();
}

// Timer Function
function startTimer() {
    let timeLeft = 30;
    document.getElementById("time").textContent = timeLeft;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

// Check answer
function checkAnswer(selectedLi, selectedOption) {
    clearInterval(timer);

    let correctAnswer = questions[currentQuestionIndex].answer;
    let allOptions = document.querySelectorAll("#options li");

    allOptions.forEach(li => {
        li.style.pointerEvents = "none"; 
        if (li.textContent === correctAnswer) {
            li.classList.add("correct");
        }
    });

    if (selectedOption !== correctAnswer) {
        selectedLi.classList.add("wrong");
    } else {
        score++;
    }

    document.getElementById("next-btn").style.display = "block";
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Restart Quiz (Back to Home)
function restartQuiz() {
    window.location.href = "index.html";
}

// Load questions on start
window.onload = loadQuestions;
