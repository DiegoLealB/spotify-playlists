import React from 'react';
import { Bar, Line, Radar, Pie } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel, Select, MenuItem } from '@material-ui/core';

const styles = {

}

class TimeGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: 'Bar',
        }
    }

    handleChange = event => {
        this.setState({ graph: event.target.value });
    };
    
    render() {
        const { classes } = this.props;

        const playlistData = this.props.children;

        return (
            <div>
                <InputLabel htmlFor="customized-select">Graph type</InputLabel>
                <Select
                    value={ this.state.graph }
                    onChange={ this.handleChange }
                    id="customized-select"
                >
                    <MenuItem value='Bar'>Bar</MenuItem>
                    <MenuItem value='Line'>Line</MenuItem>
                    <MenuItem value='Pie'>Pie</MenuItem>
                    <MenuItem value='Radar'>Radar</MenuItem>
                </Select>
                { this.state.graph === 'Bar' ? <Bar data={ playlistData } />
                : this.state.graph === 'Line' ? <Line data={ playlistData } />
                : this.state.graph === 'Pie' ? <Pie data={ playlistData } />
                : <Radar data={ playlistData } /> }
            </div>
        )
    }
}

export default withStyles(styles)(TimeGraph);