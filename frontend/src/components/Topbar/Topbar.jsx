import { Search , Person, Chat, Notifications } from '@material-ui/icons'
import React, { useContext } from 'react'
import "./Topbar.css";
import { Link } from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext"
import { userSignOut } from '../../actions/AuthAction';

function Topbar() {
    const {user , dispatch } = useContext(AuthContext)
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const signoutHandler = () => {
        userSignOut(dispatch)
    }
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/"><span className="logo">Boiled Goose Inc</span></Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search />
                    <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div>
                    <Link to="/" className="topbarLink"><span >Homepage</span></Link>
                    <span className="topbarLink">Timeline</span>
                    <span><button onClick={signoutHandler}>Logout</button></span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="iconItemBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="iconItemBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="iconItemBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                <img src={ user.profilePicture
                ? publicFolder + user.profilePicture
                : publicFolder + "person/default.jpg"} alt="" className="topbarImage" />
                </Link>
            </div>

        </div>
    )
}

export default Topbar
