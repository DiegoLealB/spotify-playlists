import _ from 'lodash';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

function getUserContribution(tracksArr) {
    const userIds = tracksArr.map(track => {
        return track.added_by.id;
    })

    const userCount = _.countBy(userIds)
    const users = Object.keys(userCount);
    const count = Object.values(userCount);

    let userNames = [];
    users.forEach(user => {
        spotifyWebApi.getUser(user)
            .then(userInfo => {
                userNames.push(userInfo.display_name)
            })
    })

    const usersObj = {
        title: 'Playlist contributions by user',
        labels: userNames,
        datasets: [{
            label: '# of songs',
            data: count,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }],
    }

    return usersObj;
}

export default getUserContribution;