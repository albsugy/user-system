import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col, Table, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeGroup} from './../../actions/index'
import Button from './../../components/Button'

class Groups extends Component {
  render () {
    const {users, groups} = this.props
    let showDeleteButton = true

    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={12}>
            <h1 className='page-title'>Groups</h1>
            <ul className='breadcrumb'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li className='active'>Groups</li>
            </ul>
            <Link to='/groups/add' className='btn btn-success btn-sm'>Add Group</Link>
          </Col>
        </Row>
        {groups.length !== 0

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
                <th>Users</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this
                .props
                .groups
                .map((group, i) => (
                  <tr key={i}>
                    <td>
                      <Link to={`/groups/${group.id}`}>{group.name}</Link>
                    </td>
                    <td>
                      {users.filter((user) => user.groups.find(grp => grp.id === group.id)).length
                      }
                    </td>
                    <td>
                      <Link to={`/groups/${group.id}`}>
                        <Button className={'action-btn edit-btn'} icon={'eye-open'} />
                      </Link>

                      {!showDeleteButton
                        ? showDeleteButton = true
                        : null}
                      {users
                        .map(function (user) {
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
                          onClick={() => this.props.removeGroup(group)} />
                        : null}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          : <Alert bsStyle='info' style={{
            marginTop: '20px'
          }}>
            {'There are no groups created yet.'}
          </Alert>
        }

      </Grid>
    )
  }
}

Groups.propTypes = {
  removeGroup: PropTypes.func,
  groups: PropTypes.array,
  users: PropTypes.array
}

const mapStateToProps = state => ({users: state.users, groups: state.groups})

const mapDispatchToProps = dispatch => ({
  removeGroup: group => dispatch(removeGroup(group))
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
