import express from 'express';
import fetch from 'node-fetch';
import {mongoose} from './../db';
import { ObjectID } from 'mongodb';
import { MovieModel } from './../models/movie';
import { CommentModel } from './../models/comment';

let router = express.Router()

router.post('/comments', (req, res) => {
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

router.get('/comments/:id?', (req, res, next) => {
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

router.get('/comments', (req, res) => {
    CommentModel.find({})
        .then(document => res.send(document))
        .catch(error => res.status(400).send({error: error.message}))
});

module.exports = router
