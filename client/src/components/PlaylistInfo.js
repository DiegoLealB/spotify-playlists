import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';

import getDatesByYear from '../lib/getDatesByYear';
import getUserContributions from '../lib/getUserContributions';

const styles = {

}

function PlaylistInfo(props) {
    const playlist = props;
    const tracks = playlist.tracks.items
    const timeData = getDatesByYear(tracks);
    const userContributionData = getUserContributions(tracks);
    return (
        <div>
            <h4> By: {playlist.owner.display_name}</h4>
            <img src={playlist.images[1].url} alt={playlist.name}></img>
            <br />
            <Line data={timeData} />
            <Pie data={userContributionData} />
        </div>
    )
}

export default withStyles(styles)(PlaylistInfo)