let recipies = {};

registerRecipie('steak');
registerRecipie('popsicle');
registerRecipie('salmon');

function removeRecipie(e, id) {
    e.stopPropagation();
    unregisterRecipie(id);
    let node = document.getElementById(id);
    $(node).fadeOut("slow");
}

function getDataFromForm() {
    let name = document.getElementById("name").value;
    let primaryImage = document.getElementById("primaryImage").value;
    let secondaryImage = document.getElementById("secondaryImage").value;
    let recipe = document.getElementById("recipe").value;
    let algorithm = document.getElementById("algorithm").value;
    return { name, primaryImage, secondaryImage, recipe, algorithm };
}

function createListElements(list) {
    return list.split('\n').map(el => `<li>${el}</li>`).join("\n");
}

function addNewRecipieToList(e , elements) {
    e.preventDefault();

    const {name, primaryImage, secondaryImage, recipe, algorithm} = elements;

    let div = document.createElement("div");
    div.classList.add("recipe");
    div.id = name;
    registerRecipie(div.id);

    div.addEventListener('click', () => changeCurrentRecipie(div.id));
    div.innerHTML += `
        <div class="main-recipe">
            <img src="${primaryImage}">
            <h4>${name}</h4>
            <p>INGREDIENTS:</p>
            <ul class="ingredients">
                ${createListElements(recipe)}
            </ul> 
            <span class="close" onclick="removeRecipie(event, '${div.id}')" >&times;</span>
        </div>
        <div class = "hidden">
            <img src="${secondaryImage}" />
            <h4>HOW TO MAKE IT:</h4>
            <ul class="instructions">
                ${createListElements(algorithm)}
            </ul> 
            <span class="close" onclick="removeRecipie(event, '${div.id}')" >&times;</span>
        </div>
    `;
    document.getElementById("recipe-container").appendChild(div)
    document.getElementById("recipe-form").reset();
}

function registerRecipie(id) {
    recipies[id] = false;
}

function unregisterRecipie(id) {
    delete recipies[id];
}

function getRecipieElements(id) {
    let hidden = document.getElementById(id).getElementsByClassName("hidden")[0];
    let main = document.getElementById(id).getElementsByClassName("main-recipe")[0];
    return {  hidden, main}
}

function animateChange(id, hidden, main) {
   if(recipies[id]){
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

function changeCurrentRecipie(id) {
    for (let recipeId in recipies) {
        if (id !== recipeId && recipies[recipeId] === true) {
            const { hidden, main } = getRecipieElements(recipeId);
            animateChange(recipeId, hidden, main);
            recipies[recipeId] = false;
            break;
        }
    }
    const { hidden, main } = getRecipieElements(id);
    animateChange(id, hidden, main);
    recipies[id] = !recipies[id];
}

//universal function
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