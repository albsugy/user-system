import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

export default class NotFound extends Component {
  render () {
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={12}>
            <h1 className='page-title'>Page not found!</h1>
          </Col>
        </Row>
      </Grid>
    )
  }
}
