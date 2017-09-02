import React from 'react'
import {Grid, Row} from 'react-bootstrap'

const Footer = () => {
  return (
    <Grid>
      <Row>
        <p className='copyrights'>
          UMS by Medhat Albsugy
          <span className='pull-right'>
            <a href='https://twitter.com/albsugy' rel='noopener noreferrer' target='_blank'>@albsugy</a>
          </span>
        </p>
      </Row>
    </Grid>
  )
}
export default Footer
