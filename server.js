import express from 'express';
import cors from 'cors';
import data from './data.js';
import pool from './db.js';

const app = express();
const port = process.env.PORT || 3999;

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.send("<h1 style='text-align:center;color:white;background-color: #ff00a5;'>Welcome to my REST API Server.</h1>");
});

app.get('/flowers', async(request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    let flowers = await pool.query("SELECT * FROM imagequiz.flowers")
    response.send(flowers.rows);
});

app.get('/quizzes', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(data.quizzes);
});

app.get('/quizzes/:id', (request, response) => {
    let quizID = request.params.id;
    if (isNaN(quizID)) return response.status(404).send({ error: `ID Must be a Number!` });
    let quiz = data.quizzes.find(quiz => quiz.id === Number(quizID));
    if (!quiz) return response.status(404).send({ error: `Quiz was not found with ID: ${quizID}` });
    response.send(quiz);
});

app.post('/score', async(request, response) => {
    // if (!request.body.score || !request.body.username) return response.status(404).send({ "error": "Invalid Data" });

    const score = await pool.query("INSERT INTO imagequiz.scores(customerid,quizid,score) VALUES($1,$2,$3)", [request.body.customerid, request.body.quizid, request.body.score])

    response.send({
        "message": "Scores are saved successfully!",
        "score": score
    });
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));