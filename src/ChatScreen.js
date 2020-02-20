import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import TypingIndicator from './components/TypingIndicator';
import WhosOnlineList from './components/WhosOnlineList';


class ChatScreen extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: []
        }

        this.sendMessage = this.sendMessage.bind( this );
        this.sendTypingEvent = this.sendTypingEvent.bind( this );
    }


    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:32782cbb-3737-4a79-b84d-d0c19509eaf6',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        });

        chatManager
            .connect()
            .then(( currentUser ) => {
                this.setState({ currentUser });

                console.log( currentUser );

                return currentUser.subscribeToRoom({
                    roomId: '72f55e6f-5ab7-4d20-9590-cb8ec4367f92',
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [ ...this.state.messages, message ]
                            })
                        },
                        onUserStartedTyping: user => { 
                            this.setState({ 
                                usersWhoAreTyping: [ ...this.state.usersWhoAreTyping, user.name ]
                            }); 
                        },
                        onUserStoppedTyping: user => { 
                            this.setState({ 
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                )
                            }); 
                        },
                        onUserCameOnline: () => this.forceUpdate(),
                        onUserWentOffline: () => this.forceUpdate(),
                        onUserJoined: () => this.forceUpdate()
                    }
                })
            }).then(( currentRoom ) => {
                this.setState({ currentRoom  });
            })
            .catch(( error ) => {
                console.error( error );
            });
    }


    sendMessage( text ) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text: text
        })
    }


    sendTypingEvent() {
        this.state.currentUser
            .isTypingIn({ 
                roomId: this.state.currentRoom.id 
            })
            .catch( error => {
                console.error( 'error: ', error );
            });
    }


    render() {
        return (
            <div 
                id="ChatScreen"
            >
                <div 
                    id="ChatScreen__online-list"
                >
                    <h3> 
                        Who's Online
                    </h3>

                    <WhosOnlineList users={ this.state.currentRoom.users } />
                </div>

                <div id="ChatScreen__chat-window">
                    <div id="MessageList__wrapper">
                        <MessageList messages={ this.state.messages } />
                    </div>
                    

                    <TypingIndicator usersWhoAreTyping={ this.state.usersWhoAreTyping } />

                    <SendMessageForm 
                        onSubmit={ this.sendMessage } 
                        onChange={ this.sendTypingEvent }
                    />
                </div>
            </div>
        );
    }
}


export default ChatScreen;

