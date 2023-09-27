import { app } from "./firebaseConfig.js"
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

export const db = getFirestore(app)

export const saveData = (collectionName, data) => {
    const docRef = addDoc(collection(db , collectionName), data)
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
    })
    .catch((error) => {
        console.error("Error adding document: ", error)
    })
}
