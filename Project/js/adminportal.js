 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
 import { getFirestore,collection,addDoc,getDocs,doc ,updateDoc,deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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


 let StudentCourse = document.getElementById("StudentCourse")
 let StudentID = document.getElementById("StudentID")
 let MARKS = document.getElementById("MARKS")
 let TOTALMARKS = document.getElementById("TOTALMARKS")
 let GRADE = document.getElementById("GRADE")

 
 // getData function


 window.getstudentdata = async()=> {
  const querySnapshot = await getDocs(collection(db, "student"));
  let arr = [];
  querySnapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };
    arr.push(obj)
    // table.innerHTML = "";
    console.log(doc.id, " => ", doc.data());
    table.innerHTML += `
       <tbody>
          <tr>
         
          <td>${obj.name}  
         <button id="${obj.id}" class="btn btn-primary btn-sm" onclick="editdata(this)">EDIT</button></td>
          <td>${obj.lastname}</td>
          <td>${obj.email}</td>
          <td>${obj.cnic}</td>
          <td>${obj.userType}</td>
          </tr>
       </tbody>
         <button id="${obj.id}" class="btn btn-primary btn-sm" onclick="editdata(this)">deleteData</button>
    `;
  });


  // console.log(obj)

 }

 window.editdata = async(ele) => {

  const docRef = doc(db, 'student',ele.id);
  
  const editvalue = prompt("Update Your FirstName ")
  // Update the timestamp field with the value from the server
  const edit = await updateDoc(docRef, {
      name :editvalue,
  });
  alert("updated");
}

//  ---------------------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------------------

//uploadData function

window.uploadData = async()=>{
   let marks = Number(MARKS.value)
   let totalmarks = Number(TOTALMARKS.value)
   //  console.log(marks)
   
   const sum = marks / totalmarks * 100;
   console.log(sum)
   

   GRADE.innerHTML =  `
    <p>${sum}%</p>
    `

    let obj = {
    StudentCourse : StudentCourse.value,
    StudentID : StudentID.value,
    MARKS : marks,
    TOTALMARKS : totalmarks,
     GRADE :sum

    }
    
    const docRef = await addDoc(collection(db, "studentdataUploadedbyadmin"), obj);
    console.log("Document written with ID: ", docRef.id);
    alert("Data ADDED SUCCESSFULLY")
    
  }
  
  //-------------------------------------------------------------------------------------------------------------------------------------------
  
  // getUploadedata function
  window.GetuploadedData = async() =>{
    const querySnapshot = await getDocs(collection(db, "studentdataUploadedbyadmin"));
    let arr = [];
    // upload.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(obj)
      console.log(doc.id, " => ", doc.data());
      upload.innerHTML += `
      <tbody>
      <tr>
      <td>${obj.StudentCourse}</td>
          <td>${obj.id}</td>
          <td>${obj.MARKS}</td>
          <td>${obj.TOTALMARKS}</td>
          <td>${obj.GRADE}%</td>
          </tr>
       </tbody>
       
       `;
    console.log(obj)
    
  });
  
  
}



//deleteData function

 window.deletdata = async (ele) => {
  console.log("delete");
  await deleteDoc(doc(db, "student", ele.id));
  getstudentdata()
};


window.deletdata = async (ele) => {
  console.log("delete");
  await deleteDoc(doc(db, "studentdataUploadedbyadmin", ele.id));
  GetuploadedData()
};


