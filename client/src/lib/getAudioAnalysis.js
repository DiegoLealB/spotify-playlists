import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

async function getAudioAnalysis(tracksArr) {
    let trackIds = tracksArr.map(track => {return track.track.id});
    try {        
        let audioFeatures = await spotifyWebApi.getAudioFeaturesForTracks(trackIds);
        audioFeatures = audioFeatures.audio_features;

        const acousticness = audioFeatures.map(track => {return track.acousticness});
        const danceability = audioFeatures.map(track => {return track.danceability});
        const duration = audioFeatures.map(track => {return track.duration_ms / 1000});
        const energy = audioFeatures.map(track => {return track.energy});
        const instrumentalness = audioFeatures.map(track => {return track.instrumentalness});
        const liveness = audioFeatures.map(track => {return track.liveness});
        const loudness = audioFeatures.map(track => {return track.loudness});
        const speechiness = audioFeatures.map(track => {return track.speechiness});
        const tempo = audioFeatures.map(track => {return track.tempo});
        const timeSignature = audioFeatures.map(track => {return track.time_signature});
        const valence = audioFeatures.map(track => {return track.valence});

        const acousticnessStats = statistics(acousticness);
        const danceabilityStats = statistics(danceability);
        const durationStats = statistics(duration);
        const energyStats = statistics(energy);
        const instrumentalnessStats = statistics(instrumentalness);
        const livenessStats = statistics(liveness);
        const loudnessStats = statistics(loudness);
        const speechinessStats = statistics(speechiness);
        const tempoStats = statistics(tempo);
        const timeSignatureStats = statistics(timeSignature);
        const valenceStats = statistics(valence);
        
        let audioAnalysisObj = {
            acousticness, acousticnessStats,
            danceability, danceabilityStats,
            duration, durationStats,
            energy, energyStats,
            instrumentalness, instrumentalnessStats,
            liveness, livenessStats,
            loudness, loudnessStats,
            speechiness, speechinessStats,
            tempo, tempoStats,
            timeSignature, timeSignatureStats,
            valence, valenceStats,
        };
        
        return audioAnalysisObj;
    } catch(err) {
        console.error(err);
    }
}

function statistics(array) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const average = array.reduce(reducer);
    const squareDiffs = array.map(value => {
        const diff = value - average;
        const sqr = diff * diff;
        return sqr;
    });
    const averageSqrDiff = squareDiffs.reduce(reducer);
    const stdDev = Math.sqrt(averageSqrDiff);
    let statisticsObj = {
        average,
        standardDeviation: stdDev,
        max: array.indexOf(Math.max(...array)),
        min: array.indexOf(Math.min(...array)),
    }

    return statisticsObj;
}

export default getAudioAnalysis;