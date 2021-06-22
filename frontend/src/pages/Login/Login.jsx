import React, { useContext, useRef } from 'react'
import { userSignIn } from '../../actions/AuthAction';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress} from '@material-ui/core'
import { Link } from "react-router-dom";
import "./Login.css"
function Login(props) {
    const email = useRef();
    const password = useRef();
    const {user , isFetching, dispatch} = useContext(AuthContext)

    const onClickHandler = (e) => {
        e.preventDefault();
        userSignIn({email:email.current.value, password: password.current.value} , dispatch)
        if (user) {
            props.history.push("/")
        }
    }
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Boiled Goose Inc</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Boiled Goose Inc.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="email" placeholder="Email" className="loginInput" required ref={email}/>
                        <input type="password" placeholder="Password" className="loginInput" minLength="6" required ref={password}/>
                        <button className="loginButton" onClick={onClickHandler} disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register"><button className="loginRegisterButton" >
                            Create a New Account
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
