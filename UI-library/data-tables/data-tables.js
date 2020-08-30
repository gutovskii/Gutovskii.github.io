//----------------------------------------------------
const config_1 = { // пишу через _ потому что уже есть такой массив
  parent: '#usersTable',
  columns: [
    {title: '№', value: '_index'},
    {title: 'Дата регистрации', value: (user) => calculateData(user.createdAt, 'registration'), sortable: true},
    {title: 'Имя', value: 'name', sortable: true},
    {title: 'Аватар', value: 'avatar', type: 'image'},
    {title: 'Фамилия', value: 'surname', sortable: true},
    {title: 'Возраст', value: (user) => calculateData(user.birthday, 'age'), sortable: true, type: 'number'}
  ],
  apiUrl: 'https://5f34ff0d9124200016e1941b.mockapi.io/api/v1/users',
  search: {
  	fields: ['name', 'surname'],
  	filters: [
  	  v => v.toLowerCase(),
  	  v => v.toUpperCase(),
  	  v => toKeyboardLayout(v, 'ru'),
  	  v => toKeyboardLayout(v, 'ru').toLowerCase(),
  	  v => toKeyboardLayout(v, 'ru').toUpperCase(),
  	  v => toKeyboardLayout(v, 'en'),
  	  v => toKeyboardLayout(v, 'en').toLowerCase(),
  	  v => toKeyboardLayout(v, 'en').toUpperCase()
  	]
  },
  actionButtons: true // добавляет колонку действия
};

const users = [
  {id: 30050, name: 'петя', surname: 'Петров', age: 12},
  {id: 30051, name: 'Вася', surname: 'Васечкин', age: 25},
  {id: 30052, name: 'Ярик', surname: 'Ясечкин', age: 3},
  {id: 30053, name: 'Ярик', surname: 'Гуляев', age: 35},
  {id: 30054, name: 'Ярик', surname: 'Белов', age: 22},
  {id: 30055, name: 'Ясечкин', surname: 'Димочкин', age: 15},
  {id: 30056, name: 'Dima', surname: 'Ясечкин', age: 22}
];

////////////

const config_2 = {
	parent: '#myTable',
	columns: [
		{title: '№', value: '_index'},
	    {title: 'Дата регистрации', value: (user) => calculateData(user.createdAt, 'registration'), sortable: true},
	    {title: 'Имя', value: 'name', sortable: true},
	    {title: 'Аватар', value: 'avatar', type: 'image'},
	    {title: 'Фамилия', value: 'surname', sortable: true},
	    {title: 'Возраст', value: (user) => calculateData(user.birthday, 'age'), sortable: true, type: 'number'}
	],
	apiUrl: 'https://5f4540773fb92f00167547c9.mockapi.io/users',
	search: {
		fields: ['name', 'surname'],
		filters: [
			v => v.toLowerCase(),
  	 		v => v.toUpperCase(),
		  	v => toKeyboardLayout(v, 'ru'),
		  	v => toKeyboardLayout(v, 'ru').toLowerCase(),
		  	v => toKeyboardLayout(v, 'ru').toUpperCase(),
		  	v => toKeyboardLayout(v, 'en'),
		  	v => toKeyboardLayout(v, 'en').toLowerCase(),
		  	v => toKeyboardLayout(v, 'en').toUpperCase()
		]
	},
	actionButtons: true
}
const workers = [
	{i: 123, name: 'Grisha', exp: 'middle'},
	{id: 124, name: 'Ivan', exp: 'junior'},
	{id: 125, name: 'Volodimir', exp: 'senior'},
	{id: 126, name: 'Pasha', exp: 'middle'},
	{id: 127, name: 'Pasha', exp: 'senior'}
]
//----------------------------------------------------
var engLetters = {
	   sml: [ "`","q","w","e","r","t","y","u","i",
	     "o","p","[","]","a","s","d","f",
	     "g","h","j","k","l",";","'","z",
	     "x","c","v","b","n","m",",","." ],

	   bgl: [ '~','Q','W','E','R','T','Y','U','I',
	     'O','P','{','}','A','S','D','F',
	     'G','H','J','K','L',':','"','Z',
	     'X','C','V','B','N','M','<','>' ]
}

var rusLetters = {
	   sml: [ "ё","й","ц","у","к","е","н","г","ш",
	     "щ","з","х","ъ","ф","ы","в","а",
	     "п","р","о","л","д","ж","э","я",
	     "ч","с","м","и","т","ь","б","ю" ],

	   bgl: [ 'Ё','Й','Ц','У','К','Е','Н','Г','Ш',
	     'Щ','З','Х','Ъ','Ф','Ы','В','А',
	     'П','Р','О','Л','Д','Ж','Э','Я',
	     'Ч','С','М','И','Т','Ь','Б','Ю' ]
}
var defaultArrays = [], // Для хранения дефолтных массивов
    defaultSeacrhedData = [], // Дефолтный массив для найденных элементов
   	onSearch = [], // Для понятия нашло ли элементы
   	tableArray = [] // Хранение таблиц

var tableIteration = 0, // индекс для записи данных определенной таблицы
    tableIndex // Индекс для работы с определенной таблицы

// ДЛЯ renderTable
var toSort = [], // Для сортирвки каждой таблицы
    sortedColumn // Запоминаем сортируешуюся колонку

function calculateData(date, toCalculate){
	var nowadayTime = new Date()
	var setDate = new Date(date)

	if ( toCalculate == 'age' ){
		var age = (nowadayTime - setDate) / 1000 / 60 / 60 / 24 / 365
		var lastNumeral = Math.floor(age) % 10 // последняя цифра в числе
		var ymw // типа year month week

		if ( Math.floor(age) >= 1 ){
			if ( lastNumeral == 1 ) ymw = 'год'
			if ( lastNumeral > 1 && lastNumeral < 5 ) ymw = 'года'
			if ( lastNumeral >= 5 ) ymw = 'лет'
		}
		if ( Math.floor(age) === 0 ){
			age *= 12
			lastNumeral = Math.floor(age) % 10
			if ( lastNumeral == 1 ) ymw = 'месяц'
			if ( lastNumeral > 1 && lastNumeral < 5 ) ymw = 'месяца'
			if ( lastNumeral >= 5 || (Math.floor(age) >= 10 && Math.floor(age) <= 20) ) ymw = 'месяцев'
			if ( age < 1 ) {
				age *= 4
				lastNumeral = Math.floor(age) % 10
				if ( lastNumeral == 1 ) ymw = 'неделя'
				if ( lastNumeral > 1 ) ymw = 'недели'
			}
		}
		return Math.floor(age) + ' ' + ymw
	}
	if ( toCalculate == 'registration' ){
		var days = ('0' + setDate.getDate()).slice(-2),
			month = ('0' + (setDate.getMonth() + 1)).slice(-2),
			year = setDate.getFullYear()

		return days + '.' + month + '.' + year
	}
}
function toKeyboardLayout(str, lang) {
	var newStr = str.split('') // делаем массив из заданной строки 

	for ( i in newStr ){
		if ( lang == 'en' ){
			var letterIndex = rusLetters.sml.indexOf(newStr[i]) // индекс нашей мал. буквы в массиве

			if ( letterIndex >= 0 ){ // если есть то изменяем новую строку
				newStr[i] = engLetters.sml[letterIndex]
			}

			if ( letterIndex == -1 ) { // если нет, то ищем в массиве больших букв 
				letterIndex = rusLetters.bgl.indexOf(newStr[i]) // индекс нашей бол. буквы в массиве
				newStr[i] = engLetters.bgl[letterIndex]
				// если тоже нет, тогда не изменяем вообще
				if ( letterIndex == -1 ) newStr[i] = str[i]
			} 
		}
        // повторяем только если lang == 'ru'
		if ( lang == 'ru' ){
			var letterIndex = engLetters.sml.indexOf(newStr[i])

			if ( letterIndex >= 0 ){
				newStr[i] = rusLetters.sml[letterIndex]
			}

			if ( letterIndex == -1 ) {
				letterIndex = engLetters.bgl.indexOf(newStr[i])
				newStr[i] = rusLetters.bgl[letterIndex]

				if ( letterIndex == -1 ) newStr[i] = str[i]
			}
		}
	}

	newStr = newStr.join('')
	return newStr
}
/*
	АРГУМЕНТЫ:
	1. input - вводимый инпут
	2. config - данные для шапки
	3. data - допустим данные наших работников
	4. tableToChange - какую таблицу очищать
*/

function dataSearch(config, data, tableToChange){

	var tableBox = tableToChange.parentNode // наш див
	var input = tableBox.querySelector('.table-search')
	input.parentNode.querySelector('span').innerText = '' // убираем текст со спана

	tableToChange.innerHTML = '' // убираем таблицу

	// СОЗДАЕМ ИНДЕКС ДЛЯ РАБОТЫ С ОПРЕДЕЛЕННЫМИ ДАННЫМИ ОПРЕДЕЛЕННОЙ ТАБЛИЦЫ
	tableIndex = tableArray.indexOf(tableBox)

	var searchValues = [] // Элементы в fields
	var paramIndex = 0
	// БЕРЕМ ВСЕ value У ДАННЫХ ШАПКИ И ВСЕ КИДАЕМ В searchValues 
	// можно конечно просто прировнять, а потом удалить '_index', но
	// если у нас будет несколько элементов которые мы не должны брать?
	for ( i in config.columns ){
		// сюда ↓ добавляем элементы которые не нужно добавлять
		if ( config.columns[i].value != '_index' ){
			searchValues[paramIndex] = config.columns[i].value
			paramIndex++
		}
	}	
	// ЕСЛИ ЕСТЬ fields и он заполнен норм данными
	if ( config.search?.fields ){
		if ( config.search.fields.length > 0 &&

			 config.search.fields[0] !== undefined &&
			 config.search.fields[0] !== null &&
			 config.search.fields[0] !== false &&
			 config.search.fields[0] !== true &&
			 config.search.fields[0] !== [] ){

			// приравниваем searchValues до fields
			searchValues = config.search.fields
		}
	}

	data = [] // очищаем дата чтобы потом заполнить
	onSearch[tableIndex] = true // мы в поисках

	// ФИЛЬТРЫ
	if ( config.search?.filters ){
		data = defaultArrays[tableIndex].filter((el) => {
		  	return searchValues.filter((key) => {
		    	return config.search.filters.filter((sf) => {
		    		// На всякий случай переводим свойство в строку
		    		return sf(el[key].toString()).includes( sf(input.value) )
			    }).length
			}).length
		})

		defaultSeacrhedData[tableIndex] = [ ...data ] // делаем дефолтный найденый дата
	}

	// ЕСЛИ НЕ НАШЛО ПО ФИЛЬТРАМ (или их нет)
	if ( data.length == 0 ){

		data = defaultArrays[tableIndex].filter((el) => {
			return searchValues.filter((key) => {
				return el[key].toString().includes(input.value)
			}).length
		})
		
		defaultSeacrhedData[tableIndex] = [ ...data ] // делаем дефолтный найденый дата
	}
	// ЕСЛИ НЕ НАШЛО
	if ( data.length == 0 ){
		input.parentNode.querySelector('span').innerText = 'Ничего не найдено'  // добавляем текст до спана
		onSearch[tableIndex] = false // ничего не нашли
		data = [ ...defaultArrays[tableIndex] ] 
	}

	// СОХРАНЯЕМ СОРТИРОВКУ
	saveSort(sortedColumn, data)
	drawTable(config, data)
}

function saveSort(column, data){

	if ( toSort[tableIndex] == 1 ){
		data.sort( (a, b) => b[column.value] > a[column.value] ? 1 : -1  )
	}
	if ( toSort[tableIndex] == 2 ){
		data.sort( (a, b) => b[column.value] < a[column.value] ? 1 : -1  )
	}
	if ( toSort[tableIndex] == 3 ){
			
		toSort[tableIndex] = 0
		if ( onSearch[tableIndex] == false ){ // если мы ничего не нашли или не искали
			data = [ ...defaultArrays[tableIndex] ]
		}
		else { // если нашли
			data = [ ...defaultSeacrhedData[tableIndex] ]
		}
	}
}
/*
	АРГУМЕНТЫ:
	1. config - данные для шапки
	2. data - допустим данные наших работников
	3. column - для понимания на какую колонку мы будем ориентироваться при сортировке
	4. tableToChange - какую таблицу очищать
*/

function sortTable(config, data, column, tableToChange) {
	
		var tableBox = tableToChange.parentNode // наш див
		tableToChange.innerHTML = '' // убираем таблицу

		// СОЗДАЕМ ИНДЕКС ДЛЯ РАБОТЫ С ОПРЕДЕЛЕННЫМИ ДАННЫМИ ОПРЕДЕЛЕННОЙ ТАБЛИЦЫ
		tableIndex = tableArray.indexOf(tableBox)
		sortedColumn = column

		// В том случае если мы ищем
		// Чтобы при сортировке, когда toSort == 3 присваивался дефолтный массив именно с найденных элементов
		if ( toSort[tableIndex] == 0 && onSearch[tableIndex] == true ){
			defaultSeacrhedData[tableIndex] = [ ...data ]
		}

		toSort[tableIndex]++

		if ( toSort[tableIndex] == 1 ){
			data.sort( (a, b) => b[column.value] > a[column.value] ? 1 : -1  )
		}
		if ( toSort[tableIndex] == 2 ){
			data.sort( (a, b) => b[column.value] < a[column.value] ? 1 : -1  )
		}
		if ( toSort[tableIndex] == 3 ){
				
			toSort[tableIndex] = 0
			if ( onSearch[tableIndex] == false ){ // если мы ничего не нашли или не искали
				data = [ ...defaultArrays[tableIndex] ]
			}
			else { // если нашли
				data = [ ...defaultSeacrhedData[tableIndex] ]
			}
		}
		drawTable(config, data) // Делаем таблицу
	}

function drawTable(config, data){

	// СОЗДАЕМ ТАБЛИЦУ
	var tableName = config.parent
	var tableDiv = document.querySelector(tableName) // наш див
	var table = tableDiv.querySelector('.jstable')

	var index = 0 // для id (будет увеличиваться с каждой строкой)

	var thead = document.createElement('thead'), 
	    tbody = document.createElement('tbody'),
	    trHead = document.createElement('tr') // tr для шапки таблицы (семантическое значение)

	for ( let col of config.columns ){ // тут берем объекты в config.columns
    	var th
    	th = document.createElement('th')
    	th.className = 'jstd-and-th'
    	th.innerText = col.title
    	
    	// Создаем кнопки сортировки
    	if ( col.sortable == true ){
			let btn = document.createElement('button')
			btn.className = 'sort-btn'
			let i = document.createElement('i')
			i.className = 'fas fa-sort'
			btn.appendChild(i)
			th.appendChild(btn)
			
			// МЕНЯЕМ КНОПКУ
			if ( sortedColumn == col ){
				if ( toSort[tableIndex] == 1 ){
					i.className = 'fas fa-sort-up'
				}
				if ( toSort[tableIndex] == 2 ){
					i.className = 'fas fa-sort-down'
				}
				if ( toSort[tableIndex] == 3 ){
					i.className = 'fas fa-sort'
				}
			}
			btn.onclick = () => {
				sortTable(config, data, col, table)
			}
    	}
    	if ( col.type == 'number' ){
    		th.className = 'align-right jstd-and-th'
    	}

    	trHead.appendChild(th) // <th> => <tr>
    }

    // Действия
    if ( config.actionButtons == true){
    	var th = document.createElement('th')
	    th.className = 'jstd-and-th'
	    th.innerText = 'Действия'
	    trHead.appendChild(th)
    }

    for ( var dataObj = 0; dataObj < data.length; dataObj++ ){
    	var trBody
    	trBody = document.createElement('tr')
    	index++

    	for ( var configObj = 0; configObj < config.columns.length; configObj++ ){
    		var td
    		td = document.createElement('td')
    		td.className = 'jstd-and-th'

    		var configValue = config.columns[configObj].value // наш value в config'e
    		td.innerText = data[dataObj][configValue] // через value ↑ находим свойство в data и берем ее значение
    		if ( configValue == '_index' ){ 
    			td.innerText = index
    			td.className = 'id jstd-and-th'
    		}

    		var type = config.columns[configObj].type // берем type у значения свойства
    		if ( type == 'number' ){
    			td.className = 'align-right jstd-and-th'
    		}
    		// Для аватаров
    		if ( type == 'image' ){
    			td.innerText = ''
    			var image
    			image = document.createElement('img')
    			image.src = data[dataObj][configValue]
    			td.appendChild(image)
    		}
    		// берем свойства у каждого юзера
    		var directDataProperties = Object.keys(data[dataObj])

    		if ( typeof configValue === 'function' ){
 				
				data[dataObj][configValue] = data[dataObj][directDataProperties[configObj]] // для правильной сортировки
    			td.innerText = config.columns[configObj].value(data[dataObj])
    		}
    		trBody.appendChild(td) // <td> => <tr>
    	}
    	
    	// Действия
    	if ( config.actionButtons == true ){
    		let directId = data[dataObj].id

	    	let td = document.createElement('td')

	    	let deleteButton = document.createElement('button') // Удалить
	    	deleteButton.innerText = 'Удалить'
		    deleteButton.className = 'action-button del-btn'

		    deleteButton.onclick = () => {
		    	deleteData(directId, config.apiUrl, config, data, table)
		    }
		    
		    td.className = 'jstd-and-th align-right'

	    	td.appendChild(deleteButton)
			trBody.appendChild(td)
    	}

    	tbody.appendChild(trBody) // <td> => <tbody>
    }

    // CSS
    thead.className = 'jsthead'
    tbody.className = 'jstbody'

    // КОНСТРУИРУЕМ ТАБЛИЦУ
	thead.appendChild(trHead)    // <tr> => <thead>
	table.appendChild(thead) // <thead> => <table>
	table.appendChild(tbody) // <tbody> => <table>

}
async function deleteData(id, url, config, data, tableToChange){

		tableToChange.innerHTML = ''
		var tableBox = tableToChange.parentNode // наш див

		// СОЗДАЕМ ИНДЕКС ДЛЯ РАБОТЫ С ОПРЕДЕЛЕННЫМИ ДАННЫМИ ОПРЕДЕЛЕННОЙ ТАБЛИЦЫ
		tableIndex = tableArray.indexOf(tableBox)

		await fetch(url + '/' + id, {
			method: 'delete'
		})
		await getApi(url)
			.then( newData => data = newData )

		defaultArrays[tableIndex] = [ ...data ]

		// чтобы сохраняло и сортировку, и поиск при удалении
		// тут есть и сохранение сортировки и рисование таблички. Удобно получилось
		dataSearch(config, data, tableToChange)
}
async function getApi(url){
	var request = await fetch(url)
	var response = await request.json()

	return response
}
async function dataTable(config, data) {
	
	if ( data === undefined ){
		await getApi(config.apiUrl)
			.then( apiData => data = apiData )
	}

	var tableName = config.parent
	var tableDiv = document.querySelector(tableName) // наш див

	var table = document.createElement('table') // таблица
	table.className = 'jstable'

	// ДОБАВЛЯЕМ INPUT ДЛЯ ПОИСКА
	if ( config.search == true || config.search?.fields || config.search?.filters ){
		var inputBox = document.createElement('div')
		var nothingFound = document.createElement('span') // Для текста ничего не найдено
		var searchInput = document.createElement('input')

		inputBox.className = 'input-box'

		searchInput.type = 'text'
		searchInput.placeholder = 'Search...'
		searchInput.className = 'table-search'

		inputBox.appendChild(searchInput)
		inputBox.appendChild(nothingFound)
		tableDiv.appendChild(inputBox)

		searchInput.oninput = () => {
			dataSearch(config, data, table)
		} 
	}

	tableDiv.appendChild(table) // <table> => див

	// ДЕЛАЕМ МАССИВЫ С ДАННЫМИ ПРО КАЖДУЮ ТАБЛИЦУ
	tableArray.push(tableDiv)

	toSort[tableIteration] = 0
	defaultArrays[tableIteration] = [ ...data ]
	onSearch[tableIteration] = false

	// РИСУЕМ ТАБЛИЦУ
	drawTable(config, data, table)

	tableIteration++
}
dataTable(config_1)
dataTable(config_2)