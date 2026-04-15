import { runQuery } from './runQuery.js';
import {isValidName, isValidUsername, isValidEmail} from './validationUtilities.js';

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

    // ---------- SEPERATING FORM ELEMENTS INTO VARIALES ------------ //

    // Turns entered form information into form data variable
    const formData = new FormData(loginForm); 

    // Splits up data into seperate varaibles from formData
    const username = formData.get("username");
    const forename = formData.get("forename");
    const surname = formData.get("surname");
    const email = formData.get("email");

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

    // ---------- SUBMISSION OF FORM TO DATABASE ------------ //

    // --- FORM SUBMISSION
    if (isValid) {
        // Inserts form data into database (sql injection heaven)  
        const insertResult = await runQuery(`INSERT INTO Logger (username, forename, surname, email) VALUES ('${username}', '${forename}', '${surname}', '${email}')`);

        //If theres an error with sql query
        if (insertResult?.error) {
            console.error("Data load error", {insertResult});
            alert("An error occured. Account creation unsuccessful")
        }
        // Else direct user to homepage logged in (or login page if thats too hard)
        else { 
            alert("Account created successfully, directing you to login page"); // probably better less intrusvie way of doing this like through html editing     
            console.log("Account created with username: " + username + "forename: " + forename + "surname: " + surname + "email: " + email)
            window.location.href = "index.html"; 
        }
    }
    else {
        // If anything in form was invalid (isValid is false)
        console.log("Form validation failed (isValid is false)");
        alert("Invalid form data entered."); // Probably better less intrusvie way of doing this like through html editing 
    }
}); // } + ) is normal because of how event listener works 