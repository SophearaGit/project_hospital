let appointments =
JSON.parse(
localStorage.getItem("appointments")
) || [];

let doctors =
JSON.parse(
localStorage.getItem("doctors")
) || [];

let patients =
JSON.parse(
localStorage.getItem("patients")
) || [];

let editIndex = -1;

// Load dropdowns

function loadDropdowns(){

    const doctorSelect =
    document.getElementById(
    "doctorSelect"
    );

    const patientSelect =
    document.getElementById(
    "patientSelect"
    );

    doctorSelect.innerHTML =
    "<option value=''>Select Doctor</option>";

    patientSelect.innerHTML =
    "<option value=''>Select Patient</option>";

    doctors.forEach(doc => {

        doctorSelect.innerHTML += `
        <option value="${doc.name}">
            ${doc.name}
        </option>
        `;
    });

    patients.forEach(patient => {

        patientSelect.innerHTML += `
        <option value="${patient.name}">
            ${patient.name}
        </option>
        `;
    });

}

loadDropdowns();


// Save Appointment

document
.getElementById(
"appointmentForm"
)
.addEventListener(
"submit",

function(e){

    e.preventDefault();

    const appointment = {

        id:
        "AP-" +
        Date.now(),

        patient:
        patientSelect.value,

        doctor:
        doctorSelect.value,

        date:
        appointmentDate.value,

        status:
        appointmentStatus.value
    };

    if(editIndex === -1){

        appointments.push(
        appointment
        );

    }else{

        appointment.id =
        appointments[
        editIndex
        ].id;

        appointments[
        editIndex
        ] = appointment;

        editIndex = -1;
    }

    saveAppointments();

    renderAppointments();

    this.reset();
});


// Save LocalStorage

function saveAppointments(){

    localStorage.setItem(
    "appointments",

    JSON.stringify(
    appointments
    ));

}


// Render Table

function renderAppointments(
list = appointments
){

    let html = "";

    list.forEach(
    (appointment,index)=>{

        html += `
        <tr>

            <td>
                ${appointment.id}
            </td>

            <td>
                ${appointment.patient}
            </td>

            <td>
                ${appointment.doctor}
            </td>

            <td>
                ${appointment.date}
            </td>

            <td>
                ${appointment.status}
            </td>

            <td>

                <button
                onclick=
                "editAppointment(${index})">

                Edit

                </button>

                <button
                onclick=
                "deleteAppointment(${index})">

                Delete

                </button>

            </td>

        </tr>
        `;
    });

    appointmentTable.innerHTML =
    html;
}


// Delete

function deleteAppointment(
index
){

    if(confirm(
    "Delete appointment?"
    )){

        appointments.splice(
        index,
        1
        );

        saveAppointments();

        renderAppointments();
    }

}


// Edit

function editAppointment(
index
){

    const appointment =
    appointments[index];

    patientSelect.value =
    appointment.patient;

    doctorSelect.value =
    appointment.doctor;

    appointmentDate.value =
    appointment.date;

    appointmentStatus.value =
    appointment.status;

    editIndex = index;
}


// Search

document
.getElementById(
"searchAppointment"
)
.addEventListener(
"keyup",

function(){

    const keyword =
    this.value
    .toLowerCase();

    const filtered =
    appointments.filter(
    appointment =>

        appointment.patient
        .toLowerCase()
        .includes(keyword)

        ||

        appointment.doctor
        .toLowerCase()
        .includes(keyword)

        ||

        appointment.status
        .toLowerCase()
        .includes(keyword)

    );

    renderAppointments(
    filtered
    );
});

renderAppointments();