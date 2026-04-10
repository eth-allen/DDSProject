


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
loginForm.addEventListener("submit", function(event) {
    
    event.preventDefault(); // stops page automatically refreshing when submits pressed

    // ---------- RESETS ALL ELEMENTS COLOURS + STUFF TO STOP SPILLOVER FROM FORMER SUBMISSIONS ----------- //
    //usernameBox.style.border = null; // CHECK CSS FOR ACTUAL VALUES
    //usernameRulesText.style.color = null; // CHECK CSS FOR ACTUAL VALUES

    // ---------- SEPERATING FORM ELEMENTS INTO VARIALES ------------ //

    // Turns entered form information into form data variable
    const formData = new FormData(loginForm); 

    // Splits up data into seperate varaibles from formData
    const username = formData.get("username");
    const forename = formData.get("forename");
    const surname = formData.get("surname");
    const email = formData.get("email");

    // ---------- VALIDATION OF USER INPUT ------------ //

    // validation variable
    let isValid = true; 
    
    // Character lists for the .test() validation 
    const usernameRegex = /^[^<>&"'\s]+$/ // banned special character list (<, >, &, ", ' and whitespace))
    const namesRegex = /[^a-zA-Z]+$/; // allowed char list for forename/surname (a to z and A to Z), +$ makes it check entire word/input

    // --- USERNAME VALIDATION: (Check lengths not < 1 and > 32, no spaces and no special characters &lt;, &gt;, &amp;, &quot;, &#39;)
    // Tests if username fails any validation criteria
    if ((username.length > 32 || username.length < 1) || usernameRegex.test(username))  {
        isValid = false; // If it does it fails validation
        
        // TODO: like highlight the conditions for the box red like small text/box border somehow
        usernameBox.style.border = "2px solid red";
    }

    // --- FORENAME VALIDATION (Check lengths not < 1 and > 32, no spaces and no special characters whatsoever)
    if ( (forename.length > 32 || forename.length < 1) || !(namesRegex.test(forename)) ) {
        isValid = false;
        // like highlight the conditions for the box red like small text/box border somehow
        forenameBox.style.border = "2px solid red";
    }

    // --- SURNAME VALIDATION (Check lengths not < 1 and > 32, no spaces and no special characters whatsoever)
    if ((surname.length > 32 || surname.length < 1) || !(namesRegex.test(surname))) {
        isValid = false;
        // like highlight the conditions for the box red like small text/box border somehow
        surnameBox.style.border = "2px solid red";
    }

    // ---------- SUBMISSION OF FORM TO DATABASE ------------ //

    // --- FORM SUBMISSION
    if (isValid) {
        // Magic database stuff goes here:
        
        // fetch() 
        // loginForm.submit(); 
    } else {
        console.log("Form validation failed (isValid is false)");

        // need to figure out way of giving feedback to user for this
    }
});