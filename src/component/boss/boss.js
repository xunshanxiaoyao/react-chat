import React from 'react'
import { connect } from 'react-redux'
import { Card, WingBlank, WhiteSpace} from 'antd-mobile'

import { getUserList } from "../../redux/chatuser.redux"


@connect(
	state=> state.chatuser,
	{getUserList}
)
class Boss extends React.Component{

	constructor(props){
		super(props)
		this.state={
			data:[]
		}
	}

	componentDidMount(){
		this.props.getUserList('genius')
	}

	render(){
		const Header = Card.Header
		const Body = Card.Body
		return (
			<div>
				<WingBlank>
					<WhiteSpace />
					{this.props.userList.map(v=>(
						v.avatar?(<Card key={v._id}>
							<Header
								title={v.user}
								thumb={require(`../img/${v.avatar}.png`)}
								extra={<span>{v.title}</span>}
							/>
							<Body>
								{v.desc.split('\n').map(s=>(
									<div key={v._id}>{s}</div>
								))}
							</Body>
						</Card>):null
					))}
				</WingBlank>
			</div>
		)
	}
}

export default Boss