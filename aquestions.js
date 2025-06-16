let questions = [
    {
        numb: 1,
        question: "A man sells two articles for ₹2000 each. On one, he gains 20%, and on the other, he loses 20%. What is his net profit or loss percentage?",
        answer: "C. 4% loss",
        options: ["A. 0% profit or loss", "B. 2% profit", "C. 4% loss", "D. 5% loss"]
    },
    {
        numb: 2,
        question: "A clock takes 6 seconds to strike 6 times. How long will it take to strike 12 times?",
        answer: "B. 11 seconds",
        options: ["A. 12 seconds", "B. 11 seconds", "C. 3 seconds", "D. 15 seconds"]
    },
    {
        numb: 3,
        question: "Rearrange: \"ambitions his despite dreamt of something beyond career he.\"",
        answer: "C. Despite his ambitions, he dreamt of something beyond his career",
        options: ["A.  He dreamt something beyond his career despite ambitions", "B. Beyond his career, despite ambitions, he dreamt of something", "C. Despite his ambitions, he dreamt of something beyond his career", "D. Something he dreamt despite beyond career ambitions"]
    },
    {
        numb: 4,
        question: "Choose the odd one out:",
        answer: "B. Predictable",
        options: ["A. Arbitrary" ,"B. Predictable ","C. Capricious","D. Erratic"]
    },
    {
        numb: 5,
        question: "A container has 50 liters of juice. After 5 liters are replaced with water five times, what is the juice-to-water ratio?",
        answer: "B. 18:32",
        options: ["A. 15:35", "B. 18:32", "C. 20:30", "D. 21:29"]
    },
    {
        numb: 6,
        question: " A man walks 10 km south, 10 km east, and 10 km north, reaching the same point. Where is he?",
        answer: "C. North Pole",
        options: ["A. Arctic Circle", "B. Equator", "C. North Pole", "D. Tropic of Capricorn"]
    },
    {
        numb: 7,
        question: " Five friends—P, Q, R, S, and T—are sitting in a row.Q is to the immediate left of R.P is second to the right of R.S is to the immediate right of T. Who is in the middle?",
        answer: "B. R",
        options: ["A. P" ,"B. R","C. S","D. T"]
    },
    {
        numb: 8,
        question: " A man says, \"She is the mother of my wife’s father’s only granddaughter.\" How is she related to him? ",
        answer: "D. Wife",
        options: ["A. Daughter" ,"B. Sister ","C. Mother-in-law","D. Wife"]
    },
    {
        numb: 9,
        question: " A bag has 6 red, 5 blue, and 4 green balls. What is the probability of picking at least one red ball in two draws?",
        answer: "A. 27/35",
        options: ["A. 27/35" ,"B. 7/15","C. 33/45","D. 11/15"],
    },
    {
        numb: 10,
        question: " There are 100 doors. You toggle all doors on the first pass, every second door on the second pass, etc. How many doors stay open after 100 passes? ",
        answer: "C. 10",
        options: ["A. 50" ,"B. 40 ","C. 10","D. 15"]
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
