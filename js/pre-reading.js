document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('pre-reading-quiz');
    const questions = [
        {
            question: "Is the article's title relevant to your research topic?",
            options: ["Yes", "No"],
            correct: 0
        },
        {
            question: "Does the introduction cover the necessary background?",
            options: ["Yes", "No"],
            correct: 0
        }
    ];

    let currentQuestion = 0;

    function showQuestion() {
        const q = questions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((option, index) => `
                    <label>
                        <input type="radio" name="answer" value="${index}">
                        ${option}
                    </label>
                `).join('')}
            </div>
            <button onclick="submitAnswer()">Submit</button>
        `;
    }

    window.submitAnswer = function() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) return alert("Please select an answer!");

        if (parseInt(selected.value) === questions[currentQuestion].correct) {
            alert("Correct!");
        } else {
            alert("Incorrect. Try again.");
        }

        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            quizContainer.innerHTML = "<p>Quiz complete! Proceed to Reading Lab.</p>";
        }
    };

    showQuestion();
});
