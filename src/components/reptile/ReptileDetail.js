import React, { useContext, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { useParams, useHistory } from "react-router-dom"
import { Icon, Card, Button } from "semantic-ui-react"
import Magnifier from "react-magnifier";
import "./Reptile.css"

export const ReptileDetail = () => {
    const { getReptileById, editReptile } = useContext(ReptileContext)
	
	const [reptile, setReptiles] = useState({})
	
	const {reptileId} = useParams();
	const history = useHistory();

    useEffect(() => {
        getReptileById(reptileId)
        .then((response) => {
			setReptiles(response)
		})
			}, [reptileId])

    const buttonShow2 = (() => {
        const currentLiz = localStorage.getItem("lizard_user")
        if (reptileId === currentLiz)
            return (
                <>
                    <Button color="olive" onClick={() => {
                       
                            history.push(`/reptiles/edit/${currentLiz}`)
                    
                        
                    }}><Icon name="edit" />
                    </Button>
                </>
            )
    })

    const buttonShow3 = (() => {
        const currentLiz = localStorage.getItem("lizard_user")
        if (reptileId !== currentLiz)
            return (
                <>
                    <Button fluid color="olive" onClick={() => {
                       
                            history.push(`/messages/${reptile.id}`)
                        
                    }}>View Messages
                    </Button>
                </>
            )
    })
            
    return (
        <section className="reptile_detail">
            <Card centered><Card.Header>
            <h3 className="reptile__name">{reptile.username}</h3></Card.Header>
            <Magnifier src={reptile.photo}></Magnifier>
            <Card.Content>
            <div className="reptile__species"><b>Species:</b><br/>{reptile.species}</div>
            <div className="reptile__lookingFor"><b>Looking for:</b><br/> {reptile.lookingFor}</div>
            <div className="reptile__bio"><b>Bio:</b><br/> {reptile.bio}</div>
            <br/>
            {buttonShow3()}
            </Card.Content>
        
            {buttonShow2()}
            </Card>
        </section>
    )
}