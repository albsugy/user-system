import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {
  Col,
  Panel,
  Table,
  ControlLabel,
  FormControl,
  FormGroup
} from 'react-bootstrap'

import Button from './../../../components/Button'

export default class UsersWidget extends Component {
  render () {
    const {searchUsersText, filteredUsers, removeUser, handleChangSearchUsersInput} = this.props
    return (
      <Col xs={12} md={4}>
        <Panel header='Users'>
          <FormGroup>
            <ControlLabel>Search Users</ControlLabel>
            <FormControl
              type='text'
              value={searchUsersText}
              placeholder='Enter user name'
              onChange={handleChangSearchUsersInput} />
            <FormControl.Feedback />
          </FormGroup>
          <Link to='/users' className='btn btn-info btn-sm'>View All</Link>
          <Link to='/users/add' className='btn btn-success btn-sm pull-right'>Add User</Link>
          <Table
            className='users-table'
            striped
            bordered
            condensed
            hover
            style={{
              marginBottom: '0',
              marginTop: '15px'
            }}>
            <thead>
              <tr>
                <th className='name-cell'>Name</th>
                <th>Groups</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && searchUsersText === ''
                ? <tr>
                  <td colSpan='3' className='text-center'>There are no users created yet.</td>
                </tr>
                : filteredUsers.length === 0 && searchUsersText !== ''
                  ? <tr>
                    <td colSpan='3' className='text-center'>No users match your search.</td>
                  </tr>
                  : filteredUsers.map((user, i) => (
                    <tr key={i}>
                      <td className='name-cell'>
                        <Link to={`/users/${user.name}`}>{user.name}</Link>
                      </td>
                      <td>
                        {user.groups.length}
                      </td>
                      <td>
                        <Link to={`/users/${user.name}`}>
                          <Button className={'action-btn edit-btn'} icon={'eye-open'} />
                        </Link>
                        <Button
                          className={'action-btn remove-btn'}
                          icon={'remove'}
                          onClick={() => {
                            removeUser(user)
                          }} />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Panel>
      </Col>
    )
  }
}

UsersWidget.propTypes = {
  filteredUsers: PropTypes.array,
  removeUser: PropTypes.func,
  handleChangSearchUsersInput: PropTypes.func,
  searchUsersText: PropTypes.string
}
