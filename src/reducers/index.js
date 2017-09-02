// Search User Text Reducer
export const searchUsersReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_USER_TEXT':
      return action.text
    default:
      return state
  }
}

// Search Group Text Reducer
export const searchGroupReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_GROUP_TEXT':
      return action.text
    default:
      return state
  }
}

// Users Reducer
const defaultUsers = []

export const usersReducer = (state = defaultUsers, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.userName,
          groups: [...action.groups]
        }
      ]
    case 'REMOVE_USER': {
      const id = state.indexOf(action.id)
      return [
        ...state.slice(0, id),
        ...state.slice(id + 1)
      ]
    }
    case 'EDIT_USER': {
      return [
        ...state.slice(0, action.id),
        action.userInfo,
        ...state.slice(action.id + 1)
      ]
    }
    case 'ADD_USERS': {
      return [...action.users]
    }
    default:
      return state
  }
}

// Groups Reducer
const defaultGroups = []

export const groupsReducer = (state = defaultGroups, action) => {
  switch (action.type) {
    case 'ADD_GROUP':
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.group.name
        }
      ]
    case 'REMOVE_GROUP': {
      const id = state.indexOf(action.group)

      return [
        ...state.slice(0, id),
        ...state.slice(id + 1)
      ]
    }
    case 'EDIT_GROUP': {
      return [
        ...state.slice(0, action.id),
        action.GroupInfo,
        ...state.slice(action.id + 1)
      ]
    }
    case 'ADD_GROUPS': {
      return [...action.groups]
    }
    default:
      return state
  }
}
