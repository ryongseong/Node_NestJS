const express = require('express');
const db = require('./models');
const User = db.users;

const app = express();
const PORT = 4000;

// db.sequelize.sync({force: true})
//     .then(() => {
//         console.log('데이터베이스 drop 및 sync를 다시 맞춤.')
// })

app.use(express.json());

app.post('/users', (req, res) => {
    const { firstName, lastName, hasCar } = req.body;

    const user = { firstName, lastName, hasCar };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            })
        })
})

app.get('/users', (req, res) => {
    User.findAll()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            })
        })
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(user => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({
                    message: `User with id=${id} not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `${id} is not a valid User ID!`
            })
        })
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    User.update(req.body, { where: { id } }) 
        .then(result => {
            if (result[0] === 1) {
                res.send('성공했습니다.');
            } else {
                res.send(`${id}에 맞는 유저가 없습니다.`);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error updating User with id=" + id
            })
        })
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.destroy({ where: { id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "유저가 성공적으로 삭제되었습니다."
                })
            } else {
                res.send({
                    message: `${id}에 맞는 유저가 없습니다.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error deleting User with id=" + id
            })
        })
})

app.listen(PORT, () => {
    console.log(`${PORT}에서 서버가 실행되었습니다.`);
})