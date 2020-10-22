import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { MessageContext } from './MessageProvider'
import "./Message.css"
import { MessageCard } from "./MessageCard"
import { Button, Input, TextArea } from "semantic-ui-react"

export const MessageForm = (props) => {
    const { messages, addMessage, getMessageById, updateMessage, getMessages } = useContext(MessageContext)

    const [message, setMessage] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { messageId } = useParams();
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        const newMessage = { ...messages }
        newMessage[event.target.name] = event.target.value
        setMessage(newMessage)
    }

    useEffect(() => {
        getMessages()
        if (messageId) {
            getMessageById(messageId)
                .then(message => {
                    setMessage(message)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructMessageObject = () => {
        const reptileId = parseInt(localStorage.getItem("lizard_user"))
        setIsLoading(true);
        if (messageId) {
            updateMessage({
                id: message.id,
                message: message.message,
                date: message.date,
                reptileId: message.reptileId
            })
                .then(() => history.push(`/messages/detail/${messageId}`))
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
                reptileId: reptileId
            })
                .then(() => history.push("/messages"))
                .then(() => getMessages())
                .then(() => {
                    const clearer = document.querySelector("#messageMessage")
                    clearer.value = ""
                    message.message = ""
                })
        }
    }


    return (
        <div className="messageList">
            <h2 id="sectionMessageHeader">Messages</h2>
            <div className="messagesWindow">
                {
                    messages.map(message => {
                        return <MessageCard key={message.id} reptile={message.reptileId} message={message} />
                    })
                }
            </div>

            <form className="messageForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="messageMessage">Type your message here: </label>
                        <br></br>
                        <textarea type="text" id="messageMessage" width="30em" name="message" required className="form-control"
                            placeholder="Write message here"
                            onChange={handleControlledInputChange}
                            defaultValue=""
                        />
                    <br></br>
                <Button primary type="submit"
                    // disabled={isLoading} herererer
                    onClick={event => {
                        event.preventDefault() // Prevent browser from submitting the form
                        constructMessageObject()
                    }}> Send message
                </Button>
                </div>
                </fieldset>
            </form>
        </div>

    )
}