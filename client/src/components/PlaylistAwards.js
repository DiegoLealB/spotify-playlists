import React from 'react';

class PlaylistAwards extends React.Component {

    render() {
        const { tracks, audioAnalysis } = this.props.children;
        const trackNames = tracks.map(track => { return track.track.name });

        return (
            <div>
                The most danceable song is... {trackNames[audioAnalysis.danceabilityStats.max]}
            </div>
        )
    }
}

export default PlaylistAwards;