import { useContext } from 'react'
import Button from '../UI/Button'
import logoImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext'

export default function Header() {
    const cartCtx = useContext(CartContext)

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='레스토랑'/>
                <h1>맛도리 햄버거</h1>
            </div>
            <nav>
                <Button textOnly>장바구니 ({totalCartItems})</Button>
            </nav>
        </header>
    )
}