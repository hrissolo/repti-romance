import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Card, Icon, Image } from 'semantic-ui-react'
import { MatchContext } from "../matches/MatchProvider"
import { ReptileContext } from "./ReptileProvider"


export const ReptileCard = ( {reptiles} ) => {
    const { addMatch } = useContext(MatchContext)
    const lizardId = parseInt(localStorage.getItem("lizard_user"))
    const { getReptiles } = useContext(ReptileContext)

    const addMatchObj = (taco) => {
        addMatch({
            reptileId: lizardId,
            matchAddedId: taco,
        })
        .then(()=>{
            addMatch({
                reptileId: taco,
                matchAddedId: lizardId
            })
        })
        .then(getReptiles)
    }

    return (
    <section className="reptile">
        
        <Card>
        <Card.Header>
        <h3 className="reptile__name">
        { reptiles.username } </h3>
        </Card.Header>
        
            <Link to={`/reptiles/detail/${reptiles.id}`}>  
                <Image src={ reptiles.photo } alt="Me!"></Image>
            </Link>
        <Card.Content>
        <div className="reptile__species">{ reptiles.species }</div>
        </Card.Content>
        </Card>

        <section>
            <button onClick={
                () => {
                    addMatchObj(reptiles.id)
                }
            }>YES</button>
        </section>

    </section>
    )
}