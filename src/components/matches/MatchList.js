import React, { useContext, useEffect } from "react"
import { MatchContext } from "./MatchProvider"
import { MatchCard } from "./MatchCard"
import { useHistory } from "react-router-dom"

export const MatchList = () => {
  // This state changes when `getFriends()` is invoked below
  const { matches, getMatches } = useContext(MatchContext)
  const history = useHistory()

	console.log(matches)
  useEffect(() => {
	  getMatches()
  }, [])
  
  // const findMatches = () => {
  //   if (matches) {
  //     matches.map(match => {
  //       return <MatchCard key={match.id} matches={match} />
  //     })
  //   }
  // }

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

