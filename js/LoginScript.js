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

                // If no usernames returned (username doesn't exist)
                if(retrievedUsername.data.length === 0) {
                    alert("Username does not exist.");
                    console.log("runQuery returned no data! retrievedUsername.data: " + retrievedUsername.data + ", retrievedUsername.error: " + retrievedUsername.error + ", retrievedUsername.success: " + retrievedUsername.success);
                    // Figure out how to reset page or something

                } else if (retrievedUsername.error != undefined) { // If runqueory returns an error for whatever reason
                    alert("Login unsuccessful, error occured");
                    console.log("Error: " + retrievedUsername.error + ", Extra data: " + "retrievedUsername.data: " + sername.data + + ", retrievedUsername.success: " + username.success);
                    // figure out how to reset page or something probably
                    
                } else if (retrievedUsername.success) { 
                    alert("Successful login. Directing you to the home page");
                    sessionStorage.setItem("loggedInUser", username); // Saves current logged in user to session
                    window.location.href = "HomePage.html"; // Sends user to homepage
                } else {
                    alert("Unknown failiure");
                }
            }
        });
    }
});