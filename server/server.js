//Allow express in the project to create a server
import express from 'express';
const app = express();

//Good port to use
const PORT = process.env.PORT || 5000;

//Tells the server to allow the public to see these things
// Static file are HTML, CSS, JS, Images, etc
app.use(express.static('server/public'));

//Used to allow JSON for items being received from front end like body parser middleware
app.use(express.json({limit: '1mb'}));

//Checking if server is listening on a certain port when running
app.listen( PORT, () => {
	console.log( 'listening on port', PORT);
});