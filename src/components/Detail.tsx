import React, { useEffect, ReactComponentElement } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { userActions, firebaseActions } from '../actions/actions';
import { IWorkState } from '../states/states';
import { Action } from 'typescript-fsa';

interface DetailActions {
    selecteWork: (work: IWorkState | null) => Action<IWorkState | null>;
    getDetailImages: (work: IWorkState | null) => Action<IWorkState | null>;
    
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
                console.log("selecteWork:", works[0])
                props.selecteWork(works[0])
                props.getDetailImages(works[0])
            }
        }
    };
    
    useEffect(() => {
        selecteWork()
    }, [props.location.pathname])

    useEffect(() => {
        if (!props.firebase.isLoading) {
            selecteWork()
        }
    }, [props.firebase.isLoading])
    
    return (
        <div className="detail">
            <div className="uk-section">
                <div className="uk-container">
                    {/* <h1 className="title">{ props.match ? props.match.params.id: "" }</h1> */}
                    <h1 className="title">{ props.user.selectedWork ? props.user.selectedWork.title : "" }</h1>
                    <p className="skills">
                    {
                        (() => {
                            if( props.user.selectedWork) {
                                return props.user.selectedWork.skills.map((skill, index) => 
                                    (<span key={index} className="skill-large">{skill}</span>)
                                );
                            }
                            return 
                        })()
                    }
                    </p>
                    <p className="description">
                    {
                        (() => {
                            if( props.user.selectedWork) {
                                return props.user.selectedWork.description.split('<br>').map( (line, index) => 
                                    (<React.Fragment key={index}><span>{line}</span><br/></React.Fragment>)
                                );
                            }
                            return
                        })()
                    }
                    </p>
                    <div className="images">
                    {
                        (() => {
                            if( props.user.selectedWork && props.user.selectedWork.imageURLs) {
                                return props.user.selectedWork.imageURLs.map((url, index) => 
                                    (<img key={index} src={url}/>)
                                );
                            }
                            return
                        })()
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWorkState | null>>) {
    return {
        selecteWork: (work: IWorkState | null) => dispatch(userActions.SelecteWork(work)),
        getDetailImages: (work: IWorkState | null) => dispatch(firebaseActions.getDetailImages.started(work)),
    }
}

function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));