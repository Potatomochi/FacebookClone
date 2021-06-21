const AuthReducer = (state,action) => {
    switch (action.type){
        case "USER_SIGN_IN_REQUEST":
            return {
                user:null,
                isFetching: true,
                error: false,
            };
        case "USER_SIGN_IN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "USER_SIGN_IN_FAILURE":
            return {
                user:null,
                isFetching: false,
                error: action.payload,
            }
        case "USER_SIGNOUT": 
            return {}
        case "FOLLOW":
            return {
                //means take the state as it was previously
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                }
            }
        case "UNFOLLOW":
            return {
                 //means take the state as it was previously
                ...state,
                user: {
                     ...state.user,
                    followings: state.user.followings.filter((following) => following !== action.payload),
                }
            }        
        default:
            return state;
    }
}

export default AuthReducer;