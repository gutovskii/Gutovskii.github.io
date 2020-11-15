let modalBg = document.querySelector('.dataModal-bg')
let modalHeader = document.querySelector('.dataModal-header');
// make closer
let closer = document.createElement('div');
closer.className = 'closer';
modalHeader.appendChild(closer);

closer.onclick = closeDataModal
modalBg.onclick = closeDataModal

function openModal(elem){
	var dataSetId = elem.dataset.target;
	var dataModal = document.getElementById(dataSetId);
	dataModal.style.visibility = "visible";
	document.body.classList.add('body-hidden');
}

function closeDataModal(){
	var modalInputBox = document.querySelector('.dataModal-inputbox')
	var modalBtnBox = document.querySelector('.dataModal-btnbox')
	var modalHeadline = document.querySelector('.dataModal-headline')

	// tableModal это айди модалки
	tableModal.style.visibility = "hidden"
	document.body.classList.remove('body-hidden')

	modalInputBox.innerHTML = ''
	modalBtnBox.innerHTML = ''
	modalHeadline.innerHTML = ''
} 




