// document.addEventListener("DOMContentLoaded", () => {

// // 1. Check Login First
// const user = JSON.parse(localStorage.getItem("user"));

// if (!user) {
//     location.href = "login.html";
//     // Stop script execution immediately so it doesn't crash on the code below
//     throw new Error("Not logged in, redirecting...");
// }

// // 2. Show Profile (Only runs if user exists)
// document.getElementById("profileName").innerText = user.name;


// // 3. Load Data
// const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
// const patients = JSON.parse(localStorage.getItem("patients")) || [];
// const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// const totalDocsEl = document.getElementById("totalDoctors");

// if (totalDocsEl) {
//         totalDocsEl.innerText = doctors.length; // This changes the 0 to your actual total!
//     }
// document.getElementById("totalPatients").innerText = patients.length;
// document.getElementById("totalAppointments").innerText = appointments.length;
// document.getElementById("totalRevenue").innerText = "$25,000";


// // 4. Appointment Table
// const table = document.getElementById("appointmentTable");
// let rows = "";

// appointments.forEach(item => {
//     rows += `
//     <tr>
//         <td>${item.patient}</td>
//         <td>${item.doctor}</td>
//         <td>${item.date}</td>
//         <td>${item.status}</td>
//     </tr>
//     `;
// });
// table.innerHTML = rows;


// // 5. Revenue Chart
// new Chart(document.getElementById("revenueChart"), {
//     type: "bar",
//     data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//         datasets: [{
//             label: "Revenue",
//             data: [5000, 7000, 8000, 12000, 15000, 18000]
//         }]
//     }
// });


// // 6. Patient Chart
// new Chart(document.getElementById("patientChart"), {
//     type: "line",
//     data: {
//         labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//         datasets: [{
//             label: "Patients",
//             data: [10, 15, 12, 18, 20, 16, 22]
//         }]
//     }
// });


// // 7. Logout
// // function logout() {
// //     localStorage.removeItem("user");
// //     location.href = "login.html";
// // }

// });


// ១. ពិនិត្យ Login - បើមិនទាន់ Login ទេ មិនឱ្យចូលមើលទំព័រនេះឡើយ
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
    throw new Error("Not logged in, redirecting..."); 
}

// ២. បង្ហាញឈ្មោះប្រវត្តិរូប (Profile Name)
const profileNameEl = document.getElementById("profileName");
if (profileNameEl) profileNameEl.innerText = user.name;

// ៣. ទាញទិន្នន័យពី LocalStorage មកបង្ហាញលើកាតសរុប (Total Cards)
const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
const patients = JSON.parse(localStorage.getItem("patients")) || [];
const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// បញ្ចូលចំនួនលេខទៅក្នុង HTML IDs (កន្លែងនេះហើយដែលធ្វើឱ្យបាត់លេខ ០)
if (document.getElementById("totalDoctors")) document.getElementById("totalDoctors").innerText = doctors.length;
if (document.getElementById("totalPatients")) document.getElementById("totalPatients").innerText = patients.length;
if (document.getElementById("totalAppointments")) document.getElementById("totalAppointments").innerText = appointments.length;
if (document.getElementById("totalRevenue")) document.getElementById("totalRevenue").innerText = "$25,000";

// ៤. បង្ហាញតារាងណាត់ជួប (Appointment Table)
const table = document.getElementById("appointmentTable");
if (table) {
    let rows = "";
    appointments.forEach(item => {
        rows += `<tr><td>${item.patient}</td><td>${item.doctor}</td><td>${item.date}</td><td>${item.status}</td></tr>`;
    });
    table.innerHTML = rows;
}

// ៥. គំនូសតាង (Charts) - បង្ហាញបានលុះត្រាតែមាន Tag Canvas ក្នុង HTML
if (document.getElementById("revenueChart")) {
    new Chart(document.getElementById("revenueChart"), {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ label: "Revenue", data: [5000, 7000, 8000, 12000, 15000, 18000] }]
        }
    });
}

if (document.getElementById("patientChart")) {
    new Chart(document.getElementById("patientChart"), {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{ label: "Patients", data: [10, 15, 12, 18, 20, 16, 22] }]
        }
    });
}
