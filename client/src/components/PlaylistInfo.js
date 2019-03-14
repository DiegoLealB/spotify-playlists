import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';

import getDatesByYear from '../lib/getDatesByYear';
import getUserContributions from '../lib/getUserContributions';

const styles = {

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
        const { playlist, userContributionData } = this.state;
        const tracks = playlist.tracks.items
        const timeData = getDatesByYear(tracks);
        return (
            <div>
                <h4> By: {playlist.owner.display_name}</h4>
                {playlist.images[1] === undefined ?
                playlist.images[0] === undefined ? <h1>No image</h1> 
                : <img src={playlist.images[0].url} alt={playlist.name}></img>
                : <img src={playlist.images[1].url} alt={playlist.name}></img> }
                <br />
                <Line data={timeData} />
                { userContributionData && playlist.collaborative === true ?
                    <Pie data={userContributionData} />
                : null }
            </div>
        )
    }
}


export default withStyles(styles)(PlaylistInfo)