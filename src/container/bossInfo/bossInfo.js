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
class BossInfo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
			company: '',
			money: '',
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
				>BOSS完善信息</NavBar>
				<AvatarSelector
					selectAvatar={this.selectAvatar}
					img={this.state.avatar}
				>

				</AvatarSelector>
				<List>
					<InputItem
						onChange={v=>this.handleChange('title',v)}
						placeholder='请输入招聘职位'
					>
						招聘职位
					</InputItem>
					<InputItem
						onChange={v=>this.handleChange('company',v)}
						placeholder='请输入公司名称'
					>
						公司名称
					</InputItem>
					<InputItem
						onChange={v=>this.handleChange('money',v)}
						placeholder='请输入职位薪资'
					>
						职位薪资
					</InputItem>
					<TextareaItem
						rows={3}
						autoHeight
						title='职位要求'
						onChange={v=>this.handleChange('desc',v)}
						placeholder='请输入职位要求'
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

export default BossInfo