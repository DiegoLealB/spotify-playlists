import React from 'react';
import Spotify from 'spotify-web-api-js';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Playlist from './Playlist';
import Loading from './Loading';
import { Typography } from '@material-ui/core';

const spotifyWebApi = new Spotify();

const styles = theme => ({
    selectContainer: {
        display: 'block',
        margin: 'auto',
        width: '90%',
        padding: '10px',
    },
    listItem: {
        width: 300,
        maxHeight: 300,
        maxWidth: 400,
    },
    selectField: {
        maxWidth: 1000,
        display: 'block',
    },
    formControl: {
        margin: 'auto',
        width: '90%',
    },
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
});

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 300
        }
    }
}

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
            <div>
                <div className={classes.selectContainer}>
                    {loading ? <Loading /> :
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='playlist-select'>Playlists</InputLabel>
                            <Select
                                open={open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                onChange={this.handleChange}
                                value={selectedPlaylist.id || ''}
                                className={classes.selectField}
                                id='playlist-select'
                                variant='outlined'
                                MenuProps={MenuProps}
                            >
                                {playlists.items.map(playlist => (
                                    <Card className={classes.card} key={playlist.id} onChange={this.handleChange} value={playlist.id}>
                                        <CardActionArea value={playlist.id}>
                                            <div className={classes.details}>
                                                <CardContent className={classes.content}>
                                                    <Typography component='h5' variant='h5'>
                                                        {playlist.name}
                                                    </Typography>
                                                    <Typography variant='subtitle1' color='textSecondary'>
                                                        By: {playlist.owner.display_name}
                                                    </Typography>
                                                </CardContent>
                                            </div>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </Select>
                        </FormControl>
                    }
                </div>
                { selectedPlaylist.id ? 
                    <Playlist>{selectedPlaylist.id}</Playlist>
                : null }
            </div>
        )
    }
}

export default withStyles(styles)(PlaylistSelect);