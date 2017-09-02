// setSearchUserText Action
export const setSearchUserText = (text) => {
  return {
    type: 'SET_SEARCH_USER_TEXT',
    text
  }
}

// setSearchGroupText Action
export const setSearchGroupText = (text) => {
  return {
    type: 'SET_SEARCH_GROUP_TEXT',
    text
  }
}

// Add User Action
export const addUser = (userName, groups) => {
  return {
    type: 'ADD_USER',
    userName,
    groups
  }
}

// Remove User Action
export const removeUser = (id) => {
  return {
    type: 'REMOVE_USER',
    id
  }
}

// Edit User Action
export const editUser = (id, userInfo) => ({
  type: 'EDIT_USER',
  id,
  userInfo
})

// get initial users and add them
export const addUsers = (users) => ({
  type: 'ADD_USERS',
  users
})

// Add Group Action
export const addGroup = (group) => {
  return {
    type: 'ADD_GROUP',
    group
  }
}

// Remove Group Action
export const removeGroup = group => ({
  type: 'REMOVE_GROUP',
  group
})

// Edit Group Action
export const editGroup = (id, GroupInfo) => ({
  type: 'EDIT_GROUP',
  id,
  GroupInfo
})

// get initial groups and add them
export const addGroups = (groups) => ({
  type: 'ADD_GROUPS',
  groups
})
