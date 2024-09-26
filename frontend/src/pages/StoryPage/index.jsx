import React, {useState, useEffect} from 'react'
import './index.css'
import ClipLoader from "react-spinners/ClipLoader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import backImg from '../../assets/backImg.jpg'
import shareImg from '../../assets/share.png'
import downloadImg from '../../assets/download.png'
import xImg from '../../assets/x.png'
import leftArrow from '../../assets/leftArrow.png'
import rightArrow from '../../assets/rightArrow.png'
import tickImg from '../../assets/tick.png'
import likeImg from '../../assets/liked.png'
import unlikeImg from '../../assets/unliked.png'
import bookmarkImg from  '../../assets/bookmarked.png'
import { useNavigate } from 'react-router-dom'
import unbookmarkImg from '../../assets/unbookmarked.png'

function StoryPage({setLoginOpen, width}) {

  const navigate = useNavigate()
  const {storyId, num} = useParams()
  const url = 'https://web-story-mern-backend.vercel.app/api'
  const authToken = sessionStorage.getItem('token')
  const userId = sessionStorage.getItem('userId')
  const [currentSlide, setCurrentSlide] = useState(parseInt(num));
  const [story, setStory] = useState({})
  const [loading, setLoading] = useState(true)
  const [downloadedSlides, setDownloadedSlides] = useState([]);

  const fetchStory = async () => {
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
  }, [story])

  const handleLike = async (storyId, slideId) => {
    if(authToken){
      try {
        const response = await axios.post(`${url}/story/like/${storyId}/${slideId}`, {}, {
          headers: {
            'token': `${authToken}`
          }
        });
        if(response){
          console.log('liked');
        }
      } catch (error) {
        console.error(error);
      }
    }
    else{
      setLoginOpen(true)
      navigate('/')
    }
  };

  const handleUnLike = async (storyId, slideId) => {
    try {
      const response = await axios.delete(`${url}/story/unlike/${storyId}/${slideId}`, {
        headers: {
          'token': `${authToken}`
        }
      });
      if(response){
        console.log('unliked');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = async (storyId, slideId) => {
    if(authToken){
      try {
        const response = await axios.post(`${url}/story/bookmark/${storyId}/${slideId}`, {}, {
          headers: {
            'token': `${authToken}`
          }
        });
        if(response){
          console.log('Bookmarked');
        }
      } catch (error) {
        console.error(error);
      }
    }
    else{
      setLoginOpen(true)
      navigate('/')
    }
  };

  const handleUnBookmark = async (storyId, slideId) => {
    try {
      const response = await axios.delete(`${url}/story/unbookmark/${storyId}/${slideId}`, {
        headers: {
          'token': `${authToken}`
        }
      });
      if(response){
        console.log('unbookmarked');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeft = () => {
    if(currentSlide !== 0){
        setCurrentSlide(currentSlide - 1)
    }
  }

  const handleRight = () => {
    if(currentSlide !== story.slides.length - 1){
        setCurrentSlide(currentSlide + 1)
    }
  }

  const handleCross = () => {
    navigate('/')
  }

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success('Link copied to Clipboard', {
        position: 'bottom-center',
        style: {
          backgroundColor: '#D9D9D9',
          borderRadius: '10vw',
          color: '#FF0000',
          fontFamily: 'DM Sans',
          fontSize: '1.2em',
          fontWeight: '700',
          textAlign: 'center',
          bottom: '35vh',
          left: '1.5vw'
        },
        autoClose: 2000
      })
    }).catch(err => {
      toast.error('Failed to copy link!', {
        position: 'bottom-center',
        style: {
          backgroundColor: '#D9D9D9',
          borderRadius: '10vw',
          color: '#FF0000',
          fontFamily: 'DM Sans',
          fontSize: '1em',
          fontWeight: '700',
          textAlign: 'center',
          bottom: '35vh',
          left: '1.5vw'
        },
        autoClose: 2000
      });
      console.error('Failed to copy: ', err);
    });
  };

  const handleShare = (id, num) => {
    const link = `https://web-story-mern-frontend.vercel.app/story/${id}/${num}`
    copyToClipboard(link)
  }

  const handleDownload = () => {
    setDownloadedSlides([...downloadedSlides, currentSlide]);
    const slide = story.slides[currentSlide];
    const link = document.createElement('a');
    link.href = slide.url;
    link.download = slide.url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {width > 500 ? <div className='story-page-container'>
        {loading && <ClipLoader color="#000" />}
        <img className='back-img-story' src={backImg} alt='back_img'></img>
        {!loading && <div className='story-container'>
          <div className='left-arr-div-story'>
            <img className='left-img-story' src={leftArrow} alt='left_img' onClick={handleLeft}></img>
          </div>
          <div className="slide-div-story">
            {story.slides[currentSlide].urlType === "image" ? (
              <img className='slide-img-story' src={story.slides[currentSlide].url} alt="slide_img" />
            ) : (
              <video className='slide-video-story' autoPlay muted >
                <source src={story.slides[currentSlide].url} />
              </video>
            )}
            <div className='slide-content-story'>
              <ToastContainer />
              <div className='top-div-story'>
                <div className='slide-bar-story'>
                  {Array(story.slides.map((_, i) => (
                    <div key={i} className="each-slide-bar-story" style={{backgroundColor: i>currentSlide ? '#D9D9D980' : '#FFFFFF'}}></div>
                  )))}
                </div>
                <div className='top-img-div-story'>
                  <img className='x-img-story' src={xImg} alt='x_img' onClick={handleCross}></img>
                  <img className='share-img-story' src={shareImg} alt='share_img' onClick={() => handleShare(story._id, currentSlide)}></img>
                </div>
              </div>
              {downloadedSlides.includes(currentSlide) && <div className='download-div-story'>
                <h3 className='download-head-story'>Downloaded Successfully</h3>
              </div>}
              <div className='bottom-div-story'>
                <div className='slide-head-div-story'>
                  <h3 className='slide-h1-story'>{story.slides[currentSlide].heading}</h3>
                  <h3 className='slide-h2-story'>{story.slides[currentSlide].description}</h3>
                </div>
                <div className='bottom-img-div-story'>
                  {story.slides[currentSlide].bookmarks.includes(userId) && authToken ? <img className='book-img-story' src={bookmarkImg} alt='bookmark_img' onClick={() => handleUnBookmark(story._id, story.slides[currentSlide]._id)}></img> : <img className='book-img-story' src={unbookmarkImg} alt='unbookmark_img' onClick={() => handleBookmark(story._id, story.slides[currentSlide]._id)}></img>}
                  {downloadedSlides.includes(currentSlide) ? <img className='download-img-story' src={tickImg} alt='tick_img'></img> : <img className='download-img-story' src={downloadImg} alt='download_img' onClick={handleDownload}></img>}
                  <div className='like-div-story'>
                    {story.slides[currentSlide].likes.includes(userId) && authToken ? <img className='like-img-story' src={likeImg} alt='like_img' onClick={() => handleUnLike(story._id, story.slides[currentSlide]._id)}></img> : <img className='like-img-story' src={unlikeImg} alt='unlike_img' onClick={() => handleLike(story._id, story.slides[currentSlide]._id)}></img>}
                    <p className='likecount-story'>{story.slides[currentSlide].likesCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='right-arr-div-story'>
            <img className='right-img-story' src={rightArrow} alt='right_img' onClick={handleRight}></img>
          </div>
        </div>}
      </div> : 
      <div className='story1-page-container'>
      {loading && <ClipLoader color="#000" />}
      {!loading && <div className='story1-container'>
        <img className='left-img-story1' src={leftArrow} alt='left_img' onClick={handleLeft}></img>
        <img className='right-img-story1' src={rightArrow} alt='right_img' onClick={handleRight}></img>
        <div className="slide-div-story1">
          {story.slides[currentSlide].urlType === "image" ? (
            <img className='slide-img-story1' src={story.slides[currentSlide].url} alt="slide_img" />
          ) : (
            <video className='slide-video-story1' src={story.slides[currentSlide].url} autoPlay muted >
              <source src={story.slides[currentSlide].url} />
            </video>
          )}
          <div className='slide-content-story1'>
            <ToastContainer />
            <div className='top-div-story1'>
              <div className='slide-bar-story1'>
                {Array(story.slides.map((_, i) => (
                  <div key={i} className="each-slide-bar-story1" style={{backgroundColor: i>currentSlide ? '#D9D9D980' : '#FFFFFF'}}></div>
                )))}
              </div>
              <div className='top-img-div-story1'>
                <img className='x-img-story1' src={xImg} alt='x_img' onClick={handleCross}></img>
                <img className='share-img-story1' src={shareImg} alt='share_img' onClick={() => handleShare(story._id, currentSlide)}></img>
              </div>
            </div>
            {downloadedSlides.includes(currentSlide) && <div className='download-div-story1'>
              <h3 className='download-head-story1'>Downloaded Successfully</h3>
            </div>}
            <div className='bottom-div-story1'>
              <div className='slide-head-div-story1'>
                <h3 className='slide-h1-story1'>{story.slides[currentSlide].heading}</h3>
                <h3 className='slide-h2-story1'>{story.slides[currentSlide].description}</h3>
              </div>
              <div className='bottom-img-div-story1'>
                {story.slides[currentSlide].bookmarks.includes(userId) && authToken ? <img className='book-img-story1' src={bookmarkImg} alt='bookmark_img' onClick={() => handleUnBookmark(story._id, story.slides[currentSlide]._id)}></img> : <img className='book-img-story1' src={unbookmarkImg} alt='unbookmark_img' onClick={() => handleBookmark(story._id, story.slides[currentSlide]._id)}></img>}
                {downloadedSlides.includes(currentSlide) ? <img className='download-img-story1' src={tickImg} alt='tick_img'></img> : <img className='download-img-story1' src={downloadImg} alt='download_img' onClick={handleDownload}></img>}
                <div className='like-div-story1'>
                  {story.slides[currentSlide].likes.includes(userId) && authToken ? <img className='like-img-story1' src={likeImg} alt='like_img' onClick={() => handleUnLike(story._id, story.slides[currentSlide]._id)}></img> : <img className='like-img-story1' src={unlikeImg} alt='unlike_img' onClick={() => handleLike(story._id, story.slides[currentSlide]._id)}></img>}
                  <p className='likecount-story1'>{story.slides[currentSlide].likesCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
      </div>}
    </>
  )
}

export default StoryPage
