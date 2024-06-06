import { useReducer } from "react";
import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
})

function cartReducer(state, action) {
    //장바구니 추가
    if(action.type === 'ADD_ITEM') {
        // 장바구니에 해당 아이템 있는지 확인
       const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
       )

        const updatedItems = [...state.items]

        //장바구니에 해당 아이템 있을 경우, 양+1
        if(existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }

            updatedItems[existingCartItemIndex] = updatedItem
        // 없을 경우 장바구니에 추가
       } else {
            updatedItems.push({...action.item, quantity: 1})
       }

       return {...state, items: updatedItems}
    }
    
    // 장바구니 삭제
    if(action.type === 'REMOVE_ITEM') {
        // 장바구니에 해당 아이템 있는지 확인
       const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
       )

       const existingCartItem = state.items[existingCartItemIndex]
       const updatedItems = [...state.items]

       //하나만 있을 경우 삭제
        if(existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } 
       //하나 이상 있을 경우 양-1
        else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity -1
            }
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {...state, items: updatedItems}
    }

    // 주문 제출 후 장바구니 초기화
    if(action.type === 'CLEAR_CART') {
        return {...state, items: []}
    }

    return state
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []})

    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item})
    }

    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id})
    }

    function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART'})
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }
    console.log(cartContext)
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext