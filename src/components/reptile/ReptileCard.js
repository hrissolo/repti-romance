import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { MatchContext } from "../matches/MatchProvider"
import { ReptileContext } from "./ReptileProvider"
import Magnifier from "react-magnifier";
import Notifications, {notify} from 'react-notify-toast';
import "./Reptile.css"


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

    //button for scroll bar jumping 
    const button = document.querySelector('.container');
    const scrollWin = () => {
    let x = button.scrollLeft
    x=x+390   
    button.scroll(x,0)}




    return (


    <section className="reptiles" id={`${reptiles.id}`}>

        
        <Card>
        <Card.Header>
        <h3 className="reptile_Card">
        { reptiles.username } </h3>
        </Card.Header>
        
            <Link to={`/reptiles/detail/${reptiles.id}`}>  
                <Magnifier  src={ reptiles.photo } alt="Me!"></Magnifier>
            </Link>
        <Card.Content>
        <div className="reptile__species"><b>Bio:</b> { reptiles.bio }</div>
        </Card.Content>
        
        
        <section><Button.Group fluid>
            <Button color="olive" onClick={() => scrollWin()}
            > Pass</Button>
            <Button.Or/>
            <Button color="purple" type="button" className="addMatchButton" onClick={
                () => {
                    addMatchObj(reptiles.id)
                    scrollWin()
                } 
            }
            >Match 👅</Button>
            </Button.Group>
        </section>
        </Card>

    </section>
    )
}