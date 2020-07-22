//----------------------------------------------------
const config_1 = { // пишу через _ потому что уже есть такой массив
  parent: '#usersTable',
  columns: [
    {title: '№', value: '_index'},
    {title: 'Имя', value: 'name', sortable: true},
    {title: 'Фамилия', value: 'surname', sortable: true},
    {title: 'Возраст', value: 'age', type: 'number', sortable: true}
  ],
  search: {
  	fields: ['name', 'age'],
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
  }
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
		{title: 'Num', value: '_index'},
		{title: 'Name', value: 'name', type: 'number'},
		{title: 'Experience', value: 'exp', sortable: true}
	],
	search: {
		fields: ['name']
	}
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
    defaultSeacrhedData = [] // Дефолтный массив для найденных элементов

var toStopPush = true, // Для остановки push'а таблиц в массив
    tableIteration = 0, // это индексы для хранения дефолтных массивов
    tableIndex, // Индекс для работы с определенной таблицы
    onSearch = [] // Для понятия нашло ли элементы

// ДЛЯ searchTable 
var focused = false // Для фокуса на инпуте
var inputValue = []

// ДЛЯ renderTable
var toSort = [], // Для сортирвки каждой таблицы
    tableArray = [] // Хранение таблиц

var sortedColumn // Запоминаем сортируешуюся колонку

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
	1. input - инпут в который мы вводим
	2. config - данные для шапки
	3. data - допустим данные наших работников
	4. tableToChange - какую таблицу очищать
*/

function dataSearch(input, config, data, tableToChange){
	input.oninput = () => {

		tableToChange.innerHTML = '' // убираем таблицу

		var searchValues = [] // Элементы в fields

		// СОЗДАЕМ ИНДЕКС ДЛЯ РАБОТЫ С ОПРЕДЕЛЕННЫМИ ДАННЫМИ ОПРЕДЕЛЕННОЙ ТАБЛИЦЫ
		tableIndex = tableArray.indexOf(tableToChange)
		inputValue[tableIndex] = input.value // это мы подставим для новосозданного инпута

		focused = true // делаем фокус
		toStopPush = false // останавливаем push таблиц

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
			    		return sf(el[key].toString()).includes( sf(inputValue[tableIndex]) )
				    }).length
				}).length
			})

			defaultSeacrhedData[tableIndex] = [ ...data ] // делаем дефолтный найденый дата
		}

		// ЕСЛИ НЕ НАШЛО ПО ФИЛЬТРАМ (или их нет)
		if ( data.length == 0 ){

			data = defaultArrays[tableIndex].filter((el) => {
				return searchValues.filter((key) => {
					return el[key].toString().includes(inputValue[tableIndex])
				}).length
			})
			
			defaultSeacrhedData[tableIndex] = [ ...data ] // делаем дефолтный найденый дата
		}
		// ЕСЛИ НЕ НАШЛО
		if ( data.length == 0 ){
			
			onSearch[tableIndex] = false // ничего не нашли
			data = [ ...defaultArrays[tableIndex] ] 
		}

		// ОСТАВЛЯЕМ СОРТИРОВКУ
		keepSorting(sortedColumn, data, onSearch[tableIndex])
		dataTable(config, data)
	}
}
function keepSorting(column, data, searching){
	if ( toSort[tableIndex] == 1 ){
		data.sort( (a, b) => b[column.value] > a[column.value] ? 1 : -1 )
	}
	if ( toSort[tableIndex] == 2 ){
		data.sort( (a, b) => b[column.value] < a[column.value] ? 1 : -1 )
	}
	if ( toSort[tableIndex] == 3 ){
			
		toSort[tableIndex] = 0
		if ( searching == false ){ // если мы ничего не нашли 
			data = [ ...defaultArrays[tableIndex] ]
		}
		else { // если нашли
			data = [ ...defaultSeacrhedData[tableIndex] ]
		}
	}
}
/*
	АРГУМЕНТЫ:
	1. button - кнопка на которую мы нажали
	2. config - данные для шапки
	3. data - допустим данные наших работников
	4. column - для понимания на какую колонку мы будем ориентироваться при сортировке
	5. tableToChange - какую таблицу очищать
*/

function renderTable(btn, config, data, column, tableToChange) {
	btn.onclick = () => {

		tableToChange.innerHTML = '' // убираем таблицу

		// СОЗДАЕМ ИНДЕКС ДЛЯ РАБОТЫ С ОПРЕДЕЛЕННЫМИ ДАННЫМИ ОПРЕДЕЛЕННОЙ ТАБЛИЦЫ
		tableIndex = tableArray.indexOf(tableToChange)

		sortedColumn = column

		// В том случае если мы ищем
		// Чтобы при сортировке, когда toSort == 3 присваивался дефолтный массив именно с найденных элементов
		if ( toSort[tableIndex] == 0 && onSearch[tableIndex] == true ){
			defaultSeacrhedData[tableIndex] = [ ...data ]
		}

		toSort[tableIndex]++

		// Использую keepSorting, а оно не приравнивает дата, когда toSort[tableIndex] == 3
		// Не делает data = [ ...defaultArrays[tableIndex] ]
		if ( toSort[tableIndex] == 1 ){
			data.sort( (a, b) => b[column.value] > a[column.value] ? 1 : -1 )
		}
		if ( toSort[tableIndex] == 2 ){
			data.sort( (a, b) => b[column.value] < a[column.value] ? 1 : -1 )
		}
		if ( toSort[tableIndex] == 3 ){
				
			toSort[tableIndex] = 0
			if ( onSearch[tableIndex] == false ){ // если мы ничего не нашли 
				data = [ ...defaultArrays[tableIndex] ]
			}
			else { // если нашли
				data = [ ...defaultSeacrhedData[tableIndex] ]
			}
		}

		toStopPush = false // останавливаем push таблиц
		focused = false // убираем фокус на инпуте для поиска
		
		dataTable(config, data) // Делаем таблицу
 	}
}

function dataTable(config, data) {

	// СОЗДАЕМ ТАБЛИЦУ
	var tableName = config.parent
	var table = document.getElementById(tableName.slice(1)) // наш див

	var index = 0 // для id (будет увеличиваться с каждой строкой)

	var tableElem = document.createElement('table'), // таблица
	    thead = document.createElement('thead'), 
	    tbody = document.createElement('tbody'),
	    trHead = document.createElement('tr') // tr для шапки таблицы (семантическое значение)

	// ДОБАВЛЯЕМ INPUT ДЛЯ ПОИСКА
	if ( config.search == true || config.search?.fields || config.search?.filters ){
		var searchInput = document.createElement('input')
		searchInput.type = 'text'
		// Заполняем массив введенных данных ''   
		if ( inputValue[tableIndex] === undefined ){
			inputValue[tableIndex] = ''
		}
		searchInput.value = inputValue[tableIndex]
		searchInput.className = 'table-search'
		table.appendChild(searchInput)

		if ( focused == true ){
			searchInput.focus()
		}

	    dataSearch(searchInput, config, data, table)
	}

	for ( var col of config.columns ){ // тут берем объекты в config.columns
    	var th
    	th = document.createElement('th')
    	th.className = 'jstd-and-th' // CSS 
    	th.innerText = col.title
    	
    	// Создаем кнопки сортировки
    	if ( col.sortable == true ){
			btn = document.createElement('button')
			btn.className = 'sort-btn'
			i = document.createElement('i')
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

			renderTable(btn, config, data, col, table)

    	}
    	if ( col.type == 'number' ){
    		th.className = 'align-right jstd-and-th'
    	}

    	trHead.appendChild(th) // <th> => <tr>
    }

    for ( var dataObj = 0; dataObj < data.length; dataObj++ ){
    	var trBody
    	trBody = document.createElement('tr')
    	index++

    	for ( var configObj = 0; configObj < config.columns.length; configObj++ ){
    		var td
    		td = document.createElement('td')
    		td.className = 'jstd-and-th' // CSS 

    		var value = config.columns[configObj].value // наш value в config'e
    		td.innerText = data[dataObj][value] // через value ↑ находим свойство в data и берем ее значение
    		if ( value == '_index' ){ 
    			td.innerText = index
    			td.className = 'id jstd-and-th' // CSS 
    		}

    		var type = config.columns[configObj].type // берем type у значения свойства
    		if ( type == 'number' ){
    			td.className = 'align-right jstd-and-th' // CSS 
    		}

    		trBody.appendChild(td) // <td> => <tr>
    	}
    	tbody.appendChild(trBody) // <td> => <tbody>
    }

    // CSS
    tableElem.className = 'jstable'
    thead.className = 'jsthead'
    tbody.className = 'jstbody'

    // КОНСТРУИРУЕМ ТАБЛИЦУ
	thead.appendChild(trHead)    // <tr> => <thead>
	tableElem.appendChild(thead) // <thead> => <table>
	tableElem.appendChild(tbody) // <tbody> => <table>
	table.appendChild(tableElem) // <table> => див

	// ДЕЛАЕМ МАССИВ С ДАННЫМИ ПРО КАЖДУЮ ТАБЛИЦУ
	if ( toStopPush == true ){
		tableArray.push(table)

		toSort[tableIteration] = 0
		defaultArrays[tableIteration] = [ ...data ]
		onSearch[tableIteration] = false
	}
	tableIteration++
}
dataTable(config_1, users)
dataTable(config_2, workers)