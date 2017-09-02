import { setSearchUserText, addUser } from './../../actions'

describe('Actions', () => {
  it('Should generate search users text action', () => {
    var action = {
      type: 'SET_SEARCH_USER_TEXT',
      text: 'Some search text'
    }
    var res = setSearchUserText(action.text)

    expect(res).toEqual(action)
  })

  it('Should generate add user action', () => {
    var action = {
      type: 'ADD_USER',
      userName: 'Medhat',
      groups: [{id: 1}, {id: 3}]
    }
    var res = addUser(action.userName, action.groups)

    expect(res).toEqual(action)
  })
})
