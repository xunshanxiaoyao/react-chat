import axios from "axios/index";

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'

const initState = {
	isAuth:false,
	user:'一二三',
	age: 18,
}

export function auth(state=initState,action){
	switch (action.type){
		case LOGIN:
			return {...state, isAuth: true}
		case LOGOUT:
			return {...state, isAuth: false}
		case USER_DATA:
			return {...state, user: action.payload.user, age: action.payload.age}
		default:
			return state
	}
}

export function getUserData(){
	return dispatch => {
		axios.get('/data')
			.then(res=>{
				dispatch(userData(res.data))
			})
	}
}

export function userData(data){
	return {type: USER_DATA, payload: data}
}

export function login(){
	return {type: LOGIN}
}

export function logout(){
	return {type: LOGOUT}
}