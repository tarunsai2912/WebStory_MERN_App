import React, {useState, useEffect} from 'react'
import { getBookmarks } from '../../apis/story'
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import NavBar2 from '../../components/NavBar2';
import './index.css'
import NavBar4 from '../../components/NavBar4';

function BookmarkPage({setCreate, width}) {

  const navigate = useNavigate()
  const [bookmarkData, setBookmarkData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleBookmark = async () => {
    setLoading(true)
    const response = await getBookmarks()
    if (response) {
      setBookmarkData(response)
      setLoading(false)
    }
  }

  useEffect(() => {
    handleBookmark()
  }, [])

  const handleSelect = (id, index) => {
    navigate(`/story/${id}/${index}`)
  }


  return (
    <div className='bookpage-container'>
      <div className='navbar-book'>
        {width > 500 ? <NavBar2 setCreate={setCreate} /> : <NavBar4 setCreate={setCreate} />}
      </div>
      {!loading ? <div className='book-container'>
        <h3 className='book-head1'>Your Bookmarks</h3>
        {bookmarkData.length ? 
          <div className='books-container'>
            {bookmarkData.map((b1, index1) => {
              return(
                <div key={index1} className='each-container-book'>
                {b1.story.slides.map((b2, index2) => {
                  return(
                    index2 === b1.slideIndex && 
                    <div key={index2} className='slide-container-book' onClick={() =>  handleSelect(b1.story._id, b1.slideIndex)}>
                      {b2.urlType === 'image' ? <img className='img-slide-book' src={b2.url} alt='image_txt'></img> : <video className='vid-slide-book' autoPlay muted><source src={b2.url}></source></video>}
                      <div className='para-div-book'>
                        <h4 className='h1-para-book'>{b2.heading}</h4>
                        <h6 className='h2-para-book'>{b2.description}</h6>
                      </div>
                    </div>
                  )
                })}
                </div>
              )
            })}
          </div> 
          : <h3 className='book-head2'>No Bookmarks Available</h3>}
      </div> : <div style={{position: 'relative', left: '40vw', top: '10vh'}}><ClipLoader color={"#36D7B7"} loading={loading} size={100} /></div>}
    </div>
  )
}

export default BookmarkPage
