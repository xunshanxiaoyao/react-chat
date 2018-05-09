import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Auth from './Auth'
import Dashboard from './Dashboard'
import reducers from './reducer'


const reduxDevtools = window.devToolsExtension?window.devToolsExtension():()=>{}

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	reduxDevtools
))


ReactDom.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path='/login' component={Auth}></Route>
					<Route path='/Dashboard' component={Dashboard}></Route>
				</Switch>
			</BrowserRouter>
		</Provider>
	),
	document.getElementById('root')
)

