import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Header() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
        </ul>
    )
}

export default Header;