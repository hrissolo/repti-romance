import React, { useContext, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { ReptileCard } from "./ReptileCard"
import {useHistory} from "react-router-dom"

export const ReptileList = () => {
    const { reptiles, getReptiles } = useContext(ReptileContext)
    const history = useHistory()
    const lizard_user = localStorage.getItem("lizard_user")

	//useEffect - reach out to the world for something
    useEffect(() => {
		getReptiles()
		
    }, [])

    // const exceptMe = () => {
    //   reptiles.filter(repti => repti.currentValue(lizard_user))
    // }

    return (
      <>
          <h1>Reptiles</h1>
        <div>
      {
      reptiles.map(reptiles => {
        return <ReptileCard key={reptiles.id} reptiles={reptiles} />
      })
      }
        </div>
      </>
  )
}