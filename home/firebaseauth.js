// Import the necessary Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTf3i381AZZtlGLPbPUGevmvTNnilQrc4",
  authDomain: "tourntravel-8fcd7.firebaseapp.com",
  projectId: "tourntravel-8fcd7",
  storageBucket: "tourntravel-8fcd7.firebasestorage.app",
  messagingSenderId: "1002410592088",
  appId: "1:1002410592088:web:bb14c934d0bf50be23c72d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to display messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 4000);
}

// Sign-Up Function
document.getElementById("signUpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return setDoc(doc(db, "users", user.uid), {
        email,
        firstName,
        lastName,
      });
    })
    .then(() => {
      showMessage("Account Created Successfully", "signUpMessage");
      setTimeout(() => {
        window.location.href = "main.html"; // Redirect after success
      }, 1500);
    })
    .catch((error) => {
      showMessage(error.message, "signUpMessage");
    });
});

// Sign-In Function
document.getElementById("signInForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      localStorage.setItem("loggedInUserId", userCredential.user.uid);
      showMessage("Login successful!", "signInMessage");
      setTimeout(() => {
        window.location.href = "main.html"; // Redirect after login
      }, 1500);
    })
    .catch((error) => {
      showMessage("Incorrect Email or Password", "signInMessage");
    });
});

// Switch between sign-up and sign-in forms
document.getElementById("switchToSignIn").addEventListener("click", () => {
  document.getElementById("signUpBox").style.display = "none";
  document.getElementById("signInBox").style.display = "block";
});

document.getElementById("switchToSignUp").addEventListener("click", () => {
  document.getElementById("signUpBox").style.display = "block";
  document.getElementById("signInBox").style.display = "none";
});
