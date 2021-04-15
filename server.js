import express from 'express';
import data from './data.js';

const app = express();
const port = process.env.PORT || 3999;

app.use(express.json());
let scores = [];

app.get('/', (request, response) => {
    response.send("<h1 style='text-align:center;color:white;background-color: #ff00a5;'>Welcome to my REST API Server.</h1>");
});

app.get('/flowers', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send(data.flowers);
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

app.post('/score', (request, response) => {
    if (!request.body.score || !request.body.username) return response.status(404).send({ "error": "Invalid Data" });
    let score = {
        "id": scores.length + 1,
        "username": request.body.username,
        "score": request.body.score
    }
    scores.push(score);
    response.send({
        "message": "Scores are saved successfully!",
        "score": score
    });
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));