import axios from "axios";

export const userSignInRequest = (userCredential) => ({
    type: "USER_SIGN_IN_REQUEST"
})
export const userSignInSuccess = (user) => ({
    type: "USER_SIGN_IN_SUCCESS" , payload:user,
})
export const userSignInFailure = (error) => ({
    type: "USER_SIGN_IN_FAILURE", payload:error
})


export const userSignIn = async(userCredential,dispatch) => {
    dispatch({ type: "USER_SIGN_IN_REQUEST"});
    try {
        const res = await axios.post("/auth/login" , userCredential)
        dispatch({type:"USER_SIGN_IN_SUCCESS" , payload:res.data})
    } catch (err) {
        dispatch({type:"USER_SIGN_IN_FAILURE" , payload: err})
    } 
}

export const userSignOut = async(dispatch) => {
    localStorage.removeItem('user');
    dispatch({ type: "USER_SIGNOUT" });
    document.location.href = '/login';
}

export const Follow = (userId) => ({
    type:"FOLLOW", payload: userId,
})

export const Unfollow = (userId) => ({
    type:"UNFOLLOW", payload: userId,
})