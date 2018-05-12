import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

import Logo from '../../component/logo/logo'

import { login } from "../../redux/user.redux"

@connect(
	state=>state.user,
	{ login }
)

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			user: '',
			pwd: ''
		}

		this.register = this.register.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleChange(key, val){
		this.setState({
			[key]:val
		})
	}

	handleClick(){
		this.props.login(this.state)
	}

	register(){
		this.props.history.push('/register')
	}

	render(){
		return (
			<div>
				{this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo />
				{this.props.msg ? <p className='init'>{this.props.msg}</p> : null}
				<List>
					<InputItem
						onChange={v=>this.handleChange('user',v)}
					>用户名</InputItem>
					<InputItem
						type='password'
						onChange={v=>this.handleChange('pwd',v)}
					>密码</InputItem>
				</List>
				<WingBlank>
					<WhiteSpace />
					<WhiteSpace />
					<Button onClick={this.handleClick} type='primary'>登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type='primary'>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login