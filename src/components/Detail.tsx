import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { userActions } from '../actions/actions';
import { IWorkState } from '../states/states';
import { Action } from 'typescript-fsa';

interface DetailActions {
    selecteWork: (work: IWorkState | null) => Action<IWorkState | null>;
}

interface OwnRouteParams {
    id: string
}

interface OwnProps {
    
}

type DetailProps = OwnProps & DetailActions & RouteComponentProps<OwnRouteParams> & AppState;

const Detail: React.FC<DetailProps> = (props: DetailProps) => {
    const selecteWork = () => {
        if( props.match && props.match.params.id ) {
            let works = props.firebase.works.filter(work => work.title == props.match.params.id)
            if( works.length > 0) {
                props.selecteWork(works[0])
            }
        }
    };

    useEffect(() => {
        selecteWork()
    }, [])

    useEffect(() => {
        selecteWork()
    }, [props.location.pathname])


    useEffect(() => {
        if (!props.firebase.isLoading) {
            selecteWork()
        }
    }, [props.firebase.isLoading])
    
    return (
        <>
            <div className="uk-section">
                <div className="uk-container">
                    <p>Detail</p>
                    <p>{ props.location.pathname }</p>
                    <p>ID:{ props.match ? props.match.params.id: "" }</p>
                </div>
            </div>
        </>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWorkState | null>>) {
    return {
        selecteWork: (work: IWorkState | null) => dispatch(userActions.SelecteWork(work)),
    }
}

function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));