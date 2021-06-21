import React from 'react';
import { Topbar , Sidebar , Feed, Rightbar } from '../../components';

import "./Home.css";

function Home() {
    return (
        <>
            <Topbar />

            <div className="homeContainer">
            <Sidebar />
            <Feed />
            <Rightbar />
            </div>
        </>
    )
}

export default Home
