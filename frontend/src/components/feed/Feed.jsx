import React, { useContext, useEffect, useState } from 'react'
import Post from '../Posts/Post';
import Sharing from '../Sharing/Sharing';
import "./Feed.css";
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

function Feed({username}) {
    const [posts,setPosts] = useState([]);
    const {user} =  useContext(AuthContext);
    useEffect(() =>{
        const fetchPosts = async() =>{
            const result = username ? await axios.get("/api/posts/profile/" + username) : await axios.get('/api/posts/timeline/'+ user._id)
            setPosts(result.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPosts()

    },[username , user._id])

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Sharing  />}
                {posts.map((x) =>(
                    <Post key={x._id} post={x} />
                ))}

            </div>
        </div>

    )
}

export default Feed
