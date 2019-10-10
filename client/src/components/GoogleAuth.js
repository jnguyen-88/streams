import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: "551632881435-v8sh8p57bh2d5rcmb7m3o5hccl2ugc9o.apps.googleusercontent.com",
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    // Helper function to automatically display if you're signIn/signOut 
    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            // need ID to ref. which user created a new stream
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    // sign in by pressing button
    onSignInClick = () => {
        this.auth.signIn();
    }

    // sign out by pressing button
    onSignOutClick = () => {
        this.auth.signOut();
    }

    // Logic to check to allow user to sign in/out
    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null
        } else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In
                </button>
            )
        }
    };

    render(){
        return <div>{this.renderAuthButton()}</div>
    };
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);