import _ from 'lodash';

function getArtists(tracksArr) {
    const artists = tracksArr.map(track => {
        return new Date(track.track.artist);
    });

    console.log(artists);

    let artistsObj = {
        labels: daysArr,
        datasets: [{
            label: '# of tracks per artist',
            data: tracksByDay,
        }],
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: 'Tracks by artist',
            },
        }
    }

    return artistsObj;
}

export default getArtists;
