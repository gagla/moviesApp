import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    idMovie: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true,
        minlength: 1
    }
});

const CommentModel = mongoose.model('CommentModel', CommentSchema);

module.exports = {CommentModel};