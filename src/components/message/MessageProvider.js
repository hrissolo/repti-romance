import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data

export const MessageContext = createContext()

// This component establishes what data can be used.
export const MessageProvider = (props) => {
    const [messages, setMessages] = useState([])
    
    const getMessages = (user1, user2) => {
        let fullMsgArray = []
        
        return fetch(`http://localhost:8088/messages?reptileId=${user1}&sendeeId=${user2}&_expand=reptile`)
        .then(res => res.json())
        .then(parsedRes => {
            
            fullMsgArray.push(...parsedRes)})
        .then(()=> fetch(`http://localhost:8088/messages?reptileId=${user2}&sendeeId=${user1}&_expand=reptile`))
        .then(res2 => res2.json())
        .then(parsed2Res => {
	        fullMsgArray.push(...parsed2Res)
        }).then(()=> {
            
	    setMessages(fullMsgArray.sort((a, b) => new Date(a.date) - new Date(b.date)))
        })
    }

    const addMessage = messageObj => {
        return fetch(`http://localhost:8088/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
        .then(getMessages)
    }

    const getMessageById = (id)=> {
        return fetch(`http://localhost:8088/messages/${id}?_expand=reptile`)
            .then(res => res.json())
    }

    const deleteMessage = message => {
        return fetch(`http://localhost:8088/messages/${message.id}`, {
            method: "DELETE"
        })
            .then(()=> getMessages(message.reptileId, message.sendeeId))
    }

    const updateMessage = message => {
        return fetch(`http://localhost:8088/messages/${message.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
            .then(()=> getMessages(message.reptileId, message.sendeeId))
    }
    
    return (
        <MessageContext.Provider value={{
            messages, getMessages, addMessage, getMessageById, deleteMessage, updateMessage
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}