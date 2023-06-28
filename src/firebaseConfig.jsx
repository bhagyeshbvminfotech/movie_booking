import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCE-F8loNmO0xwYGaI5YYDP114Gvhk1haM",
    authDomain: "movie-910b4.firebaseapp.com",
    databaseURL: "https://movie-910b4-default-rtdb.firebaseio.com",
    projectId: "movie-910b4",
    storageBucket: "movie-910b4.appspot.com",
    messagingSenderId: "964248148075",
    appId: "1:964248148075:web:c0b6743708074ecc90b92e"
};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default firebaseApp;