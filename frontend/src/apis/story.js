import axios from 'axios'
const url = 'http://localhost:3003/api'
const authToken = sessionStorage.getItem('token')
const userId = sessionStorage.getItem('userId')
const username = sessionStorage.getItem('name')

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

export const getAllStories = async () => {
    try{
        const reqUrl = `${url}/story/`
        const response = await axios.get(reqUrl)
        return response.data
    }
    catch(err){
        console.log(err);
    }
}