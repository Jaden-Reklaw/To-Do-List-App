//Test Connection
console.log('Connection Established to client.js!');

//Preparing DOM for jquery
$(document).ready(onReady);

function onReady() {
	console.log('jquery working');
	//Get tasks from the server
	receiveTaskFromServer();
}

//Function to get information from the server
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

//Funciton to render information from server to the DOM
function renderToDOM(tasksArray) {
    // empty output element (table body)
    $( '#books-output' ).empty(); 

    // add each song to the DOM
    for( let task of tasksArray ){
        $('#tasks-output').append( `
                <tr>
                    <td>${task.task}</td>
                    <td>${task.description}</td>
                    <td>${task.location}</td>
                    <td>${formatDate(task.due_date)}</td>
                    <td>${task.status}</td>
                    <td><button class="delete">X</button></td>
                </tr>` 
            );
    } 
}

//Function for formating Date
function formatDate( dateString ) {
    let date = new Date(dateString);
    return date.toLocaleDateString();
}





