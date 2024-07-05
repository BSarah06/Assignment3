document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: "Mars"
        },
        {
            question: "Who was the first person to walk on the moon?",
            answers: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
            correct: "Neil Armstrong"
        },
        {
            question: "What is the name of NASA's most famous space telescope?",
            answers: ["Hubble Space Telescope", "James Webb Space Telescope", "Kepler Space Telescope", "Chandra X-ray Observatory"],
            correct: "Hubble Space Telescope"
        },
        {
            question: "Which spacecraft was the first to fly by Pluto?",
            answers: ["Voyager 1", "New Horizons", "Pioneer 10", "Cassini"],
            correct: "New Horizons"
        },
        {
            question: "Which space mission successfully landed the first humans on the Moon?",
            answers: ["Apollo 11", "Apollo 13", "Apollo 8", "Gemini 12"],
            correct: "Apollo 11"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const usernameInput = document.getElementById('username');
    const startQuizButton = document.getElementById('start-quiz');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answersForm = document.getElementById('answers');
    const nextQuestionButton = document.getElementById('next-question');
    const resultContainer = document.getElementById('result-container');
    const resultElement = document.getElementById('result');

    startQuizButton.addEventListener('click', function() {
        if (usernameInput.value.trim() !== "") {
            document.getElementById('auth-container').style.display = 'none';
            questionContainer.style.display = 'block';
            displayQuestion();
        } else {
            alert("Please enter a username to start the quiz.");
        }
    });

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answersForm.innerHTML = '';
        currentQuestion.answers.forEach(answer => {
            const answerOption = document.createElement('input');
            answerOption.type = 'radio';
            answerOption.name = 'answer';
            answerOption.value = answer;
            const label = document.createElement('label');
            label.textContent = answer;
            label.appendChild(answerOption);
            answersForm.appendChild(label);
            answersForm.appendChild(document.createElement('br'));
        });
        nextQuestionButton.style.display = 'none';
    }

    answersForm.addEventListener('change', function() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correct) {
            document.querySelector(`label:has(input[value="${selectedAnswer}"])`).classList.add('correct');
            score++;
        } else {
            document.querySelector(`label:has(input[value="${selectedAnswer}"])`).classList.add('incorrect');
            document.querySelector(`label:has(input[value="${currentQuestion.correct}"])`).classList.add('correct');
        }
        nextQuestionButton.style.display = 'block';
    });

    nextQuestionButton.addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            questionContainer.style.display = 'none';
            resultContainer.style.display = 'block';
            resultElement.textContent = `Quiz completed! Your score is ${score}/${questions.length}.`;
        }
    });
});
