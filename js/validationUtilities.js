
// ----------- VALIDATION FOR USER ACCOUNT INPUTS ------------

// Tegex lists for the .test() validation 
const usernameRegex = /^[^<>&"'\s]+$/ // banned special character list (<, >, &, ", ' and whitespace))
const namesRegex = /^[a-zA-Z\-']+$/; // allowed char list for forename/surname (a to z and A to Z + hypons and '), +$ makes it check entire word/input
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // looked up email regex list which should do fairly simple validation on emails 

// --- USERNAME VALIDATION: (Check lengths not < 1 and > 32, no spaces and no special characters &lt;, &gt;, &amp;, &quot;, &#39;)
// Tests if username fails any validation criteria
function isValidUsername(username) {
    if ((username.length > 32 || username.length < 1) || !(usernameRegex.test(username)))  {
        return false;
    } else { return true; }
}

// --- NAME VALIDATION (Check lengths not < 1 and > 32, no spaces and no special characters whatsoever)
function isValidName(name) {
    if ( (name.length > 32 || name.length < 1) || !(namesRegex.test(name)) ) {
        return false;
    } else { return true; }
}   

// --- EMAIL VALIDATION (checks regex list + length as emails cant be longer than 254 or less than 2 characters and could cause db issues if entered)
function isValidEmail(email) {
    if (!emailRegex.test(email) || email.length > 254 || email.length < 3) {
        return false;
    } else { return true; }
}

// --- ANIMAL NAME VALIDATION
const animalNameRegex = /^[a-zA-Z\-' ]+$/;

// Tests if the species or animal name fails length or regex
function isValidAnimalOrSpeciesName(name) {
    if ( (name.length > 100 || name.length < 2) || !(animalNameRegex.test(name)) ) { // If fails regex/too long
        return false; // Returns false
    } else { 
        return true; // Otherwise returns true
    }
}


// ----------- VISUAL ALERT BOX ----------------
function showAlert(alertText, isError) {

    var alertBox = document.getElementById("alertBox");
    alertBox.textContent = alertText;
    
    if (isError == true) { // If error the class is set to CSS error alert to change its colour
        alertBox.className = "error-alert";
    } else { // Otherwsie success alert
        alertBox.className = "success-alert";
    }
    
    alertBox.style.display = "block";

    setTimeout(function() {
        alertBox.style.display = "none"; // hides box
        alertBox.textContent = ""; 
    }, 3500);
}
