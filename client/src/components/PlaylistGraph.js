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

    randomRGBValue() {
        return Math.floor(Math.random() * 256);
    }

    setColors(playlistData) {
        let backgroundColorsArr = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
        ];
        let borderColorsArr = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ];

        for (let i = backgroundColorsArr.length; i < playlistData.datasets[0].data.length; i++) {
            if (playlistData.datasets[0].data.length > backgroundColorsArr.length) {
                let backgroundColor = `rgba(${this.randomRGBValue()}, ${this.randomRGBValue()}, ${this.randomRGBValue()}, 0.6)`;
                backgroundColorsArr.push(backgroundColor);
    
                let borderColor = backgroundColor.replace('0.6', '1');
                borderColorsArr.push(borderColor);
            }
        }
        
        let newObj = {
            datasets: [{
                    data: playlistData.datasets[0].data,
                    label: playlistData.datasets[0].label,
                    backgroundColor: backgroundColorsArr,
                    borderColor: borderColorsArr,
                    borderWidth: 1,
            }],
            labels: playlistData.labels,
            options: playlistData.options,
        }
        
        return newObj;
    }

    getRandomGraph() {
        const graphTypes = ['Bar', 'Line', 'Pie', 'Doughnut'];
        const randomNum = Math.floor(Math.random() * graphTypes.length);
        return graphTypes[randomNum];
    }

    handleChange = event => {
        this.setState({ graph: event.target.value });
    }

    componentWillMount() {
        this.setState({
            graph: this.getRandomGraph(),
        })
    }
    
    render() {
        const { classes } = this.props;

        let playlistData = this.props.children;
        playlistData = this.setColors(playlistData);

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