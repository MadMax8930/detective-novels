import axios from 'axios'

const fetcherBis = (url: string, reqOptions = {}) => (
   axios({ url, ...reqOptions, ...{ withCredentials: true } })
     .then((res) => res.data)
     .catch((error) => { throw error.response.data })
);
 
export default fetcherBis;