import React from 'react';
import './header.scss'

const Header = () => {
    return (
        <header>
            <div className="logo">
                <span>iFrame as SSO</span>
            </div>
            <div className="episode">
                <button>Logout</button>
            </div>
        </header>
    );
};

export default Header;
