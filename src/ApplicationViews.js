import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home"
import { ReptileProvider } from "./components/reptile/ReptileProvider"
import { ReptileList } from "./components/reptile/ReptileList"
import { ReptileDetail } from "./components/reptile/ReptileDetail"
import { MessageProvider } from "./components/message/MessageProvider"
import { MessageCard } from "./components/message/MessageCard"
import { MessageForm } from './components/message/MessageForm'
import { ReptileCard } from "./components/reptile/ReptileCard";

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

        <MessageProvider>
            <Route exact path="/messages">
                <MessageForm />
            </Route>
        </MessageProvider>

        <ReptileProvider>
            <Route exact path="/myProfile">
                <ReptileDetail />
            </Route>
        </ReptileProvider>
    </>
)}  