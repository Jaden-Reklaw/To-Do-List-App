// Get Express Router Running
import express from 'express';
const router = express.Router();

// DB Connection
import pool from '../modules/pool';

//GET Resposne
router.get( '/', ( req, res )=>{
  console.log( 'in /tasks GET' );

  //Do a SELECT to the Database
  let sqlText = `SELECT * FROM tasks ORDER BY id;`;
  pool.query(sqlText).then((result) => {
  	res.send(result.rows)
  }).catch((error) => {
  	console.log('Got an error on SELECT query', error);
  	res.sendStatus(500);
  });
});

//POST Response
router.post( '/', ( req, res )=>{
  console.log( 'POST task:', req.body );
  let data = req.body;
  console.log(data);

//SQL parameter to fill in the values - $1, $2, etc...
  let sqlText = `INSERT INTO tasks (task, description, location, due_date)
  				 VALUES($1, $2, $3, $4);`;
  //The 
  pool.query(sqlText, [data.task, data.description, data.location, data.date]).then((result) => {
  	res.sendStatus(200);
  }).catch((error) => {
  	console.log('Error', error);
  	res.sendStatus(500);
  });
});

// DELETE Response
router.delete('/:id',  (req, res) => {
  let id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);

  //SQL text to DELETE item from Database
  let sqlText = `DELETE FROM tasks WHERE id = $1;`;
  pool.query(sqlText, [id]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error in Delete by id', error);
    res.sendStatus(500);
  });
});

// PUT Response
router.put('/status/:id',  (req, res) => {
  let task_update = req.body; 
  let id = req.params.id; 

  console.log(`Updating task ${id} with `, task_update);

  
  let sqlText = `UPDATE tasks SET status = $1 
                 WHERE id = $2;`;
  pool.query(sqlText, [task_update.status, id]).then((result) => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log('Error updating task with PUT', error);
    res.sendStatus(500);
  });
});

//PUT Response Updating the edit button
router.put('/edit/:id',  (req, res) => {
  let task_update = req.body; 
  let id = req.params.id; 

  console.log(`Updating task ${id} with `, task_update);

  
  let sqlText = `UPDATE tasks SET edit = $1 
                 WHERE id = $2;`;
  pool.query(sqlText, [task_update.edit, id]).then((result) => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log('Error updating task with PUT', error);
    res.sendStatus(500);
  });
});

// PUT Response updating datafields task, description, location, due_date
router.put('/newData/:id',  (req, res) => {
  //field to edit on database
  let field = req.body.field; 

  //New information to edit on database
  let task_update = req.body.newText; 

  //Id of the information that is updated
  let id = req.params.id; 

  console.log(`Updating task ${id} with `, task_update);

  
  let sqlText = `UPDATE tasks SET ${field} = $1 
                 WHERE id = $2;`;
  pool.query(sqlText, [task_update, id]).then((result) => {
    res.sendStatus(201);
  }).catch((error) => {
    console.log('Error updating task with PUT', error);
    res.sendStatus(500);
  });
});

//Export Module
export default router;