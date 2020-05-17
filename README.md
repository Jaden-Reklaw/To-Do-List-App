# PROJECT NAME
	#TO DO LIST APP

## Description
_Duration: 4 Days_

The WEEKEND SQL TO DO LIST is a web applicaiton that allows a person to create a list of tasks they wish to complete. This app is full CRUD with post request for creation of a task, get request for reading from a list from the server, put request for updating the existing information on the tasks for task name, date, description and status, and a delete request for removing tasks that might be complete or created incorrectly.

Basic use is too create tasks and as the person completes them they click on the Scheduled button in the status column.

To see the fully functional website, please visit: [DEPLOYED VERSION OF APP](https://aqueous-waters-27132.herokuapp.com/)

## Screen Shot
Example Base Mode Server Side Calculator
![ Home_Page | FORM](https://github.com/Jaden-Reklaw/To-Do-List-App/blob/master/img/TODO_LIST_FORM.png "Example of the form to create a task")
Example Stretch Mode Server Side Calculator
![ HOME_PAGE | LIST ](https://github.com/Jaden-Reklaw/To-Do-List-App/blob/master/img/LIST_OF_TASKS.png "Example of the list that holds all the tasks")

### Prerequisites
- [Node.js](https://nodejs.org/en/)

## Installation
1. Clone repository or download zip folder.
2. cd into correct directory from terminal
3. Run npm install
4. Run npm start and it should load in your default browser

## Usage
1. Once application is running a person can simply enter inputs in the following fields:
Task Name(name of task), Task Description(brief summary of task), Location(place the task is performed), and Date Due(when the task needs to be completed by). After the fields are completed then the user can hit enter and it will create the task.

2. Edit and Update currently not working. Orignially I had a each field set to contenteditable which allow a user to edit all fields when ever with out having to click update and the list would be change with the new content.

3.) Once a user is finished with a task they can simply click on scheduled button in order to show a green completed text to show they are done with a task.

4.) If a user creates a task they don't want anymore or by accident they can simply click the x button that will remove the task from the list.

## Built With
- HTML
- CSS
- Javascript
- Jquery
- Node.js
- Express.js
- PostgreSQL

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. Special shout out to my instructors Mary and Kris for helping become the programmer I always dreamed of and to my cohort at Prime Dijkstra!! Woot Woot, Help for Life!