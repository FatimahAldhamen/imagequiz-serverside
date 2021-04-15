import express from 'express';
import quizzes from './data.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
let scores = [];

app.get('/quizzes', (request, response) => {
    response.send(quizzes);
});

app.get('/quizzes/:id', (request, response) => {
    response.send(quizzes[request.params.id]);
});

app.post('/score', (request, response) => {
    if (!request.body.score) return response.send(`Invalid Data`);
    let score = request.body.score;
    scores.push(score);
    response.send(`${score} Scores are saved successfully!`);
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));