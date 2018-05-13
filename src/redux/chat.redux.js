import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')


const MSG_LIST = 'MSG_LIST' // 获取列表
const MSG_RECV = 'MSG_RECV' // 读取信息
const MSG_READ = 'MSG_READ' // 标示已读

const initState = {
	chatmsg: [],
	unread: 0
}

export function chat(state=initState,action){
	switch (action.type){
		case MSG_LIST:
			return {
				...state,
				chatmsg: action.payload,
				unread: action.payload.filter(v=>!v.read).length
			}
		case MSG_RECV:
			return {
				...state,
				chatmsg: [...state.chatmsg,action.payload],
				unread: state.unread+1
			}
		// case MSG_READ:
		default:
			return state
	}
}

function msgList(data){
	return { type: MSG_LIST, payload: data}
}

function recvMsgList(data){
	return { type: MSG_RECV, payload: data}
}


export function getMsgList(){
	return dispatch => {
		axios.get('/user/getMsgList')
			.then(res => {
				if(res.status === 200 && res.data.code === 0){
					dispatch(msgList(res.data.msgs))
				}
			})
	}
}

export function getRecvMsg(){
	return dispatch => {
		socket.on('recvMsg', data => {
			dispatch(recvMsgList(data))
		})
	}
}

export function sendMsg({from,to,msg}){
	return dispatch => {
		socket.emit('sendMsg',{from,to,msg})
	}
}