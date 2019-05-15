import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info'
import PlaylistGraph from './PlaylistGraph';
import getTrackDuration from '../lib/getTrackDurations';

const styles = {
    card: {
        width: '90%',
        margin: 'auto',
    },
    title: {
        textAlign: 'center',
        margin: '10px',
        padding: '10px',
    },
    subtitle: {
        textAlign: 'center',
    },
    selectField: {
        width: '100%',
        marginBottom: '20px',
    },
    container: {
        paddingBottom: '20px'
    },
    infoIcon: {
        marginBottom: '-5px',
        marginLeft: '5px',
    }
};

class PlaylistAwards extends React.Component {
    state = {
        selected: '',
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleChange = event => {
        this.setState({ selected: event.target.value })
    };

    timeFormat = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.round(seconds - minutes * 60);
        return minutes + 'm ' + secs + 's';
    }

    getDurationProps(tracks) {
        let graphData = getTrackDuration(tracks);
        let graphProps = {
            graphs: ['Bar', 'Radar', 'Line']
        };
        let durationGraphProps = {
            graphData, graphProps
        };
        return durationGraphProps;
    }

    msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + "h " + minutes + "m " + seconds + "s"
    }

    render() {
        const { selected } = this.state;
        const { tracks, audioAnalysis } = this.props.children;
        const { classes } = this.props;

        const trackNames = tracks.map(track => { return track.track.name });
        const trackArtists = tracks.map(track => { return track.track.artists[0].name});
        const playlistDuration = tracks.map(track => { return track.track.duration_ms}).reduce((accumulator, currentValue) => { return accumulator + currentValue });

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography component='h2' variant='h2' className={classes.title}>Playlist awards<span role='img' aria-label='trophy'>🏆</span></Typography>
                        <Typography variant='body1' className={classes.subtitle}>
                            Here you can see which tracks excel or underpreform on certain categories  
                            <Tooltip title="Data was provided using spotify's API audio analysis feature">
                                <InfoIcon className={classes.infoIcon}/>
                            </Tooltip>
                        </Typography>
                        <InputLabel htmlFor='playlist-awards-menu'>
                            <Typography>Select a category</Typography>
                        </InputLabel>
                        <Select
                            id='playlist-awards-menu'
                            value={this.state.selected}
                            onChange={this.handleChange}
                            className={classes.selectField}
                        >
                            <MenuItem value=''>None</MenuItem>
                            <MenuItem value='acousticness'>Acousticness</MenuItem>
                            <MenuItem value='danceability'>Danceability</MenuItem>
                            <MenuItem value='duration'>Duration</MenuItem>
                            <MenuItem value='energy'>Energy</MenuItem>
                            <MenuItem value='instrumentalness'>Instrumentalness</MenuItem>
                            <MenuItem value='liveness'>Liveness</MenuItem>
                            <MenuItem value='loudness'>Loudness</MenuItem>
                            <MenuItem value='speechiness'>Speechiness</MenuItem>
                            <MenuItem value='tempo'>Tempo</MenuItem>
                        </Select>
                        { selected === 'acousticness' ?
                            <div>
                                <Typography variant='h6' component='h6'>The most acoustic song is {trackNames[audioAnalysis.acousticnessStats.max]} by {trackArtists[audioAnalysis.acousticnessStats.max]}</Typography>
                                <Typography variant='h6' component='h6'>The least acoustic song is {trackNames[audioAnalysis.acousticnessStats.min]} by {trackArtists[audioAnalysis.acousticnessStats.min]}</Typography>
                            </div>
                        : selected === 'danceability' ?
                            <div>
                                <Typography variant='h6' component='h6'>The most danceable song is {trackNames[audioAnalysis.danceabilityStats.max]} by {trackArtists[audioAnalysis.danceabilityStats.max]}</Typography>
                                <Typography variant='h6' component='h6'>The least danceable song is {trackNames[audioAnalysis.danceabilityStats.min]} by {trackArtists[audioAnalysis.danceabilityStats.min]}</Typography>
                            </div>
                        : selected === 'duration' ?
                            <div>
                                <div>
                                    <Typography variant='h6' component='h6'>
                                        The longest song is {trackNames[audioAnalysis.durationStats.max]} by {trackArtists[audioAnalysis.durationStats.max]} at {this.timeFormat(audioAnalysis.duration[audioAnalysis.durationStats.max])}
                                    </Typography>
                                    <Typography variant='h6' component='h6'>
                                        The shortest song is {trackNames[audioAnalysis.durationStats.min]} by {trackArtists[audioAnalysis.durationStats.min]} at {this.timeFormat(audioAnalysis.duration[audioAnalysis.durationStats.min])}
                                    </Typography>
                                    <Typography varian='h6' component='h6'>
                                        Total playlist duration is: {this.msToTime(playlistDuration)}
                                    </Typography>
                                </div>
                                <div>
                                    <PlaylistGraph>{this.getDurationProps(tracks)}</PlaylistGraph>                            
                                </div>
                            </div>
                        : selected === 'energy' ?
                            <div>
                                <Typography variant='h6' component='h6'>The most energetic song is {trackNames[audioAnalysis.energyStats.max]} by {trackArtists[audioAnalysis.energyStats.max]}</Typography>
                                <Typography variant='h6' component='h6'>The least energetic song is {trackNames[audioAnalysis.energyStats.min]} by {trackArtists[audioAnalysis.energyStats.min]}</Typography>
                            </div>
                        : selected === 'instrumentalness' ?
                            <div>
                                <Typography variant='h6' component='h6'>The most instrumental song is {trackNames[audioAnalysis.instrumentalnessStats.max]} by {trackArtists[audioAnalysis.instrumentalnessStats.max]}</Typography>
                                <Typography variant='h6' component='h6'>The least instrumental song is {trackNames[audioAnalysis.instrumentalnessStats.min]} by {trackArtists[audioAnalysis.instrumentalnessStats.min]}</Typography>
                            </div>
                        : selected === 'liveness' ?
                            <div>
                                <Typography variant='h6' component='h6'>The most lively song is {trackNames[audioAnalysis.livenessStats.max]} by {trackArtists[audioAnalysis.livenessStats.max]}</Typography>
                                <Typography variant='h6' component='h6'>The least lively song is {trackNames[audioAnalysis.livenessStats.min]} by {trackArtists[audioAnalysis.livenessStats.min]}</Typography>
                            </div>
                        : selected === 'loudness' ?
                            <div>
                                <Typography variant='h6' component='h6'>The loudest song is {trackNames[audioAnalysis.loudnessStats.max]} by {trackArtists[audioAnalysis.loudnessStats.max]}</Typography>
                                <Typography variant='h6' component='h6'>The quietest song is {trackNames[audioAnalysis.loudnessStats.min]} by {trackArtists[audioAnalysis.loudnessStats.min]}</Typography>
                            </div>
                        : selected === 'speechiness' ?
                            <div>
                                <Typography variant='h6' component='h6'>The speechiest song is {trackNames[audioAnalysis.speechinessStats.max]} by {trackArtists[audioAnalysis.speechinessStats.max]}</Typography>
                                <Typography variant='h6' component='h6'>The least talkative song is {trackNames[audioAnalysis.speechinessStats.min]} by {trackArtists[audioAnalysis.speechinessStats.min]}</Typography>
                            </div>
                        : selected === 'tempo' ?
                            <div>
                                <Typography variant='h6' component='h6'>
                                    The highest tempo song is {trackNames[audioAnalysis.tempoStats.max]} by {trackArtists[audioAnalysis.tempoStats.max]} at {Math.round(audioAnalysis.tempo[audioAnalysis.tempoStats.max])} BPM
                                </Typography>
                                <Typography variant='h6' component='h6'>
                                    The lowest tempo song is {trackNames[audioAnalysis.tempoStats.min]} by {trackArtists[audioAnalysis.tempoStats.min]} at {Math.round(audioAnalysis.tempo[audioAnalysis.tempoStats.min])} BPM
                                </Typography>
                            </div>
                        : null}
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(PlaylistAwards);