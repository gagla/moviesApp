import express from 'express';
import fetch from 'node-fetch';
import {mongoose} from './../db';
import { ObjectID } from 'mongodb';
import { MovieModel } from './../models/movie';
import { CommentModel } from './../models/comment';

let router = express.Router()

router.post('/movies', (req, res) => {

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


router.get('/movies', (req, res) => {
    MovieModel.find({}).then(movies => res.send(movies))
});


module.exports = router