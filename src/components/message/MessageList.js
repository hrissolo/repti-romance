import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "../message/MessageProvider"
import { MessageCard } from "./MessageCard"
import {useHistory, useParams} from "react-router-dom"


    //the list of each individual message

export const MessageList = () => {
    const { messages, getMessages } = useContext(MessageContext)
    const history = useHistory()
    const lizard_user = localStorage.getItem("lizard_user")
    const {reptileId} = useParams();
    
	//useEffect - reach out to the world for something
    useEffect(() => {
		getMessages(lizard_user, reptileId)
		
    }, [])

    return (
      <>
          <h1>Messages</h1>
        <div>
      {
      messages.map(message => {
        return <MessageCard key={message.id} message={message} />
      })
      }
        </div>
      </>
  )
}