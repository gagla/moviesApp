import './config.js';
import express from 'express';
import { json } from 'body-parser';
import fetch from 'node-fetch';
import {mongoose} from './db';
import { ObjectID } from 'mongodb';
import { MovieModel } from './models/movie';
import { CommentModel } from './models/comment';

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(json());

const distDir = __dirname + "./../dist/";
app.use(express.static(distDir));

app.post('/movies', (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({error: "The title of the movie has not been entered"})
    }

    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(req.body.title)}&apikey=${process.env.API_KEY}`)
    .then((res) => res.json())
        .then(fetchedData => {
            if (!fetchedData.Title) {
                throw new Error("No movies found with this title");
            }
           return fetchedData
        })
        .then(movieObj => {
            let movie = new MovieModel({
                title: req.body.title,
                movieObj
            });
            return movie.save()
        })
        .then(document => res.send(document))
        .catch(error => res.status(400).send({error: error.message}));
});


app.get('/movies', (req, res) => {
    MovieModel.find({}).then(movies => res.send(movies))
});

app.post('/comments', (req, res) => {
    const idMovie = req.body.id,
        text = req.body.text;

    if (!ObjectID.isValid(idMovie)) {
        return res.status(400).send({
            error: 'Invalid movie ID'
        });
    }

    MovieModel.findById(idMovie)
        .then(document => {
            if (!document) {
                throw new Error('Movie with this ID not found in db')
            } else if (!req.body.text) {
                throw new Error('No text in comment')
            }

            return new CommentModel({
                idMovie,
                text
            });
        })
        .then(comment => comment.save())
        .then(document => res.send(document))
        .catch(error => res.status(400).send({error: error.message}))
});

app.get('/comments/:id?', (req, res, next) => {
    const idMovie = req.params.id;

    if (!idMovie) { 
        next(); 
        return
    }

    if (!ObjectID.isValid(idMovie)) {
        return res.status(404).send({
            error: 'Invalid movie ID'
        });
    }

    CommentModel.find({idMovie: idMovie})
        .then(document => {
            if (!document.length) {
                return res.status(404).send({error: 'No comments for this movie or ID of the movie not present in db'})
            }

            res.send(document)
        })
        .catch(error => res.status(400).send({error: error.message}))
});

app.get('/comments', (req, res) => {
    CommentModel.find({})
        .then(document => res.send(document))
        .catch(error => res.status(400).send({error: error.message}))
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;