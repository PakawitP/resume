import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from "react-router-dom";

import Home from "../../page/Home";
import RountHistory from "./RountHistory";
import History from "../../page/History";
import HisPdfView from "../../component/pageView/HisPdfView";
export default function MainRount() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/history">
                    <RountHistory />
                    {/* <History/> */}
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path={"/pdfView:id"}>
                    <HisPdfView />
                </Route>
            </Switch>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.

function Resume() {
    return (
        <div>
            <h2>resume</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}