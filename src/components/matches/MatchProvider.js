import React, { useState, createContext } from "react"

export const MatchContext = createContext()

/*
 This component establishes what data can be used.
 */
export const MatchProvider = (props) => {
    const [matches, setMatches] = useState([])
    const reptileId = sessionStorage.getItem("lizard_user")

    //gets all friend relationships where friendUserId is the current logged in user
    //userId in the returned objects is expanded to show the friend(user)'s info
    const getMatches = () => {
        return fetch(`http://localhost:8088/matches?matchAddedId=${reptileId}&_expand=reptile`)
            .then(res => res.json())
            .then(setMatches)
    }

    
    const addMatch = matchObj => {
        return fetch("http://localhost:8088/matches", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(matchObj)
        })
            .then(getMatches)
    }

    //will be used for viewing friend details and deleting friend relationships
    const getMatchById = (id) => {
        return fetch(`http://localhost:8088/matches?matchAddedId=${reptileId}&reptileId=${id}&_expand=reptile`)
            .then(res => res.json())
    }

    const getReptiles = () => {
        return fetch(`http://localhost:8088/reptiles`)
            .then(res => res.json())
    }

    const getAlternateRelationship = (matchId) => {
        return fetch(`http://localhost:8088/matches?matchAddedId=${matchId}&reptileId=${reptileId}`)
        .then(res => res.json())
    }

    return (
        <MatchContext.Provider value={{
            matches, getMatches, addMatch, getMatchById, getReptiles, getAlternateRelationship
        }}>
            {props.children}
        </MatchContext.Provider>
    )
}