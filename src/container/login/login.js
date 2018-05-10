import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

import Logo from '../../component/logo/logo'

class Login extends React.Component{
	constructor(props){
		super(props)
		this.register = this.register.bind(this)
	}

	register(){
		this.props.history.push('/register')
	}

	render(){
		return (
			<div>
				<Logo />
				<List>
					<InputItem>用户</InputItem>
					<InputItem>密码</InputItem>
				</List>
				<WingBlank>
					<WhiteSpace />
					<WhiteSpace />
					<Button type='primary'>登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type='primary'>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login