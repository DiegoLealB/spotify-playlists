import React from 'react';
import { Pie } from 'react-chartjs-2';

import getGenres from '../lib/getGenres';

function Playlist(props) {
    const playlist = props.children
    let trackIds = playlist.tracks.items
    trackIds = trackIds.map(track => {
        return track.track.id
    })
    let genresArr = trackIds.map(id => {
        getGenres(id);
    })
    console.log(genresArr);
    const data = {
        title: 'Test Chart',
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    
    return (
        <div>
            <h1>{playlist.name}</h1>
            <h4> By: {playlist.owner.display_name}</h4>
            <img src={playlist.images[1].url}></img>
            <Pie data={data}></Pie>
        </div>
    )
}

export default Playlist;