const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    urlType:{
        type: String,
        enum: ['image', 'video']
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    bookmarks: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
});

const StorySchema = new mongoose.Schema({
    slides: {
        type: [SlideSchema],
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 6']
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Health and Fitness', 'Travel', 'Movie', 'Education']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

function arrayLimit(val) {
    return val.length >= 3 && val.length <= 6;
}

const Story = mongoose.model('Story', StorySchema);
module.exports = Story;
