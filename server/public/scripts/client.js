//Test Connection
console.log('Connection Established to client.js!');

//Preparing DOM for jquery
$(document).ready(onReady);

function onReady() {
	console.log('jquery working');
	//Get tasks from the server
	receiveTaskFromServer();

	//Create Event Listener to receive a click event
	$('#add-task-btn').on('click', addNewTask);

	//Create Event Listener to delete a task by clicking the x
	$('#tasks-output').on('click', '.delete', deleteTaskOnServer);
	$('#tasks-output').on('click', '.status-field', updateTaskOnServer);

	//Create Event Listner to edit individual content fields
	$('#tasks-output').on('blur', `.task, .description, .location, .due_date`, changeContent);
}

//Get user inputs and store into an object to send to server
function addNewTask( event ) {
    console.log('addNewTask');
    event.preventDefault();
    // get user input & put into an object
    let newTask = {
        task: $('#task-input').val(),
        description: $('#description-input').val(),
        location: $('#location-input').val(),
        date: $('#date-input').val()
    }

    console.log('newTask is', newTask);
    sendTaskToServer(newTask);
}

function clearInputs() {
	$('#task-input').val('');
	$('#description-input').val('');
    $('#location-input').val('');
    $('#date-input').val('');
}

//Function to GET information from the server
function receiveTaskFromServer() {
	fetch('/tasks').then((response) => {
		return response.json();
	}).then((data) => {
		console.log('Tasks from server',data);
		//Render history and answer to DOM
		renderToDOM(data);
	}).catch((error) => {
		console.log('Error:', error);
	});
}

//Function to POST information to the server database
function sendTaskToServer(task) {
	//Send task to server with POST method
	const options = {
		method: 'POST',
		headers: {
    		'Content-Type': 'application/json'
  		},
		body: JSON.stringify(task)
	};

	//Using fetch api to send information to the server
	fetch('/tasks', options).then(response => {
		console.log('sending task to server',response);
		//Get all task from server again after task is added
		clearInputs();
		receiveTaskFromServer();
	}).catch(error => {
  		console.log('Error:', error);
	});
}

//Function to DELETE information on the server database
function deleteTaskOnServer(event) {
	console.log('deleteTaskFromServer');
	let taskId = $(this).attr('data-id');
	console.log('id is:', taskId);

	//Send task to server with POST method
	fetch(`/tasks/${taskId}`, {method: 'DELETE'}).then((response) => {
		console.log('deleting task from server',response);
		receiveTaskFromServer();
	}).catch((error) => {
		console.log('Error:', error);
	});
}

//Function to PUT information on the server database
function updateTaskOnServer(event) {
	console.log('updateTaskOnServer');
	let taskId = $(this).attr('data-id');

	const options = {
		method: 'PUT',
		headers: {
    		'Content-Type': 'application/json'
  		},
		body: JSON.stringify({status: 'complete'})
	};

	//Using fetch api to send information to the server
	fetch(`/tasks/${taskId}`, options).then(response => {
		console.log('updating task to server',response);
		//Get all task from server again after task is added
		receiveTaskFromServer();
	}).catch(error => {
  		console.log('Error:', error);
	});	
}

// Function to PUT information on the server on task, description, location, data_due
function changeContent(event) {
	//Get the id to change the on the database
	console.log($(this).attr('data-id'));
	let fieldId = $(this).attr('data-id');

	//Get the text to edit to the database
	console.log($(this).text());
	let editText = $(this).text();

	//Get the class in order to know what field to edit on the database
	console.log($(this).attr('class'));
	let selectedField = $(this).attr('class');

	const options = {
		method: 'PUT',
		headers: {
    		'Content-Type': 'application/json'
  		},
		body: JSON.stringify({newText: editText, field: selectedField})
	};

	//Using fetch api to send information to the server
	fetch(`/tasks/newData/${fieldId}`, options).then(response => {
		console.log('updating task to server',response);
		//Get all task from server again after task is added
		receiveTaskFromServer();
	}).catch(error => {
  		console.log('Error:', error);
	});

}


//Funciton to render information from server to the DOM
function renderToDOM(tasksArray) {
    // empty output element (table body)
    $( '#tasks-output' ).empty(); 

    // add each task to the DOM
    for( let task of tasksArray ){
        $('#tasks-output').append(`<tr class="highlight">`);
        $('#tasks-output').append(`<td class="task" data-id="${task.id}" contenteditable>${task.task}</td>`);
        $('#tasks-output').append(`<td class="description" data-id="${task.id}" contenteditable>${task.description}</td>`);
        $('#tasks-output').append(`<td class="location" data-id="${task.id}" contenteditable>${task.location}</td>`);
        $('#tasks-output').append(`<td class="due_date" data-id="${task.id}" contenteditable>${formatDate(task.due_date)}</td>`);
        if(task.status === 'complete'){
        	$('#tasks-output').append(`<td class="status-field complete" data-id="${task.id}">${task.status}</td>`);
        } else {
        	$('#tasks-output').append(`<td class="status-field" data-id="${task.id}"><button>${task.status}</button></td>`);
        }
        $('#tasks-output').append(`<td><button class="delete" data-id="${task.id}">X</button></td>`);
        $('#tasks-output').append(`</tr>`);
    } 
}

//Function for formating Date
function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleDateString();
}





