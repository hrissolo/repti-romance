import React, { useContext, useEffect } from "react"
import { MatchContext } from "./MatchProvider"
import { MatchCard } from "./MatchCard"
import "./Match.css"

export const MatchList = () => {
  
  const { matches, getMatches } = useContext(MatchContext)
  

  useEffect(() => {
	  getMatches()
  }, [])
  

  return (
    <>
      <div className="matchListcontainer">
      <h1 className="matches_title">My Matches</h1>
      <div>
      {
      matches.map(match => {
        return <MatchCard key={match.id} match={match} />
      })}
    </div>
    </div>
    </>
  )
}

