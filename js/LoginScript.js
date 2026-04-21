// LoginScript.js - Handle login form submission

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim(); // removes whitespace with .trim();

            if (!username || username === "") {
                showAlert('Please enter a valid username.', true);
                return; 
            }

            // TODO: Implement actual authentication logic here
            if (username) {

                const retrievedUsername = await runQuery(`SELECT Username FROM Logger WHERE Username = '${username}';`);

                // If no usernames returned (username doesn't exist)
                if(retrievedUsername.data.length === 0) {
                    showAlert("Username does not exist.", true);
                    console.log("runQuery returned no data! retrievedUsername.data: " + retrievedUsername.data + ", retrievedUsername.error: " + retrievedUsername.error + ", retrievedUsername.success: " + retrievedUsername.success);
                    // Figure out how to reset page or something

                } else if (retrievedUsername.error != undefined) { // If runqueory returns an error for whatever reason
                    showAlert("Login unsuccessful, error occured", true);
                    console.log("Error: " + retrievedUsername.error + ", Extra data: " + "retrievedUsername.data: " + sername.data + + ", retrievedUsername.success: " + username.success);
                    // figure out how to reset page or something probably
                    
                } else if (retrievedUsername.success) { 
                    showAlert("Successful login. Directing you to the home page...", false);
                    sessionStorage.setItem("loggedInUser", username); // Saves current logged in user to session

                    // Delays before redirecting so user can see success alert
                    setTimeout(function() {
                        window.location.href = "HomePage.html"; 
                    }, 1050);

                    window.location.href = "HomePage.html"; // Sends user to homepage
                } else {
                    showAlert("Unknown failiure", true);
                }
            }
        });
    }
});