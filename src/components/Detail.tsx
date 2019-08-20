import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


interface OwnRouteParams {
    id: string
}

interface OwnProps {
    
}

type DetailProps = OwnProps & RouteComponentProps<OwnRouteParams>;

const Detail: React.FC<DetailProps> = (props: DetailProps) => {
    return (
        <>
            <div className="uk-section">
                <div className="uk-container">
                    <p>Detail</p>
                    <p>{ props.location.pathname }</p>
                    <p>ID:{ props.match.params.id }</p>
                </div>
            </div>
        </>
    )
}

function mapDispatchToProps() {
    return {
      
    };
}

export default withRouter(connect(state => Object.assign({}, state), mapDispatchToProps)(Detail));