import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import OctetttrussSvg from '../asset/OctetttrussSvg'
import { WorkHover } from '../../actions/actions';
import { IWorkState } from '../../states/states'
import { AppState } from '../../store';


interface OwnRouteParams {
    id: string
}

interface OwnProps {
    
}

type EycatchProps = OwnProps & AppState & RouteComponentProps<OwnRouteParams>;

const Eyecatch: React.FC<EycatchProps> = (props: EycatchProps) => {
    return (
        <div className="eyecatch">
            <CSSTransition in={!!props.user.workHover.hovered} timeout={300}  classNames="cover">
                {
                    (() => {
                        if(props.user.workHover.work) {
                            return <div className="cover uk-background-cover" data-src={props.user.workHover.work.thumbnailURL} uk-img=""></div>
                        }
                        return <></>
                    })()
                }
            </CSSTransition>
            <OctetttrussSvg/>
            <CSSTransition in={!!props.user.selectedWork} timeout={300}  classNames="cover">
                {
                    (() => {
                        if(props.user.selectedWork) {
                            return <div className="cover-strong uk-background-cover" data-src={props.user.selectedWork.thumbnailURL} uk-img=""></div>
                        }
                        return <></>
                    })()
                }
            </CSSTransition>
            <p>{ props.location.pathname }</p>
            <p> ID:{ props.match.params ? props.match.params.id: "" }</p>
        </div>
    )
}

function mapDispatchToProps() {
    return {
      
    };
}

function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Eyecatch));