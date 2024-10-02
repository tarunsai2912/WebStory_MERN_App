import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import bookmarkImg from '../../assets/bookmark1.png'
import profileImg from '../../assets/profile.png'
import navbarImg from '../../assets/navbar.png'
import crossImg from '../../assets/cross1.png'
import './index.css'

function NavBar3({toggleRegister, toggleLogin, isRegisterOpen, isLoginOpen, setCreate, isCreate, isUpdate}) {

  const navigate = useNavigate()
  const authToken = sessionStorage.getItem('token')
  const userId = sessionStorage.getItem('userId')
  const username = sessionStorage.getItem('name')
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/')
    window.location.reload(false);
  }

  return (
    <div className='nav1-container-nav3' style={{backgroundColor: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '#000000CF' : '#FFFFFF', opacity: isLoginOpen || isRegisterOpen || isCreate || isUpdate ? '0.1' : '1'}}>
      <div className='log-d1-nav3'>
        <img className='bar-img-nav3' src={navbarImg} alt='navbar_img' onClick={() => setOpen(!open)}></img>
      </div>
      {authToken && userId ?
      <>
        {open && <div className='log-d2-nav3'>
          <div className='top-div-nav3'>
            <img className='prof-img-nav3' src={profileImg} alt='profile_img'></img>
            <h4 className='name-para-nav3'>{username}</h4>
            <img className='cross1-img-nav3' src={crossImg} alt='cross_img' onClick={() => setOpen(false)}></img>
          </div>
          <button className='home-btn-nav3'>Home</button>
          <button className='story-btn-nav3' onClick={() => navigate('/user/all')}>Your Story</button>
          <button className='add-btn-nav3' onClick={() => setCreate(true)}>Add story</button>
          <button className='book-btn-nav3' onClick={() => navigate('/bookmarks')}><img src={bookmarkImg} alt='bookmark_img' width='13vw' height='15vh'></img>Bookmarks</button>
          <button className='logout-btn-nav3' onClick={handleLogout}>Logout</button>
        </div>}
      </> : 
      <>
        {open && <div className='nav2-container-nav3'>
          <img className='cross2-img-nav3' src={crossImg} alt='cross_img' onClick={() => setOpen(false)}></img>
          <button className='sign-btn-nav3' onClick={toggleLogin}>Login</button>
          <button className='reg-btn-nav3' onClick={toggleRegister}>Register</button>
        </div>}
      </>
      }
    </div>
  )
}

export default NavBar3
