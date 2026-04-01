// Endangered Species Tracker - Login Script

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (username.trim() === '' || password.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Log the attempt (in a real app, this would send to server)
            console.log('Login attempt:', {
                username: username,
                timestamp: new Date().toISOString()
            });
            
            // Submit the form
            loginForm.submit();
        });
    }
});
