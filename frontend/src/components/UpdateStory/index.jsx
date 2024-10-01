import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import crossImg from '../../assets/cross.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function UpdateStory({setUpdate, width}) {

  const navigate = useNavigate()
  const url = 'https://web-story-mern-backend.vercel.app/api'
  const authToken = sessionStorage.getItem('token')
  const storyId = sessionStorage.getItem('storyId')
  const [story, setStory] = useState({})
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorOccur, setErrorOccur] = useState(false)

  const fetchStory = async () => {
    setLoading(true)
    const reqUrl = `${url}/story/each/${storyId}`
    const response = await axios.get(reqUrl)
    if(response){
        setStory(response.data)
        setLoading(false)
    }
    else{
        setLoading(false)
    }
  }

  useEffect(() => {
    fetchStory()
  }, [])

  const handleRemoveSlide = () => {
    if (story.slides.length > 3) {
      const updatedSlides = story.slides.slice(0, -1);
      setStory({
        ...story,
        slides:  updatedSlides
      });
      setCurrentSlide(2)
    }
  }

  const handleAddSlide = () => {
    if (story.slides.length < 6) {
      setStory({
        ...story,
        slides:  [...story.slides, { heading: "", description: "", url: "", urlType: '' }]
      });
    }
  }

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...story.slides];
    updatedSlides[index][field] = value;
    if (field === 'url') {
      updatedSlides[index].urlType = getUrlType(value);
      if (updatedSlides[index].urlType === 'video') {
        setErrorOccur(true)
        validateVideoDuration(value, index);
      }
      else{
        setErrorOccur(false)
      }
    }
    setStory({
      ...story,
      slides:  updatedSlides
    });
  };

  const getUrlType = (url) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const videoExtensions = ['mp4', 'webm', 'ogg'];

    const urlExtension = url.split('.').pop();
    if (imageExtensions.includes(urlExtension.toLowerCase())) return 'image';
    if (videoExtensions.includes(urlExtension.toLowerCase())) return 'video';
    
    return '';
  };

  const validateVideoDuration = (url, slideIndex) => {
    const video = document.createElement('video');
    video.src = url;
    
    video.onloadedmetadata = () => {
      if (video.duration > 15) {
        toast.error('Video duration must be 15 seconds or less.');
        const updatedSlides = [...story.slides];
        updatedSlides[slideIndex].url = '';
        updatedSlides[slideIndex].urlType = '';
        setStory({
          ...story,
          slides:  updatedSlides
        });
        setErrorOccur(false)
        return
      }
      else{
        setErrorOccur(false)
      }
    };
    video.onerror = () => {
      toast.error('Invalid video URL');
    };
  };

  const handleCross = () => {
    if(width < 500){
      setUpdate(false)
      navigate('/user/all')
    }
    setUpdate(false)
    window.location.reload(false)
  }

  const handleSubmit = async () => {
    const hasEmptyField = story.slides.some(slide => !slide.heading || !slide.description || !slide.url);

    if (!story.category || hasEmptyField) {
      toast.error("All fields are required!");
      return;
    }
    try{
      setLoading(true)
      const reqUrl = `${url}/story/update/${storyId}`
      const response = await axios.put(reqUrl, {slides: story.slides, category: story.category}, {
        headers: {
          'token': `${authToken}`
        }
      });
      if(response){
        toast.success("Story updated successfully");
        setLoading(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!");
      setLoading(false)
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <ClipLoader color={"#36D7B7"} loading={loading} size={100} />}
      {!loading && <div className='update-container'>
        <div className='cross-div-update'>
          <img className='cross-img-update' src={crossImg} alt='cross_img' onClick={handleCross}></img>
        </div>
        {width > 500 ? <h5 className='cross-para-update'>Add upto 6 slides</h5> : <h5 className='cross-para1-update'>Update story to feed</h5>}
        <div className='grid-div-create'>
        <div className='slide-div1-update'>
          {story.slides.map((_, i) => (<div key={i} className='slide-no-div-update'>
            {width > 500 ? <button className='slide-no-update' style={{border: currentSlide === i ? '2px solid #73ABFF' : ''}}>
              <h3 style={{cursor: 'pointer'}} onClick={() => setCurrentSlide(i)}>Slide {i + 1}</h3>
              {i > 2 && <img className='slide-del-update' src={crossImg} alt='cross' onClick={handleRemoveSlide}></img>}
            </button> : 
            <button className='slide-no-update' style={{border: currentSlide === i ? '2px solid #73ABFF' : ''}}>
              {i > 2 && <img className='slide-del-update' src={crossImg} alt='cross' onClick={handleRemoveSlide}></img>}
              <h3 style={{cursor: 'pointer'}} onClick={() => setCurrentSlide(i)}>Slide {i + 1}</h3>
            </button>}
          </div>))}
          {story.slides.length < 6 && <button className='slide-add-update' onClick={handleAddSlide}>Add +</button>}
        </div>
        <div className='slide-div2-update'>
          {story.slides.map((slide, sIndex) => {
            return (
              <div className='eachslide-div-update' key={sIndex}>
                {currentSlide === sIndex && <div>
                  <div className='head-div-update'>
                    {width > 500 ? <h3 className='head-para-update'>Heading :</h3> : <h3 className='head-para-update'>Heading</h3>}
                    <input 
                      className='head-inp-update'
                      name='heading' 
                      type='text' 
                      value={slide.heading}
                      onChange={(e) => handleSlideChange(sIndex, 'heading', e.target.value)}
                      placeholder='Your heading'
                    >
                    </input>
                  </div>
                  <div className='descr-div-update'>
                    {width > 500 ? <h3 className='descr-para-update'>Description :</h3> : <h3 className='descr-para-update'>Description</h3>}
                    <textarea
                      className='descr-inp-update' 
                      name='description' 
                      type='text' 
                      value={slide.description}
                      onChange={(e) => handleSlideChange(sIndex, 'description', e.target.value)}
                      placeholder='Story Description'
                    >
                    </textarea>
                  </div>
                  <div className='url-div-update'>
                    {width > 500 ? <h3 className='url-para-update'>Image & Video :</h3> : <h3 className='url-para-update'>Image & Video</h3>}
                    <input 
                      className='url-inp-update'
                      name='url' 
                      type='text' 
                      value={slide.url}
                      onChange={(e) => handleSlideChange(sIndex, 'url', e.target.value)}
                      placeholder='Add Image/Video url'
                    >
                    </input>
                  </div>
                </div>}
              </div>
            )
          })}
          <div className='cat-div-update'>
            {width > 500 ? <h3 className='cat-para-update'>Story Category:</h3> : <h3 className='cat-para-update'>Category</h3>}
            <select className='cat-inp-update' defaultValue={story.category} onChange={(e) => setStory({...story, category: e.target.value})} required>
              <option value="">Select Category</option>
              <option value="Food">food</option>
              <option value="Health and Fitness">health and fitness</option>
              <option value="Travel">travel</option>
              <option value="Movie">movies</option>
              <option value="Education">education</option>
            </select>
          </div>
        </div>
        </div>
        {width > 500 ? <div className="slide-div3-update">
          <button
            className='prev-btn-update'
            onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))}
            disabled={currentSlide === 0}
          >
            Previous
          </button>
          <button
            className='next-btn-update'
            onClick={() => setCurrentSlide((prev) => (prev < story.slides.length - 1 ? prev + 1 : prev))}
            disabled={currentSlide === story.slides.length - 1}
          >
            Next
          </button>
          <button className="post-btn-update" onClick={handleSubmit} disabled={errorOccur}>Post</button>
        </div> : <div className='post1-div-update'><button className="post1-btn-update" onClick={handleSubmit} disabled={errorOccur}>Post</button></div>}
      </div>}
    </>
  )
}

export default UpdateStory
