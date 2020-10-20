import React, { useContext, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { useParams, useHistory } from "react-router-dom"
import { Image, Icon, Card } from "semantic-ui-react"
import { ReptileList } from "./ReptileList"

export const ReptileDetail = () => {
    const { getReptileById, editReptile } = useContext(ReptileContext)
	
	const [reptiles, setReptiles] = useState({})
	
	const {reptileId} = useParams();
	const history = useHistory();

    useEffect(() => {
		console.log("useEffect", reptileId)
        getReptileById(reptileId)
        .then((response) => {
			setReptiles(response)
		})
			}, [])

    const buttonShow = (() => {
        if (reptiles.reptileId === parseInt(localStorage.getItem("lizard_user")))
            return (
                <>
                    <button onClick={
                        () => {
                            editReptile(reptiles.id)
                                .then(() => {
                                    history.push("/reptiles")
                                })
                        }}><Icon name="trash" />
                    </button>
                    <button onClick={() => {
                        history.push(`/reptiles/edit/${reptiles.id}`)
                    }}><Icon name="edit" />
                    </button>
                </>
            )
    })
            
    return (
        <section className="reptile">
            <Card><Card.Header>
            <h3 className="reptile__name">{reptiles.username}</h3></Card.Header>
            <Image src={reptiles.photo}></Image>
            <Card.Content>
            <div className="reptile__species">{reptiles.species}</div>
            <div className="reptile__lookingFor">{reptiles.lookingFor}</div>
            <div className="reptile__bio">{reptiles.bio}</div>
            </Card.Content>
            
            {/* <button onClick={
                () => {
                    releaseAnimal(reptile.id)
                    .then(() => {
                    history.push("/animals")
                })
                }}>Release Animal
            </button> */}

            <button onClick={() => {
                history.push(`/reptiles/edit/${reptiles.id}`)
                }}>Edit
            </button>
            </Card>
        </section>
    )
}