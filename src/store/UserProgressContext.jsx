import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckOut: () => {},
    hideCheckOut: () => {}
})

export function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState('')

    function showCart() {
        setUserProgress('cart')
    }

    function hideCart() {
        setUserProgress('')
    }

    function showCheckOut() {
        setUserProgress('checkout')
    }

    function hideCheckOut() {
        setUserProgress('')
    }

    const UserProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut
    }

    return (
        <UserProgressContext.Provider value={UserProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext