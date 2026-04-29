
// --- VIEW ACCOUNT ELEMENTS ---
const viewPanel = document.getElementById("view-panel");

// Displayed account detail boxes
const viewUsername = document.getElementById("view-username");
const viewForename = document.getElementById("view-forename");
const viewSurname = document.getElementById("view-surname");
const viewEmail = document.getElementById("view-email");

// --- MODIFY ACCOUNT ELEMENTS ---
const modifyPanel = document.getElementById("modify-panel");
const modifyAccountForm = document.getElementById("modify-form");

// Data entry box elements
const enteredUsernameBox = document.getElementById("entered-username");
const usernameConditions = document.getElementById("username-conditions");

const enteredForenameBox = document.getElementById("entered-forename");
const forenameConditions = document.getElementById("forename-conditions");

const enteredSurnameBox = document.getElementById("entered-surname");
const surnameConditions = document.getElementById("surname-conditions");

const enteredEmailBox = document.getElementById("entered-email");
const emailConditions = document.getElementById("email-conditions");

// --- DELETE ACCOUNT ELEMENTS ---
const deletePanel = document.getElementById("delete-panel");
const deleteAccountCheckbox = document.getElementById("confirm-delete"); 
const deleteAccountButton = document.getElementById("delete-account-button");




// --- SELECT ALL PANEL TABS/ELEMENTS --- 
// Selects all panels and panel tabs
const sidebarTabs = document.querySelectorAll('.sidebar-button');
const panels = document.querySelectorAll('.panel');

// ------- PANEL TAB SYSTEM LOGIC --------

// For all sidebar tabs
sidebarTabs.forEach(function(sidebarTab) {
    
    sidebarTab.addEventListener('click', function() {
        
        // Remove active class from all tabs so they are not shown
        sidebarTabs.forEach(function(tab) {
            tab.classList.remove('active');
        });

        // Adds hiden class to all panels to hide them
        panels.forEach(function(panelToHide) {
            panelToHide.classList.add('hidden');
        });

        // Adds active to clicked on tab to show its currently selected
        sidebarTab.classList.add('active');

        // Gets relevant panel linked to button pressed
        const panelToShow = document.getElementById(sidebarTab.getAttribute('data-target'));
        panelToShow.classList.remove('hidden'); // removes hidden tag so its shown
    });
});

// Escape SQL function 
function escapeSql(value) {
    return String(value).replace(/'/g, "''");
}

// ------- VIEW ACCOUNT PANEL LOGIC --------

(async function() {
    const currentUser = escapeSql(sessionStorage.getItem("loggedInUser"));
    
    const loggerQueryResult = await runQuery(`SELECT Username, Forename, Surname, Email FROM Logger WHERE Username = '${currentUser}'`); // Gets kogger details from username

    if(loggerQueryResult?.error) { // If it throws an error
        showAlert("An error occured. Account data could not be pulled", true);
        console.error("Error occured pulling user ID from username. Username: " + currentUser + "Error: " + loggerQueryResult.error);

    } else if(loggerQueryResult?.success && loggerQueryResult?.data.length > 0) { // If userID is successfully pulled from database
        const userData = loggerQueryResult.data[0];

        // Assigns all displayed values to queryed database values:
        viewUsername.textContent = userData.Username;
        viewForename.textContent = userData.Forename;
        viewSurname.textContent = userData.Surname;
        viewEmail.textContent = userData.Email;

        
    } else { // If its not successful but doesn't throw an error
        showAlert("An unknown error occured pulling account data.", true);
        console.log("Session storage - 'loggedInUser': " + sessionStorage.getItem("loggedInUser"))
        console.log(loggerQueryResult);

    }
})();


// ------- MODIFY ACCOUNT PANEL LOGIC -------

// modify account form
modifyAccountForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Stops automatic refresh on submission

    // Finds user logged in
    const currentUser = sessionStorage.getItem("loggedInUser");
    console.log("Logged in user: " + currentUser);
    // Gets form data
    const formData = new FormData(modifyAccountForm);

    // Splits up form data into atomic values
    const username = formData.get("entered-username")
    const forename = formData.get("entered-forename")
    const surname = formData.get("entered-surname")
    const email = formData.get("entered-email")

    enteredUsernameBox.style.border = "";
    usernameConditions.style.color = "";

    enteredForenameBox.style.border = "";
    forenameConditions.style.color = "";

    enteredSurnameBox.style.border = "";
    surnameConditions.style.color = "";

    enteredEmailBox.style.border = "";
    emailConditions.style.color = "";

    // ---------- VALIDATION OF USER INPUT ------------ //

    let isValid = true;

    if(!isValidUsername(username)) {
        isValid = false;
        console.log("Username validation failed");
        enteredUsernameBox.style.border = "2px solid red";
        usernameConditions.style.color = "red";
    }
    if(!isValidName(forename)) {
        isValid = false;
        console.log("Forename validation failed");
        enteredForenameBox.style.border = "2px solid red";
        forenameConditions.style.color = "red";
    }
    if(!isValidName(surname)) {
        isValid = false;
        console.log("Surname validation failed");
        enteredSurnameBox.style.border = "2px solid red";
        surnameConditions.style.color = "red";
    }
    if(!isValidEmail(email)) {
        isValid = false;
        console.log("Email validation failed");
        enteredEmailBox.style.border = "2px solid red";
        emailConditions.style.color = "red";
    }

    if(isValid) { // If validation passes, users new details are updated in database
        // EscapeSQLs all data:
        const escapedUsername = escapeSql(username);
        const escapedForename = escapeSql(forename);
        const escapedSurname = escapeSql(surname);
        const escapedEmail = escapeSql(email);

        const updateResult = await runQuery(`UPDATE Logger SET Username='${escapedUsername}', Forename='${escapedForename}', Surname='${escapedSurname}', Email='${email}' WHERE Username='${currentUser}'`); // TODO: FIGURE OUT SQL UPDATE COMMAND

        if(updateResult?.error) {
            showAlert("An error occured updating account details.", true);
            console.log(updateResult.error);
        }
        else if(updateResult?.success) {
            showAlert("Account details successfully updated", false);
            
            sessionStorage.setItem("loggedInUser", username); // Sets current session to new username
            
            // Updates viewed details so they aren't broken + no page refresh required
            viewUsername.textContent = username;
            viewForename.textContent = forename;
            viewSurname.textContent = surname;
            viewEmail.textContent = email;
        } else {
            showAlert("Unknown error occured updating account details", true);
            console.log(updateResult);
        }
        enteredUsernameBox.style.border = "";
        usernameConditions.style.color = "";

        enteredForenameBox.style.border = "";
        forenameConditions.style.color = "";

        enteredSurnameBox.style.border = "";
        surnameConditions.style.color = "";

        enteredEmailBox.style.border = "";
        emailConditions.style.color = "";

    } else {
        showAlert("Invalid inputed entered.", true); // Tells user their inputs invalid
    }
});


// ------- DELETE ACCOUNT PANEL LOGIC -------

// Delete account checkbox logic
deleteAccountCheckbox.addEventListener('change', function(e) {
    if(e.target.checked) { deleteAccountButton.disabled = false; }  // If the confirmation buttons checked the delete button is enabled
    else { deleteAccountButton.disabled = true; }  // Otherwise its disabled
});

// Delete account button logic 
deleteAccountButton.addEventListener('click', async function() { // On click of delete account button
    const currentUser = escapeSql(sessionStorage.getItem("loggedInUser"));

    const deletionResult = await runQuery(`DELETE FROM Logger WHERE Username ='${currentUser}'`); // SQL to delete users account

    // Handles SQL potential errors/success/unknowbn
    if(deletionResult.error) { // If known error
        showAlert("An error occured deleting your account.", true);
        console.log(deletionResult.error);

    } else if(deletionResult.success) { // If success users login status is reset + sends them to login page
        showAlert("Account deletion success", false);
        sessionStorage.clear();

        setTimeout(function() {
            window.location.href = "index.html"; 
        }, 1050);

    } else { // If unknown error
        showAlert("An unknown error occured", true); 
        console.log(deletionResult)
    }
});