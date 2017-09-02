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
  HelpBlock
} from 'react-bootstrap'

import {addGroup} from './../../actions/index'
import Button from './../../components/Button'

class AddGroup extends Component {
  constructor () {
    super()
    this.state = {
      newGroup: {
        id: '',
        name: ''
      },
      errorMsg: ''
    }
    this.handleChangeGroupInput = this
      .handleChangeGroupInput
      .bind(this)
    this.cleanNewGroup = this
      .cleanNewGroup
      .bind(this)
    this.addGroup = this
      .addGroup
      .bind(this)
  }

  handleChangeGroupInput (e) {
    const {value} = e.target
    this.setState(state => ({
      ...state,
      newGroup: {
        ...state.newGroup,
        name: value
      }
    }))
  }

  cleanNewGroup () {
    this.setState({
      newGroup: {
        id: '',
        name: ''
      }
    })
  }

  addGroup (group) {
    if (group.name && group.name.length > 3) {
      this.setState(state => ({
        ...state,
        newGroup: {
          ...state.newGroup,
          name: group.name
        }
      }), () => {
        this
          .props
          .addGroup(this.state.newGroup)
        this.cleanNewGroup()
        this
          .props
          .history
          .push('/groups')
      })
    } else if (group.name.length < 4) {
      this.setState({errorMsg: ''})
      return false
    } else if (group.name === '') {
      this.setState({errorMsg: 'Group name can not be empty.'})
      return false
    }
  }
  getValidationState () {
    const length = this.state.newGroup.name.length
    if (length > 3) { return 'success' } else if (length > 0) { return 'error' }
  }

  render () {
    const {newGroup, errorMsg} = this.state

    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={12}>
            <h1 className='page-title'>Add New Group</h1>
            <ul className='breadcrumb'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/groups'>Groups</Link>
              </li>
              <li className='active'>Add Group</li>
            </ul>
            {errorMsg !== ''
              ? <Alert bsStyle='danger'>{errorMsg}</Alert>
              : ''}
          </Col>
          <Col md={4} xs={12} mdOffset={4}>
            <FormGroup validationState={this.getValidationState()}>
              <ControlLabel>Group Name</ControlLabel>
              <FormControl
                type='text'
                value={newGroup.name}
                placeholder='Enter group name'
                onChange={this.handleChangeGroupInput} />
              <FormControl.Feedback />
              <HelpBlock>Group name sould be more than 3 characters.</HelpBlock>
            </FormGroup>
            <hr />
            <Button
              className='btn-primary btn-sm'
              label={'Add Group'}
              onClick={() => this.addGroup(newGroup)} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

AddGroup.propTypes = {
  addGroup: PropTypes.func,
  history: PropTypes.object
}

const mapStateToProps = state => ({groups: state.groups})

const mapDispatchToProps = dispatch => ({
  addGroup: group => dispatch(addGroup(group))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup)
