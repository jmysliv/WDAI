document.getElementById("add-trigger").addEventListener("click", openNav);
document.getElementById("closebtn").addEventListener("click", closeNav);

function openNav() {
    document.getElementById("Sidenav").style.left = "0";
}

function closeNav() {
   document.getElementById("Sidenav").style.left = "-700px";
}

