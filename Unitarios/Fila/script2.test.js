const { addPatient, callPatient, getQueues, init } = require('./script2');

describe('Fila de Pacientes', () => {
    beforeEach(() => {
        const queues = getQueues();
        queues.normalQueue.length = 0;
        queues.emergencyQueue.length = 0;

        document.body.innerHTML = `
            <form id="patientForm">
                <input type="text" id="patientName" />
                <button type="button" id="normalAdd">Adicionar Normal</button>
                <button type="button" id="emergencyAdd">Adicionar Emergencial</button>
                <button type="button" id="callPatient">Chamar Paciente</button>
            </form>
            <ul id="patientQueue"></ul>
            <p id="calledPatient">Nenhum paciente chamado ainda.</p>
        `;

        init();
    });

    test('deve adicionar um paciente normalmente', () => {
        const patientName = 'João';
        const normalAddButton = document.getElementById('normalAdd');

        document.getElementById('patientName').value = patientName; 

        normalAddButton.click(); 

        const queues = getQueues();
        expect(queues.normalQueue).toContain(patientName);
    });

    test('deve adicionar um paciente de emergência', () => {
        const patientName = 'Maria';
        const emergencyAddButton = document.getElementById('emergencyAdd');

        document.getElementById('patientName').value = patientName; 

        emergencyAddButton.click(); 

        const queues = getQueues();
        expect(queues.emergencyQueue).toContain(patientName);
    });

    test('deve chamar o próximo paciente corretamente', () => {
        const patientName1 = 'Carlos';
        const patientName2 = 'Ana';

        addPatient(patientName1, true);
        addPatient(patientName2, false);

        const calledPatientParagraph = document.getElementById('calledPatient');
        callPatient();

        expect(calledPatientParagraph.innerText).toBe(`Paciente chamado: ${patientName1}`);
    });

    test('deve chamar um paciente normal se não houver emergenciais', () => {
        const patientName = 'Pedro';
        addPatient(patientName, false);

        const calledPatientParagraph = document.getElementById('calledPatient');
        callPatient();

        expect(calledPatientParagraph.innerText).toBe(`Paciente chamado: ${patientName}`);
    });

    test('deve indicar que não há pacientes na fila quando a fila estiver vazia', () => {
        const calledPatientParagraph = document.getElementById('calledPatient');
        callPatient();

        expect(calledPatientParagraph.innerText).toBe('Não há pacientes na fila.');
    });

    test('deve atualizar a lista de pacientes na tela', () => {
        const patientName1 = 'Rafael';
        const patientName2 = 'Julia';

        addPatient(patientName1, false);
        addPatient(patientName2, true);

        const patientQueue = document.getElementById('patientQueue');
        expect(patientQueue.childNodes.length).toBe(2);

        expect(patientQueue.childNodes[0].innerText).toBe(patientName2 + ' (Emergencial)');
        expect(patientQueue.childNodes[1].innerText).toBe(patientName1);
    });
});
