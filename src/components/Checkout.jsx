import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { currencyFomatter } from "../util/fomatting";

export default function Checkout() {
    const cartCtx= useContext(CartContext)
    const UserProgressCtx = useContext(UserProgressContext)

    // 장바구니 총 금액 계산
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
         0
    )

    function handleClose() {
        UserProgressCtx.hideCheckOut()
    }

    function handleSubmit(e) {
        e.preventDefault()

        const fd = new FormData(e.target)
        const customerData = Object.fromEntries(fd.entries())// formdata 객체로 변환

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        })
    }

    return (
        <Modal open={UserProgressCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2>결제</h2>
                <p>총 금액: {currencyFomatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-Mail Address" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>
                <p className="modal-actions">
                    <Button 
                        type="button"
                        onClick={handleClose}
                        onClose={handleClose}
                        textOnly
                    >닫기</Button>
                    <Button>주문서 제출</Button>
                </p>
            </form>
        </Modal>
    )
}