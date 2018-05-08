import React from 'react'
import { Button, List} from 'antd-mobile'

class App extends React.Component{
  render(){
    const boss = '李云龙'
    return (
      <div>
				<h2>独立团，团长是{boss}</h2>
        <Two bos='yiersan'></Two>
        <Three boss="哈哈哈"></Three>
      </div>
    )
  }
}

class Two extends React.Component{
  constructor(props){
    super(props)
    this.addPlayer = this.addPlayer.bind(this)
    this.state = {
      solders: ['哈','哈哈','哈哈哈']
    }
  }
  addPlayer(){
    this.setState({
      solders: [...this.state.solders,'新兵'+Math.random()]
    })
  }
  render(){
    const Item = List.Item
    return (
      <div>
				<h2>第二个,{this.props.bos}</h2>
        <Button type="primary" onClick={this.addPlayer}>新增</Button>
        <List
					renderHeader={()=>'列表'}
        >
          {this.state.solders.map(v=>{
            return <Item key={v}>{v}</Item>
          })}
        </List>
      </div>
    )
  }
}

function Three(props){
  return <h2>{props.boss}</h2>
}

export default App;