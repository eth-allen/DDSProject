// login-script.js - Handle login form submission
{
const loginForm = document.getElementById('login-form');

const usernameBox = document.getElementById('username');
const usernameConditions = document.getElementById('username-conditions'); 

const passwordBox = document.getElementById('password');
const passwordConditions = document.getElementById('password-conditions')

if (loginForm) { // prevents script from 
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        // Resets UX highlighting for invalid fields (so if one becomes valid this time its not highlighted invalid from leftovers of last time validating)
        usernameBox.style.border = "";
        usernameConditions.style.color = "";
        passwordBox.style.border = "";
        passwordConditions.style.color = "";

        // User input, escaped + trimmed
        const inputtedUsername = escapeSql(document.getElementById('username').value.trim());
        const inputtedPassword = escapeSql(document.getElementById('password').value.trim());

        if (!inputtedUsername || inputtedUsername === "") {
            usernameBox.style.border = "2px solid red";
            usernameConditions.style.color = "red";
            passwordBox.style.border = "2px solid red";
            passwordConditions.style.color = "red";
            showAlert('Please enter a valid username.', true);

        } else if(!inputtedPassword || inputtedPassword === "") { 
            showAlert('Please enter a valid password.', true);
            passwordBox.style.border = "2px solid red";
            passwordConditions.style.color = "red";
            usernameBox.style.border = "2px solid red";
            usernameConditions.style.color = "red";
        } else {
            const retrievedData = await runQuery(`SELECT LoggerID, Username, Role, Password FROM Logger WHERE Username = '${inputtedUsername}';`);

            // If no usernames returned (username doesn't exist)
            if (retrievedData.error != undefined) { // If runqueory returns an error for whatever reason
                showAlert("Login unsuccessful, error occured", true);
                console.log("Error: " + retrievedData.error + ", Extra data: " + "retrievedUsername.data: " + retrievedData.data +  ", retrievedUsername.success: " + retrievedData.success);
            }
            else if(retrievedData.data.length === 0) {
                showAlert("Username does not exist.", true);
                usernameBox.style.border = "2px solid red";
                usernameConditions.style.color = "red";
                passwordBox.style.border = "2px solid red";
                passwordConditions.style.color = "red";
                console.log("runQuery returned no data! retrievedUsername.data: " + retrievedData.data + ", retrievedUsername.error: " + retrievedData.error + ", retrievedUsername.success: " + retrievedData.success);
            } else if (retrievedData.success) { // If successful all details are updated

                // Gets retrieved data
                const data = retrievedData.data[0];

                // Compared user inputted password to one stored in db relevant to account
                if(inputtedPassword === data.Password) {

                    // Setting user data in session storage with retrieved data.
                    const StoredLoggerID = data.LoggerID;
                    const StoredUsername = data.Username;
                    const StoredRole = data.Role;

                    console.log("User Object returned from databse: ", data);
                    console.log(`Retrieved LoggerID:, ${StoredLoggerID} Retrieved Username: ${StoredUsername} Retrieved Role: ${StoredRole}`);

                    sessionStorage.setItem("loggerID", StoredLoggerID); // Saves logger id to session storage
                    sessionStorage.setItem("loggedInUser", StoredUsername); // Saves current logged in user to session
                    sessionStorage.setItem("loggerRole", StoredRole); // Saves logger role to session storage


                    // Visual feedback for action + redirection:
                    showAlert("Successful login. Directing you to the home page...", false);

                    setTimeout(function() {
                        window.location.href = "homepage.html"; 
                    }, 500); // Timer so user can see visual feedback
                } else {
                    // If passwords invalid orange visual feedbacks shown to show its invalid to user
                    showAlert("Password does not match account", true);
                    passwordBox.style.border = "2px solid red";
                    passwordConditions.style.color = "red";
                }
            }
        } 
    });
};
}