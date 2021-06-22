import React, { useContext, useRef, useState } from 'react'
import "./sharing.css"
import {PermMedia, Label,Room, Cancel} from "@material-ui/icons"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

function Sharing() {
    const { user } = useContext(AuthContext);
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file , setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId : user._id,
            desc: desc.current.value,
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file" , file);
            newPost.img = fileName;
            try {
                await axios.post("/api/upload", data);
            } catch (err) {

            }
        }
        try {
            await axios.post("/api/posts" , newPost);
            window.location.reload();
        } catch (err) {

        }
    }

    return (
        <div className="sharingContainer">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={ user.profilePicture ? publicFolder + user.profilePicture : publicFolder + "person/default.jpg"} alt="" className="shareProfileImage" />
                    <input placeholder={"What's happening " + user.username + " ?"} className="sharingInput" ref={desc} />

                </div>
                <hr className="sharingHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="imageShared" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label className="shareOption">
                            <PermMedia htmlColor="#FA383E" className="shareIcon" />
                            <span className="shareOptionText">Photo/Video</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="#3578E5" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="#00A400" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <InsertEmoticonIcon htmlColor="#F5C33B" className="shareIcon" />
                            <span className="shareOptionText">Feeling/Activity</span>
                        </div>
                    </div>

                    <button className="shareButton" type="submit">Post</button>

                </form>
            </div>
        </div>
    )
}

export default Sharing
