import React from 'react';

function NowPlaying(props) {
    var nowPlaying = props.children;
    
    return (
        <React.Fragment>
            <div> 
                Now Playing: { nowPlaying.name } 
            </div>
            <div>
                <img src={ nowPlaying.image } alt={ nowPlaying.alt } style={{ width:100 }}/>
            </div>
        </React.Fragment>
    );
};

export default NowPlaying;