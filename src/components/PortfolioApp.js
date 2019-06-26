import React, { useState, useEffect } from 'react'
import PortfolioContext from '../context/portfolio-context'
import Header from './Header'
import Eyecatch from './top/Eyecatch'

const PortfolioApp = () => {
    const [works, setWorks] = useState([])

    useEffect(() => {
        setWorks([
            {
                name: "kashiwa-no-ha navi"
            },
            {
                name: "Mobile Bee"
            },
            {
                name: "App Ape Analytics ver 1.0"
            },
            {
                name: "TimeStack"
            }
        ])
    }, [])

    return (
        <PortfolioContext.Provider value={{ works }}>
            <Header/>
            <Eyecatch/>
        </PortfolioContext.Provider>
    )
}

export { PortfolioApp as default }