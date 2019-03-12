import React from 'react';
import PlaylistInfo from './PlaylistInfo';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
        }
    }

    displayPlaylist = () => {
        this.setState({
            showing: !this.state.showing,
        })
    }
    
    render() {
        const playlist = this.props;
        const { showing } = this.state;
       
        return (
            <div>
                <button onClick={this.displayPlaylist}>
                    <h1>{playlist.name}</h1>
                </button>
                {showing ? <PlaylistInfo {...playlist} /> : null}
            </div>
        )
    }
}

export default Playlist;