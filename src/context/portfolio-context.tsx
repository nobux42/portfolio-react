
import React from 'react'

export interface IProduct {
    name: string;
}

export interface IContextProps {
    products: IProduct[];
}

const PortfolioContext = React.createContext({} as IContextProps)

export { PortfolioContext as default }