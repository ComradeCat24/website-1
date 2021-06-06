// Parent Iframe
import React, { Component } from 'react';
import './App.css';

export default class IframeParent extends Component {
    constructor(props) {
        super(props);
        this.iFrameRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('message', function (e) {
            console.log(e.origin, e.data);
            if (e.origin !== 'http://localhost:3001') return;

            //setting recieved tokens to localStorage of website 1.
            localStorage.setItem('access_token', e.data.access);
            localStorage.setItem('refresh_token', e.data.refresh);
        });
    }

    handleLogout = () => {
        localStorage.clear(); // deletes localStorage of website 1.
        if (!this.iFrameRef.current) return;
        this.iFrameRef.current.contentWindow.postMessage(
            'SHOULD_LOGOUT',
            'http://localhost:3001/'
        ); //postMessage(message, URI of the recipient page)
    };

    render() {
        return (
            <div className="App">
                <h1>Parent iFrame</h1>
                <button
                    onClick={() => {
                        this.handleLogout();
                    }}
                >
                    logout from both subdomains
                </button>
                <br />
                <br />
                <iframe
                    ref={this.iFrameRef}
                    src="http://localhost:3001/"
                    width="600"
                    height="300"
                    title="Child iframe"
                />
            </div>
        );
    }
}
