import React, {useState, useEffect} from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { getUserStories } from '../../apis/story'
import editImg from '../../assets/edit.png'
import { useNavigate } from 'react-router-dom'
import NavBar5 from '../../components/NavBar5'
import './index.css'

function UserStoryPage({setUpdate, setCreate}) {
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userStories, setUserStories] = useState([])

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
    navigate('/')
  }

  const handleSelect = (id, index) => {
    navigate(`/story/${id}/${index}`)
  }

  return (
    <div className='userstorypage-container'>
      {loading && <div style={{position: 'relative', left: '40vw', top: '10vh'}}><ClipLoader color={"#36D7B7"} loading={loading} size={100} /></div>}
      <NavBar5 setCreate={setCreate} />
      {(!loading) && (<div className='userstory-container'>
        <h3 className='userstory-head'>Your Stories</h3>
        {(userStories && userStories.length) ? 
          <div className='stories-container-userstory' >
            {userStories.map((b1, index1) => {
              return (
                <div className='slides-container-userstory' key={index1}>
                  {b1.slides.map((b2, index2) => {
                    return (
                      index2 === 0 && <div className='each-container-userstory' key={index2}>
                        {b2.urlType === 'image' ? 
                          <img className='slide-img-userstory' src={b2.url} alt='image_txt' onClick={() =>  handleSelect(b1._id, index2)} /> 
                          : 
                          <video className='slide-video-userstory' autoPlay muted loop onClick={() =>  handleSelect(b1._id, index2)}>
                            <source src={b2.url} />
                          </video>
                        }
                        <div className='slide-head-userstory' onClick={() =>  handleSelect(b1._id, index2)}>
                          <h4 className='slide-h1-userstory'>{b2.heading}</h4>
                          <h6 className='slide-h2-userstory'>{b2.description}</h6>
                        </div>
                        <button className='edit-btn-userstory' onClick={() => handleEdit(b1._id)}>
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
          : <h3 className='no-head-userstory'>No stories Available</h3>}
      </div>)}
    </div>
  )
}

export default UserStoryPage
