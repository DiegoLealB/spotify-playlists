import React from 'react';
import Spotify from 'spotify-web-api-js';

import PlaylistInfo from './PlaylistInfo';
import Loading from './Loading';

const spotifyWebApi = new Spotify();

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: this.props.children,
            playlist: {},
        }
    }

    async getPlaylist() {
        try {
            let res = await spotifyWebApi.getPlaylist(this.state.id);
            this.setState({
                loading: false,
                playlist: res,
            })
        } catch(err) {
            console.error(err);
        }
    }

    componentWillMount() {
        this.getPlaylist();
    }
    
    render() {
        const { loading, playlist } = this.state;
        return (
            <div>
                {loading ? <Loading /> : 
                <PlaylistInfo playlist={playlist} />
            }
                {/* <h1>{playlist.name}</h1> */}
            </div>
        )
    }
}

export default Playlist;