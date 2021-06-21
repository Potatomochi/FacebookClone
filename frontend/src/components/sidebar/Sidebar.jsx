import React from 'react';
import {RssFeed , HelpOutline, School, WorkOutline, Event , Chat , PlayCircleFilledOutlined, Group, Bookmark} from "@material-ui/icons"
import "./sidebar.css";
import {Users} from "../../data";
import Closefriends from '../CloseFriends/Closefriends';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Feed</span>
                    </li>
                    <li className="sidebarItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Chats</span>
                    </li>
                    <li className="sidebarItem">
                        <PlayCircleFilledOutlined className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Videos</span>
                    </li>
                    <li className="sidebarItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Groups</span>
                    </li>
                    <li className="sidebarItem">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Bookmarks</span>
                    </li>
                    <li className="sidebarItem">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Questions</span>
                    </li>
                    <li className="sidebarItem">
                        <WorkOutline className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Jobs</span>
                    </li>
                    <li className="sidebarItem">
                        <Event className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Events</span>
                    </li>
                    <li className="sidebarItem">
                        <School className="sidebarIcon"/>
                        <span className="sidebarItemSpan">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                {Users.map((u) => (
                    <Closefriends key={u.id} user={u} />
                ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
