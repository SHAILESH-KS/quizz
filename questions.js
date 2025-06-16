let questions = [
    {
        numb: 1,
        question: "Which country has won the most FIFA World Cup titles?",
        answer: "C. Brazil",
        options: ["A. India", "B. Argentina", "C. Brazil", "D. Germany"]
    },
    {
        numb: 2,
        question: "In which sport would you perform a slam dunk?",
        answer: "B. Basketball",
        options: ["A. Tennis", "B. Basketball", "C. Volleyball", "D. Badminton"]
    },
    {
        numb: 3,
        question: "Who is known as the God of Cricket?",
        answer: "C. Sachin Tendulkar",
        options: ["A. Virat Kohli", "B. M.S. Dhoni", "C. Sachin Tendulkar", "D. Rohit Sharma"]
    },
    {
        numb: 4,
        question: "How many players are there in a standard soccer (football) team on the field?",
        answer: "C. 11",
        options: ["A. 9", "B. 10", "C. 11", "D. 12"]
    },
    {
        numb: 5,
        question: "Which Grand Slam tennis tournament is played on grass courts?",
        answer: "B. Wimbledon",
        options: ["A. Australian Open", "B. Wimbledon", "C. French Open", "D. US Open"]
    },
    {
        numb: 6,
        question: "Who won the ICC Men's Cricket World Cup 2023?",
        answer: "B. Australia",
        options: ["A. India", "B. Australia", "C. England", "D. New Zealand"]
    },
    {
        numb: 7,
        question: "In which year did the Olympic Games first introduce women's boxing?",
        answer: "D. 2012",
        options: ["A. 2000", "B. 2004", "C. 2008", "D. 2012"]
    },
    {
        numb: 8,
        question: "How many players are on the field for a team in a standard rugby union match?",
        answer: "C. 15",
        options: ["A. 11", "B. 13", "C. 15", "D. 18"]
    },
    {
        numb: 9,
        question: "Which athlete holds the record for the most Olympic gold medals?",
        answer: "B. Michael Phelps",
        options: ["A. Usain Bolt", "B. Michael Phelps", "C. Simone Biles", "D. Carl Lewis"]
    },
    {
        numb: 10,
        question: "What is the maximum score a gymnast can achieve in a single routine under the old Olympic scoring system?",
        answer: "C. 10.0",
        options: ["A. 9.5", "B. 9.8", "C. 10.0", "D. 10.5"]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// ✅ Load the first question on page load
window.onload = () => {
    console.log("Script loaded successfully.");
    loadQuestion();
};

// ✅ Function to load a question
function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");

    console.log("Loading question:", currentQuestionIndex);

    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];

        // Apply fade-out animation before loading the new question
        questionElement.classList.add("fade-out");
        setTimeout(() => {
            // Update question text
            questionElement.innerText = q.question;
            questionElement.classList.remove("fade-out");
            questionElement.classList.add("fade-in");

            // Clear and populate options dynamically
            optionsContainer.innerHTML = "";
            q.options.forEach(option => {
                const button = document.createElement("button");
                button.innerText = option;
                button.classList.add("option");
                button.onclick = () => checkAnswer(button, q.answer);
                optionsContainer.appendChild(button);
            });

            // Hide Next button until the user selects an answer
            nextButton.style.display = "none";
        }, 500); // Matches the CSS animation duration
    } else {
        endQuiz(); // End quiz when no more questions
    }
}

// ✅ Function to check the answer
function checkAnswer(button, correctAnswer) {
    const nextButton = document.getElementById("next-btn");
    const options = document.querySelectorAll(".option");

    console.log("Answer selected:", button.innerText);

    // Disable all options after selecting one
    options.forEach(btn => {
        btn.style.pointerEvents = "none"; // Prevent additional clicks
        if (btn.innerText === correctAnswer) {
            btn.style.background = "green"; // Highlight correct answer
            if (btn === button) score++; // Increment score
        } else {
            btn.style.background = "red"; // Highlight incorrect answers
        }
    });

    // Update score display
    document.getElementById("score").innerText = score;

    // Show Next button
    nextButton.style.display = "block";
}

// ✅ Function to handle the Next button click
function handleNextButton() {
    console.log("Next button clicked.");

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

// ✅ Function to end the quiz
function endQuiz() {
    console.log("Quiz ended. Final score:", score);
    localStorage.setItem("quizScore", score); 
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
    }// Save score
    window.location.href = "scorecard.html"; // Redirect to scorecard
}

// ✅ Add Next button event listener
document.getElementById("next-btn").addEventListener("click", handleNextButton);

