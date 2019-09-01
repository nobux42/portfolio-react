import React, { useEffect, ReactComponentElement } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { userActions, firebaseActions } from '../actions/actions';
import { IWorkState } from '../states/states';
import { Action } from 'typescript-fsa';

interface OwnProps {
    
}

type AboutProps = OwnProps;

const About: React.FC<AboutProps> = (props: AboutProps) => {    
    return (
        <div className="about">
            <div className="uk-section">
                <div className="uk-container">
                    <h5>nobux42</h5>
                    <p>A front-end engineer</p>
                    <div className="snses">
                        <a href="" uk-icon="icon: github"></a>
                        <a href="" uk-icon="icon: facebook"></a>
                        <a href="" uk-icon="icon: twitter"></a>
                    </div>
                </div>
            </div>
        </div>
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