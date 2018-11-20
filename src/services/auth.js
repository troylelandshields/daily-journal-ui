import axios from 'axios';

const auth = {
    isAuthenticated: false,
    authenticate(googleToken, cb) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + googleToken;
        window.localStorage.setItem("token", googleToken);

		axios.get("http://localhost:3000/auth/google")
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
      this.isAuthenticated = false

      if (cb) cb();
    }
}



export default auth;