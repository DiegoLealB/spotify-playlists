
function getAudioAnalysisGraph(tracks, audioAnalysisArr, label, text) {
    const namesArr = tracks.map(track => {
        return track.track.name;
    })
    
    const audioAnalysisObj = {
        datasets: [{
            label: label,
            data: audioAnalysisArr,
        }],
        labels: namesArr,
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: text,
            },
            legend: {
                display: false,
            }
        }
    };

    return audioAnalysisObj;
}

export default getAudioAnalysisGraph;