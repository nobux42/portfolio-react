import React, { ReactNode } from 'react'

interface OwnProps {
    title: string;
    children: ReactNode;
}   

const Section: React.FC<OwnProps> = (props: OwnProps) => {
    return (
        <>
            <section className="uk-section">
                <div className="uk-container">
                    <h2>{props.title}</h2>
                    {props.children}
                </div>
            </section>
        </>
    )
}

export { Section as default }