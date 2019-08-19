import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { CSSTransition } from 'react-transition-group'
import Header from './Header'
import Eyecatch from './top/Eyecatch'
import Top from './Top'
import Detail from './Detail'
import { firebaseActions } from '../actions/actions';
import { AppState } from '../store';

interface AppActions {
    getWorks: () => Action<void>;
}
type AppProps = AppActions & AppState ;

const routes = [
    { path: '/', name: 'Top', Component: Top },
    { path: '/detail', name: 'Detail', Component: Detail },
    { path: '/about', name: 'Detail', Component: Detail },
]

const App: React.FC<AppProps> = (props: AppProps) => {
    useEffect(() => {
        props.getWorks()
    }, [])

    return (
        <Router>
            <Header/>
            <Eyecatch workHover={props.user.workHover}/>
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
        </Router>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<void>>) {
    return {
      getWorks: () => dispatch(firebaseActions.getWorks.started()),
    };
}
  
function mapStateToProps(appState: AppState) {
    return Object.assign({}, appState);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);