import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const style = {
    button: {
        display: 'block',
        margin: '10% auto',
    },
    link: {
        textDecoration: 'none',
    }
}

function LoginButton(props) {
    const { classes } = props;

    return (
        <div>
            <a href='http://spotify-playlist-info-auth.herokuapp.com/login' className={classes.link}>
            {/* <a href='http://localhost:8888/login' className={classes.link}> */}
                <Button variant='contained' color='primary' className={classes.button}>Login With Spotify</Button>
            </a>
        </div>
    )
}

export default withStyles(style)(LoginButton);