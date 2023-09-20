import React from 'react'
import Button from './Button.js'

const ButtonWrapper = ({children}) => {
  return (
    <div className='buttonWrapper'>
        {children}
    </div>
  ) 
}

export default ButtonWrapper