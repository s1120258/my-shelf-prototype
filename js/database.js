import { app } from "./firebaseConfig.js"
import { getFirestore, collection, doc, docRef, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

export const db = getFirestore(app)

export const saveData = (data) => {
    usersData = collection(db, 'users')
    .add(data)
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// const readData = () => {
//     db.collection('users')
//     .get()
//     .then((data) => {
//         console.log(data.docs.map((item) => {
//             return {...item.data(), id: item.id}
//         }))
//     })
// }

// const updateData = () => {
//     db.collection('users').doc('6caYOiNxwviOJFIQ4Uag')
//     .update({
//         email: 'ashishisagoodboy1234@gmail.com',
//         password: '123456'
//     })
//     .then(() => {
//         alert('Data Updated')
//     })
// }

// const deleteData = () => {
//     db.collection('users').doc('6caYOiNxwviOJFIQ4Uag').delete()
//     .then(() => {
//         alert('Data Deleted')
//     })
//     .catch((err) =>{
//         console.log(err)
//     })
// }