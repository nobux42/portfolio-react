import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="">
            <header id="header">
                <nav className="uk-navbar" uk-navbar="">
                    <div className="uk-navbar-left">
                        <Link className="uk-navbar-item uk-logo" to="/">nobux42</Link>
                    </div>
                    <div className="uk-navbar-right">
                        <ul className="uk-navbar-nav uk-visible@s">
                            <li><Link to="/about">about</Link></li>
                        </ul>
                        <span className="uk-navbar-toggle uk-hidden@s" uk-toggle="target: #sidenav" uk-navbar-toggle-icon=""></span>
                    </div>
                </nav>
            </header>

            <div id="sidenav" uk-offcanvas="flip: true" className="uk-offcanvas">
                <div className="uk-offcanvas-bar">
                    <button className="uk-offcanvas-close" type="button" uk-close=""></button>
                    <ul className="uk-nav">
                        <li><Link className="" to="/about">about</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export { Header as default }