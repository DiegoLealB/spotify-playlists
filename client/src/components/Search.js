import React from 'react';
import Spotify from 'spotify-web-api-js';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const spotifyWebApi = new Spotify();
// 5Jd4BmGVIyhboY66hmLaii

const styles = theme => ({
    textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
      width: 200,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
  });

class Search extends React.Component{
    constructor() {
        super();
        this.state = {
            searchField: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        spotifyWebApi.searchPlaylists(this.state.searchField)
            .then(res => {
                console.log(res);
            })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} onSubmit={this.handleSubmit}>
                <TextField 
                    id="seachField"
                    label="Search for playlists"
                    className={classes.textField}
                    value={this.state.searchField}
                    onChange={this.handleChange("searchField")}
                />
            </form>
        )
    }
}

export default withStyles(styles)(Search);