import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
var firebaseConfig = {
  apiKey: 'AIzaSyB6z9ZHa46uqUnekbKqezeEp5iciLUWpK4', // Add API Key
  databaseURL: 'https://learn-it-7a0e1-default-rtdb.firebaseio.com', // Add databaseURL
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const connectedRef = firebase.database().ref('.info/conneted')
const db = firebase

let firepadRef = firebase.database().ref()

const userName = 'krithi'
const urlparams = new URLSearchParams(window.location.search)

const roomId = urlparams.get('id')
console.log(roomId)

let paramsKey
if (roomId) {
  firepadRef = firepadRef.child(roomId)
} else {
  firepadRef = firepadRef.push()
  // window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
  paramsKey = `?id=+${firepadRef.key}`
}

export { firepadRef,connectedRef, paramsKey, userName, db }
