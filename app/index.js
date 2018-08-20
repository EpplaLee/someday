import React from 'react'
import { AppRegistry } from 'react-native'

import dva from './utils/dva'
import Router, { routerMiddleware, routerReducer } from './router'
import todo from './models/todo'
import month from './models/month'
import daily from './models/daily'

const app = dva({
  initialState: {},
  models: [todo, month, daily],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('someday', () => App)
