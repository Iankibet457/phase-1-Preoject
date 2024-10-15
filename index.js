window.addEventListener("DOMContentLoaded",(e)=>{
    // console.log("hi am js")
    // alert("DOM loaded")
    let category = document.getElementById("cat")
    let random = document.getElementById("random")
    // console.log(random)
    let mealTitle = document.createElement("h1")
    random.appendChild(mealTitle)
    let img = document.createElement("img")
    random.appendChild(img)
    let ul = document.createElement("ul")
    
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
                // alert(`clicked ${type.strCategory}`)
                
                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type.strCategory}`)
                .then(response => response.json())
                .then(catData =>{
                    ul.replaceChildren()
                    let h1 = document.getElementById("sTitle")
                    h1.innerText = type.strCategory
                    let div = document.getElementById("search")
                    div.appendChild(ul)
                    // console.log(catData.meals.strMeal)
                    for (let name of catData.meals){
                            let li = document.createElement("li")
                            li.innerText = name.strMeal
                            ul.appendChild(li)
                        
                        // console.log(name.strMeal)
                        
                    }
                    
                    
                    
                    
                })
            })
        }
        
    },
    
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data =>{
        
        let meal = data.meals[0].strMeal
        mealTitle.innerText = meal
        img.src = data.meals[0].strMealThumb
        img.style.height = "400px"
        img.style.width = "600px"
        img.style.border = "2px solid black"
        let div = document.createElement("div")
        random.appendChild(div)
        let howToPrepare = document.createElement("button")
        howToPrepare.innerText = "How To Prepare"
        div.appendChild(howToPrepare)
        let generateNewMeal = document.createElement("button")
        generateNewMeal.innerText = "Generate New Meal"
        div.appendChild(generateNewMeal)
        generateNewMeal.addEventListener("click",(e)=>{
            fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then(data =>{
        
                
                let meal = data.meals[0].strMeal
                mealTitle.innerText = meal
                img.src = data.meals[0].strMealThumb
                img.style.height = "400px"
                img.style.width = "600px"
                img.style.border = "2px solid black"

            })
        })


    })

);
    
})