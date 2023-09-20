import React from 'react'
import Display from './Display'
import ButtonWrapper from './ButtonWrapper'
//rfce

function MainWrapper({children}) {
  return (
    <div className='mainWrapper'>{children}</div>
  )
}

export default MainWrapper