import React from 'react';
import "./closefriends.css"
import { Link } from "react-router-dom";

function Closefriends({user}) {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Link to={`/profile/${user.username}`} className="closeFriendsLink" >
        <li className="friendSidebar">
            <img className="friendSidebarImage" src={publicFolder+user.profilePicture} alt="" />
            <span className="friendSidebarName">{user.username}</span>
        </li>
        </Link>
    )
}

export default Closefriends
