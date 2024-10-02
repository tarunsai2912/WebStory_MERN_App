import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import bookmarkImg from '../../assets/bookmark1.png'
import profileImg from '../../assets/profile.png'
import navbarImg from '../../assets/navbar.png'
import './index.css'

function NavBar2({setCreate}) {

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
    <div className='nav2-container'>
      <div className='log-d1-nav2'>
        <button className='home-btn-nav2' onClick={() => navigate('/')}>Home</button>
        <button className='book-btn-nav2'><img src={bookmarkImg} alt='bookmark_img' width='13vw' height='15vh'></img>Bookmarks</button>
        <button className='add-btn-nav2' onClick={handleCreate}>Add story</button>
        <img className='prof-img-nav2' src={profileImg} alt='profile_img'></img>
        <img className='bar-img-nav2' src={navbarImg} alt='navbar_img' onClick={() => setOpen(!open)}></img>
      </div>
      {open && <div className='log-d2-nav2'>
        <h4 className='name-para-nav2'>{username}</h4>
        <button className='logout-btn-nav2' onClick={handleLogout}>Logout</button>
      </div>}
    </div>
  )
}

export default NavBar2
