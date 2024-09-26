const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedSlides: [
        {
            slide: { type: mongoose.Schema.Types.ObjectId, ref: 'Story.slides' }
        }
    ],
    bookmarkedSlides: [
        {
            story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
            slide: { type: mongoose.Schema.Types.ObjectId, ref: 'Story.slides' },
            slideIndex: { type: Number }
        }
    ],
    storyId: [
        {
            storyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Story'
            },
            slideId: {
                type: mongoose.Schema.Types.ObjectId,
            }
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)