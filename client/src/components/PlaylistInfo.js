import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import { InputLabel, Select, MenuItem } from '@material-ui/core';

import getDatesByYear from '../lib/getDatesByYear';
import getUserContributions from '../lib/getUserContributions';
import getDatesByDay from '../lib/getDatesByDay';
import getAudioAnalysis from '../lib/getAudioAnalysis';
import getArtists from '../lib/getArtists';
import PlaylistGraph from './PlaylistGraph';
import PlaylistAwards from './PlaylistAwards';

const styles = {
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
        wordWrap: 'break-word',
    },
    a: {
        textDecoration: 'none',
        color: 'white',
    },
    graphs: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    graphContainer: {
        width: '500px',
        height: '350px',
    },
}

class PlaylistInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            playlist: props.playlist,
            userContributionData: undefined,
            audioAnalysis: {},
            selectedData: '',
        }
    }

    handleChange = event => {
        this.setState({ selectedData: event.target.value });
    }
    
    async componentWillMount() {
        try {
            const tracks = this.state.playlist.tracks.items;
            
            if (this.state.playlist.collaborative && !this.state.userContributionData) {
                let res = await getUserContributions(tracks);
                this.setState({
                    userContributionData: res,
                })
            }

            let audioData = await getAudioAnalysis(tracks);
            this.setState({
                audioAnalysis: audioData,
            })
        } catch(err) {
            console.error('getUserContributions error: ', err);
        }
    }
    
    render() {
        const { classes } = this.props;
        const { playlist, userContributionData, audioAnalysis } = this.state;

        let tracks = playlist.tracks.items;
        const yearData = getDatesByYear(tracks);
        const dayData = getDatesByDay(tracks);
        const artistData = getArtists(tracks);

        const playlistAwardsData = { tracks, audioAnalysis };

        return (
            <Paper>
                <div className={ classes.header }>
                    { playlist.images[0] === undefined ? <h1> No image </h1> 
                    : <img src={ playlist.images[0].url } alt={ playlist.name } className={ classes.playlistImage }></img> }
                    <div className={ classes.details }>
                        <Typography component='h3' variant='h3' className={ classes.title }>
                            <a href={ playlist.external_urls.spotify } className={ classes.a }>{ playlist.name }</a>
                        </Typography>
                        <Typography variant='subtitle1' className={ classes.subtitle }> By: { playlist.owner.display_name }</Typography>
                        <Typography variant='h6' className={ classes.description }>{ playlist.description }</Typography>
                        <br />
                        <Typography variant='h6'>Followers: { playlist.followers.total }</Typography>
                        <Typography variant='h6'>Track count: { playlist.tracks.total }</Typography>
                        <Typography variant='h6'>Collaborative: { playlist.collaborative ? 'Yes' : 'No' } </Typography>
                        <Typography variant='h6'>Privacy: { playlist.public ? 'Public' : 'Private' }</Typography>
                    </div>
                </div>
                <br />
                <div className={ classes.graphs }>
                    <div className={ classes.graphContainer }>
                        <PlaylistGraph>{ dayData }</PlaylistGraph>
                    </div>
                    <div className={ classes.graphContainer }>
                        <PlaylistGraph>{ yearData }</PlaylistGraph>
                    </div>
                    <div className={ classes.graphContainer }>
                        <PlaylistGraph>{ artistData }</PlaylistGraph>
                    </div>
                    { userContributionData && playlist.collaborative === true ?
                    <div className={ classes.graphContainer }>
                        <PlaylistGraph>{ userContributionData }</PlaylistGraph>
                    </div>
                    : null }
                </div>
                <div>
                    { playlistAwardsData.audioAnalysis.acousticness ? 
                        <PlaylistAwards>{ playlistAwardsData }</PlaylistAwards>
                    : null }
                </div>
            </Paper>
        )
    }
}


export default withStyles(styles)(PlaylistInfo)