
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore,doc,setDoc,getDoc,addDoc,collection} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZFGVbQlwv0ku3_eTxYP5ekChW0ba16Vo",
  authDomain: "practice-firebase-436ec.firebaseapp.com",
  projectId: "practice-firebase-436ec",
  storageBucket: "practice-firebase-436ec.appspot.com",
  messagingSenderId: "775705394699",
  appId: "1:775705394699:web:6958b6f3f3d7635c37510e",
  measurementId: "G-T6QEW6M3ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db= getFirestore();

let name = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let email = document.getElementById("email")
let password = document.getElementById("Password")
let cnic = document.getElementById("cnic")
let userType = document.getElementById("userType")


window.register = () =>{


  const obj ={
    name : name.value,
    lastname : lastname.value,
    email : email.value,
    cnic : cnic.value,
    password : password.value,
    userType: userType.value,
  };


    if(userType.value == "admin"){
      console.log("to admin portal")
      createUserWithEmailAndPassword(auth ,obj.email,obj.password)
      .then(async(res)=>{
        console.log(res)
        obj.id = res.user.uid
        const docRef = await addDoc(collection(db, "admin"), obj);
        console.log("Document written with ID: ", docRef.id);
        alert("Data Registered!")
    
        signInWithEmailAndPassword(auth,obj.email,obj.password)
        .then(async(res) => {
          console.log(res,"logedIN")
         await  window.location.replace("/pages/admin.html")
        })
        .catch((error) => {
          console.log(error)
        })
    
      })
      .catch((error)=>{
        console.log(error)
      })
    
    }else  if(userType.value = "student"){
      console.log("to student portal")
      
      createUserWithEmailAndPassword(auth ,obj.email,obj.password)
      .then(async(res)=>{
        console.log(res)
        obj.id = res.user.uid
        const docRef = await addDoc(collection(db, "student"), obj);
        console.log("Document written with ID: ", docRef.id);
        alert(" student data regesterd")
        
        signInWithEmailAndPassword(auth,obj.email,obj.password)
        .then(async(res) => {
         await window.location.replace("/pages/student.html")
          console.log(res,"student Login")
        })
        .catch((error) => {
          console.log(error)
        })
    
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    console.log(obj)
}
