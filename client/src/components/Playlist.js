import React from 'react';
import { Pie, Line } from 'react-chartjs-2';

import getDatesByYear from '../lib/getDatesByYear';
import getUserContributions from '../lib/getUserContributions';

function Playlist(props) {
    const playlist = props;
    const tracks = playlist.tracks.items
    const timeData = getDatesByYear(tracks);
    const userContributionData = getUserContributions(tracks);
    // let trackIds = tracks.map(track => { return track.track.id });
    
    // const data = {
    //     title: 'Test Chart',
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [{
    //         label: '# of Votes',
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             'rgba(54, 162, 235, 0.2)',
    //             'rgba(255, 206, 86, 0.2)',
    //             'rgba(75, 192, 192, 0.2)',
    //             'rgba(153, 102, 255, 0.2)',
    //             'rgba(255, 159, 64, 0.2)'
    //         ],
    //         borderColor: [
    //             'rgba(255,99,132,1)',
    //             'rgba(54, 162, 235, 1)',
    //             'rgba(255, 206, 86, 1)',
    //             'rgba(75, 192, 192, 1)',
    //             'rgba(153, 102, 255, 1)',
    //             'rgba(255, 159, 64, 1)'
    //         ],
    //         borderWidth: 1
    //     }]
    // }
    
    return (
        <div>
            <h1>{playlist.name}</h1>
            <h4> By: {playlist.owner.display_name}</h4>
            <img src={playlist.images[1].url} alt={playlist.name}></img>
            <br />
            <Line data={timeData} />
            <Pie data={userContributionData} />
        </div>
    )
}

export default Playlist;