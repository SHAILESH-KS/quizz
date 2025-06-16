let moviequestions = [
    {
        numb: 1,
        question: "Which Tamil movie features Rajinikanth as Manik Baasha, a don with a mysterious past?",
        answer: "C. Baashha",
        options: ["A. Annamalai", "B. Thalapathi", "C. Baashha", "D. Sivaji"]
    },
    {
        numb: 2,
        question: "What was the first Tamil movie to feature Kamal Haasan and Rajinikanth together?",
        answer: "D. Moondru Mudichu",
        options: ["A. Apoorva Raagangal", "B. 16 Vayathinile", "C. Aval Appadithan", "D. Moondru Mudichu"]
    },
    {
        numb: 3,
        question: "In the 2021 Tamil hit 'Doctor,' what unconventional profession does Sivakarthikeyan's character have?",
        answer: "B. Army doctor",
        options: ["A. Detective", "B. Army doctor", "C. Police officer", "D. Forensic scientist"]
    },
    {
        numb: 4,
        question: "Which Tamil film, directed by Mani Ratnam, is a cinematic adaptation of Kalki’s historical novel 'Ponniyin Selvan'?",
        answer: "C. Ponniyin Selvan",
        options: ["A. Aayutha Ezhuthu", "B. Iruvar", "C. Ponniyin Selvan", "D. Roja"]
    },
    {
        numb: 5,
        question: "Which recent Tamil film starring Vijay portrays him as a spy operating under the codename Leo?",
        answer: "C. Leo",
        options: ["A. Beast", "B. Master", "C. Leo", "D. Bigil"]
    },
    {
        numb: 6,
        question: "Which Tamil film features the iconic dialogue 'Naalu perukku nalladhu nadandha en manasukkullae romba santhosham'?",
        answer: "A. Nayagan",
        options: ["A. Nayagan", "B. Roja", "C. Devar Magan", "D. Mouna Ragam"]
    },
    {
        numb: 7,
        question: "In which movie does Dhanush play an assassin who travels to London for an assignment?",
        answer: "C. Jagame Thandhiram",
        options: ["A. Asuran", "B. The Gray Man", "C. Jagame Thandhiram", "D. Maaran"]
    },
    {
        numb: 8,
        question: "Which Tamil movie, released in 2023, explores the struggles of a teacher trying to bring reform to a rural school?",
        answer: "A. Vaathi",
        options: ["A. Vaathi", "B. Viduthalai", "C. Karnan", "D. Jai Bhim"]
    },
    {
        numb: 9,
        question: "Who composed the chartbuster music for the 2022 Tamil blockbuster 'Vikram'?",
        answer: "A. Anirudh Ravichander",
        options: ["A. Anirudh Ravichander", "B. A.R.Rahman", "C. Yuvan Shankar Raja", "D. Harris Jayaraj"]
    },
    {
        numb: 10,
        question: "What is the title of the Tamil movie directed by Ashwath Marimuthu that revolves around the concept of second chances?",
        answer: "A. Oh My Kadavule",
        options: ["A. Oh My Kadavule", "B. Oh My Ghost", "C. Don", "D. Nenjukku Needhi"]
    }
];

let currentMovieQuestionIndex = 0;
let movieScore = 0;

// ✅ Load the first movie question on page load
window.onload = () => {
    // Dynamically set the total number of questions
    document.getElementById("movie-total-questions").innerText = moviequestions.length;
    loadMovieQuestion();
};

// ✅ Function to load a movie question
function loadMovieQuestion() {
    const questionElement = document.getElementById("movie-question");
    const optionsContainer = document.getElementById("movie-answer-buttons");
    const nextButton = document.getElementById("next-btn");

    if (currentMovieQuestionIndex < moviequestions.length) {
        const q = moviequestions[currentMovieQuestionIndex];

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
                button.onclick = () => checkMovieAnswer(button, q.answer);
                fragment.appendChild(button);
            });
            optionsContainer.appendChild(fragment);

            nextButton.style.display = "none";
        }, 500); // Matches CSS fade duration
    } else {
        endMovieQuiz(); // End quiz when no more questions
    }
}

// ✅ Function to check the movie answer
function checkMovieAnswer(button, correctAnswer) {
    const nextButton = document.getElementById("next-btn");
    const options = document.querySelectorAll(".option");

    // Disable all options
    options.forEach(btn => {
        btn.style.pointerEvents = "none"; // Prevent additional clicks
        if (btn.innerText === correctAnswer) {
            btn.style.background = "green"; // Highlight correct answer
            if (btn === button) movieScore++; // Increment score
        } else {
            btn.style.background = "red"; // Highlight incorrect answers
        }
    });

    // Update score display
    document.getElementById("movie-score").innerText = movieScore;

    // Show Next button
    nextButton.style.display = "block";
}

// ✅ Function to handle the Next button click for movie questions
function handleMovieNextButton() {
    if (currentMovieQuestionIndex < moviequestions.length - 1) {
        currentMovieQuestionIndex++;
        loadMovieQuestion();
    } else {
        endMovieQuiz();
    }
}

// ✅ Function to end the movie quiz
function endMovieQuiz() {
    localStorage.setItem("movieQuizScore", movieScore);

    // 🔴 Added: Update the score for the logged-in user in localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        currentUser.score = movieScore; // Update the score field for the current user

        const users = JSON.parse(localStorage.getItem("users")) || []; // Fetch all users
        const updatedUsers = users.map((user) =>
            user.email === currentUser.email ? currentUser : user // Update the score for the current user in the list
        );

        // Save the updated user list and current user back to localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save all users
        localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Save current user
    }
    window.location.href = "scorecard.html"; // Redirect to movie scorecard
}

// ✅ Add Next button event listener
document.getElementById("next-btn").addEventListener("click", handleMovieNextButton);


