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

            // TODO: Implement actual authentication logic here
            if (username) {

                const retrievedUsername = await runQuery(`SELECT Username FROM Logger WHERE Username = '${username}';`);

                if(retrievedUsername.data != []) {
                    alert("Username does not exist.");
                    // figure out how to like reset page or something

                } else if (retrievedUsername.error === undefined){
                    alert("Login unsuccessful, error occured");
                    // figure out how to reset page or something probably
                } else if (retrievedUsername.success) {
                    alert("Successful login. Directing you to the home page");
                    window.location.href = "HomePage.html"; // Sends user to homepage
                } else {
                    alert("Unknown failiure");
                }
                
                console.log(existingUsernames);
                // Figure out how to validate
                window.location.href = 'HomePage.html';
            }
        });
    }
});