import React, { Component } from 'react';


class WhosOnlineList extends Component {
    render() {
        if ( this.props.users ) {
            return (
                <ul>
                    { 
                        this.props.users.map(( user, index ) => {
                            return (
                                <li key={ index }>
                                    <span>
                                        { user.name }
                                    </span>
                                    
                                    <span className={`status status-${user.presence.state}`}>
                                        { user.presence.state }
                                    </span>
                                </li>
                            );
                        })
                    }
                </ul>
            )
        } else {
            return (
                <p>Loading...</p>
            );
        }
    }
}


export default WhosOnlineList;