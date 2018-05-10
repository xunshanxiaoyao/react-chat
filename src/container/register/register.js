import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'

import Logo from '../../component/logo/logo'

import { register } from "../../redux/user.redux"

@connect(
	state=>state.user,
	{ register }
)

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state= {
			user: '',
			pwd: '',
			repeatPwd: '',
			type: 'genius'  // boss
		}

		this.handleRegister = this.handleRegister.bind(this)
	}

	handleChange(key, val){
		this.setState({
			[key]:val
		})
	}

	handleRegister(){
		this.props.register(this.state)
	}

	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
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
					<InputItem
						type='password'
						onChange={v=>this.handleChange('repeatPwd',v)}
					>确认密码</InputItem>
				</List>
				<WhiteSpace />
				<RadioItem
					checked={this.state.type === 'genius'}
					onClick={()=>this.handleChange('type','genius')}
				>
					牛人
				</RadioItem>
				<RadioItem
					checked={this.state.type === 'boss'}
					onClick={()=>this.handleChange('type','boss')}
				>
					Boss
				</RadioItem>
				<WhiteSpace />
				<WhiteSpace />
				<WingBlank>
					<Button onClick={this.handleRegister} type='primary'>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Register