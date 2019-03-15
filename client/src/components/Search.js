import React from 'react';
import Spotify from 'spotify-web-api-js';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';

import PlaylistInfo from './PlaylistInfo';

const spotifyWebApi = new Spotify();

const styles = theme => ({
    textField: {
      width: 200,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        
    },
    listRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        postition: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        zIndex: 100,
    }
  });

class Search extends React.Component{
    constructor() {
        super();
        this.state = {
            searchField: '',
            playlists: {},
            selectedPlaylist: 'none',
            showList: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        spotifyWebApi.searchPlaylists(this.state.searchField)
            .then(res => {
                this.setState({
                    playlists: res.playlists,
                    showList: true,
                })
            })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    getPlaylist(id) {
        spotifyWebApi.getPlaylist(id)
            .then(res => {
                this.setState({
                    selectedPlaylist: res,
                    showList: false,
                })
            })
    }

    closeList(event) {
        event.preventDefault();
        this.setState({
            showList: false,
        })
    }

    render() {
        const { classes } = this.props;
        const { showList, playlists, selectedPlaylist } = this.state;
        let playlistNames, playlistIds, playlistOwners;

        if (playlists.items !== undefined) {
            playlistNames = playlists.items.map(playlist => { return playlist.name });
            playlistIds = playlists.items.map(playlist => { return playlist.id });
            playlistOwners = playlists.items.map(playlist => { return playlist.owner.display_name });
        }

        return (
            <div>
                <form className={classes.container}>
                    <TextField 
                        id="seachField"
                        label="Search for playlists"
                        type="Search"
                        className={classes.textField}
                        value={this.state.searchField}
                        onChange={this.handleChange("searchField")}
                    />
                    <Button variant="contained" onClick={this.handleSubmit}>
                        <SearchIcon />
                    </Button>
                </form>
                {showList ? 
                <List 
                    className={classes.listRoot}
                    subheader={<ListSubheader component="div">Playlists<Button onClick={(event) => this.closeList(event)}><Close /></Button></ListSubheader>}
                >
                    {playlistNames.map((name, count) => {
                        return (
                            <ListItem key={playlistIds[count]}>
                                <Button onClick={() => this.getPlaylist(playlistIds[count])}>{`${name}`}</Button>  By: {playlistOwners[count]}
                            </ListItem>
                        )
                    })}
                </List>
                : null}
                {(selectedPlaylist === 'none') ? null : 
                    <PlaylistInfo playlist={selectedPlaylist}></PlaylistInfo>
                }
            </div>
        )
    }
}

export default withStyles(styles)(Search);