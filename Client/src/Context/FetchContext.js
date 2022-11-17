import React from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const FetchContext = React.createContext();
const { Provider } = FetchContext;

// Our amazing FetchProvider functionality which is amazing and awesome
const FetchProvider = ({ children }) => {
  const authContext = React.useContext(AuthContext);
  axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${authContext.authState.token}`;
      return config
    }, error => {
      return Promise.reject(error);
    })
  axios.interceptors.response.use(response => {
    return response
  }, error => {
    const code = error && error.response ? error.response.status : 0;
    if (code === 401 || 403) {
      console.log('Error code', code);
    }
    return Promise.reject(error);
  })

  return (
    <Provider value={{
      axios
    }}>
      {children}
    </Provider>
  )
}

export { FetchContext, FetchProvider };
