 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
 import { getFirestore,collection,getDocs,doc ,updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

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
 const db = getFirestore()

//==========================================================================================================================================


window.getData = async() =>{
    const querySnapshot = await getDocs(collection(db, "student"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(obj)
      // table.innerHTML = "";
    //   console.log(doc.id, " => ", doc.data());
      table.innerHTML += `
         <tbody>
            <tr>
            <td>${obj.name} <button class="btn btn-primary" id="${doc.id}" onclick="changefirstname(this)">EDIT</button></td>
            <td>${obj.lastname}  <button class="btn btn-primary" id="${doc.id}" onclick="changelastname(this)">EDIT</button></td>
            <td>${obj.email}</td>
            <td>${obj.cnic}</td>
            <td>${obj.userType}</td>
            </tr>
         </tbody>
      `;
    });
  
}
//for firstname
const firstname = document.getElementById("firstname")

window.addEventListener("load",async()=>{
    const querySnapshot = await getDocs(collection(db, "student"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(obj)
    //   console.log(doc.id, " => ", doc.data());
      firstname.innerHTML = `
            <button class="btn btn-primary" id="${doc.id}" onclick="changefirstname(this)">click to change name</button>
      `;
    });
 
});

window.changefirstname = async(ele) => {

    const docRef = doc(db, 'student',ele.id);
    
    const editvalue = prompt("Update your first name ")
    // Update the timestamp field with the value from the server
    const edit = await updateDoc(docRef, {
        name :editvalue,
      

    });
    alert(" Name updated successfully");
    window.location.reload();
    lastname.innerHTML=""

}

//----------------------------------------------------------------------------------------------------------------------------------------

//for lastname

const lastname = document.getElementById("lastname")
window.addEventListener("load",async()=>{
    const querySnapshot = await getDocs(collection(db, "student"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(obj)
    //   console.log(doc.id, " => ", doc.data());
      lastname.innerHTML = `

     <button class="btn btn-primary" id="${doc.id}" onclick="changelastname(this)">EDIT</button>
     `;
    });
 
    
    
});

window.changelastname = async(ele) => {

    const docRef = doc(db, 'student',ele.id);
    
    const editvalue = prompt("Update your last name ")
    // Update the timestamp field with the value from the server
   
    const edit = await updateDoc(docRef, {
       lastname :editvalue,
    });
    alert("updated");
}

//--------------------------------------------------------------------------------------------------------------------------------


//for CNIC
const cnic = document.getElementById("cnic")
window.addEventListener("load",async()=>{
    const querySnapshot = await getDocs(collection(db, "student"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(obj)
    //   console.log(doc.id, " => ", doc.data());
      cnic.innerHTML = `
            <button class="btn btn-primary" id="${doc.id}" onclick="changeCNIC(this)">click to change CNIC</button>
      `;
    });
 
    
    
});

window.changeCNIC = async(ele) => {

    const docRef = doc(db, 'student',ele.id);
    
    const editvalue = prompt("Update your cnic number ")
    // Update the timestamp field with the value from the server
    const edit = await updateDoc(docRef, {
        cnic :editvalue,
    });
    alert("updated");
}



