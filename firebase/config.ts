import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyDbo-dsNSO_2S1IoBx7rGmRL7qiQ_5g8CQ",
	authDomain: "todo-d957f.firebaseapp.com",
	projectId: "todo-d957f",
	storageBucket: "todo-d957f.appspot.com",
	messagingSenderId: "218469255640",
	appId: "1:218469255640:web:f1c90b9c21968ff30f0aad",
	measurementId: "G-DF14V8WRMG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }