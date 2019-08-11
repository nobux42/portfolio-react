import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Action } from 'typescript-fsa'
import { userActions, IWork } from '../../actions/actions'

interface OwnProps {
    work: IWork;
}   

interface WorkCardActions {
    hoverWork: (work: IWork | null) => Action<IWork | null>
}

type WorkCardProps = OwnProps & WorkCardActions;

const WorkCard: React.FC<WorkCardProps> = (props: WorkCardProps) => {
    return (
        <div key={props.work.title} 
            onMouseEnter={(e) => props.hoverWork(props.work)}
            onMouseLeave={(e) => props.hoverWork(null)}>
            <div className="uk-card">
                <div className="uk-card-media-top">
                    <img src="" alt=""/>
                </div>
                <div className="uk-card-body">
                    <h3 className="uk-card-title">{props.work.title}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWork | null>>) {
    return {
      hoverWork: (work: IWork | null) => dispatch(userActions.hoverWork(work)),
    };
}
  
export default connect(state => Object.assign({}, state), mapDispatchToProps)(WorkCard);