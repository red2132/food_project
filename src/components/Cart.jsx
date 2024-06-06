import { useContext } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { currencyFomatter } from "../util/fomatting";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";


export default function Cart() {
    const cartCtx = useContext(CartContext)
    const UserProgressCtx = useContext(UserProgressContext)

    // 장바구니 총 금액 계산
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
         0
    )

    function handleCloseCart() {
        UserProgressCtx.hideCart()
    }
    return (
        <Modal className="cart" open={UserProgressCtx.progress === 'cart'}>
            <h2>장바구니</h2>
            <ul>
                {
                    cartCtx.items.map((item) => (
                        <CartItem 
                            key={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            onIncrease={() => cartCtx.addItem(item)}
                            onDecrease={() => cartCtx.removeItem(item.id)}
                        />
                    ))
                }
            </ul>
            <p className="cart-total">{currencyFomatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>닫기</Button>
                <Button onClick={handleCloseCart}>결제하기</Button>
            </p>
        </Modal>
    )
}