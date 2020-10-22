import React, { useContext } from "react"
import { MatchContext } from "./MatchProvider"


//creates html for each friend, which can be clicked to view the details of that friend
export const MatchCard = ({ match }) => {
    const { getAlternateRelationship } = useContext(MatchContext)

    
    return (
    <section className="friend">
        <h3 className="friend__name">{ match.reptile.name }</h3>
    </section>
)}