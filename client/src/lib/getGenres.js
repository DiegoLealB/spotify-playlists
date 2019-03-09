import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

function getGenres(trackId) {
    spotifyWebApi.getTrack(trackId)
        .then(res => {
            const albumId = res.album.id;
            spotifyWebApi.getAlbum(albumId)
                .then(album => {
                    console.log(album)
                    return album;
                })
        })
}

export default getGenres;
