# MoviesApp

MoviesApp is hosted at https://young-headland-62697.herokuapp.com <br />
`backend/` folder contains entire Node.js & Express backend. MongoDB is used to store data. <br />
 MoviesApp uses OMDb API http://www.omdbapi.com/ 

To run the app:
- clone repositorium
- run `npm install`
- install and run mongoDB if you run mongoDB locally (https://docs.mongodb.com/manual/installation/); if you run mongoDB on mlab ensure proxy is not blocking your connection 
- run `npm start` to start the server
- in another console run `ng serve` to run frontend

# API Endpoints specification - REST client reqests sample

POST /movies<br />
![alt text](https://github.com/gagla/moviesApp/blob/master/readme_img/movie_post.png)

POST /comments<br />
![alt text](https://github.com/gagla/moviesApp/blob/master/readme_img/comment_post.png)

GET /movie<br />
![alt text](https://github.com/gagla/moviesApp/blob/master/readme_img/movies_get.png)

GET /comments<br />
![alt text](https://github.com/gagla/moviesApp/blob/master/readme_img/comments_get.png)

GET /comments/id<br />
![alt text](https://github.com/gagla/moviesApp/blob/master/readme_img/comments_id_get.png)

## Running endpoints tests

Run `npm test` to execute the tests of endpoints.

## Build frontend

Run `ng build` to build the simple Angular 7 frontend. The build artifacts will be stored in the `dist/` directory. 

MOVIES:
After submitting movie title the whole movie object with details fetched from http://www.omdbapi.com/
is saved in database and added to displayed movie list.

COMMENTS
After submitting movie id and comment text the comment is added to displayed comment list.
If user clicks on movie id in the comment, all comments bound to movie are displayed.
