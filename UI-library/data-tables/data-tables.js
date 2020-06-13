//----------------------------------------------------
const config_1 = { // пишу через _ потому что уже есть такой массив
  parent: '#usersTable',
  columns: [
    {title: '№', value: '_index'},
    {title: 'Имя', value: 'name'},
    {title: 'Фамилия', value: 'surname'},
    {title: 'Возраст', value: 'age', type: 'number'}
  ]
};

const users = [
  {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
  {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
];

////////////

const config_2 = {
	parent: '#myTable',
	columns: [
		{title: 'Num', value: '_index'},
		{title: 'Job', value: 'job', type: 'number'},
		{title: 'Experience', value: 'exp'}
	]
}
const workers = [
	{i: 123, job: 'sysAdmin', exp: 'middle'},
	{id: 124, job: 'fullstack', exp: 'senior'}
]
//----------------------------------------------------

function dataTable(config, data) {
	var tableName = config.parent
	var table = document.getElementById(tableName.slice(1)) // наш див

	var index = 0 // для id

	var tableElem = document.createElement('table'), // таблица
	    thead = document.createElement('thead'), 
	    tbody = document.createElement('tbody'),
	    trHead = document.createElement('tr') // tr для шапки таблицы (семантическое значение)

    for ( var col of config.columns ){ // тут берем объекты в config.columns
    	var th
    	th = document.createElement('th')
    	th.className = 'jstd-and-th' // CSS 
    	th.innerText = col.title
    	
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

    // КОНСРТУИРУЕМ ТАБЛИЦУ
	thead.appendChild(trHead)    // <tr> => <thead>
	tableElem.appendChild(thead) // <thead> => <table>
	tableElem.appendChild(tbody) // <tbody> => <table>
	table.appendChild(tableElem) // <table> => див
}
dataTable(config_1, users)
dataTable(config_2, workers)