import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVideo,
  faMicrophone,
  faPhone,
  faAngleUp,
  faClosedCaptioning,
  faDesktop,
  faMicrophoneSlash,
  faVideoSlash,
  faCommentAlt,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import './ClassFooter.scss'
import { useSelector } from 'react-redux'
function ClassFooter(props) {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  })
  const participants = useSelector((state) => state.reducer.participants)
  const participantKeys = Object.keys(participants)
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      }
    })
  }

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      }
    })
  }
  const onCutCall = () => {
    props.onCutCall()
  }
  const showChatScreen = () => {
    props.showChatScreen()
  }
  useEffect(() => {
    props.onMicClick(streamState.mic)
  }, [streamState.mic])
  useEffect(() => {
    props.onVideoClick(streamState.video)
  }, [streamState.video])
  return (
    <div className="meetingFooter">
      <div
        className={'meetingIcons ' + (!streamState.mic ? 'active' : '')}
        data-tip={streamState.mic ? 'Mute Audio' : 'Unmute Audio'}
        onClick={micClick}
      >
        <FontAwesomeIcon
          icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
          title="Mute"
        />
      </div>
      <div
        className={'meetingIcons ' + (!streamState.video ? 'active' : '')}
        data-tip={streamState.video ? 'Hide Video' : 'Show Video'}
        onClick={onVideoClick}
      >
        <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
      </div>
      <div className="meetingIcons">
        <FontAwesomeIcon icon={faDesktop} />
      </div>
      <div className="meetingIcons" onClick={onCutCall}>
        <FontAwesomeIcon icon={faPhone} />
      </div>
      <div className="meetingIcons" onClick={showChatScreen}>
        <FontAwesomeIcon icon={faCommentAlt} />
      </div>

      <div className="participantCount">
        <span className="count">{participantKeys.length}</span>
        <FontAwesomeIcon icon={faUserFriends} />
      </div>
    </div>
  )
}

export default ClassFooter

{
  /* <div className="footer-item">
<div className="left-item">
  <div className="icon-block">
    Meeting details
    <FontAwesomeIcon className="icon" icon={faAngleUp} />
  </div>
</div>
<div className="center-item">
  <div className="icon-block  ">
    <FontAwesomeIcon className="icon" icon={faMicrophone} />
  </div>
  <div className="icon-block">
    <FontAwesomeIcon className="icon red" icon={faPhone} />
  </div>
  <div className="icon-block">
    <FontAwesomeIcon className="icon" icon={faVideo} />
  </div>
</div>
<div className="right-item">
  <div className="icon-block">
    <FontAwesomeIcon className="icon red" icon={faClosedCaptioning} />
    <p className="title">Turn on captions</p>
  </div>
  {/* {isPresenting ? ( */
}
// <div className="icon-block">
//   <FontAwesomeIcon className="icon red" icon={faDesktop} />
//   <p className="title">Stop presenting</p>
// </div>
{
  /* ) : ( */
}
{
  /* // <div className="icon-block" onClick={screenShare}>
  //   <FontAwesomeIcon className="icon red" icon={faDesktop} />
  //   <p className="title">Present now</p>
  // </div> */
}
{
  /* )} */
}
// </div>
// </div> */}
