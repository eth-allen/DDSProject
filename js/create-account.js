// Gets all HTML elements required
const loginForm = document.getElementById("loginForm");

const usernameBox = document.getElementById("username");
const usernameConditions = document.getElementById("usernameConditions")

const forenameBox = document.getElementById("forename");
const forenameConditions = document.getElementById("forenameConditions")

const surnameBox = document.getElementById("surname");
const surnameConditions = document.getElementById("surnameConditions")

const emailBox = document.getElementById("email");
const emailConditions = document.getElementById("emailConditions")

const roleBox = document.getElementById("role");
const roleConditions = document.getElementById("roleConditions");


function escapeSql(value) {
    return String(value).replace(/'/g, "''");
}

// Event listener, when submit button in login form is pressed, stuff in event listener occurs
loginForm.addEventListener("submit", async function(event) {
    
    event.preventDefault(); // stops page automatically refreshing when submits pressed

    // ---------- RESETS ALL ELEMENTS COLOURS + STUFF TO STOP SPILLOVER FROM FORMER SUBMISSIONS ----------- //
    usernameBox.style.border = ""; 
    usernameConditions.style.color = "";

    forenameBox.style.border = "";
    forenameConditions.style.color = "";

    surnameBox.style.border = "";
    surnameConditions.style.color = "";

    emailBox.style.border = "";
    emailConditions.style.color = "";

    roleBox.style.border = "";
    roleConditions.style.color = "";
    // ---------- SEPERATING FORM ELEMENTS INTO VARIALES ------------ //

    // Turns entered form information into form data variable
    const formData = new FormData(loginForm); 

    // Splits up data into seperate varaibles from formData
    const username = formData.get("username");
    const forename = formData.get("forename");
    const surname = formData.get("surname");
    const email = formData.get("email");
    const role = formData.get("role");

    // ---------- VALIDATION OF USER INPUT ------------ //

    let isValid = true;


    if(!isValidUsername(username)) {
        isValid = false;
        console.log("Username validation failed");
        usernameBox.style.border = "2px solid red";
        usernameConditions.style.color = "red";
    }
    if(!isValidName(forename)) {
        isValid = false;
        console.log("Forename validation failed");
        forenameBox.style.border = "2px solid red";
        forenameConditions.style.color = "red";
    }
    if(!isValidName(surname)) {
        isValid = false;
        console.log("Surname validation failed");
        surnameBox.style.border = "2px solid red";
        surnameConditions.style.color = "red";
    }
    if(!isValidEmail(email)) {
        isValid = false;
        console.log("Email validation failed");
        emailBox.style.border = "2px solid red";
        emailConditions.style.color = "red";
    }
    if (!isValidRole(role)) {
        isValid = false;
        console.log("Role validation failed");
        roleBox.style.border = "2px solid red";
        roleConditions.style.color = "red";
    }
    // ---------- SUBMISSION OF FORM TO DATABASE ------------ //

    // --- FORM SUBMISSION
    if (isValid) {

        const escapedUsername = escapeSql(username);
        const escapedForename = escapeSql(forename);
        const escapedSurname = escapeSql(surname);
        const escapedEmail = escapeSql(email);
        const escapedRole = escapeSql(role);

        // Inserts SQL into the database
        const insertResult = await runQuery(`INSERT INTO Logger (username, forename, surname, email, role) VALUES ('${escapedUsername}', '${escapedForename}', '${escapedSurname}', '${escapedEmail}', '${escapedRole}')`);

        //If theres an error with sql query
        if (insertResult?.error) {
            console.error("Data load error", {insertResult});
            showAlert("An error occured. Account creation unsuccessful", true)
        }
        // Else direct user to homepage logged in (or login page if thats too hard)
        else { 
            showAlert("Account created successfully, directing you to login page", false); 
            setTimeout(function() {
                console.log("Account created with username: " + escapedUsername + "forename: " + escapedForename + "surname: " + escapedSurname + "email: " + escapedEmail)
                window.location.href = "index.html"; 
            }, 1000); // Timer so user can see visual feedback
        }
    }
    else {
        // If anything in form was invalid (isValid is false)
        console.log("Form validation failed (isValid is false)");
        showAlert("Invalid form data entered.", true); // Probably better less intrusvie way of doing this like through html editing 
    }
}); // } + ) is normal because of how event listener works 