import React from 'react';
import { Pie, Line, Radar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import getDatesByYear from '../lib/getDatesByYear';
import getUserContributions from '../lib/getUserContributions';
import getDatesByDay from '../lib/getDatesByDay';

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
        maxWidth: '60%',
    },
    collaborative: {
        float: 'right',
    },
    a: {
        textDecoration: 'none',
        color: 'white',
    },
    graphs: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    graphContainer: {
        width: '500px',
        height: '500px',
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

        let tracks = playlist.tracks.items;
        const yearData = getDatesByYear(tracks);
        const dayData = getDatesByDay(tracks);
        const contributionOptions = {
            title: {
                display: true,
                fontSize: 20,
                text: 'Playlist contributions by user',
            },
        };

        return (
            <Paper>
                <div className={ classes.header }>
                    { playlist.images[0] === undefined ? <h1>No image</h1> 
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
                        <Line data={ yearData } />
                    </div>
                    <div className={ classes.graphContainer }>
                        <Radar data={ dayData } />
                    </div>
                    { userContributionData && playlist.collaborative === true ?
                    <div className={ classes.graphContainer }>
                        <Pie data={ userContributionData } options={ contributionOptions } className={ classes.collaborative }/>
                    </div>
                    : null }
                </div>
            </Paper>
        )
    }
}


export default withStyles(styles)(PlaylistInfo)