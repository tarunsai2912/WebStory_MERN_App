import axios from 'axios'
const url = 'https://web-story-mern-backend.vercel.app/api'
const authToken = sessionStorage.getItem('token')

export const getBookmarks = async () => {
    try{
        const reqUrl = `${url}/story/get/bookmark`
        const response = await axios.get(reqUrl, {
            headers: {
              'token': `${authToken}`
            }
        })
        return response.data.bookmarks
    }
    catch(err){
        console.log(err);
    }
}

export const getUserStories = async () => {
    try{
        const reqUrl = `${url}/story/user/all`
        const response = await axios.get(reqUrl, {
            headers: {
              'token': `${authToken}`
            }
        })
        return response.data
    }
    catch(err){
        console.log(err);
    }
}