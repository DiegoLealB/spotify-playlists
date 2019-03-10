import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

function getGenres(trackIds) {
    let ids = trackIds.slice(0, 50);
    spotifyWebApi.getTracks(ids)
        .then(res => {
            const albumId = res.tracks.album.id;
            // spotifyWebApi.getAlbum(albumId)
            //     .then(album => {
            //         return album.genres;
            //     })
        })
        .catch(err => {
            console.error(err);
        })
}

export default getGenres;
