import axios from 'axios';
import Qs from 'qs';

export const axiosInstance = axios.create({
  // baseURL: process.env.BASE_URL ? process.env.BASE_URL : '/',
  baseURL: 'http://localhost:80',
  paramsSerializer: params => {
    // Qs is already included in the Axios package
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    });
  },
});

// eslint-disable-next-line no-unused-vars
// export default ({ app, router, Vue }) => {
//   Vue.prototype.$axios = axiosInstance;
//   // ^ ^ ^ this will allow you to use this.$axios
//   //       so you won't necessarily have to import axios in each vue file
// };
