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
import { MatchList } from "./components/matches/MatchList"
import { ReptileForm } from "./components/reptile/ReptileForm"

export const ApplicationViews = props => {
    // const lizard_user = localStorage.getItem("lizard_user")
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

        <ReptileProvider>
            <Route exact path="/reptiles/edit/:reptileId(\d+)">
                <ReptileForm />
            </Route>
        </ReptileProvider>

        <MatchProvider>
        <MessageProvider>
            <Route exact path="/messages">
                <MatchList />
            </Route>
        </MessageProvider>
        </MatchProvider>

        <ReptileProvider>
        <MessageProvider>
            <MatchProvider>
                <Route exact path="/messages/:messageId(/d+)">
                    <MessageForm />
                </Route>
            </MatchProvider>
        </MessageProvider>
        </ReptileProvider>

        {/* <ReptileProvider>
            <Route exact path={`/reptiles/detail/${lizard_user}`}>
                <ReptileDetail />
            </Route>
        </ReptileProvider> */}

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