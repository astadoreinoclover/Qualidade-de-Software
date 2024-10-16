let queues = {
    normalQueue: [],
    emergencyQueue: []
};

function addPatient(name, isEmergency) {
    if (isEmergency) {
        queues.emergencyQueue.push(name);
    } else {
        queues.normalQueue.push(name);
    }
    updatePatientList();
}

function callPatient() {
    const calledPatient = document.getElementById('calledPatient');
    if (queues.emergencyQueue.length > 0) {
        const patient = queues.emergencyQueue.shift();
        calledPatient.innerText = `Paciente chamado: ${patient}`;
    } else if (queues.normalQueue.length > 0) {
        const patient = queues.normalQueue.shift();
        calledPatient.innerText = `Paciente chamado: ${patient}`;
    } else {
        calledPatient.innerText = 'Não há pacientes na fila.';
    }
    updatePatientList();
}

function updatePatientList() {
    const patientQueue = document.getElementById('patientQueue');
    patientQueue.innerHTML = '';

    queues.emergencyQueue.forEach(patient => {
        const li = document.createElement('li');
        li.innerText = patient + ' (Emergencial)';
        patientQueue.appendChild(li);
    });

    queues.normalQueue.forEach(patient => {
        const li = document.createElement('li');
        li.innerText = patient;
        patientQueue.appendChild(li);
    });
}

function getQueues() {
    return queues;
}

function init() {
    document.getElementById('patientForm').addEventListener('submit', (event) => {
        event.preventDefault();
    });

    document.getElementById('normalAdd').addEventListener('click', () => {
        const patientName = document.getElementById('patientName').value;
        if (patientName) {
            addPatient(patientName, false);
            document.getElementById('patientName').value = '';
        }
    });

    document.getElementById('emergencyAdd').addEventListener('click', () => {
        const patientName = document.getElementById('patientName').value;
        if (patientName) {
            addPatient(patientName, true);
            document.getElementById('patientName').value = '';
        }
    });

    document.getElementById('callPatient').addEventListener('click', callPatient);
}

window.onload = () => {
    init();
};

module.exports = {
    addPatient,
    callPatient,
    getQueues,
    init
};
