// ----
// Dependencies
import React, { Component } from 'react';


// ----
// Child Components
import UsernameForm from './components/UsernameForm';
import ChatScreen from './ChatScreen';


// ----
// App class Compponent
class App extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''
    }

    this.onUsernameSubmitted = this.onUsernameSubmitted.bind( this );
  }


  onUsernameSubmitted( username ) {
    fetch( 'http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    .then( response => {
      this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen'
      })
    })
    .catch( error => {
      console.error( error );
    })
  }

  render() {
    if ( this.state.currentScreen === 'WhatIsYourUsernameScreen' ) {

      return (
        <UsernameForm onSubmit={ this.onUsernameSubmitted }/>
      );

    } else if ( this.state.currentScreen === 'ChatScreen' ) {

      return (
        <ChatScreen currentUsername={ this.state.currentUsername } />
      );

    }

  }
}


// Export
export default App
