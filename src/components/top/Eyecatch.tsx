import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import OctetttrussSvg from '../asset/OctetttrussSvg'
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
                        if(props.user.workHover.workItem) {
                            return <div className="cover uk-background-cover" data-src={props.user.workHover.workItem.thumbnailURL} uk-img=""></div>
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