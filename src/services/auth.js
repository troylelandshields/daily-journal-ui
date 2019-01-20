import axios from 'axios';
import config from './config.js';

axios.defaults.headers.common['Accept'] = "application/json";

const auth = {
    isAuthenticated: false,
    isSubscribed() {
        return auth.user.subscription_id != null ;
    },
    isSetUp() {
        return auth.user.subscription_id != null && auth.user.phone_number != null;
    },
    authenticate(googleToken, cb) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + googleToken;
        axios.defaults.headers.common['X-Dumb-Authorization'] = "Bearer " + googleToken;

        window.localStorage.setItem("token", googleToken);

		axios.get(`${config.apiHost}/auth/google`)
		.then((authResponse) => {
            auth.isAuthenticated = true
            auth.user = authResponse.data;

            if (cb) cb();
		});
        
    },
    autoLogin(cb) {
        const storedToken = window.localStorage.getItem("token");
        if (storedToken) {
            auth.authenticate(storedToken, cb);
        }
    },
    signout(cb) {
        console.log("bye now!");
        auth.isAuthenticated = false;
        auth.user = null;
        window.localStorage.removeItem("token");

        if (cb) cb();
    }
}



export default auth;