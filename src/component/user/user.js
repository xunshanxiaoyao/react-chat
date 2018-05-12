import React from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace, List, WingBlank, Button } from 'antd-mobile'


@connect(
	state=>state.user
)
class User extends React.Component{
	constructor(props){
		super(props)
		this.logoutCookie = this.logoutCookie.bind(this)
	}

	logoutCookie(){
		alert('123')
		console.log('logout')
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