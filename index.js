window.addEventListener("DOMContentLoaded",(e)=>{
    // console.log("hi am js")
    // alert("DOM loaded")
    let category = document.getElementById("cat")
    let random = document.getElementById("random")
    console.log(random)
    
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(response => response.json())
    .then(data => {
        // console.log(data.categories[0])
        for (let type of data.categories){
            // console.log(type.strCategory)
            let meal = document.createElement("li")
            meal.innerText = type.strCategory
            category.appendChild(meal)
            meal.addEventListener("mouseover",(e)=>{
                meal.style.color = "blue"
            })
            meal.addEventListener("mouseout",(e)=>{
                meal.style.color = "black"
            })
            meal.addEventListener("click",(e)=>{
                alert(`clicked ${type.strCategory}`)
            })
        }
        
    },
    
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data =>{
        // let meal = data
        // console.log(data.meals[0].strMeal)
        let meal = data.meals[0].strMeal
        let mealTitle = document.createElement("h1")
        mealTitle.innerText = meal
        random.appendChild(mealTitle)
        let img = document.createElement("img")
        img.src = data.meals[0].strMealThumb
        img.style.height = "400px"
        img.style.width = "600px"
        random.appendChild(img)

    })

);
    
})