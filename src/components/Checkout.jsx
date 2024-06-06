import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { currencyFomatter } from "../util/fomatting";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    }
}

export default function Checkout() {
    const cartCtx= useContext(CartContext)
    const UserProgressCtx = useContext(UserProgressContext)

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp(
        'http://localhost:3000/orders', requestConfig
    )

    // 장바구니 총 금액 계산
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
         0
    )

    function handleClose() {
        UserProgressCtx.hideCheckOut()
    }

    function handleFinish() {
        UserProgressCtx.hideCheckOut()
        cartCtx.clearCart()
        clearData()
    }

    function handleSubmit(e) {
        e.preventDefault()

        const fd = new FormData(e.target)
        const customerData = Object.fromEntries(fd.entries())// formdata 객체로 변환

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }

    let actions = (
        <>
            <Button 
                type="button"
                onClick={handleClose}
                onClose={handleClose}
                textOnly
            >닫기</Button>
            <Button>주문서 제출</Button>
        </>
    )

    if(isSending) {
        actions = <span>주문 데이터 전송 중...</span>
    }

    if(data && !error) {
        return (
        <Modal open={UserProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>성공!</h2>
            <p>주문이 성공적으로 진행됐습니다</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>OK</Button>  
            </p>
        </Modal>
        )
    }
    return (
        <Modal open={UserProgressCtx.progress === 'checkout'} onClose={handleClose}>
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
                {
                    error && <Error title="주문 실패했습니다" message={error}/>
                }
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    )
}