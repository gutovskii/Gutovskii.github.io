var menu = document.querySelector(".nav-menu");
var checker = true;

function openMenu(){
	if( checker == true ){
		menu.style.display = "block";
		checker = false;
	} else{
		menu.style.display = "none";
		checker = true;
	}
}