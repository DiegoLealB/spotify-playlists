import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import getDatesByYear from '../lib/getDatesByYear';
import getUserContributions from '../lib/getUserContributions';

const styles = {
    playlistImage: {
        width: 300,
        height: 300,
    },
    title: {
        position: 'relative',
    },
    subtitle: {
        position: 'relative',
        marginTop: '5px',
    },
    playlistImage: {
        height: 300,
        width: 300,
        border: '1px solid black',
        margin: '20px'
    },
    header: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
    },
    description: {
        maxWidth: '60%'
    },
    collaborative: {
        float: 'right',
    },
}

class PlaylistInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            playlist: props.playlist,
            userContributionData: undefined,
        }
    }
    
    async componentWillMount() {
        try {
            const tracks = this.state.playlist.tracks.items;
            if (this.state.playlist.collaborative && !this.state.userContributionData) {
                const res = await getUserContributions(tracks)
                this.setState({
                    userContributionData: res,
                })
            }
        } catch(err) {
            console.error('getUserContributions error: ', err);
        }
    }
    
    render() {
        const { classes } = this.props;
        const { playlist, userContributionData } = this.state;
        const tracks = playlist.tracks.items;
        const timeData = getDatesByYear(tracks);
        
        return (
            <Paper>
                <div className={ classes.header }>
                    { playlist.images[0] === undefined ? <h1>No image</h1> 
                    : <img src={ playlist.images[0].url } alt={ playlist.name } className={ classes.playlistImage }></img> }
                    <div className={ classes.details }>
                        <Typography component='h3' variant='h3' className={ classes.title }>{ playlist.name }</Typography>
                        <Typography variant='subtitle1' className={ classes.subtitle }> By: { playlist.owner.display_name }</Typography>
                        <Typography variant='h6' className={ classes.description }>{ playlist.description }</Typography>
                        <br />
                        <Typography variant='h6'><a href={ playlist.external_urls.spotify }>Link to playlist</a></Typography>
                        <Typography variant='h6'>Followers: { playlist.followers.total }</Typography>
                        <Typography variant='h6'>Collaborative: { playlist.collaborative ? 'Yes' : 'No' } </Typography>
                        <Typography variant='h6'>Privacy: { playlist.public ? 'Public' : 'Private' }</Typography>
                        <Typography variant='h6'>Track count: { playlist.tracks.items.length }</Typography>
                    </div>
                </div>
                <br />
                <div className={ classes.graphs }>
                    <Line data={ timeData } />
                    { userContributionData && playlist.collaborative === true ?
                        <Pie data={ userContributionData } className={ classes.collaborative }/>
                    : null }
                </div>
            </Paper>
        )
    }
}


export default withStyles(styles)(PlaylistInfo)