import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return ({
        type: actionTypes.AUTH_START,

    })
}


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    }
}

export const authFail = (error) => {
    return ({
        type: actionTypes.AUTH_FAIL,
        error: error
    })
}


export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

// logheaza userul afara dupa 60 minute

export const checkAuthTimeout = (expirationTime) => {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }

}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            password: password,
            email: email,
            returnSecureToken: true,
        };

        // console.log(authData);

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJG_-mnC53EQeF0BU3RaFGJWo6SrHpKD8';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBJG_-mnC53EQeF0BU3RaFGJWo6SrHpKD8'
        }
        // primesc inapoi un token pe care il folosesc sa determin daca userul este logat sau nu;
        axios.post(url, authData)
            .then(response => {
                // console.log(response);
                // caluclarea expiration date:
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                // console.log("nu functioneaza");
                // console.log(err.response.data)
                dispatch(authFail(err.response.data.error.message));
            })
    }
}


export const setAuthRedirectPath = (path) => {

    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }

}

export const authCheckState = () => {
    // nu este cod asyncron dar se returneaza mai multe actiuni
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
            }
        }
    }
}

