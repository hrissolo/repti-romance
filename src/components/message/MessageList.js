import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "../message/MessageProvider"
import { MessageCard } from "./MessageCard"
import { useParams} from "react-router-dom"
import { MessageForm} from "./MessageForm"

    //the list of each individual message

export const MessageList = () => {
    const { messages, getMessages } = useContext(MessageContext)
    const lizard_user = localStorage.getItem("lizard_user")
    const {reptileId} = useParams();
    const [editMsgId, setEditMsgId] = useState("")
    
	//useEffect - reach out to the world for something
    useEffect(() => {
		getMessages(lizard_user, reptileId)
		
    }, [])

    //card & form are both in list
    const updateEditState = (messageId) => {
      setEditMsgId(messageId)
    }


    return (
      <>
      <div className="messages_container">
          <h1 className="msgs_title">Messages</h1>
        <div>

      {
      messages.map(message => {
        return <MessageCard key={message.id} message={message} updateEditState={updateEditState}/>
      })
      }
        </div>
      
      <MessageForm messageId={editMsgId} />
      </div>
      </>
  )
}