import React from 'react';
import Spotify from 'spotify-web-api-js';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const spotifyWebApi = new Spotify();

const styles = {
    avatar: {
        width: 60,
        height: 60,
        marginTop: 5,
    },
    profileContainer: {
        width: '300px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    },
    name: {
        fontSize: '30px',
        marginTop: '10px',
        marginLeft: '-20px',
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
        this.getUser()
            .then(user => {
                if (user.images[0] !== undefined) {
                    this.setState({
                        user: {
                            name: user.display_name,
                            initial: user.display_name[0],
                            link: user.external_urls.spotify,
                            id: user.id,
                            image: user.images[0].url,
                        }
                    })
                } else {
                    this.setState({
                        user: {
                            name: user.display_name,
                            initial: user.display_name[0],
                            link: user.external_urls.spotify,
                            id: user.id,
                            image: 'none',
                        }
                    })
                }
            })
    }

    render() {
        const { classes } = this.props;
        const { user } = this.state;

        return (
            <div className={classes.profileContainer}>
                { user.image !== 'none' 
                ? <Avatar className={classes.avatar} src={user.image} alt={`${user.name}'s spotify picture`}/>
                : <Avatar className={classes.avatar}>{user.initial}</Avatar> }
                <a href={user.link} className={classes.link}>
                    <Typography className={classes.name}>{user.name}</Typography>
                </a>
            </div>
        )
    }
}

export default withStyles(styles)(UserProfile);