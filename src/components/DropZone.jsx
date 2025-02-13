import React from 'react';
import { useDrop } from 'react-dnd';
import useCalculatorStore from '../stores/calculatorStore';

const DropZone = () => {
  const { components, result, addComponent, removeComponent, updateResult, darkMode } = useCalculatorStore();
  const [expression, setExpression] = React.useState('');

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'calculator-item',
    drop: (item) => {
      const id = Math.random().toString(36);
      addComponent({ ...item, id });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleCalculation = (value) => {
    if (value === 'C') {
      setExpression('');
      updateResult('0');
    } else if (value === '=') {
      try {
        // Replace × and ÷ with * and / for evaluation
        const evalExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const calculatedResult = eval(evalExpression);
        updateResult(calculatedResult.toString());
        setExpression(calculatedResult.toString());
      } catch (error) {
        updateResult('Error');
        setExpression('');
      }
    } else {
      const newExpression = expression + value;
      setExpression(newExpression);
      updateResult(newExpression);
    }
  };

  const renderComponent = (component) => {
    switch (component.type) {
      case 'number':
        return (
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
              <button
                key={num}
                onClick={() => handleCalculation(num.toString())}
                className={`p-4 rounded-lg shadow hover:bg-opacity-90 
                  active:scale-95 transition-all text-lg font-medium
                  ${darkMode 
                    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                    : 'bg-white hover:bg-gray-50'
                  }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handleCalculation('.')}
              className={`p-4 rounded-lg shadow hover:bg-opacity-90 
                active:scale-95 transition-all text-lg font-medium
                ${darkMode 
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                  : 'bg-white hover:bg-gray-50'
                }`}
            >
              .
            </button>
            <button
              onClick={() => handleCalculation('=')}
              className="p-4 bg-blue-500 text-white rounded-lg shadow 
                hover:bg-blue-600 active:scale-95 transition-all text-lg font-medium"
            >
              =
            </button>
          </div>
        );
      case 'operator':
        return (
          <div className="flex gap-2 justify-center">
            {['+', '-', '×', '÷'].map((op) => (
              <button
                key={op}
                onClick={() => handleCalculation(op)}
                className={`p-4 rounded-lg shadow hover:bg-opacity-90 
                  active:scale-95 transition-all text-lg font-medium min-w-[48px]
                  ${darkMode 
                    ? 'bg-gray-600 text-gray-100 hover:bg-gray-500' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {op}
              </button>
            ))}
          </div>
        );
      case 'display':
        return (
          <div className={`w-full p-4 rounded-lg shadow-lg mb-4
            ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className={`text-sm mb-1 min-h-[20px] text-right
              ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {expression || '0'}
            </div>
            <div className={`text-right text-3xl font-semibold truncate
              ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
            >
              {result}
            </div>
          </div>
        );
      case 'clear':
        return (
          <button
            onClick={() => handleCalculation('C')}
            className="p-4 bg-red-500 text-white rounded-lg shadow 
              hover:bg-red-600 active:scale-95 transition-all 
              text-lg font-medium w-full max-w-xs mx-auto block"
          >
            Clear
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={drop}
      className={`min-h-[400px] p-6 border-2 rounded-lg transition-colors
        ${isOver 
          ? 'border-blue-500 bg-blue-50' 
          : darkMode 
            ? 'border-gray-700 hover:border-gray-600' 
            : 'border-gray-300 hover:border-blue-300'
        }
        ${darkMode && !isOver ? 'bg-gray-900' : ''}`}
    >
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {components.map((component) => (
          <div key={component.id} className="relative group">
            {renderComponent(component)}
            <button
              onClick={() => removeComponent(component.id)}
              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white 
                rounded-full opacity-0 group-hover:opacity-100 transition-all
                hover:bg-red-600 active:scale-95"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {components.length === 0 && (
        <div className={`text-center mt-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-lg">Drag and drop calculator components here</p>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Start with the display component
          </p>
        </div>
      )}
    </div>
  );
};

export default DropZone;