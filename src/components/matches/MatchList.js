import React, { useContext, useEffect } from "react"
import { MatchContext } from "./MatchProvider"
import { MatchCard } from "./MatchCard"
import { useHistory } from "react-router-dom"

export const FriendList = () => {
  // This state changes when `getFriends()` is invoked below
  const { matches, getMatches } = useContext(MatchContext)
	
	//useEffect - reach out to the world for something
  useEffect(() => {
	  getMatches()
  }, [])

  const history = useHistory()
  //returns the user's list of friends
  return (
    <div className="friends">
      <div className="friendsTop">
        <h2>Your Matches</h2>
        <button onClick={()=> {history.push("matches/add")}}>
          Add New Match
        </button>
      </div>
      {
        matches.map(match => {
          return <MatchCard key={match.id} matches={match} />
        })
      }
    </div>
  )
}