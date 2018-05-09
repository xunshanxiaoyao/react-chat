import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'

import Logo from '../../component/logo/logo'

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state= {
			type: 'genius'  // boss
		}
	}

	register(){
		this.props.history.push('/register')
	}

	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				<Logo />
				<List>
					<InputItem>用户名</InputItem>
					<InputItem>密码</InputItem>
					<InputItem>确认密码</InputItem>
				</List>
				<WhiteSpace />
				<RadioItem checked={this.state.type === 'genius'}>
					牛人
				</RadioItem>
				<RadioItem checked={this.state.type === 'boss'}>
					Boss
				</RadioItem>
				<WhiteSpace />
				<WhiteSpace />
				<WingBlank>
					<Button onClick={this.register} type='primary'>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Register