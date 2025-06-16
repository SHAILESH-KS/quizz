document.addEventListener("DOMContentLoaded", () => {
    const leaderboardTable = document.getElementById("leaderboard").querySelector("tbody");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Sort users by score in descending order
    users.sort((a, b) => b.score - a.score);

    // Populate table
    users.forEach((user, index) => {
        const row = leaderboardTable.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.score}/10</td>
        `;
    }); // Clears all localStorage data

});
document.getElementById("homeBtn").addEventListener("click", () => {
    window.location.href = "afterlogin.html"; // Replace with your actual homepage file path
});
