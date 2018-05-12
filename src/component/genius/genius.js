import React from 'react'
import { connect } from 'react-redux'

import { getUserList } from "../../redux/chatuser.redux"

import CardUserList from '../cardUserList/cardUserList'


@connect(
	state=> state.chatuser,
	{getUserList}
)
class Genius extends React.Component{

	componentDidMount(){
		this.props.getUserList('boss')
	}

	render(){
		return <CardUserList userList={this.props.userList}></CardUserList>
	}
}

export default Genius