import React from 'react'
import PropTypes from 'prop-types'
import {Glyphicon} from 'react-bootstrap'

const Button = props => {
  const {onClick, className, style, label, icon} = props

  return (
    <button className={className} style={style} onClick={onClick}>
      {icon
        ? <Glyphicon glyph={icon} />
        : null}
      {label}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  icon: PropTypes.string
}

export default Button
