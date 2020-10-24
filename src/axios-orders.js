import axios from 'axios';



const instance = axios.create({
    baseURL: 'https://burger-app-project-3f63b.firebaseio.com/'
})


export default instance;