import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Action } from 'typescript-fsa'
import { userActions, IWork } from '../../actions/actions'
import { storage } from '../../firebase'
import { WorkHover } from '../../actions/actions'
import { IWorkState } from '../../states/states'

interface OwnProps {
    key: number;
    work: IWorkState;
}

interface WorkCardActions {
    hoverWork: (workHover: WorkHover) => Action<WorkHover>
}

type WorkCardProps = OwnProps & WorkCardActions;

const WorkCard: React.FC<WorkCardProps> = (props: WorkCardProps) => {
    return (
        <div className="workcard">
            <div className="uk-card uk-card-secondary uk-card-hover"
                onMouseEnter={(e) => props.hoverWork({hovered: true, work: props.work})}
                onMouseLeave={(e) => props.hoverWork({hovered: false, work: props.work})}>
                <div className="uk-card-media-top">
                    <div className="uk-height-small uk-background-cover" data-src={props.work.thumbnailURL} uk-img=""></div>
                </div>
                <div className="uk-card-body">
                    <h3 className="uk-card-title">{props.work.title}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<WorkHover>>) {
    return {
      hoverWork: (workHover: WorkHover) => dispatch(userActions.hoverWork(workHover)),
    };
}
  
export default connect(state => Object.assign({}, state), mapDispatchToProps)(WorkCard);