import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import bookmarkImg from '../../assets/bookmark1.png'
import profileImg from '../../assets/profile.png'
import navbarImg from '../../assets/navbar.png'
import crossImg from '../../assets/cross1.png'
import './index.css'

function NavBar5({setCreate}) {

  const navigate = useNavigate()
  const username = sessionStorage.getItem('name')
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/')
    window.location.reload(false);
  }

  const handleCreate = () => {
    setCreate(true)
    navigate('/')
  }

  return (
    <div className='nav1-container-nav5'>
      <div className='log-d1-nav5'>
        <img className='bar-img-nav5' src={navbarImg} alt='navbar_img' onClick={() => setOpen(!open)}></img>
      </div>
      {open && <div className='log-d2-nav5'>
        <div className='top-div-nav5'>
          <img className='prof-img-nav5' src={profileImg} alt='profile_img'></img>
          <h4 className='name-para-nav5'>{username}</h4>
          <img className='cross1-img-nav5' src={crossImg} alt='cross_img' onClick={() => setOpen(false)}></img>
        </div>
        <button className='story-btn-nav5'>Your Story</button>
        <button className='add-btn-nav5' onClick={handleCreate}>Add story</button>
        <button className='book-btn-nav5' onClick={() => navigate('/bookmarks')}><img src={bookmarkImg} alt='bookmark_img' width='13vw' height='15vh'></img>Bookmarks</button>
        <button className='logout-btn-nav5' onClick={handleLogout}>Logout</button>
      </div>}
    </div>
  )
}

export default NavBar5
