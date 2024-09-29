import React,{useEffect, useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import axios from 'axios'
import './index.css'
import { useNavigate } from 'react-router-dom';

function MiddleBar({selectedCategories, isLoginOpen, isRegisterOpen, isCreate, isUpdate}) {

  const url = 'https://web-story-mern-backend.vercel.app/api'
  const navigate = useNavigate()
  const categories = ["Food", "Travel", "Movie", "Education", "Health and Fitness"];
  const [loading, setLoading] = useState(false)
  const [filteredStories, setFilteredStories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleExpand = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(cat => cat !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  useEffect(() => {
    const fetchFilteredStories = async () => {
      setLoading(true);
      try {
        let reqQuery = '';
        if (!selectedCategories.includes('All')) {
          const categoriesQuery = selectedCategories.join(',');
          reqQuery = `?category=${(categoriesQuery)}`;
        }
        const response = await axios.get(`${url}/story${reqQuery}`);
        setFilteredStories(response.data);
        setLoading(false)
      } 
      catch (error) {
        setLoading(false);
        setFilteredStories([]);
      }
    };
    fetchFilteredStories();
  }, [selectedCategories]);

  const handleSelect = (id, index) => {
    navigate(`/story/${id}/${index}`)
  }

  console.log(filteredStories, selectedCategories.join(','));
  

  return (
    <>
      {loading && <ClipLoader color="#000" />}
      {(!loading) && (<div className='middle-container' style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '#000000' : '#FFFFFF', opacity: isLoginOpen || isRegisterOpen || isCreate ? '0.9' : '1'}}>
        {(filteredStories && filteredStories.length) ? 
          <div className='stories-container-mid'>
            {categories.map((cat, catIndex) => {
                const storiesInCategory = filteredStories.filter(story => story.category === cat);
                if (selectedCategories.includes("All") || selectedCategories.includes(cat)) {
                  return (
                    <div className='cats-container-mid' key={catIndex}>
                      <h2 className='cat-head-mid'>Top Stories About {cat}</h2>
                      <div className='allstory-container-mid'>
                        {storiesInCategory.length > 0 ? (
                          storiesInCategory.slice(0, expandedCategories.includes(cat) ? storiesInCategory.length : 4).map((story, storyIndex) => (
                            <div className='each-story-mid' key={storyIndex} style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '#000000' : '#FFFFFF', opacity: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '0.2' : '1'}}>
                              {story.slides.map((slide, slideIndex) => (
                                slideIndex === 0 && (
                                  <div className='each-slide-container' key={slideIndex} onClick={() =>  handleSelect(story._id, slideIndex)}>
                                    {slide.urlType === 'image' ? <img className='img-slide-mid' src={slide.url} alt='image_txt'></img> : <video className='vid-slide-mid' autoPlay muted><source src={slide.url}></source></video>}
                                    <div className='slide-head-mid'>
                                      <h4 className='slide-head1-mid'>{slide.heading}</h4>
                                      <h6 className='slide-head2-mid'>{slide.description}</h6>
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          ))
                        ) : (
                          <h3 className='no-story-mid'>No stories Available</h3>
                        )}
                      </div>
                      {storiesInCategory.length > 4 && (
                        <div className='see-more-div-mid'>
                          <button className='slide-btn-mid' onClick={() => toggleExpand(cat)}>
                            {expandedCategories.includes(cat) ? 'See Less' : 'See More'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                } 
                else {
                  return null;
                }
              })}
          </div> 
          : <h3 className='mid-head'>No Stories Available</h3>}
      </div>)}
    </>
  )
}

export default MiddleBar
