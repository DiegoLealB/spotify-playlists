import React from 'react';
import Spotify from 'spotify-web-api-js';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';


const spotifyWebApi = new Spotify();

const styles = {
    avatar: {
        margin: 10,
    },
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
        console.log('user', user)
        return user;
    }

    componentWillMount() {
        let user;
        this.getUser().then(user => {
            this.setState({
                user: {
                    name: user.display_name,
                    initial: user.display_name[0],
                },
            })
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <button onClick={() => this.getUser()}>
                    Refresh
                </button>
                <h1>{this.state.user.name}</h1>
                <Grid>
                    <Avatar className={classes.avatar}>{this.state.user.initial}</Avatar>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(UserProfile);