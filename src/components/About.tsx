import React, { useEffect, ReactComponentElement } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { Helmet } from 'react-helmet';
import { AppState } from '../store';
import { userActions, firebaseActions } from '../actions/actions';
import { IWorkState } from '../states/states';


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
                            <a href="https://github.com/nobux42" uk-icon="icon: github"></a>
                            <a href="https://www.facebook.com/nobuhiro.inoue.90" uk-icon="icon: facebook"></a>
                            <a href="https://twitter.com/nobux42" uk-icon="icon: twitter"></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWorkState | null>>) {
    return {
       
    }
}

function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);