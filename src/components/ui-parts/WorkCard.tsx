import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Action } from 'typescript-fsa'
import { Link } from 'react-router-dom';
import { userActions } from '../../actions/actions'
import { IWorkHover } from '../../actions/actions'
import { IWorkState } from '../../states/firebase'


interface OwnProps {
    key: number;
    work: IWorkState;
}

interface WorkCardActions {
    hoverWork: (workHover: IWorkHover) => Action<IWorkHover>
}

type WorkCardProps = OwnProps & WorkCardActions;

const WorkCard: React.FC<WorkCardProps> = (props: WorkCardProps) => {
    return (
        <div className="workcard">
            <Link to={'/detail/' +  props.work.title }>
                <div className="uk-card uk-card-secondary uk-card-hover"
                    onMouseEnter={(e) => props.hoverWork({hovered: true, work: props.work})}
                    onMouseLeave={(e) => props.hoverWork({hovered: false, work: props.work})}>
                    <div className="uk-card-media-top">
                        <div className="uk-height-small uk-background-cover" data-src={props.work.thumbnailURL} uk-img=""></div>
                    </div>
                    <div className="uk-card-body">
                        <h3 className="uk-card-title">{props.work.title}</h3>
                        <p className="year">{props.work.year}</p>
                        <p className="skills">
                        {
                            (() => {
                                return props.work.skills.map((skill, index) => 
                                    (<span key={index} className="skill-large">{skill}</span>)
                                ); 
                            })()
                        }
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWorkHover>>) {
    return {
      hoverWork: (workHover: IWorkHover) => dispatch(userActions.hoverWork(workHover)),
    };
}
  
export default connect(state => Object.assign({}, state), mapDispatchToProps)(WorkCard);