import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

async function getAudioAnalysis(tracksArr) {
    let trackIds = tracksArr.map(track => {return track.track.id});
    try {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        
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

        let audioAnalysisObj = {
            acousticness, danceability, duration, energy, instrumentalness, liveness, loudness, speechiness, tempo, timeSignature, valence,
        };
        
        return audioAnalysisObj;
    } catch(err) {
        console.error(err);
    }
}

export default getAudioAnalysis;