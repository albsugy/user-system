import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'

// Containers
import Home from './../containers/Home/Home'
import Users from './../containers/Users/Users'
import UserDetails from './../containers/Users/UserDetails'
import AddUser from './../containers/Users/AddUser'
import Groups from './../containers/Groups/Groups'
import GroupDetails from './../containers/Groups/GroupDetails'
import AddGroup from './../containers/Groups/AddGroup'

// Components
import NotFound from './../components/NotFound'

export default class Routes extends Component {
  render () {
    return (
      <Grid>
        <Row className='show-grid'>
          <Col md={12}>
            <div id='content'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/users' component={Users} />
                <Route path='/users/add' component={AddUser} />
                <Route path='/users/:name' component={UserDetails} />
                <Route exact path='/groups' component={Groups} />
                <Route path='/groups/add' component={AddGroup} />
                <Route path='/groups/:id' component={GroupDetails} />
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}
