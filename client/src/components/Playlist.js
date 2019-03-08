import React from 'react';

function Playlist(props) {
    const info = props.children
    console.log('playlist props', info);
    return (
        <div>
            <h1>{info.name}</h1>
            <img src={info.images[1].url}></img>
        </div>
    )
}

export default Playlist;