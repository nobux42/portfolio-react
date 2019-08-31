import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Action } from 'typescript-fsa'
import { AppState } from '../store'
import TopSection from './common/TopSection'
import WorkCard from './ui-parts/WorkCard'
import { IWorkState } from '../states/states';
import { userActions } from '../actions/actions';
import { RouteComponentProps, withRouter } from 'react-router';

interface TopActions {
    selecteWork: (work: IWorkState | null) => Action<IWorkState | null>;
}

interface OwnProps {
    
}

type TopProps = OwnProps & AppState & TopActions & RouteComponentProps;

const summarySkills: string[] = ["React", "TypeScript", "JavaScript", "SCSS", "Android", "Java", "Wordpress", "Go", "Python", "AWS", "Firebase"]

const Top: React.FC<TopProps>  = (props: TopProps) => {
    useEffect(() => {
        
    }, [])

    useEffect(() => {
        props.selecteWork(null)
    }, [props.location.pathname])

    return (
        <div className="top">
            <TopSection title={'works'}>
                <div className="uk-child-width-1-3@m" uk-grid="">
                {
                    props.firebase.works.map((work, index) => <WorkCard key={index} work={work}></WorkCard>)
                }
                </div>
            </TopSection>
            <TopSection title={'skills'}>
                <div className="top-section-skills">
                    <p className="skills">
                        {
                            (() => {
                                return summarySkills.map((skill, index) => 
                                    (<span key={index} className="skill-large">{skill}</span>)
                                ); 
                            })()
                        }
                    </p>
                </div>
            </TopSection>
            <TopSection title={'history'}>
                <div></div>
            </TopSection>
        </div>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<IWorkState | null>>) {
    return {
        selecteWork: (work: IWorkState | null) => dispatch(userActions.SelecteWork(work)),
    }
}
  
function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Top));
  