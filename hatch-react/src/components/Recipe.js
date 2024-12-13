
function Recipe(props) {
    return (
            <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="" alt={props.name} />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">{props.name}</h5>
                        <p>{props.altName}</p>
                        <p>Prep time: {props.prepTime} minutes</p>
                        <p>{props.description}</p>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="/recipe/{props.name}">See recipe</a></div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;