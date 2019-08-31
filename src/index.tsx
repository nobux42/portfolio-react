import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './components/App'
import configureStore from './store'

import 'uikit/dist/js/uikit'
import 'normalize.css/normalize.css'
import './styles/style.scss'

const store = configureStore()

const element = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(element, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
