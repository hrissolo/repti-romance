import React, { useState, createContext } from "react"
export const ReptileContext = createContext()

export const ReptileProvider = (props) => {
    const [reptiles, setReptiles] = useState([])

    const getReptiles = () => {
        return fetch("http://localhost:8088/reptiles")
            .then(res => res.json())
            .then(setReptiles)
    }

    const getReptileById = (id) => {
        return fetch(`http://localhost:8088/reptiles/${id}`)
            .then(res => res.json())
    }

    return (
        <ReptileContext.Provider value={{
            reptiles, getReptiles, getReptileById
        }}>
            {props.children}
        </ReptileContext.Provider>
    )
}