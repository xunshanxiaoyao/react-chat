import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace} from 'antd-mobile'


class CardUserList extends React.Component{
	static propTypes = {
		userList: PropTypes.array.isRequired
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
							{v.type === 'boss' ? <div>公司:{v.company}</div>:null}
							{v.type === 'boss' ? <div>薪资:{v.money}</div>:null}
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

export default CardUserList