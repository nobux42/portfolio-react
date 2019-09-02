import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Action } from 'typescript-fsa'
import { RouteComponentProps, withRouter } from 'react-router';
import { Helmet } from "react-helmet";
import { AppState } from '../store'
import TopSection from './common/TopSection'
import WorkCard from './ui-parts/WorkCard'
import { IWorkState } from '../states/states';
import { userActions } from '../actions/actions';
import OctetttrussSvg from './asset/OctetttrussSvg'

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
        <>
            <Helmet>
                <title>nobux42</title>
            </Helmet>
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
                    <div className="top-section-history">
                        <div className="left">
                            <p>2003/04</p>
                            <p>2008/04</p>
                            <p>2013/11</p>
                            <p>2014/06</p>
                        </div>
                        <div className="right">
                            <p>National Institute go Technology, Tokuyama College.</p>
                            <p>Sony Digital Network Applications, inc.</p>
                            <p>ELS Language Centers, Silicon Valley</p>
                            <p>Fuller, inc.</p>
                        </div>
                    </div>
                </TopSection>
                <div id="parallax-target">
                    <div>
                        <div className="octett-parallax" uk-parallax="y: -180; easing: 0">
                            <OctetttrussSvg/>
                        </div>
                    </div>
                </div>
                <TopSection title={'about'}>
                    <div className="top-section-about">
                        <h5>nobux42</h5>
                        <p>A front-end engineer</p>
                        <div className="snses">
                            <a href="" uk-icon="icon: github"></a>
                            <a href="" uk-icon="icon: facebook"></a>
                            <a href="" uk-icon="icon: twitter"></a>
                        </div>
                    </div>
                </TopSection>
            </div>
        </>
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
  