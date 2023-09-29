import { register, login, getCurrentUserName, getCurrentUserId } from "./authentication.js"
import { db, saveData } from "./database.js"
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

// *** Lonin and Signup page ***
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
    if (!login(email, password)) {
        return
    }
    updateMomentsFeed()
    updateMyMoments()
})

const signupBtn = document.getElementById("signup-btn")
signupBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const name = document.getElementById('signup-name').value
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const confirmPassword = document.getElementById('signup-confirm-password').value
    if (!register(name, email, password, confirmPassword)) {
        return
    }
    updateMomentsFeed()
    updateMyMoments()
})

// *** Home page ***
let momentsFeed = []
let myMoments = []
function createMomentHTML(elementId, title, author, notes) {
    const outputArea = document.getElementById(elementId)
    let result = '<div class="card">'
    result += `<p>Book Title: ${title}</p>`
    result += `<p>Author: ${author}</p>`
    result += `<p>Notes: ${notes}</p>`
    result += '</div>'
    outputArea.innerHTML += result
}

function updateMomentsFeed() {
    momentsFeed = []
    onSnapshot( collection(db, "moments"), (snapshot) => {
        // console.log(`Total records : ${ snapshot.size } `)
        snapshot.forEach((doc) => {
            // console.log("Document id: ", doc.id );
            // console.log(`Document content: ${JSON.stringify(doc.data())}`);
            const moment = JSON.parse(JSON.stringify(doc.data()))
            if (moment.isShared) {
                momentsFeed.push(moment)
            }
        })
        const outputAreaElementId = "moments-feed-output"
        document.getElementById(outputAreaElementId).innerHTML = ""
        for (const moment of momentsFeed) {
            createMomentHTML(outputAreaElementId, moment.title, moment.author, moment.notes)
        }
        console.log(momentsFeed)
    })
}

function updateMyMoments() {
    myMoments = []
    onSnapshot( collection(db, "moments"), (snapshot) => {
        // console.log(`Total records : ${ snapshot.size } `)
        snapshot.forEach((doc) => {
            // console.log("Document id: ", doc.id );
            // console.log(`Document content: ${JSON.stringify(doc.data())}`);
            const moment = JSON.parse(JSON.stringify(doc.data()))
            if (moment.authorId == getCurrentUserId()) {
                myMoments.push(moment)
            }
        })
        const outputAreaElementId = "my-moments-output"
        document.getElementById(outputAreaElementId).innerHTML = ""
        for (const moment of myMoments) {
            createMomentHTML(outputAreaElementId, moment.title, moment.author, moment.notes)
        }
    })
}

const addMomentBtn = document.getElementById("add-moment-btn")
addMomentBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const momentData = {
        title: document.getElementById('moment-book-title').value,
        author: getCurrentUserName(),
        authorId: getCurrentUserId(),
        notes: document.getElementById('moment-notes').value,
        isShared: document.getElementById("is-shared").checked
    }
    saveData("moments", momentData)
    if (momentData.isShared) {
        updateMomentsFeed()
    }
    updateMyMoments()
})
