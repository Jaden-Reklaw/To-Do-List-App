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
	$('#tasks-output').on('click', '.delete', deleteTaskFromServer);
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
		receiveTaskFromServer();
	}).catch(error => {
  		console.log('Error:', error);
	});
}

//Function to DELETE information on the server database
function deleteTaskFromServer(event) {
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


//Funciton to render information from server to the DOM
function renderToDOM(tasksArray) {
    // empty output element (table body)
    $( '#tasks-output' ).empty(); 

    // add each song to the DOM
    for( let task of tasksArray ){
        $('#tasks-output').append( `
                <tr class="highlight">
                    <td>${task.task}</td>
                    <td>${task.description}</td>
                    <td>${task.location}</td>
                    <td>${formatDate(task.due_date)}</td>
                    <td>${task.status}</td>
                    <td><button class="delete" data-id="${task.id}">X</button></td>
                </tr>` 
        );
    } 
}

//Function for formating Date
function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleDateString();
}





