let recipes = {};

addRecipeToList('steak');
addRecipeToList('popsicle');
addRecipeToList('salmon');

function removeRecipe(e, id) {
    e.stopPropagation();
    removeRecipeFromList(id);
    let node = document.getElementById(id);
    $(node).fadeOut("slow");
}

function validateForm(fields) {
    if(fields.name === "") return false;
    if(fields.primaryImage === "") return false;
    if(fields.secondaryImage === "") return false;
    if(fields.recipe === "") return false;
    if(fields.algorithm === "") return false;

    if(fields.primaryImage.match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null) return false;
    if(fields.secondaryImage.match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null) return false;
    return true;
}

$(document).ready(function() {  
    $("input").focusout(function() {  
        if($(this).val()=='') {  
            $(this).css('border', 'solid 3px red');  
        } 
        else { 
            $(this).css('border', 'solid 3px green');     
        }     
    }); 
    $("textarea").focusout(function() {  
        if($(this).val()=='') {  
            $(this).css('border', 'solid 3px red');  
        } 
        else {
            $(this).css('border', 'solid 3px green');     
        }     
    });
    $("#primaryImage").focusout(function(){
        if($(this).val().match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null){
            $(this).css('border', 'solid 3px red');  
        }
        else { 
            $(this).css('border', 'solid 3px green');     
        }     
    })
    $("#secondaryImage").focusout(function(){
        if($(this).val().match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null){
            $(this).css('border', 'solid 3px red');  
        }
        else { 
            $(this).css('border', 'solid 3px green');     
        }     
    })
});

function getDataFromForm() {
    let name = document.getElementById("name").value;
    let primaryImage = document.getElementById("primaryImage").value;
    let secondaryImage = document.getElementById("secondaryImage").value;
    let recipe = document.getElementById("recipe").value;
    let algorithm = document.getElementById("algorithm").value;
    return { name, primaryImage, secondaryImage, recipe, algorithm };
}

function createList(list) {
    return list.split('\n').map(el => `<li>${el}</li>`).join("\n");
}

function addNewRecipe(e , elements) {
    const {name, primaryImage, secondaryImage, recipe, algorithm} = elements;
    if(!validateForm({name, primaryImage, secondaryImage, recipe, algorithm})) {
        return;  
    } 
    
    let div = document.createElement("div");
    div.classList.add("recipe");
    div.id = name;
    addRecipeToList(div.id);

    div.addEventListener('click', () => changeCurrentRecipe(div.id));
    div.innerHTML += `
        <div class="main-recipe">
            <img src="${primaryImage}" class="new-image">
            <h4>${name}</h4>
            <p>INGREDIENTS:</p>
            <ul class="ingredients">
                ${createList(recipe)}
            </ul> 
            <span class="close" onclick="removeRecipe(event, '${div.id}')" >&times;</span>
        </div>
        <div class = "hidden">
            <img src="${secondaryImage}" class="new-image"/>
            <h4>HOW TO MAKE IT:</h4>
            <ul class="instructions">
                ${createList(algorithm)}
            </ul> 
            <span class="close" onclick="removeRecipe(event, '${div.id}')" >&times;</span>
        </div>
    `;
    document.getElementById("recipe-container").appendChild(div)
    resetForm();
    closeNav();
}

function resetForm(){
    document.getElementById("recipe-form").reset();
    $("input").css('border', 'none');
    $("textarea").css('border', 'none');  
}

function addRecipeToList(id) {
    recipes[id] = false;
}

function removeRecipeFromList(id) {
    delete recipes[id];
}

function getRecipeElements(id) {
    let hidden = document.getElementById(id).getElementsByClassName("hidden")[0];
    let main = document.getElementById(id).getElementsByClassName("main-recipe")[0];
    return {  hidden, main}
}

function animateChange(id, hidden, main) {
   if(recipes[id]){
        rotate(hidden);
        setTimeout(function(){
            change(hidden, main);
            renew(main);
        }, 500);
   }
   else{
        rotate(main);
        setTimeout(function(){
            change(main, hidden);
            renew(hidden);
        }, 500);
   }
}

function changeCurrentRecipe(id) {
    for (let recipeId in recipes) {
        if (id !== recipeId && recipes[recipeId] === true) {
            const { hidden, main } = getRecipeElements(recipeId);
            animateChange(recipeId, hidden, main);
            recipes[recipeId] = false;
            break;
        }
    }
    const { hidden, main } = getRecipeElements(id);
    animateChange(id, hidden, main);
    recipes[id] = !recipes[id];
}

function rotate(element){
    element.style.webkitTransform = "rotateY(90deg)"; 
}

function renew(element){
    element.style.webkitTransform = "rotateY(0deg)"; 
}
function change(hide, show){
    hide.style.display = "none";
    show.style.display = "block";
}