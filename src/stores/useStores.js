import { create } from 'zustand'

const useStore = create((set, get) => ({
  components: [],
  displayValue: '0',
  currentValue: '0',
  previousValue: null,
  operation: null,
  
  setDisplayValue: (value) => set({ displayValue: value }),
  
  addComponent: (component) => set((state) => ({ 
    components: [...state.components, component] 
  })),
  
  removeComponent: (id) => set((state) => ({
    components: state.components.filter(comp => comp.id !== id)
  })),
  
  updateComponentOrder: (components) => set({ components }),
  
  handleNumber: (number) => {
    const { displayValue, currentValue } = get()
    const newValue = currentValue === '0' ? String(number) : currentValue + number
    set({ 
      currentValue: newValue,
      displayValue: newValue 
    })
  },
  
  handleOperation: (op) => {
    const { currentValue, previousValue, operation } = get()
    
    if (previousValue === null) {
      set({ 
        previousValue: currentValue,
        operation: op,
        currentValue: '0'
      })
    } else {
      const result = calculateResult(previousValue, currentValue, operation)
      set({
        previousValue: result,
        operation: op,
        currentValue: '0',
        displayValue: result
      })
    }
  },
  
  calculateResult: () => {
    const { previousValue, currentValue, operation } = get()
    if (!previousValue || !operation) return
    
    const result = calculateResult(previousValue, currentValue, operation)
    set({
      displayValue: result,
      currentValue: result,
      previousValue: null,
      operation: null
    })
  },
  
  clear: () => set({
    displayValue: '0',
    currentValue: '0',
    previousValue: null,
    operation: null
  })
}))

const calculateResult = (prev, current, operation) => {
  const a = parseFloat(prev)
  const b = parseFloat(current)
  
  switch (operation) {
    case '+': return String(a + b)
    case '-': return String(a - b)
    case '*': return String(a * b)
    case '/': return b !== 0 ? String(a / b) : 'Error'
    default: return current
  }
}

export default useStore
