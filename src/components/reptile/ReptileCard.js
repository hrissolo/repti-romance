import React from "react"
import { Link } from "react-router-dom"
import { Card, Icon, Image } from 'semantic-ui-react'



export const ReptileCard = ( {reptiles} ) => (
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
    </section>

)