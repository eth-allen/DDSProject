// LoginScript.js - Handle login form submission
{
const loginForm = document.getElementById('loginForm');

if (loginForm) { // prevents script from 
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim(); // removes whitespace with .trim();

        if (!username || username === "") {
            showAlert('Please enter a valid username.', true);
            return; 
        }

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

                setTimeout(function() {
                    sessionStorage.setItem("loggedInUser", username); // Saves current logged in user to session
                    window.location.href = "HomePage.html"; 
                }, 500); // Timer so user can see visual feedback

            } else {
                showAlert("Unknown failiure", true);
            }
        }
    });
};
}