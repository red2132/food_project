import useHttp from "../hooks/useHttp"
import Error from "./Error"
import MealItem from "./MealItem"

const requestConfig = {}

export default function Meals() {
    const {data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, [])
    if(isLoading) {
        return <p className="center">데이터를 가져오는 중입니다...</p>
    }

    if(error) {
        return <Error title="메뉴를 불러올 수 없었습니다" message={error}/>
    }
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