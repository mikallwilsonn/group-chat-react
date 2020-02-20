import React, { Component } from 'react';


class UsernameForm extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            username: ''
        }

        this.onSubmit = this.onSubmit.bind( this );
        this.onChange = this.onChange.bind( this );
    }
    
    // On Change
    onChange( event ) {
        this.setState({ username: event.target.value });
    }


    // Submitting the form
    onSubmit( event ) {
        event.preventDefault();
        this.props.onSubmit( this.state.username );
    }


    // Render the component
    render() {
        return (
            <div id="UsernameForm">
                <form onSubmit={ this.onSubmit }>
                    <input 
                        type="text" 
                        placeholder="What is your username?" 
                        onChange={ this.onChange } 
                    />

                    <input type="submit" />
                </form>
            </div>
        );
    }
}


export default UsernameForm;