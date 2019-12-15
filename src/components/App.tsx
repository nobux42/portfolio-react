import React, { useEffect } from 'react'
import { Router, Route } from 'react-router-dom'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { CSSTransition } from 'react-transition-group'
import { Helmet } from 'react-helmet';
import Header from './Header'
import Eyecatch from './top/Eyecatch'
import Top from './Top'
import Detail from './Detail'
import { firebaseActions } from '../actions/actions';
import { AppState } from '../store';
import Footer from './Footer';
import About from './About';

import ReactGA from 'react-ga';
import createBrowserHistory from 'history/createBrowserHistory';

ReactGA.initialize('UA-107600889-2');
const history = createBrowserHistory();
history.listen(({ pathname }) => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
});

interface AppActions {
    getWorks: () => Action<void>;
}
type AppProps = AppActions & AppState ;

const routes = [
    { path: '/', name: 'Top', Component: Top },
    { path: '/detail/:id', name: 'Detail', Component: Detail },
    { path: '/about', name: 'Detail', Component: About },
]

const App: React.FC<AppProps> = (props: AppProps) => {
    useEffect(() => {
        ReactGA.set({ page: '/' });
        ReactGA.pageview('/');

        props.getWorks()

        // TODO:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                
            </Helmet>
            <Router history={history}>
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
        </Router>
        </>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<void>>) {
    return {
      getWorks: () => dispatch(firebaseActions.getWorks.started()),
    }
}
  
function mapStateToProps(appState: AppState) {
    return Object.assign({}, appState);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);