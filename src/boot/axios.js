import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://94.158.54.194:9092/api'
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}