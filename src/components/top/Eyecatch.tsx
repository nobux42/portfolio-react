import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import OctetttrussSvg from '../asset/OctetttrussSvg'
import { WorkHover } from '../../actions/actions';
import { IWorkState } from '../../states/states'


interface OwnProps {
    workHover: WorkHover;
}

const Eyecatch: React.FC<OwnProps> = (props: OwnProps) => {
    return (
        <div className="eyecatch">
            <CSSTransition in={!!props.workHover.hovered} timeout={300}  classNames="cover">
                {
                    (() => {
                        if(props.workHover.work) {
                            return <div className="cover uk-background-cover" data-src={props.workHover.work.thumbnailURL} uk-img=""></div>
                        }
                        return <></>
                    })()
                }
            </CSSTransition>
            <OctetttrussSvg/>
        </div>
    )
}

// export { Eyecatch as default }

function mapDispatchToProps() {
    return {
      
    };
}

export default connect(state => Object.assign({}, state), mapDispatchToProps)(Eyecatch);