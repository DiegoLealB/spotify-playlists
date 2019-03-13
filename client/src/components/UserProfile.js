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
        position: 'relative',
        left: '0px',    
    },
    profileContainer: {
        width: '400px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    },
    name: {
        fontSize: '30px',
        marginTop: '10px',
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
        try {
            let user = await spotifyWebApi.getMe();
            return user;
        } catch(err) {
            console.error('Get user error: ', err);
        }
    }

    componentWillMount() {
        this.getUser()
            .then(user => {
                if (user !== undefined) {
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
            }).catch(error => {
                console.error('getUser error: ', error);
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