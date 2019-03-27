import React from 'react';
import { Bar, Bubble, Doughnut, Line, Radar, Pie, Polar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel, Select, MenuItem } from '@material-ui/core';

const styles = {
    inputLabel: {
        width: '50%',
        margin: 'auto',
        display: 'block',
    },
    select: {
        width: '50%',
        margin: 'auto',
        display: 'block',
    },
}

class PlaylistGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: '',
        }
    }

    handleChange = event => {
        this.setState({ graph: event.target.value });
    };

    getRandomGraph() {
        const graphTypes = ['Bar', 'Line', 'Pie', 'Doughnut'];
        const randomNum = Math.floor(Math.random() * graphTypes.length);
        return graphTypes[randomNum];
    }

    componentWillMount() {
        this.setState({
            graph: this.getRandomGraph(),
        })
    }
    
    render() {
        const { classes } = this.props;

        const playlistData = this.props.children;
        let options;
        if (playlistData.options) {
            options = playlistData.options;
        }

        return (
            <div>
                <InputLabel htmlFor="customized-select" className={classes.inputLabel}>Graph type</InputLabel>
                <Select
                    value={ this.state.graph }
                    onChange={ this.handleChange }
                    id="customized-select"
                    className={ classes.select }
                >
                    <MenuItem value='Bar'>Bar</MenuItem>
                    <MenuItem value='Bubble'>Bubble</MenuItem>
                    <MenuItem value='Doughnut'>Doughnut</MenuItem>
                    <MenuItem value='Line'>Line</MenuItem>
                    <MenuItem value='Pie'>Pie</MenuItem>
                    <MenuItem value='Radar'>Radar</MenuItem>
                    <MenuItem value='Polar'>Polar</MenuItem>
                </Select>
                { this.state.graph === 'Bar' ? <Bar data={ playlistData } options={ options }/>
                : this.state.graph === 'Bubble' ? <Bubble data={ playlistData } options={ options }/>
                : this.state.graph === 'Doughnut' ? <Doughnut data={ playlistData } options={ options }/>
                : this.state.graph === 'Line' ? <Line data={ playlistData } options={ options }/>
                : this.state.graph === 'Pie' ? <Pie data={ playlistData } options={ options }/>
                : this.state.graph === 'Radar' ? <Radar data={ playlistData } options={ options }/>
                : <Polar data={ playlistData } options={ options }/> }
            </div>
        )
    }
}

export default withStyles(styles)(PlaylistGraphs);