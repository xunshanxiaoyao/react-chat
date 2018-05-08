import React from 'react'

class App extends React.Component {
	constructor(props){
		super(props)
	}

  render() {
		const store = this.props.store
		const num = store.getState()
		const addGun = this.props.addGun
		const removeGun = this.props.removeGun
	  return (
			<div>
				<h2>现在是{num}</h2>
				<button onClick={()=>store.dispatch(addGun())}>+</button>
				<button onClick={()=>store.dispatch(removeGun())}>-</button>
			</div>
	  )
  }
}

export default App