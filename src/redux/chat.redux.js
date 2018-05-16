import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')


const MSG_LIST = 'MSG_LIST' // 获取列表
const MSG_RECV = 'MSG_RECV' // 读取信息
const MSG_READ = 'MSG_READ' // 标示已读

const initState = {
	chatmsg: [],
	users:{},
	unread: 0,
	socketLink: false
}

export function chat(state=initState,action){
	switch (action.type){
		case MSG_LIST:
			return {
				...state,
				socketLink: true,
				chatmsg: action.payload.data,
				users: action.payload.users,
				unread: action.payload.data.filter(v=>!v.read&& v.to === action.payload.userId).length
			}
		case MSG_RECV:
			const n =  action.payload.data.to === action.payload.userId ? 1:0
			return {
				...state,
				socketLink: true,
				chatmsg: [...state.chatmsg,action.payload.data],
				unread: state.unread+n
			}
		case MSG_READ:
			const { from ,num } = action.payload.data
			return {
				...state,
				chatmsg: state.chatmsg.map(v=>{
					v.read = from === v.from ? true : v.read
					return v
				}),
				unread: state.unread-num
			}
		default:
			return state
	}
}

function msgList(data,users,userId){
	return { type: MSG_LIST, payload: {data,users,userId}}
}

function recvMsgList(data,userId){
	return { type: MSG_RECV, payload: {data,userId}}
}

function msgRead({from, userId, num}){
	return { type: MSG_READ, payload: {from,userId,num}}
}

export function readMsg(from){
	return (dispatch, getState) => {
		axios.post('/user/readmsg',{from})
			.then(res => {
				const userId = getState().user._id
				if(res.status ===200 && res.data.code === 0){
					dispatch(msgRead({from, userId, num:res.data.num}))
				}
			})
	}
}

export function getMsgList(){
	return (dispatch,getState) => {
		axios.get('/user/getMsgList')
			.then(res => {
				if(res.status === 200 && res.data.code === 0){
					const userId = getState().user._id
					dispatch(msgList(res.data.msgs, res.data.users,userId))
				}
			})
	}
}

export function getRecvMsg(){
	return (dispatch,getState) => {
		socket.on('recvMsg', data => {
			const userId = getState().user._id
			dispatch(recvMsgList(data,userId))
		})
	}
}

export function sendMsg({from,to,msg}){
	return dispatch => {
		socket.emit('sendMsg',{from,to,msg})
	}
}