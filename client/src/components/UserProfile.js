import React from 'react';
import Spotify from 'spotify-web-api-js';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const spotifyWebApi = new Spotify();

const styles = {
    avatar: {
        
    },
    profileContainer: {
        width: '200px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    }
}

class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        }
    }

    async getUser() {
        let user = await spotifyWebApi.getMe();
        return user;
    }

    componentWillMount() {
        this.getUser().then(user => {
            this.setState({
                user: {
                    name: user.display_name,
                    initial: user.display_name[0],
                    link: user.external_urls.spotify,
                    id: user.id,
                },
            })
        })
    }

    render() {
        const { classes } = this.props;
        const { user } = this.state;

        return (
            <div className={classes.profileContainer}>
                <Avatar className={classes.avatar}>{user.initial}</Avatar>
                <a href={user.link} className={classes.link}>
                    <h2>{user.name}</h2>
                </a>
            </div>
        )
    }
}

export default withStyles(styles)(UserProfile);