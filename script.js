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
        
        // Decode special characters like &quot; and &#039;
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
        document.querySelector(".quiz-container").innerHTML = `<h2>Quiz Over!</h2><p>Your Score: ${score}/${questions.length}</p>`;
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById("question").innerHTML = q.question;
    const optionsList = document.getElementById("options");
    optionsList.innerHTML = "";

    q.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => checkAnswer(option);
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
            nextQuestion();
        }
    }, 1000);
}

// Check answer
function checkAnswer(selectedOption) {
    clearInterval(timer);

    if (selectedOption === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    displayQuestion();
}

// Load questions on start
window.onload = loadQuestions;
