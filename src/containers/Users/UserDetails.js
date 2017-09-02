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
  Panel,
  Modal,
  Button
} from 'react-bootstrap'

import {editUser} from './../../actions/index'

class UserDetails extends Component {
  constructor (props) {
    super(props)
    var {user} = this.props
    this.state = {
      user: user,
      errorMsg: '',
      showModal: false
    }
    this.closeEditModal = this
      .closeEditModal
      .bind(this)
    this.openEditModal = this
      .openEditModal
      .bind(this)
    this.getUser = this
      .getUser
      .bind(this)
    this.handleChangeUserInput = this
      .handleChangeUserInput
      .bind(this)
    this.isGroupAssigned = this
      .isGroupAssigned
      .bind(this)
    this.doesUserHaveGroup = this
      .doesUserHaveGroup
      .bind(this)
    this.handleGroupChange = this
      .handleGroupChange
      .bind(this)
    this.removeGroupFromUser = this
      .removeGroupFromUser
      .bind(this)
    this.addGroupToUser = this
      .addGroupToUser
      .bind(this)
    this.editUser = this
      .editUser
      .bind(this)
  }
  getUser (name) {
    const {users} = this.props
    return users.filter(user => user.name === name)
  }

  handleChangeUserInput (e) {
    const {value} = e.target
    this.setState(state => ({
      ...state,
      user: {
        ...state.user,
        name: value
      }
    }))
  }

  isGroupAssigned (group) {
    const {groups} = this.state.user
    return groups.indexOf(group) !== -1
  }

  doesUserHaveGroup (group) {
    const {groups} = this.state.user
    return !!groups
      .filter(g => g.id === group.id)
      .length
  }

  handleGroupChange (e, group) {
    const {checked} = e.target
    if (checked) {
      this.addGroupToUser(group)
    } else {
      this.removeGroupFromUser(group)
    }
  }

  removeGroupFromUser (group = '') {
    const {groups} = this.state.user
    const id = groups.indexOf(groups.find(grp => grp.id === group.id))

    if (id !== -1) {
      this.setState(state => ({
        ...state,
        user: {
          ...state.user,
          groups: [
            ...groups.slice(0, id),
            ...groups.slice(id + 1)
          ]
        }
      }))
    }
  }

  addGroupToUser (group = '') {
    this.setState(state => ({
      ...state,
      user: {
        ...state.user,
        groups: [
          ...state.user.groups,
          group
        ]
      }
    }))
  }

  editUser () {
    if (this.state.user.name !== '' && this.state.user.groups.length > 0) {
      const id = this
        .props
        .users
        .indexOf(this.props.user)
      this
        .props
        .editUser(id, this.state.user)
      this
        .props
        .history
        .push('/users')
    } else if (this.state.user.name !== '' && this.state.user.groups.length < 1) {
      this.setState({errorMsg: 'A user cannot exist without having at least one group.'})
      return false
    }
  }

  closeEditModal () {
    this.setState({showModal: false})
  }

  openEditModal () {
    this.setState({showModal: true})
  }

  render () {
    const {user, groups} = this.props
    const {errorMsg} = this.state

    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={12}>
            <h1 className='page-title'>User: {user.name}</h1>
            <ul className='breadcrumb'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li className='active'>{user.name}</li>
            </ul>
          </Col>
          <Col md={6} mdOffset={3} xs={12}>
            <Panel header={`${user.name} Profile`}>
              <Row>
                <Col md={6}>
                  <label>Name: {user.name}</label>
                  <div />
                  <Button bsStyle='info' bsSize='small' onClick={this.openEditModal}>
                    Edit
                  </Button>
                </Col>
                <Col md={6}>
                  <label>Groups</label>
                  <ul className='ul-bulleted'>
                    {user.groups && user
                      .groups
                      .map((group, i) => (
                        <li key={i}>
                          <Link
                            to={`/groups/${groups
                              .find(grp => grp.id === group.id)
                              .id}`}>
                            {groups
                              .find(grp => grp.id === group.id)
                              .name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </Col>
              </Row>

              <Modal show={this.state.showModal} onHide={this.closeEditModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit: {user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                      type='text'
                      value={this.state.user.name}
                      placeholder='Enter new name'
                      onChange={this.handleChangeUserInput} />
                    <FormControl.Feedback />
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>Groups</ControlLabel>
                    {groups.length > 0
                      ? groups.map((group, i) => (
                        <Checkbox
                          key={i}
                          onChange={e => this.handleGroupChange(e, group)}
                          defaultChecked={this.doesUserHaveGroup(group)}>
                          {group.name}
                        </Checkbox>
                      ))
                      : <Alert bsStyle='info'>{'There are no groups to assign, Create groups first.'}</Alert>}
                  </FormGroup>

                  {errorMsg !== ''
                    ? <Alert bsStyle='danger'>{errorMsg}</Alert>
                    : ''}
                </Modal.Body>
                <Modal.Footer>
                  <Button bsStyle='success' onClick={this.editUser}>Save</Button>
                </Modal.Footer>
              </Modal>

            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

UserDetails.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array,
  editUser: PropTypes.func,
  history: PropTypes.object,
  user: PropTypes.object
}

const getUser = (name, users) => {
  return users.filter(user => user.name === name)
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    user: getUser(ownProps.match.params.name, state.users)[0],
    groups: state.groups
  }
}

const mapDispatchToProps = dispatch => ({
  editUser: (id, userInfo) => dispatch(editUser(id, userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
