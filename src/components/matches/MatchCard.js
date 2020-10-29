import React, { useContext } from "react"
import {MatchContext} from "./MatchProvider"
import { useHistory, useParams, Link } from 'react-router-dom';
import { Card, Icon, Image, Button } from 'semantic-ui-react'



//creates html for each friend, which can be clicked to view the details of that friend
export const MatchCard = ({ match }) => {
    const history = useHistory()
    const { getMatches, getMatchById } = useContext(MatchContext)

    return (
    <section className="matchCard">
        <div className="matchImage" >
        <Link to={`/reptiles/detail/${match.reptileId}`}>  
        <img src={match.reptile.photo} width="150px"></img>
        </Link></div>
        <div className="textclass"><h3 className="matchUsername">
            
            { match.reptile.username }</h3>
            
    <Button color="olive" onClick={()=> {history.push(`/messages/${match.reptileId}`) }}>
    View messages 
    </Button> </div>
    </section>
)}
