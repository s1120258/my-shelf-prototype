import { register, login } from "./authentication.js"

const loginForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")
const loginLink = document.getElementById("login-link")
const signupLink = document.getElementById("signup-link")
signupLink.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
})
loginLink.addEventListener("click", () => {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
})

const loginBtn = document.getElementById("login-btn")
loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    login(email, password)
})

const signupBtn = document.getElementById("signup-btn")
signupBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const confirmPassword = document.getElementById('signup-confirm-password').value
    register(email, password, confirmPassword)
})

