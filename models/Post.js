const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    image: String,
    thought: String,
    user: {type:
        mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    likes: {type: Number, default: 0},
    comments: [
        { 
            text: String,
            createdAt: { type: Date, default: Date.now },
     },
    ],
});
module.exports = mongoose.model('Post',postSchema);