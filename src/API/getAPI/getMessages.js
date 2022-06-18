import axios from 'axios'

const getMessages=async(url)=>{
    const data = await axios.get(url);
    return data;
}

export default getMessages;