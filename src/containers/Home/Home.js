import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Grid, Row} from 'react-bootstrap'

// Page Components
import PageTitle from './components/PageTitle'
import UsersWidget from './components/UsersWidget'
import GroupsWidget from './components/GroupsWidget'
import StaticticsWidget from './components/StaticticsWidget'

// Actions
import {removeUser, removeGroup, setSearchUserText, setSearchGroupText} from './../../actions/index'

class Home extends Component {
  constructor (props) {
    super(props)
    this.handleChangSearchUsersInput = this
      .handleChangSearchUsersInput
      .bind(this)
    this.handleChangSearchGroupsInput = this
      .handleChangSearchGroupsInput
      .bind(this)
  }
  handleChangSearchUsersInput (e) {
    var value = e.target.value
    this
      .props
      .setSearchUserText(value)
  }
  handleChangSearchGroupsInput (e) {
    var value = e.target.value
    this
      .props
      .setSearchGroupText(value)
  }
  render () {
    const {groups, users, searchUsersText, searchGroupText} = this.props

    const filteredUsers = users.filter(user => {
      let searchText = searchUsersText.toLowerCase()
      let userName = user
        .name
        .toLowerCase()
      return searchText.length === 0 || userName.indexOf(searchText) > -1
    })

    const filteredGroups = groups.filter(group => {
      let searchText = searchGroupText.toLowerCase()
      let groupName = group
        .name
        .toLowerCase()
      return searchText.length === 0 || groupName.indexOf(searchText) > -1
    })

    return (
      <Grid>
        <PageTitle />

        <Row className='show-grid'>
          <UsersWidget
            filteredUsers={filteredUsers}
            searchUsersText={searchUsersText}
            removeUser={this.props.removeUser}
            handleChangSearchUsersInput={this.handleChangSearchUsersInput} />

          <GroupsWidget
            filteredGroups={filteredGroups}
            users={users}
            searchGroupText={searchGroupText}
            removeGroup={this.props.removeGroup}
            handleChangSearchGroupsInput={this.handleChangSearchGroupsInput} />

          <StaticticsWidget users={users} groups={groups} />

        </Row>
      </Grid>
    )
  }
}

Home.propTypes = {
  removeUser: PropTypes.func,
  removeGroup: PropTypes.func,
  setSearchUserText: PropTypes.func,
  setSearchGroupText: PropTypes.func,
  groups: PropTypes.array,
  users: PropTypes.array,
  searchUsersText: PropTypes.string,
  searchGroupText: PropTypes.string
}

const mapStateToProps = state => ({users: state.users, groups: state.groups, searchUsersText: state.searchUsersText, searchGroupText: state.searchGroupText})

const mapDispatchToProps = dispatch => ({
  removeUser: user => dispatch(removeUser(user)),
  removeGroup: group => dispatch(removeGroup(group)),
  setSearchUserText: text => dispatch(setSearchUserText(text)),
  setSearchGroupText: text => dispatch(setSearchGroupText(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
