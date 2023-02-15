import React from 'react'
import './Messenger.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faUserFriends,
  faCommentAlt,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
function Messenger() {
  return (
    <div className="messengerContainer">
      <div className="messengerHeader">
        <h1>Meeting Details</h1>
        <FontAwesomeIcon className="icon" icon={faTimes} />
      </div>

      <div className="messengerHeaderTabs">
        <div className="tab">
          <FontAwesomeIcon className="icon" icon={faUserFriends} />
          <p> People{1}</p>
        </div>
        <div className="tab active">
          <FontAwesomeIcon className="icon" icon={faCommentAlt} />
          <p>Chat</p>
        </div>
      </div>
      <div className="chatSection">
        <div className="chatBlock">
          <div className="sender">
            you <small>10 PM</small>
          </div>
          <p className="msg">Hii</p>
        </div>
      </div>
      <div className="sendMsgSection">
        <input placeholder="send message to everyone" />
        <FontAwesomeIcon className="icon" icon={faPaperPlane} />
      </div>
    </div>
  )
}

export default Messenger
