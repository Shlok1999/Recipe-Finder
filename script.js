const searchForm=document.querySelector('form')
const searchResultDiv=document.querySelector('.search-result');
const container=document.querySelector('.container');
let searchQuery='';

const app_ID='43166c72';
const app_KEY='b55792b7c83bb33df3e889c9b9cb3bc0'


searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
    fetchAPI();

});

async function fetchAPI(){
    const base_URL=`https://api.edamam.com/search?q=${searchQuery}&app_id=${app_ID}&app_key=${app_KEY}&to=20`;
    const response=await fetch(base_URL);
    const data=await response.json();
    generateHTML(data.hits);

    console.log(data);

}

function generateHTML(results){
    let generatedHTML='';
    results.map(result=>{
        generatedHTML+=
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data" >${result.recipe.healthLabels}</p>
        </div>
        
        `  
    });
    searchResultDiv.innerHTML=generatedHTML;
}