import _ from 'lodash';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

// Takes in an array of tracks and returns data for a graph in chart.js format
async function getUserContribution(tracksArr) {

    // Returns a random integer from 0 to 255
    function randomRGBValue() {
        return Math.floor(Math.random() * 256);
    }

    const userIds = tracksArr.map(track => {
        return track.added_by.id;
    })

    // Gets count of occurrences of each user from the tracksArr
    const userCount = _.countBy(userIds)
    const users = Object.keys(userCount);
    const count = Object.values(userCount);

    let userNames = [];

    async function getUserInfo(user) {
        return await spotifyWebApi.getUser(user)
    }

    // Gets all usernames and sets a background and border color for each user
    for (let i = 0; i < users.length; i++) {
        let userName = await getUserInfo(users[i]);
        userNames.push(userName.display_name);
    }
    
    async function setUsersObj() {
        const usersObj = {
            labels: userNames,
            datasets: [{
                label: '# of songs',
                data: count,
            }],
            options: {
                title: {
                    display: true,
                    fontSize: 20,
                    text: 'Tracks added by user',
                },
            }
        }
        return usersObj;
    }

    return await setUsersObj();
}

export default getUserContribution;