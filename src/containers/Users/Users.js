import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col, Table, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {removeUser} from './../../actions/index'
import Button from './../../components/Button'

class Users extends Component {
  render () {
    const {groups, users} = this.props
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={12}>
            <h1 className='page-title'>Users</h1>
            <ul className='breadcrumb'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li className='active'>Users</li>
            </ul>
            <Link to='/users/add' className='btn btn-success btn-sm'>Add User</Link>
          </Col>
        </Row>
        {users.length !== 0
          ? <Table
            striped
            bordered
            condensed
            hover
            className='users-table'
            style={{
              marginTop: '20px'
            }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Groups</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/users/${user.name}`}>{user.name}</Link>
                  </td>
                  <td>
                    <ul>
                      {user
                        .groups
                        .map((group, i) => (
                          <li key={i}>
                            {groups
                              .find(grp => grp.id === group.id)
                              .name}
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <Link to={`/users/${user.name}`}>
                      <Button className={'action-btn edit-btn'} icon={'eye-open'} />
                    </Link>
                    <Button
                      className={'action-btn remove-btn'}
                      icon={'remove'}
                      onClick={() => this.props.removeUser(user)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          : <Alert bsStyle='info' style={{
            marginTop: '20px'
          }}>{'There are no users created yet.'}</Alert>}
      </Grid>
    )
  }
}

Users.propTypes = {
  removeUser: PropTypes.func,
  groups: PropTypes.array,
  users: PropTypes.array
}

const mapStateToProps = state => ({users: state.users, groups: state.groups})

const mapDispatchToProps = dispatch => ({
  removeUser: user => dispatch(removeUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
