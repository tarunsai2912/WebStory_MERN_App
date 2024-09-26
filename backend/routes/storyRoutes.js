const express = require('express')
const router = express.Router()
const storyController = require('../controllers/storyControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, storyController.createStory)
router.get('/user/all', authMiddleware, storyController.getUserStories)
router.get('/', storyController.getStoriesByCategory)
router.get('/each/:storyId', storyController.getStoryById)
router.post('/like/:storyId/:slideId', authMiddleware, storyController.likeSlide)
router.delete('/unlike/:storyId/:slideId', authMiddleware, storyController.unlikeSlide);
router.post('/bookmark/:storyId/:slideId', authMiddleware, storyController.bookmarkSlide)
router.delete('/unbookmark/:storyId/:slideId', authMiddleware, storyController.unbookmarkSlide);
router.get('/get/bookmark', authMiddleware, storyController.getBookmarkedSlides)
router.put('/update/:storyId', authMiddleware, storyController.updateStory)

module.exports = router