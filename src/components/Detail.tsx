import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { Helmet } from 'react-helmet';
import { AppState } from '../store';
import { userActions, workActions } from '../actions/actions';
import { IWorkItemState } from '../states/work';


interface DetailActions {
    selecteWork: (work: IWorkItemState | null) => Action<IWorkItemState | null>;
    getDetailImages: (work: IWorkItemState | null) => Action<IWorkItemState | null>;
    
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
            let works = props.work.workItems.filter(work => work.title === props.match.params.id)
            if( works.length > 0) {
                console.log("selecteWork:", works[0])
                props.selecteWork(works[0])
                props.getDetailImages(works[0])
            }
        }
    };
    
    useEffect(() => {
        selecteWork()
        // TODO:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.location.pathname])

    useEffect(() => {
        if (!props.work.isLoading) {
            selecteWork()
        }
        // TODO:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.work.isLoading])
    
    return (
        <>
            <Helmet>
                <title>{ props.user.selectedWorkItem ? props.user.selectedWorkItem.title : "Detail" } | nobux42</title>
            </Helmet>
            <div className="detail">
                <div className="uk-section">
                    <div className="uk-container">
                        {/* <h1 className="title">{ props.match ? props.match.params.id: "" }</h1> */}
                        <h1 className="title">{ props.user.selectedWorkItem ? props.user.selectedWorkItem.title : "" }</h1>
                        <p className="skills">
                        {
                            (() => {
                                if( props.user.selectedWorkItem) {
                                    return props.user.selectedWorkItem.skills.map((skill, index) => 
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
                                if( props.user.selectedWorkItem) {
                                    return props.user.selectedWorkItem.description.split('<br>').map( (line, index) => 
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
                                if( props.user.selectedWorkItem && props.user.selectedWorkItem.imageURLs) {
                                    return props.user.selectedWorkItem.imageURLs.map((url, index) => {
                                        if(url.indexOf(".mp4") === -1) {
                                            return (<img key={index} src={url} alt={index.toString()} />)
                                        } else {
                                            return (<video key={index} src={url} width="640" height="480" controls muted></video>)
                                        }
                                    })
                                }
                                return
                            })()
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWorkItemState | null>>) {
    return {
        selecteWork: (work: IWorkItemState | null) => dispatch(userActions.selecteWork(work)),
        getDetailImages: (work: IWorkItemState | null) => dispatch(workActions.getDetailImages.started(work)),
    }
}

function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));