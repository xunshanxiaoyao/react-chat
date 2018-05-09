import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from "./index.redux"

const mapStatetoProps = (state) => {
	return { num:state.counter }
}
const actionCreators = { addGun, removeGun, addGunAsync }

@connect(
	mapStatetoProps, actionCreators
)

class App extends React.Component {
	// constructor(props){
	// 	super(props)
	// }

  render() {
	  return (
			<div>
				<h2>现在是{this.props.num}</h2>
				<button onClick={this.props.addGun}>+</button>
				<button onClick={this.props.addGunAsync}>== +</button>
				<button onClick={this.props.removeGun}>-</button>
			</div>
	  )
  }
}

export default App