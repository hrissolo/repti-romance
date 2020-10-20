import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home"
import { ReptileProvider } from "./components/reptile/ReptileProvider"
import { ReptileList } from "./components/reptile/ReptileList"
import { ReptileDetail } from "./components/reptile/ReptileDetail"

export const ApplicationViews = props => {
    return (
      <>
        <ReptileProvider>
            <Route exact path="/">
                <ReptileList />
            </Route>
        </ReptileProvider>

        <ReptileProvider>
            <Route exact path="/reptiles/detail/:reptileId(\d+)">
                <ReptileDetail />
            </Route>
        </ReptileProvider>
    </>
)}  