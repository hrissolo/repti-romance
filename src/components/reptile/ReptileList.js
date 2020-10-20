import React, { useContext, useEffect, useState } from "react"
import { ReptileContext } from "./ReptileProvider"
import { ReptileCard } from "./ReptileCard"
import {useHistory} from "react-router-dom"

export const ReptileList = () => {
    const { reptiles, getReptiles } = useContext(ReptileContext)
    const history = useHistory()
    

	//useEffect - reach out to the world for something
    useEffect(() => {
		getReptiles()
		
    }, [])

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