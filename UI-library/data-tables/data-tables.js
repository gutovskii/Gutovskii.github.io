//----------------------------------------------------
const config_1 = {
  parent: '#usersTable',
  columns: [
    {title: '№', value: '_index'},
    {title: 'Дата регистрации', extraValue: 'createdAt', value: (user) => calculateData(user.createdAt, 'registration'), tojson: true, sortable: true, editable: true},
    {title: 'Имя', value: 'name', sortable: true, editable: true},
    {title: 'Аватар', value: 'avatar', type: 'avatar', editable: true},
    {title: 'Фамилия', value: 'surname', sortable: true, editable: true},
    {title: 'Возраст', extraValue: 'birthday', value: (user) => calculateData(user.birthday, 'age'), tojson: true, sortable: true, type: 'number', editable: true}
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
	    {title: 'Дата регистрации', extraValue: 'createdAt', value: (user) => calculateData(user.createdAt, 'registration'), sortable: true},
	    {title: 'Имя', value: 'name', sortable: true, editable: true},
	    {title: 'Аватар', value: 'avatar', type: 'avatar', editable: true},
	    {title: 'Фамилия', value: 'surname', sortable: true},
	    {title: 'Возраст', extraValue: 'birthday', value: (user) => calculateData(user.birthday, 'age'), sortable: true, type: 'number', editable: true}
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
let engLetters = {
	   sml: [ "`","q","w","e","r","t","y","u","i",
	     "o","p","[","]","a","s","d","f",
	     "g","h","j","k","l",";","'","z",
	     "x","c","v","b","n","m",",","." ],

	   bgl: [ '~','Q','W','E','R','T','Y','U','I',
	     'O','P','{','}','A','S','D','F',
	     'G','H','J','K','L',':','"','Z',
	     'X','C','V','B','N','M','<','>' ]
}

let rusLetters = {
	   sml: [ "ё","й","ц","у","к","е","н","г","ш",
	     "щ","з","х","ъ","ф","ы","в","а",
	     "п","р","о","л","д","ж","э","я",
	     "ч","с","м","и","т","ь","б","ю" ],

	   bgl: [ 'Ё','Й','Ц','У','К','Е','Н','Г','Ш',
	     'Щ','З','Х','Ъ','Ф','Ы','В','А',
	     'П','Р','О','Л','Д','Ж','Э','Я',
	     'Ч','С','М','И','Т','Ь','Б','Ю' ]
}
let defaultArrays = [], // Для хранения дефолтных массивов
    defaultSeacrhedData = [], // Дефолтный массив для найденных элементов
   	onSearch = [], // Для понятия нашло ли элементы
   	tableArray = [] // Хранение таблиц

let tableIteration = 0, // индекс для записи данных определенной таблицы
    tableIndex // Индекс для работы с определенной таблицы

// ДЛЯ renderTable
let toSort = [], // Для сортирвки каждой таблицы
    sortedColumn // Запоминаем сортируешуюся колонку

function calculateData(date, toCalculate){
	let nowadayTime = new Date()
	let setDate = new Date(date)

	if ( toCalculate == 'age' ){
		let age = (nowadayTime - setDate) / 1000 / 60 / 60 / 24 / 365
		let lastNumeral = Math.floor(age) % 10 // последняя цифра в числе
		let ymw // типа year month week

		if ( Math.floor(age) >= 1 ){
			if ( lastNumeral == 1 ) ymw = 'год'
			if ( lastNumeral > 1 && lastNumeral < 5 ) ymw = 'года'
			if ( lastNumeral >= 5 || lastNumeral == 0 ) ymw = 'лет'
		}
		if ( Math.floor(age) === 0 ){
			age *= 12
			lastNumeral = Math.floor(age) % 10
			if ( lastNumeral == 1 ) ymw = 'месяц'
			if ( lastNumeral > 1 && lastNumeral < 5 ) ymw = 'месяца'
			if ( lastNumeral >= 5 || (Math.floor(age) >= 10 && Math.floor(age) <= 20) ) ymw = 'месяцев'
		    
			if ( Math.floor(age) === 0 ) {
				age *= 4
				lastNumeral = Math.floor(age) % 10
				if ( lastNumeral == 1 ) ymw = 'неделя'
				if ( lastNumeral > 1 ) ymw = 'недели'
			}
		}
		let result = Math.floor(age) + ' ' + ymw
		if ( result == 'NaN undefined'){
			return ''
		}else{
			return result
		}
	}
	if ( toCalculate == 'registration' ){
		let days = ('0' + setDate.getDate()).slice(-2),
			month = ('0' + (setDate.getMonth() + 1)).slice(-2),
			year = setDate.getFullYear()
		let result = days + '.' + month + '.' + year
		if ( result == 'aN.aN.NaN' ){
			return ''
		}else{
			return result
		}
	}
}
function toKeyboardLayout(str, lang) {
	let newStr = str.split('') // делаем массив из заданной строки 

	for ( i in newStr ){
		if ( lang == 'en' ){
			let letterIndex = rusLetters.sml.indexOf(newStr[i]) // индекс нашей мал. буквы в массиве

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
			let letterIndex = engLetters.sml.indexOf(newStr[i])

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

	let tableBox = tableToChange.parentNode // наш див
	let input = tableBox.querySelector('.table-search')
	let nothingFound = input.parentNode.querySelector('span')
	nothingFound.innerText = '' // убираем текст со спана

	tableToChange.innerHTML = '' // очищаем таблицу

	// СОЗДАЕМ ИНДЕКС ДЛЯ РАБОТЫ С ОПРЕДЕЛЕННЫМИ ДАННЫМИ ОПРЕДЕЛЕННОЙ ТАБЛИЦЫ
	tableIndex = tableArray.indexOf(tableBox)

	let searchValues = [] // Элементы в fields
	let paramIndex = 0
	// БЕРЕМ ВСЕ value У ДАННЫХ ШАПКИ И ВСЕ КИДАЕМ В searchValues
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
			 config.search.fields[0] !== true ){

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
		nothingFound.innerText = 'Ничего не найдено'  // добавляем текст до спана
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
	
	let tableBox = tableToChange.parentNode // наш див
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
function createTopMenu(tableDiv, table, config, data){
	if ( config.search == true || config.search?.fields || config.search?.filters ){

		let inputBox = document.createElement('div')
		let nothingFound = document.createElement('span') // Для текста ничего не найдено
		let searchInput = document.createElement('input')

		inputBox.className = 'input-box'

		searchInput.type = 'text'
		searchInput.placeholder = 'Search...'
		searchInput.className = 'table-search'
		inputBox.appendChild(searchInput) // записую здесь для последовательновсти записи элементов

		for ( col of config.columns ){
			if ( col.editable === true ){

				let addButton = document.createElement('button') // Кнопка добавить
				addButton.innerText = 'Добавить'
				addButton.className = 'action-button add-btn'
				addButton.dataset.target = 'tableModal'
				addButton.onclick = () => {
					makePostModal(config, data, table)
					openModal(addButton)
				}

				inputBox.appendChild(addButton)
				break
			}
		}

		inputBox.appendChild(nothingFound)
		tableDiv.prepend(inputBox)

		searchInput.oninput = () => {
			dataSearch(config, data, table)
		}
	}
}
function drawTable(config, data){

	// СОЗДАЕМ ТАБЛИЦУ
	let tableName = config.parent
	let tableDiv = document.querySelector(tableName) // наш див
	let table = tableDiv.querySelector('.jstable')

	let index = 0 // для id (будет увеличиваться с каждой строкой)

	let thead = document.createElement('thead'), 
	    tbody = document.createElement('tbody'),
	    trHead = document.createElement('tr') // tr для шапки таблицы (семантическое значение)

	for ( let col of config.columns ){ // тут берем объекты в config.columns
    	let th
    	th = document.createElement('th')
    	th.className = 'jstd-and-th'
    	th.innerText = col.title
    	
    	// Создаем кнопки сортировки
    	if ( col.sortable == true ){
			let sortBtn = document.createElement('button')
			sortBtn.className = 'sort-btn'
			let i = document.createElement('i')
			i.className = 'fas fa-sort'
			sortBtn.appendChild(i)
			th.appendChild(sortBtn)
			
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
			sortBtn.onclick = () => {
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
    	let th = document.createElement('th')
	    th.className = 'jstd-and-th'
	    th.innerText = 'Действия'
	    trHead.appendChild(th)
    }

    for ( let dataObj = 0; dataObj < data.length; dataObj++ ){
    	let trBody
    	trBody = document.createElement('tr')
    	index++

    	for ( let configObj = 0; configObj < config.columns.length; configObj++ ){
    		let td
    		td = document.createElement('td')
    		td.className = 'jstd-and-th'

    		let columnValue = config.columns[configObj].value // наш value в config'e
    		td.innerText = data[dataObj][columnValue] // через value ↑ находим свойство в data и берем ее значение
    		if ( columnValue == '_index' ){ 
    			td.innerText = index
    			td.className = 'id jstd-and-th'
    		}

    		let type = config.columns[configObj].type // берем type у значения свойства
    		if ( type == 'number' ){
    			td.align = 'right'
    		}
    		// Для аватаров
    		if ( type == 'avatar' ){
    			td.innerText = ''
    			let avatar
    			let avaDiv
    			avaDiv = document.createElement('div')
    			avaDiv.className = 'avatar-box'
    			avatar = document.createElement('img')
    			avatar.src = data[dataObj][columnValue]
    			avaDiv.appendChild(avatar)
    			td.appendChild(avaDiv)
    		}
    		// берем свойства у каждого юзера
    		var directDataProperties = Object.keys(data[dataObj])
    		if ( typeof columnValue === 'function' ){
				data[dataObj][columnValue] = data[dataObj][directDataProperties[configObj]] // для правильной сортировки
    			td.innerText = config.columns[configObj].value(data[dataObj])
    		}
    		trBody.appendChild(td) // <td> => <tr>
    	}
    	
    	// Действия
    	if ( config.actionButtons == true ){
    		let directId = data[dataObj].id
    		let indexForPut = index
	    	let td = document.createElement('td')

	    	let deleteButton = document.createElement('button') // Удалить
	    	deleteButton.innerText = 'Удалить'
		    deleteButton.className = 'action-button del-btn'
		    let putButton = document.createElement('button') // Редактировать
		    putButton.innerText = 'Редактировать'
		    putButton.className = 'action-button edit-btn'
		    putButton.dataset.target = 'tableModal'

		    deleteButton.onclick = () => {
		    	deleteData(directId, config.apiUrl, config, data, table)
		    }
		    putButton.onclick = () => {
		    	makePutModal(directId, indexForPut, directDataProperties, config, data, table)
		    	openModal(putButton)
		    }
		    
		    td.align = 'right'
		    td.className = 'jstd-and-th'

	    	td.appendChild(deleteButton)
	    	td.appendChild(putButton)
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
function makePutModal(id, index, directDataProperties, config, data, tableToChange){

	let modalHeadline = document.querySelector('.dataModal-headline')
	let modalInputBox = document.querySelector('.dataModal-inputbox')
	let modalBtnBox = document.querySelector('.dataModal-btnbox')

	modalHeadline.innerText = 'Изменить пользователя'

	for ( configObj in config.columns ){
		if ( config.columns[configObj].value != '_index' ){

			// make an input
			let input = document.createElement('input')
			input.value = data[index-1][directDataProperties[configObj]]
			input.className = 'dataModal-input'
			input.placeholder = config.columns[configObj].title
			input.dataset.val = config.columns[configObj].value
			if ( typeof config.columns[configObj].value == 'function' ){
				input.dataset.val = config.columns[configObj].extraValue
			}
			modalInputBox.appendChild(input)
		}
	}
	let editInputs = document.querySelectorAll('.dataModal-input')
	let putBtn = document.createElement('button')
	putBtn.innerText = 'Изменить'
	putBtn.className = 'dataModal-btn'
	putBtn.onclick = () => {
		editUser(id, editInputs, config, data, tableToChange)
	}
	modalBtnBox.appendChild(putBtn)
}
function editUser(id, inputs, config, data, tableToChange){

	let unknowUserImg = 'https://cutt.ly/BgHyXI9'

	let editedUser = {}
	let inputIndex = 0, columnIndex = 0
	while(inputIndex < inputs.length && columnIndex < config.columns.length){

		// fill user by inputs
		let inputDatasetVal = inputs[inputIndex].dataset.val
		editedUser[inputDatasetVal] = inputs[inputIndex].value

		if ( config.columns[columnIndex].value == '_index' ){
			columnIndex++
			continue
		}else{
			// date to json
			if ( config.columns[columnIndex].tojson == true && editedUser[inputDatasetVal] != '' ){

				let date = new Date(editedUser[inputDatasetVal])
				editedUser[inputDatasetVal] = date.toJSON()
				if (editedUser[inputDatasetVal] === null) editedUser[inputDatasetVal] = ''
			}
		}
		
		inputIndex++
		columnIndex++
	}
    if (editedUser.avatar == '') editedUser.avatar = unknowUserImg

	putData(id, editedUser, config.apiUrl, config, data, tableToChange)
}
function makePostModal(config, data, tableToChange){

	let modalHeadline = document.querySelector('.dataModal-headline')
	let modalInputBox = document.querySelector('.dataModal-inputbox')
	let modalBtnBox = document.querySelector('.dataModal-btnbox')

	modalHeadline.innerText = 'Добавить пользователя'
	
	// post inputs
	for ( configObj in config.columns ){
		if ( config.columns[configObj].editable === true ){
			
			let columnTitle = config.columns[configObj].title
			
			let input = document.createElement('input')
			input.placeholder = columnTitle
			input.className = 'dataModal-input'
			input.dataset.val = config.columns[configObj].value 
			if ( typeof config.columns[configObj].value == 'function' ){
				input.dataset.val = config.columns[configObj].extraValue 
			}

			modalInputBox.appendChild(input)
		}
	}

	let addInputs = modalInputBox.querySelectorAll('.dataModal-input')
	let acceptBtn = document.createElement('button')
	acceptBtn.innerText = 'Добавить'
	acceptBtn.className = 'dataModal-btn'
	acceptBtn.onclick = () => {
		makeUser(addInputs, config, data, tableToChange)
	}
	modalBtnBox.appendChild(acceptBtn)
}
function makeUser(inputs, config, data, tableToChange){

	let unknowUserImg = 'https://cutt.ly/BgHyXI9'
	
	let newUser = {}
	let inputIndex = 0, columnIndex = 0
	while( inputIndex < inputs.length && columnIndex < config.columns.length ){

		let inputDatasetVal = inputs[inputIndex].dataset.val
		if ( config.columns[columnIndex].value == '_index' ){
			columnIndex++
			continue
		}
		if ( config.columns[columnIndex].editable === undefined ){
			let columnValue = config.columns[columnIndex].value
			let columnExtraValue = config.columns[columnIndex].extraValue
			// у тех кого нету editable делаем пустыми
			if ( typeof columnValue != 'function' ){
				newUser[columnValue] = ''
			}else{
				newUser[columnExtraValue] = ''
			}
		}
		else{
			newUser[inputDatasetVal] = inputs[inputIndex].value
			// date to json
			if (config.columns[columnIndex].tojson == true){

				let date = new Date(newUser[inputDatasetVal])
				newUser[inputDatasetVal] = date.toJSON()
				if (newUser[inputDatasetVal] === null) newUser[inputDatasetVal] = ''
			}
			// если заполнилось, теми данными что editable, то переходим к другому инпуту
			inputIndex++
		}
		columnIndex++
	}
	if (newUser.avatar == '') newUser.avatar = unknowUserImg

	postData(newUser, config.apiUrl, config, data, tableToChange)
}
async function putData(id, user, url, config, data, tableToChange){

	let tableBox = tableToChange.parentNode
	tableIndex = tableArray.indexOf(tableBox)

	await fetch(url + '/' + id, {
		method: 'put',
		body: JSON.stringify(user),
		headers:{
			'Content-type': 'application/json'
		}
	})
	await getApi(url)
		.then( newData => data = newData)

	defaultArrays[tableIndex] = [ ...data ]
	tableToChange.innerHTML = ''

	dataSearch(config, data, tableToChange)
	closeDataModal()
}
async function postData(user, url, config, data, tableToChange){
	
	let tableBox = tableToChange.parentNode
	tableIndex = tableArray.indexOf(tableBox)

	await fetch(url, {
		method: 'post',
		body: JSON.stringify(user),
		headers:{
			'Content-type': 'application/json'
		}
	})
	await getApi(url)
		.then( newData => data = newData )

	defaultArrays[tableIndex] = [ ...data ]
	tableToChange.innerHTML = ''

	dataSearch(config, data, tableToChange)
	closeDataModal()
}
async function deleteData(id, url, config, data, tableToChange){

		let tableBox = tableToChange.parentNode // наш див
		tableIndex = tableArray.indexOf(tableBox)

		await fetch(url + '/' + id, {
			method: 'delete'
		})
		await getApi(url)
			.then( newData => data = newData )

		defaultArrays[tableIndex] = [ ...data ]
		// очищаем таблицу
		tableToChange.innerHTML = ''

		// чтобы сохраняло и сортировку, и поиск при удалении
		// тут есть и сохранение сортировки и рисование таблички. Удобненько получилось
		dataSearch(config, data, tableToChange)
}
async function getApi(url){
	let request = await fetch(url)
	let response = await request.json()
	
	return response
}

async function dataTable(config, data) {
	
	if ( data === undefined ){
		await getApi(config.apiUrl)
			.then( apiData => data = apiData )
	}

	let tableName = config.parent
	let tableDiv = document.querySelector(tableName) // див по айди
	let table = document.createElement('table') // тег таблица
	table.className = 'jstable'
	tableDiv.appendChild(table)

	createTopMenu(tableDiv, table, config, data)

	// ДЕЛАЕМ МАССИВЫ С ДАННЫМИ ПРО КАЖДУЮ ТАБЛИЦУ
	tableArray.push(tableDiv)

	toSort[tableIteration] = 0
	defaultArrays[tableIteration] = [ ...data ]
	onSearch[tableIteration] = false

	drawTable(config, data, table)

	tableIteration++
}
dataTable(config_1)
dataTable(config_2)