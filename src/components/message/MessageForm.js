import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { MessageContext } from './MessageProvider'
import {MatchContext} from "../matches/MatchProvider"
import {ReptileContext} from "../reptile/ReptileProvider"
import "./Message.css"
import { MessageCard } from "./MessageCard"
import { Button, Input, TextArea } from "semantic-ui-react"

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
        // getMessages(localStorage.getItem("lizard_user"), reptileId)
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
                // .then(() => history.push(`/messages/${reptileId}`))
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
                // .then(() => history.push(`/messages/${reptileId}`))
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
        // <div className="messageList">
        //     <h2 id="sectionMessageHeader">Messages</h2>
        //     <div className="messagesWindow">
        //         {
        //             messages.map(message => {
        //                 return <MessageCard key={message.id} reptile={message.reptileId} message={message} />
        //             })
        //         }
        //     </div>

            <form className="messageForm" onSubmit={constructNewMsg} > 
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="messageMessage">Type your message here: </label>
                        <br></br>
                        <textarea type="text" id="messageMessage" width="30em" name="message" required className="form-control"
                            placeholder="Write message here"
                            onChange={handleInputChange}
                            defaultValue={message.message}
                        />
                    <br></br>
                <Button primary type="submit"
                    disabled={isLoading} 
                    > {messageId ? <> Save message</> : <>Add message</>}
                </Button>
                </div>
                </fieldset>
            </form>
        // </div>

    )
}