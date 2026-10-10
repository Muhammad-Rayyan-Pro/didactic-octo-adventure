    
// ======================================
// QUIZ MASTER - Quiz Application
// ======================================

// All quiz questions and correct answers
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "SQL"
        ],
        answer: 1
    },
    {
        question: "Which language adds interactivity to webpages?",
        options: [
            "CSS",
            "HTML",
            "JavaScript",
            "XML"
        ],
        answer: 2
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "@",
            "*"
        ],
        answer: 1
    }
];

// Get HTML elements
const questionCount = document.getElementById("question-count");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const resultDetails = document.getElementById("result-details");
const restartButton = document.getElementById("restart-btn");

// Track quiz progress
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// Display the current question
function showQuestion() {
    answerSelected = false;

    const currentQuestion = questions[currentQuestionIndex];

    questionCount.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    questionElement.textContent = currentQuestion.question;

    // Remove options from the previous question
    optionsContainer.innerHTML = "";

    feedback.textContent = "";
    feedback.className = "";

    // Create four answer buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        optionsContainer.appendChild(button);
    });

    nextButton.disabled = true;

    // Change button text on the final question
    nextButton.textContent =
        currentQuestionIndex === questions.length - 1
            ? "See Results →"
            : "Next Question →";
}

// Check the selected answer
function selectAnswer(selectedIndex) {
    if (answerSelected) return;

    answerSelected = true;

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll(".option-btn");

    // Disable all options after an answer is selected
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    // Highlight the correct answer
    optionButtons[currentQuestion.answer].classList.add("correct");

    if (selectedIndex === currentQuestion.answer) {
        score++;

        feedback.textContent = "✓ Correct answer! Well done.";
        feedback.className = "correct-text";
    } else {
        optionButtons[selectedIndex].classList.add("incorrect");

        feedback.textContent = "✗ Incorrect. The correct answer is highlighted.";
        feedback.className = "incorrect-text";
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

// Move to the next question or show results
function nextQuestion() {
    if (!answerSelected) return;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Display final score
function showResults() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    finalScore.textContent = `${score}/${questions.length}`;

    const percentage = Math.round((score / questions.length) * 100);

    if (percentage === 100) {
        resultMessage.textContent = "Perfect Score! 🥳";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good Job! 👏";
    } else {
        resultMessage.textContent = "Keep Practicing! 💪";
    }

    resultDetails.textContent =
        `You answered ${score} out of ${questions.length} questions correctly (${percentage}%).`;
}

// Restart the entire quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;

    resultScreen.hidden = true;
    quizScreen.hidden = false;

    showQuestion();
}

// Button event listeners
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
showQuestion();
