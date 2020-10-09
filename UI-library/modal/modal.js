function openModal(elem){
	var dataSetId = elem.dataset.target;
	var dataModal = document.getElementById(dataSetId);
	dataModal.style.visibility = "visible";
	document.body.classList.add('body-hidden');

	var modalHeaders = document.querySelectorAll('.modal-header');
	var closer = document.createElement('div');

	closer.className = 'closer';
	for (var item of modalHeaders){
		item.appendChild(closer);
	}

	closer.onclick = closed
}

var modals = document.querySelectorAll('.modal');

function closed(){
	for (var modal of modals){
		modal.style.visibility = "hidden";
		document.body.classList.remove('body-hidden');
	}
} 




