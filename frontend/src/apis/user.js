import axios from 'axios'
const url = 'http://localhost:3003/api'

export const UserLogin = async ({name, password}) => {
    try{
        const reqUrl = `${url}/user/login`
        const response = await axios.post(reqUrl, {name, password})
        return response.data
    }
    catch(err){
        console.log(err);
    }
}

export const UserRegister = async ({name, password}) => {
    try{
        const reqUrl  = `${url}/user/register`
        const response = await axios.post(reqUrl, {name, password})
        return response.data
    }
    catch(err){
        console.log(err);
    }
}