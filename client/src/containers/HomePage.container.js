import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Spotify from 'spotify-web-api-js';

// Component imports
import LoginButton from '../components/LoginButton';
import Playlists from '../components/Playlists';
import NavBar from '../components/NavBar';

const spotifyWebApi = new Spotify();

const styles = {

}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        let queryString = props.location.hash.substring(1);
        
        const params = this.getHashParams(queryString)
        
        this.state = {
            loggedIn: params.access_token ? true : false,
            token: params.access_token, 
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
        }
    }

    getHashParams(params) {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = params
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    render() {
        const { loggedIn } = this.state;
        return (
            <div className="App">
                { loggedIn ?
                    <div>
                        <NavBar />
                        <Playlists />
                    </div>
                : <LoginButton /> }
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);