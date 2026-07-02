let patients =
JSON.parse(
localStorage.getItem("patients")
) || [];

let editIndex = -1;

const patientForm =
document.getElementById(
"patientForm"
);

patientForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const patient = {

        id:
        "PT-" +
        Date.now(),

        name:
        patientName.value,

        age:
        patientAge.value,

        gender:
        patientGender.value,

        phone:
        patientPhone.value
    };

    if(editIndex === -1){

        patients.push(patient);

    }else{

        patient.id =
        patients[editIndex].id;

        patients[editIndex] =
        patient;

        editIndex = -1;
    }

    savePatients();

    renderPatients();

    patientForm.reset();

});

function savePatients(){

    localStorage.setItem(
        "patients",
        JSON.stringify(
            patients
        )
    );
}

function renderPatients(
list = patients
){

    let html = "";

    list.forEach(
    (patient,index)=>{

        html += `

        <tr>

            <td>${patient.id}</td>

            <td>${patient.name}</td>

            <td>${patient.age}</td>

            <td>${patient.gender}</td>

            <td>${patient.phone}</td>

            <td>

                <button
                onclick="editPatient(${index})">

                Edit

                </button>

                <button
                onclick="deletePatient(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;
    });

    patientTable.innerHTML =
    html;
}

function deletePatient(index){

    if(confirm(
    "Delete Patient?"
    )){

        patients.splice(
            index,
            1
        );

        savePatients();

        renderPatients();
    }
}

function editPatient(index){

    const patient =
    patients[index];

    patientName.value =
    patient.name;

    patientAge.value =
    patient.age;

    patientGender.value =
    patient.gender;

    patientPhone.value =
    patient.phone;

    editIndex = index;
}

document
.getElementById(
"searchPatient"
)
.addEventListener(
"keyup",

function(){

    const keyword =
    this.value
    .toLowerCase();

    const filtered =
    patients.filter(
    patient =>

        patient.name
        .toLowerCase()
        .includes(keyword)

        ||

        patient.phone
        .includes(keyword)

        ||

        patient.id
        .toLowerCase()
        .includes(keyword)

    );

    renderPatients(
        filtered
    );

});

renderPatients();