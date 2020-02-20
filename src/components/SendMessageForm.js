import React, { Component } from 'react';


class SendMessageForm extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            text: ''
        }

        this.onSubmit = this.onSubmit.bind( this );
        this.onChange = this.onChange.bind( this );
    }
    
    // On Change
    onChange( event ) {
        this.setState({ text: event.target.value });
        this.props.onChange();
    }


    // Submitting the form
    onSubmit( event ) {
        event.preventDefault();
        this.props.onSubmit( this.state.text );
    }


    // Render the component
    render() {
        return (
            <div id="SendMessageForm">
                <form onSubmit={ this.onSubmit }>
                    <input 
                        type="text" 
                        placeholder="Type your message here..." 
                        onChange={ this.onChange } 
                    />

                    <input type="submit" />
                </form>
            </div>
        );
    }
}


export default SendMessageForm;