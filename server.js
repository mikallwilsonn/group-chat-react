// ----
// Dependencies
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const Chatkit = require( '@pusher/chatkit-server' );
const dotenv = require( 'dotenv' );


// Load env variables
dotenv.config({ path: './config.env' });


const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY,
});


// ---
// Middlewares
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );
app.use( cors() );


// ----
// Routes
app.post( '/users', ( req, res ) => {
  const { username } = req.body;

  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus( 201 ))
    .catch( error => {
      if ( error.error === 'services/chatkit/user_already_exists' ) {

        res.sendStatus( 200 );

      } else {

        res.status( error.status ).json( error );

      }
    });
});


app.post( '/authenticate', ( req, res ) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });

  res.status( authData.status ).send (authData.body );
});



// ----
// Setting up and Starting the Server
const PORT = 3001
app.listen( PORT, error => {
  if ( error ) {

    console.error( error );

  } else {

    console.log( `Running on port ${PORT}` );

  }
});
