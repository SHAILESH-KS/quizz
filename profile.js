document.addEventListener("DOMContentLoaded", () => {
    try {
        // Fetch the logged-in user data from localStorage
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser) {
            // Display user details
            document.getElementById("user-name").innerText = currentUser.name || "N/A";
            document.getElementById("user-email").innerText = currentUser.email || "N/A";
        } else {
            // Redirect to login page if no user is logged in
            alert("Please log in to view your profile.");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error loading profile:", error);
        alert("An error occurred while loading your profile. Please try again.");
    }
});

// Logout function
function logoutUser() {
    localStorage.removeItem("currentUser"); // Clear current user session
    alert("You have been logged out successfully!");
    window.location.href = "login.html"; // Redirect to login page
}

