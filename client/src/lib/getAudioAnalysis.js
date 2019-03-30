import _ from 'lodash';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

async function getAudioAnalysis(tracksArr) {
    let trackIds = tracksArr.map(track => {return track.track.id});
    try {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let audioFeatures = await spotifyWebApi.getAudioFeaturesForTracks(trackIds);
        audioFeatures = audioFeatures.audio_features;
        
        let acousticness = audioFeatures
                            .map(track => {return track.acousticness})
                            .reduce(reducer)
        acousticness = acousticness / tracksArr.length;
        console.log(audioFeatures)
    } catch(err) {
        console.error(err);
    }
}

export default getAudioAnalysis;