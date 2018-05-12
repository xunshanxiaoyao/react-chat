import React from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace, List, WingBlank, Button, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'


@connect(
	state=>state.user
)
class User extends React.Component{
	constructor(props){
		super(props)
		this.logoutCookie = this.logoutCookie.bind(this)
	}

	logoutCookie(){
		const alert = Modal.alert
		alert('注销','确定退出么？',[
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确认', onPress: () => {
					browserCookie.erase('userId')
			}}
		])
		// browserCookie.erase('userId')
	}

	render(){
		const props = this.props

		const Item = List.Item
		const Brief = Item.Brief

		return props.avatar ? (
			<div>
				<Result
					img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt=""/>}
					title={props.user}
					message={ props.company ? props.company : null }
				/>
				<WhiteSpace />
				<List
					renderHeader={()=> props.type === 'boss' ? '职位介绍' : '个人简介'}
				>
					<Item
						multipleLine
						onClick={this.logoutCookie}
					>
						{props.title}
						<Brief>{props.desc.split('\n').map(v=><div key={v}>{v}</div>)}</Brief>
					</Item>
				</List>
				<WhiteSpace />
				<WhiteSpace />
				<WingBlank>
					<Button
						type="primary"
						onClick={this.logoutCookie}
					>退出登录</Button>
				</WingBlank>
			</div>
		):null
	}
}

export default User