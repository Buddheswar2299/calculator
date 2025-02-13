import React from 'react'
import useStore from '../stores/useStores'

const NumPad = () => {
  const { handleNumber, handleOperation, calculateResult, clear } = useStore()
  
  const buttons = [
    { value: '7' }, { value: '8' }, { value: '9' }, { value: '/', op: true },
    { value: '4' }, { value: '5' }, { value: '6' }, { value: '*', op: true },
    { value: '1' }, { value: '2' }, { value: '3' }, { value: '-', op: true },
    { value: '0' }, { value: 'C', clear: true }, { value: '=', equals: true }, { value: '+', op: true }
  ]
  
  const handleClick = (button) => {
    if (button.op) {
      handleOperation(button.value)
    } else if (button.equals) {
      calculateResult()
    } else if (button.clear) {
      clear()
    } else {
      handleNumber(button.value)
    }
  }
  
  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {buttons.map((button) => (
        <button
          key={button.value}
          onClick={() => handleClick(button)}
          className={`p-4 text-xl rounded-lg ${
            button.op || button.equals
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : button.clear
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {button.value}
        </button>
      ))}
    </div>
  )
}

export default NumPad