import React from 'react'
import { useDrag } from 'react-dnd'
import { 
  Calculator, 
  Keyboard,
  Plus,
  Trash2,
  Sun,
  Moon
} from 'lucide-react'
import useCalculatorStore from '../stores/calculatorStore'

const CalculatorItem = ({ type, label, icon: Icon, description }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'calculator-item',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const darkMode = useCalculatorStore((state) => state.darkMode)

  return (
    <div
      ref={drag}
      className={`p-4 mb-3 rounded-lg shadow-sm cursor-move 
        hover:shadow-md hover:scale-102 transition-all
        ${darkMode 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-white hover:bg-gray-50'
        }
        ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
        <div>
          <h3 className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            {label}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

const Toolbar = () => {
  const darkMode = useCalculatorStore((state) => state.darkMode)
  const toggleDarkMode = useCalculatorStore((state) => state.toggleDarkMode)

  const items = [
    { 
      type: 'display', 
      label: 'Display', 
      icon: Calculator,
      description: 'Shows calculation results'
    },
    { 
      type: 'number', 
      label: 'Number Pad', 
      icon: Keyboard,
      description: 'Input numbers 0-9'
    },
    { 
      type: 'operator', 
      label: 'Operators', 
      icon: Plus,
      description: 'Basic math operators'
    },
    { 
      type: 'clear', 
      label: 'Clear', 
      icon: Trash2,
      description: 'Reset calculator'
    },
  ]

  return (
    <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Components
        </h2>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors
            ${darkMode 
              ? 'hover:bg-gray-700 text-yellow-400' 
              : 'hover:bg-gray-100 text-gray-600'
            }`}
          title="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <CalculatorItem key={item.type} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Toolbar