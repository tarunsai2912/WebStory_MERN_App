const Story = require('../model/story')
const User = require('../model/user')

const createStory = async (req, res, next) => {
    try {
        const {slides, category} = req.body

        if (slides.length < 3 || slides.length > 6) {
            return res.status(401).json({ message: 'A story must have between 3 and 6 slides.' });
        }

        const user = await User.findById(req.user_Id)
        if(!user){
            return res.status(401).json({message: 'User Not Found'})
        }

        const story = new Story({
            slides, category, userId: user._id
        })
        const newStory = await story.save()
        const story_Id = newStory._id

        user.storyId.push(newStory)
        await user.save()

        return res.status(200).json({msg:'Quiz Added Successfully', story_Id})
    }
    catch(err){
        return next(err)
    }
}

const updateStory = async (req, res, next) => {
    try{
        const { storyId } = req.params;
        const {slides, category} = req.body

        if (slides.length < 3 || slides.length > 6) {
            return res.status(401).json({ message: 'A story must have between 3 and 6 slides.' });
        }
        
        const user = await User.findById(req.user_Id)
        if(!user){
            return res.status(401).json({message: 'User Not Found'})
        }

        const story = await Story.findById(storyId)
        if(!story){
            return res.status(401).json({message: 'Story Not Found'})
        }

        if (story.userId.toString() !== req.user_Id.toString()) {
            return res.status(401).json({message: 'Access Denied'})
        }

        const updatedStory = await Story.findByIdAndUpdate(storyId, {slides, category}, { new: true });

        await updatedStory.save();
        return res.status(200).json({ message: 'Story updated successfully', updatedStory });
    }
    catch(err){
        return next(err)
    }
}

const getUserStories = async (req, res, next) => {
    try{
        const user = await User.findById(req.user_Id)
        if(!user){
            return res.status(401).json({message: 'User Not Found'})
        }

        const stories = await Story.find({ userId: user._id }).select('slides category')

        if (!stories || stories.length === 0) {
            return res.status(401).json({ message: 'No stories found for this user' });
        }

        return res.status(200).json(stories)
    }
    catch(err) {
        return next(err)
    }
}

const getStoriesByCategory = async (req, res, next) => {
    try{
        const {category} = req.query;
        let filter = {};
        if (category) {
            const categoriesArray = category.split(',').map((cat) => cat.trim());
            filter.category = { $in: categoriesArray };
        }
        const stories = await Story.find(filter).select('slides category')
        return res.status(200).json(stories)
    }
    catch(err) {
        return next(err)
    }
};

const getStoryById = async (req, res, next) => {
    try{
        const {storyId} = req.params

        const story = await Story.findById(storyId)
        if(!story){
            return res.status(401).json({message: 'Story Not Found'})
        }

        return res.status(200).json(story)
    }
    catch(err){
        return next(err)
    }
}

const likeSlide = async (req, res, next) => {
    try{
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(400).json({ message: 'Story not found' });
        }

        const slide = story.slides.id(req.params.slideId);
        if (!slide) {
            return res.status(400).json({ message: 'Slide not found' });
        }

        const user = await User.findById(req.user_Id)
        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }

        if (!user.likedSlides.some(like => like.slide.equals(slide._id))) {
            slide.likes.push(req.user_Id);
            slide.likesCount++
            user.likedSlides.push({ slide: slide._id });
        }

        const updatedUser = await user.save()
        const updatedStory = await story.save();
        return res.status(200).json({message: 'Slide liked', updatedStory, updatedUser})
    }
    catch(err){
        return next(err)
    }
};

const unlikeSlide = async (req, res, next) => {
    try{
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(400).json({ message: 'Story not found' });
        }

        const slide = story.slides.id(req.params.slideId);
        if (!slide) {
            return res.status(400).json({ message: 'Slide not found' });
        }

        const user = await User.findById(req.user_Id)
        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }
    
        slide.likesCount--
        slide.likes = slide.likes.filter(userId => !userId.equals(req.user_Id));
        user.likedSlides = user.likedSlides.filter(like => !like.slide.equals(slide._id));

        const updatedUser = await user.save()
        const updatedStory = await story.save();

        return res.status(200).json({ message: 'Slide unliked', updatedStory, updatedUser });
    }
    catch(err){
        return next(err)
    }
};

const bookmarkSlide = async (req, res, next) => {
    try{
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(400).json({ message: 'Story not found' });
        }

        const slide = story.slides.id(req.params.slideId);
        if (!slide) {
            return res.status(400).json({ message: 'Slide not found' });
        }

        const slidesIndex = story.slides.findIndex(slide => slide._id.toString() === req.params.slideId);
        if (slidesIndex === -1) {
            return res.status(404).json({ message: 'Slide not found' });
        }

        const user = await User.findById(req.user_Id);
        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }

        if (!user.bookmarkedSlides.some(b => b.slide === slide._id)) {
            slide.bookmarks.push(req.user_Id);
            user.bookmarkedSlides.push({ story: story._id, slide: slide._id, slideIndex: slidesIndex });
        }

        const updatedUser = await user.save()
        const updatedStory = await story.save()
        return res.status(200).json({message: 'Slide bookmarked', updatedUser, updatedStory})
    }
    catch(err){
        return next(err)
    }
}

const unbookmarkSlide = async (req, res, next) => {
    try{
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(400).json({ message: 'Story not found' });
        }

        const slide = story.slides.id(req.params.slideId);
        if (!slide){
            return res.status(400).json({ message: 'Slide not found' });
        }

        const user = await User.findById(req.user_Id);
        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }

        const bookmarkIndex = slide.bookmarks.findIndex(userId => userId.toString() === req.user_Id.toString());
        if (bookmarkIndex !== -1) {
            slide.bookmarks.splice(bookmarkIndex, 1);
        }

        user.bookmarkedSlides = user.bookmarkedSlides.filter(b => b.slide.toString() !== slide._id.toString());

        const updatedStory = await story.save();
        const updatedUser = await user.save();
        return res.status(200).json({ message: 'Slide unbookmarked', updatedUser, updatedStory });
    }
    catch(err){
        return next(err)
    }
}

const getBookmarkedSlides = async (req, res, next) => {
    try{
        const user = await User.findById(req.user_Id).populate('bookmarkedSlides.story')
        if(!user){
            return res.status(400).json({ message: 'User not found' })
        }
        return res.status(200).json({bookmarks: user.bookmarkedSlides})
    }
    catch(err){
        return next(err)
    }
}

module.exports = {createStory, updateStory, getUserStories, getStoriesByCategory, getStoryById, likeSlide, unlikeSlide, bookmarkSlide, unbookmarkSlide, getBookmarkedSlides}