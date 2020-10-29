import React, { useContext, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { useParams, useHistory } from "react-router-dom"
import { Image, Icon, Card } from "semantic-ui-react"
import { ReptileList } from "./ReptileList"
import "./Reptile.css"

export const ReptileDetail = () => {
    const { getReptileById, editReptile } = useContext(ReptileContext)
	
	const [reptile, setReptiles] = useState({})
	
	const {reptileId} = useParams();
	const history = useHistory();

    useEffect(() => {
        console.log("running")
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
                    <button onClick={() => {
                       
                            history.push(`/reptiles/edit/${currentLiz}`)
                    
                        
                    }}><Icon name="edit" />
                    </button>
                </>
            )
    })
            
    return (
        <section className="reptile_detail">
            <Card centered><Card.Header>
            <h3 className="reptile__name">{reptile.username}</h3></Card.Header>
            <Image src={reptile.photo}></Image>
            <Card.Content>
            <div className="reptile__species"><b>Species:</b><br/>{reptile.species}</div>
            <div className="reptile__lookingFor"><b>Looking for:</b><br/> {reptile.lookingFor}</div>
            <div className="reptile__bio"><b>Bio:</b><br/> {reptile.bio}</div>
            </Card.Content>
        
            {buttonShow2()}
            </Card>
        </section>
    )
}