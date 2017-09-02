import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

const PageTitle = () => {
  return (
    <Row className='show-grid'>
      <Col xs={12} md={12}>
        <h1 className='page-title'>Home</h1>
        <ul className='breadcrumb'>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
      </Col>
    </Row>
  )
}

export default PageTitle
