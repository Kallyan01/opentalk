import axios from 'axios'

const getDashboard=async(url)=>{
    const data = await axios.get(url);
    return data;
}

export default getDashboard;