import _ from 'lodash';

function getArtists(tracksArr) {
    console.log(tracksArr)
    const artists = tracksArr.map(track => {
        return track.track.artists[0].name;
    });

    const countByArtist = _.countBy(artists);
    let artistFiltered = Object.keys(countByArtist);
    let artistCount = Object.values(countByArtist);
    artistFiltered.unshift('');
    artistCount.unshift(0);


    let artistsObj = {
        labels: artistFiltered,
        datasets: [{
            label: '# of tracks by artist',
            data: artistCount,
        }],
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: 'Tracks by artist',
            },
            legend: {
                display: false,
            }
        }
    }

    return artistsObj;
}

export default getArtists;
