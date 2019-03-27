import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
// import RouteMenu from './RouteMenu';
import { withStyles } from '@material-ui/core/styles';

import UserProfile from './UserProfile';
import Search from './Search';

const styles = theme => ({
    root: {
        width: '100%',
    },
    title: {
        fontSize: '30px',
        color: 'black',
        // display: 'inline',
        // marginLeft: 'auto',
        // marginRight: 'auto',
    },
    navbar: {
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

class NavBar extends React.Component{
    
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position='static'>
                    <Toolbar className={classes.navbar}>
                        {/* <RouteMenu /> */}
                        <UserProfile />
                        <Typography className={classes.title}>Spotify Playlist Info</Typography>
                        <Search />
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(NavBar);