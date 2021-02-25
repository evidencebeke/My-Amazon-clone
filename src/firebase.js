import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDUOnkgi7t_DeVM2KlUYaANw-gs8RUzQi4",
    authDomain: "clone-11470.firebaseapp.com",
    projectId: "clone-11470",
    storageBucket: "clone-11470.appspot.com",
    messagingSenderId: "133963420941",
    appId: "1:133963420941:web:81394b12b3953d0ec78c44"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore
const auth = firebase.auth()
  export {db, auth}