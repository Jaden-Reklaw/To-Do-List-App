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

// DELETE Response

// PUT Response

//Export Module
export default router;