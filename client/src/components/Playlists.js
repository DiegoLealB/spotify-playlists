import React from 'react';
import Spotify from 'spotify-web-api-js';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Playlist from './Playlist';

const spotifyWebApi = new Spotify();

const styles = {
    playlistContainer: {
        display: 'flex'
    }
}

class Playlists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            loading: true,
            token: props.children,
        }
    }

    async getPlaylists() {
        try {
            let playlists = await spotifyWebApi.getUserPlaylists();  
            let playlistIds = playlists.items.map(playlist => { return playlist.id; })
            
            try {
                let playlistArr = [];
                for (let i = 0; i < playlistIds.length; i++) {
                    let playlist = await spotifyWebApi.getPlaylist(playlistIds[i]);
                    playlistArr.push(playlist);
                }
                this.setState({ playlists: playlistArr, loading: false });
            } catch (error) {
                console.error('Get Playlists Array error: ', error);
            }
        } catch (error) {
            console.error('Get User Playlists error: ', error);
        }
    }

    componentWillMount() {
        this.getPlaylists()
    }

    render() {
        const { classes } = this.props;
        const { playlists, loading } = this.state;

        console.log(playlists[0])
        return (
            <Router>
                <div className={classes.playlistContainer}>
                    {loading ? <h1>Loading</h1>
                        : playlists.map(playlist => {
                            return (
                                <div key={playlist.id}>
                                    <Link to={`/playlist/${playlist.name}`}>
                                        <h1>{playlist.name}</h1>
                                        <Route path={`/playlist/${playlist.name}`} render={() => <Playlist>{playlist}</Playlist> }/>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </Router>
        )
    }
}

export default withStyles(styles)(Playlists);