import {createStore, compose, combineReducers} from 'redux'

import {searchUsersReducer, searchGroupReducer, usersReducer, groupsReducer} from './../reducers/index'

export var configure = () => {
  var reducer = combineReducers({searchUsersText: searchUsersReducer, searchGroupText: searchGroupReducer, users: usersReducer, groups: groupsReducer})

  // Create the Store
  var store = createStore(reducer, compose(window.devToolsExtension
    ? window.devToolsExtension()
    : f => f))

  return store
}
