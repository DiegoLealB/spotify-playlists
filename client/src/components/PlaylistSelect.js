import React from 'react';
import Spotify from 'spotify-web-api-js';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Component imports
import Playlist from './Playlist';
import Loading from './Loading';

const spotifyWebApi = new Spotify();

const styles = theme => ({
    playlistContainer: {
        display: 'flex',
    },
    select: {
        
    },
    formControl: {
        maxHeight: 300,
        maxWidth: 400,
    }
});

class PlaylistSelect extends React.Component{
    constructor() {
        super();
        this.state = {
            playlists: {},
            loading: true,
            open: false,
            selectedPlaylist: {},
        }
    }

    // Gets users playlists and returns the whole playlist
    async getPlaylists() {
        try {
            let playlists = await spotifyWebApi.getUserPlaylists();
            this.setState({
                playlists: playlists,
                loading: false,
            });
        } catch (error) {
            console.error('Get User Playlists error: ', error);
        }
    }

    handleChange = event => {
        this.setState({ selectedPlaylist: {}}, () => {
            this.setState({
                selectedPlaylist: {
                    id: event.target.value 
                }
            })
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    componentWillMount() {
        this.getPlaylists();
    }

    render() {
        const { classes } = this.props;
        const { playlists, loading, open, selectedPlaylist } = this.state;

        return (
            <div className={classes.playlistContainer}>
                {loading ? <Loading /> :
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor='playlist-select'>Playlists</InputLabel>
                        <Select
                            open={open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            onChange={this.handleChange}
                            value={selectedPlaylist.id || ''}
                            inputProps={{name: 'playlist'}}
                            className={classes.select}
                            id='playlist-select'
                            variant='outlined'
                        >
                            {playlists.items.map(playlist => (
                                <MenuItem key={playlist.id} value={playlist.id}>{playlist.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                }
                { selectedPlaylist.id ? 
                    <Playlist>{this.state.selectedPlaylist.id}</Playlist>
                : null }
            </div>
        )
    }
}

export default withStyles(styles)(PlaylistSelect);