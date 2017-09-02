import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import {configure} from './store/configureStore'
import {addUsers, addGroups} from './actions'
import {setUsersRequest, getUsersRequest} from './api/UsersAPI'
import {setGroupsRequest, getGroupsRequest} from './api/GroupsAPI'
import {defaultUsers, defaultGroups} from './api/data'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

// Store
var store = configure()

// Initialize
let initailUsers = getUsersRequest()
store.dispatch(addUsers(initailUsers))

let initailGroups = getGroupsRequest()
store.dispatch(addGroups(initailGroups))

// Set Default Values
if (window.localStorage.getItem('groups') === null && window.localStorage.getItem('users') === null) {
  store.dispatch(addUsers(defaultUsers))
  store.dispatch(addGroups(defaultGroups))
}

// var unsubscribe =
store.subscribe(() => {
  const state = store.getState()
  // console.log(state) // log state
  setGroupsRequest(state.groups)
  setUsersRequest(state.users)
})
// unsubscribe(); 

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))
registerServiceWorker()
