function openModal(id){
	var data = id.dataset.target;
	var dataModal = document.getElementById(data);
	dataModal.style.display = "block";
	document.body.classList.add('body-hidden');
}

var modals = document.querySelectorAll('.modal');
var modalHeader = document.querySelectorAll('.modal-header');
var closer = document.createElement('div');
closer.className = 'closer';
for (var item of modalHeader){
	item.appendChild(closer);
}

function closed(){
	for (var modal of modals){
		modal.style.display = "none";
		document.body.classList.remove('body-hidden');
	}
} 

closer.onclick = closed;


