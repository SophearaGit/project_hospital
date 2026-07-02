// let doctors =
// JSON.parse(localStorage.getItem("doctors"))
// || [];

// let editIndex = -1;

// const doctorForm =
// document.getElementById("doctorForm");

// doctorForm.addEventListener(
// "submit",
// function(e){

//     e.preventDefault();

//     const doctor = {

//         name:
//         document.getElementById(
//         "doctorName").value,

//         specialization:
//         document.getElementById(
//         "specialization").value,

//         phone:
//         document.getElementById(
//         "phone").value
//     };

//     if(editIndex === -1){

//         doctors.push(doctor);

//     }else{

//         doctors[editIndex] = doctor;

//         editIndex = -1;
//     }

//     saveDoctors();

//     doctorForm.reset();

//     renderDoctors();
// });

// function saveDoctors(){

//     localStorage.setItem(
//         "doctors",
//         JSON.stringify(doctors)
//     );
// }

// function renderDoctors(list = doctors){

//     let html = "";

//     list.forEach((doctor,index)=>{

//         html += `
//         <tr>

//             <td>${doctor.name}</td>

//             <td>${doctor.specialization}</td>

//             <td>${doctor.phone}</td>

//             <td>

//                 <button
//                 onclick="editDoctor(${index})">
//                 Edit
//                 </button>

//                 <button
//                 onclick="deleteDoctor(${index})">
//                 Delete
//                 </button>

//             </td>

//         </tr>
//         `;
//     });

//     document.getElementById(
//     "doctorTable").innerHTML = html;
// }

// function deleteDoctor(index){

//     if(confirm(
//     "Delete this doctor?"
//     )){

//         doctors.splice(index,1);

//         saveDoctors();

//         renderDoctors();
//     }
// }

// function editDoctor(index){

//     const doctor =
//     doctors[index];

//     document.getElementById(
//     "doctorName").value =
//     doctor.name;

//     document.getElementById(
//     "specialization").value =
//     doctor.specialization;

//     document.getElementById(
//     "phone").value =
//     doctor.phone;

//     editIndex = index;
// }

// document
// .getElementById("searchDoctor")
// .addEventListener("keyup",

// function(){

//     const keyword =
//     this.value.toLowerCase();

//     const filtered =
//     doctors.filter(doc =>

//         doc.name
//         .toLowerCase()
//         .includes(keyword)

//         ||

//         doc.specialization
//         .toLowerCase()
//         .includes(keyword)
//     );

//     renderDoctors(filtered);
// });

// renderDoctors();




// ១. ពិនិត្យ Login ដូចគ្នា
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "login.html";
    throw new Error("Not logged in!");
}

// ២. បង្កើត Variable សម្រាប់ទុកទិន្នន័យគ្រូពេទ្យ
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let editIndex = -1;

// ៣. មុខងារបន្ថែម ឬកែប្រែទិន្នន័យ (Add / Edit) ពេល Submit Form
const doctorForm = document.getElementById("doctorForm");
if (doctorForm) {
    doctorForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const doctor = {
            name: document.getElementById("doctorName").value,
            specialization: document.getElementById("specialization").value,
            phone: document.getElementById("phone").value
        };

        if (editIndex === -1) {
            doctors.push(doctor); // បន្ថែមថ្មី
        } else {
            doctors[editIndex] = doctor; // កែប្រែលើទិន្នន័យចាស់
            editIndex = -1;
        }

        localStorage.setItem("doctors", JSON.stringify(doctors)); // រក្សាទុក
        doctorForm.reset();
        renderDoctors();
    });
}

// ៤. មុខងារបង្ហាញទិន្នន័យទៅក្នុងតារាង HTML
function renderDoctors(list = doctors) {
    const tableBody = document.getElementById("doctorTable");
    if (!tableBody) return;

    let html = "";
    list.forEach((doctor, index) => {
        html += `
        <tr>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.phone}</td>
            <td>
                <button onclick="editDoctor(${index})">Edit</button>
                <button onclick="deleteDoctor(${index})">Delete</button>
            </td>
        </tr>`;
    });
    tableBody.innerHTML = html;
}

// ៥. មុខងារលុប (Delete) និង កែប្រែ (Edit)
window.deleteDoctor = function(index) {
    if (confirm("Delete this doctor?")) {
        doctors.splice(index, 1);
        localStorage.setItem("doctors", JSON.stringify(doctors));
        renderDoctors();
    }
};

window.editDoctor = function(index) {
    const doctor = doctors[index];
    document.getElementById("doctorName").value = doctor.name;
    document.getElementById("specialization").value = doctor.specialization;
    document.getElementById("phone").value = doctor.phone;
    editIndex = index;
};

// ៦. មុខងារស្វែងរក (Search)
const searchInput = document.getElementById("searchDoctor");
if (searchInput) {
    searchInput.addEventListener("keyup", function() {
        const keyword = this.value.toLowerCase();
        const filtered = doctors.filter(doc =>
            doc.name.toLowerCase().includes(keyword) ||
            doc.specialization.toLowerCase().includes(keyword)
        );
        renderDoctors(filtered);
    });
}

// ដំណើរការបង្ហាញទិន្នន័យពេល Load ទំព័រដំបូង
renderDoctors();