const questions = [ 
    {
        question: "What should you do if you see a red traffic light?",
        answer: [
            { text: "Stop", correct: true },
            { text: "Go fast", correct: false },
            { text: "Slow down but keep going", correct: false },
            { text: "Honk and pass", correct: false }
        ]
    },
    {
        question: "Where should we throw garbage?",
        answer: [
            { text: "On the road", correct: false },
            { text: "In a park", correct: false },
            { text: "In a dustbin", correct: true },
            { text: "Anywhere", correct: false }
        ]
    },
    {
        question: "What should you do when someone older enters a bus?",
        answer: [
            { text: "Ignore them", correct: false },
            { text: "Offer your seat", correct: true },
            { text: "Ask them to stand", correct: false },
            { text: "Shout at them", correct: false }
        ]
    },
    {
        question: "Why should we follow traffic rules?",
        answer: [
            { text: "To look cool", correct: false },
            { text: "To waste time", correct: false },
            { text: "To make noise", correct: false },
            { text: "To stay safe", correct: true }
        ]
    },
    {
        question: "What should you do if you see someone littering?",
        answer: [
            { text: "Politely ask them to use a bin", correct: true },
            { text: "Throw more litter", correct: false },
            { text: "Ignore it", correct: false },
            { text: "Clap for them", correct: false }
        ]
    },
    {
        question: "When crossing the road, where should you cross?",
        answer: [
            { text: "Anywhere", correct: false },
            { text: "In the middle of traffic", correct: false },
            { text: "Behind vehicles", correct: false },
            { text: "On a zebra crossing", correct: true }
        ]
    },
    {
        question: "What should you do if a friend is in trouble?",
        answer: [
            { text: "Laugh at them", correct: false },
            { text: "Ignore them", correct: false },
            { text: "Help them", correct: true },
            { text: "Run away", correct: false }
        ]
    },
    {
        question: "Why should we respect teachers and elders?",
        answer: [
            { text: "Because they guide us", correct: true },
            { text: "Because they give money", correct: false },
            { text: "Because we are forced to", correct: false },
            { text: "For fun", correct: false }
        ]
    },
    {
        question: "What should you do with water?",
        answer: [
            { text: "Waste it", correct: false },
            { text: "Throw it on roads", correct: false },
            { text: "Leave taps open", correct: false },
            { text: "Save it", correct: true }
        ]
    },
    {
        question: "Why should we plant trees?",
        answer: [
            { text: "For fresh air", correct: true },
            { text: "To cut them immediately", correct: false },
            { text: "To block roads", correct: false },
            { text: "To make noise", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0; 
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target; 
    const isCorrect = selectBtn.dataset.correct === "true";

    if(isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();