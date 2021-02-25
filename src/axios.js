import axios from 'axios'


const instances = axios.create({
    baseURL:'http://localhost:5001/clone-11470/us-central1/api'
})
export default instances
