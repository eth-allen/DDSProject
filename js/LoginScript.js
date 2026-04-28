// LoginScript.js - Handle login form submission
{
const loginForm = document.getElementById('loginForm');

if (loginForm) { // prevents script from 
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const inputtedUsername = escapeSql(document.getElementById('username').value.trim()); // Escaped input + removes whitespace with .trim();

        if (!inputtedUsername || inputtedUsername === "") {
            showAlert('Please enter a valid username.', true);
            return; 
        }

        if (inputtedUsername) {
            const retrievedData = await runQuery(`SELECT LoggerID, Username, Role FROM Logger WHERE Username = '${inputtedUsername}';`);

            // If no usernames returned (username doesn't exist)
            if(retrievedData.data.length === 0) {
                showAlert("Username does not exist.", true);
                console.log("runQuery returned no data! retrievedUsername.data: " + retrievedData.data + ", retrievedUsername.error: " + retrievedData.error + ", retrievedUsername.success: " + retrievedData.success);

            } else if (retrievedData.error != undefined) { // If runqueory returns an error for whatever reason
                showAlert("Login unsuccessful, error occured", true);
                console.log("Error: " + retrievedData.error + ", Extra data: " + "retrievedUsername.data: " + sername.data + + ", retrievedUsername.success: " + inputtedUsername.success);
           
            } else if (retrievedData.success) { // If successful all details are updated

                // Setting user data in session storage with retrieved data.
                const data = retrievedData.data;

                const StoredLoggerID = data.LoggerID;
                const StoredUsername = data.Username;
                const StoredRole = data.Role;

                sessionStorage.setItem("loggerID", StoredLoggerID) // Saves logger id to session storage
                sessionStorage.setItem("loggedInUser", StoredUsername); // Saves current logged in user to session
                sessionStorage.setItem("loggerRole", StoredRole); // Saves logger role to session storage


                // Visual feedback for action + redirection:

                showAlert("Successful login. Directing you to the home page...", false);

                setTimeout(function() {
                    window.location.href = "HomePage.html"; 
                }, 500); // Timer so user can see visual feedback

            } else {
                showAlert("Unknown failiure", true);
            }
        }
    });
};
}