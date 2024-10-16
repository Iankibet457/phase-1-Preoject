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
    let ingredients = document.createElement("ul")
    
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
                        
                        li.addEventListener("click",(e)=>{
                            // alert(`clicked ${name.strMeal}`)
                            mealTitle.innerText = name.strMeal
                            img.src = name.strMealThumb
                        })
                        li.addEventListener("mouseover",(e)=>{
                            li.style.color = "blue"
                        })
                        li.addEventListener("mouseout",(e)=>{
                            li.style.color = "black"
                        })
                        
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
        let prepareDiv = document.createElement("div")
        prepareDiv.id = "prepare"
        prepareDiv.style.border = "2px solid red"
        prepareDiv.style.height = "400px"
        random.appendChild(prepareDiv)
        
        
        howToPrepare.addEventListener("click",(e)=>{
            prepareDiv.replaceChildren()
            // alert("clicked")
            let h1 = document.createElement("h1")
            h1.innerText = "Ingredients"
            prepareDiv.appendChild(h1)
            prepareDiv.appendChild(ingredients)
            let item1 = document.createElement("li")
            let item2 = document.createElement("li")
            let item3 = document.createElement("li")
            let item4 = document.createElement("li")
            let item5 = document.createElement("li")
            let item6 = document.createElement("li")
           
            item1.innerText = data.meals[0].strIngredient1
            ingredients.appendChild(item1)
            item2.innerText = data.meals[0].strIngredient2
            ingredients.appendChild(item2)
            item3.innerText = data.meals[0].strIngredient3
            ingredients.appendChild(item3)
            item4.innerText = data.meals[0].strIngredient4
            ingredients.appendChild(item4)
            item5.innerText = data.meals[0].strIngredient5
            ingredients.appendChild(item5)
            item6.innerText = data.meals[0].strIngredient6
            ingredients.appendChild(item6)
            let instruction = document.createElement("p")
            instruction.innerText = data.meals[0].strInstructions
            prepareDiv.appendChild(instruction)

            


            
        })


    }),
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
    .then(response =>response.json())
    .then(data =>{
        console.log(data.meals[0].strMeal)
        let form = document.getElementById("form")
        
        form.addEventListener("submit",(e)=>{
            e.preventDefault()
            let value = document.getElementById("input").value
            if(value == data.meals[0].strMeal ){
                mealTitle.innerText = data.meals[0].strMeal
                img.src = data.meals[0].strMealThumb
            }
        })
    })

);
    
})