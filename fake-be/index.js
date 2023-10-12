const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = 5000;
const app = express();

const USER = require('./user.js');
const TABLE = require('./table.js');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.post('/api/auth', (req, res) => {
    /* console.log(req.body);
    console.log(USER.userControlForm(req.body)); */
    const control = USER.userControlForm(req.body);
    if (control === true) {
        USER.setUser({
            "user": "Mario Rossi",
            "email": req.body.email,
            "token": "123456",
            "admin": true
        });
        res.json(
            {
                "data": USER.getUser()
            }
        );
    } else {     
        res.status(control.status).json({
            message: control.message
        });
    }
});

app.get('/api/logout', (req, res) => {
    /* console.log(req.body);
    console.log(USER.userControlForm(req.body)); */
    USER.removeUser();
    res.json(
        {
            "data": true
        }
    );
});

app.get('/api/table-data', (req, res) => {
    /* console.log(req.body);
    console.log(USER.userControlForm(req.body)); */
    const table = TABLE.getDataTable();
    res.json(
        {
            "data": table
        }
    );
});

app.post('/api/add-user', (req, res) => {
    /* console.log(req.body);
    console.log(USER.userControlForm(req.body)); */
    const control = TABLE.setUser(req.body);
    if (control === true) {
        res.json(
            {
                "data": TABLE.getDataTable()
            }
        );
    } else {     
        res.status(control.status).json({
            message: control.message
        });
    }
});

app.listen(PORT, () => console.log(`Il server é attivo sulla porta ${PORT}`));