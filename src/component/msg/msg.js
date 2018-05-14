import React from 'react'
import { connect } from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
	state=>state
)
class Msg extends React.Component{

	getLast(arr){
		return arr[arr.length-1]
	}

	render(){
		const Item = List.Item
		const Brief = Item.Brief
		const userId = this.props.user._id
		const userInfo = this.props.chat.users

		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatId] = msgGroup[v.chatId] || []
			msgGroup[v.chatId].push(v)
		})



		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			console.log(this.getLast(a) , b)
			return b_last - a_last
		})
		return (
			<div>
				<List>
					{chatList.map(v=>{
						const lastItem = this.getLast(v)
						const targetId = lastItem.from === userId ? lastItem.to : lastItem.from
						const unreadNum = v.filter(v=>!v.read&&v.to === userId).length
						return (<Item
							extra={<Badge text={unreadNum}></Badge>}
							key={lastItem._id}
							thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
							arrow="horizontal"
							onClick={()=>{
								this.props.history.push(`/chat/${targetId}`)
							}}
						>
							{userInfo[targetId].name}
							<Brief>{lastItem.content}</Brief>
						</Item>)
					})}
				</List>
			</div>
		)
	}
}

export default Msg