import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import OctetttrussSvg from '../asset/OctetttrussSvg'
import { WorkHover } from '../../actions/actions';
import { IWorkState } from '../../states/states'


interface OwnRouteParams {
    id: string
}

interface OwnProps {
    workHover: WorkHover;
}

type EycatchProps = OwnProps & RouteComponentProps<OwnRouteParams>;

const Eyecatch: React.FC<EycatchProps> = (props: EycatchProps) => {
    return (
        <div className="eyecatch">
            <CSSTransition in={!!props.workHover.hovered} timeout={300}  classNames="cover">
                {
                    (() => {
                        console.log(props)
                        if(props.workHover.work) {
                            return <div className="cover uk-background-cover" data-src={props.workHover.work.thumbnailURL} uk-img=""></div>
                        }
                        return <></>
                    })()
                }
            </CSSTransition>
            <OctetttrussSvg/>
            <p>{ props.location.pathname }</p>
            <p>ID:{ props.match.params.id }</p>
        </div>
    )
}

function mapDispatchToProps() {
    return {
      
    };
}

export default withRouter(connect(state => Object.assign({}, state), mapDispatchToProps)(Eyecatch));