import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Col, Panel, ListGroup, ListGroupItem, Badge} from 'react-bootstrap'

export default class UsersWidget extends Component {
  render () {
    const {users, groups} = this.props
    return (
      <Col xs={12} md={4}>
        <Panel header='Statistics'>
          <ListGroup style={{
            marginBottom: '0'
          }}>
            <ListGroupItem>Users
              <Badge>{users.length}</Badge>
            </ListGroupItem>
            <ListGroupItem>Groups
              <Badge>{groups.length}</Badge>
            </ListGroupItem>
          </ListGroup>
        </Panel>
      </Col>
    )
  }
}

UsersWidget.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array
}
