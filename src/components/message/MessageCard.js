import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "./MessageProvider"
import {ReptileContext} from "../reptile/ReptileProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Icon, Button } from "semantic-ui-react"
import "./Message.css"

//each individual message

export const MessageCard = ({ message, updateEditState }) => {
    const history = useHistory()
    const {reptileId} = useParams();

    const { getMessages, deleteMessage, updateMessage } = useContext(MessageContext)


    const buttonShow = (() => {
        if (message.reptileId === parseInt(localStorage.getItem("lizard_user")))
            return (
                <>
                    <Button size="tiny" onClick={
                        () => {
                            deleteMessage(message)
                                .then(getMessages(message.reptileId, message.sendeeId))
                        }}><Icon name="trash" />
                    </Button>
                    <Button size="tiny" onClick={() => {
                        updateEditState(message.id)
                    }}><Icon name="edit" />
                    </Button>
                </>
            )
    })

    return (
        <section className="messageBox">
                <section className="messageContainer">
                    
                    <div className="message"><strong>{message.reptile.username}</strong> - <em>{message.message}</em></div>
                    
                </section>
                <div className="dateAndButton">
                    <div className="message__date">{message.date}</div>
                <section className="buttonSection">
                    {buttonShow()}
                </section></div>
        </section>
    )
}
