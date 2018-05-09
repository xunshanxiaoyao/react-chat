import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import App from "./app"
import { logout } from './Auth.redux'

function Er(){
	return <h2>二</h2>
}

function San(){
	return <h2>三</h2>
}

@connect(
	state=>state.auth,
	{ logout }
)

class Dashboard extends React.Component{
	// constructor(props){
	// 	super(props)
	// }

	render(){
		const match = this.props.match
		const redirectToLogin = <Redirect to='/login'></Redirect>
		const app = (
			<div>
				{ this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
				<ul>
					<li><Link to={`${match.url}`}>一</Link></li>
					<li><Link to={`${match.url}/er`}>二</Link></li>
					<li><Link to={`${match.url}/san`}>三</Link></li>
				</ul>
				<Route path={`${match.url}`} exact component={App}></Route>
				<Route path={`${match.url}/er`} component={Er}></Route>
				<Route path={`${match.url}/san`} component={San}></Route>
			</div>
		)
		return this.props.isAuth ? app : redirectToLogin
	}
}

export default Dashboard