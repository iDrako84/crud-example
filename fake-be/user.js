let user = null;

function userControlForm(form) {
    if (!form.email) {
        return { status: 400, message: 'Email non inserita' };
    }
    if (!form.password) {
        return { status: 400, message: 'Password non inserita' };
    }
    const emailTest = RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
    if (!emailTest.test(form.email)) {
        return { status: 400, message: 'Email non valida' };
    }
    if (typeof form.password === 'string' && form.password <= 6 && form.password >= 12) {
        return { status: 400, message: 'Password non valida' };
    }
    return true;
}

function getUser() {
    return user;
}

function setUser(u) {
    user = u;
}

function removeUser() {
    user = null;
}

module.exports = { getUser, setUser, removeUser, userControlForm };