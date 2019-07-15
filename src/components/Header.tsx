import React from 'react';

const Header = () => {
    return (
        <div className="">
            <header id="header">
                <nav className="uk-navbar" uk-navbar="">
                    <div className="uk-navbar-left">
                        <a className="uk-navbar-item uk-logo" href="/#">nobux42</a>
                    </div>
                    <div className="uk-navbar-right">
                        <ul className="uk-navbar-nav uk-visible@s">
                            <li className="uk-active"><a href="/#">work</a></li>
                            <li><a href="/#">about</a></li>
                        </ul>
                        <a className="uk-navbar-toggle uk-hidden@s" uk-toggle="target: #sidenav" uk-navbar-toggle-icon="" ></a>
                    </div>
                </nav>
            </header>

            <div id="sidenav" uk-offcanvas="flip: true" className="uk-offcanvas">
                <div className="uk-offcanvas-bar">
                    <button className="uk-offcanvas-close" type="button" uk-close=""></button>
                    <ul className="uk-nav">
                        <li><a className="" href="/#">work</a></li>
                        <li><a className="" href="/#">about</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export { Header as default }