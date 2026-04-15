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

<<<<<<< HEAD
            if (retrievedUsername?.error) {
                alert(`Login unsuccessful: ${retrievedUsername.error}`);
                return;
=======
                const retrievedUsername = await runQuery(`SELECT Username FROM Logger WHERE Username = '${username}';`);

                // If no usernames returned (username doesn't exist)
                if(retrievedUsername.data.length === 0) {
                    alert("Username does not exist.");
                    console.log("runQuery returned no data! Username.data: " + username.data + ", Username.error: " + username.error + ", Username.success: " + username.success);
                    // Figure out how to reset page or something

                } else if (retrievedUsername.error != undefined) { // If runqueory returns an error for whatever reason
                    alert("Login unsuccessful, error occured");
                    console.log("Error: " + retrievedUsername.error + ", Extra data: " + "Username.data: " + username.data + + ", Username.success: " + username.success);
                    // figure out how to reset page or something probably
                    
                } else if (retrievedUsername.success) { 
                    alert("Successful login. Directing you to the home page");
                    window.location.href = "HomePage.html"; // Sends user to homepage
                } else {
                    alert("Unknown failiure");
                }
>>>>>>> 309dddca8bf12c7cf6f05094e2ca702ae7a31e68
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