import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import MiddleBar from '../../components/MiddleBar'
import Register from '../../components/Register';
import CreateStory from '../../components/CreateStory';
import leftImg from '../../assets/leftArrow.png'
import rightImg from '../../assets/rightArrow.png'
import UpdateStory from '../../components/UpdateStory';
import UserStoryBar from '../../components/UserStoryBar';
import Login from '../../components/Login';
import allImg from '../../assets/all.jpg'
import eduImg from '../../assets/education.jpg'
import foodImg from '../../assets/food.jpg'
import NavBar3 from '../../components/NavBar3';
import healthImg from '../../assets/health.jpg'
import movieImg from '../../assets/movie.jpg'
import travelImg from '../../assets/travel.jpg'
import './index.css'

function LandingPage({isCreate, setCreate, isLoginOpen, setLoginOpen, width, isUpdate, setUpdate}) {

  const authToken = sessionStorage.getItem('token')
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['All']);

  const categories = [
    { name: 'All', img: allImg },
    { name: 'Food', img: foodImg },
    { name: 'Movie', img: movieImg },
    { name: 'Education', img: eduImg },
    { name: 'Travel', img: travelImg },
    { name: 'Health and Fitness', img: healthImg }
  ];

  const [startIndex, setStartIndex] = useState(0); 
  const itemsPerPage = 2;

  const toggleRegister = () => {
    setLoginOpen(false)
    setRegisterOpen(true);
  }

  const toggleLogin = () => {
    setRegisterOpen(false)
    setLoginOpen(true);
  }

  const closeFlag = () => {
    if(isRegisterOpen){
      setRegisterOpen(false)
    }
    if(isLoginOpen){
      setLoginOpen(false)
    }
    if(isCreate){
      setCreate(false)
      window.location.reload(false)
    }
    if(isUpdate){
      setUpdate(false)
      window.location.reload(false)
    }
  };

  const handleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    }
    else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  }

  const handleNext = () => {
    if (startIndex + itemsPerPage < categories.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className='land-page-container' style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '#000000' : '#FFFFFF', opacity: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '0.9' : '1'}}>
      <div className='land-container' onClick={closeFlag} style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '#000000' : '#FFFFFF', opacity: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '0.9' : '1'}}>
        {width > 500 ? 
          <NavBar toggleRegister={toggleRegister} toggleLogin={toggleLogin} isRegisterOpen={isRegisterOpen} isLoginOpen={isLoginOpen} setCreate={setCreate} isCreate={isCreate} isUpdate={isUpdate} /> :
          <NavBar3 toggleRegister={toggleRegister} toggleLogin={toggleLogin} isRegisterOpen={isRegisterOpen} isLoginOpen={isLoginOpen} setCreate={setCreate} isCreate={isCreate} isUpdate={isUpdate} />
        }
        {width > 500 ? 
        <div className='cat-div-land' style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '#000000' : '#FFFFFF', opacity: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '0.2' : '1'}}>
          <div className='each-cat-land' style={{border: selectedCategories.includes('All') ? '5px solid #00ACD2' : ''}} onClick={() => handleCategory('All')}>
            <img className='cat-img-land' src={allImg} alt='all_img'></img>
            <h4 className='cat-para-land'>All</h4>
          </div>
          <div className='each-cat-land' style={{border: selectedCategories.includes('Food') ? '5px solid #00ACD2' : ''}} onClick={() => handleCategory('Food')}>
            <img className='cat-img-land' src={foodImg} alt='food_img' width='10vw' height='10vh'></img>
            <h4 className='cat-para-land'>Food</h4>
          </div>
          <div className='each-cat-land' style={{border: selectedCategories.includes('Movie') ? '5px solid #00ACD2' : ''}} onClick={() => handleCategory('Movie')}>
            <img className='cat-img-land' src={movieImg} alt='movie_img' width='10vw' height='10vh'></img>
            <h4 className='cat-para-land'>Movie</h4>
          </div>
          <div className='each-cat-land' style={{border: selectedCategories.includes('Education') ? '5px solid #00ACD2' : ''}} onClick={() => handleCategory('Education')}>
            <img className='cat-img-land' src={eduImg} alt='edu_img' width='10vw' height='10vh'></img>
            <h4 className='cat-para-land'>Education</h4>
          </div>
          <div className='each-cat-land' style={{border: selectedCategories.includes('Travel') ? '5px solid #00ACD2' : ''}} onClick={() => handleCategory('Travel')}>
            <img className='cat-img-land' src={travelImg} alt='travel_img' width='10vw' height='10vh'></img>
            <h4 className='cat-para-land'>Travel</h4>
          </div>
          <div className='each-cat-land' style={{border: selectedCategories.includes('Health and Fitness') ? '5px solid #00ACD2' : ''}} onClick={() => handleCategory('Health and Fitness')}>
            <img className='cat-img-land' src={healthImg} alt='health_img' width='10vw' height='10vh'></img>
            <h4 className='cat-para2-land'>Health and Fitness</h4>
          </div>
        </div> : 
        <div className='cat-div-land' style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '#000000' : '#FFFFFF', opacity: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '0.2' : '1'}}>
          <img className="left-arr-land" src={leftImg} alt="left_img" width="50vw" height="50vh" style={{ backgroundColor: '#000000', cursor: 'pointer', opacity: startIndex === 0 ? '0.3' : '1' }} onClick={handlePrev}/>
          {categories.slice(startIndex, startIndex + itemsPerPage).map((cat, index) => (
            <div className="each-cat-land" key={index} style={{ border: selectedCategories.includes(cat.name) ? '5px solid #00ACD2' : '' }} onClick={() => handleCategory(cat.name)}>
              <img className="cat-img-land" src={cat.img} alt={`${cat.name}_img`} width="10vw" height="10vh" />
              <h4 className='cat-para-land'>{cat.name}</h4>
            </div>
          ))}
          <img className="right-arr-land" src={rightImg} alt="right_img" width="50vw" height="50vh" style={{ backgroundColor: '#000000', cursor: 'pointer', opacity: startIndex + itemsPerPage >= categories.length ? '0.3' : '1' }} onClick={handleNext}/>
        </div>}
        {width > 500 && authToken && <UserStoryBar isCreate={isCreate} setUpdate={setUpdate} isUpdate={isUpdate} />}
        {selectedCategories.length > 0 ? <MiddleBar selectedCategories={selectedCategories} isLoginOpen={isLoginOpen} isRegisterOpen={isRegisterOpen} isCreate={isCreate} isUpdate={isUpdate} /> : <h3 className='cat-select-land'>Select Any Category</h3>}
      </div>
      {isRegisterOpen && <Register setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />}
      {isLoginOpen && <Login setLoginOpen={setLoginOpen} />}
      {isCreate && <CreateStory setCreate={setCreate} width={width} />}
      {isUpdate && <UpdateStory setUpdate={setUpdate} width={width} />}
    </div>
  )
}

export default LandingPage
