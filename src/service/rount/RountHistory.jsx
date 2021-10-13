import React from "react";
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

import History from "../../page/History";
import Workings from "../../page/Workings";
// import HisPdfView from "../../component/pageView/HisPdfView";
const RountHistory = () => {
 
    let { path, url } = useRouteMatch();

    return (
        <div>
            <h2>หัวข้อต่าง ๆ</h2>
            <ul>
                <li>
                    <Link to={`${url}/resume`}>ประวัติ</Link>
                </li>
                <li>
                    <Link to={`${url}/workings`}>ผลงาน</Link>
                </li>
                <li>
                    <Link to={`${url}/workmanship`}>ความสามารถต่าง ๆ</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>
                    <h3>เลือกหัวข้อ</h3>
                </Route>
                <Route path={`${path}/resume`}>
                    <History />
                </Route>
                <Route path={`${path}/workings`}>
                    <Workings />
                </Route>
                <Route path={`${path}/workmanship`}>
                    <History />
                </Route>
                {/* <Route path={`${url}/pdfView:id`}>
                    <HisPdfView />
                </Route> */}
            </Switch>
        </div>
    );
}

export default RountHistory