import React from 'react';

class PlaylistAwards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { tracks, audioAnalysis } = this.props.children;

        return (
            <div>
                The most danceable song is... {tracks[audioAnalysis.danceabilityStats.max].track.name}
            </div>
        )
    }
}

export default PlaylistAwards;