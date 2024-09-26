import React, {useState, useEffect} from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import BookmarkPage from './pages/BookmarkPage'
import UserStoryPage from './pages/UserStoryPage'
import {Routes, Route} from 'react-router-dom'
import StoryPage from './pages/StoryPage'

function App() {

  const [isCreate, setCreate] = useState(false)
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isUpdate, setUpdate] = useState(false)

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<LandingPage isCreate={isCreate} setCreate={setCreate} isLoginOpen={isLoginOpen} setLoginOpen={setLoginOpen} width={width} isUpdate={isUpdate} setUpdate={setUpdate} />}></Route>
        <Route path='/bookmarks' element={<BookmarkPage setCreate={setCreate} width={width} />}></Route>
        <Route path='/story/:storyId/:num' element={<StoryPage setLoginOpen={setLoginOpen} width={width} />}></Route>
        <Route path='/user/all' element={<UserStoryPage setUpdate={setUpdate} setCreate={setCreate} />}></Route>
      </Routes>
    </div>
  )
}

export default App
