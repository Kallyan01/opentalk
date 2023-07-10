import axios from 'axios'

const createRoom = async(body)=>
{
  const data = axios.post(`${process.env.REACT_APP_API_URL}/createroom`,body);
  return data;
}

export {createRoom};