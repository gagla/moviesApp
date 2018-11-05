import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(
    () => {
        console.log("connected to mongoDB")
    },
    (error) => {
        console.log("error", error);
    }
)

module.exports = { mongoose };
