/* ===== LOGIN PRO ===== */
import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


function togglePassword(){

let pass=document.getElementById("loginPass");

pass.type = pass.type==="password" ? "text" : "password";

}

/* enter key login */

document.addEventListener("keydown",function(e){

if(e.key==="Enter" && document.getElementById("loginUser")){
loginTeacher();
}

});

function showLoginMessage(text,color){

let msg=document.getElementById("loginMessage");

msg.innerHTML=text;

msg.style.color=color;

}

/* login */

function loginTeacher(){

let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

let u=document.getElementById("loginUser").value.trim();
let p=document.getElementById("loginPass").value.trim();

if(!u || !p){

showLoginMessage("กรุณากรอกข้อมูลให้ครบ","red");

return;

}

let teacher=teachers.find(t=>t.username==u && t.password==p);

if(!teacher){

showLoginMessage("Username หรือ Password ไม่ถูกต้อง","red");

return;

}

showLoginMessage("Login สำเร็จ กำลังเข้าสู่ระบบ...","green");

localStorage.setItem("currentTeacher",JSON.stringify(teacher));

setTimeout(()=>{

location.href="teacher.html";

},800);

}

/* ===== สมัครครู ===== */

function registerTeacher(){

const MASTER_KEY = "ADMIN2025"; // รหัสส่วนกลาง

let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

let key=document.getElementById("masterKey").value.trim();
let user=document.getElementById("newUser").value.trim();
let pass=document.getElementById("newPass").value.trim();

if(!key || !user || !pass){
alert("กรอกข้อมูลให้ครบ");
return;
}

if(key !== MASTER_KEY){
alert("รหัสส่วนกลางไม่ถูกต้อง");
return;
}

/* เช็ค username ซ้ำ */

let exist = teachers.find(t=>t.username === user);

if(exist){
alert("username นี้มีแล้ว");
return;
}

/* เพิ่มครู */

teachers.push({
username:user,
password:pass
});

localStorage.setItem("teachers", JSON.stringify(teachers));

alert("สมัครสำเร็จ");

location.href="teacher_login.html";

}

/* ===== บันทึกคะแนน ===== */

async function addScore(){

let id=document.getElementById("studentId").value.trim();
let subject=document.getElementById("subjectName").value.trim();
let score=document.getElementById("score").value.trim();

let teacher = JSON.parse(localStorage.getItem("currentTeacher"));

if(!teacher){
alert("ยังไม่ได้ login ครู");
return;
}

if(!id || !subject || !score){
alert("กรอกข้อมูลให้ครบ");
return;
}

/* ส่งข้อมูลไป Firebase */

await addDoc(collection(db,"scores"),{

studentId:id,
subject:subject,
score:Number(score),
teacher:teacher.username

});

alert("บันทึกคะแนนสำเร็จ");

}

/* ===== นักเรียนดูคะแนน ===== */

async function showStudentScore(){

let id=document.getElementById("studentID").value;

let querySnapshot = await getDocs(collection(db,"scores"));

let result="";

querySnapshot.forEach((doc)=>{

let s=doc.data();

if(s.studentId==id){

result+=`
<p>วิชา: ${s.subject}</p>
<p>คะแนน: ${s.score}</p>
<hr>
`;

}

});

document.getElementById("result").innerHTML=result;

}
function loadTable(){

let table=document.querySelector("#scoreTable tbody");

if(!table) return;

let scores = JSON.parse(localStorage.getItem("scores")) || [];

table.innerHTML="";

scores.forEach(s=>{

let grade = s.score>=80?"A":s.score>=70?"B":s.score>=60?"C":s.score>=50?"D":"F";

table.innerHTML+=`
<tr>
<td>${s.id}</td>
<td>${s.subject}</td>
<td>${s.score}</td>
<td>${grade}</td>
</tr>
`;

});

}

window.onload = loadTable;
function loadTable(){

let table=document.querySelector("#scoreTable tbody");

if(!table) return;

let scores = JSON.parse(localStorage.getItem("scores")) || [];

table.innerHTML="";

scores.forEach((s,index)=>{

let grade = s.score>=80?"A":s.score>=70?"B":s.score>=60?"C":s.score>=50?"D":"F";

table.innerHTML+=`
<tr>
<td>${s.id}</td>
<td>${s.subject}</td>
<td>${s.score}</td>
<td>${grade}</td>
<td>${s.teacherName || "-"}</td>
<td>
<button onclick="deleteScore(${index})">❌</button>
</td>
</tr>
`;

});

}
function deleteScore(index){

let scores = JSON.parse(localStorage.getItem("scores")) || [];

scores.splice(index,1); // ลบทีละรายการ

localStorage.setItem("scores", JSON.stringify(scores));

loadTable(); // refresh ตาราง

}
function changeTeacherName(newName){

let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

let current = JSON.parse(localStorage.getItem("currentTeacher"));

let teacher = teachers.find(t=>t.username === current.username);

if(teacher){

teacher.username = newName;

localStorage.setItem("teachers", JSON.stringify(teachers));

current.username = newName;

localStorage.setItem("currentTeacher", JSON.stringify(current));

alert("เปลี่ยนชื่อครูแล้ว");

}

}