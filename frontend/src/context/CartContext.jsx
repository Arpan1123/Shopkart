import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const initialState = {
  items: JSON.parse(localStorage.getItem('freshmartCart')) || [],
}

function cartReducer(state, action) {
  let newItems
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id)
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }
      return { ...state, items: newItems }
    }
    case 'REMOVE_FROM_CART':
      newItems = state.items.filter(item => item.id !== action.payload)
      return { ...state, items: newItems }
    case 'UPDATE_QUANTITY': {
      const { id, change } = action.payload
      newItems = state.items
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter(item => item.quantity > 0)
      return { ...state, items: newItems }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('freshmartCart', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  const updateQuantity = (id, change) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, change } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = state.items.reduce((total, item) => {
    const price = parseFloat(String(item.price).replace('Rs.', '').trim())
    return total + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
