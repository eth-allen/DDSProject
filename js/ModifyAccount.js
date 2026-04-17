
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
const forenameConditions = document.getElementById("username-conditions");

const enteredSurnameBox = document.getElementById("entered-surname");
const surnameConditions = document.getElementById("username-conditions");

const enteredEmailBox = document.getElementById("entered-email");
const emailConditions = document.getElementById("username-conditions");

// --- DELETE ACCOUNT ELEMENTS ---
const deletePanel = document.getElementById("delete-panel");

// --- SELECT ALL PANEL TABS/ELEMENTS
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


// ------- VIEW ACCOUNT PANEL LOGIC --------







// ------- MODIFY ACCOUNT PANEL LOGIC -------

// modify account form
modifyAccountForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Stops automatic refresh on submission

    // Finds user logged in
    const currentUser = sessionStorage.getItem("loggedInUser");

    // Gets form data
    const formData = new FormData(modifyAccountForm);

    // Splits up form data into atomic values
    const username = formData.get("entered-username")
    const forename = formData.get("entered-forename")
    const surname = formData.get("entered-surname")
    const email = formData.get("entered-email")

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
        //const updateRes = await runQuery(`UPDATE Logger SET username='${username}', forename='${forename}', surname='${surname}', email='${email}' WHERE username='${currentUser}'`); // TODO: FIGURE OUT SQL UPDATE COMMAND
    } else {
        alert("Invalid inputed entered."); // Gives user feedback
    }


});