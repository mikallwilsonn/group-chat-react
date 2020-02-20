import React, { Component } from 'react';


class MessageList extends Component {
    componentDidMount() {
        console.log( this.props );
    }

    render() {
        return (
            <ul id="MessageList">
                { this.props.messages.map(( message, index ) => {
                        return (
                            <li className="message" key={ index }>
                                <div>
                                    <span className="message__sender">
                                        { message.senderId }
                                    </span>

                                    <p className="message__content">
                                        { message.text }
                                    </p>
                                </div>
                            </li>
                        )
                    }) 
                }
            </ul>
        );
    }
}

export default MessageList;
