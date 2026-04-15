// LoginScript.js - Handle login form submission

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim(); // removes whitespace with .trim();

            if (!username || username === "") {
                alert('Please enter a valid username.');
                return; 
            }

            const escapedUsername = username.replace(/'/g, "''");
            const retrievedUsername = await runQuery(
                `SELECT Username FROM Logger WHERE Username = '${escapedUsername}' LIMIT 1;`
            );

            if (retrievedUsername?.error) {
                alert(`Login unsuccessful: ${retrievedUsername.error}`);
                return;
            }

            if (!retrievedUsername?.success || !Array.isArray(retrievedUsername.data)) {
                alert("Login unsuccessful. Please try again.");
                return;
            }

            if (retrievedUsername.data.length === 0) {
                alert("Username does not exist.");
                return;
            }

            alert("Successful login. Directing you to the home page.");
            window.location.href = "HomePage.html"; // Sends user to homepage
        });
    }
});