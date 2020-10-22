import React from "react";
import { Route } from "react-router-dom";
import { ReptileProvider } from "./components/reptile/ReptileProvider"
import { ReptileList } from "./components/reptile/ReptileList"
import { ReptileDetail } from "./components/reptile/ReptileDetail"
import { MessageProvider } from "./components/message/MessageProvider"
import { MessageCard } from "./components/message/MessageCard"
import { MessageForm } from './components/message/MessageForm'
import { ReptileCard } from "./components/reptile/ReptileCard";
import { MatchProvider } from "./components/matches/MatchProvider"

export const ApplicationViews = props => {
    return (
      <>
      
        <ReptileProvider>
            <MatchProvider>
                <Route exact path="/">
                    <ReptileList />
                </Route>
            </MatchProvider>
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

        <ReptileProvider>
            <MessageProvider>
                <Route exact path="/messages/edit/:messageId(\d+)">
                    <MessageForm />
                </Route>
            </MessageProvider>
        </ReptileProvider>

        <ReptileProvider>
            <MessageProvider>
                <Route exact path="/messages/detail/:messageId(\d+)">
                    <MessageForm />
                </Route>
            </MessageProvider>
        </ReptileProvider>

    </>
)}  