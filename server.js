// ----
// Dependencies
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const Chatkit = require( '@pusher/chatkit-server' );

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:32782cbb-3737-4a79-b84d-d0c19509eaf6',
  key: 'd048982f-1781-4d3a-a1c9-08424faab2bc:pJkRq1fEjkHsItcWFVHiJ5v/V4TTH5Fo4U2RJYY79f4=',
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
