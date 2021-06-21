import {React , useContext, useEffect, useState} from 'react';
import {format} from 'timeago.js';
import { MoreVert ,  } from "@material-ui/icons";
import {Link} from "react-router-dom";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import "./post.css";
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

function Post({post}) {
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user , setUser] = useState({});

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

    const {user: currentUser } = useContext(AuthContext);
    useEffect(() => {
      setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() =>{
      const fetchUser = async() =>{
          const result = await axios.get(`/users?userId=${post.userId}`)
          setUser(result.data)
      }
      fetchUser()
    },[post.userId ])


    const likeHandler =()=>{
      try {
        axios.put("/posts/" + post._id + "/like" , {userId:currentUser._id})
      } catch (err) {
        //do something with error
      }
      setLike(isLiked ? like-1 : like+1)
      setIsLiked(!isLiked)
    }
    return (
        <div className="postContainer">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">

              <img
                className="postProfileImg"
                src={user.profilePicture || publicFolder+"person/default.jpg"}
                alt=""
              />
              <Link to={`/profile/${user.username}`} className="profileLink">
              <span className="postUsername">
                {user.username}
              </span>
              </Link>

              <span className="postDate">
                {format(post.createdAt)}
              </span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={publicFolder+post.img} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <button className="likeIcon" onClick={likeHandler}><ThumbUpIcon /></button>
              <span className="postLikeCounter">{like} people like this</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText"> {post.comment} comments</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Post
