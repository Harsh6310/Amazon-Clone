import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://us-central1-clone-499a8.cloudfunctions.net/api' // THE API (cloud function) URL
});

export default instance ;

// https://us-central1-clone-499a8.cloudfunctions.net/api firebase cloud
// http://localhost:5001/clone-499a8/us-central1/api firebase local 

