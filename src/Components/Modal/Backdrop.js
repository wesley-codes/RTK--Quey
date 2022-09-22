import React from 'react'
import "./Backdrop.css"
const Overlay = ({children}) => {
  return (
    <div className='modal'>
        {children}
    </div>
  )
}







export const Backdrop = ({children ,onClose}) => {
    return (
      <div className='backdrop_container' onClick={onClose}>
          {children}
      </div>
    )
  }

export default Overlay
