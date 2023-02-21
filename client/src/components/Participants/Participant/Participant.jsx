import React, { useEffect, useRef } from 'react'
import Card from '../../Card/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import './Participant.scss'
function Participant({ participant }) {
  const videoRef = useRef(null)
  const remoteStream = new MediaStream()
  const userStream = useSelector((state) => state.reducer.mediaStream)
  useEffect(() => {
    if (participant.peerConnection) {
      participant.peerConnection.ontrack = (event) => {
        //when user is sharing media this function gets triggered on track
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track)
        })
        videoRef.current.srcObject = remoteStream
        videoRef.current.muted = false
      }
    }
  }, [participant.peerConnection])
  useEffect(() => {
    videoRef.current.srcObject = userStream
    videoRef.current.muted = true
  }, [participant.currentUser, userStream])
  return (
    <div className="participant">
      <Card>
        <video ref={videoRef} className="video" autoPlay playsInline></video>
        <FontAwesomeIcon className="muted" icon={faMicrophoneSlash} />
        <div style={{ background: participant.avatarColor }} className="avatar">
          {participant.uname[0]}
        </div>
        <div className="name">
          {participant.uname} {participant.currentUser ? '(You)' : ''}
        </div>
      </Card>
    </div>
  )
}

export default Participant
