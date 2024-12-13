import Recipe from './Recipe';
import { useState, useEffect } from 'react';

function RecipeList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/data')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log("Error fetching data", err))
    }, []);

    return (
        <>
        <h1 className="text-center display-5 fw-bolder">Recipes</h1><ul>
            {data.map((recipe, index) =>
            <Recipe name={recipe.name}/>
            )}
        </ul>
        </>
    )
}

export default RecipeList;