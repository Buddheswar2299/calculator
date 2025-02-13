import React from 'react'
import { useDrag } from 'react-dnd'

const DraggableComponent = ({ id, type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'calculator-component',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`p-2 mb-2 rounded border ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } cursor-move`}
    >
      {children}
    </div>
  )
}

export default DraggableComponent;