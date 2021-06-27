// Parent Iframe
import React, { Component } from 'react';
import Spinner from '../components/spinner/Fallback-spinner';
import axios from 'axios';
import { history } from '../history';
import { connect } from 'react-redux';

class SSO extends Component {
    constructor(props) {
        super(props);

        /**
         * Reference to iFrame
         */
        this.iFrameRef = React.createRef();
    }

    /**
     * checking Whether to login the user or to log him out
     */
    componentDidMount() {
        this.props.shouldLogout
            ? this.iFrameRef.current.addEventListener('load', () =>
                  this.sendMessage()
              )
            : window.addEventListener('message', this.getTokens);
    }

    /**
     * collecting recieved tokens and
     * placing them inside localStorage
     */
    getTokens = (e) => {
        if (e.origin !== '< URL_OF_WEBSITE_1 >') return;

        if (e.data.access && e.data.refresh) {
            // updating axios headers
            axios.defaults.headers['Authorization'] = 'Bearer ' + e.data.access;

            localStorage.setItem('access_token', e.data.access);
            localStorage.setItem('refresh_token', e.data.refresh);

            return history.push('/');
        } else {
            return history.push('/not-authorized');
        }
    };

    /**
     * sends a logout request to website 1
     * and also redirects there
     */
    sendMessage = () => {
        if (!this.iFrameRef.current) return;
        this.iFrameRef.current.contentWindow.postMessage('SHOULD_LOGOUT', '*');
        window.location.replace('< URL_OF_WEBSITE_1 > /sso');
    };

    render() {
        // conditional messaging
        const message = this.props.shouldLogout
            ? 'HAVE A GOOD DAY! BYE'
            : 'SETTING UP YOUR ACCOUNT';

        return (
            <>
                <Spinner msg={message} />

                <iframe
                    id="iframe"
                    ref={this.iFrameRef}
                    src="< URL_OF_WEBSITE_1 > /sso "
                    sandbox="allow-same-origin allow-scripts"
                    style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        border: 0,
                    }}
                    title="Child iframe"
                />
            </>
        );
    }
}

/**
 * redux related
 */
const mapStateToProps = (state) => {
    return {
        shouldLogout: state.authReducer.shouldLogout,
    };
};

export default connect(mapStateToProps)(SSO);
