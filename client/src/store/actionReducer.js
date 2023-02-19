import { ADD_PARTICIPANT, REMOVE_PARTICIPANT, SET_USER,SET_USER_STREAM,UPDATE_USER,UPDATE_PARTICIPANT } from "./actionTypes";
import { createOffer,initializeListener,createAnswer,updatePreference } from "../peerConnection";
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
const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);
const reducer = (state = initialState, action) => {
  if (action.type == SET_USER) {
    let { payload } = action;
    let participants = {...state.participants}
    const newUserId = Object.keys(payload.currentUser)[0]
    payload.currentUser[newUserId].avatarColor = generateColor();
    initializeListener(newUserId)
    state = { ...state, currentUser: { ...payload.currentUser },participants };
    return state;
  } else if (action.type == ADD_PARTICIPANT) {
    let { payload } = action;
    const currentUserId = Object.keys(state.currentUser)[0];
    const participantId = Object.keys(payload.participant)[0];
    let newParticipant = {...payload.participant};
    if (state.mediaStream && currentUserId!==participantId) {
      newParticipant =  addConnection(state.currentUser,newParticipant,state.mediaStream)
    }
    if (currentUserId === participantId) {
     newParticipant[participantId].currentUser = true;
    }
  //  console.log(state.mediaStream)

    newParticipant[participantId].avatarColor = generateColor();
    let participants = { ...state.participants, ...newParticipant };
    state = { ...state, participants };
    return state;
  } else if (action.type == REMOVE_PARTICIPANT) {
    console.log("123")
    let  payload  = action.payload;
    let participants = { ...state.participants };
    delete participants[payload.participantKey];
    state = { ...state, participants };
    console.log("removed")
    return state;
  } else if (action.type == SET_USER_STREAM) {
    let { payload } = action;
    state = { ...state, ...payload };
    return state;
  }
  else if (action.type === UPDATE_USER) {
    let payload = action.payload;
    const userId = Object.keys(state.currentUser)[0];
    updatePreference(userId, payload.currentUser);
    state.currentUser[userId] = {
      ...state.currentUser[userId],
      ...payload.currentUser,
    };
    state = {
      ...state,
      currentUser: { ...state.currentUser },
    };
    return state;
  } else if (action.type === UPDATE_PARTICIPANT) {
    let payload = action.payload;
    const newUserId = Object.keys(payload.newUser)[0];

    payload.newUser[newUserId] = {
      ...state.participants[newUserId],
      ...payload.newUser[newUserId],
    };
    let participants = { ...state.participants, ...payload.newUser };
    state = { ...state, participants };
    return state;
  } 
    return state;
  
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
return newUser;
}
export default reducer;
