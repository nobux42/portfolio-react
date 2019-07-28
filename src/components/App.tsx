import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from '../store';
import Header from './Header'
import Eyecatch from './top/Eyecatch'
import Top from './Top'
import Detail from './Detail'


const App: React.FC = () => {
    useEffect(() => {
        
    }, [])

    return (
        <Provider store={Store}>
            <Router>
                <Header/>
                <Eyecatch/>
                <main>
                    <Switch>
                        <Route path="/" component={Top} exact={true} />
                        <Route path="/detail" component={Detail} exact={true} />
                    </Switch>
                </main>
            </Router>
        </Provider>
    )
}

export { App as default }