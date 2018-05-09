import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component{

	componentDidMount(){
		// 获取用户信息
		axios.get('/user/info')
			.then(res=>{
				if(res.status === 200){
					if(res.data.code === 0){
						// 有登录信息
					} else {
						this.props.history.push('/login')
					}
				}
			})
		// 是否需要登录
		// 现在的url login不需要跳转
		// 用户的type
		// 用户是否完善信息 选择头像  个人简介
	}

	render(){
		return null
	}
}

export default AuthRoute