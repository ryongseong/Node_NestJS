const express = require('express');

const PORT = 4000;

const app = express();

const Users = [
    {
        id:0,
        name: 'Jack'
    },
    {
        id:1,
        name: 'Jennifer'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send(Users);
})
app.get('/users/:userId', (req, res) => {
   const userId = Number(req.params.userId);
   const user = Users[userId];
   if (user) {
    res.json(user);
   } else {
    res.sendStatus(404);
   }
});


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})