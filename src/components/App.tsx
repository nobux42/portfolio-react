import React, { useEffect } from 'react'
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { CSSTransition } from 'react-transition-group'
import { Helmet } from 'react-helmet';
import Header from './Header'
import Eyecatch from './top/Eyecatch'
import Top from './Top'
import Detail from './Detail'
import { authActions, workActions } from '../actions/actions';
import history from '../history';
import { AppState } from '../store';
import { auth } from '../firebase'
import Footer from './Footer';
import About from './About';
import SignIn from './SignIn';
import ReactGA from 'react-ga';

interface AppActions {
    setUser: (user: firebase.User) => Action<firebase.User>;
    getWorks: () => Action<void>;
}
type AppProps = AppActions & AppState ;

const routes = [
    { path: '/', name: 'Top', Component: Top },
    { path: '/detail/:id', name: 'Detail', Component: Detail },
    { path: '/about', name: 'About', Component: About },
    { path: '/signin', name: 'SignIn', Component: SignIn },
]

const App: React.FC<AppProps> = (props: AppProps) => {    
    useEffect(() => {
        ReactGA.set({ page: '/' });
        ReactGA.pageview('/');

        props.getWorks();

        auth.onAuthStateChanged((userAuth: any) => {
            console.log("setUser", userAuth); // TODO REMOVE
            props.setUser(userAuth);
        });
        // TODO:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet></Helmet>
            <ConnectedRouter history={history}>
                <Eyecatch/>
                <Header/>
                <main>
                    {routes.map(({ path, Component }) => (
                        <Route key={path} exact path={path}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={300}
                                classNames="router-page"
                                unmountOnExit
                            >
                            <div className="router-page">
                                <Component />
                            </div>
                            </CSSTransition>
                        )}
                        </Route>
                    ))}
                </main>
                <Footer/>
            </ConnectedRouter>
        </>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<void | firebase.User>>) {
    return {
      setUser: (user: firebase.User) => dispatch(authActions.setUser(user)),
      getWorks: () => dispatch(workActions.getWorks.started()),
    }
}
  
function mapStateToProps(appState: AppState) {
    return Object.assign({}, appState);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);