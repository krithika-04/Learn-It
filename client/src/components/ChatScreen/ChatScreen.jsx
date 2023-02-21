import React,{useState} from 'react'
import './ChatScreen.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes ,faPaperPlane} from '@fortawesome/free-solid-svg-icons'
function ChatScreen() {
  const [close,setClose]= useState(false);
  const handleClose = () =>{
    let prev = close
    setClose(!prev)
  }
  return (
    <div style={{ display: (!close ? '' : 'none') }} className="chatScreen">
      <div className="messageHeader">
      <h1 style={{flex:1}}>Messages</h1>
      <FontAwesomeIcon className="icon" onClick={handleClose} icon={faTimes} />
      </div>
      <div className="messageBox">
      <input placeholder="send message to everyone" />
        <FontAwesomeIcon className="icon" icon={faPaperPlane} />
      </div>
    </div>
  )
}

export default ChatScreen
