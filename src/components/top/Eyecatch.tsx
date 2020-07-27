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
            <CSSTransition in={!!props.user.hoveredWorkItem} timeout={300}  classNames="cover">
                {
                    (() => {
                        if(props.user.hoveredWorkItem) {
                            return <div className="cover uk-background-cover" data-src={props.user.hoveredWorkItem.thumbnailURL} uk-img=""></div>
                        }
                        return <></>
                    })()
                }
            </CSSTransition>
            <OctetttrussSvg/>
            <CSSTransition in={!!props.user.selectedWorkItem} timeout={300}  classNames="cover">
                {
                    (() => {
                        if(props.user.selectedWorkItem) {
                            return <div className="cover-strong uk-background-cover" data-src={props.user.selectedWorkItem.thumbnailURL} uk-img=""></div>
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