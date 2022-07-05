import axios from 'axios'

const getUser=async(url)=>{
    const data = await axios.get(url);
    return data;
}

export default getUser;