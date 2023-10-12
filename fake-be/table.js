const table = [
    {
        "user": "Mario Rossi",
        "email": "example@gmail.com",
        "admin": true
    }
];

function getDataTable() {
    return table.slice();
}

function setUser(user) {
    if (!user) {
        return { status: 400, message: 'Form non presente' };
    }
    if (user.user) {
        const userTest = RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
        if (!userTest) {
            return { status: 400, message: 'Nome utente non valido' };
        }
        if (user.user.length <= 2 || user.user.length >= 24) {
            return { status: 400, message: 'Nome utente non valido' };
        }
        if (table.some(userTable => user.user === userTable.user)) {
            return { status: 400, message: 'Nome utente gia utilizzato' };
        }
    } else {
        return { status: 400, message: 'Nome utente non valido' };
    }
    if (user.email) {
        const emailTest = RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
        if (!emailTest.test(user.email)) {
            return { status: 400, message: 'Email non valida' };
        }
        if (user.email.length <= 5 || user.email.length >= 24) {
            return { status: 400, message: 'Nome utente non valido' };
        }
        if (table.some(userTable => user.email === userTable.email)) {
            return { status: 400, message: 'Email gia utilizzata' };
        }
    } else {
        return { status: 400, message: 'Email non valida' };
    }
    table.push(user);
    return true;
}

module.exports = { getDataTable, setUser };