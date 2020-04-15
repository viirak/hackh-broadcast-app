import * as firebase from 'firebase/app';


// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
  apiKey: 'AIzaSyDVT7hjCcB-mi3a-q4A7XZvbkGgc8z4Q5w', // Auth / General Use
  databaseURL: 'https://hackh-broadcast.firebaseio.com', // Realtime Database
  storageBucket: 'hackh-broadcast.appspot.com', // Storage
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
