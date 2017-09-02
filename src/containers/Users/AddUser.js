import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Alert,
  Checkbox,
  HelpBlock
} from 'react-bootstrap'

import {addUser} from './../../actions/index'
import Button from './../../components/Button'

class AddUser extends Component {
  constructor () {
    super()
    this.state = {
      userName: '',
      userGroups: [],
      errorMsg: ''
    }
    this.addGroupToNewUser = this
      .addGroupToNewUser
      .bind(this)
    this.removeGroupFromNewUser = this
      .removeGroupFromNewUser
      .bind(this)
    this.handleChangeUserInput = this
      .handleChangeUserInput
      .bind(this)
    this.handleGroupChange = this
      .handleGroupChange
      .bind(this)
    this.isGroupAssigned = this
      .isGroupAssigned
      .bind(this)
    this.cleanNewUser = this
      .cleanNewUser
      .bind(this)
  }
  addGroupToNewUser (group = '') {
    this.setState(state => ({
      ...state,
      userGroups: [
        ...state.userGroups,
        group
      ]
    }))
  }
  removeGroupFromNewUser (group = '') {
    const {userGroups} = this.state
    const id = userGroups.indexOf(group)

    if (id !== -1) {
      this.setState(state => ({
        ...state,
        userGroups: [
          ...userGroups.slice(0, id),
          ...userGroups.slice(id + 1)
        ]
      }))
    }
  }
  handleChangeUserInput (e) {
    const {value} = e.target
    this.setState(state => ({
      ...state,
      userName: value
    }))
  }
  handleGroupChange (e, group) {
    const {checked} = e.target
    if (checked) {
      this.addGroupToNewUser(group)
    } else {
      this.removeGroupFromNewUser(group)
    }
  }
  isGroupAssigned (group) {
    const {userGroups} = this.state
    return userGroups.indexOf(group) !== -1
  }
  cleanNewUser () {
    this.setState({userName: '', userGroups: []})
  }
  addUser (userName, groups) {
    if (userName !== '' && groups.length > 0) {
      this
        .props
        .addUser(userName, groups)
      this.cleanNewUser()
      this
        .props
        .history
        .push('/users')
    } else if (userName !== '' && groups.length < 1) {
      this.setState({errorMsg: 'A user cannot exist without having at least one group.'})
      return false
    } else if (userName === '' && groups.length > 0) {
      this.setState({errorMsg: 'User name can not be empty.'})
      return false
    } else {
      this.setState({errorMsg: 'Enter user name, and select one group at least.'})
      return false
    }
  }
  getValidationState () {
    const length = this.state.userName.length
    if (length > 3) {
      return 'success'
    } else if (length > 0) {
      return 'error'
    }
  }
  render () {
    const {userName, userGroups, errorMsg} = this.state
    const {groups} = this.props

    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={12}>
            <h1 className='page-title'>Add New User</h1>
            <ul className='breadcrumb'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li className='active'>Add User</li>
            </ul>
            {errorMsg !== ''
              ? <Alert bsStyle='danger'>{errorMsg}</Alert>
              : ''}
          </Col>

          <Col md={4} xs={12} mdOffset={4}>

            <FormGroup validationState={this.getValidationState()}>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type='text'
                value={userName}
                placeholder='Enter name'
                onChange={this.handleChangeUserInput} />
              <FormControl.Feedback />
              <HelpBlock>User name sould be more than 3 characters.</HelpBlock>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Groups</ControlLabel>
              {groups.length
                ? groups.map((group, i) => (
                  <Checkbox
                    key={i}
                    onChange={e => this.handleGroupChange(e, group)}
                    checked={this.isGroupAssigned(group)}>
                    {group.name}
                  </Checkbox>
                ))
                : <Alert bsStyle='info'>There are no groups to assign,
                  <Link to='/groups/add'>Create groups</Link>
                  first.</Alert>
              }
            </FormGroup>
            <hr />
            <Button
              className='btn-primary btn-sm'
              label={'Add User'}
              onClick={() => this.addUser(userName, userGroups)} />
          </Col>
        </Row>
      </Grid>

    )
  }
}

AddUser.propTypes = {
  groups: PropTypes.array,
  addUser: PropTypes.func,
  history: PropTypes.object
}

const mapStateToProps = state => ({users: state.users, groups: state.groups})

const mapDispatchToProps = dispatch => ({
  addUser: (userName, groups) => dispatch(addUser(userName, groups))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)
