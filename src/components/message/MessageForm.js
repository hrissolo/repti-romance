import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { MessageContext } from './MessageProvider'
import {MatchContext} from "../matches/MatchProvider"
import {ReptileContext} from "../reptile/ReptileProvider"
import "./Message.css"
import { MessageCard } from "./MessageCard"
import { Button, Input, TextArea, Form } from "semantic-ui-react"

export const MessageForm = (props) => {
    const { messages, addMessage, getMessageById, updateMessage, getMessages } = useContext(MessageContext)

    const [message, setMessage] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    let messageId  = props.messageId 
    
    const history = useHistory()
    const {reptileId} = useParams();

    const handleInputChange = (event) => {
        const newMessage = { ...message }
        newMessage[event.target.name] = event.target.value
        setMessage(newMessage)
    }

    useEffect(() => {
        if (messageId) {
            getMessageById(messageId)
                .then(message => {
                    setMessage(message)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [props.messageId])

    const constructNewMsg = (event) => {
        event.preventDefault()
        setIsLoading(true);
        if (messageId) {
            updateMessage({
                id: messageId,
                message: message.message,
                date: "edited " + message.date,
                reptileId: parseInt(localStorage.getItem("lizard_user")),
                sendeeId: parseInt(reptileId)
            })
            .then(() => {
                const clearer = document.querySelector("#messageMessage")
                clearer.value = ""
                message.message = ""
            })
            .then(setIsLoading(false))
            .then(messageId="")
        } else {
            addMessage({
                message: message.message,
                date: new Intl.DateTimeFormat('en-US', {
                    year: 'numeric', 
                    month: '2-digit',
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit'})
                    .format(Date.now()),
                reptileId: parseInt(localStorage.getItem("lizard_user")),
                sendeeId: parseInt(reptileId)
            })
                .then(() => getMessages(localStorage.getItem("lizard_user"), reptileId))
                .then(() => {
                    const clearer = document.querySelector("#messageMessage")
                    clearer.value = ""
                    message.message = ""
                })
                .then(setIsLoading(false))
        }
    }


    return (

            <Form className="messageForm" onSubmit={constructNewMsg} > 
                
                    <div className="msgForm">
                        <label htmlFor="messageMessage"><b>Type your message here:</b></label>
                        <br></br>
                        <TextArea type="text" id="messageMessage" width="30em" name="message" required className="form-control"
                            placeholder="Write message here"
                            onChange={handleInputChange}
                            defaultValue={message.message}
                        />
                    <br></br>
                <Button color="purple" type="submit"
                    disabled={isLoading} 
                    > {messageId ? <> Save message</> : <>Add message</>}
                </Button>
                </div>
                
            </Form>

    )
}