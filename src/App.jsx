import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Calculator, Undo2, Redo2 } from 'lucide-react'
import Toolbar from './components/Toolbar'
import DropZone from './components/DropZone'
import useCalculatorStore from './stores/calculatorStore'

const App = () => {
  const { undo, redo, darkMode } = useCalculatorStore()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Calculator Builder</h1>
                <p className="text-blue-100 mt-1">Design your custom calculator with drag and drop</p>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-72 w-full">
              <Toolbar />
            </aside>
            
            <main className="flex-1">
              <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    Builder Canvas
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={undo}
                      className={`px-4 py-2 rounded transition-colors flex items-center gap-2
                        ${darkMode 
                          ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                          : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                      <Undo2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Undo</span>
                    </button>
                    <button
                      onClick={redo}
                      className={`px-4 py-2 rounded transition-colors flex items-center gap-2
                        ${darkMode 
                          ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                          : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                      <Redo2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Redo</span>
                    </button>
                  </div>
                </div>
                <DropZone />
              </div>
            </main>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default App;