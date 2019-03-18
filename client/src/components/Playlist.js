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
            let tracksArr = [...res.tracks.items];
            if (res.tracks.next) {
                let moreTracks = await spotifyWebApi.getGeneric(res.tracks.next);
                tracksArr.push(...moreTracks.items);
                while (moreTracks.next) {
                    moreTracks = await spotifyWebApi.getGeneric(moreTracks.next);
                    tracksArr.push(...moreTracks.items);
                }
                res.tracks.items = tracksArr;
            }
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
                { loading ? <Loading /> : 
                <PlaylistInfo playlist={playlist} />
                }
            </div>
        )
    }
}

export default Playlist;