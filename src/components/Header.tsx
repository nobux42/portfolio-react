import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { Link } from 'react-router-dom';
import { IAuthState } from "../states/auth";
import { AppState } from "../store";
import { auth } from '../firebase';

interface OwnProps {
    auth: IAuthState
}

type HeaderProps = OwnProps;

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    return (
        <div className="header">
            <header id="header">
                <nav className="uk-navbar" uk-navbar="">
                    <div className="uk-navbar-left">
                        <Link className="uk-navbar-item uk-logo" to="/">
                            <img className="logo-image" src="/images/octettruss-icon-gray_256.png" alt="logo"/><span className="logo-title">nobux42</span>
                        </Link>
                    </div>
                    <div className="uk-navbar-right">
                        <ul className="uk-navbar-nav uk-visible@s">
                            <li><Link to="/about">about</Link></li>
                            {props.auth.user ? (
                                <li><Link to="/" onClick={(event) => auth.signOut()}>signout</Link></li>
                            ) : (
                                <li><Link to="/signin">signin</Link></li>
                            )}     
                        </ul>
                        <span className="uk-navbar-toggle uk-hidden@s" uk-toggle="target: #sidenav" uk-navbar-toggle-icon=""></span>
                    </div>
                </nav>
            </header>

            <div id="sidenav" uk-offcanvas="flip: true" className="uk-offcanvas">
                <div className="uk-offcanvas-bar">
                    <button className="uk-offcanvas-close" type="button" uk-close=""></button>
                    <ul className="uk-nav">
                        <li><Link to="/about">about</Link></li>
                        {props.auth.user ? (
                            <li><Link to="/" onClick={(event) => auth.signOut()}>signout</Link></li>
                        ) : (
                            <li><Link to="/signin">signin</Link></li>
                        )}     
                    </ul>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<void>>) {
    return {
        
    }
}
  
function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);