// LoginScript.js - Handle login form submission

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;

            // Need to better validate username like whitespace stuff
            if (!username) {
                alert('Please enter a username.');
                return;
            }

            // TODO: Implement actual authentication logic here
            if (username) {
                // Redirect to homepage
                window.location.href = 'HomePage.html';
            }
        });
    }
});