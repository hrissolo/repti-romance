import React, { useContext, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { ReptileCard } from "./ReptileCard"
import {useHistory} from "react-router-dom"
import "./Reptile.css"


export const ReptileList = () => {
    const { reptiles, getReptiles } = useContext(ReptileContext)
    const history = useHistory()
    const lizard_user = localStorage.getItem("lizard_user")

	//useEffect - reach out to the world for something
    useEffect(() => {
		getReptiles()
		
    }, [])


    return (
      
    <>
    <div className="reptileListcontainer">
      <h1 className="reptilesTitle">Reptiles</h1>
          
      <div className="container">
      
        {
        reptiles.map(reptiles => {
          return <ReptileCard key={reptiles.id} reptiles={reptiles} />
          })
        }
      </div>
      </div>
    </>
  )
}