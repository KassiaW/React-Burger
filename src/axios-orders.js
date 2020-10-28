import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-d6173.firebaseio.com'
});

export default instance;