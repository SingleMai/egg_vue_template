// import axios from 'axios'
// import { options } from './config'

// export const TravelsApi = {
//   getTravels: (data) => {
//     const url = '/travels'
//     return axios.get(url, Object.assign({}, options, { params: data }))
//   },
//   getTravelsByUser: (data) => {
//     const url = '/travel/user'
//     return axios.get(url, Object.assign({}, options, { params: data }))
//   },
//   createTravels: (data) => {
//     const url = '/travels'
//     return axios.post(url, data, Object.assign({}, options))
//   },
//   createComment: (data) => {
//     const url = '/travels/comment'
//     return axios.post(url, data, Object.assign({}, options))
//   },
//   createLikes: (data) => {
//     const url = '/travels/likes'
//     return axios.post(url, data, Object.assign({}, options))
//   }
// }