import axios from 'axios';
import config from './config.js';
import {useState, useMemo, createContext} from 'react';

axios.defaults.headers.common['Accept'] = "application/json";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
  
    const isSubscribed = useMemo(() => {
      return user.subscription_id != null;
    }, [user]);
  
    const isSetUp = useMemo(() => {
      return user.subscription_id != null && user.phone_number != null;
    }, [user]);
  
    const authenticate = (googleToken, cb) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + googleToken;
      axios.defaults.headers.common['X-Dumb-Authorization'] = 'Bearer ' + googleToken;
  
      window.localStorage.setItem('token', googleToken);
  
      axios.get(`${config.apiHost}/auth/google`).then((authResponse) => {
        setUser(authResponse.data);
        setIsAuthenticated(true);
  
        if (cb) cb();
      });
    };
  
    const authenticateAuth0 = async (token, cb) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      axios.defaults.headers.common['X-Dumb-Authorization'] = 'Bearer ' + token;
  
      let authResponse = await axios.get(`${config.apiHost}/auth/auth0`);
      setUser(authResponse.data);
      setIsAuthenticated(true);
  
      if (cb) cb();
    };
  
    const autoLogin = async (auth0IsAuthenticated, getAccessTokenSilently, cb) => {
      const storedToken = window.localStorage.getItem('token');
      const authProvider = window.localStorage.getItem('authProvider') || "google";

      if (auth0IsAuthenticated || authProvider==="auth0") {
        if (!storedToken) {
          let token = await getAccessTokenSilently();
          // store token
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('authProvider', "auth0");
          authenticateAuth0(token, cb);
          return;
        }
        authenticateAuth0(storedToken, cb);
        return;
      }
      
      if (storedToken) {
        authenticate(storedToken, cb);
      } else {
        if (cb) {
          cb();
        }
      }
    };
  
    const signout = (auth0Logout, cb) => {
      console.log('bye now!');
      const authProvider = window.localStorage.getItem('authProvider') || "google";

      window.localStorage.removeItem('token');
      window.localStorage.removeItem('authProvider');
      setIsAuthenticated(false);
      setUser({});

      if (authProvider === "auth0" && auth0Logout) {
        auth0Logout({
          returnTo: "https://todayi.page",
        });
      }
  
      if (cb) cb();
    };
  
    return useMemo(() => {
      return {
        isAuthenticated,
        user,
        isSubscribed,
        isSetUp,
        authenticate,
        authenticateAuth0,
        autoLogin,
        signout,
      };
    }, [isAuthenticated, user, isSubscribed, isSetUp]);
  };

export default useAuth;

export const AuthContext = createContext();

// export default auth;