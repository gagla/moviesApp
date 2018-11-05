import './config.js';
import express from 'express';
import { json } from 'body-parser';
import {mongoose} from './db';
import movieRoute from './routes/movie-routes';
import commentRoute from './routes/comment-routes';

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
app.use(movieRoute);
app.use(commentRoute);

const distDir = __dirname + "./../dist/";
app.use(express.static(distDir));

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});

module.exports = app;