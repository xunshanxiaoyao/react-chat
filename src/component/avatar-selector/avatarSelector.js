
import React from 'react'
import { Grid, InputItem, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'


class BossInfo extends React.Component{
	static propType = {
		selectAvatar: PropTypes.func.isRequired
	}

	constructor(props){
		super(props)
	}

	render(){
		const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
												.split(',').map( v => ({icon:require(`../img/${v}.png`), text: v}))
		return (
			<div>
				<Grid
					data={avatarList}
					columnNum={5}
					onClick={elm => {
						this.props.selectAvatar(elm.text)
					}}
				/>
				<WhiteSpace />
				<InputItem
					placeholder='请选择头像'
					editable={false}
					value={this.props.img}
				>
					选择头像
				</InputItem>
				<WhiteSpace />
			</div>
		)
	}
}

export default BossInfo