var config1 = [
	"https://loremflickr.com/320/240?lock=1",
	"https://loremflickr.com/250/240?lock=2",
	"https://loremflickr.com/420/340?lock=3",
	"https://loremflickr.com/220/240?lock=4",
	"https://loremflickr.com/220/140?lock=5"
]
function carousel(id, config){
	var carousel = document.getElementById(id); // берем карусельку 
	var wrapper = document.querySelector(".wrapper"); // берем блок где все картинки

	var imgsWidth = []; // возьмет ширину всех картинок
	var sumWidth = 0; // будет шириной род элемента картинок

	var itemIndex = 0; // чекер для переходов слайдера
	var traslater = 0; // для правлиных переходов слайдера
	
	for( var i in config ){ // вставляем картинки
		var img;
		img = document.createElement("img");
		img.src = config[i];    
		img.onload = function () {
			imgsWidth[i] = this.offsetWidth;
			sumWidth += imgsWidth[i]
			carousel.style.width = wrapperImgs[0].offsetWidth + 'px'; // ширина карусели
			wrapper.style.width = sumWidth + 'px'; // ширина род элемента картинок 
		}
		wrapper.appendChild(img); 
	}

	var wrapperImgs = wrapper.querySelectorAll('img'); // все наши картинки
	
	// CSS НАСТРОЙКИ ДЛЯ КАРУСЕЛИ
	carousel.style.marginLeft = 'auto';
	carousel.style.marginRight = 'auto';
	carousel.style.overflow = 'hidden';
	carousel.style.position = 'relative';

	function arrowCloser () {
		// ЛЕВАЯ СТРЕЛКА
		if ( itemIndex == 0 ){
			left.style.display = 'none';
		}else {
			left.style.display = 'block';
		}
		// ПРАВАЯ СТРЕЛКА
		if ( itemIndex == wrapperImgs.length - 1){
			right.style.display = 'none';
		}else {
			right.style.display = 'block';
		}
	}
	
	// РАБОТА СТРЕЛОК
	arrowCloser()
	left.onclick = () => {
		if ( itemIndex != 0 ){
			itemIndex--;
			traslater -= wrapperImgs[itemIndex].offsetWidth;

			wrapper.style.transform = `translateX(${ -traslater }px)` // переход
			carousel.style.width = wrapperImgs[itemIndex].offsetWidth + 'px'; // каждый раз меняем ширину карусели для ее адаптивности
			arrowCloser()
		}
	}
	right.onclick = () => {
		if ( itemIndex < wrapperImgs.length - 1 ){	
			traslater += wrapperImgs[itemIndex].offsetWidth;
			itemIndex++;
 			// индекс внизу потому для коректной работы translater'a
			wrapper.style.transform = `translateX(${ -traslater }px)` // переход
			carousel.style.width = wrapperImgs[itemIndex].offsetWidth + 'px'; // каждый раз меняем ширину карусели для ее адаптивности
			arrowCloser()
		}
	}
}
carousel("carousel1", config1);