let questions = [
    {
        numb: 1,
        question: "Which country has the highest number of time zones?",
        answer: "B. France",
        options: ["A. Russia", "B. France", "C. USA", "D. Australia"]
    },
    {
        numb: 2,
        question: "What is the name of the underwater mountain range that is the longest in the world?",
        answer: "B. Mid-Atlantic Ridge",
        options: ["A. Andes Ridge", "B. Mid-Atlantic Ridge", "C. Pacific Ocean Range", "D. Indian Ocean Ridge"]
    },
    {
        numb: 3,
        question: "Which African lake is known as the \"Calendar Lake\" due to its approximate length of 365 miles and width of 52 miles? ",
        answer: "B. Lake Malaw",
        options: ["A. Lake Victoria", "B. Lake Malaw", "C. Lake Tanganyika", "D. Indian Ocean Ridge"]
    },
    {
        numb: 4,
        question: "What is the only continent without a native population of reptiles?",
        answer: "B. Antarctica",
        options: ["A. Europe", "B. Antarctica", "C. Asia", "D. North America"]
    },
    {
        numb: 5,
        question: "What is the capital city that lies closest to the Equator?",
        answer: "A. Quito, Ecuador",
        options: ["A. Quito, Ecuador", "B. Nairobi, Kenya", "C. Jakarta, Indonesia", "D. Kinshasa, Democratic Republic of the Congo"]
    },
    {
        numb: 6,
        question: "Which country has no landlocked neighbors?",
        answer: "A. Australia",
        options: ["A. Australia" ,"B. Canada","C. Somalia ","D. United Kingdom"]
    },
    {
        numb: 7,
        question: "What is the largest peninsula in the world? ",
        answer: "A. Arabian Peninsula",
        options: ["A. Arabian Peninsula" ,"B. Indian Peninsula","C. Korean Peninsula","D. Scandinavian Peninsula"]
    },
    {
        numb: 8,
        question: "Which island nation is the smallest by land area?",
        answer: "B. Nauru",
        options: ["A. Maldives" ,"B. Nauru","C. Tuvalu","D. Palau"]
    },
    {
        numb: 9,
        question: "  What is the name of the deepest trench in the Earth's oceans?",
        answer: "A. Mariana Trench",
        options: ["A. Mariana Trench" ,"B. Tonga Trench","C. Kermadec Trench","D. Sunda Trench"]
    },
    {
        numb: 10,
        question: "What is the northernmost capital city in the world?",
        answer: "D. Nuuk, Greenland",
        options: ["A. Reykjavik, Iceland" ,"B. Oslo, Norway","C. Helsinki, Finland","D. Nuuk, Greenland"]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// ✅ Load the first question on page load
window.onload = loadQuestion;

// ✅ Function to load a question
function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");

    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];

        // Apply fade-out before loading the new question
        questionElement.classList.add("fade-out");
        setTimeout(() => {
            // Update question text
            questionElement.innerText = q.question;
            questionElement.classList.remove("fade-out"); // Remove fade-out
            questionElement.classList.add("fade-in"); // Apply fade-in

            // Clear and populate options
            optionsContainer.innerHTML = "";
            const fragment = document.createDocumentFragment();
            q.options.forEach(option => {
                const button = document.createElement("button");
                button.innerText = option;
                button.classList.add("option");
                button.onclick = () => checkAnswer(button, q.answer);
                fragment.appendChild(button);
            });
            optionsContainer.appendChild(fragment);

            nextButton.style.display = "none";
        }, 500); // Matches CSS fade duration
    } else {
        endQuiz(); // End quiz when no more questions
    }
}

// ✅ Function to check the answer
function checkAnswer(button, correctAnswer) {
    const nextButton = document.getElementById("next-btn");
    const options = document.querySelectorAll(".option");

    // Disable all options
    options.forEach(btn => {
        btn.style.pointerEvents = "none"; // Prevent additional clicks
        if (btn.innerText === correctAnswer) {
            btn.style.background = "green"; // Correct answer
            if (btn === button) score++; // Increment score
        } else {
            btn.style.background = "red"; // Incorrect answer
        }
    });

    // Update score display
    document.getElementById("score").innerText = score;

    // Show Next button
    nextButton.style.display = "block";
}

// ✅ Function to handle Next button click
function handleNextButton() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

// ✅ Function to end the quiz
function endQuiz() {
    localStorage.setItem("quizScore", score); // Save score
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        currentUser.score = score; // Update the score field for the current user

        const users = JSON.parse(localStorage.getItem("users")) || []; // Fetch all users
        const updatedUsers = users.map((user) =>
            user.email === currentUser.email ? currentUser : user // Update the score for the current user in the list
        );

        // Save the updated user list and current user back to localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save all users
        localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Save current user
    }
    window.location.href = "scorecard.html"; // Redirect to scorecard
}

// ✅ Add Next button event listener
document.getElementById("next-btn").addEventListener("click", handleNextButton);





