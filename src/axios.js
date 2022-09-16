import axios from 'axios'

//axios.defaults.baseURL = 'http://localhost:8080/'

const instance = axios.create({
  baseURL: 'http://localhost:8080/'
})

export default instance