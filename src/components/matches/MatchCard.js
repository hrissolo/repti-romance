import React, { useContext } from "react"
import {MatchContext} from "./MatchProvider"
import { useHistory, useParams } from 'react-router-dom';


//creates html for each friend, which can be clicked to view the details of that friend
export const MatchCard = ({ match }) => {
    const history = useHistory()
    const { getMatches, getMatchById } = useContext(MatchContext)


    console.log(match)
    return (
    <section className="match">
        <h3 className="match__name">
            
            { match.reptile.username }</h3>
            {match.reptile.photo} 
    <button onClick={()=> {history.push(`/matches/${match.id}`)}}>
    Click match to view messages
    </button> 
    </section>
)}


