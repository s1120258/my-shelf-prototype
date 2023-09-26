import { app } from "./firebaseConfig.js"
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const auth = getAuth(app)

function DisplayHome() {
    // window.location.replace("./home.html");
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")
    const home = document.getElementById("home")
    loginForm.style.display = "none";
    signupForm.style.display = "none";
    home.style.display = "block";
}

export const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
        console.log(res.user)
        DisplayHome()
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
    })
}

export const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
        console.log(res.user)
        DisplayHome()
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
    })
}
