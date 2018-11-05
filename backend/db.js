import mongoose from 'mongoose';

mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(
    () => {
        console.log("connected to mongoDB")
    },
    (err) => {
        console.log("err", err);
    }
)

module.exports = { mongoose };