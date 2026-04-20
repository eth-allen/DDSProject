
// If session storage doesn't show there's a logged in user it redirects them to login page
(function() {
    if (!sessionStorage.getItem("loggedInUser")) { 
        window.location.href = "index.html";
    }
})();

// If log out button is pressed 
document.addEventListener('DOMContentLoaded', function(){ // Waits for page to have loaded before grabbing logout button (otherwise will crash script)
    
    // Gets logout button(s) elements, using their class(s)
    const logoutButtons = document.querySelectorAll('.logout-button');

    // For logout button(s)
    logoutButtons.forEach(function(button) {
        // Adds on click function 
        button.addEventListener('click', function(e) { 
            e.preventDefault(); // Prevents default refreshing when clicked
            sessionStorage.clear(); // Clears user login from session storage (so user isnt still saved as logged in in session storzge)
            window.location.href = "index.html"; // Redirects user to login page
        });
    });
});