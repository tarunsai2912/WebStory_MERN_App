import React, {useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import crossImg from '../../assets/cross.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import './index.css'

function CreateStory({setCreate, width}) {

  const url = 'https://web-story-mern-backend.vercel.app/api'
  const authToken = sessionStorage.getItem('token')
  const [slides, setSlides] = useState([
      { heading: '', description: '', url: '', urlType: '' },
      { heading: '', description: '', url: '', urlType: '' },
      { heading: '', description: '', url: '', urlType: '' }
  ])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorOccur, setErrorOccur] = useState(false)

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...slides];
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
    setSlides(updatedSlides);
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
        
        const updatedSlides = [...slides];
        updatedSlides[slideIndex].url = '';
        updatedSlides[slideIndex].urlType = '';
        setSlides(updatedSlides);
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

  const handleRemoveSlide = () => {
    if (slides.length > 3) {
      const updatedSlides = slides.slice(0, -1);
      setSlides(updatedSlides);
      setCurrentSlide(2)
    }
  };

  const handleCross = () => {
    setCreate(false)
    window.location.reload(false)
  }

  const handleAddSlide = () => {
    if (slides.length < 6) {
      setSlides([...slides, { heading: '', description: '', url: '', urlType: '' }]);
    }
  }

  const handleSubmit = async () => {
    const hasEmptyField = slides.some(slide => !slide.heading || !slide.description || !slide.url);

    if (!category || hasEmptyField) {
      toast.error("All fields are required!");
      return;
    }
    try{
      setLoading(true)
      const reqUrl = `${url}/story/create`
      const response = await axios.post(reqUrl, {slides: slides, category: category}, {
        headers: {
          'token': `${authToken}`
        }
      });
      if(response){
        toast.success("Story created successfully");
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
      {loading && <ClipLoader color="#000" />}
      {!loading && <div className='create-container'>
        <div className='cross-div-create'>
          <img className='cross-img-create' src={crossImg} alt='cross_img' onClick={handleCross}></img>
        </div>
        {width > 500 ? <h5 className='cross-para-create'>Add upto 6 slides</h5> : <h5 className='cross-para1-create'>Add story to feed</h5>}
        <div className='grid-div-create'>
        <div className='slide-div1-create'>
          {slides.map((_, i) => (<div key={i} className='slide-no-div-create'>
              {width > 500 ? <button className='slide-no-create' style={{border: currentSlide === i ? '2px solid #73ABFF' : ''}}>
                <h3 style={{cursor: 'pointer'}} onClick={() => setCurrentSlide(i)}>Slide {i + 1}</h3>
                {i > 2 && <img className='slide-del-create' src={crossImg} alt='cross' onClick={handleRemoveSlide}></img>}
              </button> : 
              <button className='slide-no-create' style={{border: currentSlide === i ? '2px solid #73ABFF' : ''}}>
                {i > 2 && <img className='slide-del-create' src={crossImg} alt='cross' onClick={handleRemoveSlide}></img>}
                <h3 style={{cursor: 'pointer'}} onClick={() => setCurrentSlide(i)}>Slide {i + 1}</h3>
              </button>}
          </div>))}
          {slides.length < 6 && <button className='slide-add-create' onClick={handleAddSlide}>Add +</button>}
        </div>
        <div className='slide-div2-create'>
          {slides.map((slide, sIndex) => {
            return (
              <div className='eachslide-div-create' key={sIndex}>
                {currentSlide === sIndex && <div>
                  <div className='head-div-create'>
                    {width > 500 ? <h3 className='head-para-create'>Heading :</h3> : <h3 className='head-para-create'>Heading</h3>}
                    <input 
                      className='head-inp-create'
                      name='heading' 
                      type='text' 
                      value={slide.heading}
                      onChange={(e) => handleSlideChange(sIndex, 'heading', e.target.value)}
                      placeholder='Your heading'
                    >
                    </input>
                  </div>
                  <div className='descr-div-create'>
                    {width > 500 ? <h3 className='descr-para-create'>Description :</h3> : <h3 className='descr-para-create'>Description</h3>}
                    <textarea
                      className='descr-inp-create' 
                      name='description' 
                      type='text' 
                      value={slide.description}
                      onChange={(e) => handleSlideChange(sIndex, 'description', e.target.value)}
                      placeholder='Story Description'
                    >
                    </textarea>
                  </div>
                  <div className='url-div-create'>
                    {width > 500 ? <h3 className='url-para-create'>Image & Video :</h3> : <h3 className='url-para-create'>Image & Video</h3>}
                    <input 
                      className='url-inp-create'
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
          <div className='cat-div-create'>
            {width > 500 ? <h3 className='cat-para-create'>Story Category:</h3> : <h3 className='cat-para-create'>Category</h3>}
            <select className='cat-inp-create' value={category} onChange={(e) => setCategory(e.target.value)} required>
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
        {width > 500 ? <div className="slide-div3-create">
          <button
            className='prev-btn-create'
            onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))}
            disabled={currentSlide === 0}
          >
            Previous
          </button>
          <button
            className='next-btn-create'
            onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev))}
            disabled={currentSlide === slides.length - 1}
          >
            Next
          </button>
          <button className="post-btn-create" onClick={handleSubmit} disabled={errorOccur}>Post</button>
        </div> : <div className='post1-div-create'><button className="post1-btn-create" onClick={handleSubmit} disabled={errorOccur}>Post</button></div>}
      </div>}
    </>
  )
}

export default CreateStory
