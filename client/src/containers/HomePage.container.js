import React from 'react';

// Component imports
import PlaylistSelect from '../components/PlaylistSelect';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        props.history.push('/');
    };
    
    render() {

        return (
            <div style={{backgroundColor: 'black'}}>
                <PlaylistSelect />
            </div>
        )
    }
}

export default HomePage;