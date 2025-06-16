const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');

// Start button - Opens the quiz guide popup
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

// Exit button - Closes the popup
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

// Continue button - Closes popup and shows the quiz
continueBtn.onclick = () => {
    window.location.href = "aquestions.html";
};