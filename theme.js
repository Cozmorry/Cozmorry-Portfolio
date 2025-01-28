const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme based on user's system preference
document.documentElement.setAttribute('data-theme', 
    prefersDarkScheme.matches ? 'dark' : 'light'
);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Apply dark mode class based on the theme
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change to sun icon
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change to moon icon
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode');

    // Change the icon based on the new theme
    if (newTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change to sun icon
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change to moon icon
    }
});