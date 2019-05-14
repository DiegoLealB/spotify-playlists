
function getTrackDuration(tracksArr) {
    let secondsArr = tracksArr.map(track => {
        let seconds = track.track.duration_ms / 1000;
        // const formattedDurations = timeFormat(seconds); // Seconds formatted in Xm Ys format
        return seconds;
    });

    const namesArr = tracksArr.map(track => {
        return track.track.name;
    })
    
    const durationObj = {
        datasets: [{
            label: 'tracks duration',
            data: secondsArr,
        }],
        labels: namesArr,
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: 'Track durations',
            },
            legend: {
                display: false,
            }
        }
    };

    return durationObj;
}

// function timeFormat(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.round(seconds - minutes * 60);
//     return minutes + 'm ' + secs + 's';
// }

export default getTrackDuration;