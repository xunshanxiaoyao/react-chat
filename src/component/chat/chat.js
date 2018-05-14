import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'

import { sendMsg, getMsgList, getRecvMsg } from "../../redux/chat.redux"


@connect(
	state => state,
	{ sendMsg, getRecvMsg, getMsgList }
)
class Chat extends React.Component{

	constructor(props){
		super(props)
		this.state={
			text:'',
			msg:[]
		}
	}

	componentDidMount(){
		console.log(this.props.chat.chatmsg.length)
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.getRecvMsg()
		}
	}

	handleSubmit(){
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({from,to,msg})
		this.setState({
			text:''
		})
	}

	render(){
		const userId = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if(!users[userId]){
			return null
		}
		return(
			<div id='chat-page'>
				<NavBar
					className='fixd-header'
					icon={<Icon type="left" />}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
					mode='dark'
				>
					{users[userId].name}
				</NavBar>
				{this.props.chat.chatmsg.map((v)=>{
					const avatar = require(`../img/${users[v.from].avatar}.png`)
					return v.from === userId?(
						<List key={v._id}>
							<Item
								thumb={avatar}
							>{v.content}</Item>
						</List>
					) : (
						<List key={v._id}>
							<Item
								className='chat-me'
								extra={<img src={avatar} alt=""/>}
							>{v.content}</Item>
						</List>
					)
				})}
				<div className='stick-footer'>
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
						>
						</InputItem>
					</List>
				</div>
			</div>
		)
	}

	require(s) {
		
	}
}

export default Chat