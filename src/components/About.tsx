import React from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { Helmet } from 'react-helmet';
import { AppState } from '../store';
import { IWorkItemState } from '../states/work';

interface OwnProps {
    
}

type AboutProps = OwnProps;

const About: React.FC<AboutProps> = (props: AboutProps) => {
    return (
        <>
            <Helmet>
                <title>About | nobux42</title>
            </Helmet>
            <div className="about">
                <div className="uk-section">
                    <div className="uk-container">
                        <h5>nobux42</h5>
                        <p>A front-end engineer</p>
                        <div className="snses">
                            <a href="https://github.com/nobux42" uk-icon="icon: github"><span>github</span></a>
                            <a href="https://www.facebook.com/nobuhiro.inoue.90" uk-icon="icon: facebook"><span>facebook</span></a>
                            <a href="https://twitter.com/nobux42" uk-icon="icon: twitter"><span>twitter</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWorkItemState | null>>) {
    return {
       
    }
}

function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);