const { addUser, updateUserList, init, getUsers, resetUsers } = require('./script.js');

describe('Cadastro de Usuários', () => {
    beforeEach(() => {
        resetUsers();

        document.body.innerHTML = `
            <form id="userForm">
                <input type="text" id="username" required />
                <input type="email" id="email" required />
                <button type="submit">Cadastrar</button>
            </form>
            <ul id="userList"></ul>
        `;

        init();
    });

    test('deve adicionar um novo usuário', () => {
        const user = addUser('João', 'joao@example.com');
        expect(getUsers()).toHaveLength(1);
        expect(getUsers()[0]).toEqual(user);
    });

    test('deve atualizar a lista de usuários corretamente', () => {
        addUser('Maria', 'maria@example.com');
        updateUserList();

        const userList = document.getElementById('userList');
        expect(userList.children).toHaveLength(1);
        expect(userList.children[0].textContent).toBe('Maria - maria@example.com');
    });

    test('deve adicionar múltiplos usuários', () => {
        addUser('Carlos', 'carlos@example.com');
        addUser('Ana', 'ana@example.com');

        expect(getUsers()).toHaveLength(2);
        expect(getUsers()[0]).toEqual({ username: 'Carlos', email: 'carlos@example.com' });
        expect(getUsers()[1]).toEqual({ username: 'Ana', email: 'ana@example.com' });
    });

    test('deve exibir a lista de usuários corretamente após múltiplos cadastros', () => {
        addUser('Lucas', 'lucas@example.com');
        addUser('Beatriz', 'beatriz@example.com');
        updateUserList();

        const userList = document.getElementById('userList');
        expect(userList.children).toHaveLength(2);
        expect(userList.children[0].textContent).toBe('Lucas - lucas@example.com');
        expect(userList.children[1].textContent).toBe('Beatriz - beatriz@example.com');
    });

    test('deve retornar um array vazio ao inicializar', () => {
        expect(getUsers()).toEqual([]);
    });
});
