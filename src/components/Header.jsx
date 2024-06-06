import { useContext } from 'react'
import Button from '../UI/Button'
import logoImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

export default function Header() {
    const cartCtx = useContext(CartContext) // 장바구니 context
    const userProgressCtx = useContext(UserProgressContext) // modal 이용 context

    // 장바구니 개수 계산
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    function handleShowCart() {
        userProgressCtx.showCart()
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='레스토랑'/>
                <h1>맛도리 햄버거</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    장바구니 ({totalCartItems})
                </Button>
            </nav>
        </header>
    )
}