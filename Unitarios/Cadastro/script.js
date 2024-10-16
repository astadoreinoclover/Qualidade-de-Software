const users = [];

function addUser(username, email) {
    const user = { username, email };
    users.push(user);
    return user;
}

function updateUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} - ${user.email}`;
        userList.appendChild(li);
    });
}

function resetUsers() {
    users.length = 0;
}

function init() {
    document.getElementById('userForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        addUser(username, email);
        updateUserList();

        document.getElementById('userForm').reset();
    });
}

window.onload = () => {
    init();
};

module.exports = { addUser, updateUserList, getUsers: () => users, resetUsers, init };
