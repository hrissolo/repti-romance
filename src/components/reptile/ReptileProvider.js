import React, { useState, createContext, useContext } from "react"
import { MatchContext } from "../matches/MatchProvider"

export const ReptileContext = createContext()


export const ReptileProvider = (props) => {
    const [reptiles, setReptiles] = useState([])
    // const {matches} = useContext(MatchContext)

    const getReptiles = () => {
        return fetch("http://localhost:8088/reptiles")
            .then(res => res.json())
            .then(setReptiles)

            // .then((response) => {
            //     let relevant = []
            //     const friendIds = matches.map(friend => {
            //         return friend.sessionStorage.getItem("lizard_user")
            //     })
            //     response.map(user => {
            //         if(!friendIds.includes(user.id) && user.id !== parseInt(sessionStorage.getItem("lizard_user"))){
            //             return relevant.push(user)
            //         }
            //     })
            //     setReptiles(relevant)})

    }

    const getReptileById = (id) => {
        return fetch(`http://localhost:8088/reptiles/${id}`)
            .then(res => res.json())
    }

    const editReptile = reptile => {
        return fetch(`http://localhost:8088/reptiles/${reptile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reptile)
        })
            .then(getReptiles)
    }
    
    return (
        <ReptileContext.Provider value={{
            reptiles, getReptiles, getReptileById, editReptile
        }}>
            {props.children}
        </ReptileContext.Provider>
    )
}