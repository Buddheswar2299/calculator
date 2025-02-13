import React from 'react'
import useStore from '../stores/useStores'

const Display = () => {
  const { displayValue } = useStore()
  
  return (
    <div className="p-4 bg-gray-800 text-white text-right text-3xl rounded-t-lg">
      {displayValue}
    </div>
  )
}

export default Display