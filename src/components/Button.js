import React from 'react'
import { bool, func, string } from 'prop-types'

const Button = ({ isDisabled, label, type, handleClick }) => (
  <button
    className="button"
    disabled={isDisabled}
    onClick={(e) => handleClick(e, type)}>
      {label}
  </button>
)

Button.propTypes = {
  isDisabled: bool.isRequired,
  label: string.isRequired,
  type:  string.isRequired,
  handleClick: func.isRequired,
}

export default Button