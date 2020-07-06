//----------------------------------------------------
const config_1 = { // пишу через _ потому что уже есть такой массив
  parent: '#usersTable',
  columns: [
    {title: '№', value: '_index'},
    {title: 'Имя', value: 'name', sortable: true},
    {title: 'Фамилия', value: 'surname', sortable: true},
    {title: 'Возраст', value: 'age', type: 'number', sortable: true}
  ]
};

const users = [
  {id: 30050, name: 'Петя', surname: 'Петров', age: 12},
  {id: 30051, name: 'Вася', surname: 'Васечкин', age: 25},
  {id: 30052, name: 'Ярик', surname: 'Ясечкин', age: 17},
  {id: 30053, name: 'Дима', surname: 'Димочкин', age: 15}
];

////////////

const config_2 = {
	parent: '#myTable',
	columns: [
		{title: 'Num', value: '_index'},
		{title: 'Job', value: 'job', type: 'number'},
		{title: 'Experience', value: 'exp', sortable: true}
	]
}
const workers = [
	{i: 123, job: 'sysAdmin', exp: 'middle'},
	{id: 124, job: 'fullstack', exp: 'senior'},
	{id: 125, job: 'front-end', exp: 'junior'}
]
//----------------------------------------------------
var toSort = [], // Для сортирвки каждой таблицы
    toCopy = [], // Для копирования дефолтного массива каждой таблицы
    defaultArray = [], // Хранение дефолтных массивов
    tableArray = [] // Хранение таблиц

var tableIndex, // Индекс для работы с определенной таблицы
    sortedColumn // Запоминаем сортируешуюся колонку

var toStopPush = true // Для остановки push'а таблиц в массив

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

		if ( toCopy[tableIndex] == true ){
			defaultArray[tableIndex] = [ ...data ]
			toCopy[tableIndex] = false
		}

		toSort[tableIndex]++

		if ( toSort[tableIndex] == 1 ){
			data.sort( (a, b) => b[column.value] > a[column.value] ? 1 : -1 )
		}
		if ( toSort[tableIndex] == 2 ){
			data.sort( (a, b) => b[column.value] < a[column.value] ? 1 : -1 )
		}
		if ( toSort[tableIndex] == 3 ){
			
			toSort[tableIndex] = 0
			toCopy[tableIndex] = true
			data = defaultArray[tableIndex]
		}

		toStopPush = false // останавливаем push()
		
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

    for ( var col of config.columns ){ // тут берем объекты в config.columns
    	var th
    	th = document.createElement('th')
    	th.className = 'jstd-and-th' // CSS 
    	th.innerText = col.title
    	
    	if ( col.sortable == true ){
			btn = document.createElement('button')
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

		for ( i in tableArray ){
			toSort[i] = 0
			toCopy[i] = true
		}
	}
}
dataTable(config_1, users)
dataTable(config_2, workers)