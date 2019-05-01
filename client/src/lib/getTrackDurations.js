
function getTrackDuration(tracksArr) {
    let secondsArr = tracksArr.map(track => {
        let seconds = track.track.duration_ms / 1000;
        // const formattedDurations = timeFormat(seconds);
        return seconds;
    });
    
    const durationObj = {
        datasets: [{
            label: 'tracks duration',
            data: secondsArr,
        }],
        labels: [],
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: 'Track durations',
            },
        }
    };

    return durationObj;
}

function timeFormat(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds - minutes * 60);
    return minutes + 'm ' + secs + 's';
}

export default getTrackDuration;