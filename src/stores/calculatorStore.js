import { create } from 'zustand'

const useCalculatorStore = create((set) => ({
  components: [],
  result: '0',
  darkMode: false,
  history: [],
  historyIndex: -1,

  addComponent: (component) => 
    set((state) => {
      const newComponents = [...state.components, component]
      return {
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1
      }
    }),

  removeComponent: (id) =>
    set((state) => {
      const newComponents = state.components.filter(c => c.id !== id)
      return {
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1
      }
    }),

  updateResult: (value) => set({ result: value }),
  
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  undo: () => set((state) => ({
    components: state.history[state.historyIndex - 1] || [],
    historyIndex: Math.max(-1, state.historyIndex - 1)
  })),

  redo: () => set((state) => ({
    components: state.history[state.historyIndex + 1] || state.components,
    historyIndex: Math.min(state.history.length - 1, state.historyIndex + 1)
  }))
}))

export default useCalculatorStore 