import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Spotify from 'spotify-web-api-js';

// Component imports
import LoginButton from '../components/LoginButton';
// import NowPlaying from '../components/NowPlaying';
import UserProfile from '../components/UserProfile';
import Playlists from '../components/Playlists';

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
            nowPlaying: {
                name: 'Not Checked',
                alt: '',
                image: '',
            },
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
    
    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState()
            .then((response) => {

            this.setState({
                nowPlaying: {
                    name: response.item.name,
                    alt: response.item.name,
                    image: response.item.album.images[0].url,
                }
            })
        })
        .catch(err => {
            console.warn('getNowPlaying ERROR: ', err);
        });
    }

    logOut() {
        spotifyWebApi.setAccessToken('');
        this.setState({
          loggedIn: false,
        });
    }

    render() {
        const { loggedIn } = this.state;
        return (
            <div className="App">
                <UserProfile />
                    { loggedIn ? <button onClick={() => this.logOut()}>Log Out</button> : <LoginButton /> }
                {/* <NowPlaying>{ nowPlaying }</NowPlaying>
                <div>
                    <button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </button>
                </div> */}
                <div>
                    <Playlists />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);