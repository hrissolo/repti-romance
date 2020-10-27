import React, { useContext, useEffect } from "react"
import { MatchContext } from "./MatchProvider"
import { MatchCard } from "./MatchCard"
import { useHistory } from "react-router-dom"
import "./Match.css"

export const MatchList = () => {
  
  const { matches, getMatches } = useContext(MatchContext)
  const history = useHistory()

  useEffect(() => {
	  getMatches()
  }, [])
  

  return (
    <>
      
      <h2>Your Matches</h2>
      <div>
      {
      matches.map(match => {
        return <MatchCard key={match.id} match={match} />
      })}
    </div>
    </>
  )
}

