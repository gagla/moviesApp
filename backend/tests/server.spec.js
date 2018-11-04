import request from 'supertest';
import expect from 'expect';
import{ObjectID} from 'mongodb';
import app from './../server';
import {MovieModel} from './../models/movie';
import {CommentModel} from './../models/comment';

const testMovie1 = new ObjectID();
const testMovie2 = new ObjectID();
const testMovie3 = new ObjectID();

const testMovies = [
    {
        _id: testMovie1,
        title: "Titanic",
        movieObj: {
            Title: "Titanic",
            Year: "1997",
            Metascore: '75'
        }
    },
    {
        _id: testMovie2,
        title: "Blue Jasmine",
        movieObj: {
            Title: "Blue Jasmine",
            Year: "2013",
            Metascore: '78'
        }
    },
    {
        _id: testMovie3,
        title: "Speed",
        movieObj: {
            Title: "Speed",
            Year: "2000",
            Metascore: '19'
        }
    }
];

const testComments = [
    {
        _id: new ObjectID(),
        idMovie: testMovie1,
        text: 'First comment'
    },
    {
        _id: new ObjectID(),
        idMovie: testMovie2,
        text: 'Second comment'
    },
    {
        _id: new ObjectID(),
        idMovie: testMovie3,
        text: 'Third comment'
    }
];

const populateMovies = () => {
    return MovieModel.remove({}).then(() => MovieModel.insertMany(testMovies))

};

const populateComments = () => {
    return CommentModel.remove({}).then(() => CommentModel.insertMany(testComments))
};


beforeEach(populateMovies);
beforeEach(populateComments);

describe('POST /movies', () => {
    it('should add new movie object', () => {
        const title = "Brave";
        return request(app)
            .post('/movies')
            .send({title})
            .expect(200)
            .expect(res => {
                expect(res.body.title).toBe(title);
                expect(res.body.movieObj).toBeTruthy();
                expect(res.error).toBeFalsy();
            })
            .then(() => MovieModel.find({title}))
            .then(movies => expect(movies.length).toBe(1)) 
            .then(() => MovieModel.find({}))
            .then(movies => expect(movies.length).toBe(4))
            .catch((error) => {
                throw new Error(error)
            })

    });

    it('should throw an error when no movie title entered', () => {
        return request(app)
            .post('/movies')
            .send({})
            .expect(400)
            .expect(res => {
                expect(res.error).toBeTruthy();
                expect(res.body).toMatchObject({error: 'The title of the movie has not been entered'});
            })
            .then(() => MovieModel.find({}))
            .then(movies => expect(movies.length).toBe(3))
            .catch((error) => {
                throw new Error(error)
            })

    });

    it('should throw an error if no title found', () => {
        const title = '3333333kfkdldsls';
        return request(app)
            .post('/movies')
            .send({title})
            // .expect(400)
            .expect(res => {
                expect(res.error).toBeTruthy();
                expect(res.body).toMatchObject({error: 'No movies found with this title'});
            })
            .then(() => MovieModel.find({}))
            .then(movies => expect(movies.length).toBe(3))
            .catch((error) => {
                throw new Error(error)
            })

    });
});

describe('GET /movies', () => {
    it('should fetch all movies from database', () => {
        return request(app)
            .get('/movies')
            .expect(200)
            .expect(res => expect(res.body.length).toBe(3))
            .catch((error) => {
                throw new Error(error)
            })
    });
});



describe('POST /comments', () => {
    it('should add comment', () => {
        const text = 'Great movie!';
        return request(app)
            .post('/comments')
            .send({
                id: testComments[0].idMovie,
                text
            })
            .expect(200)
            .expect(res => {
                expect(res.body).toMatchObject({
                    text
                })
            })
            .then(() => CommentModel.find({}))
            .then(comments => expect(comments.length).toBe(4))
            .catch((error) => {
                throw new Error(error)
            })
    });

    it('should not add a comment when posted ID is invalid', () => {
        return request(app)
            .post('/comments')
            .send({
                id: '00011112',
                text: 'Test comment!'
            })
            .expect(400)
            .expect(res => {
                expect(res.body).toMatchObject({error: 'Invalid movie ID'})
            })
            .then(() => CommentModel.find({}))
            .then(comments => expect(comments.length).toBe(3))
            .catch((error) => {
                throw new Error(error)
            })
    });

    it('should not add comments if the movie is not present in db', () => {
        return request(app)
            .post('/comments')
            .send({
                id: new ObjectID(),
                text: 'My comment'
            })
            .expect(400)
            .expect(res => {
                expect(res.body).toMatchObject({error: 'Movie with this ID not found in db'})
            })
            .then(() => CommentModel.find({}))
            .then(comments => expect(comments.length).toBe(3))
            .catch((error) => {
                throw new Error(error)
            })
    });
});

describe('GET /comments', () => {
    it('should return all comments present in the database', () => {
        return request(app)
            .get('/comments')
            .expect(200)
            .expect(res => expect(res.body.length).toBe(3))
            .catch((error) => {
                throw new Error(error)
            })
    });

    it('should return comments to posted movie id', () => {
        const id = testComments[0].idMovie;
        return request(app)
            .get(`/comments/${id}`)
            .expect(200)
            .expect(res => {
                expect(res.body.length).toBe(1);
                expect(res.body[0].text).toBe('First comment')
            })
            .catch((error) => {
                throw new Error(error)
            })
    });

    it('should not return comments when id is invalid', () => {
        return request(app)
            .get(`/comments/0111`)
            .expect(404)
            .expect(res => expect(res.body.error).toBe('Invalid movie ID'))
            .catch((error) => {
                throw new Error(error)
            })
    });

    it('should not return comments if movie ID is not present in db or there are no comments', () => {
        return request(app)
            .get(`/comments/${new ObjectID()}`)
            .expect(404)
            .expect(res => expect(res.body.error).toBe('No comments for this movie or ID of the movie not present in db'))
            .catch((error) => {
                throw new Error(error)
            })
    });
});