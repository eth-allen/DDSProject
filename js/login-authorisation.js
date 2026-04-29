
(function() {
    // If user isn't logged in it redirects them to login page
    if (!sessionStorage.getItem("loggedInUser")) { 
        window.location.href = "index.html";
    }


    // Role based access authentication for submiting data or actions

    const restrictedPages = ["submit-data.html", "submit-action.html"]; // Banned pages for standard accounts
    const currentPage = window.location.pathname.split('/').pop(); // Extracts current page value out of .pathname
    const currentRole = sessionStorage.getItem("loggerRole"); // Retrieves users role

    // If user reaches a restricted page by like going directly to the url or something (shouldnt be possble with navigation navbar disabled anyway)
    if(currentRole === "Standard" && restrictedPages.includes(currentPage)) {
        alert(`This page is restricted to logger + administrator accounts only (Your account type: ${currentRole}). Redirecting you to homepage... `); // Cant use show alert as page hasnt loaded yet 
        window.location.href = "homepage.html"; 
    }

    // Disables navigaton bar to websites for accounts without permissions
    document.addEventListener('DOMContentLoaded', function() {
        if (currentRole === "Standard") {
            const navLinks = document.querySelectorAll('.navbar-menu a');
            
            navLinks.forEach(link => {
                const linkDestination = link.getAttribute('href');
                
                // If navbar links restricted its disabled
                if (restrictedPages.includes(linkDestination)) {

                    // Disables link being clickable
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                    })

                    // UX makes it so hovering over it gives tooltip + O + X over mouse 
                    link.classList.add('disabled-link');
                    link.setAttribute('title', 'Logger or admin account type required'); // tooltip for good ux

                }


            });
        }
    });

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
