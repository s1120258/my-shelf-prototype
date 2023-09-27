import { app } from "./firebaseConfig.js"
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const auth = getAuth(app)

function displayHome() {
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")
    const home = document.getElementById("home")
    loginForm.style.display = "none";
    signupForm.style.display = "none";
    home.style.display = "block";
}

export const register = (name, email, password, confirmPassword) => {
    if (password != confirmPassword) {
        alert("Password does not match the confirm password.")
        return false
    }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
        console.log(res.user)
        updateProfile(res.user, {
            displayName: name
        })
        .then((res) => {
            displayHome()
            return true
        })
        .catch((err) => {
            alert(err.message)
            console.log(err.code)
            console.log(err.message)
            return false 
        })
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
        return false
    })
    return true
}

export const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
        // console.log(res.user)
        displayHome()
        return true
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
        return false
    })
    return true
}

export const getCurrentUserName = () => {
    return auth.currentUser.displayName
}

export const getCurrentUserId = () => {
    return auth.currentUser.uid
}
