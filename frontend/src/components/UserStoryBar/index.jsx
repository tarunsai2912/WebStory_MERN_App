import React, {useState, useEffect} from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { getUserStories } from '../../apis/story'
import editImg from '../../assets/edit.png'
import { useNavigate } from 'react-router-dom'
import './index.css'

function UserStoryBar({isCreate, setUpdate, isUpdate}) {
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userStories, setUserStories] = useState([])
  const [showMore, setShowMore] = useState(false);
  
  const visibleStories = showMore ? userStories : userStories.slice(0, 4);

  const handleUserStories = async () => {
    setLoading(true)
    const response = await getUserStories()
    if (response) {
      setUserStories(response)
    }
    else{
      setUserStories([])
    }
    setLoading(false)
  }

  useEffect(() => {
    handleUserStories()
  }, [])

  const handleEdit = (id) => {
    sessionStorage.setItem('storyId', id)
    setUpdate(true)
  }

  const handleSelect = (id, index) => {
    navigate(`/story/${id}/${index}`)
  }

  return (
    <>
      {loading && <ClipLoader color="#000" />}
      {(!loading) && (<div className='user-container'>
        <h3 className='user-head'>Your Stories</h3>
        {(userStories && userStories.length) ? 
          <div className='stories-container-user' >
            {visibleStories.map((b1, index1) => {
              return (
                <div className='slides-container-user' key={index1} style={{backgroundColor: isCreate || isUpdate ? '#000000' : '#FFFFFF', opacity: isCreate || isUpdate ? '0.2' : '1'}}>
                  {b1.slides.map((b2, index2) => {
                    return (
                      index2 === 0 && <div className='each-container-user' key={index2}>
                        {b2.urlType === 'image' ? 
                          <img className='slide-img-user' src={b2.url} alt='image_txt' onClick={() =>  handleSelect(b1._id, index2)} /> 
                          : 
                          <video className='slide-video-user' autoPlay muted loop onClick={() =>  handleSelect(b1._id, index2)}>
                            <source src={b2.url} />
                          </video>
                        }
                        <div className='slide-head-user' onClick={() =>  handleSelect(b1._id, index2)}>
                          <h4 className='slide-h1-user'>{b2.heading}</h4>
                          <h6 className='slide-h2-user'>{b2.description}</h6>
                        </div>
                        <button className='edit-btn-user' onClick={() => handleEdit(b1._id)}>
                          <img src={editImg} alt='edit_img' width='15vw' height='15vh'></img>
                          Edit
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div> 
          : <h3 className='no-head-user'>No stories Available</h3>}
          {userStories.length > 4 && (
            <div className='see-more-div-user'>
              <button className='see-more-btn-user' onClick={() => setShowMore(!showMore)}>
                {showMore ? "See Less" : "See More"}
              </button>
            </div>
          )}
      </div>)}
    </>
  )
}

export default UserStoryBar
