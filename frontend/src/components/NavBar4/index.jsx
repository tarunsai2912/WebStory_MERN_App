import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import bookmarkImg from '../../assets/bookmark1.png'
import profileImg from '../../assets/profile.png'
import navbarImg from '../../assets/navbar.png'
import crossImg from '../../assets/cross1.png'
import './index.css'

function NavBar4({setCreate}) {

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
    <div className='nav1-container-nav4'>
      <div className='log-d1-nav4'>
        <img className='bar-img-nav4' src={navbarImg} alt='navbar_img' onClick={() => setOpen(!open)}></img>
      </div>
      {open && <div className='log-d2-nav4'>
        <div className='top-div-nav4'>
          <img className='prof-img-nav4' src={profileImg} alt='profile_img'></img>
          <h4 className='name-para-nav4'>{username}</h4>
          <img className='cross1-img-nav4' src={crossImg} alt='cross_img' onClick={() => setOpen(false)}></img>
        </div>
        <button className='story-btn-nav4' onClick={() => navigate('/user/all')}>Your Story</button>
        <button className='add-btn-nav4' onClick={handleCreate}>Add story</button>
        <button className='book-btn-nav4' onClick={() => navigate('/')}><img src={bookmarkImg} alt='bookmark_img' width='13vw' height='15vh'></img>Bookmarks</button>
        <button className='logout-btn-nav4' onClick={handleLogout}>Logout</button>
      </div>}
    </div>
  )
}

export default NavBar4
