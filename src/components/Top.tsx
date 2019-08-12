import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Action } from 'typescript-fsa'
import { AppState } from '../store'
import Section from './common/Section'
import WorkCard from './ui-parts/WorkCard'

interface TopActions {
    
}

interface OwnProps {
    
}

type TopProps = OwnProps & AppState & TopActions;

const Top: React.FC<TopProps>  = (props: TopProps) => {
    useEffect(() => {
        
    }, [])

    return (
        <div className="top">
            <Section title={'Works'}>
                <div className="uk-child-width-1-3@m" uk-grid="">
                {
                    props.firebase.works.map((work, index) => <WorkCard key={index} work={work}></WorkCard>)
                    //props.firebase.works.map((work, index) => <p key={index}>{work.title}</p>)
                }
                </div>
            </Section>
        </div>
    )
}

function mapDispatchToProps(dispatch: Dispatch<Action<string | void>>) {
    return {
      
    };
}
  
function mapStateToProps(state: AppState) {
    return Object.assign({}, state);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Top);
  