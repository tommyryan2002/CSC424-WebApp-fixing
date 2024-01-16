const express = require('express');
const app = express();
const port = 8000;

const users = new Map()
users.set("bj", "pass424")

var cors = require('cors')

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send({
        users: Array.from(users.keys())
    })
})

app.post('/account/login', (req, res) => {
    console.log(req.body)
    const pass = users.get(req.body.userId)
    if (pass === req.body.password) {
        res.send({
            token: '2342f2f1d131rf12'
        })
    } else {
        res.send({
            token: null
        })
    }
})

app.post('/account/signup', (req, res) => {
    console.log(req.body)
    var message = ""
    const userId = req.body.userId
    const password = req.body.password
    const confirmedPassword = req.body.confirmedPassword
    
    if(!userId || !password || !confirmedPassword) {
        message = "Invalid input"
    } else if(users.has(userId)) {
        message = "Username already taken"
    } else if (password != confirmedPassword) {
        message = "Passwords do not match"
    } else if (!isLongEnough(password)) {
        message = "Password must be over 8 characters long"
    } else if (!containsUppercase(password)) {
        message = "Password must contain an uppercase letter"
    } else if (!containsNumber(password)) {
        message = "Password must contain a number"
    } else  {
        users.set(userId, password)
        message = "Successfully signed up"
    }
    res.send({
        message: message
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      


function isLongEnough(myString) {
    return myString.length > 8
}

function containsUppercase(str) {
    return /[A-Z]/.test(str);
}

function containsNumber(myString) {
    return /\d/.test(myString);
}

