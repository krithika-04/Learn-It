import { ADD_PARTICIPANT, REMOVE_PARTICIPANT } from "./actionTypes";
import { createOffer,initializeListener,createAnswer } from "../peerConnection";
// const host = JSON.parse(localStorage.getItem("HostId"))
// console.log(host)
let initialState = {
  currentUser: null,
  participants: {},
  mediaStream: null,
};
const stunServers = {
    iceServers : [
        {
            urls:[
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
                "stun:stun.services.mozilla.com",
            ]
        }
    ]
}
const reducer = (state = initialState, action) => {
  if (action.type == "SET_USER") {
    let { payload } = action;
    console.log("asdfg")
    initializeListener(Object.keys(payload.currentUser)[0])
    state = { ...state, currentUser: { ...payload.currentUser } };
    return state;
  } else if (action.type == "ADD_PARTICIPANT") {
    let { payload } = action;
    const currentUserId = Object.keys(state.currentUser)[0];
    const participantId = Object.keys(payload.participant)[0];
    if (currentUserId === participantId) {
      payload.participant[participantId].currentUser = true;
    }
   console.log(state.mediaStream)
    if (state.mediaStream && !payload.participant[participantId].currentUser) {
        console.log("heyy")
      addConnection(state.currentUser,payload.participant,state.mediaStream)
    }
    payload.participant[participantId].avatarColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`;
    let participants = { ...state.participants, ...payload.participant };
    state = { ...state, participants };
    return state;
  } else if (action.type == "REMOVE_PARTICIPANT") {
    let { payload } = action;
    let participants = { ...state.participants };
    delete participants[payload.participantKey];
    state = { ...state, participants };
    return state;
  } else if (action.type == "SET_USER_STREAM") {
    let { payload } = action;
    state = { ...state, ...payload };
    return state;
  } else {
    return state;
  }
};
const addConnection =(currentUser,newUser,mediaStream)=>{
    console.log("inside addConnection")
const peerConnection = new RTCPeerConnection(stunServers);
mediaStream.getTracks().forEach(track => {
    peerConnection.addTrack(track,mediaStream);
});

const currentUserKey = Object.keys(currentUser)[0];
const newUserKey = Object.keys(newUser)[0];
const sortedIds = [currentUserKey,newUserKey].sort((a, b) =>
a.localeCompare(b)
);
newUser[newUserKey].peerConnection = peerConnection
console.log(newUser[newUserKey])
console.log(sortedIds[0],sortedIds[1])
if(sortedIds[1]==currentUserKey){
    console.log("sorted id 1")
    createOffer(peerConnection,sortedIds[1],sortedIds[0])
}
}
export default reducer;
