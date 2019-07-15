import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import PortfolioContext, { IContextProps } from '../context/portfolio-context'
import Header from './Header'
import Eyecatch from './top/Eyecatch'
import Top from './Top'
import Detail from './Detail';


const App: React.FC = () => {
    const [works, setWorks] = useState<IContextProps>({ products:[] })

    useEffect(() => {
        setWorks(
            {
                products: [
                    {
                        name: "kashiwa-no-ha navi"
                    },
                    {
                        name: "Webエンジニア投資研究所"
                    },
                    {
                        name: "Portfolio Site"
                    },
                    {
                        name: "Mobile Bee"
                    },
                    {
                        name: "App Ape Analytics"
                    },
                    {
                        name: "TimeStack"
                    }
                ]
            }
        )
    }, [])

    return (
        <PortfolioContext.Provider value={ works }>
            <Router>
                <Header />
                <Eyecatch/>
                <main>
                    <Switch>
                        <Route path="/" component={Top} exact={true} />
                        <Route path="/detail" component={Detail} exact={true} />
                    </Switch>
                </main>
            </Router>
        </PortfolioContext.Provider>
    )
}

export { App as default }