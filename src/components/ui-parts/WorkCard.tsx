import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Action } from 'typescript-fsa'
import { Link } from 'react-router-dom';
import { userActions } from '../../actions/actions'
import { IWorkItemHover } from '../../actions/actions'
import { IWorkItemState } from '../../states/work'


interface OwnProps {
    key: number;
    workItem: IWorkItemState;
}

interface WorkCardActions {
    hoverWork: (workHover: IWorkItemHover) => Action<IWorkItemHover>
}

type WorkCardProps = OwnProps & WorkCardActions;

const WorkCard: React.FC<WorkCardProps> = (props: WorkCardProps) => {
    return (
        <div className="workcard">
            <Link to={'/detail/' +  props.workItem.title }>
                <div className="uk-card uk-card-secondary uk-card-hover"
                    onMouseEnter={(e) => props.hoverWork({hovered: true, workItem: props.workItem})}
                    onMouseLeave={(e) => props.hoverWork({hovered: false, workItem: props.workItem})}>
                    <div className="uk-card-media-top">
                        <div className="uk-height-small uk-background-cover" data-src={props.workItem.thumbnailURL} uk-img=""></div>
                    </div>
                    <div className="uk-card-body">
                        <h3 className="uk-card-title">{props.workItem.title}</h3>
                        <p className="year">{props.workItem.year}</p>
                        <p className="skills">
                        {
                            // (() => {
                            //     return props.work.skills.map((skill, index) => 
                            //         (<span key={index} className="skill-large">{skill}</span>)
                            //     ); 
                            // })()
                        }
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWorkItemHover>>) {
    return {
      hoverWork: (workHover: IWorkItemHover) => dispatch(userActions.hoverWork(workHover)),
    };
}
  
export default connect(state => Object.assign({}, state), mapDispatchToProps)(WorkCard);