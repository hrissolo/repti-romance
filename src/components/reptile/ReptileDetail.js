import React, { useContext, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { useParams, useHistory } from "react-router-dom"

export const ReptileDetail = () => {
    const { getReptileById } = useContext(ReptileContext)
	
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

    return (
        <section className="reptile">
            <h3 className="reptile__name">{reptiles.username}</h3>
            <div className="reptile__breed">{reptiles.species}</div>
            
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

        </section>
    )
}