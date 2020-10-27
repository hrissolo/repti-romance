import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "./MessageProvider"
import {ReptileContext} from "../reptile/ReptileProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Icon } from "semantic-ui-react"
import "./Message.css"

//each individual message

export const MessageCard = ({ message }) => {
    const history = useHistory()

    const { getMessages, deleteMessage, updateMessage } = useContext(MessageContext)


    const buttonShow = (() => {
        if (message.reptileId === parseInt(localStorage.getItem("lizard_user")))
            return (
                <>
                    <button onClick={
                        () => {
                            deleteMessage(message.id)
                                .then(() => {
                                    history.push("/messages")
                                })
                        }}><Icon name="trash" />
                    </button>
                    <button onClick={() => {
                        history.push(`/messages/edit/${message.id}`)
                    }}><Icon name="edit" />
                    </button>
                </>
            )
    })

    return (
        <section className="messageBox">
                <section className="messageContainer">
                    <div className="message"><strong>{message.reptile.username}</strong> - <em>{message.message}</em></div>
                    <div className="message__date">{message.date}</div>
                </section>
                <section className="buttons">
                    {buttonShow()}
                </section>
        </section>
    )
}
