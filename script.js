const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "ant", correct: false},
            { text: "Elephant", correct: false},
        ]
    },
     {
        question: "Which is the capital of West Bengal?",
        answers: [
            { text: "Durgapur",correct: false},
            {text: "Siliguri",correct: false},
            {text: "kolkata",correct: true},
           {text: "Burdwan",correct: false},
        ]
     },
     {
        question: "Who won 2007 T20 World Cup?",
        answers: [
            { text: "India",correct: true},
            {text : "Australia",correct: false},
            {text: "Pakistan",correct: false},
            {text: "England",correct: false},
        ]
     },
     {
     question: "Who won 2010 FIFA world cup?",
        answers : [
            { text: "Argentina",correct: false},
            {text : "Spain",correct: true},
            {text : "Germany",correct: false},
            {text : "Portugal",correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
