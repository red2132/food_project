import { useContext } from "react";
import Button from "../UI/Button";
import { currencyFomatter } from "../util/fomatting";
import CartContext from "../store/CartContext";

export default function MealItem({meal}) {

    const cartCtx = useContext(CartContext)

    function handleAddMealToCart() {
        cartCtx.addItem(meal)
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFomatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>장바구니 추가</Button>
                </p>
            </article>
        </li>
    )
}