document.addEventListener("DOMContentLoaded", () => {
    try {
      // Fetch the logged-in user (currentUser) from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
      // Check if the currentUser exists and has a score property
      if (currentUser && currentUser.score !== undefined) {
        // Display the logged-in user's score
        document.getElementById("score-display").innerText = `Your Score: ${currentUser.score}/10`;
      } else {
        // Fallback message if no score or no user is logged in
        document.getElementById("score-display").innerText = "No score available. Please log in!";
      }
  
      // 🎉 Add fun animations for a polished experience
      const scoreHeader = document.querySelector('.score-header h1');
      scoreHeader.style.opacity = 0;
      scoreHeader.style.transform = "translateY(-50px)";
  
      setTimeout(() => {
        scoreHeader.style.transition = "all 1s ease-out";
        scoreHeader.style.opacity = 1;
        scoreHeader.style.transform = "translateY(0)";
      }, 300);
    } catch (error) {
      // Handle errors gracefully
      console.error("Error loading scorecard:", error);
      document.getElementById("score-display").innerText = "An error occurred. Please try again later.";
    }
  });
  
  // Function to update the score for the logged-in user (call this after the quiz ends)
  function updateScore(newScore) {
    try {
      // Fetch the logged-in user (currentUser) from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
      if (!currentUser) {
        alert("No user is currently logged in!");
        return;
      }
  
      // Update the score for the current user
      currentUser.score = newScore;
  
      // Fetch all users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Update the current user's score in the users list
      const updatedUsers = users.map((user) =>
        user.email === currentUser.email ? currentUser : user
      );
  
      // Save the updated user list and current user back to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
  
      // Notify the user and update the displayed score
      alert(`Your score has been updated to ${newScore}/10!`);
      document.getElementById("score-display").innerText = `Your Score: ${newScore}/10`;
    } catch (error) {
      // Handle errors gracefully
      console.error("Error updating score:", error);
      alert("An error occurred while updating the score. Please try again.");
    }
  }
  
  


