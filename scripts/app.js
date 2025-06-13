const quizData = [
    {
        question: "Seit wann gibt es die Schülergenossenschaft Green4u?",
        type: "single",
        options: ["2025", "2017", "2021"],
        correct: [1]
    },
    {
        question: "Worum kümmert sich die Schülerfirma? (mehrere Antworten korrekt)",
        type: "multiple",
        options: [
            "Automaten",
            "Verkauf von Essen (z.B. bei Veranstaltungen)",
            "Verschönerung des Schulhofs"
        ],
        correct: [0, 1]
    },
    {
        question: "Wie heißt die Bank, die uns bei unserer Arbeit unterstützt?",
        type: "single",
        options: [
            "Volksbank RheinAhr Eifel",
            "Sparkasse Neuwied"
        ],
        correct: [0]
    },
    {
        question: "Kann man die Spiralen am Automaten wechseln?",
        type: "single",
        options: ["Ja", "Nein"],
        correct: [0]
    },
    {
        question: "Was macht die Buchhaltung?",
        type: "single",
        options: [
            "Geschäftszahlen im Blick behalten, Geld einzahlen und Rechnungen schreiben",
            "Reinigung der Automaten",
            "Erstellen von Werbung"
        ],
        correct: [0]
    },
    {
        question: "Wie viele Snackautomaten gibt es?",
        type: "single",
        options: ["1", "2", "3"],
        correct: [1]
    },
    {
        question: "Wo bestellen wir unsere Produkte?",
        type: "multiple",
        options: ["Transgourmet", "Metro", "Kaufland"],
        correct: [0]
    },
    {
        question: "Kann man die Preise an den Automaten ändern?",
        type: "single",
        options: [
            "Ja, jederzeit",
            "Nein",
            "Ja, aber nur alle 2 Monate"
        ],
        correct: [0]
    },
    {
        question: "Welche Abteilungen gibt es? (mehrere Antworten möglich)",
        type: "multiple",
        options: [
            "Buchhaltung",
            "Schulhofverschönerung",
            "Verkauf/ Einkauf",
            "Automaten",
            "Schülervertretung",
            "Marketing"
        ],
        correct: [0, 2, 3, 5]
    },
    {
        question: "Wer befüllt die Automaten?",
        type: "single",
        options: [
            "Schüler in Eigenverantwortung",
            "ausschließlich Lehrer",
            "Schüler unter Aufsicht von Lehrern"
        ],
        correct: [0]
    }
];

const quizForm = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const resultDiv = document.getElementById('result');

// Quiz anzeigen
function renderQuiz() {
    quizForm.innerHTML = '';
    quizData.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question-block';
        qDiv.innerHTML = `<div class="question">${idx + 1}. ${q.question}</div>`;
        const optionsList = document.createElement('ul');
        optionsList.className = 'options';
        q.options.forEach((opt, oIdx) => {
            const optId = `q${idx}_opt${oIdx}`;
            const inputType = q.type === 'multiple' ? 'checkbox' : 'radio';
            optionsList.innerHTML += `
                <li>
                    <label>
                        <input type="${inputType}" name="q${idx}" value="${oIdx}" id="${optId}">
                        ${opt}
                    </label>
                </li>
            `;
        });
        qDiv.appendChild(optionsList);
        quizForm.appendChild(qDiv);
    });
}

function getUserAnswers() {
    return quizData.map((q, idx) => {
        const selected = [];
        const inputs = quizForm.querySelectorAll(`input[name="q${idx}"]`);
        inputs.forEach((input, oIdx) => {
            if (input.checked) selected.push(oIdx);
        });
        return selected;
    });
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every(v => b.includes(v));
}

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const userAnswers = getUserAnswers();
    let score = 0;
    quizData.forEach((q, idx) => {
        if (arraysEqual(userAnswers[idx].sort(), q.correct.sort())) {
            score++;
        }
    });
    resultDiv.innerHTML = `Du hast ${score} von ${quizData.length} richtig!`;
    submitBtn.disabled = true;
});

renderQuiz();
