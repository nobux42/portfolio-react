import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import OctetttrussSvg from '../asset/OctetttrussSvg'
import { IWork } from '../../actions/actions'

interface OwnProps {
    hoveredWork: IWork | null;
}

const Eyecatch: React.FC<OwnProps> = (props: OwnProps) => {
    return (
        <div className="eyecatch">
            <OctetttrussSvg/>
            <CSSTransition in={!!props.hoveredWork} timeout={200} className="notify" classNames="notify" unmountOnExit>
                <div>
                    {props.hoveredWork ? props.hoveredWork.title : "not selected" }
                </div>
            </CSSTransition>
        </div>
    )
}

// export { Eyecatch as default }

function mapDispatchToProps() {
    return {
      
    };
}

export default connect(state => Object.assign({}, state), mapDispatchToProps)(Eyecatch);