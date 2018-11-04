import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        required: true,
        validate: {
            isAsync: true,
            validator: function(v, cb) {
              MovieModel.find({title: v}, (err,docs) => {
                 cb(docs.length == 0);
              });
            },
            message: 'Title already exists!'
          }
    },
    movieObj: {
        type: Object,
        required: true
    }
});

const MovieModel = mongoose.model('MovieModel', MovieSchema);

module.exports = {MovieModel};