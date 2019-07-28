import React, { useState, useEffect } from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { hogeActions } from '../actions/actions';
import { HogeState } from '../states/states';
import { AppState } from '../store';

interface HogeActions {
    updateName: (v: string) => Action<string>;
    updateEmail: (v: string) => Action<string>;
}

interface OwnProps {}   
type HogeProps = OwnProps & HogeState & HogeActions;

const Top: React.SFC<HogeProps>  = (props: HogeProps) => {
    return (
        <>
            <section className="uk-section">
                <div className="uk-container">
                    <p>Top</p>
                    <h3>{ props.name }</h3>
                    <div className="field">
                        <input
                            type="text"
                            placeholder="name"
                            value={props.name}
                            onChange={(e) => props.updateName(e.target.value)}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}


function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
    return {
      updateName: (v: string) => dispatch(hogeActions.updateName(v)),
      updateEmail: (v: string) => dispatch(hogeActions.updateEmail(v))
    };
  }
  
  function mapStateToProps(appState: AppState) {
    return Object.assign({}, appState.hoge);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Top);
  