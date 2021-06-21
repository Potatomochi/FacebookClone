import React, { useEffect, useState } from 'react';
import "./profile.css";
import { Topbar , Sidebar , Feed, Rightbar } from '../../components'
import axios from 'axios';

import {useParams} from "react-router"
function Profile() {


    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
    const [user , setUser] = useState({});
    const username = useParams().username;

    useEffect(() =>{
        const fetchUser = async() =>{
            const result = await axios.get(`/users?username=${username}`)
            setUser(result.data)
        }
        fetchUser()
    },[username])
    console.log(user)
    return (

        <>
        <Topbar />
        <div className="profileContainer">
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={user.coverPicture || publicFolder + "post/3.jpg"} alt="" className="profileCoverImage" />
                        <img src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + "person/default.jpg"} alt="" className="profileUserImage" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                    </div>
                </div>

                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
            </div>

        </div>
        </>
    )
}

export default Profile
