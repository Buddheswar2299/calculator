import React from 'react'
import Display from './Display'
import NumPad from './NumPad'

const Calculator = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
      <Display />
      <NumPad />
    </div>
  )
}

export default Calculator