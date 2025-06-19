// Theme toggle with new icons
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
themeToggle.onclick = () => {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
        // Moon Icon
        themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />';
    } else {
        // Sun Icon
        themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 7.464M12 8a4 4 0 100 8 4 4 0 000-8z" />';
    }
};

// Password show/hide
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');

togglePassword.onclick = () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19.5c-4.477 0-8.268-2.943-9.542-7a9.972 9.972 0 012.243-3.993m3.264-2.61A9.953 9.953 0 0112 4.5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.042 5.031M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9 9l18-18"/>';
    } else {
        passwordInput.type = "password";
        eyeIcon.innerHTML = '<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>';
    }
};
// _____________________________________________________________________________________________________ //

import { auth ,signInWithEmailAndPassword, onAuthStateChanged } from "./firebase.js"

let loginForm = document.getElementById("loginForm");
let email = document.getElementById("email");
let password = document.getElementById("password");


onAuthStateChanged(auth, (user) => {
    if (user) {
        location = "./dashboard.html"
    }
});


const loginUser = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            location = "./dashboard.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

loginForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    loginUser();
    console.log("done Bhai");
    
})