import React from 'react';
import Spotify from 'spotify-web-api-js';

import Playlist from './Playlist';

const spotifyWebApi = new Spotify();

class Playlists extends React.Component{
    constructor() {
        super();
        this.state = {
            playlists: [],
        }
    }

    getPlaylists() {
        spotifyWebApi.getUserPlaylists()
            .then(playlists => {
                playlists = playlists.items.map(playlist => { return playlist.id; })
                let playlistsArr = [];
                playlists.forEach(playlist => {
                    spotifyWebApi.getPlaylist(playlist)
                    .then(res => {
                        playlistsArr.push(res)
                    })
                })
                this.setState({
                    playlists: playlistsArr,
                })
            })
    }

    componentWillMount() {
        this.getPlaylists();
    }

    render() {
        // const { classes } = props;
        const { playlists } = this.state;

        return (
            <div>
                {playlists.map(playlist => {
                    return (
                        <Playlist key={playlist.id}>{playlist}</Playlist>
                    )
                })}
            </div>
        )
    }
}

export default Playlists;