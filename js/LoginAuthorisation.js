
// If session storage doesn't show there's a logged in user it redirects them to login page
(function() {
    if (!sessionStorage.getItem("loggedInUser")) { 
        window.location.href = "index.html";
    }
})

// If log out button is pressed 
const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', function(e) { 
    e.preventDefault(); // Prevents default refreshing on click
    sessionStorage.clear(); // Clears user login from session storage (so user isnt seen to be logged in after logout)
    window.location.href = "index.html"; // Redirects user to login page
});