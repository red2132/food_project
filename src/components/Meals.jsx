import { useEffect } from "react"
import { useState } from "react"
import MealItem from "./MealItem"

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([])

    useEffect(() => {
        async function fetchMeals() {
            const res = await fetch('http://localhost:3000/meals')
    
            const meals = await res.json()
            setLoadedMeals(meals)
        }
        fetchMeals()
    }, []
    )
    return (
        <ul id="meals">
            {
                loadedMeals.map((meal) => (
                    <MealItem key={meal.id} meal={meal}></MealItem>
                ))
            }
        </ul>
    )
}