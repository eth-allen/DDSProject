// LoginScript.js - Handle login form submission

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // For now, perform basic validation
            if (username && password) {
                // Redirect to homepage
                window.location.href = 'HomePage.html';
            }
        });
    }
});