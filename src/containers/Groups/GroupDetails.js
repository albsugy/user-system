import React, { Component } from 'react'
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
  Panel,
  Modal,
  Button
} from 'react-bootstrap'

import {editGroup} from './../../actions/index'

class GroupDetails extends Component {
  constructor () {
    super()
    this.state = {
      GroupInfo: {
        id: '',
        name: ''
      },
      errorMsg: ''
    }
    this.closeEditModal = this.closeEditModal.bind(this)
    this.openEditModal = this.openEditModal.bind(this)
    this.cleanGroupInfo = this.cleanGroupInfo.bind(this)
    this.getGroup = this.getGroup.bind(this)
    this.handleChangeGroupInput = this.handleChangeGroupInput.bind(this)
  }

  getGroup (id) {
    const {groups} = this.props
    return groups.find(group => group.id === +id)
  }

  handleChangeGroupInput (e) {
    const {value} = e.target
    this.setState(state => ({
      ...state,
      GroupInfo: {
        ...state.GroupInfo,
        name: value
      }
    }))
  }

  cleanGroupInfo () {
    this.setState({
      GroupInfo: { name: '' }
    })
  }

  editGroup (GroupInfo) {
    const groupId = this.props.match.params.id
    console.log()
    const group = this.getGroup(groupId)
    const {groups} = this.props
    const id = groups.indexOf(group)

    if (GroupInfo.name) {
      this.setState(state => ({
        ...state,
        GroupInfo: {
          ...state.GroupInfo,
          id: +groupId
        }
      }), () => {
        this.props.editGroup(id, this.state.GroupInfo)
        this.cleanGroupInfo()
        this.props.history.push('/groups')
      })
    } else if (GroupInfo.name === '') {
      this.setState({ errorMsg: 'Group name can not be empty.' })
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
    const group = this.getGroup(this.props.match.params.id)
    const {GroupInfo, errorMsg} = this.state
    const {users} = this.props
    const groupUsers = users.filter((user) => user.groups.find(grp => grp.id === group.id))
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={12}>
            <h1 className='page-title'>Group: {group.name}</h1>
            <ul className='breadcrumb'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/groups'>groups</Link>
              </li>
              <li className='active'>{group.name}</li>
            </ul>
          </Col>
          <Col md={6} mdOffset={3} xs={12}>
            <Panel header={`${group.name} Group`}>
              <Row>
                <Col md={6}>
                  <label>Group: {group.name}</label>
                  <div />
                  <Button bsStyle='info' bsSize='small' onClick={this.openEditModal}>
                            Edit
                  </Button>
                </Col>
                {

                  <Col md={6}>
                    <label>Users</label>
                    <ul className='ul-bulleted'>
                      {
                        groupUsers.map(user => {
                          return (
                            <li key={user.id}>
                              <Link to={`/users/${user.name}`}>{user.name}</Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </Col>

                }
              </Row>

              <Modal show={this.state.showModal} onHide={this.closeEditModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit: {group.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <FormGroup>
                    <ControlLabel>Group Name</ControlLabel>
                    <FormControl
                      type='text'
                      value={GroupInfo.name}
                      placeholder='Enter new group name'
                      onChange={this.handleChangeGroupInput} />
                    <FormControl.Feedback />
                  </FormGroup>
                  {errorMsg !== ''
                    ? <Alert bsStyle='danger'>{errorMsg}</Alert>
                    : ''}

                </Modal.Body>
                <Modal.Footer>
                  <Button bsStyle='success' onClick={() => this.editGroup(GroupInfo)}>Save</Button>
                </Modal.Footer>
              </Modal>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

GroupDetails.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array,
  editGroup: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object
}

const mapStateToProps = state => ({
  groups: state.groups,
  users: state.users
})
const mapDispatchToProps = dispatch => ({
  editGroup: (id, GroupInfo) => dispatch(editGroup(id, GroupInfo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupDetails)
