window.addEventListener("DOMContentLoaded", (e) => {
    let category = document.getElementById("cat");
    let random = document.getElementById("random");
    
    let mealTitle = document.createElement("h1");
    mealTitle.classList.add("text-2xl", "font-semibold", "mb-2");
    random.appendChild(mealTitle);
    
    let img = document.createElement("img");
    img.classList.add("w-full", "h-auto", "border", "border-gray-300", "rounded-md");
    random.appendChild(img);
    
    let ul = document.createElement("ul");
    let ingredients = document.createElement("ul");
    ingredients.classList.add("list-disc", "pl-5", "mb-4");
    let prepareDiv = document.createElement("div");
    prepareDiv.classList.add("p-4", "border", "border-gray-300", "rounded-md", "mt-4");
    
    prepareDiv.appendChild(ingredients);
    let instruction = document.createElement("p");
    prepareDiv.appendChild(instruction);
    random.appendChild(prepareDiv);
    
    let form = document.getElementById("form");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let value = document.getElementById("input").value;
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    let meal = data.meals[0];
                    mealTitle.innerText = meal.strMeal;
                    img.src = meal.strMealThumb;
                    instruction.innerText = meal.strInstructions;
                } else {
                    alert("Please Try Another Meal");
                }
            });
    });

    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(response => response.json())
        .then(data => {
            for (let type of data.categories) {
                let meal = document.createElement("li");
                meal.innerText = type.strCategory;
                meal.classList.add("cursor-pointer", "hover:text-blue-500", "transition-colors");
                category.appendChild(meal);

                meal.addEventListener("click", (e) => {
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type.strCategory}`)
                        .then(response => response.json())
                        .then(catData => {
                            ul.replaceChildren();
                            let h1 = document.getElementById("sTitle");
                            h1.innerText = type.strCategory;
                            let div = document.getElementById("search");
                            div.appendChild(ul);
                            
                            for (let name of catData.meals) {
                                let li = document.createElement("li");
                                li.innerText = name.strMeal;
                                li.classList.add("cursor-pointer", "hover:text-blue-500", "transition-colors");
                                ul.appendChild(li);
                                
                                li.addEventListener("click", (e) => {
                                    mealTitle.innerText = name.strMeal;
                                    img.src = name.strMealThumb;
                                });
                            }
                        });
                });
            }
        });

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            let meal = data.meals[0].strMeal;
            mealTitle.innerText = meal;
            img.src = data.meals[0].strMealThumb;

            let div = document.createElement("div");
            div.classList.add("flex", "justify-between", "mt-4");
            random.appendChild(div);
            
            let howToPrepare = document.createElement("button");
            howToPrepare.innerText = "How To Prepare";
            howToPrepare.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-blue-600", "transition");
            div.appendChild(howToPrepare);
            
            let generateNewMeal = document.createElement("button");
            generateNewMeal.innerText = "Generate New Meal";
            generateNewMeal.classList.add("bg-green-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-green-600", "transition");
            div.appendChild(generateNewMeal);

            generateNewMeal.addEventListener("click", (e) => {
                fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                    .then(response => response.json())
                    .then(data => {
                        let meal = data.meals[0].strMeal;
                        mealTitle.innerText = meal;
                        img.src = data.meals[0].strMealThumb;
                    });
            });

            prepareDiv.id = "prepare";
            // prepareDiv.style.border = "2px solid red";
            prepareDiv.style.height = "auto"; // Adjust height to auto for responsiveness
            
            howToPrepare.addEventListener("click", (e) => {
                prepareDiv.replaceChildren();
                let h1 = document.createElement("h1");
                h1.innerText = "Ingredients";
                h1.classList.add("font-semibold", "mb-2");
                prepareDiv.appendChild(h1);
                
                for (let i = 1; i <= 6; i++) {
                    let item = document.createElement("li");
                    item.innerText = data.meals[0][`strIngredient${i}`];
                    if (item.innerText) {
                        ingredients.appendChild(item);
                    }
                }
                instruction.innerText = data.meals[0].strInstructions;
            });
        });
});
