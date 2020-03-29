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

//SQL parameter to fill in the values - $1, $2, etc...
  let sqlText = `INSERT INTO tasks (task, description, location, due_date)
  				 VALUES($1, $2, $3, $4);`;
  //The 
  pool.query(sqlText, [data.task, data.description, data.location, data.due_date]).then((result) => {
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

  // TODO - REPLACE BELOW WITH YOUR CODE
  let sqlText = `DELETE FROM tasks WHERE id = $1;`
  pool.query(sqlText, [id]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error in Delete by id', error);
    res.sendStatus(500);
  });
});

// PUT Response

//Export Module
export default router;