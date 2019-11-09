
document.getElementById("main-steak").addEventListener("click", function(){

    document.getElementById("after-click-popsicle").click();
    document.getElementById("after-click-salmon").click();
    rotate("main-steak");
    setTimeout(function(){
        change("main-steak", "after-click-steak");
        renew("after-click-steak");
    }, 500);
    
    
});
document.getElementById("after-click-steak").addEventListener("click", function(){
    
    rotate("after-click-steak");
    setTimeout(function(){
        change("after-click-steak", "main-steak");
        renew("main-steak");
    }, 500);
    
});
document.getElementById("main-popsicle").addEventListener("click", function(){
    document.getElementById("after-click-steak").click();
    document.getElementById("after-click-salmon").click();
    rotate("main-popsicle");
    setTimeout(function(){
        change("main-popsicle", "after-click-popsicle");
        renew("after-click-popsicle");
    }, 500);
    
});
document.getElementById("after-click-popsicle").addEventListener("click", function(){

    rotate("after-click-popsicle");
    setTimeout(function(){
        change("after-click-popsicle", "main-popsicle");
        renew("main-popsicle");
    }, 500);
    
});
document.getElementById("main-salmon").addEventListener("click", function(){
    document.getElementById("after-click-popsicle").click();
    document.getElementById("after-click-steak").click();
    rotate("main-salmon");
    setTimeout(function(){
        change("main-salmon", "after-click-salmon");
        renew("after-click-salmon");
    }, 500);
    
});
document.getElementById("after-click-salmon").addEventListener("click", function(){
    
    rotate("after-click-salmon");
    setTimeout(function(){
        change("after-click-salmon", "main-salmon");
        renew("main-salmon");
    }, 500);
    
});

function rotate(element){
    document.getElementById(element).style.webkitTransform = "rotateY(90deg)"; 
}

function renew(element){
    document.getElementById(element).style.webkitTransform = "rotateY(0deg)"; 
}
function change(hide, show){
    document.getElementById(hide).style.display = "none";
    document.getElementById(show).style.display = "block";
}