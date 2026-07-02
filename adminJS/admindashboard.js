document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "login.html";
        throw new Error("Not logged in, redirecting...");
    }

    const profileNameEl = document.getElementById("profileName");
    if (profileNameEl) profileNameEl.innerText = user.name;

    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    if (document.getElementById("totalDoctors")) document.getElementById("totalDoctors").innerText = doctors.length;
    if (document.getElementById("totalPatients")) document.getElementById("totalPatients").innerText = patients.length;
    if (document.getElementById("totalAppointments")) document.getElementById("totalAppointments").innerText = appointments.length;
    if (document.getElementById("totalRevenue")) document.getElementById("totalRevenue").innerText = "$25,000";

    const table = document.getElementById("appointmentTable");
    if (table) {
        let rows = "";
        appointments.forEach(item => {
            rows +=
                `
            <tr>
                <td>${item.patient}</td>
                <td>${item.doctor}</td>
                <td>${item.date}</td>
                <td>${item.status}</td>
            </tr>
        `;
        });
        table.innerHTML = rows;
    }

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

});



document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('aside-active'); // ប្រើ ID របស់អ្នក

    menuToggle.addEventListener('click', (e) => {
        sidebar.classList.toggle('open');

        if (sidebar.classList.contains('open')) {
            menuToggle.textContent = '✕';
        } else {
            menuToggle.textContent = '☰';
        }
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            menuToggle.textContent = '☰';
        }
    });
});