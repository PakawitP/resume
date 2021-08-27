import React from 'react'
import {
    Link,
} from "react-router-dom";
import Blog from '../layout/blog/Blog'

const Home = () => {
    return (
        // <div>
        //     <h1>
        //         Home
        //     </h1>
        //     <ul>
        //         <li>
        //             <Link to={`/history`}>ประวัติ</Link>
        //         </li>

        //     </ul>
        // </div>
        <Blog/>


    )
}

export default Home