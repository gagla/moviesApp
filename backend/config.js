let env = process.env.NODE_ENV || 'development';

process.env.API_KEY = '7ef7aefb';

if (env === 'development') {
    process.env.PORT = process.env.PORT || 8080;
    process.env.MONGODB_URI = 'mongodb://heroku_682gf7lx:ncf271aq0h80fcb4vcgj2p2lrn@ds151393.mlab.com:51393/heroku_682gf7lx' || 'mongodb://localhost:27017/movies-dev';
}

if (env === 'test') {
    process.env.PORT = process.env.PORT || 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/movies-test';
}

if (env === 'production') {
    process.env.PORT = process.env.PORT || 4200;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/movies-prod';
}

console.log(`Running in ${env} mode`);