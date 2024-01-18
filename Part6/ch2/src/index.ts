import express from "express";
import morgan from "morgan"
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = express();
const port = 4000;

app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("running");
})

AppDataSource
    .initialize()
    .then(() => {
        console.log("성공");
    })
    .catch((err) => {
        console.log(err);
    })


app.post('/users', async (req, res) => {
    const user = await AppDataSource.getRepository(User).create(req.body);
    console.log(user);

    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results);
})

app.get('/users', async (req, res) => {
    const results = await AppDataSource.getRepository(User).find();
    res.json(results);
})

app.get('/users/:id', async (req, res) => {
    const results = await AppDataSource.getRepository(User).findOneBy({
        id: Number(req.params.id)
    })
    return res.json(results);
})

app.put('/users/:id', async (req, res) => {
    const user = await AppDataSource.getRepository(User).findOneBy({
        id: Number(req.params.id)
    });
    AppDataSource.getRepository(User).merge(user, req.body);
    const result = await AppDataSource.getRepository(User).save(user);
    return res.send(result);
})

app.delete('/users/:id', async (req, res) => {
    const result = await AppDataSource.getRepository(User).delete(req.params.id);
    res.json(result);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})