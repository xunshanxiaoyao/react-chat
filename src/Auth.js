import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'

import { login, getUserData } from './Auth.redux'

@connect(
	state=>state.auth,
	{ login, getUserData }
)
class Auth extends React.Component{
	// constructor(props){
	// 	super(props)
	// }

	componentDidMount() {
		// axios.get('/data')
		// 	.then(res=>{
		// 		console.log(res)
		// 	})
		this.props.getUserData();
	}

	render(){
		return (
			<div>
				<h2>需登陆</h2>
				{this.props.isAuth ? <Redirect to='/Dashboard' /> : null}
				<button onClick={this.props.login}>登录</button>
			</div>
		)
	}
}

export default Auth