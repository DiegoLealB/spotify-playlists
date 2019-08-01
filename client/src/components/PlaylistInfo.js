import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { InputLabel, Select, MenuItem } from '@material-ui/core';

import getDatesByYear from '../lib/getDatesByYear';
import getUserContributions from '../lib/getUserContributions';
import getDatesByDay from '../lib/getDatesByDay';
import getAudioAnalysis from '../lib/getAudioAnalysis';
import getArtists from '../lib/getArtists';
import PlaylistGraph from './PlaylistGraph';
import PlaylistAwards from './PlaylistAwards';
import getReleaseDate from '../lib/getReleaseDate';

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
    graphContainer: {
        width: '80%',
        margin: '0 auto',
    },
    inputLabel: {
        width: '50%',
        margin: 'auto',
        display: 'block',
    },
    graphSelect: {
        width: '30%',
        margin: 'auto',
        display: 'block',
    },
    select: {
        width: '50%',
        margin: 'auto',
        display: 'block',
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
            selectedGraph: 'day',
        }
    }

    handleChange = event => {
        this.setState({ selectedData: event.target.value });
    }

    chooseGraph = event => {
        this.setState({ selectedGraph: event.target.value })
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
        const { playlist, userContributionData, audioAnalysis, selectedGraph } = this.state;

        let tracks = playlist.tracks.items;
        tracks = tracks.filter(track => {return track.track.track === true})
        const yearData = getDatesByYear(tracks);
        const dayData = getDatesByDay(tracks);
        const artistData = getArtists(tracks);
        let releaseData = {
            graphData: getReleaseDate(tracks),
            graphProps: { graphs: ['Bar', 'Line']}
        }

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
                <div className={ classes.graphContainer }>
                    <InputLabel htmlFor="graph-select" className={ classes.inputLabel }>
                        Select a graph
                    </InputLabel>
                    <Select
                        value={ this.state.selectedGraph }
                        onChange={ this.chooseGraph }
                        id="graph-select"
                        className={ classes.select }
                    >
                        <MenuItem value="release">
                            Release dates
                        </MenuItem>
                        <MenuItem value="day">
                            Songs added by day of the week
                        </MenuItem>
                        <MenuItem value="year">
                            Songs added by year
                        </MenuItem>
                        <MenuItem value="artist">
                            Artist count in playlist
                        </MenuItem>
                        { userContributionData && playlist.collaborative === true ?
                            <MenuItem value="contributions">
                                Playlist collaborators
                            </MenuItem>
                        : null}
                    </Select>
                    <br/>
                    { selectedGraph === "release" ? <PlaylistGraph>{ releaseData }</PlaylistGraph> 
                    : selectedGraph === "day" ? <PlaylistGraph>{ dayData }</PlaylistGraph>
                    : selectedGraph === "year" ? <PlaylistGraph>{ yearData }</PlaylistGraph>
                    : selectedGraph === "contributions" ? <PlaylistGraph>{ userContributionData }</PlaylistGraph>
                    : <PlaylistGraph>{ artistData }</PlaylistGraph> }
                </div>
                <br/>
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