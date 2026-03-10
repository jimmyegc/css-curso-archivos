const sunIcon = document.querySelector('.sun');
const moonIcon = document.querySelector('.moon');

// Function to set theme based on user preference
function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Check for stored theme or system preference on page load
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  setTheme('dark');
} else {
  setTheme('light');
}

sunIcon.addEventListener('click', () => {
  localStorage.theme = 'dark';
  setTheme('dark'); // Change to light mode without reloading the page
});

moonIcon.addEventListener('click', () => {
  localStorage.theme = 'light';
  setTheme('light'); // Change to dark mode without reloading the page
});

// Uncomment the line below if you want to remove the theme from localStorage
// localStorage.removeItem('theme');

// const sunIcon = document.querySelector('.sun');
// const moonIcon = document.querySelector('.moon');

// if (
//   localStorage.theme === 'dark' ||
//   (!('theme' in localStorage) &&
//     window.matchMedia('(prefers-color-scheme: dark)').matches)
// ) {
//   document.body.classList.add('dark');
// } else {
//   document.body.classList.remove('dark');
// }

// sunIcon.addEventListener('click', () => {
//   localStorage.theme = 'dark';
//   location.reload();
// });

// moonIcon.addEventListener('click', () => {
//   localStorage.theme = 'light';
//   location.reload();
// });

    // document.addEventListener('DOMContentLoaded', function() {
    //     const defaultThemeMode = 'dark'; // light|dark|system
    //     let themeMode;

    //     // Function to apply the theme
    //     function applyTheme(mode) {
    //         document.documentElement.classList.remove('light', 'dark');
    //         document.documentElement.classList.add(mode);
    //         localStorage.setItem('theme', mode);
    //     }

    //     // Determine initial theme
    //     if (document.documentElement) {
    //         if (localStorage.getItem('theme')) {
    //             themeMode = localStorage.getItem('theme');
    //         } else if (document.documentElement.hasAttribute('data-theme-mode')) {
    //             themeMode = document.documentElement.getAttribute('data-theme-mode');
    //         } else {
    //             themeMode = defaultThemeMode;
    //         }

    //         applyTheme(themeMode);
    //     }

    //     // Toggle theme on button click
    //     document.getElementById('theme-toggle').addEventListener('click', function() {
    //         themeMode = (themeMode === 'dark') ? 'light' : 'dark';
    //         applyTheme(themeMode);
    //     });
    // });