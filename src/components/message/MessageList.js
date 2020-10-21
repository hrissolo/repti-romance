import React, { useContext, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { MessageCard } from "./MessageCard"
import {useHistory} from "react-router-dom"

export const MessageList = () => {
    const { messages, getMessages } = useContext(ReptileContext)
    const history = useHistory()
    

	//useEffect - reach out to the world for something
    useEffect(() => {
		getMessages()
		
    }, [])

    return (
      <>
          <h1>Messages</h1>
        <div>
      {
      messages.map(messages => {
        return <MessageCard key={messages.id} messages={messages} />
      })
      }
        </div>
      </>
  )
}