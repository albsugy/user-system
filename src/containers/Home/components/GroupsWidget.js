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
    let showDeleteButton = true
    const {searchGroupText, handleChangSearchGroupsInput, filteredGroups, users, removeGroup} = this.props
    return (
      <Col xs={12} md={4}>
        <Panel header='Groups'>
          <FormGroup>
            <ControlLabel>Search Groups</ControlLabel>
            <FormControl
              type='text'
              value={searchGroupText}
              placeholder='Enter group name'
              onChange={handleChangSearchGroupsInput} />
            <FormControl.Feedback />
          </FormGroup>
          <Link to='/groups' className='btn btn-info btn-sm'>View All</Link>
          <Link to='/groups/add' className='btn btn-success btn-sm pull-right'>Add Group</Link>
          <Table
            className='group-table'
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
                <th className='name-cell'>Group</th>
                <th>Users</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.length === 0 && searchGroupText === ''
                ? <tr>
                  <td colSpan='3' className='text-center'>There are no groups created yet.</td>
                </tr>
                : filteredGroups.length === 0 && searchGroupText !== ''
                  ? <tr>
                    <td colSpan='3' className='text-center'>No groups match your search.</td>
                  </tr>
                  : filteredGroups.map((group) => (
                    <tr key={group.id}>
                      <td className='name-cell'>
                        <Link to={`/groups/${group.id}`}>{group.name}</Link>
                      </td>
                      <td>
                        {users.filter((user) => user.groups.find(grp => grp.id === group.id)).length}
                      </td>
                      <td>
                        <Link to={`/groups/${group.id}`}>
                          <Button className={'action-btn edit-btn'} icon={'eye-open'} />
                        </Link>
                        {!showDeleteButton
                          ? showDeleteButton = true
                          : null}
                        {users.map((user) => {
                          if (user.groups.find(grp => grp.id === group.id)) {
                            showDeleteButton = false
                          }
                          return showDeleteButton
                        })
                        }
                        {showDeleteButton
                          ? <Button
                            className={'action-btn remove-btn'}
                            icon={'remove'}
                            onClick={() => removeGroup(group)} />
                          : null}
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </Table>
        </Panel>
      </Col>
    )
  }
}

UsersWidget.propTypes = {
  filteredGroups: PropTypes.array,
  users: PropTypes.array,
  removeGroup: PropTypes.func,
  handleChangSearchGroupsInput: PropTypes.func,
  searchGroupText: PropTypes.string
}
