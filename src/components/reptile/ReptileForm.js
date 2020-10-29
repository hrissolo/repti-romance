import React, { useContext, useRef, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { useHistory, useParams  } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import "./Reptile.css"

export const ReptileForm = (props) => {
    const { addReptile, getReptiles, getReptileById, editReptile } = useContext(ReptileContext)


    //for edit, hold on to state of task in this view
    const [reptiles, setReptiles] = useState({username: "", photo: "", species: "",lookingFor: "",bio: "", email: ""})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {reptileId} = useParams();
    const history = useHistory()
    const email = useRef(null)
    const username = useRef(null)
    const photo = useRef(null)
    const lookingFor = useRef(null)
    const species = useRef(null)
    const bio = useRef(null)

    const handleControlledInputChange = (event) => {
        const newReptile = { ...reptiles }
        newReptile[event.target.name] = event.target.value
        setReptiles(newReptile)
    }


    useEffect(() => {
        if (reptileId){
            getReptileById(reptileId)
            .then(reptile => {
                setReptiles(reptile)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
}, [])


    const constructNewRepti = () => {
        if (reptiles === 0) {
            window.alert("Please fill the fields")
        } else {
            setIsLoading(true);
            if (reptileId){
                //PUT - update
                editReptile({
                    id: reptiles.id,
                    username: reptiles.username,
                    bio: reptiles.bio,
                    lookingFor: reptiles.lookingFor,
                    species: reptiles.species,
                    photo: reptiles.photo,
                    email: reptiles.email
                })
                .then(() => history.push(`/reptiles/detail/${reptileId}`))
            }else {
                //POST - add
                addReptile({
                    id: parseInt(localStorage.getItem("lizard_user")),
                    username: reptiles.username,
                    bio: reptiles.bio,
                    lookingFor: reptiles.lookingFor,
                    species: reptiles.species,
                    photo: reptiles.photo,
                    email: reptiles.email
                })
                .then(() => history.push("/reptiles"))
            }
        }
    }

    
    return (
        <Form className="taskForm">
            <h2 className="taskForm__title">Edit Profile</h2>
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="taskName">Username: </label>
                    <input type="username" name="username" id="username" value={reptiles.username} required autoFocus className="form-control" placeholder="Task name" 
                    onChange={handleControlledInputChange}
                    />
                </div>
            </Form.Field>
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="bio" name="email" value={reptiles.email} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="bio">Bio: </label>
                    <input type="bio" name="bio" value={reptiles.bio} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="completeTask">Species: </label>
                    <input type="species" name="species" value={reptiles.species} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="photo">Photo: </label>
                    <input type="photo" name="photo" value={reptiles.photo} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="completeTask">Looking For: </label>
                    <input type="lookingFor" name="lookingFor" value={reptiles.lookingFor} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            <Button type="saveRepti"
                disabled={isLoading}
                onClick = {evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewRepti()
                }}> {reptileId ? <>Save Profile</> : <>Add Task</>}
                </Button>
        </Form>
    )
}


