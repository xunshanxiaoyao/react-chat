import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar,List,InputItem, WingBlank, WhiteSpace, Button, TextareaItem } from 'antd-mobile'

import AvatarSelector from '../../component/avatar-selector/avatarSelector'
import {update} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{update}
)
class GeniusInfo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
			desc: ''
		}
		this.selectAvatar = this.selectAvatar.bind(this)
	}

	handleChange(key, val){
		this.setState({
			[key]:val
		})
	}

	selectAvatar(elm){
		this.setState({
			'avatar': elm
		})
	}

	render(){
		const path = this.props.location.pathname
		const redirectTo = this.props.redirectTo
		return (
			<div>
				{redirectTo && redirectTo !== path ? <Redirect to={this.props.redirectTo} /> : null}
				<NavBar
					mode="dark"
				>牛人完善信息</NavBar>
				<AvatarSelector
					selectAvatar={this.selectAvatar}
					img={this.state.avatar}
				>

				</AvatarSelector>
				<List>
					<InputItem
						onChange={v=>this.handleChange('title',v)}
						placeholder='请输入应聘职位'
					>
						应聘职位
					</InputItem>
					<TextareaItem
						rows={3}
						autoHeight
						title='个人简介'
						onChange={v=>this.handleChange('desc',v)}
						placeholder='请输入个人简介'
					>
					</TextareaItem>
				</List>
				<WhiteSpace />
				<WhiteSpace />
				<WingBlank>
					<Button
						type='primary'
						onClick={()=>{
							this.props.update(this.state)
						}}
					>保存</Button>
				</WingBlank>
			</div>
		)
	}
}

export default GeniusInfo