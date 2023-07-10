import axios from 'axios'

const GetMessages=async(url)=>{
    const data = await axios.get(url);
    return data;
}

export default GetMessages;