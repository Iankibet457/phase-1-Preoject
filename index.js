window.addEventListener("DOMContentLoaded",(e)=>{
    // console.log("hi am js")
    // alert("DOM loaded")
    let category = document.getElementById("ol")
    console.log(category)
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
        
    }
);
    
})