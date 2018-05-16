import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'

import { sendMsg, getMsgList, getRecvMsg, readMsg } from "../../redux/chat.redux"
import { getChatId } from "../../util"


@connect(
	state => state,
	{ sendMsg, getRecvMsg, getMsgList, readMsg }
)
class Chat extends React.Component{

	constructor(props){
		super(props)
		this.state={
			text:'',
			msg:[],
			showEmoji: false
		}
	}

	componentDidMount(){
		if(!this.props.chat.chatmsg.length && !this.props.chat.socketLink){
			this.props.getMsgList()
			this.props.getRecvMsg()
		}
	}

	componentWillUnmount(){
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}

	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
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
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
									.split(' ')
									.filter(v=>v)
									.map(v=>({text:v}))

		const userId = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if(!users[userId]){
			return null
		}
		const chatId = getChatId(userId, this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatId === chatId)
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
				{chatmsgs.map((v)=>{
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
							extra={
								<div>
									<span
										style={{marginRight: 10}}
										onClick={()=>{
											this.setState({showEmoji: !this.state.showEmoji})
											this.fixCarousel()
										}}
									>😃</span>
									<span onClick={()=>{
										this.handleSubmit()
										this.setState({showEmoji: false})
									}}>发送</span>
								</div>
							}
						>
						</InputItem>
					</List>
					{this.state.showEmoji ? (<Grid
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el=>{
							this.setState({
								text: this.state.text+el.text
							})
						}}
					/>): null}
				</div>
			</div>
		)
	}

	require(s) {
		
	}
}

export default Chat