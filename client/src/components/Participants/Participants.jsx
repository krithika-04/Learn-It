import React from 'react'
import Participant from '../Participants/Participant/Participant'
import './Participants.scss'
import {useSelector} from 'react-redux'
function Participants() {
  const participants = useSelector((state)=>state.reducer.participants)
  const participantKeys = Object.keys(participants)
  const gridSize = participantKeys.length==1?1:participantKeys.length<=4?2:4
  return (
    <div style={{"--grid-size":gridSize}} className='participants'>
      {Object.keys(participants).map(participantKey=>{
        const currParticipant =participants[participantKey]
        return <Participant participant={currParticipant} key={participantKey}/>
      })}
    </div>
  )
}

export default Participants
