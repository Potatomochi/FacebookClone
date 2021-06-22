import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css";
import CakeIcon from '@material-ui/icons/Cake';
import {Users} from "../../data";
import {Link} from "react-router-dom";  
import OnlineUser from "../OnlineUser/OnlineUser"
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function Rightbar({user}) {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  const  [friends, setFriends] = useState([])
  const {user:currentUser , dispatch} = useContext(AuthContext)
  const [followed,setFollowed] = useState(currentUser.followings.includes(user?._id))


  const isUserChecker = (user , currentUser) => {
    if(user){
      if(user.username !== currentUser.username){
        return true;
      } else{
        return false;
      }
    }
  }


  useEffect(() => {
    const getFriends = async () =>{
      try{
        const friendList = await axios.get("/api/users/friends/" + user._id)
        setFriends(friendList.data)
      }catch(err) {
        console.log(err)
      }
    }
    getFriends();
  }, [user])

  const handleClick = async() =>{
    try {
      if(followed){
        await axios.put("/api/users/" + user._id+ "/unfollow" , { userId: currentUser._id, })
        dispatch({type:"UNFOLLOW" , payload:user._id})
      } else {
        await axios.put("/api/users/" + user._id+ "/follow" , { userId: currentUser._id, })
        dispatch({type:"FOLLOW" , payload:user._id})
      }
    } catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
  }

  const HomeRightBar = () => {
    return(
      <>

    {user &&  isUserChecker(user,currentUser) &&  (
        <button className="followButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <RemoveIcon /> : <AddIcon />}

        </button>
      )}
        <div className="birthdayContainer">
          <div className="birthdayIcon"><CakeIcon /></div>
          <span className="birthdayText">
              <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
          </div>
          <div className="rightbarAdsContainer">
            <img className="rightbarAd" src={`${publicFolder}/ad.png`} alt="" />
          </div>

          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {Users.splice(0,5).map((u) => (
              <OnlineUser key={u.id} user={u} />
            ))}
          </ul>
      </>
      )
  }
  const ProfileRightBar = () => {
    return (
      <>
      {user &&  isUserChecker(user,currentUser) &&  (
        <>
        {followed ? <button className="followButton" onClick={handleClick}>
          Unfollow <RemoveIcon fontSize="small"/>
        </button>: <button className="followButton" onClick={handleClick}> Follow <AddIcon /> </button>}
        </>
      )}
      <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city ? user.city : "Unknown"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from ? user.from : "Unknown"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "No relationship"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
            {friends.map( (friend) => (
              <Link to={"/profile/" +friend.username}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? publicFolder+friend.profilePicture : publicFolder+"person/default.jpg"} alt="" className="rightbarFollowingImg"/>
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
              </Link>
            ))}
        </div>
      </>
    
      )
  }
    return (
      <div className="rightbarContainer">
        <div className="rightbarWrapper">
          {user ? <ProfileRightBar /> : <HomeRightBar />}
       </div>
      </div>
    )
}

export default Rightbar
