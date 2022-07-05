import axios from 'axios'

const createUser = async(url,body)=>
{
  const data = axios.post(url,body);
  return data;
}

export default createUser;
