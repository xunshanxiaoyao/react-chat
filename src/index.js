import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthRoute from './component/authroute/authroute'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import reducers from './reducer'
import './config'

import './index.css'


const reduxDevtools = window.devToolsExtension?window.devToolsExtension():()=>{}

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	reduxDevtools
))

ReactDom.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<AuthRoute />
					<Switch>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/bossInfo' component={BossInfo}></Route>
						<Route path='/geniusInfo' component={GeniusInfo}></Route>
					</Switch>

				</div>
			</BrowserRouter>
		</Provider>
	),
	document.getElementById('root')
)

