import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
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

const App: React.FC<AppProps> = (props: AppProps) => {
    useEffect(() => {
        props.getWorks()
    }, [])

    return (
        <Router>
            <Header/>
            <Eyecatch/>
            <p>{props.user.hoveredWork ? props.user.hoveredWork.title : "not selected" }</p>
            <main>
                <Switch>
                    <Route path="/" component={Top} exact={true} />
                    <Route path="/detail" component={Detail} exact={true} />
                </Switch>
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